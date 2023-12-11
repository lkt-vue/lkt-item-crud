import { defineComponent as y, ref as c, watch as u, resolveComponent as V, openBlock as o, createElementBlock as n, createElementVNode as f, toDisplayString as C, renderSlot as k, createCommentVNode as m, createBlock as q } from "vue";
import { httpCall as g } from "lkt-http-client";
const I = { class: "lkt-item-crud" }, S = {
  key: 0,
  class: "lkt-item-crud_header"
}, w = { class: "lkt-item-crud_header-title" }, B = { class: "lkt-item-crud_header-slot" }, D = {
  key: 1,
  class: "lkt-item-crud_content"
}, L = { name: "LktItemCrud", inheritAttrs: !1 }, O = /* @__PURE__ */ y({
  ...L,
  props: {
    modelValue: { type: Object, required: !1, default: () => ({}) },
    readResource: { type: String, required: !0 },
    readData: { type: Object, required: !1, default: () => ({}) },
    title: { type: String, default: "" }
  },
  emits: ["update:modelValue", "read", "save", "perms"],
  setup(t, { expose: p, emit: h }) {
    const r = t, d = h, l = c(!0), a = c(r.modelValue), i = c([]), _ = async () => await g(r.readResource, r.readData).then((e) => {
      l.value = !1, a.value = e.data, i.value = e.perms, d("read", e);
    });
    return u(() => r.modelValue, (e) => a.value = e), u(a, () => d("update:modelValue", a.value)), u(i, () => d("perms", i.value)), r.readResource && _(), p({
      fetchItem: _
    }), (e, R) => {
      const v = V("lkt-loader");
      return o(), n("article", I, [
        l.value ? m("", !0) : (o(), n("header", S, [
          f("h1", w, C(t.title), 1),
          f("div", B, [
            k(e.$slots, "post-title", { item: a.value })
          ])
        ])),
        l.value ? m("", !0) : (o(), n("div", D, [
          k(e.$slots, "item", { item: a.value })
        ])),
        l.value ? (o(), q(v, { key: 2 })) : m("", !0)
      ]);
    };
  }
}), s = {
  detail: 0,
  form: 1,
  quick: 2,
  card: 3,
  isValid(t) {
    return [
      s.detail,
      s.form,
      s.quick,
      s.card
    ].indexOf(t) !== -1;
  }
}, x = {
  install: (t, p = {}) => {
    t.component("LktItemCrud", O);
  }
};
export {
  s as ViewMode,
  x as default
};
