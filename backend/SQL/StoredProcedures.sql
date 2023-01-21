-- Adds the routine, and only adds the exercise if it does not already exist, otherwise references the existing one.
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_routine`(
IN user_id INT,
IN name VARCHAR(255),
IN description TEXT,
IN image LONGBLOB,
IN workout_id INT,
IN sets INT,
IN time_or_repetitions BIT(1),
IN set_time INT,
IN repetitions INT,
IN rest_time INT,
IN break_after_routine INT,
IN order_in_workout INT)
BEGIN
	DECLARE exercise_id INT;
	CALL add_exercise_if_does_not_exist(user_id, name, description, image, exercise_id);
	INSERT INTO routines (routines.workout_id, routines.exercise_id, routines.sets, routines.time_or_repetitions, 
    routines.set_time, routines.repetitions, routines.rest_time, routines.break_after_routine, routines.order_in_workout)
    VALUES (workout_id, exercise_id, sets, time_or_repetitions, set_time, repetitions, rest_time, break_after_routine, order_in_workout);
END

-- Adds the exercise if it does not exist, otherwise returns the existing exercise id
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_exercise_if_does_not_exist`(
IN user_id INT,
IN name VARCHAR(255),
IN description TEXT,
IN image LONGBLOB,
OUT exercise_id INT)
BEGIN
	SELECT exercises.exercise_id FROM exercises WHERE exercises.user_id = user_id AND exercises.name = name INTO exercise_id;
	IF exercise_id IS NULL THEN
	INSERT INTO exercises (exercises.user_id, exercises.name, exercises.description, exercises.image) VALUES (user_id, name, description, image);
    SELECT LAST_INSERT_ID() INTO exercise_id;
    END IF;
END


-- If the user is authorized: Deletes the routine, and only deletes the exercise if there are no other routines that reference it
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_routine`(
IN workout_id INT,
IN order_in_workout INT)
BEGIN
	Declare exercise_id INT;
    SELECT routines.exercise_id FROM routines WHERE routines.workout_id = workout_id
    AND routines.order_in_workout = order_in_workout INTO exercise_id;
    
    DELETE FROM routines WHERE routines.workout_id = workout_id
    AND routines.order_in_workout = order_in_workout;
    CALL delete_exercise_if_in_no_workouts(exercise_id);
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_exercise_if_in_no_workouts`(
IN exercise_id INT
)
BEGIN
    IF (SELECT COUNT(*) FROM routines WHERE routines.exercise_id = exercise_id) = 0 THEN
    DELETE FROM exercises WHERE exercises.exercise_id = exercise_id; END IF;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_routine`(
IN user_id INT,
IN name VARCHAR(255),
IN description TEXT,
IN image LONGBLOB,
IN workout_id INT,
IN sets INT,
IN time_or_repetitions BIT(1),
IN set_time INT,
IN repetitions INT,
IN rest_time INT,
IN break_after_routine INT,
IN order_in_workout INT)
BEGIN
	DECLARE exercise_id INT;
	SELECT routines.exercise_id FROM routines WHERE routines.workout_id = workout_id AND routines.order_in_workout = order_in_workout INTO exercise_id;
    
    UPDATE exercises SET exercises.name=name, exercises.description=description, exercises.image=image
    WHERE exercises.exercise_id=exercise_id AND exercises.user_id=user_id;
    
	UPDATE routines SET routines.workout_id=workout_id, routines.sets=sets,
    routines.time_or_repetitions=time_or_repetitions, routines.set_time=set_time, routines.repetitions=repetitions,
    routines.rest_time=rest_time, routines.break_after_routine=break_after_routine, routines.order_in_workout=order_in_workout
    WHERE routines.workout_id=workout_id AND routines.order_in_workout=order_in_workout;
END


CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_workout`(
IN workout_id INT)
BEGIN
	DECLARE number_of_routines INT;
    DECLARE current_routine INT;
    SELECT COUNT(*) FROM routines INNER JOIN exercises ON routines.exercise_id=exercises.exercise_id 
    WHERE routines.workout_id=workout_id INTO number_of_routines;
    
    SET current_routine = 1;
    delete_routines: LOOP
		IF current_routine>number_of_routines THEN
			LEAVE delete_routines;
		END IF;
        SELECT current_routine;
        call delete_routine(workout_id, current_routine);
        SET current_routine = current_routine + 1;
	END LOOP;
    DELETE FROM workouts WHERE workouts.workout_id = workout_id;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_routines_order`(
IN workout_id INT,
IN old_routine_index INT,
IN new_routine_index INT
)
BEGIN
	DECLARE current_routine_index INT;
    DECLARE direction INT;
    SET current_routine_index = old_routine_index;
    IF (old_routine_index > new_routine_index) THEN
		SET direction = -1;
	ELSE
		SET direction = 1;
	END IF;
    UPDATE routines SET order_in_workout = (-1) 
	WHERE routines.workout_id = workout_id and order_in_workout = old_routine_index;
    
    update_routines_order: LOOP
		SET current_routine_index = current_routine_index + direction;
		IF (current_routine_index>new_routine_index AND direction=1) OR (current_routine_index<new_routine_index AND direction=-1) THEN
			LEAVE update_routines_order;
		END IF;
        UPDATE routines SET order_in_workout = (current_routine_index - direction) 
        WHERE routines.workout_id = workout_id and order_in_workout = current_routine_index;
	END LOOP;
    
	UPDATE routines SET order_in_workout = (new_routine_index) 
	WHERE routines.workout_id = workout_id and order_in_workout = -1;
END