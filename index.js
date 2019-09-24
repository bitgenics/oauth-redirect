const { URLSearchParams } = require("url");

// customize these two regex patterns
const LINC_PREVIEW_URL_REGEX = /examplesitename--(.*)\.linc-preview\.sh/;
const PRODUCTION_URL_REGEX = /examplename\.com/;

exports.validateUrl = url => {
  const isPreviewLink = LINC_PREVIEW_URL_REGEX.exec(url);
  const isProductionLink = PRODUCTION_URL_REGEX.exec(url);
  if (isPreviewLink || isProductionLink) {
    return true;
  } else {
    return false;
  }
};

const errorResponse = (statusCode, body) => {
  return {
    status: JSON.stringify(statusCode),
    statusDescription: "Placeholder status description",
    body
  };
};

exports.handler = (event, context, callback) => {
  console.log({ event, context, callback });
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
          status: "302",
          statusDescription: "Found",
          headers: {
            location: [
              {
                key: "Location",
                value: redirecturl + "?" + searchParams
              }
            ]
          }
        };
        console.log(response);
        callback(null, response);
      } else {
        const response = errorResponse(403, "invalid_redirect_url");
        callback(null, response);
      }
    } else {
      const response = errorResponse(500, "missing_redirect_url");
      callback(null, response);
    }
  } else {
    const response = errorResponse(500, "missing_state_params");
    callback(null, response);
  }
};
