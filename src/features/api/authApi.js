import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        credentials: 'include', 
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: ['User']
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: 'register',
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' }
            }),
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: 'updateProfile',
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['User']
        }),
        Profile: builder.query({
            query: () => ({
                url: 'profile',
                method: "GET",
            }),
            providesTags: ['User']
        }),

        getPublishedCourses: builder.query({
            query: () => ({
                url: `courses?isPublished=true`,
                method: 'GET',
            }),
        }),

        getEnrolledCourses: builder.query({
            query: () => ({
                url: `enrolled-courses`,
                method: 'GET',
            }),
        }),

        getUser: builder.query({
            query: () => "check-auth",
        }),

    })
})

export const { useLoginUserMutation ,useGetUserQuery ,useGetEnrolledCoursesQuery, useGetPublishedCoursesQuery, useRegisterUserMutation, useProfileQuery, useUpdateUserMutation } = authApi;

