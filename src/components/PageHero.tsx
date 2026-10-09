import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Photo } from './Photo'
import type { ImageName } from '../data/images'

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  image: ImageName
  imageAlt: string
  secondaryLabel?: string
  secondaryTo?: string
  urgent?: boolean
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  secondaryLabel = 'Bekijk werkzaamheden',
  secondaryTo = '#werkzaamheden',
  urgent = false,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero__grid">
        <div className="page-hero__copy">
          <nav className="breadcrumb" aria-label="Kruimelpad">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{eyebrow}</span>
          </nav>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="hero-actions">
            {urgent ? (
              <a className="button button--primary" href="tel:+31850606663">
                <Phone aria-hidden="true" />
                Bel 085 060 66 63
              </a>
            ) : (
              <Link className="button button--primary" to="/contact/">
                Bespreek uw vraag <ArrowRight aria-hidden="true" />
              </Link>
            )}
            <Link className="text-link" to={secondaryTo}>
              {secondaryLabel}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
        <figure className="page-hero__photo">
          <Photo name={image} alt={imageAlt} priority />
          <figcaption>
            <span aria-hidden="true" /> BKW Groep ·{' '}
            {eyebrow.replace('BKW ', '')}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
