import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const images = [
  'home-hero.webp',
  'professionals.webp',
  'maintenance-hero.webp',
  'locks-hero.webp',
  'business.webp',
  'contact.webp',
]

describe('locally hosted BKW brand assets', () => {
  it('includes the original BKW logo', () => {
    expect(existsSync(join(process.cwd(), 'public/assets/logo-bkw.svg'))).toBe(true)
  })

  it.each(images)('includes an optimized %s below 900 kB', (image) => {
    const path = join(process.cwd(), 'public/assets/images', image)
    expect(existsSync(path)).toBe(true)
    expect(statSync(path).size).toBeLessThan(900_000)
  })
})
