"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID; // G-XXXXXXXXXX
const AW_ID = "AW-742461518";
const FB_PIXEL_ID = "2034308866886464";

function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("hb_cookie_consent") === "accepted";
}

const ClientScripts = () => {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    setConsent(hasConsent());

    // Listen for consent changes (when user clicks "Aceptar" in CookieBanner)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "hb_cookie_consent") {
        setConsent(e.newValue === "accepted");
      }
    };
    window.addEventListener("storage", handleStorage);

    // Also poll briefly in case consent is given in the same tab
    const interval = setInterval(() => {
      if (hasConsent() && !consent) {
        setConsent(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, [consent]);

  if (!consent) return null;

  const gtagId = GA_ID || AW_ID;

  return (
    <>
      {/* Google tag (gtag.js) — GA4 + Google Ads */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}');` : ""}
          gtag('config', '${AW_ID}');
          gtag('config', '${AW_ID}/6PBHCIzN1Z0BEM6ghOIC', { 'phone_conversion_number': '951337640' });
          gtag('config', '${AW_ID}/FEkwCM2w6J0BEM6ghOIC', { 'phone_conversion_number': '685070304' });
        `}
      </Script>

      {/* Facebook Pixel */}
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
};

export default ClientScripts;
