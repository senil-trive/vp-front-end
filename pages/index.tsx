import Head from "next/head";
import Tag from "../components/buttons/Tag/Tag";
import Grid from "../components/grid/Grid";
import GridItem from "../components/grid/GridItem";
import Header from "../components/layout/Header";

const tags = ["Alles", "Mijn family"];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Villa Pinedo - Voor kinderen met gescheiden ouders</title>
        <meta
          name="description"
          content="Praten, lachen, klagen of huilen omdat je ouders gescheiden zijn kan bij Villa Pinedo op het forum of 1 op 1 met een Buddy. Je hoeft het niet alleen te doen."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Grid className="mb-[32px]">
          <GridItem size={12}>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </GridItem>
        </Grid>
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
