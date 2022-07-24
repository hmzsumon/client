import { configureStore } from '@reduxjs/toolkit';
import activeSlice from '../redux/auth/activeSlice';
import agentReducer from '../redux/auth/agentSlice';
import authReducer from '../redux/auth/authSlice';
import depositReducer from '../redux/deposit/depositSlice';
import generationReducer from '../redux/generation/genSlice';
import packageReducer from '../redux/package/packageSlice';
import resultsReducer from '../redux/ticket/resultsSlice';
import ticketReducer from '../redux/ticket/ticketSlice';
import tnxReducer from '../redux/tnx/tnxSlice';
import withdrawReducer from '../redux/withdraw/withdrawSlice';
import workReducer from '../redux/works/workSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deposit: depositReducer,
    active: activeSlice,
    ticket: ticketReducer,
    results: resultsReducer,
    agent: agentReducer,
    withdraw: withdrawReducer,
    work: workReducer,
    tnx: tnxReducer,
    package: packageReducer,
    generation: generationReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
