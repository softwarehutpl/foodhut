'use strict';

import React from 'react';

export default class RestaurantListRow extends React.Component {

    /**
     * Constructor
     * 
     * @param  {Object} props
     */
    constructor(props) {
        super(props);
        this.updateRestaurant = this.updateRestaurant.bind(this); 

        this.state = {
            updateInProgress: false
        };
    }


    updateRestaurant() {
        this.setState({
            updateInProgress: true
        });
        // hardcoded update for price change        
        this.props.restaurant.package_cost = (Math.random()*10).toFixed(2);
        this.props.restaurant.save().then(() => {
            this.setState({
                updateInProgress: false
            });
        });        
    }

  	render() {
        var restaurant = this.props.restaurant;

    	return (
    		<tr>
    			<td>
                    {restaurant.id}
                </td>
    			<td>
                    {restaurant.name}
                    </td>
    			<td>
                    {restaurant.menu_link}
                </td>
    			<td>
                    {restaurant.package_cost} zł
                </td>
          <td>
            {restaurant.id ? <button type="button" disabled={this.state.updateInProgress} onClick={this.updateRestaurant}>Edytuj</button> : ''}
          </td>
			</tr>
		);
  	}
}