import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

export function ContactDemoForm() {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="demo-form-shell" aria-labelledby="contact-form-title">
      <span className="demo-badge">Preview</span>
      <h2 id="contact-form-title">Vertel kort waarmee we kunnen helpen</h2>
      <p>
        Dit formulier is een visuele demo en verstuurt of bewaart geen gegevens.
      </p>
      <form
        className="contact-form"
        onSubmit={(event) => {
          event.preventDefault()
          event.currentTarget.reset()
          setConfirmed(true)
        }}
      >
        <label>
          <span>Naam</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>E-mailadres</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Uw vraag</span>
          <textarea name="message" rows={4} required />
        </label>
        <button className="button button--light" type="submit">
          Demo controleren <Send aria-hidden="true" />
        </button>
      </form>
      {confirmed ? (
        <p className="form-status" role="status">
          <CheckCircle2 aria-hidden="true" /> Demo gereed: er is niets verzonden
          of opgeslagen.
        </p>
      ) : null}
    </div>
  )
}
