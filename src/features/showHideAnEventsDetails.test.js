import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature'); // Expects file path to start from root of project!!

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the main page is open', () => {

        });

        let EventWrapper;
        let event;
        when('the list of upcoming events is loaded', () => {
            event = mockData[0];
            EventWrapper = shallow(<Event event={event} />);
        });

        then('the event element details will be hidden', () => {
            expect(EventWrapper.find('.event-details')).toEqual({});
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        let EventWrapper;
        let event;
        given('the list of events has been loaded', () => {
            event = mockData[0];
            EventWrapper = shallow(<Event event={event} />);
        });

        when('user clicks on “Show details” button for an event', () => {
            EventWrapper.find('.showDetails-button').simulate('click');
        });

        then('the event element will be expanded to show the event details', () => {
            expect(EventWrapper.find('.event-details').text()).toBe(mockData[0].description);
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        let EventWrapper;
        let event;
        given('the “Show details” button for an event has been clicked and the details are expanded', () => {
            event = mockData[0];
            EventWrapper = shallow(<Event event={event} />);
            EventWrapper.find('.showDetails-button').simulate('click');
        });

        when('user clicks on “Hide details” button on that event', () => {
            EventWrapper.find('.hideDetails-button').simulate('click');
        });

        then('the event element will collapse again, hiding the details', () => {
            expect(EventWrapper.find('.event-details')).toEqual({});
        });
    });

});