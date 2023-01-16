Create a stored procedure for deleteWorkout instead of looping over all routines (loop over them in the stored procedure)

Fix token security and expiry date

Add missing fields: setTime/repetition etc.

Change navigation bar state according to user logged in status.

Drag and drop exercises to change order, add breaks between exercises.

####CSS:
Add and fix css.
Handle UI for loading (spinner next to button?) and errors (pop up?) for all api calls
**Organization:**
Use comments for headers.
Sort properties alphabetically.(Select all properties, ctrl shift p>sort>sort lines ascending)
Follow Block Elements Modifiers (Remember class\_\_element...)
Fix Reset:

Change favicon and title

## Backlog:

Warn user if he tried to leave an unsaved workout that will be deleted.

Require auth when user enters a page

Add option to login as a guest - Create user, delete it if the user leaves without logging out (after warning him)

Add all social media missing fields - public, likes, etc.

In exercise form css:
make each grid element have a grid
\_\_item class that contains it's border
try to center content by making element in the grid use
display: grid
place-content: center
