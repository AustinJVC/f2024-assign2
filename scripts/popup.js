function generatePopup(type, ref, season, raceId) {
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
    driverStats = getData('https://www.randyconnolly.com/funwebdev/3rd/api/f1/drivers.php?ref=' + ref)
        .then((driverStats) => {

            stats = JSON.parse(driverStats);
            const modal = document.createElement('section');

            document.body.appendChild(modal);

            const overlay = document.createElement('div');

            document.body.appendChild(overlay);

            const modalContent = document.createElement('div');
            modal.appendChild(modalContent);

            const closeButton = document.createElement('button');

            closeButton.textContent = 'X';
            modalContent.appendChild(closeButton);

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

            const resultsTile = document.createElement('div');

            let resultsTitle = document.createElement('h2');
            resultsTitle.textContent = "Race Results:";
            resultsTile.appendChild(resultsTitle);

            const resultsSection = document.createElement('div');
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


            const resultsTable = document.createElement('table');
            generateTableStyling(resultsTable)

            const headerRow = document.createElement('tr');
            const headers = ['Rnd', 'Name', 'Pos', 'Points'];

            for (let header of headers) {
                let th = document.createElement('th');
                th.textContent = header;
                generateTHStyling(th);
                headerRow.appendChild(th);
            };

            resultsTable.appendChild(headerRow);


            resultsData = JSON.parse(localStorage.getItem('resultsData' + season));

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

            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            })

            generateFavouriteEventHandler(favouriteButton, season);
            generateModalStyling(modal, overlay, modalContent, closeButton, resultsTitle, resultsSection, h2)

            modal.style.display = 'block';
            overlay.classList.display = 'block';
        })
};

function circuitPopup(ref, season, raceId) {
    circuitStats = getData('https://www.randyconnolly.com/funwebdev/3rd/api/f1/circuits.php?id=' + ref)
        .then((circuitStats) => {

            stats = JSON.parse(circuitStats);
            const modal = document.createElement('section');

            document.body.appendChild(modal);

            const overlay = document.createElement('div');

            document.body.appendChild(overlay);

            const modalContent = document.createElement('div');
            modal.appendChild(modalContent);

            const closeButton = document.createElement('button');

            closeButton.textContent = 'X';
            modalContent.appendChild(closeButton);

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

            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            })

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

            generateModalStyling(modal, overlay, modalContent, closeButton, resultsTitle, resultsSection, h2)

            modal.style.display = 'block';
            overlay.classList.display = 'block';
        })
};

function constructorPopup(ref, season, raceId) {
    let constructorStats = getData('https://www.randyconnolly.com/funwebdev/3rd/api/f1/constructors.php?ref=' + ref)
        .then((constructorStats) => {

            stats = JSON.parse(constructorStats);
            const modal = document.createElement('section');

            document.body.appendChild(modal);

            const overlay = document.createElement('div');

            document.body.appendChild(overlay);

            const modalContent = document.createElement('div');
            modal.appendChild(modalContent);

            const closeButton = document.createElement('button');

            closeButton.textContent = 'X';
            modalContent.appendChild(closeButton);

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

            const resultsTile = document.createElement('div');

            let resultsTitle = document.createElement('h2');
            resultsTitle.textContent = "Race Results:";
            resultsTile.appendChild(resultsTitle);
            const resultsSection = document.createElement('div');

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

            const resultsTable = document.createElement('table');
            generateTableStyling(resultsTable)



            const headerRow = document.createElement('tr');

            const headers = ['Rnd', 'Name', 'Driver', 'Pos', 'Points'];

            for (let header of headers) {
                let th = document.createElement('th');
                th.textContent = header;
                generateTHStyling(th);
                headerRow.appendChild(th);
            };

            resultsTable.appendChild(headerRow);


            resultsData = JSON.parse(localStorage.getItem('resultsData' + season));

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

            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            })

            generateFavouriteEventHandler(favouriteButton, season);

            generateModalStyling(modal, overlay, modalContent, closeButton, resultsTitle, resultsSection, h2)

            modal.style.display = 'block';
            overlay.classList.display = 'block';
        });
};

function generateFavouriteEventHandler(favouriteButton, season){
    favouriteButton.addEventListener('click', () => {

        let favourites = JSON.parse(localStorage.getItem('favourites'));

        if (favourites == null ) {
            favourites = [];
            favourites.push(favouriteButton.dataset.ref)
            favouriteButton.classList.remove('fa-regular');
            favouriteButton.classList.add('fa-solid');
        }
        else if(favourites.indexOf(favouriteButton.dataset.ref) > -1){
            tempfavorites = favourites.filter(favorite => favorite != favouriteButton.dataset.ref);
            favourites=tempfavorites;
            favouriteButton.classList.remove('fa-solid');
            favouriteButton.classList.add('fa-regular');

        }    
            else{
            favourites.push(favouriteButton.dataset.ref)
            favouriteButton.classList.remove('fa-regular');
            favouriteButton.classList.add('fa-solid');
        }
        localStorage.setItem('favourites', JSON.stringify(favourites))
        generateRaceView(favouriteButton.dataset.raceId, season);
    })
}


