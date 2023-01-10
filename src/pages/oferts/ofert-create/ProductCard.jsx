/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import "./productCard.css";

export function ProductCard({ product }) {
  return (
    <div className="box-wrapper">
      <img src={product.product.img} alt="pollo" />
      <div className="box-content">
        <div className="buy">
          <span>
            <i className="fa fa-cart-plus" />
          </span>
        </div>
        <div className="title">{product.product.name}</div>
        <div className="desc">{product.product.description}</div>
        <span className="price">${product.prices[0].price1}</span>
      </div>
    </div>
  );
}
