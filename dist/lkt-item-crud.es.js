import { defineComponent as Q, useSlots as W, ref as u, computed as m, watch as B, resolveComponent as S, openBlock as r, createElementBlock as f, createElementVNode as V, toDisplayString as q, renderSlot as b, createCommentVNode as C, withDirectives as g, createVNode as I, withCtx as j, unref as O, vShow as D, createBlock as L } from "vue";
import { httpCall as X } from "lkt-http-client";
const Y = { class: "lkt-item-crud" }, Z = {
  key: 0,
  class: "lkt-item-crud_header"
}, ee = { class: "lkt-item-crud_header-title" }, te = { class: "lkt-item-crud_header-slot" }, ae = { class: "lkt-item-crud-buttons" }, le = { key: 1 }, oe = { key: 1 }, ue = {
  key: 1,
  class: "lkt-item-crud_content"
}, re = {
  key: 0,
  class: "lkt-grid-1"
}, se = { name: "LktItemCrud", inheritAttrs: !1 }, de = /* @__PURE__ */ Q({
  ...se,
  props: {
    modelValue: { type: Object, required: !1, default: () => ({}) },
    title: { type: String, default: "" },
    editModeText: { type: String, default: "Edition Mode" },
    saveText: { type: String, default: "Save" },
    dropText: { type: String, default: "Delete" },
    readResource: { type: String, required: !0 },
    createResource: { type: String, required: !1 },
    updateResource: { type: String, required: !1 },
    dropResource: { type: String, required: !1 },
    readData: { type: Object, required: !1, default: () => ({}) },
    createData: { type: Object, required: !1, default: () => ({}) },
    updateData: { type: Object, required: !1, default: () => ({}) },
    dropData: { type: Object, required: !1, default: () => ({}) },
    saveIsCreate: { type: Boolean, default: !1 },
    createConfirm: { type: String, default: "" },
    updateConfirm: { type: String, default: "" },
    dropConfirm: { type: String, default: "" },
    createDisabled: { type: Boolean, default: !1 },
    updateDisabled: { type: Boolean, default: !1 },
    dropDisabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "read", "create", "update", "drop", "perms", "error"],
  setup(o, { expose: w, emit: E }) {
    const e = o, _ = W(), s = E;
    let N = [];
    const a = u(!0), d = u(e.modelValue), R = u(N), i = u(!1), c = u(!1), v = u(!1), n = u(200), k = u(null), y = u(null), A = m(() => e.saveIsCreate ? e.createConfirm : e.updateConfirm), H = m(() => e.saveIsCreate ? e.createResource : e.updateResource), P = m(() => e.saveIsCreate ? e.createData : e.updateData), U = m(() => e.saveIsCreate ? e.createDisabled : e.updateDisabled), M = async () => (a.value = !0, n.value = -1, await X(e.readResource, e.readData).then((t) => {
      if (a.value = !1, !t.success) {
        c.value = !1, n.value = t.httpStatus, s("error", t.httpStatus);
        return;
      }
      c.value = !0, d.value = t.data, R.value = t.perms, s("read", t);
    })), z = m(() => a.value ? !1 : e.title || !!_["post-title"]);
    B(() => e.modelValue, (t) => d.value = t), B(d, () => s("update:modelValue", d.value)), B(R, () => s("perms", R.value)), e.readResource && M();
    const F = (t, l) => {
      if (a.value = !1, n.value = l.httpStatus, !l.success) {
        v.value = !0, s("error", l.httpStatus);
        return;
      }
      v.value = !0, s("drop", l);
    }, G = (t, l) => {
      if (a.value = !1, n.value = l.httpStatus, !l.success) {
        v.value = !0, s("error", l.httpStatus);
        return;
      }
      v.value = !0;
      let h = e.saveIsCreate ? "create" : "update";
      s(h, l);
    }, $ = () => {
      a.value = !0, n.value = -1;
    }, x = () => {
      a.value = !1;
    };
    return w({
      doDrop: () => {
        y.value && typeof y.value.click == "function" && y.value.click();
      },
      doRefresh: M,
      doSave: () => {
        k.value && typeof k.value.click == "function" && k.value.click();
      }
    }), (t, l) => {
      const h = S("lkt-button"), J = S("lkt-field-switch"), T = S("lkt-http-info"), K = S("lkt-loader");
      return r(), f("article", Y, [
        z.value ? (r(), f("header", Z, [
          V("h1", ee, q(o.title), 1),
          V("div", te, [
            b(t.$slots, "post-title", {
              item: d.value,
              loading: a.value
            })
          ])
        ])) : C("", !0),
        g(V("div", ae, [
          g(I(h, {
            ref: (p) => y.value = p,
            palette: "danger",
            disabled: o.dropDisabled,
            "confirm-modal": o.dropConfirm,
            resource: o.dropResource,
            "resource-data": o.dropData,
            onLoading: $,
            onLoaded: x,
            onClick: F
          }, {
            default: j(() => [
              O(_)["button-drop"] ? b(t.$slots, "button-drop", {
                key: 0,
                item: d.value,
                editMode: i.value
              }) : (r(), f("span", le, q(o.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [D, !a.value && i.value && c.value]
          ]),
          g(I(h, {
            ref: (p) => k.value = p,
            palette: "success",
            disabled: U.value,
            "confirm-modal": A.value,
            resource: H.value,
            "resource-data": P.value,
            onLoading: $,
            onLoaded: x,
            onClick: G
          }, {
            default: j(() => [
              O(_)["button-save"] ? b(t.$slots, "button-save", {
                key: 0,
                item: d.value,
                editMode: i.value
              }) : (r(), f("span", oe, q(o.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [D, !a.value && i.value && c.value]
          ]),
          g(I(J, {
            modelValue: i.value,
            "onUpdate:modelValue": l[0] || (l[0] = (p) => i.value = p),
            label: o.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [D, !a.value && c.value]
          ])
        ], 512), [
          [D, c.value]
        ]),
        a.value ? C("", !0) : (r(), f("div", ue, [
          c.value ? (r(), f("div", re, [
            v.value ? (r(), L(T, {
              key: 0,
              code: n.value,
              quick: "",
              palette: n.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: l[1] || (l[1] = (p) => v.value = !1)
            }, null, 8, ["code", "palette"])) : C("", !0),
            b(t.$slots, "item", {
              item: d.value,
              loading: a.value,
              editMode: i.value
            })
          ])) : (r(), L(T, {
            key: 1,
            code: n.value
          }, null, 8, ["code"]))
        ])),
        a.value ? (r(), L(K, { key: 2 })) : C("", !0)
      ]);
    };
  }
}), pe = {
  install: (o, w = {}) => {
    o.component("LktItemCrud", de);
  }
};
export {
  pe as default
};
