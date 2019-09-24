const { validateUrl } = require("./index");

const SITENAME = "examplesitename";
const PRODUCTION_URL = `https://examplename.com/`;

const VALID_BUNDLE_PREVIEW = `https://${SITENAME}--abcd1234--production.linc-preview.sh/`;
const VALID_BRANCH_PREVIEW = `https://${SITENAME}--production--branchname.branch.linc-preview.sh/`;
const VALID_RELEASE_PREVIEW = `https://${SITENAME}--production.release.linc-preview.sh/`;

const INVALID_BUNDLE_PREVIEW = `https://foobar--abcd1234--production.linc-preview.sh/`;
const INVALID_BRANCH_PREVIEW = `https://foobar--production--branchname.branch.linc-preview.sh/`;
const INVALIDRELEASE_PREVIEW = `https://foobar--production.release.linc-preview.sh/`;

test("Returns true for valid bundle preview link", () => {
  const testData = VALID_BUNDLE_PREVIEW;
  const expectedResult = true;
  expect(validateUrl(testData)).toBe(expectedResult);
});
test("Returns true for valid branch preview link", () => {
  const testData = VALID_BRANCH_PREVIEW;
  const expectedResult = true;
  expect(validateUrl(testData)).toBe(expectedResult);
});
test("Returns true for valid release preview link", () => {
  const testData = VALID_RELEASE_PREVIEW;
  const expectedResult = true;
  expect(validateUrl(testData)).toBe(expectedResult);
});

test("Returns false for invalid bundle preview link", () => {
  const testData = INVALID_BUNDLE_PREVIEW;
  const expectedResult = false;
  expect(validateUrl(testData)).toBe(expectedResult);
});
test("Returns false for invalid branch preview link", () => {
  const testData = INVALID_BRANCH_PREVIEW;
  const expectedResult = false;
  expect(validateUrl(testData)).toBe(expectedResult);
});
test("Returns false for invalid release preview link", () => {
  const testData = INVALIDRELEASE_PREVIEW;
  const expectedResult = false;
  expect(validateUrl(testData)).toBe(expectedResult);
});

test("Returns true for specified production url", () => {
  const testData = PRODUCTION_URL;
  const expectedResult = true;
  expect(validateUrl(testData)).toBe(expectedResult);
});

test("Returns false for URL not matching valid Linc preview URL or specified production URL", () => {
  const testData = "https://abcde.foo/bar/bar-foo/124?cat=true";
  const expectedResult = false;
  expect(validateUrl(testData)).toBe(expectedResult);
});
