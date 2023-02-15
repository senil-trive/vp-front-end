// custom 500 page

import Head from "next/head";
// pages/500.tsx
import { NextPage } from "next";
import React from "react";

const Error500Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Error 500 - Villa Pinedo</title>
      </Head>

      <h1>500 - Server-side error occurred</h1>
    </div>
  );
};

export default Error500Page;
