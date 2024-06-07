import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const result = await axios.get("http://localhost:4001/products");
    console.log(result);
    setData(result.data.data);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    setData(data.filter((product) => product.id !== id));
  };
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {data.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>

              <div className="product-detail">
                <h1>{product.name}</h1>
                <h2>{product.price}</h2>
                <p>{product.description}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(product.id)}
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
