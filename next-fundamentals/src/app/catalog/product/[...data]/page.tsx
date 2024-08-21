'use client'

interface ProductProps {
  params: {
    // id: string // Quando testamos a pasta com id apenas
    data: string[]
  }
}

export default function Product({ params }: ProductProps) {
  const [productId, size, color] = params.data

  console.log(params)
  // Sem o use-client em cima, o log vem no terminal, pois o componente é Server Component
  // Ou seja, não usa JS no client-side
  // Se chamasse uma função com onClick de um button para fazer esse console, já precisaria do 'use client' para funcionar
  // No caso, enviar o JS para o navegador

  function addToCart() {
    console.log('Adicionou ao carrinho')
  }

  // Exemplo do exibido através dos parâmetros da URL:
  // http://localhost:3000/catalog/product/3/xl/blue
  return (
    <div>
      <p>Product: {productId}</p>
      <p>Size: {size}</p>
      <p>Color: {color} </p>

      <button onClick={addToCart}>Adicionar ao carrinho</button>
    </div>
  )
}
