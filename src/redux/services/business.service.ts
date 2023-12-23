import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryReAuth } from "../baseQuery.ts";
import {IChatTypeModel} from "../../models/chat-type.model.ts";

export const chatTypeApi = createApi({
    reducerPath: 'businessApi',
    baseQuery: baseQueryReAuth,
    tagTypes: ['ChatType'],
    endpoints: (builder) => ({
    getChatType: builder.query<IChatTypeModel[], void>({
          query: () => ({
              url: '/posts'
          }),
          providesTags: ['ChatType'],
        }),

    }),
  }),
})