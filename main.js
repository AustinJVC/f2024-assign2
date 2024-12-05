function getData(url){
    return fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error('not gud');
        }
        return response.json(); 
    })
    .then(data => {
        const apiData = JSON.stringify(data); 
        return apiData;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
