// install dependencies
// chk if runs



// -- BRING IN OUR PROJECT REQUIREMENTS -- //
const express = require("express")
const path = require("path")
const exphbs = require('express-handlebars');
const sequelize = require('sequelize')
const sequelizeCli = require('sequelize-cli')

// -- Requiring our models for syncing -- //
// ================== > 
let db = require("./models");

// -- Requiring our Routes -- //
const api_routes = require("./routes/api_routes");
const about_routes = require("./routes/html_routes");

// -- CREATE AN `EXPRESS` INSTANCE -- //
const app = express();
// -- DEFINE A PORT -- //
const PORT = process.env.PORT || 5000;

// -- PARSE FORM (CLIENT-SIDE) INPUTS -- //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -- TELL EXPRESS WHERE OUR STATIC FILES ARE LOCATED -- //
app.use(express.static("public"));

// ==== ** OPTIONAL ** ===== //
// -- IF YOU WANT TO USE HANDLEBARS TO SERVE UP YOUR HTML FILES, INCLUDE MIDDLEWARE SETUP BELOW -- //

// ^^ DON'T FORGET TO ADD THE /views AND ANY LAYOUT FILES REQUIRED FOR HANDLEBARS TO SERVE UP HTML FILES ^^ //
// ========================= //


// -- ROUTES -- //

// --> STUDENTS: DEFINE ROUTES TO HANDLE WORKOUT AND EXERCISE API CALLS -- //




// ================================== // 
// -- Activity Syntax -> Passing App INSTANCE to Route -- //
require("./routes/html_routes")(app);


// -- Example ROUTES using EXPRESS ROUTER (https://expressjs.com/en/guide/routing.html) -- //

// -- Use express router to register routes as middleware -- //
app.use('/api/activity', api_routes);

// ======= ALTERNATE SYNTAX FOR /about ROUTE USING EXPRESS ROUTER ==== //
// app.use('/about', about_routes);  // <-- uncomment to use, update 


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`App running on port ${PORT}!`);
  });
});


// Here's some additional help for the homework:
// First, here is a good link for more info on setting up associations:
//      https://sequelize.org/v3/docs/associations/
// For this assignment:
// Each workout is a days' worth of activities, so:
//   -> Each workout has multiple activities
//   (try and figure out what type of relationship that is)
// Each activity has 1 exercise, (that's a different type of relationship)
// Each activity also has its own fields for details about how the exercise was done (duration, weight, intensity, etc)
// Exercises are just a table listing all the exercises available for any activity. These can be added to the database yourself and do not need to be managed by the user.
// You only need to create an association when you need sequelize to give you the related data. For example, when you are retrieving Workout data, you want to see the Activities it has. So you create an assciation on the Workout model.  BUT, when you are getting info about an activity, you don't need to know what Workout it is a part of. So you don't need an association for that there.
// Likewise, when you are getting data about an Activity, you DO need to know about the exercise. So there should be an associaton for the Exercise model. But when getting an Exercise, you don't need to know what workouts it's being used in.
// Summary:
//    Workout model
//      Needs an association with Activity model
//   Activity model
//      Needs an association with Exercise model
//   Exercise model
//      Needs no declared associations
//   Here's another example:
//     Workout: Day 1
//       Activity: Cardio work
//         Exercise: Stairmaster
//         Duration: 30 minutes
//       Activity: Weight work
//         Exercise: Bench press
//         Weight: 150
//         Sets: 3,
//         Reps: 10
//     Workout: Day 2
//       Activity: Cardio
//         Exercise: Jogging
//         Duration: 50 minutes
//     Workout: Day 3
//       Activity: Weight work
//         Exercise: Arm curls
//         Weight: 40
//         Sets: 3,
//         Reps: 10
//   Your exercises List might look something like this
//     Stairmaster
//     Jogging
//     Bench Press 
//     Arm Curls
//     etc....