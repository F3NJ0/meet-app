import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32 // default value
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events => {
      let eventList = events;
      // filter event list by location
      if (location !== undefined) {
        if (location !== 'all') {
          eventList = events.filter(event => event.location === location)
        }
      }

      // Shorten event list
      let shortEventList = (eventCount === undefined) ?
        eventList.slice(0, this.state.numberOfEvents) :
        eventList.slice(0, eventCount)

      // Assign value to events state
      this.setState({
        events: shortEventList
      });
    }));
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
