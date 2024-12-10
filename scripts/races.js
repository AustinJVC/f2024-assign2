function generateRaceView(raceId, season) {
    // Set up the basic layout and structure for the race view.
    div2 = document.querySelector('#content')
    div2.classList.add("grid")
    div2.classList.add("grid-cols-[1fr_1fr]")
    div2.classList.add("px-10")
    div2.classList.add("pt-2")

    children = Array.from(div2.children)
    for (child of children) {
        child.remove();
    }

    // Retrieve qualifying, results, and season data from local storage.
    qualifyingData = JSON.parse(localStorage.getItem("qualifyingData" + season));
    resultsData = JSON.parse(localStorage.getItem("resultsData" + season));
    seasonData = JSON.parse(localStorage.getItem("seasonData" + season));
    
    // Filter data to only include information relevant to the selected race.
    tempArray = [];
    for (result of qualifyingData) {
        if (result.race.id == raceId) {
            tempArray.push(result)
        }
    }
    qualifyingData = tempArray;

    tempArray = [];
    for (result of resultsData) {
        if (result.race.id == raceId) {
            tempArray.push(result)
        }
    }
    resultsData = tempArray;

    tempArray = [];
    for (race of seasonData) {
        if (race.id == raceId) {
            tempArray = race;
        }
    }
    seasonData = tempArray;

    // Create divs to hold the qualifying and results tables.
    qualifying = document.createElement('div');
    qualifying.classList.add = 'qualifying';
    div2.appendChild(qualifying);

    results = document.createElement('div');
    results.classList.add = 'results';
    div2.appendChild(results);

    // Generate the qualifying and results tables.
    createQualifyingTable(qualifying, qualifyingData); 
    createResultsTable(results, resultsData); 
    
    // Update the header to display information about the selected race.
    header = document.querySelector("h1 a");
    header.textContent = qualifyingData[0].race.year + " " + qualifyingData[0].race.name + " - " + seasonData.circuit.name + ": " + seasonData.circuit.location + ", " + seasonData.circuit.country 

}

function createQualifyingTable(qualifying, qualifyingData) {
    // Create the qualifying table and populate it with data.
    const h3 = document.createElement('h3');
    h3.textContent = 'Qualifying';
    h3.classList.add("text-2xl")
    qualifying.appendChild(h3);

    const table = document.createElement('table');
    table.id = 'qualifyingTable';
    qualifying.appendChild(table);

    const tr = document.createElement('tr');
    table.appendChild(tr);

    // Create table header cells.
    const th1 = document.createElement('th');
    th1.textContent = "Pos";
    generateTHStyling(th1);
    tr.appendChild(th1);

    const th2 = document.createElement('th');
    th2.textContent = "Name";
    generateTHStyling(th2);
    tr.appendChild(th2);

    const th3 = document.createElement('th');
    th3.textContent = "Constructor";
    generateTHStyling(th3);
    tr.appendChild(th3);

    const th4 = document.createElement('th');
    th4.textContent = "Q1";
    generateTHStyling(th4);
    tr.appendChild(th4);

    const th5 = document.createElement('th');
    th5.textContent = "Q2";
    generateTHStyling(th5);
    tr.appendChild(th5);

    const th6 = document.createElement('th');
    th6.textContent = "Q3";
    generateTHStyling(th6);
    tr.appendChild(th6);

    // Populate the table with qualifying results.
    for (let result of qualifyingData) {
        const tr2 = document.createElement('tr');

        const td = document.createElement('td');
        td.textContent = result.position;
        generateTDStyling(td)
        tr2.appendChild(td);

        const td2 = document.createElement('td');

        a = document.createElement('a')
        a.classList.add('driver')
        a.dataset.ref = result.driver.ref
        a.dataset.season = result.race.year
        a.dataset.raceId = result.race.id

        // Add a heart symbol next to favorited drivers.
        if(localStorage.getItem('favourites') != null && JSON.parse(localStorage.getItem('favourites')).indexOf(result.driver.ref) > -1){
            a.textContent = result.driver.forename + " " + result.driver.surname + " \u2665";
        }
        else{
            a.textContent = result.driver.forename + " " + result.driver.surname;
        }
        td2.appendChild(a);
        generateTDStyling(td2);
        tr2.appendChild(td2);

        const td3 = document.createElement('td');
        a = document.createElement('a')
        a.classList.add('constructor')
        a.dataset.ref = result.constructor.ref
        a.dataset.season = result.race.year
        a.dataset.raceId = result.race.id
        // Add a heart symbol next to favorited constructors.
        if(localStorage.getItem('favourites') != null && JSON.parse(localStorage.getItem('favourites')).indexOf(result.constructor.ref) > -1){       
            a.textContent = result.constructor.name + " \u2665";
        }
        else{
            a.textContent = result.constructor.name;
        }
        td3.appendChild(a);
        generateTDStyling(td3);
        tr2.appendChild(td3);

        const td4 = document.createElement('td');
        td4.textContent = result.q1;
        generateTDStyling(td4)
        tr2.appendChild(td4);

        const td5 = document.createElement('td');
        td5.textContent = result.q2
        generateTDStyling(td5);
        tr2.appendChild(td5);

        const td6 = document.createElement('td');
        td6.textContent = result.q3;
        generateTDStyling(td6);
        tr2.appendChild(td6);

        generateTRStyling(tr2)
        table.appendChild(tr2);
    }

    const qualifyingTable = document.querySelector('#qualifyingTable');
    headerEvents(qualifyingTable); 
}

function createResultsTable(results, resultsData) {
    // Create the results table and populate it with data.
    const h3 = document.createElement('h3');
    h3.textContent = 'Results';
    h3.classList.add("text-2xl")
    results.appendChild(h3);

    const table = document.createElement('table');
    table.id = 'resultsTable'
    results.appendChild(table);

    const tr = document.createElement('tr');
    table.appendChild(tr);

    // Create table header cells.
    const th1 = document.createElement('th');
    th1.textContent = "Pos";
    generateTHStyling(th1)
    tr.appendChild(th1);

    const th2 = document.createElement('th');
    th2.textContent = "Name";
    generateTHStyling(th2)
    tr.appendChild(th2);

    const th3 = document.createElement('th');
    th3.textContent = "Constructor";
    generateTHStyling(th3)
    tr.appendChild(th3);

    const th4 = document.createElement('th');
    th4.textContent = "Laps";
    generateTHStyling(th4)
    tr.appendChild(th4);

    const th5 = document.createElement('th');
    th5.textContent = "Pts";
    generateTHStyling(th5)
    tr.appendChild(th5);

    // Populate the table with race results.
    for (let result of resultsData) {
        const tr2 = document.createElement('tr');
        generateTRStyling(tr2)

        const td = document.createElement('td');
        td.textContent = result.position;
        generateTDStyling(td)
        tr2.appendChild(td);

        td2 = document.createElement('td');

        a = document.createElement('a')
        a.classList.add('driver')
        a.dataset.ref = result.driver.ref
        a.dataset.season = result.race.year
        a.dataset.raceId = result.race.id

        // Add a heart symbol next to favorited drivers.
        if(localStorage.getItem('favourites') != null && JSON.parse(localStorage.getItem('favourites')).indexOf(result.driver.ref) > -1){
            a.textContent = result.driver.forename + " " + result.driver.surname + " \u2665";
        }
        else{
            a.textContent = result.driver.forename + " " + result.driver.surname;
        }
        td2.appendChild(a);
        generateTDStyling(td2)
        tr2.appendChild(td2);

        const td3 = document.createElement('td');

        a = document.createElement('a')
        a.classList.add('constructor')
        a.dataset.ref = result.constructor.ref
        a.dataset.season = result.race.year
        a.dataset.raceId = result.race.id
        // Add a heart symbol next to favorited constructors.
        if(localStorage.getItem('favourites') != null && JSON.parse(localStorage.getItem('favourites')).indexOf(result.constructor.ref) > -1){       
            a.textContent = result.constructor.name + " \u2665";
        }
        else{
            a.textContent = result.constructor.name;
        }
        td3.appendChild(a);
        generateTDStyling(td3)
        tr2.appendChild(td3);

        const td4 = document.createElement('td');
        td4.textContent = result.laps;
        generateTDStyling(td4)
        tr2.appendChild(td4);

        const td5 = document.createElement('td');
        td5.textContent = result.points
        generateTDStyling(td5)
        tr2.appendChild(td5);

        generateTRStyling(tr2)
        table.appendChild(tr2);

        // Highlight top 3 positions.
        if(result.position < 4 ){ 
            tr2.classList.add('font-bold', 'text-red-800')
        }
    }

    const resultsTable = document.querySelector('#resultsTable');
    headerEvents(resultsTable); 
}
function headerEvents(table) {
    // Make table headers clickable to allow for sorting the columns.
    const headers = table.querySelectorAll('th');
    
    headers.forEach((th, colIndex) => {
        th.addEventListener('click', () => {
            // Add visual indication of the sorted column.
            headers.forEach( (head) => head.classList.remove('underline', 'font-extrabold'))
            th.classList.add('underline', 'font-extrabold')

            // Get all rows except the header row.
            const rows = Array.from(table.querySelectorAll('tr')).slice(1); 
            
            // Sort the rows based on the clicked column.
            rows.sort((rowA, rowB) => { 
                const cellA = rowA.cells[colIndex].textContent;
                const cellB = rowB.cells[colIndex].textContent;

                // Special handling for the 'Pts' column (sorting numbers).
                if (th.textContent === 'Pts') {
                    return parseFloat(cellB) - parseFloat(cellA); 
                }

                // Sort numerically if both cells contain numbers, otherwise sort alphabetically.
                if (!isNaN(cellA) && !isNaN(cellB)) {
                    return parseFloat(cellA) - parseFloat(cellB); 
                } else {
                    return cellA.localeCompare(cellB); 
                }
            });

            // Re-append the sorted rows to the table.
            rows.forEach((row) => table.appendChild(row)); 
        });
    });
}

