import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import HomeScreen from './screen/HomeScreen';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route index={true} path='/' element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
