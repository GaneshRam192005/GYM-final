import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './shop.css';

const UserProductsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // API URL without any filters
  const url = 'https://gym-management-2.onrender.com/products/';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Fetched products:', result);
        setData(result);
      } else {
        setError('Failed to fetch data');
      }
    } catch (error) {
      setError('Error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on search term
  const filteredProducts = data.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header className="bg-[#018ABD] z-100 py-5 fixed right-0 left-0">
        <nav className="flex md:justify-between justify-around gap-14 align-middle items-center w-4/5 mx-auto">
          <div className="bg-white py-[3px] px-6 sm:px-10 font-semibold sm:py-1 rounded-md text-base sm:text-xl text-[#1C96C3]">
            <Link to="/userhome">HOME</Link>
          </div>
        </nav>
      </header>

      <section className="w-4/5 mx-auto mt-[100px]">
        <h2 className="text-2xl font-bold mb-4">Available Products</h2>

        {/* Search bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products by name"
          className="border p-2 rounded-md mb-4"
        />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="product-list">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded-md mb-4">
                <Link to={`/product-details/${product.id}`}>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p>Type: {product.type}</p>
                  <p>Description: {product.desc}</p>
                  <p>Reviews: {product.reviews}</p>
                  <p>Stock: {product.stock}</p>
                  <p>Price: ${product.price}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProductsPage;
