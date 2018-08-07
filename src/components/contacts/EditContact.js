import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

export default class EditContact extends Component {

    

    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
    }

    state = {
        errors: {}
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        console.log("Edit ID: " + id);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        const contact = response.data;
        this.nameInput.current.value = contact.name;
        this.emailInput.current.value = contact.email;
        this.phoneInput.current.value = contact.phone;
    }
    

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const contact = {
            name: this.nameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value
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

        const id = this.props.match.params.id;
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, contact);

        dispatch({type:'UPDATE_CONTACT', payload: res.data});
        
        //Clear input fields
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
                            <div className="card-header">Edit Contact</div>
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
                                    <input type="submit" value="Edit Contact" className="btn btn-block btn-light" />
                                </form>
                            </div>
                        </div>
                        )
                }}
            </Consumer>
            )

       
    }
}