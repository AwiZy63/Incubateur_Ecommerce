import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { apiHandler, notify } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../stores/slices/Cart.slice';
import LoadingScreen from '../components/LoadingScreen.component';

export default function ProductDetails(props) {
  const [product, setProduct] = useState({});
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const { productId } = useParams();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await apiHandler.product.GetProduct(productId);

      if (response.error) {
        notify('error', response.message);
        return navigate('/');
      }

      setProduct(response.product);
      if (response.product.stock <= 0) {
        setQuantityToAdd(0);
      }
    }

    if (!productId) {
      return navigate('/');
    }

    fetchProduct();
  }, [productId, navigate])

  const handleAddToBasket = () => {
    if (product.stock <= 0 || product.stock < quantityToAdd) {
      notify('error', `Le stock du produit (${product.name}) est insuffisant`);
      return;
    }

    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart) {
      if (productInCart.quantity + parseInt(quantityToAdd) > product.stock) {
        notify('error', `Le stock du produit (${product.name}) est insuffisant`);
        return;
      }
    }

    const formattedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      quantity: parseInt(quantityToAdd),
    }

    dispatch(addToCart(formattedProduct));

    setQuantityToAdd(1);
  }

  if (!product || !product.id) {
    return <LoadingScreen />
  }

  const handleImageChange = (direction) => {
    if (direction === 'next') {
      if (currentImage + 1 >= JSON.parse(product.images).length) {
        return setCurrentImage(0);
      }
      return setCurrentImage(currentImage + 1);
    }

    if (direction === 'previous') {
      if (currentImage - 1 < 0) {
        return setCurrentImage(JSON.parse(product.images).length - 1);
      }
      return setCurrentImage(currentImage - 1);
    }
  }

  return (
    <section className="container">
      {/* Return button with bulma */}
      <Link to={'/'} className="button is-secondary mt-4"><i className='fas fa-arrow-left mr-2'></i> Return</Link>
      <div className="columns mt-4">
        <div className="column is-6">
          <div className="columns is-vcentered carousel-container">
            <div className="column is-one-fifth carousel-arrow">
              {JSON.parse(product.images).length > 1 &&
                <button onClick={() => handleImageChange('previous')} className='button is-primary is-small'><i className='fas fa-arrow-left'></i></button>
              }
            </div>
            <div className="column">
              <figure className="image is-4by3">
                <img className='product-image' src={JSON.parse(product.images)[currentImage]} alt={product.name} />
              </figure>
            </div>
            <div className="column is-one-fifth carousel-arrow">
              {JSON.parse(product.images).length > 1 &&
                <button onClick={() => handleImageChange('next')} className='button is-primary is-small'><i className='fas fa-arrow-right'></i></button>
              }
            </div>
          </div>
        </div>
        <div className="column is-6">
          <p className="title is-4">{product.name}</p>
          <p className="subtitle is-6 mt-4">{product.description || "Aucune description n'est disponible pour ce produit."}</p>
          {
            product.stock <= 0 ?
              <p className="subtitle color-red is-6 mt-4">Produit actuellement hors stock</p>
              :
              <p className="subtitle is-6 mt-4">Stock disponible: {product.stock}</p>

          }
          <p className="title is-4 mt-4">{parseFloat(product.price).toFixed(2)}€</p>
          <div className='columns'>
            <div className='column is-2'>
              <label className="label">Quantité</label>
              <input disabled={product.stock <= 0} onChange={(e) => product.stock > 0 && setQuantityToAdd(e.target.value)} className="input" type="number" min={1} value={quantityToAdd} />
            </div>
            <div className='column is-4'>
              <label className="label">Total</label>
              <p className="title is-4">{(parseFloat(product.price) * parseInt(quantityToAdd)).toFixed(2)}€</p>
            </div>
            <div className="column is-4">
            </div>
          </div>
          <button disabled={product.stock <= 0} onClick={() => handleAddToBasket()} className={`button ${product.stock <= 0 ? 'is-danger' : 'is-primary'}`}>{product.stock <= 0 ? "Hors stock" : "Ajouter au panier"}</button>
        </div>
      </div>
    </section>
  )
}
