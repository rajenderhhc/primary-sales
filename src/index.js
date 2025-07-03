import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import FormcontextProvider from './Context/FormContenxt';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FormcontextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FormcontextProvider>
  </React.StrictMode>
);
