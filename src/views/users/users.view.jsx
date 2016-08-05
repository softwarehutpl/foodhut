import React from 'react';
import ReactDOM from 'react-dom';

// TODO:
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
			<tr>
				<td>{ this.props.user.username }</td>
				<td>{ this.props.user.profile.is_admin }</td>
				<td>{ this.props.user.profile.balance }</td>
			</tr>
		)
	}
}

class UserList extends React.Component {
  	render() {
  		var usersNodes = this.props.users.map( (user, i) => {
			return 	(
				<SingleUser key={i} user={user} />
			);
		});
  		return (
  			<table className="user-list">
  				<thead>
  					<tr>
	  					<th>Kto</th>
	  					<th>Czy admin</th>
	  					<th>Balance</th>
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

		this.state = {
			username: '',
			password: '',
			is_admin: false,
			balance: 0,
		}

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
		this.setState({
			balance: e.target.value
		});
	}
	setIsAdmin(e) {
		console.log('setisadmin',e.target.checked );
		this.setState({
			is_admin: e.target.checked
		});
	}
	render() {
		return (
			<div className="add-user">

				<input
					type="text"
					placeholder="User name"
					value={this.state.username}
					onChange={this.setName}
		        />
		        <input
					type="password"
					placeholder="Password"
					value={this.state.password}
					onChange={this.setPassword}
		        />
		        <input
					type="text"
					placeholder="User balance"
					value={this.state.balance}
					onChange={this.setBalance}
		        />
		        <label>Is admin</label>
		        <input
					type="checkbox"
					checked={this.state.is_admin}
					onChange={this.setIsAdmin}
		        />
		        <button type="button" onClick={()=> {
		        	this.props.addUser(
					this.state.username, 
					this.state.password, 
					this.state.is_admin, 
					this.state.balance
					);
					this.state = {
						username: '',
						password: '',
						is_admin: false,
						balance: 0,
					};
		        }}>
		        	Add user
		       	</button>
			</div>
		)
	}
}

class UsersView extends React.Component {
	render() {

		return (
			<div>
				<Header/>	
				<h3>Lista ludzi:</h3>
				<UserList users={this.props.users}/>
				<h4>Dodaj użytkownika:</h4>
				<UserForm addUser={this.props.addUser}/>
			</div>
		)
	}
}

export default UsersView;