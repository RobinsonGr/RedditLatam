import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "../features/contriesSlice";
import commentsSlice from "../features/commentsSlice";

export default configureStore(
    {
        reducer: {
            commentsSlice,
            countriesSlice,
        }
    }
)