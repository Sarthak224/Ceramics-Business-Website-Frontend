import changeOverlayReducer from "./navigation";
import { combineReducers } from "redux";
import { changeCartQtyReducer } from "./navigation";
import productFilterReducer from "./productFilters";
const reducers = combineReducers(
    {
        changeOverlayReducer,
        changeCartQtyReducer,
        productFilterReducer,
        
    }
);

export default reducers;

