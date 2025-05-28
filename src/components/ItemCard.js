import React from 'react';
import { Link } from 'react-router-dom';
import './ItemCard.css';

export default function ItemCard({ product, onAdd }) {
    return (
        <div className="item-card">
            {/* Badge "Nouveau" si vues < 10 */}
            {product.views < 10 && (
                <div className="badge-new">Nouveau</div>
            )}

            <Link to={`/product/${product.id}`} className="item-link">
                <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                    className="item-image"
                />
                <h3 className="item-name">{product.name}</h3>
                <p className="item-price">{product.price.toLocaleString()} DZD</p>
            </Link>

            <button
                className="add-button"
                onClick={() => onAdd(product)}
                aria-label={`Ajouter ${product.name} au panier`}
            >
                 Ajouter au panier
            </button>
        </div>
    );
}

