import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import cookie from 'js-cookie';
import { API_CONFIG } from './../config/api';

function toQueryString(object) {
  const array = [];

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const str = getUriParam([key], object[key]);

      if (str !== '') {
        array.push(str);
      }
    }
  }

  return array.join('&');
}

function jsonParse(res) {
  return res.json().then(jsonResult => ({ ...res, jsonResult }));
}

function cFetch(url, options) {
  let mergeUrl = API_CONFIG.baseUri + url;
  const defaultOptions = {
    method: 'GET'
  };
  const opts = Object.assign({}, defaultOptions, {
    ...options
  });
  // add query params to url when method is GET
  if (opts && opts.method == "GET" && opts['params']) {
    mergeUrl = mergeUrl + '?' + toQueryString(opts['params']);
  }
  opts.headers = {
    ...opts.headers
  };

  return fetch(mergeUrl, opts).then(jsonParse).catch((error) => {
    console.log('request failed', error); // eslint-disable-line  no-console
    return {error};
  });
}

export default cFetch;
