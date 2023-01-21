## Frontend

Add missing fields: setTime/repetition etc.

Change navigation bar state according to user logged in status.

Add breaks between exercises when playing a workout. (use enum? inSet, inRest, inBreak)

Send images uploaded to backend

Change favicon and title

### CSS

Add/Fix css for sign up, login

Add/Fix for playWorkout pages,

Add queries for mobile use

Include images for each workout in workouts page.

Handle UI for loading (spinner next to button?) and errors (pop up?) for all api calls

## Backend

Fix token security and expiry date

Make it impossible to change an exercise name to an already existing exercise.

## Bugs

Changing an exercise image sometimes changes the image of a different exercise.

## Backlog

Warn user if he tried to leave an unsaved workout that will be deleted.

Changing an exercise name changes the name of other exercises with the same name (make it create a new exercise).

Remove loop from delete_routine stored procedure (do something similar to update_routines_order).

Require auth when user enters a page

Add option to login as a guest - Create user, delete it if the user leaves without logging out (after warning him)

Add all social media missing fields - public, likes, etc.

Make drag and drop work on mobile.
