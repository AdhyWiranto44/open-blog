class ApiResponse {
    response: any;
    status_code: number;
    success: boolean;
    message: string;
    data: any;
    response_data: any;

    constructor(response: any = "", status_code: number = 0, success: boolean = true, message: string = "", data: any = {}) {
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


export default ApiResponse;