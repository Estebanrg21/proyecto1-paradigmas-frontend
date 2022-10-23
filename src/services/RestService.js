import http from "../http-client";

export default class RestService {
    constructor(entity) {
        this.entity = entity;
    }

    getAll = () => {
        return http.get(`/${this.entity}`);
    };
    get = id => {
        return http.get(`/${this.entity}/${id}`);
    };
    create = data => {
        return http.post(`/${this.entity}`, data);
    };
    update = (id, data) => {
        return http.put(`/${this.entity}`, data);
    };
    remove = id => {
        return http.delete(`/${this.entity}/${id}`);
    };
}