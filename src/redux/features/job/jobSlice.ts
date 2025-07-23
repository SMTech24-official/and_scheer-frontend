import { CreateJobRequest, Job, JobResponse, JobsListResponse, UpdateJobRequest } from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";


const jobApi = baseUrlApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllJobPosts: builder.query({
            query: () => "/jobs/posts",

        }),

        getMyJobPosts: builder.query({
            query: () => "/jobs/my-job-posts",
           
        }),
        createJobPost: builder.mutation({
            query: (data) => ({
                url: "/jobs/create-job-post",
                method: "POST",
                body: data,
            }),

        }),

        deleteJobPost: builder.mutation({
            query: (id) => ({
                url: `/jobs/${id}`,
                method: "DELETE",
            }),

        }),

        updateJobPost: builder.mutation({
            query: ({ id, data }) => ({
                url: `/jobs/${id}`,
                method: "PATCH",
                body: data,
            }),

        }),

    }),
});


export const {
    useCreateJobPostMutation,
    useGetMyJobPostsQuery,
    useGetAllJobPostsQuery,
    useDeleteJobPostMutation,
    useUpdateJobPostMutation,
    // ...existing hooks
} = jobApi;

