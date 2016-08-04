'use strict';

import Syncano from 'syncano';

const connection = Syncano({
	accountKey: '1d478bf20e28272c6abcfd22b42a50110207de56',
	defaults: {
		instanceName: "autumn-field-2134", 
        className: "restaurants"
	}
});

export default class RestaurantSyncanoService {

	/**
	 * Add restaurant to Syncano
	 * 
	 * @param {Object} restaurant
	 * 
	 * @return {DataObject}
	 */
	static addRestaurant(restaurant) {
		return connection.DataObject
            .please()
            .create(Object.assign({}, restaurant))
        ;
	}

	/**
	 * Get active restaurants list from Syncano
	 * 
	 * @param  {String} orderBy
	 * @param  {String} orderDirection
	 * 	 
	 * @return {DataObject}
	 */
	static getActiveRestaurants(orderBy = 'name', orderDirection = 'asc') {
		return connection.DataObject
            .please()
            .list()    
            .filter({
                is_active: {_eq: true}
            })
            .orderBy(orderBy)
            .ordering(orderDirection)
        ;
	}
}