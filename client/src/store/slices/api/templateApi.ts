import { templateApi as api } from './templateApi.generated';

const tags = {
  user: 'User',
  users: 'Users',
  product: 'Product',
  orders: 'Orders',
};

// TODO: fix up the tags to make sure dependencies make sense for routes

/*
  The generated API does not know how our endpoints relate to one another. By
  using `providesTags` and `invalidatesTags`, we describe those relationships
  so that cached data will be refetched when necessary. For example, a
  `createTodo` mutation should cause the app to refetch the `todos` query.
*/
const enhancedApi = api.enhanceEndpoints({
  addTagTypes: Object.values(tags),
  endpoints: {
    adminGetUsers: {
      providesTags: [tags.users],
    },
    adminApproveAccount: {
      invalidatesTags: [tags.users],
    },
    createUser: {
      invalidatesTags: [tags.users],
    },
    getOrders: {
      providesTags: [tags.orders],
    },
    createOrder: {
      invalidatesTags: [tags.orders],
    },
    addFavorite: {
      invalidatesTags: [tags.user],
    },
    removeFavorite: {
      invalidatesTags: [tags.user],
    },
  },
});

/*
  RTK Query makes it possible to trim down your initial bundle size by allowing you to inject additional 
  endpoints after you've set up your initial service definition. This can be very beneficial for larger 
  applications that may have many endpoints.

  injectEndpoints accepts a collection of endpoints, as well as an optional overrideExisting parameter.

  Calling injectEndpoints will inject the endpoints into the original API, but also give you that same 
  API with correct types for these endpoints back. 
  (Unfortunately, it cannot modify the types for the original definition.)
*/
export const templateApi = enhancedApi.injectEndpoints({
  endpoints: (build) => ({
    example: build.query({
      query: () => 'test',
    }),
  }),
  overrideExisting: false,
});

export const {
  // Queries
  useGetUserQuery,
  useGetOrdersQuery,
  useAdminGetUsersQuery,
  useGetAllProductsQuery,
  useAdminGetOrdersQuery,

  // Mutations
  useAdminApproveAccountMutation,
  useSetPasswordMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useLoginMutation,
  useSendLogoutMutation,
  useCreateUserMutation,
  useCreateOrderMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = templateApi;
