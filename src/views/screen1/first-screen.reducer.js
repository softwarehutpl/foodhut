'use strict';
function add(state, action) {
    let elements = [].concat(state.elements);

    elements.push({
        elementName: action.elementName,
        elementValue: action.elementValue,
    });

    return Object.assign({}, state, { elements: elements });
}

function initdata(state, action) {
    return Object.assign({}, state, { elements: action.elements });
}

function reduce(state, action) {
    let newState = state || { elements: [] };

    if (action.type === 'ADD_ELEMENT') {
        return add(newState, action);
    }

    if (action.type === 'INIT_DATA') {
        return initdata(newState, action);
    }

    return newState;
}

export default reduce;