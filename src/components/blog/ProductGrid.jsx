import React from 'react';
import ProductCard from './ProductCard';
import { affiliateProducts } from '../../config/affiliates';

function ProductGrid({ category }) {
  const products = category
    ? affiliateProducts.filter(p => p.category === category)
    : affiliateProducts;

  if (products.length === 0) return null;

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
