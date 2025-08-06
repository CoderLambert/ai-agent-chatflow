import { getLocaleOnServer } from '@/i18n/server'
import { Suspense } from 'react'
import RemAdapter from '@/app/components/RemAdapter';

import "./globals.css";

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
      <body className="h-full">
        <RemAdapter />
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var rem = function() {
                  var designWidth = 750;
                  var baseSize = 75;
                  var clientWidth = document.documentElement.clientWidth;
                  var fontSize = (clientWidth / designWidth) * baseSize + 'px';
                  document.documentElement.style.fontSize = fontSize;
                  console.log('Font size set to: ' + fontSize);
                };
                rem();
                window.addEventListener('resize', rem);
                window.addEventListener('orientationchange', rem);
              })();
            `
          }}
        /> */}
        </Suspense>
      </body>
    </html>
  )
}

export default LocaleLayout
