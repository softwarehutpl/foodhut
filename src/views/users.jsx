import React from 'react';
import ReactDOM from 'react-dom';

const node = document.querySelector('#content'); 
 
class Users extends React.Component {
  render() {
    return <h1>Siemanko ziomeczki</h1>
  }
}
 
ReactDOM.render(<Users/>, node);