// app/thank-you/ThankYouContent.tsx
'use client';

import Link from 'next/link';
import { PlayCircleIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

// Extend the Window interface to include fbq
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source') || '';

  // to pass build will fix later...
  console.log('Demo Source:', source);
  
  // Fire conversion tracking when the page loads
  useEffect(() => {
    // For Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead');
    }
    
    // Add other conversion tracking here as needed
  }, []);
  
  return (
    <>
      {/* Meta Pixel Code - for additional tracking */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1020654256702161');
          fbq('track', 'PageView');
          fbq('track', 'Lead');
        `}
      </Script>

      {/* LinkedIn Insight Tag */}
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "7235884";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `}
      </Script>
      
      {/* LinkedIn noscript fallback */}
      <div dangerouslySetInnerHTML={{ 
        __html: `
          <noscript>
            <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=7235884&fmt=gif" />
          </noscript>
        `
      }} />
      
      <p className={`text-slate-500 text-base font-light max-w-xl mt-4 text-center`}>
        We&apos;ve received your request and will be in touch shortly to schedule your personalized demo of Candor — within 24 hours.
        In the meantime, please watch a recorded demo of Candor to see how it works.
      </p>
      <Link className='mt-8 border border-cerulean text-cerulean bg-background shadow-xs hover:bg-cerulean-100 h-10 rounded-md px-6 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal' href='https://www.youtube.com/watch?v=7PvnP_GMIg4' target='_blank' rel='noopener noreferrer'>
        View Recorded Demo
        <PlayCircleIcon className='w-4 h-4 ml-2' />
      </Link>
    </>
  );
}