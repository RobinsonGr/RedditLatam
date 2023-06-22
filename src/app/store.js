import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "../features/contriesSlice";

export default configureStore(
    {
        reducer: {
            countriesSlice,
        }
    }
)