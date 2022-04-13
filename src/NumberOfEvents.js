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
                <label>Number of events to show:</label>
                <input
                    type='number'
                    className='number'
                    placeholder='Number'
                    onChange={this.handleInputChanged}
                />
            </div>
        )
    }
}

export default NumberOfEvents;