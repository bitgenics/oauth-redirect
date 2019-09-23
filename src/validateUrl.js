const GENIE_PREVIEW_REGEX = /genie--(.*)\.linc-preview\.sh/;
const EUGENELABS_REGEX = /eugenelabs\.com/;

function validateUrl(url) {
  const isPreviewLink = GENIE_PREVIEW_REGEX.exec(url);
  const isProductionLink = EUGENELABS_REGEX.exec(url);
  if (isPreviewLink || isProductionLink) {
    return true;
  } else {
    return false;
  }
}

module.exports = validateUrl;
