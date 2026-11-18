1. Components & JSX
   "What exactly is a React component, and how is JSX different from regular HTML? Why do we use className instead of class?"

   React component is JS function(starts with capital letter) which returns a jsx: markup with logic.
   JSX has js embedded into itself: you are able to include logic into html markup
   ClassName is used because class is a reserved word

   Interview Polish: Add one small detail. In an interview, mention that JSX is syntactic sugar. Under the hood, Babel compiles <h1>Hello</h1> into React.createElement('h1', null, 'Hello'). Also, mention that a component must return a single parent element (or a Fragment <>...</>).

2. Props
   "What are props in React? Why are they read-only, and what does that mean for how data flows through an application?"
   Props - data that is passed from parent components to child components
   They are read only because they are coming from parent component (It's like another scope and changing data from another scope is restricted).
   Data flows through application litterely means how data (props) is passed through parent -> child components

   Key phrase for interviews:

Interview Polish: The term interviewers want to hear is "Unidirectional Data Flow." Also, the real reason props are read-only is that React treats components like pure functions. A component should return the same UI for the same props. If a child needs to change data, the parent passes down a callback function (like onClick) to trigger the change in the parent's state.

Why React cares: React can call your component function multiple times during a render (e.g., in Strict Mode, or when re-rendering). If your component mutates external state, you'll get unpredictable results. This is why you should never mutate props, never mutate state directly, and never put side effects directly in the render body — use useEffect for that.

"In React, data flows down via props, and events flow up via callbacks. This is unidirectional data flow.
"Interview phrasing:

"A pure function has no side effects and returns the same output for the same input. React components should be pure because React may re-run them at any time. Side effects belong in useEffect, not in the render body."

3. Conditional Rendering
   "If I want to show a 'Loading...' message while waiting for data, or a login button if a user is logged out, how do I do that in React? What syntax would you use?"
   Conditional rendering: while you can always use if..else statement, react offers you shorter way: ? : - ternary operator and && operator.
   as for showing loader you can always use state which might have several values: when the data is not there yet but it's being fetched the state can be set to 'fetching' and at that very moment {status === 'fetching' && <Loader>}

4. Rendering Lists
   "When rendering an array of items using .map(), React asks for a key prop. What is the key for, and what happens if you forget to include it?"
   Key prop is used to keep track of elements between renders, if it's not set: first react will warn or this will be some kind of an error. I won't be able to tell you exactly but there will be something wrong with rendering staff

   Feedback: ⚠️ Needs Improvement. You are on the right track with "keep track of elements," but "something wrong with rendering stuff" is too vague. This is a guaranteed interview question, so you need a precise answer.

The Correct Answer: React uses the key to identify which items in a list have changed, been added, or been removed. If you don't provide a key, React defaults to using the array index. If you sort, filter, or reorder the list, the indexes change, and React gets confused. It may reuse the wrong DOM nodes, leading to UI bugs (like typing in one input box and having it appear in another) and performance issues.

Interview Polish: "You should use a unique ID from your data (like a database ID) as the key, not the array index."

"React uses keys as a stable identity for elements in a list. During reconciliation, React matches elements between renders by key. If keys match, React reuses the DOM node and its state. If keys change, React destroys the old node and creates a new one. Never use the array index as a key if the list can be reordered, filtered, or sorted — use a stable unique ID from your data."

5. State and Events
   "In the Quick Start, you learned about useState. If I click a button that calls the setCount function, what happens under the hood? How does the screen update?"

   setCount is part of the useState hook. We can get a hold of it via array destructuring when we initialize state. Once triggered, this function changes the state and trigger a rerender, but only of the element (and his children) where state 'lives'

Interview Polish: You mentioned the "what," but the interviewer asked for the "under the hood" (the "how"). The missing piece is React Batching and Reconciliation.
Here is the pro answer: "When setCount is called, React schedules an update. It batches multiple state updates together for performance. It then re-renders the component where the state lives. It creates a new Virtual DOM, compares it to the previous one (this is called diffing or reconciliation), and updates only the parts of the real DOM that actually changed."

State changes in <App>
↓
React re-runs <App>, <Child>, <GrandChild> (component functions called)
↓
New Virtual DOM tree created for the whole subtree
↓
React diffs new Virtual DOM vs old Virtual DOM
↓
Real DOM updates only where differences exist

"When state updates, React re-renders the component where the state lives and all its children. It builds a new Virtual DOM subtree, compares it to the previous one (reconciliation), and updates only the real DOM nodes that actually changed. This is why React is fast even though it re-runs component functions."

## Unidirectional Data Flow

- Props flow parent → child. Events flow child → parent via callbacks.
- Child cannot mutate parent state directly.

## Pure Functions

- Same input → same output. No side effects.
- React components should be pure (no mutation, no side effects in render body).

## Key Prop

- React uses keys as stable identity during reconciliation.
- If key matches → reuse node. If key changes → destroy and recreate.
- Never use array index as key if the list can reorder.

## Batching & Re-render

- setState schedules an update; React batches multiple updates in one event handler.
- Re-renders the component where state lives + all its children.
- Builds new Virtual DOM subtree, diffs against old, updates only changed DOM nodes.

(One more subtle point
You might wonder: "What if two different data items have the same key?" React will warn you and behave unpredictably. Keys must be unique within the list. Not globally unique — just within the sibling array. But since keys usually come from database IDs, they're globally unique anyway.

Summary
React re-renders by creating new JSX elements. It needs to know which new element maps to which old component instance.

Without keys, React uses position. Bad for reordering.

With keys, React uses identity. Correct, efficient, preserves state.

The sentence from the docs just means: "Keys are how you tell React 'this JSX element is the same item as the one with this key from last time.'")

19.10 - # React Patterns — Tic-Tac-Toe Insights

## 1. Lifting State Up (The most important pattern)

**The Problem:** Initially, each `<Square />` could hold its own state (`const [value, setValue] = useState(null)`).
**Why we didn't:** The `<Board />` component needs to know the value of _all 9 squares_ to calculate a winner. If each Square kept its own state, the Board would have no idea what's happening.
**The Solution:** We moved the `squares` state up to the `<Board />` component and passed the values down as props.
**The Rule:**

> If two or more components need to share state, move that state up to their closest common parent.

## 2. Unidirectional Data Flow (Props Down, Events Up)

Since the state lives in `Board`, how does a `Square` update it when clicked?

1. `Board` defines a function: `handleClick(i)`.
2. `Board` passes it down as a prop: `<Square onSquareClick={() => handleClick(i)} />`
3. `Square` calls the prop when clicked: `<button onClick={onSquareClick}>`
   **The Rule:** Child components never mutate parent state directly. They call functions passed down from the parent.

## 3. Immutability (Why we use `.slice()`)

**The Code:**

```javascript
const nextSquares = squares.slice();
nextSquares[i] = "X";
setSquares(nextSquares);
```

4. Updating State with Previous State
   The Code:

javascript
setHistory((prevHistory) => [...prevHistory, nextSquares]);
Why pass a function? State updates in React are asynchronous and batched. If you write setHistory([...history, nextSquares]), history might be a stale value from the current render.
The Rule:

If your new state depends on the previous state, always use the updater function: setState(prev => newValue).

5. Time Travel (Managing history)
   The Pattern: Instead of storing a single game state, we store an array of states (a timeline).

javascript
const [history, setHistory] = useState([Array(9).fill(null)]);
history is an array of arrays. Each inner array is a snapshot of the board.

currentMove is just an index pointing to the active snapshot in history.
The Insight: Storing state as a sequence of immutable snapshots makes "Undo" and "Time Travel" incredibly easy. 6. Pure Helpers (e.g., calculateWinner)
The Code: We wrote a standalone function calculateWinner(squares) outside the component.
Why? It doesn't need React. It takes an array, runs logic, and returns a result. Keeping it outside the component makes it easy to test and keeps the component focused on rendering.
The Rule:

Extract complex logic (like win conditions) into pure helper functions.

7. Keys in Lists
   The Code:

javascript
{squares.map((square, i) => (
<Square key={i} value={square} />
))}
Insight: We used the array index i here because the list is static (always 9 squares, never reordered).
The Rule:

In a static list, using the index as a key is fine. But if the list can be reordered, filtered, or added to, use a unique ID from your data. Never use index keys for dynamic lists.

⚠️ Interview Gotchas from this tutorial
"Why don't you put the state in the Square?" (Answer: Lifting state up so the Board can calculate the winner).

"Why did you use squares.slice()?" (Answer: Immutability. React uses reference equality to trigger re-renders).

"What happens if you mutate state directly?" (Answer: React won't re-render because the reference didn't change).

"Why use prevHistory?" (Answer: State updates are async; passing an updater function guarantees you are updating the most recent state).

25.10:
Thinking in React:

# React Architecture: Thinking in React

## The Core Philosophy

React is not just about writing JSX; it's a mental model for building UIs. The core philosophy is the **Single Responsibility Principle**: a component should ideally only do one thing. If it grows, it should be broken down into smaller subcomponents.

## The 5-Step Mental Model

### Step 1: Break the UI into a Component Hierarchy

- Draw boxes around every component (and subcomponent) in the mockup.
- **How to decide:** Look at the JSON data model. If a part of the UI maps directly to a piece of data, it's a component. If it's a container for other components, it's a component.
- **Result:** You have a tree structure (e.g., `App -> Header`, `App -> Main -> SearchBar`, `Main -> Table -> Row`).

### Step 2: Build a Static Version in React

- Build the UI with **no interactivity** (no state, no event handlers).
- Pass data down using **Props**.
- **The Rule:** Don't use state at all in this step. It's easier to build the UI top-down or bottom-up without worrying about state yet.

### Step 3: Find the Minimal but Complete Representation of UI State

This is the most critical interview question. **What data actually needs to be state?**
To figure this out, ask these **3 questions** for every piece of data:

1.  **Does it remain unchanged over time?** If yes, it's not state.
2.  **Is it passed in from a parent via props?** If yes, it's not state.
3.  **Can you compute it based on other state or props?** If yes, **it is NOT state.** (This is a huge one).

### Step 4: Identify Where Your State Should Live

React uses **Unidirectional Data Flow** (State Colocation). To find the "owner" of a piece of state, follow these steps:

1.  Identify _every_ component that renders something based on that state.
2.  Find their **closest common parent** component.
3.  The state should live in that common parent (or higher up).
4.  If you can't find a common parent, create a new component higher up the tree to hold the state.

### Step 5: Add Inverse Data Flow

- If the state lives in a parent, but a child component needs to change it (e.g., typing in an input), the parent must pass down a **callback function** as a prop.
- The child calls the function, which updates the state in the parent, which triggers a re-render.

---

## 💡 Case Study Example (The Searchable Product Table)

Imagine you are building an app that filters a list of products based on a search bar, and also allows a checkbox to show only "in stock" items.

**What is State?**

- Original list of products? ❌ (Passed in as props).
- Search text? ✅ (Changes via user input, can't be computed).
- Checkbox status (show in-stock)? ✅ (Changes via user input, can't be computed).
- Filtered list of products? ❌ (**Can be computed** using the original list + search text + checkbox).

**Where does the state live?**

- `SearchBar` renders the text.
- `ProductTable` renders the filtered list.
- Their closest common parent is the `App` (or `FilterableProductTable`). Therefore, `searchText` and `isInStockOnly` must live in the parent.

---

## 🎯 Interview Triggers & Key Phrases

If an interviewer asks: _"How would you architect this UI?"_ or _"Where should this state live?"_ use these phrases:

- **"I would start by breaking the UI into a component hierarchy based on the Single Responsibility Principle."**
- **"I need to determine the minimal state. This data is passed from the parent, so it shouldn't be state."**
- **"This list is derived data. Instead of putting it in state, I can compute it on the fly using `.filter()`. This avoids synchronization bugs."**
- **"Since both components need this data, I will lift the state up to their closest common parent and pass callbacks down to handle the inverse data flow."**

---

## 📝 Flashcards to Add:

1. **Front:** What are the 3 questions to determine if data is state?
   **Back:** 1. Does it change over time? 2. Is it passed from a parent? 3. Can it be computed from other state/props?
2. **Front:** If two sibling components need to share state, where should the state live?
   **Back:** In their closest common parent. (Lifting State Up).
3. **Front:** Why shouldn't a filtered list be stored in `useState`?
   **Back:** Because it is derived data. It can be computed on the fly using `Array.filter()` based on existing state (like search text). Storing it in state causes sync issues.

   01.11:

4. **Components & JSX**
   - **Definition:** Components are the building blocks of React; JSX is the syntax extension that compiles to `React.createElement()`.
   - **Single Root Rule:** A component must return a single parent element.
     - **Solution:** Use Fragments (`<>...</>`) to group elements without adding extra nodes to the DOM.
   - **Purity:** Components must act as pure functions.
     - **Rule:** Same props must return the same JSX. Never mutate external variables during render.

5. **Props**
   - **Definition:** Read-only data passed from parent to child.
   - **Unidirectional Flow:** Data strictly flows down the component tree.
   - **Updating Props:** A child cannot mutate its own props.
     - **Solution:** The parent must pass down a **callback function** that the child calls to request a state change.
   - **Spread Syntax:** `<Component {...object} />` passes all object keys as individual props.

6. **Conditional Rendering**
   - **Methods:** Use ternary operators (`condition ? <A /> : <B />`) or logical AND (`condition && <A />`).
   - **The `0` Trap:** `items.length && <List />` will literally render the number `0` on the screen if the array is empty.
     - **Fix:** Force a boolean check: `items.length > 0 && <List />`.
   - **Rendering Nothing:** Return `null` from a component to render nothing at all without breaking the DOM.

7. **Lists & The `key` Prop**
   - **Purpose:** Keys give elements a **stable identity** across renders so React knows which component instance maps to which data.
   - **Reconciliation (How React works):**
     - **Same key:** React reuses the existing component instance and DOM node (preserves state).
     - **New key:** React creates a brand new component instance.
     - **Missing key:** React destroys the old component instance.
   - **The `index` Anti-Pattern:**
     - **Why it's bad:** If a list is reordered, filtered, or deleted from, the indices shift. React will misidentify items.
     - **The Bug:** React reuses the wrong DOM nodes, causing local state (like input text or focus) to jump to the wrong item.
   - **The Rule:** Always use a unique ID from the data (e.g., `item.id`). Only use `index` if the list is 100% static (never changes order or size).

8. **Props vs. State**
   - **Props:** External, read-only, passed from the parent component.
   - **State:** Internal, memory-based, controlled by the component itself (via `useState`).

     18.11: Managing state

# React: Reacting to Input with State

## 1. Declarative vs. Imperative UI

This is the core philosophy of React.

- **Imperative (Vanilla JS):** You tell the computer _how_ to do something step-by-step (e.g., "Select this element, add a class, remove this text, disable this button").
- **Declarative (React):** You tell React _what_ the UI should look like based on the current state (e.g., "If `isLoading` is true, show the spinner"). React figures out how to update the DOM to match that state.

## 2. The 5-Step Mental Model for Building UI

When building a complex interactive component, don't start by writing code. Follow these steps:

1. **Identify all visual states:** (e.g., Empty, Typing, Submitting, Success, Error).
2. **Determine what triggers state changes:** (e.g., typing in an input, clicking a button, a network response).
3. **Represent the state in memory:** Use `useState`.
4. **Remove non-essential state:** (See Principle of Minimal State).
5. **Connect the event handlers:** Write the functions that update the state.

## 3. Controlled Components (Forms)

This is the most important practical takeaway. In HTML, form elements (like `<input>`) maintain their own internal state. In React, we want React state to be the **"single source of truth"**.

- We call this a **Controlled Component** because React _controls_ the value of the input.
- We force the input to display the React state using the `value` prop.
- We update the state using the `onChange` event.

### The Pattern:

```jsx
const [text, setText] = useState("");

<input value={text} onChange={(e) => setText(e.target.value)} />;
```

# React: Choosing the State Structure

## The Core Philosophy

Structuring state well can mean the difference between a component that is a joy to modify and one that is a buggy nightmare. You should always aim for state that is **minimal, non-redundant, and flat**.

## The 5 Principles of State Structure

### 1. Group Related State

If two or more state variables always change together, combine them into a single state object.

- **Bad:** `const [x, setX] = useState(0);` and `const [y, setY] = useState(0);`
- **Good:** `const [position, setPosition] = useState({ x: 0, y: 0 });`
- **Why:** It prevents you from accidentally updating one without the other, which could lead to a re-render with mismatched data.

### 2. Avoid Contradictions in State

State should never be able to represent an "impossible" scenario.

- **Bad:** Using multiple booleans that could conflict: `isTyping`, `isSubmitting`, `isSuccess`, `isError`. (What if `isTyping` and `isSuccess` are both true?)
- **Good:** Use a single string state (a "status"): `const [status, setStatus] = useState('typing');` (where status can be `'typing' | 'submitting' | 'success' | 'error'`).

### 3. Avoid Redundant State

**If you can calculate it from existing props or state, do NOT put it in state.**

- **Bad:** `const [firstName, setFirstName] = useState('');` and `const [fullName, setFullName] = useState('');`
- **Good:** `const fullName = firstName + ' ' + lastName;` (calculated during render).
- **Interview Trigger:** _"Why didn't you put the filtered list in state?"_
- **Answer:** "It's derived state. I can compute it on the fly using `.filter()`. Putting it in state means I have to manually sync it every time the original list or the filter changes, which introduces bugs."

### 4. Avoid Duplication in State

If the same data is stored in multiple places, it's easy to forget to update one of them.

- **Bad:** Storing an array of `items` AND a separate `selectedItem` object. (If you edit the item in the array, the `selectedItem` object won't update).
- **Good:** Store only the `selectedId`. To get the item, find it in the array: `const selectedItem = items.find(i => i.id === selectedId);`

### 5. Avoid Deeply Nested State

Deeply nested objects are painful to update in React because you have to copy every level of the object to maintain immutability.

- **Bad:** `user.profile.address.city` (Updating this requires copying `user`, `profile`, and `address`).
- **Good:** Flatten your state. Keep `user`, `profile`, and `address` as separate state objects if they are updated independently.
- **If you MUST nest:** Use the spread operator carefully: `setUser({ ...user, profile: { ...user.profile, address: { ...user.profile.address, city: 'New York' } } })` (This is why we avoid nesting!).

## 🚨 Gotchas & Interview Triggers

- **Trigger:** _"What is derived state?"_
  - **Answer:** "Derived state is any data that can be computed from existing state or props. We should not store it in `useState` because it can get out of sync. We calculate it during the render phase instead."
- **Trigger:** _"How do you update a nested property in React state?"_
  - **Answer:** "You must use the spread operator to create a new copy at every level of the nesting. This is why it's recommended to keep state as flat as possible."

## 📝 Flashcards to Add:

1. **Front:** If you have a form with a `firstName` and `lastName` state, should you create a `fullName` state?
   **Back:** No. `fullName` is redundant/derived state. Compute it during render (`firstName + ' ' + lastName`).

2. **Front:** Why are multiple boolean flags (like `isLoading`, `isError`, `isSuccess`) considered a bad state structure?
   **Back:** Because they can create contradictory states (e.g., `isLoading` and `isSuccess` being true at the same time). Use a single `status` string instead.

3. **Front:** How should you structure state to avoid deeply nested objects?
   **Back:** Flatten the state. Break deeply nested objects into separate, independent state variables.

# React: Sharing State Between Components

## The Core Philosophy: Single Source of Truth

Sometimes, two components need to reflect the same changing data.
Instead of giving each component its own state (which can get out of sync), you should move the state to their **closest common parent**. This parent becomes the **"Single Source of Truth."**

This is called **Lifting State Up**.

## The 3 Steps to Lift State Up

If `ChildA` and `ChildB` need to share state, follow these steps:

1. **Remove state from the children:** Delete `useState` from the child components.
2. **Pass state down from the parent:** Move the `useState` to the parent and pass the value down as a prop to both children.
3. **Pass event handlers down:** The parent should define the function that updates the state, and pass that function down as a prop to the children.

## The Pattern (Props Down, Events Up)

This is the physical implementation of **Unidirectional Data Flow**.

```jsx
function Parent() {
  // 1. State lives in the parent
  const [value, setValue] = useState("");

  return (
    <div>
      {/* 2. Pass the state value DOWN as a prop */}
      <ChildA value={value} />

      {/* 3. Pass the setter function DOWN as a prop */}
      <ChildB onValueChange={setValue} />
    </div>
  );
}

function ChildA({ value }) {
  return <p>Current value: {value}</p>; // Reads state
}

function ChildB({ onValueChange }) {
  return (
    <input
      value={value}
      // Calls the parent's function to update state
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
}
```
