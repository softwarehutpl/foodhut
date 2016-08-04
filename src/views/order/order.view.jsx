import React from 'react';
import $user from '../../services/user.service.js';

class AccountBalance extends React.Component {
	render() {
		return (<div>
			<span>Your balance:</span>
			{this.props.account.balance}
		</div>);
	}
}

class OrderDish extends React.Component {
	render() {
		return (<div>
			{this.props.orderDish.userName},
			{this.props.orderDish.dishName},
			{this.props.orderDish.price},
			{this.props.orderDish.fresh}
			<button onClick={()=>this.props.removeDish(this.props.orderDish.id)}>Remove</button>
		</div>);
	}
}

class DishAdder extends React.Component {
	constructor() {
		super();

		this.state = {
			dishName: '',
			price: 0
		};

		this.setDishName = this.setDishName.bind(this);
		this.setPrice = this.setPrice.bind(this);
	}

	setDishName(e) {
		this.setState({dishName: e.target.value});
	}

	setPrice(e) {
		this.setState({price: parseInt(e.target.value)});
	}

	render() {
		return (<div>
			<input value={this.state.dishName} onChange={this.setDishName}/>
			<input value={this.state.price} onChange={this.setPrice} type="number" />
			<button onClick={()=>this.props.addDish(this.state.dishName, this.state.price)}>Add</button>
		</div>);
	}
}

class OrderView extends React.Component {
	render(){
		let orderDishesArray = this.props.orderDishes.map((orderDish, i) => {
			return <OrderDish orderDish={orderDish} key={i} removeDish={this.props.removeDish}/>
		});

		orderDishesArray = <div>{orderDishesArray}</div>;

		return (<div>
			<AccountBalance account={this.props.account} />
			<DishAdder addDish={this.props.addDish} />
			{orderDishesArray}
		</div>);
	}
}

export default OrderView;