import { mainApiSlice } from "../mainApiSlice";

const authApi = mainApiSlice.injectEndpoints({
	endpoints: (builder) => ({
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
	overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;
