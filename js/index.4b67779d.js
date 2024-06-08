import { q as X } from "./index.9bc8c100.js";
function ee(t, e) {
  for (var r = 0; r < e.length; r++) {
    const i = e[r];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const l in i)
        if (l !== "default" && !(l in t)) {
          const u = Object.getOwnPropertyDescriptor(i, l);
          u &&
            Object.defineProperty(
              t,
              l,
              u.get ? u : { enumerable: !0, get: () => i[l] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(t, Symbol.toStringTag, { value: "Module" })
  );
}
var Y = { exports: {} },
  j;
/**
 * @link https://github.com/gajus/sister for the canonical source repository
 * @license https://github.com/gajus/sister/blob/master/LICENSE BSD 3-Clause
 */ j = function () {
  var t = {},
    e = {};
  return (
    (t.on = function (r, i) {
      var l = { name: r, handler: i };
      return (e[r] = e[r] || []), e[r].unshift(l), l;
    }),
    (t.off = function (r) {
      var i = e[r.name].indexOf(r);
      i !== -1 && e[r.name].splice(i, 1);
    }),
    (t.trigger = function (r, i) {
      var l = e[r],
        u;
      if (l) for (u = l.length; u--; ) l[u].handler(i);
    }),
    t
  );
};
var te = j,
  L = { exports: {} },
  re = function (e, r, i) {
    var l = document.head || document.getElementsByTagName("head")[0],
      u = document.createElement("script");
    typeof r == "function" && ((i = r), (r = {})),
      (r = r || {}),
      (i = i || function () {}),
      (u.type = r.type || "text/javascript"),
      (u.charset = r.charset || "utf8"),
      (u.async = "async" in r ? !!r.async : !0),
      (u.src = e),
      r.attrs && ne(u, r.attrs),
      r.text && (u.text = "" + r.text);
    var y = "onload" in u ? Z : ae;
    y(u, i), u.onload || Z(u, i), l.appendChild(u);
  };
function ne(t, e) {
  for (var r in e) t.setAttribute(r, e[r]);
}
function Z(t, e) {
  (t.onload = function () {
    (this.onerror = this.onload = null), e(null, t);
  }),
    (t.onerror = function () {
      (this.onerror = this.onload = null),
        e(new Error("Failed to load " + this.src), t);
    });
}
function ae(t, e) {
  t.onreadystatechange = function () {
    (this.readyState != "complete" && this.readyState != "loaded") ||
      ((this.onreadystatechange = null), e(null, t));
  };
}
(function (t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var r = re,
    i = l(r);
  function l(u) {
    return u && u.__esModule ? u : { default: u };
  }
  (e.default = function (u) {
    var y = new Promise(function (w) {
      if (
        window.YT &&
        window.YT.Player &&
        window.YT.Player instanceof Function
      ) {
        w(window.YT);
        return;
      } else {
        var f = window.location.protocol === "http:" ? "http:" : "https:";
        (0, i.default)(f + "//www.youtube.com/iframe_api", function (n) {
          n && u.trigger("error", n);
        });
      }
      var o = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        o && o(), w(window.YT);
      };
    });
    return y;
  }),
    (t.exports = e.default);
})(L, L.exports);
var k = { exports: {} },
  F = { exports: {} },
  U = { exports: {} },
  M = 1e3,
  T = M * 60,
  R = T * 60,
  V = R * 24,
  oe = V * 365.25,
  ue = function (t, e) {
    e = e || {};
    var r = typeof t;
    if (r === "string" && t.length > 0) return ie(t);
    if (r === "number" && isNaN(t) === !1) return e.long ? fe(t) : le(t);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" +
        JSON.stringify(t)
    );
  };
function ie(t) {
  if (((t = String(t)), !(t.length > 100))) {
    var e =
      /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        t
      );
    if (!!e) {
      var r = parseFloat(e[1]),
        i = (e[2] || "ms").toLowerCase();
      switch (i) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return r * oe;
        case "days":
        case "day":
        case "d":
          return r * V;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return r * R;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return r * T;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return r * M;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return r;
        default:
          return;
      }
    }
  }
}
function le(t) {
  return t >= V
    ? Math.round(t / V) + "d"
    : t >= R
    ? Math.round(t / R) + "h"
    : t >= T
    ? Math.round(t / T) + "m"
    : t >= M
    ? Math.round(t / M) + "s"
    : t + "ms";
}
function fe(t) {
  return (
    N(t, V, "day") ||
    N(t, R, "hour") ||
    N(t, T, "minute") ||
    N(t, M, "second") ||
    t + " ms"
  );
}
function N(t, e, r) {
  if (!(t < e))
    return t < e * 1.5
      ? Math.floor(t / e) + " " + r
      : Math.ceil(t / e) + " " + r + "s";
}
(function (t, e) {
  (e = t.exports = l.debug = l.default = l),
    (e.coerce = f),
    (e.disable = y),
    (e.enable = u),
    (e.enabled = w),
    (e.humanize = ue),
    (e.names = []),
    (e.skips = []),
    (e.formatters = {});
  var r;
  function i(o) {
    var n = 0,
      a;
    for (a in o) (n = (n << 5) - n + o.charCodeAt(a)), (n |= 0);
    return e.colors[Math.abs(n) % e.colors.length];
  }
  function l(o) {
    function n() {
      if (!!n.enabled) {
        var a = n,
          c = +new Date(),
          d = c - (r || c);
        (a.diff = d), (a.prev = r), (a.curr = c), (r = c);
        for (var s = new Array(arguments.length), g = 0; g < s.length; g++)
          s[g] = arguments[g];
        (s[0] = e.coerce(s[0])), typeof s[0] != "string" && s.unshift("%O");
        var v = 0;
        (s[0] = s[0].replace(/%([a-zA-Z%])/g, function (p, b) {
          if (p === "%%") return p;
          v++;
          var m = e.formatters[b];
          if (typeof m == "function") {
            var C = s[v];
            (p = m.call(a, C)), s.splice(v, 1), v--;
          }
          return p;
        })),
          e.formatArgs.call(a, s);
        var h = n.log || e.log || console.log.bind(console);
        h.apply(a, s);
      }
    }
    return (
      (n.namespace = o),
      (n.enabled = e.enabled(o)),
      (n.useColors = e.useColors()),
      (n.color = i(o)),
      typeof e.init == "function" && e.init(n),
      n
    );
  }
  function u(o) {
    e.save(o), (e.names = []), (e.skips = []);
    for (
      var n = (typeof o == "string" ? o : "").split(/[\s,]+/),
        a = n.length,
        c = 0;
      c < a;
      c++
    )
      !n[c] ||
        ((o = n[c].replace(/\*/g, ".*?")),
        o[0] === "-"
          ? e.skips.push(new RegExp("^" + o.substr(1) + "$"))
          : e.names.push(new RegExp("^" + o + "$")));
  }
  function y() {
    e.enable("");
  }
  function w(o) {
    var n, a;
    for (n = 0, a = e.skips.length; n < a; n++)
      if (e.skips[n].test(o)) return !1;
    for (n = 0, a = e.names.length; n < a; n++)
      if (e.names[n].test(o)) return !0;
    return !1;
  }
  function f(o) {
    return o instanceof Error ? o.stack || o.message : o;
  }
})(U, U.exports);
(function (t, e) {
  (e = t.exports = U.exports),
    (e.log = l),
    (e.formatArgs = i),
    (e.save = u),
    (e.load = y),
    (e.useColors = r),
    (e.storage =
      typeof chrome < "u" && typeof chrome.storage < "u"
        ? chrome.storage.local
        : w()),
    (e.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson",
    ]);
  function r() {
    return typeof window < "u" &&
      window.process &&
      window.process.type === "renderer"
      ? !0
      : (typeof document < "u" &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
          (typeof window < "u" &&
            window.console &&
            (window.console.firebug ||
              (window.console.exception && window.console.table))) ||
          (typeof navigator < "u" &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
            parseInt(RegExp.$1, 10) >= 31) ||
          (typeof navigator < "u" &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  e.formatters.j = function (f) {
    try {
      return JSON.stringify(f);
    } catch (o) {
      return "[UnexpectedJSONParseError]: " + o.message;
    }
  };
  function i(f) {
    var o = this.useColors;
    if (
      ((f[0] =
        (o ? "%c" : "") +
        this.namespace +
        (o ? " %c" : " ") +
        f[0] +
        (o ? "%c " : " ") +
        "+" +
        e.humanize(this.diff)),
      !!o)
    ) {
      var n = "color: " + this.color;
      f.splice(1, 0, n, "color: inherit");
      var a = 0,
        c = 0;
      f[0].replace(/%[a-zA-Z%]/g, function (d) {
        d !== "%%" && (a++, d === "%c" && (c = a));
      }),
        f.splice(c, 0, n);
    }
  }
  function l() {
    return (
      typeof console == "object" &&
      console.log &&
      Function.prototype.apply.call(console.log, console, arguments)
    );
  }
  function u(f) {
    try {
      f == null ? e.storage.removeItem("debug") : (e.storage.debug = f);
    } catch {}
  }
  function y() {
    var f;
    try {
      f = e.storage.debug;
    } catch {}
    return (
      !f && typeof process < "u" && "env" in process && (f = process.env.DEBUG),
      f
    );
  }
  e.enable(y());
  function w() {
    try {
      return window.localStorage;
    } catch {}
  }
})(F, F.exports);
var x = { exports: {} };
(function (t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 }),
    (e.default = [
      "cueVideoById",
      "loadVideoById",
      "cueVideoByUrl",
      "loadVideoByUrl",
      "playVideo",
      "pauseVideo",
      "stopVideo",
      "getVideoLoadedFraction",
      "cuePlaylist",
      "loadPlaylist",
      "nextVideo",
      "previousVideo",
      "playVideoAt",
      "setShuffle",
      "setLoop",
      "getPlaylist",
      "getPlaylistIndex",
      "setOption",
      "mute",
      "unMute",
      "isMuted",
      "setVolume",
      "getVolume",
      "seekTo",
      "getPlayerState",
      "getPlaybackRate",
      "setPlaybackRate",
      "getAvailablePlaybackRates",
      "getPlaybackQuality",
      "setPlaybackQuality",
      "getAvailableQualityLevels",
      "getCurrentTime",
      "getDuration",
      "removeEventListener",
      "getVideoUrl",
      "getVideoEmbedCode",
      "getOptions",
      "getOption",
      "addEventListener",
      "destroy",
      "setSize",
      "getIframe",
    ]),
    (t.exports = e.default);
})(x, x.exports);
var q = { exports: {} };
(function (t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 }),
    (e.default = [
      "ready",
      "stateChange",
      "playbackQualityChange",
      "playbackRateChange",
      "error",
      "apiChange",
      "volumeChange",
    ]),
    (t.exports = e.default);
})(q, q.exports);
var B = { exports: {} },
  z = { exports: {} };
(function (t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 }),
    (e.default = {
      BUFFERING: 3,
      ENDED: 0,
      PAUSED: 2,
      PLAYING: 1,
      UNSTARTED: -1,
      VIDEO_CUED: 5,
    }),
    (t.exports = e.default);
})(z, z.exports);
(function (t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var r = z.exports,
    i = l(r);
  function l(u) {
    return u && u.__esModule ? u : { default: u };
  }
  (e.default = {
    pauseVideo: {
      acceptableStates: [i.default.ENDED, i.default.PAUSED],
      stateChangeRequired: !1,
    },
    playVideo: {
      acceptableStates: [i.default.ENDED, i.default.PLAYING],
      stateChangeRequired: !1,
    },
    seekTo: {
      acceptableStates: [i.default.ENDED, i.default.PLAYING, i.default.PAUSED],
      stateChangeRequired: !0,
      timeout: 3e3,
    },
  }),
    (t.exports = e.default);
})(B, B.exports);
(function (t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var r = F.exports,
    i = n(r),
    l = x.exports,
    u = n(l),
    y = q.exports,
    w = n(y),
    f = B.exports,
    o = n(f);
  function n(d) {
    return d && d.__esModule ? d : { default: d };
  }
  var a = (0, i.default)("youtube-player"),
    c = {};
  (c.proxyEvents = function (d) {
    var s = {},
      g = function (O) {
        var P = "on" + O.slice(0, 1).toUpperCase() + O.slice(1);
        s[P] = function (E) {
          a('event "%s"', P, E), d.trigger(O, E);
        };
      },
      v = !0,
      h = !1,
      p = void 0;
    try {
      for (
        var b = w.default[Symbol.iterator](), m;
        !(v = (m = b.next()).done);
        v = !0
      ) {
        var C = m.value;
        g(C);
      }
    } catch (I) {
      (h = !0), (p = I);
    } finally {
      try {
        !v && b.return && b.return();
      } finally {
        if (h) throw p;
      }
    }
    return s;
  }),
    (c.promisifyPlayer = function (d) {
      var s =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
        g = {},
        v = function (P) {
          s && o.default[P]
            ? (g[P] = function () {
                for (var E = arguments.length, D = Array(E), _ = 0; _ < E; _++)
                  D[_] = arguments[_];
                return d.then(function (S) {
                  var A = o.default[P],
                    W = S.getPlayerState(),
                    G = S[P].apply(S, D);
                  return A.stateChangeRequired ||
                    (Array.isArray(A.acceptableStates) &&
                      A.acceptableStates.indexOf(W) === -1)
                    ? new Promise(function ($) {
                        var H = function Q() {
                          var K = S.getPlayerState(),
                            J = void 0;
                          typeof A.timeout == "number" &&
                            (J = setTimeout(function () {
                              S.removeEventListener("onStateChange", Q), $();
                            }, A.timeout)),
                            Array.isArray(A.acceptableStates) &&
                              A.acceptableStates.indexOf(K) !== -1 &&
                              (S.removeEventListener("onStateChange", Q),
                              clearTimeout(J),
                              $());
                        };
                        S.addEventListener("onStateChange", H);
                      }).then(function () {
                        return G;
                      })
                    : G;
                });
              })
            : (g[P] = function () {
                for (var E = arguments.length, D = Array(E), _ = 0; _ < E; _++)
                  D[_] = arguments[_];
                return d.then(function (S) {
                  return S[P].apply(S, D);
                });
              });
        },
        h = !0,
        p = !1,
        b = void 0;
      try {
        for (
          var m = u.default[Symbol.iterator](), C;
          !(h = (C = m.next()).done);
          h = !0
        ) {
          var I = C.value;
          v(I);
        }
      } catch (O) {
        (p = !0), (b = O);
      } finally {
        try {
          !h && m.return && m.return();
        } finally {
          if (p) throw b;
        }
      }
      return g;
    }),
    (e.default = c),
    (t.exports = e.default);
})(k, k.exports);
(function (t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var r =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (a) {
            return typeof a;
          }
        : function (a) {
            return a &&
              typeof Symbol == "function" &&
              a.constructor === Symbol &&
              a !== Symbol.prototype
              ? "symbol"
              : typeof a;
          },
    i = te,
    l = o(i),
    u = L.exports,
    y = o(u),
    w = k.exports,
    f = o(w);
  function o(a) {
    return a && a.__esModule ? a : { default: a };
  }
  var n = void 0;
  (e.default = function (a) {
    var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      d = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1,
      s = (0, l.default)();
    if ((n || (n = (0, y.default)(s)), c.events))
      throw new Error("Event handlers cannot be overwritten.");
    if (typeof a == "string" && !document.getElementById(a))
      throw new Error('Element "' + a + '" does not exist.');
    c.events = f.default.proxyEvents(s);
    var g = new Promise(function (h) {
        if (
          (typeof a > "u" ? "undefined" : r(a)) === "object" &&
          a.playVideo instanceof Function
        ) {
          var p = a;
          h(p);
        } else
          n.then(function (b) {
            var m = new b.Player(a, c);
            return (
              s.on("ready", function () {
                h(m);
              }),
              null
            );
          });
      }),
      v = f.default.promisifyPlayer(g, d);
    return (v.on = s.on), (v.off = s.off), v;
  }),
    (t.exports = e.default);
})(Y, Y.exports);
const se = X(Y.exports),
  de = ee({ __proto__: null, default: se }, [Y.exports]);
export { de as i };

