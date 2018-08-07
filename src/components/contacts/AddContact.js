import React, { Component } from 'react';
import { Consumer } from '../../context';
import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

export default class AddContact extends Component {

    

    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
    }

    state = {
        errors: {}
    }
    

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (dispatch, e) => {
        e.preventDefault();
        const contact = {
            name: this.nameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            id: uuid()
        }
        if (contact.name === '') {
            this.setState({ errors: { name: 'Name required' } });
            return;
        }
        if (contact.email === '') {
            this.setState({ errors: { email: 'Email required' } });
            return;
        }
        if (contact.phone === '') {
            this.setState({ errors: { phone: 'Phone required' } });
            return;
        }
        axios.post('https://jsonplaceholder.typicode.com/users', contact)
            .then(res => dispatch({ type: 'ADD_CONTACT', payload: res.data }))
        this.nameInput.current.value = '';
        this.emailInput.current.value = '';
        this.phoneInput.current.value = '';
        this.props.history.push('/');
    }

    render() {
        const { name, email, phone } = this.props;
        const { errors } = this.state;
        return (
            <Consumer>
                {value => {
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Add Contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, value.dispatch)}>
                                    <TextInputGroup
                                        name="name"
                                        type="text"
                                        placeholder="Enter Name . . ."
                                        value={name}
                                        refName={this.nameInput}
                                        label="Sur Name"
                                        error={errors.name}
                                    />
                                    <TextInputGroup
                                        name="email"
                                        type="email"
                                        placeholder="Enter Email . . ."
                                        value={email}
                                        refName={this.emailInput}
                                        label="Email"
                                        error={errors.email}
                                    />
                                    <TextInputGroup
                                        name="phone"
                                        type="text"
                                        placeholder="Enter Phone . . ."
                                        value={phone}
                                        refName={this.phoneInput}
                                        label="Phone"
                                        error={errors.phone}
                                    />
                                    <input type="submit" value="Add Contact" className="btn btn-block btn-light" />
                                </form>
                            </div>
                        </div>
                        )
                }}
            </Consumer>
            )

       
    }
}