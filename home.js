document.addEventListener('DOMContentLoaded', ()=>{
    div1 = document.querySelector('#selector')
    div2 = document.querySelector('#content')
    
    function generateHomeView(div1, div2){
        select = document.createElement('select');

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

        div2.classList.add('no-race-selected')
        
    }

    generateHomeView(div1, div2);

    function updateRaces(season) {

        // Clear previous table and heading from div1
        div1.querySelectorAll('h2, table').forEach( (tableRow) => {
            tableRow.remove();
        })
        
        div2.classList.remove('no-race-selected');
         
        racesData = localStorage.getItem("seasonData")
        racesData = JSON.parse(racesData);

        const h2 = document.createElement('h2'); 
        h2.textContent = season + " Races";
        div1.appendChild(h2);
    
        const table = document.createElement('table'); 
        div1.appendChild(table);
    
        const tr = document.createElement('tr'); 
        table.appendChild(tr);
        
        const th1 = document.createElement('th'); 
        th1.textContent = "Rnd";
        tr.appendChild(th1);
    
        const th2 = document.createElement('th'); 
        th2.textContent = "Circuit";
        tr.appendChild(th2);
    
        const th3 = document.createElement('th');
        th3.textContent = "Action";
        tr.appendChild(th3);

        for (let race of racesData) {
            const tr2 = document.createElement('tr');
        
            const td = document.createElement('td');
            td.textContent = race.round; 
            tr2.appendChild(td);
        
            const td2 = document.createElement('td');
            td2.textContent = race.name; 
            tr2.appendChild(td2);
        
            const td3 = document.createElement('td');
            tr2.appendChild(td3);
        
            table.appendChild(tr2);
        }
    }
    select = div1.querySelector('select');
    select.addEventListener('change', () => {
        let season = select.value;
        
        getData("https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=" + season);
        updateRaces(season);
    });

});