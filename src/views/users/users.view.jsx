import React from 'react';
import ReactDOM from 'react-dom';
import Syncano from 'syncano';

const node = document.querySelector('#content');

var connection = Syncano({
	apiKey: "4a76384d8137935042a557e020ace03382cdc755",
	defaults: {
		instanceName: "autumn-field-2134",
		className: "user_profile"
	}
});

var User = connection.User;

var DataObject = connection.DataObject; 

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
				<td>{ this.props.user.is_admin }</td>
				<td>{ this.props.user.balance }</td>
			</tr>
		)
	}
}

class UserList extends React.Component {
  	render() {
  		var usersNodes = this.props.users.map( user => {
			return 	(
				<SingleUser key={user.id} user={user} />
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
			name: '',
			balance: 0
		}

		this.setName = this.setName.bind(this);
		this.setPassword = this.setPassword.bind(this);
		this.setBalance = this.setBalance.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	setName(e) {
		this.setState({
			name: e.target.value
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
	handleSubmit(e) {
		e.preventDefault();
		var username = this.state.name;
		var password = this.state.password;
		var balance = this.state.balance;
		if (!username || !password || !balance) {
		  return;
		}
		this.props.onUserSubmit({username: username, password: password, balance: balance});
		this.setState({name: '', password: '', balance: 0});
	}
	render() {
		return (
			<form className="add-user" onSubmit={this.handleSubmit}>
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
		        <input type="submit" value="Add user" />
			</form>
		)
	}
}

class Users extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			users: []
		};
		this.handleUserSubmit = this.handleUserSubmit.bind(this);
	}
    fetchUsers() {
    	DataObject
	  	.please()
	  	.list()
	 	.then((res) => {
	    	this.setState({ users: res })
	    });
    }
    componentDidMount() {
        this.fetchUsers();
    }
    handleUserSubmit(user) {
    	const users = this.state.users
	    const newUsers = users.concat([ user ])

	    this.setState({ users: newUsers })

		console.log('USER TO ADD', user)

	    User
	  	.please()
	  	.create(user);

	}
	render() {
		return (
			<div>
				<Header/>	
				<h3>Lista ludzi:</h3>
				<UserList users={this.state.users}/>
				<h4>Dodaj użytkownika:</h4>
				<UserForm onUserSubmit={this.handleUserSubmit}/>
			</div>
		)
	}
}

export default Users;