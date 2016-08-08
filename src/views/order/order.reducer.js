function initData(state, action) {
    return Object.assign({}, state, { 
        account: state.account, 
        orderDishes: action.orderDishes 
    });
}

function add(state, action) {
    let orderDishes = [].concat(state.orderDishes);

    orderDishes.push({
        user: { username: action.user.username},
        name: action.name,
        price: action.price,
        fresh: 'NOT ON A SERVER YET',
    });

    return Object.assign({}, state, { 
        account: state.account, 
        orderDishes: orderDishes });
}

function initAccount(state, action) {
    let orderDishes = [].concat(state.orderDishes);

    return Object.assign({}, state, {
        account: action.account,
        orderDishes: orderDishes
    });
}

function reduce(state, action) {
    let newState = state || { account: { balance: 0 }, orderDishes: [] };

    if (action.type === 'ORDER_INIT_DATA') {
        return initData(newState, action);
    }

    if (action.type === 'ADD_DISH') {
        return add(newState, action);
    }

    if (action.type === 'INIT_USER_PROFILE') {
        return initAccount(newState, action);
    }

    return newState;
}

export default reduce;
