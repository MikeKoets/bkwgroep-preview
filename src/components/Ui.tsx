import type { LucideIcon } from 'lucide-react'
import { ArrowRight, ArrowUpRight, Check, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Photo } from './Photo'
import type { ImageName } from '../data/images'

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
}: {
  eyebrow: string
  title: string
  intro?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  )
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  to,
  image,
  imageAlt = '',
  number,
  actionLabel,
}: {
  icon: LucideIcon
  title: string
  description: string
  to: string
  image?: ImageName
  imageAlt?: string
  number?: string
  actionLabel?: string
}) {
  return (
    <article className={`service-card${image ? ' service-card--photo' : ''}`}>
      {image ? (
        <Link
          to={to}
          tabIndex={-1}
          aria-hidden="true"
          className="service-card__image"
        >
          <Photo
            name={image}
            alt={imageAlt}
            sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1100px) 45vw, 300px"
          />
          <span>{number}</span>
        </Link>
      ) : (
        <span className="icon-tile">
          <Icon aria-hidden="true" />
        </span>
      )}
      <div className="service-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
        {to.startsWith('tel:') ? (
          <a href={to}>
            {actionLabel ?? 'Bel voor hulp'}
            <Phone aria-hidden="true" />
          </a>
        ) : (
          <Link to={to}>
            {actionLabel ?? `Meer over ${title.toLowerCase()}`}
            <ArrowUpRight aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  )
}

export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="feature-list">
      {items.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ProcessSteps({
  steps,
}: {
  steps: Array<{ title: string; text: string }>
}) {
  return (
    <ol className="process-grid">
      {steps.map((step, i) => (
        <li key={step.title}>
          <span className="process-number">0{i + 1}</span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function ContactCta({
  eyebrow = 'Zullen we het bespreken?',
  title = 'Een goed begin is een helder gesprek.',
  text = 'Vertel wat er speelt. Samen bespreken we de werkzaamheden aan uw woning of pand.',
}: {
  eyebrow?: string
  title?: string
  text?: string
}) {
  return (
    <section className="contact-cta">
      <div className="container contact-cta__inner">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="contact-cta__actions">
          <Link className="button button--primary" to="/contact">
            Contact opnemen
            <ArrowRight aria-hidden="true" />
          </Link>
          <a className="text-link" href="tel:+31850606663">
            <Phone aria-hidden="true" />
            085 060 66 63
          </a>
        </div>
      </div>
    </section>
  )
}
