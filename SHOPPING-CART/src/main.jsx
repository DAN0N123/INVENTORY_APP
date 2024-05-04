import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from './components/Homepage'
import Shop from './components/Shop';
import Cart from './components/Cart';

const router = createBrowserRouter( [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "shop",
      element: <Shop />,
    },
    {
      path: "cart",
      element: <Cart />
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>,
)
