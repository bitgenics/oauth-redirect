const validateUrl = require("./src/validateUrl");

const errorResponse = (statusCode, body) => ({
  statusCode,
  body
});

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
        return errorResponse(403, "invalid_redirect_url");
      }
    } else {
      return errorResponse(500, "missing_redirect_url");
    }
  } else {
    return errorResponse(500, "missing_state_params");
  }
};
