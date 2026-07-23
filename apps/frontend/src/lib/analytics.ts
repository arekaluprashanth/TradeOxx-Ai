// Mock wrapper for PostHog or Mixpanel event tracking
// Used to track feature usage, retention, and conversion metrics in V1.0

type EventProperties = Record<string, string | number | boolean | null>;

class AnalyticsService {
  private isEnabled: boolean = false;

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production' && !!process.env.NEXT_PUBLIC_ANALYTICS_KEY;
  }

  identify(userId: string, traits?: EventProperties) {
    if (!this.isEnabled) {
      console.debug('[Analytics Mock] identify:', userId, traits);
      return;
    }
    // Future: mixpanel.identify(userId)
    // Future: mixpanel.people.set(traits)
  }

  track(eventName: string, properties?: EventProperties) {
    if (!this.isEnabled) {
      console.debug('[Analytics Mock] track:', eventName, properties);
      return;
    }
    // Future: mixpanel.track(eventName, properties)
  }

  pageView(url: string) {
    this.track('$pageview', { url });
  }
}

export const analytics = new AnalyticsService();
