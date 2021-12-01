# Zendesk Ticket Viewer

This is a React application made for viewing Zendesk tickets as a submission for the Zendesk Coding Challenge. Allows to view all tickets, page through them, as well as view details for each of them.

This app uses the API Client, deployed from [this repository](https://github.com/4rgc/zendesk-api-client), to make requests to the Zendesk API. This is due to the authentication limitations set on the Zendesk API.

You can also deploy the API Client on your local machine, and [use it instead](#using-local-api-client).

## Installation

To run Zendesk Ticket Viewer on your local machine, you need to follow these steps.

1. Make sure you have the latest version of `node` installed
2. Clone the repository
3. In the local repository folder run `npm install`
4. Create a file named `.env` in the project root directory.
5. Add your Zendesk login credentials to the file, each on new line:
   1. Add your username: `REACT_APP_USERNAME=your_username`
   2. Add your API token: `REACT_APP_API_KEY=your_apitoken`
6. Done!
   - To run the app in development mode: `npm start`
   - To run storybook: `npm run storybook`
   - To run the app in production mode:
    `npm build` => `npm install -g serve` => `serve -s build`

## Using local API Client

To use the locally deployed API Client, add the following line to your `.env` file:
`REACT_APP_USE_LOCAL_API=true`
