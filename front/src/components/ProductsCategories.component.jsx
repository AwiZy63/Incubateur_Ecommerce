import React from 'react'

export default function ProductsCategories(props) {
    const { category, selectedCategory, setSelectedCategory } = props;

    const handleClick = () => {
        if (selectedCategory === category.name) {
            setSelectedCategory(null);
            return;
        }
        return setSelectedCategory(category.name);
    }

    return (
        <button onClick={handleClick} className={`button is-secondary ${selectedCategory === category ? 'button-selected' : ''}`}>{category.label}</button>
    )
}
