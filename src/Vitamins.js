import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './shop.css';

const Vitamins = () => {
  const storedUserData = JSON.parse(localStorage.getItem('userData'));
  const storedGymId = storedUserData ? storedUserData.gym_id : '';
  const storedAdminId = storedUserData ? storedUserData.user_id : '';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    desc: '',
    reviews: '',
    stock: 0,
    price: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [gymId, setGymId] = useState(storedGymId);
  const [adminId, setAdminId] = useState(storedAdminId);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  const url = 'https://gym-management-2.onrender.com/products/';

  useEffect(() => {
    if (gymId && adminId) {
      fetchData();
    }
  }, [gymId, adminId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let query = `?gym_id=${gymId}&admin=${adminId}`;
      const response = await fetch(`${url}${query}`);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on the search term
  const filteredProducts = data.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('type', newProduct.type);
    formData.append('desc', newProduct.desc);
    formData.append('reviews', newProduct.reviews);
    formData.append('stock', newProduct.stock);
    formData.append('price', newProduct.price);
    formData.append('gym_id', gymId);
    formData.append('admin', adminId);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to add product: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Product added:', result);
      alert('Product added successfully');

      setNewProduct({
        name: '',
        type: '',
        desc: '',
        reviews: '',
        stock: 0,
        price: 0,
      });
      setImageFile(null);
      setSelectedProduct(null);

      await fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to add product: ${error.message}`);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!selectedProduct) {
      alert('Please select a product to update');
      return;
    }

    const formData = new FormData();
    formData.append('product_id', selectedProduct.id);
    formData.append('gym_id', gymId);
    formData.append('admin', adminId);

    if (newProduct.name) formData.append('name', newProduct.name);
    if (newProduct.type) formData.append('type', newProduct.type);
    if (newProduct.desc) formData.append('desc', newProduct.desc);
    if (newProduct.reviews) formData.append('reviews', newProduct.reviews);
    if (newProduct.stock) formData.append('stock', newProduct.stock);
    if (newProduct.price) formData.append('price', newProduct.price);
    if (imageFile) formData.append('image', imageFile);

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to update product: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Product updated:', result);
      alert('Product updated successfully');

      setNewProduct({
        name: '',
        type: '',
        desc: '',
        reviews: '',
        stock: 0,
        price: 0,
      });
      setImageFile(null);
      setSelectedProduct(null);

      await fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to update product: ${error.message}`);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    const deleteUrl = `${url}?admin=${adminId}&gym_id=${gymId}&product_id=${productId}`;
    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to delete product: ${response.status} - ${response.statusText}`);
      }

      alert('Product deleted successfully');
      await fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to delete product: ${error.message}`);
    }
  };

  const selectProductForEdit = (product) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      type: product.type,
      desc: product.desc,
      reviews: product.reviews,
      stock: product.stock,
      price: product.price,
    });
  };

  const cancelEdit = () => {
    setSelectedProduct(null);
    setNewProduct({
      name: '',
      type: '',
      desc: '',
      reviews: '',
      stock: 0,
      price: 0,
    });
    setImageFile(null);
  };

  return (
    <div>
      <header className="bg-[#018ABD] z-100 py-5 fixed right-0 left-0">
        <nav className="flex md:justify-between justify-around gap-14 align-middle items-center w-4/5 mx-auto">
          <div className="bg-white py-[3px] px-6 sm:px-10 font-semibold sm:py-1 rounded-md text-base sm:text-xl text-[#1C96C3]">
            <Link to="/home">HOME</Link>
          </div>
        </nav>
      </header>

      <section className="w-4/5 mx-auto mt-[100px]">
        <h2 className="text-2xl font-bold mb-4">
          {selectedProduct ? 'Update Product' : 'Add New Product'}
        </h2>
        <form
          onSubmit={selectedProduct ? handleUpdate : handleSubmit}
          className="flex flex-col gap-4 mb-8"
          encType="multipart/form-data"
        >
          <input 
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border w-1/2 p-2 rounded-md"
          />
          <input
            type="text"
            name="type"
            value={newProduct.type}
            onChange={handleInputChange}
            placeholder="Product Type"
            className="border w-1/2 p-2 rounded-md"
          />
          <textarea
            name="desc"
            value={newProduct.desc}
            onChange={handleInputChange}
            placeholder="Product Description"
            className="border w-1/2 p-2 rounded-md"
          />
          <input
            type="text"
            name="reviews"
            value={newProduct.reviews}
            onChange={handleInputChange}
            placeholder="Product Reviews"
            className="border w-1/2 p-2 rounded-md"
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="border w-1/2 p-2 rounded-md"
          />
          <input
            type="number"
            step="0.01"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border w-1/2 p-2 rounded-md"
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="border w-1/2  p-2 rounded-md"
          />
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
              {selectedProduct ? 'Update' : 'Add'} Product
            </button>
            {selectedProduct && (
              <button type="button" onClick={cancelEdit} className="bg-gray-500 text-white py-2 px-4 rounded-md">
                Cancel
              </button>
            )}
          </div>
        </form>

        <h2 className="text-2xl font-bold mb-4">Available Products</h2>
        {/* Search bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products by name"
          className="border w-1/2 p-2 rounded-md mb-4"
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
                  <h3 className="text-lg text-center font-semibold">{product.name}</h3>
                  <p className='text-[#018ABD]'  >Type: {product.type}</p>
                  <p className='text-[#018ABD]'>Description: {product.desc}</p>
                  <p className='text-[#018ABD]' >Reviews: {product.reviews}</p>
                  <p className='text-[#018ABD]'  >Stock: {product.stock}</p>
                  <p className='text-[#018ABD]' >Price: ${product.price}</p>
                  
                </Link>
                <div className="flex gap-4">
                    <button
                      onClick={() => selectProductForEdit(product)}
                      className="bg-green-500 text-white py-1 px-3 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Vitamins;
