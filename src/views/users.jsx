import React from 'react';
import ReactDOM from 'react-dom';
import Syncano from 'syncano';

// import Headline from './header';

const node = document.querySelector('#content');

var connection = Syncano({
	accountKey: "7f1adc626650d02b996dc0be0fb82a9a6ffbc8ae",
});

// TODO:
// w syncano dodac hasla
// edycja hasel
// edycja balansu kasy konta hajsu $$
// redux:
// 1) zdefiniowac akcje
// 2) napisac reducera
// 3) z reducera store'a (createStore(reducer))
// 4) storeToProps + dispatchToProps -> connect()(Users) => <ReduxUsers/> => <Provider store={store}><ReduxUsers/></Provider>

var DataObject = connection.DataObject;

var query = {
	instanceName: "autumn-field-2134",
	className: "user_profile"
}

class Header extends React.Component {
	render() {
		return <h1>FoodHut</h1>
	}
}

class User extends React.Component {
	render() {
		return (
			<tr>
				<td>{ this.props.user.name }</td>
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
				<User key={user.id} user={user} />
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
		this.setBalance = this.setBalance.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	setName(e) {
		this.setState({
			name: e.target.value
		});
	}
	setBalance(e) {
		this.setState({
			balance: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		var name = this.state.name;
		var balance = this.state.balance;
		if (!name || !balance) {
		  return;
		}
		this.props.onUserSubmit({name: name, balance: balance});
		this.setState({name: '', balance: 0});
	}
	render() {
		return (
			<form className="add-user" onSubmit={this.handleSubmit}>
				<input
					type="text"
					placeholder="User name"
					onChange={this.setName}
		        />
		        <input
					type="text"
					placeholder="User balance"
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
	}
    fetchUsers() {
    	DataObject
	  	.please()
	  	.list(query)
	 	.then((res) => {
	    	this.setState({ users: res })
	    });
    }
    componentDidMount() {
        this.fetchUsers();
    }
    handleUserSubmit() {

	}
	render() {
		return (
			<div>
				<Header/>
				<h3>Lista ludzi:</h3>
				<UserList users={this.state.users}/>
				<UserForm onUserSubmit={this.handleUserSubmit}/>
			</div>
		)
	}
}

ReactDOM.render(<Users/>, node);