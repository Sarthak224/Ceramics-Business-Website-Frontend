const initialState = false;

const  footerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "HANDLE_EMAIL_VERIFY_FROM_FOOTER": return action.val;
        
        default: return state;
    }
}


export default footerReducer;
