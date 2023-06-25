import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <main
        className={`flex w-[375px] min-h-screen flex-col items-center p-4 ${inter.className}`}
      >
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  )
}
