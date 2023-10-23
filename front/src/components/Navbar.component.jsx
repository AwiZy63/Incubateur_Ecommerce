import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { removeFromCart, updateQuantity } from '../stores/slices/Cart.slice';
import { apiHandler, notify } from '../App';
import { logout } from '../stores/slices/User.slice';

export default function Navbar(props) {
    const { profileDropdownActive, setProfileDropdownActive, cartDropdownActive, setCartDropdownActive } = props;

    const cart = useSelector(state => state.cart.cartItems);
    const userData = useSelector(state => state.user.userData);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLink = () => {
        setProfileDropdownActive(false)
        setCartDropdownActive(false)
    }

    const handleLogout = async () => {

        const response = await apiHandler.user.SignOut();
        notify('info', response.message);
        dispatch(logout());

        navigate('/', { replace: true });
    }

    useEffect(() => {
        if (cart.length > 0) {
            cart.forEach(async (item) => {
                const itemStock = await apiHandler.product.GetProductStock(item.id);

                if (!itemStock || itemStock?.error) {
                    return false;
                }

                if (itemStock.stock === 0) {
                    dispatch(removeFromCart({ itemId: item.id, outOfStock: true }));
                    notify('error', `Le produit ${item.name} n'est plus en stock`);
                    return false;
                }

                if (itemStock.stock < item.quantity) {
                    dispatch(updateQuantity({ itemId: item.id, quantity: itemStock.stock }));
                    notify('error', `Le stock du produit (${item.name}) est insuffisant, votre panier a été mis à jour`);
                    return false;
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="container">
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }} className="navbar-brand">
                    <Link to={"/"}>
                        <h1 className="title is-4 has-text-white">Ecommerce</h1>
                    </Link>
                    {/* Cart and Profile and searchbar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* <div className="navbar-item">
                            <input className="input" type="text" placeholder="Search" />
                        </div> */}
                        <div className="navbar-item">
                            <div className="buttons">
                                {/* shopping cart dropdown for resume of command and link to /cart */}
                                <div className={`dropdown is-right ${cartDropdownActive && "is-active"}`}>
                                    <div className="dropdown-trigger">
                                        <button onClick={() => { setCartDropdownActive(!cartDropdownActive); setProfileDropdownActive(false) }} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                            <span><i className="fas fa-shopping-cart"></i></span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                        <div className="dropdown-content">
                                            {/* CREATE TABLE WITH PRODUCTS IN CART AND OPTION TO DELETE ONE WITH ICON */}
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
                                                    {cart && cart.length > 0 ? cart.map((item) => (
                                                        <tr key={item.id} id={`cart-item-${item.id}`}>
                                                            <td>{item.name}</td>
                                                            <td>{item.price}€</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{(item.price * item.quantity).toFixed(2)}€</td>
                                                            <td>
                                                                <button onClick={() => dispatch(removeFromCart({ itemId: item.id }))} className="button is-danger is-small">Supprimer</button>
                                                            </td>
                                                        </tr>
                                                    )) : (<tr><td colSpan="5">Aucun produit dans le panier</td></tr>)}
                                                    <tr>
                                                        <td colSpan="5">Montant total : {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}€</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Link onClick={() => handleLink()} to={"/cart"} className="dropdown-item"><i className="fas fa-shopping-cart"></i> Voir le panier</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="buttons">
                                <div className={`dropdown ${profileDropdownActive && "is-active"}`}>
                                    <div className="dropdown-trigger">
                                        <button onClick={() => { setProfileDropdownActive(!profileDropdownActive); setCartDropdownActive(false) }} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                            <span><i className="fas fa-user"></i></span>
                                            <span className="icon is-small">
                                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                        <div className="dropdown-content">
                                            {userData?.isLogged ?
                                                <>
                                                    <Link onClick={() => handleLink()} to={"/account"} className="dropdown-item">Profil</Link>
                                                    <Link onClick={() => { handleLink(); handleLogout() }} className="dropdown-item">Déconnexion</Link>
                                                </>
                                                :
                                                <>
                                                    <Link onClick={() => handleLink()} to={"/signup"} className="dropdown-item">Inscription</Link>
                                                    <Link onClick={() => handleLink()} to={"/signin"} className="dropdown-item">Connexion</Link>
                                                </>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
