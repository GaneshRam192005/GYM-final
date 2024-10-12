import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './shop.css';
import './App.css';

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Home';
import Vitamins from './Vitamins';
import Gyms from './Gyms';
import { Mainpage } from './Mainpage';
import Testimonials from './Testimonials';
import ProductDetail from './ProductDetail';
import Usershop from './Usershop';

import Productdetails from './Productdetails';
import Usergym from './Usergyms';
import UserHomepage from './UserHomepage';
import Admin_profile from './Admin_profile';
import Userhome from './Userhome';
import ProfilePage from './ProfilePage';
import Usertestimonials from './Usertestimonials';
import Defaulthomepage from './Defaulthome';
import Homepage from './Homepage';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Defaulthomepage/>,  
  },
  {
    path: "/sign",
    element: <Mainpage />,  
  },
  {
    path:"/vitamins", 
    element:<Vitamins />,
  },
  {
    path:"/usergym", 
    element:<Usergym/>,
  },
  
  {
    path:"/product-details/:id", 
    element:<ProductDetail />,
  },
  {
    path:"/adminprofile", 
    element:<Admin_profile/>,
  },
  {
    path:"/product-details1/:id", 
    element:<Productdetails/>
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/adminhome",
    element: <Homepage/>
  },
  {
    path: "test",
    element: <Testimonials />,
  },
  {
    path: "shop",
    element: <Vitamins/>
  },
  // {
  //   path:"/userhomepage",
  //   element:<UserHomepage></UserHomepage>,
  // },
  {
    path: "gym",
    element: <Gyms />,
  },
  {
    path: "usershop",
    element: <Usershop/>,
  },
  {
    path: "userhome",
    element: <Userhome/>,
  },
  {
    path: "user",
    element: <ProfilePage/>,
  },
  
 
  {
    path: "test1",
    element: <Usertestimonials/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
