import React from 'react';
import AppRouter from './router/AppRouter';
import './styles/globals.css';
import { CurrencyProvider } from './context/CurrencyContext';

function App() {
  return (
    <CurrencyProvider>
      <AppRouter />
    </CurrencyProvider>
  );
}

export default App;
