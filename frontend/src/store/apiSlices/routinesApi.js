import { mainApiSlice } from "../mainApiSlice";

const routinesApi = mainApiSlice.injectEndpoints({
	endpoints: (builder) => ({
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
	}),
	overrideExisting: false,
});

export const { useAddRoutineMutation, useUpdateRoutineMutation, useDeleteRoutineMutation } = routinesApi;
