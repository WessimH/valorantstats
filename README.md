# Valorant Stats Tracker

This project is a **Valorant Stats Tracker** built
using [Create React App](https://github.com/facebook/create-react-app) and various Material UI components for a modern
and interactive user interface.

## Features

- **Track Win/Loss Statistics**: Enter your Valorant in-game name and tag to retrieve your win/loss data.
- **Visualize Performance**: View charts showing wins/losses per hour of the day.
- **Real-time Win Rate**: Track your win rate with a dynamic progress indicator (gauge).
- **Responsive UI**: Styled with Material UI for a modern, responsive design.

## How to Install and Run the Project

To install and run the project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/valorant-stats-tracker.git
cd valorant-stats-tracker
```

### 2. Install the dependencies

This project uses `npm` to manage dependencies. Run the following command to install all required packages:

```bash
npm install
```

### 3. Start the application

Once the dependencies are installed, you can start the application in development mode:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The app will automatically reload if you
make changes to the code.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The app will automatically reload if you make changes to the code. You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

## Dependencies

To run the project, you will need the following dependencies installed:

- **React**: Front-end library used for building user interfaces.
- **Material UI**: Component library for responsive and customizable UI elements.
- **@mui/x-charts**: Used to create interactive charts for displaying stats.
- **Fetch API**: For making API requests to retrieve Valorant player stats.

These dependencies are automatically installed when you run `npm install`.

## How to Use

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `npm start` to start the application.
4. Open [http://localhost:3000](http://localhost:3000) and input your Valorant **Name** and **Tag** (e.g.,
   `PlayerName#1234`).
5. Select your server from the dropdown.
6. View your win/loss data visualized on a line chart and track your overall win rate using the circular gauge.

## API Integration

The application makes use of the following API to retrieve Valorant player stats:

- **Henrik Dev API**: The app fetches player match history data using this API. For more information, visit
  the [Henrik Dev API documentation](https://api.henrikdev.xyz/valorant).
  clearly explains how to clone the repository, install dependencies, and start the app using the `npm` commands. It
  ensures that any developer or user who wants to run the project has clear instructions.