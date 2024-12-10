function generatePopup(type, ref, season, raceId) {
    // Determine which type of popup to create based on the provided 'type' argument.
    if (type == 'driver') {
        driverPopup(ref, season, raceId);
    }
    else if (type == 'constructor') {
        constructorPopup(ref, season, raceId);
    }
    else if (type == 'circuit') {
        circuitPopup(ref, season, raceId);
    }
}

function driverPopup(ref, season, raceId) {
    // Fetch driver data from API and then create a popup with driver details and race results.
    driverStats = getData('https://www.randyconnolly.com/funwebdev/3rd/api/f1/drivers.php?ref=' + ref)
        .then((driverStats) => {

            stats = JSON.parse(driverStats);

            // Create modal (popup) elements: modal container, overlay, content div. 
            const modal = document.createElement('section');
            document.body.appendChild(modal);

            const overlay = document.createElement('div');
            document.body.appendChild(overlay);

            const modalContent = document.createElement('div');
            modal.appendChild(modalContent);

            // Create close button for the modal.
            const closeButton = document.createElement('button');
            closeButton.textContent = 'X';
            modalContent.appendChild(closeButton);

            // Create elements to display driver information (name, image, etc.).
            const driverInfo = document.createElement('div');
            h2 = document.createElement('h2');
            h2.textContent = 'Details:'
            driverInfo.appendChild(h2);


            const imgDiv = document.createElement('div');
            img = document.createElement('img');
            img.src = "https://placehold.co/150x150?text=placeholder"
            imgDiv.appendChild(img);
            driverInfo.appendChild(imgDiv);

            const details = document.createElement('ul');

            let li = document.createElement('li');
            li.textContent = stats['forename'] + ' ' + stats['surname'];
            li.classList.add('text-xl')
            details.appendChild(li);

            let age = Math.floor((new Date() - new Date(stats.dob)) / (1000 * 60 * 60 * 24 * 365.25)); 

            let li2 = document.createElement('li');
            li2.textContent = "DOB: " + stats.dob + " (" + age + " y/o)";
            details.appendChild(li2);

            let li3 = document.createElement('li');
            li3.textContent = "Nationality: " + stats['nationality'];
            details.appendChild(li3);

            let li4 = document.createElement('li');
            let wikiLink = document.createElement('a')
            wikiLink.href = stats.url
            wikiLink.target = '__blank'
            wikiLink.textContent = stats.url;
            wikiLink.classList.add('underline')
            li4.appendChild(wikiLink);
            details.appendChild(li4);

            driverInfo.appendChild(details);
            modalContent.appendChild(driverInfo);

            // Create section to display race results.
            const resultsTile = document.createElement('div');

            let resultsTitle = document.createElement('h2');
            resultsTitle.textContent = "Race Results:";
            resultsTile.appendChild(resultsTitle);

            const resultsSection = document.createElement('div');

            // Add a favorite button to allow users to save drivers.
            let favouriteButton = document.createElement('a');
            favouriteButton.dataset.ref = ref;
            favouriteButton.dataset.raceId = raceId;
            if(localStorage.getItem('favourites') != null && JSON.parse(localStorage.getItem('favourites')).indexOf(favouriteButton.dataset.ref) > -1){
                favouriteButton.classList.add('fa-solid', 'fa-heart')
            }
            else{
                favouriteButton.classList.add('fa-regular', 'fa-heart')
            }
            favouriteButton.classList.add('inline-block');
            favouriteButton.classList.add('mt-5');
            favouriteButton.classList.add('p-2');
            favouriteButton.classList.add('border-solid', 'border-black', 'border-2', 'rounded-md');

            let p = document.createElement('p')
            p.textContent = 'Favourite'
            p.classList.add('inline', 'pl-3')
            favouriteButton.appendChild(p);


            driverInfo.appendChild(favouriteButton);

            // Create table to hold race results data.
            const resultsTable = document.createElement('table');
            generateTableStyling(resultsTable)

            const headerRow = document.createElement('tr');
            const headers = ['Rnd', 'Name', 'Pos', 'Points'];

            // Create table header cells.
            for (let header of headers) {
                let th = document.createElement('th');
                th.textContent = header;
                generateTHStyling(th);
                headerRow.appendChild(th);
            };

            resultsTable.appendChild(headerRow);

            // Retrieve race results data from local storage.
            resultsData = JSON.parse(localStorage.getItem('resultsData' + season));

            // Populate the table with race results.
            for (let result of resultsData) {
                if (result.driver.ref == ref && result.race.year == season) {
                    const row = document.createElement('tr');

                    let round = document.createElement('td')
                    round.textContent = result.race.round
                    generateTDStyling(round);
                    row.appendChild(round)

                    let circuitName = document.createElement('td')
                    circuitName.textContent = result.race.name;
                    generateTDStyling(circuitName);
                    row.appendChild(circuitName)

                    let pos = document.createElement('td')
                    pos.textContent = result.position
                    generateTDStyling(pos);
                    row.appendChild(pos)

                    let point = document.createElement('td');
                    point.textContent = result.points;
                    generateTDStyling(point);
                    row.appendChild(point);

                    generateTRStyling(row);
                    resultsTable.appendChild(row);
                }
            }

            resultsSection.appendChild(resultsTable);
            resultsTile.appendChild(resultsSection)
            modalContent.appendChild(resultsTile);

            // Add event listener to close the modal when the close button is clicked.
            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            })

            generateFavouriteEventHandler(favouriteButton, season);

            // Apply styling to the modal elements.
            generateModalStyling(modal, overlay, modalContent, closeButton, resultsTitle, resultsSection, h2)

            modal.style.display = 'block';
            overlay.classList.display = 'block';
        })
};

function circuitPopup(ref, season, raceId) {
    // Fetch circuit data from the API and create a popup displaying circuit information.
    circuitStats = getData('https://www.randyconnolly.com/funwebdev/3rd/api/f1/circuits.php?id=' + ref)
        .then((circuitStats) => {

            stats = JSON.parse(circuitStats);

            // Create modal (popup) elements: modal container, overlay, content div.
            const modal = document.createElement('section');
            document.body.appendChild(modal);

            const overlay = document.createElement('div');
            document.body.appendChild(overlay);

            const modalContent = document.createElement('div');
            modal.appendChild(modalContent);

            // Create close button for the modal.
            const closeButton = document.createElement('button');
            closeButton.textContent = 'X';
            modalContent.appendChild(closeButton);

            // Create elements to display circuit information (name, location, etc.).
            const circuitInfo = document.createElement('div');
            h2 = document.createElement('h2');
            h2.textContent = 'Details:'
            circuitInfo.appendChild(h2);

            const details = document.createElement('ul');

            let li = document.createElement('li');
            li.textContent = stats.name;
            li.classList.add('text-xl', 'font-semibold')
            li.classList.add('pt-10')
            details.appendChild(li);

            let li2 = document.createElement('li');
            li2.textContent = "Location: " + stats.location + ", " + stats.country;
            li2.classList.add('text-xl')
            li2.classList.add('pt-10')
            details.appendChild(li2);

            let li3 = document.createElement('li');
            let wikiLink = document.createElement('a')
            wikiLink.href = stats.url
            wikiLink.target = '__blank'
            wikiLink.textContent = stats.url;
            wikiLink.classList.add('underline')
            li3.appendChild(wikiLink);
            li3.classList.add('pt-10')
            details.appendChild(li3);

            circuitInfo.appendChild(details);
            modalContent.appendChild(circuitInfo);

            // Add event listener to close the modal when the close button is clicked.
            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            })

            // Create a section for additional information (could be results or other details).
            const resultsSection = document.createElement('div');

            let resultsTitle = document.createElement('h2');
            
            resultsSection.appendChild(resultsTitle);

            const imgDiv = document.createElement('div');
            img = document.createElement('img');
            img.src = "https://placehold.co/350x350?text=placeholder"
            imgDiv.appendChild(img);
            imgDiv.classList.add('pl-10')
            resultsSection.appendChild(imgDiv);

            modalContent.appendChild(resultsSection)

            // Apply styling to the modal elements.
            generateModalStyling(modal, overlay, modalContent, closeButton, resultsTitle, resultsSection, h2)

            modal.style.display = 'block';
            overlay.classList.display = 'block';
        })
};

function constructorPopup(ref, season, raceId) {
    // Fetch constructor data from the API and then create a popup to display this information.
    let constructorStats = getData('https://www.randyconnolly.com/funwebdev/3rd/api/f1/constructors.php?ref=' + ref)
        .then((constructorStats) => {

            stats = JSON.parse(constructorStats);

            // Create modal (popup) elements: modal container, overlay, content div.
            const modal = document.createElement('section');
            document.body.appendChild(modal);

            const overlay = document.createElement('div');
            document.body.appendChild(overlay);

            const modalContent = document.createElement('div');
            modal.appendChild(modalContent);

            // Create close button for the modal.
            const closeButton = document.createElement('button');
            closeButton.textContent = 'X';
            modalContent.appendChild(closeButton);

            // Create elements to display constructor information (name, nationality, etc.).
            const constInfo = document.createElement('div');
            h2 = document.createElement('h2');
            h2.textContent = 'Details:'
            constInfo.appendChild(h2);

            const details = document.createElement('ul');

            let li = document.createElement('li');
            li.textContent = stats.name;
            li.classList.add('text-xl', 'font-semibold')
            details.appendChild(li);


            let li3 = document.createElement('li');
            li3.textContent = "Nationality: "+ stats['nationality'];
            details.appendChild(li3);

            let li4 = document.createElement('li');
            let wikiLink = document.createElement('a')
            wikiLink.href = stats.url
            wikiLink.target = '__blank'
            wikiLink.textContent = stats.url;
            wikiLink.classList.add('underline')
            li4.appendChild(wikiLink);
            details.appendChild(li4);
            
            constInfo.appendChild(details);
            modalContent.appendChild(constInfo);

            // Create a section to display race results for the constructor.
            const resultsTile = document.createElement('div');

            let resultsTitle = document.createElement('h2');
            resultsTitle.textContent = "Race Results:";
            resultsTile.appendChild(resultsTitle);

            const resultsSection = document.createElement('div');

            // Add a favorite button to allow users to save constructors.
            let favouriteButton = document.createElement('a');
            favouriteButton.dataset.ref = ref;
            favouriteButton.dataset.raceId = raceId;
            if(localStorage.getItem('favourites') != null && JSON.parse(localStorage.getItem('favourites')).indexOf(favouriteButton.dataset.ref) > -1){
                favouriteButton.classList.add('fa-solid', 'fa-heart')
            }
            else{
                favouriteButton.classList.add('fa-regular', 'fa-heart')
            }
            favouriteButton.classList.add('inline-block');
            favouriteButton.classList.add('mt-5');
            favouriteButton.classList.add('p-2');
            favouriteButton.classList.add('border-solid', 'border-black', 'border-2', 'rounded-md');

            let p = document.createElement('p')
            p.textContent = 'Favourite'
            p.classList.add('inline', 'pl-3')
            favouriteButton.appendChild(p);

            constInfo.appendChild(favouriteButton);

            // Create a table to hold and display the race results data.
            const resultsTable = document.createElement('table');
            generateTableStyling(resultsTable)

            const headerRow = document.createElement('tr');

            const headers = ['Rnd', 'Name', 'Driver', 'Pos', 'Points'];

            // Create table header cells.
            for (let header of headers) {
                let th = document.createElement('th');
                th.textContent = header;
                generateTHStyling(th);
                headerRow.appendChild(th);
            };

            resultsTable.appendChild(headerRow);

            // Retrieve race results data from local storage.
            resultsData = JSON.parse(localStorage.getItem('resultsData' + season));

            // Populate the results table.
            for (let result of resultsData) {
                if (result.constructor.ref == ref && result.race.year == season) {
                    const row = document.createElement('tr');

                    let round = document.createElement('td')
                    round.textContent = result.race.round
                    generateTDStyling(round);
                    row.appendChild(round)

                    let circuitName = document.createElement('td')
                    circuitName.textContent = result.race.name;
                    generateTDStyling(circuitName);
                    row.appendChild(circuitName)

                    let driverName = document.createElement('td')
                    driverName.textContent = result.driver.forename + " " + result.driver.surname;
                    generateTDStyling(driverName);
                    row.appendChild(driverName)

                    let pos = document.createElement('td')
                    pos.textContent = result.position
                    generateTDStyling(pos);
                    row.appendChild(pos)

                    let point = document.createElement('td');
                    point.textContent = result.points;
                    generateTDStyling(point);
                    row.appendChild(point);

                    generateTRStyling(row);
                    resultsTable.appendChild(row);
                }
            }

            resultsSection.appendChild(resultsTable);
            resultsTile.appendChild(resultsSection);
            modalContent.appendChild(resultsTile);

            // Add event listener to close the modal when the close button is clicked.
            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            })

            generateFavouriteEventHandler(favouriteButton, season);

            // Apply styling to the modal elements.
            generateModalStyling(modal, overlay, modalContent, closeButton, resultsTitle, resultsSection, h2)

            modal.style.display = 'block';
            overlay.classList.display = 'block';
        });
};

function generateFavouriteEventHandler(favouriteButton, season){
    // Add an event listener to the favorite button to handle adding/removing favorites.
    favouriteButton.addEventListener('click', () => {

        let favourites = JSON.parse(localStorage.getItem('favourites'));

        // If no favorites exist yet, create a new list and add the current item.
        if (favourites == null ) { 
            favourites = [];
            favourites.push(favouriteButton.dataset.ref)
            favouriteButton.classList.remove('fa-regular');
            favouriteButton.classList.add('fa-solid');
        }
        // If the item is already in favorites, remove it.
        else if(favourites.indexOf(favouriteButton.dataset.ref) > -1){ 
            tempfavorites = favourites.filter(favorite => favorite != favouriteButton.dataset.ref);
            favourites=tempfavorites;
            favouriteButton.classList.remove('fa-solid');
            favouriteButton.classList.add('fa-regular');

        }   
        // Otherwise, add the current item to the favorites list.  
        else{
            favourites.push(favouriteButton.dataset.ref)
            favouriteButton.classList.remove('fa-regular');
            favouriteButton.classList.add('fa-solid');
        }
        localStorage.setItem('favourites', JSON.stringify(favourites))
        generateRaceView(favouriteButton.dataset.raceId, season);
    })
}