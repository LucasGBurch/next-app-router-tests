import { Suspense } from 'react'

import { GithubProfile } from '@/components/github-profile'
import { LongWaitComponent } from '@/components/long-wait-component'

export default async function Home() {
  // Para "carregando geral", usamos o layout da home mesmo
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div>
      <h1>Home</h1>

      {/* Para carregar partes específicas, usamos a Suspense API */}
      <Suspense fallback={<p>Carregando LongWaitComponent</p>}>
        <LongWaitComponent />
      </Suspense>

      <Suspense fallback={<p>Carregando GithubProfile</p>}>
        <GithubProfile />
      </Suspense>
    </div>
  )
}
