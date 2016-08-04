'use strict';
function add(state, action) {
    let restaurants = [].concat(state.restaurants);

    restaurants.push({
        name: action.name,
        menu_link: action.menu_link,
        active: action.active,
    });

    return Object.assign({}, state, { restaurants: restaurants });
}

function initdata(state, action) {
    return Object.assign({}, state, { restaurants: action.restaurants });
}

function reduce(state, action) {
    let newState = state || { restaurants: [] };

    if (action.type === 'SELECT_ORDER') {
        return add(newState, action);
    }

    if (action.type === 'INIT_DATA') {
        return initdata(newState, action);
    }

    return newState;
}

export default reduce;