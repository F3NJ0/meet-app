import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('render a textbox to type in a number of events', () => {
        expect(NumberOfEventsWrapper.find('.number')).toHaveLength(1);
    });

    test('change state when input changes', () => {
        NumberOfEventsWrapper.setState({
            number: 32
        });
        NumberOfEventsWrapper.find('.number').simulate('change', { target: { value: 12 } }); // Simulates a user typing into the box
        expect(NumberOfEventsWrapper.state('number')).toBe(12);
    });
})
