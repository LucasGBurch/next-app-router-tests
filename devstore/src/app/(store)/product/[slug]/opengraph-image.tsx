import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { env } from '@/env'
import colors from 'tailwindcss/colors'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    // cache: 'force-cache', // Padrão - faz a requisição uma vez e deixa "cacheada" por tempo indeterminado
    next: {
      revalidate: 60 * 60, // Segundos - durante esse tempo, os dados acessados serão do usuário que acessou na primeira vez. Depois desse tempo, os próximos acessos pegarão novamente para uma nova cache. (Exemplo: 60 * 60 atualiza o cache a cada 1h)
    }, // NÃO-RECOMENDÁVEL para os casos em tempo real que mudam, que nem as sugestões que mudam no youtube ou em sites de e-commerce mais personalizados
  })

  const product = await response.json()

  return product
}

// Image generation
export default async function OgImage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  const productImageURL = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc['950'],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}
