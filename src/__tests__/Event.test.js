import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let event, EventWrapper;
    beforeAll(() => {
        event = mockData[0];
        EventWrapper = shallow(<Event event={event} />);
    });

    test('render basic event info: Title equals event title', () => {
        expect(EventWrapper.find('.event-title').text()).toBe(mockData[0].summary);
    });

    test('render basic event info: Time equals event time', () => {
        expect(EventWrapper.find('.event-time').text()).toBe(mockData[0].start.dateTime);
    });

    test('render basic event info: Location equals event location', () => {
        expect(EventWrapper.find('.event-location').text()).toBe(mockData[0].location);
    });

    test('render "Show details" button correctly', () => {
        expect(EventWrapper.find('.showDetails-button')).toHaveLength(1);
    })

    test('per default details are hidden', () => {
        expect(EventWrapper.state('showDetails')).toBe(false);
    })

    test('render details when a user clicks on "Show details" Button', () => {
        EventWrapper.find('.showDetails-button').simulate('click');
        expect(EventWrapper.find('.event-details').text()).toBe(mockData[0].description);
    })

    test('hide details when a user clicks on "Hide details" Button', () => {
        EventWrapper.setState({ showDetails: true }); // Details are shown
        EventWrapper.find('.hideDetails-button').simulate('click');
        expect(EventWrapper.state('showDetails')).toBe(false);
    })

})