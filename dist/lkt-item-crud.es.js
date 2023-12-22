import { defineComponent as q, useSlots as w, ref as p, computed as I, watch as m, resolveComponent as B, openBlock as c, createElementBlock as f, createElementVNode as h, toDisplayString as D, renderSlot as k, createCommentVNode as v, createBlock as L } from "vue";
import { httpCall as d } from "lkt-http-client";
const b = { class: "lkt-item-crud" }, j = {
  key: 0,
  class: "lkt-item-crud_header"
}, E = { class: "lkt-item-crud_header-title" }, N = { class: "lkt-item-crud_header-slot" }, O = {
  key: 1,
  class: "lkt-item-crud_content"
}, $ = { name: "LktItemCrud", inheritAttrs: !1 }, x = /* @__PURE__ */ q({
  ...$,
  props: {
    modelValue: { type: Object, required: !1, default: () => ({}) },
    readResource: { type: String, required: !0 },
    readData: { type: Object, required: !1, default: () => ({}) },
    createResource: { type: String, required: !1 },
    updateResource: { type: String, required: !1 },
    dropResource: { type: String, required: !1 },
    title: { type: String, default: "" }
  },
  emits: ["update:modelValue", "read", "create", "update", "drop", "perms"],
  setup(u, { expose: _, emit: y }) {
    const r = u, R = w(), s = y, t = p(!0), o = p(r.modelValue), n = p([]), i = async () => (t.value = !0, await d(r.readResource, r.readData).then((e) => {
      t.value = !1, o.value = e.data, n.value = e.perms, s("read", e);
    })), S = I(() => t.value ? !1 : r.title || !!R["post-title"]);
    m(() => r.modelValue, (e) => o.value = e), m(o, () => s("update:modelValue", o.value)), m(n, () => s("perms", n.value));
    const g = async (e) => {
      const l = r.createResource;
      return t.value = !0, await d(l, { ...e }).then((a) => {
        t.value = !1, s("create", a);
      });
    }, C = async (e) => {
      const l = r.updateResource;
      return t.value = !0, await d(l, { ...e }).then((a) => {
        t.value = !1, s("update", a);
      });
    }, V = async (e) => {
      const l = r.dropResource;
      return t.value = !0, await d(l, { ...e }).then((a) => {
        t.value = !1, s("drop", a);
      });
    };
    return r.readResource && i(), _({
      fetchItem: i,
      create: g,
      update: C,
      drop: V,
      refresh: i
    }), (e, l) => {
      const a = B("lkt-loader");
      return c(), f("article", b, [
        S.value ? (c(), f("header", j, [
          h("h1", E, D(u.title), 1),
          h("div", N, [
            k(e.$slots, "post-title", { item: o.value })
          ])
        ])) : v("", !0),
        t.value ? v("", !0) : (c(), f("div", O, [
          k(e.$slots, "item", { item: o.value })
        ])),
        t.value ? (c(), L(a, { key: 2 })) : v("", !0)
      ]);
    };
  }
}), z = {
  install: (u, _ = {}) => {
    u.component("LktItemCrud", x);
  }
};
export {
  z as default
};
