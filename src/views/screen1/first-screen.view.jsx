import React from 'react';

class RestaurantElement extends React.Component {
    render() {
        return (<div className="box">
            {this.props.elementObject.name}<br/>
            {this.props.elementObject.menu_link}<br/>
            <button onClick={() => this.props.selectOrder(this.props.elementObject.id)}>Wybierz</button>
        </div>);
    }
}



class RestaurantView extends React.Component {
    constructor() {
        super();
    }
    render() {
        console.info("RENDER", this.props);
        let activeRestaurants = this.props.restaurants.map((element, i) => {        
            if(!element.ordered){
                return <RestaurantElement selectOrder={this.props.selectOrder} elementObject={element} key={i}/>;
            }
        });
        activeRestaurants = <div>{activeRestaurants}</div>;
        let newRestaurants = this.props.restaurants.map((element, i) => {
            if(element.ordered){
                return <RestaurantElement selectOrder={this.props.selectOrder} elementObject={element} key={i}/>;
            }
        });
        newRestaurants = <div>{newRestaurants}</div>;

        return (
            <div className="container">
                <h1>FOOD <span>HUT</span></h1>
                <h3>Aktywne Zamówienia:</h3>
                <div className="restaurantContainer">
                    {activeRestaurants}
                </div>
                <h3>Nowe Zamówienie:</h3>
                <div className="restaurantContainer">
                    {newRestaurants}
                </div>
            </div>
        );
    }
}

export default RestaurantView;
