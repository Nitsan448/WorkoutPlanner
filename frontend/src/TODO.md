## Frontend

Add missing fields: setTime/repetition etc.

Change navigation bar state according to user logged in status.

Drag and drop exercises to change order, add breaks between exercises.

Send images uploaded to backend

Change favicon and title

### CSS

Add/Fix css for sign up, login

Add/Fix for playWorkout pages,

Add queries for mobile use

Include images for each workout in workouts page.

Handle UI for loading (spinner next to button?) and errors (pop up?) for all api calls

## Backend

Create a stored procedure for deleteWorkout instead of looping over all routines (loop over them in the stored procedure)

Fix token security and expiry date

## Bugs

Changing an exercise image sometimes changes the image of a different exercise.

Deleting an exercise in the middle of the workout messes with the workout in order and does not allow adding new exercises after.

can't create new workout if user entered an empty name and then fixed it and saved.

Long description of workout not word wrapping.

## Backlog

Warn user if he tried to leave an unsaved workout that will be deleted.

Require auth when user enters a page

Add option to login as a guest - Create user, delete it if the user leaves without logging out (after warning him)

Add all social media missing fields - public, likes, etc.
