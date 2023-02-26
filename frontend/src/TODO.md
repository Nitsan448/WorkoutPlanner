## Frontend

### CSS

1. Sign up, login pages buttons

2. playWorkout page

3. Editing/Viewing workout - Fix image filter, add footer and header

4. New lines in textfields don't become new lines after edit

5. workouts page - buttons color when hovering

6. Handle UI for loading (spinner next to button?) for all api calls

## Backend

## Bugs

1. workout image not deleting sometimes when deleting the workout (in Hagar's computer)

2. Images sometimes not uploading to buckets in other computers/phones

3. Cors policy problem in Hagar's computer

## Other

# Backlog

### Frontend

1. Add remember me field in sign up

2. Changing an exercise name changes the name of other exercises with the same name (make it create a new exercise)

3. Add sound effect when current activity finished

4. Delete workout error modal

5. Add prefetching on hovers, etc.

#### CSS

1. Keep hover area the same size when making something smaller on hover

2. Improve mobile querys

3. Error modal

4. Make create new workout not stretch

### Backend

1. Token cookie not saved between sessions on deployment (seems it is saved but only appears when user goes to all workouts)

2. Remove loop from delete_routine stored procedure (do something similar to update_routines_order).

3. Require auth when user enters a page

4. Add tests

### Bugs

### Other

1. Add option to login as a guest

2. Add social media features

3. Add option to choose from current exercises and routines when creating a new exercise.
   Make it impossible to change an exercise name to an already existing exercise.

4. Switch to cloudfront for accessing images from s3 and make them private

5. Change favicon
