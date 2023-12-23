import { defineComponent as I, useSlots as b, ref as i, computed as B, watch as h, resolveComponent as D, openBlock as l, createElementBlock as c, createElementVNode as k, toDisplayString as L, renderSlot as y, createCommentVNode as d, createBlock as j } from "vue";
import { httpCall as p } from "lkt-http-client";
const A = { class: "lkt-item-crud" }, E = {
  key: 0,
  class: "lkt-item-crud_header"
}, N = { class: "lkt-item-crud_header-title" }, O = { class: "lkt-item-crud_header-slot" }, $ = {
  key: 1,
  class: "lkt-item-crud_content"
}, x = { key: 0 }, H = { key: 1 }, P = { name: "LktItemCrud", inheritAttrs: !1 }, z = /* @__PURE__ */ I({
  ...P,
  props: {
    modelValue: { type: Object, required: !1, default: () => ({}) },
    readResource: { type: String, required: !0 },
    readData: { type: Object, required: !1, default: () => ({}) },
    createResource: { type: String, required: !1 },
    updateResource: { type: String, required: !1 },
    dropResource: { type: String, required: !1 },
    title: { type: String, default: "" }
  },
  emits: ["update:modelValue", "read", "create", "update", "drop", "perms", "error"],
  setup(n, { expose: _, emit: S }) {
    const r = n, g = b(), a = S;
    let R = [];
    const t = i(!0), o = i(r.modelValue), m = i(R), v = i(200), f = async () => (t.value = !0, await p(r.readResource, r.readData).then((e) => {
      if (t.value = !1, !e.success) {
        v.value = e.httpStatus, a("error", e.httpStatus);
        return;
      }
      o.value = e.data, m.value = e.perms, a("read", e);
    })), C = B(() => t.value ? !1 : r.title || !!g["post-title"]);
    h(() => r.modelValue, (e) => o.value = e), h(o, () => a("update:modelValue", o.value)), h(m, () => a("perms", m.value));
    const V = async (e) => {
      const u = r.createResource;
      return t.value = !0, await p(u, { ...e }).then((s) => {
        t.value = !1, a("create", s);
      });
    }, q = async (e) => {
      const u = r.updateResource;
      return t.value = !0, await p(u, { ...e }).then((s) => {
        t.value = !1, a("update", s);
      });
    }, w = async (e) => {
      const u = r.dropResource;
      return t.value = !0, await p(u, { ...e }).then((s) => {
        t.value = !1, a("drop", s);
      });
    };
    return r.readResource && f(), _({
      fetchItem: f,
      create: V,
      update: q,
      drop: w,
      refresh: f
    }), (e, u) => {
      const s = D("lkt-loader");
      return l(), c("article", A, [
        C.value ? (l(), c("header", E, [
          k("h1", N, L(n.title), 1),
          k("div", O, [
            y(e.$slots, "post-title", {
              item: o.value,
              loading: t.value
            })
          ])
        ])) : d("", !0),
        t.value ? d("", !0) : (l(), c("div", $, [
          v.value === 200 ? (l(), c("div", x, [
            y(e.$slots, "item", {
              item: o.value,
              loading: t.value
            })
          ])) : d("", !0),
          v.value !== 200 ? (l(), c("div", H, " An error occurred! ")) : d("", !0)
        ])),
        t.value ? (l(), j(s, { key: 2 })) : d("", !0)
      ]);
    };
  }
}), J = {
  install: (n, _ = {}) => {
    n.component("LktItemCrud", z);
  }
};
export {
  J as default
};
