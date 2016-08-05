import React from 'react';
import { Provider, connect } from 'react-redux';
import UsersView from './users.view.jsx';
import UserStore from './store.js';
import UserService from '../../services/user.service.js';

var $user = new UserService();

function storeToProps(store) {
	return {
		users: store.users,
	};
}

function dispatchToProps(dispatch) {
	return {
		addUser: function addUser(username, password, is_admin, balance) {
			dispatch({
				type: 'ADD_USER',
				username: username,
				password: password,
				is_admin: is_admin,
				balance: balance,
			});
			let user = {
				username: username,
				password: password,
				is_admin: is_admin,
				balance: balance,
			};

			$user.addUser(user)
				.then(() => {
					// fetchUsers();
				});
		}
	};
}

function fetchUsers() {
	$user.getUsers()
		.then(function(users){
			UserStore.dispatch({
				type: 'INIT_DATA',
				users: users,
			});
		});
}

let Users = connect(storeToProps, dispatchToProps)(UsersView);
fetchUsers();
export default <Provider store={UserStore}><Users/></Provider>;