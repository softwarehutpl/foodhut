// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
// import Header from './common/Header';
// import {connect} from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div>
                	<nav>
                		<IndexLink to="/" activeClassName="active">Home</IndexLink>
                        {" | "}
                        <IndexLink to="/dashboard" activeClassName="active">Dashboard</IndexLink>
                		{" | "}
				      	<IndexLink to="/users" activeClassName="active">Users</IndexLink>
					    {" | "}
					    <Link to="/order" activeClassName="active">Order</Link>
					    {" | "}
					    <Link to="/restaurants" activeClassName="active">Restaurants</Link>
				    </nav>
                </div>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;