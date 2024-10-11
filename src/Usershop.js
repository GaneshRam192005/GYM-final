import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Usershop = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const url = 'https://gym-management-2.onrender.com/products/';

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch products:', errorText);
        setError('Failed to fetch products: ' + errorText);
      }
    } catch (error) {
      console.error('Error occurred while fetching products:', error);
      setError('Error fetching products: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = data.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <header className="bg-[#018ABD] z-100 py-5 fixed right-0 left-0 shadow-md">
        <nav className="flex md:justify-between justify-around items-center w-4/5 mx-auto">
          <div className="bg-white py-1 px-6 font-semibold rounded-md text-lg text-[#1C96C3] shadow-sm">
            <Link to="/userhome">HOME</Link>
          </div>
        </nav>
      </header>

      {/* Main Section */}
      <section className="w-4/5 mx-auto mt-[100px]">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Products</h2>
        
        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products by name"
          className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Loading, Error, or Products Display */}
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link to={`/product-details1/${product.id}`} key={product.id}>
                <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-lg transition duration-200 ease-in-out">
                  {/* Product Image */}
                  <div className="relative pb-2/3">
                    <img
                      className="absolute h-full w-full object-cover rounded-md"
                      src={product.image || 'placeholder.png'}
                      alt={product.name}
                    />
                  </div>
                  {/* Product Info */}
                  <div className="mt-4 font-semibold ">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-gray-600 mt-1">Type: {product.type}</p>
                    <p className="text-gray-600">Description: {product.desc}</p>
                    <p className="text-gray-600">Reviews: {product.reviews}</p>
                    <p className="text-gray-600">Stock: {product.stock}</p>
                    <p className="text-gray-900 font-semibold">Price: ${product.price}</p>
                    {/* <p className="text-gray-600 mt-1">Gym ID: {product.Gym}</p> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Usershop;
