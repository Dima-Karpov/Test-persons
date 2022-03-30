import React from 'react';

import './index.css';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'App';

const container = document.getElementById('root');

// Create a root.
if (!container) {
  console.warn(new Error('Some error'));
}
const root = ReactDOMClient.createRoot(container as HTMLElement);

// Initial render: Render an element to the root.
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
