## Frontend

1. Fix setTime/repetition field

2. When page is refereshed navigation header changes (make default logged in, and changed logged in to false when starting from register or login pages)

### CSS

1. Sign up, login pages

2. playWorkout page

3. Add queries for mobile use

4. workouts page

5. Navigation bar

6. Handle UI for loading (spinner next to button?) and errors (pop up?) for all api calls

## Backend

## Bugs

1. workout image not deleting sometimes when deleting the workout (in Hagar's computer)

2. Images sometimes not uploading to buckets in other computers/phones

3. Cors policy problem in Hagar's computer

## Other

1. Add Readme to git

# Backlog

1. Token cookie not saved between sessions on deployment (seems it is saved but only appears when user goes to all workouts)

2. Add remember me field in sign up

3. Warn user if he tried to leave an unsaved workout that will be deleted.

4. Changing an exercise name changes the name of other exercises with the same name (make it create a new exercise)

5. Remove loop from delete_routine stored procedure (do something similar to update_routines_order).

6. Require auth when user enters a page

7. Add option to login as a guest - Create user, delete it if the user leaves without logging out (after warning him)

8. Add social media features

9. Add option to choose from current exercises and routines when creating a new exercise.
   Make it impossible to change an exercise name to an already existing exercise.

10. Add tests

11. Fix snippets not working

12. Switch to cloudfront for accessing images from s3 and make them private

13. Change favicon
