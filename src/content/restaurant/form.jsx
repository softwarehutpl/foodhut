'use strict';

import React from 'react';
import Validation from 'react-validation';

export default class RestaurantForm extends React.Component {

    /**
     * Constructor
     * 
     * @param  {Object} props
     */
    constructor(props) {
        super(props);

        /* https://facebook.github.io/react/docs/reusable-components.html#no-autobinding */        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleMenuLinkChange = this.handleMenuLinkChange.bind(this);
        this.handlePackageCostChange = this.handlePackageCostChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = this.getInitialStateObject();
    }

    /**
     * Return initial state of component
     * 
     * @return {Object}
     */
    getInitialStateObject() {
        return {
            name: '',
            menuLink: '',
            packageCost: ''
        };
    }

    /**
     * Handle restaurant name change
     * 
     * @param  {SyntheticEvent} event
     */
    handleNameChange(event) {
        let name = event.target.value;

        this.setState({name: name.trim()});
    }

    /**
     * Handle restaurant menu link change
     * 
     * @param  {SyntheticEvent} event
     */
    handleMenuLinkChange(event) {
        let menuLink = event.target.value;

        this.setState({menuLink: menuLink.trim()});
    }

    /**
     * Handle restaurant package cost change
     * 
     * @param  {SyntheticEvent} event
     */
    handlePackageCostChange(event) {
        let packageCost = event.target.value;

        this.setState({packageCost: packageCost.trim()});
    }

    /**
     * Handle form submission
     * 
     * @param  {SyntheticEvent} event
     */
    handleSubmit(event) {
        event.preventDefault();

        if (this.state.name.length > 0) {
            this.props.onRestaurantAddition({
                is_active: true, //by default true
                name: this.state.name,
                menu_link: this.state.menuLink,
                package_cost: this.state.packageCost
            });
            this.setState(this.getInitialStateObject());
        }
    }

    /**
     * @return {JSX}
     */
    render() {
        return (
            <div>
                <h5>Dodaj nową knajpę:</h5>
                <form className="restaurantForm" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nazwa knajpy"
                        value={this.state.name}
                        onChange={this.handleNameChange}                        
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Link do menu"
                        value={this.state.menuLink}
                        onChange={this.handleMenuLinkChange}
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Cena za opakowanie"
                        value={this.state.packageCost}
                        onChange={this.handlePackageCostChange}
                    />
                    <br />
                    <input type="submit" value="Dodaj" />
                </form>

                <br />
                <h5>Demo form validation</h5>
                <Validation.Form>
                   
                     <Validation.Input
                        className='ui-input'
                        validations={[
                            {
                                rule: 'isURL',
                                errorMessage: 'Pełny adres url z http(s)://'
                            }
                        ]}
                        name='menu_link'
                        type='text'
                        placeholder="Link do menu"
                    />

                    <Validation.Input                  
                        className='ui-input'
                        validations={[{
                            rule: 'isFloat',
                            errorMessage: 'Cena może się składać tylko z liczb i `.`'
                        }]}
                        name='package_cost'
                        type='text'
                        placeholder="Cena za opakowanie"
                    />
                 
                    <Validation.Button blocking='button' value='Dodaj'/>
                </Validation.Form>
            </div>
        );
    }
}