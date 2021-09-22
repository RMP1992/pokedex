import React, { Component } from 'react';
import './SearchButton.css';

class Button extends Component {
    render() {
        return (
            <div>
                <button
                    onClick={this.props.handleSubmit}    
                >
                    Search
                </button>
                
            </div>
        );
    }
}

export default Button;