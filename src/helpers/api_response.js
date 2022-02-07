class ApiResponse {
    response;
    status_code;
    success;
    message;
    data;
    response_data;

    constructor(response = "", status_code = 0, success = true, message = "", data = {}) {
        this.response = response;
        this.status_code = status_code;
        this.success = success;
        this.message = message;
        this.data = data;
        this.response_data = { 
            success: this.success, 
            message: this.message, 
            data: this.data 
        }
    }

    sendResponse() {
        console.log(this.message);
        return this.response.status(this.status_code).json(this.response_data);
    }
}


module.exports = ApiResponse;