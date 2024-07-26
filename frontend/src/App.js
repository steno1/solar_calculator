import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom
// src/App.js
import React from 'react';

function App() {
  return (
    <div className="App">
      <Header /> {/* Render Header at the top */}
      <main className="App-main"> {/* Use <main> for main content */}
        <Outlet /> {/* Render nested routes here */}
      </main>
      <Footer /> {/* Render Footer at the bottom */}
    </div>
  );
}

export default App;
