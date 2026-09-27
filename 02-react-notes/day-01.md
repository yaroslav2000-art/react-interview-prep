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
