'use strict';

import React from 'react';
import RestaurantList from './list.jsx';
import RestaurantForm from './form.jsx';

class RestaurantsPage extends React.Component {
  	render() {
    	return (
    	    <div className="restaurantBox">
                <RestaurantList 
                    restaurants={this.props.restaurants} 
                    onOrderByChange={this.props.changeOrderBy}
                    orderBy={this.props.orderBy}
                />
                <br /><br />
                <RestaurantForm 
                    onRestaurantAddition={this.props.addRestaurant}
                />
            </div>
		);
  	}
}

export default RestaurantsPage;