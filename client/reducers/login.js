export default (data = "", action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.payload;
        default:
            return data;
    }
}