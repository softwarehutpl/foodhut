import React from 'react';
import ReactDOM from 'react-dom';
import Syncano from 'syncano';

// import Headline from './header';

const node = document.querySelector('#content'); 

var connection = Syncano({ 
	accountKey: "7f1adc626650d02b996dc0be0fb82a9a6ffbc8ae",
});

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
	render() {
		return (
			<div>
				<Header/>
				<h3>Lista ludzi:</h3>
				<UserList users={this.state.users}/>
			</div>
		)
	}
}
 
ReactDOM.render(<Users/>, node);