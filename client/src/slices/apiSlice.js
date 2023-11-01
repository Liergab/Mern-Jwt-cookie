import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// sa base quary ilalagay yung http://localhost:5001 kung wlng prxy
const baseQuery = fetchBaseQuery({baseUrl:''})

export const apiSlice = createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints : (builder) => ({})
})