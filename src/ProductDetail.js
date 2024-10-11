import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [ismenuclick, setIsmenuclick] = useState(false);

  const storedUserData = JSON.parse(localStorage.getItem('userData'));
  const storedGymId = storedUserData ? storedUserData.gym_id : '';
  const storedAdminId = storedUserData ? storedUserData.user_id : '';

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Corrected the URL with backticks for template literals
  const url = `https://gym-management-2.onrender.com/products/?gym_id=${storedGymId}&admin=${storedAdminId}&product_id=${id}`;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json();
          setProduct(result); // Set the product state with the fetched data
        } else {
          setError('Failed to fetch product details');
        }
      } catch (error) {
        setError('Error occurred while fetching product details');
      } finally {
        setLoading(false); // Update the loading state
      }
    };

    fetchProductDetails(); // Fetch product details on component mount
  }, [url]);

  // Handle Buy Now button click event
  const handleBuyNow = () => {
    if (product) {
      // Store relevant details in localStorage
      localStorage.setItem(
        'productPurchase',
        JSON.stringify({
          product_id: id,
          stripe_product_id: product.stripe_product_id,
          stripe_price_id: product.stripe_price_id,
        })
      );

      // Optionally, navigate to a checkout page or trigger a payment process
      navigate('/checkout'); // Replace with your checkout route
    }
  };

  // Render the component UI based on the loading, error, and product state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-16 p-4">
      <header id="top" className="fixed top-0 left-0 right-0 bg-[#018ABD]">
        <nav className="header-content  flex items-center  justify-between  w-4/5 mx-auto space-x-7">
          <div id="logo">
            <Link to="/adminhome">
              <img
                className="w-36 md:w-96 lg:w-40"
                src="images\Reebok_2019_logo 1.png"
                alt="Logo"
              />
            </Link>
          </div>

          <ul
            id="nav-menu"
            className="un-content hidden md:flex justify-between align-middle items-center space-x-7 text-black md:text-white"
          >
            <li
              className="hovering sm:text-xl md:text-2xl font-semibold"
              href="index.html"
            >
              <Link to="/adminhome">HOME</Link>
            </li>
           
            <li
              className="hovering sm:text-xl md:text-2xl font-semibold"
              href="shop.html"
            >
              <Link to="/vitamins">SHOP</Link>
            </li>
           
           
            <li
              className="hovering sm:text-xl md:text-2xl font-semibold"
              href="testimonials.html"
            >
           
              <Link to="/test">TESTIMONIALS</Link>{" "}
            </li>
          </ul>
         

          <div
            onClick={() => {
              setIsmenuclick(!ismenuclick);
              console.log("clicked");
              console.log(ismenuclick);
            }}
          >
            <svg
              id="menu-icon"
              className="md:hidden w-8 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </div>
        </nav>

        {ismenuclick ? (
          <>
            <ul
              id="dropdown-menu"
              className="block flex-col bg-white font-semibold text-[#018ABD] space-y-2 text-lg px-6 py-4 absolute w-full top-16 left-0 shadow-lg md:hidden"
            >
              <li
                className="hovering1 sm:text-xl md:text-2xl font-semibold"
                
              >
                <Link to="/adminhome">HOME</Link>
              </li>
             
              <li
                className="hovering1 sm:text-xl md:text-2xl font-semibold"
                href="shop.html"
              >
                <Link to="/vitamins">SHOP</Link>
              </li>
              <li onClick={()=>{
                setIsmenuclick(!ismenuclick)
              }}>
               
              </li>
             
              <li
                className="hovering1 sm:text-xl md:text-2xl font-semibold"
                href="testimonials.html"
              >
               
                <Link to="/test">TESTIMONIALS</Link>{" "}
              </li>
             
            </ul>
          </>
        ) : (
          <></>
        )}
      </header>

      {product ? (
        
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              className="h-full w-full object-cover md:w-96"
              src={product.image || 'placeholder.png'}
              alt={product.name}
            />
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {product.desc}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Type:</strong> {product.type}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Reviews:</strong> {product.reviews}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Stock:</strong> {product.stock}
            </p>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full  bg-[#1C96C3] text-white font-semibold py-2 rounded-lg mt-4 hover:bg-[#1a86b0] transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold">Product not found</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
