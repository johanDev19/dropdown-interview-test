###### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.
> PureComponent is exactly the same as Component except that it handles the shouldComponentUpdate method for you. When props or state changes, PureComponent will do a shallow comparison on both props and state. Component on the other hand won't compare current props and state to next out of the box.

###### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
> Context is a global state that can be accessed by any component in the tree. If a component is subscribed to context changes, it will re-render whenever the context value changes. This can be a performance issue if the context value is an object or an array as a shallow comparison will not detect changes to object properties.

###### 3. Describe 3 ways to pass information from a component to its PARENT.
> 1. Pass a callback function to the child component and have the child invoke the callback function with the data to be passed to the parent.
> 2. Use useContext and pass the data to the parent through context.
> 3. Use a state management library like Redux.

###### 4. Give 2 ways to prevent components from re-rendering.
> 1. Use PureComponent instead of Component if you are using class components.
> 2. Use shouldComponentUpdate to compare current props and state to next props and state and return false if they are equal.

###### 5. What is a fragment and why do we need it? Give an example where it might break my app.
> A fragment is a component that can be used to return multiple elements from a component. It is useful when you want to return multiple elements from a component but don't want to wrap them in a div. It might break your app if you are using a fragment as a child of a component that expects a single child.

###### 6. Give 3 examples of the HOC pattern.
> 1. Conditional rendering.
> 2. Prop manipulation.
> 3. Inject additional functionality.

###### 7. What's the difference in handling exceptions in promises, callbacks and async…await?
> Promises and async/await are similar in that they both handle exceptions with try/catch blocks. Callbacks are different in that they require you to pass an error as the first argument to the callback function.

###### 8. How many arguments does setState take and why is it async.
> setState takes two arguments: an object or a function and a callback function. It is async because React batches state changes for performance reasons.

###### 9. List the steps needed to migrate a Class to Function Component.
> 1. Remove the render method.
> 2. Remove the this keyword from props and state
> 3. replace this.setState with useState.
> 4. Remove the constructor.
> 5. Remove the lifecycle methods of the class component and replace them with useEffect.

###### 10. List a few ways styles can be used with components.
> 1. require/import a css file.
> 2. use CSS modules.
> 3. add a styles object to the component.
> 4. use a CSS-in-JS library like styled-components.


###### 11. How to render an HTML string coming from the server.
> Use dangerouslySetInnerHTML.