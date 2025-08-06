import { getLocaleOnServer } from '@/i18n/server'
import { Suspense } from 'react'

import "./globals.css";
// import './styles/markdown.scss'

const LocaleLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = await getLocaleOnServer()
  return (
    <html lang={locale ?? 'en'} className="h-full">
      <body className="h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="overflow-x-auto">
            <div className="w-screen h-screen min-w-[300px]">
              {children}
            </div>
          </div>
        </Suspense>
      </body>
    </html>
  )
}

export default LocaleLayout
