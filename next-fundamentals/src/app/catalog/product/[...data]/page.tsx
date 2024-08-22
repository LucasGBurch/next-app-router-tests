import { AddToCartButton } from './add-to-cart-button'
import { Test } from './test'

interface ProductProps {
  params: {
    // id: string // Quando testamos a pasta com id apenas
    data: string[]
  }
}

// Server Components => A gente não USA JavaScript no lado do cliente
// Client Components => O JavaScript é enviado ao nosso navegador (cliente)

// Streaming SSR => Ler/escrever dados de forma parcial + Server-side Rendering

// Renderizar um componente pelo lado do servidor de forma PARCIAL

export default async function Product({ params }: ProductProps) {
  const [productId, size, color] = params.data

  const response = await fetch('https://api.github.com/users/LucasGBurch')
  const user = await response.json()

  console.log(params, user.login)
  // Sem o use-client em cima, o log vem no terminal, pois o componente é Server Component
  // Ou seja, não usa JS no client-side
  // Se chamasse uma função com onClick de um button para fazer esse console, já precisaria do 'use client' para funcionar
  // No caso, enviar o JS para o navegador

  // Exemplo do exibido através dos parâmetros da URL:
  // http://localhost:3000/catalog/product/3/xl/blue
  return (
    <div>
      <p>Product: {productId}</p>
      <p>Size: {size}</p>
      <p>Color: {color} </p>

      <AddToCartButton>
        <Test />
      </AddToCartButton>
    </div>
  )
}
