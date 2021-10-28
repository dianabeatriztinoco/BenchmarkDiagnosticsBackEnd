# Backend
## Running the Project
- clone this section to your machine by running `git clone
  https://github.com/appacademy/assessment-for-week-EXIT-version-a-backend.git`
  ### Setup
- run `npm install` to install dependencies before starting this section.

### Dev Server
- To run the dev server for this section:
  - use `npm start` to run with node
  - use `npm run dev` to run with nodemon for hot updates to the server
- The project will run on [localhost:3000](http://localhost:3000/)

### Tests
- To run tests for this section:
  - from the root use `npm test`


## Instructions

For this section you will demonstrate your knowledge of servers and routing by
completing a few simple CRUD routes.

The framework for this app has been provided for you. You will not need to save
anything to a database.

- All code should be written in `./index.js`
- Up at the top of the file you'll see some helper methods that have been
  written for you to help you pass the challenge. You can familiarize the
  methods in `./cats.js`
- In order to pass all tests, you must implement the following routes:

- Root route "/"
  - GET to root should respond with a 200 status
  - Root should respond with text of "howdy!"
- Cat Index "/cats"
  - Accessing cat index should respond with a 200 status
  - Accessing cat index should return an object with four cats
- Cat Show "/cats/catId"
  - Attempting to access an invalid catId should yield a 400 status
  - Attempting to access an invalid catId should yield an error message saying
    "No such Kitty!"
  - Accessing a cat with a valid ID should return a 200 status
  - Accessing a cat with the ID of 1 should return Sennacy
- Cat Creation "/cats"
  - Creating a cat with all the required fields should yield a 200 status
  - Creating a cat with missing required fields should yield a 400 status
  - Creating a cat with color string longer than 10 should yield a 400 status
  - Creating a cat who eats unexpected food should yield a 400 status
- Cat Deletion "/cats/catId"
  - Attempting to delete an invalid catId should yield a 400 status
  - Attempting to delete an invalid catId should yield an error message saying
    "No such Kitty!"
  - Deleting a cat with a valid ID should return a 200 status