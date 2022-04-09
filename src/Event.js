import React, { Component } from 'react';

class Event extends Component {
    state = {
        showDetails: false
    };

    handleShowDetails = () => {
        this.setState({ showDetails: true })
    }

    handleHideDetails = () => {
        this.setState({ showDetails: false })
    }

    render() {
        return (
            <div className='Event'>
                <h4 className='event-title'>{this.props.event.summary}</h4>
                <p className='event-time'>{this.props.event.start.dateTime}</p>
                <p className='event-location'>{this.props.event.location}</p>
                <button className='showDetails-button' onClick={this.handleShowDetails}>Show details</button>
                {this.state.showDetails && <p className='event-details'>{this.props.event.description}</p>}
                {this.state.showDetails && <button className='hideDetails-button' onClick={this.handleHideDetails}>Hide details</button>}
            </div>
        )
    }
}

export default Event;