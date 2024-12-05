function getData(url){
    fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error('not gud');
        }
        return response.json(); 
    })
    .then(data => {
        const apiData = JSON.stringify(data); 
        localStorage.setItem('seasonData', apiData);
        //console.log(localStorage.getItem("seasonData"))
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
