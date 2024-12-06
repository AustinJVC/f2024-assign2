function generatePopup(type, ref, season){
    if(type == 'driver'){
        driverPopup(ref, season);
    }
    else if(type == 'constructor'){
        constructorPopup(ref,season);
    } 
}

function driverPopup(ref, season){

    driverStats = getData('https://www.randyconnolly.com/funwebdev/3rd/api/f1/drivers.php?ref=' + ref)
    .then( (driverStats) => {

        stats = JSON.parse(driverStats);
        console.log(stats);
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
        closeButton.innerHTML = '&times;';
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

        getData('https://www.randyconnolly.com/funwebdev/3rd/api/f1/driverResults.php?driver='+ ref + '&season='+ season)
        .then((resultsStats) => {
        const results = JSON.parse(resultsStats);

        const headerRow = document.createElement('tr');
        const headers = ['Rnd', 'Name', 'Pos', 'Points'];
        headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
        });
        resultsTable.appendChild(headerRow);

        results.forEach(result => {
        const row = document.createElement('tr');

        const roundCell = document.createElement('td');
        roundCell.textContent = result.round;
        row.appendChild(roundCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = result.name;
        row.appendChild(nameCell);

        const positionCell = document.createElement('td');
        positionCell.textContent = result.positionOrder;
        row.appendChild(positionCell);
        //No raxce ID FIx
        getData('https://www.randyconnolly.com/funwebdev/3rd/api/f1/Results.php?race='+ result.race.id)
        .then((pointsData) => {
        const point = JSON.parse(pointsData);
       
       
        const pointsCell = document.createElement('td');
        pointsCell.textContent = point;
        row.appendChild(pointsCell);

        resultsTable.appendChild(row);
        });
        })
        .catch(error => {
        console.error("Error fetching or parsing data:", error);
        });

        resultsSection.appendChild(resultsTable);
        modalContent.appendChild(resultsSection);

        closeButton.addEventListener('click', () =>{
            modal.classList.remove('show');
            overlay.classList.remove('show');    
        })

        // Show the modal and overlay
        modal.classList.add('show');
        overlay.classList.add('show'); 
})
});

function constructorPopup(ref, season){
    console.log(ref);
}};