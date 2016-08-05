function initData(state, action) {
    return Object.assign({}, state, { users: action.users });
}

function add(state, action) {
    let users = [].concat(state.users);

    users.push(action.user);

    return Object.assign({}, state, { users: users });
}


function reduce(state, action) {
    let newState = state || { users: [] };

    if (action.type === 'INIT_DATA') {
        return initData(newState, action);
    }

    if(action.type === 'ADD_USER') {
    	return add(newState, action);
    }

    return newState;
}

export default reduce;