import React, { Component } from 'react';

class Test extends Component {

    state = {
        title: ''
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(data => this.setState({
                title: data.title,
                body: data.body
            }))
    }

    render() {
        const { title, body } = this.state;
        return (
            <div>
                <h1 className="display-4">Test Component</h1>
                <p className="lead">
                    {title}
                </p>
                <p className="lead">
                    {body}
                </p>
            </div>
            )
    }
}

export default Test;