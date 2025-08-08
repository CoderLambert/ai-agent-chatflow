import { getLocaleOnServer } from '@/i18n/server'
import { Suspense } from 'react'
import { Inter } from 'next/font/google'
import '@/styles/tailwind.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Agent Chatflow',
  description: 'A chat application powered by AI agents',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const LocaleLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = await getLocaleOnServer()
  return (
    <html lang={locale ?? 'en'} className="h-full">
      <body className={`h-full ${inter.className} bg-white`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              const UI_WIDTH = 750;
              const baseFontSize = 200;

              function setRootFontSize() {
                const width = document.documentElement?.clientWidth;
                const fontSize = ((parseFloat(width) / UI_WIDTH) * baseFontSize).toFixed(4);
                document.documentElement.style['fontSize'] = fontSize + 'px';
                document.documentElement.style.setProperty('--tpx', '0.01rem');
              }
              setRootFontSize();
              window.addEventListener('resize', setRootFontSize);
            `,
          }}
        />
      </body>
    </html>
  )
}

export default LocaleLayout
