function initData(state, action) {
    return Object.assign({}, state, { orderDishes: action.orderDishes });
}

function add(state, action) {
    let orderDishes = [].concat(state.orderDishes);

    orderDishes.push({
        userName: action.userName,
        dishName: action.dishName,
        price: action.price,
    });

    return Object.assign({}, state, { orderDishes: orderDishes });
}

function reduce(state, action) {
    let newState = state || { orderDishes: [] };

    if(action.type === 'INIT_DATA') {
    	return initData(newState, action);
    }

    if(action.type === 'ADD_DISH') {
    	return add(newState, action);
    }

    return newState;
}

export default reduce;
