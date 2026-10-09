import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { images } from './data/images'

describe('locally hosted BKW brand assets', () => {
  it('includes the original BKW logo', () => {
    expect(existsSync(join(process.cwd(), 'public/assets/logo-bkw.svg'))).toBe(
      true,
    )
  })

  it.each(Object.entries(images))(
    'ships real responsive WebP variants for %s below 550 kB each',
    (_name, photo) => {
      for (const variant of photo.variants) {
        const path = join(process.cwd(), 'public/assets/photos', variant.src)
        expect(existsSync(path)).toBe(true)
        expect(statSync(path).size).toBeLessThan(550_000)
        const header = readFileSync(path).subarray(0, 12).toString('ascii')
        expect(header.slice(0, 4)).toBe('RIFF')
        expect(header.slice(8, 12)).toBe('WEBP')
      }
    },
  )

  it('never upscales original photography and records authorized BKW provenance', () => {
    const manifest = JSON.parse(
      readFileSync('docs/v2/source-assets/optimized-manifest.json', 'utf8'),
    ) as Array<{
      source: string
      crop: number[]
      variants: Array<{ width: number; height: number }>
    }>
    for (const photo of manifest) {
      expect(new URL(photo.source).hostname).toBe('bkwgroep.nl')
      for (const variant of photo.variants) {
        expect(variant.width).toBeLessThanOrEqual(photo.crop[2] - photo.crop[0])
        expect(variant.height).toBeLessThanOrEqual(
          photo.crop[3] - photo.crop[1],
        )
      }
    }
  })

  it('ships its locally served font with the original redistribution license', () => {
    expect(existsSync('public/assets/fonts/manrope-latin.woff2')).toBe(true)
    expect(
      readFileSync('public/assets/fonts/OFL-Manrope.txt', 'utf8'),
    ).toContain('SIL OPEN FONT LICENSE')
  })
})
