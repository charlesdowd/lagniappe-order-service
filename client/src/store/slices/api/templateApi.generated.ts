import { templateApi as api } from './templateApi.base';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    adminGetUsers: build.query<AdminGetUsersApiResponse, AdminGetUsersApiArg>({
      query: () => ({ url: `/admin/user` }),
    }),
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: (queryArg) => ({
        url: `/user`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getUser: build.query<GetUserApiResponse, GetUserApiArg>({
      query: () => ({ url: `/user` }),
    }),
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/auth`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    sendLogout: build.mutation<SendLogoutApiResponse, SendLogoutApiArg>({
      query: () => ({ url: `/auth/logout`, method: 'POST' }),
    }),
    register: build.mutation<RegisterApiResponse, RegisterApiArg>({
      query: (queryArg) => ({
        url: `/auth/register`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    verifyEmail: build.mutation<VerifyEmailApiResponse, VerifyEmailApiArg>({
      query: (queryArg) => ({
        url: `/auth/verify-email`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    setPassword: build.mutation<SetPasswordApiResponse, SetPasswordApiArg>({
      query: (queryArg) => ({
        url: `/auth/set-password`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    adminApproveAccount: build.mutation<
      AdminApproveAccountApiResponse,
      AdminApproveAccountApiArg
    >({
      query: (queryArg) => ({
        url: `/admin/approve-account`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getAuthRefresh: build.query<
      GetAuthRefreshApiResponse,
      GetAuthRefreshApiArg
    >({
      query: () => ({ url: `/auth/refresh` }),
    }),
    getAllProducts: build.query<
      GetAllProductsApiResponse,
      GetAllProductsApiArg
    >({
      query: () => ({ url: `/product` }),
    }),
    createOrder: build.mutation<CreateOrderApiResponse, CreateOrderApiArg>({
      query: (queryArg) => ({
        url: `/order`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getOrders: build.query<GetOrdersApiResponse, GetOrdersApiArg>({
      query: () => ({ url: `/order` }),
    }),
    adminGetOrders: build.query<
      AdminGetOrdersApiResponse,
      AdminGetOrdersApiArg
    >({
      query: () => ({ url: `/admin/order` }),
    }),
    resetPassword: build.mutation<
      ResetPasswordApiResponse,
      ResetPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/reset-password`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    forgotPassword: build.mutation<
      ForgotPasswordApiResponse,
      ForgotPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/forgot-password`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    addFavorite: build.mutation<AddFavoriteApiResponse, AddFavoriteApiArg>({
      query: (queryArg) => ({
        url: `/user/favorite`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    removeFavorite: build.mutation<
      RemoveFavoriteApiResponse,
      RemoveFavoriteApiArg
    >({
      query: (queryArg) => ({
        url: `/user/unfavorite`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as templateApi };
export type AdminGetUsersApiResponse = /** status 200  */ {
  users?: User[];
};
export type AdminGetUsersApiArg = void;
export type CreateUserApiResponse = /** status 200 User Created */ {
  user: User;
};
export type CreateUserApiArg = {
  /** Post the necessary fields for the API to create a new user. */
  body: {
    email: string;
    password: string;
  };
};
export type GetUserApiResponse = /** status 200 OK */ {
  user?: User;
};
export type GetUserApiArg = void;
export type LoginApiResponse = /** status 200 OK */ {
  accessToken: string;
  user?: User;
};
export type LoginApiArg = {
  body: {
    email: string;
    password: string;
  };
};
export type SendLogoutApiResponse = /** status 200 OK */
  | {
      message?: string;
    }
  | /** status 204 No Content */ undefined;
export type SendLogoutApiArg = void;
export type RegisterApiResponse = /** status 200 OK */ {
  message?: string;
};
export type RegisterApiArg = {
  body: {
    email: string;
    company?: string;
    phoneNumber?: string;
  };
};
export type VerifyEmailApiResponse = /** status 200 OK */ {
  user?: User;
};
export type VerifyEmailApiArg = {
  body: {
    emailToken?: string;
  };
};
export type SetPasswordApiResponse = /** status 200 OK */ {
  message?: string;
};
export type SetPasswordApiArg = {
  body: {
    userId: string;
    password: string;
  };
};
export type AdminApproveAccountApiResponse = /** status 201 Created */ {
  message?: string;
};
export type AdminApproveAccountApiArg = {
  body: {
    userId: string;
  };
};
export type GetAuthRefreshApiResponse = unknown;
export type GetAuthRefreshApiArg = void;
export type GetAllProductsApiResponse = /** status 200 OK */ {
  products?: Product[];
};
export type GetAllProductsApiArg = void;
export type CreateOrderApiResponse = /** status 201 Created */ {
  order: Order;
};
export type CreateOrderApiArg = {
  /** Body includes an array of orderItems and an optional poNumber */
  body: {
    orderItems: OrderItem[];
    poNumber?: string;
  };
};
export type GetOrdersApiResponse = /** status 200 OK */ {
  orders?: Order[];
};
export type GetOrdersApiArg = void;
export type AdminGetOrdersApiResponse = /** status 200 OK */ {
  orders?: Order[];
};
export type AdminGetOrdersApiArg = void;
export type ResetPasswordApiResponse = /** status 200 OK */ {
  user?: User;
};
export type ResetPasswordApiArg = {
  body: {
    resetToken?: string;
  };
};
export type ForgotPasswordApiResponse = /** status 201 Created */ {
  message?: string;
};
export type ForgotPasswordApiArg = {
  body: {
    email?: string;
  };
};
export type AddFavoriteApiResponse = unknown;
export type AddFavoriteApiArg = {
  /** The body has the product ID to be added to the users favorites array */
  body: {
    product: string;
  };
};
export type RemoveFavoriteApiResponse = unknown;
export type RemoveFavoriteApiArg = {
  /** The body contains the product ID that is to be removed from the users favorites */
  body: {
    product?: string;
  };
};
export type User = {
  email: string;
  password?: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  admin?: boolean;
  approved?: boolean;
  company?: string;
  phoneNumber?: string;
  favorites?: string[];
};
export type Product = {
  _id: string;
  itemId: string;
  description: string;
  casePack: string;
  caseWeight: string;
  category?:
    | 'SEAFOOD_CAKES'
    | 'SEAFOOD_BURGERS'
    | 'SEAFOOD_SAUSAGE'
    | 'SEAFOOD_SALADS'
    | 'SEAFOOD_STUFFING'
    | 'PREPARED_FILLETS';
};
export type OrderItem = {
  quantity: number;
  product: Product;
};
export type Order = {
  _id: string;
  customer: User;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
  poNumber?: string;
};
