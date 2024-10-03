# Media Library Application

A Media Library application built with React and TypeScript that allows users to search and view media content like videos and images. The app features infinite scrolling and debounced search to enhance user experience. Note that this application is currently not responsive.

## Key Features

- **Infinite Scroll**: Load more results automatically as you scroll down.
- **Debounced Search**: Efficient search that waits for user input to stop before fetching data, reducing API calls.
- **Dynamic Video Quality**: Adjusts video resolution based on network speed.
- **TypeScript for Type Safety**: Ensures better type checks during development.

## Installation

### Clone the repository:

- git clone https://github.com/Amith-K-A/media-library.git
- cd media-library

### Install the dependencies:

npm install


### Start the development server:
npm start

The app will run on http://localhost:3000


## Project Structure

```plaintext
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components          # Reusable UI components
│   ├── models              # TypeScript models and types
│   ├── services            # API calls and business logic
│   ├── helpers             # Utility functions (e.g., debounce)
│   └── App.tsx             # Main app component
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```


## Available Scripts

- npm start: Starts the app in development mode with hot reloading.
- npm run build: Builds the app for production.
- npm test: Runs the test suite.


## Key Features
- Infinite Scroll: Media results load as you scroll down.
- Debounced Input: The search input waits until you've stopped typing to fetch results.
- Adaptive Video Quality: Videos adjust quality based on network speed for better performance.

## Technologies Used
- React: Frontend library for building user interfaces.
- TypeScript: Ensures strong typing and better code quality.
- Tailwind CSS: Styling for the app (Note: this version is not responsive).
- Fetch API: For network requests to fetch media from external APIs.
- API Integration: This project uses the Pexels API to fetch media data. Ensure you have a valid API key in your environment configuration.

## Known Limitations
- Not Responsive: The application does not currently support responsiveness and might not display optimally on mobile devices.
