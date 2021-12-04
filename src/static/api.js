import axios from "axios";

const url = "https://slidedeck-backend.herokuapp.com";
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
  get_signup: (credentials) => {
    return axios.get(
      `${url}/signup?token=${credentials.token}&expiration_length=${48}&role=${
        credentials.role
      }&email=${credentials.email}`
    );
  },
  put_report: (report_info) => {
    return axios.put(`${url}/log/export`, report_info);
  },
  post_upload: (file, key) => {
    return axios.post(microservices_url, file, { headers });
  },
  put_login: (user, callback) => {
    const path = `${url}/login`;
    axios
      .put(path, {
        username: user.name,
        password: user.password,
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  post_register: (user, callback) => {
    const path = `${url}/register`;
    axios
      .post(path, {
        username: user.username,
        password: user.password,
        admin_generated_code: user.code,
        full_name: user.name,
        email: user.email,
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  post_templates_create: (template, callback) => {
    const path = `${url}/templates/create`;
    axios
      .post(path, {
        name: template.name,
        columns: template.columns,
        token: template.token,
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  get_templates: (token, callback) => {
    const path = `${url}/templates`;
    axios
      .get(path, {
        params: {
          token: token,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  get_templates_id: (id, token, callback) => {
    const path = `${url}/templates/${id}`;
    axios
      .get(path, {
        params: {
          token: token,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  get_tests: (token, callback) => {
    const path = `${url}/tests`;
    axios
      .get(path, {
        params: {
          token: token,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  post_tests_create: (test, callback) => {
    const path = `${url}/tests/create`;
    axios
      .post(path, {
        name: test.name,
        template: test.template,
        fields: test.fields,
        token: test.token,
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  post_logs_create: (log, callback) => {
    const path = `${url}/logs/create`;
    axios
      .post(path, {
        name: log.name,
        template: log.template,
        presets: log.presets,
        token: log.token,
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  post_logs_id_slides_create: (log_id, slide, callback) => {
    const path = `${url}/logs/${log_id}/slides/create`;
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
      });
  },
  put_logs_id_slides_edit: (log_id, slide, token, callback) => {
    const path = `${url}/logs/${log_id}/slides/edit`;
    axios
      .put(path, {
        slide: slide.slide,
        fields: slide.fields,
        submit: slide.submit,
        token: token,
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  get_logs_id_slides: (log_id, token, callback) => {
    const path = `${url}/logs/${log_id}/slides`;
    axios
      .get(path, {
        params: {
          token: token,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  get_logs: (token, callback) => {
    const path = `${url}/logs`;
    axios
      .get(path, {
        params: {
          token: token,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  get_logs_id: (id, token, callback) => {
    const path = `${url}/logs/${id}`;
    axios
      .get(path, {
        params: {
          token: token,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // TODO
};

export default api;
