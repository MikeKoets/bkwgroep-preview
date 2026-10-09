import { images, type ImageName } from '../data/images'

export function Photo({
  name,
  alt,
  className,
  priority = false,
  sizes = '(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 50vw, 600px',
}: {
  name: ImageName
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}) {
  const variants = images[name].variants
  const largest = variants[variants.length - 1]
  const base = `${import.meta.env.BASE_URL}assets/photos/`
  return (
    <img
      className={className}
      src={base + largest.src}
      srcSet={variants.map((v) => `${base + v.src} ${v.width}w`).join(', ')}
      sizes={sizes}
      width={largest.width}
      height={largest.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  )
}
