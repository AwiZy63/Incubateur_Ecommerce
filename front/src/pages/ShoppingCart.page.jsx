import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../stores/slices/Cart.slice';

export default function ShoppingCart() {
  const cartItems = useSelector(state => state.cart.cartItems);
  const userData = useSelector(state => state.user.userData);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  useEffect(() => {
    if (userData?.isLogged) {
      setName(userData.name);
    }
  }, [userData]);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name:", name);
    console.log("Address:", address);
    console.log("Payment method:", paymentMethod);
  }

  const handleUpdateQuantity = (event, item) => {
    if (event.target.value > 0) {
      dispatch(updateQuantity({ itemId: item.id, quantity: event.target.value }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  }

  return (
    <div className="container">
      <div className="columns mt-4">
        <div className="column is-three-quarters">
          <h1 className="title">Panier d'achat</h1>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems && cartItems.length > 0 ? cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}€</td>
                  <td><input className="input cart-quantity-input" type="number" value={item.quantity} min={1} onChange={(event) => handleUpdateQuantity(event, item)} /></td>
                  <td>{(item.price * item.quantity).toFixed(2)}€</td>
                  <td>
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="button is-danger is-small">Supprimer</button>
                  </td>
                </tr>
              )) : (<tr><td colSpan="5">Aucun produit dans le panier</td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="column">
          <div className="box">
            <h2 className="title">Récapitulatif de la commande</h2>
            <p>Total des articles : {calculateQuantity()}</p>
            <p>Prix total : {calculateTotal()}€</p>
          </div>
          <div className="box">
            <h2 className="title">Paiement</h2>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="field">
                <label className="label">Nom</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Votre nom" value={userData?.name || ""} onChange={(event) => setName(event.target.value)} disabled={userData?.isLogged} />
                </div>
              </div>
              <div className="field">
                <label className="label">Adresse</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Adresse de livraison" value={address} onChange={(event) => setAddress(event.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Méthode de paiement</label>
                <div className="control">
                  <div className="select">
                    <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                      <option value="">Choisir une méthode de paiement</option>
                      <option value="stripe">Stripe</option>
                      <option value="paypal">Paypal</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-primary">Passer la commande</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}