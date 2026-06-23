import { Bell } from 'lucide-react';

export default function EmergencySmsCallout() {
  return (
    <section className="section-band-muted section-padding">
      <div className="max-w-7xl page-container">
        <div className="relative bg-gradient-to-r from-primary/5 to-primary/10 border-2 border-primary/30 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Bell size={24} className="text-primary" aria-hidden />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg text-foreground">Emergency SMS Alerts</h3>
                  <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    Coming in Phase 2
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Subscribe for flood and security alerts delivered directly to your phone.
                  Critical updates when connectivity is limited.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:shrink-0 md:w-auto">
              <input
                type="tel"
                placeholder="Phone number"
                disabled
                aria-label="Phone number for SMS alerts"
                className="form-input border-primary/30 bg-white/60 cursor-not-allowed w-full"
              />
              <button
                disabled
                className="bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-semibold cursor-not-allowed min-h-[44px] whitespace-nowrap w-full sm:w-auto"
                title="Coming in Phase 2"
              >
                Notify me when available
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
