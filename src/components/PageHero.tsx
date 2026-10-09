import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  image?: string
  imageAlt?: string
  compact?: boolean
  secondaryLabel?: string
  secondaryTo?: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  compact = false,
  secondaryLabel = 'Bekijk onze diensten',
  secondaryTo = '/onderhoud',
}: PageHeroProps) {
  return (
    <section className={compact ? 'page-hero page-hero--compact' : 'page-hero'}>
      {image ? <img className="page-hero__media" src={image} alt={imageAlt} /> : null}
      <div className="page-hero__overlay" />
      <div className="container page-hero__content">
        <span className="eyebrow eyebrow--light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="hero-actions">
          <Link className="button button--primary" to="/contact">
            Neem contact op
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link className="button button--ghost" to={secondaryTo}>
            {secondaryLabel}
          </Link>
          <a className="hero-phone" href="tel:+31850606663">
            <Phone aria-hidden="true" />
            085 060 66 63
          </a>
        </div>
      </div>
    </section>
  )
}
