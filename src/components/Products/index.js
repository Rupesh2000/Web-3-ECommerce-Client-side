import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="products-container">
      {products.map((product, index) => (
        <div className="product-card" key={index}>
          <img src={product.image} alt="product" className="product-img" />
          <div className="product-details">
            <p className="product-title">
              {product.title.length >= 55
                ? `${product.title.slice(0, 55)}...`
                : product.title}
            </p>
            <div className="product-sub-details">
              <p className="product-price">
                <b>$ {product.price}</b>
              </p>
              <p>
                {[...new Array(Math.ceil(product.rating.rate))].map((e, i) => (
                  <span key={i}>★</span>
                ))}
                ({product.rating.count})
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
