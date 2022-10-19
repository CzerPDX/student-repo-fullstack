/** 
 * Exercise 02 - Reverse 
 * Brooke Czerwinski
 * Full-Stack Web Development
 *
 * References
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * https://www.codeproject.com/Questions/1232562/I-want-to-display-form-data-on-same-page-using-jav
 * https://www.geeksforgeeks.org/reverse-a-string-in-javascript/ (I think method 2 is really nice!)
**/

// Function to reverse string
function reverseNumber(input) {
    str = input.toString()
    return str.split('').reverse().join('')
 }

const validReverse = () => {
    let responseString = ``;
    
    // Get the input the user entered
    const userInput = document.getElementById("input").value;
    const numberRegex = new RegExp(/\b\d{8}\b/);                        // Regex pattern that will match exactly 8 digits
    const reverseOutputDiv = document.getElementById('reverseOutput')
    

    // Tets the format of input against the regex defined above
    let validity = numberRegex.test(userInput);
    // If input was valid proceed
    if (validity) {
        // Apply valid class on output div. Overwrites any previous classes
        reverseOutputDiv.className = `validInput`
        // Reverse the number
        reversedNumber = reverseNumber(userInput)
        // Build the output string using interpolation
        responseString = `${userInput} --> ${reversedNumber}`
    }
    // Otherwise give an error
    else {
        reverseOutputDiv.className = `invalidInput`
        responseString = `Error: Please input an 8-digit number`
    }
    // Output result to HTML
    reverseOutputDiv.innerHTML = responseString;
}
