import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  	render() {
	    return (
	      	<div >
	        	<h1>FoodHut</h1>
	        	<p></p>
	        	Go to order 28: <Link to={{pathname: '/order', query: { orderId:28} }} className="btn btn-primary btn-lg">http://localhost:8080/order?orderId=28</Link>.
	        	<br />
	        	Go to order 28:  <Link to="/order/28" className="btn btn-primary btn-lg">http://localhost:8080/order/28</Link>.
	      	</div>
	    );
  	}
}

export default HomePage;