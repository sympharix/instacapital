import { useNavigate } from 'react-router-dom';

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBtF7nUe17Qy2GuUPxPnlVwv0FQ4Tbm_7IzJtBpg6yHotkZpkZMSTnlwo_esabPMs6dgQ5GjrsY8vfwGEx-Cer8Q5KT8pYsT6gDYjgvbiDcF9IelJdKHGWZsRv1WIJ-nXyQsk1lueiFDTg1LWCObEPrPmAkvEkkcbju0GgZTa4rXMk7Uf67zYBA7Vf0erNpZupBEUVdyI_zSZDnhla8xNQzaenq6bS8QhTLeHi9II19fPTdKoQUuY1QKQ';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background antialiased overflow-x-hidden min-h-screen flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── TopNavBar ─────────────────────────────────────────── */}
      <header className="bg-surface shadow-sm w-full sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-10 max-w-[1200px] mx-auto h-20">
          <div className="flex items-center gap-4">
            <img alt="Instacapital Logo" className="h-10 w-10 object-contain rounded-full border border-outline-variant" src={LOGO_URL} />
            <span className="font-bold text-primary tracking-tight hidden md:block text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Instacapital
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-primary border-b-2 border-primary pb-1 text-sm font-medium hover:text-primary transition-colors duration-200" href="#">Home</a>
            <a className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors duration-200 cursor-pointer" onClick={() => navigate('/customer/login')}>Loans</a>
            <a className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors duration-200" href="#">About Us</a>
          </nav>
          <button
            onClick={() => navigate('/customer/login')}
            className="bg-primary text-on-primary text-sm font-medium px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
          >
            Login
          </button>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero Section ──────────────────────────────────────── */}
        <section className="relative w-full min-h-[80vh] flex items-center pt-20 pb-32">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              className="w-full h-full object-cover opacity-20 object-top"
              alt="Kolkata skyline at golden hour"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbk2Hv5MO03ekR0qaCEEZRVOnBHgBfKM13EeKfMqKLVZaGawUTgEWK3sW3rLamP7IvMIgcG4WgptSF26PavhMGQjcQ7J7D_A8BNq0VwVum7fwvlK7Phur3q2_f-NfHQR_GVZDiNGntBGrDgxUllyWH8Qi4gfjRzVm-oBZpvw1l8uoDtlQN2pvJnb1njbpnmIt1TPHU5AyqszyJ4-jx8UTCVIHmvFNkk5kLbKUwr9lNPI8YpUFuLlnMtw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/40"></div>
          </div>

          <div className="relative z-10 w-full px-10 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left text */}
            <div className="col-span-1 md:col-span-6 lg:col-span-5 flex flex-col items-start gap-8">
              <div className="inline-flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full border border-outline-variant shadow-sm">
                <span className="material-symbols-outlined fill text-secondary" style={{ fontSize: '14px' }}>verified</span>
                <span className="text-on-surface-variant text-sm font-medium">Trusted in Kolkata</span>
              </div>
              <h1 className="font-bold text-on-surface tracking-tight leading-tight text-5xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Easy Loans for Your{' '}
                <span className="text-primary block mt-2">Big Dreams.</span>
              </h1>
              <p className="text-on-surface-variant text-lg leading-7 max-w-lg">
                Fluid, transparent, and built on trust. Access the capital you need to grow your business, buy your home, or manage personal expenses with competitive rates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  onClick={() => navigate('/customer/login')}
                  className="bg-secondary text-on-secondary text-sm font-medium px-8 py-4 rounded-xl hover:opacity-90 transition-opacity shadow-sm flex justify-center items-center gap-2"
                >
                  Enquire Now
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </button>
                <button className="bg-surface text-primary border border-primary text-sm font-medium px-8 py-4 rounded-xl hover:bg-surface-container-low transition-colors flex justify-center items-center">
                  Calculate EMI
                </button>
              </div>
            </div>

            {/* Quick Estimate Widget */}
            <div className="col-span-1 md:col-span-6 lg:col-span-6 lg:col-start-7 mt-12 md:mt-0 relative">
              <div className="bg-white border border-outline-variant rounded-xl p-8 shadow-[0_4px_12px_rgba(0,50,125,0.05)] w-full max-w-md mx-auto md:ml-auto md:mr-0">
                <div className="flex justify-between items-center mb-8 border-b border-outline-variant pb-4">
                  <h3 className="text-on-surface text-2xl font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Quick Estimate</h3>
                  <span className="material-symbols-outlined text-primary">calculate</span>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-on-surface-variant text-sm font-medium">Loan Amount</label>
                      <span className="text-on-surface text-sm font-semibold">₹ 5,00,000</span>
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-1/2 rounded-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-on-surface-variant text-sm font-medium">Tenure (Months)</label>
                      <span className="text-on-surface text-sm font-semibold">36</span>
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-1/3 rounded-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-outline-variant flex justify-between items-end">
                    <div>
                      <p className="text-on-surface-variant text-xs font-semibold mb-1 uppercase tracking-wider">Estimated EMI</p>
                      <p className="text-[32px] leading-tight font-bold text-secondary">₹ 16,500</p>
                    </div>
                    <button className="text-primary text-sm font-medium hover:underline">Full Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Loan Products Section ─────────────────────────────── */}
        <section className="w-full px-10 max-w-[1200px] mx-auto py-20 bg-surface">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-on-surface mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Our Loan Products</h2>
            <p className="text-on-surface-variant text-lg leading-7">Tailored financial solutions designed to provide momentum for your specific needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6" style={{ gridAutoRows: 'minmax(280px, auto)' }}>
            {/* Business Loan – wide card */}
            <div className="col-span-1 md:col-span-8 bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm group hover:shadow-[0_4px_12px_rgba(0,50,125,0.08)] transition-all duration-300 flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-48 md:h-auto overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Business professionals shaking hands" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVrwxubKBsKXZ6wr7P9GPoWrcjui5F3mE4-hllkoSWfZbZsoXJeUCkyKzLpjKmwVkGE5FMViF4Aj6CkQ3oa_PlhUPBpqSCCDTWQwi84kBGP533GXaYzFU7uGys9pWOU24gQDBhZoFSLdRMCj4eq7zdPWBoZH6B6V_2VdXaP84PIlwyDiX7Ljb3PBT8RpAxdX6H8lDC1gQScd9naQdWfIcA4tHIpOvQMPHT7IZ3aA4vLoYB9ZE8w5gskw" />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-surface-container w-12 h-12 rounded-xl flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">domain</span>
                    </div>
                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20 uppercase tracking-wide">From 10.5% p.a.</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-on-surface mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Business Loans</h3>
                  <p className="text-on-surface-variant text-base mb-6">Fuel your company's expansion with flexible capital designed for local enterprises in the Bengal region.</p>
                </div>
                <a className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all" href="#">
                  Explore Business Capital <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Personal Loan */}
            <div className="col-span-1 md:col-span-4 bg-white border border-outline-variant rounded-xl p-8 shadow-sm hover:shadow-[0_4px_12px_rgba(0,50,125,0.08)] transition-all duration-300 flex flex-col">
              <div className="bg-surface-container w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined">person</span>
              </div>
              <h3 className="text-2xl font-semibold text-on-surface mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Personal Loans</h3>
              <p className="text-on-surface-variant text-base mb-6 flex-grow">Quick, unsecured funds for life's immediate necessities, from medical emergencies to weddings.</p>
              <div className="mt-auto pt-6 border-t border-outline-variant/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-on-surface-variant text-xs font-semibold">Interest Rate</span>
                  <span className="text-on-surface text-sm font-semibold">From 11.9% p.a.</span>
                </div>
                <a className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all" href="#">
                  Apply Now <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Home Loan */}
            <div className="col-span-1 md:col-span-6 bg-white border border-outline-variant rounded-xl p-8 shadow-sm hover:shadow-[0_4px_12px_rgba(0,50,125,0.08)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-surface-container w-12 h-12 rounded-xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">real_estate_agent</span>
                  </div>
                  <span className="bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full border border-secondary/20 uppercase tracking-wide">Popular</span>
                </div>
                <h3 className="text-2xl font-semibold text-on-surface mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Home Loans</h3>
                <p className="text-on-surface-variant text-base mb-6">Make your dream home a reality with extended tenures and highly competitive rates.</p>
              </div>
              <div className="mt-auto pt-4 flex justify-between items-center">
                <span className="text-on-surface text-sm font-semibold">Up to 30 Years</span>
                <a className="inline-flex items-center gap-2 text-primary text-sm font-semibold" href="#">
                  View Details <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
                </a>
              </div>
            </div>

            {/* Micro Finance */}
            <div className="col-span-1 md:col-span-6 bg-white border border-outline-variant rounded-xl p-8 shadow-sm hover:shadow-[0_4px_12px_rgba(0,50,125,0.08)] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="bg-surface-container w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined">storefront</span>
                </div>
                <h3 className="text-2xl font-semibold text-on-surface mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Micro Finance</h3>
                <p className="text-on-surface-variant text-base mb-6">Small ticket loans designed specifically for local shop owners and independent tradespeople in Kolkata.</p>
              </div>
              <div className="mt-auto pt-4 flex justify-between items-center">
                <span className="text-on-surface text-sm font-semibold">Minimal Docs</span>
                <a className="inline-flex items-center gap-2 text-primary text-sm font-semibold" href="#">
                  View Details <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ─────────────────────────────────────── */}
        <section className="w-full bg-surface-container-low py-20 border-y border-outline-variant/30">
          <div className="px-10 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-on-surface mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Why Kolkata Trusts Instacapital
              </h2>
              <div className="space-y-8">
                {[
                  { icon: 'speed', title: 'Lightning Fast Approvals', desc: 'Our digital-first approach means less waiting and more doing. Get in-principle approval within hours, not days.', color: 'text-primary', bg: 'bg-primary/10' },
                  { icon: 'security', title: 'Institutional Security', desc: 'Regulated, transparent, and secure. We operate with strict compliance, delivered with modern ease.', color: 'text-secondary', bg: 'bg-secondary/10', fill: true },
                  { icon: 'location_on', title: 'Local Expertise', desc: 'We understand the Bengal market. Our terms and underwriting reflect the realities of Kolkata.', color: 'text-primary', bg: 'bg-primary/10' },
                ].map((item) => (
                  <div className="flex gap-4" key={item.title}>
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${item.bg} flex items-center justify-center ${item.color} mt-1`}>
                      <span className={`material-symbols-outlined${item.fill ? ' fill' : ''}`}>{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-on-surface mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h4>
                      <p className="text-on-surface-variant text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
              <div className="relative bg-surface/60 backdrop-blur-md border border-white/50 rounded-2xl p-10 shadow-[0_8px_32px_rgba(0,50,125,0.05)]">
                <span className="material-symbols-outlined text-primary/30 mb-6 block" style={{ fontSize: '36px' }}>format_quote</span>
                <p className="text-xl leading-8 text-on-surface italic mb-8">
                  "Instacapital understood my expansion needs when traditional banks asked for endless paperwork. The process was entirely transparent, and the funds hit my account in exactly 48 hours."
                </p>
                <div className="flex items-center gap-4">
                  <img className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" alt="Rohan Mukherjee" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmdX9_ouDJps6PzJwrzxQz8O189CbNi3jePMiCejvTKX3GvympvIdnPfaQFDYyV-OatEgOEN3DitDCiJnjppsAg1nhKq4hxMKAm8IOmMq1ZpAycgRxBkWPlgmyDaniCDdt1Ij-pwjuTZU__fux0Hh_9rpyujEU_wZdqpadr1DSRPGr_weQx5z0TlDogXKFIw48fxb0Ze6ugdH_ZwmO3vhyxldGaBMmUl36RnCS7Bgls94YtXDJg4PClA" />
                  <div>
                    <h5 className="text-sm font-bold text-on-surface">Rohan Mukherjee</h5>
                    <p className="text-xs text-on-surface-variant">Director, TechNova Solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="bg-surface-container-highest border-t border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full px-10 py-12 max-w-[1200px] mx-auto">
          <div className="md:col-span-1 flex flex-col gap-4">
            <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'Montserrat, sans-serif' }}>Instacapital</span>
            <p className="text-sm text-on-surface-variant mt-2 max-w-xs">Empowering financial fluidity for individuals and businesses across Bengal.</p>
          </div>
          <div className="md:col-span-2 flex flex-col md:flex-row gap-8 md:gap-16 justify-center">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold text-on-surface mb-2">Legal</span>
              <a className="text-on-surface-variant text-sm hover:text-primary underline decoration-2 underline-offset-4 transition-all" href="#">Privacy Policy</a>
              <a className="text-on-surface-variant text-sm hover:text-primary underline decoration-2 underline-offset-4 transition-all" href="#">Terms of Service</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold text-on-surface mb-2">Company</span>
              <a className="text-on-surface-variant text-sm hover:text-primary underline decoration-2 underline-offset-4 transition-all" href="#">Contact Us</a>
              <a className="text-on-surface-variant text-sm hover:text-primary underline decoration-2 underline-offset-4 transition-all" href="#">FAQ</a>
              <a className="text-on-surface-variant text-sm hover:text-primary underline decoration-2 underline-offset-4 transition-all" href="#">Careers</a>
            </div>
          </div>
          <div className="md:col-span-1 flex flex-col justify-end md:items-end mt-8 md:mt-0">
            <p className="text-xs text-on-surface-variant text-left md:text-right">
              © 2024 Instacapital Loan Agency.<br />All rights reserved. Kolkata, West Bengal.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
