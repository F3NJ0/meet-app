import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
  './api';
import { WarningAlert } from './Alert';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32, // default value
    warningText: '',
    showWelcomeScreen: undefined
  }

  updateNumberOfEvents = (eventCount) => {
    this.setState({
      numberOfEvents: eventCount
    })
    this.updateEvents(this.state.currentLocation, eventCount);
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events => {
      if (eventCount !== undefined) {
        this.setState({
          numberOfEvents: eventCount
        })
      }
      // filter event list by location
      let eventList = location !== 'all' ?
        events.filter(event => event.location === location) :
        events

      // Shorten event list
      let shortEventList = eventList.slice(0, this.state.numberOfEvents)

      // Assign value to events state, assign currentLocation
      this.setState({
        events: shortEventList,
        currentLocation: location
      });
    }));
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          if (!navigator.onLine) {
            this.setState({
              events,
              locations: extractLocations(events),
              warningText: 'You are offline. The displayed event list may not be up to date.'
            });
          } else {
            this.setState({
              events,
              locations: extractLocations(events),
              warningText: ''
            });
          }
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents} />
        <WarningAlert id='warningAlert' text={this.state.warningText} />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
