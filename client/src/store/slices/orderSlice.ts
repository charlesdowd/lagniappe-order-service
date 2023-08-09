import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';
import { templateApi, OrderItem } from './api/templateApi.generated';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    poNumber: null,
    currentOrder: [],
    orderHistory: [],
  },
  reducers: {
    addItem: (state, { payload }) => {
      const { _id, quantity, description, itemId, casePack, caseWeight } =
        payload;

      // Handle when product already exists in current order. Remove old value
      state.currentOrder = state.currentOrder.filter(
        (orderItem: OrderItem) => orderItem.product._id !== _id,
      );

      state.currentOrder.push({
        product: { description, itemId, casePack, caseWeight, _id },
        quantity,
      });
      toast.success('Added to current order');
    },

    removeItem: (state, { payload }) => {
      const { product } = payload;
      state.currentOrder = state.currentOrder.filter(
        (orderItem) => orderItem.product._id !== product,
      );
      toast.success('Removed from current order');
    },

    clearOrder: (state) => {
      state.currentOrder = [];
    },

    setPoNumber: (state, { payload }) => {
      const { poNumber } = payload;
      state.poNumber = poNumber;
    },
  },

  // Order extra reduces
  extraReducers: (builder) => {
    builder.addMatcher(
      templateApi.endpoints.createOrder.matchFulfilled,
      (state) => {
        state.currentOrder = [];
        toast.success('Order successfully submitted');
      },
    );

    // Populate state with users order history
    builder.addMatcher(
      templateApi.endpoints.getOrders.matchFulfilled,
      (state, { payload }) => {
        state.orderHistory = payload.orders;
      },
    );

    builder.addMatcher(templateApi.endpoints.createOrder.matchRejected, () => {
      toast.error('Failed to submit order');
    });
  },
});

export const selectPoNumber = (state): string => state.order.poNumber;
export const selectOrderHistory = (state) => state.order.orderHistory;
export const selectCurrentOrder = (state): [OrderItem] =>
  state.order.currentOrder;

// Functions for executing actions on the order state
export const { addItem, removeItem, clearOrder, setPoNumber } =
  orderSlice.actions;

export default orderSlice.reducer;
