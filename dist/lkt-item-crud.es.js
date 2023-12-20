import { defineComponent as C, useSlots as w, ref as m, computed as I, watch as p, resolveComponent as B, openBlock as c, createElementBlock as f, createElementVNode as k, toDisplayString as D, renderSlot as y, createCommentVNode as v, createBlock as L } from "vue";
import { httpCall as _ } from "lkt-http-client";
const O = { class: "lkt-item-crud" }, b = {
  key: 0,
  class: "lkt-item-crud_header"
}, j = { class: "lkt-item-crud_header-title" }, x = { class: "lkt-item-crud_header-slot" }, E = {
  key: 1,
  class: "lkt-item-crud_content"
}, N = { name: "LktItemCrud", inheritAttrs: !1 }, $ = /* @__PURE__ */ C({
  ...N,
  props: {
    modelValue: { type: Object, required: !1, default: () => ({}) },
    readResource: { type: String, required: !0 },
    readData: { type: Object, required: !1, default: () => ({}) },
    createResource: { type: String, required: !1 },
    updateResource: { type: String, required: !1 },
    deleteResource: { type: String, required: !1 },
    title: { type: String, default: "" }
  },
  emits: ["update:modelValue", "read", "save", "perms"],
  setup(a, { expose: h, emit: V }) {
    const r = a, q = w(), l = V, t = m(!0), s = m(r.modelValue), n = m([]), i = async () => (t.value = !0, await _(r.readResource, r.readData).then((e) => {
      t.value = !1, s.value = e.data, n.value = e.perms, l("read", e);
    })), R = I(() => t.value ? !1 : r.title || !!q["post-title"]);
    p(() => r.modelValue, (e) => s.value = e), p(s, () => l("update:modelValue", s.value)), p(n, () => l("perms", n.value));
    const S = async (e) => {
      const u = r.createResource;
      return t.value = !0, await _(u, { ...e }).then((o) => {
        t.value = !1, l("save", o);
      });
    }, g = async (e) => {
      const u = r.updateResource;
      return t.value = !0, await _(u, { ...e }).then((o) => {
        t.value = !1, l("save", o);
      });
    };
    return r.readResource && i(), h({
      fetchItem: i,
      create: S,
      update: g,
      refresh: i
    }), (e, u) => {
      const o = B("lkt-loader");
      return c(), f("article", O, [
        R.value ? (c(), f("header", b, [
          k("h1", j, D(a.title), 1),
          k("div", x, [
            y(e.$slots, "post-title", { item: s.value })
          ])
        ])) : v("", !0),
        t.value ? v("", !0) : (c(), f("div", E, [
          y(e.$slots, "item", { item: s.value })
        ])),
        t.value ? (c(), L(o, { key: 2 })) : v("", !0)
      ]);
    };
  }
}), d = {
  detail: 0,
  form: 1,
  quick: 2,
  card: 3,
  isValid(a) {
    return [
      d.detail,
      d.form,
      d.quick,
      d.card
    ].indexOf(a) !== -1;
  }
}, M = {
  install: (a, h = {}) => {
    a.component("LktItemCrud", $);
  }
};
export {
  d as ViewMode,
  M as default
};
