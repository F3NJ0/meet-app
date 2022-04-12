import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature'); // Expects file path to start from root of project!!

defineFeature(feature, test => {
    test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('the user hasn’t specified a number of events they want to view', () => {

        });

        let AppWrapper;
        when('the user opens the app', () => {
            AppWrapper = shallow(<App />);
        });

        then('the default number of events that will be shown is 32', () => {
            expect(AppWrapper.state('numberOfEvents')).toEqual(32);
        });
    });

    test('User can change the number of events they want to see', ({ given, and, when, then }) => {
        let AppWrapper;
        given('a user has chosen the city they want to see events for', () => {
            AppWrapper = mount(<App />);
            AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
            AppWrapper.update();
            AppWrapper.find('.suggestions li').at(0).simulate('click');
        });

        and('the list of events for this city has loaded', () => {
            AppWrapper.update();
        });

        when('they type a number into the box “Number of Events”', () => {
            AppWrapper.find('.number').simulate('change', { target: { value: 1 } });
        });

        then('the according number of events will load for the respective city', () => {
            expect(AppWrapper.state('events')).toHaveLength(1)
        });
    });
})