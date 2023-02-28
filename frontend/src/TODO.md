## Frontend

1. Loading component

2. Add warning messages - when someone leaves an unsaved workout, tries to delete a workout.

3. Clean code

4. Merge unsaved and delete modals into confirmation modal

### CSS

1. Sign up, login pages buttons

2. playWorkout page

3. Editing/Viewing workout - add footer and header

4. Move filter and name bit down in workouts and increase each workout height

## Backend

## Bugs

1. workout image sometimes not deleting from cloud when deleting the workout (in Hagar's computer)

## Other

1. Add an example workout for all new users in the my workouts page.

2. Maybe make a delete workout button in workouts?

3. Add Gif to readme file.

# Backlog

### Frontend

1. Add remember me field in sign up

2. Changing an exercise name changes the name of other exercises with the same name (make it create a new exercise)

3. Add sound effect when current activity finished

4. Add prefetching on hovers, etc.

5. Handle UI for loading (spinner next to button?) for all api calls

#### CSS

1. Keep hover area the same size when making something smaller on hover

2. Improve mobile querys

3. Improve error modal

4. Make workout container in workout page blue with orange border to the right

5. Add animations

6. Make container margin in width and height the same

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
