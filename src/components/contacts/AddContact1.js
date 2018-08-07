import React, { Component } from 'react';

export default class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: ''
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        const { name, email, phone } = this.state;
        return (
            <div className="card mb-3">
                <div className="card-header">Add Contact</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                className="form-control form-control-lg"
                                type="text"
                                name="name"
                                placeholder="Enter Name. . ."
                                value={name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                className="form-control form-control-lg"
                                type="email"
                                name="email"
                                placeholder="Enter Email. . ."
                                value={email}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                className="form-control form-control-lg"
                                type="text"
                                name="phone"
                                placeholder="Enter Phone Number. . ."
                                value={phone}
                                onChange={this.onChange}
                            />
                        </div>
                        <input type="submit" value="Add Contact" className="btn btn-block btn-light"/>
                    </form>
                </div>
            </div>
        )
    }
}