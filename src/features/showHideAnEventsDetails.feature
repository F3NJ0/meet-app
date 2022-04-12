Feature: Show/Hide event details

  Scenario: An event element is collapsed by default
    Given the main page is open
    When the list of upcoming events is loaded
    Then the event element details will be hidden

  Scenario: User can expand an event to see its details
    Given the list of events has been loaded
    When user clicks on “Show details” button for an event
    Then the event element will be expanded to show the event details

  Scenario: User can collapse an event to hide its details
    Given the “Show details” button for an event has been clicked and the details are expanded
    When user clicks on “Hide details” button on that event
    Then the event element will collapse again, hiding the details