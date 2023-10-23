import axios from "axios";

class ApiHandler {
    constructor(apiUrl, accessToken) {
        if (!apiUrl) throw new Error("You must provide an apiUrl to ApiHandler");

        this.api = axios.create({
            baseURL: apiUrl,
            // withCredentials: true,
        });

        this.accessToken = accessToken || null;
    }

    get(url) {
        return this.api.get(url).then((response) => response.data).catch((error) => error.response.data);
    }

    post(url, data) {
        return this.api.post(url, data).then((response) => response.data).catch((error) => error.response.data);
    }

    patch(url, data) {
        return this.api.patch(url, data).then((response) => response.data).catch((error) => error.response.data);
    }

    delete(url) {
        return this.api.delete(url).then((response) => response.data).catch((error) => error.response.data);
    }

    setAccessToken(accessToken) {
        this.accessToken = accessToken;

        // Set the Authorization header for all requests
        this.api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }

    user = {
        SignUp: (data) => this.post("/user/signup", data),
        SignIn: (data) => this.post("/user/signin", data),
        SignOut: () => this.post("/user/signout"),
        GetUserData: () => this.post("/user/get"),
        UpdateUserData: (data) => this.patch("/user/update", data),
        UpdateUserPassword: (data) => this.patch("/user/update/password", data),
    }

    product = {
        GetProducts: () => this.get("/product"),
        GetProduct: (id) => this.get(`/product/${id}`),
        CreateProduct: (data) => this.post("/product/create", data),
        UpdateProduct: (id, data) => this.patch(`/product/update/${id}`, data),
        DeleteProduct: (id) => this.delete(`/product/delete/${id}`),
    }

    productCategory = {
        GetProductCategories: () => this.get("/product-category"),
        GetProductCategory: (id) => this.get(`/product-category/${id}`),
        CreateProductCategory: (data) => this.post("/product-category/create", data),
        UpdateProductCategory: (id, data) => this.patch(`/product-category/update/${id}`, data),
        DeleteProductCategory: (id) => this.delete(`/product-category/delete/${id}`),
    }
}

export default ApiHandler;