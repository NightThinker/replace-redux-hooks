import React, { useContext } from 'react';
// import { useSelector } from 'react-redux';

import FavoriteItem from '../components/Favorites/FavoriteItem';
// import { ProductsContext } from '../context/product-context';
import { useStore } from '../hooks-store/store';
import './Products.css';

const Favorites = props => {
	//redux
	// const favoriteProducts = useSelector(state =>
	//   state.shop.products.filter(p => p.isFavorite)
	// );
	//context
	// const favoriteProducts = useContext(ProductsContext).products.filter(p => p.isFavorite);
	//custom store
	const state = useStore()[0];
	const favoriteProducts = state.products.filter(p => p.isFavorite);

	let content = <p className='placeholder'>Got no favorites yet!</p>;
	if (favoriteProducts.length > 0) {
		content = (
			<ul className='products-list'>
				{favoriteProducts.map(prod => (
					<FavoriteItem key={prod.id} id={prod.id} title={prod.title} description={prod.description} />
				))}
			</ul>
		);
	}
	return content;
};

export default Favorites;
