import { defineComponent as Q, useSlots as W, ref as u, computed as f, watch as _, resolveComponent as h, openBlock as r, createElementBlock as p, createElementVNode as R, toDisplayString as B, renderSlot as S, createCommentVNode as b, withDirectives as V, createVNode as q, withCtx as j, unref as O, vShow as I, createBlock as L } from "vue";
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
    const e = o, C = W(), s = E;
    let N = [];
    const a = u(!0), d = u(e.modelValue), g = u(N), i = u(!1), D = u(!1), c = u(!1), n = u(200), m = u(null), k = u(null), A = f(() => e.saveIsCreate ? e.createConfirm : e.updateConfirm), H = f(() => e.saveIsCreate ? e.createResource : e.updateResource), P = f(() => e.saveIsCreate ? e.createData : e.updateData), U = f(() => e.saveIsCreate ? e.createDisabled : e.updateDisabled), M = async () => (a.value = !0, n.value = -1, await X(e.readResource, e.readData).then((t) => {
      if (a.value = !1, !t.success) {
        D.value = !1, n.value = t.httpStatus, s("error", t.httpStatus);
        return;
      }
      D.value = !0, d.value = t.data, g.value = t.perms, s("read", t);
    })), z = f(() => a.value ? !1 : e.title || !!C["post-title"]);
    _(() => e.modelValue, (t) => d.value = t), _(d, () => s("update:modelValue", d.value)), _(g, () => s("perms", g.value)), e.readResource && M();
    const F = (t, l) => {
      if (a.value = !1, n.value = l.httpStatus, !l.success) {
        c.value = !0, s("error", l.httpStatus);
        return;
      }
      c.value = !0, s("drop", l);
    }, G = (t, l) => {
      if (a.value = !1, n.value = l.httpStatus, !l.success) {
        c.value = !0, s("error", l.httpStatus);
        return;
      }
      c.value = !0;
      let y = e.saveIsCreate ? "create" : "update";
      s(y, l);
    }, $ = () => {
      a.value = !0, n.value = -1;
    }, x = () => {
      a.value = !1;
    };
    return w({
      doDrop: () => {
        k.value && typeof k.value.click == "function" && k.value.click();
      },
      doRefresh: M,
      doSave: () => {
        m.value && typeof m.value.click == "function" && m.value.click();
      }
    }), (t, l) => {
      const y = h("lkt-button"), J = h("lkt-field-switch"), T = h("lkt-http-info"), K = h("lkt-loader");
      return r(), p("article", Y, [
        z.value ? (r(), p("header", Z, [
          R("h1", ee, B(o.title), 1),
          R("div", te, [
            S(t.$slots, "post-title", {
              item: d.value,
              loading: a.value
            })
          ])
        ])) : b("", !0),
        R("div", ae, [
          V(q(y, {
            ref: (v) => k.value = v,
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
              O(C)["button-drop"] ? S(t.$slots, "button-drop", {
                key: 0,
                item: d.value,
                editMode: i.value
              }) : (r(), p("span", le, B(o.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [I, !a.value && i.value]
          ]),
          V(q(y, {
            ref: (v) => m.value = v,
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
              O(C)["button-save"] ? S(t.$slots, "button-save", {
                key: 0,
                item: d.value,
                editMode: i.value
              }) : (r(), p("span", oe, B(o.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [I, !a.value && i.value]
          ]),
          V(q(J, {
            modelValue: i.value,
            "onUpdate:modelValue": l[0] || (l[0] = (v) => i.value = v),
            label: o.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [I, !a.value]
          ])
        ]),
        a.value ? b("", !0) : (r(), p("div", ue, [
          D.value ? (r(), p("div", re, [
            c.value ? (r(), L(T, {
              key: 0,
              code: n.value,
              quick: "",
              palette: n.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: l[1] || (l[1] = (v) => c.value = !1)
            }, null, 8, ["code", "palette"])) : b("", !0),
            S(t.$slots, "item", {
              item: d.value,
              loading: a.value,
              editMode: i.value
            })
          ])) : (r(), L(T, {
            key: 1,
            code: n.value
          }, null, 8, ["code"]))
        ])),
        a.value ? (r(), L(K, { key: 2 })) : b("", !0)
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
