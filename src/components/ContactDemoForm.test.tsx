import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ContactDemoForm } from './ContactDemoForm'

describe('accessible demo form validation', () => {
  it('rejects whitespace-only values, describes errors and moves focus to the first invalid input', async () => {
    const user = userEvent.setup()
    render(<ContactDemoForm />)
    await user.type(screen.getByLabelText('Naam'), '   ')
    await user.click(screen.getByRole('button', { name: 'Demo controleren' }))
    const name = screen.getByLabelText('Naam')
    expect(name).toHaveFocus()
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(name).toHaveAccessibleDescription('Vul uw naam in.')
    expect(screen.getByLabelText('E-mailadres')).toHaveAccessibleDescription('Vul uw e-mailadres in.')
    expect(screen.getByLabelText('Uw vraag')).toHaveAccessibleDescription('Beschrijf kort uw vraag.')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('does not accept an invalid address and clears errors after a valid local-only retry', async () => {
    const user = userEvent.setup()
    const fetch = vi.spyOn(globalThis, 'fetch')
    const local = vi.spyOn(Storage.prototype, 'setItem')
    render(<ContactDemoForm />)
    await user.type(screen.getByLabelText('Naam'), 'Synthetische bezoeker')
    await user.type(screen.getByLabelText('E-mailadres'), 'ongeldig')
    await user.type(screen.getByLabelText('Uw vraag'), 'Synthetische testvraag.')
    await user.click(screen.getByRole('button', { name: 'Demo controleren' }))
    const email = screen.getByLabelText('E-mailadres')
    expect(email).toHaveFocus()
    expect(email).toHaveAccessibleDescription('Vul een geldig e-mailadres in.')
    await user.clear(email)
    await user.type(email, 'demo@example.com')
    await user.click(screen.getByRole('button', { name: 'Demo controleren' }))
    expect(email).not.toHaveAttribute('aria-invalid')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('niets verzonden of opgeslagen')
    expect(email).toHaveValue('')
    expect(fetch).not.toHaveBeenCalled()
    expect(local).not.toHaveBeenCalled()
    fetch.mockRestore()
    local.mockRestore()
  })
})
