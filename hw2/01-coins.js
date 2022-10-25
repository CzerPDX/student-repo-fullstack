/** 
 * Exercise 01 - Coins
 * Brooke Czerwinski
 * Full-Stack Web Development
 * HW 2
 * 
 * **/

// Money value amounts
const DOLLAR_VAL = 1.00;
const QUARTER_VAL = 0.25;
const DIME_VAL = 0.10;
const NICKEL_VAL = 0.05;
const PENNY_VAL = 0.01;

// Return the money name in English based on money value and amount
const getMoneyName = (moneyCount, moneyValue) => {
    let moneyName = ``;

    try {
        // First, find out what denomiation we are workign with using moneyValue
        // Then use ternary operator to decide whether plural or singular form is returned.
        //      (moneyCount > 1) ? (plural) : (singular)
        switch(moneyValue) {
            case DOLLAR_VAL:
                moneyName = moneyCount > 1 ? 'dollars' : 'dollar';
                break;
            case QUARTER_VAL:
                moneyName = moneyCount > 1 ? 'quarters' : 'quarter';
                break;
            case DIME_VAL:
                moneyName = moneyCount > 1 ? 'dimes' : 'dime';
                break;
            case NICKEL_VAL:
                moneyName = moneyCount > 1 ? 'nickels' : 'nickel';
                break;
            case PENNY_VAL:
                moneyName = moneyCount > 1 ? 'pennies' : 'penny';
                break;
            default:
                throw 'Unknown money value';
        }
    } catch (errorThrown) {
        console.error(errorThrown);
        process.exit(1);
    }
    return moneyName;
}

// Build the return string for each denomination
const formatOutputString = (output, moneyCount, moneyValue, originalTotal) => {
    if (moneyCount > 0) {
        // If output is empty, then we need to build the beginning of the string
        if (output == ``) {
            output = `\$${originalTotal.toFixed(2)} ==> `;
        }
        // Otherwise there are already values there and we need to add a comma and space
        else {
            output += `, `;
        }

        // Get the name of the money based on amount (plural vs singular)
        const moneyName = getMoneyName(moneyCount, moneyValue);
        
        // Add money name and amount into the string
        output += `${moneyCount} ${moneyName}`;
    }
    return output;
}

// Calculate the best change for an input value
const calculateChange = (input) => {
    let returnString = ``;                  // String to return to user

    // Check that input dollar amount is less than 10.00
    if (input <= 10)
    {
        // Initialize denomination counts
        let currentCentsTotal = 0

        if (input >= 0) {
            let dollarCount = Math.floor(input / DOLLAR_VAL);
            if (dollarCount > 0) {
                // Avoid rounding errors by working with currentCentsTotal as integers
                currentCentsTotal = parseInt(input - (dollarCount * DOLLAR_VAL));
                returnString = formatOutputString(returnString, dollarCount, DOLLAR_VAL, input);
            }
        }
        else {
            console.error(`Error! Must enter a positive number between 0 and 10!`)
        }
        
        // Find out how many quarters and subtract that amt from the currentTotal
        if (currentTotal > 0) {
            let quarterCount = Math.floor(currentCentsTotal / (QUARTER_VAL * 100));
            currentCentsTotal -= quarterCount * (QUARTER_VAL * 100)
            returnString = formatOutputString(returnString, quarterCount, QUARTER_VAL, input);
        }

        // Find out how many dimes and subtract that amt from the currentTotal
        if (currentTotal > 0) {
            let dimeCount = Math.floor(currentCentsTotal / (DIME_VAL * 100));
            currentCentsTotal -= dimeCount * (DIME_VAL * 100)
            returnString = formatOutputString(returnString, dimeCount, DIME_VAL, input);
        }

        // Find out how many nickels and subtract that amt from the currentTotal
        if (currentTotal > 0) {
            let nickelCount = Math.floor(currentCentsTotal / (NICKEL_VAL * 100));
            currentCentsTotal -= nickelCount * (NICKEL_VAL * 100)
            returnString = formatOutputString(returnString, nickelCount, NICKEL_VAL, input);
        }

        // Find out how many pennies and subtract that amt from the currentTotal
        if (currentTotal > 0) {
            let pennyCount = Math.floor(currentCentsTotal / (PENNY_VAL * 100));
            currentCentsTotal -= pennyCount * (PENNY_VAL * 100)
            returnString = formatOutputString(returnString, pennyCount, PENNY_VAL, input);
        }
    }
    // If the input value is more than 10.00 return an error
    else {
        returnString = `\$${input} ==> Error: the number is too large`;
    }
    

    return returnString;
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large

// // Test all possible values
// for (let i = 0; i <= 1001; i++) {
//     console.log(calculateChange(i * 0.01));
// }