// fetch("https://jsonplaceholder.typicode.com/users/1")
//   .then((response) => response.json()) // Parse the response into JS object
//   .then((user) => {
//     console.log("2. User data received:", user);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// console.log("3. This runs BEFORE the fetch finishes!");

/////////////////CALLBACK HELL///////////////
console.log("Request data...");

// setTimeout(() => {
//   //emulating server request
//   console.log("Preparing data...");
//   const backendData = {
//     server: "aws",
//     port: 2000,
//     status: "working",
//   };

//   setTimeout(() => {
//     backendData.modified = true;
//     console.log("Data received", backendData);
//   }, 2000);
// }, 2000);
/////////^^^^CALLBACK HELL^^^^^///////////////

/////////////PROMISE MININ///////////
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Preparing data...");
    const backendData = {
      server: "aws",
      port: 2000,
      status: "working",
    };
    resolve(backendData);
  }, 2000);
});
p.then((data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.modified = true;
      resolve(data);
    }, 2000);
  });

  //p2.then((clientData) => console.log("Data received", clientData));
})
  .then((clientData) => {
    clientData.fromPromise = true;
    return clientData;
  })
  .then((data) => console.log("Modified", data))
  .catch((err) => console.error("Error: ", err))
  .finally(() => console.log("Finally"));
/////////////PROMISE MININ^^^^^^^///////////

const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
// sleep(2000).then(() => console.log("After 2 seconds"));
// sleep(3000).then(() => console.log("After 3 seconds"));

// Promise.all([sleep(2000), sleep(5000)]).then(() => {
//   console.log("All promises");
// });
// Promise.race([sleep(2000), sleep(5000)]).then(() => {
//   console.log("Race promises");
// });
