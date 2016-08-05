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
			UserStore.dispatch({
				type: 'INIT_DATA',
				users: users,
			});
		});
}

let Users = connect(storeToProps, dispatchToProps)(UsersView);
fetchUsers();
export default <Provider store={UserStore}><Users/></Provider>;