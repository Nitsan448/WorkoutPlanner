import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL, credentials: "include" }),
	tagTypes: ["Workout"],
	endpoints: () => ({}),
});
