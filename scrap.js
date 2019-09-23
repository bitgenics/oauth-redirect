const { handler } = require("./index");

const generateState = () => {
  const redirecturl = "https://genie--c9c51d97d--production.linc-preview.sh/";
  const nonce = "i49dsfk239";
  const state = `redirecturl=${encodeURIComponent(redirecturl)}&nonce=${nonce}`;
  return encodeURIComponent(state);
};

const event = {
  Records: [
    {
      cf: {
        config: {
          distributionId: "EXAMPLE"
        },
        request: {
          uri: "/outh",
          querystring: `code=99999&state=${generateState()}`,
          method: "GET",
          clientIp: "2001:cdba::3257:9652",
          headers: {
            host: [
              {
                key: "Host",
                value: "d123.cf.net"
              }
            ],
            "user-agent": [
              {
                key: "User-Agent",
                value: "Test Agent"
              }
            ],
            "user-name": [
              {
                key: "User-Name",
                value: "aws-cloudfront"
              }
            ]
          }
        }
      }
    }
  ]
};

handler(event);
