import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Homepage.css";

const Usergym = () => {
  const [ismenuclick, setIsmenuclick] = useState(false);
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const response = await axios.get('https://gym-management-2.onrender.com/gyms/', {
          headers: {
            'accept': 'application/json',
          },
        });
        setGyms(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGymDetails();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-600 text-center">Error: {error}</div>;

  return (
    <div>
      
      <header id="top" className="fixed top-0 left-0 right-0 bg-[#018ABD] shadow-md z-50">
        <nav className="header-content flex items-center justify-between w-4/5 mx-auto space-x-7 py-2">
          <Link to="/userhome" >
            <div className='cursor-pointer' >
              <img
                className="w-36 md:w-96 lg:w-40"
                src="images/output-onlinepngtools (1).png"
                alt="Logo"
              />
            </div>
          </Link>

          <ul
            id="nav-menu"
            className="un-content hidden md:flex justify-between items-center space-x-7 text-black md:text-white"
          >
            <li className="hover:text-gray-300 sm:text-xl md:text-2xl font-semibold">
              <Link to="/userhome">HOME</Link>
            </li>
            
            
            <li className="hover:text-gray-300 sm:text-xl md:text-2xl font-semibold">
              <Link to="/usershop">SHOP</Link>
            </li>
            <li className="hover:text-gray-300 sm:text-xl md:text-2xl font-semibold">
              <Link to="/usergym">GYM</Link>
            </li>
         
            <li className="hover:text-gray-300 sm:text-xl md:text-2xl font-semibold">
              <Link to="/test1">TESTIMONIALS</Link>
            </li>
          </ul>

       

          <div onClick={() => setIsmenuclick(!ismenuclick)} className="md:hidden cursor-pointer">
            <svg
              id="menu-icon"
              className="w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </div>
        </nav>

       
        {ismenuclick && (
          <ul
            id="dropdown-menu"
            className="flex flex-col bg-white font-semibold text-[#018ABD] space-y-2 text-lg px-6 py-4 absolute w-full top-16 left-0 shadow-lg md:hidden"
          >
            <li className="hover:bg-gray-100 p-2">
              <Link to="/userhome">HOME</Link>
            </li>
        
            <li className="hover:bg-gray-100 p-2">
              <Link to="/usershop">SHOP</Link>
            </li>
            <li className="hover:bg-gray-100 p-2">
              <Link to="/usergym">GYMS</Link>
            </li>
         
            
            <li className="hover:bg-gray-100 p-2">
              <Link to="/test1">TESTIMONIALS</Link>
            </li>
          </ul>
        )}
      </header>

      {/* Gym List Section */}
      <section className="pt-24 pb-12 bg-gray-100 min-h-screen">
        <div className=" mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#018ABD]">Gym List</h2>
          <div className="grid grid-cols-1 font-semibold md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gyms.map((gym) => (
              <div key={gym.id} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{gym.gym_name}</h3>
                <p className="text-gray-600">Owner: {gym.gym_owner_first_name} {gym.gym_owner_last_name}</p>
                <p className="text-gray-600">Address: {gym.gym_address}</p>
                <p className="text-gray-600">Phone: {gym.gym_phone_number}</p>
                <p className="text-gray-600">Email: {gym.gym_email}</p>
                <div  className='bg-[#018ABD]  text-white mt-5 cursor-pointer p-2 text-center' ><button  >JOIN NOW</button></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Usergym;
