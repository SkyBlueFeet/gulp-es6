'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
/** Used as references for various `Number` constants. */

var INFINITY = 1 / 0;
/** `Object#toString` result references. */

var symbolTag = '[object Symbol]';
/** Used to match HTML entities and HTML characters. */

var reUnescapedHtml = /[&<>"'`]/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
/** Used to map characters to HTML entities. */

var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};
/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */

function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}
/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */


var escapeHtmlChar = basePropertyOf(htmlEscapes);
/** Used for built-in method references. */

var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Built-in value references. */

var Symbol$1 = root.Symbol;
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */


function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */


function toString(value) {
  return value == null ? '' : baseToString(value);
}
/**
 * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
 * their corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * Backticks are escaped because in IE < 9, they can break out of
 * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
 * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
 * [#133](https://html5sec.org/#133) of the
 * [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 */


function escape$1(string) {
  string = toString(string);
  return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
}

var lodash_escape = escape$1;

var isURL$1 = {exports: {}};

var assertString = {exports: {}};

(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assertString;

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function assertString(input) {
    var isString = typeof input === 'string' || input instanceof String;

    if (!isString) {
      var invalidType;

      if (input === null) {
        invalidType = 'null';
      } else {
        invalidType = _typeof(input);

        if (invalidType === 'object' && input.constructor && input.constructor.hasOwnProperty('name')) {
          invalidType = input.constructor.name;
        } else {
          invalidType = "a ".concat(invalidType);
        }
      }

      throw new TypeError("Expected string but received ".concat(invalidType, "."));
    }
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
})(assertString, assertString.exports);

var isFQDN = {exports: {}};

var merge = {exports: {}};

(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = merge;

  function merge() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaults = arguments.length > 1 ? arguments[1] : undefined;

    for (var key in defaults) {
      if (typeof obj[key] === 'undefined') {
        obj[key] = defaults[key];
      }
    }

    return obj;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
})(merge, merge.exports);

(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isFQDN;

  var _assertString = _interopRequireDefault(assertString.exports);

  var _merge = _interopRequireDefault(merge.exports);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var default_fqdn_options = {
    require_tld: true,
    allow_underscores: false,
    allow_trailing_dot: false
  };

  function isFQDN(str, options) {
    (0, _assertString.default)(str);
    options = (0, _merge.default)(options, default_fqdn_options);
    /* Remove the optional trailing dot before checking validity */

    if (options.allow_trailing_dot && str[str.length - 1] === '.') {
      str = str.substring(0, str.length - 1);
    }

    var parts = str.split('.');

    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 63) {
        return false;
      }
    }

    if (options.require_tld) {
      var tld = parts.pop();

      if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
        return false;
      } // disallow spaces && special characers


      if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20\u00A9\uFFFD]/.test(tld)) {
        return false;
      }
    }

    for (var part, _i = 0; _i < parts.length; _i++) {
      part = parts[_i];

      if (options.allow_underscores) {
        part = part.replace(/_/g, '');
      }

      if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
        return false;
      } // disallow full-width chars


      if (/[\uff01-\uff5e]/.test(part)) {
        return false;
      }

      if (part[0] === '-' || part[part.length - 1] === '-') {
        return false;
      }
    }

    return true;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
})(isFQDN, isFQDN.exports);

var isIP = {exports: {}};

(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isIP;

  var _assertString = _interopRequireDefault(assertString.exports);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
  11.3.  Examples
  
     The following addresses
  
               fe80::1234 (on the 1st link of the node)
               ff02::5678 (on the 5th link of the node)
               ff08::9abc (on the 10th organization of the node)
  
     would be represented as follows:
  
               fe80::1234%1
               ff02::5678%5
               ff08::9abc%10
  
     (Here we assume a natural translation from a zone index to the
     <zone_id> part, where the Nth zone of any scope is translated into
     "N".)
  
     If we use interface names as <zone_id>, those addresses could also be
     represented as follows:
  
              fe80::1234%ne0
              ff02::5678%pvc1.3
              ff08::9abc%interface10
  
     where the interface "ne0" belongs to the 1st link, "pvc1.3" belongs
     to the 5th link, and "interface10" belongs to the 10th organization.
   * * */


  var ipv4Maybe = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  var ipv6Block = /^[0-9A-F]{1,4}$/i;

  function isIP(str) {
    var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    (0, _assertString.default)(str);
    version = String(version);

    if (!version) {
      return isIP(str, 4) || isIP(str, 6);
    } else if (version === '4') {
      if (!ipv4Maybe.test(str)) {
        return false;
      }

      var parts = str.split('.').sort(function (a, b) {
        return a - b;
      });
      return parts[3] <= 255;
    } else if (version === '6') {
      var addressAndZone = [str]; // ipv6 addresses could have scoped architecture
      // according to https://tools.ietf.org/html/rfc4007#section-11

      if (str.includes('%')) {
        addressAndZone = str.split('%');

        if (addressAndZone.length !== 2) {
          // it must be just two parts
          return false;
        }

        if (!addressAndZone[0].includes(':')) {
          // the first part must be the address
          return false;
        }

        if (addressAndZone[1] === '') {
          // the second part must not be empty
          return false;
        }
      }

      var blocks = addressAndZone[0].split(':');
      var foundOmissionBlock = false; // marker to indicate ::
      // At least some OS accept the last 32 bits of an IPv6 address
      // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
      // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
      // and '::a.b.c.d' is deprecated, but also valid.

      var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
      var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

      if (blocks.length > expectedNumberOfBlocks) {
        return false;
      } // initial or final ::


      if (str === '::') {
        return true;
      } else if (str.substr(0, 2) === '::') {
        blocks.shift();
        blocks.shift();
        foundOmissionBlock = true;
      } else if (str.substr(str.length - 2) === '::') {
        blocks.pop();
        blocks.pop();
        foundOmissionBlock = true;
      }

      for (var i = 0; i < blocks.length; ++i) {
        // test for a :: which can not be at the string start/end
        // since those cases have been handled above
        if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
          if (foundOmissionBlock) {
            return false; // multiple :: in address
          }

          foundOmissionBlock = true;
        } else if (foundIPv4TransitionBlock && i === blocks.length - 1) ; else if (!ipv6Block.test(blocks[i])) {
          return false;
        }
      }

      if (foundOmissionBlock) {
        return blocks.length >= 1;
      }

      return blocks.length === expectedNumberOfBlocks;
    }

    return false;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
})(isIP, isIP.exports);

(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isURL;

  var _assertString = _interopRequireDefault(assertString.exports);

  var _isFQDN = _interopRequireDefault(isFQDN.exports);

  var _isIP = _interopRequireDefault(isIP.exports);

  var _merge = _interopRequireDefault(merge.exports);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /*
  options for isURL method
  
  require_protocol - if set as true isURL will return false if protocol is not present in the URL
  require_valid_protocol - isURL will check if the URL's protocol is present in the protocols option
  protocols - valid protocols can be modified with this option
  require_host - if set as false isURL will not check if host is present in the URL
  allow_protocol_relative_urls - if set as true protocol relative URLs will be allowed
  
  */


  var default_url_options = {
    protocols: ['http', 'https', 'ftp'],
    require_tld: true,
    require_protocol: false,
    require_host: true,
    require_valid_protocol: true,
    allow_underscores: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false
  };
  var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

  function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
  }

  function checkHost(host, matches) {
    for (var i = 0; i < matches.length; i++) {
      var match = matches[i];

      if (host === match || isRegExp(match) && match.test(host)) {
        return true;
      }
    }

    return false;
  }

  function isURL(url, options) {
    (0, _assertString.default)(url);

    if (!url || url.length >= 2083 || /[\s<>]/.test(url)) {
      return false;
    }

    if (url.indexOf('mailto:') === 0) {
      return false;
    }

    options = (0, _merge.default)(options, default_url_options);
    var protocol, auth, host, hostname, port, port_str, split, ipv6;
    split = url.split('#');
    url = split.shift();
    split = url.split('?');
    url = split.shift();
    split = url.split('://');

    if (split.length > 1) {
      protocol = split.shift().toLowerCase();

      if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
        return false;
      }
    } else if (options.require_protocol) {
      return false;
    } else if (url.substr(0, 2) === '//') {
      if (!options.allow_protocol_relative_urls) {
        return false;
      }

      split[0] = url.substr(2);
    }

    url = split.join('://');

    if (url === '') {
      return false;
    }

    split = url.split('/');
    url = split.shift();

    if (url === '' && !options.require_host) {
      return true;
    }

    split = url.split('@');

    if (split.length > 1) {
      if (options.disallow_auth) {
        return false;
      }

      auth = split.shift();

      if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
        return false;
      }
    }

    hostname = split.join('@');
    port_str = null;
    ipv6 = null;
    var ipv6_match = hostname.match(wrapped_ipv6);

    if (ipv6_match) {
      host = '';
      ipv6 = ipv6_match[1];
      port_str = ipv6_match[2] || null;
    } else {
      split = hostname.split(':');
      host = split.shift();

      if (split.length) {
        port_str = split.join(':');
      }
    }

    if (port_str !== null) {
      port = parseInt(port_str, 10);

      if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
        return false;
      }
    }

    if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, _isIP.default)(ipv6, 6))) {
      return false;
    }

    host = host || ipv6;

    if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
      return false;
    }

    if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
      return false;
    }

    return true;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
})(isURL$1, isURL$1.exports);

var isURL = /*@__PURE__*/getDefaultExportFromCjs(isURL$1.exports);

var util$2 = {};

var isBuffer = function isBuffer(arg) {
  return arg instanceof Buffer;
};

var inherits = {exports: {}};

var inherits_browser = {exports: {}};

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  inherits_browser.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  inherits_browser.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function () {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

try {
  var util$1 = util$2;
  if (typeof util$1.inherits !== 'function') throw '';
  inherits.exports = util$1.inherits;
} catch (e) {
  inherits.exports = inherits_browser.exports;
}

(function (exports) {
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  var formatRegExp = /%[sdj%]/g;

  exports.format = function (f) {
    if (!isString(f)) {
      var objects = [];

      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect(arguments[i]));
      }

      return objects.join(' ');
    }

    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') return '%';
      if (i >= len) return x;

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

        default:
          return x;
      }
    });

    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += ' ' + x;
      } else {
        str += ' ' + inspect(x);
      }
    }

    return str;
  }; // Mark that a method should not be used.
  // Returns a modified function which warns once by default.
  // If --no-deprecation is set, then it is a no-op.


  exports.deprecate = function (fn, msg) {
    // Allow for deprecating things in the process of starting up.
    if (isUndefined(commonjsGlobal.process)) {
      return function () {
        return exports.deprecate(fn, msg).apply(this, arguments);
      };
    }

    if (process.noDeprecation === true) {
      return fn;
    }

    var warned = false;

    function deprecated() {
      if (!warned) {
        if (process.throwDeprecation) {
          throw new Error(msg);
        } else if (process.traceDeprecation) {
          console.trace(msg);
        } else {
          console.error(msg);
        }

        warned = true;
      }

      return fn.apply(this, arguments);
    }

    return deprecated;
  };

  var debugs = {};
  var debugEnviron;

  exports.debuglog = function (set) {
    if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
    set = set.toUpperCase();

    if (!debugs[set]) {
      if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
        var pid = process.pid;

        debugs[set] = function () {
          var msg = exports.format.apply(exports, arguments);
          console.error('%s %d: %s', set, pid, msg);
        };
      } else {
        debugs[set] = function () {};
      }
    }

    return debugs[set];
  };
  /**
   * Echos the value of a value. Trys to print the value out
   * in the best way possible given the different types.
   *
   * @param {Object} obj The object to print out.
   * @param {Object} opts Optional options object that alters the output.
   */

  /* legacy: obj, showHidden, depth, colors*/


  function inspect(obj, opts) {
    // default options
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    }; // legacy...

    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];

    if (isBoolean(opts)) {
      // legacy...
      ctx.showHidden = opts;
    } else if (opts) {
      // got an "options" object
      exports._extend(ctx, opts);
    } // set default options


    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }

  exports.inspect = inspect; // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

  inspect.colors = {
    'bold': [1, 22],
    'italic': [3, 23],
    'underline': [4, 24],
    'inverse': [7, 27],
    'white': [37, 39],
    'grey': [90, 39],
    'black': [30, 39],
    'blue': [34, 39],
    'cyan': [36, 39],
    'green': [32, 39],
    'magenta': [35, 39],
    'red': [31, 39],
    'yellow': [33, 39]
  }; // Don't use 'blue' not visible on cmd.exe

  inspect.styles = {
    'special': 'cyan',
    'number': 'yellow',
    'boolean': 'yellow',
    'undefined': 'grey',
    'null': 'bold',
    'string': 'green',
    'date': 'magenta',
    // "name": intentionally not styling
    'regexp': 'red'
  };

  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];

    if (style) {
      return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
    } else {
      return str;
    }
  }

  function stylizeNoColor(str, styleType) {
    return str;
  }

  function arrayToHash(array) {
    var hash = {};
    array.forEach(function (val, idx) {
      hash[val] = true;
    });
    return hash;
  }

  function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
    value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);

      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }

      return ret;
    } // Primitive types cannot have properties


    var primitive = formatPrimitive(ctx, value);

    if (primitive) {
      return primitive;
    } // Look up the keys of the object.


    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);

    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    } // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


    if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
      return formatError(value);
    } // Some type of object without properties can be shortcutted.


    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ': ' + value.name : '';
        return ctx.stylize('[Function' + name + ']', 'special');
      }

      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      }

      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), 'date');
      }

      if (isError(value)) {
        return formatError(value);
      }
    }

    var base = '',
        array = false,
        braces = ['{', '}']; // Make Array say that they are Array

    if (isArray(value)) {
      array = true;
      braces = ['[', ']'];
    } // Make functions say that they are functions


    if (isFunction(value)) {
      var n = value.name ? ': ' + value.name : '';
      base = ' [Function' + n + ']';
    } // Make RegExps say that they are RegExps


    if (isRegExp(value)) {
      base = ' ' + RegExp.prototype.toString.call(value);
    } // Make dates with properties first say the date


    if (isDate(value)) {
      base = ' ' + Date.prototype.toUTCString.call(value);
    } // Make error with message first say the error


    if (isError(value)) {
      base = ' ' + formatError(value);
    }

    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      } else {
        return ctx.stylize('[Object]', 'special');
      }
    }

    ctx.seen.push(value);
    var output;

    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function (key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }

    ctx.seen.pop();
    return reduceToSingleString(output, base, braces);
  }

  function formatPrimitive(ctx, value) {
    if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

    if (isString(value)) {
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');
    }

    if (isNumber(value)) return ctx.stylize('' + value, 'number');
    if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

    if (isNull(value)) return ctx.stylize('null', 'null');
  }

  function formatError(value) {
    return '[' + Error.prototype.toString.call(value) + ']';
  }

  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];

    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
      } else {
        output.push('');
      }
    }

    keys.forEach(function (key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
      }
    });
    return output;
  }

  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || {
      value: value[key]
    };

    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }

    if (!hasOwnProperty(visibleKeys, key)) {
      name = '[' + key + ']';
    }

    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }

        if (str.indexOf('\n') > -1) {
          if (array) {
            str = str.split('\n').map(function (line) {
              return '  ' + line;
            }).join('\n').substr(2);
          } else {
            str = '\n' + str.split('\n').map(function (line) {
              return '   ' + line;
            }).join('\n');
          }
        }
      } else {
        str = ctx.stylize('[Circular]', 'special');
      }
    }

    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }

      name = JSON.stringify('' + key);

      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, 'name');
      } else {
        name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, 'string');
      }
    }

    return name + ': ' + str;
  }

  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function (prev, cur) {
      if (cur.indexOf('\n') >= 0) ;
      return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);

    if (length > 60) {
      return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
    }

    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
  } // NOTE: These type checking functions intentionally don't use `instanceof`
  // because it is fragile and can be easily faked with `Object.create()`.


  function isArray(ar) {
    return Array.isArray(ar);
  }

  exports.isArray = isArray;

  function isBoolean(arg) {
    return typeof arg === 'boolean';
  }

  exports.isBoolean = isBoolean;

  function isNull(arg) {
    return arg === null;
  }

  exports.isNull = isNull;

  function isNullOrUndefined(arg) {
    return arg == null;
  }

  exports.isNullOrUndefined = isNullOrUndefined;

  function isNumber(arg) {
    return typeof arg === 'number';
  }

  exports.isNumber = isNumber;

  function isString(arg) {
    return typeof arg === 'string';
  }

  exports.isString = isString;

  function isSymbol(arg) {
    return typeof arg === 'symbol';
  }

  exports.isSymbol = isSymbol;

  function isUndefined(arg) {
    return arg === void 0;
  }

  exports.isUndefined = isUndefined;

  function isRegExp(re) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
  }

  exports.isRegExp = isRegExp;

  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }

  exports.isObject = isObject;

  function isDate(d) {
    return isObject(d) && objectToString(d) === '[object Date]';
  }

  exports.isDate = isDate;

  function isError(e) {
    return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
  }

  exports.isError = isError;

  function isFunction(arg) {
    return typeof arg === 'function';
  }

  exports.isFunction = isFunction;

  function isPrimitive(arg) {
    return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
    typeof arg === 'undefined';
  }

  exports.isPrimitive = isPrimitive;
  exports.isBuffer = isBuffer;

  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }

  function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
  }

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 26 Feb 16:19:34

  function timestamp() {
    var d = new Date();
    var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
    return [d.getDate(), months[d.getMonth()], time].join(' ');
  } // log is just a thin wrapper to console.log that prepends a timestamp


  exports.log = function () {
    console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
  };
  /**
   * Inherit the prototype methods from one constructor into another.
   *
   * The Function.prototype.inherits from lang.js rewritten as a standalone
   * function (not on Function.prototype). NOTE: If this file is to be loaded
   * during bootstrapping this function needs to be rewritten using some native
   * functions as prototype setup using normal JavaScript does not work as
   * expected during bootstrapping (see mirror.js in r114903).
   *
   * @param {function} ctor Constructor function which needs to inherit the
   *     prototype.
   * @param {function} superCtor Constructor function to inherit prototype from.
   */


  exports.inherits = inherits.exports;

  exports._extend = function (origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject(add)) return origin;
    var keys = Object.keys(add);
    var i = keys.length;

    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }

    return origin;
  };

  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
})(util$2);

var utils$2 = {};

/*!
 * markdown-it-regexp
 * Copyright (c) 2014 Alex Kocharin
 * MIT Licensed
 */
/**
 * Escape special characters in the given string of html.
 *
 * Borrowed from escape-html component, MIT-licensed
 */

utils$2.escape = function (html) {
  return String(html).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/*!
 * markdown-it-regexp
 * Copyright (c) 2014 Alex Kocharin
 * MIT Licensed
 */
/**
 * Module dependencies.
 */

var util = util$2;
var stuff = utils$2;
/**
 * Counter for multi usage.
 */

var counter = 0;
/**
 * Expose `Plugin`
 */

var lib$2 = Plugin;
/**
 * Constructor function
 */

function Plugin(regexp, replacer) {
  // return value should be a callable function
  // with strictly defined options passed by markdown-it
  var self = function (md, options) {
    self.options = options;
    self.init(md);
  }; // initialize plugin object


  self.__proto__ = Plugin.prototype; // clone regexp with all the flags

  var flags = (regexp.global ? 'g' : '') + (regexp.multiline ? 'm' : '') + (regexp.ignoreCase ? 'i' : '');
  self.regexp = RegExp('^' + regexp.source, flags); // copy init options

  self.replacer = replacer; // this plugin can be inserted multiple times,
  // so we're generating unique name for it

  self.id = 'regexp-' + counter;
  counter++;
  return self;
}

util.inherits(Plugin, Function); // function that registers plugin with markdown-it

Plugin.prototype.init = function (md) {
  md.inline.ruler.push(this.id, this.parse.bind(this));
  md.renderer.rules[this.id] = this.render.bind(this);
};

Plugin.prototype.parse = function (state, silent) {
  // slowwww... maybe use an advanced regexp engine for this
  var match = this.regexp.exec(state.src.slice(state.pos));
  if (!match) return false; // valid match found, now we need to advance cursor

  state.pos += match[0].length; // don't insert any tokens in silent mode

  if (silent) return true;
  var token = state.push(this.id, '', 0);
  token.meta = {
    match: match
  };
  return true;
};

Plugin.prototype.render = function (tokens, id, options, env) {
  return this.replacer(tokens[id].meta.match, stuff);
};

var markdownItRegexp = lib$2;

var utils$1 = {};

var Aacute = "Á";
var aacute = "á";
var Abreve = "Ă";
var abreve = "ă";
var ac = "∾";
var acd = "∿";
var acE = "∾̳";
var Acirc = "Â";
var acirc = "â";
var acute = "´";
var Acy = "А";
var acy = "а";
var AElig = "Æ";
var aelig = "æ";
var af = "⁡";
var Afr = "𝔄";
var afr = "𝔞";
var Agrave = "À";
var agrave = "à";
var alefsym = "ℵ";
var aleph = "ℵ";
var Alpha = "Α";
var alpha = "α";
var Amacr = "Ā";
var amacr = "ā";
var amalg = "⨿";
var amp = "&";
var AMP = "&";
var andand = "⩕";
var And = "⩓";
var and = "∧";
var andd = "⩜";
var andslope = "⩘";
var andv = "⩚";
var ang = "∠";
var ange = "⦤";
var angle = "∠";
var angmsdaa = "⦨";
var angmsdab = "⦩";
var angmsdac = "⦪";
var angmsdad = "⦫";
var angmsdae = "⦬";
var angmsdaf = "⦭";
var angmsdag = "⦮";
var angmsdah = "⦯";
var angmsd = "∡";
var angrt = "∟";
var angrtvb = "⊾";
var angrtvbd = "⦝";
var angsph = "∢";
var angst = "Å";
var angzarr = "⍼";
var Aogon = "Ą";
var aogon = "ą";
var Aopf = "𝔸";
var aopf = "𝕒";
var apacir = "⩯";
var ap = "≈";
var apE = "⩰";
var ape = "≊";
var apid = "≋";
var apos = "'";
var ApplyFunction = "⁡";
var approx = "≈";
var approxeq = "≊";
var Aring = "Å";
var aring = "å";
var Ascr = "𝒜";
var ascr = "𝒶";
var Assign = "≔";
var ast = "*";
var asymp = "≈";
var asympeq = "≍";
var Atilde = "Ã";
var atilde = "ã";
var Auml = "Ä";
var auml = "ä";
var awconint = "∳";
var awint = "⨑";
var backcong = "≌";
var backepsilon = "϶";
var backprime = "‵";
var backsim = "∽";
var backsimeq = "⋍";
var Backslash = "∖";
var Barv = "⫧";
var barvee = "⊽";
var barwed = "⌅";
var Barwed = "⌆";
var barwedge = "⌅";
var bbrk = "⎵";
var bbrktbrk = "⎶";
var bcong = "≌";
var Bcy = "Б";
var bcy = "б";
var bdquo = "„";
var becaus = "∵";
var because = "∵";
var Because = "∵";
var bemptyv = "⦰";
var bepsi = "϶";
var bernou = "ℬ";
var Bernoullis = "ℬ";
var Beta = "Β";
var beta = "β";
var beth = "ℶ";
var between = "≬";
var Bfr = "𝔅";
var bfr = "𝔟";
var bigcap = "⋂";
var bigcirc = "◯";
var bigcup = "⋃";
var bigodot = "⨀";
var bigoplus = "⨁";
var bigotimes = "⨂";
var bigsqcup = "⨆";
var bigstar = "★";
var bigtriangledown = "▽";
var bigtriangleup = "△";
var biguplus = "⨄";
var bigvee = "⋁";
var bigwedge = "⋀";
var bkarow = "⤍";
var blacklozenge = "⧫";
var blacksquare = "▪";
var blacktriangle = "▴";
var blacktriangledown = "▾";
var blacktriangleleft = "◂";
var blacktriangleright = "▸";
var blank = "␣";
var blk12 = "▒";
var blk14 = "░";
var blk34 = "▓";
var block$1 = "█";
var bne = "=⃥";
var bnequiv = "≡⃥";
var bNot = "⫭";
var bnot = "⌐";
var Bopf = "𝔹";
var bopf = "𝕓";
var bot = "⊥";
var bottom = "⊥";
var bowtie = "⋈";
var boxbox = "⧉";
var boxdl = "┐";
var boxdL = "╕";
var boxDl = "╖";
var boxDL = "╗";
var boxdr = "┌";
var boxdR = "╒";
var boxDr = "╓";
var boxDR = "╔";
var boxh = "─";
var boxH = "═";
var boxhd = "┬";
var boxHd = "╤";
var boxhD = "╥";
var boxHD = "╦";
var boxhu = "┴";
var boxHu = "╧";
var boxhU = "╨";
var boxHU = "╩";
var boxminus = "⊟";
var boxplus = "⊞";
var boxtimes = "⊠";
var boxul = "┘";
var boxuL = "╛";
var boxUl = "╜";
var boxUL = "╝";
var boxur = "└";
var boxuR = "╘";
var boxUr = "╙";
var boxUR = "╚";
var boxv = "│";
var boxV = "║";
var boxvh = "┼";
var boxvH = "╪";
var boxVh = "╫";
var boxVH = "╬";
var boxvl = "┤";
var boxvL = "╡";
var boxVl = "╢";
var boxVL = "╣";
var boxvr = "├";
var boxvR = "╞";
var boxVr = "╟";
var boxVR = "╠";
var bprime = "‵";
var breve = "˘";
var Breve = "˘";
var brvbar = "¦";
var bscr = "𝒷";
var Bscr = "ℬ";
var bsemi = "⁏";
var bsim = "∽";
var bsime = "⋍";
var bsolb = "⧅";
var bsol = "\\";
var bsolhsub = "⟈";
var bull = "•";
var bullet = "•";
var bump = "≎";
var bumpE = "⪮";
var bumpe = "≏";
var Bumpeq = "≎";
var bumpeq = "≏";
var Cacute = "Ć";
var cacute = "ć";
var capand = "⩄";
var capbrcup = "⩉";
var capcap = "⩋";
var cap = "∩";
var Cap = "⋒";
var capcup = "⩇";
var capdot = "⩀";
var CapitalDifferentialD = "ⅅ";
var caps = "∩︀";
var caret = "⁁";
var caron = "ˇ";
var Cayleys = "ℭ";
var ccaps = "⩍";
var Ccaron = "Č";
var ccaron = "č";
var Ccedil = "Ç";
var ccedil = "ç";
var Ccirc = "Ĉ";
var ccirc = "ĉ";
var Cconint = "∰";
var ccups = "⩌";
var ccupssm = "⩐";
var Cdot = "Ċ";
var cdot = "ċ";
var cedil = "¸";
var Cedilla = "¸";
var cemptyv = "⦲";
var cent = "¢";
var centerdot = "·";
var CenterDot = "·";
var cfr = "𝔠";
var Cfr = "ℭ";
var CHcy = "Ч";
var chcy = "ч";
var check = "✓";
var checkmark = "✓";
var Chi = "Χ";
var chi = "χ";
var circ = "ˆ";
var circeq = "≗";
var circlearrowleft = "↺";
var circlearrowright = "↻";
var circledast = "⊛";
var circledcirc = "⊚";
var circleddash = "⊝";
var CircleDot = "⊙";
var circledR = "®";
var circledS = "Ⓢ";
var CircleMinus = "⊖";
var CirclePlus = "⊕";
var CircleTimes = "⊗";
var cir = "○";
var cirE = "⧃";
var cire = "≗";
var cirfnint = "⨐";
var cirmid = "⫯";
var cirscir = "⧂";
var ClockwiseContourIntegral = "∲";
var CloseCurlyDoubleQuote = "”";
var CloseCurlyQuote = "’";
var clubs$1 = "♣";
var clubsuit = "♣";
var colon = ":";
var Colon = "∷";
var Colone = "⩴";
var colone = "≔";
var coloneq = "≔";
var comma = ",";
var commat = "@";
var comp = "∁";
var compfn = "∘";
var complement = "∁";
var complexes = "ℂ";
var cong = "≅";
var congdot = "⩭";
var Congruent = "≡";
var conint = "∮";
var Conint = "∯";
var ContourIntegral = "∮";
var copf = "𝕔";
var Copf = "ℂ";
var coprod = "∐";
var Coproduct = "∐";
var copy = "©";
var COPY = "©";
var copysr = "℗";
var CounterClockwiseContourIntegral = "∳";
var crarr = "↵";
var cross = "✗";
var Cross = "⨯";
var Cscr = "𝒞";
var cscr = "𝒸";
var csub = "⫏";
var csube = "⫑";
var csup = "⫐";
var csupe = "⫒";
var ctdot = "⋯";
var cudarrl = "⤸";
var cudarrr = "⤵";
var cuepr = "⋞";
var cuesc = "⋟";
var cularr = "↶";
var cularrp = "⤽";
var cupbrcap = "⩈";
var cupcap = "⩆";
var CupCap = "≍";
var cup = "∪";
var Cup = "⋓";
var cupcup = "⩊";
var cupdot = "⊍";
var cupor = "⩅";
var cups = "∪︀";
var curarr = "↷";
var curarrm = "⤼";
var curlyeqprec = "⋞";
var curlyeqsucc = "⋟";
var curlyvee = "⋎";
var curlywedge = "⋏";
var curren = "¤";
var curvearrowleft = "↶";
var curvearrowright = "↷";
var cuvee = "⋎";
var cuwed = "⋏";
var cwconint = "∲";
var cwint = "∱";
var cylcty = "⌭";
var dagger$1 = "†";
var Dagger = "‡";
var daleth = "ℸ";
var darr = "↓";
var Darr = "↡";
var dArr = "⇓";
var dash$1 = "‐";
var Dashv = "⫤";
var dashv = "⊣";
var dbkarow = "⤏";
var dblac = "˝";
var Dcaron = "Ď";
var dcaron = "ď";
var Dcy = "Д";
var dcy = "д";
var ddagger = "‡";
var ddarr = "⇊";
var DD = "ⅅ";
var dd = "ⅆ";
var DDotrahd = "⤑";
var ddotseq = "⩷";
var deg = "°";
var Del = "∇";
var Delta = "Δ";
var delta = "δ";
var demptyv = "⦱";
var dfisht = "⥿";
var Dfr = "𝔇";
var dfr = "𝔡";
var dHar = "⥥";
var dharl = "⇃";
var dharr = "⇂";
var DiacriticalAcute = "´";
var DiacriticalDot = "˙";
var DiacriticalDoubleAcute = "˝";
var DiacriticalGrave = "`";
var DiacriticalTilde = "˜";
var diam = "⋄";
var diamond = "⋄";
var Diamond = "⋄";
var diamondsuit = "♦";
var diams = "♦";
var die = "¨";
var DifferentialD = "ⅆ";
var digamma = "ϝ";
var disin = "⋲";
var div = "÷";
var divide = "÷";
var divideontimes = "⋇";
var divonx = "⋇";
var DJcy = "Ђ";
var djcy = "ђ";
var dlcorn = "⌞";
var dlcrop = "⌍";
var dollar$1 = "$";
var Dopf = "𝔻";
var dopf = "𝕕";
var Dot = "¨";
var dot = "˙";
var DotDot = "⃜";
var doteq = "≐";
var doteqdot = "≑";
var DotEqual = "≐";
var dotminus = "∸";
var dotplus = "∔";
var dotsquare = "⊡";
var doublebarwedge = "⌆";
var DoubleContourIntegral = "∯";
var DoubleDot = "¨";
var DoubleDownArrow = "⇓";
var DoubleLeftArrow = "⇐";
var DoubleLeftRightArrow = "⇔";
var DoubleLeftTee = "⫤";
var DoubleLongLeftArrow = "⟸";
var DoubleLongLeftRightArrow = "⟺";
var DoubleLongRightArrow = "⟹";
var DoubleRightArrow = "⇒";
var DoubleRightTee = "⊨";
var DoubleUpArrow = "⇑";
var DoubleUpDownArrow = "⇕";
var DoubleVerticalBar = "∥";
var DownArrowBar = "⤓";
var downarrow = "↓";
var DownArrow = "↓";
var Downarrow = "⇓";
var DownArrowUpArrow = "⇵";
var DownBreve = "̑";
var downdownarrows = "⇊";
var downharpoonleft = "⇃";
var downharpoonright = "⇂";
var DownLeftRightVector = "⥐";
var DownLeftTeeVector = "⥞";
var DownLeftVectorBar = "⥖";
var DownLeftVector = "↽";
var DownRightTeeVector = "⥟";
var DownRightVectorBar = "⥗";
var DownRightVector = "⇁";
var DownTeeArrow = "↧";
var DownTee = "⊤";
var drbkarow = "⤐";
var drcorn = "⌟";
var drcrop = "⌌";
var Dscr = "𝒟";
var dscr = "𝒹";
var DScy = "Ѕ";
var dscy = "ѕ";
var dsol = "⧶";
var Dstrok = "Đ";
var dstrok = "đ";
var dtdot = "⋱";
var dtri = "▿";
var dtrif = "▾";
var duarr = "⇵";
var duhar = "⥯";
var dwangle = "⦦";
var DZcy = "Џ";
var dzcy = "џ";
var dzigrarr = "⟿";
var Eacute = "É";
var eacute = "é";
var easter = "⩮";
var Ecaron = "Ě";
var ecaron = "ě";
var Ecirc = "Ê";
var ecirc = "ê";
var ecir = "≖";
var ecolon = "≕";
var Ecy = "Э";
var ecy = "э";
var eDDot = "⩷";
var Edot = "Ė";
var edot = "ė";
var eDot = "≑";
var ee = "ⅇ";
var efDot = "≒";
var Efr = "𝔈";
var efr = "𝔢";
var eg = "⪚";
var Egrave = "È";
var egrave = "è";
var egs = "⪖";
var egsdot = "⪘";
var el = "⪙";
var Element = "∈";
var elinters = "⏧";
var ell = "ℓ";
var els = "⪕";
var elsdot = "⪗";
var Emacr = "Ē";
var emacr = "ē";
var empty = "∅";
var emptyset = "∅";
var EmptySmallSquare = "◻";
var emptyv = "∅";
var EmptyVerySmallSquare = "▫";
var emsp13 = " ";
var emsp14 = " ";
var emsp = " ";
var ENG = "Ŋ";
var eng = "ŋ";
var ensp = " ";
var Eogon = "Ę";
var eogon = "ę";
var Eopf = "𝔼";
var eopf = "𝕖";
var epar = "⋕";
var eparsl = "⧣";
var eplus = "⩱";
var epsi = "ε";
var Epsilon = "Ε";
var epsilon = "ε";
var epsiv = "ϵ";
var eqcirc = "≖";
var eqcolon = "≕";
var eqsim = "≂";
var eqslantgtr = "⪖";
var eqslantless = "⪕";
var Equal = "⩵";
var equals = "=";
var EqualTilde = "≂";
var equest = "≟";
var Equilibrium = "⇌";
var equiv = "≡";
var equivDD = "⩸";
var eqvparsl = "⧥";
var erarr = "⥱";
var erDot = "≓";
var escr = "ℯ";
var Escr = "ℰ";
var esdot = "≐";
var Esim = "⩳";
var esim = "≂";
var Eta = "Η";
var eta = "η";
var ETH = "Ð";
var eth = "ð";
var Euml = "Ë";
var euml = "ë";
var euro$1 = "€";
var excl = "!";
var exist = "∃";
var Exists = "∃";
var expectation = "ℰ";
var exponentiale = "ⅇ";
var ExponentialE = "ⅇ";
var fallingdotseq = "≒";
var Fcy = "Ф";
var fcy = "ф";
var female = "♀";
var ffilig = "ﬃ";
var fflig = "ﬀ";
var ffllig = "ﬄ";
var Ffr = "𝔉";
var ffr = "𝔣";
var filig = "ﬁ";
var FilledSmallSquare = "◼";
var FilledVerySmallSquare = "▪";
var fjlig = "fj";
var flat = "♭";
var fllig = "ﬂ";
var fltns = "▱";
var fnof = "ƒ";
var Fopf = "𝔽";
var fopf = "𝕗";
var forall = "∀";
var ForAll = "∀";
var fork = "⋔";
var forkv = "⫙";
var Fouriertrf = "ℱ";
var fpartint = "⨍";
var frac12 = "½";
var frac13 = "⅓";
var frac14 = "¼";
var frac15 = "⅕";
var frac16 = "⅙";
var frac18 = "⅛";
var frac23 = "⅔";
var frac25 = "⅖";
var frac34 = "¾";
var frac35 = "⅗";
var frac38 = "⅜";
var frac45 = "⅘";
var frac56 = "⅚";
var frac58 = "⅝";
var frac78 = "⅞";
var frasl = "⁄";
var frown = "⌢";
var fscr = "𝒻";
var Fscr = "ℱ";
var gacute = "ǵ";
var Gamma = "Γ";
var gamma = "γ";
var Gammad = "Ϝ";
var gammad = "ϝ";
var gap = "⪆";
var Gbreve = "Ğ";
var gbreve = "ğ";
var Gcedil = "Ģ";
var Gcirc = "Ĝ";
var gcirc = "ĝ";
var Gcy = "Г";
var gcy = "г";
var Gdot = "Ġ";
var gdot = "ġ";
var ge = "≥";
var gE = "≧";
var gEl = "⪌";
var gel = "⋛";
var geq = "≥";
var geqq = "≧";
var geqslant = "⩾";
var gescc = "⪩";
var ges = "⩾";
var gesdot = "⪀";
var gesdoto = "⪂";
var gesdotol = "⪄";
var gesl = "⋛︀";
var gesles = "⪔";
var Gfr = "𝔊";
var gfr = "𝔤";
var gg = "≫";
var Gg = "⋙";
var ggg = "⋙";
var gimel = "ℷ";
var GJcy = "Ѓ";
var gjcy = "ѓ";
var gla = "⪥";
var gl = "≷";
var glE = "⪒";
var glj = "⪤";
var gnap = "⪊";
var gnapprox = "⪊";
var gne = "⪈";
var gnE = "≩";
var gneq = "⪈";
var gneqq = "≩";
var gnsim = "⋧";
var Gopf = "𝔾";
var gopf = "𝕘";
var grave = "`";
var GreaterEqual = "≥";
var GreaterEqualLess = "⋛";
var GreaterFullEqual = "≧";
var GreaterGreater = "⪢";
var GreaterLess = "≷";
var GreaterSlantEqual = "⩾";
var GreaterTilde = "≳";
var Gscr = "𝒢";
var gscr = "ℊ";
var gsim = "≳";
var gsime = "⪎";
var gsiml = "⪐";
var gtcc = "⪧";
var gtcir = "⩺";
var gt = ">";
var GT = ">";
var Gt = "≫";
var gtdot = "⋗";
var gtlPar = "⦕";
var gtquest = "⩼";
var gtrapprox = "⪆";
var gtrarr = "⥸";
var gtrdot = "⋗";
var gtreqless = "⋛";
var gtreqqless = "⪌";
var gtrless = "≷";
var gtrsim = "≳";
var gvertneqq = "≩︀";
var gvnE = "≩︀";
var Hacek = "ˇ";
var hairsp = " ";
var half = "½";
var hamilt = "ℋ";
var HARDcy = "Ъ";
var hardcy = "ъ";
var harrcir = "⥈";
var harr = "↔";
var hArr = "⇔";
var harrw = "↭";
var Hat = "^";
var hbar = "ℏ";
var Hcirc = "Ĥ";
var hcirc = "ĥ";
var hearts$1 = "♥";
var heartsuit = "♥";
var hellip = "…";
var hercon = "⊹";
var hfr = "𝔥";
var Hfr = "ℌ";
var HilbertSpace = "ℋ";
var hksearow = "⤥";
var hkswarow = "⤦";
var hoarr = "⇿";
var homtht = "∻";
var hookleftarrow = "↩";
var hookrightarrow = "↪";
var hopf = "𝕙";
var Hopf = "ℍ";
var horbar = "―";
var HorizontalLine = "─";
var hscr = "𝒽";
var Hscr = "ℋ";
var hslash = "ℏ";
var Hstrok = "Ħ";
var hstrok = "ħ";
var HumpDownHump = "≎";
var HumpEqual = "≏";
var hybull = "⁃";
var hyphen = "‐";
var Iacute = "Í";
var iacute = "í";
var ic = "⁣";
var Icirc = "Î";
var icirc = "î";
var Icy = "И";
var icy = "и";
var Idot = "İ";
var IEcy = "Е";
var iecy = "е";
var iexcl = "¡";
var iff = "⇔";
var ifr = "𝔦";
var Ifr = "ℑ";
var Igrave = "Ì";
var igrave = "ì";
var ii = "ⅈ";
var iiiint = "⨌";
var iiint = "∭";
var iinfin = "⧜";
var iiota = "℩";
var IJlig = "Ĳ";
var ijlig = "ĳ";
var Imacr = "Ī";
var imacr = "ī";
var image$1 = "ℑ";
var ImaginaryI = "ⅈ";
var imagline = "ℐ";
var imagpart = "ℑ";
var imath = "ı";
var Im = "ℑ";
var imof = "⊷";
var imped = "Ƶ";
var Implies = "⇒";
var incare = "℅";
var infin = "∞";
var infintie = "⧝";
var inodot = "ı";
var intcal = "⊺";
var int = "∫";
var Int = "∬";
var integers = "ℤ";
var Integral = "∫";
var intercal = "⊺";
var Intersection = "⋂";
var intlarhk = "⨗";
var intprod = "⨼";
var InvisibleComma = "⁣";
var InvisibleTimes = "⁢";
var IOcy = "Ё";
var iocy = "ё";
var Iogon = "Į";
var iogon = "į";
var Iopf = "𝕀";
var iopf = "𝕚";
var Iota = "Ι";
var iota = "ι";
var iprod = "⨼";
var iquest = "¿";
var iscr = "𝒾";
var Iscr = "ℐ";
var isin = "∈";
var isindot = "⋵";
var isinE = "⋹";
var isins = "⋴";
var isinsv = "⋳";
var isinv = "∈";
var it$1 = "⁢";
var Itilde = "Ĩ";
var itilde = "ĩ";
var Iukcy = "І";
var iukcy = "і";
var Iuml = "Ï";
var iuml = "ï";
var Jcirc = "Ĵ";
var jcirc = "ĵ";
var Jcy = "Й";
var jcy = "й";
var Jfr = "𝔍";
var jfr = "𝔧";
var jmath = "ȷ";
var Jopf = "𝕁";
var jopf = "𝕛";
var Jscr = "𝒥";
var jscr = "𝒿";
var Jsercy = "Ј";
var jsercy = "ј";
var Jukcy = "Є";
var jukcy = "є";
var Kappa = "Κ";
var kappa = "κ";
var kappav = "ϰ";
var Kcedil = "Ķ";
var kcedil = "ķ";
var Kcy = "К";
var kcy = "к";
var Kfr = "𝔎";
var kfr = "𝔨";
var kgreen = "ĸ";
var KHcy = "Х";
var khcy = "х";
var KJcy = "Ќ";
var kjcy = "ќ";
var Kopf = "𝕂";
var kopf = "𝕜";
var Kscr = "𝒦";
var kscr = "𝓀";
var lAarr = "⇚";
var Lacute = "Ĺ";
var lacute = "ĺ";
var laemptyv = "⦴";
var lagran = "ℒ";
var Lambda = "Λ";
var lambda = "λ";
var lang = "⟨";
var Lang = "⟪";
var langd = "⦑";
var langle = "⟨";
var lap = "⪅";
var Laplacetrf = "ℒ";
var laquo = "«";
var larrb = "⇤";
var larrbfs = "⤟";
var larr = "←";
var Larr = "↞";
var lArr = "⇐";
var larrfs = "⤝";
var larrhk = "↩";
var larrlp = "↫";
var larrpl = "⤹";
var larrsim = "⥳";
var larrtl = "↢";
var latail = "⤙";
var lAtail = "⤛";
var lat = "⪫";
var late = "⪭";
var lates = "⪭︀";
var lbarr = "⤌";
var lBarr = "⤎";
var lbbrk = "❲";
var lbrace = "{";
var lbrack = "[";
var lbrke = "⦋";
var lbrksld = "⦏";
var lbrkslu = "⦍";
var Lcaron = "Ľ";
var lcaron = "ľ";
var Lcedil = "Ļ";
var lcedil = "ļ";
var lceil = "⌈";
var lcub = "{";
var Lcy = "Л";
var lcy = "л";
var ldca = "⤶";
var ldquo = "“";
var ldquor = "„";
var ldrdhar = "⥧";
var ldrushar = "⥋";
var ldsh = "↲";
var le = "≤";
var lE = "≦";
var LeftAngleBracket = "⟨";
var LeftArrowBar = "⇤";
var leftarrow = "←";
var LeftArrow = "←";
var Leftarrow = "⇐";
var LeftArrowRightArrow = "⇆";
var leftarrowtail = "↢";
var LeftCeiling = "⌈";
var LeftDoubleBracket = "⟦";
var LeftDownTeeVector = "⥡";
var LeftDownVectorBar = "⥙";
var LeftDownVector = "⇃";
var LeftFloor = "⌊";
var leftharpoondown = "↽";
var leftharpoonup = "↼";
var leftleftarrows = "⇇";
var leftrightarrow = "↔";
var LeftRightArrow = "↔";
var Leftrightarrow = "⇔";
var leftrightarrows = "⇆";
var leftrightharpoons = "⇋";
var leftrightsquigarrow = "↭";
var LeftRightVector = "⥎";
var LeftTeeArrow = "↤";
var LeftTee = "⊣";
var LeftTeeVector = "⥚";
var leftthreetimes = "⋋";
var LeftTriangleBar = "⧏";
var LeftTriangle = "⊲";
var LeftTriangleEqual = "⊴";
var LeftUpDownVector = "⥑";
var LeftUpTeeVector = "⥠";
var LeftUpVectorBar = "⥘";
var LeftUpVector = "↿";
var LeftVectorBar = "⥒";
var LeftVector = "↼";
var lEg = "⪋";
var leg = "⋚";
var leq = "≤";
var leqq = "≦";
var leqslant = "⩽";
var lescc = "⪨";
var les = "⩽";
var lesdot = "⩿";
var lesdoto = "⪁";
var lesdotor = "⪃";
var lesg = "⋚︀";
var lesges = "⪓";
var lessapprox = "⪅";
var lessdot = "⋖";
var lesseqgtr = "⋚";
var lesseqqgtr = "⪋";
var LessEqualGreater = "⋚";
var LessFullEqual = "≦";
var LessGreater = "≶";
var lessgtr = "≶";
var LessLess = "⪡";
var lesssim = "≲";
var LessSlantEqual = "⩽";
var LessTilde = "≲";
var lfisht = "⥼";
var lfloor = "⌊";
var Lfr = "𝔏";
var lfr = "𝔩";
var lg = "≶";
var lgE = "⪑";
var lHar = "⥢";
var lhard = "↽";
var lharu = "↼";
var lharul = "⥪";
var lhblk = "▄";
var LJcy = "Љ";
var ljcy = "љ";
var llarr = "⇇";
var ll = "≪";
var Ll = "⋘";
var llcorner = "⌞";
var Lleftarrow = "⇚";
var llhard = "⥫";
var lltri = "◺";
var Lmidot = "Ŀ";
var lmidot = "ŀ";
var lmoustache = "⎰";
var lmoust = "⎰";
var lnap = "⪉";
var lnapprox = "⪉";
var lne = "⪇";
var lnE = "≨";
var lneq = "⪇";
var lneqq = "≨";
var lnsim = "⋦";
var loang = "⟬";
var loarr = "⇽";
var lobrk = "⟦";
var longleftarrow = "⟵";
var LongLeftArrow = "⟵";
var Longleftarrow = "⟸";
var longleftrightarrow = "⟷";
var LongLeftRightArrow = "⟷";
var Longleftrightarrow = "⟺";
var longmapsto = "⟼";
var longrightarrow = "⟶";
var LongRightArrow = "⟶";
var Longrightarrow = "⟹";
var looparrowleft = "↫";
var looparrowright = "↬";
var lopar = "⦅";
var Lopf = "𝕃";
var lopf = "𝕝";
var loplus = "⨭";
var lotimes = "⨴";
var lowast = "∗";
var lowbar = "_";
var LowerLeftArrow = "↙";
var LowerRightArrow = "↘";
var loz = "◊";
var lozenge = "◊";
var lozf = "⧫";
var lpar = "(";
var lparlt = "⦓";
var lrarr = "⇆";
var lrcorner = "⌟";
var lrhar = "⇋";
var lrhard = "⥭";
var lrm = "‎";
var lrtri = "⊿";
var lsaquo = "‹";
var lscr = "𝓁";
var Lscr = "ℒ";
var lsh = "↰";
var Lsh = "↰";
var lsim = "≲";
var lsime = "⪍";
var lsimg = "⪏";
var lsqb = "[";
var lsquo = "‘";
var lsquor = "‚";
var Lstrok = "Ł";
var lstrok = "ł";
var ltcc = "⪦";
var ltcir = "⩹";
var lt = "<";
var LT = "<";
var Lt = "≪";
var ltdot = "⋖";
var lthree = "⋋";
var ltimes = "⋉";
var ltlarr = "⥶";
var ltquest = "⩻";
var ltri = "◃";
var ltrie = "⊴";
var ltrif = "◂";
var ltrPar = "⦖";
var lurdshar = "⥊";
var luruhar = "⥦";
var lvertneqq = "≨︀";
var lvnE = "≨︀";
var macr = "¯";
var male = "♂";
var malt = "✠";
var maltese = "✠";
var map = "↦";
var mapsto = "↦";
var mapstodown = "↧";
var mapstoleft = "↤";
var mapstoup = "↥";
var marker = "▮";
var mcomma = "⨩";
var Mcy = "М";
var mcy = "м";
var mdash = "—";
var mDDot = "∺";
var measuredangle = "∡";
var MediumSpace = " ";
var Mellintrf = "ℳ";
var Mfr = "𝔐";
var mfr = "𝔪";
var mho = "℧";
var micro = "µ";
var midast = "*";
var midcir = "⫰";
var mid = "∣";
var middot = "·";
var minusb = "⊟";
var minus = "−";
var minusd = "∸";
var minusdu = "⨪";
var MinusPlus = "∓";
var mlcp = "⫛";
var mldr = "…";
var mnplus = "∓";
var models = "⊧";
var Mopf = "𝕄";
var mopf = "𝕞";
var mp = "∓";
var mscr = "𝓂";
var Mscr = "ℳ";
var mstpos = "∾";
var Mu = "Μ";
var mu = "μ";
var multimap = "⊸";
var mumap = "⊸";
var nabla = "∇";
var Nacute = "Ń";
var nacute = "ń";
var nang = "∠⃒";
var nap = "≉";
var napE = "⩰̸";
var napid = "≋̸";
var napos = "ŉ";
var napprox = "≉";
var natural = "♮";
var naturals = "ℕ";
var natur = "♮";
var nbsp = " ";
var nbump = "≎̸";
var nbumpe = "≏̸";
var ncap = "⩃";
var Ncaron = "Ň";
var ncaron = "ň";
var Ncedil = "Ņ";
var ncedil = "ņ";
var ncong = "≇";
var ncongdot = "⩭̸";
var ncup = "⩂";
var Ncy = "Н";
var ncy = "н";
var ndash = "–";
var nearhk = "⤤";
var nearr = "↗";
var neArr = "⇗";
var nearrow = "↗";
var ne = "≠";
var nedot = "≐̸";
var NegativeMediumSpace = "​";
var NegativeThickSpace = "​";
var NegativeThinSpace = "​";
var NegativeVeryThinSpace = "​";
var nequiv = "≢";
var nesear = "⤨";
var nesim = "≂̸";
var NestedGreaterGreater = "≫";
var NestedLessLess = "≪";
var NewLine = "\n";
var nexist = "∄";
var nexists = "∄";
var Nfr = "𝔑";
var nfr = "𝔫";
var ngE = "≧̸";
var nge = "≱";
var ngeq = "≱";
var ngeqq = "≧̸";
var ngeqslant = "⩾̸";
var nges = "⩾̸";
var nGg = "⋙̸";
var ngsim = "≵";
var nGt = "≫⃒";
var ngt = "≯";
var ngtr = "≯";
var nGtv = "≫̸";
var nharr = "↮";
var nhArr = "⇎";
var nhpar = "⫲";
var ni = "∋";
var nis = "⋼";
var nisd = "⋺";
var niv = "∋";
var NJcy = "Њ";
var njcy = "њ";
var nlarr = "↚";
var nlArr = "⇍";
var nldr = "‥";
var nlE = "≦̸";
var nle = "≰";
var nleftarrow = "↚";
var nLeftarrow = "⇍";
var nleftrightarrow = "↮";
var nLeftrightarrow = "⇎";
var nleq = "≰";
var nleqq = "≦̸";
var nleqslant = "⩽̸";
var nles = "⩽̸";
var nless = "≮";
var nLl = "⋘̸";
var nlsim = "≴";
var nLt = "≪⃒";
var nlt = "≮";
var nltri = "⋪";
var nltrie = "⋬";
var nLtv = "≪̸";
var nmid = "∤";
var NoBreak = "⁠";
var NonBreakingSpace = " ";
var nopf = "𝕟";
var Nopf = "ℕ";
var Not = "⫬";
var not = "¬";
var NotCongruent = "≢";
var NotCupCap = "≭";
var NotDoubleVerticalBar = "∦";
var NotElement = "∉";
var NotEqual = "≠";
var NotEqualTilde = "≂̸";
var NotExists = "∄";
var NotGreater = "≯";
var NotGreaterEqual = "≱";
var NotGreaterFullEqual = "≧̸";
var NotGreaterGreater = "≫̸";
var NotGreaterLess = "≹";
var NotGreaterSlantEqual = "⩾̸";
var NotGreaterTilde = "≵";
var NotHumpDownHump = "≎̸";
var NotHumpEqual = "≏̸";
var notin = "∉";
var notindot = "⋵̸";
var notinE = "⋹̸";
var notinva = "∉";
var notinvb = "⋷";
var notinvc = "⋶";
var NotLeftTriangleBar = "⧏̸";
var NotLeftTriangle = "⋪";
var NotLeftTriangleEqual = "⋬";
var NotLess = "≮";
var NotLessEqual = "≰";
var NotLessGreater = "≸";
var NotLessLess = "≪̸";
var NotLessSlantEqual = "⩽̸";
var NotLessTilde = "≴";
var NotNestedGreaterGreater = "⪢̸";
var NotNestedLessLess = "⪡̸";
var notni = "∌";
var notniva = "∌";
var notnivb = "⋾";
var notnivc = "⋽";
var NotPrecedes = "⊀";
var NotPrecedesEqual = "⪯̸";
var NotPrecedesSlantEqual = "⋠";
var NotReverseElement = "∌";
var NotRightTriangleBar = "⧐̸";
var NotRightTriangle = "⋫";
var NotRightTriangleEqual = "⋭";
var NotSquareSubset = "⊏̸";
var NotSquareSubsetEqual = "⋢";
var NotSquareSuperset = "⊐̸";
var NotSquareSupersetEqual = "⋣";
var NotSubset = "⊂⃒";
var NotSubsetEqual = "⊈";
var NotSucceeds = "⊁";
var NotSucceedsEqual = "⪰̸";
var NotSucceedsSlantEqual = "⋡";
var NotSucceedsTilde = "≿̸";
var NotSuperset = "⊃⃒";
var NotSupersetEqual = "⊉";
var NotTilde = "≁";
var NotTildeEqual = "≄";
var NotTildeFullEqual = "≇";
var NotTildeTilde = "≉";
var NotVerticalBar = "∤";
var nparallel = "∦";
var npar = "∦";
var nparsl = "⫽⃥";
var npart = "∂̸";
var npolint = "⨔";
var npr = "⊀";
var nprcue = "⋠";
var nprec = "⊀";
var npreceq = "⪯̸";
var npre = "⪯̸";
var nrarrc = "⤳̸";
var nrarr = "↛";
var nrArr = "⇏";
var nrarrw = "↝̸";
var nrightarrow = "↛";
var nRightarrow = "⇏";
var nrtri = "⋫";
var nrtrie = "⋭";
var nsc = "⊁";
var nsccue = "⋡";
var nsce = "⪰̸";
var Nscr = "𝒩";
var nscr = "𝓃";
var nshortmid = "∤";
var nshortparallel = "∦";
var nsim = "≁";
var nsime = "≄";
var nsimeq = "≄";
var nsmid = "∤";
var nspar = "∦";
var nsqsube = "⋢";
var nsqsupe = "⋣";
var nsub = "⊄";
var nsubE = "⫅̸";
var nsube = "⊈";
var nsubset = "⊂⃒";
var nsubseteq = "⊈";
var nsubseteqq = "⫅̸";
var nsucc = "⊁";
var nsucceq = "⪰̸";
var nsup = "⊅";
var nsupE = "⫆̸";
var nsupe = "⊉";
var nsupset = "⊃⃒";
var nsupseteq = "⊉";
var nsupseteqq = "⫆̸";
var ntgl = "≹";
var Ntilde = "Ñ";
var ntilde = "ñ";
var ntlg = "≸";
var ntriangleleft = "⋪";
var ntrianglelefteq = "⋬";
var ntriangleright = "⋫";
var ntrianglerighteq = "⋭";
var Nu = "Ν";
var nu = "ν";
var num = "#";
var numero = "№";
var numsp = " ";
var nvap = "≍⃒";
var nvdash = "⊬";
var nvDash = "⊭";
var nVdash = "⊮";
var nVDash = "⊯";
var nvge = "≥⃒";
var nvgt = ">⃒";
var nvHarr = "⤄";
var nvinfin = "⧞";
var nvlArr = "⤂";
var nvle = "≤⃒";
var nvlt = "<⃒";
var nvltrie = "⊴⃒";
var nvrArr = "⤃";
var nvrtrie = "⊵⃒";
var nvsim = "∼⃒";
var nwarhk = "⤣";
var nwarr = "↖";
var nwArr = "⇖";
var nwarrow = "↖";
var nwnear = "⤧";
var Oacute = "Ó";
var oacute = "ó";
var oast = "⊛";
var Ocirc = "Ô";
var ocirc = "ô";
var ocir = "⊚";
var Ocy = "О";
var ocy = "о";
var odash = "⊝";
var Odblac = "Ő";
var odblac = "ő";
var odiv = "⨸";
var odot = "⊙";
var odsold = "⦼";
var OElig = "Œ";
var oelig = "œ";
var ofcir = "⦿";
var Ofr = "𝔒";
var ofr = "𝔬";
var ogon = "˛";
var Ograve = "Ò";
var ograve = "ò";
var ogt = "⧁";
var ohbar = "⦵";
var ohm = "Ω";
var oint = "∮";
var olarr = "↺";
var olcir = "⦾";
var olcross = "⦻";
var oline = "‾";
var olt = "⧀";
var Omacr = "Ō";
var omacr = "ō";
var Omega = "Ω";
var omega = "ω";
var Omicron = "Ο";
var omicron = "ο";
var omid = "⦶";
var ominus = "⊖";
var Oopf = "𝕆";
var oopf = "𝕠";
var opar = "⦷";
var OpenCurlyDoubleQuote = "“";
var OpenCurlyQuote = "‘";
var operp = "⦹";
var oplus = "⊕";
var orarr = "↻";
var Or = "⩔";
var or = "∨";
var ord = "⩝";
var order = "ℴ";
var orderof = "ℴ";
var ordf = "ª";
var ordm = "º";
var origof = "⊶";
var oror = "⩖";
var orslope = "⩗";
var orv = "⩛";
var oS = "Ⓢ";
var Oscr = "𝒪";
var oscr = "ℴ";
var Oslash = "Ø";
var oslash = "ø";
var osol = "⊘";
var Otilde = "Õ";
var otilde = "õ";
var otimesas = "⨶";
var Otimes = "⨷";
var otimes = "⊗";
var Ouml = "Ö";
var ouml = "ö";
var ovbar = "⌽";
var OverBar = "‾";
var OverBrace = "⏞";
var OverBracket = "⎴";
var OverParenthesis = "⏜";
var para = "¶";
var parallel = "∥";
var par = "∥";
var parsim = "⫳";
var parsl = "⫽";
var part = "∂";
var PartialD = "∂";
var Pcy = "П";
var pcy = "п";
var percnt = "%";
var period = ".";
var permil = "‰";
var perp = "⊥";
var pertenk = "‱";
var Pfr = "𝔓";
var pfr = "𝔭";
var Phi = "Φ";
var phi = "φ";
var phiv = "ϕ";
var phmmat = "ℳ";
var phone$1 = "☎";
var Pi = "Π";
var pi = "π";
var pitchfork = "⋔";
var piv = "ϖ";
var planck = "ℏ";
var planckh = "ℎ";
var plankv = "ℏ";
var plusacir = "⨣";
var plusb = "⊞";
var pluscir = "⨢";
var plus = "+";
var plusdo = "∔";
var plusdu = "⨥";
var pluse = "⩲";
var PlusMinus = "±";
var plusmn = "±";
var plussim = "⨦";
var plustwo = "⨧";
var pm = "±";
var Poincareplane = "ℌ";
var pointint = "⨕";
var popf = "𝕡";
var Popf = "ℙ";
var pound$1 = "£";
var prap = "⪷";
var Pr = "⪻";
var pr = "≺";
var prcue = "≼";
var precapprox = "⪷";
var prec = "≺";
var preccurlyeq = "≼";
var Precedes = "≺";
var PrecedesEqual = "⪯";
var PrecedesSlantEqual = "≼";
var PrecedesTilde = "≾";
var preceq = "⪯";
var precnapprox = "⪹";
var precneqq = "⪵";
var precnsim = "⋨";
var pre = "⪯";
var prE = "⪳";
var precsim = "≾";
var prime = "′";
var Prime = "″";
var primes = "ℙ";
var prnap = "⪹";
var prnE = "⪵";
var prnsim = "⋨";
var prod = "∏";
var Product = "∏";
var profalar = "⌮";
var profline = "⌒";
var profsurf = "⌓";
var prop = "∝";
var Proportional = "∝";
var Proportion = "∷";
var propto = "∝";
var prsim = "≾";
var prurel = "⊰";
var Pscr = "𝒫";
var pscr = "𝓅";
var Psi = "Ψ";
var psi = "ψ";
var puncsp = " ";
var Qfr = "𝔔";
var qfr = "𝔮";
var qint = "⨌";
var qopf = "𝕢";
var Qopf = "ℚ";
var qprime = "⁗";
var Qscr = "𝒬";
var qscr = "𝓆";
var quaternions = "ℍ";
var quatint = "⨖";
var quest = "?";
var questeq = "≟";
var quot = "\"";
var QUOT = "\"";
var rAarr = "⇛";
var race = "∽̱";
var Racute = "Ŕ";
var racute = "ŕ";
var radic = "√";
var raemptyv = "⦳";
var rang = "⟩";
var Rang = "⟫";
var rangd = "⦒";
var range = "⦥";
var rangle = "⟩";
var raquo = "»";
var rarrap = "⥵";
var rarrb = "⇥";
var rarrbfs = "⤠";
var rarrc = "⤳";
var rarr = "→";
var Rarr = "↠";
var rArr = "⇒";
var rarrfs = "⤞";
var rarrhk = "↪";
var rarrlp = "↬";
var rarrpl = "⥅";
var rarrsim = "⥴";
var Rarrtl = "⤖";
var rarrtl = "↣";
var rarrw = "↝";
var ratail = "⤚";
var rAtail = "⤜";
var ratio = "∶";
var rationals = "ℚ";
var rbarr = "⤍";
var rBarr = "⤏";
var RBarr = "⤐";
var rbbrk = "❳";
var rbrace = "}";
var rbrack = "]";
var rbrke = "⦌";
var rbrksld = "⦎";
var rbrkslu = "⦐";
var Rcaron = "Ř";
var rcaron = "ř";
var Rcedil = "Ŗ";
var rcedil = "ŗ";
var rceil = "⌉";
var rcub = "}";
var Rcy = "Р";
var rcy = "р";
var rdca = "⤷";
var rdldhar = "⥩";
var rdquo = "”";
var rdquor = "”";
var rdsh = "↳";
var real = "ℜ";
var realine = "ℛ";
var realpart = "ℜ";
var reals = "ℝ";
var Re = "ℜ";
var rect = "▭";
var reg = "®";
var REG = "®";
var ReverseElement = "∋";
var ReverseEquilibrium = "⇋";
var ReverseUpEquilibrium = "⥯";
var rfisht = "⥽";
var rfloor = "⌋";
var rfr = "𝔯";
var Rfr = "ℜ";
var rHar = "⥤";
var rhard = "⇁";
var rharu = "⇀";
var rharul = "⥬";
var Rho = "Ρ";
var rho = "ρ";
var rhov = "ϱ";
var RightAngleBracket = "⟩";
var RightArrowBar = "⇥";
var rightarrow = "→";
var RightArrow = "→";
var Rightarrow = "⇒";
var RightArrowLeftArrow = "⇄";
var rightarrowtail = "↣";
var RightCeiling = "⌉";
var RightDoubleBracket = "⟧";
var RightDownTeeVector = "⥝";
var RightDownVectorBar = "⥕";
var RightDownVector = "⇂";
var RightFloor = "⌋";
var rightharpoondown = "⇁";
var rightharpoonup = "⇀";
var rightleftarrows = "⇄";
var rightleftharpoons = "⇌";
var rightrightarrows = "⇉";
var rightsquigarrow = "↝";
var RightTeeArrow = "↦";
var RightTee = "⊢";
var RightTeeVector = "⥛";
var rightthreetimes = "⋌";
var RightTriangleBar = "⧐";
var RightTriangle = "⊳";
var RightTriangleEqual = "⊵";
var RightUpDownVector = "⥏";
var RightUpTeeVector = "⥜";
var RightUpVectorBar = "⥔";
var RightUpVector = "↾";
var RightVectorBar = "⥓";
var RightVector = "⇀";
var ring$1 = "˚";
var risingdotseq = "≓";
var rlarr = "⇄";
var rlhar = "⇌";
var rlm = "‏";
var rmoustache = "⎱";
var rmoust = "⎱";
var rnmid = "⫮";
var roang = "⟭";
var roarr = "⇾";
var robrk = "⟧";
var ropar = "⦆";
var ropf = "𝕣";
var Ropf = "ℝ";
var roplus = "⨮";
var rotimes = "⨵";
var RoundImplies = "⥰";
var rpar = ")";
var rpargt = "⦔";
var rppolint = "⨒";
var rrarr = "⇉";
var Rrightarrow = "⇛";
var rsaquo = "›";
var rscr = "𝓇";
var Rscr = "ℛ";
var rsh = "↱";
var Rsh = "↱";
var rsqb = "]";
var rsquo = "’";
var rsquor = "’";
var rthree = "⋌";
var rtimes = "⋊";
var rtri = "▹";
var rtrie = "⊵";
var rtrif = "▸";
var rtriltri = "⧎";
var RuleDelayed = "⧴";
var ruluhar = "⥨";
var rx = "℞";
var Sacute = "Ś";
var sacute = "ś";
var sbquo = "‚";
var scap = "⪸";
var Scaron = "Š";
var scaron = "š";
var Sc = "⪼";
var sc = "≻";
var sccue = "≽";
var sce = "⪰";
var scE = "⪴";
var Scedil = "Ş";
var scedil = "ş";
var Scirc = "Ŝ";
var scirc = "ŝ";
var scnap = "⪺";
var scnE = "⪶";
var scnsim = "⋩";
var scpolint = "⨓";
var scsim = "≿";
var Scy = "С";
var scy = "с";
var sdotb = "⊡";
var sdot = "⋅";
var sdote = "⩦";
var searhk = "⤥";
var searr = "↘";
var seArr = "⇘";
var searrow = "↘";
var sect = "§";
var semi = ";";
var seswar = "⤩";
var setminus = "∖";
var setmn = "∖";
var sext = "✶";
var Sfr = "𝔖";
var sfr = "𝔰";
var sfrown = "⌢";
var sharp = "♯";
var SHCHcy = "Щ";
var shchcy = "щ";
var SHcy = "Ш";
var shcy = "ш";
var ShortDownArrow = "↓";
var ShortLeftArrow = "←";
var shortmid = "∣";
var shortparallel = "∥";
var ShortRightArrow = "→";
var ShortUpArrow = "↑";
var shy = "­";
var Sigma = "Σ";
var sigma = "σ";
var sigmaf = "ς";
var sigmav = "ς";
var sim = "∼";
var simdot = "⩪";
var sime = "≃";
var simeq = "≃";
var simg = "⪞";
var simgE = "⪠";
var siml = "⪝";
var simlE = "⪟";
var simne = "≆";
var simplus = "⨤";
var simrarr = "⥲";
var slarr = "←";
var SmallCircle = "∘";
var smallsetminus = "∖";
var smashp = "⨳";
var smeparsl = "⧤";
var smid = "∣";
var smile$1 = "⌣";
var smt = "⪪";
var smte = "⪬";
var smtes = "⪬︀";
var SOFTcy = "Ь";
var softcy = "ь";
var solbar = "⌿";
var solb = "⧄";
var sol = "/";
var Sopf = "𝕊";
var sopf = "𝕤";
var spades$1 = "♠";
var spadesuit = "♠";
var spar = "∥";
var sqcap = "⊓";
var sqcaps = "⊓︀";
var sqcup = "⊔";
var sqcups = "⊔︀";
var Sqrt = "√";
var sqsub = "⊏";
var sqsube = "⊑";
var sqsubset = "⊏";
var sqsubseteq = "⊑";
var sqsup = "⊐";
var sqsupe = "⊒";
var sqsupset = "⊐";
var sqsupseteq = "⊒";
var square = "□";
var Square = "□";
var SquareIntersection = "⊓";
var SquareSubset = "⊏";
var SquareSubsetEqual = "⊑";
var SquareSuperset = "⊐";
var SquareSupersetEqual = "⊒";
var SquareUnion = "⊔";
var squarf = "▪";
var squ = "□";
var squf = "▪";
var srarr = "→";
var Sscr = "𝒮";
var sscr = "𝓈";
var ssetmn = "∖";
var ssmile = "⌣";
var sstarf = "⋆";
var Star = "⋆";
var star$1 = "☆";
var starf = "★";
var straightepsilon = "ϵ";
var straightphi = "ϕ";
var strns = "¯";
var sub = "⊂";
var Sub = "⋐";
var subdot = "⪽";
var subE = "⫅";
var sube = "⊆";
var subedot = "⫃";
var submult = "⫁";
var subnE = "⫋";
var subne = "⊊";
var subplus = "⪿";
var subrarr = "⥹";
var subset = "⊂";
var Subset = "⋐";
var subseteq = "⊆";
var subseteqq = "⫅";
var SubsetEqual = "⊆";
var subsetneq = "⊊";
var subsetneqq = "⫋";
var subsim = "⫇";
var subsub = "⫕";
var subsup = "⫓";
var succapprox = "⪸";
var succ = "≻";
var succcurlyeq = "≽";
var Succeeds = "≻";
var SucceedsEqual = "⪰";
var SucceedsSlantEqual = "≽";
var SucceedsTilde = "≿";
var succeq = "⪰";
var succnapprox = "⪺";
var succneqq = "⪶";
var succnsim = "⋩";
var succsim = "≿";
var SuchThat = "∋";
var sum = "∑";
var Sum = "∑";
var sung = "♪";
var sup1 = "¹";
var sup2 = "²";
var sup3 = "³";
var sup = "⊃";
var Sup = "⋑";
var supdot = "⪾";
var supdsub = "⫘";
var supE = "⫆";
var supe = "⊇";
var supedot = "⫄";
var Superset = "⊃";
var SupersetEqual = "⊇";
var suphsol = "⟉";
var suphsub = "⫗";
var suplarr = "⥻";
var supmult = "⫂";
var supnE = "⫌";
var supne = "⊋";
var supplus = "⫀";
var supset = "⊃";
var Supset = "⋑";
var supseteq = "⊇";
var supseteqq = "⫆";
var supsetneq = "⊋";
var supsetneqq = "⫌";
var supsim = "⫈";
var supsub = "⫔";
var supsup = "⫖";
var swarhk = "⤦";
var swarr = "↙";
var swArr = "⇙";
var swarrow = "↙";
var swnwar = "⤪";
var szlig = "ß";
var Tab = "\t";
var target = "⌖";
var Tau = "Τ";
var tau = "τ";
var tbrk = "⎴";
var Tcaron = "Ť";
var tcaron = "ť";
var Tcedil = "Ţ";
var tcedil = "ţ";
var Tcy = "Т";
var tcy = "т";
var tdot = "⃛";
var telrec = "⌕";
var Tfr = "𝔗";
var tfr = "𝔱";
var there4 = "∴";
var therefore = "∴";
var Therefore = "∴";
var Theta = "Θ";
var theta = "θ";
var thetasym = "ϑ";
var thetav = "ϑ";
var thickapprox = "≈";
var thicksim = "∼";
var ThickSpace = "  ";
var ThinSpace = " ";
var thinsp = " ";
var thkap = "≈";
var thksim = "∼";
var THORN = "Þ";
var thorn = "þ";
var tilde = "˜";
var Tilde = "∼";
var TildeEqual = "≃";
var TildeFullEqual = "≅";
var TildeTilde = "≈";
var timesbar = "⨱";
var timesb = "⊠";
var times = "×";
var timesd = "⨰";
var tint = "∭";
var toea = "⤨";
var topbot = "⌶";
var topcir = "⫱";
var top$1 = "⊤";
var Topf = "𝕋";
var topf = "𝕥";
var topfork = "⫚";
var tosa = "⤩";
var tprime = "‴";
var trade = "™";
var TRADE = "™";
var triangle = "▵";
var triangledown = "▿";
var triangleleft = "◃";
var trianglelefteq = "⊴";
var triangleq = "≜";
var triangleright = "▹";
var trianglerighteq = "⊵";
var tridot = "◬";
var trie = "≜";
var triminus = "⨺";
var TripleDot = "⃛";
var triplus = "⨹";
var trisb = "⧍";
var tritime = "⨻";
var trpezium = "⏢";
var Tscr = "𝒯";
var tscr = "𝓉";
var TScy = "Ц";
var tscy = "ц";
var TSHcy = "Ћ";
var tshcy = "ћ";
var Tstrok = "Ŧ";
var tstrok = "ŧ";
var twixt = "≬";
var twoheadleftarrow = "↞";
var twoheadrightarrow = "↠";
var Uacute = "Ú";
var uacute = "ú";
var uarr = "↑";
var Uarr = "↟";
var uArr = "⇑";
var Uarrocir = "⥉";
var Ubrcy = "Ў";
var ubrcy = "ў";
var Ubreve = "Ŭ";
var ubreve = "ŭ";
var Ucirc = "Û";
var ucirc = "û";
var Ucy = "У";
var ucy = "у";
var udarr = "⇅";
var Udblac = "Ű";
var udblac = "ű";
var udhar = "⥮";
var ufisht = "⥾";
var Ufr = "𝔘";
var ufr = "𝔲";
var Ugrave = "Ù";
var ugrave = "ù";
var uHar = "⥣";
var uharl = "↿";
var uharr = "↾";
var uhblk = "▀";
var ulcorn = "⌜";
var ulcorner = "⌜";
var ulcrop = "⌏";
var ultri = "◸";
var Umacr = "Ū";
var umacr = "ū";
var uml = "¨";
var UnderBar = "_";
var UnderBrace = "⏟";
var UnderBracket = "⎵";
var UnderParenthesis = "⏝";
var Union = "⋃";
var UnionPlus = "⊎";
var Uogon = "Ų";
var uogon = "ų";
var Uopf = "𝕌";
var uopf = "𝕦";
var UpArrowBar = "⤒";
var uparrow = "↑";
var UpArrow = "↑";
var Uparrow = "⇑";
var UpArrowDownArrow = "⇅";
var updownarrow = "↕";
var UpDownArrow = "↕";
var Updownarrow = "⇕";
var UpEquilibrium = "⥮";
var upharpoonleft = "↿";
var upharpoonright = "↾";
var uplus = "⊎";
var UpperLeftArrow = "↖";
var UpperRightArrow = "↗";
var upsi = "υ";
var Upsi = "ϒ";
var upsih = "ϒ";
var Upsilon = "Υ";
var upsilon = "υ";
var UpTeeArrow = "↥";
var UpTee = "⊥";
var upuparrows = "⇈";
var urcorn = "⌝";
var urcorner = "⌝";
var urcrop = "⌎";
var Uring = "Ů";
var uring = "ů";
var urtri = "◹";
var Uscr = "𝒰";
var uscr = "𝓊";
var utdot = "⋰";
var Utilde = "Ũ";
var utilde = "ũ";
var utri = "▵";
var utrif = "▴";
var uuarr = "⇈";
var Uuml = "Ü";
var uuml = "ü";
var uwangle = "⦧";
var vangrt = "⦜";
var varepsilon = "ϵ";
var varkappa = "ϰ";
var varnothing = "∅";
var varphi = "ϕ";
var varpi = "ϖ";
var varpropto = "∝";
var varr = "↕";
var vArr = "⇕";
var varrho = "ϱ";
var varsigma = "ς";
var varsubsetneq = "⊊︀";
var varsubsetneqq = "⫋︀";
var varsupsetneq = "⊋︀";
var varsupsetneqq = "⫌︀";
var vartheta = "ϑ";
var vartriangleleft = "⊲";
var vartriangleright = "⊳";
var vBar = "⫨";
var Vbar = "⫫";
var vBarv = "⫩";
var Vcy = "В";
var vcy = "в";
var vdash = "⊢";
var vDash = "⊨";
var Vdash = "⊩";
var VDash = "⊫";
var Vdashl = "⫦";
var veebar = "⊻";
var vee = "∨";
var Vee = "⋁";
var veeeq = "≚";
var vellip = "⋮";
var verbar = "|";
var Verbar = "‖";
var vert = "|";
var Vert = "‖";
var VerticalBar = "∣";
var VerticalLine = "|";
var VerticalSeparator = "❘";
var VerticalTilde = "≀";
var VeryThinSpace = " ";
var Vfr = "𝔙";
var vfr = "𝔳";
var vltri = "⊲";
var vnsub = "⊂⃒";
var vnsup = "⊃⃒";
var Vopf = "𝕍";
var vopf = "𝕧";
var vprop = "∝";
var vrtri = "⊳";
var Vscr = "𝒱";
var vscr = "𝓋";
var vsubnE = "⫋︀";
var vsubne = "⊊︀";
var vsupnE = "⫌︀";
var vsupne = "⊋︀";
var Vvdash = "⊪";
var vzigzag = "⦚";
var Wcirc = "Ŵ";
var wcirc = "ŵ";
var wedbar = "⩟";
var wedge = "∧";
var Wedge = "⋀";
var wedgeq = "≙";
var weierp = "℘";
var Wfr = "𝔚";
var wfr = "𝔴";
var Wopf = "𝕎";
var wopf = "𝕨";
var wp = "℘";
var wr = "≀";
var wreath = "≀";
var Wscr = "𝒲";
var wscr = "𝓌";
var xcap = "⋂";
var xcirc = "◯";
var xcup = "⋃";
var xdtri = "▽";
var Xfr = "𝔛";
var xfr = "𝔵";
var xharr = "⟷";
var xhArr = "⟺";
var Xi = "Ξ";
var xi = "ξ";
var xlarr = "⟵";
var xlArr = "⟸";
var xmap = "⟼";
var xnis = "⋻";
var xodot = "⨀";
var Xopf = "𝕏";
var xopf = "𝕩";
var xoplus = "⨁";
var xotime = "⨂";
var xrarr = "⟶";
var xrArr = "⟹";
var Xscr = "𝒳";
var xscr = "𝓍";
var xsqcup = "⨆";
var xuplus = "⨄";
var xutri = "△";
var xvee = "⋁";
var xwedge = "⋀";
var Yacute = "Ý";
var yacute = "ý";
var YAcy = "Я";
var yacy = "я";
var Ycirc = "Ŷ";
var ycirc = "ŷ";
var Ycy = "Ы";
var ycy = "ы";
var yen$1 = "¥";
var Yfr = "𝔜";
var yfr = "𝔶";
var YIcy = "Ї";
var yicy = "ї";
var Yopf = "𝕐";
var yopf = "𝕪";
var Yscr = "𝒴";
var yscr = "𝓎";
var YUcy = "Ю";
var yucy = "ю";
var yuml = "ÿ";
var Yuml = "Ÿ";
var Zacute = "Ź";
var zacute = "ź";
var Zcaron = "Ž";
var zcaron = "ž";
var Zcy = "З";
var zcy = "з";
var Zdot = "Ż";
var zdot = "ż";
var zeetrf = "ℨ";
var ZeroWidthSpace = "​";
var Zeta = "Ζ";
var zeta = "ζ";
var zfr = "𝔷";
var Zfr = "ℨ";
var ZHcy = "Ж";
var zhcy = "ж";
var zigrarr = "⇝";
var zopf = "𝕫";
var Zopf = "ℤ";
var Zscr = "𝒵";
var zscr = "𝓏";
var zwj = "‍";
var zwnj = "‌";
var require$$0$1 = {
	Aacute: Aacute,
	aacute: aacute,
	Abreve: Abreve,
	abreve: abreve,
	ac: ac,
	acd: acd,
	acE: acE,
	Acirc: Acirc,
	acirc: acirc,
	acute: acute,
	Acy: Acy,
	acy: acy,
	AElig: AElig,
	aelig: aelig,
	af: af,
	Afr: Afr,
	afr: afr,
	Agrave: Agrave,
	agrave: agrave,
	alefsym: alefsym,
	aleph: aleph,
	Alpha: Alpha,
	alpha: alpha,
	Amacr: Amacr,
	amacr: amacr,
	amalg: amalg,
	amp: amp,
	AMP: AMP,
	andand: andand,
	And: And,
	and: and,
	andd: andd,
	andslope: andslope,
	andv: andv,
	ang: ang,
	ange: ange,
	angle: angle,
	angmsdaa: angmsdaa,
	angmsdab: angmsdab,
	angmsdac: angmsdac,
	angmsdad: angmsdad,
	angmsdae: angmsdae,
	angmsdaf: angmsdaf,
	angmsdag: angmsdag,
	angmsdah: angmsdah,
	angmsd: angmsd,
	angrt: angrt,
	angrtvb: angrtvb,
	angrtvbd: angrtvbd,
	angsph: angsph,
	angst: angst,
	angzarr: angzarr,
	Aogon: Aogon,
	aogon: aogon,
	Aopf: Aopf,
	aopf: aopf,
	apacir: apacir,
	ap: ap,
	apE: apE,
	ape: ape,
	apid: apid,
	apos: apos,
	ApplyFunction: ApplyFunction,
	approx: approx,
	approxeq: approxeq,
	Aring: Aring,
	aring: aring,
	Ascr: Ascr,
	ascr: ascr,
	Assign: Assign,
	ast: ast,
	asymp: asymp,
	asympeq: asympeq,
	Atilde: Atilde,
	atilde: atilde,
	Auml: Auml,
	auml: auml,
	awconint: awconint,
	awint: awint,
	backcong: backcong,
	backepsilon: backepsilon,
	backprime: backprime,
	backsim: backsim,
	backsimeq: backsimeq,
	Backslash: Backslash,
	Barv: Barv,
	barvee: barvee,
	barwed: barwed,
	Barwed: Barwed,
	barwedge: barwedge,
	bbrk: bbrk,
	bbrktbrk: bbrktbrk,
	bcong: bcong,
	Bcy: Bcy,
	bcy: bcy,
	bdquo: bdquo,
	becaus: becaus,
	because: because,
	Because: Because,
	bemptyv: bemptyv,
	bepsi: bepsi,
	bernou: bernou,
	Bernoullis: Bernoullis,
	Beta: Beta,
	beta: beta,
	beth: beth,
	between: between,
	Bfr: Bfr,
	bfr: bfr,
	bigcap: bigcap,
	bigcirc: bigcirc,
	bigcup: bigcup,
	bigodot: bigodot,
	bigoplus: bigoplus,
	bigotimes: bigotimes,
	bigsqcup: bigsqcup,
	bigstar: bigstar,
	bigtriangledown: bigtriangledown,
	bigtriangleup: bigtriangleup,
	biguplus: biguplus,
	bigvee: bigvee,
	bigwedge: bigwedge,
	bkarow: bkarow,
	blacklozenge: blacklozenge,
	blacksquare: blacksquare,
	blacktriangle: blacktriangle,
	blacktriangledown: blacktriangledown,
	blacktriangleleft: blacktriangleleft,
	blacktriangleright: blacktriangleright,
	blank: blank,
	blk12: blk12,
	blk14: blk14,
	blk34: blk34,
	block: block$1,
	bne: bne,
	bnequiv: bnequiv,
	bNot: bNot,
	bnot: bnot,
	Bopf: Bopf,
	bopf: bopf,
	bot: bot,
	bottom: bottom,
	bowtie: bowtie,
	boxbox: boxbox,
	boxdl: boxdl,
	boxdL: boxdL,
	boxDl: boxDl,
	boxDL: boxDL,
	boxdr: boxdr,
	boxdR: boxdR,
	boxDr: boxDr,
	boxDR: boxDR,
	boxh: boxh,
	boxH: boxH,
	boxhd: boxhd,
	boxHd: boxHd,
	boxhD: boxhD,
	boxHD: boxHD,
	boxhu: boxhu,
	boxHu: boxHu,
	boxhU: boxhU,
	boxHU: boxHU,
	boxminus: boxminus,
	boxplus: boxplus,
	boxtimes: boxtimes,
	boxul: boxul,
	boxuL: boxuL,
	boxUl: boxUl,
	boxUL: boxUL,
	boxur: boxur,
	boxuR: boxuR,
	boxUr: boxUr,
	boxUR: boxUR,
	boxv: boxv,
	boxV: boxV,
	boxvh: boxvh,
	boxvH: boxvH,
	boxVh: boxVh,
	boxVH: boxVH,
	boxvl: boxvl,
	boxvL: boxvL,
	boxVl: boxVl,
	boxVL: boxVL,
	boxvr: boxvr,
	boxvR: boxvR,
	boxVr: boxVr,
	boxVR: boxVR,
	bprime: bprime,
	breve: breve,
	Breve: Breve,
	brvbar: brvbar,
	bscr: bscr,
	Bscr: Bscr,
	bsemi: bsemi,
	bsim: bsim,
	bsime: bsime,
	bsolb: bsolb,
	bsol: bsol,
	bsolhsub: bsolhsub,
	bull: bull,
	bullet: bullet,
	bump: bump,
	bumpE: bumpE,
	bumpe: bumpe,
	Bumpeq: Bumpeq,
	bumpeq: bumpeq,
	Cacute: Cacute,
	cacute: cacute,
	capand: capand,
	capbrcup: capbrcup,
	capcap: capcap,
	cap: cap,
	Cap: Cap,
	capcup: capcup,
	capdot: capdot,
	CapitalDifferentialD: CapitalDifferentialD,
	caps: caps,
	caret: caret,
	caron: caron,
	Cayleys: Cayleys,
	ccaps: ccaps,
	Ccaron: Ccaron,
	ccaron: ccaron,
	Ccedil: Ccedil,
	ccedil: ccedil,
	Ccirc: Ccirc,
	ccirc: ccirc,
	Cconint: Cconint,
	ccups: ccups,
	ccupssm: ccupssm,
	Cdot: Cdot,
	cdot: cdot,
	cedil: cedil,
	Cedilla: Cedilla,
	cemptyv: cemptyv,
	cent: cent,
	centerdot: centerdot,
	CenterDot: CenterDot,
	cfr: cfr,
	Cfr: Cfr,
	CHcy: CHcy,
	chcy: chcy,
	check: check,
	checkmark: checkmark,
	Chi: Chi,
	chi: chi,
	circ: circ,
	circeq: circeq,
	circlearrowleft: circlearrowleft,
	circlearrowright: circlearrowright,
	circledast: circledast,
	circledcirc: circledcirc,
	circleddash: circleddash,
	CircleDot: CircleDot,
	circledR: circledR,
	circledS: circledS,
	CircleMinus: CircleMinus,
	CirclePlus: CirclePlus,
	CircleTimes: CircleTimes,
	cir: cir,
	cirE: cirE,
	cire: cire,
	cirfnint: cirfnint,
	cirmid: cirmid,
	cirscir: cirscir,
	ClockwiseContourIntegral: ClockwiseContourIntegral,
	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
	CloseCurlyQuote: CloseCurlyQuote,
	clubs: clubs$1,
	clubsuit: clubsuit,
	colon: colon,
	Colon: Colon,
	Colone: Colone,
	colone: colone,
	coloneq: coloneq,
	comma: comma,
	commat: commat,
	comp: comp,
	compfn: compfn,
	complement: complement,
	complexes: complexes,
	cong: cong,
	congdot: congdot,
	Congruent: Congruent,
	conint: conint,
	Conint: Conint,
	ContourIntegral: ContourIntegral,
	copf: copf,
	Copf: Copf,
	coprod: coprod,
	Coproduct: Coproduct,
	copy: copy,
	COPY: COPY,
	copysr: copysr,
	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
	crarr: crarr,
	cross: cross,
	Cross: Cross,
	Cscr: Cscr,
	cscr: cscr,
	csub: csub,
	csube: csube,
	csup: csup,
	csupe: csupe,
	ctdot: ctdot,
	cudarrl: cudarrl,
	cudarrr: cudarrr,
	cuepr: cuepr,
	cuesc: cuesc,
	cularr: cularr,
	cularrp: cularrp,
	cupbrcap: cupbrcap,
	cupcap: cupcap,
	CupCap: CupCap,
	cup: cup,
	Cup: Cup,
	cupcup: cupcup,
	cupdot: cupdot,
	cupor: cupor,
	cups: cups,
	curarr: curarr,
	curarrm: curarrm,
	curlyeqprec: curlyeqprec,
	curlyeqsucc: curlyeqsucc,
	curlyvee: curlyvee,
	curlywedge: curlywedge,
	curren: curren,
	curvearrowleft: curvearrowleft,
	curvearrowright: curvearrowright,
	cuvee: cuvee,
	cuwed: cuwed,
	cwconint: cwconint,
	cwint: cwint,
	cylcty: cylcty,
	dagger: dagger$1,
	Dagger: Dagger,
	daleth: daleth,
	darr: darr,
	Darr: Darr,
	dArr: dArr,
	dash: dash$1,
	Dashv: Dashv,
	dashv: dashv,
	dbkarow: dbkarow,
	dblac: dblac,
	Dcaron: Dcaron,
	dcaron: dcaron,
	Dcy: Dcy,
	dcy: dcy,
	ddagger: ddagger,
	ddarr: ddarr,
	DD: DD,
	dd: dd,
	DDotrahd: DDotrahd,
	ddotseq: ddotseq,
	deg: deg,
	Del: Del,
	Delta: Delta,
	delta: delta,
	demptyv: demptyv,
	dfisht: dfisht,
	Dfr: Dfr,
	dfr: dfr,
	dHar: dHar,
	dharl: dharl,
	dharr: dharr,
	DiacriticalAcute: DiacriticalAcute,
	DiacriticalDot: DiacriticalDot,
	DiacriticalDoubleAcute: DiacriticalDoubleAcute,
	DiacriticalGrave: DiacriticalGrave,
	DiacriticalTilde: DiacriticalTilde,
	diam: diam,
	diamond: diamond,
	Diamond: Diamond,
	diamondsuit: diamondsuit,
	diams: diams,
	die: die,
	DifferentialD: DifferentialD,
	digamma: digamma,
	disin: disin,
	div: div,
	divide: divide,
	divideontimes: divideontimes,
	divonx: divonx,
	DJcy: DJcy,
	djcy: djcy,
	dlcorn: dlcorn,
	dlcrop: dlcrop,
	dollar: dollar$1,
	Dopf: Dopf,
	dopf: dopf,
	Dot: Dot,
	dot: dot,
	DotDot: DotDot,
	doteq: doteq,
	doteqdot: doteqdot,
	DotEqual: DotEqual,
	dotminus: dotminus,
	dotplus: dotplus,
	dotsquare: dotsquare,
	doublebarwedge: doublebarwedge,
	DoubleContourIntegral: DoubleContourIntegral,
	DoubleDot: DoubleDot,
	DoubleDownArrow: DoubleDownArrow,
	DoubleLeftArrow: DoubleLeftArrow,
	DoubleLeftRightArrow: DoubleLeftRightArrow,
	DoubleLeftTee: DoubleLeftTee,
	DoubleLongLeftArrow: DoubleLongLeftArrow,
	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
	DoubleLongRightArrow: DoubleLongRightArrow,
	DoubleRightArrow: DoubleRightArrow,
	DoubleRightTee: DoubleRightTee,
	DoubleUpArrow: DoubleUpArrow,
	DoubleUpDownArrow: DoubleUpDownArrow,
	DoubleVerticalBar: DoubleVerticalBar,
	DownArrowBar: DownArrowBar,
	downarrow: downarrow,
	DownArrow: DownArrow,
	Downarrow: Downarrow,
	DownArrowUpArrow: DownArrowUpArrow,
	DownBreve: DownBreve,
	downdownarrows: downdownarrows,
	downharpoonleft: downharpoonleft,
	downharpoonright: downharpoonright,
	DownLeftRightVector: DownLeftRightVector,
	DownLeftTeeVector: DownLeftTeeVector,
	DownLeftVectorBar: DownLeftVectorBar,
	DownLeftVector: DownLeftVector,
	DownRightTeeVector: DownRightTeeVector,
	DownRightVectorBar: DownRightVectorBar,
	DownRightVector: DownRightVector,
	DownTeeArrow: DownTeeArrow,
	DownTee: DownTee,
	drbkarow: drbkarow,
	drcorn: drcorn,
	drcrop: drcrop,
	Dscr: Dscr,
	dscr: dscr,
	DScy: DScy,
	dscy: dscy,
	dsol: dsol,
	Dstrok: Dstrok,
	dstrok: dstrok,
	dtdot: dtdot,
	dtri: dtri,
	dtrif: dtrif,
	duarr: duarr,
	duhar: duhar,
	dwangle: dwangle,
	DZcy: DZcy,
	dzcy: dzcy,
	dzigrarr: dzigrarr,
	Eacute: Eacute,
	eacute: eacute,
	easter: easter,
	Ecaron: Ecaron,
	ecaron: ecaron,
	Ecirc: Ecirc,
	ecirc: ecirc,
	ecir: ecir,
	ecolon: ecolon,
	Ecy: Ecy,
	ecy: ecy,
	eDDot: eDDot,
	Edot: Edot,
	edot: edot,
	eDot: eDot,
	ee: ee,
	efDot: efDot,
	Efr: Efr,
	efr: efr,
	eg: eg,
	Egrave: Egrave,
	egrave: egrave,
	egs: egs,
	egsdot: egsdot,
	el: el,
	Element: Element,
	elinters: elinters,
	ell: ell,
	els: els,
	elsdot: elsdot,
	Emacr: Emacr,
	emacr: emacr,
	empty: empty,
	emptyset: emptyset,
	EmptySmallSquare: EmptySmallSquare,
	emptyv: emptyv,
	EmptyVerySmallSquare: EmptyVerySmallSquare,
	emsp13: emsp13,
	emsp14: emsp14,
	emsp: emsp,
	ENG: ENG,
	eng: eng,
	ensp: ensp,
	Eogon: Eogon,
	eogon: eogon,
	Eopf: Eopf,
	eopf: eopf,
	epar: epar,
	eparsl: eparsl,
	eplus: eplus,
	epsi: epsi,
	Epsilon: Epsilon,
	epsilon: epsilon,
	epsiv: epsiv,
	eqcirc: eqcirc,
	eqcolon: eqcolon,
	eqsim: eqsim,
	eqslantgtr: eqslantgtr,
	eqslantless: eqslantless,
	Equal: Equal,
	equals: equals,
	EqualTilde: EqualTilde,
	equest: equest,
	Equilibrium: Equilibrium,
	equiv: equiv,
	equivDD: equivDD,
	eqvparsl: eqvparsl,
	erarr: erarr,
	erDot: erDot,
	escr: escr,
	Escr: Escr,
	esdot: esdot,
	Esim: Esim,
	esim: esim,
	Eta: Eta,
	eta: eta,
	ETH: ETH,
	eth: eth,
	Euml: Euml,
	euml: euml,
	euro: euro$1,
	excl: excl,
	exist: exist,
	Exists: Exists,
	expectation: expectation,
	exponentiale: exponentiale,
	ExponentialE: ExponentialE,
	fallingdotseq: fallingdotseq,
	Fcy: Fcy,
	fcy: fcy,
	female: female,
	ffilig: ffilig,
	fflig: fflig,
	ffllig: ffllig,
	Ffr: Ffr,
	ffr: ffr,
	filig: filig,
	FilledSmallSquare: FilledSmallSquare,
	FilledVerySmallSquare: FilledVerySmallSquare,
	fjlig: fjlig,
	flat: flat,
	fllig: fllig,
	fltns: fltns,
	fnof: fnof,
	Fopf: Fopf,
	fopf: fopf,
	forall: forall,
	ForAll: ForAll,
	fork: fork,
	forkv: forkv,
	Fouriertrf: Fouriertrf,
	fpartint: fpartint,
	frac12: frac12,
	frac13: frac13,
	frac14: frac14,
	frac15: frac15,
	frac16: frac16,
	frac18: frac18,
	frac23: frac23,
	frac25: frac25,
	frac34: frac34,
	frac35: frac35,
	frac38: frac38,
	frac45: frac45,
	frac56: frac56,
	frac58: frac58,
	frac78: frac78,
	frasl: frasl,
	frown: frown,
	fscr: fscr,
	Fscr: Fscr,
	gacute: gacute,
	Gamma: Gamma,
	gamma: gamma,
	Gammad: Gammad,
	gammad: gammad,
	gap: gap,
	Gbreve: Gbreve,
	gbreve: gbreve,
	Gcedil: Gcedil,
	Gcirc: Gcirc,
	gcirc: gcirc,
	Gcy: Gcy,
	gcy: gcy,
	Gdot: Gdot,
	gdot: gdot,
	ge: ge,
	gE: gE,
	gEl: gEl,
	gel: gel,
	geq: geq,
	geqq: geqq,
	geqslant: geqslant,
	gescc: gescc,
	ges: ges,
	gesdot: gesdot,
	gesdoto: gesdoto,
	gesdotol: gesdotol,
	gesl: gesl,
	gesles: gesles,
	Gfr: Gfr,
	gfr: gfr,
	gg: gg,
	Gg: Gg,
	ggg: ggg,
	gimel: gimel,
	GJcy: GJcy,
	gjcy: gjcy,
	gla: gla,
	gl: gl,
	glE: glE,
	glj: glj,
	gnap: gnap,
	gnapprox: gnapprox,
	gne: gne,
	gnE: gnE,
	gneq: gneq,
	gneqq: gneqq,
	gnsim: gnsim,
	Gopf: Gopf,
	gopf: gopf,
	grave: grave,
	GreaterEqual: GreaterEqual,
	GreaterEqualLess: GreaterEqualLess,
	GreaterFullEqual: GreaterFullEqual,
	GreaterGreater: GreaterGreater,
	GreaterLess: GreaterLess,
	GreaterSlantEqual: GreaterSlantEqual,
	GreaterTilde: GreaterTilde,
	Gscr: Gscr,
	gscr: gscr,
	gsim: gsim,
	gsime: gsime,
	gsiml: gsiml,
	gtcc: gtcc,
	gtcir: gtcir,
	gt: gt,
	GT: GT,
	Gt: Gt,
	gtdot: gtdot,
	gtlPar: gtlPar,
	gtquest: gtquest,
	gtrapprox: gtrapprox,
	gtrarr: gtrarr,
	gtrdot: gtrdot,
	gtreqless: gtreqless,
	gtreqqless: gtreqqless,
	gtrless: gtrless,
	gtrsim: gtrsim,
	gvertneqq: gvertneqq,
	gvnE: gvnE,
	Hacek: Hacek,
	hairsp: hairsp,
	half: half,
	hamilt: hamilt,
	HARDcy: HARDcy,
	hardcy: hardcy,
	harrcir: harrcir,
	harr: harr,
	hArr: hArr,
	harrw: harrw,
	Hat: Hat,
	hbar: hbar,
	Hcirc: Hcirc,
	hcirc: hcirc,
	hearts: hearts$1,
	heartsuit: heartsuit,
	hellip: hellip,
	hercon: hercon,
	hfr: hfr,
	Hfr: Hfr,
	HilbertSpace: HilbertSpace,
	hksearow: hksearow,
	hkswarow: hkswarow,
	hoarr: hoarr,
	homtht: homtht,
	hookleftarrow: hookleftarrow,
	hookrightarrow: hookrightarrow,
	hopf: hopf,
	Hopf: Hopf,
	horbar: horbar,
	HorizontalLine: HorizontalLine,
	hscr: hscr,
	Hscr: Hscr,
	hslash: hslash,
	Hstrok: Hstrok,
	hstrok: hstrok,
	HumpDownHump: HumpDownHump,
	HumpEqual: HumpEqual,
	hybull: hybull,
	hyphen: hyphen,
	Iacute: Iacute,
	iacute: iacute,
	ic: ic,
	Icirc: Icirc,
	icirc: icirc,
	Icy: Icy,
	icy: icy,
	Idot: Idot,
	IEcy: IEcy,
	iecy: iecy,
	iexcl: iexcl,
	iff: iff,
	ifr: ifr,
	Ifr: Ifr,
	Igrave: Igrave,
	igrave: igrave,
	ii: ii,
	iiiint: iiiint,
	iiint: iiint,
	iinfin: iinfin,
	iiota: iiota,
	IJlig: IJlig,
	ijlig: ijlig,
	Imacr: Imacr,
	imacr: imacr,
	image: image$1,
	ImaginaryI: ImaginaryI,
	imagline: imagline,
	imagpart: imagpart,
	imath: imath,
	Im: Im,
	imof: imof,
	imped: imped,
	Implies: Implies,
	incare: incare,
	"in": "∈",
	infin: infin,
	infintie: infintie,
	inodot: inodot,
	intcal: intcal,
	int: int,
	Int: Int,
	integers: integers,
	Integral: Integral,
	intercal: intercal,
	Intersection: Intersection,
	intlarhk: intlarhk,
	intprod: intprod,
	InvisibleComma: InvisibleComma,
	InvisibleTimes: InvisibleTimes,
	IOcy: IOcy,
	iocy: iocy,
	Iogon: Iogon,
	iogon: iogon,
	Iopf: Iopf,
	iopf: iopf,
	Iota: Iota,
	iota: iota,
	iprod: iprod,
	iquest: iquest,
	iscr: iscr,
	Iscr: Iscr,
	isin: isin,
	isindot: isindot,
	isinE: isinE,
	isins: isins,
	isinsv: isinsv,
	isinv: isinv,
	it: it$1,
	Itilde: Itilde,
	itilde: itilde,
	Iukcy: Iukcy,
	iukcy: iukcy,
	Iuml: Iuml,
	iuml: iuml,
	Jcirc: Jcirc,
	jcirc: jcirc,
	Jcy: Jcy,
	jcy: jcy,
	Jfr: Jfr,
	jfr: jfr,
	jmath: jmath,
	Jopf: Jopf,
	jopf: jopf,
	Jscr: Jscr,
	jscr: jscr,
	Jsercy: Jsercy,
	jsercy: jsercy,
	Jukcy: Jukcy,
	jukcy: jukcy,
	Kappa: Kappa,
	kappa: kappa,
	kappav: kappav,
	Kcedil: Kcedil,
	kcedil: kcedil,
	Kcy: Kcy,
	kcy: kcy,
	Kfr: Kfr,
	kfr: kfr,
	kgreen: kgreen,
	KHcy: KHcy,
	khcy: khcy,
	KJcy: KJcy,
	kjcy: kjcy,
	Kopf: Kopf,
	kopf: kopf,
	Kscr: Kscr,
	kscr: kscr,
	lAarr: lAarr,
	Lacute: Lacute,
	lacute: lacute,
	laemptyv: laemptyv,
	lagran: lagran,
	Lambda: Lambda,
	lambda: lambda,
	lang: lang,
	Lang: Lang,
	langd: langd,
	langle: langle,
	lap: lap,
	Laplacetrf: Laplacetrf,
	laquo: laquo,
	larrb: larrb,
	larrbfs: larrbfs,
	larr: larr,
	Larr: Larr,
	lArr: lArr,
	larrfs: larrfs,
	larrhk: larrhk,
	larrlp: larrlp,
	larrpl: larrpl,
	larrsim: larrsim,
	larrtl: larrtl,
	latail: latail,
	lAtail: lAtail,
	lat: lat,
	late: late,
	lates: lates,
	lbarr: lbarr,
	lBarr: lBarr,
	lbbrk: lbbrk,
	lbrace: lbrace,
	lbrack: lbrack,
	lbrke: lbrke,
	lbrksld: lbrksld,
	lbrkslu: lbrkslu,
	Lcaron: Lcaron,
	lcaron: lcaron,
	Lcedil: Lcedil,
	lcedil: lcedil,
	lceil: lceil,
	lcub: lcub,
	Lcy: Lcy,
	lcy: lcy,
	ldca: ldca,
	ldquo: ldquo,
	ldquor: ldquor,
	ldrdhar: ldrdhar,
	ldrushar: ldrushar,
	ldsh: ldsh,
	le: le,
	lE: lE,
	LeftAngleBracket: LeftAngleBracket,
	LeftArrowBar: LeftArrowBar,
	leftarrow: leftarrow,
	LeftArrow: LeftArrow,
	Leftarrow: Leftarrow,
	LeftArrowRightArrow: LeftArrowRightArrow,
	leftarrowtail: leftarrowtail,
	LeftCeiling: LeftCeiling,
	LeftDoubleBracket: LeftDoubleBracket,
	LeftDownTeeVector: LeftDownTeeVector,
	LeftDownVectorBar: LeftDownVectorBar,
	LeftDownVector: LeftDownVector,
	LeftFloor: LeftFloor,
	leftharpoondown: leftharpoondown,
	leftharpoonup: leftharpoonup,
	leftleftarrows: leftleftarrows,
	leftrightarrow: leftrightarrow,
	LeftRightArrow: LeftRightArrow,
	Leftrightarrow: Leftrightarrow,
	leftrightarrows: leftrightarrows,
	leftrightharpoons: leftrightharpoons,
	leftrightsquigarrow: leftrightsquigarrow,
	LeftRightVector: LeftRightVector,
	LeftTeeArrow: LeftTeeArrow,
	LeftTee: LeftTee,
	LeftTeeVector: LeftTeeVector,
	leftthreetimes: leftthreetimes,
	LeftTriangleBar: LeftTriangleBar,
	LeftTriangle: LeftTriangle,
	LeftTriangleEqual: LeftTriangleEqual,
	LeftUpDownVector: LeftUpDownVector,
	LeftUpTeeVector: LeftUpTeeVector,
	LeftUpVectorBar: LeftUpVectorBar,
	LeftUpVector: LeftUpVector,
	LeftVectorBar: LeftVectorBar,
	LeftVector: LeftVector,
	lEg: lEg,
	leg: leg,
	leq: leq,
	leqq: leqq,
	leqslant: leqslant,
	lescc: lescc,
	les: les,
	lesdot: lesdot,
	lesdoto: lesdoto,
	lesdotor: lesdotor,
	lesg: lesg,
	lesges: lesges,
	lessapprox: lessapprox,
	lessdot: lessdot,
	lesseqgtr: lesseqgtr,
	lesseqqgtr: lesseqqgtr,
	LessEqualGreater: LessEqualGreater,
	LessFullEqual: LessFullEqual,
	LessGreater: LessGreater,
	lessgtr: lessgtr,
	LessLess: LessLess,
	lesssim: lesssim,
	LessSlantEqual: LessSlantEqual,
	LessTilde: LessTilde,
	lfisht: lfisht,
	lfloor: lfloor,
	Lfr: Lfr,
	lfr: lfr,
	lg: lg,
	lgE: lgE,
	lHar: lHar,
	lhard: lhard,
	lharu: lharu,
	lharul: lharul,
	lhblk: lhblk,
	LJcy: LJcy,
	ljcy: ljcy,
	llarr: llarr,
	ll: ll,
	Ll: Ll,
	llcorner: llcorner,
	Lleftarrow: Lleftarrow,
	llhard: llhard,
	lltri: lltri,
	Lmidot: Lmidot,
	lmidot: lmidot,
	lmoustache: lmoustache,
	lmoust: lmoust,
	lnap: lnap,
	lnapprox: lnapprox,
	lne: lne,
	lnE: lnE,
	lneq: lneq,
	lneqq: lneqq,
	lnsim: lnsim,
	loang: loang,
	loarr: loarr,
	lobrk: lobrk,
	longleftarrow: longleftarrow,
	LongLeftArrow: LongLeftArrow,
	Longleftarrow: Longleftarrow,
	longleftrightarrow: longleftrightarrow,
	LongLeftRightArrow: LongLeftRightArrow,
	Longleftrightarrow: Longleftrightarrow,
	longmapsto: longmapsto,
	longrightarrow: longrightarrow,
	LongRightArrow: LongRightArrow,
	Longrightarrow: Longrightarrow,
	looparrowleft: looparrowleft,
	looparrowright: looparrowright,
	lopar: lopar,
	Lopf: Lopf,
	lopf: lopf,
	loplus: loplus,
	lotimes: lotimes,
	lowast: lowast,
	lowbar: lowbar,
	LowerLeftArrow: LowerLeftArrow,
	LowerRightArrow: LowerRightArrow,
	loz: loz,
	lozenge: lozenge,
	lozf: lozf,
	lpar: lpar,
	lparlt: lparlt,
	lrarr: lrarr,
	lrcorner: lrcorner,
	lrhar: lrhar,
	lrhard: lrhard,
	lrm: lrm,
	lrtri: lrtri,
	lsaquo: lsaquo,
	lscr: lscr,
	Lscr: Lscr,
	lsh: lsh,
	Lsh: Lsh,
	lsim: lsim,
	lsime: lsime,
	lsimg: lsimg,
	lsqb: lsqb,
	lsquo: lsquo,
	lsquor: lsquor,
	Lstrok: Lstrok,
	lstrok: lstrok,
	ltcc: ltcc,
	ltcir: ltcir,
	lt: lt,
	LT: LT,
	Lt: Lt,
	ltdot: ltdot,
	lthree: lthree,
	ltimes: ltimes,
	ltlarr: ltlarr,
	ltquest: ltquest,
	ltri: ltri,
	ltrie: ltrie,
	ltrif: ltrif,
	ltrPar: ltrPar,
	lurdshar: lurdshar,
	luruhar: luruhar,
	lvertneqq: lvertneqq,
	lvnE: lvnE,
	macr: macr,
	male: male,
	malt: malt,
	maltese: maltese,
	"Map": "⤅",
	map: map,
	mapsto: mapsto,
	mapstodown: mapstodown,
	mapstoleft: mapstoleft,
	mapstoup: mapstoup,
	marker: marker,
	mcomma: mcomma,
	Mcy: Mcy,
	mcy: mcy,
	mdash: mdash,
	mDDot: mDDot,
	measuredangle: measuredangle,
	MediumSpace: MediumSpace,
	Mellintrf: Mellintrf,
	Mfr: Mfr,
	mfr: mfr,
	mho: mho,
	micro: micro,
	midast: midast,
	midcir: midcir,
	mid: mid,
	middot: middot,
	minusb: minusb,
	minus: minus,
	minusd: minusd,
	minusdu: minusdu,
	MinusPlus: MinusPlus,
	mlcp: mlcp,
	mldr: mldr,
	mnplus: mnplus,
	models: models,
	Mopf: Mopf,
	mopf: mopf,
	mp: mp,
	mscr: mscr,
	Mscr: Mscr,
	mstpos: mstpos,
	Mu: Mu,
	mu: mu,
	multimap: multimap,
	mumap: mumap,
	nabla: nabla,
	Nacute: Nacute,
	nacute: nacute,
	nang: nang,
	nap: nap,
	napE: napE,
	napid: napid,
	napos: napos,
	napprox: napprox,
	natural: natural,
	naturals: naturals,
	natur: natur,
	nbsp: nbsp,
	nbump: nbump,
	nbumpe: nbumpe,
	ncap: ncap,
	Ncaron: Ncaron,
	ncaron: ncaron,
	Ncedil: Ncedil,
	ncedil: ncedil,
	ncong: ncong,
	ncongdot: ncongdot,
	ncup: ncup,
	Ncy: Ncy,
	ncy: ncy,
	ndash: ndash,
	nearhk: nearhk,
	nearr: nearr,
	neArr: neArr,
	nearrow: nearrow,
	ne: ne,
	nedot: nedot,
	NegativeMediumSpace: NegativeMediumSpace,
	NegativeThickSpace: NegativeThickSpace,
	NegativeThinSpace: NegativeThinSpace,
	NegativeVeryThinSpace: NegativeVeryThinSpace,
	nequiv: nequiv,
	nesear: nesear,
	nesim: nesim,
	NestedGreaterGreater: NestedGreaterGreater,
	NestedLessLess: NestedLessLess,
	NewLine: NewLine,
	nexist: nexist,
	nexists: nexists,
	Nfr: Nfr,
	nfr: nfr,
	ngE: ngE,
	nge: nge,
	ngeq: ngeq,
	ngeqq: ngeqq,
	ngeqslant: ngeqslant,
	nges: nges,
	nGg: nGg,
	ngsim: ngsim,
	nGt: nGt,
	ngt: ngt,
	ngtr: ngtr,
	nGtv: nGtv,
	nharr: nharr,
	nhArr: nhArr,
	nhpar: nhpar,
	ni: ni,
	nis: nis,
	nisd: nisd,
	niv: niv,
	NJcy: NJcy,
	njcy: njcy,
	nlarr: nlarr,
	nlArr: nlArr,
	nldr: nldr,
	nlE: nlE,
	nle: nle,
	nleftarrow: nleftarrow,
	nLeftarrow: nLeftarrow,
	nleftrightarrow: nleftrightarrow,
	nLeftrightarrow: nLeftrightarrow,
	nleq: nleq,
	nleqq: nleqq,
	nleqslant: nleqslant,
	nles: nles,
	nless: nless,
	nLl: nLl,
	nlsim: nlsim,
	nLt: nLt,
	nlt: nlt,
	nltri: nltri,
	nltrie: nltrie,
	nLtv: nLtv,
	nmid: nmid,
	NoBreak: NoBreak,
	NonBreakingSpace: NonBreakingSpace,
	nopf: nopf,
	Nopf: Nopf,
	Not: Not,
	not: not,
	NotCongruent: NotCongruent,
	NotCupCap: NotCupCap,
	NotDoubleVerticalBar: NotDoubleVerticalBar,
	NotElement: NotElement,
	NotEqual: NotEqual,
	NotEqualTilde: NotEqualTilde,
	NotExists: NotExists,
	NotGreater: NotGreater,
	NotGreaterEqual: NotGreaterEqual,
	NotGreaterFullEqual: NotGreaterFullEqual,
	NotGreaterGreater: NotGreaterGreater,
	NotGreaterLess: NotGreaterLess,
	NotGreaterSlantEqual: NotGreaterSlantEqual,
	NotGreaterTilde: NotGreaterTilde,
	NotHumpDownHump: NotHumpDownHump,
	NotHumpEqual: NotHumpEqual,
	notin: notin,
	notindot: notindot,
	notinE: notinE,
	notinva: notinva,
	notinvb: notinvb,
	notinvc: notinvc,
	NotLeftTriangleBar: NotLeftTriangleBar,
	NotLeftTriangle: NotLeftTriangle,
	NotLeftTriangleEqual: NotLeftTriangleEqual,
	NotLess: NotLess,
	NotLessEqual: NotLessEqual,
	NotLessGreater: NotLessGreater,
	NotLessLess: NotLessLess,
	NotLessSlantEqual: NotLessSlantEqual,
	NotLessTilde: NotLessTilde,
	NotNestedGreaterGreater: NotNestedGreaterGreater,
	NotNestedLessLess: NotNestedLessLess,
	notni: notni,
	notniva: notniva,
	notnivb: notnivb,
	notnivc: notnivc,
	NotPrecedes: NotPrecedes,
	NotPrecedesEqual: NotPrecedesEqual,
	NotPrecedesSlantEqual: NotPrecedesSlantEqual,
	NotReverseElement: NotReverseElement,
	NotRightTriangleBar: NotRightTriangleBar,
	NotRightTriangle: NotRightTriangle,
	NotRightTriangleEqual: NotRightTriangleEqual,
	NotSquareSubset: NotSquareSubset,
	NotSquareSubsetEqual: NotSquareSubsetEqual,
	NotSquareSuperset: NotSquareSuperset,
	NotSquareSupersetEqual: NotSquareSupersetEqual,
	NotSubset: NotSubset,
	NotSubsetEqual: NotSubsetEqual,
	NotSucceeds: NotSucceeds,
	NotSucceedsEqual: NotSucceedsEqual,
	NotSucceedsSlantEqual: NotSucceedsSlantEqual,
	NotSucceedsTilde: NotSucceedsTilde,
	NotSuperset: NotSuperset,
	NotSupersetEqual: NotSupersetEqual,
	NotTilde: NotTilde,
	NotTildeEqual: NotTildeEqual,
	NotTildeFullEqual: NotTildeFullEqual,
	NotTildeTilde: NotTildeTilde,
	NotVerticalBar: NotVerticalBar,
	nparallel: nparallel,
	npar: npar,
	nparsl: nparsl,
	npart: npart,
	npolint: npolint,
	npr: npr,
	nprcue: nprcue,
	nprec: nprec,
	npreceq: npreceq,
	npre: npre,
	nrarrc: nrarrc,
	nrarr: nrarr,
	nrArr: nrArr,
	nrarrw: nrarrw,
	nrightarrow: nrightarrow,
	nRightarrow: nRightarrow,
	nrtri: nrtri,
	nrtrie: nrtrie,
	nsc: nsc,
	nsccue: nsccue,
	nsce: nsce,
	Nscr: Nscr,
	nscr: nscr,
	nshortmid: nshortmid,
	nshortparallel: nshortparallel,
	nsim: nsim,
	nsime: nsime,
	nsimeq: nsimeq,
	nsmid: nsmid,
	nspar: nspar,
	nsqsube: nsqsube,
	nsqsupe: nsqsupe,
	nsub: nsub,
	nsubE: nsubE,
	nsube: nsube,
	nsubset: nsubset,
	nsubseteq: nsubseteq,
	nsubseteqq: nsubseteqq,
	nsucc: nsucc,
	nsucceq: nsucceq,
	nsup: nsup,
	nsupE: nsupE,
	nsupe: nsupe,
	nsupset: nsupset,
	nsupseteq: nsupseteq,
	nsupseteqq: nsupseteqq,
	ntgl: ntgl,
	Ntilde: Ntilde,
	ntilde: ntilde,
	ntlg: ntlg,
	ntriangleleft: ntriangleleft,
	ntrianglelefteq: ntrianglelefteq,
	ntriangleright: ntriangleright,
	ntrianglerighteq: ntrianglerighteq,
	Nu: Nu,
	nu: nu,
	num: num,
	numero: numero,
	numsp: numsp,
	nvap: nvap,
	nvdash: nvdash,
	nvDash: nvDash,
	nVdash: nVdash,
	nVDash: nVDash,
	nvge: nvge,
	nvgt: nvgt,
	nvHarr: nvHarr,
	nvinfin: nvinfin,
	nvlArr: nvlArr,
	nvle: nvle,
	nvlt: nvlt,
	nvltrie: nvltrie,
	nvrArr: nvrArr,
	nvrtrie: nvrtrie,
	nvsim: nvsim,
	nwarhk: nwarhk,
	nwarr: nwarr,
	nwArr: nwArr,
	nwarrow: nwarrow,
	nwnear: nwnear,
	Oacute: Oacute,
	oacute: oacute,
	oast: oast,
	Ocirc: Ocirc,
	ocirc: ocirc,
	ocir: ocir,
	Ocy: Ocy,
	ocy: ocy,
	odash: odash,
	Odblac: Odblac,
	odblac: odblac,
	odiv: odiv,
	odot: odot,
	odsold: odsold,
	OElig: OElig,
	oelig: oelig,
	ofcir: ofcir,
	Ofr: Ofr,
	ofr: ofr,
	ogon: ogon,
	Ograve: Ograve,
	ograve: ograve,
	ogt: ogt,
	ohbar: ohbar,
	ohm: ohm,
	oint: oint,
	olarr: olarr,
	olcir: olcir,
	olcross: olcross,
	oline: oline,
	olt: olt,
	Omacr: Omacr,
	omacr: omacr,
	Omega: Omega,
	omega: omega,
	Omicron: Omicron,
	omicron: omicron,
	omid: omid,
	ominus: ominus,
	Oopf: Oopf,
	oopf: oopf,
	opar: opar,
	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
	OpenCurlyQuote: OpenCurlyQuote,
	operp: operp,
	oplus: oplus,
	orarr: orarr,
	Or: Or,
	or: or,
	ord: ord,
	order: order,
	orderof: orderof,
	ordf: ordf,
	ordm: ordm,
	origof: origof,
	oror: oror,
	orslope: orslope,
	orv: orv,
	oS: oS,
	Oscr: Oscr,
	oscr: oscr,
	Oslash: Oslash,
	oslash: oslash,
	osol: osol,
	Otilde: Otilde,
	otilde: otilde,
	otimesas: otimesas,
	Otimes: Otimes,
	otimes: otimes,
	Ouml: Ouml,
	ouml: ouml,
	ovbar: ovbar,
	OverBar: OverBar,
	OverBrace: OverBrace,
	OverBracket: OverBracket,
	OverParenthesis: OverParenthesis,
	para: para,
	parallel: parallel,
	par: par,
	parsim: parsim,
	parsl: parsl,
	part: part,
	PartialD: PartialD,
	Pcy: Pcy,
	pcy: pcy,
	percnt: percnt,
	period: period,
	permil: permil,
	perp: perp,
	pertenk: pertenk,
	Pfr: Pfr,
	pfr: pfr,
	Phi: Phi,
	phi: phi,
	phiv: phiv,
	phmmat: phmmat,
	phone: phone$1,
	Pi: Pi,
	pi: pi,
	pitchfork: pitchfork,
	piv: piv,
	planck: planck,
	planckh: planckh,
	plankv: plankv,
	plusacir: plusacir,
	plusb: plusb,
	pluscir: pluscir,
	plus: plus,
	plusdo: plusdo,
	plusdu: plusdu,
	pluse: pluse,
	PlusMinus: PlusMinus,
	plusmn: plusmn,
	plussim: plussim,
	plustwo: plustwo,
	pm: pm,
	Poincareplane: Poincareplane,
	pointint: pointint,
	popf: popf,
	Popf: Popf,
	pound: pound$1,
	prap: prap,
	Pr: Pr,
	pr: pr,
	prcue: prcue,
	precapprox: precapprox,
	prec: prec,
	preccurlyeq: preccurlyeq,
	Precedes: Precedes,
	PrecedesEqual: PrecedesEqual,
	PrecedesSlantEqual: PrecedesSlantEqual,
	PrecedesTilde: PrecedesTilde,
	preceq: preceq,
	precnapprox: precnapprox,
	precneqq: precneqq,
	precnsim: precnsim,
	pre: pre,
	prE: prE,
	precsim: precsim,
	prime: prime,
	Prime: Prime,
	primes: primes,
	prnap: prnap,
	prnE: prnE,
	prnsim: prnsim,
	prod: prod,
	Product: Product,
	profalar: profalar,
	profline: profline,
	profsurf: profsurf,
	prop: prop,
	Proportional: Proportional,
	Proportion: Proportion,
	propto: propto,
	prsim: prsim,
	prurel: prurel,
	Pscr: Pscr,
	pscr: pscr,
	Psi: Psi,
	psi: psi,
	puncsp: puncsp,
	Qfr: Qfr,
	qfr: qfr,
	qint: qint,
	qopf: qopf,
	Qopf: Qopf,
	qprime: qprime,
	Qscr: Qscr,
	qscr: qscr,
	quaternions: quaternions,
	quatint: quatint,
	quest: quest,
	questeq: questeq,
	quot: quot,
	QUOT: QUOT,
	rAarr: rAarr,
	race: race,
	Racute: Racute,
	racute: racute,
	radic: radic,
	raemptyv: raemptyv,
	rang: rang,
	Rang: Rang,
	rangd: rangd,
	range: range,
	rangle: rangle,
	raquo: raquo,
	rarrap: rarrap,
	rarrb: rarrb,
	rarrbfs: rarrbfs,
	rarrc: rarrc,
	rarr: rarr,
	Rarr: Rarr,
	rArr: rArr,
	rarrfs: rarrfs,
	rarrhk: rarrhk,
	rarrlp: rarrlp,
	rarrpl: rarrpl,
	rarrsim: rarrsim,
	Rarrtl: Rarrtl,
	rarrtl: rarrtl,
	rarrw: rarrw,
	ratail: ratail,
	rAtail: rAtail,
	ratio: ratio,
	rationals: rationals,
	rbarr: rbarr,
	rBarr: rBarr,
	RBarr: RBarr,
	rbbrk: rbbrk,
	rbrace: rbrace,
	rbrack: rbrack,
	rbrke: rbrke,
	rbrksld: rbrksld,
	rbrkslu: rbrkslu,
	Rcaron: Rcaron,
	rcaron: rcaron,
	Rcedil: Rcedil,
	rcedil: rcedil,
	rceil: rceil,
	rcub: rcub,
	Rcy: Rcy,
	rcy: rcy,
	rdca: rdca,
	rdldhar: rdldhar,
	rdquo: rdquo,
	rdquor: rdquor,
	rdsh: rdsh,
	real: real,
	realine: realine,
	realpart: realpart,
	reals: reals,
	Re: Re,
	rect: rect,
	reg: reg,
	REG: REG,
	ReverseElement: ReverseElement,
	ReverseEquilibrium: ReverseEquilibrium,
	ReverseUpEquilibrium: ReverseUpEquilibrium,
	rfisht: rfisht,
	rfloor: rfloor,
	rfr: rfr,
	Rfr: Rfr,
	rHar: rHar,
	rhard: rhard,
	rharu: rharu,
	rharul: rharul,
	Rho: Rho,
	rho: rho,
	rhov: rhov,
	RightAngleBracket: RightAngleBracket,
	RightArrowBar: RightArrowBar,
	rightarrow: rightarrow,
	RightArrow: RightArrow,
	Rightarrow: Rightarrow,
	RightArrowLeftArrow: RightArrowLeftArrow,
	rightarrowtail: rightarrowtail,
	RightCeiling: RightCeiling,
	RightDoubleBracket: RightDoubleBracket,
	RightDownTeeVector: RightDownTeeVector,
	RightDownVectorBar: RightDownVectorBar,
	RightDownVector: RightDownVector,
	RightFloor: RightFloor,
	rightharpoondown: rightharpoondown,
	rightharpoonup: rightharpoonup,
	rightleftarrows: rightleftarrows,
	rightleftharpoons: rightleftharpoons,
	rightrightarrows: rightrightarrows,
	rightsquigarrow: rightsquigarrow,
	RightTeeArrow: RightTeeArrow,
	RightTee: RightTee,
	RightTeeVector: RightTeeVector,
	rightthreetimes: rightthreetimes,
	RightTriangleBar: RightTriangleBar,
	RightTriangle: RightTriangle,
	RightTriangleEqual: RightTriangleEqual,
	RightUpDownVector: RightUpDownVector,
	RightUpTeeVector: RightUpTeeVector,
	RightUpVectorBar: RightUpVectorBar,
	RightUpVector: RightUpVector,
	RightVectorBar: RightVectorBar,
	RightVector: RightVector,
	ring: ring$1,
	risingdotseq: risingdotseq,
	rlarr: rlarr,
	rlhar: rlhar,
	rlm: rlm,
	rmoustache: rmoustache,
	rmoust: rmoust,
	rnmid: rnmid,
	roang: roang,
	roarr: roarr,
	robrk: robrk,
	ropar: ropar,
	ropf: ropf,
	Ropf: Ropf,
	roplus: roplus,
	rotimes: rotimes,
	RoundImplies: RoundImplies,
	rpar: rpar,
	rpargt: rpargt,
	rppolint: rppolint,
	rrarr: rrarr,
	Rrightarrow: Rrightarrow,
	rsaquo: rsaquo,
	rscr: rscr,
	Rscr: Rscr,
	rsh: rsh,
	Rsh: Rsh,
	rsqb: rsqb,
	rsquo: rsquo,
	rsquor: rsquor,
	rthree: rthree,
	rtimes: rtimes,
	rtri: rtri,
	rtrie: rtrie,
	rtrif: rtrif,
	rtriltri: rtriltri,
	RuleDelayed: RuleDelayed,
	ruluhar: ruluhar,
	rx: rx,
	Sacute: Sacute,
	sacute: sacute,
	sbquo: sbquo,
	scap: scap,
	Scaron: Scaron,
	scaron: scaron,
	Sc: Sc,
	sc: sc,
	sccue: sccue,
	sce: sce,
	scE: scE,
	Scedil: Scedil,
	scedil: scedil,
	Scirc: Scirc,
	scirc: scirc,
	scnap: scnap,
	scnE: scnE,
	scnsim: scnsim,
	scpolint: scpolint,
	scsim: scsim,
	Scy: Scy,
	scy: scy,
	sdotb: sdotb,
	sdot: sdot,
	sdote: sdote,
	searhk: searhk,
	searr: searr,
	seArr: seArr,
	searrow: searrow,
	sect: sect,
	semi: semi,
	seswar: seswar,
	setminus: setminus,
	setmn: setmn,
	sext: sext,
	Sfr: Sfr,
	sfr: sfr,
	sfrown: sfrown,
	sharp: sharp,
	SHCHcy: SHCHcy,
	shchcy: shchcy,
	SHcy: SHcy,
	shcy: shcy,
	ShortDownArrow: ShortDownArrow,
	ShortLeftArrow: ShortLeftArrow,
	shortmid: shortmid,
	shortparallel: shortparallel,
	ShortRightArrow: ShortRightArrow,
	ShortUpArrow: ShortUpArrow,
	shy: shy,
	Sigma: Sigma,
	sigma: sigma,
	sigmaf: sigmaf,
	sigmav: sigmav,
	sim: sim,
	simdot: simdot,
	sime: sime,
	simeq: simeq,
	simg: simg,
	simgE: simgE,
	siml: siml,
	simlE: simlE,
	simne: simne,
	simplus: simplus,
	simrarr: simrarr,
	slarr: slarr,
	SmallCircle: SmallCircle,
	smallsetminus: smallsetminus,
	smashp: smashp,
	smeparsl: smeparsl,
	smid: smid,
	smile: smile$1,
	smt: smt,
	smte: smte,
	smtes: smtes,
	SOFTcy: SOFTcy,
	softcy: softcy,
	solbar: solbar,
	solb: solb,
	sol: sol,
	Sopf: Sopf,
	sopf: sopf,
	spades: spades$1,
	spadesuit: spadesuit,
	spar: spar,
	sqcap: sqcap,
	sqcaps: sqcaps,
	sqcup: sqcup,
	sqcups: sqcups,
	Sqrt: Sqrt,
	sqsub: sqsub,
	sqsube: sqsube,
	sqsubset: sqsubset,
	sqsubseteq: sqsubseteq,
	sqsup: sqsup,
	sqsupe: sqsupe,
	sqsupset: sqsupset,
	sqsupseteq: sqsupseteq,
	square: square,
	Square: Square,
	SquareIntersection: SquareIntersection,
	SquareSubset: SquareSubset,
	SquareSubsetEqual: SquareSubsetEqual,
	SquareSuperset: SquareSuperset,
	SquareSupersetEqual: SquareSupersetEqual,
	SquareUnion: SquareUnion,
	squarf: squarf,
	squ: squ,
	squf: squf,
	srarr: srarr,
	Sscr: Sscr,
	sscr: sscr,
	ssetmn: ssetmn,
	ssmile: ssmile,
	sstarf: sstarf,
	Star: Star,
	star: star$1,
	starf: starf,
	straightepsilon: straightepsilon,
	straightphi: straightphi,
	strns: strns,
	sub: sub,
	Sub: Sub,
	subdot: subdot,
	subE: subE,
	sube: sube,
	subedot: subedot,
	submult: submult,
	subnE: subnE,
	subne: subne,
	subplus: subplus,
	subrarr: subrarr,
	subset: subset,
	Subset: Subset,
	subseteq: subseteq,
	subseteqq: subseteqq,
	SubsetEqual: SubsetEqual,
	subsetneq: subsetneq,
	subsetneqq: subsetneqq,
	subsim: subsim,
	subsub: subsub,
	subsup: subsup,
	succapprox: succapprox,
	succ: succ,
	succcurlyeq: succcurlyeq,
	Succeeds: Succeeds,
	SucceedsEqual: SucceedsEqual,
	SucceedsSlantEqual: SucceedsSlantEqual,
	SucceedsTilde: SucceedsTilde,
	succeq: succeq,
	succnapprox: succnapprox,
	succneqq: succneqq,
	succnsim: succnsim,
	succsim: succsim,
	SuchThat: SuchThat,
	sum: sum,
	Sum: Sum,
	sung: sung,
	sup1: sup1,
	sup2: sup2,
	sup3: sup3,
	sup: sup,
	Sup: Sup,
	supdot: supdot,
	supdsub: supdsub,
	supE: supE,
	supe: supe,
	supedot: supedot,
	Superset: Superset,
	SupersetEqual: SupersetEqual,
	suphsol: suphsol,
	suphsub: suphsub,
	suplarr: suplarr,
	supmult: supmult,
	supnE: supnE,
	supne: supne,
	supplus: supplus,
	supset: supset,
	Supset: Supset,
	supseteq: supseteq,
	supseteqq: supseteqq,
	supsetneq: supsetneq,
	supsetneqq: supsetneqq,
	supsim: supsim,
	supsub: supsub,
	supsup: supsup,
	swarhk: swarhk,
	swarr: swarr,
	swArr: swArr,
	swarrow: swarrow,
	swnwar: swnwar,
	szlig: szlig,
	Tab: Tab,
	target: target,
	Tau: Tau,
	tau: tau,
	tbrk: tbrk,
	Tcaron: Tcaron,
	tcaron: tcaron,
	Tcedil: Tcedil,
	tcedil: tcedil,
	Tcy: Tcy,
	tcy: tcy,
	tdot: tdot,
	telrec: telrec,
	Tfr: Tfr,
	tfr: tfr,
	there4: there4,
	therefore: therefore,
	Therefore: Therefore,
	Theta: Theta,
	theta: theta,
	thetasym: thetasym,
	thetav: thetav,
	thickapprox: thickapprox,
	thicksim: thicksim,
	ThickSpace: ThickSpace,
	ThinSpace: ThinSpace,
	thinsp: thinsp,
	thkap: thkap,
	thksim: thksim,
	THORN: THORN,
	thorn: thorn,
	tilde: tilde,
	Tilde: Tilde,
	TildeEqual: TildeEqual,
	TildeFullEqual: TildeFullEqual,
	TildeTilde: TildeTilde,
	timesbar: timesbar,
	timesb: timesb,
	times: times,
	timesd: timesd,
	tint: tint,
	toea: toea,
	topbot: topbot,
	topcir: topcir,
	top: top$1,
	Topf: Topf,
	topf: topf,
	topfork: topfork,
	tosa: tosa,
	tprime: tprime,
	trade: trade,
	TRADE: TRADE,
	triangle: triangle,
	triangledown: triangledown,
	triangleleft: triangleleft,
	trianglelefteq: trianglelefteq,
	triangleq: triangleq,
	triangleright: triangleright,
	trianglerighteq: trianglerighteq,
	tridot: tridot,
	trie: trie,
	triminus: triminus,
	TripleDot: TripleDot,
	triplus: triplus,
	trisb: trisb,
	tritime: tritime,
	trpezium: trpezium,
	Tscr: Tscr,
	tscr: tscr,
	TScy: TScy,
	tscy: tscy,
	TSHcy: TSHcy,
	tshcy: tshcy,
	Tstrok: Tstrok,
	tstrok: tstrok,
	twixt: twixt,
	twoheadleftarrow: twoheadleftarrow,
	twoheadrightarrow: twoheadrightarrow,
	Uacute: Uacute,
	uacute: uacute,
	uarr: uarr,
	Uarr: Uarr,
	uArr: uArr,
	Uarrocir: Uarrocir,
	Ubrcy: Ubrcy,
	ubrcy: ubrcy,
	Ubreve: Ubreve,
	ubreve: ubreve,
	Ucirc: Ucirc,
	ucirc: ucirc,
	Ucy: Ucy,
	ucy: ucy,
	udarr: udarr,
	Udblac: Udblac,
	udblac: udblac,
	udhar: udhar,
	ufisht: ufisht,
	Ufr: Ufr,
	ufr: ufr,
	Ugrave: Ugrave,
	ugrave: ugrave,
	uHar: uHar,
	uharl: uharl,
	uharr: uharr,
	uhblk: uhblk,
	ulcorn: ulcorn,
	ulcorner: ulcorner,
	ulcrop: ulcrop,
	ultri: ultri,
	Umacr: Umacr,
	umacr: umacr,
	uml: uml,
	UnderBar: UnderBar,
	UnderBrace: UnderBrace,
	UnderBracket: UnderBracket,
	UnderParenthesis: UnderParenthesis,
	Union: Union,
	UnionPlus: UnionPlus,
	Uogon: Uogon,
	uogon: uogon,
	Uopf: Uopf,
	uopf: uopf,
	UpArrowBar: UpArrowBar,
	uparrow: uparrow,
	UpArrow: UpArrow,
	Uparrow: Uparrow,
	UpArrowDownArrow: UpArrowDownArrow,
	updownarrow: updownarrow,
	UpDownArrow: UpDownArrow,
	Updownarrow: Updownarrow,
	UpEquilibrium: UpEquilibrium,
	upharpoonleft: upharpoonleft,
	upharpoonright: upharpoonright,
	uplus: uplus,
	UpperLeftArrow: UpperLeftArrow,
	UpperRightArrow: UpperRightArrow,
	upsi: upsi,
	Upsi: Upsi,
	upsih: upsih,
	Upsilon: Upsilon,
	upsilon: upsilon,
	UpTeeArrow: UpTeeArrow,
	UpTee: UpTee,
	upuparrows: upuparrows,
	urcorn: urcorn,
	urcorner: urcorner,
	urcrop: urcrop,
	Uring: Uring,
	uring: uring,
	urtri: urtri,
	Uscr: Uscr,
	uscr: uscr,
	utdot: utdot,
	Utilde: Utilde,
	utilde: utilde,
	utri: utri,
	utrif: utrif,
	uuarr: uuarr,
	Uuml: Uuml,
	uuml: uuml,
	uwangle: uwangle,
	vangrt: vangrt,
	varepsilon: varepsilon,
	varkappa: varkappa,
	varnothing: varnothing,
	varphi: varphi,
	varpi: varpi,
	varpropto: varpropto,
	varr: varr,
	vArr: vArr,
	varrho: varrho,
	varsigma: varsigma,
	varsubsetneq: varsubsetneq,
	varsubsetneqq: varsubsetneqq,
	varsupsetneq: varsupsetneq,
	varsupsetneqq: varsupsetneqq,
	vartheta: vartheta,
	vartriangleleft: vartriangleleft,
	vartriangleright: vartriangleright,
	vBar: vBar,
	Vbar: Vbar,
	vBarv: vBarv,
	Vcy: Vcy,
	vcy: vcy,
	vdash: vdash,
	vDash: vDash,
	Vdash: Vdash,
	VDash: VDash,
	Vdashl: Vdashl,
	veebar: veebar,
	vee: vee,
	Vee: Vee,
	veeeq: veeeq,
	vellip: vellip,
	verbar: verbar,
	Verbar: Verbar,
	vert: vert,
	Vert: Vert,
	VerticalBar: VerticalBar,
	VerticalLine: VerticalLine,
	VerticalSeparator: VerticalSeparator,
	VerticalTilde: VerticalTilde,
	VeryThinSpace: VeryThinSpace,
	Vfr: Vfr,
	vfr: vfr,
	vltri: vltri,
	vnsub: vnsub,
	vnsup: vnsup,
	Vopf: Vopf,
	vopf: vopf,
	vprop: vprop,
	vrtri: vrtri,
	Vscr: Vscr,
	vscr: vscr,
	vsubnE: vsubnE,
	vsubne: vsubne,
	vsupnE: vsupnE,
	vsupne: vsupne,
	Vvdash: Vvdash,
	vzigzag: vzigzag,
	Wcirc: Wcirc,
	wcirc: wcirc,
	wedbar: wedbar,
	wedge: wedge,
	Wedge: Wedge,
	wedgeq: wedgeq,
	weierp: weierp,
	Wfr: Wfr,
	wfr: wfr,
	Wopf: Wopf,
	wopf: wopf,
	wp: wp,
	wr: wr,
	wreath: wreath,
	Wscr: Wscr,
	wscr: wscr,
	xcap: xcap,
	xcirc: xcirc,
	xcup: xcup,
	xdtri: xdtri,
	Xfr: Xfr,
	xfr: xfr,
	xharr: xharr,
	xhArr: xhArr,
	Xi: Xi,
	xi: xi,
	xlarr: xlarr,
	xlArr: xlArr,
	xmap: xmap,
	xnis: xnis,
	xodot: xodot,
	Xopf: Xopf,
	xopf: xopf,
	xoplus: xoplus,
	xotime: xotime,
	xrarr: xrarr,
	xrArr: xrArr,
	Xscr: Xscr,
	xscr: xscr,
	xsqcup: xsqcup,
	xuplus: xuplus,
	xutri: xutri,
	xvee: xvee,
	xwedge: xwedge,
	Yacute: Yacute,
	yacute: yacute,
	YAcy: YAcy,
	yacy: yacy,
	Ycirc: Ycirc,
	ycirc: ycirc,
	Ycy: Ycy,
	ycy: ycy,
	yen: yen$1,
	Yfr: Yfr,
	yfr: yfr,
	YIcy: YIcy,
	yicy: yicy,
	Yopf: Yopf,
	yopf: yopf,
	Yscr: Yscr,
	yscr: yscr,
	YUcy: YUcy,
	yucy: yucy,
	yuml: yuml,
	Yuml: Yuml,
	Zacute: Zacute,
	zacute: zacute,
	Zcaron: Zcaron,
	zcaron: zcaron,
	Zcy: Zcy,
	zcy: zcy,
	Zdot: Zdot,
	zdot: zdot,
	zeetrf: zeetrf,
	ZeroWidthSpace: ZeroWidthSpace,
	Zeta: Zeta,
	zeta: zeta,
	zfr: zfr,
	Zfr: Zfr,
	ZHcy: ZHcy,
	zhcy: zhcy,
	zigrarr: zigrarr,
	zopf: zopf,
	Zopf: Zopf,
	Zscr: Zscr,
	zscr: zscr,
	zwj: zwj,
	zwnj: zwnj
};

/*eslint quotes:0*/


var entities$1 = require$$0$1;

var regex$4 = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

var mdurl$1 = {};

var encodeCache = {}; // Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//

function getEncodeCache(exclude) {
  var i,
      ch,
      cache = encodeCache[exclude];

  if (cache) {
    return cache;
  }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
} // Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//


function encode(string, exclude, keepEscaped) {
  var i,
      l,
      code,
      nextCode,
      cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped = exclude;
    exclude = encode.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25
    /* % */
    && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);

        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }

      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";
var encode_1 = encode;

/* eslint-disable no-bitwise */


var decodeCache = {};

function getDecodeCache(exclude) {
  var i,
      ch,
      cache = decodeCache[exclude];

  if (cache) {
    return cache;
  }

  cache = decodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);
    cache.push(ch);
  }

  for (i = 0; i < exclude.length; i++) {
    ch = exclude.charCodeAt(i);
    cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
  }

  return cache;
} // Decode percent-encoded string.
//


function decode(string, exclude) {
  var cache;

  if (typeof exclude !== 'string') {
    exclude = decode.defaultChars;
  }

  cache = getDecodeCache(exclude);
  return string.replace(/(%[a-f0-9]{2})+/gi, function (seq) {
    var i,
        l,
        b1,
        b2,
        b3,
        b4,
        chr,
        result = '';

    for (i = 0, l = seq.length; i < l; i += 3) {
      b1 = parseInt(seq.slice(i + 1, i + 3), 16);

      if (b1 < 0x80) {
        result += cache[b1];
        continue;
      }

      if ((b1 & 0xE0) === 0xC0 && i + 3 < l) {
        // 110xxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);

        if ((b2 & 0xC0) === 0x80) {
          chr = b1 << 6 & 0x7C0 | b2 & 0x3F;

          if (chr < 0x80) {
            result += '\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 3;
          continue;
        }
      }

      if ((b1 & 0xF0) === 0xE0 && i + 6 < l) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
          chr = b1 << 12 & 0xF000 | b2 << 6 & 0xFC0 | b3 & 0x3F;

          if (chr < 0x800 || chr >= 0xD800 && chr <= 0xDFFF) {
            result += '\ufffd\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 6;
          continue;
        }
      }

      if ((b1 & 0xF8) === 0xF0 && i + 9 < l) {
        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);
        b4 = parseInt(seq.slice(i + 10, i + 12), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
          chr = b1 << 18 & 0x1C0000 | b2 << 12 & 0x3F000 | b3 << 6 & 0xFC0 | b4 & 0x3F;

          if (chr < 0x10000 || chr > 0x10FFFF) {
            result += '\ufffd\ufffd\ufffd\ufffd';
          } else {
            chr -= 0x10000;
            result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
          }

          i += 9;
          continue;
        }
      }

      result += '\ufffd';
    }

    return result;
  });
}

decode.defaultChars = ';/?:@&=+$,#';
decode.componentChars = '';
var decode_1 = decode;

var format = function format(url) {
  var result = '';
  result += url.protocol || '';
  result += url.slashes ? '//' : '';
  result += url.auth ? url.auth + '@' : '';

  if (url.hostname && url.hostname.indexOf(':') !== -1) {
    // ipv6 address
    result += '[' + url.hostname + ']';
  } else {
    result += url.hostname || '';
  }

  result += url.port ? ':' + url.port : '';
  result += url.pathname || '';
  result += url.search || '';
  result += url.hash || '';
  return result;
};

// Changes from joyent/node:
//
// 1. No leading slash in paths,
//    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
//
// 2. Backslashes are not replaced with slashes,
//    so `http:\\example.org\` is treated like a relative path
//
// 3. Trailing colon is treated like a part of the path,
//    i.e. in `http://example.org:foo` pathname is `:foo`
//
// 4. Nothing is URL-encoded in the resulting object,
//    (in joyent/node some chars in auth and paths are encoded)
//
// 5. `url.parse()` does not have `parseQueryString` argument
//
// 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
//    which can be constructed using other parts of the url.
//


function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.pathname = null;
} // Reference: RFC 3986, RFC 1808, RFC 2396
// define these here so at least they only have to be
// compiled once on the first module load.


var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,
    // Special case for a simple path URL
simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
    // RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
    // RFC 2396: characters not allowed for various reasons.
unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.

/* eslint-disable no-script-url */
// protocols that never have a hostname.
hostlessProtocol = {
  'javascript': true,
  'javascript:': true
},
    // protocols that always contain a // bit.
slashedProtocol = {
  'http': true,
  'https': true,
  'ftp': true,
  'gopher': true,
  'file': true,
  'http:': true,
  'https:': true,
  'ftp:': true,
  'gopher:': true,
  'file:': true
};
/* eslint-enable no-script-url */

function urlParse(url, slashesDenoteHost) {
  if (url && url instanceof Url) {
    return url;
  }

  var u = new Url();
  u.parse(url, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function (url, slashesDenoteHost) {
  var i,
      l,
      lowerProto,
      hec,
      slashes,
      rest = url; // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"

  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);

    if (simplePath) {
      this.pathname = simplePath[1];

      if (simplePath[2]) {
        this.search = simplePath[2];
      }

      return this;
    }
  }

  var proto = protocolPattern.exec(rest);

  if (proto) {
    proto = proto[0];
    lowerProto = proto.toLowerCase();
    this.protocol = proto;
    rest = rest.substr(proto.length);
  } // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.


  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    slashes = rest.substr(0, 2) === '//';

    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c
    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.
    // find the first instance of any hostEndingChars
    var hostEnd = -1;

    for (i = 0; i < hostEndingChars.length; i++) {
      hec = rest.indexOf(hostEndingChars[i]);

      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    } // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.


    var auth, atSign;

    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    } // Now we have a portion which is definitely the auth.
    // Pull that off.


    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = auth;
    } // the host is the remaining to the left of the first non-host char


    hostEnd = -1;

    for (i = 0; i < nonHostChars.length; i++) {
      hec = rest.indexOf(nonHostChars[i]);

      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    } // if we still have not hit it, then the entire thing is a host.


    if (hostEnd === -1) {
      hostEnd = rest.length;
    }

    if (rest[hostEnd - 1] === ':') {
      hostEnd--;
    }

    var host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd); // pull out port.

    this.parseHost(host); // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.

    this.hostname = this.hostname || ''; // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.

    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']'; // validate a little.

    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);

      for (i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];

        if (!part) {
          continue;
        }

        if (!part.match(hostnamePartPattern)) {
          var newpart = '';

          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          } // we test again with ASCII char only


          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);

            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }

            if (notHost.length) {
              rest = notHost.join('.') + rest;
            }

            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } // strip [ and ] from the hostname
    // the host field still retains them, though


    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
    }
  } // chop off from the tail first.


  var hash = rest.indexOf('#');

  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }

  var qm = rest.indexOf('?');

  if (qm !== -1) {
    this.search = rest.substr(qm);
    rest = rest.slice(0, qm);
  }

  if (rest) {
    this.pathname = rest;
  }

  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
    this.pathname = '';
  }

  return this;
};

Url.prototype.parseHost = function (host) {
  var port = portPattern.exec(host);

  if (port) {
    port = port[0];

    if (port !== ':') {
      this.port = port.substr(1);
    }

    host = host.substr(0, host.length - port.length);
  }

  if (host) {
    this.hostname = host;
  }
};

var parse = urlParse;

mdurl$1.encode = encode_1;
mdurl$1.decode = decode_1;
mdurl$1.format = format;
mdurl$1.parse = parse;

var uc_micro = {};

var regex$3 = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

var regex$2 = /[\0-\x1F\x7F-\x9F]/;

var regex$1 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;

var regex = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

uc_micro.Any = regex$3;
uc_micro.Cc = regex$2;
uc_micro.Cf = regex$1;
uc_micro.P = regex$4;
uc_micro.Z = regex;

(function (exports) {

  function _class(obj) {
    return Object.prototype.toString.call(obj);
  }

  function isString(obj) {
    return _class(obj) === '[object String]';
  }

  var _hasOwnProperty = Object.prototype.hasOwnProperty;

  function has(object, key) {
    return _hasOwnProperty.call(object, key);
  } // Merge objects
  //


  function assign(obj
  /*from1, from2, from3, ...*/
  ) {
    var sources = Array.prototype.slice.call(arguments, 1);
    sources.forEach(function (source) {
      if (!source) {
        return;
      }

      if (typeof source !== 'object') {
        throw new TypeError(source + 'must be object');
      }

      Object.keys(source).forEach(function (key) {
        obj[key] = source[key];
      });
    });
    return obj;
  } // Remove element from array and put another array at those position.
  // Useful for some operations with tokens


  function arrayReplaceAt(src, pos, newElements) {
    return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
  } ////////////////////////////////////////////////////////////////////////////////


  function isValidEntityCode(c) {
    /*eslint no-bitwise:0*/
    // broken sequence
    if (c >= 0xD800 && c <= 0xDFFF) {
      return false;
    } // never used


    if (c >= 0xFDD0 && c <= 0xFDEF) {
      return false;
    }

    if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) {
      return false;
    } // control codes


    if (c >= 0x00 && c <= 0x08) {
      return false;
    }

    if (c === 0x0B) {
      return false;
    }

    if (c >= 0x0E && c <= 0x1F) {
      return false;
    }

    if (c >= 0x7F && c <= 0x9F) {
      return false;
    } // out of range


    if (c > 0x10FFFF) {
      return false;
    }

    return true;
  }

  function fromCodePoint(c) {
    /*eslint no-bitwise:0*/
    if (c > 0xffff) {
      c -= 0x10000;
      var surrogate1 = 0xd800 + (c >> 10),
          surrogate2 = 0xdc00 + (c & 0x3ff);
      return String.fromCharCode(surrogate1, surrogate2);
    }

    return String.fromCharCode(c);
  }

  var UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
  var ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
  var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');
  var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
  var entities = entities$1;

  function replaceEntityPattern(match, name) {
    var code = 0;

    if (has(entities, name)) {
      return entities[name];
    }

    if (name.charCodeAt(0) === 0x23
    /* # */
    && DIGITAL_ENTITY_TEST_RE.test(name)) {
      code = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);

      if (isValidEntityCode(code)) {
        return fromCodePoint(code);
      }
    }

    return match;
  }
  /*function replaceEntities(str) {
    if (str.indexOf('&') < 0) { return str; }
  
    return str.replace(ENTITY_RE, replaceEntityPattern);
  }*/


  function unescapeMd(str) {
    if (str.indexOf('\\') < 0) {
      return str;
    }

    return str.replace(UNESCAPE_MD_RE, '$1');
  }

  function unescapeAll(str) {
    if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) {
      return str;
    }

    return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
      if (escaped) {
        return escaped;
      }

      return replaceEntityPattern(match, entity);
    });
  } ////////////////////////////////////////////////////////////////////////////////


  var HTML_ESCAPE_TEST_RE = /[&<>"]/;
  var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
  var HTML_REPLACEMENTS = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };

  function replaceUnsafeChar(ch) {
    return HTML_REPLACEMENTS[ch];
  }

  function escapeHtml(str) {
    if (HTML_ESCAPE_TEST_RE.test(str)) {
      return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
    }

    return str;
  } ////////////////////////////////////////////////////////////////////////////////


  var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;

  function escapeRE(str) {
    return str.replace(REGEXP_ESCAPE_RE, '\\$&');
  } ////////////////////////////////////////////////////////////////////////////////


  function isSpace(code) {
    switch (code) {
      case 0x09:
      case 0x20:
        return true;
    }

    return false;
  } // Zs (unicode class) || [\t\f\v\r\n]


  function isWhiteSpace(code) {
    if (code >= 0x2000 && code <= 0x200A) {
      return true;
    }

    switch (code) {
      case 0x09: // \t

      case 0x0A: // \n

      case 0x0B: // \v

      case 0x0C: // \f

      case 0x0D: // \r

      case 0x20:
      case 0xA0:
      case 0x1680:
      case 0x202F:
      case 0x205F:
      case 0x3000:
        return true;
    }

    return false;
  } ////////////////////////////////////////////////////////////////////////////////

  /*eslint-disable max-len*/


  var UNICODE_PUNCT_RE = regex$4; // Currently without astral characters support.

  function isPunctChar(ch) {
    return UNICODE_PUNCT_RE.test(ch);
  } // Markdown ASCII punctuation characters.
  //
  // !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
  // http://spec.commonmark.org/0.15/#ascii-punctuation-character
  //
  // Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
  //


  function isMdAsciiPunct(ch) {
    switch (ch) {
      case 0x21
      /* ! */
      :
      case 0x22
      /* " */
      :
      case 0x23
      /* # */
      :
      case 0x24
      /* $ */
      :
      case 0x25
      /* % */
      :
      case 0x26
      /* & */
      :
      case 0x27
      /* ' */
      :
      case 0x28
      /* ( */
      :
      case 0x29
      /* ) */
      :
      case 0x2A
      /* * */
      :
      case 0x2B
      /* + */
      :
      case 0x2C
      /* , */
      :
      case 0x2D
      /* - */
      :
      case 0x2E
      /* . */
      :
      case 0x2F
      /* / */
      :
      case 0x3A
      /* : */
      :
      case 0x3B
      /* ; */
      :
      case 0x3C
      /* < */
      :
      case 0x3D
      /* = */
      :
      case 0x3E
      /* > */
      :
      case 0x3F
      /* ? */
      :
      case 0x40
      /* @ */
      :
      case 0x5B
      /* [ */
      :
      case 0x5C
      /* \ */
      :
      case 0x5D
      /* ] */
      :
      case 0x5E
      /* ^ */
      :
      case 0x5F
      /* _ */
      :
      case 0x60
      /* ` */
      :
      case 0x7B
      /* { */
      :
      case 0x7C
      /* | */
      :
      case 0x7D
      /* } */
      :
      case 0x7E
      /* ~ */
      :
        return true;

      default:
        return false;
    }
  } // Hepler to unify [reference labels].
  //


  function normalizeReference(str) {
    // Trim and collapse whitespace
    //
    str = str.trim().replace(/\s+/g, ' '); // In node v10 'ẞ'.toLowerCase() === 'Ṿ', which is presumed to be a bug
    // fixed in v12 (couldn't find any details).
    //
    // So treat this one as a special case
    // (remove this when node v10 is no longer supported).
    //

    if ('ẞ'.toLowerCase() === 'Ṿ') {
      str = str.replace(/ẞ/g, 'ß');
    } // .toLowerCase().toUpperCase() should get rid of all differences
    // between letter variants.
    //
    // Simple .toLowerCase() doesn't normalize 125 code points correctly,
    // and .toUpperCase doesn't normalize 6 of them (list of exceptions:
    // İ, ϴ, ẞ, Ω, K, Å - those are already uppercased, but have differently
    // uppercased versions).
    //
    // Here's an example showing how it happens. Lets take greek letter omega:
    // uppercase U+0398 (Θ), U+03f4 (ϴ) and lowercase U+03b8 (θ), U+03d1 (ϑ)
    //
    // Unicode entries:
    // 0398;GREEK CAPITAL LETTER THETA;Lu;0;L;;;;;N;;;;03B8;
    // 03B8;GREEK SMALL LETTER THETA;Ll;0;L;;;;;N;;;0398;;0398
    // 03D1;GREEK THETA SYMBOL;Ll;0;L;<compat> 03B8;;;;N;GREEK SMALL LETTER SCRIPT THETA;;0398;;0398
    // 03F4;GREEK CAPITAL THETA SYMBOL;Lu;0;L;<compat> 0398;;;;N;;;;03B8;
    //
    // Case-insensitive comparison should treat all of them as equivalent.
    //
    // But .toLowerCase() doesn't change ϑ (it's already lowercase),
    // and .toUpperCase() doesn't change ϴ (already uppercase).
    //
    // Applying first lower then upper case normalizes any character:
    // '\u0398\u03f4\u03b8\u03d1'.toLowerCase().toUpperCase() === '\u0398\u0398\u0398\u0398'
    //
    // Note: this is equivalent to unicode case folding; unicode normalization
    // is a different step that is not required here.
    //
    // Final result should be uppercased, because it's later stored in an object
    // (this avoid a conflict with Object.prototype members,
    // most notably, `__proto__`)
    //


    return str.toLowerCase().toUpperCase();
  } ////////////////////////////////////////////////////////////////////////////////
  // Re-export libraries commonly used in both markdown-it and its plugins,
  // so plugins won't have to depend on them explicitly, which reduces their
  // bundled size (e.g. a browser build).
  //


  exports.lib = {};
  exports.lib.mdurl = mdurl$1;
  exports.lib.ucmicro = uc_micro;
  exports.assign = assign;
  exports.isString = isString;
  exports.has = has;
  exports.unescapeMd = unescapeMd;
  exports.unescapeAll = unescapeAll;
  exports.isValidEntityCode = isValidEntityCode;
  exports.fromCodePoint = fromCodePoint; // exports.replaceEntities     = replaceEntities;

  exports.escapeHtml = escapeHtml;
  exports.arrayReplaceAt = arrayReplaceAt;
  exports.isSpace = isSpace;
  exports.isWhiteSpace = isWhiteSpace;
  exports.isMdAsciiPunct = isMdAsciiPunct;
  exports.isPunctChar = isPunctChar;
  exports.escapeRE = escapeRE;
  exports.normalizeReference = normalizeReference;
})(utils$1);

var helpers$1 = {};

var parse_link_label = function parseLinkLabel(state, start, disableNested) {
  var level,
      found,
      marker,
      prevPos,
      labelEnd = -1,
      max = state.posMax,
      oldPos = state.pos;
  state.pos = start + 1;
  level = 1;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);

    if (marker === 0x5D
    /* ] */
    ) {
      level--;

      if (level === 0) {
        found = true;
        break;
      }
    }

    prevPos = state.pos;
    state.md.inline.skipToken(state);

    if (marker === 0x5B
    /* [ */
    ) {
      if (prevPos === state.pos - 1) {
        // increase level if we find text `[`, which is not a part of any token
        level++;
      } else if (disableNested) {
        state.pos = oldPos;
        return -1;
      }
    }
  }

  if (found) {
    labelEnd = state.pos;
  } // restore old state


  state.pos = oldPos;
  return labelEnd;
};

var unescapeAll$2 = utils$1.unescapeAll;

var parse_link_destination = function parseLinkDestination(str, pos, max) {
  var code,
      level,
      lines = 0,
      start = pos,
      result = {
    ok: false,
    pos: 0,
    lines: 0,
    str: ''
  };

  if (str.charCodeAt(pos) === 0x3C
  /* < */
  ) {
    pos++;

    while (pos < max) {
      code = str.charCodeAt(pos);

      if (code === 0x0A
      /* \n */
      ) {
        return result;
      }

      if (code === 0x3E
      /* > */
      ) {
        result.pos = pos + 1;
        result.str = unescapeAll$2(str.slice(start + 1, pos));
        result.ok = true;
        return result;
      }

      if (code === 0x5C
      /* \ */
      && pos + 1 < max) {
        pos += 2;
        continue;
      }

      pos++;
    } // no closing '>'


    return result;
  } // this should be ... } else { ... branch


  level = 0;

  while (pos < max) {
    code = str.charCodeAt(pos);

    if (code === 0x20) {
      break;
    } // ascii control characters


    if (code < 0x20 || code === 0x7F) {
      break;
    }

    if (code === 0x5C
    /* \ */
    && pos + 1 < max) {
      pos += 2;
      continue;
    }

    if (code === 0x28
    /* ( */
    ) {
      level++;
    }

    if (code === 0x29
    /* ) */
    ) {
      if (level === 0) {
        break;
      }

      level--;
    }

    pos++;
  }

  if (start === pos) {
    return result;
  }

  if (level !== 0) {
    return result;
  }

  result.str = unescapeAll$2(str.slice(start, pos));
  result.lines = lines;
  result.pos = pos;
  result.ok = true;
  return result;
};

var unescapeAll$1 = utils$1.unescapeAll;

var parse_link_title = function parseLinkTitle(str, pos, max) {
  var code,
      marker,
      lines = 0,
      start = pos,
      result = {
    ok: false,
    pos: 0,
    lines: 0,
    str: ''
  };

  if (pos >= max) {
    return result;
  }

  marker = str.charCodeAt(pos);

  if (marker !== 0x22
  /* " */
  && marker !== 0x27
  /* ' */
  && marker !== 0x28
  /* ( */
  ) {
    return result;
  }

  pos++; // if opening marker is "(", switch it to closing marker ")"

  if (marker === 0x28) {
    marker = 0x29;
  }

  while (pos < max) {
    code = str.charCodeAt(pos);

    if (code === marker) {
      result.pos = pos + 1;
      result.lines = lines;
      result.str = unescapeAll$1(str.slice(start + 1, pos));
      result.ok = true;
      return result;
    } else if (code === 0x0A) {
      lines++;
    } else if (code === 0x5C
    /* \ */
    && pos + 1 < max) {
      pos++;

      if (str.charCodeAt(pos) === 0x0A) {
        lines++;
      }
    }

    pos++;
  }

  return result;
};

helpers$1.parseLinkLabel = parse_link_label;
helpers$1.parseLinkDestination = parse_link_destination;
helpers$1.parseLinkTitle = parse_link_title;

/**
 * class Renderer
 *
 * Generates HTML from parsed token stream. Each instance has independent
 * copy of rules. Those can be rewritten with ease. Also, you can add new
 * rules if you create plugin and adds new token types.
 **/

var assign$1 = utils$1.assign;
var unescapeAll = utils$1.unescapeAll;
var escapeHtml = utils$1.escapeHtml; ////////////////////////////////////////////////////////////////////////////////

var default_rules = {};

default_rules.code_inline = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];
  return '<code' + slf.renderAttrs(token) + '>' + escapeHtml(tokens[idx].content) + '</code>';
};

default_rules.code_block = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];
  return '<pre' + slf.renderAttrs(token) + '><code>' + escapeHtml(tokens[idx].content) + '</code></pre>\n';
};

default_rules.fence = function (tokens, idx, options, env, slf) {
  var token = tokens[idx],
      info = token.info ? unescapeAll(token.info).trim() : '',
      langName = '',
      highlighted,
      i,
      tmpAttrs,
      tmpToken;

  if (info) {
    langName = info.split(/\s+/g)[0];
  }

  if (options.highlight) {
    highlighted = options.highlight(token.content, langName) || escapeHtml(token.content);
  } else {
    highlighted = escapeHtml(token.content);
  }

  if (highlighted.indexOf('<pre') === 0) {
    return highlighted + '\n';
  } // If language exists, inject class gently, without modifying original token.
  // May be, one day we will add .clone() for token and simplify this part, but
  // now we prefer to keep things local.


  if (info) {
    i = token.attrIndex('class');
    tmpAttrs = token.attrs ? token.attrs.slice() : [];

    if (i < 0) {
      tmpAttrs.push(['class', options.langPrefix + langName]);
    } else {
      tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
    } // Fake token just to render attributes


    tmpToken = {
      attrs: tmpAttrs
    };
    return '<pre><code' + slf.renderAttrs(tmpToken) + '>' + highlighted + '</code></pre>\n';
  }

  return '<pre><code' + slf.renderAttrs(token) + '>' + highlighted + '</code></pre>\n';
};

default_rules.image = function (tokens, idx, options, env, slf) {
  var token = tokens[idx]; // "alt" attr MUST be set, even if empty. Because it's mandatory and
  // should be placed on proper position for tests.
  //
  // Replace content with actual value

  token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env);
  return slf.renderToken(tokens, idx, options);
};

default_rules.hardbreak = function (tokens, idx, options
/*, env */
) {
  return options.xhtmlOut ? '<br />\n' : '<br>\n';
};

default_rules.softbreak = function (tokens, idx, options
/*, env */
) {
  return options.breaks ? options.xhtmlOut ? '<br />\n' : '<br>\n' : '\n';
};

default_rules.text = function (tokens, idx
/*, options, env */
) {
  return escapeHtml(tokens[idx].content);
};

default_rules.html_block = function (tokens, idx
/*, options, env */
) {
  return tokens[idx].content;
};

default_rules.html_inline = function (tokens, idx
/*, options, env */
) {
  return tokens[idx].content;
};
/**
 * new Renderer()
 *
 * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
 **/


function Renderer$1() {
  /**
   * Renderer#rules -> Object
   *
   * Contains render rules for tokens. Can be updated and extended.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * md.renderer.rules.strong_open  = function () { return '<b>'; };
   * md.renderer.rules.strong_close = function () { return '</b>'; };
   *
   * var result = md.renderInline(...);
   * ```
   *
   * Each rule is called as independent static function with fixed signature:
   *
   * ```javascript
   * function my_token_render(tokens, idx, options, env, renderer) {
   *   // ...
   *   return renderedHTML;
   * }
   * ```
   *
   * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)
   * for more details and examples.
   **/
  this.rules = assign$1({}, default_rules);
}
/**
 * Renderer.renderAttrs(token) -> String
 *
 * Render token attributes to string.
 **/


Renderer$1.prototype.renderAttrs = function renderAttrs(token) {
  var i, l, result;

  if (!token.attrs) {
    return '';
  }

  result = '';

  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
  }

  return result;
};
/**
 * Renderer.renderToken(tokens, idx, options) -> String
 * - tokens (Array): list of tokens
 * - idx (Numbed): token index to render
 * - options (Object): params of parser instance
 *
 * Default token renderer. Can be overriden by custom function
 * in [[Renderer#rules]].
 **/


Renderer$1.prototype.renderToken = function renderToken(tokens, idx, options) {
  var nextToken,
      result = '',
      needLf = false,
      token = tokens[idx]; // Tight list paragraphs

  if (token.hidden) {
    return '';
  } // Insert a newline between hidden paragraph and subsequent opening
  // block-level tag.
  //
  // For example, here we should insert a newline before blockquote:
  //  - a
  //    >
  //


  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += '\n';
  } // Add token name, e.g. `<img`


  result += (token.nesting === -1 ? '</' : '<') + token.tag; // Encode attributes, e.g. `<img src="foo"`

  result += this.renderAttrs(token); // Add a slash for self-closing tags, e.g. `<img src="foo" /`

  if (token.nesting === 0 && options.xhtmlOut) {
    result += ' /';
  } // Check if we need to add a newline after this tag


  if (token.block) {
    needLf = true;

    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        nextToken = tokens[idx + 1];

        if (nextToken.type === 'inline' || nextToken.hidden) {
          // Block-level tag containing an inline tag.
          //
          needLf = false;
        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          // Opening tag + closing tag of the same type. E.g. `<li></li>`.
          //
          needLf = false;
        }
      }
    }
  }

  result += needLf ? '>\n' : '>';
  return result;
};
/**
 * Renderer.renderInline(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * The same as [[Renderer.render]], but for single token of `inline` type.
 **/


Renderer$1.prototype.renderInline = function (tokens, options, env) {
  var type,
      result = '',
      rules = this.rules;

  for (var i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options);
    }
  }

  return result;
};
/** internal
 * Renderer.renderInlineAsText(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Special kludge for image `alt` attributes to conform CommonMark spec.
 * Don't try to use it! Spec requires to show `alt` content with stripped markup,
 * instead of simple escaping.
 **/


Renderer$1.prototype.renderInlineAsText = function (tokens, options, env) {
  var result = '';

  for (var i = 0, len = tokens.length; i < len; i++) {
    if (tokens[i].type === 'text') {
      result += tokens[i].content;
    } else if (tokens[i].type === 'image') {
      result += this.renderInlineAsText(tokens[i].children, options, env);
    }
  }

  return result;
};
/**
 * Renderer.render(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Takes token stream and generates HTML. Probably, you will never need to call
 * this method directly.
 **/


Renderer$1.prototype.render = function (tokens, options, env) {
  var i,
      len,
      type,
      result = '',
      rules = this.rules;

  for (i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rules[type] !== 'undefined') {
      result += rules[tokens[i].type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options, env);
    }
  }

  return result;
};

var renderer = Renderer$1;

/**
 * class Ruler
 *
 * Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
 * [[MarkdownIt#inline]] to manage sequences of functions (rules):
 *
 * - keep rules in defined order
 * - assign the name to each rule
 * - enable/disable rules
 * - add/replace rules
 * - allow assign rules to additional named chains (in the same)
 * - cacheing lists of active rules
 *
 * You will not need use this class directly until write plugins. For simple
 * rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
 * [[MarkdownIt.use]].
 **/
/**
 * new Ruler()
 **/


function Ruler$3() {
  // List of added rules. Each element is:
  //
  // {
  //   name: XXX,
  //   enabled: Boolean,
  //   fn: Function(),
  //   alt: [ name2, name3 ]
  // }
  //
  this.__rules__ = []; // Cached rule chains.
  //
  // First level - chain name, '' for default.
  // Second level - diginal anchor for fast filtering by charcodes.
  //

  this.__cache__ = null;
} ////////////////////////////////////////////////////////////////////////////////
// Helper methods, should not be used directly
// Find rule index by name
//


Ruler$3.prototype.__find__ = function (name) {
  for (var i = 0; i < this.__rules__.length; i++) {
    if (this.__rules__[i].name === name) {
      return i;
    }
  }

  return -1;
}; // Build rules lookup cache
//


Ruler$3.prototype.__compile__ = function () {
  var self = this;
  var chains = ['']; // collect unique names

  self.__rules__.forEach(function (rule) {
    if (!rule.enabled) {
      return;
    }

    rule.alt.forEach(function (altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });

  self.__cache__ = {};
  chains.forEach(function (chain) {
    self.__cache__[chain] = [];

    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) {
        return;
      }

      if (chain && rule.alt.indexOf(chain) < 0) {
        return;
      }

      self.__cache__[chain].push(rule.fn);
    });
  });
};
/**
 * Ruler.at(name, fn [, options])
 * - name (String): rule name to replace.
 * - fn (Function): new rule function.
 * - options (Object): new rule options (not mandatory).
 *
 * Replace rule by name with new function & options. Throws error if name not
 * found.
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * Replace existing typographer replacement rule with new one:
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.at('replacements', function replace(state) {
 *   //...
 * });
 * ```
 **/


Ruler$3.prototype.at = function (name, fn, options) {
  var index = this.__find__(name);

  var opt = options || {};

  if (index === -1) {
    throw new Error('Parser rule not found: ' + name);
  }

  this.__rules__[index].fn = fn;
  this.__rules__[index].alt = opt.alt || [];
  this.__cache__ = null;
};
/**
 * Ruler.before(beforeName, ruleName, fn [, options])
 * - beforeName (String): new rule will be added before this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain before one with given name. See also
 * [[Ruler.after]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/


Ruler$3.prototype.before = function (beforeName, ruleName, fn, options) {
  var index = this.__find__(beforeName);

  var opt = options || {};

  if (index === -1) {
    throw new Error('Parser rule not found: ' + beforeName);
  }

  this.__rules__.splice(index, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};
/**
 * Ruler.after(afterName, ruleName, fn [, options])
 * - afterName (String): new rule will be added after this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain after one with given name. See also
 * [[Ruler.before]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.inline.ruler.after('text', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/


Ruler$3.prototype.after = function (afterName, ruleName, fn, options) {
  var index = this.__find__(afterName);

  var opt = options || {};

  if (index === -1) {
    throw new Error('Parser rule not found: ' + afterName);
  }

  this.__rules__.splice(index + 1, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};
/**
 * Ruler.push(ruleName, fn [, options])
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Push new rule to the end of chain. See also
 * [[Ruler.before]], [[Ruler.after]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.push('my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/


Ruler$3.prototype.push = function (ruleName, fn, options) {
  var opt = options || {};

  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};
/**
 * Ruler.enable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to enable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.disable]], [[Ruler.enableOnly]].
 **/


Ruler$3.prototype.enable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) {
    list = [list];
  }

  var result = []; // Search by name and enable

  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) {
        return;
      }

      throw new Error('Rules manager: invalid rule name ' + name);
    }

    this.__rules__[idx].enabled = true;
    result.push(name);
  }, this);
  this.__cache__ = null;
  return result;
};
/**
 * Ruler.enableOnly(list [, ignoreInvalid])
 * - list (String|Array): list of rule names to enable (whitelist).
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names, and disable everything else. If any rule name
 * not found - throw Error. Errors can be disabled by second param.
 *
 * See also [[Ruler.disable]], [[Ruler.enable]].
 **/


Ruler$3.prototype.enableOnly = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) {
    list = [list];
  }

  this.__rules__.forEach(function (rule) {
    rule.enabled = false;
  });

  this.enable(list, ignoreInvalid);
};
/**
 * Ruler.disable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Disable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.enable]], [[Ruler.enableOnly]].
 **/


Ruler$3.prototype.disable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) {
    list = [list];
  }

  var result = []; // Search by name and disable

  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) {
        return;
      }

      throw new Error('Rules manager: invalid rule name ' + name);
    }

    this.__rules__[idx].enabled = false;
    result.push(name);
  }, this);
  this.__cache__ = null;
  return result;
};
/**
 * Ruler.getRules(chainName) -> Array
 *
 * Return array of active functions (rules) for given chain name. It analyzes
 * rules configuration, compiles caches if not exists and returns result.
 *
 * Default chain name is `''` (empty string). It can't be skipped. That's
 * done intentionally, to keep signature monomorphic for high speed.
 **/


Ruler$3.prototype.getRules = function (chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  } // Chain can be empty, if rules disabled. But we still have to return Array.


  return this.__cache__[chainName] || [];
};

var ruler = Ruler$3;

var NEWLINES_RE = /\r\n?|\n/g;
var NULL_RE = /\0/g;

var normalize = function normalize(state) {
  var str; // Normalize newlines

  str = state.src.replace(NEWLINES_RE, '\n'); // Replace NULL characters

  str = str.replace(NULL_RE, '\uFFFD');
  state.src = str;
};

var block = function block(state) {
  var token;

  if (state.inlineMode) {
    token = new state.Token('inline', '', 0);
    token.content = state.src;
    token.map = [0, 1];
    token.children = [];
    state.tokens.push(token);
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens);
  }
};

var inline = function inline(state) {
  var tokens = state.tokens,
      tok,
      i,
      l; // Parse inlines

  for (i = 0, l = tokens.length; i < l; i++) {
    tok = tokens[i];

    if (tok.type === 'inline') {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
};

var arrayReplaceAt = utils$1.arrayReplaceAt;

function isLinkOpen(str) {
  return /^<a[>\s]/i.test(str);
}

function isLinkClose(str) {
  return /^<\/a\s*>/i.test(str);
}

var linkify = function linkify(state) {
  var i,
      j,
      l,
      tokens,
      token,
      currentToken,
      nodes,
      ln,
      text,
      pos,
      lastPos,
      level,
      htmlLinkLevel,
      url,
      fullUrl,
      urlText,
      blockTokens = state.tokens,
      links;

  if (!state.md.options.linkify) {
    return;
  }

  for (j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline' || !state.md.linkify.pretest(blockTokens[j].content)) {
      continue;
    }

    tokens = blockTokens[j].children;
    htmlLinkLevel = 0; // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match

    for (i = tokens.length - 1; i >= 0; i--) {
      currentToken = tokens[i]; // Skip content of markdown links

      if (currentToken.type === 'link_close') {
        i--;

        while (tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open') {
          i--;
        }

        continue;
      } // Skip content of html tag links


      if (currentToken.type === 'html_inline') {
        if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }

        if (isLinkClose(currentToken.content)) {
          htmlLinkLevel++;
        }
      }

      if (htmlLinkLevel > 0) {
        continue;
      }

      if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {
        text = currentToken.content;
        links = state.md.linkify.match(text); // Now split string to nodes

        nodes = [];
        level = currentToken.level;
        lastPos = 0;

        for (ln = 0; ln < links.length; ln++) {
          url = links[ln].url;
          fullUrl = state.md.normalizeLink(url);

          if (!state.md.validateLink(fullUrl)) {
            continue;
          }

          urlText = links[ln].text; // Linkifier might send raw hostnames like "example.com", where url
          // starts with domain name. So we prepend http:// in those cases,
          // and remove it afterwards.
          //

          if (!links[ln].schema) {
            urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
          } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
            urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
          } else {
            urlText = state.md.normalizeLinkText(urlText);
          }

          pos = links[ln].index;

          if (pos > lastPos) {
            token = new state.Token('text', '', 0);
            token.content = text.slice(lastPos, pos);
            token.level = level;
            nodes.push(token);
          }

          token = new state.Token('link_open', 'a', 1);
          token.attrs = [['href', fullUrl]];
          token.level = level++;
          token.markup = 'linkify';
          token.info = 'auto';
          nodes.push(token);
          token = new state.Token('text', '', 0);
          token.content = urlText;
          token.level = level;
          nodes.push(token);
          token = new state.Token('link_close', 'a', -1);
          token.level = --level;
          token.markup = 'linkify';
          token.info = 'auto';
          nodes.push(token);
          lastPos = links[ln].lastIndex;
        }

        if (lastPos < text.length) {
          token = new state.Token('text', '', 0);
          token.content = text.slice(lastPos);
          token.level = level;
          nodes.push(token);
        } // replace current node


        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }
};

// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
// - miltiplication 2 x 4 -> 2 × 4


var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/; // Workaround for phantomjs - need regex without /g flag,
// or root check will fail every second time

var SCOPED_ABBR_TEST_RE = /\((c|tm|r|p)\)/i;
var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
var SCOPED_ABBR = {
  c: '©',
  r: '®',
  p: '§',
  tm: '™'
};

function replaceFn(match, name) {
  return SCOPED_ABBR[name.toLowerCase()];
}

function replace_scoped(inlineTokens) {
  var i,
      token,
      inside_autolink = 0;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}

function replace_rare(inlineTokens) {
  var i,
      token,
      inside_autolink = 0;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      if (RARE_RE.test(token.content)) {
        token.content = token.content.replace(/\+-/g, '±') // .., ..., ....... -> …
        // but ?..... & !..... -> ?.. & !..
        .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..').replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',') // em-dash
        .replace(/(^|[^-])---(?=[^-]|$)/mg, '$1\u2014') // en-dash
        .replace(/(^|\s)--(?=\s|$)/mg, '$1\u2013').replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, '$1\u2013');
      }
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}

var replacements = function replace(state) {
  var blkIdx;

  if (!state.md.options.typographer) {
    return;
  }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== 'inline') {
      continue;
    }

    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
      replace_scoped(state.tokens[blkIdx].children);
    }

    if (RARE_RE.test(state.tokens[blkIdx].content)) {
      replace_rare(state.tokens[blkIdx].children);
    }
  }
};

var isWhiteSpace$1 = utils$1.isWhiteSpace;
var isPunctChar$1 = utils$1.isPunctChar;
var isMdAsciiPunct$1 = utils$1.isMdAsciiPunct;
var QUOTE_TEST_RE = /['"]/;
var QUOTE_RE = /['"]/g;
var APOSTROPHE = '\u2019';
/* ’ */

function replaceAt(str, index, ch) {
  return str.substr(0, index) + ch + str.substr(index + 1);
}

function process_inlines(tokens, state) {
  var i, token, text, t, pos, max, thisLevel, item, lastChar, nextChar, isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace, canOpen, canClose, j, isSingle, stack, openQuote, closeQuote;
  stack = [];

  for (i = 0; i < tokens.length; i++) {
    token = tokens[i];
    thisLevel = tokens[i].level;

    for (j = stack.length - 1; j >= 0; j--) {
      if (stack[j].level <= thisLevel) {
        break;
      }
    }

    stack.length = j + 1;

    if (token.type !== 'text') {
      continue;
    }

    text = token.content;
    pos = 0;
    max = text.length;
    /*eslint no-labels:0,block-scoped-var:0*/

    OUTER: while (pos < max) {
      QUOTE_RE.lastIndex = pos;
      t = QUOTE_RE.exec(text);

      if (!t) {
        break;
      }

      canOpen = canClose = true;
      pos = t.index + 1;
      isSingle = t[0] === "'"; // Find previous character,
      // default to space if it's the beginning of the line
      //

      lastChar = 0x20;

      if (t.index - 1 >= 0) {
        lastChar = text.charCodeAt(t.index - 1);
      } else {
        for (j = i - 1; j >= 0; j--) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // lastChar defaults to 0x20

          if (tokens[j].type !== 'text') continue;
          lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
          break;
        }
      } // Find next character,
      // default to space if it's the end of the line
      //


      nextChar = 0x20;

      if (pos < max) {
        nextChar = text.charCodeAt(pos);
      } else {
        for (j = i + 1; j < tokens.length; j++) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // nextChar defaults to 0x20

          if (tokens[j].type !== 'text') continue;
          nextChar = tokens[j].content.charCodeAt(0);
          break;
        }
      }

      isLastPunctChar = isMdAsciiPunct$1(lastChar) || isPunctChar$1(String.fromCharCode(lastChar));
      isNextPunctChar = isMdAsciiPunct$1(nextChar) || isPunctChar$1(String.fromCharCode(nextChar));
      isLastWhiteSpace = isWhiteSpace$1(lastChar);
      isNextWhiteSpace = isWhiteSpace$1(nextChar);

      if (isNextWhiteSpace) {
        canOpen = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          canOpen = false;
        }
      }

      if (isLastWhiteSpace) {
        canClose = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          canClose = false;
        }
      }

      if (nextChar === 0x22
      /* " */
      && t[0] === '"') {
        if (lastChar >= 0x30
        /* 0 */
        && lastChar <= 0x39
        /* 9 */
        ) {
          // special case: 1"" - count first quote as an inch
          canClose = canOpen = false;
        }
      }

      if (canOpen && canClose) {
        // Replace quotes in the middle of punctuation sequence, but not
        // in the middle of the words, i.e.:
        //
        // 1. foo " bar " baz - not replaced
        // 2. foo-"-bar-"-baz - replaced
        // 3. foo"bar"baz     - not replaced
        //
        canOpen = isLastPunctChar;
        canClose = isNextPunctChar;
      }

      if (!canOpen && !canClose) {
        // middle of word
        if (isSingle) {
          token.content = replaceAt(token.content, t.index, APOSTROPHE);
        }

        continue;
      }

      if (canClose) {
        // this could be a closing quote, rewind the stack to get a match
        for (j = stack.length - 1; j >= 0; j--) {
          item = stack[j];

          if (stack[j].level < thisLevel) {
            break;
          }

          if (item.single === isSingle && stack[j].level === thisLevel) {
            item = stack[j];

            if (isSingle) {
              openQuote = state.md.options.quotes[2];
              closeQuote = state.md.options.quotes[3];
            } else {
              openQuote = state.md.options.quotes[0];
              closeQuote = state.md.options.quotes[1];
            } // replace token.content *before* tokens[item.token].content,
            // because, if they are pointing at the same token, replaceAt
            // could mess up indices when quote length != 1


            token.content = replaceAt(token.content, t.index, closeQuote);
            tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, openQuote);
            pos += closeQuote.length - 1;

            if (item.token === i) {
              pos += openQuote.length - 1;
            }

            text = token.content;
            max = text.length;
            stack.length = j;
            continue OUTER;
          }
        }
      }

      if (canOpen) {
        stack.push({
          token: i,
          pos: t.index,
          single: isSingle,
          level: thisLevel
        });
      } else if (canClose && isSingle) {
        token.content = replaceAt(token.content, t.index, APOSTROPHE);
      }
    }
  }
}

var smartquotes = function smartquotes(state) {
  /*eslint max-depth:0*/
  var blkIdx;

  if (!state.md.options.typographer) {
    return;
  }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== 'inline' || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
      continue;
    }

    process_inlines(state.tokens[blkIdx].children, state);
  }
};

/**
 * class Token
 **/

/**
 * new Token(type, tag, nesting)
 *
 * Create new token and fill passed properties.
 **/


function Token$3(type, tag, nesting) {
  /**
   * Token#type -> String
   *
   * Type of the token (string, e.g. "paragraph_open")
   **/
  this.type = type;
  /**
   * Token#tag -> String
   *
   * html tag name, e.g. "p"
   **/

  this.tag = tag;
  /**
   * Token#attrs -> Array
   *
   * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
   **/

  this.attrs = null;
  /**
   * Token#map -> Array
   *
   * Source map info. Format: `[ line_begin, line_end ]`
   **/

  this.map = null;
  /**
   * Token#nesting -> Number
   *
   * Level change (number in {-1, 0, 1} set), where:
   *
   * -  `1` means the tag is opening
   * -  `0` means the tag is self-closing
   * - `-1` means the tag is closing
   **/

  this.nesting = nesting;
  /**
   * Token#level -> Number
   *
   * nesting level, the same as `state.level`
   **/

  this.level = 0;
  /**
   * Token#children -> Array
   *
   * An array of child nodes (inline and img tokens)
   **/

  this.children = null;
  /**
   * Token#content -> String
   *
   * In a case of self-closing tag (code, html, fence, etc.),
   * it has contents of this tag.
   **/

  this.content = '';
  /**
   * Token#markup -> String
   *
   * '*' or '_' for emphasis, fence string for fence, etc.
   **/

  this.markup = '';
  /**
   * Token#info -> String
   *
   * fence infostring
   **/

  this.info = '';
  /**
   * Token#meta -> Object
   *
   * A place for plugins to store an arbitrary data
   **/

  this.meta = null;
  /**
   * Token#block -> Boolean
   *
   * True for block-level tokens, false for inline tokens.
   * Used in renderer to calculate line breaks
   **/

  this.block = false;
  /**
   * Token#hidden -> Boolean
   *
   * If it's true, ignore this element when rendering. Used for tight lists
   * to hide paragraphs.
   **/

  this.hidden = false;
}
/**
 * Token.attrIndex(name) -> Number
 *
 * Search attribute index by name.
 **/


Token$3.prototype.attrIndex = function attrIndex(name) {
  var attrs, i, len;

  if (!this.attrs) {
    return -1;
  }

  attrs = this.attrs;

  for (i = 0, len = attrs.length; i < len; i++) {
    if (attrs[i][0] === name) {
      return i;
    }
  }

  return -1;
};
/**
 * Token.attrPush(attrData)
 *
 * Add `[ name, value ]` attribute to list. Init attrs if necessary
 **/


Token$3.prototype.attrPush = function attrPush(attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [attrData];
  }
};
/**
 * Token.attrSet(name, value)
 *
 * Set `name` attribute to `value`. Override old value if exists.
 **/


Token$3.prototype.attrSet = function attrSet(name, value) {
  var idx = this.attrIndex(name),
      attrData = [name, value];

  if (idx < 0) {
    this.attrPush(attrData);
  } else {
    this.attrs[idx] = attrData;
  }
};
/**
 * Token.attrGet(name)
 *
 * Get the value of attribute `name`, or null if it does not exist.
 **/


Token$3.prototype.attrGet = function attrGet(name) {
  var idx = this.attrIndex(name),
      value = null;

  if (idx >= 0) {
    value = this.attrs[idx][1];
  }

  return value;
};
/**
 * Token.attrJoin(name, value)
 *
 * Join value to existing attribute via space. Or create new attribute if not
 * exists. Useful to operate with token classes.
 **/


Token$3.prototype.attrJoin = function attrJoin(name, value) {
  var idx = this.attrIndex(name);

  if (idx < 0) {
    this.attrPush([name, value]);
  } else {
    this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
  }
};

var token = Token$3;

var Token$2 = token;

function StateCore(src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md; // link to parser instance
} // re-export Token class to use in core rules


StateCore.prototype.Token = Token$2;
var state_core = StateCore;

/** internal
 * class Core
 *
 * Top-level rules executor. Glues block/inline parsers and does intermediate
 * transformations.
 **/

var Ruler$2 = ruler;
var _rules$2 = [['normalize', normalize], ['block', block], ['inline', inline], ['linkify', linkify], ['replacements', replacements], ['smartquotes', smartquotes]];
/**
 * new Core()
 **/

function Core() {
  /**
   * Core#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of core rules.
   **/
  this.ruler = new Ruler$2();

  for (var i = 0; i < _rules$2.length; i++) {
    this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
  }
}
/**
 * Core.process(state)
 *
 * Executes core chain rules.
 **/


Core.prototype.process = function (state) {
  var i, l, rules;
  rules = this.ruler.getRules('');

  for (i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};

Core.prototype.State = state_core;
var parser_core = Core;

var isSpace$a = utils$1.isSpace;

function getLine(state, line) {
  var pos = state.bMarks[line] + state.blkIndent,
      max = state.eMarks[line];
  return state.src.substr(pos, max - pos);
}

function escapedSplit(str) {
  var result = [],
      pos = 0,
      max = str.length,
      ch,
      escapes = 0,
      lastPos = 0,
      backTicked = false,
      lastBackTick = 0;
  ch = str.charCodeAt(pos);

  while (pos < max) {
    if (ch === 0x60
    /* ` */
    ) {
      if (backTicked) {
        // make \` close code sequence, but not open it;
        // the reason is: `\` is correct code block
        backTicked = false;
        lastBackTick = pos;
      } else if (escapes % 2 === 0) {
        backTicked = true;
        lastBackTick = pos;
      }
    } else if (ch === 0x7c
    /* | */
    && escapes % 2 === 0 && !backTicked) {
      result.push(str.substring(lastPos, pos));
      lastPos = pos + 1;
    }

    if (ch === 0x5c
    /* \ */
    ) {
      escapes++;
    } else {
      escapes = 0;
    }

    pos++; // If there was an un-closed backtick, go back to just after
    // the last backtick, but as if it was a normal character

    if (pos === max && backTicked) {
      backTicked = false;
      pos = lastBackTick + 1;
    }

    ch = str.charCodeAt(pos);
  }

  result.push(str.substring(lastPos));
  return result;
}

var table = function table(state, startLine, endLine, silent) {
  var ch, lineText, pos, i, nextLine, columns, columnCount, token, aligns, t, tableLines, tbodyLines; // should have at least two lines

  if (startLine + 2 > endLine) {
    return false;
  }

  nextLine = startLine + 1;

  if (state.sCount[nextLine] < state.blkIndent) {
    return false;
  } // if it's indented more than 3 spaces, it should be a code block


  if (state.sCount[nextLine] - state.blkIndent >= 4) {
    return false;
  } // first character of the second line should be '|', '-', ':',
  // and no other characters are allowed but spaces;
  // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp


  pos = state.bMarks[nextLine] + state.tShift[nextLine];

  if (pos >= state.eMarks[nextLine]) {
    return false;
  }

  ch = state.src.charCodeAt(pos++);

  if (ch !== 0x7C
  /* | */
  && ch !== 0x2D
  /* - */
  && ch !== 0x3A
  /* : */
  ) {
    return false;
  }

  while (pos < state.eMarks[nextLine]) {
    ch = state.src.charCodeAt(pos);

    if (ch !== 0x7C
    /* | */
    && ch !== 0x2D
    /* - */
    && ch !== 0x3A
    /* : */
    && !isSpace$a(ch)) {
      return false;
    }

    pos++;
  }

  lineText = getLine(state, startLine + 1);
  columns = lineText.split('|');
  aligns = [];

  for (i = 0; i < columns.length; i++) {
    t = columns[i].trim();

    if (!t) {
      // allow empty columns before and after table, but not in between columns;
      // e.g. allow ` |---| `, disallow ` ---||--- `
      if (i === 0 || i === columns.length - 1) {
        continue;
      } else {
        return false;
      }
    }

    if (!/^:?-+:?$/.test(t)) {
      return false;
    }

    if (t.charCodeAt(t.length - 1) === 0x3A
    /* : */
    ) {
      aligns.push(t.charCodeAt(0) === 0x3A
      /* : */
      ? 'center' : 'right');
    } else if (t.charCodeAt(0) === 0x3A
    /* : */
    ) {
      aligns.push('left');
    } else {
      aligns.push('');
    }
  }

  lineText = getLine(state, startLine).trim();

  if (lineText.indexOf('|') === -1) {
    return false;
  }

  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }

  columns = escapedSplit(lineText.replace(/^\||\|$/g, '')); // header row will define an amount of columns in the entire table,
  // and align row shouldn't be smaller than that (the rest of the rows can)

  columnCount = columns.length;

  if (columnCount > aligns.length) {
    return false;
  }

  if (silent) {
    return true;
  }

  token = state.push('table_open', 'table', 1);
  token.map = tableLines = [startLine, 0];
  token = state.push('thead_open', 'thead', 1);
  token.map = [startLine, startLine + 1];
  token = state.push('tr_open', 'tr', 1);
  token.map = [startLine, startLine + 1];

  for (i = 0; i < columns.length; i++) {
    token = state.push('th_open', 'th', 1);
    token.map = [startLine, startLine + 1];

    if (aligns[i]) {
      token.attrs = [['style', 'text-align:' + aligns[i]]];
    }

    token = state.push('inline', '', 0);
    token.content = columns[i].trim();
    token.map = [startLine, startLine + 1];
    token.children = [];
    token = state.push('th_close', 'th', -1);
  }

  token = state.push('tr_close', 'tr', -1);
  token = state.push('thead_close', 'thead', -1);
  token = state.push('tbody_open', 'tbody', 1);
  token.map = tbodyLines = [startLine + 2, 0];

  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) {
      break;
    }

    lineText = getLine(state, nextLine).trim();

    if (lineText.indexOf('|') === -1) {
      break;
    }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      break;
    }

    columns = escapedSplit(lineText.replace(/^\||\|$/g, ''));
    token = state.push('tr_open', 'tr', 1);

    for (i = 0; i < columnCount; i++) {
      token = state.push('td_open', 'td', 1);

      if (aligns[i]) {
        token.attrs = [['style', 'text-align:' + aligns[i]]];
      }

      token = state.push('inline', '', 0);
      token.content = columns[i] ? columns[i].trim() : '';
      token.children = [];
      token = state.push('td_close', 'td', -1);
    }

    token = state.push('tr_close', 'tr', -1);
  }

  token = state.push('tbody_close', 'tbody', -1);
  token = state.push('table_close', 'table', -1);
  tableLines[1] = tbodyLines[1] = nextLine;
  state.line = nextLine;
  return true;
};

var code = function code(state, startLine, endLine
/*, silent*/
) {
  var nextLine, last, token;

  if (state.sCount[startLine] - state.blkIndent < 4) {
    return false;
  }

  last = nextLine = startLine + 1;

  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue;
    }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue;
    }

    break;
  }

  state.line = last;
  token = state.push('code_block', 'code', 0);
  token.content = state.getLines(startLine, last, 4 + state.blkIndent, true);
  token.map = [startLine, state.line];
  return true;
};

var fence = function fence(state, startLine, endLine, silent) {
  var marker,
      len,
      params,
      nextLine,
      mem,
      token,
      markup,
      haveEndMarker = false,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine]; // if it's indented more than 3 spaces, it should be a code block

  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }

  if (pos + 3 > max) {
    return false;
  }

  marker = state.src.charCodeAt(pos);

  if (marker !== 0x7E
  /* ~ */
  && marker !== 0x60
  /* ` */
  ) {
    return false;
  } // scan marker length


  mem = pos;
  pos = state.skipChars(pos, marker);
  len = pos - mem;

  if (len < 3) {
    return false;
  }

  markup = state.src.slice(mem, pos);
  params = state.src.slice(pos, max);

  if (marker === 0x60
  /* ` */
  ) {
    if (params.indexOf(String.fromCharCode(marker)) >= 0) {
      return false;
    }
  } // Since start is found, we can report success here in validation mode


  if (silent) {
    return true;
  } // search end of block


  nextLine = startLine;

  for (;;) {
    nextLine++;

    if (nextLine >= endLine) {
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
      break;
    }

    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      // non-empty line with negative indent should stop the list:
      // - ```
      //  test
      break;
    }

    if (state.src.charCodeAt(pos) !== marker) {
      continue;
    }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      // closing fence should be indented less than 4 spaces
      continue;
    }

    pos = state.skipChars(pos, marker); // closing code fence must be at least as long as the opening one

    if (pos - mem < len) {
      continue;
    } // make sure tail has spaces only


    pos = state.skipSpaces(pos);

    if (pos < max) {
      continue;
    }

    haveEndMarker = true; // found!

    break;
  } // If a fence has heading spaces, they should be removed from its inner block


  len = state.sCount[startLine];
  state.line = nextLine + (haveEndMarker ? 1 : 0);
  token = state.push('fence', 'code', 0);
  token.info = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup = markup;
  token.map = [startLine, state.line];
  return true;
};

var isSpace$9 = utils$1.isSpace;

var blockquote = function blockquote(state, startLine, endLine, silent) {
  var adjustTab,
      ch,
      i,
      initial,
      l,
      lastLineEmpty,
      lines,
      nextLine,
      offset,
      oldBMarks,
      oldBSCount,
      oldIndent,
      oldParentType,
      oldSCount,
      oldTShift,
      spaceAfterMarker,
      terminate,
      terminatorRules,
      token,
      wasOutdented,
      oldLineMax = state.lineMax,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine]; // if it's indented more than 3 spaces, it should be a code block

  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  } // check the block quote marker


  if (state.src.charCodeAt(pos++) !== 0x3E
  /* > */
  ) {
    return false;
  } // we know that it's going to be a valid blockquote,
  // so no point trying to find the end of it in silent mode


  if (silent) {
    return true;
  } // skip spaces after ">" and re-calculate offset


  initial = offset = state.sCount[startLine] + pos - (state.bMarks[startLine] + state.tShift[startLine]); // skip one optional space after '>'

  if (state.src.charCodeAt(pos) === 0x20
  /* space */
  ) {
    // ' >   test '
    //     ^ -- position start of line here:
    pos++;
    initial++;
    offset++;
    adjustTab = false;
    spaceAfterMarker = true;
  } else if (state.src.charCodeAt(pos) === 0x09
  /* tab */
  ) {
    spaceAfterMarker = true;

    if ((state.bsCount[startLine] + offset) % 4 === 3) {
      // '  >\t  test '
      //       ^ -- position start of line here (tab has width===1)
      pos++;
      initial++;
      offset++;
      adjustTab = false;
    } else {
      // ' >\t  test '
      //    ^ -- position start of line here + shift bsCount slightly
      //         to make extra space appear
      adjustTab = true;
    }
  } else {
    spaceAfterMarker = false;
  }

  oldBMarks = [state.bMarks[startLine]];
  state.bMarks[startLine] = pos;

  while (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (isSpace$9(ch)) {
      if (ch === 0x09) {
        offset += 4 - (offset + state.bsCount[startLine] + (adjustTab ? 1 : 0)) % 4;
      } else {
        offset++;
      }
    } else {
      break;
    }

    pos++;
  }

  oldBSCount = [state.bsCount[startLine]];
  state.bsCount[startLine] = state.sCount[startLine] + 1 + (spaceAfterMarker ? 1 : 0);
  lastLineEmpty = pos >= max;
  oldSCount = [state.sCount[startLine]];
  state.sCount[startLine] = offset - initial;
  oldTShift = [state.tShift[startLine]];
  state.tShift[startLine] = pos - state.bMarks[startLine];
  terminatorRules = state.md.block.ruler.getRules('blockquote');
  oldParentType = state.parentType;
  state.parentType = 'blockquote';
  wasOutdented = false; // Search the end of the block
  //
  // Block ends with either:
  //  1. an empty line outside:
  //     ```
  //     > test
  //
  //     ```
  //  2. an empty line inside:
  //     ```
  //     >
  //     test
  //     ```
  //  3. another tag:
  //     ```
  //     > test
  //      - - -
  //     ```

  for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
    // check if it's outdented, i.e. it's inside list item and indented
    // less than said list item:
    //
    // ```
    // 1. anything
    //    > current blockquote
    // 2. checking this line
    // ```
    if (state.sCount[nextLine] < state.blkIndent) wasOutdented = true;
    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos >= max) {
      // Case 1: line is not inside the blockquote, and this line is empty.
      break;
    }

    if (state.src.charCodeAt(pos++) === 0x3E
    /* > */
    && !wasOutdented) {
      // This line is inside the blockquote.
      // skip spaces after ">" and re-calculate offset
      initial = offset = state.sCount[nextLine] + pos - (state.bMarks[nextLine] + state.tShift[nextLine]); // skip one optional space after '>'

      if (state.src.charCodeAt(pos) === 0x20
      /* space */
      ) {
        // ' >   test '
        //     ^ -- position start of line here:
        pos++;
        initial++;
        offset++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 0x09
      /* tab */
      ) {
        spaceAfterMarker = true;

        if ((state.bsCount[nextLine] + offset) % 4 === 3) {
          // '  >\t  test '
          //       ^ -- position start of line here (tab has width===1)
          pos++;
          initial++;
          offset++;
          adjustTab = false;
        } else {
          // ' >\t  test '
          //    ^ -- position start of line here + shift bsCount slightly
          //         to make extra space appear
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }

      oldBMarks.push(state.bMarks[nextLine]);
      state.bMarks[nextLine] = pos;

      while (pos < max) {
        ch = state.src.charCodeAt(pos);

        if (isSpace$9(ch)) {
          if (ch === 0x09) {
            offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }

        pos++;
      }

      lastLineEmpty = pos >= max;
      oldBSCount.push(state.bsCount[nextLine]);
      state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = offset - initial;
      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = pos - state.bMarks[nextLine];
      continue;
    } // Case 2: line is not inside the blockquote, and the last line was empty.


    if (lastLineEmpty) {
      break;
    } // Case 3: another tag found.


    terminate = false;

    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }

    if (terminate) {
      // Quirk to enforce "hard termination mode" for paragraphs;
      // normally if you call `tokenize(state, startLine, nextLine)`,
      // paragraphs will look below nextLine for paragraph continuation,
      // but if blockquote is terminated by another tag, they shouldn't
      state.lineMax = nextLine;

      if (state.blkIndent !== 0) {
        // state.blkIndent was non-zero, we now set it to zero,
        // so we need to re-calculate all offsets to appear as
        // if indent wasn't changed
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] -= state.blkIndent;
      }

      break;
    }

    oldBMarks.push(state.bMarks[nextLine]);
    oldBSCount.push(state.bsCount[nextLine]);
    oldTShift.push(state.tShift[nextLine]);
    oldSCount.push(state.sCount[nextLine]); // A negative indentation means that this is a paragraph continuation
    //

    state.sCount[nextLine] = -1;
  }

  oldIndent = state.blkIndent;
  state.blkIndent = 0;
  token = state.push('blockquote_open', 'blockquote', 1);
  token.markup = '>';
  token.map = lines = [startLine, 0];
  state.md.block.tokenize(state, startLine, nextLine);
  token = state.push('blockquote_close', 'blockquote', -1);
  token.markup = '>';
  state.lineMax = oldLineMax;
  state.parentType = oldParentType;
  lines[1] = state.line; // Restore original tShift; this might not be necessary since the parser
  // has already been here, but just to make sure we can do that.

  for (i = 0; i < oldTShift.length; i++) {
    state.bMarks[i + startLine] = oldBMarks[i];
    state.tShift[i + startLine] = oldTShift[i];
    state.sCount[i + startLine] = oldSCount[i];
    state.bsCount[i + startLine] = oldBSCount[i];
  }

  state.blkIndent = oldIndent;
  return true;
};

var isSpace$8 = utils$1.isSpace;

var hr = function hr(state, startLine, endLine, silent) {
  var marker,
      cnt,
      ch,
      token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine]; // if it's indented more than 3 spaces, it should be a code block

  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }

  marker = state.src.charCodeAt(pos++); // Check hr marker

  if (marker !== 0x2A
  /* * */
  && marker !== 0x2D
  /* - */
  && marker !== 0x5F
  /* _ */
  ) {
    return false;
  } // markers can be mixed with spaces, but there should be at least 3 of them


  cnt = 1;

  while (pos < max) {
    ch = state.src.charCodeAt(pos++);

    if (ch !== marker && !isSpace$8(ch)) {
      return false;
    }

    if (ch === marker) {
      cnt++;
    }
  }

  if (cnt < 3) {
    return false;
  }

  if (silent) {
    return true;
  }

  state.line = startLine + 1;
  token = state.push('hr', 'hr', 0);
  token.map = [startLine, state.line];
  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
  return true;
};

var isSpace$7 = utils$1.isSpace; // Search `[-+*][\n ]`, returns next pos after marker on success
// or -1 on fail.

function skipBulletListMarker(state, startLine) {
  var marker, pos, max, ch;
  pos = state.bMarks[startLine] + state.tShift[startLine];
  max = state.eMarks[startLine];
  marker = state.src.charCodeAt(pos++); // Check bullet

  if (marker !== 0x2A
  /* * */
  && marker !== 0x2D
  /* - */
  && marker !== 0x2B
  /* + */
  ) {
    return -1;
  }

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (!isSpace$7(ch)) {
      // " -test " - is not a list item
      return -1;
    }
  }

  return pos;
} // Search `\d+[.)][\n ]`, returns next pos after marker on success
// or -1 on fail.


function skipOrderedListMarker(state, startLine) {
  var ch,
      start = state.bMarks[startLine] + state.tShift[startLine],
      pos = start,
      max = state.eMarks[startLine]; // List marker should have at least 2 chars (digit + dot)

  if (pos + 1 >= max) {
    return -1;
  }

  ch = state.src.charCodeAt(pos++);

  if (ch < 0x30
  /* 0 */
  || ch > 0x39
  /* 9 */
  ) {
    return -1;
  }

  for (;;) {
    // EOL -> fail
    if (pos >= max) {
      return -1;
    }

    ch = state.src.charCodeAt(pos++);

    if (ch >= 0x30
    /* 0 */
    && ch <= 0x39
    /* 9 */
    ) {
      // List marker should have no more than 9 digits
      // (prevents integer overflow in browsers)
      if (pos - start >= 10) {
        return -1;
      }

      continue;
    } // found valid marker


    if (ch === 0x29
    /* ) */
    || ch === 0x2e
    /* . */
    ) {
      break;
    }

    return -1;
  }

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (!isSpace$7(ch)) {
      // " 1.test " - is not a list item
      return -1;
    }
  }

  return pos;
}

function markTightParagraphs(state, idx) {
  var i,
      l,
      level = state.level + 2;

  for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
      state.tokens[i + 2].hidden = true;
      state.tokens[i].hidden = true;
      i += 2;
    }
  }
}

var list = function list(state, startLine, endLine, silent) {
  var ch,
      contentStart,
      i,
      indent,
      indentAfterMarker,
      initial,
      isOrdered,
      itemLines,
      l,
      listLines,
      listTokIdx,
      markerCharCode,
      markerValue,
      max,
      nextLine,
      offset,
      oldListIndent,
      oldParentType,
      oldSCount,
      oldTShift,
      oldTight,
      pos,
      posAfterMarker,
      prevEmptyEnd,
      start,
      terminate,
      terminatorRules,
      token,
      isTerminatingParagraph = false,
      tight = true; // if it's indented more than 3 spaces, it should be a code block

  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  } // Special case:
  //  - item 1
  //   - item 2
  //    - item 3
  //     - item 4
  //      - this one is a paragraph continuation


  if (state.listIndent >= 0 && state.sCount[startLine] - state.listIndent >= 4 && state.sCount[startLine] < state.blkIndent) {
    return false;
  } // limit conditions when list can interrupt
  // a paragraph (validation mode only)


  if (silent && state.parentType === 'paragraph') {
    // Next list item should still terminate previous list item;
    //
    // This code can fail if plugins use blkIndent as well as lists,
    // but I hope the spec gets fixed long before that happens.
    //
    if (state.tShift[startLine] >= state.blkIndent) {
      isTerminatingParagraph = true;
    }
  } // Detect list type and position after marker


  if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
    isOrdered = true;
    start = state.bMarks[startLine] + state.tShift[startLine];
    markerValue = Number(state.src.substr(start, posAfterMarker - start - 1)); // If we're starting a new ordered list right after
    // a paragraph, it should start with 1.

    if (isTerminatingParagraph && markerValue !== 1) return false;
  } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
    isOrdered = false;
  } else {
    return false;
  } // If we're starting a new unordered list right after
  // a paragraph, first line should not be empty.


  if (isTerminatingParagraph) {
    if (state.skipSpaces(posAfterMarker) >= state.eMarks[startLine]) return false;
  } // We should terminate list on style change. Remember first one to compare.


  markerCharCode = state.src.charCodeAt(posAfterMarker - 1); // For validation mode we can terminate immediately

  if (silent) {
    return true;
  } // Start list


  listTokIdx = state.tokens.length;

  if (isOrdered) {
    token = state.push('ordered_list_open', 'ol', 1);

    if (markerValue !== 1) {
      token.attrs = [['start', markerValue]];
    }
  } else {
    token = state.push('bullet_list_open', 'ul', 1);
  }

  token.map = listLines = [startLine, 0];
  token.markup = String.fromCharCode(markerCharCode); //
  // Iterate list items
  //

  nextLine = startLine;
  prevEmptyEnd = false;
  terminatorRules = state.md.block.ruler.getRules('list');
  oldParentType = state.parentType;
  state.parentType = 'list';

  while (nextLine < endLine) {
    pos = posAfterMarker;
    max = state.eMarks[nextLine];
    initial = offset = state.sCount[nextLine] + posAfterMarker - (state.bMarks[startLine] + state.tShift[startLine]);

    while (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (ch === 0x09) {
        offset += 4 - (offset + state.bsCount[nextLine]) % 4;
      } else if (ch === 0x20) {
        offset++;
      } else {
        break;
      }

      pos++;
    }

    contentStart = pos;

    if (contentStart >= max) {
      // trimming space in "-    \n  3" case, indent is 1 here
      indentAfterMarker = 1;
    } else {
      indentAfterMarker = offset - initial;
    } // If we have more than 4 spaces, the indent is 1
    // (the rest is just indented code block)


    if (indentAfterMarker > 4) {
      indentAfterMarker = 1;
    } // "  -  test"
    //  ^^^^^ - calculating total length of this thing


    indent = initial + indentAfterMarker; // Run subparser & write tokens

    token = state.push('list_item_open', 'li', 1);
    token.markup = String.fromCharCode(markerCharCode);
    token.map = itemLines = [startLine, 0]; // change current state, then restore it after parser subcall

    oldTight = state.tight;
    oldTShift = state.tShift[startLine];
    oldSCount = state.sCount[startLine]; //  - example list
    // ^ listIndent position will be here
    //   ^ blkIndent position will be here
    //

    oldListIndent = state.listIndent;
    state.listIndent = state.blkIndent;
    state.blkIndent = indent;
    state.tight = true;
    state.tShift[startLine] = contentStart - state.bMarks[startLine];
    state.sCount[startLine] = offset;

    if (contentStart >= max && state.isEmpty(startLine + 1)) {
      // workaround for this case
      // (list item is empty, list terminates before "foo"):
      // ~~~~~~~~
      //   -
      //
      //     foo
      // ~~~~~~~~
      state.line = Math.min(state.line + 2, endLine);
    } else {
      state.md.block.tokenize(state, startLine, endLine, true);
    } // If any of list item is tight, mark list as tight


    if (!state.tight || prevEmptyEnd) {
      tight = false;
    } // Item become loose if finish with empty line,
    // but we should filter last element, because it means list finish


    prevEmptyEnd = state.line - startLine > 1 && state.isEmpty(state.line - 1);
    state.blkIndent = state.listIndent;
    state.listIndent = oldListIndent;
    state.tShift[startLine] = oldTShift;
    state.sCount[startLine] = oldSCount;
    state.tight = oldTight;
    token = state.push('list_item_close', 'li', -1);
    token.markup = String.fromCharCode(markerCharCode);
    nextLine = startLine = state.line;
    itemLines[1] = nextLine;
    contentStart = state.bMarks[startLine];

    if (nextLine >= endLine) {
      break;
    } //
    // Try to check if list is terminated or continued.
    //


    if (state.sCount[nextLine] < state.blkIndent) {
      break;
    } // if it's indented more than 3 spaces, it should be a code block


    if (state.sCount[startLine] - state.blkIndent >= 4) {
      break;
    } // fail if terminating block found


    terminate = false;

    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }

    if (terminate) {
      break;
    } // fail if list has another type


    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);

      if (posAfterMarker < 0) {
        break;
      }
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);

      if (posAfterMarker < 0) {
        break;
      }
    }

    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
      break;
    }
  } // Finalize list


  if (isOrdered) {
    token = state.push('ordered_list_close', 'ol', -1);
  } else {
    token = state.push('bullet_list_close', 'ul', -1);
  }

  token.markup = String.fromCharCode(markerCharCode);
  listLines[1] = nextLine;
  state.line = nextLine;
  state.parentType = oldParentType; // mark paragraphs tight if needed

  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }

  return true;
};

var normalizeReference$2 = utils$1.normalizeReference;
var isSpace$6 = utils$1.isSpace;

var reference = function reference(state, startLine, _endLine, silent) {
  var ch,
      destEndPos,
      destEndLineNo,
      endLine,
      href,
      i,
      l,
      label,
      labelEnd,
      oldParentType,
      res,
      start,
      str,
      terminate,
      terminatorRules,
      title,
      lines = 0,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine],
      nextLine = startLine + 1; // if it's indented more than 3 spaces, it should be a code block

  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }

  if (state.src.charCodeAt(pos) !== 0x5B
  /* [ */
  ) {
    return false;
  } // Simple check to quickly interrupt scan on [link](url) at the start of line.
  // Can be useful on practice: https://github.com/markdown-it/markdown-it/issues/54


  while (++pos < max) {
    if (state.src.charCodeAt(pos) === 0x5D
    /* ] */
    && state.src.charCodeAt(pos - 1) !== 0x5C
    /* \ */
    ) {
      if (pos + 1 === max) {
        return false;
      }

      if (state.src.charCodeAt(pos + 1) !== 0x3A
      /* : */
      ) {
        return false;
      }

      break;
    }
  }

  endLine = state.lineMax; // jump line-by-line until empty one or EOF

  terminatorRules = state.md.block.ruler.getRules('reference');
  oldParentType = state.parentType;
  state.parentType = 'reference';

  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) {
      continue;
    } // quirk for blockquotes, this line should already be checked by that rule


    if (state.sCount[nextLine] < 0) {
      continue;
    } // Some tags can terminate paragraph without empty line.


    terminate = false;

    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }

    if (terminate) {
      break;
    }
  }

  str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  max = str.length;

  for (pos = 1; pos < max; pos++) {
    ch = str.charCodeAt(pos);

    if (ch === 0x5B
    /* [ */
    ) {
      return false;
    } else if (ch === 0x5D
    /* ] */
    ) {
      labelEnd = pos;
      break;
    } else if (ch === 0x0A
    /* \n */
    ) {
      lines++;
    } else if (ch === 0x5C
    /* \ */
    ) {
      pos++;

      if (pos < max && str.charCodeAt(pos) === 0x0A) {
        lines++;
      }
    }
  }

  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A
  /* : */
  ) {
    return false;
  } // [label]:   destination   'title'
  //         ^^^ skip optional whitespace here


  for (pos = labelEnd + 2; pos < max; pos++) {
    ch = str.charCodeAt(pos);

    if (ch === 0x0A) {
      lines++;
    } else if (isSpace$6(ch)) ; else {
      break;
    }
  } // [label]:   destination   'title'
  //            ^^^^^^^^^^^ parse this


  res = state.md.helpers.parseLinkDestination(str, pos, max);

  if (!res.ok) {
    return false;
  }

  href = state.md.normalizeLink(res.str);

  if (!state.md.validateLink(href)) {
    return false;
  }

  pos = res.pos;
  lines += res.lines; // save cursor state, we could require to rollback later

  destEndPos = pos;
  destEndLineNo = lines; // [label]:   destination   'title'
  //                       ^^^ skipping those spaces

  start = pos;

  for (; pos < max; pos++) {
    ch = str.charCodeAt(pos);

    if (ch === 0x0A) {
      lines++;
    } else if (isSpace$6(ch)) ; else {
      break;
    }
  } // [label]:   destination   'title'
  //                          ^^^^^^^ parse this


  res = state.md.helpers.parseLinkTitle(str, pos, max);

  if (pos < max && start !== pos && res.ok) {
    title = res.str;
    pos = res.pos;
    lines += res.lines;
  } else {
    title = '';
    pos = destEndPos;
    lines = destEndLineNo;
  } // skip trailing spaces until the rest of the line


  while (pos < max) {
    ch = str.charCodeAt(pos);

    if (!isSpace$6(ch)) {
      break;
    }

    pos++;
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    if (title) {
      // garbage at the end of the line after title,
      // but it could still be a valid reference if we roll back
      title = '';
      pos = destEndPos;
      lines = destEndLineNo;

      while (pos < max) {
        ch = str.charCodeAt(pos);

        if (!isSpace$6(ch)) {
          break;
        }

        pos++;
      }
    }
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    // garbage at the end of the line
    return false;
  }

  label = normalizeReference$2(str.slice(1, labelEnd));

  if (!label) {
    // CommonMark 0.20 disallows empty labels
    return false;
  } // Reference can not terminate anything. This check is for safety only.

  /*istanbul ignore if*/


  if (silent) {
    return true;
  }

  if (typeof state.env.references === 'undefined') {
    state.env.references = {};
  }

  if (typeof state.env.references[label] === 'undefined') {
    state.env.references[label] = {
      title: title,
      href: href
    };
  }

  state.parentType = oldParentType;
  state.line = startLine + lines + 1;
  return true;
};

var isSpace$5 = utils$1.isSpace;

var heading = function heading(state, startLine, endLine, silent) {
  var ch,
      level,
      tmp,
      token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine]; // if it's indented more than 3 spaces, it should be a code block

  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }

  ch = state.src.charCodeAt(pos);

  if (ch !== 0x23
  /* # */
  || pos >= max) {
    return false;
  } // count heading level


  level = 1;
  ch = state.src.charCodeAt(++pos);

  while (ch === 0x23
  /* # */
  && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }

  if (level > 6 || pos < max && !isSpace$5(ch)) {
    return false;
  }

  if (silent) {
    return true;
  } // Let's cut tails like '    ###  ' from the end of string


  max = state.skipSpacesBack(max, pos);
  tmp = state.skipCharsBack(max, 0x23, pos); // #

  if (tmp > pos && isSpace$5(state.src.charCodeAt(tmp - 1))) {
    max = tmp;
  }

  state.line = startLine + 1;
  token = state.push('heading_open', 'h' + String(level), 1);
  token.markup = '########'.slice(0, level);
  token.map = [startLine, state.line];
  token = state.push('inline', '', 0);
  token.content = state.src.slice(pos, max).trim();
  token.map = [startLine, state.line];
  token.children = [];
  token = state.push('heading_close', 'h' + String(level), -1);
  token.markup = '########'.slice(0, level);
  return true;
};

var lheading = function lheading(state, startLine, endLine
/*, silent*/
) {
  var content,
      terminate,
      i,
      l,
      token,
      pos,
      max,
      level,
      marker,
      nextLine = startLine + 1,
      oldParentType,
      terminatorRules = state.md.block.ruler.getRules('paragraph'); // if it's indented more than 3 spaces, it should be a code block

  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }

  oldParentType = state.parentType;
  state.parentType = 'paragraph'; // use paragraph to match terminatorRules
  // jump line-by-line until empty one or EOF

  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) {
      continue;
    } //
    // Check for underline in setext header
    //


    if (state.sCount[nextLine] >= state.blkIndent) {
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos < max) {
        marker = state.src.charCodeAt(pos);

        if (marker === 0x2D
        /* - */
        || marker === 0x3D
        /* = */
        ) {
          pos = state.skipChars(pos, marker);
          pos = state.skipSpaces(pos);

          if (pos >= max) {
            level = marker === 0x3D
            /* = */
            ? 1 : 2;
            break;
          }
        }
      }
    } // quirk for blockquotes, this line should already be checked by that rule


    if (state.sCount[nextLine] < 0) {
      continue;
    } // Some tags can terminate paragraph without empty line.


    terminate = false;

    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }

    if (terminate) {
      break;
    }
  }

  if (!level) {
    // Didn't find valid underline
    return false;
  }

  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  state.line = nextLine + 1;
  token = state.push('heading_open', 'h' + String(level), 1);
  token.markup = String.fromCharCode(marker);
  token.map = [startLine, state.line];
  token = state.push('inline', '', 0);
  token.content = content;
  token.map = [startLine, state.line - 1];
  token.children = [];
  token = state.push('heading_close', 'h' + String(level), -1);
  token.markup = String.fromCharCode(marker);
  state.parentType = oldParentType;
  return true;
};

var html_blocks = ['address', 'article', 'aside', 'base', 'basefont', 'blockquote', 'body', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dialog', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'iframe', 'legend', 'li', 'link', 'main', 'menu', 'menuitem', 'meta', 'nav', 'noframes', 'ol', 'optgroup', 'option', 'p', 'param', 'section', 'source', 'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul'];

var html_re = {};

var attr_name = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
var unquoted = '[^"\'=<>`\\x00-\\x20]+';
var single_quoted = "'[^']*'";
var double_quoted = '"[^"]*"';
var attr_value = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';
var attribute = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';
var open_tag = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';
var close_tag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
var comment = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
var processing = '<[?].*?[?]>';
var declaration = '<![A-Z]+\\s+[^>]*>';
var cdata = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';
var HTML_TAG_RE$1 = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment + '|' + processing + '|' + declaration + '|' + cdata + ')');
var HTML_OPEN_CLOSE_TAG_RE$1 = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');
html_re.HTML_TAG_RE = HTML_TAG_RE$1;
html_re.HTML_OPEN_CLOSE_TAG_RE = HTML_OPEN_CLOSE_TAG_RE$1;

var block_names = html_blocks;
var HTML_OPEN_CLOSE_TAG_RE = html_re.HTML_OPEN_CLOSE_TAG_RE; // An array of opening and corresponding closing sequences for html tags,
// last argument defines whether it can terminate a paragraph or not
//

var HTML_SEQUENCES = [[/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true], [/^<!--/, /-->/, true], [/^<\?/, /\?>/, true], [/^<![A-Z]/, />/, true], [/^<!\[CDATA\[/, /\]\]>/, true], [new RegExp('^</?(' + block_names.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true], [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'), /^$/, false]];

var html_block = function html_block(state, startLine, endLine, silent) {
  var i,
      nextLine,
      token,
      lineText,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine]; // if it's indented more than 3 spaces, it should be a code block

  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }

  if (!state.md.options.html) {
    return false;
  }

  if (state.src.charCodeAt(pos) !== 0x3C
  /* < */
  ) {
    return false;
  }

  lineText = state.src.slice(pos, max);

  for (i = 0; i < HTML_SEQUENCES.length; i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) {
      break;
    }
  }

  if (i === HTML_SEQUENCES.length) {
    return false;
  }

  if (silent) {
    // true if this sequence can be a terminator, false otherwise
    return HTML_SEQUENCES[i][2];
  }

  nextLine = startLine + 1; // If we are here - we detected HTML block.
  // Let's roll down till block end.

  if (!HTML_SEQUENCES[i][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) {
        break;
      }

      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      lineText = state.src.slice(pos, max);

      if (HTML_SEQUENCES[i][1].test(lineText)) {
        if (lineText.length !== 0) {
          nextLine++;
        }

        break;
      }
    }
  }

  state.line = nextLine;
  token = state.push('html_block', '', 0);
  token.map = [startLine, nextLine];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
  return true;
};

var paragraph = function paragraph(state, startLine
/*, endLine*/
) {
  var content,
      terminate,
      i,
      l,
      token,
      oldParentType,
      nextLine = startLine + 1,
      terminatorRules = state.md.block.ruler.getRules('paragraph'),
      endLine = state.lineMax;
  oldParentType = state.parentType;
  state.parentType = 'paragraph'; // jump line-by-line until empty one or EOF

  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) {
      continue;
    } // quirk for blockquotes, this line should already be checked by that rule


    if (state.sCount[nextLine] < 0) {
      continue;
    } // Some tags can terminate paragraph without empty line.


    terminate = false;

    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }

    if (terminate) {
      break;
    }
  }

  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  state.line = nextLine;
  token = state.push('paragraph_open', 'p', 1);
  token.map = [startLine, state.line];
  token = state.push('inline', '', 0);
  token.content = content;
  token.map = [startLine, state.line];
  token.children = [];
  token = state.push('paragraph_close', 'p', -1);
  state.parentType = oldParentType;
  return true;
};

var Token$1 = token;
var isSpace$4 = utils$1.isSpace;

function StateBlock(src, md, env, tokens) {
  var ch, s, start, pos, len, indent, offset, indent_found;
  this.src = src; // link to parser instance

  this.md = md;
  this.env = env; //
  // Internal state vartiables
  //

  this.tokens = tokens;
  this.bMarks = []; // line begin offsets for fast jumps

  this.eMarks = []; // line end offsets for fast jumps

  this.tShift = []; // offsets of the first non-space characters (tabs not expanded)

  this.sCount = []; // indents for each line (tabs expanded)
  // An amount of virtual spaces (tabs expanded) between beginning
  // of each line (bMarks) and real beginning of that line.
  //
  // It exists only as a hack because blockquotes override bMarks
  // losing information in the process.
  //
  // It's used only when expanding tabs, you can think about it as
  // an initial tab length, e.g. bsCount=21 applied to string `\t123`
  // means first tab should be expanded to 4-21%4 === 3 spaces.
  //

  this.bsCount = []; // block parser variables

  this.blkIndent = 0; // required block content indent (for example, if we are
  // inside a list, it would be positioned after list marker)

  this.line = 0; // line index in src

  this.lineMax = 0; // lines count

  this.tight = false; // loose/tight mode for lists

  this.ddIndent = -1; // indent of the current dd block (-1 if there isn't any)

  this.listIndent = -1; // indent of the current list block (-1 if there isn't any)
  // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
  // used in lists to determine if they interrupt a paragraph

  this.parentType = 'root';
  this.level = 0; // renderer

  this.result = ''; // Create caches
  // Generate markers.

  s = this.src;
  indent_found = false;

  for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
    ch = s.charCodeAt(pos);

    if (!indent_found) {
      if (isSpace$4(ch)) {
        indent++;

        if (ch === 0x09) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }

        continue;
      } else {
        indent_found = true;
      }
    }

    if (ch === 0x0A || pos === len - 1) {
      if (ch !== 0x0A) {
        pos++;
      }

      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);
      this.sCount.push(offset);
      this.bsCount.push(0);
      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  } // Push fake entry to simplify cache bounds checks


  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);
  this.lineMax = this.bMarks.length - 1; // don't count last fake line
} // Push new token to "stream".
//


StateBlock.prototype.push = function (type, tag, nesting) {
  var token = new Token$1(type, tag, nesting);
  token.block = true;
  if (nesting < 0) this.level--; // closing tag

  token.level = this.level;
  if (nesting > 0) this.level++; // opening tag

  this.tokens.push(token);
  return token;
};

StateBlock.prototype.isEmpty = function isEmpty(line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};

StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (var max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }

  return from;
}; // Skip spaces from given position.


StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
  var ch;

  for (var max = this.src.length; pos < max; pos++) {
    ch = this.src.charCodeAt(pos);

    if (!isSpace$4(ch)) {
      break;
    }
  }

  return pos;
}; // Skip spaces from given position in reverse.


StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
  if (pos <= min) {
    return pos;
  }

  while (pos > min) {
    if (!isSpace$4(this.src.charCodeAt(--pos))) {
      return pos + 1;
    }
  }

  return pos;
}; // Skip char codes from given position


StateBlock.prototype.skipChars = function skipChars(pos, code) {
  for (var max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code) {
      break;
    }
  }

  return pos;
}; // Skip char codes reverse from given position - 1


StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
  if (pos <= min) {
    return pos;
  }

  while (pos > min) {
    if (code !== this.src.charCodeAt(--pos)) {
      return pos + 1;
    }
  }

  return pos;
}; // cut lines range from source.


StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
  var i,
      lineIndent,
      ch,
      first,
      last,
      queue,
      lineStart,
      line = begin;

  if (begin >= end) {
    return '';
  }

  queue = new Array(end - begin);

  for (i = 0; line < end; line++, i++) {
    lineIndent = 0;
    lineStart = first = this.bMarks[line];

    if (line + 1 < end || keepLastLF) {
      // No need for bounds check because we have fake entry on tail.
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }

    while (first < last && lineIndent < indent) {
      ch = this.src.charCodeAt(first);

      if (isSpace$4(ch)) {
        if (ch === 0x09) {
          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
        } else {
          lineIndent++;
        }
      } else if (first - lineStart < this.tShift[line]) {
        // patched tShift masked characters to look like spaces (blockquotes, list markers)
        lineIndent++;
      } else {
        break;
      }

      first++;
    }

    if (lineIndent > indent) {
      // partially expanding tabs in code blocks, e.g '\t\tfoobar'
      // with indent=2 becomes '  \tfoobar'
      queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
    } else {
      queue[i] = this.src.slice(first, last);
    }
  }

  return queue.join('');
}; // re-export Token class to use in block rules


StateBlock.prototype.Token = Token$1;
var state_block = StateBlock;

/** internal
 * class ParserBlock
 *
 * Block-level tokenizer.
 **/

var Ruler$1 = ruler;
var _rules$1 = [// First 2 params - rule name & source. Secondary array - list of rules,
// which can be terminated by this one.
['table', table, ['paragraph', 'reference']], ['code', code], ['fence', fence, ['paragraph', 'reference', 'blockquote', 'list']], ['blockquote', blockquote, ['paragraph', 'reference', 'blockquote', 'list']], ['hr', hr, ['paragraph', 'reference', 'blockquote', 'list']], ['list', list, ['paragraph', 'reference', 'blockquote']], ['reference', reference], ['heading', heading, ['paragraph', 'reference', 'blockquote']], ['lheading', lheading], ['html_block', html_block, ['paragraph', 'reference', 'blockquote']], ['paragraph', paragraph]];
/**
 * new ParserBlock()
 **/

function ParserBlock$1() {
  /**
   * ParserBlock#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of block rules.
   **/
  this.ruler = new Ruler$1();

  for (var i = 0; i < _rules$1.length; i++) {
    this.ruler.push(_rules$1[i][0], _rules$1[i][1], {
      alt: (_rules$1[i][2] || []).slice()
    });
  }
} // Generate tokens for input range
//


ParserBlock$1.prototype.tokenize = function (state, startLine, endLine) {
  var ok,
      i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      line = startLine,
      hasEmptyLines = false,
      maxNesting = state.md.options.maxNesting;

  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);

    if (line >= endLine) {
      break;
    } // Termination condition for nested calls.
    // Nested calls currently used for blockquotes & lists


    if (state.sCount[line] < state.blkIndent) {
      break;
    } // If nesting level exceeded - skip tail to the end. That's not ordinary
    // situation and we should not care about content.


    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    } // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.line`
    // - update `state.tokens`
    // - return true


    for (i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);

      if (ok) {
        break;
      }
    } // set state.tight if we had an empty line before current tag
    // i.e. latest empty line should not count


    state.tight = !hasEmptyLines; // paragraph might "eat" one newline after it in nested lists

    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }

    line = state.line;

    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      state.line = line;
    }
  }
};
/**
 * ParserBlock.parse(str, md, env, outTokens)
 *
 * Process input string and push block tokens into `outTokens`
 **/


ParserBlock$1.prototype.parse = function (src, md, env, outTokens) {
  var state;

  if (!src) {
    return;
  }

  state = new this.State(src, md, env, outTokens);
  this.tokenize(state, state.line, state.lineMax);
};

ParserBlock$1.prototype.State = state_block;
var parser_block = ParserBlock$1;

// '{}$%@~+=:' reserved for extentions
// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
// !!!! Don't confuse with "Markdown ASCII Punctuation" chars
// http://spec.commonmark.org/0.15/#ascii-punctuation-character


function isTerminatorChar(ch) {
  switch (ch) {
    case 0x0A
    /* \n */
    :
    case 0x21
    /* ! */
    :
    case 0x23
    /* # */
    :
    case 0x24
    /* $ */
    :
    case 0x25
    /* % */
    :
    case 0x26
    /* & */
    :
    case 0x2A
    /* * */
    :
    case 0x2B
    /* + */
    :
    case 0x2D
    /* - */
    :
    case 0x3A
    /* : */
    :
    case 0x3C
    /* < */
    :
    case 0x3D
    /* = */
    :
    case 0x3E
    /* > */
    :
    case 0x40
    /* @ */
    :
    case 0x5B
    /* [ */
    :
    case 0x5C
    /* \ */
    :
    case 0x5D
    /* ] */
    :
    case 0x5E
    /* ^ */
    :
    case 0x5F
    /* _ */
    :
    case 0x60
    /* ` */
    :
    case 0x7B
    /* { */
    :
    case 0x7D
    /* } */
    :
    case 0x7E
    /* ~ */
    :
      return true;

    default:
      return false;
  }
}

var text = function text(state, silent) {
  var pos = state.pos;

  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }

  if (pos === state.pos) {
    return false;
  }

  if (!silent) {
    state.pending += state.src.slice(state.pos, pos);
  }

  state.pos = pos;
  return true;
}; // Alternative implementation, for memory.

var isSpace$3 = utils$1.isSpace;

var newline = function newline(state, silent) {
  var pmax,
      max,
      pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x0A
  /* \n */
  ) {
    return false;
  }

  pmax = state.pending.length - 1;
  max = state.posMax; // '  \n' -> hardbreak
  // Lookup in pending chars is bad practice! Don't copy to other rules!
  // Pending string is stored in concat mode, indexed lookups will cause
  // convertion to flat mode.

  if (!silent) {
    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
        state.pending = state.pending.replace(/ +$/, '');
        state.push('hardbreak', 'br', 0);
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push('softbreak', 'br', 0);
      }
    } else {
      state.push('softbreak', 'br', 0);
    }
  }

  pos++; // skip heading spaces for next line

  while (pos < max && isSpace$3(state.src.charCodeAt(pos))) {
    pos++;
  }

  state.pos = pos;
  return true;
};

var isSpace$2 = utils$1.isSpace;
var ESCAPED = [];

for (var i = 0; i < 256; i++) {
  ESCAPED.push(0);
}

'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'.split('').forEach(function (ch) {
  ESCAPED[ch.charCodeAt(0)] = 1;
});

var _escape = function escape(state, silent) {
  var ch,
      pos = state.pos,
      max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x5C
  /* \ */
  ) {
    return false;
  }

  pos++;

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (ch < 256 && ESCAPED[ch] !== 0) {
      if (!silent) {
        state.pending += state.src[pos];
      }

      state.pos += 2;
      return true;
    }

    if (ch === 0x0A) {
      if (!silent) {
        state.push('hardbreak', 'br', 0);
      }

      pos++; // skip leading whitespaces from next line

      while (pos < max) {
        ch = state.src.charCodeAt(pos);

        if (!isSpace$2(ch)) {
          break;
        }

        pos++;
      }

      state.pos = pos;
      return true;
    }
  }

  if (!silent) {
    state.pending += '\\';
  }

  state.pos++;
  return true;
};

var backticks = function backtick(state, silent) {
  var start,
      max,
      marker,
      matchStart,
      matchEnd,
      token,
      pos = state.pos,
      ch = state.src.charCodeAt(pos);

  if (ch !== 0x60
  /* ` */
  ) {
    return false;
  }

  start = pos;
  pos++;
  max = state.posMax;

  while (pos < max && state.src.charCodeAt(pos) === 0x60
  /* ` */
  ) {
    pos++;
  }

  marker = state.src.slice(start, pos);
  matchStart = matchEnd = pos;

  while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
    matchEnd = matchStart + 1;

    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60
    /* ` */
    ) {
      matchEnd++;
    }

    if (matchEnd - matchStart === marker.length) {
      if (!silent) {
        token = state.push('code_inline', 'code', 0);
        token.markup = marker;
        token.content = state.src.slice(pos, matchStart).replace(/\n/g, ' ').replace(/^ (.+) $/, '$1');
      }

      state.pos = matchEnd;
      return true;
    }
  }

  if (!silent) {
    state.pending += marker;
  }

  state.pos += marker.length;
  return true;
};

var strikethrough = {};

//


strikethrough.tokenize = function strikethrough(state, silent) {
  var i,
      scanned,
      token,
      len,
      ch,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (silent) {
    return false;
  }

  if (marker !== 0x7E
  /* ~ */
  ) {
    return false;
  }

  scanned = state.scanDelims(state.pos, true);
  len = scanned.length;
  ch = String.fromCharCode(marker);

  if (len < 2) {
    return false;
  }

  if (len % 2) {
    token = state.push('text', '', 0);
    token.content = ch;
    len--;
  }

  for (i = 0; i < len; i += 2) {
    token = state.push('text', '', 0);
    token.content = ch + ch;
    state.delimiters.push({
      marker: marker,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      jump: i,
      token: state.tokens.length - 1,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close
    });
  }

  state.pos += scanned.length;
  return true;
};

function postProcess$1(state, delimiters) {
  var i,
      j,
      startDelim,
      endDelim,
      token,
      loneMarkers = [],
      max = delimiters.length;

  for (i = 0; i < max; i++) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x7E
    /* ~ */
    ) {
      continue;
    }

    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];
    token = state.tokens[startDelim.token];
    token.type = 's_open';
    token.tag = 's';
    token.nesting = 1;
    token.markup = '~~';
    token.content = '';
    token = state.tokens[endDelim.token];
    token.type = 's_close';
    token.tag = 's';
    token.nesting = -1;
    token.markup = '~~';
    token.content = '';

    if (state.tokens[endDelim.token - 1].type === 'text' && state.tokens[endDelim.token - 1].content === '~') {
      loneMarkers.push(endDelim.token - 1);
    }
  } // If a marker sequence has an odd number of characters, it's splitted
  // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
  // start of the sequence.
  //
  // So, we have to move all those markers after subsequent s_close tags.
  //


  while (loneMarkers.length) {
    i = loneMarkers.pop();
    j = i + 1;

    while (j < state.tokens.length && state.tokens[j].type === 's_close') {
      j++;
    }

    j--;

    if (i !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i];
      state.tokens[i] = token;
    }
  }
} // Walk through delimiter list and replace text tokens with tags
//


strikethrough.postProcess = function strikethrough(state) {
  var curr,
      tokens_meta = state.tokens_meta,
      max = state.tokens_meta.length;
  postProcess$1(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess$1(state, tokens_meta[curr].delimiters);
    }
  }
};

var emphasis = {};

//


emphasis.tokenize = function emphasis(state, silent) {
  var i,
      scanned,
      token,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (silent) {
    return false;
  }

  if (marker !== 0x5F
  /* _ */
  && marker !== 0x2A
  /* * */
  ) {
    return false;
  }

  scanned = state.scanDelims(state.pos, marker === 0x2A);

  for (i = 0; i < scanned.length; i++) {
    token = state.push('text', '', 0);
    token.content = String.fromCharCode(marker);
    state.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: marker,
      // Total length of these series of delimiters.
      //
      length: scanned.length,
      // An amount of characters before this one that's equivalent to
      // current one. In plain English: if this delimiter does not open
      // an emphasis, neither do previous `jump` characters.
      //
      // Used to skip sequences like "*****" in one step, for 1st asterisk
      // value will be 0, for 2nd it's 1 and so on.
      //
      jump: i,
      // A position of the token this delimiter corresponds to.
      //
      token: state.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: scanned.can_open,
      close: scanned.can_close
    });
  }

  state.pos += scanned.length;
  return true;
};

function postProcess(state, delimiters) {
  var i,
      startDelim,
      endDelim,
      token,
      ch,
      isStrong,
      max = delimiters.length;

  for (i = max - 1; i >= 0; i--) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x5F
    /* _ */
    && startDelim.marker !== 0x2A
    /* * */
    ) {
      continue;
    } // Process only opening markers


    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end]; // If the previous delimiter has the same marker and is adjacent to this one,
    // merge those into one strong delimiter.
    //
    // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
    //

    isStrong = i > 0 && delimiters[i - 1].end === startDelim.end + 1 && delimiters[i - 1].token === startDelim.token - 1 && delimiters[startDelim.end + 1].token === endDelim.token + 1 && delimiters[i - 1].marker === startDelim.marker;
    ch = String.fromCharCode(startDelim.marker);
    token = state.tokens[startDelim.token];
    token.type = isStrong ? 'strong_open' : 'em_open';
    token.tag = isStrong ? 'strong' : 'em';
    token.nesting = 1;
    token.markup = isStrong ? ch + ch : ch;
    token.content = '';
    token = state.tokens[endDelim.token];
    token.type = isStrong ? 'strong_close' : 'em_close';
    token.tag = isStrong ? 'strong' : 'em';
    token.nesting = -1;
    token.markup = isStrong ? ch + ch : ch;
    token.content = '';

    if (isStrong) {
      state.tokens[delimiters[i - 1].token].content = '';
      state.tokens[delimiters[startDelim.end + 1].token].content = '';
      i--;
    }
  }
} // Walk through delimiter list and replace text tokens with tags
//


emphasis.postProcess = function emphasis(state) {
  var curr,
      tokens_meta = state.tokens_meta,
      max = state.tokens_meta.length;
  postProcess(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess(state, tokens_meta[curr].delimiters);
    }
  }
};

var normalizeReference$1 = utils$1.normalizeReference;
var isSpace$1 = utils$1.isSpace;

var link$1 = function link(state, silent) {
  var attrs,
      code,
      label,
      labelEnd,
      labelStart,
      pos,
      res,
      ref,
      title,
      token,
      href = '',
      oldPos = state.pos,
      max = state.posMax,
      start = state.pos,
      parseReference = true;

  if (state.src.charCodeAt(state.pos) !== 0x5B
  /* [ */
  ) {
    return false;
  }

  labelStart = state.pos + 1;
  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true); // parser failed to find ']', so it's not a valid link

  if (labelEnd < 0) {
    return false;
  }

  pos = labelEnd + 1;

  if (pos < max && state.src.charCodeAt(pos) === 0x28
  /* ( */
  ) {
    //
    // Inline link
    //
    // might have found a valid shortcut link, disable reference parsing
    parseReference = false; // [link](  <href>  "title"  )
    //        ^^ skipping these spaces

    pos++;

    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);

      if (!isSpace$1(code) && code !== 0x0A) {
        break;
      }
    }

    if (pos >= max) {
      return false;
    } // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination


    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);

    if (res.ok) {
      href = state.md.normalizeLink(res.str);

      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    } // [link](  <href>  "title"  )
    //                ^^ skipping these spaces


    start = pos;

    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);

      if (!isSpace$1(code) && code !== 0x0A) {
        break;
      }
    } // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title


    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);

    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos; // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces

      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);

        if (!isSpace$1(code) && code !== 0x0A) {
          break;
        }
      }
    } else {
      title = '';
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29
    /* ) */
    ) {
      // parsing a valid shortcut link failed, fallback to reference
      parseReference = true;
    }

    pos++;
  }

  if (parseReference) {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') {
      return false;
    }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B
    /* [ */
    ) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);

      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    } // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)


    if (!label) {
      label = state.src.slice(labelStart, labelEnd);
    }

    ref = state.env.references[normalizeReference$1(label)];

    if (!ref) {
      state.pos = oldPos;
      return false;
    }

    href = ref.href;
    title = ref.title;
  } //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //


  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;
    token = state.push('link_open', 'a', 1);
    token.attrs = attrs = [['href', href]];

    if (title) {
      attrs.push(['title', title]);
    }

    state.md.inline.tokenize(state);
    token = state.push('link_close', 'a', -1);
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};

var normalizeReference = utils$1.normalizeReference;
var isSpace = utils$1.isSpace;

var image = function image(state, silent) {
  var attrs,
      code,
      content,
      label,
      labelEnd,
      labelStart,
      pos,
      ref,
      res,
      title,
      token,
      tokens,
      start,
      href = '',
      oldPos = state.pos,
      max = state.posMax;

  if (state.src.charCodeAt(state.pos) !== 0x21
  /* ! */
  ) {
    return false;
  }

  if (state.src.charCodeAt(state.pos + 1) !== 0x5B
  /* [ */
  ) {
    return false;
  }

  labelStart = state.pos + 2;
  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false); // parser failed to find ']', so it's not a valid link

  if (labelEnd < 0) {
    return false;
  }

  pos = labelEnd + 1;

  if (pos < max && state.src.charCodeAt(pos) === 0x28
  /* ( */
  ) {
    //
    // Inline link
    //
    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;

    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);

      if (!isSpace(code) && code !== 0x0A) {
        break;
      }
    }

    if (pos >= max) {
      return false;
    } // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination


    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);

    if (res.ok) {
      href = state.md.normalizeLink(res.str);

      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    } // [link](  <href>  "title"  )
    //                ^^ skipping these spaces


    start = pos;

    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);

      if (!isSpace(code) && code !== 0x0A) {
        break;
      }
    } // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title


    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);

    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos; // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces

      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);

        if (!isSpace(code) && code !== 0x0A) {
          break;
        }
      }
    } else {
      title = '';
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29
    /* ) */
    ) {
      state.pos = oldPos;
      return false;
    }

    pos++;
  } else {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') {
      return false;
    }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B
    /* [ */
    ) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);

      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    } // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)


    if (!label) {
      label = state.src.slice(labelStart, labelEnd);
    }

    ref = state.env.references[normalizeReference(label)];

    if (!ref) {
      state.pos = oldPos;
      return false;
    }

    href = ref.href;
    title = ref.title;
  } //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //


  if (!silent) {
    content = state.src.slice(labelStart, labelEnd);
    state.md.inline.parse(content, state.md, state.env, tokens = []);
    token = state.push('image', 'img', 0);
    token.attrs = attrs = [['src', href], ['alt', '']];
    token.children = tokens;
    token.content = content;

    if (title) {
      attrs.push(['title', title]);
    }
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};

/*eslint max-len:0*/


var EMAIL_RE = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
var AUTOLINK_RE = /^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;

var autolink = function autolink(state, silent) {
  var tail,
      linkMatch,
      emailMatch,
      url,
      fullUrl,
      token,
      pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x3C
  /* < */
  ) {
    return false;
  }

  tail = state.src.slice(pos);

  if (tail.indexOf('>') < 0) {
    return false;
  }

  if (AUTOLINK_RE.test(tail)) {
    linkMatch = tail.match(AUTOLINK_RE);
    url = linkMatch[0].slice(1, -1);
    fullUrl = state.md.normalizeLink(url);

    if (!state.md.validateLink(fullUrl)) {
      return false;
    }

    if (!silent) {
      token = state.push('link_open', 'a', 1);
      token.attrs = [['href', fullUrl]];
      token.markup = 'autolink';
      token.info = 'auto';
      token = state.push('text', '', 0);
      token.content = state.md.normalizeLinkText(url);
      token = state.push('link_close', 'a', -1);
      token.markup = 'autolink';
      token.info = 'auto';
    }

    state.pos += linkMatch[0].length;
    return true;
  }

  if (EMAIL_RE.test(tail)) {
    emailMatch = tail.match(EMAIL_RE);
    url = emailMatch[0].slice(1, -1);
    fullUrl = state.md.normalizeLink('mailto:' + url);

    if (!state.md.validateLink(fullUrl)) {
      return false;
    }

    if (!silent) {
      token = state.push('link_open', 'a', 1);
      token.attrs = [['href', fullUrl]];
      token.markup = 'autolink';
      token.info = 'auto';
      token = state.push('text', '', 0);
      token.content = state.md.normalizeLinkText(url);
      token = state.push('link_close', 'a', -1);
      token.markup = 'autolink';
      token.info = 'auto';
    }

    state.pos += emailMatch[0].length;
    return true;
  }

  return false;
};

var HTML_TAG_RE = html_re.HTML_TAG_RE;

function isLetter(ch) {
  /*eslint no-bitwise:0*/
  var lc = ch | 0x20; // to lower case

  return lc >= 0x61
  /* a */
  && lc <= 0x7a
  /* z */
  ;
}

var html_inline = function html_inline(state, silent) {
  var ch,
      match,
      max,
      token,
      pos = state.pos;

  if (!state.md.options.html) {
    return false;
  } // Check start


  max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x3C
  /* < */
  || pos + 2 >= max) {
    return false;
  } // Quick fail on second char


  ch = state.src.charCodeAt(pos + 1);

  if (ch !== 0x21
  /* ! */
  && ch !== 0x3F
  /* ? */
  && ch !== 0x2F
  /* / */
  && !isLetter(ch)) {
    return false;
  }

  match = state.src.slice(pos).match(HTML_TAG_RE);

  if (!match) {
    return false;
  }

  if (!silent) {
    token = state.push('html_inline', '', 0);
    token.content = state.src.slice(pos, pos + match[0].length);
  }

  state.pos += match[0].length;
  return true;
};

var entities = entities$1;
var has = utils$1.has;
var isValidEntityCode = utils$1.isValidEntityCode;
var fromCodePoint = utils$1.fromCodePoint;
var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;

var entity = function entity(state, silent) {
  var ch,
      code,
      match,
      pos = state.pos,
      max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x26
  /* & */
  ) {
    return false;
  }

  if (pos + 1 < max) {
    ch = state.src.charCodeAt(pos + 1);

    if (ch === 0x23
    /* # */
    ) {
      match = state.src.slice(pos).match(DIGITAL_RE);

      if (match) {
        if (!silent) {
          code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
          state.pending += isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
        }

        state.pos += match[0].length;
        return true;
      }
    } else {
      match = state.src.slice(pos).match(NAMED_RE);

      if (match) {
        if (has(entities, match[1])) {
          if (!silent) {
            state.pending += entities[match[1]];
          }

          state.pos += match[0].length;
          return true;
        }
      }
    }
  }

  if (!silent) {
    state.pending += '&';
  }

  state.pos++;
  return true;
};

function processDelimiters(state, delimiters) {
  var closerIdx,
      openerIdx,
      closer,
      opener,
      minOpenerIdx,
      newMinOpenerIdx,
      isOddMatch,
      lastJump,
      openersBottom = {},
      max = delimiters.length;

  for (closerIdx = 0; closerIdx < max; closerIdx++) {
    closer = delimiters[closerIdx]; // Length is only used for emphasis-specific "rule of 3",
    // if it's not defined (in strikethrough or 3rd party plugins),
    // we can default it to 0 to disable those checks.
    //

    closer.length = closer.length || 0;
    if (!closer.close) continue; // Previously calculated lower bounds (previous fails)
    // for each marker and each delimiter length modulo 3.

    if (!openersBottom.hasOwnProperty(closer.marker)) {
      openersBottom[closer.marker] = [-1, -1, -1];
    }

    minOpenerIdx = openersBottom[closer.marker][closer.length % 3];
    newMinOpenerIdx = -1;
    openerIdx = closerIdx - closer.jump - 1;

    for (; openerIdx > minOpenerIdx; openerIdx -= opener.jump + 1) {
      opener = delimiters[openerIdx];
      if (opener.marker !== closer.marker) continue;
      if (newMinOpenerIdx === -1) newMinOpenerIdx = openerIdx;

      if (opener.open && opener.end < 0 && opener.level === closer.level) {
        isOddMatch = false; // from spec:
        //
        // If one of the delimiters can both open and close emphasis, then the
        // sum of the lengths of the delimiter runs containing the opening and
        // closing delimiters must not be a multiple of 3 unless both lengths
        // are multiples of 3.
        //

        if (opener.close || closer.open) {
          if ((opener.length + closer.length) % 3 === 0) {
            if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
              isOddMatch = true;
            }
          }
        }

        if (!isOddMatch) {
          // If previous delimiter cannot be an opener, we can safely skip
          // the entire sequence in future checks. This is required to make
          // sure algorithm has linear complexity (see *_*_*_*_*_... case).
          //
          lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? delimiters[openerIdx - 1].jump + 1 : 0;
          closer.jump = closerIdx - openerIdx + lastJump;
          closer.open = false;
          opener.end = closerIdx;
          opener.jump = lastJump;
          opener.close = false;
          newMinOpenerIdx = -1;
          break;
        }
      }
    }

    if (newMinOpenerIdx !== -1) {
      // If match for this delimiter run failed, we want to set lower bound for
      // future lookups. This is required to make sure algorithm has linear
      // complexity.
      //
      // See details here:
      // https://github.com/commonmark/cmark/issues/178#issuecomment-270417442
      //
      openersBottom[closer.marker][(closer.length || 0) % 3] = newMinOpenerIdx;
    }
  }
}

var balance_pairs = function link_pairs(state) {
  var curr,
      tokens_meta = state.tokens_meta,
      max = state.tokens_meta.length;
  processDelimiters(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      processDelimiters(state, tokens_meta[curr].delimiters);
    }
  }
};

var text_collapse = function text_collapse(state) {
  var curr,
      last,
      level = 0,
      tokens = state.tokens,
      max = state.tokens.length;

  for (curr = last = 0; curr < max; curr++) {
    // re-calculate levels after emphasis/strikethrough turns some text nodes
    // into opening/closing tags
    if (tokens[curr].nesting < 0) level--; // closing tag

    tokens[curr].level = level;
    if (tokens[curr].nesting > 0) level++; // opening tag

    if (tokens[curr].type === 'text' && curr + 1 < max && tokens[curr + 1].type === 'text') {
      // collapse two adjacent text nodes
      tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
    } else {
      if (curr !== last) {
        tokens[last] = tokens[curr];
      }

      last++;
    }
  }

  if (curr !== last) {
    tokens.length = last;
  }
};

var Token = token;
var isWhiteSpace = utils$1.isWhiteSpace;
var isPunctChar = utils$1.isPunctChar;
var isMdAsciiPunct = utils$1.isMdAsciiPunct;

function StateInline(src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;
  this.tokens_meta = Array(outTokens.length);
  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = '';
  this.pendingLevel = 0; // Stores { start: end } pairs. Useful for backtrack
  // optimization of pairs parse (emphasis, strikes).

  this.cache = {}; // List of emphasis-like delimiters for current tag

  this.delimiters = []; // Stack of delimiter lists for upper level tags

  this._prev_delimiters = [];
} // Flush pending text
//


StateInline.prototype.pushPending = function () {
  var token = new Token('text', '', 0);
  token.content = this.pending;
  token.level = this.pendingLevel;
  this.tokens.push(token);
  this.pending = '';
  return token;
}; // Push new token to "stream".
// If pending text exists - flush it as text token
//


StateInline.prototype.push = function (type, tag, nesting) {
  if (this.pending) {
    this.pushPending();
  }

  var token = new Token(type, tag, nesting);
  var token_meta = null;

  if (nesting < 0) {
    // closing tag
    this.level--;
    this.delimiters = this._prev_delimiters.pop();
  }

  token.level = this.level;

  if (nesting > 0) {
    // opening tag
    this.level++;

    this._prev_delimiters.push(this.delimiters);

    this.delimiters = [];
    token_meta = {
      delimiters: this.delimiters
    };
  }

  this.pendingLevel = this.level;
  this.tokens.push(token);
  this.tokens_meta.push(token_meta);
  return token;
}; // Scan a sequence of emphasis-like markers, and determine whether
// it can start an emphasis sequence or end an emphasis sequence.
//
//  - start - position to scan from (it should point at a valid marker);
//  - canSplitWord - determine if these markers can be found inside a word
//


StateInline.prototype.scanDelims = function (start, canSplitWord) {
  var pos = start,
      lastChar,
      nextChar,
      count,
      can_open,
      can_close,
      isLastWhiteSpace,
      isLastPunctChar,
      isNextWhiteSpace,
      isNextPunctChar,
      left_flanking = true,
      right_flanking = true,
      max = this.posMax,
      marker = this.src.charCodeAt(start); // treat beginning of the line as a whitespace

  lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;

  while (pos < max && this.src.charCodeAt(pos) === marker) {
    pos++;
  }

  count = pos - start; // treat end of the line as a whitespace

  nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;
  isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
  isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
  isLastWhiteSpace = isWhiteSpace(lastChar);
  isNextWhiteSpace = isWhiteSpace(nextChar);

  if (isNextWhiteSpace) {
    left_flanking = false;
  } else if (isNextPunctChar) {
    if (!(isLastWhiteSpace || isLastPunctChar)) {
      left_flanking = false;
    }
  }

  if (isLastWhiteSpace) {
    right_flanking = false;
  } else if (isLastPunctChar) {
    if (!(isNextWhiteSpace || isNextPunctChar)) {
      right_flanking = false;
    }
  }

  if (!canSplitWord) {
    can_open = left_flanking && (!right_flanking || isLastPunctChar);
    can_close = right_flanking && (!left_flanking || isNextPunctChar);
  } else {
    can_open = left_flanking;
    can_close = right_flanking;
  }

  return {
    can_open: can_open,
    can_close: can_close,
    length: count
  };
}; // re-export Token class to use in block rules


StateInline.prototype.Token = Token;
var state_inline = StateInline;

/** internal
 * class ParserInline
 *
 * Tokenizes paragraph content.
 **/

var Ruler = ruler; ////////////////////////////////////////////////////////////////////////////////
// Parser rules

var _rules = [['text', text], ['newline', newline], ['escape', _escape], ['backticks', backticks], ['strikethrough', strikethrough.tokenize], ['emphasis', emphasis.tokenize], ['link', link$1], ['image', image], ['autolink', autolink], ['html_inline', html_inline], ['entity', entity]];
var _rules2 = [['balance_pairs', balance_pairs], ['strikethrough', strikethrough.postProcess], ['emphasis', emphasis.postProcess], ['text_collapse', text_collapse]];
/**
 * new ParserInline()
 **/

function ParserInline$1() {
  var i;
  /**
   * ParserInline#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of inline rules.
   **/

  this.ruler = new Ruler();

  for (i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
  /**
   * ParserInline#ruler2 -> Ruler
   *
   * [[Ruler]] instance. Second ruler used for post-processing
   * (e.g. in emphasis-like rules).
   **/


  this.ruler2 = new Ruler();

  for (i = 0; i < _rules2.length; i++) {
    this.ruler2.push(_rules2[i][0], _rules2[i][1]);
  }
} // Skip single token by running all rules in validation mode;
// returns `true` if any rule reported success
//


ParserInline$1.prototype.skipToken = function (state) {
  var ok,
      i,
      pos = state.pos,
      rules = this.ruler.getRules(''),
      len = rules.length,
      maxNesting = state.md.options.maxNesting,
      cache = state.cache;

  if (typeof cache[pos] !== 'undefined') {
    state.pos = cache[pos];
    return;
  }

  if (state.level < maxNesting) {
    for (i = 0; i < len; i++) {
      // Increment state.level and decrement it later to limit recursion.
      // It's harmless to do here, because no tokens are created. But ideally,
      // we'd need a separate private state variable for this purpose.
      //
      state.level++;
      ok = rules[i](state, true);
      state.level--;

      if (ok) {
        break;
      }
    }
  } else {
    // Too much nesting, just skip until the end of the paragraph.
    //
    // NOTE: this will cause links to behave incorrectly in the following case,
    //       when an amount of `[` is exactly equal to `maxNesting + 1`:
    //
    //       [[[[[[[[[[[[[[[[[[[[[foo]()
    //
    // TODO: remove this workaround when CM standard will allow nested links
    //       (we can replace it by preventing links from being parsed in
    //       validation mode)
    //
    state.pos = state.posMax;
  }

  if (!ok) {
    state.pos++;
  }

  cache[pos] = state.pos;
}; // Generate tokens for input range
//


ParserInline$1.prototype.tokenize = function (state) {
  var ok,
      i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      end = state.posMax,
      maxNesting = state.md.options.maxNesting;

  while (state.pos < end) {
    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.pos`
    // - update `state.tokens`
    // - return true
    if (state.level < maxNesting) {
      for (i = 0; i < len; i++) {
        ok = rules[i](state, false);

        if (ok) {
          break;
        }
      }
    }

    if (ok) {
      if (state.pos >= end) {
        break;
      }

      continue;
    }

    state.pending += state.src[state.pos++];
  }

  if (state.pending) {
    state.pushPending();
  }
};
/**
 * ParserInline.parse(str, md, env, outTokens)
 *
 * Process input string and push inline tokens into `outTokens`
 **/


ParserInline$1.prototype.parse = function (str, md, env, outTokens) {
  var i, rules, len;
  var state = new this.State(str, md, env, outTokens);
  this.tokenize(state);
  rules = this.ruler2.getRules('');
  len = rules.length;

  for (i = 0; i < len; i++) {
    rules[i](state);
  }
};

ParserInline$1.prototype.State = state_inline;
var parser_inline = ParserInline$1;

var re = function (opts) {
  var re = {}; // Use direct extract instead of `regenerate` to reduse browserified size

  re.src_Any = regex$3.source;
  re.src_Cc = regex$2.source;
  re.src_Z = regex.source;
  re.src_P = regex$4.source; // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)

  re.src_ZPCc = [re.src_Z, re.src_P, re.src_Cc].join('|'); // \p{\Z\Cc} (white spaces + control)

  re.src_ZCc = [re.src_Z, re.src_Cc].join('|'); // Experimental. List of chars, completely prohibited in links
  // because can separate it from other part of text

  var text_separators = '[><\uff5c]'; // All possible word characters (everything without punctuation, spaces & controls)
  // Defined via punctuation & spaces to save space
  // Should be something like \p{\L\N\S\M} (\w but without `_`)

  re.src_pseudo_letter = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')'; // The same as abothe but without [0-9]
  // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';
  ////////////////////////////////////////////////////////////////////////////////

  re.src_ip4 = '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'; // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.

  re.src_auth = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';
  re.src_port = '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';
  re.src_host_terminator = '(?=$|' + text_separators + '|' + re.src_ZPCc + ')(?!-|_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';
  re.src_path = '(?:' + '[/?#]' + '(?:' + '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-]).|' + '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' + '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' + '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' + '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' + "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" + "\\'(?=" + re.src_pseudo_letter + '|[-]).|' + // allow `I'm_king` if no pair found
  '\\.{2,}[a-zA-Z0-9%/&]|' + // google has many dots in "google search" links (#66, #81).
  // github has ... in commit range links,
  // Restrict to
  // - english
  // - percent-encoded
  // - parts of file path
  // - params separator
  // until more examples found.
  '\\.(?!' + re.src_ZCc + '|[.]).|' + (opts && opts['---'] ? '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
  : '\\-+|') + '\\,(?!' + re.src_ZCc + ').|' + // allow `,,,` in paths
  '\\!+(?!' + re.src_ZCc + '|[!]).|' + // allow `!!!` in paths, but not at the end
  '\\?(?!' + re.src_ZCc + '|[?]).' + ')+' + '|\\/' + ')?'; // Allow anything in markdown spec, forbid quote (") at the first position
  // because emails enclosed in quotes are far more common

  re.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';
  re.src_xn = 'xn--[a-z0-9\\-]{1,59}'; // More to read about domain names
  // http://serverfault.com/questions/638260/

  re.src_domain_root = // Allow letters & digits (http://test1)
  '(?:' + re.src_xn + '|' + re.src_pseudo_letter + '{1,63}' + ')';
  re.src_domain = '(?:' + re.src_xn + '|' + '(?:' + re.src_pseudo_letter + ')' + '|' + '(?:' + re.src_pseudo_letter + '(?:-|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' + ')';
  re.src_host = '(?:' + // Don't need IP check, because digits are already allowed in normal domain names
  //   src_ip4 +
  // '|' +
  '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain
  /*_root*/
  + ')' + ')';
  re.tpl_host_fuzzy = '(?:' + re.src_ip4 + '|' + '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' + ')';
  re.tpl_host_no_ip_fuzzy = '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';
  re.src_host_strict = re.src_host + re.src_host_terminator;
  re.tpl_host_fuzzy_strict = re.tpl_host_fuzzy + re.src_host_terminator;
  re.src_host_port_strict = re.src_host + re.src_port + re.src_host_terminator;
  re.tpl_host_port_fuzzy_strict = re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;
  re.tpl_host_port_no_ip_fuzzy_strict = re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator; ////////////////////////////////////////////////////////////////////////////////
  // Main rules
  // Rude test fuzzy links by host, for quick deny

  re.tpl_host_fuzzy_test = 'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';
  re.tpl_email_fuzzy = '(^|' + text_separators + '|"|\\(|' + re.src_ZCc + ')' + '(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';
  re.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' + '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';
  re.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' + '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';
  return re;
};

// Helpers
// Merge objects
//


function assign(obj
/*from1, from2, from3, ...*/
) {
  var sources = Array.prototype.slice.call(arguments, 1);
  sources.forEach(function (source) {
    if (!source) {
      return;
    }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });
  return obj;
}

function _class(obj) {
  return Object.prototype.toString.call(obj);
}

function isString(obj) {
  return _class(obj) === '[object String]';
}

function isObject(obj) {
  return _class(obj) === '[object Object]';
}

function isRegExp(obj) {
  return _class(obj) === '[object RegExp]';
}

function isFunction(obj) {
  return _class(obj) === '[object Function]';
}

function escapeRE(str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
} ////////////////////////////////////////////////////////////////////////////////


var defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};

function isOptionsObj(obj) {
  return Object.keys(obj || {}).reduce(function (acc, k) {
    return acc || defaultOptions.hasOwnProperty(k);
  }, false);
}

var defaultSchemas = {
  'http:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.http) {
        // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.http = new RegExp('^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i');
      }

      if (self.re.http.test(tail)) {
        return tail.match(self.re.http)[0].length;
      }

      return 0;
    }
  },
  'https:': 'http:',
  'ftp:': 'http:',
  '//': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.no_http) {
        // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.no_http = new RegExp('^' + self.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
        // with code comments
        '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' + self.re.src_port + self.re.src_host_terminator + self.re.src_path, 'i');
      }

      if (self.re.no_http.test(tail)) {
        // should not be `://` & `///`, that protects from errors in protocol name
        if (pos >= 3 && text[pos - 3] === ':') {
          return 0;
        }

        if (pos >= 3 && text[pos - 3] === '/') {
          return 0;
        }

        return tail.match(self.re.no_http)[0].length;
      }

      return 0;
    }
  },
  'mailto:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.mailto) {
        self.re.mailto = new RegExp('^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i');
      }

      if (self.re.mailto.test(tail)) {
        return tail.match(self.re.mailto)[0].length;
      }

      return 0;
    }
  }
};
/*eslint-disable max-len*/
// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)

var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]'; // DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead

var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');
/*eslint-enable max-len*/
////////////////////////////////////////////////////////////////////////////////

function resetScanCache(self) {
  self.__index__ = -1;
  self.__text_cache__ = '';
}

function createValidator(re) {
  return function (text, pos) {
    var tail = text.slice(pos);

    if (re.test(tail)) {
      return tail.match(re)[0].length;
    }

    return 0;
  };
}

function createNormalizer() {
  return function (match, self) {
    self.normalize(match);
  };
} // Schemas compiler. Build regexps.
//


function compile(self) {
  // Load & clone RE patterns.
  var re$1 = self.re = re(self.__opts__); // Define dynamic patterns

  var tlds = self.__tlds__.slice();

  self.onCompile();

  if (!self.__tlds_replaced__) {
    tlds.push(tlds_2ch_src_re);
  }

  tlds.push(re$1.src_xn);
  re$1.src_tlds = tlds.join('|');

  function untpl(tpl) {
    return tpl.replace('%TLDS%', re$1.src_tlds);
  }

  re$1.email_fuzzy = RegExp(untpl(re$1.tpl_email_fuzzy), 'i');
  re$1.link_fuzzy = RegExp(untpl(re$1.tpl_link_fuzzy), 'i');
  re$1.link_no_ip_fuzzy = RegExp(untpl(re$1.tpl_link_no_ip_fuzzy), 'i');
  re$1.host_fuzzy_test = RegExp(untpl(re$1.tpl_host_fuzzy_test), 'i'); //
  // Compile each schema
  //

  var aliases = [];
  self.__compiled__ = {}; // Reset compiled data

  function schemaError(name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
  }

  Object.keys(self.__schemas__).forEach(function (name) {
    var val = self.__schemas__[name]; // skip disabled methods

    if (val === null) {
      return;
    }

    var compiled = {
      validate: null,
      link: null
    };
    self.__compiled__[name] = compiled;

    if (isObject(val)) {
      if (isRegExp(val.validate)) {
        compiled.validate = createValidator(val.validate);
      } else if (isFunction(val.validate)) {
        compiled.validate = val.validate;
      } else {
        schemaError(name, val);
      }

      if (isFunction(val.normalize)) {
        compiled.normalize = val.normalize;
      } else if (!val.normalize) {
        compiled.normalize = createNormalizer();
      } else {
        schemaError(name, val);
      }

      return;
    }

    if (isString(val)) {
      aliases.push(name);
      return;
    }

    schemaError(name, val);
  }); //
  // Compile postponed aliases
  //

  aliases.forEach(function (alias) {
    if (!self.__compiled__[self.__schemas__[alias]]) {
      // Silently fail on missed schemas to avoid errons on disable.
      // schemaError(alias, self.__schemas__[alias]);
      return;
    }

    self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
    self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
  }); //
  // Fake record for guessed links
  //

  self.__compiled__[''] = {
    validate: null,
    normalize: createNormalizer()
  }; //
  // Build schema condition
  //

  var slist = Object.keys(self.__compiled__).filter(function (name) {
    // Filter disabled & fake schemas
    return name.length > 0 && self.__compiled__[name];
  }).map(escapeRE).join('|'); // (?!_) cause 1.5x slowdown

  self.re.schema_test = RegExp('(^|(?!_)(?:[><\uff5c]|' + re$1.src_ZPCc + '))(' + slist + ')', 'i');
  self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re$1.src_ZPCc + '))(' + slist + ')', 'ig');
  self.re.pretest = RegExp('(' + self.re.schema_test.source + ')|(' + self.re.host_fuzzy_test.source + ')|@', 'i'); //
  // Cleanup
  //

  resetScanCache(self);
}
/**
 * class Match
 *
 * Match result. Single element of array, returned by [[LinkifyIt#match]]
 **/


function Match(self, shift) {
  var start = self.__index__,
      end = self.__last_index__,
      text = self.__text_cache__.slice(start, end);
  /**
   * Match#schema -> String
   *
   * Prefix (protocol) for matched string.
   **/


  this.schema = self.__schema__.toLowerCase();
  /**
   * Match#index -> Number
   *
   * First position of matched string.
   **/

  this.index = start + shift;
  /**
   * Match#lastIndex -> Number
   *
   * Next position after matched string.
   **/

  this.lastIndex = end + shift;
  /**
   * Match#raw -> String
   *
   * Matched string.
   **/

  this.raw = text;
  /**
   * Match#text -> String
   *
   * Notmalized text of matched string.
   **/

  this.text = text;
  /**
   * Match#url -> String
   *
   * Normalized url of matched string.
   **/

  this.url = text;
}

function createMatch(self, shift) {
  var match = new Match(self, shift);

  self.__compiled__[match.schema].normalize(match, self);

  return match;
}
/**
 * class LinkifyIt
 **/

/**
 * new LinkifyIt(schemas, options)
 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Creates new linkifier instance with optional additional schemas.
 * Can be called without `new` keyword for convenience.
 *
 * By default understands:
 *
 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
 * - "fuzzy" links and emails (example.com, foo@bar.com).
 *
 * `schemas` is an object, where each key/value describes protocol/rule:
 *
 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
 *   for example). `linkify-it` makes shure that prefix is not preceeded with
 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
 * - __value__ - rule to check tail after link prefix
 *   - _String_ - just alias to existing rule
 *   - _Object_
 *     - _validate_ - validator function (should return matched length on success),
 *       or `RegExp`.
 *     - _normalize_ - optional function to normalize text & url of matched result
 *       (for example, for @twitter mentions).
 *
 * `options`:
 *
 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
 *   like version numbers. Default `false`.
 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
 *
 **/


function LinkifyIt$1(schemas, options) {
  if (!(this instanceof LinkifyIt$1)) {
    return new LinkifyIt$1(schemas, options);
  }

  if (!options) {
    if (isOptionsObj(schemas)) {
      options = schemas;
      schemas = {};
    }
  }

  this.__opts__ = assign({}, defaultOptions, options); // Cache last tested result. Used to skip repeating steps on next `match` call.

  this.__index__ = -1;
  this.__last_index__ = -1; // Next scan position

  this.__schema__ = '';
  this.__text_cache__ = '';
  this.__schemas__ = assign({}, defaultSchemas, schemas);
  this.__compiled__ = {};
  this.__tlds__ = tlds_default;
  this.__tlds_replaced__ = false;
  this.re = {};
  compile(this);
}
/** chainable
 * LinkifyIt#add(schema, definition)
 * - schema (String): rule name (fixed pattern prefix)
 * - definition (String|RegExp|Object): schema definition
 *
 * Add new rule definition. See constructor description for details.
 **/


LinkifyIt$1.prototype.add = function add(schema, definition) {
  this.__schemas__[schema] = definition;
  compile(this);
  return this;
};
/** chainable
 * LinkifyIt#set(options)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Set recognition options for links without schema.
 **/


LinkifyIt$1.prototype.set = function set(options) {
  this.__opts__ = assign(this.__opts__, options);
  return this;
};
/**
 * LinkifyIt#test(text) -> Boolean
 *
 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
 **/


LinkifyIt$1.prototype.test = function test(text) {
  // Reset scan cache
  this.__text_cache__ = text;
  this.__index__ = -1;

  if (!text.length) {
    return false;
  }

  var m, ml, me, len, shift, next, re, tld_pos, at_pos; // try to scan for link with schema - that's the most simple rule

  if (this.re.schema_test.test(text)) {
    re = this.re.schema_search;
    re.lastIndex = 0;

    while ((m = re.exec(text)) !== null) {
      len = this.testSchemaAt(text, m[2], re.lastIndex);

      if (len) {
        this.__schema__ = m[2];
        this.__index__ = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break;
      }
    }
  }

  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
    // guess schemaless links
    tld_pos = text.search(this.re.host_fuzzy_test);

    if (tld_pos >= 0) {
      // if tld is located after found link - no need to check fuzzy pattern
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
          shift = ml.index + ml[1].length;

          if (this.__index__ < 0 || shift < this.__index__) {
            this.__schema__ = '';
            this.__index__ = shift;
            this.__last_index__ = ml.index + ml[0].length;
          }
        }
      }
    }
  }

  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
    // guess schemaless emails
    at_pos = text.indexOf('@');

    if (at_pos >= 0) {
      // We can't skip this check, because this cases are possible:
      // 192.168.1.1@gmail.com, my.in@example.com
      if ((me = text.match(this.re.email_fuzzy)) !== null) {
        shift = me.index + me[1].length;
        next = me.index + me[0].length;

        if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
          this.__schema__ = 'mailto:';
          this.__index__ = shift;
          this.__last_index__ = next;
        }
      }
    }
  }

  return this.__index__ >= 0;
};
/**
 * LinkifyIt#pretest(text) -> Boolean
 *
 * Very quick check, that can give false positives. Returns true if link MAY BE
 * can exists. Can be used for speed optimization, when you need to check that
 * link NOT exists.
 **/


LinkifyIt$1.prototype.pretest = function pretest(text) {
  return this.re.pretest.test(text);
};
/**
 * LinkifyIt#testSchemaAt(text, name, position) -> Number
 * - text (String): text to scan
 * - name (String): rule (schema) name
 * - position (Number): text offset to check from
 *
 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
 * at given position. Returns length of found pattern (0 on fail).
 **/


LinkifyIt$1.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
  // If not supported schema check requested - terminate
  if (!this.__compiled__[schema.toLowerCase()]) {
    return 0;
  }

  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
};
/**
 * LinkifyIt#match(text) -> Array|null
 *
 * Returns array of found link descriptions or `null` on fail. We strongly
 * recommend to use [[LinkifyIt#test]] first, for best speed.
 *
 * ##### Result match description
 *
 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
 *   protocol-neutral  links.
 * - __index__ - offset of matched text
 * - __lastIndex__ - index of next char after mathch end
 * - __raw__ - matched text
 * - __text__ - normalized text
 * - __url__ - link, generated from matched text
 **/


LinkifyIt$1.prototype.match = function match(text) {
  var shift = 0,
      result = []; // Try to take previous element from cache, if .test() called before

  if (this.__index__ >= 0 && this.__text_cache__ === text) {
    result.push(createMatch(this, shift));
    shift = this.__last_index__;
  } // Cut head if cache was used


  var tail = shift ? text.slice(shift) : text; // Scan string until end reached

  while (this.test(tail)) {
    result.push(createMatch(this, shift));
    tail = tail.slice(this.__last_index__);
    shift += this.__last_index__;
  }

  if (result.length) {
    return result;
  }

  return null;
};
/** chainable
 * LinkifyIt#tlds(list [, keepOld]) -> this
 * - list (Array): list of tlds
 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
 *
 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
 * to avoid false positives. By default this algorythm used:
 *
 * - hostname with any 2-letter root zones are ok.
 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
 *   are ok.
 * - encoded (`xn--...`) root zones are ok.
 *
 * If list is replaced, then exact match for 2-chars root zones will be checked.
 **/


LinkifyIt$1.prototype.tlds = function tlds(list, keepOld) {
  list = Array.isArray(list) ? list : [list];

  if (!keepOld) {
    this.__tlds__ = list.slice();
    this.__tlds_replaced__ = true;
    compile(this);
    return this;
  }

  this.__tlds__ = this.__tlds__.concat(list).sort().filter(function (el, idx, arr) {
    return el !== arr[idx - 1];
  }).reverse();
  compile(this);
  return this;
};
/**
 * LinkifyIt#normalize(match)
 *
 * Default normalizer (if schema does not define it's own).
 **/


LinkifyIt$1.prototype.normalize = function normalize(match) {
  // Do minimal possible changes by default. Need to collect feedback prior
  // to move forward https://github.com/markdown-it/linkify-it/issues/1
  if (!match.schema) {
    match.url = 'http://' + match.url;
  }

  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
    match.url = 'mailto:' + match.url;
  }
};
/**
 * LinkifyIt#onCompile()
 *
 * Override to modify basic RegExp-s.
 **/


LinkifyIt$1.prototype.onCompile = function onCompile() {};

var linkifyIt = LinkifyIt$1;

var punycode$1 = {exports: {}};

/*! https://mths.be/punycode v1.4.1 by @mathias */

(function (module, exports) {

  (function (root) {
    /** Detect free variables */
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = module && !module.nodeType && module;
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;

    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
      root = freeGlobal;
    }
    /**
     * The `punycode` object.
     * @name punycode
     * @type Object
     */


    var punycode,

    /** Highest positive signed 32-bit float value */
    maxInt = 2147483647,
        // aka. 0x7FFFFFFF or 2^31-1

    /** Bootstring parameters */
    base = 36,
        tMin = 1,
        tMax = 26,
        skew = 38,
        damp = 700,
        initialBias = 72,
        initialN = 128,
        // 0x80
    delimiter = '-',
        // '\x2D'

    /** Regular expressions */
    regexPunycode = /^xn--/,
        regexNonASCII = /[^\x20-\x7E]/,
        // unprintable ASCII chars + non-ASCII chars
    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
        // RFC 3490 separators

    /** Error messages */
    errors = {
      'overflow': 'Overflow: input needs wider integers to process',
      'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
      'invalid-input': 'Invalid input'
    },

    /** Convenience shortcuts */
    baseMinusTMin = base - tMin,
        floor = Math.floor,
        stringFromCharCode = String.fromCharCode,

    /** Temporary variable */
    key;
    /*--------------------------------------------------------------------------*/

    /**
     * A generic error utility function.
     * @private
     * @param {String} type The error type.
     * @returns {Error} Throws a `RangeError` with the applicable error message.
     */

    function error(type) {
      throw new RangeError(errors[type]);
    }
    /**
     * A generic `Array#map` utility function.
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} callback The function that gets called for every array
     * item.
     * @returns {Array} A new array of values returned by the callback function.
     */


    function map(array, fn) {
      var length = array.length;
      var result = [];

      while (length--) {
        result[length] = fn(array[length]);
      }

      return result;
    }
    /**
     * A simple `Array#map`-like wrapper to work with domain name strings or email
     * addresses.
     * @private
     * @param {String} domain The domain name or email address.
     * @param {Function} callback The function that gets called for every
     * character.
     * @returns {Array} A new string of characters returned by the callback
     * function.
     */


    function mapDomain(string, fn) {
      var parts = string.split('@');
      var result = '';

      if (parts.length > 1) {
        // In email addresses, only the domain name should be punycoded. Leave
        // the local part (i.e. everything up to `@`) intact.
        result = parts[0] + '@';
        string = parts[1];
      } // Avoid `split(regex)` for IE8 compatibility. See #17.


      string = string.replace(regexSeparators, '\x2E');
      var labels = string.split('.');
      var encoded = map(labels, fn).join('.');
      return result + encoded;
    }
    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     * @see `punycode.ucs2.encode`
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode.ucs2
     * @name decode
     * @param {String} string The Unicode input string (UCS-2).
     * @returns {Array} The new array of code points.
     */


    function ucs2decode(string) {
      var output = [],
          counter = 0,
          length = string.length,
          value,
          extra;

      while (counter < length) {
        value = string.charCodeAt(counter++);

        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
          // high surrogate, and there is a next character
          extra = string.charCodeAt(counter++);

          if ((extra & 0xFC00) == 0xDC00) {
            // low surrogate
            output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
          } else {
            // unmatched surrogate; only append this code unit, in case the next
            // code unit is the high surrogate of a surrogate pair
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }

      return output;
    }
    /**
     * Creates a string based on an array of numeric code points.
     * @see `punycode.ucs2.decode`
     * @memberOf punycode.ucs2
     * @name encode
     * @param {Array} codePoints The array of numeric code points.
     * @returns {String} The new Unicode string (UCS-2).
     */


    function ucs2encode(array) {
      return map(array, function (value) {
        var output = '';

        if (value > 0xFFFF) {
          value -= 0x10000;
          output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
          value = 0xDC00 | value & 0x3FF;
        }

        output += stringFromCharCode(value);
        return output;
      }).join('');
    }
    /**
     * Converts a basic code point into a digit/integer.
     * @see `digitToBasic()`
     * @private
     * @param {Number} codePoint The basic numeric code point value.
     * @returns {Number} The numeric value of a basic code point (for use in
     * representing integers) in the range `0` to `base - 1`, or `base` if
     * the code point does not represent a value.
     */


    function basicToDigit(codePoint) {
      if (codePoint - 48 < 10) {
        return codePoint - 22;
      }

      if (codePoint - 65 < 26) {
        return codePoint - 65;
      }

      if (codePoint - 97 < 26) {
        return codePoint - 97;
      }

      return base;
    }
    /**
     * Converts a digit/integer into a basic code point.
     * @see `basicToDigit()`
     * @private
     * @param {Number} digit The numeric value of a basic code point.
     * @returns {Number} The basic code point whose value (when used for
     * representing integers) is `digit`, which needs to be in the range
     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
     * used; else, the lowercase form is used. The behavior is undefined
     * if `flag` is non-zero and `digit` has no uppercase form.
     */


    function digitToBasic(digit, flag) {
      //  0..25 map to ASCII a..z or A..Z
      // 26..35 map to ASCII 0..9
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    }
    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * https://tools.ietf.org/html/rfc3492#section-3.4
     * @private
     */


    function adapt(delta, numPoints, firstTime) {
      var k = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);

      for (; delta > baseMinusTMin * tMax >> 1; k += base) {
        delta = floor(delta / baseMinusTMin);
      }

      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    }
    /**
     * Converts a Punycode string of ASCII-only symbols to a string of Unicode
     * symbols.
     * @memberOf punycode
     * @param {String} input The Punycode string of ASCII-only symbols.
     * @returns {String} The resulting string of Unicode symbols.
     */


    function decode(input) {
      // Don't use UCS-2
      var output = [],
          inputLength = input.length,
          out,
          i = 0,
          n = initialN,
          bias = initialBias,
          basic,
          j,
          index,
          oldi,
          w,
          k,
          digit,
          t,

      /** Cached calculation results */
      baseMinusT; // Handle the basic code points: let `basic` be the number of input code
      // points before the last delimiter, or `0` if there is none, then copy
      // the first basic code points to the output.

      basic = input.lastIndexOf(delimiter);

      if (basic < 0) {
        basic = 0;
      }

      for (j = 0; j < basic; ++j) {
        // if it's not a basic code point
        if (input.charCodeAt(j) >= 0x80) {
          error('not-basic');
        }

        output.push(input.charCodeAt(j));
      } // Main decoding loop: start just after the last delimiter if any basic code
      // points were copied; start at the beginning otherwise.


      for (index = basic > 0 ? basic + 1 : 0; index < inputLength;) {
        // `index` is the index of the next character to be consumed.
        // Decode a generalized variable-length integer into `delta`,
        // which gets added to `i`. The overflow checking is easier
        // if we increase `i` as we go, then subtract off its starting
        // value at the end to obtain `delta`.
        for (oldi = i, w = 1, k = base;; k += base) {
          if (index >= inputLength) {
            error('invalid-input');
          }

          digit = basicToDigit(input.charCodeAt(index++));

          if (digit >= base || digit > floor((maxInt - i) / w)) {
            error('overflow');
          }

          i += digit * w;
          t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

          if (digit < t) {
            break;
          }

          baseMinusT = base - t;

          if (w > floor(maxInt / baseMinusT)) {
            error('overflow');
          }

          w *= baseMinusT;
        }

        out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0); // `i` was supposed to wrap around from `out` to `0`,
        // incrementing `n` each time, so we'll fix that now:

        if (floor(i / out) > maxInt - n) {
          error('overflow');
        }

        n += floor(i / out);
        i %= out; // Insert `n` at position `i` of the output

        output.splice(i++, 0, n);
      }

      return ucs2encode(output);
    }
    /**
     * Converts a string of Unicode symbols (e.g. a domain name label) to a
     * Punycode string of ASCII-only symbols.
     * @memberOf punycode
     * @param {String} input The string of Unicode symbols.
     * @returns {String} The resulting Punycode string of ASCII-only symbols.
     */


    function encode(input) {
      var n,
          delta,
          handledCPCount,
          basicLength,
          bias,
          j,
          m,
          q,
          k,
          t,
          currentValue,
          output = [],

      /** `inputLength` will hold the number of code points in `input`. */
      inputLength,

      /** Cached calculation results */
      handledCPCountPlusOne,
          baseMinusT,
          qMinusT; // Convert the input in UCS-2 to Unicode

      input = ucs2decode(input); // Cache the length

      inputLength = input.length; // Initialize the state

      n = initialN;
      delta = 0;
      bias = initialBias; // Handle the basic code points

      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue < 0x80) {
          output.push(stringFromCharCode(currentValue));
        }
      }

      handledCPCount = basicLength = output.length; // `handledCPCount` is the number of code points that have been handled;
      // `basicLength` is the number of basic code points.
      // Finish the basic string - if it is not empty - with a delimiter

      if (basicLength) {
        output.push(delimiter);
      } // Main encoding loop:


      while (handledCPCount < inputLength) {
        // All non-basic code points < n have been handled already. Find the next
        // larger one:
        for (m = maxInt, j = 0; j < inputLength; ++j) {
          currentValue = input[j];

          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
        // but guard against overflow


        handledCPCountPlusOne = handledCPCount + 1;

        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error('overflow');
        }

        delta += (m - n) * handledCPCountPlusOne;
        n = m;

        for (j = 0; j < inputLength; ++j) {
          currentValue = input[j];

          if (currentValue < n && ++delta > maxInt) {
            error('overflow');
          }

          if (currentValue == n) {
            // Represent delta as a generalized variable-length integer
            for (q = delta, k = base;; k += base) {
              t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

              if (q < t) {
                break;
              }

              qMinusT = q - t;
              baseMinusT = base - t;
              output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
              q = floor(qMinusT / baseMinusT);
            }

            output.push(stringFromCharCode(digitToBasic(q, 0)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }

        ++delta;
        ++n;
      }

      return output.join('');
    }
    /**
     * Converts a Punycode string representing a domain name or an email address
     * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
     * it doesn't matter if you call it on a string that has already been
     * converted to Unicode.
     * @memberOf punycode
     * @param {String} input The Punycoded domain name or email address to
     * convert to Unicode.
     * @returns {String} The Unicode representation of the given Punycode
     * string.
     */


    function toUnicode(input) {
      return mapDomain(input, function (string) {
        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
      });
    }
    /**
     * Converts a Unicode string representing a domain name or an email address to
     * Punycode. Only the non-ASCII parts of the domain name will be converted,
     * i.e. it doesn't matter if you call it with a domain that's already in
     * ASCII.
     * @memberOf punycode
     * @param {String} input The domain name or email address to convert, as a
     * Unicode string.
     * @returns {String} The Punycode representation of the given domain name or
     * email address.
     */


    function toASCII(input) {
      return mapDomain(input, function (string) {
        return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
      });
    }
    /*--------------------------------------------------------------------------*/

    /** Define the public API */


    punycode = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      'version': '1.4.1',

      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      'ucs2': {
        'decode': ucs2decode,
        'encode': ucs2encode
      },
      'decode': decode,
      'encode': encode,
      'toASCII': toASCII,
      'toUnicode': toUnicode
    };
    /** Expose `punycode` */
    // Some AMD build optimizers, like r.js, check for specific condition patterns
    // like the following:

    if (freeExports && freeModule) {
      if (module.exports == freeExports) {
        // in Node.js, io.js, or RingoJS v0.8.0+
        freeModule.exports = punycode;
      } else {
        // in Narwhal or RingoJS v0.7.0-
        for (key in punycode) {
          punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
        }
      }
    } else {
      // in Rhino or a web browser
      root.punycode = punycode;
    }
  })(commonjsGlobal);
})(punycode$1, punycode$1.exports);

var _default = {
  options: {
    html: false,
    // Enable HTML tags in source
    xhtmlOut: false,
    // Use '/' to close single tags (<br />)
    breaks: false,
    // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',
    // CSS language prefix for fenced blocks
    linkify: false,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019',

    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 100 // Internal protection, recursion limit

  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
};

var zero$1 = {
  options: {
    html: false,
    // Enable HTML tags in source
    xhtmlOut: false,
    // Use '/' to close single tags (<br />)
    breaks: false,
    // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',
    // CSS language prefix for fenced blocks
    linkify: false,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019',

    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20 // Internal protection, recursion limit

  },
  components: {
    core: {
      rules: ['normalize', 'block', 'inline']
    },
    block: {
      rules: ['paragraph']
    },
    inline: {
      rules: ['text'],
      rules2: ['balance_pairs', 'text_collapse']
    }
  }
};

var commonmark = {
  options: {
    html: true,
    // Enable HTML tags in source
    xhtmlOut: true,
    // Use '/' to close single tags (<br />)
    breaks: false,
    // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',
    // CSS language prefix for fenced blocks
    linkify: false,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019',

    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20 // Internal protection, recursion limit

  },
  components: {
    core: {
      rules: ['normalize', 'block', 'inline']
    },
    block: {
      rules: ['blockquote', 'code', 'fence', 'heading', 'hr', 'html_block', 'lheading', 'list', 'reference', 'paragraph']
    },
    inline: {
      rules: ['autolink', 'backticks', 'emphasis', 'entity', 'escape', 'html_inline', 'image', 'link', 'newline', 'text'],
      rules2: ['balance_pairs', 'emphasis', 'text_collapse']
    }
  }
};

var utils = utils$1;
var helpers = helpers$1;
var Renderer = renderer;
var ParserCore = parser_core;
var ParserBlock = parser_block;
var ParserInline = parser_inline;
var LinkifyIt = linkifyIt;
var mdurl = mdurl$1;
var punycode = punycode$1.exports;
var config = {
  'default': _default,
  zero: zero$1,
  commonmark: commonmark
}; ////////////////////////////////////////////////////////////////////////////////
//
// This validator can prohibit more than really needed to prevent XSS. It's a
// tradeoff to keep code simple and to be secure by default.
//
// If you need different setup - override validator method as you wish. Or
// replace it with dummy function and use external sanitizer.
//

var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

function validateLink(url) {
  // url should be normalized at this point, and existing entities are decoded
  var str = url.trim().toLowerCase();
  return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) ? true : false : true;
} ////////////////////////////////////////////////////////////////////////////////


var RECODE_HOSTNAME_FOR = ['http:', 'https:', 'mailto:'];

function normalizeLink(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toASCII(parsed.hostname);
      } catch (er) {
        /**/
      }
    }
  }

  return mdurl.encode(mdurl.format(parsed));
}

function normalizeLinkText(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toUnicode(parsed.hostname);
      } catch (er) {
        /**/
      }
    }
  }

  return mdurl.decode(mdurl.format(parsed));
}
/**
 * class MarkdownIt
 *
 * Main parser/renderer class.
 *
 * ##### Usage
 *
 * ```javascript
 * // node.js, "classic" way:
 * var MarkdownIt = require('markdown-it'),
 *     md = new MarkdownIt();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // node.js, the same, but with sugar:
 * var md = require('markdown-it')();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // browser without AMD, added to "window" on script load
 * // Note, there are no dash.
 * var md = window.markdownit();
 * var result = md.render('# markdown-it rulezz!');
 * ```
 *
 * Single line rendering, without paragraph wrap:
 *
 * ```javascript
 * var md = require('markdown-it')();
 * var result = md.renderInline('__markdown-it__ rulezz!');
 * ```
 **/

/**
 * new MarkdownIt([presetName, options])
 * - presetName (String): optional, `commonmark` / `zero`
 * - options (Object)
 *
 * Creates parser instanse with given config. Can be called without `new`.
 *
 * ##### presetName
 *
 * MarkdownIt provides named presets as a convenience to quickly
 * enable/disable active syntax rules and options for common use cases.
 *
 * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js) -
 *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
 * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.js) -
 *   similar to GFM, used when no preset name given. Enables all available rules,
 *   but still without html, typographer & autolinker.
 * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.js) -
 *   all rules disabled. Useful to quickly setup your config via `.enable()`.
 *   For example, when you need only `bold` and `italic` markup and nothing else.
 *
 * ##### options:
 *
 * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
 *   That's not safe! You may need external sanitizer to protect output from XSS.
 *   It's better to extend features via plugins, instead of enabling HTML.
 * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
 *   (`<br />`). This is needed only for full CommonMark compatibility. In real
 *   world you will need HTML output.
 * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
 * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
 *   Can be useful for external highlighters.
 * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
 * - __typographer__  - `false`. Set `true` to enable [some language-neutral
 *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js) +
 *   quotes beautification (smartquotes).
 * - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
 *   pairs, when typographer enabled and smartquotes on. For example, you can
 *   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
 *   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
 * - __highlight__ - `null`. Highlighter function for fenced code blocks.
 *   Highlighter `function (str, lang)` should return escaped HTML. It can also
 *   return empty string if the source was not changed and should be escaped
 *   externaly. If result starts with <pre... internal wrapper is skipped.
 *
 * ##### Example
 *
 * ```javascript
 * // commonmark mode
 * var md = require('markdown-it')('commonmark');
 *
 * // default mode
 * var md = require('markdown-it')();
 *
 * // enable everything
 * var md = require('markdown-it')({
 *   html: true,
 *   linkify: true,
 *   typographer: true
 * });
 * ```
 *
 * ##### Syntax highlighting
 *
 * ```js
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return hljs.highlight(lang, str, true).value;
 *       } catch (__) {}
 *     }
 *
 *     return ''; // use external default escaping
 *   }
 * });
 * ```
 *
 * Or with full wrapper override (if you need assign class to `<pre>`):
 *
 * ```javascript
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * // Actual default values
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return '<pre class="hljs"><code>' +
 *                hljs.highlight(lang, str, true).value +
 *                '</code></pre>';
 *       } catch (__) {}
 *     }
 *
 *     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
 *   }
 * });
 * ```
 *
 **/


function MarkdownIt(presetName, options) {
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options);
  }

  if (!options) {
    if (!utils.isString(presetName)) {
      options = presetName || {};
      presetName = 'default';
    }
  }
  /**
   * MarkdownIt#inline -> ParserInline
   *
   * Instance of [[ParserInline]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/


  this.inline = new ParserInline();
  /**
   * MarkdownIt#block -> ParserBlock
   *
   * Instance of [[ParserBlock]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/

  this.block = new ParserBlock();
  /**
   * MarkdownIt#core -> Core
   *
   * Instance of [[Core]] chain executor. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/

  this.core = new ParserCore();
  /**
   * MarkdownIt#renderer -> Renderer
   *
   * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
   * rules for new token types, generated by plugins.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * function myToken(tokens, idx, options, env, self) {
   *   //...
   *   return result;
   * };
   *
   * md.renderer.rules['my_token'] = myToken
   * ```
   *
   * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js).
   **/

  this.renderer = new Renderer();
  /**
   * MarkdownIt#linkify -> LinkifyIt
   *
   * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
   * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.js)
   * rule.
   **/

  this.linkify = new LinkifyIt();
  /**
   * MarkdownIt#validateLink(url) -> Boolean
   *
   * Link validation function. CommonMark allows too much in links. By default
   * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
   * except some embedded image types.
   *
   * You can change this behaviour:
   *
   * ```javascript
   * var md = require('markdown-it')();
   * // enable everything
   * md.validateLink = function () { return true; }
   * ```
   **/

  this.validateLink = validateLink;
  /**
   * MarkdownIt#normalizeLink(url) -> String
   *
   * Function used to encode link url to a machine-readable format,
   * which includes url-encoding, punycode, etc.
   **/

  this.normalizeLink = normalizeLink;
  /**
   * MarkdownIt#normalizeLinkText(url) -> String
   *
   * Function used to decode link url to a human-readable format`
   **/

  this.normalizeLinkText = normalizeLinkText; // Expose utils & helpers for easy acces from plugins

  /**
   * MarkdownIt#utils -> utils
   *
   * Assorted utility functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.js).
   **/

  this.utils = utils;
  /**
   * MarkdownIt#helpers -> helpers
   *
   * Link components parser functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
   **/

  this.helpers = utils.assign({}, helpers);
  this.options = {};
  this.configure(presetName);

  if (options) {
    this.set(options);
  }
}
/** chainable
 * MarkdownIt.set(options)
 *
 * Set parser options (in the same format as in constructor). Probably, you
 * will never need it, but you can change options after constructor call.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .set({ html: true, breaks: true })
 *             .set({ typographer, true });
 * ```
 *
 * __Note:__ To achieve the best possible performance, don't modify a
 * `markdown-it` instance options on the fly. If you need multiple configurations
 * it's best to create multiple instances and initialize each with separate
 * config.
 **/


MarkdownIt.prototype.set = function (options) {
  utils.assign(this.options, options);
  return this;
};
/** chainable, internal
 * MarkdownIt.configure(presets)
 *
 * Batch load of all options and compenent settings. This is internal method,
 * and you probably will not need it. But if you will - see available presets
 * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
 *
 * We strongly recommend to use presets instead of direct config loads. That
 * will give better compatibility with next versions.
 **/


MarkdownIt.prototype.configure = function (presets) {
  var self = this,
      presetName;

  if (utils.isString(presets)) {
    presetName = presets;
    presets = config[presetName];

    if (!presets) {
      throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
    }
  }

  if (!presets) {
    throw new Error('Wrong `markdown-it` preset, can\'t be empty');
  }

  if (presets.options) {
    self.set(presets.options);
  }

  if (presets.components) {
    Object.keys(presets.components).forEach(function (name) {
      if (presets.components[name].rules) {
        self[name].ruler.enableOnly(presets.components[name].rules);
      }

      if (presets.components[name].rules2) {
        self[name].ruler2.enableOnly(presets.components[name].rules2);
      }
    });
  }

  return this;
};
/** chainable
 * MarkdownIt.enable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to enable
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable list or rules. It will automatically find appropriate components,
 * containing rules with given names. If rule not found, and `ignoreInvalid`
 * not set - throws exception.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .enable(['sub', 'sup'])
 *             .disable('smartquotes');
 * ```
 **/


MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) {
    list = [list];
  }

  ['core', 'block', 'inline'].forEach(function (chain) {
    result = result.concat(this[chain].ruler.enable(list, true));
  }, this);
  result = result.concat(this.inline.ruler2.enable(list, true));
  var missed = list.filter(function (name) {
    return result.indexOf(name) < 0;
  });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed);
  }

  return this;
};
/** chainable
 * MarkdownIt.disable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * The same as [[MarkdownIt.enable]], but turn specified rules off.
 **/


MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) {
    list = [list];
  }

  ['core', 'block', 'inline'].forEach(function (chain) {
    result = result.concat(this[chain].ruler.disable(list, true));
  }, this);
  result = result.concat(this.inline.ruler2.disable(list, true));
  var missed = list.filter(function (name) {
    return result.indexOf(name) < 0;
  });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed);
  }

  return this;
};
/** chainable
 * MarkdownIt.use(plugin, params)
 *
 * Load specified plugin with given params into current parser instance.
 * It's just a sugar to call `plugin(md, params)` with curring.
 *
 * ##### Example
 *
 * ```javascript
 * var iterator = require('markdown-it-for-inline');
 * var md = require('markdown-it')()
 *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
 *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
 *             });
 * ```
 **/


MarkdownIt.prototype.use = function (plugin
/*, params, ... */
) {
  var args = [this].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this;
};
/** internal
 * MarkdownIt.parse(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Parse input string and return list of block tokens (special token type
 * "inline" will contain list of inline tokens). You should not call this
 * method directly, until you write custom renderer (for example, to produce
 * AST).
 *
 * `env` is used to pass data between "distributed" rules and return additional
 * metadata like reference info, needed for the renderer. It also can be used to
 * inject data in specific cases. Usually, you will be ok to pass `{}`,
 * and then pass updated object to renderer.
 **/


MarkdownIt.prototype.parse = function (src, env) {
  if (typeof src !== 'string') {
    throw new Error('Input data should be a String');
  }

  var state = new this.core.State(src, this, env);
  this.core.process(state);
  return state.tokens;
};
/**
 * MarkdownIt.render(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Render markdown string into html. It does all magic for you :).
 *
 * `env` can be used to inject additional metadata (`{}` by default).
 * But you will not need it with high probability. See also comment
 * in [[MarkdownIt.parse]].
 **/


MarkdownIt.prototype.render = function (src, env) {
  env = env || {};
  return this.renderer.render(this.parse(src, env), this.options, env);
};
/** internal
 * MarkdownIt.parseInline(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
 * block tokens list with the single `inline` element, containing parsed inline
 * tokens in `children` property. Also updates `env` object.
 **/


MarkdownIt.prototype.parseInline = function (src, env) {
  var state = new this.core.State(src, this, env);
  state.inlineMode = true;
  this.core.process(state);
  return state.tokens;
};
/**
 * MarkdownIt.renderInline(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Similar to [[MarkdownIt.render]] but for single paragraph content. Result
 * will NOT be wrapped into `<p>` tags.
 **/


MarkdownIt.prototype.renderInline = function (src, env) {
  env = env || {};
  return this.renderer.render(this.parseInline(src, env), this.options, env);
};

var lib$1 = MarkdownIt;

var markdownIt = lib$1;

function highlightRender(code, lang) {
  if (!lang || /no(-?)highlight|plain|text/.test(lang)) {
    return;
  }

  function parseFenceCodeParams(lang) {
    var attrMatch = lang.match(/{(.*)}/);
    var params = {};

    if (attrMatch && attrMatch.length >= 2) {
      var attrs = attrMatch[1];
      var paraMatch = attrs.match(/([#.](\S+?)\s)|((\S+?)\s*=\s*("(.+?)"|'(.+?)'|\[[^\]]*\]|\{[}]*\}|(\S+)))/g);
      paraMatch && paraMatch.forEach(function (param) {
        param = param.trim();

        if (param[0] === '#') {
          params['id'] = param.slice(1);
        } else if (param[0] === '.') {
          if (params['class']) params['class'] = [];
          params['class'] = params['class'].concat(param.slice(1));
        } else {
          var offset = param.indexOf('=');
          var id = param.substring(0, offset).trim().toLowerCase();
          var val = param.substring(offset + 1).trim();
          var valStart = val[0];
          var valEnd = val[val.length - 1];

          if (['"', "'"].indexOf(valStart) !== -1 && ['"', "'"].indexOf(valEnd) !== -1 && valStart === valEnd) {
            val = val.substring(1, val.length - 1);
          }

          if (id === 'class') {
            if (params['class']) params['class'] = [];
            params['class'] = params['class'].concat(val);
          } else {
            params[id] = val;
          }
        }
      });
    }

    return params;
  }

  function serializeParamToAttribute(params) {
    if (Object.getOwnPropertyNames(params).length === 0) {
      return '';
    } else {
      return " data-params=\"".concat(escape(JSON.stringify(params)), "\"");
    }
  }

  var fenceCodeAlias = {
    sequence: 'sequence-diagram',
    flow: 'flow-chart',
    graphviz: 'graphviz',
    mermaid: 'mermaid',
    abc: 'abc',
    vega: 'vega',
    geo: 'geo'
  };
  var params = parseFenceCodeParams(lang);
  var attr = serializeParamToAttribute(params);
  lang = lang.split(/\s+/g)[0];
  code = lodash_escape(code);
  var langAlias = fenceCodeAlias[lang];

  if (langAlias) {
    return "<div class=\"".concat(langAlias, " raw\"").concat(attr, ">").concat(code, "</div>");
  }

  var result = {
    value: code
  };
  var showlinenumbers = /=$|=\d+$|=\+$/.test(lang);

  if (showlinenumbers) {
    var startnumber = 1;
    var matches = lang.match(/=(\d+)$/);

    if (matches) {
      startnumber = parseInt(matches[1]);
    }

    var lines = result.value.split('\n');
    var linenumbers = [];

    for (var i = 0; i < lines.length - 1; i++) {
      linenumbers[i] = "<span data-linenumber='".concat(startnumber + i, "'></span>");
    }

    var continuelinenumber = /=\+$/.test(lang);
    var linegutter = "<div class='gutter linenumber".concat(continuelinenumber ? ' continue' : '', "'>").concat(linenumbers.join('\n'), "</div>");
    result.value = "<div class='wrapper'>".concat(linegutter, "<div class='code'>").concat(result.value, "</div></div>");
  }

  return result.value;
}

var md = markdownIt({
  html: true,
  // Enable HTML tags in source
  xhtmlOut: true,
  // Use '/' to close single tags (<br />).
  breaks: true,
  // Convert '\n' in paragraphs into <br>
  langPrefix: '',
  // CSS language prefix for fenced blocks. Can be
  linkify: false,
  // 自动识别url
  typographer: true,
  quotes: '“”‘’',
  highlight: highlightRender
}); // pdf

var pdfPlugin = new markdownItRegexp( // regexp to match
/{%pdf\s*([\d\D]*?)\s*%}/, // match, utils
function (match) {
  var pdfurl = match[1];
  if (!isURL(pdfurl)) return match[0];
  var div = $('<div class="pdf raw"></div>');
  div.attr('data-pdfurl', pdfurl);
  return div[0].outerHTML;
});
md.use(pdfPlugin); // regex for extra tags

var spaceregex = /\s*/;
var notinhtmltagregex = /(?![^<]*>|[^<>]*<\/)/;
var coloregex = /\[color=([#|(|)|\s|,|\w]*?)\]/;
coloregex = new RegExp(coloregex.source + notinhtmltagregex.source, 'g');
var nameregex = /\[name=(.*?)\]/;
var timeregex = /\[time=([:|,|+|-|(|)|\s|\w]*?)\]/;
new RegExp(nameregex.source + spaceregex.source + timeregex.source + notinhtmltagregex.source, 'g');
nameregex = new RegExp(nameregex.source + notinhtmltagregex.source, 'g');
timeregex = new RegExp(timeregex.source + notinhtmltagregex.source, 'g');

var markdownItContainer = function container_plugin(md, name, options) {
  // Second param may be useful if you decide
  // to increase minimal allowed marker length
  function validateDefault(params
  /*, markup*/
  ) {
    return params.trim().split(' ', 2)[0] === name;
  }

  function renderDefault(tokens, idx, _options, env, slf) {
    // add a class to the opening tag
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrJoin('class', name);
    }

    return slf.renderToken(tokens, idx, _options, env, slf);
  }

  options = options || {};
  var min_markers = 3,
      marker_str = options.marker || ':',
      marker_char = marker_str.charCodeAt(0),
      marker_len = marker_str.length,
      validate = options.validate || validateDefault,
      render = options.render || renderDefault;

  function container(state, startLine, endLine, silent) {
    var pos,
        nextLine,
        marker_count,
        markup,
        params,
        token,
        old_parent,
        old_line_max,
        auto_closed = false,
        start = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine]; // Check out the first character quickly,
    // this should filter out most of non-containers
    //

    if (marker_char !== state.src.charCodeAt(start)) {
      return false;
    } // Check out the rest of the marker string
    //


    for (pos = start + 1; pos <= max; pos++) {
      if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
        break;
      }
    }

    marker_count = Math.floor((pos - start) / marker_len);

    if (marker_count < min_markers) {
      return false;
    }

    pos -= (pos - start) % marker_len;
    markup = state.src.slice(start, pos);
    params = state.src.slice(pos, max);

    if (!validate(params, markup)) {
      return false;
    } // Since start is found, we can report success here in validation mode
    //


    if (silent) {
      return true;
    } // Search for the end of the block
    //


    nextLine = startLine;

    for (;;) {
      nextLine++;

      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;
      }

      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;
      }

      if (marker_char !== state.src.charCodeAt(start)) {
        continue;
      }

      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue;
      }

      for (pos = start + 1; pos <= max; pos++) {
        if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
          break;
        }
      } // closing code fence must be at least as long as the opening one


      if (Math.floor((pos - start) / marker_len) < marker_count) {
        continue;
      } // make sure tail has spaces only


      pos -= (pos - start) % marker_len;
      pos = state.skipSpaces(pos);

      if (pos < max) {
        continue;
      } // found!


      auto_closed = true;
      break;
    }

    old_parent = state.parentType;
    old_line_max = state.lineMax;
    state.parentType = 'container'; // this will prevent lazy continuations from ever going past our end marker

    state.lineMax = nextLine;
    token = state.push('container_' + name + '_open', 'div', 1);
    token.markup = markup;
    token.block = true;
    token.info = params;
    token.map = [startLine, nextLine];
    state.md.block.tokenize(state, startLine + 1, nextLine);
    token = state.push('container_' + name + '_close', 'div', -1);
    token.markup = state.src.slice(start, pos);
    token.block = true;
    state.parentType = old_parent;
    state.lineMax = old_line_max;
    state.line = nextLine + (auto_closed ? 1 : 0);
    return true;
  }

  md.block.ruler.before('fence', 'container_' + name, container, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  });
  md.renderer.rules['container_' + name + '_open'] = render;
  md.renderer.rules['container_' + name + '_close'] = render;
};

// https://github.com/hackmdio/codimd/blob/f0fbd09fa0a37672ced98576612d6eb472a51e31/public/js/lib/syncscroll.js

function injectLineNumber(md) {
  function addPart(tokens, idx) {
    if (tokens[idx].map && tokens[idx].level === 0) {
      var startline = tokens[idx].map[0] + 1;
      var endline = tokens[idx].map[1];
      tokens[idx].attrJoin('class', 'part');
      tokens[idx].attrJoin('data-startline', startline);
      tokens[idx].attrJoin('data-endline', endline);
    }
  }

  md.renderer.rules.blockquote_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrJoin('class', 'raw');
    addPart(tokens, idx);
    return self.renderToken.apply(self, arguments);
  };

  md.renderer.rules.table_open = function (tokens, idx, options, env, self) {
    addPart(tokens, idx);
    return self.renderToken.apply(self, arguments);
  };

  md.renderer.rules.bullet_list_open = function (tokens, idx, options, env, self) {
    addPart(tokens, idx);
    return self.renderToken.apply(self, arguments);
  };

  md.renderer.rules.list_item_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrJoin('class', 'raw');

    if (tokens[idx].map) {
      var startline = tokens[idx].map[0] + 1;
      var endline = tokens[idx].map[1];
      tokens[idx].attrJoin('data-startline', startline);
      tokens[idx].attrJoin('data-endline', endline);
    }

    return self.renderToken.apply(self, arguments);
  };

  md.renderer.rules.ordered_list_open = function (tokens, idx, options, env, self) {
    addPart(tokens, idx);
    return self.renderToken.apply(self, arguments);
  };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    addPart(tokens, idx);
    return self.renderToken.apply(self, arguments);
  };

  md.renderer.rules.paragraph_open = function (tokens, idx, options, env, self) {
    addPart(tokens, idx);
    return self.renderToken.apply(self, arguments);
  };

  md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrJoin('class', 'raw');
    addPart(tokens, idx);
    return self.renderToken.apply(self, arguments);
  };

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    var token = tokens[idx];
    var info = token.info ? md.utils.unescapeAll(token.info).trim() : '';
    var langName = '';
    var highlighted;

    if (info) {
      langName = info.split(/\s+/g)[0];
      if (/!$/.test(info)) token.attrJoin('class', 'wrap');
      token.attrJoin('class', options.langPrefix + langName.replace(/=$|=\d+$|=\+$|!$|=!/, ''));
      token.attrJoin('class', 'hljs');
      token.attrJoin('class', 'raw');
    }

    if (options.highlight) {
      highlighted = options.highlight(token.content, info) || md.utils.escapeHtml(token.content);
    } else {
      highlighted = md.utils.escapeHtml(token.content);
    }

    if (highlighted.indexOf('<pre') === 0) {
      return "".concat(highlighted, "\n");
    }

    if (tokens[idx].map && tokens[idx].level === 0) {
      var startline = tokens[idx].map[0] + 1;
      var endline = tokens[idx].map[1];
      return "<pre class=\"part\" data-startline=\"".concat(startline, "\" data-endline=\"").concat(endline, "\"><code").concat(self.renderAttrs(token), ">").concat(highlighted, "</code></pre>\n");
    }

    return "<pre><code".concat(self.renderAttrs(token), ">").concat(highlighted, "</code></pre>\n");
  };

  md.renderer.rules.code_block = function (tokens, idx, options, env, self) {
    if (tokens[idx].map && tokens[idx].level === 0) {
      var startline = tokens[idx].map[0] + 1;
      var endline = tokens[idx].map[1];
      return "<pre class=\"part\" data-startline=\"".concat(startline, "\" data-endline=\"").concat(endline, "\"><code>").concat(md.utils.escapeHtml(tokens[idx].content), "</code></pre>\n");
    }

    return "<pre><code>".concat(md.utils.escapeHtml(tokens[idx].content), "</code></pre>\n");
  };

  function renderContainer(tokens, idx, options, env, self) {
    tokens[idx].attrJoin('role', 'alert');
    tokens[idx].attrJoin('class', 'alert');
    tokens[idx].attrJoin('class', "alert-".concat(tokens[idx].info.trim()));
    addPart(tokens, idx);
    return self.renderToken.apply(self, arguments);
  }

  md.use(markdownItContainer, 'success', {
    render: renderContainer
  });
  md.use(markdownItContainer, 'info', {
    render: renderContainer
  });
  md.use(markdownItContainer, 'warning', {
    render: renderContainer
  });
  md.use(markdownItContainer, 'danger', {
    render: renderContainer
  });
  md.use(markdownItContainer, 'spoiler', {
    validate: function validate(params) {
      return params.trim().match(/^spoiler(\s+.*)?$/);
    },
    render: function render(tokens, idx) {
      var m = tokens[idx].info.trim().match(/^spoiler(\s+.*)?$/);

      if (tokens[idx].nesting === 1) {
        // opening tag
        var startline = tokens[idx].map[0] + 1;
        var endline = tokens[idx].map[1];
        var partClass = "class=\"part raw\" data-startline=\"".concat(startline, "\" data-endline=\"").concat(endline, "\"");
        var summary = m[1] && m[1].trim();

        if (summary) {
          return "<details ".concat(partClass, "><summary>").concat(md.renderInline(summary), "</summary>\n");
        } else {
          return "<details ".concat(partClass, ">\n");
        }
      } else {
        // closing tag
        return '</details>\n';
      }
    }
  });
}

var grinning = "😀";
var smiley = "😃";
var smile = "😄";
var grin = "😁";
var laughing = "😆";
var satisfied = "😆";
var sweat_smile = "😅";
var joy = "😂";
var rofl = "🤣";
var relaxed = "☺️";
var blush = "😊";
var innocent = "😇";
var slightly_smiling_face = "🙂";
var upside_down_face = "🙃";
var wink = "😉";
var relieved = "😌";
var heart_eyes = "😍";
var kissing_heart = "😘";
var kissing = "😗";
var kissing_smiling_eyes = "😙";
var kissing_closed_eyes = "😚";
var yum = "😋";
var stuck_out_tongue_winking_eye = "😜";
var stuck_out_tongue_closed_eyes = "😝";
var stuck_out_tongue = "😛";
var money_mouth_face = "🤑";
var hugs = "🤗";
var nerd_face = "🤓";
var sunglasses = "😎";
var clown_face = "🤡";
var cowboy_hat_face = "🤠";
var smirk = "😏";
var unamused = "😒";
var disappointed = "😞";
var pensive = "😔";
var worried = "😟";
var confused = "😕";
var slightly_frowning_face = "🙁";
var frowning_face = "☹️";
var persevere = "😣";
var confounded = "😖";
var tired_face = "😫";
var weary = "😩";
var triumph = "😤";
var angry = "😠";
var rage = "😡";
var pout = "😡";
var no_mouth = "😶";
var neutral_face = "😐";
var expressionless = "😑";
var hushed = "😯";
var frowning = "😦";
var anguished = "😧";
var open_mouth = "😮";
var astonished = "😲";
var dizzy_face = "😵";
var flushed = "😳";
var scream = "😱";
var fearful = "😨";
var cold_sweat = "😰";
var cry = "😢";
var disappointed_relieved = "😥";
var drooling_face = "🤤";
var sob = "😭";
var sweat = "😓";
var sleepy = "😪";
var sleeping = "😴";
var roll_eyes = "🙄";
var thinking = "🤔";
var lying_face = "🤥";
var grimacing = "😬";
var zipper_mouth_face = "🤐";
var nauseated_face = "🤢";
var sneezing_face = "🤧";
var mask = "😷";
var face_with_thermometer = "🤒";
var face_with_head_bandage = "🤕";
var smiling_imp = "😈";
var imp = "👿";
var japanese_ogre = "👹";
var japanese_goblin = "👺";
var hankey = "💩";
var poop = "💩";
var shit = "💩";
var ghost = "👻";
var skull = "💀";
var skull_and_crossbones = "☠️";
var alien = "👽";
var space_invader = "👾";
var robot = "🤖";
var jack_o_lantern = "🎃";
var smiley_cat = "😺";
var smile_cat = "😸";
var joy_cat = "😹";
var heart_eyes_cat = "😻";
var smirk_cat = "😼";
var kissing_cat = "😽";
var scream_cat = "🙀";
var crying_cat_face = "😿";
var pouting_cat = "😾";
var open_hands = "👐";
var raised_hands = "🙌";
var clap = "👏";
var pray = "🙏";
var handshake = "🤝";
var thumbsup = "👍";
var thumbsdown = "👎";
var fist_oncoming = "👊";
var facepunch = "👊";
var punch = "👊";
var fist_raised = "✊";
var fist = "✊";
var fist_left = "🤛";
var fist_right = "🤜";
var crossed_fingers = "🤞";
var v = "✌️";
var metal = "🤘";
var ok_hand = "👌";
var point_left = "👈";
var point_right = "👉";
var point_up_2 = "👆";
var point_down = "👇";
var point_up = "☝️";
var hand = "✋";
var raised_hand = "✋";
var raised_back_of_hand = "🤚";
var raised_hand_with_fingers_splayed = "🖐";
var vulcan_salute = "🖖";
var wave = "👋";
var call_me_hand = "🤙";
var muscle = "💪";
var middle_finger = "🖕";
var fu = "🖕";
var writing_hand = "✍️";
var selfie = "🤳";
var nail_care = "💅";
var ring = "💍";
var lipstick = "💄";
var kiss = "💋";
var lips = "👄";
var tongue = "👅";
var ear = "👂";
var nose = "👃";
var footprints = "👣";
var eye = "👁";
var eyes = "👀";
var speaking_head = "🗣";
var bust_in_silhouette = "👤";
var busts_in_silhouette = "👥";
var baby = "👶";
var boy = "👦";
var girl = "👧";
var man = "👨";
var woman = "👩";
var blonde_woman = "👱‍♀";
var blonde_man = "👱";
var person_with_blond_hair = "👱";
var older_man = "👴";
var older_woman = "👵";
var man_with_gua_pi_mao = "👲";
var woman_with_turban = "👳‍♀";
var man_with_turban = "👳";
var policewoman = "👮‍♀";
var policeman = "👮";
var cop = "👮";
var construction_worker_woman = "👷‍♀";
var construction_worker_man = "👷";
var construction_worker = "👷";
var guardswoman = "💂‍♀";
var guardsman = "💂";
var female_detective = "🕵️‍♀️";
var male_detective = "🕵";
var detective = "🕵";
var woman_health_worker = "👩‍⚕";
var man_health_worker = "👨‍⚕";
var woman_farmer = "👩‍🌾";
var man_farmer = "👨‍🌾";
var woman_cook = "👩‍🍳";
var man_cook = "👨‍🍳";
var woman_student = "👩‍🎓";
var man_student = "👨‍🎓";
var woman_singer = "👩‍🎤";
var man_singer = "👨‍🎤";
var woman_teacher = "👩‍🏫";
var man_teacher = "👨‍🏫";
var woman_factory_worker = "👩‍🏭";
var man_factory_worker = "👨‍🏭";
var woman_technologist = "👩‍💻";
var man_technologist = "👨‍💻";
var woman_office_worker = "👩‍💼";
var man_office_worker = "👨‍💼";
var woman_mechanic = "👩‍🔧";
var man_mechanic = "👨‍🔧";
var woman_scientist = "👩‍🔬";
var man_scientist = "👨‍🔬";
var woman_artist = "👩‍🎨";
var man_artist = "👨‍🎨";
var woman_firefighter = "👩‍🚒";
var man_firefighter = "👨‍🚒";
var woman_pilot = "👩‍✈";
var man_pilot = "👨‍✈";
var woman_astronaut = "👩‍🚀";
var man_astronaut = "👨‍🚀";
var woman_judge = "👩‍⚖";
var man_judge = "👨‍⚖";
var mrs_claus = "🤶";
var santa = "🎅";
var princess = "👸";
var prince = "🤴";
var bride_with_veil = "👰";
var man_in_tuxedo = "🤵";
var angel = "👼";
var pregnant_woman = "🤰";
var bowing_woman = "🙇‍♀";
var bowing_man = "🙇";
var bow = "🙇";
var tipping_hand_woman = "💁";
var information_desk_person = "💁";
var sassy_woman = "💁";
var tipping_hand_man = "💁‍♂";
var sassy_man = "💁‍♂";
var no_good_woman = "🙅";
var no_good = "🙅";
var ng_woman = "🙅";
var no_good_man = "🙅‍♂";
var ng_man = "🙅‍♂";
var ok_woman = "🙆";
var ok_man = "🙆‍♂";
var raising_hand_woman = "🙋";
var raising_hand = "🙋";
var raising_hand_man = "🙋‍♂";
var woman_facepalming = "🤦‍♀";
var man_facepalming = "🤦‍♂";
var woman_shrugging = "🤷‍♀";
var man_shrugging = "🤷‍♂";
var pouting_woman = "🙎";
var person_with_pouting_face = "🙎";
var pouting_man = "🙎‍♂";
var frowning_woman = "🙍";
var person_frowning = "🙍";
var frowning_man = "🙍‍♂";
var haircut_woman = "💇";
var haircut = "💇";
var haircut_man = "💇‍♂";
var massage_woman = "💆";
var massage = "💆";
var massage_man = "💆‍♂";
var business_suit_levitating = "🕴";
var dancer = "💃";
var man_dancing = "🕺";
var dancing_women = "👯";
var dancers = "👯";
var dancing_men = "👯‍♂";
var walking_woman = "🚶‍♀";
var walking_man = "🚶";
var walking = "🚶";
var running_woman = "🏃‍♀";
var running_man = "🏃";
var runner = "🏃";
var running = "🏃";
var couple = "👫";
var two_women_holding_hands = "👭";
var two_men_holding_hands = "👬";
var couple_with_heart_woman_man = "💑";
var couple_with_heart = "💑";
var couple_with_heart_woman_woman = "👩‍❤️‍👩";
var couple_with_heart_man_man = "👨‍❤️‍👨";
var couplekiss_man_woman = "💏";
var couplekiss_woman_woman = "👩‍❤️‍💋‍👩";
var couplekiss_man_man = "👨‍❤️‍💋‍👨";
var family_man_woman_boy = "👪";
var family = "👪";
var family_man_woman_girl = "👨‍👩‍👧";
var family_man_woman_girl_boy = "👨‍👩‍👧‍👦";
var family_man_woman_boy_boy = "👨‍👩‍👦‍👦";
var family_man_woman_girl_girl = "👨‍👩‍👧‍👧";
var family_woman_woman_boy = "👩‍👩‍👦";
var family_woman_woman_girl = "👩‍👩‍👧";
var family_woman_woman_girl_boy = "👩‍👩‍👧‍👦";
var family_woman_woman_boy_boy = "👩‍👩‍👦‍👦";
var family_woman_woman_girl_girl = "👩‍👩‍👧‍👧";
var family_man_man_boy = "👨‍👨‍👦";
var family_man_man_girl = "👨‍👨‍👧";
var family_man_man_girl_boy = "👨‍👨‍👧‍👦";
var family_man_man_boy_boy = "👨‍👨‍👦‍👦";
var family_man_man_girl_girl = "👨‍👨‍👧‍👧";
var family_woman_boy = "👩‍👦";
var family_woman_girl = "👩‍👧";
var family_woman_girl_boy = "👩‍👧‍👦";
var family_woman_boy_boy = "👩‍👦‍👦";
var family_woman_girl_girl = "👩‍👧‍👧";
var family_man_boy = "👨‍👦";
var family_man_girl = "👨‍👧";
var family_man_girl_boy = "👨‍👧‍👦";
var family_man_boy_boy = "👨‍👦‍👦";
var family_man_girl_girl = "👨‍👧‍👧";
var womans_clothes = "👚";
var shirt = "👕";
var tshirt = "👕";
var jeans = "👖";
var necktie = "👔";
var dress = "👗";
var bikini = "👙";
var kimono = "👘";
var high_heel = "👠";
var sandal = "👡";
var boot = "👢";
var mans_shoe = "👞";
var shoe = "👞";
var athletic_shoe = "👟";
var womans_hat = "👒";
var tophat = "🎩";
var mortar_board = "🎓";
var crown = "👑";
var rescue_worker_helmet = "⛑";
var school_satchel = "🎒";
var pouch = "👝";
var purse = "👛";
var handbag = "👜";
var briefcase = "💼";
var eyeglasses = "👓";
var dark_sunglasses = "🕶";
var closed_umbrella = "🌂";
var open_umbrella = "☂️";
var dog = "🐶";
var cat = "🐱";
var mouse = "🐭";
var hamster = "🐹";
var rabbit = "🐰";
var fox_face = "🦊";
var bear = "🐻";
var panda_face = "🐼";
var koala = "🐨";
var tiger = "🐯";
var lion = "🦁";
var cow = "🐮";
var pig = "🐷";
var pig_nose = "🐽";
var frog = "🐸";
var monkey_face = "🐵";
var see_no_evil = "🙈";
var hear_no_evil = "🙉";
var speak_no_evil = "🙊";
var monkey = "🐒";
var chicken = "🐔";
var penguin = "🐧";
var bird = "🐦";
var baby_chick = "🐤";
var hatching_chick = "🐣";
var hatched_chick = "🐥";
var duck = "🦆";
var eagle = "🦅";
var owl = "🦉";
var bat = "🦇";
var wolf = "🐺";
var boar = "🐗";
var horse = "🐴";
var unicorn = "🦄";
var bee = "🐝";
var honeybee = "🐝";
var bug = "🐛";
var butterfly = "🦋";
var snail = "🐌";
var shell = "🐚";
var beetle = "🐞";
var ant = "🐜";
var spider = "🕷";
var spider_web = "🕸";
var turtle = "🐢";
var snake = "🐍";
var lizard = "🦎";
var scorpion = "🦂";
var crab = "🦀";
var squid = "🦑";
var octopus = "🐙";
var shrimp = "🦐";
var tropical_fish = "🐠";
var fish = "🐟";
var blowfish = "🐡";
var dolphin = "🐬";
var flipper = "🐬";
var shark = "🦈";
var whale = "🐳";
var whale2 = "🐋";
var crocodile = "🐊";
var leopard = "🐆";
var tiger2 = "🐅";
var water_buffalo = "🐃";
var ox = "🐂";
var cow2 = "🐄";
var deer = "🦌";
var dromedary_camel = "🐪";
var camel = "🐫";
var elephant = "🐘";
var rhinoceros = "🦏";
var gorilla = "🦍";
var racehorse = "🐎";
var pig2 = "🐖";
var goat = "🐐";
var ram = "🐏";
var sheep = "🐑";
var dog2 = "🐕";
var poodle = "🐩";
var cat2 = "🐈";
var rooster = "🐓";
var turkey = "🦃";
var dove = "🕊";
var rabbit2 = "🐇";
var mouse2 = "🐁";
var rat = "🐀";
var chipmunk = "🐿";
var feet = "🐾";
var paw_prints = "🐾";
var dragon = "🐉";
var dragon_face = "🐲";
var cactus = "🌵";
var christmas_tree = "🎄";
var evergreen_tree = "🌲";
var deciduous_tree = "🌳";
var palm_tree = "🌴";
var seedling = "🌱";
var herb = "🌿";
var shamrock = "☘️";
var four_leaf_clover = "🍀";
var bamboo = "🎍";
var tanabata_tree = "🎋";
var leaves = "🍃";
var fallen_leaf = "🍂";
var maple_leaf = "🍁";
var mushroom = "🍄";
var ear_of_rice = "🌾";
var bouquet = "💐";
var tulip = "🌷";
var rose = "🌹";
var wilted_flower = "🥀";
var sunflower = "🌻";
var blossom = "🌼";
var cherry_blossom = "🌸";
var hibiscus = "🌺";
var earth_americas = "🌎";
var earth_africa = "🌍";
var earth_asia = "🌏";
var full_moon = "🌕";
var waning_gibbous_moon = "🌖";
var last_quarter_moon = "🌗";
var waning_crescent_moon = "🌘";
var new_moon = "🌑";
var waxing_crescent_moon = "🌒";
var first_quarter_moon = "🌓";
var moon = "🌔";
var waxing_gibbous_moon = "🌔";
var new_moon_with_face = "🌚";
var full_moon_with_face = "🌝";
var sun_with_face = "🌞";
var first_quarter_moon_with_face = "🌛";
var last_quarter_moon_with_face = "🌜";
var crescent_moon = "🌙";
var dizzy = "💫";
var star = "⭐️";
var star2 = "🌟";
var sparkles = "✨";
var zap = "⚡️";
var fire = "🔥";
var boom = "💥";
var collision = "💥";
var comet = "☄";
var sunny = "☀️";
var sun_behind_small_cloud = "🌤";
var partly_sunny = "⛅️";
var sun_behind_large_cloud = "🌥";
var sun_behind_rain_cloud = "🌦";
var rainbow = "🌈";
var cloud = "☁️";
var cloud_with_rain = "🌧";
var cloud_with_lightning_and_rain = "⛈";
var cloud_with_lightning = "🌩";
var cloud_with_snow = "🌨";
var snowman_with_snow = "☃️";
var snowman = "⛄️";
var snowflake = "❄️";
var wind_face = "🌬";
var dash = "💨";
var tornado = "🌪";
var fog = "🌫";
var ocean = "🌊";
var droplet = "💧";
var sweat_drops = "💦";
var umbrella = "☔️";
var green_apple = "🍏";
var apple = "🍎";
var pear = "🍐";
var tangerine = "🍊";
var orange = "🍊";
var mandarin = "🍊";
var lemon = "🍋";
var banana = "🍌";
var watermelon = "🍉";
var grapes = "🍇";
var strawberry = "🍓";
var melon = "🍈";
var cherries = "🍒";
var peach = "🍑";
var pineapple = "🍍";
var kiwi_fruit = "🥝";
var avocado = "🥑";
var tomato = "🍅";
var eggplant = "🍆";
var cucumber = "🥒";
var carrot = "🥕";
var corn = "🌽";
var hot_pepper = "🌶";
var potato = "🥔";
var sweet_potato = "🍠";
var chestnut = "🌰";
var peanuts = "🥜";
var honey_pot = "🍯";
var croissant = "🥐";
var bread = "🍞";
var baguette_bread = "🥖";
var cheese = "🧀";
var egg = "🥚";
var fried_egg = "🍳";
var bacon = "🥓";
var pancakes = "🥞";
var fried_shrimp = "🍤";
var poultry_leg = "🍗";
var meat_on_bone = "🍖";
var pizza = "🍕";
var hotdog = "🌭";
var hamburger = "🍔";
var fries = "🍟";
var stuffed_flatbread = "🥙";
var taco = "🌮";
var burrito = "🌯";
var green_salad = "🥗";
var shallow_pan_of_food = "🥘";
var spaghetti = "🍝";
var ramen = "🍜";
var stew = "🍲";
var fish_cake = "🍥";
var sushi = "🍣";
var bento = "🍱";
var curry = "🍛";
var rice = "🍚";
var rice_ball = "🍙";
var rice_cracker = "🍘";
var oden = "🍢";
var dango = "🍡";
var shaved_ice = "🍧";
var ice_cream = "🍨";
var icecream = "🍦";
var cake = "🍰";
var birthday = "🎂";
var custard = "🍮";
var lollipop = "🍭";
var candy = "🍬";
var chocolate_bar = "🍫";
var popcorn = "🍿";
var doughnut = "🍩";
var cookie = "🍪";
var milk_glass = "🥛";
var baby_bottle = "🍼";
var coffee = "☕️";
var tea = "🍵";
var sake = "🍶";
var beer = "🍺";
var beers = "🍻";
var clinking_glasses = "🥂";
var wine_glass = "🍷";
var tumbler_glass = "🥃";
var cocktail = "🍸";
var tropical_drink = "🍹";
var champagne = "🍾";
var spoon = "🥄";
var fork_and_knife = "🍴";
var plate_with_cutlery = "🍽";
var soccer = "⚽️";
var basketball = "🏀";
var football = "🏈";
var baseball = "⚾️";
var tennis = "🎾";
var volleyball = "🏐";
var rugby_football = "🏉";
var ping_pong = "🏓";
var badminton = "🏸";
var goal_net = "🥅";
var ice_hockey = "🏒";
var field_hockey = "🏑";
var cricket = "🏏";
var golf = "⛳️";
var bow_and_arrow = "🏹";
var fishing_pole_and_fish = "🎣";
var boxing_glove = "🥊";
var martial_arts_uniform = "🥋";
var ice_skate = "⛸";
var ski = "🎿";
var skier = "⛷";
var snowboarder = "🏂";
var weight_lifting_woman = "🏋️‍♀️";
var weight_lifting_man = "🏋";
var person_fencing = "🤺";
var women_wrestling = "🤼‍♀";
var men_wrestling = "🤼‍♂";
var woman_cartwheeling = "🤸‍♀";
var man_cartwheeling = "🤸‍♂";
var basketball_woman = "⛹️‍♀️";
var basketball_man = "⛹";
var woman_playing_handball = "🤾‍♀";
var man_playing_handball = "🤾‍♂";
var golfing_woman = "🏌️‍♀️";
var golfing_man = "🏌";
var surfing_woman = "🏄‍♀";
var surfing_man = "🏄";
var surfer = "🏄";
var swimming_woman = "🏊‍♀";
var swimming_man = "🏊";
var swimmer = "🏊";
var woman_playing_water_polo = "🤽‍♀";
var man_playing_water_polo = "🤽‍♂";
var rowing_woman = "🚣‍♀";
var rowing_man = "🚣";
var rowboat = "🚣";
var horse_racing = "🏇";
var biking_woman = "🚴‍♀";
var biking_man = "🚴";
var bicyclist = "🚴";
var mountain_biking_woman = "🚵‍♀";
var mountain_biking_man = "🚵";
var mountain_bicyclist = "🚵";
var running_shirt_with_sash = "🎽";
var medal_sports = "🏅";
var medal_military = "🎖";
var trophy = "🏆";
var rosette = "🏵";
var reminder_ribbon = "🎗";
var ticket = "🎫";
var tickets = "🎟";
var circus_tent = "🎪";
var woman_juggling = "🤹‍♀";
var man_juggling = "🤹‍♂";
var performing_arts = "🎭";
var art = "🎨";
var clapper = "🎬";
var microphone = "🎤";
var headphones = "🎧";
var musical_score = "🎼";
var musical_keyboard = "🎹";
var drum = "🥁";
var saxophone = "🎷";
var trumpet = "🎺";
var guitar = "🎸";
var violin = "🎻";
var game_die = "🎲";
var dart = "🎯";
var bowling = "🎳";
var video_game = "🎮";
var slot_machine = "🎰";
var car = "🚗";
var red_car = "🚗";
var taxi = "🚕";
var blue_car = "🚙";
var bus = "🚌";
var trolleybus = "🚎";
var racing_car = "🏎";
var police_car = "🚓";
var ambulance = "🚑";
var fire_engine = "🚒";
var minibus = "🚐";
var truck = "🚚";
var articulated_lorry = "🚛";
var tractor = "🚜";
var kick_scooter = "🛴";
var bike = "🚲";
var motor_scooter = "🛵";
var motorcycle = "🏍";
var rotating_light = "🚨";
var oncoming_police_car = "🚔";
var oncoming_bus = "🚍";
var oncoming_automobile = "🚘";
var oncoming_taxi = "🚖";
var aerial_tramway = "🚡";
var mountain_cableway = "🚠";
var suspension_railway = "🚟";
var railway_car = "🚃";
var train = "🚋";
var mountain_railway = "🚞";
var monorail = "🚝";
var bullettrain_side = "🚄";
var bullettrain_front = "🚅";
var light_rail = "🚈";
var steam_locomotive = "🚂";
var train2 = "🚆";
var metro = "🚇";
var tram = "🚊";
var station = "🚉";
var helicopter = "🚁";
var small_airplane = "🛩";
var airplane = "✈️";
var flight_departure = "🛫";
var flight_arrival = "🛬";
var rocket = "🚀";
var artificial_satellite = "🛰";
var seat = "💺";
var canoe = "🛶";
var boat = "⛵️";
var sailboat = "⛵️";
var motor_boat = "🛥";
var speedboat = "🚤";
var passenger_ship = "🛳";
var ferry = "⛴";
var ship = "🚢";
var anchor = "⚓️";
var construction = "🚧";
var fuelpump = "⛽️";
var busstop = "🚏";
var vertical_traffic_light = "🚦";
var traffic_light = "🚥";
var world_map = "🗺";
var moyai = "🗿";
var statue_of_liberty = "🗽";
var fountain = "⛲️";
var tokyo_tower = "🗼";
var european_castle = "🏰";
var japanese_castle = "🏯";
var stadium = "🏟";
var ferris_wheel = "🎡";
var roller_coaster = "🎢";
var carousel_horse = "🎠";
var parasol_on_ground = "⛱";
var beach_umbrella = "🏖";
var desert_island = "🏝";
var mountain = "⛰";
var mountain_snow = "🏔";
var mount_fuji = "🗻";
var volcano = "🌋";
var desert = "🏜";
var camping = "🏕";
var tent = "⛺️";
var railway_track = "🛤";
var motorway = "🛣";
var building_construction = "🏗";
var factory = "🏭";
var house = "🏠";
var house_with_garden = "🏡";
var houses = "🏘";
var derelict_house = "🏚";
var office = "🏢";
var department_store = "🏬";
var post_office = "🏣";
var european_post_office = "🏤";
var hospital = "🏥";
var bank = "🏦";
var hotel = "🏨";
var convenience_store = "🏪";
var school = "🏫";
var love_hotel = "🏩";
var wedding = "💒";
var classical_building = "🏛";
var church = "⛪️";
var mosque = "🕌";
var synagogue = "🕍";
var kaaba = "🕋";
var shinto_shrine = "⛩";
var japan = "🗾";
var rice_scene = "🎑";
var national_park = "🏞";
var sunrise = "🌅";
var sunrise_over_mountains = "🌄";
var stars = "🌠";
var sparkler = "🎇";
var fireworks = "🎆";
var city_sunrise = "🌇";
var city_sunset = "🌆";
var cityscape = "🏙";
var night_with_stars = "🌃";
var milky_way = "🌌";
var bridge_at_night = "🌉";
var foggy = "🌁";
var watch = "⌚️";
var iphone = "📱";
var calling = "📲";
var computer = "💻";
var keyboard = "⌨️";
var desktop_computer = "🖥";
var printer = "🖨";
var computer_mouse = "🖱";
var trackball = "🖲";
var joystick = "🕹";
var clamp = "🗜";
var minidisc = "💽";
var floppy_disk = "💾";
var cd = "💿";
var dvd = "📀";
var vhs = "📼";
var camera = "📷";
var camera_flash = "📸";
var video_camera = "📹";
var movie_camera = "🎥";
var film_projector = "📽";
var film_strip = "🎞";
var telephone_receiver = "📞";
var phone = "☎️";
var telephone = "☎️";
var pager = "📟";
var fax = "📠";
var tv = "📺";
var radio = "📻";
var studio_microphone = "🎙";
var level_slider = "🎚";
var control_knobs = "🎛";
var stopwatch = "⏱";
var timer_clock = "⏲";
var alarm_clock = "⏰";
var mantelpiece_clock = "🕰";
var hourglass = "⌛️";
var hourglass_flowing_sand = "⏳";
var satellite = "📡";
var battery = "🔋";
var electric_plug = "🔌";
var bulb = "💡";
var flashlight = "🔦";
var candle = "🕯";
var wastebasket = "🗑";
var oil_drum = "🛢";
var money_with_wings = "💸";
var dollar = "💵";
var yen = "💴";
var euro = "💶";
var pound = "💷";
var moneybag = "💰";
var credit_card = "💳";
var gem = "💎";
var balance_scale = "⚖️";
var wrench = "🔧";
var hammer = "🔨";
var hammer_and_pick = "⚒";
var hammer_and_wrench = "🛠";
var pick = "⛏";
var nut_and_bolt = "🔩";
var gear = "⚙️";
var chains = "⛓";
var gun = "🔫";
var bomb = "💣";
var hocho = "🔪";
var knife = "🔪";
var dagger = "🗡";
var crossed_swords = "⚔️";
var shield = "🛡";
var smoking = "🚬";
var coffin = "⚰️";
var funeral_urn = "⚱️";
var amphora = "🏺";
var crystal_ball = "🔮";
var prayer_beads = "📿";
var barber = "💈";
var alembic = "⚗️";
var telescope = "🔭";
var microscope = "🔬";
var hole = "🕳";
var pill = "💊";
var syringe = "💉";
var thermometer = "🌡";
var toilet = "🚽";
var potable_water = "🚰";
var shower = "🚿";
var bathtub = "🛁";
var bath = "🛀";
var bellhop_bell = "🛎";
var key = "🔑";
var old_key = "🗝";
var door = "🚪";
var couch_and_lamp = "🛋";
var bed = "🛏";
var sleeping_bed = "🛌";
var framed_picture = "🖼";
var shopping = "🛍";
var shopping_cart = "🛒";
var gift = "🎁";
var balloon = "🎈";
var flags = "🎏";
var ribbon = "🎀";
var confetti_ball = "🎊";
var tada = "🎉";
var dolls = "🎎";
var izakaya_lantern = "🏮";
var lantern = "🏮";
var wind_chime = "🎐";
var email = "✉️";
var envelope = "✉️";
var envelope_with_arrow = "📩";
var incoming_envelope = "📨";
var love_letter = "💌";
var inbox_tray = "📥";
var outbox_tray = "📤";
var label = "🏷";
var mailbox_closed = "📪";
var mailbox = "📫";
var mailbox_with_mail = "📬";
var mailbox_with_no_mail = "📭";
var postbox = "📮";
var postal_horn = "📯";
var scroll = "📜";
var page_with_curl = "📃";
var page_facing_up = "📄";
var bookmark_tabs = "📑";
var bar_chart = "📊";
var chart_with_upwards_trend = "📈";
var chart_with_downwards_trend = "📉";
var spiral_notepad = "🗒";
var spiral_calendar = "🗓";
var calendar = "📆";
var date = "📅";
var card_index = "📇";
var card_file_box = "🗃";
var ballot_box = "🗳";
var file_cabinet = "🗄";
var clipboard = "📋";
var file_folder = "📁";
var open_file_folder = "📂";
var card_index_dividers = "🗂";
var newspaper_roll = "🗞";
var newspaper = "📰";
var notebook = "📓";
var notebook_with_decorative_cover = "📔";
var ledger = "📒";
var closed_book = "📕";
var green_book = "📗";
var blue_book = "📘";
var orange_book = "📙";
var books = "📚";
var book = "📖";
var open_book = "📖";
var bookmark = "🔖";
var link = "🔗";
var paperclip = "📎";
var paperclips = "🖇";
var triangular_ruler = "📐";
var straight_ruler = "📏";
var pushpin = "📌";
var round_pushpin = "📍";
var scissors = "✂️";
var pen = "🖊";
var fountain_pen = "🖋";
var black_nib = "✒️";
var paintbrush = "🖌";
var crayon = "🖍";
var memo = "📝";
var pencil = "📝";
var pencil2 = "✏️";
var mag = "🔍";
var mag_right = "🔎";
var lock_with_ink_pen = "🔏";
var closed_lock_with_key = "🔐";
var lock = "🔒";
var unlock = "🔓";
var heart = "❤️";
var yellow_heart = "💛";
var green_heart = "💚";
var blue_heart = "💙";
var purple_heart = "💜";
var black_heart = "🖤";
var broken_heart = "💔";
var heavy_heart_exclamation = "❣️";
var two_hearts = "💕";
var revolving_hearts = "💞";
var heartbeat = "💓";
var heartpulse = "💗";
var sparkling_heart = "💖";
var cupid = "💘";
var gift_heart = "💝";
var heart_decoration = "💟";
var peace_symbol = "☮️";
var latin_cross = "✝️";
var star_and_crescent = "☪️";
var om = "🕉";
var wheel_of_dharma = "☸️";
var star_of_david = "✡️";
var six_pointed_star = "🔯";
var menorah = "🕎";
var yin_yang = "☯️";
var orthodox_cross = "☦️";
var place_of_worship = "🛐";
var ophiuchus = "⛎";
var aries = "♈️";
var taurus = "♉️";
var gemini = "♊️";
var cancer = "♋️";
var leo = "♌️";
var virgo = "♍️";
var libra = "♎️";
var scorpius = "♏️";
var sagittarius = "♐️";
var capricorn = "♑️";
var aquarius = "♒️";
var pisces = "♓️";
var id = "🆔";
var atom_symbol = "⚛️";
var accept = "🉑";
var radioactive = "☢️";
var biohazard = "☣️";
var mobile_phone_off = "📴";
var vibration_mode = "📳";
var eight_pointed_black_star = "✴️";
var vs = "🆚";
var white_flower = "💮";
var ideograph_advantage = "🉐";
var secret = "㊙️";
var congratulations = "㊗️";
var u6e80 = "🈵";
var a = "🅰️";
var b = "🅱️";
var ab = "🆎";
var cl = "🆑";
var o2 = "🅾️";
var sos = "🆘";
var x = "❌";
var o = "⭕️";
var stop_sign = "🛑";
var no_entry = "⛔️";
var name_badge = "📛";
var no_entry_sign = "🚫";
var anger = "💢";
var hotsprings = "♨️";
var no_pedestrians = "🚷";
var do_not_litter = "🚯";
var no_bicycles = "🚳";
var underage = "🔞";
var no_mobile_phones = "📵";
var no_smoking = "🚭";
var exclamation = "❗️";
var heavy_exclamation_mark = "❗️";
var grey_exclamation = "❕";
var question = "❓";
var grey_question = "❔";
var bangbang = "‼️";
var interrobang = "⁉️";
var low_brightness = "🔅";
var high_brightness = "🔆";
var part_alternation_mark = "〽️";
var warning = "⚠️";
var children_crossing = "🚸";
var trident = "🔱";
var fleur_de_lis = "⚜️";
var beginner = "🔰";
var recycle = "♻️";
var white_check_mark = "✅";
var chart = "💹";
var sparkle = "❇️";
var eight_spoked_asterisk = "✳️";
var negative_squared_cross_mark = "❎";
var globe_with_meridians = "🌐";
var diamond_shape_with_a_dot_inside = "💠";
var m = "Ⓜ️";
var cyclone = "🌀";
var zzz = "💤";
var atm = "🏧";
var wc = "🚾";
var wheelchair = "♿️";
var parking = "🅿️";
var sa = "🈂️";
var passport_control = "🛂";
var customs = "🛃";
var baggage_claim = "🛄";
var left_luggage = "🛅";
var mens = "🚹";
var womens = "🚺";
var baby_symbol = "🚼";
var restroom = "🚻";
var put_litter_in_its_place = "🚮";
var cinema = "🎦";
var signal_strength = "📶";
var koko = "🈁";
var symbols = "🔣";
var information_source = "ℹ️";
var abc = "🔤";
var abcd = "🔡";
var capital_abcd = "🔠";
var ng = "🆖";
var ok = "🆗";
var up = "🆙";
var cool = "🆒";
var free = "🆓";
var zero = "0️⃣";
var one = "1️⃣";
var two = "2️⃣";
var three = "3️⃣";
var four = "4️⃣";
var five = "5️⃣";
var six = "6️⃣";
var seven = "7️⃣";
var eight = "8️⃣";
var nine = "9️⃣";
var keycap_ten = "🔟";
var hash = "#️⃣";
var asterisk = "*️⃣";
var arrow_forward = "▶️";
var pause_button = "⏸";
var play_or_pause_button = "⏯";
var stop_button = "⏹";
var record_button = "⏺";
var next_track_button = "⏭";
var previous_track_button = "⏮";
var fast_forward = "⏩";
var rewind = "⏪";
var arrow_double_up = "⏫";
var arrow_double_down = "⏬";
var arrow_backward = "◀️";
var arrow_up_small = "🔼";
var arrow_down_small = "🔽";
var arrow_right = "➡️";
var arrow_left = "⬅️";
var arrow_up = "⬆️";
var arrow_down = "⬇️";
var arrow_upper_right = "↗️";
var arrow_lower_right = "↘️";
var arrow_lower_left = "↙️";
var arrow_upper_left = "↖️";
var arrow_up_down = "↕️";
var left_right_arrow = "↔️";
var arrow_right_hook = "↪️";
var leftwards_arrow_with_hook = "↩️";
var arrow_heading_up = "⤴️";
var arrow_heading_down = "⤵️";
var twisted_rightwards_arrows = "🔀";
var repeat = "🔁";
var repeat_one = "🔂";
var arrows_counterclockwise = "🔄";
var arrows_clockwise = "🔃";
var musical_note = "🎵";
var notes = "🎶";
var heavy_plus_sign = "➕";
var heavy_minus_sign = "➖";
var heavy_division_sign = "➗";
var heavy_multiplication_x = "✖️";
var heavy_dollar_sign = "💲";
var currency_exchange = "💱";
var tm = "™️";
var copyright = "©️";
var registered = "®️";
var wavy_dash = "〰️";
var curly_loop = "➰";
var loop = "➿";
var end = "🔚";
var back = "🔙";
var on = "🔛";
var top = "🔝";
var soon = "🔜";
var heavy_check_mark = "✔️";
var ballot_box_with_check = "☑️";
var radio_button = "🔘";
var white_circle = "⚪️";
var black_circle = "⚫️";
var red_circle = "🔴";
var large_blue_circle = "🔵";
var small_red_triangle = "🔺";
var small_red_triangle_down = "🔻";
var small_orange_diamond = "🔸";
var small_blue_diamond = "🔹";
var large_orange_diamond = "🔶";
var large_blue_diamond = "🔷";
var white_square_button = "🔳";
var black_square_button = "🔲";
var black_small_square = "▪️";
var white_small_square = "▫️";
var black_medium_small_square = "◾️";
var white_medium_small_square = "◽️";
var black_medium_square = "◼️";
var white_medium_square = "◻️";
var black_large_square = "⬛️";
var white_large_square = "⬜️";
var speaker = "🔈";
var mute = "🔇";
var sound = "🔉";
var loud_sound = "🔊";
var bell = "🔔";
var no_bell = "🔕";
var mega = "📣";
var loudspeaker = "📢";
var eye_speech_bubble = "👁‍🗨";
var speech_balloon = "💬";
var thought_balloon = "💭";
var right_anger_bubble = "🗯";
var spades = "♠️";
var clubs = "♣️";
var hearts = "♥️";
var diamonds = "♦️";
var black_joker = "🃏";
var flower_playing_cards = "🎴";
var mahjong = "🀄️";
var clock1 = "🕐";
var clock2 = "🕑";
var clock3 = "🕒";
var clock4 = "🕓";
var clock5 = "🕔";
var clock6 = "🕕";
var clock7 = "🕖";
var clock8 = "🕗";
var clock9 = "🕘";
var clock10 = "🕙";
var clock11 = "🕚";
var clock12 = "🕛";
var clock130 = "🕜";
var clock230 = "🕝";
var clock330 = "🕞";
var clock430 = "🕟";
var clock530 = "🕠";
var clock630 = "🕡";
var clock730 = "🕢";
var clock830 = "🕣";
var clock930 = "🕤";
var clock1030 = "🕥";
var clock1130 = "🕦";
var clock1230 = "🕧";
var white_flag = "🏳️";
var black_flag = "🏴";
var checkered_flag = "🏁";
var triangular_flag_on_post = "🚩";
var rainbow_flag = "🏳️‍🌈";
var afghanistan = "🇦🇫";
var aland_islands = "🇦🇽";
var albania = "🇦🇱";
var algeria = "🇩🇿";
var american_samoa = "🇦🇸";
var andorra = "🇦🇩";
var angola = "🇦🇴";
var anguilla = "🇦🇮";
var antarctica = "🇦🇶";
var antigua_barbuda = "🇦🇬";
var argentina = "🇦🇷";
var armenia = "🇦🇲";
var aruba = "🇦🇼";
var australia = "🇦🇺";
var austria = "🇦🇹";
var azerbaijan = "🇦🇿";
var bahamas = "🇧🇸";
var bahrain = "🇧🇭";
var bangladesh = "🇧🇩";
var barbados = "🇧🇧";
var belarus = "🇧🇾";
var belgium = "🇧🇪";
var belize = "🇧🇿";
var benin = "🇧🇯";
var bermuda = "🇧🇲";
var bhutan = "🇧🇹";
var bolivia = "🇧🇴";
var caribbean_netherlands = "🇧🇶";
var bosnia_herzegovina = "🇧🇦";
var botswana = "🇧🇼";
var brazil = "🇧🇷";
var british_indian_ocean_territory = "🇮🇴";
var british_virgin_islands = "🇻🇬";
var brunei = "🇧🇳";
var bulgaria = "🇧🇬";
var burkina_faso = "🇧🇫";
var burundi = "🇧🇮";
var cape_verde = "🇨🇻";
var cambodia = "🇰🇭";
var cameroon = "🇨🇲";
var canada = "🇨🇦";
var canary_islands = "🇮🇨";
var cayman_islands = "🇰🇾";
var central_african_republic = "🇨🇫";
var chad = "🇹🇩";
var chile = "🇨🇱";
var cn = "🇨🇳";
var christmas_island = "🇨🇽";
var cocos_islands = "🇨🇨";
var colombia = "🇨🇴";
var comoros = "🇰🇲";
var congo_brazzaville = "🇨🇬";
var congo_kinshasa = "🇨🇩";
var cook_islands = "🇨🇰";
var costa_rica = "🇨🇷";
var cote_divoire = "🇨🇮";
var croatia = "🇭🇷";
var cuba = "🇨🇺";
var curacao = "🇨🇼";
var cyprus = "🇨🇾";
var czech_republic = "🇨🇿";
var denmark = "🇩🇰";
var djibouti = "🇩🇯";
var dominica = "🇩🇲";
var dominican_republic = "🇩🇴";
var ecuador = "🇪🇨";
var egypt = "🇪🇬";
var el_salvador = "🇸🇻";
var equatorial_guinea = "🇬🇶";
var eritrea = "🇪🇷";
var estonia = "🇪🇪";
var ethiopia = "🇪🇹";
var eu = "🇪🇺";
var european_union = "🇪🇺";
var falkland_islands = "🇫🇰";
var faroe_islands = "🇫🇴";
var fiji = "🇫🇯";
var finland = "🇫🇮";
var fr = "🇫🇷";
var french_guiana = "🇬🇫";
var french_polynesia = "🇵🇫";
var french_southern_territories = "🇹🇫";
var gabon = "🇬🇦";
var gambia = "🇬🇲";
var georgia = "🇬🇪";
var de = "🇩🇪";
var ghana = "🇬🇭";
var gibraltar = "🇬🇮";
var greece = "🇬🇷";
var greenland = "🇬🇱";
var grenada = "🇬🇩";
var guadeloupe = "🇬🇵";
var guam = "🇬🇺";
var guatemala = "🇬🇹";
var guernsey = "🇬🇬";
var guinea = "🇬🇳";
var guinea_bissau = "🇬🇼";
var guyana = "🇬🇾";
var haiti = "🇭🇹";
var honduras = "🇭🇳";
var hong_kong = "🇭🇰";
var hungary = "🇭🇺";
var iceland = "🇮🇸";
var india = "🇮🇳";
var indonesia = "🇮🇩";
var iran = "🇮🇷";
var iraq = "🇮🇶";
var ireland = "🇮🇪";
var isle_of_man = "🇮🇲";
var israel = "🇮🇱";
var it = "🇮🇹";
var jamaica = "🇯🇲";
var jp = "🇯🇵";
var crossed_flags = "🎌";
var jersey = "🇯🇪";
var jordan = "🇯🇴";
var kazakhstan = "🇰🇿";
var kenya = "🇰🇪";
var kiribati = "🇰🇮";
var kosovo = "🇽🇰";
var kuwait = "🇰🇼";
var kyrgyzstan = "🇰🇬";
var laos = "🇱🇦";
var latvia = "🇱🇻";
var lebanon = "🇱🇧";
var lesotho = "🇱🇸";
var liberia = "🇱🇷";
var libya = "🇱🇾";
var liechtenstein = "🇱🇮";
var lithuania = "🇱🇹";
var luxembourg = "🇱🇺";
var macau = "🇲🇴";
var macedonia = "🇲🇰";
var madagascar = "🇲🇬";
var malawi = "🇲🇼";
var malaysia = "🇲🇾";
var maldives = "🇲🇻";
var mali = "🇲🇱";
var malta = "🇲🇹";
var marshall_islands = "🇲🇭";
var martinique = "🇲🇶";
var mauritania = "🇲🇷";
var mauritius = "🇲🇺";
var mayotte = "🇾🇹";
var mexico = "🇲🇽";
var micronesia = "🇫🇲";
var moldova = "🇲🇩";
var monaco = "🇲🇨";
var mongolia = "🇲🇳";
var montenegro = "🇲🇪";
var montserrat = "🇲🇸";
var morocco = "🇲🇦";
var mozambique = "🇲🇿";
var myanmar = "🇲🇲";
var namibia = "🇳🇦";
var nauru = "🇳🇷";
var nepal = "🇳🇵";
var netherlands = "🇳🇱";
var new_caledonia = "🇳🇨";
var new_zealand = "🇳🇿";
var nicaragua = "🇳🇮";
var niger = "🇳🇪";
var nigeria = "🇳🇬";
var niue = "🇳🇺";
var norfolk_island = "🇳🇫";
var northern_mariana_islands = "🇲🇵";
var north_korea = "🇰🇵";
var norway = "🇳🇴";
var oman = "🇴🇲";
var pakistan = "🇵🇰";
var palau = "🇵🇼";
var palestinian_territories = "🇵🇸";
var panama = "🇵🇦";
var papua_new_guinea = "🇵🇬";
var paraguay = "🇵🇾";
var peru = "🇵🇪";
var philippines = "🇵🇭";
var pitcairn_islands = "🇵🇳";
var poland = "🇵🇱";
var portugal = "🇵🇹";
var puerto_rico = "🇵🇷";
var qatar = "🇶🇦";
var reunion = "🇷🇪";
var romania = "🇷🇴";
var ru = "🇷🇺";
var rwanda = "🇷🇼";
var st_barthelemy = "🇧🇱";
var st_helena = "🇸🇭";
var st_kitts_nevis = "🇰🇳";
var st_lucia = "🇱🇨";
var st_pierre_miquelon = "🇵🇲";
var st_vincent_grenadines = "🇻🇨";
var samoa = "🇼🇸";
var san_marino = "🇸🇲";
var sao_tome_principe = "🇸🇹";
var saudi_arabia = "🇸🇦";
var senegal = "🇸🇳";
var serbia = "🇷🇸";
var seychelles = "🇸🇨";
var sierra_leone = "🇸🇱";
var singapore = "🇸🇬";
var sint_maarten = "🇸🇽";
var slovakia = "🇸🇰";
var slovenia = "🇸🇮";
var solomon_islands = "🇸🇧";
var somalia = "🇸🇴";
var south_africa = "🇿🇦";
var south_georgia_south_sandwich_islands = "🇬🇸";
var kr = "🇰🇷";
var south_sudan = "🇸🇸";
var es = "🇪🇸";
var sri_lanka = "🇱🇰";
var sudan = "🇸🇩";
var suriname = "🇸🇷";
var swaziland = "🇸🇿";
var sweden = "🇸🇪";
var switzerland = "🇨🇭";
var syria = "🇸🇾";
var taiwan = "🇹🇼";
var tajikistan = "🇹🇯";
var tanzania = "🇹🇿";
var thailand = "🇹🇭";
var timor_leste = "🇹🇱";
var togo = "🇹🇬";
var tokelau = "🇹🇰";
var tonga = "🇹🇴";
var trinidad_tobago = "🇹🇹";
var tunisia = "🇹🇳";
var tr = "🇹🇷";
var turkmenistan = "🇹🇲";
var turks_caicos_islands = "🇹🇨";
var tuvalu = "🇹🇻";
var uganda = "🇺🇬";
var ukraine = "🇺🇦";
var united_arab_emirates = "🇦🇪";
var gb = "🇬🇧";
var uk = "🇬🇧";
var us = "🇺🇸";
var us_virgin_islands = "🇻🇮";
var uruguay = "🇺🇾";
var uzbekistan = "🇺🇿";
var vanuatu = "🇻🇺";
var vatican_city = "🇻🇦";
var venezuela = "🇻🇪";
var vietnam = "🇻🇳";
var wallis_futuna = "🇼🇫";
var western_sahara = "🇪🇭";
var yemen = "🇾🇪";
var zambia = "🇿🇲";
var zimbabwe = "🇿🇼";
var require$$0 = {
	"100": "💯",
	"1234": "🔢",
	grinning: grinning,
	smiley: smiley,
	smile: smile,
	grin: grin,
	laughing: laughing,
	satisfied: satisfied,
	sweat_smile: sweat_smile,
	joy: joy,
	rofl: rofl,
	relaxed: relaxed,
	blush: blush,
	innocent: innocent,
	slightly_smiling_face: slightly_smiling_face,
	upside_down_face: upside_down_face,
	wink: wink,
	relieved: relieved,
	heart_eyes: heart_eyes,
	kissing_heart: kissing_heart,
	kissing: kissing,
	kissing_smiling_eyes: kissing_smiling_eyes,
	kissing_closed_eyes: kissing_closed_eyes,
	yum: yum,
	stuck_out_tongue_winking_eye: stuck_out_tongue_winking_eye,
	stuck_out_tongue_closed_eyes: stuck_out_tongue_closed_eyes,
	stuck_out_tongue: stuck_out_tongue,
	money_mouth_face: money_mouth_face,
	hugs: hugs,
	nerd_face: nerd_face,
	sunglasses: sunglasses,
	clown_face: clown_face,
	cowboy_hat_face: cowboy_hat_face,
	smirk: smirk,
	unamused: unamused,
	disappointed: disappointed,
	pensive: pensive,
	worried: worried,
	confused: confused,
	slightly_frowning_face: slightly_frowning_face,
	frowning_face: frowning_face,
	persevere: persevere,
	confounded: confounded,
	tired_face: tired_face,
	weary: weary,
	triumph: triumph,
	angry: angry,
	rage: rage,
	pout: pout,
	no_mouth: no_mouth,
	neutral_face: neutral_face,
	expressionless: expressionless,
	hushed: hushed,
	frowning: frowning,
	anguished: anguished,
	open_mouth: open_mouth,
	astonished: astonished,
	dizzy_face: dizzy_face,
	flushed: flushed,
	scream: scream,
	fearful: fearful,
	cold_sweat: cold_sweat,
	cry: cry,
	disappointed_relieved: disappointed_relieved,
	drooling_face: drooling_face,
	sob: sob,
	sweat: sweat,
	sleepy: sleepy,
	sleeping: sleeping,
	roll_eyes: roll_eyes,
	thinking: thinking,
	lying_face: lying_face,
	grimacing: grimacing,
	zipper_mouth_face: zipper_mouth_face,
	nauseated_face: nauseated_face,
	sneezing_face: sneezing_face,
	mask: mask,
	face_with_thermometer: face_with_thermometer,
	face_with_head_bandage: face_with_head_bandage,
	smiling_imp: smiling_imp,
	imp: imp,
	japanese_ogre: japanese_ogre,
	japanese_goblin: japanese_goblin,
	hankey: hankey,
	poop: poop,
	shit: shit,
	ghost: ghost,
	skull: skull,
	skull_and_crossbones: skull_and_crossbones,
	alien: alien,
	space_invader: space_invader,
	robot: robot,
	jack_o_lantern: jack_o_lantern,
	smiley_cat: smiley_cat,
	smile_cat: smile_cat,
	joy_cat: joy_cat,
	heart_eyes_cat: heart_eyes_cat,
	smirk_cat: smirk_cat,
	kissing_cat: kissing_cat,
	scream_cat: scream_cat,
	crying_cat_face: crying_cat_face,
	pouting_cat: pouting_cat,
	open_hands: open_hands,
	raised_hands: raised_hands,
	clap: clap,
	pray: pray,
	handshake: handshake,
	"+1": "👍",
	thumbsup: thumbsup,
	"-1": "👎",
	thumbsdown: thumbsdown,
	fist_oncoming: fist_oncoming,
	facepunch: facepunch,
	punch: punch,
	fist_raised: fist_raised,
	fist: fist,
	fist_left: fist_left,
	fist_right: fist_right,
	crossed_fingers: crossed_fingers,
	v: v,
	metal: metal,
	ok_hand: ok_hand,
	point_left: point_left,
	point_right: point_right,
	point_up_2: point_up_2,
	point_down: point_down,
	point_up: point_up,
	hand: hand,
	raised_hand: raised_hand,
	raised_back_of_hand: raised_back_of_hand,
	raised_hand_with_fingers_splayed: raised_hand_with_fingers_splayed,
	vulcan_salute: vulcan_salute,
	wave: wave,
	call_me_hand: call_me_hand,
	muscle: muscle,
	middle_finger: middle_finger,
	fu: fu,
	writing_hand: writing_hand,
	selfie: selfie,
	nail_care: nail_care,
	ring: ring,
	lipstick: lipstick,
	kiss: kiss,
	lips: lips,
	tongue: tongue,
	ear: ear,
	nose: nose,
	footprints: footprints,
	eye: eye,
	eyes: eyes,
	speaking_head: speaking_head,
	bust_in_silhouette: bust_in_silhouette,
	busts_in_silhouette: busts_in_silhouette,
	baby: baby,
	boy: boy,
	girl: girl,
	man: man,
	woman: woman,
	blonde_woman: blonde_woman,
	blonde_man: blonde_man,
	person_with_blond_hair: person_with_blond_hair,
	older_man: older_man,
	older_woman: older_woman,
	man_with_gua_pi_mao: man_with_gua_pi_mao,
	woman_with_turban: woman_with_turban,
	man_with_turban: man_with_turban,
	policewoman: policewoman,
	policeman: policeman,
	cop: cop,
	construction_worker_woman: construction_worker_woman,
	construction_worker_man: construction_worker_man,
	construction_worker: construction_worker,
	guardswoman: guardswoman,
	guardsman: guardsman,
	female_detective: female_detective,
	male_detective: male_detective,
	detective: detective,
	woman_health_worker: woman_health_worker,
	man_health_worker: man_health_worker,
	woman_farmer: woman_farmer,
	man_farmer: man_farmer,
	woman_cook: woman_cook,
	man_cook: man_cook,
	woman_student: woman_student,
	man_student: man_student,
	woman_singer: woman_singer,
	man_singer: man_singer,
	woman_teacher: woman_teacher,
	man_teacher: man_teacher,
	woman_factory_worker: woman_factory_worker,
	man_factory_worker: man_factory_worker,
	woman_technologist: woman_technologist,
	man_technologist: man_technologist,
	woman_office_worker: woman_office_worker,
	man_office_worker: man_office_worker,
	woman_mechanic: woman_mechanic,
	man_mechanic: man_mechanic,
	woman_scientist: woman_scientist,
	man_scientist: man_scientist,
	woman_artist: woman_artist,
	man_artist: man_artist,
	woman_firefighter: woman_firefighter,
	man_firefighter: man_firefighter,
	woman_pilot: woman_pilot,
	man_pilot: man_pilot,
	woman_astronaut: woman_astronaut,
	man_astronaut: man_astronaut,
	woman_judge: woman_judge,
	man_judge: man_judge,
	mrs_claus: mrs_claus,
	santa: santa,
	princess: princess,
	prince: prince,
	bride_with_veil: bride_with_veil,
	man_in_tuxedo: man_in_tuxedo,
	angel: angel,
	pregnant_woman: pregnant_woman,
	bowing_woman: bowing_woman,
	bowing_man: bowing_man,
	bow: bow,
	tipping_hand_woman: tipping_hand_woman,
	information_desk_person: information_desk_person,
	sassy_woman: sassy_woman,
	tipping_hand_man: tipping_hand_man,
	sassy_man: sassy_man,
	no_good_woman: no_good_woman,
	no_good: no_good,
	ng_woman: ng_woman,
	no_good_man: no_good_man,
	ng_man: ng_man,
	ok_woman: ok_woman,
	ok_man: ok_man,
	raising_hand_woman: raising_hand_woman,
	raising_hand: raising_hand,
	raising_hand_man: raising_hand_man,
	woman_facepalming: woman_facepalming,
	man_facepalming: man_facepalming,
	woman_shrugging: woman_shrugging,
	man_shrugging: man_shrugging,
	pouting_woman: pouting_woman,
	person_with_pouting_face: person_with_pouting_face,
	pouting_man: pouting_man,
	frowning_woman: frowning_woman,
	person_frowning: person_frowning,
	frowning_man: frowning_man,
	haircut_woman: haircut_woman,
	haircut: haircut,
	haircut_man: haircut_man,
	massage_woman: massage_woman,
	massage: massage,
	massage_man: massage_man,
	business_suit_levitating: business_suit_levitating,
	dancer: dancer,
	man_dancing: man_dancing,
	dancing_women: dancing_women,
	dancers: dancers,
	dancing_men: dancing_men,
	walking_woman: walking_woman,
	walking_man: walking_man,
	walking: walking,
	running_woman: running_woman,
	running_man: running_man,
	runner: runner,
	running: running,
	couple: couple,
	two_women_holding_hands: two_women_holding_hands,
	two_men_holding_hands: two_men_holding_hands,
	couple_with_heart_woman_man: couple_with_heart_woman_man,
	couple_with_heart: couple_with_heart,
	couple_with_heart_woman_woman: couple_with_heart_woman_woman,
	couple_with_heart_man_man: couple_with_heart_man_man,
	couplekiss_man_woman: couplekiss_man_woman,
	couplekiss_woman_woman: couplekiss_woman_woman,
	couplekiss_man_man: couplekiss_man_man,
	family_man_woman_boy: family_man_woman_boy,
	family: family,
	family_man_woman_girl: family_man_woman_girl,
	family_man_woman_girl_boy: family_man_woman_girl_boy,
	family_man_woman_boy_boy: family_man_woman_boy_boy,
	family_man_woman_girl_girl: family_man_woman_girl_girl,
	family_woman_woman_boy: family_woman_woman_boy,
	family_woman_woman_girl: family_woman_woman_girl,
	family_woman_woman_girl_boy: family_woman_woman_girl_boy,
	family_woman_woman_boy_boy: family_woman_woman_boy_boy,
	family_woman_woman_girl_girl: family_woman_woman_girl_girl,
	family_man_man_boy: family_man_man_boy,
	family_man_man_girl: family_man_man_girl,
	family_man_man_girl_boy: family_man_man_girl_boy,
	family_man_man_boy_boy: family_man_man_boy_boy,
	family_man_man_girl_girl: family_man_man_girl_girl,
	family_woman_boy: family_woman_boy,
	family_woman_girl: family_woman_girl,
	family_woman_girl_boy: family_woman_girl_boy,
	family_woman_boy_boy: family_woman_boy_boy,
	family_woman_girl_girl: family_woman_girl_girl,
	family_man_boy: family_man_boy,
	family_man_girl: family_man_girl,
	family_man_girl_boy: family_man_girl_boy,
	family_man_boy_boy: family_man_boy_boy,
	family_man_girl_girl: family_man_girl_girl,
	womans_clothes: womans_clothes,
	shirt: shirt,
	tshirt: tshirt,
	jeans: jeans,
	necktie: necktie,
	dress: dress,
	bikini: bikini,
	kimono: kimono,
	high_heel: high_heel,
	sandal: sandal,
	boot: boot,
	mans_shoe: mans_shoe,
	shoe: shoe,
	athletic_shoe: athletic_shoe,
	womans_hat: womans_hat,
	tophat: tophat,
	mortar_board: mortar_board,
	crown: crown,
	rescue_worker_helmet: rescue_worker_helmet,
	school_satchel: school_satchel,
	pouch: pouch,
	purse: purse,
	handbag: handbag,
	briefcase: briefcase,
	eyeglasses: eyeglasses,
	dark_sunglasses: dark_sunglasses,
	closed_umbrella: closed_umbrella,
	open_umbrella: open_umbrella,
	dog: dog,
	cat: cat,
	mouse: mouse,
	hamster: hamster,
	rabbit: rabbit,
	fox_face: fox_face,
	bear: bear,
	panda_face: panda_face,
	koala: koala,
	tiger: tiger,
	lion: lion,
	cow: cow,
	pig: pig,
	pig_nose: pig_nose,
	frog: frog,
	monkey_face: monkey_face,
	see_no_evil: see_no_evil,
	hear_no_evil: hear_no_evil,
	speak_no_evil: speak_no_evil,
	monkey: monkey,
	chicken: chicken,
	penguin: penguin,
	bird: bird,
	baby_chick: baby_chick,
	hatching_chick: hatching_chick,
	hatched_chick: hatched_chick,
	duck: duck,
	eagle: eagle,
	owl: owl,
	bat: bat,
	wolf: wolf,
	boar: boar,
	horse: horse,
	unicorn: unicorn,
	bee: bee,
	honeybee: honeybee,
	bug: bug,
	butterfly: butterfly,
	snail: snail,
	shell: shell,
	beetle: beetle,
	ant: ant,
	spider: spider,
	spider_web: spider_web,
	turtle: turtle,
	snake: snake,
	lizard: lizard,
	scorpion: scorpion,
	crab: crab,
	squid: squid,
	octopus: octopus,
	shrimp: shrimp,
	tropical_fish: tropical_fish,
	fish: fish,
	blowfish: blowfish,
	dolphin: dolphin,
	flipper: flipper,
	shark: shark,
	whale: whale,
	whale2: whale2,
	crocodile: crocodile,
	leopard: leopard,
	tiger2: tiger2,
	water_buffalo: water_buffalo,
	ox: ox,
	cow2: cow2,
	deer: deer,
	dromedary_camel: dromedary_camel,
	camel: camel,
	elephant: elephant,
	rhinoceros: rhinoceros,
	gorilla: gorilla,
	racehorse: racehorse,
	pig2: pig2,
	goat: goat,
	ram: ram,
	sheep: sheep,
	dog2: dog2,
	poodle: poodle,
	cat2: cat2,
	rooster: rooster,
	turkey: turkey,
	dove: dove,
	rabbit2: rabbit2,
	mouse2: mouse2,
	rat: rat,
	chipmunk: chipmunk,
	feet: feet,
	paw_prints: paw_prints,
	dragon: dragon,
	dragon_face: dragon_face,
	cactus: cactus,
	christmas_tree: christmas_tree,
	evergreen_tree: evergreen_tree,
	deciduous_tree: deciduous_tree,
	palm_tree: palm_tree,
	seedling: seedling,
	herb: herb,
	shamrock: shamrock,
	four_leaf_clover: four_leaf_clover,
	bamboo: bamboo,
	tanabata_tree: tanabata_tree,
	leaves: leaves,
	fallen_leaf: fallen_leaf,
	maple_leaf: maple_leaf,
	mushroom: mushroom,
	ear_of_rice: ear_of_rice,
	bouquet: bouquet,
	tulip: tulip,
	rose: rose,
	wilted_flower: wilted_flower,
	sunflower: sunflower,
	blossom: blossom,
	cherry_blossom: cherry_blossom,
	hibiscus: hibiscus,
	earth_americas: earth_americas,
	earth_africa: earth_africa,
	earth_asia: earth_asia,
	full_moon: full_moon,
	waning_gibbous_moon: waning_gibbous_moon,
	last_quarter_moon: last_quarter_moon,
	waning_crescent_moon: waning_crescent_moon,
	new_moon: new_moon,
	waxing_crescent_moon: waxing_crescent_moon,
	first_quarter_moon: first_quarter_moon,
	moon: moon,
	waxing_gibbous_moon: waxing_gibbous_moon,
	new_moon_with_face: new_moon_with_face,
	full_moon_with_face: full_moon_with_face,
	sun_with_face: sun_with_face,
	first_quarter_moon_with_face: first_quarter_moon_with_face,
	last_quarter_moon_with_face: last_quarter_moon_with_face,
	crescent_moon: crescent_moon,
	dizzy: dizzy,
	star: star,
	star2: star2,
	sparkles: sparkles,
	zap: zap,
	fire: fire,
	boom: boom,
	collision: collision,
	comet: comet,
	sunny: sunny,
	sun_behind_small_cloud: sun_behind_small_cloud,
	partly_sunny: partly_sunny,
	sun_behind_large_cloud: sun_behind_large_cloud,
	sun_behind_rain_cloud: sun_behind_rain_cloud,
	rainbow: rainbow,
	cloud: cloud,
	cloud_with_rain: cloud_with_rain,
	cloud_with_lightning_and_rain: cloud_with_lightning_and_rain,
	cloud_with_lightning: cloud_with_lightning,
	cloud_with_snow: cloud_with_snow,
	snowman_with_snow: snowman_with_snow,
	snowman: snowman,
	snowflake: snowflake,
	wind_face: wind_face,
	dash: dash,
	tornado: tornado,
	fog: fog,
	ocean: ocean,
	droplet: droplet,
	sweat_drops: sweat_drops,
	umbrella: umbrella,
	green_apple: green_apple,
	apple: apple,
	pear: pear,
	tangerine: tangerine,
	orange: orange,
	mandarin: mandarin,
	lemon: lemon,
	banana: banana,
	watermelon: watermelon,
	grapes: grapes,
	strawberry: strawberry,
	melon: melon,
	cherries: cherries,
	peach: peach,
	pineapple: pineapple,
	kiwi_fruit: kiwi_fruit,
	avocado: avocado,
	tomato: tomato,
	eggplant: eggplant,
	cucumber: cucumber,
	carrot: carrot,
	corn: corn,
	hot_pepper: hot_pepper,
	potato: potato,
	sweet_potato: sweet_potato,
	chestnut: chestnut,
	peanuts: peanuts,
	honey_pot: honey_pot,
	croissant: croissant,
	bread: bread,
	baguette_bread: baguette_bread,
	cheese: cheese,
	egg: egg,
	fried_egg: fried_egg,
	bacon: bacon,
	pancakes: pancakes,
	fried_shrimp: fried_shrimp,
	poultry_leg: poultry_leg,
	meat_on_bone: meat_on_bone,
	pizza: pizza,
	hotdog: hotdog,
	hamburger: hamburger,
	fries: fries,
	stuffed_flatbread: stuffed_flatbread,
	taco: taco,
	burrito: burrito,
	green_salad: green_salad,
	shallow_pan_of_food: shallow_pan_of_food,
	spaghetti: spaghetti,
	ramen: ramen,
	stew: stew,
	fish_cake: fish_cake,
	sushi: sushi,
	bento: bento,
	curry: curry,
	rice: rice,
	rice_ball: rice_ball,
	rice_cracker: rice_cracker,
	oden: oden,
	dango: dango,
	shaved_ice: shaved_ice,
	ice_cream: ice_cream,
	icecream: icecream,
	cake: cake,
	birthday: birthday,
	custard: custard,
	lollipop: lollipop,
	candy: candy,
	chocolate_bar: chocolate_bar,
	popcorn: popcorn,
	doughnut: doughnut,
	cookie: cookie,
	milk_glass: milk_glass,
	baby_bottle: baby_bottle,
	coffee: coffee,
	tea: tea,
	sake: sake,
	beer: beer,
	beers: beers,
	clinking_glasses: clinking_glasses,
	wine_glass: wine_glass,
	tumbler_glass: tumbler_glass,
	cocktail: cocktail,
	tropical_drink: tropical_drink,
	champagne: champagne,
	spoon: spoon,
	fork_and_knife: fork_and_knife,
	plate_with_cutlery: plate_with_cutlery,
	soccer: soccer,
	basketball: basketball,
	football: football,
	baseball: baseball,
	tennis: tennis,
	volleyball: volleyball,
	rugby_football: rugby_football,
	"8ball": "🎱",
	ping_pong: ping_pong,
	badminton: badminton,
	goal_net: goal_net,
	ice_hockey: ice_hockey,
	field_hockey: field_hockey,
	cricket: cricket,
	golf: golf,
	bow_and_arrow: bow_and_arrow,
	fishing_pole_and_fish: fishing_pole_and_fish,
	boxing_glove: boxing_glove,
	martial_arts_uniform: martial_arts_uniform,
	ice_skate: ice_skate,
	ski: ski,
	skier: skier,
	snowboarder: snowboarder,
	weight_lifting_woman: weight_lifting_woman,
	weight_lifting_man: weight_lifting_man,
	person_fencing: person_fencing,
	women_wrestling: women_wrestling,
	men_wrestling: men_wrestling,
	woman_cartwheeling: woman_cartwheeling,
	man_cartwheeling: man_cartwheeling,
	basketball_woman: basketball_woman,
	basketball_man: basketball_man,
	woman_playing_handball: woman_playing_handball,
	man_playing_handball: man_playing_handball,
	golfing_woman: golfing_woman,
	golfing_man: golfing_man,
	surfing_woman: surfing_woman,
	surfing_man: surfing_man,
	surfer: surfer,
	swimming_woman: swimming_woman,
	swimming_man: swimming_man,
	swimmer: swimmer,
	woman_playing_water_polo: woman_playing_water_polo,
	man_playing_water_polo: man_playing_water_polo,
	rowing_woman: rowing_woman,
	rowing_man: rowing_man,
	rowboat: rowboat,
	horse_racing: horse_racing,
	biking_woman: biking_woman,
	biking_man: biking_man,
	bicyclist: bicyclist,
	mountain_biking_woman: mountain_biking_woman,
	mountain_biking_man: mountain_biking_man,
	mountain_bicyclist: mountain_bicyclist,
	running_shirt_with_sash: running_shirt_with_sash,
	medal_sports: medal_sports,
	medal_military: medal_military,
	"1st_place_medal": "🥇",
	"2nd_place_medal": "🥈",
	"3rd_place_medal": "🥉",
	trophy: trophy,
	rosette: rosette,
	reminder_ribbon: reminder_ribbon,
	ticket: ticket,
	tickets: tickets,
	circus_tent: circus_tent,
	woman_juggling: woman_juggling,
	man_juggling: man_juggling,
	performing_arts: performing_arts,
	art: art,
	clapper: clapper,
	microphone: microphone,
	headphones: headphones,
	musical_score: musical_score,
	musical_keyboard: musical_keyboard,
	drum: drum,
	saxophone: saxophone,
	trumpet: trumpet,
	guitar: guitar,
	violin: violin,
	game_die: game_die,
	dart: dart,
	bowling: bowling,
	video_game: video_game,
	slot_machine: slot_machine,
	car: car,
	red_car: red_car,
	taxi: taxi,
	blue_car: blue_car,
	bus: bus,
	trolleybus: trolleybus,
	racing_car: racing_car,
	police_car: police_car,
	ambulance: ambulance,
	fire_engine: fire_engine,
	minibus: minibus,
	truck: truck,
	articulated_lorry: articulated_lorry,
	tractor: tractor,
	kick_scooter: kick_scooter,
	bike: bike,
	motor_scooter: motor_scooter,
	motorcycle: motorcycle,
	rotating_light: rotating_light,
	oncoming_police_car: oncoming_police_car,
	oncoming_bus: oncoming_bus,
	oncoming_automobile: oncoming_automobile,
	oncoming_taxi: oncoming_taxi,
	aerial_tramway: aerial_tramway,
	mountain_cableway: mountain_cableway,
	suspension_railway: suspension_railway,
	railway_car: railway_car,
	train: train,
	mountain_railway: mountain_railway,
	monorail: monorail,
	bullettrain_side: bullettrain_side,
	bullettrain_front: bullettrain_front,
	light_rail: light_rail,
	steam_locomotive: steam_locomotive,
	train2: train2,
	metro: metro,
	tram: tram,
	station: station,
	helicopter: helicopter,
	small_airplane: small_airplane,
	airplane: airplane,
	flight_departure: flight_departure,
	flight_arrival: flight_arrival,
	rocket: rocket,
	artificial_satellite: artificial_satellite,
	seat: seat,
	canoe: canoe,
	boat: boat,
	sailboat: sailboat,
	motor_boat: motor_boat,
	speedboat: speedboat,
	passenger_ship: passenger_ship,
	ferry: ferry,
	ship: ship,
	anchor: anchor,
	construction: construction,
	fuelpump: fuelpump,
	busstop: busstop,
	vertical_traffic_light: vertical_traffic_light,
	traffic_light: traffic_light,
	world_map: world_map,
	moyai: moyai,
	statue_of_liberty: statue_of_liberty,
	fountain: fountain,
	tokyo_tower: tokyo_tower,
	european_castle: european_castle,
	japanese_castle: japanese_castle,
	stadium: stadium,
	ferris_wheel: ferris_wheel,
	roller_coaster: roller_coaster,
	carousel_horse: carousel_horse,
	parasol_on_ground: parasol_on_ground,
	beach_umbrella: beach_umbrella,
	desert_island: desert_island,
	mountain: mountain,
	mountain_snow: mountain_snow,
	mount_fuji: mount_fuji,
	volcano: volcano,
	desert: desert,
	camping: camping,
	tent: tent,
	railway_track: railway_track,
	motorway: motorway,
	building_construction: building_construction,
	factory: factory,
	house: house,
	house_with_garden: house_with_garden,
	houses: houses,
	derelict_house: derelict_house,
	office: office,
	department_store: department_store,
	post_office: post_office,
	european_post_office: european_post_office,
	hospital: hospital,
	bank: bank,
	hotel: hotel,
	convenience_store: convenience_store,
	school: school,
	love_hotel: love_hotel,
	wedding: wedding,
	classical_building: classical_building,
	church: church,
	mosque: mosque,
	synagogue: synagogue,
	kaaba: kaaba,
	shinto_shrine: shinto_shrine,
	japan: japan,
	rice_scene: rice_scene,
	national_park: national_park,
	sunrise: sunrise,
	sunrise_over_mountains: sunrise_over_mountains,
	stars: stars,
	sparkler: sparkler,
	fireworks: fireworks,
	city_sunrise: city_sunrise,
	city_sunset: city_sunset,
	cityscape: cityscape,
	night_with_stars: night_with_stars,
	milky_way: milky_way,
	bridge_at_night: bridge_at_night,
	foggy: foggy,
	watch: watch,
	iphone: iphone,
	calling: calling,
	computer: computer,
	keyboard: keyboard,
	desktop_computer: desktop_computer,
	printer: printer,
	computer_mouse: computer_mouse,
	trackball: trackball,
	joystick: joystick,
	clamp: clamp,
	minidisc: minidisc,
	floppy_disk: floppy_disk,
	cd: cd,
	dvd: dvd,
	vhs: vhs,
	camera: camera,
	camera_flash: camera_flash,
	video_camera: video_camera,
	movie_camera: movie_camera,
	film_projector: film_projector,
	film_strip: film_strip,
	telephone_receiver: telephone_receiver,
	phone: phone,
	telephone: telephone,
	pager: pager,
	fax: fax,
	tv: tv,
	radio: radio,
	studio_microphone: studio_microphone,
	level_slider: level_slider,
	control_knobs: control_knobs,
	stopwatch: stopwatch,
	timer_clock: timer_clock,
	alarm_clock: alarm_clock,
	mantelpiece_clock: mantelpiece_clock,
	hourglass: hourglass,
	hourglass_flowing_sand: hourglass_flowing_sand,
	satellite: satellite,
	battery: battery,
	electric_plug: electric_plug,
	bulb: bulb,
	flashlight: flashlight,
	candle: candle,
	wastebasket: wastebasket,
	oil_drum: oil_drum,
	money_with_wings: money_with_wings,
	dollar: dollar,
	yen: yen,
	euro: euro,
	pound: pound,
	moneybag: moneybag,
	credit_card: credit_card,
	gem: gem,
	balance_scale: balance_scale,
	wrench: wrench,
	hammer: hammer,
	hammer_and_pick: hammer_and_pick,
	hammer_and_wrench: hammer_and_wrench,
	pick: pick,
	nut_and_bolt: nut_and_bolt,
	gear: gear,
	chains: chains,
	gun: gun,
	bomb: bomb,
	hocho: hocho,
	knife: knife,
	dagger: dagger,
	crossed_swords: crossed_swords,
	shield: shield,
	smoking: smoking,
	coffin: coffin,
	funeral_urn: funeral_urn,
	amphora: amphora,
	crystal_ball: crystal_ball,
	prayer_beads: prayer_beads,
	barber: barber,
	alembic: alembic,
	telescope: telescope,
	microscope: microscope,
	hole: hole,
	pill: pill,
	syringe: syringe,
	thermometer: thermometer,
	toilet: toilet,
	potable_water: potable_water,
	shower: shower,
	bathtub: bathtub,
	bath: bath,
	bellhop_bell: bellhop_bell,
	key: key,
	old_key: old_key,
	door: door,
	couch_and_lamp: couch_and_lamp,
	bed: bed,
	sleeping_bed: sleeping_bed,
	framed_picture: framed_picture,
	shopping: shopping,
	shopping_cart: shopping_cart,
	gift: gift,
	balloon: balloon,
	flags: flags,
	ribbon: ribbon,
	confetti_ball: confetti_ball,
	tada: tada,
	dolls: dolls,
	izakaya_lantern: izakaya_lantern,
	lantern: lantern,
	wind_chime: wind_chime,
	email: email,
	envelope: envelope,
	envelope_with_arrow: envelope_with_arrow,
	incoming_envelope: incoming_envelope,
	"e-mail": "📧",
	love_letter: love_letter,
	inbox_tray: inbox_tray,
	outbox_tray: outbox_tray,
	"package": "📦",
	label: label,
	mailbox_closed: mailbox_closed,
	mailbox: mailbox,
	mailbox_with_mail: mailbox_with_mail,
	mailbox_with_no_mail: mailbox_with_no_mail,
	postbox: postbox,
	postal_horn: postal_horn,
	scroll: scroll,
	page_with_curl: page_with_curl,
	page_facing_up: page_facing_up,
	bookmark_tabs: bookmark_tabs,
	bar_chart: bar_chart,
	chart_with_upwards_trend: chart_with_upwards_trend,
	chart_with_downwards_trend: chart_with_downwards_trend,
	spiral_notepad: spiral_notepad,
	spiral_calendar: spiral_calendar,
	calendar: calendar,
	date: date,
	card_index: card_index,
	card_file_box: card_file_box,
	ballot_box: ballot_box,
	file_cabinet: file_cabinet,
	clipboard: clipboard,
	file_folder: file_folder,
	open_file_folder: open_file_folder,
	card_index_dividers: card_index_dividers,
	newspaper_roll: newspaper_roll,
	newspaper: newspaper,
	notebook: notebook,
	notebook_with_decorative_cover: notebook_with_decorative_cover,
	ledger: ledger,
	closed_book: closed_book,
	green_book: green_book,
	blue_book: blue_book,
	orange_book: orange_book,
	books: books,
	book: book,
	open_book: open_book,
	bookmark: bookmark,
	link: link,
	paperclip: paperclip,
	paperclips: paperclips,
	triangular_ruler: triangular_ruler,
	straight_ruler: straight_ruler,
	pushpin: pushpin,
	round_pushpin: round_pushpin,
	scissors: scissors,
	pen: pen,
	fountain_pen: fountain_pen,
	black_nib: black_nib,
	paintbrush: paintbrush,
	crayon: crayon,
	memo: memo,
	pencil: pencil,
	pencil2: pencil2,
	mag: mag,
	mag_right: mag_right,
	lock_with_ink_pen: lock_with_ink_pen,
	closed_lock_with_key: closed_lock_with_key,
	lock: lock,
	unlock: unlock,
	heart: heart,
	yellow_heart: yellow_heart,
	green_heart: green_heart,
	blue_heart: blue_heart,
	purple_heart: purple_heart,
	black_heart: black_heart,
	broken_heart: broken_heart,
	heavy_heart_exclamation: heavy_heart_exclamation,
	two_hearts: two_hearts,
	revolving_hearts: revolving_hearts,
	heartbeat: heartbeat,
	heartpulse: heartpulse,
	sparkling_heart: sparkling_heart,
	cupid: cupid,
	gift_heart: gift_heart,
	heart_decoration: heart_decoration,
	peace_symbol: peace_symbol,
	latin_cross: latin_cross,
	star_and_crescent: star_and_crescent,
	om: om,
	wheel_of_dharma: wheel_of_dharma,
	star_of_david: star_of_david,
	six_pointed_star: six_pointed_star,
	menorah: menorah,
	yin_yang: yin_yang,
	orthodox_cross: orthodox_cross,
	place_of_worship: place_of_worship,
	ophiuchus: ophiuchus,
	aries: aries,
	taurus: taurus,
	gemini: gemini,
	cancer: cancer,
	leo: leo,
	virgo: virgo,
	libra: libra,
	scorpius: scorpius,
	sagittarius: sagittarius,
	capricorn: capricorn,
	aquarius: aquarius,
	pisces: pisces,
	id: id,
	atom_symbol: atom_symbol,
	accept: accept,
	radioactive: radioactive,
	biohazard: biohazard,
	mobile_phone_off: mobile_phone_off,
	vibration_mode: vibration_mode,
	eight_pointed_black_star: eight_pointed_black_star,
	vs: vs,
	white_flower: white_flower,
	ideograph_advantage: ideograph_advantage,
	secret: secret,
	congratulations: congratulations,
	u6e80: u6e80,
	a: a,
	b: b,
	ab: ab,
	cl: cl,
	o2: o2,
	sos: sos,
	x: x,
	o: o,
	stop_sign: stop_sign,
	no_entry: no_entry,
	name_badge: name_badge,
	no_entry_sign: no_entry_sign,
	anger: anger,
	hotsprings: hotsprings,
	no_pedestrians: no_pedestrians,
	do_not_litter: do_not_litter,
	no_bicycles: no_bicycles,
	"non-potable_water": "🚱",
	underage: underage,
	no_mobile_phones: no_mobile_phones,
	no_smoking: no_smoking,
	exclamation: exclamation,
	heavy_exclamation_mark: heavy_exclamation_mark,
	grey_exclamation: grey_exclamation,
	question: question,
	grey_question: grey_question,
	bangbang: bangbang,
	interrobang: interrobang,
	low_brightness: low_brightness,
	high_brightness: high_brightness,
	part_alternation_mark: part_alternation_mark,
	warning: warning,
	children_crossing: children_crossing,
	trident: trident,
	fleur_de_lis: fleur_de_lis,
	beginner: beginner,
	recycle: recycle,
	white_check_mark: white_check_mark,
	chart: chart,
	sparkle: sparkle,
	eight_spoked_asterisk: eight_spoked_asterisk,
	negative_squared_cross_mark: negative_squared_cross_mark,
	globe_with_meridians: globe_with_meridians,
	diamond_shape_with_a_dot_inside: diamond_shape_with_a_dot_inside,
	m: m,
	cyclone: cyclone,
	zzz: zzz,
	atm: atm,
	wc: wc,
	wheelchair: wheelchair,
	parking: parking,
	sa: sa,
	passport_control: passport_control,
	customs: customs,
	baggage_claim: baggage_claim,
	left_luggage: left_luggage,
	mens: mens,
	womens: womens,
	baby_symbol: baby_symbol,
	restroom: restroom,
	put_litter_in_its_place: put_litter_in_its_place,
	cinema: cinema,
	signal_strength: signal_strength,
	koko: koko,
	symbols: symbols,
	information_source: information_source,
	abc: abc,
	abcd: abcd,
	capital_abcd: capital_abcd,
	ng: ng,
	ok: ok,
	up: up,
	cool: cool,
	"new": "🆕",
	free: free,
	zero: zero,
	one: one,
	two: two,
	three: three,
	four: four,
	five: five,
	six: six,
	seven: seven,
	eight: eight,
	nine: nine,
	keycap_ten: keycap_ten,
	hash: hash,
	asterisk: asterisk,
	arrow_forward: arrow_forward,
	pause_button: pause_button,
	play_or_pause_button: play_or_pause_button,
	stop_button: stop_button,
	record_button: record_button,
	next_track_button: next_track_button,
	previous_track_button: previous_track_button,
	fast_forward: fast_forward,
	rewind: rewind,
	arrow_double_up: arrow_double_up,
	arrow_double_down: arrow_double_down,
	arrow_backward: arrow_backward,
	arrow_up_small: arrow_up_small,
	arrow_down_small: arrow_down_small,
	arrow_right: arrow_right,
	arrow_left: arrow_left,
	arrow_up: arrow_up,
	arrow_down: arrow_down,
	arrow_upper_right: arrow_upper_right,
	arrow_lower_right: arrow_lower_right,
	arrow_lower_left: arrow_lower_left,
	arrow_upper_left: arrow_upper_left,
	arrow_up_down: arrow_up_down,
	left_right_arrow: left_right_arrow,
	arrow_right_hook: arrow_right_hook,
	leftwards_arrow_with_hook: leftwards_arrow_with_hook,
	arrow_heading_up: arrow_heading_up,
	arrow_heading_down: arrow_heading_down,
	twisted_rightwards_arrows: twisted_rightwards_arrows,
	repeat: repeat,
	repeat_one: repeat_one,
	arrows_counterclockwise: arrows_counterclockwise,
	arrows_clockwise: arrows_clockwise,
	musical_note: musical_note,
	notes: notes,
	heavy_plus_sign: heavy_plus_sign,
	heavy_minus_sign: heavy_minus_sign,
	heavy_division_sign: heavy_division_sign,
	heavy_multiplication_x: heavy_multiplication_x,
	heavy_dollar_sign: heavy_dollar_sign,
	currency_exchange: currency_exchange,
	tm: tm,
	copyright: copyright,
	registered: registered,
	wavy_dash: wavy_dash,
	curly_loop: curly_loop,
	loop: loop,
	end: end,
	back: back,
	on: on,
	top: top,
	soon: soon,
	heavy_check_mark: heavy_check_mark,
	ballot_box_with_check: ballot_box_with_check,
	radio_button: radio_button,
	white_circle: white_circle,
	black_circle: black_circle,
	red_circle: red_circle,
	large_blue_circle: large_blue_circle,
	small_red_triangle: small_red_triangle,
	small_red_triangle_down: small_red_triangle_down,
	small_orange_diamond: small_orange_diamond,
	small_blue_diamond: small_blue_diamond,
	large_orange_diamond: large_orange_diamond,
	large_blue_diamond: large_blue_diamond,
	white_square_button: white_square_button,
	black_square_button: black_square_button,
	black_small_square: black_small_square,
	white_small_square: white_small_square,
	black_medium_small_square: black_medium_small_square,
	white_medium_small_square: white_medium_small_square,
	black_medium_square: black_medium_square,
	white_medium_square: white_medium_square,
	black_large_square: black_large_square,
	white_large_square: white_large_square,
	speaker: speaker,
	mute: mute,
	sound: sound,
	loud_sound: loud_sound,
	bell: bell,
	no_bell: no_bell,
	mega: mega,
	loudspeaker: loudspeaker,
	eye_speech_bubble: eye_speech_bubble,
	speech_balloon: speech_balloon,
	thought_balloon: thought_balloon,
	right_anger_bubble: right_anger_bubble,
	spades: spades,
	clubs: clubs,
	hearts: hearts,
	diamonds: diamonds,
	black_joker: black_joker,
	flower_playing_cards: flower_playing_cards,
	mahjong: mahjong,
	clock1: clock1,
	clock2: clock2,
	clock3: clock3,
	clock4: clock4,
	clock5: clock5,
	clock6: clock6,
	clock7: clock7,
	clock8: clock8,
	clock9: clock9,
	clock10: clock10,
	clock11: clock11,
	clock12: clock12,
	clock130: clock130,
	clock230: clock230,
	clock330: clock330,
	clock430: clock430,
	clock530: clock530,
	clock630: clock630,
	clock730: clock730,
	clock830: clock830,
	clock930: clock930,
	clock1030: clock1030,
	clock1130: clock1130,
	clock1230: clock1230,
	white_flag: white_flag,
	black_flag: black_flag,
	checkered_flag: checkered_flag,
	triangular_flag_on_post: triangular_flag_on_post,
	rainbow_flag: rainbow_flag,
	afghanistan: afghanistan,
	aland_islands: aland_islands,
	albania: albania,
	algeria: algeria,
	american_samoa: american_samoa,
	andorra: andorra,
	angola: angola,
	anguilla: anguilla,
	antarctica: antarctica,
	antigua_barbuda: antigua_barbuda,
	argentina: argentina,
	armenia: armenia,
	aruba: aruba,
	australia: australia,
	austria: austria,
	azerbaijan: azerbaijan,
	bahamas: bahamas,
	bahrain: bahrain,
	bangladesh: bangladesh,
	barbados: barbados,
	belarus: belarus,
	belgium: belgium,
	belize: belize,
	benin: benin,
	bermuda: bermuda,
	bhutan: bhutan,
	bolivia: bolivia,
	caribbean_netherlands: caribbean_netherlands,
	bosnia_herzegovina: bosnia_herzegovina,
	botswana: botswana,
	brazil: brazil,
	british_indian_ocean_territory: british_indian_ocean_territory,
	british_virgin_islands: british_virgin_islands,
	brunei: brunei,
	bulgaria: bulgaria,
	burkina_faso: burkina_faso,
	burundi: burundi,
	cape_verde: cape_verde,
	cambodia: cambodia,
	cameroon: cameroon,
	canada: canada,
	canary_islands: canary_islands,
	cayman_islands: cayman_islands,
	central_african_republic: central_african_republic,
	chad: chad,
	chile: chile,
	cn: cn,
	christmas_island: christmas_island,
	cocos_islands: cocos_islands,
	colombia: colombia,
	comoros: comoros,
	congo_brazzaville: congo_brazzaville,
	congo_kinshasa: congo_kinshasa,
	cook_islands: cook_islands,
	costa_rica: costa_rica,
	cote_divoire: cote_divoire,
	croatia: croatia,
	cuba: cuba,
	curacao: curacao,
	cyprus: cyprus,
	czech_republic: czech_republic,
	denmark: denmark,
	djibouti: djibouti,
	dominica: dominica,
	dominican_republic: dominican_republic,
	ecuador: ecuador,
	egypt: egypt,
	el_salvador: el_salvador,
	equatorial_guinea: equatorial_guinea,
	eritrea: eritrea,
	estonia: estonia,
	ethiopia: ethiopia,
	eu: eu,
	european_union: european_union,
	falkland_islands: falkland_islands,
	faroe_islands: faroe_islands,
	fiji: fiji,
	finland: finland,
	fr: fr,
	french_guiana: french_guiana,
	french_polynesia: french_polynesia,
	french_southern_territories: french_southern_territories,
	gabon: gabon,
	gambia: gambia,
	georgia: georgia,
	de: de,
	ghana: ghana,
	gibraltar: gibraltar,
	greece: greece,
	greenland: greenland,
	grenada: grenada,
	guadeloupe: guadeloupe,
	guam: guam,
	guatemala: guatemala,
	guernsey: guernsey,
	guinea: guinea,
	guinea_bissau: guinea_bissau,
	guyana: guyana,
	haiti: haiti,
	honduras: honduras,
	hong_kong: hong_kong,
	hungary: hungary,
	iceland: iceland,
	india: india,
	indonesia: indonesia,
	iran: iran,
	iraq: iraq,
	ireland: ireland,
	isle_of_man: isle_of_man,
	israel: israel,
	it: it,
	jamaica: jamaica,
	jp: jp,
	crossed_flags: crossed_flags,
	jersey: jersey,
	jordan: jordan,
	kazakhstan: kazakhstan,
	kenya: kenya,
	kiribati: kiribati,
	kosovo: kosovo,
	kuwait: kuwait,
	kyrgyzstan: kyrgyzstan,
	laos: laos,
	latvia: latvia,
	lebanon: lebanon,
	lesotho: lesotho,
	liberia: liberia,
	libya: libya,
	liechtenstein: liechtenstein,
	lithuania: lithuania,
	luxembourg: luxembourg,
	macau: macau,
	macedonia: macedonia,
	madagascar: madagascar,
	malawi: malawi,
	malaysia: malaysia,
	maldives: maldives,
	mali: mali,
	malta: malta,
	marshall_islands: marshall_islands,
	martinique: martinique,
	mauritania: mauritania,
	mauritius: mauritius,
	mayotte: mayotte,
	mexico: mexico,
	micronesia: micronesia,
	moldova: moldova,
	monaco: monaco,
	mongolia: mongolia,
	montenegro: montenegro,
	montserrat: montserrat,
	morocco: morocco,
	mozambique: mozambique,
	myanmar: myanmar,
	namibia: namibia,
	nauru: nauru,
	nepal: nepal,
	netherlands: netherlands,
	new_caledonia: new_caledonia,
	new_zealand: new_zealand,
	nicaragua: nicaragua,
	niger: niger,
	nigeria: nigeria,
	niue: niue,
	norfolk_island: norfolk_island,
	northern_mariana_islands: northern_mariana_islands,
	north_korea: north_korea,
	norway: norway,
	oman: oman,
	pakistan: pakistan,
	palau: palau,
	palestinian_territories: palestinian_territories,
	panama: panama,
	papua_new_guinea: papua_new_guinea,
	paraguay: paraguay,
	peru: peru,
	philippines: philippines,
	pitcairn_islands: pitcairn_islands,
	poland: poland,
	portugal: portugal,
	puerto_rico: puerto_rico,
	qatar: qatar,
	reunion: reunion,
	romania: romania,
	ru: ru,
	rwanda: rwanda,
	st_barthelemy: st_barthelemy,
	st_helena: st_helena,
	st_kitts_nevis: st_kitts_nevis,
	st_lucia: st_lucia,
	st_pierre_miquelon: st_pierre_miquelon,
	st_vincent_grenadines: st_vincent_grenadines,
	samoa: samoa,
	san_marino: san_marino,
	sao_tome_principe: sao_tome_principe,
	saudi_arabia: saudi_arabia,
	senegal: senegal,
	serbia: serbia,
	seychelles: seychelles,
	sierra_leone: sierra_leone,
	singapore: singapore,
	sint_maarten: sint_maarten,
	slovakia: slovakia,
	slovenia: slovenia,
	solomon_islands: solomon_islands,
	somalia: somalia,
	south_africa: south_africa,
	south_georgia_south_sandwich_islands: south_georgia_south_sandwich_islands,
	kr: kr,
	south_sudan: south_sudan,
	es: es,
	sri_lanka: sri_lanka,
	sudan: sudan,
	suriname: suriname,
	swaziland: swaziland,
	sweden: sweden,
	switzerland: switzerland,
	syria: syria,
	taiwan: taiwan,
	tajikistan: tajikistan,
	tanzania: tanzania,
	thailand: thailand,
	timor_leste: timor_leste,
	togo: togo,
	tokelau: tokelau,
	tonga: tonga,
	trinidad_tobago: trinidad_tobago,
	tunisia: tunisia,
	tr: tr,
	turkmenistan: turkmenistan,
	turks_caicos_islands: turks_caicos_islands,
	tuvalu: tuvalu,
	uganda: uganda,
	ukraine: ukraine,
	united_arab_emirates: united_arab_emirates,
	gb: gb,
	uk: uk,
	us: us,
	us_virgin_islands: us_virgin_islands,
	uruguay: uruguay,
	uzbekistan: uzbekistan,
	vanuatu: vanuatu,
	vatican_city: vatican_city,
	venezuela: venezuela,
	vietnam: vietnam,
	wallis_futuna: wallis_futuna,
	western_sahara: western_sahara,
	yemen: yemen,
	zambia: zambia,
	zimbabwe: zimbabwe
};

var shortcuts = {
  angry: ['>:(', '>:-('],
  blush: [':")', ':-")'],
  broken_heart: ['</3', '<\\3'],
  // :\ and :-\ not used because of conflict with markdown escaping
  confused: [':/', ':-/'],
  // twemoji shows question
  cry: [":'(", ":'-(", ':,(', ':,-('],
  frowning: [':(', ':-('],
  heart: ['<3'],
  imp: [']:(', ']:-('],
  innocent: ['o:)', 'O:)', 'o:-)', 'O:-)', '0:)', '0:-)'],
  joy: [":')", ":'-)", ':,)', ':,-)', ":'D", ":'-D", ':,D', ':,-D'],
  kissing: [':*', ':-*'],
  laughing: ['x-)', 'X-)'],
  neutral_face: [':|', ':-|'],
  open_mouth: [':o', ':-o', ':O', ':-O'],
  rage: [':@', ':-@'],
  smile: [':D', ':-D'],
  smiley: [':)', ':-)'],
  smiling_imp: [']:)', ']:-)'],
  sob: [":,'(", ":,'-(", ';(', ';-('],
  stuck_out_tongue: [':P', ':-P'],
  sunglasses: ['8-)', 'B-)'],
  sweat: [',:(', ',:-('],
  sweat_smile: [',:)', ',:-)'],
  unamused: [':s', ':-S', ':z', ':-Z', ':$', ':-$'],
  wink: [';)', ';-)']
};

var render = function emoji_html(tokens, idx
/*, options, env */
) {
  return tokens[idx].content;
};

var replace = function create_rule(md, emojies, shortcuts, scanRE, replaceRE) {
  var arrayReplaceAt = md.utils.arrayReplaceAt,
      ucm = md.utils.lib.ucmicro,
      ZPCc = new RegExp([ucm.Z.source, ucm.P.source, ucm.Cc.source].join('|'));

  function splitTextToken(text, level, Token) {
    var token,
        last_pos = 0,
        nodes = [];
    text.replace(replaceRE, function (match, offset, src) {
      var emoji_name; // Validate emoji name

      if (shortcuts.hasOwnProperty(match)) {
        // replace shortcut with full name
        emoji_name = shortcuts[match]; // Don't allow letters before any shortcut (as in no ":/" in http://)

        if (offset > 0 && !ZPCc.test(src[offset - 1])) {
          return;
        } // Don't allow letters after any shortcut


        if (offset + match.length < src.length && !ZPCc.test(src[offset + match.length])) {
          return;
        }
      } else {
        emoji_name = match.slice(1, -1);
      } // Add new tokens to pending list


      if (offset > last_pos) {
        token = new Token('text', '', 0);
        token.content = text.slice(last_pos, offset);
        nodes.push(token);
      }

      token = new Token('emoji', '', 0);
      token.markup = emoji_name;
      token.content = emojies[emoji_name];
      nodes.push(token);
      last_pos = offset + match.length;
    });

    if (last_pos < text.length) {
      token = new Token('text', '', 0);
      token.content = text.slice(last_pos);
      nodes.push(token);
    }

    return nodes;
  }

  return function emoji_replace(state) {
    var i,
        j,
        l,
        tokens,
        token,
        blockTokens = state.tokens,
        autolinkLevel = 0;

    for (j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== 'inline') {
        continue;
      }

      tokens = blockTokens[j].children; // We scan from the end, to keep position when new tags added.
      // Use reversed logic in links start/end match

      for (i = tokens.length - 1; i >= 0; i--) {
        token = tokens[i];

        if (token.type === 'link_open' || token.type === 'link_close') {
          if (token.info === 'auto') {
            autolinkLevel -= token.nesting;
          }
        }

        if (token.type === 'text' && autolinkLevel === 0 && scanRE.test(token.content)) {
          // replace current node
          blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, splitTextToken(token.content, token.level, state.Token));
        }
      }
    }
  };
};

function quoteRE(str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}

var normalize_opts$1 = function normalize_opts(options) {
  var emojies = options.defs,
      shortcuts; // Filter emojies by whitelist, if needed

  if (options.enabled.length) {
    emojies = Object.keys(emojies).reduce(function (acc, key) {
      if (options.enabled.indexOf(key) >= 0) {
        acc[key] = emojies[key];
      }

      return acc;
    }, {});
  } // Flatten shortcuts to simple object: { alias: emoji_name }


  shortcuts = Object.keys(options.shortcuts).reduce(function (acc, key) {
    // Skip aliases for filtered emojies, to reduce regexp
    if (!emojies[key]) {
      return acc;
    }

    if (Array.isArray(options.shortcuts[key])) {
      options.shortcuts[key].forEach(function (alias) {
        acc[alias] = key;
      });
      return acc;
    }

    acc[options.shortcuts[key]] = key;
    return acc;
  }, {}); // Compile regexp

  var names = Object.keys(emojies).map(function (name) {
    return ':' + name + ':';
  }).concat(Object.keys(shortcuts)).sort().reverse().map(function (name) {
    return quoteRE(name);
  }).join('|');
  var scanRE = RegExp(names);
  var replaceRE = RegExp(names, 'g');
  return {
    defs: emojies,
    shortcuts: shortcuts,
    scanRE: scanRE,
    replaceRE: replaceRE
  };
};

var emojies_defs = require$$0;
var emojies_shortcuts = shortcuts;
var emoji_html = render;
var emoji_replace = replace;
var normalize_opts = normalize_opts$1;

var markdownItEmoji = function emoji_plugin(md, options) {
  var defaults = {
    defs: emojies_defs,
    shortcuts: emojies_shortcuts,
    enabled: []
  };
  var opts = normalize_opts(md.utils.assign({}, defaults, options || {}));
  md.renderer.rules.emoji = emoji_html;
  md.core.ruler.push('emoji', emoji_replace(md, opts.defs, opts.shortcuts, opts.scanRE, opts.replaceRE));
};

var UNESCAPE_RE$1 = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

function subscript(state, silent) {
  var found,
      content,
      token,
      max = state.posMax,
      start = state.pos;

  if (state.src.charCodeAt(start) !== 0x7E
  /* ~ */
  ) {
    return false;
  }

  if (silent) {
    return false;
  } // don't run any pairs in validation mode


  if (start + 2 >= max) {
    return false;
  }

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x7E
    /* ~ */
    ) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 1, state.pos); // don't allow unescaped spaces/newlines inside

  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  } // found!


  state.posMax = state.pos;
  state.pos = start + 1; // Earlier we checked !silent, but this implementation does not need it

  token = state.push('sub_open', 'sub', 1);
  token.markup = '~';
  token = state.push('text', '', 0);
  token.content = content.replace(UNESCAPE_RE$1, '$1');
  token = state.push('sub_close', 'sub', -1);
  token.markup = '~';
  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
}

var markdownItSub = function sub_plugin(md) {
  md.inline.ruler.after('emphasis', 'sub', subscript);
};

var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

function superscript(state, silent) {
  var found,
      content,
      token,
      max = state.posMax,
      start = state.pos;

  if (state.src.charCodeAt(start) !== 0x5E
  /* ^ */
  ) {
    return false;
  }

  if (silent) {
    return false;
  } // don't run any pairs in validation mode


  if (start + 2 >= max) {
    return false;
  }

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x5E
    /* ^ */
    ) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 1, state.pos); // don't allow unescaped spaces/newlines inside

  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  } // found!


  state.posMax = state.pos;
  state.pos = start + 1; // Earlier we checked !silent, but this implementation does not need it

  token = state.push('sup_open', 'sup', 1);
  token.markup = '^';
  token = state.push('text', '', 0);
  token.content = content.replace(UNESCAPE_RE, '$1');
  token = state.push('sup_close', 'sup', -1);
  token.markup = '^';
  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
}

var markdownItSup = function sup_plugin(md) {
  md.inline.ruler.after('emphasis', 'sup', superscript);
};

var markdownItDeflist = function deflist_plugin(md) {
  var isSpace = md.utils.isSpace; // Search `[:~][\n ]`, returns next pos after marker on success
  // or -1 on fail.

  function skipMarker(state, line) {
    var pos,
        marker,
        start = state.bMarks[line] + state.tShift[line],
        max = state.eMarks[line];

    if (start >= max) {
      return -1;
    } // Check bullet


    marker = state.src.charCodeAt(start++);

    if (marker !== 0x7E
    /* ~ */
    && marker !== 0x3A
    /* : */
    ) {
      return -1;
    }

    pos = state.skipSpaces(start); // require space after ":"

    if (start === pos) {
      return -1;
    } // no empty definitions, e.g. "  : "


    if (pos >= max) {
      return -1;
    }

    return start;
  }

  function markTightParagraphs(state, idx) {
    var i,
        l,
        level = state.level + 2;

    for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
      if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
        state.tokens[i + 2].hidden = true;
        state.tokens[i].hidden = true;
        i += 2;
      }
    }
  }

  function deflist(state, startLine, endLine, silent) {
    var ch, contentStart, ddLine, dtLine, itemLines, listLines, listTokIdx, max, nextLine, offset, oldDDIndent, oldIndent, oldParentType, oldSCount, oldTShift, oldTight, pos, prevEmptyEnd, tight, token;

    if (silent) {
      // quirk: validation mode validates a dd block only, not a whole deflist
      if (state.ddIndent < 0) {
        return false;
      }

      return skipMarker(state, startLine) >= 0;
    }

    nextLine = startLine + 1;

    if (nextLine >= endLine) {
      return false;
    }

    if (state.isEmpty(nextLine)) {
      nextLine++;

      if (nextLine >= endLine) {
        return false;
      }
    }

    if (state.sCount[nextLine] < state.blkIndent) {
      return false;
    }

    contentStart = skipMarker(state, nextLine);

    if (contentStart < 0) {
      return false;
    } // Start list


    listTokIdx = state.tokens.length;
    tight = true;
    token = state.push('dl_open', 'dl', 1);
    token.map = listLines = [startLine, 0]; //
    // Iterate list items
    //

    dtLine = startLine;
    ddLine = nextLine; // One definition list can contain multiple DTs,
    // and one DT can be followed by multiple DDs.
    //
    // Thus, there is two loops here, and label is
    // needed to break out of the second one
    //

    /*eslint no-labels:0,block-scoped-var:0*/

    OUTER: for (;;) {
      prevEmptyEnd = false;
      token = state.push('dt_open', 'dt', 1);
      token.map = [dtLine, dtLine];
      token = state.push('inline', '', 0);
      token.map = [dtLine, dtLine];
      token.content = state.getLines(dtLine, dtLine + 1, state.blkIndent, false).trim();
      token.children = [];
      token = state.push('dt_close', 'dt', -1);

      for (;;) {
        token = state.push('dd_open', 'dd', 1);
        token.map = itemLines = [nextLine, 0];
        pos = contentStart;
        max = state.eMarks[ddLine];
        offset = state.sCount[ddLine] + contentStart - (state.bMarks[ddLine] + state.tShift[ddLine]);

        while (pos < max) {
          ch = state.src.charCodeAt(pos);

          if (isSpace(ch)) {
            if (ch === 0x09) {
              offset += 4 - offset % 4;
            } else {
              offset++;
            }
          } else {
            break;
          }

          pos++;
        }

        contentStart = pos;
        oldTight = state.tight;
        oldDDIndent = state.ddIndent;
        oldIndent = state.blkIndent;
        oldTShift = state.tShift[ddLine];
        oldSCount = state.sCount[ddLine];
        oldParentType = state.parentType;
        state.blkIndent = state.ddIndent = state.sCount[ddLine] + 2;
        state.tShift[ddLine] = contentStart - state.bMarks[ddLine];
        state.sCount[ddLine] = offset;
        state.tight = true;
        state.parentType = 'deflist';
        state.md.block.tokenize(state, ddLine, endLine, true); // If any of list item is tight, mark list as tight

        if (!state.tight || prevEmptyEnd) {
          tight = false;
        } // Item become loose if finish with empty line,
        // but we should filter last element, because it means list finish


        prevEmptyEnd = state.line - ddLine > 1 && state.isEmpty(state.line - 1);
        state.tShift[ddLine] = oldTShift;
        state.sCount[ddLine] = oldSCount;
        state.tight = oldTight;
        state.parentType = oldParentType;
        state.blkIndent = oldIndent;
        state.ddIndent = oldDDIndent;
        token = state.push('dd_close', 'dd', -1);
        itemLines[1] = nextLine = state.line;

        if (nextLine >= endLine) {
          break OUTER;
        }

        if (state.sCount[nextLine] < state.blkIndent) {
          break OUTER;
        }

        contentStart = skipMarker(state, nextLine);

        if (contentStart < 0) {
          break;
        }

        ddLine = nextLine; // go to the next loop iteration:
        // insert DD tag and repeat checking
      }

      if (nextLine >= endLine) {
        break;
      }

      dtLine = nextLine;

      if (state.isEmpty(dtLine)) {
        break;
      }

      if (state.sCount[dtLine] < state.blkIndent) {
        break;
      }

      ddLine = dtLine + 1;

      if (ddLine >= endLine) {
        break;
      }

      if (state.isEmpty(ddLine)) {
        ddLine++;
      }

      if (ddLine >= endLine) {
        break;
      }

      if (state.sCount[ddLine] < state.blkIndent) {
        break;
      }

      contentStart = skipMarker(state, ddLine);

      if (contentStart < 0) {
        break;
      } // go to the next loop iteration:
      // insert DT and DD tags and repeat checking

    } // Finilize list


    token = state.push('dl_close', 'dl', -1);
    listLines[1] = nextLine;
    state.line = nextLine; // mark paragraphs tight if needed

    if (tight) {
      markTightParagraphs(state, listTokIdx);
    }

    return true;
  }

  md.block.ruler.before('paragraph', 'deflist', deflist, {
    alt: ['paragraph', 'reference']
  });
};

var markdownItAbbr = function sub_plugin(md) {
  var escapeRE = md.utils.escapeRE,
      arrayReplaceAt = md.utils.arrayReplaceAt; // ASCII characters in Cc, Sc, Sm, Sk categories we should terminate on;
  // you can check character classes here:
  // http://www.unicode.org/Public/UNIDATA/UnicodeData.txt

  var OTHER_CHARS = ' \r\n$+<=>^`|~';
  var UNICODE_PUNCT_RE = md.utils.lib.ucmicro.P.source;
  var UNICODE_SPACE_RE = md.utils.lib.ucmicro.Z.source;

  function abbr_def(state, startLine, endLine, silent) {
    var label,
        title,
        ch,
        labelStart,
        labelEnd,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    if (pos + 2 >= max) {
      return false;
    }

    if (state.src.charCodeAt(pos++) !== 0x2A
    /* * */
    ) {
      return false;
    }

    if (state.src.charCodeAt(pos++) !== 0x5B
    /* [ */
    ) {
      return false;
    }

    labelStart = pos;

    for (; pos < max; pos++) {
      ch = state.src.charCodeAt(pos);

      if (ch === 0x5B
      /* [ */
      ) {
        return false;
      } else if (ch === 0x5D
      /* ] */
      ) {
        labelEnd = pos;
        break;
      } else if (ch === 0x5C
      /* \ */
      ) {
        pos++;
      }
    }

    if (labelEnd < 0 || state.src.charCodeAt(labelEnd + 1) !== 0x3A
    /* : */
    ) {
      return false;
    }

    if (silent) {
      return true;
    }

    label = state.src.slice(labelStart, labelEnd).replace(/\\(.)/g, '$1');
    title = state.src.slice(labelEnd + 2, max).trim();

    if (label.length === 0) {
      return false;
    }

    if (title.length === 0) {
      return false;
    }

    if (!state.env.abbreviations) {
      state.env.abbreviations = {};
    } // prepend ':' to avoid conflict with Object.prototype members


    if (typeof state.env.abbreviations[':' + label] === 'undefined') {
      state.env.abbreviations[':' + label] = title;
    }

    state.line = startLine + 1;
    return true;
  }

  function abbr_replace(state) {
    var i,
        j,
        l,
        tokens,
        token,
        text,
        nodes,
        pos,
        reg,
        m,
        regText,
        regSimple,
        currentToken,
        blockTokens = state.tokens;

    if (!state.env.abbreviations) {
      return;
    }

    regSimple = new RegExp('(?:' + Object.keys(state.env.abbreviations).map(function (x) {
      return x.substr(1);
    }).sort(function (a, b) {
      return b.length - a.length;
    }).map(escapeRE).join('|') + ')');
    regText = '(^|' + UNICODE_PUNCT_RE + '|' + UNICODE_SPACE_RE + '|[' + OTHER_CHARS.split('').map(escapeRE).join('') + '])' + '(' + Object.keys(state.env.abbreviations).map(function (x) {
      return x.substr(1);
    }).sort(function (a, b) {
      return b.length - a.length;
    }).map(escapeRE).join('|') + ')' + '($|' + UNICODE_PUNCT_RE + '|' + UNICODE_SPACE_RE + '|[' + OTHER_CHARS.split('').map(escapeRE).join('') + '])';
    reg = new RegExp(regText, 'g');

    for (j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== 'inline') {
        continue;
      }

      tokens = blockTokens[j].children; // We scan from the end, to keep position when new tags added.

      for (i = tokens.length - 1; i >= 0; i--) {
        currentToken = tokens[i];

        if (currentToken.type !== 'text') {
          continue;
        }

        pos = 0;
        text = currentToken.content;
        reg.lastIndex = 0;
        nodes = []; // fast regexp run to determine whether there are any abbreviated words
        // in the current token

        if (!regSimple.test(text)) {
          continue;
        }

        while (m = reg.exec(text)) {
          if (m.index > 0 || m[1].length > 0) {
            token = new state.Token('text', '', 0);
            token.content = text.slice(pos, m.index + m[1].length);
            nodes.push(token);
          }

          token = new state.Token('abbr_open', 'abbr', 1);
          token.attrs = [['title', state.env.abbreviations[':' + m[2]]]];
          nodes.push(token);
          token = new state.Token('text', '', 0);
          token.content = m[2];
          nodes.push(token);
          token = new state.Token('abbr_close', 'abbr', -1);
          nodes.push(token);
          reg.lastIndex -= m[3].length;
          pos = reg.lastIndex;
        }

        if (!nodes.length) {
          continue;
        }

        if (pos < text.length) {
          token = new state.Token('text', '', 0);
          token.content = text.slice(pos);
          nodes.push(token);
        } // replace current node


        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }

  md.block.ruler.before('reference', 'abbr_def', abbr_def, {
    alt: ['paragraph', 'reference']
  });
  md.core.ruler.after('linkify', 'abbr_replace', abbr_replace);
};

// Renderer partials


function render_footnote_anchor_name(tokens, idx, options, env
/*, slf*/
) {
  var n = Number(tokens[idx].meta.id + 1).toString();
  var prefix = '';

  if (typeof env.docId === 'string') {
    prefix = '-' + env.docId + '-';
  }

  return prefix + n;
}

function render_footnote_caption(tokens, idx
/*, options, env, slf*/
) {
  var n = Number(tokens[idx].meta.id + 1).toString();

  if (tokens[idx].meta.subId > 0) {
    n += ':' + tokens[idx].meta.subId;
  }

  return '[' + n + ']';
}

function render_footnote_ref(tokens, idx, options, env, slf) {
  var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
  var caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
  var refid = id;

  if (tokens[idx].meta.subId > 0) {
    refid += ':' + tokens[idx].meta.subId;
  }

  return '<sup class="footnote-ref"><a href="#fn' + id + '" id="fnref' + refid + '">' + caption + '</a></sup>';
}

function render_footnote_block_open(tokens, idx, options) {
  return (options.xhtmlOut ? '<hr class="footnotes-sep" />\n' : '<hr class="footnotes-sep">\n') + '<section class="footnotes">\n' + '<ol class="footnotes-list">\n';
}

function render_footnote_block_close() {
  return '</ol>\n</section>\n';
}

function render_footnote_open(tokens, idx, options, env, slf) {
  var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

  if (tokens[idx].meta.subId > 0) {
    id += ':' + tokens[idx].meta.subId;
  }

  return '<li id="fn' + id + '" class="footnote-item">';
}

function render_footnote_close() {
  return '</li>\n';
}

function render_footnote_anchor(tokens, idx, options, env, slf) {
  var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

  if (tokens[idx].meta.subId > 0) {
    id += ':' + tokens[idx].meta.subId;
  }
  /* ↩ with escape code to prevent display as Apple Emoji on iOS */


  return ' <a href="#fnref' + id + '" class="footnote-backref">\u21a9\uFE0E</a>';
}

var markdownItFootnote = function footnote_plugin(md) {
  var parseLinkLabel = md.helpers.parseLinkLabel,
      isSpace = md.utils.isSpace;
  md.renderer.rules.footnote_ref = render_footnote_ref;
  md.renderer.rules.footnote_block_open = render_footnote_block_open;
  md.renderer.rules.footnote_block_close = render_footnote_block_close;
  md.renderer.rules.footnote_open = render_footnote_open;
  md.renderer.rules.footnote_close = render_footnote_close;
  md.renderer.rules.footnote_anchor = render_footnote_anchor; // helpers (only used in other rules, no tokens are attached to those)

  md.renderer.rules.footnote_caption = render_footnote_caption;
  md.renderer.rules.footnote_anchor_name = render_footnote_anchor_name; // Process footnote block definition

  function footnote_def(state, startLine, endLine, silent) {
    var oldBMark,
        oldTShift,
        oldSCount,
        oldParentType,
        pos,
        label,
        token,
        initial,
        offset,
        ch,
        posAfterColon,
        start = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine]; // line should be at least 5 chars - "[^x]:"

    if (start + 4 > max) {
      return false;
    }

    if (state.src.charCodeAt(start) !== 0x5B
    /* [ */
    ) {
      return false;
    }

    if (state.src.charCodeAt(start + 1) !== 0x5E
    /* ^ */
    ) {
      return false;
    }

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) {
        return false;
      }

      if (state.src.charCodeAt(pos) === 0x5D
      /* ] */
      ) {
        break;
      }
    }

    if (pos === start + 2) {
      return false;
    } // no empty footnote labels


    if (pos + 1 >= max || state.src.charCodeAt(++pos) !== 0x3A
    /* : */
    ) {
      return false;
    }

    if (silent) {
      return true;
    }

    pos++;

    if (!state.env.footnotes) {
      state.env.footnotes = {};
    }

    if (!state.env.footnotes.refs) {
      state.env.footnotes.refs = {};
    }

    label = state.src.slice(start + 2, pos - 2);
    state.env.footnotes.refs[':' + label] = -1;
    token = new state.Token('footnote_reference_open', '', 1);
    token.meta = {
      label: label
    };
    token.level = state.level++;
    state.tokens.push(token);
    oldBMark = state.bMarks[startLine];
    oldTShift = state.tShift[startLine];
    oldSCount = state.sCount[startLine];
    oldParentType = state.parentType;
    posAfterColon = pos;
    initial = offset = state.sCount[startLine] + pos - (state.bMarks[startLine] + state.tShift[startLine]);

    while (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (isSpace(ch)) {
        if (ch === 0x09) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
      } else {
        break;
      }

      pos++;
    }

    state.tShift[startLine] = pos - posAfterColon;
    state.sCount[startLine] = offset - initial;
    state.bMarks[startLine] = posAfterColon;
    state.blkIndent += 4;
    state.parentType = 'footnote';

    if (state.sCount[startLine] < state.blkIndent) {
      state.sCount[startLine] += state.blkIndent;
    }

    state.md.block.tokenize(state, startLine, endLine, true);
    state.parentType = oldParentType;
    state.blkIndent -= 4;
    state.tShift[startLine] = oldTShift;
    state.sCount[startLine] = oldSCount;
    state.bMarks[startLine] = oldBMark;
    token = new state.Token('footnote_reference_close', '', -1);
    token.level = --state.level;
    state.tokens.push(token);
    return true;
  } // Process inline footnotes (^[...])


  function footnote_inline(state, silent) {
    var labelStart,
        labelEnd,
        footnoteId,
        token,
        tokens,
        max = state.posMax,
        start = state.pos;

    if (start + 2 >= max) {
      return false;
    }

    if (state.src.charCodeAt(start) !== 0x5E
    /* ^ */
    ) {
      return false;
    }

    if (state.src.charCodeAt(start + 1) !== 0x5B
    /* [ */
    ) {
      return false;
    }

    labelStart = start + 2;
    labelEnd = parseLinkLabel(state, start + 1); // parser failed to find ']', so it's not a valid note

    if (labelEnd < 0) {
      return false;
    } // We found the end of the link, and know for a fact it's a valid link;
    // so all that's left to do is to call tokenizer.
    //


    if (!silent) {
      if (!state.env.footnotes) {
        state.env.footnotes = {};
      }

      if (!state.env.footnotes.list) {
        state.env.footnotes.list = [];
      }

      footnoteId = state.env.footnotes.list.length;
      state.md.inline.parse(state.src.slice(labelStart, labelEnd), state.md, state.env, tokens = []);
      token = state.push('footnote_ref', '', 0);
      token.meta = {
        id: footnoteId
      };
      state.env.footnotes.list[footnoteId] = {
        content: state.src.slice(labelStart, labelEnd),
        tokens: tokens
      };
    }

    state.pos = labelEnd + 1;
    state.posMax = max;
    return true;
  } // Process footnote references ([^...])


  function footnote_ref(state, silent) {
    var label,
        pos,
        footnoteId,
        footnoteSubId,
        token,
        max = state.posMax,
        start = state.pos; // should be at least 4 chars - "[^x]"

    if (start + 3 > max) {
      return false;
    }

    if (!state.env.footnotes || !state.env.footnotes.refs) {
      return false;
    }

    if (state.src.charCodeAt(start) !== 0x5B
    /* [ */
    ) {
      return false;
    }

    if (state.src.charCodeAt(start + 1) !== 0x5E
    /* ^ */
    ) {
      return false;
    }

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) {
        return false;
      }

      if (state.src.charCodeAt(pos) === 0x0A) {
        return false;
      }

      if (state.src.charCodeAt(pos) === 0x5D
      /* ] */
      ) {
        break;
      }
    }

    if (pos === start + 2) {
      return false;
    } // no empty footnote labels


    if (pos >= max) {
      return false;
    }

    pos++;
    label = state.src.slice(start + 2, pos - 1);

    if (typeof state.env.footnotes.refs[':' + label] === 'undefined') {
      return false;
    }

    if (!silent) {
      if (!state.env.footnotes.list) {
        state.env.footnotes.list = [];
      }

      if (state.env.footnotes.refs[':' + label] < 0) {
        footnoteId = state.env.footnotes.list.length;
        state.env.footnotes.list[footnoteId] = {
          label: label,
          count: 0
        };
        state.env.footnotes.refs[':' + label] = footnoteId;
      } else {
        footnoteId = state.env.footnotes.refs[':' + label];
      }

      footnoteSubId = state.env.footnotes.list[footnoteId].count;
      state.env.footnotes.list[footnoteId].count++;
      token = state.push('footnote_ref', '', 0);
      token.meta = {
        id: footnoteId,
        subId: footnoteSubId,
        label: label
      };
    }

    state.pos = pos;
    state.posMax = max;
    return true;
  } // Glue footnote tokens to end of token stream


  function footnote_tail(state) {
    var i,
        l,
        j,
        t,
        lastParagraph,
        list,
        token,
        tokens,
        current,
        currentLabel,
        insideRef = false,
        refTokens = {};

    if (!state.env.footnotes) {
      return;
    }

    state.tokens = state.tokens.filter(function (tok) {
      if (tok.type === 'footnote_reference_open') {
        insideRef = true;
        current = [];
        currentLabel = tok.meta.label;
        return false;
      }

      if (tok.type === 'footnote_reference_close') {
        insideRef = false; // prepend ':' to avoid conflict with Object.prototype members

        refTokens[':' + currentLabel] = current;
        return false;
      }

      if (insideRef) {
        current.push(tok);
      }

      return !insideRef;
    });

    if (!state.env.footnotes.list) {
      return;
    }

    list = state.env.footnotes.list;
    token = new state.Token('footnote_block_open', '', 1);
    state.tokens.push(token);

    for (i = 0, l = list.length; i < l; i++) {
      token = new state.Token('footnote_open', '', 1);
      token.meta = {
        id: i,
        label: list[i].label
      };
      state.tokens.push(token);

      if (list[i].tokens) {
        tokens = [];
        token = new state.Token('paragraph_open', 'p', 1);
        token.block = true;
        tokens.push(token);
        token = new state.Token('inline', '', 0);
        token.children = list[i].tokens;
        token.content = list[i].content;
        tokens.push(token);
        token = new state.Token('paragraph_close', 'p', -1);
        token.block = true;
        tokens.push(token);
      } else if (list[i].label) {
        tokens = refTokens[':' + list[i].label];
      }

      state.tokens = state.tokens.concat(tokens);

      if (state.tokens[state.tokens.length - 1].type === 'paragraph_close') {
        lastParagraph = state.tokens.pop();
      } else {
        lastParagraph = null;
      }

      t = list[i].count > 0 ? list[i].count : 1;

      for (j = 0; j < t; j++) {
        token = new state.Token('footnote_anchor', '', 0);
        token.meta = {
          id: i,
          subId: j,
          label: list[i].label
        };
        state.tokens.push(token);
      }

      if (lastParagraph) {
        state.tokens.push(lastParagraph);
      }

      token = new state.Token('footnote_close', '', -1);
      state.tokens.push(token);
    }

    token = new state.Token('footnote_block_close', '', -1);
    state.tokens.push(token);
  }

  md.block.ruler.before('reference', 'footnote_def', footnote_def, {
    alt: ['paragraph', 'reference']
  });
  md.inline.ruler.after('image', 'footnote_inline', footnote_inline);
  md.inline.ruler.after('footnote_inline', 'footnote_ref', footnote_ref);
  md.core.ruler.after('inline', 'footnote_tail', footnote_tail);
};

var markdownItIns = function ins_plugin(md) {
  // Insert each marker as a separate text token, and add it to delimiter list
  //
  function tokenize(state, silent) {
    var i,
        scanned,
        token,
        len,
        ch,
        start = state.pos,
        marker = state.src.charCodeAt(start);

    if (silent) {
      return false;
    }

    if (marker !== 0x2B
    /* + */
    ) {
      return false;
    }

    scanned = state.scanDelims(state.pos, true);
    len = scanned.length;
    ch = String.fromCharCode(marker);

    if (len < 2) {
      return false;
    }

    if (len % 2) {
      token = state.push('text', '', 0);
      token.content = ch;
      len--;
    }

    for (i = 0; i < len; i += 2) {
      token = state.push('text', '', 0);
      token.content = ch + ch;

      if (!scanned.can_open && !scanned.can_close) {
        continue;
      }

      state.delimiters.push({
        marker: marker,
        length: 0,
        // disable "rule of 3" length checks meant for emphasis
        jump: i,
        token: state.tokens.length - 1,
        end: -1,
        open: scanned.can_open,
        close: scanned.can_close
      });
    }

    state.pos += scanned.length;
    return true;
  } // Walk through delimiter list and replace text tokens with tags
  //


  function postProcess(state, delimiters) {
    var i,
        j,
        startDelim,
        endDelim,
        token,
        loneMarkers = [],
        max = delimiters.length;

    for (i = 0; i < max; i++) {
      startDelim = delimiters[i];

      if (startDelim.marker !== 0x2B
      /* + */
      ) {
        continue;
      }

      if (startDelim.end === -1) {
        continue;
      }

      endDelim = delimiters[startDelim.end];
      token = state.tokens[startDelim.token];
      token.type = 'ins_open';
      token.tag = 'ins';
      token.nesting = 1;
      token.markup = '++';
      token.content = '';
      token = state.tokens[endDelim.token];
      token.type = 'ins_close';
      token.tag = 'ins';
      token.nesting = -1;
      token.markup = '++';
      token.content = '';

      if (state.tokens[endDelim.token - 1].type === 'text' && state.tokens[endDelim.token - 1].content === '+') {
        loneMarkers.push(endDelim.token - 1);
      }
    } // If a marker sequence has an odd number of characters, it's splitted
    // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
    // start of the sequence.
    //
    // So, we have to move all those markers after subsequent s_close tags.
    //


    while (loneMarkers.length) {
      i = loneMarkers.pop();
      j = i + 1;

      while (j < state.tokens.length && state.tokens[j].type === 'ins_close') {
        j++;
      }

      j--;

      if (i !== j) {
        token = state.tokens[j];
        state.tokens[j] = state.tokens[i];
        state.tokens[i] = token;
      }
    }
  }

  md.inline.ruler.before('emphasis', 'ins', tokenize);
  md.inline.ruler2.before('emphasis', 'ins', function (state) {
    var curr,
        tokens_meta = state.tokens_meta,
        max = (state.tokens_meta || []).length;
    postProcess(state, state.delimiters);

    for (curr = 0; curr < max; curr++) {
      if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
        postProcess(state, tokens_meta[curr].delimiters);
      }
    }
  });
};

var markdownItMark = function ins_plugin(md) {
  // Insert each marker as a separate text token, and add it to delimiter list
  //
  function tokenize(state, silent) {
    var i,
        scanned,
        token,
        len,
        ch,
        start = state.pos,
        marker = state.src.charCodeAt(start);

    if (silent) {
      return false;
    }

    if (marker !== 0x3D
    /* = */
    ) {
      return false;
    }

    scanned = state.scanDelims(state.pos, true);
    len = scanned.length;
    ch = String.fromCharCode(marker);

    if (len < 2) {
      return false;
    }

    if (len % 2) {
      token = state.push('text', '', 0);
      token.content = ch;
      len--;
    }

    for (i = 0; i < len; i += 2) {
      token = state.push('text', '', 0);
      token.content = ch + ch;

      if (!scanned.can_open && !scanned.can_close) {
        continue;
      }

      state.delimiters.push({
        marker: marker,
        length: 0,
        // disable "rule of 3" length checks meant for emphasis
        jump: i,
        token: state.tokens.length - 1,
        end: -1,
        open: scanned.can_open,
        close: scanned.can_close
      });
    }

    state.pos += scanned.length;
    return true;
  } // Walk through delimiter list and replace text tokens with tags
  //


  function postProcess(state, delimiters) {
    var i,
        j,
        startDelim,
        endDelim,
        token,
        loneMarkers = [],
        max = delimiters.length;

    for (i = 0; i < max; i++) {
      startDelim = delimiters[i];

      if (startDelim.marker !== 0x3D
      /* = */
      ) {
        continue;
      }

      if (startDelim.end === -1) {
        continue;
      }

      endDelim = delimiters[startDelim.end];
      token = state.tokens[startDelim.token];
      token.type = 'mark_open';
      token.tag = 'mark';
      token.nesting = 1;
      token.markup = '==';
      token.content = '';
      token = state.tokens[endDelim.token];
      token.type = 'mark_close';
      token.tag = 'mark';
      token.nesting = -1;
      token.markup = '==';
      token.content = '';

      if (state.tokens[endDelim.token - 1].type === 'text' && state.tokens[endDelim.token - 1].content === '=') {
        loneMarkers.push(endDelim.token - 1);
      }
    } // If a marker sequence has an odd number of characters, it's splitted
    // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
    // start of the sequence.
    //
    // So, we have to move all those markers after subsequent s_close tags.
    //


    while (loneMarkers.length) {
      i = loneMarkers.pop();
      j = i + 1;

      while (j < state.tokens.length && state.tokens[j].type === 'mark_close') {
        j++;
      }

      j--;

      if (i !== j) {
        token = state.tokens[j];
        state.tokens[j] = state.tokens[i];
        state.tokens[i] = token;
      }
    }
  }

  md.inline.ruler.before('emphasis', 'mark', tokenize);
  md.inline.ruler2.before('emphasis', 'mark', function (state) {
    var curr,
        tokens_meta = state.tokens_meta,
        max = (state.tokens_meta || []).length;
    postProcess(state, state.delimiters);

    for (curr = 0; curr < max; curr++) {
      if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
        postProcess(state, tokens_meta[curr].delimiters);
      }
    }
  });
};

//
// https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments
// https://github.com/blog/1825-task-lists-in-all-markdown-documents

var disableCheckboxes = true;
var useLabelWrapper = false;
var useLabelAfter = false;

var markdownItTaskLists = function (md, options) {
  if (options) {
    disableCheckboxes = !options.enabled;
    useLabelWrapper = !!options.label;
    useLabelAfter = !!options.labelAfter;
  }

  md.core.ruler.after('inline', 'github-task-lists', function (state) {
    var tokens = state.tokens;

    for (var i = 2; i < tokens.length; i++) {
      if (isTodoItem(tokens, i)) {
        todoify(tokens[i], state.Token);
        attrSet(tokens[i - 2], 'class', 'task-list-item' + (!disableCheckboxes ? ' enabled' : ''));
        attrSet(tokens[parentToken(tokens, i - 2)], 'class', 'contains-task-list');
      }
    }
  });
};

function attrSet(token, name, value) {
  var index = token.attrIndex(name);
  var attr = [name, value];

  if (index < 0) {
    token.attrPush(attr);
  } else {
    token.attrs[index] = attr;
  }
}

function parentToken(tokens, index) {
  var targetLevel = tokens[index].level - 1;

  for (var i = index - 1; i >= 0; i--) {
    if (tokens[i].level === targetLevel) {
      return i;
    }
  }

  return -1;
}

function isTodoItem(tokens, index) {
  return isInline(tokens[index]) && isParagraph(tokens[index - 1]) && isListItem(tokens[index - 2]) && startsWithTodoMarkdown(tokens[index]);
}

function todoify(token, TokenConstructor) {
  token.children.unshift(makeCheckbox(token, TokenConstructor));
  token.children[1].content = token.children[1].content.slice(3);
  token.content = token.content.slice(3);

  if (useLabelWrapper) {
    if (useLabelAfter) {
      token.children.pop(); // Use large random number as id property of the checkbox.

      var id = 'task-item-' + Math.ceil(Math.random() * (10000 * 1000) - 1000);
      token.children[0].content = token.children[0].content.slice(0, -1) + ' id="' + id + '">';
      token.children.push(afterLabel(token.content, id, TokenConstructor));
    } else {
      token.children.unshift(beginLabel(TokenConstructor));
      token.children.push(endLabel(TokenConstructor));
    }
  }
}

function makeCheckbox(token, TokenConstructor) {
  var checkbox = new TokenConstructor('html_inline', '', 0);
  var disabledAttr = disableCheckboxes ? ' disabled="" ' : '';

  if (token.content.indexOf('[ ] ') === 0) {
    checkbox.content = '<input class="task-list-item-checkbox"' + disabledAttr + 'type="checkbox">';
  } else if (token.content.indexOf('[x] ') === 0 || token.content.indexOf('[X] ') === 0) {
    checkbox.content = '<input class="task-list-item-checkbox" checked=""' + disabledAttr + 'type="checkbox">';
  }

  return checkbox;
} // these next two functions are kind of hacky; probably should really be a
// true block-level token with .tag=='label'


function beginLabel(TokenConstructor) {
  var token = new TokenConstructor('html_inline', '', 0);
  token.content = '<label>';
  return token;
}

function endLabel(TokenConstructor) {
  var token = new TokenConstructor('html_inline', '', 0);
  token.content = '</label>';
  return token;
}

function afterLabel(content, id, TokenConstructor) {
  var token = new TokenConstructor('html_inline', '', 0);
  token.content = '<label class="task-list-item-label" for="' + id + '">' + content + '</label>';
  token.attrs = [{
    for: id
  }];
  return token;
}

function isInline(token) {
  return token.type === 'inline';
}

function isParagraph(token) {
  return token.type === 'paragraph_open';
}

function isListItem(token) {
  return token.type === 'list_item_open';
}

function startsWithTodoMarkdown(token) {
  // leading whitespace in a list item is already trimmed off by markdown-it
  return token.content.indexOf('[ ] ') === 0 || token.content.indexOf('[x] ') === 0 || token.content.indexOf('[X] ') === 0;
}

var lib = {};

var xmlEntities = {};

var surrogatePairs = {};

Object.defineProperty(surrogatePairs, "__esModule", {
  value: true
});

surrogatePairs.fromCodePoint = String.fromCodePoint || function (astralCodePoint) {
  return String.fromCharCode(Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xD800, (astralCodePoint - 0x10000) % 0x400 + 0xDC00);
};

surrogatePairs.getCodePoint = String.prototype.codePointAt ? function (input, position) {
  return input.codePointAt(position);
} : function (input, position) {
  return (input.charCodeAt(position) - 0xD800) * 0x400 + input.charCodeAt(position + 1) - 0xDC00 + 0x10000;
};
surrogatePairs.highSurrogateFrom = 0xD800;
surrogatePairs.highSurrogateTo = 0xDBFF;

Object.defineProperty(xmlEntities, "__esModule", {
  value: true
});
var surrogate_pairs_1$2 = surrogatePairs;
var ALPHA_INDEX = {
  '&lt': '<',
  '&gt': '>',
  '&quot': '"',
  '&apos': '\'',
  '&amp': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': '\'',
  '&amp;': '&'
};
var CHAR_INDEX = {
  60: 'lt',
  62: 'gt',
  34: 'quot',
  39: 'apos',
  38: 'amp'
};
var CHAR_S_INDEX = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&apos;',
  '&': '&amp;'
};

var XmlEntities = function () {
  function XmlEntities() {}

  XmlEntities.prototype.encode = function (str) {
    if (!str || !str.length) {
      return '';
    }

    return str.replace(/[<>"'&]/g, function (s) {
      return CHAR_S_INDEX[s];
    });
  };

  XmlEntities.encode = function (str) {
    return new XmlEntities().encode(str);
  };

  XmlEntities.prototype.decode = function (str) {
    if (!str || !str.length) {
      return '';
    }

    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function (s) {
      if (s.charAt(1) === '#') {
        var code = s.charAt(2).toLowerCase() === 'x' ? parseInt(s.substr(3), 16) : parseInt(s.substr(2));

        if (!isNaN(code) || code >= -32768) {
          if (code <= 65535) {
            return String.fromCharCode(code);
          } else {
            return surrogate_pairs_1$2.fromCodePoint(code);
          }
        }

        return '';
      }

      return ALPHA_INDEX[s] || s;
    });
  };

  XmlEntities.decode = function (str) {
    return new XmlEntities().decode(str);
  };

  XmlEntities.prototype.encodeNonUTF = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var c = str.charCodeAt(i);
      var alpha = CHAR_INDEX[c];

      if (alpha) {
        result += "&" + alpha + ";";
        i++;
        continue;
      }

      if (c < 32 || c > 126) {
        if (c >= surrogate_pairs_1$2.highSurrogateFrom && c <= surrogate_pairs_1$2.highSurrogateTo) {
          result += '&#' + surrogate_pairs_1$2.getCodePoint(str, i) + ';';
          i++;
        } else {
          result += '&#' + c + ';';
        }
      } else {
        result += str.charAt(i);
      }

      i++;
    }

    return result;
  };

  XmlEntities.encodeNonUTF = function (str) {
    return new XmlEntities().encodeNonUTF(str);
  };

  XmlEntities.prototype.encodeNonASCII = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var c = str.charCodeAt(i);

      if (c <= 255) {
        result += str[i++];
        continue;
      }

      if (c >= surrogate_pairs_1$2.highSurrogateFrom && c <= surrogate_pairs_1$2.highSurrogateTo) {
        result += '&#' + surrogate_pairs_1$2.getCodePoint(str, i) + ';';
        i++;
      } else {
        result += '&#' + c + ';';
      }

      i++;
    }

    return result;
  };

  XmlEntities.encodeNonASCII = function (str) {
    return new XmlEntities().encodeNonASCII(str);
  };

  return XmlEntities;
}();

xmlEntities.XmlEntities = XmlEntities;

var html4Entities = {};

Object.defineProperty(html4Entities, "__esModule", {
  value: true
});
var surrogate_pairs_1$1 = surrogatePairs;
var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'AElig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
var alphaIndex$1 = {};
var numIndex = {};

(function () {
  var i = 0;
  var length = HTML_ALPHA.length;

  while (i < length) {
    var a = HTML_ALPHA[i];
    var c = HTML_CODES[i];
    alphaIndex$1[a] = String.fromCharCode(c);
    numIndex[c] = a;
    i++;
  }
})();

var Html4Entities = function () {
  function Html4Entities() {}

  Html4Entities.prototype.decode = function (str) {
    if (!str || !str.length) {
      return '';
    }

    return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
      var chr;

      if (entity.charAt(0) === "#") {
        var code = entity.charAt(1).toLowerCase() === 'x' ? parseInt(entity.substr(2), 16) : parseInt(entity.substr(1));

        if (!isNaN(code) || code >= -32768) {
          if (code <= 65535) {
            chr = String.fromCharCode(code);
          } else {
            chr = surrogate_pairs_1$1.fromCodePoint(code);
          }
        }
      } else {
        chr = alphaIndex$1[entity];
      }

      return chr || s;
    });
  };

  Html4Entities.decode = function (str) {
    return new Html4Entities().decode(str);
  };

  Html4Entities.prototype.encode = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var alpha = numIndex[str.charCodeAt(i)];
      result += alpha ? "&" + alpha + ";" : str.charAt(i);
      i++;
    }

    return result;
  };

  Html4Entities.encode = function (str) {
    return new Html4Entities().encode(str);
  };

  Html4Entities.prototype.encodeNonUTF = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var cc = str.charCodeAt(i);
      var alpha = numIndex[cc];

      if (alpha) {
        result += "&" + alpha + ";";
      } else if (cc < 32 || cc > 126) {
        if (cc >= surrogate_pairs_1$1.highSurrogateFrom && cc <= surrogate_pairs_1$1.highSurrogateTo) {
          result += '&#' + surrogate_pairs_1$1.getCodePoint(str, i) + ';';
          i++;
        } else {
          result += '&#' + cc + ';';
        }
      } else {
        result += str.charAt(i);
      }

      i++;
    }

    return result;
  };

  Html4Entities.encodeNonUTF = function (str) {
    return new Html4Entities().encodeNonUTF(str);
  };

  Html4Entities.prototype.encodeNonASCII = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var c = str.charCodeAt(i);

      if (c <= 255) {
        result += str[i++];
        continue;
      }

      if (c >= surrogate_pairs_1$1.highSurrogateFrom && c <= surrogate_pairs_1$1.highSurrogateTo) {
        result += '&#' + surrogate_pairs_1$1.getCodePoint(str, i) + ';';
        i++;
      } else {
        result += '&#' + c + ';';
      }

      i++;
    }

    return result;
  };

  Html4Entities.encodeNonASCII = function (str) {
    return new Html4Entities().encodeNonASCII(str);
  };

  return Html4Entities;
}();

html4Entities.Html4Entities = Html4Entities;

var html5Entities = {};

Object.defineProperty(html5Entities, "__esModule", {
  value: true
});
var surrogate_pairs_1 = surrogatePairs;
var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
var DECODE_ONLY_ENTITIES = [['NewLine', [10]]];
var alphaIndex = {};
var charIndex = {};
createIndexes(alphaIndex, charIndex);

var Html5Entities = function () {
  function Html5Entities() {}

  Html5Entities.prototype.decode = function (str) {
    if (!str || !str.length) {
      return '';
    }

    return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
      var chr;

      if (entity.charAt(0) === "#") {
        var code = entity.charAt(1) === 'x' ? parseInt(entity.substr(2).toLowerCase(), 16) : parseInt(entity.substr(1));

        if (!isNaN(code) || code >= -32768) {
          if (code <= 65535) {
            chr = String.fromCharCode(code);
          } else {
            chr = surrogate_pairs_1.fromCodePoint(code);
          }
        }
      } else {
        chr = alphaIndex[entity];
      }

      return chr || s;
    });
  };

  Html5Entities.decode = function (str) {
    return new Html5Entities().decode(str);
  };

  Html5Entities.prototype.encode = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var charInfo = charIndex[str.charCodeAt(i)];

      if (charInfo) {
        var alpha = charInfo[str.charCodeAt(i + 1)];

        if (alpha) {
          i++;
        } else {
          alpha = charInfo[''];
        }

        if (alpha) {
          result += "&" + alpha + ";";
          i++;
          continue;
        }
      }

      result += str.charAt(i);
      i++;
    }

    return result;
  };

  Html5Entities.encode = function (str) {
    return new Html5Entities().encode(str);
  };

  Html5Entities.prototype.encodeNonUTF = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var c = str.charCodeAt(i);
      var charInfo = charIndex[c];

      if (charInfo) {
        var alpha = charInfo[str.charCodeAt(i + 1)];

        if (alpha) {
          i++;
        } else {
          alpha = charInfo[''];
        }

        if (alpha) {
          result += "&" + alpha + ";";
          i++;
          continue;
        }
      }

      if (c < 32 || c > 126) {
        if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
          result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
          i++;
        } else {
          result += '&#' + c + ';';
        }
      } else {
        result += str.charAt(i);
      }

      i++;
    }

    return result;
  };

  Html5Entities.encodeNonUTF = function (str) {
    return new Html5Entities().encodeNonUTF(str);
  };

  Html5Entities.prototype.encodeNonASCII = function (str) {
    if (!str || !str.length) {
      return '';
    }

    var strLength = str.length;
    var result = '';
    var i = 0;

    while (i < strLength) {
      var c = str.charCodeAt(i);

      if (c <= 255) {
        result += str[i++];
        continue;
      }

      if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
        result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
        i += 2;
      } else {
        result += '&#' + c + ';';
        i++;
      }
    }

    return result;
  };

  Html5Entities.encodeNonASCII = function (str) {
    return new Html5Entities().encodeNonASCII(str);
  };

  return Html5Entities;
}();

html5Entities.Html5Entities = Html5Entities;

function createIndexes(alphaIndex, charIndex) {
  var i = ENTITIES.length;

  while (i--) {
    var _a = ENTITIES[i],
        alpha = _a[0],
        _b = _a[1],
        chr = _b[0],
        chr2 = _b[1];
    var addChar = chr < 32 || chr > 126 || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
    var charInfo = void 0;

    if (addChar) {
      charInfo = charIndex[chr] = charIndex[chr] || {};
    }

    if (chr2) {
      alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
      addChar && (charInfo[chr2] = alpha);
    } else {
      alphaIndex[alpha] = String.fromCharCode(chr);
      addChar && (charInfo[''] = alpha);
    }
  }

  i = DECODE_ONLY_ENTITIES.length;

  while (i--) {
    var _c = DECODE_ONLY_ENTITIES[i],
        alpha = _c[0],
        _d = _c[1],
        chr = _d[0],
        chr2 = _d[1];
    alphaIndex[alpha] = String.fromCharCode(chr) + (chr2 ? String.fromCharCode(chr2) : '');
  }
}

Object.defineProperty(lib, "__esModule", {
  value: true
});
var xml_entities_1 = xmlEntities;
lib.XmlEntities = xml_entities_1.XmlEntities;
var html4_entities_1 = html4Entities;
lib.Html4Entities = html4_entities_1.Html4Entities;
var html5_entities_1 = html5Entities;
lib.Html5Entities = html5_entities_1.Html5Entities;
lib.AllHtmlEntities = html5_entities_1.Html5Entities;

var Entities = lib.AllHtmlEntities;
new Entities(); // Quick and dirty way of getting the text representation of a string of HTML,

var n = {
  false: "push",
  true: "unshift"
},
    e = Object.prototype.hasOwnProperty,
    r = function (n, r, t) {
  var i = n,
      u = 2;
  if (t && e.call(r, i)) throw Error("User defined id attribute '" + n + "' is NOT unique. Please fix it in your markdown to continue.");

  for (; e.call(r, i);) i = n + "-" + u++;

  return r[i] = !0, i;
},
    t = function n(e, t) {
  t = Object.assign({}, n.defaults, t), e.core.ruler.push("anchor", function (n) {
    var e,
        i = {},
        u = n.tokens,
        o = Array.isArray(t.level) ? (e = t.level, function (n) {
      return e.includes(n);
    }) : function (n) {
      return function (e) {
        return e >= n;
      };
    }(t.level);
    u.filter(function (n) {
      return "heading_open" === n.type;
    }).filter(function (n) {
      return o(Number(n.tag.substr(1)));
    }).forEach(function (e) {
      var o = u[u.indexOf(e) + 1].children.filter(function (n) {
        return "text" === n.type || "code_inline" === n.type;
      }).reduce(function (n, e) {
        return n + e.content;
      }, ""),
          c = e.attrGet("id");
      c = null == c ? r(t.slugify(o), i, !1) : r(c, i, !0), e.attrSet("id", c), t.permalink && t.renderPermalink(c, t, n, u.indexOf(e)), t.callback && t.callback(e, {
        slug: c,
        title: o
      });
    });
  });
};

t.defaults = {
  level: 1,
  slugify: function (n) {
    return encodeURIComponent(String(n).trim().toLowerCase().replace(/\s+/g, "-"));
  },
  permalink: !1,
  renderPermalink: function (e, r, t, i) {
    var u,
        o = [Object.assign(new t.Token("link_open", "a", 1), {
      attrs: [["class", r.permalinkClass], ["href", r.permalinkHref(e, t)]].concat(Object.entries(r.permalinkAttrs(e, t)))
    }), Object.assign(new t.Token("html_block", "", 0), {
      content: r.permalinkSymbol
    }), new t.Token("link_close", "a", -1)];
    r.permalinkSpace && o[n[!r.permalinkBefore]](Object.assign(new t.Token("text", "", 0), {
      content: " "
    })), (u = t.tokens[i + 1].children)[n[r.permalinkBefore]].apply(u, o);
  },
  permalinkClass: "header-anchor",
  permalinkSpace: !0,
  permalinkSymbol: "¶",
  permalinkBefore: !1,
  permalinkHref: function (n) {
    return "#" + n;
  },
  permalinkAttrs: function (n) {
    return {};
  }
};

const slugify = s => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'));

const defaults = {
  includeLevel: [1, 2],
  containerClass: 'table-of-contents',
  slugify,
  markerPattern: /^\[\[toc\]\]/im,
  listType: 'ul',
  format: undefined,
  forceFullToc: false,
  containerHeaderHtml: undefined,
  containerFooterHtml: undefined,
  transformLink: undefined
};

var markdownItTableOfContents = (md, o) => {
  const options = Object.assign({}, defaults, o);
  const tocRegexp = options.markerPattern;
  let gstate;

  function toc(state, silent) {
    var token;
    var match; // Reject if the token does not start with [

    if (state.src.charCodeAt(state.pos) !== 0x5B
    /* [ */
    ) {
      return false;
    } // Don't run any pairs in validation mode


    if (silent) {
      return false;
    } // Detect TOC markdown


    match = tocRegexp.exec(state.src.substr(state.pos));
    match = !match ? [] : match.filter(function (m) {
      return m;
    });

    if (match.length < 1) {
      return false;
    } // Build content


    token = state.push('toc_open', 'toc', 1);
    token.markup = '[[toc]]';
    token = state.push('toc_body', '', 0);
    token = state.push('toc_close', 'toc', -1); // Update pos so the parser can continue

    var newline = state.src.indexOf('\n', state.pos);

    if (newline !== -1) {
      state.pos = newline;
    } else {
      state.pos = state.pos + state.posMax + 1;
    }

    return true;
  }

  md.renderer.rules.toc_open = function (tokens, index) {
    var tocOpenHtml = `<div class="${options.containerClass}">`;

    if (options.containerHeaderHtml) {
      tocOpenHtml += options.containerHeaderHtml;
    }

    return tocOpenHtml;
  };

  md.renderer.rules.toc_close = function (tokens, index) {
    var tocFooterHtml = '';

    if (options.containerFooterHtml) {
      tocFooterHtml = options.containerFooterHtml;
    }

    return tocFooterHtml + `</div>`;
  };

  md.renderer.rules.toc_body = function (tokens, index) {
    if (options.forceFullToc) {
      /*
      
      Renders full TOC even if the hierarchy of headers contains
      a header greater than the first appearing header
      
      ## heading 2
      ### heading 3
      # heading 1
      
      Result TOC:
      - heading 2
         - heading 3
      - heading 1 
       */
      var tocBody = '';
      var pos = 0;
      var tokenLength = gstate && gstate.tokens && gstate.tokens.length;

      while (pos < tokenLength) {
        var tocHierarchy = renderChildsTokens(pos, gstate.tokens);
        pos = tocHierarchy[0];
        tocBody += tocHierarchy[1];
      }

      return tocBody;
    } else {
      return renderChildsTokens(0, gstate.tokens)[1];
    }
  };

  function renderChildsTokens(pos, tokens) {
    var headings = [],
        buffer = '',
        currentLevel,
        subHeadings,
        size = tokens.length,
        i = pos;

    while (i < size) {
      var token = tokens[i];
      var heading = tokens[i - 1];
      var level = token.tag && parseInt(token.tag.substr(1, 1));

      if (token.type !== 'heading_close' || options.includeLevel.indexOf(level) == -1 || heading.type !== 'inline') {
        i++;
        continue; // Skip if not matching criteria
      }

      if (!currentLevel) {
        currentLevel = level; // We init with the first found level
      } else {
        if (level > currentLevel) {
          subHeadings = renderChildsTokens(i, tokens);
          buffer += subHeadings[1];
          i = subHeadings[0];
          continue;
        }

        if (level < currentLevel) {
          // Finishing the sub headings
          buffer += `</li>`;
          headings.push(buffer);
          return [i, `<${options.listType}>${headings.join('')}</${options.listType}>`];
        }

        if (level == currentLevel) {
          // Finishing the sub headings
          buffer += `</li>`;
          headings.push(buffer);
        }
      }

      var slugifiedContent = options.slugify(heading.content);
      var link = "#" + slugifiedContent;

      if (options.transformLink) {
        link = options.transformLink(link);
      }

      buffer = `<li><a href="${link}">`;
      buffer += typeof options.format === 'function' ? options.format(heading.content) : heading.content;
      buffer += `</a>`;
      i++;
    }

    buffer += buffer === '' ? '' : `</li>`;
    headings.push(buffer);
    return [i, `<${options.listType}>${headings.join('')}</${options.listType}>`];
  } // Catch all the tokens for iteration later


  md.core.ruler.push('grab_state', function (state) {
    gstate = state;
  }); // Insert TOC

  md.inline.ruler.after('emphasis', 'toc', toc);
};

/**
 * @Author: HuaChao Chen <chc>
 * @Date:   2017-06-12T21:06:58+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: index.js
 * @Last modified by:   chc
 * @Last modified time: 2017-06-12T21:18:15+08:00
 * @License: MIT
 * @Copyright: 2017
 */

var markdownItImagesPreview = function (md, config) {
  md.image_add = function (src, data) {
    if (!(md.__image instanceof Object)) md.__image = {};
    md.__image[src] = data;
  };

  md.image_del = function (src) {
    if (!(md.__image instanceof Object)) md.__image = {};
    delete md.__image[src];
  };

  var imagedefault = md.renderer.rules.image;

  md.renderer.rules.image = function (tokens, idx, options, env, slf) {
    var _attrs = tokens[idx].attrs;

    if (md.__image instanceof Object) {
      for (var i = 0; i < _attrs.length; i++) {
        if (_attrs[i][0] == 'src' && md.__image.hasOwnProperty(tokens[idx].attrs[i][1])) {
          _attrs.push(['rel', _attrs[i][1]]);

          _attrs[i][1] = md.__image[tokens[idx].attrs[i][1]];
          break;
        }
      }
    }

    return imagedefault(tokens, idx, options, env, slf);
  };
};

var markdownItMathjax = {exports: {}};

(function (module, exports) {

  (function (root, factory) {
    {
      module.exports = factory();
    }
  })(commonjsGlobal, function () {
    function math(state, silent) {
      var startMathPos = state.pos;

      if (state.src.charCodeAt(startMathPos) !== 0x5C
      /* \ */
      ) {
        return false;
      }

      var match = state.src.slice(++startMathPos).match(/^(?:\\\[|\\\(|begin\{([^}]*)\})/);

      if (!match) {
        return false;
      }

      startMathPos += match[0].length;
      var type, endMarker, includeMarkers;

      if (match[0] === '\\[') {
        type = 'display_math';
        endMarker = '\\\\]';
      } else if (match[0] === '\\(') {
        type = 'inline_math';
        endMarker = '\\\\)';
      } else if (match[1]) {
        type = 'math';
        endMarker = '\\end{' + match[1] + '}';
        includeMarkers = true;
      }

      var endMarkerPos = state.src.indexOf(endMarker, startMathPos);

      if (endMarkerPos === -1) {
        return false;
      }

      var nextPos = endMarkerPos + endMarker.length;

      if (!silent) {
        var token = state.push(type, '', 0);
        token.content = includeMarkers ? state.src.slice(state.pos, nextPos) : state.src.slice(startMathPos, endMarkerPos);
      }

      state.pos = nextPos;
      return true;
    }

    function texMath(state, silent) {
      var startMathPos = state.pos;

      if (state.src.charCodeAt(startMathPos) !== 0x24
      /* $ */
      ) {
        return false;
      } // Parse tex math according to http://pandoc.org/README.html#math


      var endMarker = '$';
      var afterStartMarker = state.src.charCodeAt(++startMathPos);

      if (afterStartMarker === 0x24
      /* $ */
      ) {
        endMarker = '$$';

        if (state.src.charCodeAt(++startMathPos) === 0x24
        /* $ */
        ) {
          // 3 markers are too much
          return false;
        }
      } else {
        // Skip if opening $ is succeeded by a space character
        if (afterStartMarker === 0x20
        /* space */
        || afterStartMarker === 0x09
        /* \t */
        || afterStartMarker === 0x0a
        /* \n */
        ) {
          return false;
        }
      }

      var endMarkerPos = state.src.indexOf(endMarker, startMathPos);

      if (endMarkerPos === -1) {
        return false;
      }

      if (state.src.charCodeAt(endMarkerPos - 1) === 0x5C
      /* \ */
      ) {
        return false;
      }

      var nextPos = endMarkerPos + endMarker.length;

      if (endMarker.length === 1) {
        // Skip if $ is preceded by a space character
        var beforeEndMarker = state.src.charCodeAt(endMarkerPos - 1);

        if (beforeEndMarker === 0x20
        /* space */
        || beforeEndMarker === 0x09
        /* \t */
        || beforeEndMarker === 0x0a
        /* \n */
        ) {
          return false;
        } // Skip if closing $ is succeeded by a digit (eg $5 $10 ...)


        var suffix = state.src.charCodeAt(nextPos);

        if (suffix >= 0x30 && suffix < 0x3A) {
          return false;
        }
      }

      if (!silent) {
        var token = state.push(endMarker.length === 1 ? 'inline_math' : 'display_math', '', 0);
        token.content = state.src.slice(startMathPos, endMarkerPos);
      }

      state.pos = nextPos;
      return true;
    }

    function escapeHtml(html) {
      return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
    }

    function extend(options, defaults) {
      return Object.keys(defaults).reduce(function (result, key) {
        if (result[key] === undefined) {
          result[key] = defaults[key];
        }

        return result;
      }, options);
    }

    var mapping = {
      'math': 'Math',
      'inline_math': 'InlineMath',
      'display_math': 'DisplayMath'
    };
    return function (options) {
      var defaults = {
        beforeMath: '',
        afterMath: '',
        beforeInlineMath: '\\(',
        afterInlineMath: '\\)',
        beforeDisplayMath: '\\[',
        afterDisplayMath: '\\]'
      };
      options = extend(options || {}, defaults);
      return function (md) {
        md.inline.ruler.before('escape', 'math', math);
        md.inline.ruler.push('texMath', texMath);
        Object.keys(mapping).forEach(function (key) {
          var before = options['before' + mapping[key]];
          var after = options['after' + mapping[key]];

          md.renderer.rules[key] = function (tokens, idx) {
            return before + escapeHtml(tokens[idx].content) + after;
          };
        });
      };
    };
  });
})(markdownItMathjax);

var mathjax = markdownItMathjax.exports;

// import hljsLangs from '../core/hljs/lang.hljs.js'

var defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  var hIndex = tokens[idx].attrIndex('href');
  if (tokens[idx].attrs[hIndex][1].startsWith('#')) return defaultRender(tokens, idx, options, env, self); // If you are sure other plugins can't add `target` - drop check below

  var aIndex = tokens[idx].attrIndex('target');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank'; // replace value of existing attr
  } // rel 参考了 hackmd 的 a link 处理方式


  var relIndex = tokens[idx].attrIndex('rel');

  if (relIndex < 0) {
    tokens[idx].attrPush(['rel', 'noopener']); // add new attribute
  } else {
    tokens[idx].attrs[relIndex][1] = 'noopener'; // replace value of existing attr
  } // pass token to default renderer.


  return defaultRender(tokens, idx, options, env, self);
}; // use(mihe, hljs_opts)


md.use(markdownItEmoji).use(markdownItSup).use(markdownItSub).use(markdownItContainer).use(markdownItContainer, 'hljs-left')
/* align left */
.use(markdownItContainer, 'hljs-center')
/* align center */
.use(markdownItContainer, 'hljs-right')
/* align right */
// 下面三个和原来库保持一致
.use(markdownItDeflist).use(markdownItAbbr).use(markdownItFootnote).use(markdownItIns).use(markdownItMark).use(markdownItImagesPreview).use(mathjax({
  beforeMath: '<span class="mathjax raw">',
  afterMath: '</span>',
  beforeInlineMath: '<span class="mathjax raw">\\(',
  afterInlineMath: '\\)</span>',
  beforeDisplayMath: '<span class="mathjax raw">\\[',
  afterDisplayMath: '\\]</span>'
})).use(markdownItTaskLists).use(t, {
  permalink: true,
  permalinkBefore: true,
  // permalinkSymbol: '§',
  slugify: function slugify(link) {
    return decodeURI(link);
  }
}) // .use(headings, {})
.use(markdownItTableOfContents, {
  includeLevel: [2, 3],
  // hackmd 也只支持到了h3
  markerPattern: /^\[toc\]|^\[\[toc\]\]/im,
  // 如果想 支持 [[toc]] [toc] 的话不能添加 $
  transformLink: function transformLink(link) {
    return decodeURI(link);
  },
  format: function format(headingAsString) {
    // manipulate the headings as you like here.
    return md.render(headingAsString).replace(/<[^<>]+>/g, '');
  }
}); // .use(mila, {
//   pattern: /^https?:\/\//,
//   attrs: {
//     class: 'extralink',
//     target: '_blank',
//   },
// });

injectLineNumber(md);

exports.markdown = md;
