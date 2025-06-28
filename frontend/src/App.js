import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        const uniqueProducts = Array.from(new Map(data.map(product => [product._id, product])).values());
        setProducts(uniqueProducts);
      })
      .catch(error => setError(error.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  return (
    <div className="App">
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              {product.name} - ${product.price} ({product.source})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;