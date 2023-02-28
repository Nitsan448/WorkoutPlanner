import { mainApiSlice } from "../mainApiSlice";

const workoutsApi = mainApiSlice.injectEndpoints({
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
			invalidatesTags: (result, error, arg) => [{ type: "Workout", id: arg.workout_id }],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetWorkoutsQuery,
	useGetWorkoutQuery,
	useAddWorkoutMutation,
	useUpdateWorkoutMutation,
	useDeleteWorkoutMutation,
	useUpdateRoutinesOrderMutation,
} = workoutsApi;
