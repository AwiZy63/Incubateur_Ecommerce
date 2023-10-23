import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { apiHandler, notify } from '../App';
import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/slices/Cart.slice';

export default function ProductDetails(props) {
  const [product, setProduct] = useState({});
  const [quantityToAdd, setQuantityToAdd] = useState(1);

  const { productId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await apiHandler.product.GetProduct(productId);

      if (response.error) {
        notify('error', response.message);
        return navigate('/');
      }

      setProduct(response.product);
    }

    if (!productId) {
      return navigate('/');
    }

    fetchProduct();
  }, [productId, navigate])

  const handleAddToBasket = () => {
    const formattedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: parseInt(quantityToAdd),
    }

    dispatch(addToCart(formattedProduct));

    setQuantityToAdd(1);
  }

  return (
    <section className="container">
      {/* Return button with bulma */}
      <Link to={'/'} className="button is-secondary mt-4"><i className='fas fa-arrow-left mr-2'></i> Return</Link>
      <div className="columns mt-4">
        <div className="column is-6">
          <figure className="image is-4by3">
            <img src={product.image} alt={product.name} />
          </figure>
        </div>
        <div className="column is-6">
          <p className="title is-4">{product.name}</p>
          <p className="subtitle is-6 mt-4">{product.description || "Aucune description n'est disponible pour ce produit."}</p>
          <p className="title is-4 mt-4">{parseFloat(product.price).toFixed(2)}€</p>
          <div className='columns'>
            <div className='column is-2'>
              <label className="label">Quantité</label>
              <input onChange={(e) => setQuantityToAdd(e.target.value)} className="input" type="number" min={1} value={quantityToAdd} defaultValue={1} />
            </div>
            <div className='column is-4'>
              <label className="label">Total</label>
              <p className="title is-4">{(parseFloat(product.price) * parseInt(quantityToAdd)).toFixed(2)}€</p>
            </div>
            <div className="column is-4">
            </div>
          </div>
          <button onClick={() => handleAddToBasket()} className="button is-primary">Ajouter au panier</button>
        </div>
      </div>
    </section>
  )
}
