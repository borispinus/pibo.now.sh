import React from 'react';

import { config, dom } from '@fortawesome/fontawesome-svg-core';
import { Index as IndexPage } from '../index/Index';

config.autoAddCss = false;

const Index = () => (
  <>
    <IndexPage />
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
  </>
);

export default Index;
