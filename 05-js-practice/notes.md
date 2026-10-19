# JavaScript Asynchrony & The Event Loop

## 1. The Core Problem: JavaScript is Single-Threaded

JavaScript can only do **one thing at a time**. It has one Call Stack.
If you run a task that takes 3 seconds (like a network request or a `while` loop), the whole browser freezes. You can't click buttons, scroll, or type. This is called "blocking."

**The Solution:** JavaScript uses an **asynchronous** model. It offloads slow tasks to the browser (or Node.js) and continues running the rest of the code.

## 2. The Cast of Characters

To understand asynchrony, you need to know the 4 main parts:

1. **Call Stack:** Where JavaScript runs your synchronous code. (LIFO - Last In, First Out).
2. **Web APIs (or Node APIs):** The browser features _outside_ the JS engine (like `setTimeout`, `fetch`, DOM events). They handle background work.
3. **Task Queue (Macrotask Queue):** Where callbacks from Web APIs wait (e.g., `setTimeout` callbacks, click events).
4. **Microtask Queue:** A VIP queue for Promises (`.then`, `async/await`). It has **strict priority** over the Task Queue.

## 3. The Event Loop (How it works)

The Event Loop is a constantly running process that does one simple thing:

> **"Is the Call Stack empty? If yes, take the first thing from the queue and put it on the stack."**

**The Exact Order of Operations:**

1. Run all synchronous code (until the Call Stack is empty).
2. Check the **Microtask Queue** (Promises). Run _everything_ in it until it's empty.
3. Check the **Task Queue** (setTimeout, events). Run _one_ task.
4. Render the UI (if needed).
5. Repeat.

## 4. Promises & Microtasks (The VIP Lane)

Promises are not magic; they are just an API that lets you hook into the Microtask Queue.

- When a Promise resolves, its `.then()` callback is pushed to the **Microtask Queue**.
- The Microtask Queue is processed _before_ the browser renders or handles `setTimeout`.

**The Classic Interview Question:**

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1, 4, 3, 2
```
