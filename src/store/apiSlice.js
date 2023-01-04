import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000", credentials: "include" }),
	tagTypes: ["Workouts, Workout"],
	endpoints: (builder) => ({
		getWorkouts: builder.query({
			query: () => "/workouts/",
			providesTags: ["Workouts"],
		}),
		getWorkout: builder.query({
			query: (workoutId) => `/workouts/${workoutId}`,
			providesTags: ["Workout"],
		}),
		addWorkout: builder.mutation({
			query: (workout) => ({
				url: "/workouts",
				method: "POST",
				body: workout,
			}),
			invalidatesTags: ["Workouts"],
		}),
		editWorkout: builder.mutation({
			query: (workout) => ({
				url: `/workouts/${workout.workout_id}`,
				method: "PATCH",
				body: workout,
			}),
			invalidatesTags: ["Workout", "Workouts"],
		}),
		deleteWorkout: builder.mutation({
			query: (workout) => ({
				url: `/workouts/${workout.workout_id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Workouts"],
		}),
		addRoutine: builder.mutation({
			query: (routine) => ({
				url: "/routines",
				method: "POST",
				body: routine,
			}),
			invalidatesTags: ["Workout"],
		}),
		deleteRoutine: builder.mutation({
			query: (routine) => ({
				url: `/routines/${routine.workout_id}/${routine.order_in_workout}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Workout"],
		}),
	}),
});

export const {
	useGetWorkoutsQuery,
	useGetWorkoutQuery,
	useAddWorkoutMutation,
	useEditWorkoutMutation,
	useDeleteWorkoutMutation,
	useAddRoutineMutation,
	useDeleteRoutineMutation,
} = apiSlice;
