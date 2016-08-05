import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';

// TODO:
// USER <-> USER PROFILE
// w syncano dodac hasla
// edycja hasel
// edycja balansu kasy konta hajsu $$
// redux:
// 1) zdefiniowac akcje
// 2) napisac reducera
// 3) z reducera store'a (createStore(reducer))
// 4) storeToProps + dispatchToProps -> connect()(Users) => <ReduxUsers/> => <Provider store={store}><ReduxUsers/></Provider>


class Header extends React.Component {
	render() {
		return <h1>FoodHut</h1>
	}
}

class SingleUser extends React.Component {
	render() {
		return (
			<UserForm user={this.props.user} updateUser={this.props.updateUser} />
		)
	}
}

class UserList extends React.Component {
  	render() {
  		var usersNodes = this.props.users.map( (user, i) => {
			return 	(
				<SingleUser key={i} user={user} updateUser={this.props.updateUser} />
			);
		});
  		return (
  			<table className="user-list">
  				<thead>
  					<tr>
	  					<th>Kto</th>
	  					<th>Hasło</th>
	  					<th>Balance</th>
	  					<th>Czy admin</th>
					</tr>
  				</thead>
  				<tbody>
					{usersNodes}
				</tbody>
  			</table>
		)
  	}
}

class UserForm extends React.Component {
	constructor (props) {
		super(props);
		this.state = this.props.user;

		this.setName = this.setName.bind(this);
		this.setPassword = this.setPassword.bind(this);
		this.setBalance = this.setBalance.bind(this);
		this.setIsAdmin = this.setIsAdmin.bind(this);
	}
	setName(e) {
		console.log('setName',e.target.value);
		this.setState({
			username: e.target.value
		});
	}
	setPassword(e) {
		this.setState({
			password: e.target.value
		});
	}
	setBalance(e) {
		this.setState(_.merge({}, this.state, {
			profile: {
				balance: e.target.value,
			}
		}));
	}
	setIsAdmin(e) {
		this.setState(_.merge({}, this.state, {
			profile: {
				is_admin: e.target.checked,
			}
		}));
	}
	render() {
		let button = {};
		if(typeof this.props.addUser !== 'undefined') {
			button = (<button onClick={()=> {
				        	this.props.addUser(this.state);
							this.state = {
								username: '',
								password: '',
								profile: {
									is_admin: false,
									balance: 0
								}
							};
				        }}>
			        	Add user
			       	</button>)
		} else if(typeof this.props.updateUser !== 'undefined') {
			button = (<button onClick={()=> {
				        	this.props.updateUser(this.state);
				        	_.merge(this.state, this.state, {
				        		password: null
				        	});
				        }}>
			        	Update user
			       	</button>)
		}
		return (
			<tr className="add-user">
				<td>
					<input
						type="text"
						placeholder="User name"
						value={this.state.username}
						onChange={this.setName}
			        />
		        </td>
		        <td>
			        <input
						type="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.setPassword}
			        />
			    </td>
		        <td>
			        <input
						type="text"
						placeholder="User balance"
						value={this.state.profile.balance}
						onChange={this.setBalance}
			        />
			    </td>
		        <td>
			        <label>Is admin</label>
			        <input
						type="checkbox"
						checked={this.state.profile.is_admin}
						onChange={this.setIsAdmin}
			        />
			    </td>
			    <td>
			    	{button}
		       	</td>
			</tr>
		)
	}
}

class UsersView extends React.Component {
	render() {
		let user = {
			username: '',
			password: '',
			profile: {
				is_admin: false,
				balance: 12
			}
		}

		return (
			<div>
				<Header/>
				<h3>Lista ludzi:</h3>
				<UserList users={this.props.users} updateUser={this.props.updateUser}/>
				<h4>Dodaj użytkownika:</h4>
				<table>
					<tbody>
						<UserForm user={user} addUser={this.props.addUser}/>
					</tbody>
				</table>
			</div>
		)
	}
}

export default UsersView;