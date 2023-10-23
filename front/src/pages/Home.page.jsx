/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.component'
import ProductsCategories from '../components/ProductsCategories.component'
import { apiHandler } from '../App';
import LoadingScreen from '../components/LoadingScreen.component';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await apiHandler.product.GetProducts();
      // console.log("Products :", response);
      if (!response || response?.length <= 0) {
        return setProducts([]);
      }

      setProducts(response.products);
    }

    const fetchCategories = async () => {
      const response = await apiHandler.productCategory.GetProductCategories();
      // console.log("Categories :", response);
      if (!response || response?.length <= 0) {
        return setCategories([]);
      }

      setCategories(response.categories);
    }

    fetchProducts();
    fetchCategories();
  }, [])

  useEffect(() => {
    if (!products || products?.length <= 0) {
      return;
    }


    if (selectedCategory) {
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      
      const filteredProducts = products.filter(product => product.category === selectedCategory);
      setCurrentProducts(filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct));
      setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
      return;
    }

    if (!selectedCategory) {
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      setCurrentProducts(products.slice(indexOfFirstProduct, indexOfLastProduct));
      setTotalPages(Math.ceil(products.length / productsPerPage));
      return;
    }
    
  }, [products, currentPage, selectedCategory]);

  if ((!products || typeof (products) !== 'object') || (!categories || categories?.length <= 0)) {
    return <LoadingScreen />;
  }

  return (
    <section className="container home__container">
      <div className='categories__container'>
        <h3 className='categories__title'>Categories</h3>
        {categories.map((category, index) => (
          <ProductsCategories setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} key={index} category={category} />
        ))}
      </div>
      <div className="products__container">
        <div className="products__container-list">
          {currentProducts?.length > 0 ? currentProducts.map((product, index) => (
            <ProductCard key={index} product={product} category={categories.find(category => category.name === product.category)} setSelectedCategory={setSelectedCategory} />
          )) : <p>Aucun produit n'est disponible</p>}
        </div>


        <nav className="pagination" role="navigation" aria-label="pagination">
          <a className={`pagination-previous ${currentPage === 1 ? 'is-disabled' : ''}`} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Page précédente</a>
          <a className={`pagination-next ${currentPage === totalPages ? 'is-disabled' : ''}`} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Page suivante</a>
          <ul className="pagination-list">
            {
              Array.from({ length: totalPages }).map((_, index) => (
                <li key={index}>
                  <a className={`pagination-link ${currentPage === index + 1 ? 'is-current' : ''}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    </section >
  )
}
