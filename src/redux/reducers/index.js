import changeOverlayReducer from "./navigation";
import { combineReducers } from "redux";
import { changeCartQtyReducer } from "./navigation";
import productFilterReducer from "./productFilters";
import footerReducer from "./Footer";
const reducers = combineReducers(
    {
        changeOverlayReducer,
        changeCartQtyReducer,
        productFilterReducer,
        footerReducer
        
    }
);

export default reducers;

