import axios from "axios";

const url = "https://slidedeck-backend.herokuapp.com/";
const microservices_url =
  "https://4gwrvrti1b.execute-api.us-east-1.amazonaws.com/dev/upload_signature";
const headers = {
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
};

/** Async Axios API calls in one neat callable object.
 *  @example
 *  // Get a list of templates
 *  api.get_template(token, resultHandler);
 *  */
const api = {
    post_upload: (file, key) => {
        return axios.post(microservices_url, file, { headers });
    },
    put_login: (user, callback) => {
        const path = `${url}/login`;
        axios
            .put(path, {
                username: user.name,
                password: user.password
            })
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    post_register: (user, callback) => {
        const path = `${url}/register`;
        axios
            .post(path, {
                name: user.name,
                password: user.password,
                role: user.role
            })
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    post_template_create: (template, callback) => {
        const path = `${url}/templates/create`;
        axios
            .post(path, {
                name: template.name,
                columns: template.columns,
                token: template.token
            })
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    get_template: (token, callback) => {
        const path = `${url}/templates`;
        axios
            .get(path, {params: {
                token: token
            }})
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    get_template_id: (id, token, callback) => {
        const path = `${url}/templates/${id}`;
        axios
            .get(path, {params: {
                token: token
            }})
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    get_test: (token, callback) => {
        const path = `${url}/tests`;
        axios
            .get(path, {params: {
                token: token
            }})
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    post_test_create: (test, callback) => {
        const path = `${url}/tests/create`;
        axios
            .post(path, {
                name: test.name,
                template: test.template,
                fields: test.fields,
                token: test.token
            })
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    post_log_create: (log, callback) => {
        const path = `${url}/logs/create`;
        axios
            .post(path, {
                name: log.name,
                template: log.template,
                presets: log.presets,
                token: log.token
            })
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    post_log_id_slide: (log_id, slide, callback) => {
        const path = `${url}/logs/${log_id}/slides`;
        axios
            .post(path, {
                fields: slide.fields,
                submit: slide.submit,
                token: slide.token,
            })
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    get_log: (token, callback) => {
        const path = `${url}/logs`;
        axios
            .get(path, {params: {
                token: token
            }})
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },
    get_log_id: (id, token, callback) => {
        const path = `${url}/logs/${id}`;
        axios
            .get(path, {params: {
                token: token
            }})
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },

    // TODO 

}

export default api;