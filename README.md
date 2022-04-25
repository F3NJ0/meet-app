# Meet-app

## Description
The goal of this project is to build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

### What technology did I use and why?

For the frontend of my femmovies application I chose **React**. The main reasons are
* type of application: I need a library helping me build the UI of my app. React is suited best for the view side of the mvc approach and its virtual DOM ensures faster rendering of views
* scope: The component-based nature of React allows me to increase the scope of my web application with little to no performance issues or concerns about entropy.
* good documentation: for a beginner like me, it is important that the tools I use are well documented, so that I can understand the different components I work with. Another factor in my decision was, that it is kept up to date. In case of a library developed and maintained by Facebook, that is not a problem.
* popularity: React is in high demand at the moment. This can be seen in job ad, the stars on GitHub (187k) as well as the contributions to stack overflow. This support in the developer community ensures that Il will eventually find solutions when troubleshooting.

* mobile version: with its associated ecosystem of tools, React is also a good springboard for my next project, where I want to use React Native for a mobile application. So getting familiar with React first is valuable.


I created the application using the **Create React App** boilerplate, enabling the pwa template to transfer the app into a PWA in the development process:
```bash
npx create-react-app meet --template cra-template-pwa --use-npm
```


### Key features

* Filter events by city.
* Show/hide event details.
* Specify number of events.
* Use the app when offline.
* Add an app shortcut to the home screen.
* View a chart showing the number of upcoming events by city.

### User stories and tesing scenarios
* As a user, I would like to be able to show/hide event details so that I can see more/less information about an event. 
1.	Scenario 1: An event element is collapsed by default
Given the main page is open
When a user search for a city and the events are loaded
Then the event element details will be hidden
2.	Scenario 2: User can expand an event to see its details
Given the list of events has been loaded
When user clicks on “Show details” button for an event
Then the event element will be expanded to show the event details
3.	Scenario 3: User can collapse an event to hide its details
Given the “Show details” button for an event has been clicked and the details are expanded
When user clicks on “Hide details” button on that event
Then the event element will collapse again, hiding the details

* As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once. 
1.	Scenario 1: When user hasn’t specified a number, 32 is the default number
Given a user has chosen the city they want to see events for
When the user doesn’t specify a number of events they want to view
Then the default number will be set to 32
2.	Scenario 2: User can change the number of events they want to see
Given a user has chosen the city they want to see events for
When they type a number into the box “Number of Events”
Then the according number of events will load for the respective city

* As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online. 
1.	Scenario 1: Show cached data when there’s no internet connection
Given a user has used the app before
When they access the website offline
Then the events they viewed previously will be shown
2.	Scenario 2: Show error when user changes the settings (city, time range)
Given a user accesses the website offline
When they change the setting such as city or time range
Then an error will be shown

* As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city. 
1.	Scenario 1: Show a chart with the number of upcoming events in each city
Given a user has chosen a city
When the list of events is shown
Then on top of the list a chart that visualizes the type of upcoming events will be shown


### What challenges did I face, what did I learn? 
* The recommended testing utility for React, Enzyme, doesn't support React versions from 17 upward. There exists an unofficial adapter for version 17, however, there is no adapter for React v.18. Therefore, I had to downgrade my React version to v.17 to still be able to work with Enzyme.

* You can use end-to-end tesing to create videos for tutorials or customer presentations

* When using the creat react app biolerplate, the components are created as .js files (instead of .jsx)

## How to install and run the project ...

### ... as a developer, who wants to work with the project
1. Clone or download repository ...
```bash
git clone https://github.com/F3NJ0/meet-app.git
```

2. Connect to your github pages 
Follow the instructions provided by github: https://pages.github.com 

3. Edit homepage address in package.json to fit to your github account

4. To run app on localhost:
```bash
npm run start
```

5. To push changes to github pages
```bash
npm run deploy
```

### ... to access the already hostet the live app:
https://f3nj0.github.io/meet-app/ 

## Technical Requirements (according to project brief)
* React application
* Built using TDD technique
* Use the Google Calendar API and OAuth2 authentication flow.
* Use use serverless functions (AWS lambda is preferred) for the authorization server instead of using a traditional server
* Work offline or in slow network conditions with the help of a service worker.
* Use React axios and async/await.
* Implement an alert system using an OOP approach to show information to the user.
* Make use of data visualization using the recharts library.
* Be monitored using an online monitoring tool.


## Development Process for the meet-app

### Create test scenarios for each user story
__See above__

### Create serverless functions to adhere to Google OAuth2 authentication flow
#### Create a Oauth Consumer
1. Create new project in Google's API console
2. Enable Google Calendar API
3. Create credentials
4. Add scopes
5. Add origin and URI to app's domain
6. Add test users
7. Download credentials (client_secret_.json file)

#### Verify app's domain
Download the HTML verification file from Google developer console and add to /public folder in app

#### Create a serverless service
1. Install serverless toolkit: 
```bash
npm install -g serverless
```
2. Set up server directory:
```bash
# Create a new serverless service/project using aws-nodejs
serverless create --template aws-nodejs --path auth-server
# Jump into the newly created directory
cd auth-server
# Then create a package.json
npm init
# You can simply press the Enter key through all the options here.
```
3. Add config.json to .gitignore file

#### Configure AWS credentials
1. Go to AWS console
2. Navigate to 'My security credentials'
3. Create new access key & download file
4. Configure credentials for serverless:
```bash
serverless config credentials --provider aws --key ACCESS_KEY_ID --secret SECRET_ACCESS_KEY
```

#### Add secrets to config.json file
1. Within server directory, create config.json file
2. Add credentials stored in client_secret_.json file to config.file
3. Add Calendar ID of calendar that will be used in application to config.file

#### Set up serverless file

#### Install Google APIs package 
```bash
npm install googleapis@^59.0.0 --save
```

#### Set up handler.js file with serverless functions

#### Deploy serverless
```bash
serverless deploy
```

#### Obtain serverless API endpoints
```bash
serverless info
```

### Unit testing

### Integration testing

### User Acceptance & End-to-end tesing

### Transform applications into PWA
* In src/index.js file, register service worker by changing from serviceWorkerRegistration.unregister() to serviceWorkerRegistration.register()
* Add app infos to manifest.json

### Add data visualization using Recharts