import { useRef, useState } from 'react'
import { ArrowDownRight, CheckCircle2, LoaderCircle, Send } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { api } from '../services/api.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import './ContactPage.css'

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  message: '',
}

const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  company: 160,
  service: 120,
  budget: 80,
  message: 5000,
}

const FIELD_LABELS = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  company: 'Company',
  service: 'Service',
  budget: 'Budget',
  message: 'Message',
}

function validateField(name, value) {
  const trimmedValue = value.trim()

  if (name === 'name') {
    if (!trimmedValue) return 'Enter your name.'
    if (trimmedValue.length < 2) return 'Name must be at least 2 characters.'
  }

  if (name === 'email') {
    if (!trimmedValue) return 'Enter your email address.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) return 'Enter a valid email address.'
  }

  if (name === 'phone' && trimmedValue && !/^[+()\d\s.-]{7,30}$/.test(trimmedValue)) {
    return 'Enter a valid phone number, including at least 7 characters.'
  }

  if (name === 'message') {
    if (!trimmedValue) return 'Tell us a little about your project.'
    if (trimmedValue.length < 10) return 'Message must be at least 10 characters.'
  }

  if (trimmedValue.length > FIELD_LIMITS[name]) {
    return `Use ${FIELD_LIMITS[name]} characters or fewer.`
  }

  return ''
}

function FormField({ as: Element = 'input', name, label, value, onChange, onBlur, error, required = false, hint, inputRef, fullWidth = false, children, ...props }) {
  const id = `contact-${name}`
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={`contact-field${fullWidth ? ' contact-field--full' : ''}`}>
      <label htmlFor={id} className="contact-field__label">
        {label}
        {required && <span className="contact-field__required" aria-hidden="true">Required</span>}
      </label>
      <Element
        {...props}
        ref={inputRef}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`contact-field__control${error ? ' contact-field__control--invalid' : ''}`}
      >
        {children}
      </Element>
      {hint && <span id={hintId} className="contact-field__hint">{hint}</span>}
      {error && <span id={errorId} className="contact-field__error">{error}</span>}
    </div>
  )
}

function ContactPage() {
  const [values, setValues] = useState({ ...EMPTY_FORM })
  const [errors, setErrors] = useState({})
  const [validationAnnouncement, setValidationAnnouncement] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const formRef = useRef(null)
  const fieldRefs = useRef({})
  useDocumentTitle(
    'Contact',
    'Tell Nexora Labs about your product, software, or AI challenge and start a conversation with our team.',
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setSubmitError('')
    setValidationAnnouncement('')
    setIsSuccess(false)

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    const error = validateField(name, value)
    setErrors((current) => ({ ...current, [name]: error }))
    setValidationAnnouncement(error ? `${FIELD_LABELS[name]}: ${error}` : '')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    const nextErrors = Object.fromEntries(
      Object.entries(values)
        .map(([name, value]) => [name, validateField(name, value)])
        .filter(([, message]) => message),
    )

    setErrors(nextErrors)
    setSubmitError('')
    setIsSuccess(false)

    const firstInvalidField = Object.keys(nextErrors)[0]
    if (firstInvalidField) {
      setValidationAnnouncement(
        `Please correct the following fields: ${Object.entries(nextErrors)
          .map(([name, message]) => `${FIELD_LABELS[name]}: ${message}`)
          .join(' ')}`,
      )
      fieldRefs.current[firstInvalidField]?.focus()
      return
    }

    setValidationAnnouncement('')
    setIsSubmitting(true)
    try {
      await api.contact.create(Object.fromEntries(
        Object.entries(values).map(([name, value]) => [name, value.trim()]),
      ))
      setValues({ ...EMPTY_FORM })
      setErrors({})
      setValidationAnnouncement('')
      setIsSuccess(true)
      formRef.current?.reset()
    } catch (error) {
      setSubmitError(error.message || 'Your message could not be sent. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-page__inner page-container">
        <section className="contact-page__intro" aria-labelledby="contact-title">
          <p className="contact-page__eyebrow"><span /> START A CONVERSATION</p>
          <h1 id="contact-title">Let&apos;s make the next move clearer.</h1>
          <p className="contact-page__description">Tell us what you&apos;re working through. We&apos;ll use the details to understand the challenge and where we can help.</p>
          <div className="contact-page__note">
            <ArrowDownRight size={18} aria-hidden="true" />
            <p>A few useful details are enough to get started. You can leave anything that doesn&apos;t apply blank.</p>
          </div>
          <div className="contact-page__index" aria-hidden="true"><span>NXR / CONTACT</span><span>01 — 07</span></div>
        </section>

        <section className="contact-form-panel" aria-label="Project inquiry form">
          {isSuccess && (
            <div className="contact-success">
              <CheckCircle2 size={23} aria-hidden="true" />
              <div>
                <h2>Your message has been sent.</h2>
                <p role="status">Thanks for getting in touch. Your form is ready if you&apos;d like to send another message.</p>
              </div>
            </div>
          )}

          {submitError && <p className="contact-form__error" role="alert">{submitError}</p>}
          {validationAnnouncement && <p className="visually-hidden" role="alert">{validationAnnouncement}</p>}

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
            <div className="contact-form__heading">
              <p>PROJECT INQUIRY / NEXORA LABS</p>
              <h2>What can we help you build?</h2>
            </div>

            <div className="contact-form__grid">
              <FormField name="name" label="Name" autoComplete="name" maxLength={FIELD_LIMITS.name} value={values.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} required inputRef={(element) => { fieldRefs.current.name = element }} />
              <FormField name="email" label="Email" type="email" autoComplete="email" maxLength={FIELD_LIMITS.email} value={values.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} required inputRef={(element) => { fieldRefs.current.email = element }} />
              <FormField name="phone" label="Phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={FIELD_LIMITS.phone} value={values.phone} onChange={handleChange} onBlur={handleBlur} error={errors.phone} hint="Optional" inputRef={(element) => { fieldRefs.current.phone = element }} />
              <FormField name="company" label="Company" autoComplete="organization" maxLength={FIELD_LIMITS.company} value={values.company} onChange={handleChange} onBlur={handleBlur} error={errors.company} hint="Optional" inputRef={(element) => { fieldRefs.current.company = element }} />
              <FormField as="select" name="service" label="Service" value={values.service} onChange={handleChange} onBlur={handleBlur} error={errors.service} hint="Optional" inputRef={(element) => { fieldRefs.current.service = element }}>
                <option value="">Choose a service</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                <option value="AI & Automation">AI &amp; Automation</option>
                <option value="Custom Software">Custom Software</option>
              </FormField>
              <FormField as="select" name="budget" label="Budget" value={values.budget} onChange={handleChange} onBlur={handleBlur} error={errors.budget} hint="Optional" inputRef={(element) => { fieldRefs.current.budget = element }}>
                <option value="">Choose a range</option>
                <option value="Under $5,000">Under $5,000</option>
                <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                <option value="$50,000+">$50,000+</option>
                <option value="Not sure yet">Not sure yet</option>
              </FormField>
              <FormField as="textarea" name="message" label="Message" rows={5} maxLength={FIELD_LIMITS.message} value={values.message} onChange={handleChange} onBlur={handleBlur} error={errors.message} required hint="At least 10 characters" fullWidth inputRef={(element) => { fieldRefs.current.message = element }} />
            </div>

            <div className="contact-form__footer">
              <p>Required fields are marked. Your details are used only to respond to this inquiry.</p>
              <motion.button className="contact-submit" type="submit" disabled={isSubmitting} whileHover={prefersReducedMotion || isSubmitting ? undefined : { y: -1, scale: 1.01 }} whileFocus={prefersReducedMotion || isSubmitting ? undefined : { y: -1 }} whileTap={prefersReducedMotion || isSubmitting ? undefined : { scale: 0.985 }} transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}>
                {isSubmitting ? <LoaderCircle size={16} className="contact-submit__spinner" aria-hidden="true" /> : <Send size={15} aria-hidden="true" />}
                {isSubmitting ? 'Sending…' : 'Send inquiry'}
              </motion.button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default ContactPage