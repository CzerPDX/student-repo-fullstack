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

    let countryList = ``
    // Generate list items to insert into the DOM
    data.forEach(country => {
        // Save population formatted for the united states
        populationFormatted = country.population.toLocaleString("en-US");
        countryList += `<li> ${country.name.common} - ${populationFormatted}`;
    });

    // Insert country list into page
    document.getElementById(`results`).innerHTML = countryList;
})
// Catch any errors
.catch(error => console.error(error));
