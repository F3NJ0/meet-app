Feature: Specify the number of events to be shown

  Scenario: When user hasn’t specified a number, 32 is the default number
    Given the user hasn’t specified a number of events they want to view
    When the user opens the app
    Then the default number of events that will be shown is 32

  Scenario: User can change the number of events they want to see
    Given a user has chosen the city they want to see events for
    And the list of events for this city has loaded
    When they type a number into the box “Number of Events”
    Then the according number of events will load for the respective city