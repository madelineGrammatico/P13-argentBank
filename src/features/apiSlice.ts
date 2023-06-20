import { createApi, fetchBaseQuery } from '@reduxjs/toolkit'

export const userApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/v1" }),
    enpoint: (builder) => ({
        getUser: builder.query({
            query: () => "user/login"
        }),
    }),
})

export const { UseGetUserQuery} = userApi