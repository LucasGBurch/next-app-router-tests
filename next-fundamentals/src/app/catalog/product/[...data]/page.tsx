interface ProductProps {
  params: {
    // id: string // Quando testamos a pasta com id apenas
    data: string[]
  }
}

export default function Product({ params }: ProductProps) {
  const [productId, size, color] = params.data

  // Exemplo do exibido através dos parâmetros da URL:
  // http://localhost:3000/catalog/product/3/xl/blue
  return (
    <div>
      <p>Product: {productId}</p>
      <p>Size: {size}</p>
      <p>Color: {color} </p>
    </div>
  )
}
