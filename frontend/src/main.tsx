import { App } from 'components/app/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './services/store';
import 'styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <React.StrictMode>

    <Provider store={store}>
      <BrowserRouter>

        <App />

      </BrowserRouter>
    </Provider>

  </React.StrictMode>
)
