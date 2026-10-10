import { useHydrated } from './useHydrated'
import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

type Field = 'name' | 'email' | 'message'
export function ContactDemoForm() {
  const interactive = useHydrated()
  const [confirmed, setConfirmed] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  return (
    <div className="demo-form-shell" aria-labelledby="contact-form-title">
      <span className="demo-badge">Preview</span>
      <h2 id="contact-form-title">Vertel kort waarmee we kunnen helpen</h2>
      <p id="demo-form-note">Dit formulier is een visuele demo en verstuurt of bewaart geen gegevens.</p>
      <form className="contact-form" noValidate aria-describedby="demo-form-note" onSubmit={event => {
        event.preventDefault()
        const form = event.currentTarget
        const fields: Field[] = ['name', 'email', 'message']
        const invalid: Partial<Record<Field, string>> = {}
        for (const field of fields) {
          const element = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement
          if (!element.value.trim()) invalid[field] = { name: 'Vul uw naam in.', email: 'Vul uw e-mailadres in.', message: 'Beschrijf kort uw vraag.' }[field]
          else if (!element.validity.valid) invalid[field] = 'Vul een geldig e-mailadres in.'
        }
        setErrors(invalid)
        setConfirmed(false)
        const first = fields.find(field => invalid[field])
        if (first) (form.elements.namedItem(first) as HTMLElement).focus()
        else { form.reset(); setConfirmed(true) }
      }}>
        <div className="form-field">
          <label htmlFor="contact-name">Naam</label>
          <input id="contact-name" name="name" autoComplete="name" required aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
          {errors.name && <p id="contact-name-error" className="field-error">{errors.name}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">E-mailadres</label>
          <input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" required aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
          {errors.email && <p id="contact-email-error" className="field-error">{errors.email}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="contact-message">Uw vraag</label>
          <textarea id="contact-message" name="message" rows={4} required aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
          {errors.message && <p id="contact-message-error" className="field-error">{errors.message}</p>}
        </div>
        {Object.keys(errors).length > 0 && <p role="alert" className="sr-only">Controleer de gemarkeerde velden. Er is niets verzonden.</p>}
        <button className="button button--light" type="submit" disabled={!interactive}>Demo controleren <Send aria-hidden="true" /></button>
      </form>
      {confirmed && <p className="form-status" role="status"><CheckCircle2 aria-hidden="true" /> Demo gereed: er is niets verzonden of opgeslagen.</p>}
    </div>
  )
}
