function generateRaceView(raceId, season){
    

    div2 = document.querySelector('#content')
    div2.classList.add("grid")
    div2.classList.add("grid-cols-[1fr_1fr]")
    div2.classList.add("p-20")
    
    children = Array.from(div2.children)
    for(child of children){
        child.remove();
    }

    qualifyingData = JSON.parse(localStorage.getItem("qualifyingData" + season));
    resultsData = JSON.parse(localStorage.getItem("resultsData" + season));

    tempArray = [];
    for(result of qualifyingData){
        if(result.race.id == raceId){
            tempArray.push(result)
        }
    }
    
    qualifyingData = tempArray;
    
    tempArray = [];
    for(result of resultsData){
        if(result.race.id == raceId){
            tempArray.push(result)
        }
    }
    
    resultsData = tempArray;

    qualifying = document.createElement('div');
    qualifying.classList.add = 'qualifying';
    div2.appendChild(qualifying);

    results = document.createElement('div');
    results.classList.add = 'results';
    div2.appendChild(results);
    
    createQualifyingTable(qualifying, qualifyingData);
    createResultsTable(results, resultsData);
    header = document.querySelector("h1 a");
    header.textContent = "F1 Statistics - " + qualifyingData[0].race.year + " " + qualifyingData[0].race.name
    
}
function createQualifyingTable(qualifying, qualifyingData){

    const h3 = document.createElement('h3'); 
    h3.textContent = 'Qualifying';
    h3.classList.add("text-2xl")
    qualifying.appendChild(h3);

    const table = document.createElement('table'); 
    qualifying.appendChild(table);


    const tr = document.createElement('tr'); 
    table.appendChild(tr);
    
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
        a.textContent = result.driver.forename + " " + result.driver.surname;
        td2.appendChild(a);
        generateTDStyling(td2);
        tr2.appendChild(td2);
        
        const td3 = document.createElement('td');
        a = document.createElement('a')
        a.classList.add('constructor')
        a.dataset.ref = result.constructor.ref
        a.dataset.season = result.race.year
        a.textContent = result.constructor.name;;
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
}
function createResultsTable(results, resultsData){

    const h3 = document.createElement('h3'); 
    h3.textContent = 'Results';
    h3.classList.add("text-2xl")
    results.appendChild(h3);

    const table = document.createElement('table'); 
    results.appendChild(table);

    const tr = document.createElement('tr'); 
    table.appendChild(tr);
    
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
        a.textContent = result.driver.forename + " " + result.driver.surname;
        td2.appendChild(a);
        generateTDStyling(td2)
        tr2.appendChild(td2);
        
        const td3 = document.createElement('td');
       
        a = document.createElement('a')
        a.classList.add('constructor')
        a.dataset.ref = result.constructor.ref
        a.dataset.season = result.race.year
        a.textContent = result.constructor.name;;
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
    }
}
