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
	
DataObject
  	.please()
  	.list(query)		  	
 	.then((res) => {
    	console.log(res);
    });

class Header extends React.Component {
	render() {
		return <h1>FoodHut</h1>
	}
}

class User extends React.Component {
	render() {
		return (
			<tr>
				<td>Jacek</td>
				<td>Tak</td>
				<td>120</td>
			</tr>
		)
	}
}

class UserList extends React.Component {
  	render() {
  		return (
  			<table class="user-list">
  				<tbody>
	  				<tr>
	  					<th>Kto</th>
	  					<th>Czy admin</th>
	  					<th>Balance</th>
					</tr>
					<User/>
				</tbody>
  			</table>	
		)
  	}
}

// class UserForm extends React.Component {
// 	render() {

// 	}
// }

class Users extends React.Component {
	render() {
		return (
			<div>
				<Header/>
				<h3>Lista ludzi:</h3>
				<UserList/>
			</div>
		)
	}
}
 
ReactDOM.render(<Users/>, node);