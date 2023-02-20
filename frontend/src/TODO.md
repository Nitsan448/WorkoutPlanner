## Frontend

1. Delete Image.js and change ImageInput.js name to Image.js.

### CSS

1. Sign up, login pages

2. playWorkout page

3. Editing/Viewing workout - Fix image filter

4. Add queries for mobile use

5. workouts page - buttons color when hovering

6. Handle UI for loading (spinner next to button?) and errors (pop up?) for all api calls

## Backend

## Bugs

1. workout image not deleting sometimes when deleting the workout (in Hagar's computer)

2. Images sometimes not uploading to buckets in other computers/phones

3. Cors policy problem in Hagar's computer

## Other

1. Add Readme to git

# Backlog

### Frontend

1. Add remember me field in sign up

2. Changing an exercise name changes the name of other exercises with the same name (make it create a new exercise)

3. Add sound effect when current activity finished

#### CSS

1. Different background and navigation bar according to page

2. Keep hover area the same size when making something smaller on hover

3. New lines in textfields don't become new lines after edit

### Backend

1. Token cookie not saved between sessions on deployment (seems it is saved but only appears when user goes to all workouts)

2. Remove loop from delete_routine stored procedure (do something similar to update_routines_order).

3. Require auth when user enters a page

4. Add tests

### Bugs

### Other

1. Add option to login as a guest - Create user, delete it if the user leaves without logging out (after warning him)

2. Add social media features

3. Add option to choose from current exercises and routines when creating a new exercise.
   Make it impossible to change an exercise name to an already existing exercise.

4. Switch to cloudfront for accessing images from s3 and make them private

5. Change favicon

6. Find ways to reduce expanses in aws
