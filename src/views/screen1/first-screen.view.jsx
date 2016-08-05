import React from 'react';

class OrderElement extends React.Component {
    render() {
        return (<div className="box">
            {this.props.elementObject.name}<br/>
            {this.props.elementObject.menu_link}<br/>
            <button onClick={() => this.props.selectOrder(this.props.elementObject.id)}>Wybierz</button>
        </div>);
    }
}
class RestaurantElement extends React.Component {
    render() {
        return (<div className="box">
            {this.props.elementObject.name}<br/>
            {this.props.elementObject.menu_link}<br/>
            <button onClick={() => this.props.selectRestaurant(this.props.elementObject.id)}>Wybierz</button>
        </div>);
    }
}




class RestaurantView extends React.Component {
    constructor() {
        super();
    }
    render() {
        let orders = this.props.orders || [];
        let activeOrders = [];
        let activeRestaurants = [];
        let restaurants = this.props.restaurants || [];

        restaurants.map((element, i) => {        
            let isOrdered = false;
            orders.map((element2, i) => {       
                if(element2.restaurant.value===element.id && !element2.is_closed) {
                    isOrdered = true;
                }
                
            });
            if(isOrdered) {
                activeOrders.push(<OrderElement selectOrder={this.props.selectOrder} elementObject={element} key={i}/>);
            } else {
                activeRestaurants.push(<OrderElement selectRestaurant={this.props.selectRestaurant} elementObject={element} key={i}/>);
            }
        });


        return (
            <div className="container">
                <h1>FOOD <span>HUT</span></h1>
                <h3>Aktywne Zamówienia:</h3>
                <div className="restaurantContainer">
                    {activeOrders}
                </div>
                <h3>Nowe Zamówienie:</h3>
                <div className="restaurantContainer">
                    {activeRestaurants}
                </div>
            </div>
        );
    }
}

export default RestaurantView;
