import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL, credentials: "include" }),
	tagTypes: ["Workout"],
	endpoints: (builder) => ({
		getWorkouts: builder.query({
			query: () => "/workouts/",
			providesTags: (result = [], error, arg) => [
				"Workout",
				...result.map(({ workout_id }) => ({ type: "Workout", workout_id })),
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
		updateWorkout: builder.mutation({
			query: (workout) => ({
				url: `/workouts`,
				method: "PATCH",
				body: workout,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Workout", id: arg.workout_id }],
		}),
		deleteWorkout: builder.mutation({
			query: (workout) => ({
				url: `/workouts/${workout.workout_id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Workout"],
		}),
		updateRoutinesOrder: builder.mutation({
			query: (workout) => ({
				url: `/workouts/update_routines_order`,
				method: "POST",
				body: workout,
			}),
			// invalidatesTags: (result, error, arg) => [{ type: "Workout", id: arg.workout_id }],
		}),
		addRoutine: builder.mutation({
			query: (routine) => ({
				url: "/routines",
				method: "POST",
				body: routine,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Workout", id: arg.workout_id }],
		}),
		updateRoutine: builder.mutation({
			query: (routine) => ({
				url: `/routines/`,
				method: "PATCH",
				body: routine,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Workout", id: arg.workout_id }],
		}),
		deleteRoutine: builder.mutation({
			query: (routine) => ({
				url: `/routines/${routine.workout_id}/${routine.order_in_workout}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Workout", id: arg.workout_id }],
		}),
		register: builder.mutation({
			query: (user) => ({ url: "/auth/register", method: "POST", body: user }),
			invalidatesTags: ["Workout"],
		}),
		login: builder.mutation({
			query: (user) => ({ url: "/auth/login", method: "POST", body: user }),
			invalidatesTags: ["Workout"],
		}),
		logout: builder.mutation({
			query: () => ({ url: "/auth/logout", method: "POST" }),
		}),
	}),
});

export const {
	useGetWorkoutsQuery,
	useGetWorkoutQuery,
	useAddWorkoutMutation,
	useUpdateWorkoutMutation,
	useDeleteWorkoutMutation,
	useUpdateRoutinesOrderMutation,
	useAddRoutineMutation,
	useUpdateRoutineMutation,
	useDeleteRoutineMutation,
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
} = apiSlice;
