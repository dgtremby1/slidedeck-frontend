import axios from "axios";

const url = "https://slidedeck-backend.herokuapp.com/";

/** Async Axios API calls in one neat callable object.
 *  @example
 *  // Get a list of templates
 *  api.get_template(token, resultHandler);
 *  */
const api = {
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
        username: user.name,
        password: user.password,
        admin_generated_code: user.admin_generated_code,
        full_name: user.full_name,
        signature: user.signature,
        email: user.email,
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  post_template_create: (template, callback) => {
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
  get_template: (token, callback) => {
    const path = `${url}/templates/`;
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
  get_test: (token, callback) => {
    const path = `${url}/tests/`;
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
  post_test_create: (test, callback) => {
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
  post_log_create: (log, callback) => {
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
  get_log: (token, callback) => {
    const path = `${url}/logs/`;
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
  get_log_id: (id, token, callback) => {
    const path = `${url}/logs/${id}/`;
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
