import { configureStore } from '@reduxjs/toolkit';
import { users } from '../Redux/Reducer/user';
import { admins } from '../Redux/Reducer/admin';
import { staffs } from '../Redux/Reducer/staff';

const store = configureStore({
 reducer: { users, admins, staffs }
});

export default store;
