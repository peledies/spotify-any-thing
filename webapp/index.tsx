import React from 'react';
import ReactDOM, { Container } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './src/App';
import store from './src/store';

ReactDOM.createRoot(document.getElementById('root') as Container).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
