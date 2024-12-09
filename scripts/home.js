document.addEventListener('DOMContentLoaded', ()=>{
    div1 = document.querySelector('#selector')
    div1.classList.add('bg-white')
    div1.classList.add('z-10')
    div2 = document.querySelector('#content')
    
    function generateHomeView(div1, div2){
        select = document.createElement('select');

        select.classList.add('text-4xl')

        option = document.createElement('option')
        option.disabled = true;
        option.selected = true;
        option.textContent = "Select a season";

        select.appendChild(option);

        for(let i=2023; i > 2019; i--){
            option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            select.appendChild(option);
        }
        div1.appendChild(select);

        div2.classList.add("bg-[url('images/Home.jpg')]");
        div2.classList.add("bg-cover");
        div2.classList.add("bg-center");
        div2.classList.add("bg-no-repeat");
        div2.classList.add("w-[80vw]")

    }

    generateHomeView(div1, div2);

    function updateRaces(season) {

        // Clear previous selected season.
        div1.querySelectorAll('h2, table').forEach( (tableRow) => {
            tableRow.remove();
        })
        
        racesData = JSON.parse(localStorage.getItem("seasonData" + season));

        const h2 = document.createElement('h2'); 
        h2.textContent = "Races";
        h2.classList.add('text-2xl');
        h2.classList.add('ml-1');
        div1.appendChild(h2);
    
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
            td2.textContent = race.name; 
            td2.classList.add('pl-4')
            td2.classList.add('pt-1')
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
        if(localStorage.getItem('seasonData' + select.value) == null || JSON.parse(localStorage.getItem('seasonData' + select.value))[0].year != select.value){
            seasonData = getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=" + select.value).then((data) => localStorage.setItem("seasonData" + select.value, data)).then(() => updateRaces(select.value));
            resultsData = getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season=" + select.value).then((data) => localStorage.setItem("resultsData" + select.value, data));   
            qualifyingData = getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season=" + select.value).then((data) => localStorage.setItem("qualifyingData" + select.value, data));
        }
        else{
            updateRaces(select.value)
        }
    });

    div1.addEventListener('click', (e) => {
        if (e.target.nodeName == 'A') {
            div2.classList.remove("bg-[url('images/Home.jpg')]");
            generateRaceView(e.target.dataset.raceId, e.target.dataset.year);
        }
    });
    
    div2.addEventListener('click', (e) => {
        if (e.target.nodeName == 'A') {
            generatePopup(e.target.className, e.target.dataset.ref, e.target.dataset.season);
        }
    });

});