const responseData = { 
    success: false, 
    message: "", 
    data: {}
}

export default (data = responseData, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload;
        default:
            return data;
    }
}