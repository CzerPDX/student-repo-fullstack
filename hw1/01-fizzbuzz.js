/** Exercise 01 - Fizzbuzz

Write a program that writes all the numbers from 1 to 100, with some exceptions: 
- For numbers divisible by 3, print “fizz” 
- For numbers divisible by 5 (but not 3), print “buzz” 
- For numbers divisible by 3 and 5, print “fizzbuzz”

Use console.log() to write the proper output to the command line.

**/
function processFizzbuzz(num) {
  let output = ''
  if ((num % 3) === 0) {
    output = output.concat('fizz')
  }
  if ((num % 5) === 0) {
    output = output.concat('buzz')
  }
  if (output === '') {
    output = nums;
  }
  return output;
}

const fizzbuzz = () => {
  // Add your code here
  let num = 1;
  while (num <= 100) {
    console.log(processFizzbuzz(num));
    num += 1;
  }
};

fizzbuzz();
// 1
// 2
// fizz
// 4
// buzz
// fizz
// 7
// 8
// fizz
// buzz
// 11
// fizz
// 13
// 14
// fizzbuzz
// ...
