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

// Count the multiples of the denomination and return the count
const countMultiples = (currentTotal, denomination) => {
    currentTotal = Number(currentTotal).toFixed(2) // Prevent rounding errors with toFixed to 2 decimal
    let count = 0;
    while (currentTotal >= denomination) {
        currentTotal -= denomination;
        currentTotal = currentTotal.toFixed(2);      // Prevent rounding errors with toFixed to 2 decimal
        count += 1;
    }
    return count;
}

// Return the money name in English based on money value and amount
const getMoneyName = (moneyCount, moneyValue) => {
    let moneyName = ``;

    // Figure out the plurality and name of the denomination
    // Plural names
    if ((moneyCount > 1) & (moneyCount < 0)) {
        if (moneyValue == DOLLAR_VAL) {
            moneyName = `dollars`;
        }
        else if (moneyValue == QUARTER_VAL) {
            moneyName = `quarters`;
        }
        else if (moneyValue == DIME_VAL) {
            moneyName = `dimes`;
        }
        else if (moneyValue == NICKEL_VAL) {
            moneyName = `nickels`;
        }
        else if (moneyValue == PENNY_VAL) {
            moneyName = `pennies`;
        }
    }
    // Singular names
    else {
        if (moneyValue == DOLLAR_VAL) {
            moneyName = `dollar`;
        }
        else if (moneyValue == QUARTER_VAL) {
            moneyName = `quarter`;
        }
        else if (moneyValue == DIME_VAL) {
            moneyName = `dime`;
        }
        else if (moneyValue == NICKEL_VAL) {
            moneyName = `nickel`;
        }
        else if (moneyValue == PENNY_VAL) {
            moneyName = `penny`;
        }
    }
    return moneyName;
}

// Build the return string for each denomination
const appendToString = (output, moneyCount, moneyValue, originalTotal) => {
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
        let dollarCount = 0;                     // Number of dollars
        let quarterCount = 0;                    // Number of quarters
        let dimeCount = 0;                       // Number of dimes
        let nickelCount = 0;                     // Number of nickels
        let pennyCount = 0;                      // Number of pennies
        let currentTotal = input.toString();     // Amount that will count down from input as denominations are removed

        // Find out how many dollars and subtract that amt from the currentTotal
        if (currentTotal > 0) {
            dollarCount = countMultiples(currentTotal, DOLLAR_VAL);
            if (dollarCount > 0) {
                currentTotal -= (dollarCount * DOLLAR_VAL);
                returnString = appendToString(returnString, dollarCount, DOLLAR_VAL, input);
            }
        }

        // Find out how many quarters and subtract that amt from the currentTotal
        if (currentTotal > 0) {
            quarterCount = countMultiples(currentTotal, QUARTER_VAL);
            if (quarterCount > 0) {
                currentTotal -= (quarterCount * QUARTER_VAL);
                returnString = appendToString(returnString, quarterCount, QUARTER_VAL, input);
            }
        }

        // Find out how many dimes and subtract that amt from the currentTotal
        if (currentTotal > 0) {
            dimeCount = countMultiples(currentTotal, DIME_VAL);
            if (dimeCount > 0) {
                currentTotal -= (dimeCount * DIME_VAL);
                returnString = appendToString(returnString, dimeCount, DIME_VAL, input);
            }
        }

        // Find out how many nickels and subtract that amt from the currentTotal
        if (currentTotal > 0) {
            nickelCount = countMultiples(currentTotal, NICKEL_VAL);
            if (nickelCount > 0) {
                currentTotal -= (nickelCount * NICKEL_VAL);
                returnString = appendToString(returnString, nickelCount, NICKEL_VAL, input);
            }
        }

        // Find out how many pennies and subtract that amt from the currentTotal
        if (currentTotal > 0) {
            pennyCount = countMultiples(currentTotal, PENNY_VAL);
            if (pennyCount > 0) {
                currentTotal -= (pennyCount * PENNY_VAL);
                returnString = appendToString(returnString, pennyCount, PENNY_VAL, input);
            }
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