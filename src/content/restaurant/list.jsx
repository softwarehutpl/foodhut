'use strict';

import React from 'react';
import Restaurant from './item.jsx';

export default class RestaurantList extends React.Component {
	constructor(props) {
        super(props); 
    }

  	render() {
  		const restaurantNodes = this.props.restaurants.map( restaurant => {
			return 	(
				<Restaurant key={restaurant.id} item={restaurant} />
			);
		});

    	return (
    		<div>
	    		<h3>Knajpy</h3>
	    		<table>
	    			<thead>
	    				<tr>
		    				<th >ID</th>
		    				<th onClick={ () => this.props.onOrderByChange('name')}>Nazwa</th>
		    				<th>Link do menu</th>
		    				<th onClick={ () => this.props.onOrderByChange('package_cost')}>Cena za opakowanie</th>
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