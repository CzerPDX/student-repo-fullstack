/** Exercise 04 - API
 * Brooke Czerwinski
 * Full-Stack Web Development
 * HW 2
 * 
 * **/


const url = 'https://restcountries.com/v3.1/all';


fetch(url)
// Get promise
.then((response) => {
    return response.json();
})
// Get data
.then((data) => {

    let countryList = `<ol>`
    // Generate list items to insert into the DOM
    data.forEach(country => {
        // Save population formatted for the united states
        populationFormatted = country.population.toLocaleString("en-US");
        countryList += `<li> ${country.name.common} - ${populationFormatted}`;
    });
    countryList += `</ol>`

    // Insert country list into page
    document.getElementById(`results`).innerHTML = countryList;
})
// Catch any errors
.catch((error) => {
    const resultsDiv = document.getElementById(`results`);
    resultsDiv.className = `invalidInput`;
    // Insert error into page and log to console.
    resultsDiv.innerHTML = `Error! Unable to load Country List.`;
    console.error(error);
});
