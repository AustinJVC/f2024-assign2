function generatePopup(type, ref, season) {
    if (type == 'driver') {
        driverPopup(ref, season);
    }
    else if (type == 'constructor') {
        constructorPopup(ref, season);
    }
}

function driverPopup(ref, season) {
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
            h2.textContent = 'Driver Details:'
            driverInfo.appendChild(h2);



            const imgDiv = document.createElement('div');
            driverInfo.appendChild(imgDiv);

            const details = document.createElement('ul');

            let li = document.createElement('li');
            li.textContent = stats['forename'] + ' ' + stats['surname'];
            details.appendChild(li);

            let li2 = document.createElement('li');
            li2.textContent = stats['dob'];
            details.appendChild(li2);

            let li3 = document.createElement('li');
            li3.textContent = stats['nationality'];
            details.appendChild(li3);

            let li4 = document.createElement('li');
            li4.textContent = stats['url'];
            details.appendChild(li4);

            driverInfo.appendChild(details);
            modalContent.appendChild(driverInfo);

            const resultsSection = document.createElement('div');

            let resultsTitle = document.createElement('h2');
            resultsTitle.textContent = "Driver Results";
            resultsSection.appendChild(resultsTitle);

            let favouriteButton = document.createElement('a');
            favouriteButton.dataset.ref = ref;
            favouriteButton.classList.add('fa-regular', 'fa-heart')
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
            modalContent.appendChild(resultsSection);

            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            })

            generateFavouriteEventHandler(favouriteButton);
            generateModalStyling(modal, overlay, modalContent, closeButton, resultsTitle, resultsSection, h2)

            modal.style.display = 'block';
            overlay.classList.display = 'block';
        })
};


function constructorPopup(ref, season) {
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
            h2.textContent = 'Constructor Details:'
            constInfo.appendChild(h2);

            const imgDiv = document.createElement('div');
            constInfo.appendChild(imgDiv);

            const details = document.createElement('ul');

            let li = document.createElement('li');
            li.textContent = stats.name;
            details.appendChild(li);


            let li3 = document.createElement('li');
            li3.textContent = stats['nationality'];
            details.appendChild(li3);

            let li4 = document.createElement('li');
            li4.textContent = stats['url'];
            details.appendChild(li4);
            
            constInfo.appendChild(details);
            modalContent.appendChild(constInfo);

            const resultsSection = document.createElement('div');

            let resultsTitle = document.createElement('h2');
            resultsTitle.textContent = "Constructor Results";
            resultsSection.appendChild(resultsTitle);

            let favouriteButton = document.createElement('a');
            favouriteButton.dataset.ref = ref;
            favouriteButton.classList.add('fa-regular', 'fa-heart')

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

            const headers = ['Rnd', 'Circuit', 'Driver Name', 'Pos', 'Points'];

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
            modalContent.appendChild(resultsSection);

            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
                overlay.style.display = 'none';
            })

            generateFavouriteEventHandler(favouriteButton);

            generateModalStyling(modal, overlay, modalContent, closeButton, resultsTitle, resultsSection, h2)

            modal.style.display = 'block';
            overlay.classList.display = 'block';
        });
};

function generateFavouriteEventHandler(favouriteButton){
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
    })
}


