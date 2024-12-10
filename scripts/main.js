// Function to fetch data from a passed URL
function getData(url){
    return fetch(url) // Fetch data from the URL
    .then(response => { // Check if the response is successful
        if (!response.ok) { 
        throw new Error('not gud'); // If not, throw an error
        }
        return response.json(); // Parse the response as JSON
    })
    .then(data => { 
        const apiData = JSON.stringify(data); // Convert the data to a JSON string
        return apiData; // Return the JSON string
    })
    .catch(error => { // Catch any errors that occurred during the fetch or parsing
        console.error('Error:', error); // Log the error to the console
    });
}