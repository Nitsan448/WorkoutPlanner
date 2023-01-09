CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password CHAR(255) NOT NULL,
    PRIMARY KEY(id),
    UNIQUE (id),
	UNIQUE (email)
);

CREATE TABLE workouts (
	id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_public BIT DEFAULT 0 NOT NULL,
    likes int DEFAULT 0 NOT NULL,
    image LONGBLOB,
    PRIMARY KEY(id),
    UNIQUE (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE exercises (
	id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image LONGBLOB,
    PRIMARY KEY(id),
    UNIQUE (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE routines (
    workout_id int NOT NULL,
    exercise_id int NOT NULL,
    sets int NOT NULL,
    time_or_repetitions BIT DEFAULT 0,
    set_time int,
    repetitions int,
    rest_time int NOT NULL DEFAULT 0,
    break_after_routine int DEFAULT NULL,
    order_in_workout int NOT NULL,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id),
    FOREIGN KEY (workout_id) REFERENCES workouts(id)
	CONSTRAINT uc_workout_order UNIQUE(workout_id, order_in_workout)
);