import Header from './components/Header';
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom
import React from 'react';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

function App() {
  return (
    <>
    <div className="App">
      <Header /> {/* Render Header at the top */}
      <main className="App-main"> {/* Use <main> for main content */}
        <Outlet /> {/* Render nested routes here */}
      </main>
      {/* <Footer /> */} {/* Render Footer at the bottom */}
      <ToastContainer /> {/* Add ToastContainer for toasts */}
    </div>

   </>
  );
}

export default App;
