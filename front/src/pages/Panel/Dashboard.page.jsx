import React, { useEffect, useState } from 'react'
import SalesGraph from '../../components/Panel/Graphs/Sales.graph.component'
import SalesWeeklyGraph from '../../components/Panel/Graphs/SalesWeekly.graph.component'
import { apiHandler } from '../../App'
import 'moment/locale/fr';
import Moment from 'react-moment';

export default function Dashboard() {
  const [lastUsers, setLastUsers] = useState([]);
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await apiHandler.user.GetAllUsers();

      if (!users || users.error) {
        return;
      }

      const formattedData = users.users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5).map((user) => ({
        ...user,
        signUpSince: new Date(user.createdAt)
      }));

      setLastUsers(formattedData);
    }

    const fetchAllProducts = async () => {
      const sales = await apiHandler.sale.GetAllSales();

      if (!sales || sales.error) {
        return;
      }

      console.log(sales.sales)

      // const products = sales.sales.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((sale) => JSON.parse(sale.cartContent)).flat().slice(0, 5);
      // Same like above but keep createdAt date
      const sortedSales = sales.sales.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const products = [];

      sortedSales.forEach((sale) => {
        const cartContent = JSON.parse(sale.cartContent);

        cartContent.forEach((product) => {
          products.push({
            ...product,
            createdAt: sale.createdAt
          })
        })
      })

      console.log(products)
      setListProducts(products.slice(0, 5));
    }

    fetchAllUsers();
    fetchAllProducts();
  }, [])


  return (
    // TODO: Dashboard
    // - Dashboard includes a list of recents users and a list of recents purshased products (last 5)
    // - Dashboard includes graphics of the last 30 days of sales
    // - Dashboard includes a navigation to products management, users management and sales management
    <div className='container mt-5'>
      <h1 className='title'>Vue d'ensemble</h1>
      {/* Graphs */}
      <div className="columns mt-5">
        <div className="column">
          <SalesGraph />
        </div>
        <div className="column">
          <SalesWeeklyGraph />
        </div>
      </div>

      {/* Lists */}
      <div className="columns mt-5">
        <div className="column">
          <h2 className='subtitle'>5 derniers utilisateurs</h2>
          <table className='table is-bordered is-striped is-hoverable is-fullwidth'>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Date d'inscription</th>
              </tr>
            </thead>
            <tbody>
              {lastUsers?.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>Inscrit <Moment locale={'fr'} fromNow>{user.signUpSince}</Moment></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column">
          <h2 className='subtitle'>5 derniers produits achetés</h2>
          <table className='table is-bordered is-striped is-hoverable is-fullwidth'>
            <thead>
              <tr>
                <th>Nom du produit</th>
                <th>Quantité</th>
                <th>Prix</th>
                <th>Date d'achat</th>
              </tr>
            </thead>
            <tbody>
              {listProducts?.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price} €</td>
                  <td><Moment locale={'fr'} format="DD/MM/YYYY HH:mm">{product.createdAt}</Moment></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}
