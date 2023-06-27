import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const userApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/v1/" } as any),
    endpoints: (builder) => ({
        getUser: builder.mutation({
            query: ({patch}: any) => ({
                url:"user/login",
                method: "POST",
                body: patch
            } as any)
        }as any),
    }),
})

// export const { UseGetUserQuery} = userApi