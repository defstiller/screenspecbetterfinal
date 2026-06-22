(() => {
  const TRACKING_CONFIG = {
    adsId: 'AW-804324130',
    adsLeadSendTo: 'AW-804324130/j4mWCLHr94gcEKKGxP8C',
    adsPhoneSendTo: 'AW-804324130/a7YfCLnl6IgcEKKGxP8C',
    adsPhoneValue: 1.0,
    adsPhoneCurrency: 'USD',
    // Add a GA4 measurement ID here later if you want GA4 event reporting.
    ga4Id: 'G-NHEJ41TJXF'
  };

  function ensureDataLayer() {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
    }
  }

  function loadTag() {
    const measurementId = TRACKING_CONFIG.ga4Id || TRACKING_CONFIG.adsId;
    if (!measurementId) return;
    if (document.querySelector('script[data-site-gtag]')) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.setAttribute('data-site-gtag', 'true');
    document.head.appendChild(script);
  }

  function initConfigs() {
    ensureDataLayer();
    loadTag();
    window.gtag('js', new Date());

    if (TRACKING_CONFIG.adsId && !window.__siteAdsConfigured) {
      window.gtag('config', TRACKING_CONFIG.adsId);
      window.__siteAdsConfigured = true;
    }

    if (TRACKING_CONFIG.ga4Id && !window.__siteGa4Configured) {
      window.gtag('config', TRACKING_CONFIG.ga4Id);
      window.__siteGa4Configured = true;
    }
  }

  function trackEvent(name, params = {}) {
    if (!window.gtag) return;
    window.gtag('event', name, params);
  }

  function trackGa4Event(name, params = {}) {
    const eventParams = {
      ...params
    };

    if (TRACKING_CONFIG.ga4Id) {
      eventParams.send_to = TRACKING_CONFIG.ga4Id;
    }

    trackEvent(name, eventParams);
  }

  function trackLeadConversion(details = {}) {
    const source = details.source || 'website';
    const leadType = details.leadType || 'quote_request';
    const service = details.service || '';

    trackGa4Event('generate_lead', {
      event_category: 'lead',
      event_label: `${source}_${leadType}`,
      lead_source: source,
      lead_type: leadType,
      service,
      page_path: window.location.pathname
    });

    if (TRACKING_CONFIG.adsLeadSendTo) {
      trackEvent('conversion', {
        send_to: TRACKING_CONFIG.adsLeadSendTo
      });
    }
  }

  function trackPhoneClick(details = {}) {
    const label = details.label || 'phone_click';

    trackGa4Event('phone_click', {
      event_category: 'engagement',
      event_label: label,
      page_path: window.location.pathname
    });

    if (TRACKING_CONFIG.adsPhoneSendTo) {
      trackEvent('conversion', {
        send_to: TRACKING_CONFIG.adsPhoneSendTo,
        value: TRACKING_CONFIG.adsPhoneValue,
        currency: TRACKING_CONFIG.adsPhoneCurrency,
        event_label: label,
        transport_type: 'beacon'
      });
    }
  }

  function trackEstimateStart(details = {}) {
    trackGa4Event('estimate_start', {
      event_category: 'engagement',
      event_label: details.label || 'estimate_start',
      page_path: window.location.pathname
    });
  }

  initConfigs();

  window.SITE_TRACKING_CONFIG = TRACKING_CONFIG;
  window.trackLeadConversion = trackLeadConversion;
  window.trackPhoneClick = trackPhoneClick;
  window.trackEstimateStart = trackEstimateStart;
})();
