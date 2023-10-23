import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.component'
import ProductsCategories from '../components/ProductsCategories.component'
import { apiHandler } from '../App';
import LoadingScreen from '../components/LoadingScreen.component';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await apiHandler.product.GetProducts();
      // console.log("Products :", response);
      setProducts(response.products);
    }

    const fetchCategories = async () => {
      const response = await apiHandler.productCategory.GetProductCategories();
      // console.log("Categories :", response);
      setCategories(response.categories);
    }

    fetchProducts();
    fetchCategories();
  }, [])
  

  const [selectedCategory, setSelectedCategory] = useState(null);

  if ((!products || typeof(products) !== 'object') || (!categories || categories?.length <= 0)) {
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
        {products?.length > 0 ? products.filter(product => selectedCategory ? product.category === selectedCategory : true).map((product, index) => (
          <ProductCard key={index} product={product} />
        )) : <p>Aucun produit n'est disponible</p>}
      </div>
    </section>
  )
}
