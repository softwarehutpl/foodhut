import React from 'react';

class TestElement extends React.Component {
    render() {
        return (<div>
            {this.props.elementObject.name},
            {this.props.elementObject.menu_link},
            <button onClick={() => this.props.removeElement(this.props.elementObject.id)}>Delete</button>
        </div>);
    }
}

class TestAdder extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            menu_link: 'https://'
        };

        this.setName = this.setName.bind(this);
        this.setMenuLink = this.setMenuLink.bind(this);
    }
    setName(e) {
        this.setState({name: e.target.value});
    }
    setMenuLink(e) {
        this.setState({menu_link: e.target.value});
    }
    render() {
        return (
            <div>
                <input value={this.state.name} onChange={this.setName}/>
                <input value={this.state.menu_link} onChange={this.setMenuLink}/>
                <button onClick={() => this.props.addElement(this.state.name, this.state.menu_link)}>Add</button>
            </div>);
    }
}

class TestView extends React.Component {
    constructor() {
        super();
    }
    render() {
        console.info("RENDER", this.props);
        let elementsArray = this.props.elements.map((element, i) => {
            return <TestElement removeElement={this.props.removeElement} elementObject={element} key={i}/>;
        });

        elementsArray = <div>{elementsArray}</div>;

        return (<div>
            {elementsArray}
            <TestAdder addElement={this.props.addElement} />
        </div>);
    }
}

export default TestView;
