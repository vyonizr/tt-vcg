import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <main
        className={`flex min-h-screen w-full flex-col items-center p-4 ${inter.className}`}
      >
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  )
}
