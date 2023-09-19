const initialState = {};

const  productFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "HANDLE_PRODUCT_FILTER": return action.val;
        
        default: return state;
    }
}


export default productFilterReducer;
