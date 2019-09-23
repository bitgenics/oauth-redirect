const validateUrl = require("./src/validateUrl");

exports.handler = async event => {
  const record = event.Records[0];
  const searchParams = record.cf.request.querystring;
  const params = new URLSearchParams(searchParams);
  if (params.get("state")) {
    const stateParams = new URLSearchParams(params.get("state"));
    const redirecturl = stateParams.get("redirecturl");
    if (redirecturl) {
      const isValidUrl = validateUrl(redirecturl);
      if (isValidUrl) {
        const response = {
          statusCode: 302,
          headers: {
            Location: redirecturl + "?" + searchParams
          }
        };
        return response;
      } else {
        const response = {
          statusCode: 403,
          body: "invalid_redirect_url"
        };
        return response;
      }
    } else {
      const response = {
        statusCode: 500,
        body: "missing_redirect_url"
      };
      return response;
    }
  } else {
    const response = {
      statusCode: 500,
      body: "missing_state_param"
    };
    return response;
  }
};
