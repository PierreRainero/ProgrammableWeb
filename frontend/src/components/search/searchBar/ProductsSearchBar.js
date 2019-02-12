import React from 'react';
import SearchBar from './SearchBar';
import history from '../../../history';

/**
 * Search bar parameterized for searching products by name.
 */
class ProductsSearchBar extends React.Component {
    /**
     * Use search bar to find products using their name
     */
    searchProductsForName= (nameToSearch) => {
		if(!nameToSearch || nameToSearch === ''){
            return;
        }
        
        history.push({
            pathname: '/products',
            data: { searchingValue: nameToSearch }
        });
    }

    /**
     * Render the component
     */
    render() {
        return (
            <SearchBar 
                    placeholder='Rechercher un produit'
                    searchToDo={this.searchProductsForName}
            />
        );
    }
}

export default ProductsSearchBar;