import React from 'react';
import ReactDOM from 'react-dom';
import Syncano from 'syncano';

// import Headline from './header';

const node = document.querySelector('#content'); 

const connection = Syncano({ accountKey: "7f1adc626650d02b996dc0be0fb82a9a6ffbc8ae"});
	
connection.DataObject
  	.please()
  	.list({instanceName: "autumn-field-2134", className: "user_profile"})		  	
 	.then((user_profile) => {
    	console.log(user_profile);
    });

class Headline extends React.Component {
	render() {
		return <h1>FoodHut</h1>
	}
}

class UserList extends React.Component {
  	render() {

  	}
}

class Users extends React.Component {
	render() {
		return (
			<div>
			<Headline/>
				<h3>Lista ludzi:</h3>
			</div>
		)
	}
}
 
ReactDOM.render(<Users/>, node);