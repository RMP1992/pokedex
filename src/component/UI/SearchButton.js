import React, { Component } from 'react';
import './SearchButton.css';

class Button extends Component {
    render() {
        return (
            <div className="btn-container">
                <button
                    onClick={this.props.handleSubmit}  
                    className="btn"  
                >
                    Search
                </button>
                
            </div>
        );
    }
}

export default Button;