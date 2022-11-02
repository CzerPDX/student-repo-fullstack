// This API does not give all data at once. We need to page through
// it using their "next" field.

// First we get the information
function fetchTest(url) {
    let planetList = fetch(url)
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
        data.next !== null && fetchTest(data.next);

        return data.results;

    })
    .then((planets) => {
        planets.forEach((planet) => {
            console.log(`Planet: ${planet.name} - Population: ${planet.population}`);
            planetList += `<li>Planet: ${planet.name} - Population: ${planet.population}</li>`
        });
        document.getElementById("outputAPI").innerHTML += planetList;
    })
    .catch((error) => console.error(`this is the error: `, error))
    // The finally block can be used if our request was successful, but we haven't figured
    // out if the promise is fulfilled or rejected. So we're waiting for the response
    // from the server. We can use this to display something like a spinner!
    .finally(() => {
        console.log("this block runs whether the promise was fulfilled or rejected.");
        /*
            The below does not currently work. I think I need to learn more about resolving before it will work.
        */
        document.getElementById("outputAPI").innerHTML = "<li>Loading planet information...</li>";
    })
    // .resolve()
    document.getElementById("outputAPI").innerHTML = "<li>Loading planet information...</li>";
    // Once loaded, put it in the html
    // return planetList
}

// getData(url);
