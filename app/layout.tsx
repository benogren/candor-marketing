import './global.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { pt_sans } from './components/fonts'
import Header from './components/header'
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | Candor',
    default: 'Candor - AI-Powered 360-Degree Feedback',
  },
  description: 'Transform workplace feedback from a dreaded annual event into an ongoing conversation that drives growth with Candor\'s AI-powered platform.',
  keywords: ['360 feedback', 'performance management', 'Performance Reviews', 'Employee Recognition', 'Employee Engagement', 'AI-Powered Feedback', 'Continuous Feedback', 'Feedback Culture', 'Employee Development'],
  openGraph: {
    title: 'Candor - AI-Powered 360-Degree Feedback',
    description: 'Transform workplace feedback from a dreaded annual event into an ongoing conversation that drives growth with Candor\'s AI-powered platform.',
    url: baseUrl,
    siteName: 'Candor',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={pt_sans.className}
    >
      <head>
      <meta name="apple-mobile-web-app-title" content="Candor" />
      </head>
      <body className="">
        <main className="">
          {/* Meta Pixel Code */}
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
            `}
          </Script>
          <noscript>
            <img 
              height="1" 
              width="1" 
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=1020654256702161&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>

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
          <Header />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
