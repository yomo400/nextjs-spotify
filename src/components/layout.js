import Head from "next/head";

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>yomo's Spotify {props.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        {props.children}
      </div>
    </div>
  )
}