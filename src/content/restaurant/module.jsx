'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Syncano from 'syncano';
import RestaurantList from './list.jsx';
import _ from 'underscore';

const connection = Syncano({ accountKey: '1d478bf20e28272c6abcfd22b42a50110207de56'}),
    refreshInterval = 5 //in minutes
;

class RestaurantBox extends React.Component {
	constructor(props) {
        super(props);
        this.getRestaurants = this.getRestaurants.bind(this);
        this.handleOrderByChange = this.handleOrderByChange.bind(this);

        this.state = {
            restaurants: [],
            orderBy: 'name'
        };

    }

    handleOrderByChange(field) {
        const allowed = ['name', 'package_cost'];

        if (allowed.indexOf(field) !== -1) {
            this.setState({
                restaurants: _.sortBy(this.state.restaurants, field),
                orderBy: field
            });            
        }
    }

    getRestaurants() {      
        //console.log(connection.DataObject.please());  
        connection.DataObject
            .please()
            .list({instanceName: "autumn-field-2134", className: "restaurants"})    
            .filter({
                 is_active: {_eq: true}
            })
            .orderBy(this.state.orderBy)
            .ordering('asc') 
            .then((restaurants) => {
                this.setState({ restaurants });
            })
            .catch(() => {
                //handle error
            })
        ;           
    }

    componentDidMount() {       
        this.getRestaurants();
        setInterval(this.getRestaurants, refreshInterval*60*1000);
    }

  	render() {
    	return (
    	    <div className="restaurantBox">
                <RestaurantList 
                    restaurants={this.state.restaurants} 
                    onOrderByChange={this.handleOrderByChange}
                />
            </div>
		);
  	}
}

ReactDOM.render(<RestaurantBox/>, document.getElementById('container'));