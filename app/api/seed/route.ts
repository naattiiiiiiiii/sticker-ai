import { NextRequest, NextResponse } from 'next/server'
import { sanitizePrompt } from '@/lib/content-filter'
import { generateImage } from '@/lib/pollinations'
import { convertToWebPSticker } from '@/lib/image-utils'
import { createSticker, getStickerCount } from '@/lib/db'
import { uploadImage, generateFilename } from '@/lib/storage'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Varied prompts for seed stickers - different styles and themes
const SEED_PROMPTS = [
  // Animals
  'happy golden retriever dog',
  'grumpy cat face',
  'cute baby elephant',
  'funny penguin dancing',
  'sleepy koala on tree',
  'playful red panda',
  'majestic lion portrait',
  'adorable bunny rabbit',
  'cool shark with attitude',
  'sweet butterfly',

  // Food
  'smiling pizza slice',
  'happy sushi roll',
  'cute cupcake with sprinkles',
  'dancing taco',
  'coffee cup with steam',
  'ice cream cone melting',
  'happy avocado',
  'donut with pink frosting',

  // Objects & Things
  'retro boombox music',
  'gaming controller neon',
  'vintage camera',
  'rocket ship launching',
  'rainbow cloud',
  'magic crystal ball',
  'disco ball shiny',
  'skateboard cool',

  // Emotions & Expressions
  'laughing emoji face',
  'heart with wings',
  'thumbs up sign',
  'star with sunglasses',
  'peace sign hand',
  'fire flame emoji',

  // Nature
  'cherry blossom flower',
  'cactus with flower',
  'mushroom forest',
  'sun with happy face',
  'moon and stars night',
  'palm tree tropical',

  // Characters
  'cute robot friend',
  'friendly alien green',
  'wizard with magic wand',
  'ninja warrior',
  'princess crown',
  'pirate with eyepatch',
]

export async function POST(request: NextRequest) {
  try {
    // Check authorization (simple secret for now)
    const authHeader = request.headers.get('authorization')
    const expectedSecret = process.env.SEED_SECRET || 'seed-stickers-secret'

    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get current count
    const currentCount = await getStickerCount()
    const targetCount = 40
    const needed = Math.max(0, targetCount - currentCount)

    if (needed === 0) {
      return NextResponse.json({
        message: 'Gallery already has enough stickers',
        currentCount,
      })
    }

    // Select random prompts
    const shuffled = [...SEED_PROMPTS].sort(() => Math.random() - 0.5)
    const selectedPrompts = shuffled.slice(0, needed)

    const created: string[] = []
    const errors: string[] = []

    for (const prompt of selectedPrompts) {
      try {
        const sanitizedPrompt = sanitizePrompt(prompt)
        const imageBuffer = await generateImage(sanitizedPrompt, {
          width: 512,
          height: 512,
        })
        const webpBuffer = await convertToWebPSticker(imageBuffer)
        const filename = generateFilename()
        const imageUrl = await uploadImage(webpBuffer, filename)
        await createSticker(prompt, imageUrl)
        created.push(prompt)

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (err) {
        errors.push(`${prompt}: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }

    return NextResponse.json({
      success: true,
      created: created.length,
      errors: errors.length,
      details: { created, errors },
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Error seeding stickers' },
      { status: 500 }
    )
  }
}

// GET to check status
export async function GET() {
  const count = await getStickerCount()
  return NextResponse.json({
    currentCount: count,
    minimumRequired: 40,
    needsSeeding: count < 40,
  })
}
