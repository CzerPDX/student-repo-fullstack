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
    if (input > 10) {
        returnString = `\$${input} ==> Error: the number is too large`;
    }
    // If the input value is more than 10.00 return an error
    else if (input < 0) {
        returnString = `\$${input} ==> Error: the number is too small`;
    }
    // Otherwise process the values
    else {
        let currentCents = 0

        // Dollars
        let dollarCount = Math.floor(input / DOLLAR_VAL);
        if (dollarCount > 0) {
            returnString = formatOutputString(returnString, dollarCount, DOLLAR_VAL, input);
        }

        // Translate remaining cents to change sizes
        // Avoid rounding errors by working with currentCents as integers (multiply by 100)
        let totalInChange = Math.round(input.toString() * 100);
        let dollarsInChange = (dollarCount * DOLLAR_VAL * 100);
        currentCents = totalInChange - dollarsInChange;
        
        // Quarters
        if (currentCents > 0) {
            let quarterCount = Math.floor(currentCents / (QUARTER_VAL * 100));
            currentCents -= quarterCount * (QUARTER_VAL * 100)
            returnString = formatOutputString(returnString, quarterCount, QUARTER_VAL, input);
        }

        // Dimes
        if (currentCents > 0) {
            let dimeCount = Math.floor(currentCents / (DIME_VAL * 100));
            currentCents -= dimeCount * (DIME_VAL * 100)
            returnString = formatOutputString(returnString, dimeCount, DIME_VAL, input);
        }

        // Nickels
        if (currentCents > 0) {
            let nickelCount = Math.floor(currentCents / (NICKEL_VAL * 100));
            currentCents -= nickelCount * (NICKEL_VAL * 100)
            returnString = formatOutputString(returnString, nickelCount, NICKEL_VAL, input);
        }

        // Pennies
        if (currentCents > 0) {
            let pennyCount = Math.floor(currentCents / (PENNY_VAL * 100));
            currentCents -= pennyCount * (PENNY_VAL * 100)
            returnString = formatOutputString(returnString, pennyCount, PENNY_VAL, input);
        }
    }

    return returnString;
};

console.log(calculateChange(0.29));
// $0.29 ==> 1 quarter, 4 pennies

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large

// Test all possible values
for (let i = 0; i <= 1001; i++) {
    console.log(calculateChange(i * 0.01));
}