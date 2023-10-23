import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/slices/Cart.slice';

export default function ProductCard(props) {
    const { id, name, price, image } = props.product;

    const dispatch = useDispatch();


    if (!id || !name || !price || !image) {
        return null;
    }

    const handleAddToCart = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const formattedProduct = {
            id,
            name,
            price,
            image,
            quantity: 1,
        }

        dispatch(addToCart(formattedProduct));
    }

    return (
        <Link onClick={(e) => e.stopPropagation()} to={`/product/${id}`} className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={`${image}`} alt={name} />
                </figure>
            </div>
            <div className="card-content">
                <div className="content">
                    <div>
                        <p className="title is-4 mb-4">{name}</p>
                    </div>
                    <div className="columns">
                        <div className="column is-6">
                            <p className="title is-4">{price.toFixed(2)}€</p>
                        </div>
                        <div className="column is-6">
                            <button onClick={(event) => handleAddToCart(event)} className="button is-primary">Add to basket</button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
