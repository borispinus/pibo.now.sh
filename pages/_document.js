import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { dom, config } from '@fortawesome/fontawesome-svg-core';

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
        </Head>
        <body>
          <style jsx global>
            {`
              @import url('https://fonts.googleapis.com/css?family=Didact+Gothic');

              ${dom.css()}
              html {
                margin: 0;
                padding: 0;
                min-height: 100vh;
              }
              body {
                font-family: 'Roboto', sans-serif;
                min-height: 100vh;
                margin: 0;
                padding: 0;
                position: relative;
              }
              * {
                box-sizing: border-box;
              }
            `}
          </style>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
