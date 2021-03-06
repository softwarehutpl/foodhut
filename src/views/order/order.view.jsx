import React from 'react';
import $user from '../../services/user.service.js';

class AccountBalance extends React.Component {
	render() {
		return (<div>
			<span>Welcome </span>
			{this.props.account.username}
			<span> Your balance:</span>
			{this.props.account.balance}
		</div>);
	}
}

class OrderDish extends React.Component {
	render() {
		return (<div>
			{this.props.orderDish.user.username},
			{this.props.orderDish.name},
			{this.props.orderDish.price},
			<button onClick={()=>this.props.removeDish(this.props.orderDish)}>Usuń</button>
			{this.props.orderDish.fresh}
		</div>);
	}
}

class DishAdder extends React.Component {
	constructor() {
		super();

		this.state = {
			name: '',
			price: 0
		};

		this.setName = this.setName.bind(this);
		this.setPrice = this.setPrice.bind(this);
	}

	setName(e) {
		this.setState({name: e.target.value});
	}

	setPrice(e) {
		this.setState({price: parseInt(e.target.value)});
	}

	render() {
		return (<div>
			<input value={this.state.name} onChange={this.setName}/>
			<input value={this.state.price} onChange={this.setPrice} type="number" />
			<button onClick={()=>this.props.addDish(this.state)}>Dodaj</button>
		</div>);
	}
}

class OrderView extends React.Component {
	constructor(props) {
        super(props);

        //console.log(props.routeParams.orderId);
    }

	render(){
		let total = 0;
		let orderDishesArray = this.props.orderDishes.map((orderDish, i) => {
			total +=orderDish.price;
			return <OrderDish orderDish={orderDish} key={i} removeDish={this.props.removeDish}/>
		});

		orderDishesArray = <div>{orderDishesArray}</div>;

		return (<div>
			<AccountBalance account={this.props.account} />
			<DishAdder addDish={this.props.addDish} />
			{orderDishesArray}
			Kwota: {total}
		</div>);
	}
}

export default OrderView;