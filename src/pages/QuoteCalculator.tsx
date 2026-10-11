import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type ServiceType = 'regular' | 'deep' | 'move-in-out' | 'car-detailing' | 'commercial' | '';

const SERVICES: { value: Exclude<ServiceType, ''>; title: string; desc: string }[] = [
  { value: 'regular', title: 'Regular / Recurring Cleaning', desc: 'Weekly, bi-weekly or one-time tidy-up for your home or apartment.' },
  { value: 'deep', title: 'Deep / Seasonal Cleaning', desc: 'Extra attention to baseboards, fixtures and built-up grime.' },
  { value: 'move-in-out', title: 'Move-In / Move-Out Cleaning', desc: 'Thorough clean as you leave or settle into a new space.' },
  { value: 'car-detailing', title: 'Interior Car Detailing', desc: 'Deep interior clean for sedan, SUV, truck or van.' },
  { value: 'commercial', title: 'Light Commercial / Office', desc: 'Dependable cleaning for offices and small workspaces.' },
];

const ADDONS = [
  { value: 'oven', label: 'Oven cleaning (+$35)' },
  { value: 'fridge', label: 'Fridge cleaning (+$35)' },
  { value: 'behind-appliances', label: 'Behind appliances (fridge & oven) (+$50)' },
];

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<ServiceType>('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [address, setAddress] = useState('');
  const [addons, setAddons] = useState<string[]>([]);
  const [vehicleType, setVehicleType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isCar = serviceType === 'car-detailing';

  function toggleAddon(v: string) {
    setAddons((prev) => (prev.includes(v) ? prev.filter((a) => a !== v) : [...prev, v]));
  }

  function validateStep(): string {
    if (step === 1) {
      if (!serviceType) return 'Please choose a service to continue.';
    }
    if (step === 2) {
      if (isCar) {
        if (!vehicleType) return 'Please select your vehicle type.';
      } else {
        if (bedrooms !== '' && (!Number.isInteger(Number(bedrooms)) || Number(bedrooms) < 0 || Number(bedrooms) > 20))
          return 'Bedrooms looks invalid.';
        if (bathrooms !== '' && (isNaN(Number(bathrooms)) || Number(bathrooms) < 0 || Number(bathrooms) > 20))
          return 'Bathrooms looks invalid.';
      }
    }
    if (step === 3) {
      if (name.trim().length < 2) return 'Please enter your name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email address.';
    }
    return '';
  }

  function next() {
    const msg = validateStep();
    if (msg) {
      setError(msg);
      return;
    }
    setError('');
    setStep((s) => Math.min(3, s + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function back() {
    setError('');
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg = validateStep();
    if (msg) {
      setError(msg);
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const mergedNotes = isCar
        ? [`Vehicle: ${vehicleType}`, notes.trim()].filter(Boolean).join(' — ')
        : notes.trim();

      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          address: address.trim(),
          service_type: serviceType,
          bedrooms: isCar || bedrooms === '' ? null : Number(bedrooms),
          bathrooms: isCar || bathrooms === '' ? null : Number(bathrooms),
          addons: isCar ? [] : addons,
          preferred_date: preferredDate.trim(),
          notes: mergedNotes,
          website: honeypot, // honeypot — must stay empty
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(data.error || 'Could not save your request. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="bg-[#f3f3f6] py-12 md:py-16 px-5">
          <div className="max-w-2xl mx-auto text-primary">
            <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl mb-4">Request received</h1>
              <p className="text-lg mb-6">
                Thanks, {name.trim().split(' ')[0] || 'there'}! We've got your estimate request and will get back to you{' '}
                <strong>within one business day</strong>.
              </p>
              <div className="text-left bg-[#f3f3f6] rounded-2xl p-6 mb-6">
                <h2 className="font-semibold mb-3">What happens next</h2>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>We review your details and prepare your free estimate.</li>
                  <li>You'll receive your quote by email at {email.trim()}.</li>
                  <li>Reply to confirm and we'll lock in your preferred date.</li>
                </ol>
              </div>
              <p className="text-sm">
                Need it sooner? Call us at{' '}
                <a href="tel:+13435511899" className="underline font-semibold">
                  (343) 551-1899
                </a>
                .
              </p>
            </section>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-[#f3f3f6] py-12 md:py-16 px-5">
        <div className="max-w-3xl mx-auto text-primary">
          <h1 className="text-3xl md:text-4xl text-center mb-4">Request a Free Estimate</h1>
          <p className="text-center text-sm mb-8 opacity-70">Three quick steps — takes about a minute.</p>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm ${
                    step >= n ? 'bg-primary text-white' : 'bg-white text-primary/50'
                  }`}
                >
                  {n}
                </div>
                <span className={`text-sm hidden sm:inline ${step >= n ? 'font-semibold' : 'opacity-50'}`}>
                  {n === 1 ? 'Service' : n === 2 ? 'Details' : 'Contact'}
                </span>
                {n < 3 && <div className="w-8 h-px bg-primary/20 mx-1" />}
              </div>
            ))}
          </div>

          <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
            <form onSubmit={submit}>
              {/* Honeypot — invisible to humans */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none' }}
                aria-hidden="true"
              />

              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">What do you need cleaned?</h2>
                  <div className="grid gap-3">
                    {SERVICES.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setServiceType(s.value)}
                        className={`text-left p-4 rounded-2xl border-2 transition ${
                          serviceType === s.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/40'
                        }`}
                      >
                        <div className="font-semibold">{s.title}</div>
                        <div className="text-sm opacity-70 mt-1">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Tell us about the job</h2>
                  {isCar ? (
                    <div className="grid gap-4">
                      <label className="block">
                        <span className="text-sm font-medium">Vehicle type *</span>
                        <select
                          value={vehicleType}
                          onChange={(e) => setVehicleType(e.target.value)}
                          className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                        >
                          <option value="">Select…</option>
                          <option value="Sedan / Coupe">Sedan / Coupe</option>
                          <option value="SUV">SUV (+$20)</option>
                          <option value="Truck / Van / Minivan">Truck / Van / Minivan (+$30)</option>
                        </select>
                      </label>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-sm font-medium">Bedrooms</span>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          value={bedrooms}
                          onChange={(e) => setBedrooms(e.target.value)}
                          placeholder="e.g. 3"
                          className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium">Bathrooms</span>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          step="0.5"
                          value={bathrooms}
                          onChange={(e) => setBathrooms(e.target.value)}
                          placeholder="e.g. 2"
                          className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                        />
                      </label>
                      <div className="sm:col-span-2">
                        <span className="text-sm font-medium">Add-ons (optional)</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {ADDONS.map((a) => (
                            <button
                              key={a.value}
                              type="button"
                              onClick={() => toggleAddon(a.value)}
                              className={`px-4 py-2 rounded-full border text-sm ${
                                addons.includes(a.value)
                                  ? 'bg-primary text-white border-primary'
                                  : 'border-gray-300 hover:border-primary/50'
                              }`}
                            >
                              {a.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 mt-4">
                    <label className="block">
                      <span className="text-sm font-medium">Address</span>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street, city"
                        className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium">Preferred date (optional)</span>
                      <input
                        type="text"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        placeholder="e.g. Next Saturday morning"
                        className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium">Anything else? (optional)</span>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        placeholder="Pets, parking, special requests…"
                        className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                      />
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Where should we send your estimate?</h2>
                  <div className="grid gap-4">
                    <label className="block">
                      <span className="text-sm font-medium">Full name *</span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium">Email *</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium">Phone (optional)</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(343) 555-1234"
                        className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                      />
                    </label>
                  </div>
                  <p className="text-xs opacity-60 mt-4">
                    We'll only use your details to prepare and send your estimate. No spam, ever.
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm" role="alert">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between mt-8">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="px-6 py-3 rounded-full border border-gray-300 font-semibold hover:border-primary"
                  >
                    Back
                  </button>
                ) : (
                  <span />
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="px-8 py-3 rounded-full bg-primary text-white font-semibold hover:opacity-90"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 rounded-full bg-primary text-white font-semibold hover:opacity-90 disabled:opacity-50"
                  >
                    {submitting ? 'Sending…' : 'Request my estimate'}
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
