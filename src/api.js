import { mockData } from "./mock-data";
import axios from 'axios';
import NProgress from 'nprogress';


/**
 *
 * @param {*} events: list of events received from Google Calendar API in getEvents() function
 *
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
    var extractLocations = events.map(event => event.location);
    var locations = [...new Set(extractLocations)] // A JavaScript Set is a collection of unique values
    return locations;
};

/**
 * 
 * @param {*} accessToken : access token obtained from local storage in getAccessToken function
 * @returns true or false depending of the token is still valid
 * 
 * This function uses the googleapis api to check if an access token is still valid
 */

const checkToken = async (accessToken) => {
    const result = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
        .then((res) => res.json())
        .catch((err) => err.json());

    return result
}

/**
 * 
 * @returns list of events
 * 
 * This function connects to the Google Calendar API and returns an array of events 
 */
export const getEvents = async () => {
    NProgress.start();

    if (window.location.href.startsWith('http://localhost')) {
        NProgress.done();
        return mockData;
    }

    const token = await getAccessToken();

    if (token) {
        removeQuery();
        // eslint-disable-next-line
        const url = 'https://4hmms9mb9a.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' + '/' + token;
        const result = await axios.get(url);

        if (result.data) {
            var locations = extractLocations(result.data.events);
            localStorage.setItem("lastEvents", JSON.stringify(result.data));
            localStorage.setItem("locations", JSON.stringify(locations));
        }
        NProgress.done();
        return result.data.events;
    }

};

/**
 * This is a function to remove code from URL
 */

const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        var newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};

/**
 * Retrieve access token to access Google Calendar API
 * @returns a valid access token to access the Google Calendar API in the getEvents() function
 * 
 */

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');

    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) { // If there is no accessToken (first user) or the token is invalid
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');

        if (!code) {
            const results = await axios.get('https://4hmms9mb9a.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url');
            const { authUrl } = results.data;
            return (window.location.href = authUrl);
        }
        return code && getToken(code); // Get a new token with the code
    }
    return accessToken;
};

/**
 * 
 * @param {*} code : code retrieved from authorization server to exchange for access token (in getAccessToken() function)
 * @returns : new valid access token
 */

const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    // eslint-disable-next-line
    const { access_token } = await fetch('https://4hmms9mb9a.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode)
        .then((res) => res.json())
        .catch((err) => err.json());

    access_token && localStorage.setItem('access_token', access_token);

    return access_token;
}
