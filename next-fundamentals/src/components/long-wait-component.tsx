export async function LongWaitComponent() {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return <p>Carregado!</p>
}
