# Workouts-Creator

You can visit the web app here - https://www.workoutscreator.com/

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Overview

A web application where users can easily create highly customizable workouts, edit, and play them.

#### Backend

The backend is a REST API designed in the following way: <br /> 
Models send querys to the database. <br />
Routes parse requests, use the models to interact with the database, and return a response. <br /> 

The database structure is the following:

| users         | workouts       | exercises   |  routines  |
|:-------------:|:--------------:|:-----------:|:----------:|
| user_id       | workout_id     | exercise_id | workout_id
| user_name     | user_id        | user_id     | exercise_id
| password      | name           | name        | order_in_workout
|               | description    | description | sets
|               | image          | image       | time_or_repetitions
|               |                |             | set_time
|               |                |             | repetitions
|               |                |             | rest_time
|               |                |             | break_after_routine

Exercises information are split into two parts, the constant data - data that remains the same whenever the exercise appears <br /> 
And the dynamic data - this data may be different every time the exercise appears. <br /> 
For example, push ups will always have the same image and description, <br />but they may appear in different workouts, once as 3 sets of 14 repetitions, and once as 1 set of 20 repetitions.

The database is structured this wat to avoid data duplication - when the user uses the same exercise 5 times in different workouts, some of it's data (specifically the image) is only saved once.

<!-- TODO: Add a screenshot of the live project.
    1. Link to a 'live demo.'
    2. Describe your overall experience in a couple of sentences.
    3. List a few specific technical things that you learned or improved on.
    4. Share any other tips or guidance for others attempting this or something similar.
 --> 

### Built With

#### Frontend

Javascript 1.5, React 18.2, CSS3.

Main libraries used: <br /> 
react-router-dom 6.4, react-redux 8.0, react-hook-form 7.41, react-beautiful-dnd 13.1

#### Backend

Javascript 1.5, Node.js 16.15, MySQL 8.0.

Main libraries used: <br /> 
express 4.18, aws-sdk 2.1309, multer 1.4, mysql2 2.3

## Features

<!-- TODO: List what specific 'user problems' that this application solves. -->

#### Coming soon

* Allowing users to add previously created exercises to workout, without having to refill all the details.

* Option to login as a guest.

* Social media features: Sharing workouts, workouts feed, favorite workouts from other users, etc.

## Contact

[LinkedIn](https://www.linkedin.com/in/nitsan-caduri/)

nitsan447@gmail.com

## Acknowledgements

Completing the following courses greatly improved my understanding and knowledge of the tools used in this project:

https://www.youtube.com/watch?v=OXGznpKZ_sA&ab_channel=freeCodeCamp.org

https://www.udemy.com/course/nodejs-the-complete-guide/

https://www.udemy.com/course/react-the-complete-guide-incl-redux/
