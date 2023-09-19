export const assignOverlay = (openLoaderOverlay) => {
    return {
        type: 'HANDLE_OVERLAY',
        val: openLoaderOverlay
    }
}

export const assignCartQty = (cartQty) => {
    return {
        type: 'HANDLE_CART_QTY',
        val: cartQty
    }
}