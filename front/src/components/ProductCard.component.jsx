import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../stores/slices/Cart.slice';
import { notify } from '../App';

export default function ProductCard(props) {
    const { id, name, price, images, stock } = props.product;
    const { category, setSelectedCategory } = props;

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cartItems);

    if (!id || !name || !price || !images) {
        return null;
    }

    const handleAddToCart = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (stock === 0) {
            notify('error', `Le produit ${name} n'est plus en stock`);
            return;
        }

        const productInCart = cart.find(item => item.id === id);
        if (productInCart) {
            if (productInCart.quantity + 1 > stock) {
                notify('error', `Le stock du produit (${name}) est insuffisant`);
                return;
            }
        }

        const formattedProduct = {
            id,
            name,
            price,
            images,
            quantity: 1,
        }

        dispatch(addToCart(formattedProduct));
    }

    const handleSelectCategory = (event) => {
        event.stopPropagation();
        event.preventDefault();

        setSelectedCategory(category?.name);
    }

    return (
        <Link onClick={(e) => e.stopPropagation()} to={`/product/${id}`} className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img className='product-image' src={`${JSON.parse(images)[0]}`} alt={name} />
                </figure>
            </div>
            <div className="card-content">
                <div className="content">
                    <div>
                        <p className="title is-4 mb-4">{name}</p>
                    </div>
                    <div className="columns">
                        <div className="column is-5">
                            <p className="title is-4">{price.toFixed(2)}€</p>
                        </div>
                        <div className="column is-6">
                            <button disabled={stock <= 0} onClick={(event) => handleAddToCart(event)} className={`button ${stock <= 0 ? 'is-danger' : 'is-primary'}`}>{stock <= 0 ? "Hors stock" : "Ajouter au panier"}</button>
                        </div>
                    </div>
                    <div>
                        <button onClick={(event) => handleSelectCategory(event)} className="category-button subtitle is-6">{category?.label}</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
