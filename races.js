function generateRaceView(raceId){
    

    div2 = document.querySelector('#content')

    children = Array.from(div2.children)

    for(child of children){
        child.remove();
    }

    qualifying = document.createElement('div');
    qualifying.classList.add = 'qualifying';
    div2.appendChild(qualifying);

    results = document.createElement('div');
    results.classList.add = 'results';
    div2.appendChild(results);

    /*qualifyingData = JSON.parse(localStorage.getItem("qualifyingData")).filter((param) => {
        return race.id == param
    })
    
    createQualifyingTable(qualifying, qualifyingData)
    */
}
function createQualifyingTable(qualifying, qualifyingData){

    const h2 = document.createElement('h2'); 
    h2.textContent = 'Qualifying';
    qualifying.appendChild(h2);

    const table = document.createElement('table'); 
    qualifying.appendChild(table);

    const tr = document.createElement('tr'); 
    table.appendChild(tr);
    
    const th1 = document.createElement('th'); 
    th1.textContent = "Pos";
    tr.appendChild(th1);

    const th2 = document.createElement('th');   
    th2.textContent = "Name";
    tr.appendChild(th2);

    const th3 = document.createElement('th');
    th3.textContent = "Constructor";
    tr.appendChild(th3);

    const th4 = document.createElement('th');
    th4.textContent = "Q1";
    tr.appendChild(th4);

    const th5 = document.createElement('th');
    th5.textContent = "Q2";
    tr.appendChild(th5);

    const th6 = document.createElement('th');
    th6.textContent = "Q3";
    tr.appendChild(th6);

    for (let result of JSON.parse(qualifyingData)) {
        const tr2 = document.createElement('tr');
        
        const td = document.createElement('td');
        td.textContent = result.position;
        tr2.appendChild(td);

        const td2 = document.createElement('td');
        
        a = document.createElement('a')
        a.classList.add('driver')
        a.dataset.ref = result.driver.ref
        a.textContent = result.driver.forename + " " + result.driver.surname;
        td2.appendChild(a);
        tr2.appendChild(td2);
        
        const td3 = document.createElement('td');
        a = document.createElement('a')
        a.classList.add('constructor')
        a.dataset.ref = result.constructor.ref
        a.textContent = result.constructor.name;;
        td3.appendChild(a);
        tr2.appendChild(td3);
        
        const td4 = document.createElement('td');
        td4.textContent = result.q1;
        tr2.appendChild(td4);
        
        const td5 = document.createElement('td');
        td5.textContent = result.q2
        tr2.appendChild(td5);
        
        const td6 = document.createElement('td');
        td6.textContent = result.q3;
        tr2.appendChild(td6);
        
        table.appendChild(tr2);
    }
}
function createResultsTable(results, resultsData){

    const h2 = document.createElement('h2'); 
    h2.textContent = 'Results';
    results.appendChild(h2);

    const table = document.createElement('table'); 
    results.appendChild(table);

    const tr = document.createElement('tr'); 
    table.appendChild(tr);
    
    const th1 = document.createElement('th'); 
    th1.textContent = "Pos";
    tr.appendChild(th1);

    const th2 = document.createElement('th'); 
    th2.textContent = "Name";
    tr.appendChild(th2);

    const th3 = document.createElement('th');
    th3.textContent = "Constructor";
    tr.appendChild(th3);

    const th4 = document.createElement('th');
    th4.textContent = "Laps";
    tr.appendChild(th4);

    const th5 = document.createElement('th');
    th5.textContent = "Pts";
    tr.appendChild(th5);


    for (let result of JSON.parse(resultsData)) {
        const tr2 = document.createElement('tr');
        
        const td = document.createElement('td');
        td.textContent = result.position;
        tr2.appendChild(td);

        td2 = document.createElement('td');
        
        a = document.createElement('a')
        a.classList.add('driver')
        a.dataset.ref = result.driver.ref
        a.textContent = result.driver.forename + " " + result.driver.surname;
        td2.appendChild(a);
        tr2.appendChild(td2);
        
        const td3 = document.createElement('td');
       
        a = document.createElement('a')
        a.classList.add('constructor')
        a.dataset.ref = result.constructor.ref
        a.textContent = result.constructor.name;;
        td3.appendChild(a);
        tr2.appendChild(td3);
        
        const td4 = document.createElement('td');
        td4.textContent = result.laps;
        tr2.appendChild(td4);
        
        const td5 = document.createElement('td');
        td5.textContent = result.points
        tr2.appendChild(td5);
        
        table.appendChild(tr2);
    }
}
