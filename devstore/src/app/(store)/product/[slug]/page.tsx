import { AddToCartButton } from '@/components/add-to-cart-button'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from 'next'
import Image from 'next/image'

interface ProductProps {
  params: {
    slug: string
  }
}

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

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  // Método para "cachear" a página dentro do next.js
  // Usado só para dados essenciais, para não tornar a build muito pesada
  // Exemplo: 20 produtos mais acessados, e não os 1000 do banco inteiro
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  // return [{ slug: 'moletom-never-stop-learning' }]

  return products.map((product) => {
    return { slug: product.slug }
  })
}

export default async function ProductPage({ params }: ProductProps) {
  const product = getProduct(params.slug)

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={(await product).image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">
          {(await product).title}
        </h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {(await product).description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {(await product).price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em até 12x s/ juros de{' '}
            {((await product).price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              GG
            </button>
          </div>
        </div>

        <AddToCartButton productId={(await product).id} />
      </div>
    </div>
  )
}
