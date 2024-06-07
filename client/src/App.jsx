import "./App.css";

import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    axios
      .get("http://localhost:4001/products")
      .then((result) => {
        setData(result.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      setData((prevData) => prevData.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {data.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-preview">
              <img
                src={product.image || "https://via.placeholder.com/350"}
                alt={product.name}
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {product.name}</h1>
              <h2>Product price: {product.price} Baht</h2>
              <p>Product description: {product.description}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(product.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
