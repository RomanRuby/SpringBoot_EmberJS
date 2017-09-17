export { createNormalizedUrl };
export { createUrlRegEx };
export { urlMatchesAnyPattern };
/**
 * Create an absolute URL, allowing regex expressions to pass
 *
 * @param {string} url
 * @param {string|object} baseUrl
 * @public
 */

function createNormalizedUrl(url) {
  var baseUrl = arguments.length <= 1 || arguments[1] === undefined ? self.location : arguments[1];

  return decodeURI(new URL(encodeURI(url), baseUrl).toString());
}

/**
 * Create an (absolute) URL Regex from a given string
 *
 * @param {string} url
 * @returns {RegExp}
 * @public
 */

function createUrlRegEx(url) {
  var normalized = createNormalizedUrl(url);
  return new RegExp("^" + normalized + "$");
}

/**
 * Check if given URL matches any pattern
 *
 * @param {string} url
 * @param {array} patterns
 * @returns {boolean}
 * @public
 */

function urlMatchesAnyPattern(url, patterns) {
  return !!patterns.find(function (pattern) {
    return pattern.test(decodeURI(url));
  });
}

export default {
  createAbsoluteDomain: createAbsoluteDomain,
  createUrlRegEx: createUrlRegEx,
  urlMatchesAnyPattern: urlMatchesAnyPattern
};