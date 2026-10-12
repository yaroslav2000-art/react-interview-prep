"use strict";
// Write function sum that works like this: sum(a)(b) = a+b.

// Yes, exactly this way, using double parentheses (not a mistype).

// For instance:

// sum(1)(2) = 3
// sum(5)(-1) = 4

// function sum(a) {
//   return function (b) {
//     return a + b;
//   };
// }
// console.log(sum(4));
///////////////////////////////////////////////////////////////////
// let x = 1;

// function func() {
//   console.log(x); // ?

//   let x = 2;
// }

// func();
// The Golden Rule to remember:
// If a variable is declared anywhere inside a function using let or const, that variable is local to the function for its entire duration. It cannot access the outer variable of the same name, even before the declaration line.
// You were right to think "it can take from the outer lexical env"—but only if it doesn't find the variable in the current local lexical environment first!
// (
//     function func() {
//   let x; // Hoisted (declared, but UNITIALIZED)
//   console.log(x); // <-- You are here
//   x = 2; // Initialized here
// }
// )
/////////////////////////////////////////////////////////////////////////
// let arr = [1, 2, 3, 4, 5, 6, 7];
// const inBetween = (a, b) => (el) => el <= b && el >= a;
// const inArray = (arr) => (el) => arr.includes(el);

// console.log(arr.filter(inBetween(3, 6)));
// console.log(arr.filter(inArray([1, 2, 10])));

/////////////////////////////////////////////////////////////////////

//We’ve got an array of objects to sort:

// let users = [
//   { name: "John", age: 20, surname: "Johnson" },
//   { name: "Pete", age: 18, surname: "Peterson" },
//   { name: "Ann", age: 19, surname: "Hathaway" },
// ];

// users.sort((a, b) => (a.name > b.name ? 1 : -1));
// users.sort((a, b) => (a.age > b.age ? 1 : -1));

// const byField = (field) => (a, b) => (a[field] > b[field] ? 1 : -1);

// console.log(users.sort(byField("name")));

/////////////////////////////////////////////////////////////
// function makeArmy() {
//   let shooters = [];

//   let i = 0;
//   while (i < 10) {
//     let j = i;
//     let shooter = function () {
//       console.log(j); // that should show its number
//     };
//     shooters.push(shooter); // and add it to the array
//     i++;
//   }

//   // ...and return the array of shooters
//   return shooters;
// }

// let army = makeArmy();

// // all shooters show 10 instead of their numbers 0, 1, 2, 3...
// army[0](); // 10 from the shooter number 0
// army[1](); // 10 from the shooter number 1
// army[2](); // 10 ...and so on.
