import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        number: 32
    }

    handleInputChanged = event => {
        const value = event.target.value;
        this.setState({
            number: value
        });
    }

    render() {
        return (
            <div>
                <input type='number' className='number' value={this.state.number} onChange={this.handleInputChanged} />
            </div>
        )
    }
}

export default NumberOfEvents;