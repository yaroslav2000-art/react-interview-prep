const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const url = "https://jsonplaceholder.typicode.com/posts/1";

function fetchPosts() {
  delay(2000).then(() => {
    fetch(url);
  });
}

async function fetchAsyncTodos() {
  console.log("fetch data");
  try {
    await delay(2000);
    const res = await fetch(url);
    const data = await res.json();
    console.log("Data:", data);
  } catch (e) {
    console.error(e);
  } finally {
  }
}
//fetchAsyncTodos();

console.log("1. Starting fetch...");

fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((res) => res.json())
  .then((user) => console.log("2. User data received:", user.name))
  .catch((e) => console.error("Error:", error));

console.log("3. This runs before the fetch finishes");

async function getUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await test.json();
    console.log("user:", user.name);
  } catch (e) {
    console.error(e);
  }
}
