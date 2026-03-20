import React from 'react';

function ProductCard({ product }) {
  const { name, description, amazonUrl, priceApprox, badge } = product;

  return (
    <div className="product-card">
      <div className="product-card-header">
        <h3>{name}</h3>
        {badge && <span className="product-badge">{badge}</span>}
      </div>
      <p>{description}</p>
      <div className="product-price">{priceApprox}</div>
      <a
        href={amazonUrl}
        className="product-btn"
        target="_blank"
        rel="noopener noreferrer sponsored"
      >
        Ver en Amazon →
      </a>
      <p className="product-disclaimer">Enlace de afiliado · sin coste adicional para ti</p>
    </div>
  );
}

export default ProductCard;
