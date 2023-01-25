## Frontend

1. Change navigation bar state according to user logged in status.

2. Send images uploaded to server

3. Add remember me field in sign up

### CSS

1. Add/Fix css for sign up, login

2. Add/Fix for playWorkout pages,

3. Add queries for mobile use

4. Include images for each workout in workouts page.

5. Handle UI for loading (spinner next to button?) and errors (pop up?) for all api calls

## Backend

1. Fix token security and expiry date

## Bugs

1. Changing an exercise image sometimes changes the image of a different exercise.

# Backlog

Add missing fields: setTime/repetition etc.

Warn user if he tried to leave an unsaved workout that will be deleted.

Changing an exercise name changes the name of other exercises with the same name (make it create a new exercise).

Remove loop from delete_routine stored procedure (do something similar to update_routines_order).

Require auth when user enters a page

Add option to login as a guest - Create user, delete it if the user leaves without logging out (after warning him)

Add all social media missing fields - public, likes, etc.

Make drag and drop work on mobile.

Add option to choose from current exercises and routines when creating a new exercise.
Make it impossible to change an exercise name to an already existing exercise.

Change favicon and title

Add tests
