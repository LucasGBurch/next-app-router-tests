import { Header } from '@/components/header'
import { CartProvider } from '@/contexts/cart-context'
import { ReactNode } from 'react'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1680] grid-rows-app gap-5 px-8 p-8">
        <Header />
        {children}
      </div>
    </CartProvider>
  )
}
