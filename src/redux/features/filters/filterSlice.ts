import { baseUrlApi } from "@/redux/api/baseUrlApi";

const jobStatsApi = baseUrlApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkModes: builder.query({
      query: () => "/jobs/work-mode",
    }),
    getDepartments: builder.query({
      query: () => "/jobs/departments",
    }),
    getCompanyNames: builder.query({
      query: () => "/companies/names",
    }),
    getLocations: builder.query({
      query: () => "/locations/names",
    }),
  }),
});

// ✅ Export hooks

export const {
  useGetWorkModesQuery,
  useGetDepartmentsQuery,
  useGetCompanyNamesQuery,
  useGetLocationsQuery
} = jobStatsApi;