const initialState = null;
const initialState2 = 0;

const changeOverlayReducer = (state = initialState, action) => {
    switch (action.type) {
        case "HANDLE_OVERLAY": return action.val;
        
        default: return state;
    }
}

const changeCartQtyReducer = (state = initialState2, action) => {
    switch (action.type) {
        case "HANDLE_CART_QTY": return action.val;
        
        default: return state;
    }
}
export {changeCartQtyReducer}
export default changeOverlayReducer;
