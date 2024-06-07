import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [productProfiles, setProductProfiles] = useState([]);

  useEffect(() => {
    getServerData();
  }, []);

  const getServerData = async () => {
    try {
      const response = await axios.get("http://localhost:4001/products");
      console.log(response);
      setProductProfiles(response.data.data);
    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  };

  const handleDelete = (thisIndex) => {
    const newProductProfile = productProfiles.filter((_, index) => {
      return index !== thisIndex;
    });
    setProductProfiles(newProductProfile);
  };
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productProfiles.map((products, index) => {
          return (
            <div className="product" key={index}>
              <div className="product-preview">
                <img
                  src={products.image}
                  alt={products.name}
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name:{products.name}</h1>
                <h2>Product price: {products.price} Baht</h2>
                <p>Product description: {products.description}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => {
                  {
                    handleDelete(index);
                  }
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
