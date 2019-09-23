const validateUrl = require("./validateUrl");

const GENIE_BUNDLE_PREVIEW = `https://genie--abcd1234--production.linc-preview.sh/`;
const GENIE_BRANCH_PREVIEW = `https://genie--production--branchname.branch.linc-preview.sh/`;
const GENIE_RELEASE_PREVIEW = `https://genie--production.release.linc-preview.sh/`;

const NON_GENIE_BUNDLE_PREVIEW = `https://foobar--abcd1234--production.linc-preview.sh/`;
const NON_GENIE_BRANCH_PREVIEW = `https://foobar--production--branchname.branch.linc-preview.sh/`;
const NON_GENIE_RELEASE_PREVIEW = `https://foobar--production.release.linc-preview.sh/`;

const EUGENE_LABS_URL = `https://eugenelabs.com/`;

// test genie preview links

test("Returns true for genie bundle preview link", () => {
  const testData = GENIE_BUNDLE_PREVIEW;
  const expectedResult = true;
  expect(validateUrl(testData)).toBe(expectedResult);
});
test("Returns true for genie branch preview link", () => {
  const testData = GENIE_BRANCH_PREVIEW;
  const expectedResult = true;
  expect(validateUrl(testData)).toBe(expectedResult);
});
test("Returns true for genie release preview link", () => {
  const testData = GENIE_RELEASE_PREVIEW;
  const expectedResult = true;
  expect(validateUrl(testData)).toBe(expectedResult);
});

// test non genie preview links

test("Returns false for non genie bundle preview link", () => {
  const testData = NON_GENIE_BUNDLE_PREVIEW;
  const expectedResult = false;
  expect(validateUrl(testData)).toBe(expectedResult);
});
test("Returns false for non genie branch preview link", () => {
  const testData = NON_GENIE_BRANCH_PREVIEW;
  const expectedResult = false;
  expect(validateUrl(testData)).toBe(expectedResult);
});
test("Returns false for non genie release preview link", () => {
  const testData = NON_GENIE_RELEASE_PREVIEW;
  const expectedResult = false;
  expect(validateUrl(testData)).toBe(expectedResult);
});

// test eugene labs URLs

test("Returns true for eugene labs url", () => {
  const testData = EUGENE_LABS_URL;
  const expectedResult = true;
  expect(validateUrl(testData)).toBe(expectedResult);
});

// test non Linc preview URLs & non Eugene Labs URLs

test("Returns false for URL not matching Linc Genie preview URL or Eugene Labs URL", () => {
  const testData = "https://abcde.foo/bar/bar-foo/124?cat=true";
  const expectedResult = false;
  expect(validateUrl(testData)).toBe(expectedResult);
});
