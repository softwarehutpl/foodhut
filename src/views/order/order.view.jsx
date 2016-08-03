import React from 'react';
import $user from '../../services/user.service.js';

class OrderDish extends React.Component {
	render() {
		return (<div>
			{this.props.orderDish.userName}, 
			{this.props.orderDish.dishName}, 
			{this.props.orderDish.price},
			{this.props.orderDish.fresh}
		</div>);
	}
}

class DishAdder extends React.Component {
	constructor() {
		super();
		var userService = new $user();
		$user.get
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
		this.setPrice({price: parseInt(e.target.value)});
	}

	render() {
		return (<div>
			<input value={this.state.dishName} onChange={this.setDishName}/>
			<input value={this.state.price} onChange={this.price} />
			<button onClick={()=>this.props.addDish(this.state.dishName, this.state.price)}>Add</button>
		</div>);
	}
}

class OrderView extends React.Component {
	render(){
		let orderDishesArray = this.props.orderDishes.map((orderDish, i) => {
			console.log('orderdish', orderDish);
			return <OrderDish orderDish={orderDish} key={i}/>
		});

		orderDishesArray = <div>{orderDishesArray}</div>;

		return (<div>
			<DishAdder addDish={this.props.addDish} />
			{orderDishesArray}
		</div>);
	}
}

export default OrderView;