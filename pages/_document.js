import React from 'react';
import { dom, config } from '@fortawesome/fontawesome-svg-core';
import Document, { Head, Html, Main, NextScript } from 'next/document';

config.autoAddCss = false;

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
            rel="stylesheet"
          />
          <style jsx global>
            {`
              @import url('https://fonts.googleapis.com/css?family=Didact+Gothic');

              ${dom.css()}
              body {
                font-family: 'Roboto', sans-serif;
                min-height: 100vh;
                margin: 0;
                padding: 0;
                position: relative;
              }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
