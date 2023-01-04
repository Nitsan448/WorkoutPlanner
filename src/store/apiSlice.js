import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000", credentials: "include" }),
	tagTypes: ["Workouts"],
	endpoints: (builder) => ({
		getWorkouts: builder.query({
			query: () => "/workouts/",
			providesTags: ["Workouts"],
		}),
		getWorkout: builder.query({
			query: (workoutId) => `/workouts/${workoutId}`,
		}),
		addWorkout: builder.mutation({
			query: (workout) => ({
				url: "/workouts",
				method: "POST",
				body: workout,
			}),
			invalidatesTags: ["Workouts"],
		}),
	}),
});

export const { useGetWorkoutsQuery, useGetWorkoutQuery, useAddWorkoutMutation } = apiSlice;
