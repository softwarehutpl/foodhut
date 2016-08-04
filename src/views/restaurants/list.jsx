'use strict';

import React, {PropTypes} from 'react';
import Restaurant from './item.jsx';

export default class RestaurantList extends React.Component {
	constructor(props) {
        super(props);
    }

  	render() {
  		const restaurantNodes = this.props.restaurants.map( restaurant => {
			return 	(
				<Restaurant key={restaurant.id ? restaurant.id : Date.now()} restaurant={restaurant} />
			);
		});

    	return (
    		<div className="restaurantList">
	    		<h3>Knajpy</h3>
	    		<table>
	    			<thead>
	    				<tr>
		    				<th >ID</th>
		    				<th className="sortable" onClick={() => this.props.onOrderByChange('name')}>
		    					Nazwa { this.props.orderBy === RestaurantList.ORDER_BY_NAME ? <span>&darr;</span> : ''}
		    				</th>
		    				<th className="sortable"onClick={() => this.props.onOrderByChange('menu_link')}>
		    					Link do menu  { this.props.orderBy === RestaurantList.ORDER_BY_MENU_LINK ? <span>&darr;</span> : ''}
		    				</th>
		    				<th className="sortable" onClick={() => this.props.onOrderByChange('package_cost')}>
		    					Cena za opakowanie  { this.props.orderBy === RestaurantList.ORDER_BY_PACKAGE_COST ? <span>&darr;</span> : ''}
		    				</th>
		    				<th>
		    					Akcje
		    				</th>
	    				</tr>
	    			</thead>
	    			<tbody>
	    				{restaurantNodes}
    				</tbody>
				</table>
			</div>
		);
  	}
}

//Props validation
RestaurantList.propTypes = {
	restaurants: PropTypes.array.isRequired,
	orderBy: React.PropTypes.string.isRequired,
	onOrderByChange: PropTypes.func.isRequired
}

//Define class constants
Object.defineProperties(RestaurantList, {
	'ORDER_BY_NAME':  {
		value: 'name', 
		writable: false
	},
	'ORDER_BY_MENU_LINK': {
		value: 'menu_link', 
		writable: false
	},
	'ORDER_BY_PACKAGE_COST': {
		value: 'package_cost', 
		writable: false
	}
});