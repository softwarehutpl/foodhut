import React from 'react';
import { Provider, connect } from 'react-redux';
import UsersView from './users.view.jsx';
import UserService from '../../services/user.service.js';
import Store from '../../store';

var $user = new UserService();

function storeToProps(store) {
	return {
		users: store.users.users,
	};
}

function dispatchToProps(dispatch) {
	return {
		addUser: function addUser(user) {
			dispatch({
				type: 'ADD_USER',
				user: user,
			});

			$user.addUser(user)
				.then(() => {
					fetchUsers();
				});
		},
		updateUser: function updateUser(user) {
			console.log('userrr', user);
			$user.updateUser(user)
				.then(()=>{
					fetchUsers();
				});
		}
	};
}

function fetchUsers() {
	$user.getUsers()
		.then(function(users){			
			Store.dispatch({
				type: 'USERS_INIT_DATA',
				users: users,
			});
		});
}

fetchUsers();

export default connect(storeToProps, dispatchToProps)(UsersView);