'use strict';

import React from 'react';

export default class Restaurant extends React.Component {
  	render() {
    	return (
    		<tr>
    			<td>{this.props.item.id}</td>
    			<td>{this.props.item.name}</td>
    			<td>{this.props.item.menu_link}</td>
    			<td>{this.props.item.package_cost} zł</td>
			</tr>
		);
  	}
}