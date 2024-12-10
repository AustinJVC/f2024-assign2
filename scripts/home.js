document.addEventListener('DOMContentLoaded', () => {
    // Select the 'selector' and 'content' divs
    div1 = document.querySelector('#selector');
    div2 = document.querySelector('#content');

    // Function to generate the home view
    function generateHomeView(div1, div2) {
        // Create a select element for the user to choose a season
        select = document.createElement('select');

        // Add tailwind font size css.
        select.classList.add('text-xl');

        // Create the default "Select a season" option for the select element
        option = document.createElement('option');
        option.disabled = true;
        option.selected = true;
        option.textContent = "Select a season";

        // Append the default option to the select element
        select.appendChild(option);

        // Add options for the select element with years from 2023 to 2020
        for (let i = 2023; i > 2019; i--) {
            option = document.createElement('option');
            option.value = i;
            option.textContent = i + " Races";
            select.appendChild(option);
        }

        // Add the select element to the selector div
        div1.appendChild(select);

        // Create the description element sharing about the site
        description = document.createElement('p');

        // Set the text content of the description
        description.textContent = "F1 Statistics, built with HTML and JavaScript, provides comprehensive Formula One statistics.  Created by Austin Vande Cappelle and Jordan Kulcsar, the site offers a user-friendly interface to explore driver and team performance, race results, and historical data. Dive deep into the world of F1 and uncover fascinating insights.";

        // Add padding for styling
        description.classList.add('pt-10', 'pr-5', 'description');

        // Add the description to the selector when no season is selected.
        div1.appendChild(description);

        // Add background image to the content div when no race is selected
        div2.classList.add("bg-[url('images/Home.jpg')]");
        div2.classList.add("bg-cover");
        div2.classList.add("bg-center");
        div2.classList.add("bg-no-repeat");
    }

    // Call the function to generate the home view
    generateHomeView(div1, div2);

    // Function to update the races based on the selected season
    function updateRaces(season) {
        // Clear the previous selected season.
        div1.querySelectorAll('h2, table').forEach((tableRow) => {
            tableRow.remove();
        });

        // Get the races data from local storage
        racesData = JSON.parse(localStorage.getItem("seasonData" + season));

        // Create the table listing the races in the season.
        const table = document.createElement('table');

        // Add tailwind CSS for styling the text.
        table.classList.add('text-left');

        // Add the table to the selector div
        div1.appendChild(table);

        // Create a table row element
        const tr = document.createElement('tr');
        table.appendChild(tr);

        // Create table header elements for 'Rnd', 'Circuit', and an empty header where the result button will be.
        const th1 = document.createElement('th');
        th1.textContent = "Rnd";
        tr.appendChild(th1);
    
        const th2 = document.createElement('th');
        th2.textContent = "Circuit";
        th2.classList.add('pl-4')
        tr.appendChild(th2);

        const th3 = document.createElement('th');
        th3.textContent = "";
        tr.appendChild(th3);

        // Loop through the races data and create table rows for each race
        for (let race of racesData) {
            const tr2 = document.createElement('tr');

            // Create table data elements for the round number, circuit name, and a link to the results
            const td = document.createElement('td');
            td.textContent = race.round;
            tr2.appendChild(td);

            const td2 = document.createElement('td');
            // Create the P element, which will be used to pop up the circuit modal            
            let p = document.createElement('p')
            p.textContent = race.circuit.name;
            p.classList.add('circuit');

            // Add data for the circuit ID, race ID, and year.
            p.dataset.ref = race.circuit.id;
            p.dataset.raceId = race.id;
            p.dataset.year = race.year;

            // Add the p element to the second table data element
            td2.appendChild(p);
            
            td2.classList.add('pl-4')

            // Add the circuit to the table row
            tr2.appendChild(td2);

            const td3 = document.createElement('td');

            // Create an element for the results
            a = document.createElement('a')
            a.classList.add('resultsButton');
            a.textContent = 'Results';

            // Add data attributes for the race ID and year
            a.dataset.raceId = race.id;
            a.dataset.year = race.year;
            td3.appendChild(a)

            // Generate styling for the results element
            generateTDStyling(td3);

            tr2.appendChild(td3);

            // Add the table row to the table
            table.appendChild(tr2);
        }
    }

    // Select the selector element
    select = div1.querySelector('select');

    // Add an event listener to the select element to update the races when the selected season changes
    select.addEventListener('change', () => {
        // Hide the description
        description.style.display = 'none';

        // If the season data is not in local storage or the year doesn't match, fetch the data from the API
        if (localStorage.getItem('seasonData' + select.value) == null || JSON.parse(localStorage.getItem('seasonData' + select.value))[0].year != select.value) {
            seasonData = getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=" + select.value).then((data) => localStorage.setItem("seasonData" + select.value, data)).then(() => updateRaces(select.value));
            resultsData = getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season=" + select.value).then((data) => localStorage.setItem("resultsData" + select.value, data));
            qualifyingData = getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season=" + select.value).then((data) => localStorage.setItem("qualifyingData" + select.value, data));
        }
        // Otherwise, update the races with the data from local storage
        else {
            updateRaces(select.value)
        }
    });

    // Add an event listener to the first div to handle clicks on the results link
    div1.addEventListener('click', (e) => {
        if (e.target.nodeName == 'A') {
            // If the clicked element is the results link, remove the background image and generate the race view
            div2.classList.remove("bg-[url('images/Home.jpg')]");
            generateRaceView(e.target.dataset.raceId, e.target.dataset.year);
        }
        else if (e.target.nodeName == 'P') {
            // If the clicked element is the paragraph element, generate a popup
            generatePopup(e.target.className, e.target.dataset.ref, e.target.dataset.season, e.target.dataset.raceId);
        }
    });

    // Add an event listener to the second div to handle clicks on the results link
    div2.addEventListener('click', (e) => {
        if (e.target.nodeName == 'A') {
            // If the clicked element is the paragraph element, generate a popup
            generatePopup(e.target.className, e.target.dataset.ref, e.target.dataset.season, e.target.dataset.raceId);
        }
    });
});