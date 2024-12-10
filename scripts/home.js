document.addEventListener('DOMContentLoaded', () => {
    div1 = document.querySelector('#selector')
    div1.classList.add('bg-white')
    div2 = document.querySelector('#content')

    function generateHomeView(div1, div2) {
        select = document.createElement('select');

        select.classList.add('text-xl')

        option = document.createElement('option')
        option.disabled = true;
        option.selected = true;
        option.textContent = "Select a season";

        select.appendChild(option);

        for (let i = 2023; i > 2019; i--) {
            option = document.createElement('option');
            option.value = i;
            option.textContent = i + " Races";
            select.appendChild(option);
        }
        div1.appendChild(select);

        description = document.createElement('p');
        description.textContent = "F1 Statistics, built with HTML and JavaScript, provides comprehensive Formula One statistics.  Created by Austin Vande Cappelle and Jordan Kulcsar, the site offers a user-friendly interface to explore driver and team performance, race results, and historical data. Dive deep into the world of F1 and uncover fascinating insights."
        description.classList.add('pt-10', 'pr-5', 'description')
        div1.appendChild(description)

        div2.classList.add("bg-[url('images/Home.jpg')]");
        div2.classList.add("bg-cover");
        div2.classList.add("bg-center");
        div2.classList.add("bg-no-repeat");

    }

    generateHomeView(div1, div2);

    function updateRaces(season) {

        // Clear previous selected season.
        div1.querySelectorAll('h2, table').forEach((tableRow) => {
            tableRow.remove();
        })

        racesData = JSON.parse(localStorage.getItem("seasonData" + season));

        const table = document.createElement('table');
        table.classList.add('text-left')
        div1.appendChild(table);

        const tr = document.createElement('tr');
        table.appendChild(tr);

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

        for (let race of racesData) {
            const tr2 = document.createElement('tr');

            const td = document.createElement('td');
            td.textContent = race.round;
            tr2.appendChild(td);

            const td2 = document.createElement('td');
            let p = document.createElement('p')
            p.textContent = race.circuit.name;
            p.classList.add('circuit');
            p.dataset.ref = race.circuit.id;
            p.dataset.raceId = race.id;
            p.dataset.year = race.year;
            td2.appendChild(p);
            td2.classList.add('pl-4')
            tr2.appendChild(td2);

            const td3 = document.createElement('td');
            a = document.createElement('a')
            a.classList.add('resultsButton');
            a.textContent = 'Results';
            a.dataset.raceId = race.id;
            a.dataset.year = race.year;
            td3.appendChild(a)

            generateTDStyling(td3);
            tr2.appendChild(td3);
            table.appendChild(tr2);
        }
    }

    select = div1.querySelector('select');
    select.addEventListener('change', () => {
        description.style.display = 'none';
        if (localStorage.getItem('seasonData' + select.value) == null || JSON.parse(localStorage.getItem('seasonData' + select.value))[0].year != select.value) {
            seasonData = getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=" + select.value).then((data) => localStorage.setItem("seasonData" + select.value, data)).then(() => updateRaces(select.value));
            resultsData = getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season=" + select.value).then((data) => localStorage.setItem("resultsData" + select.value, data));
            qualifyingData = getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season=" + select.value).then((data) => localStorage.setItem("qualifyingData" + select.value, data));
        }
        else {
            updateRaces(select.value)
        }
    });



    div1.addEventListener('click', (e) => {
        if (e.target.nodeName == 'A') {
            div2.classList.remove("bg-[url('images/Home.jpg')]");
            generateRaceView(e.target.dataset.raceId, e.target.dataset.year);
        }
        else if (e.target.nodeName == 'P') {
            generatePopup(e.target.className, e.target.dataset.ref, e.target.dataset.season, e.target.dataset.raceId);
        }
    });

    div2.addEventListener('click', (e) => {
        if (e.target.nodeName == 'A') {
            generatePopup(e.target.className, e.target.dataset.ref, e.target.dataset.season, e.target.dataset.raceId);
        }
    });

});