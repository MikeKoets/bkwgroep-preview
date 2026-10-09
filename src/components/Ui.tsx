import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

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
}: {
  icon: LucideIcon
  title: string
  description: string
  to: string
}) {
  return (
    <article className="service-card">
      <span className="icon-tile"><Icon aria-hidden="true" /></span>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={to}>Meer over {title.toLowerCase()} <ArrowRight aria-hidden="true" /></Link>
    </article>
  )
}

export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="feature-list">
      {items.map((item) => (
        <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>
      ))}
    </ul>
  )
}

export function ProcessSteps({ steps }: { steps: Array<{ title: string; text: string }> }) {
  return (
    <ol className="process-grid">
      {steps.map((step, index) => (
        <li key={step.title}>
          <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  )
}

export function ContactCta({
  eyebrow = 'Uw vraag bespreken?',
  title = 'Vertel ons waarmee we kunnen helpen.',
  text = 'Neem contact op voor een eerste afstemming over uw woning, pand of storing.',
}: {
  eyebrow?: string
  title?: string
  text?: string
}) {
  return (
    <section className="contact-cta">
      <div className="container contact-cta__inner">
        <div>
          <span className="eyebrow eyebrow--light">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="contact-cta__actions">
          <Link className="button button--light" to="/contact">Contact opnemen <ArrowRight aria-hidden="true" /></Link>
          <a href="tel:+31850606663">Of bel 085 060 66 63</a>
        </div>
      </div>
    </section>
  )
}
