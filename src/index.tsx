import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { reduxStore } from './store/redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/todo-app'>

      <Provider store={reduxStore}>
        <App />
      </Provider>

    </BrowserRouter>
  </React.StrictMode>
);

