export default class BaseResponse {
    ms;
    constructor(status = 200, message = 'Successfull', data = null) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    setStatus(status) {
        this.status = status;
        return this;
    }

    setMessage(message) {
        this.message = message;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return this.message;
    }

    getData() {
        return this.data;
    }

    toJson() {
        return JSON.stringify({
            status: this.status,
            message: this.message,
            timestamp: Date.now(),
            data: this.data
        });
    }

    send(res) {
        res.end(this.toJson());
    }

    setError(message, data = null) {
        this.status = 'error';
        this.message = message;
        this.data = data;
        return this;
    }
}