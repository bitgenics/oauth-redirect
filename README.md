# oauth-redirect

This Lambda serves to validate and then redirect to a provided URL.

## Installation

1. Clone and then install the project:

```bash
npm install
```

2. Customize the two regex patterns near the top of `index.js`:

```javascript
const LINC_PREVIEW_URL_REGEX = /examplesitename--(.*)\.linc-preview\.sh/;
const PRODUCTION_URL_REGEX = /examplename\.com/;
```

3. Manually create a new AWS Lambda using the contents of `index.js` - make sure to select a Runtime of NodeJS 10.x

4. Manually create a new Cloud Front Distribution using the provided `cf.yaml` file

## Usage

Once your Lambda is up and running, you can start sending requests to it.

When making a request to the Lambda, ensure that your `state` query argument in your query string contains a `redirecturl` entry. 

You can add a `redirecturl` to your `state` query argument as follows:

```javascript
const redirecturl = "https://sitename--abcd1234--production.linc-preview.sh/";
const stateQueryString = `redirecturl=${encodeURIComponent(redirecturl)}`;
const queryString = `?state=${encodeURIComponent(state)}`
```

Once your `redirecturl` has been successfully validated, the Lambda will redirect to the validated URL, passing along the original query string.

## Errors

This table lists the expected errors that could be returned by the Lambda:

| Error                  |                                                                    Description                                                                     |
| ---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------: |
| `missing_state_params` |                                               The supplied query string is missing a state paramater                                               |
| `missing_redirect_url` |                                         The supplied state paramater is missing a `redirecturl` paramater                                          |
| `invalid_redirect_url` | The supplied `redirecturl` is invalid. Make sure the `redirecturl` is either a Linc preview URL for one of your Linc sites, or your production URL |
