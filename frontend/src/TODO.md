## Frontend

1. Change navigation bar state according to user logged in status

2. Change favicon and title

3. Fix setTime/repetition field

### CSS

1. Sign up, login pages

2. playWorkout page

3. Add queries for mobile use

4. workouts page

5. Navigation bar

6. Handle UI for loading (spinner next to button?) and errors (pop up?) for all api calls

## Backend

1. Playing a workout when it has no exercises gives blank page

## Bugs

1. workout image not deleting sometimes when deleting the workout (in Hagar's computer)

# Backlog

1. Token cookie not saved between sessions on deployment (seems it is saved but only appears when user goes to all workouts)

2. Add remember me field in sign up

3. Warn user if he tried to leave an unsaved workout that will be deleted.

4. Changing an exercise name changes the name of other exercises with the same name (make it create a new exercise)

5. Remove loop from delete_routine stored procedure (do something similar to update_routines_order).

6. Require auth when user enters a page

7. Add option to login as a guest - Create user, delete it if the user leaves without logging out (after warning him)

8. Add social media features

9. Make drag and drop work on mobile

10. Add option to choose from current exercises and routines when creating a new exercise.
    Make it impossible to change an exercise name to an already existing exercise.

11. Add tests

12. Fix snippets not working

13. Switch to cloudfront for accessing images from s3 and make them private
