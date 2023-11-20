import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'macro-css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename='/react-sneakers/'>
    <App />
  </BrowserRouter>
);
