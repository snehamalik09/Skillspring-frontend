import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/admin`,
        credentials: "include"
    }),
    tagTypes: ['Course'],
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ title, category, price }) => ({
                url: 'create',
                method: 'POST',
                body: { title, category, price },
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: ['Course']
        }),

        updateCourseById: builder.mutation({
            query: ({ courseId, body }) => ({
                url: `course/${courseId}/update`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Course']
        }),

        deleteCourseById: builder.mutation({
            query: (courseId) => ({
                url: `course/${courseId}/delete`,
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: ['Course']
        }),

        // courses created by the instructor
        getCoursesByCreator: builder.query({
            query: () => ({
                url: 'courses',
                method: 'GET',
            }),
            providesTags: ['Course']
        }),

        getPurchasedCoursesOfCreator: builder.query({
            query: () => ({
                url: 'purchasedCourses',
                method: 'GET',
            }),
            providesTags: ['Course']
        }),

        getCourseById: builder.query({
            query: (courseId) => ({
                url: `course/${courseId}`,
                method: 'GET',
            }),
            providesTags: ['Course']
        }),

        createLecture: builder.mutation({
            query: ({ title, courseId }) => ({
                url: `course/${courseId}/lecture`,
                method: 'POST',
                body: { title },
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: ['Lecture']
        }),

        getLecture: builder.query({
            query: (courseId) => ({
                url: `course/${courseId}/lecture`,
                method: 'GET',
            }),
            providesTags: ['Lecture']
        }),

        getLectureById: builder.query({
            query: ({ courseId, lectureId }) => ({
                url: `course/${courseId}/lecture/${lectureId}`,
                method: 'GET',
            }),
            providesTags: ['Lecture']
        }),

        updateLecture: builder.mutation({
            query: ({ lectureId, courseId, ...body }) => ({
                url: `course/${courseId}/lecture/${lectureId}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Lecture']
        }),

        deleteLecture: builder.mutation({
            query: ({ courseId, lectureId }) => ({
                url: `course/${courseId}/lecture/${lectureId}`,
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: ['Lecture']
        }),

        togglePublishCourse: builder.mutation({
            query: ({ courseId, query }) => ({
                url: `course/${courseId}?publish=${query}`,
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            }),
            invalidatesTags: ['Course']
        }),

        getSearchCourses: builder.query({
            query: ({ searchQuery, categories, sortByPrice }) => {
                const params = new URLSearchParams();

                if (searchQuery) params.append("query", searchQuery);
                if (categories?.length > 0) {
                    categories.forEach((cat) => params.append("categories", cat));
                }
                if (sortByPrice) params.append("sortByPrice", sortByPrice);

                return {
                    url: `/search?${params.toString()}`,
                    method: 'GET',
                };
            },
        }),


    })
})

export const { useCreateCourseMutation, useGetSearchCoursesQuery , useGetPurchasedCoursesOfCreatorQuery ,useTogglePublishCourseMutation, useDeleteLectureMutation, useEnrolledCoursesQuery, useGetCoursesByCreatorQuery, useGetCourseByIdQuery, useUpdateCourseByIdMutation, useDeleteCourseByIdMutation, useCreateLectureMutation, useGetLectureQuery, useUpdateLectureMutation, useGetLectureByIdQuery } = courseApi;

