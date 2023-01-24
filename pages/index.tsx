import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Villa Pinedo - Voor kinderen met gescheiden ouders</title>
        <meta
          name="description"
          content="Praten, lachen, klagen of huilen omdat je ouders gescheiden zijn kan bij Villa Pinedo op het forum of 1 op 1 met een Buddy. Je hoeft het niet alleen te doen."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl ">Coming soon</h1>
      </main>

      <footer className="bg-black">
        <a
          href="https://trivetechnology.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          Powered by Trive
        </a>
      </footer>
    </div>
  );
}
