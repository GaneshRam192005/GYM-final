import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-[#018ABD] z-100 py-5 fixed right-0 left-0">
        <nav className="flex md:justify-between justify-around gap-14 align-middle items-center w-4/5 mx-auto">
          <div className="bg-white py-[3px] px-6 sm:px-10 font-semibold sm:py-1 rounded-md text-base sm:text-xl text-[#1C96C3]">
            <Link to="/home">HOME</Link>
          </div>
        </nav>
      </header>
);

const Gyms = () => {
  const [gymDetails, setGymDetails] = useState(null);
  const [formData, setFormData] = useState({
    gym_name: '',
    gym_email: '',
    gym_owner_first_name: '',
    gym_owner_last_name: '',
    gym_address: '',
    gym_phone_number: '',
    promo_code_offers: false,
    promo_code: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showCreatePrompt, setShowCreatePrompt] = useState(false); // New state to show create prompt

  useEffect(() => {
    fetchGymDetails();
  }, []);

  const getAdminId = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData?.user_id || null;
  };

  const fetchGymDetails = async () => {
    const adminId = getAdminId();
    if (!adminId) {
      console.error('Admin ID not found in local storage');
      return;
    }

    try {
      const response = await axios.get(`https://gym-management-2.onrender.com/gyms/?admin=${adminId}`);
      setGymDetails(response.data);
      setFormData(response.data);

      const gymId = response.data.id || response.data._id;
      if (gymId) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        userData.gym_id = gymId;
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error fetching gym details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminId = getAdminId();
    if (!adminId) {
      console.error('Admin ID not found in local storage');
      return;
    }

    const data = { ...formData, admin: adminId };

    try {
      if (isEditing) {
        await axios.put(`https://gym-management-2.onrender.com/gyms/`, data);
        alert('Gym details updated successfully!');
      } else {
        const response = await axios.post(`https://gym-management-2.onrender.com/gyms/`, data);

        const createdGymId = response.data.id || response.data._id;
        if (createdGymId) {
          const userData = JSON.parse(localStorage.getItem('userData'));
          userData.gym_id = createdGymId;
          localStorage.setItem('userData', JSON.stringify(userData));

          alert(`Gym details added successfully! Gym ID: ${createdGymId}`);
        } else {
          alert('Gym created successfully');
        }
      }
      fetchGymDetails();
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving gym details:', error);
      alert('Failed to save gym details.');
    }
  };

  
  const handleDeleteGym = async () => {
    const adminId = getAdminId();
    if (!adminId) {
      console.error('Admin ID not found in local storage');
      return;
    }

    try {
      const response = await axios.delete(`https://gym-management-2.onrender.com/gyms/?admin=${adminId}`);
      if (response.status === 204) {
        alert('Gym details deleted successfully!');
        
        // Reset gym details and form data after deletion
        setGymDetails(null);
        setFormData({
          gym_name: '',
          gym_email: '',
          gym_owner_first_name: '',
          gym_owner_last_name: '',
          gym_address: '',
          gym_phone_number: '',
          promo_code_offers: false,
          promo_code: '',
        });

        // Update local storage gym_id to null
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
          userData.gym_id = null;
          localStorage.setItem('userData', JSON.stringify(userData));
        }

        // Show prompt to create a new gym
        setShowCreatePrompt(true);
      } else {
        alert('Failed to delete gym details.');
      }
    } catch (error) {
      console.error('Error deleting gym details:', error);
      alert('Failed to delete gym details.');
    }
  };

  return (
    <div>
      <Header />

      <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Gym Details' : 'Add New Gym'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="gym_name"
            value={formData.gym_name}
            onChange={handleChange}
            placeholder="Gym Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="gym_email"
            value={formData.gym_email}
            onChange={handleChange}
            placeholder="Gym Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="gym_owner_first_name"
            value={formData.gym_owner_first_name}
            onChange={handleChange}
            placeholder="Owner First Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="gym_owner_last_name"
            value={formData.gym_owner_last_name}
            onChange={handleChange}
            placeholder="Owner Last Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="gym_address"
            value={formData.gym_address}
            onChange={handleChange}
            placeholder="Gym Address"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="gym_phone_number"
            value={formData.gym_phone_number}
            onChange={handleChange}
            placeholder="Gym Phone Number"
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="promo_code_offers"
              checked={formData.promo_code_offers}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="promo_code_offers">Promo Code Offers</label>
          </div>
          {formData.promo_code_offers && (
            <input
              type="text"
              name="promo_code"
              value={formData.promo_code}
              onChange={handleChange}
              placeholder="Promo Code"
              className="w-full p-2 border rounded"
            />
          )}
          <div className="flex justify-between">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {isEditing ? 'Update Gym' : 'Add Gym'}
            </button>
          </div>
        </form>

        {gymDetails && !isEditing && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Current Gym Details</h3>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(gymDetails, null, 2)}</pre>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsEditing(true)} 
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Edit Details
              </button>
              <button
                onClick={handleDeleteGym}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete Gym
              </button>
            </div>
          </div>
        )}

        {/* Show prompt to create new gym if gym details are deleted */}
        {showCreatePrompt && (
          <div className="mt-8">
            
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Gyms;
