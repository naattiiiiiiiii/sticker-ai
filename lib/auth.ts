import { timingSafeEqual } from 'crypto'

/**
 * Compara dos strings de forma segura contra timing attacks
 */
export function secureCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false
  }

  // Normalize lengths to prevent timing attacks based on length
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)

  if (bufA.length !== bufB.length) {
    // Compare with itself to maintain constant time
    timingSafeEqual(bufA, bufA)
    return false
  }

  return timingSafeEqual(bufA, bufB)
}

/**
 * Verifica el header de autorización contra un secret
 * Retorna un objeto con el resultado y mensaje de error si aplica
 */
export function verifyAuth(
  authHeader: string | null,
  secretEnvVar: string,
  secretName: string
): { authorized: boolean; error?: string; status?: number } {
  const secret = process.env[secretEnvVar]

  // Secret must be configured
  if (!secret) {
    console.error(`[auth] ${secretName} not configured`)
    return {
      authorized: false,
      error: 'Server configuration error',
      status: 500,
    }
  }

  // Auth header must be present
  if (!authHeader) {
    return {
      authorized: false,
      error: 'Authorization header required',
      status: 401,
    }
  }

  // Must be Bearer token
  if (!authHeader.startsWith('Bearer ')) {
    return {
      authorized: false,
      error: 'Invalid authorization format',
      status: 401,
    }
  }

  const token = authHeader.slice(7) // Remove 'Bearer '

  // Timing-safe comparison
  if (!secureCompare(token, secret)) {
    return {
      authorized: false,
      error: 'Unauthorized',
      status: 401,
    }
  }

  return { authorized: true }
}
