## Frontend

1. Loading component

2. Pause timer when an exercise uses repetitions
3. playWorkout page -

4. Drag and drop not showing update until refresh

### CSS

1. Sign up, login pages Image

2. playWorkout page - Make Next/Skip

3. Add icons to editing workout footer buttons

4. Move filter and name a bit down in workouts and increase each workout height

## Backend

## Bugs

1. Unsaved exercises modal pops up after deleting exercises

2. Drag and drop

## Other

1. Readme file - Add Gif and how to run section.

2. Add an example workout for all new users in the my workouts page.

### Refactoring

1. Use routine id where it fits.

2. login as a guest code

# Backlog

### Frontend

1. Delete workout button in workouts

2. Add remember me field in sign up

3. Changing an exercise name changes the name of other exercises with the same name (make it create a new exercise)

4. Add sound effect when current activity finished

5. Add prefetching on hovers, etc.

6. Handle UI for loading for all api calls

7. Make it possible to drag and drop exercises when there is an exercises form open.

#### CSS

1. Improve mobile querys

2. Add animations

3. Make container margin in width and height the same

4. Make slider prettier

### Backend

1. Remove loop from delete_routine and delete_workout stored procedures

2. Require auth when user enters a page

3. Add tests

4. Add more validations (workout name and description length, etc.)

5. Add a logging library

6. Change CheckIfRowCanBeManipulated method to a better name and use user token instead of id.

### Bugs

### Other

1. Add social media features

2. Add option to choose from current exercises and routines when creating a new exercise.
   Make it impossible to change an exercise name to an already existing exercise.

3. Switch to cloudfront for accessing images from s3 and make them private

4. Change favicon and description

5. Setup Deploying through git hub for backend
