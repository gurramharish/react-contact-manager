import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context';
import axios from 'axios'

class Contact extends Component {
    state = {
        showContactInfo : false
    }
    onShowClick = (e) => {
        this.setState({ showContactInfo: !this.state.showContactInfo })
    }
    onDeleteClick = (id, dispatch) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => dispatch({ type: 'DELETE_CONTACT', payload: id }));
        
    }
    render() {
        const { name, email, phone, id } = this.props.contact;
        const { showContactInfo } = this.state;
        return (
            <Consumer>
                {value => {
                    return (
                        <div className="card card-body mb-3">
                            <h4>
                                {name} <i onClick={this.onShowClick} className="fas fa-sort-down" style={{ cursor: 'pointer' }} />
                                
                                <i className="fas fa-times" style={{ color: 'red', float: 'right', cursor: 'pointer' }} onClick={this.onDeleteClick.bind(this, id, value.dispatch)} />
                                <Link to={`contact/edit/${id}`}>
                                    <i className="fas fa-pencil-alt"
                                        style={{
                                            cursor: 'pointer',
                                            float: 'right',
                                            color: 'black',
                                            marginRight: '1rem'
                                        }}
                                        />
                                </Link>
                            </h4>
                            {showContactInfo &&
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        Email: {email}
                                    </li>
                                    <li className="list-group-item">
                                        Phone: {phone}
                                    </li>
                                </ul>
                            }

                        </div>
                        )
                }}
            </Consumer>


            
        ); 
    }
}

export default Contact;