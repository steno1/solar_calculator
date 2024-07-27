import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import components for routing

import App from './App'; // Import the main App component
import HomeScreen from './screen/HomeScreen'; // Import the HomeScreen component
import LoginScreen from './screen/LoginScreen'; // Import the LoginScreen component
import PrivateRoute from './components/privateRoutes';
import { Provider } from 'react-redux'; // Import the Provider component from react-redux
import React from 'react'; // Import React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering the app
import RegisterScreen from './screen/RegisterScreen'; // Import the RegisterScreen component
import UserProfileScreen from './screen/userProfileScreen'; // Import the UserProfileScreen component
import { store } from './store'; // Import the Redux store

// Create the root element to render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React application
root.render(
  <React.StrictMode> {/* Enable strict mode for highlighting potential issues */}
    <Provider store={store}> {/* Provide the Redux store to the application */}
      <BrowserRouter> {/* Use BrowserRouter to handle routing */}
        <Routes>
          <Route path="/" element={<App />}> {/* Use App as the layout component */}
            
            <Route path="/login" element={<LoginScreen />} /> {/* Add the LoginScreen route */}
            <Route path="/register" element={<RegisterScreen />} /> {/* Add the RegisterScreen route */}
            <Route element={<PrivateRoute />}> {/* Use PrivateRoute to protect routes */}
            <Route index element={<HomeScreen />} /> {/* HomeScreen will render inside App */}
              
              <Route path="/profile" element={<UserProfileScreen />} /> {/* Protected route */}
              {/* Define other protected routes here if needed */}
            </Route>
            {/* Define other routes here if needed */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
