import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000", credentials: "include" }),
	tagTypes: ["Workout"],
	endpoints: (builder) => ({
		getWorkouts: builder.query({
			query: () => "/workouts/",
			providesTags: (result = [], error, arg) => [
				"Workout",
				...result.map(({ id }) => ({ type: "Workout", id })),
			],
		}),
		getWorkout: builder.query({
			query: (workoutId) => `/workouts/${workoutId}`,
			providesTags: (result, error, arg) => [{ type: "Workout", id: arg }],
		}),
		addWorkout: builder.mutation({
			query: (workout) => ({
				url: "/workouts",
				method: "POST",
				body: workout,
			}),
			invalidatesTags: ["Workout"],
		}),
		editWorkout: builder.mutation({
			query: (workout) => ({
				url: `/workouts/${workout.workout_id}`,
				method: "PATCH",
				body: workout,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Workout", id: arg.id }],
		}),
		deleteWorkout: builder.mutation({
			query: (workout) => ({
				url: `/workouts/${workout.workout_id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Workout", id: arg.id }],
		}),
		addRoutine: builder.mutation({
			query: (routine) => ({
				url: "/routines",
				method: "POST",
				body: routine,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Workout", id: arg.id }],
		}),
		deleteRoutine: builder.mutation({
			query: (routine) => ({
				url: `/routines/${routine.workout_id}/${routine.order_in_workout}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Workout", id: arg.id }],
		}),
		register: builder.mutation({
			query: (user) => ({ url: "/auth/register", method: "POST", body: user }),
			invalidatesTags: ["Workout"],
		}),
		login: builder.mutation({
			query: (user) => ({ url: "/auth/login", method: "POST", body: user }),
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
	useRegisterMutation,
	useLoginMutation,
} = apiSlice;
