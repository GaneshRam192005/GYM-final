import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const Productdetails = () => {
  const { id, gymId } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ismenuclick, setIsmenuclick] = useState(false);

  const url = `https://gym-management-2.onrender.com/products/?product_id=${id}`;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json();
          setProduct(result);
        } else {
          setError('Failed to fetch product details');
        }
      } catch (error) {
        setError('Error occurred while fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [url]);

  const handleBuyNow = () => {
    if (product) {
      const productGym = product.Gym; // Use the 'gym' field from the product
  
      if (productGym) {
        localStorage.setItem(
          'productPurchase',
          JSON.stringify({
            product_id: id,
            gym: productGym, 
            stripe_product_id: product.stripe_product_id,
            stripe_price_id: product.stripe_price_id,
          })
        );
  
        console.log('Product purchase stored with Gym:', productGym);
        navigate('/checkout'); // Redirect to the checkout page
      } else {
        setError('Gym information is missing for this product.');
      }
    } else {
      setError('Product details are not available.');
    }
  };
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-lg font-medium">Loading...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen"><p className="text-lg text-red-600">{error}</p></div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-16 p-4">
       <header id="top" className="fixed top-0 left-0 right-0 bg-[#018ABD]">
        <nav className="header-content  flex items-center  justify-between  w-4/5 mx-auto space-x-7">
          <div id="logo">
            <Link to="/userhome">
              <img
                className="w-36 md:w-96 lg:w-40"
                src="images/output-onlinepngtools (1).png"
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
              <Link to="/userhome">HOME</Link>
            </li>
           
            <li
              className="hovering sm:text-xl md:text-2xl font-semibold"
              href="shop.html"
            >
              <Link to="/usershop">SHOP</Link>
            </li>
           
           
            <li
              className="hovering sm:text-xl md:text-2xl font-semibold"
              href="testimonials.html"
            >
           
              <Link to="/test1">TESTIMONIALS</Link>{" "}
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
                className="hovering1 text-[#018ABD] sm:text-xl md:text-2xl font-semibold"
                
              >
                <Link to="/userhome">HOME</Link>
              </li>
             
              <li
                className="hovering1 text-[#018ABD] sm:text-xl md:text-2xl font-semibold"
                href="shop.html"
              >
                <Link to="/usershop">SHOP</Link>
              </li>
              <li onClick={()=>{
                setIsmenuclick(!ismenuclick)
              }}>
               
              </li>
             
              <li
                className="hovering1 text-[#018ABD] sm:text-xl md:text-2xl font-semibold"
                
              >
               
                <Link to="/test1">TESTIMONIALS</Link>{" "}
              </li>
             
            </ul>
          </>
        ) : (
          <></>
        )}
      </header>



      {product ? (
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden mt-16">
          <div className="flex-shrink-0">
            <img
              className="h-full w-full object-cover md:w-96"
              src={product.image || 'placeholder.png'}
              alt={product.name}
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-700 mb-4"><strong>Description:</strong> {product.desc}</p>
            <p className="text-gray-700 mb-4"><strong>Type:</strong> {product.type}</p>
            <p className="text-gray-700 mb-4"><strong>Price:</strong> ${product.price}</p>
            <button
              onClick={handleBuyNow}
              className="w-full bg-[#1C96C3] text-white py-2 px-4 rounded-md font-semibold"
            >
              Buy Now
            </button>
          </div>
        </div>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
};

export default Productdetails;
