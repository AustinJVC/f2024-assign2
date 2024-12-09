function generatePopup(type, ref, season){
    if(type == 'driver'){
        driverPopup(ref, season);
    }
    else if(type == 'constructor'){
        constructorPopup(ref, season);
    } 
}

function driverPopup(ref, season){
    driverStats = getData('https://www.randyconnolly.com/funwebdev/3rd/api/f1/drivers.php?ref=' + ref)
    .then( (driverStats) => {

        stats = JSON.parse(driverStats);
        const modal = document.createElement('section');
        modal.className = 'modal'; 
        document.body.appendChild(modal);

        const overlay = document.createElement('div');
        overlay.className = 'overlay'; 
        document.body.appendChild(overlay); 

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modal.appendChild(modalContent);

        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.textContent = 'X';
        modalContent.appendChild(closeButton);

        const title = document.createElement('h2');
        title.textContent = 'Driver Statistics';
        modalContent.appendChild(title);

        const driverInfo = document.createElement('div');
        driverInfo.className = 'driver-info';
        h3 = document.createElement('h3');
        h3.textContent = 'Driver Details'
        driverInfo.appendChild(h3);
        modalContent.appendChild(driverInfo);


        const imgDiv = document.createElement('div');
        imgDiv.className = 'img-div';
        driverInfo.appendChild(imgDiv);

        const details = document.createElement('div');
        details.className = 'details';

        fullName = stats['forename'] + ' ' +stats['surname'];
        dob = stats['dob'];
        nationality = stats['nationality'];
        url = stats['url'];
       
        details.textContent = fullName + ': \n' + nationality + ' \n DOB:' + dob +  '\n' + url ;  

        driverInfo.appendChild(details);

        const resultsSection = document.createElement('div');
        resultsSection.className = 'results-section';
        resultsSection.id = 'driver-results';
        const resultsTable = document.createElement('table');

        const headerRow = document.createElement('tr');
        const headers = ['Rnd', 'Name', 'Pos', 'Points'];
        
        for(let header of headers) {
            let th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        };
        
        resultsTable.appendChild(headerRow);


        resultsData = JSON.parse(localStorage.getItem('resultsData' + season));

        for(let result of resultsData){
            if(result.driver.ref == ref && result.race.year == season){
                const row = document.createElement('tr');

                let round = document.createElement('td')
                round.textContent = result.race.round 
                row.appendChild(round)

                let circuitName = document.createElement('td')
                circuitName.textContent = result.race.name;
                row.appendChild(circuitName)

                let pos = document.createElement('td')
                pos.textContent = result.position 
                row.appendChild(pos)

                let point = document.createElement('td');
                point.textContent = result.points;
                row.appendChild(point);

                resultsTable.appendChild(row);
            }
        }

        resultsSection.appendChild(resultsTable);
        modalContent.appendChild(resultsSection);

        closeButton.addEventListener('click', () =>{
            modal.style.display = 'none';
            overlay.style.display = 'none';    
        })

        modal.style.display = 'block';
        overlay.classList.display = 'block'; 
    })
};


function constructorPopup(ref, season){
    let constructorStats = getData('https://www.randyconnolly.com/funwebdev/3rd/api/f1/constructors.php?ref=' + ref)
    .then((constructorStats) => {
        stats = JSON.parse(constructorStats);
        const modal = document.createElement('section');
        modal.className = 'modal'; 
        document.body.appendChild(modal);

        const overlay = document.createElement('div');
        overlay.className = 'overlay'; 
        document.body.appendChild(overlay); 

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modal.appendChild(modalContent);

        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.textContent = 'X';
        modalContent.appendChild(closeButton);

        const title = document.createElement('h2');
        title.textContent = 'Constructor Statistics';
        modalContent.appendChild(title);

        const constInfo = document.createElement('div');
        h3 = document.createElement('h3');
        h3.textContent = 'Constructor Details'
        constInfo.appendChild(h3);
        modalContent.appendChild(constInfo);


        const imgDiv = document.createElement('div');
        imgDiv.className = 'img-div';
        constInfo.appendChild(imgDiv);

        const details = document.createElement('div');
        details.className = 'details';

        constName = stats.name
        nationality = stats.nationality;
        url = stats.url;
       
        details.textContent = constName + '\n' + nationality + '\n' + url ;  

        constInfo.appendChild(details);

        const resultsSection = document.createElement('div');
        resultsSection.className = 'results-section';
        resultsSection.id = 'const-results';
        const resultsTable = document.createElement('table');

        const headerRow = document.createElement('tr');
        const headers = ['Rnd', 'Name', 'Pos', 'Points'];
        
        for(let header of headers) {
            let th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        };
        
        resultsTable.appendChild(headerRow);


        resultsData = JSON.parse(localStorage.getItem('resultsData' + season));

        for(let result of resultsData){
            if(result.constructor.ref == ref && result.race.year == season){
                const row = document.createElement('tr');

                let round = document.createElement('td')
                round.textContent = result.race.round 
                row.appendChild(round)

                let circuitName = document.createElement('td')
                circuitName.textContent = result.race.name;
                row.appendChild(circuitName)

                let driverName = document.createElement('td')
                driverName.textContent = result.driver.forename + " " + result.driver.surname;
                row.appendChild(driverName)

                let pos = document.createElement('td')
                pos.textContent = result.position 
                row.appendChild(pos)

                let point = document.createElement('td');
                point.textContent = result.points;
                row.appendChild(point);

                resultsTable.appendChild(row);
            }
        }

        resultsSection.appendChild(resultsTable);
        modalContent.appendChild(resultsSection);

        closeButton.addEventListener('click', () =>{
            modal.style.display = 'none';
            overlay.style.display = 'none';    
        })

        modal.style.display = 'block';
        overlay.classList.display = 'block'; 
    });
};