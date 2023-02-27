## Frontend

### CSS

1. Sign up, login pages buttons

2. playWorkout page

3. Editing/Viewing workout - add footer and header

4. workouts page - buttons color when hovering

5. Handle UI for loading (spinner next to button?) for all api calls

## Backend

## Bugs

1. workout image not deleting sometimes when deleting the workout (in Hagar's computer)

2. Images sometimes not uploading to buckets in other computers/phones - check if fixed

3. Cors policy problem in Hagar's computer - check if fixed

## Other

1. Clean code

# Backlog

### Frontend

1. Add remember me field in sign up

2. Changing an exercise name changes the name of other exercises with the same name (make it create a new exercise)

3. Add sound effect when current activity finished

4. Add prefetching on hovers, etc.

#### CSS

1. Keep hover area the same size when making something smaller on hover

2. Improve mobile querys

3. Improve error modal

### Backend

1. Token cookie not saved between sessions on deployment (seems it is saved but only appears when user goes to all workouts)

2. Remove loop from delete_routine stored procedure (do something similar to update_routines_order).

3. Require auth when user enters a page

4. Add tests

5. Add more validations (workout name and description length, etc.)

### Bugs

### Other

1. Add option to login as a guest

2. Add social media features

3. Add option to choose from current exercises and routines when creating a new exercise.
   Make it impossible to change an exercise name to an already existing exercise.

4. Switch to cloudfront for accessing images from s3 and make them private

5. Change favicon
