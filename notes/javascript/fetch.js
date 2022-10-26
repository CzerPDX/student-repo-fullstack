console.log('test');

//const url = "https://swapi.dev/api/planets/";

// First we get the information
function fetchTest(url) {
    fetch(url)
    // Right now the response is in HTTP format. 
    // We can't really use that very easily so we change it into JSON format
    .then((response) => {
        // Print the HTTP version of the request
        console.log('HTTP RESPONSE VERSION BELOW')
        console.log(response);
        // Turn the HTTP response into a JSON object and returns it
        return response.json();
    })
    .then((data) => {
        // Now print the JSON version of the request
        console.log('JSON "data" RESPONSE VERSION BELOW')
        console.log(data)
        console.log('Output from "data.results will give an array"')
        console.log(data.results)

        let planetList = `<ul>`
        // Now that we have an array of our planet data we can process it
        data.results.forEach((planet) => {
            console.log(`Planet: ${planet.name} - Population: ${planet.population}`);
            planetList += `<li>Planet: ${planet.name} - Population: ${planet.population}</li>`
        });
        planetList += `</ul>`
        document.getElementById("outputAPI").innerHTML = planetList;
    })
    .catch(error => console.error(error));
}

