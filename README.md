# F1 Statistics

## Overview

This website provides comprehensive Formula One statistics using HTML, JavaScript, and Tailwind CSS. It was created by Austin Vande Cappelle and Jordan Kulcsar. The site offers a user-friendly interface to explore driver and team performance, race results, and historical data. Dive deep into the world of F1 and uncover fascinating insights.

## Features

*   Explore Formula One statistics from 2020 to 2023.
*   View driver and team performance.
*   Analyze race results and historical data.
*   User-friendly interface.

## Live Site

This website can be viewed live [here!](https://f1.austinvc.ca)

## Usage

1.  Select a season from the dropdown menu.
2.  View the list of races for the selected season.
3.  Click on a race to view its qualifying and results tables.
4.  Click on a driver or constructor to view their details and race results.

## Built With

*   HTML
*   JavaScript
*   Tailwind CSS

## Authors

*   Austin Vande Cappelle
*   Jordan Kulcsar

## Code Documentation

The code is well-organized and documented. Each function has a clear purpose and is documented with comments explaining its functionality. The code is also formatted consistently to ensure readability.

### `main.js`

* `getData(url)`: This function fetches data from the specified URL and returns a promise that resolves with the parsed JSON data.

### `home.js`

* `generateHomeView(div1, div2)`: This function generates the home view of the website, which includes a select element for choosing a season and a description of the site.
* `updateRaces(season)`: This function updates the races displayed on the home view based on the selected season.
* Event Listeners: The `home.js` file also contains several event listeners that handle user interactions, such as selecting a season, clicking on a race results link, and clicking on a circuit popup link.

### `popup.js`
* `generatePopup(type, ref, season, raceId)`: This function generates a popup window based on the provided type, reference, season, and race ID. The popup can display information about a driver, constructor, or circuit.
* `driverPopup(ref, season, raceId)`: This function generates a popup window with details about a specific driver, including their race results for the given season.
* `circuitPopup(ref, season, raceId)`: This function generates a popup window with details about a specific circuit.
* `constructorPopup(ref, season, raceId)`: This function generates a popup window with details about a specific constructor, including their race results for the given season.
* `generateFavouriteEventHandler(favouriteButton, season)`: This function adds an event handler to the favorite button, allowing users to add or remove drivers and constructors from their favorites list.

### `races.js`

* `generateRaceView(raceId, season)`: This function generates the race view, which displays the qualifying and results tables for a specific race.
* `createQualifyingTable(qualifying, qualifyingData)`: This function creates the qualifying table and populates it with data for a specific race.
* `createResultsTable(results, resultsData)`: This function creates the results table and populates it with data for a specific race.
* `headerEvents(table)`: This function adds event listeners to the table headers, allowing users to sort the columns by clicking on them.

### `tailwindStyles.js`

* `generateModalStyling(modal, overlay, modalContent, closeButton, resultsTitle, resultsSection, h2)`: This function applies CSS classes to style the modal (popup) window.
* `generateTableStyling(table)`: This function applies CSS classes to style the table elements.
* `generateTDStyling(td)`: This function applies CSS classes to style the table cells.
* `generateTRStyling(tr)`: This function applies CSS classes to style the table rows.
