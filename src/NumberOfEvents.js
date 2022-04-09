import React, { Component } from 'react';

class NumberOfEvents extends Component {

    handleInputChanged = event => {
        let value = event.target.value;
        if (value === '') { value = undefined }
        this.props.updateEvents(undefined, value);
    }

    render() {
        return (
            <div>
                <input type='number' className='number' onChange={this.handleInputChanged} />
            </div>
        )
    }
}

export default NumberOfEvents;