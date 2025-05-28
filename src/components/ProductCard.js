// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
    return (
        <div className="product-card">
            <span className="badge">Nouveau</span>
            <img src={`/images/${product.image}`} alt={product.name} />
            <h3>
                <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>
            <p>{product.price.toLocaleString()} DZD</p>
            <Link to={`/product/${product.id}`} className="add-btn">Voir</Link>
        </div>
    );
}
