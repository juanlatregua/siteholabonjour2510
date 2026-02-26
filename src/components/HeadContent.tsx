// components/HeadContent.tsx
import Head from 'next/head'
import Script from 'next/script'

const HeadContent = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Academia de Francés en Málaga HolaBonjour. Aprende online con profesorado nativo y consigue tu titulación A1, A2, B2, CI o C2 🥇"
        />
        <meta name="generator" content="2018.1.1.386" />
        <title>Academia de Francés en Málaga | Cursos de Francés | HolaBonjour🥇</title>
        <link rel="canonical" href="https://www.holabonjour.es/" />
        {/* Otras meta etiquetas SEO que necesites */}
      </Head>

      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-121831249-1"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-121831249-1');
          gtag('config', 'AW-742461518');
          gtag('config', 'AW-742461518/6PBHCIzN1Z0BEM6ghOIC', { 'phone_conversion_number': '951337640' });
          gtag('config', 'AW-742461518/FEkwCM2w6J0BEM6ghOIC', { 'phone_conversion_number': '685070304' });
        `}
      </Script>
    </>
  )
}

export default HeadContent
