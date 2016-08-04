import RestaurantList from './list.jsx';
import _ from 'underscore';

const initialState = {
    restaurants: [],
    orderBy: RestaurantList.ORDER_BY_NAME
};


function refreshList(state, action) {
    return Object.assign({}, state, { 
        restaurants: action.restaurants            
    });
}

function changeOrderBy(state, action) {
    return Object.assign({}, state, {
        orderBy: action.orderBy,      
        restaurants: _.sortBy(
            state.restaurants,
            (restaurant) => { return  typeof restaurant[action.orderBy] === 'string' ? restaurant[action.orderBy].toLowerCase() : restaurant[action.orderBy]; }
        )        
    });
}

function addRestaurant(state, action) {
    console.log(action);
    return Object.assign({}, state, {
        restaurants: _.sortBy([
            ...state.restaurants,
            {
                is_active: true, //by default true
                name: action.name,
                menu_link: action.menu_link,
                package_cost: action.package_cost
            }
        ], (restaurant) => { return typeof restaurant[state.orderBy] === 'string' ? restaurant[state.orderBy].toLowerCase() : restaurant[state.orderBy]; })
    });
}

function removeRestaurant(state, action) {
    return Object.assign({}, state, {
        restaurants: _.filter(state.restaurants, (restaurant) => { return restaurant.id !== action.restaurantId })
    });
}

function reduce(state = initialState, action) {   
    switch (action.type) {
        case 'REFRESH_LIST':
            return refreshList(state, action);
        case 'CHANGE_ORDER_BY':
            return changeOrderBy(state, action);
        case 'ADD_RESTAURANT':
            return addRestaurant(state, action);
        case 'REMOVE_RESTAURANT':
            return removeRestaurant(state, action);
        default:
            return state;
    }
}

export default reduce;