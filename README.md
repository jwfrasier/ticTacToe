This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<h1>Howdy!</h1> 

This is the Tic Tac Toe project I took on for the Traction Tools team assessment.

The technology used includes
React/React Hooks
Jest
Styled Components
CSS Grid
Flexbox

<h3>My requirements were as follows:</h3>

The user can play a game of tic-tac-toe.
The user should be able to keep track of their high score.
The application should be programmed in React.
The application should be configurable for different levels of difficulty and size of board.
The system does not need to be beautiful, but it should have some styling.
Please use a state management system of your choosing.
Please write two unit tests


So my approach to this was to determine there were a few ways to go.  Given the current timeframe to develop the test, I could go a more simplistic way that wouldn't account for all scalability issues or I could go about making the application scale.

My initial approach was to make a simple working version of tic tac toe in react.  You can see from my earlier commits, this is just pretty standard react and JS filling in a 3x3.  That wasn't too hard, as essentially it's an array of values being rendered as buttons.  Onclick, the value would change and swap between X and O.  

The next step was following how to determine a winner?  This is the first place I understood where I could improve the method I used.  Given that I had gone the route of making only 2 choices of board (3x3 and 4x4), calculating all the necessary steps of what constituted a win and comparing it to the array, I would just have to match the array to the known solutions.  That wasn't too challenging to do but I noticed that all the solutions would have to be hard coded in there, which obviously wouldn't be the best practice especially in terms of scaling.  Using an API or calculations that would determine my current array with correct 3x3 or 4x4 solutions would probably be the better step.

After figuring out how to determine a winner, I needed a way to keep track of the score.  Localstorage would be the easiest way to handle changes in the score, and all I would need to do is set a the score in localStorage once a winner was determined.  The original method I did was running `determineWinner` and also calling it again as a conditional render of the title "The winner is..." .  This caused two problems, upon initial load it would render once and then once it would have a correct winner, it would load one more time and then the winner would have a score of 2, instead of one.  I fixed this by removing the conditional render from checking if the function passed and rather just checking a state variable that would be changed once the correct conditions could be met.  This eliminated the double invoking and allowed me to have the correct score stored in localStorage.  However this wouldn't cause the immediate score on the UI to update, so I refactored the Board with `useReducer` so that I could mimic the actions and features I wanted to add (move,reset,win,difficulty).  The `gameReducer` is where alot of the more complex state logic is held but helped clean up my code quite a bit.

Lastly I wrote test to check that a rematch would work and match the appropriate state, reset would return the original state, and that players couldn't add something to a square that already had a value in it.

This was a fun and more challenging task to practice using more custom hooks and hooks that involve more complex state mananagement.  Imrpovements could be had to calculate the solutions from an outside source taking in just the dimensions of the board and the win conditions, the rendering of the board itself, as this will only render 2 kinds of board and would be bad at scaling up if we wanted a more complex board and adding a small form of an AI instead of playing with two humans.  This could be done in a number of ways but that would definitely make it feel a little more real as a project.  Overall this was alot of fun and something I enjoyed creating. 
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
