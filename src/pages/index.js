import Head from '@/components/Head'
import RequestToken from '@/components/RequestToken'
import Verifier from '@/components/Verifier'

export default function Home() {
  return (
    <>
      <Head title="Yomo's Spotify" />
      <main>
        <Verifier />
        <RequestToken />
      </main>
    </>
  )
}
