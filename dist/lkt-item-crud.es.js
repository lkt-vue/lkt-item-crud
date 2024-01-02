import { defineComponent as Y, useSlots as Z, ref as r, computed as p, watch as b, resolveComponent as g, openBlock as d, createElementBlock as m, createElementVNode as I, toDisplayString as N, renderSlot as C, createCommentVNode as D, withDirectives as _, createVNode as V, withCtx as x, unref as j, vShow as O, createBlock as q } from "vue";
import { httpCall as ee } from "lkt-http-client";
import { DataState as E } from "lkt-data-state";
const te = { class: "lkt-item-crud" }, ae = {
  key: 0,
  class: "lkt-item-crud_header"
}, le = { class: "lkt-item-crud_header-title" }, ue = { class: "lkt-item-crud_header-slot" }, oe = { class: "lkt-item-crud-buttons" }, re = { key: 1 }, se = { key: 1 }, de = {
  key: 1,
  class: "lkt-item-crud_content"
}, ne = {
  key: 0,
  class: "lkt-grid-1"
}, ie = { name: "LktItemCrud", inheritAttrs: !1 }, ce = /* @__PURE__ */ Y({
  ...ie,
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
  emits: ["update:modelValue", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(u, { expose: w, emit: A }) {
    const t = u, R = Z(), s = A;
    let H = [];
    const a = r(!0), o = r(t.modelValue), B = r(H), i = r(!1), c = r(!1), v = r(!1), n = r(200), k = r(null), y = r(null), S = r(new E(JSON.parse(JSON.stringify(o.value)))), P = p(() => t.saveIsCreate ? t.createConfirm : t.updateConfirm), U = p(() => t.saveIsCreate ? t.createResource : t.updateResource), z = p(() => t.saveIsCreate ? t.createData : t.updateData), F = p(() => t.saveIsCreate ? t.createDisabled : t.updateDisabled), L = async () => (a.value = !0, n.value = -1, await ee(t.readResource, t.readData).then((e) => {
      if (a.value = !1, !e.success) {
        c.value = !1, n.value = e.httpStatus, s("error", e.httpStatus);
        return;
      }
      c.value = !0, o.value = e.data, B.value = e.perms, S.value = new E(JSON.parse(JSON.stringify(o.value))), s("read", e);
    })), G = p(() => a.value ? !1 : t.title || !!R["post-title"]);
    b(() => t.modelValue, (e) => {
      o.value = e, S.value.increment(JSON.parse(JSON.stringify(e)));
    }, { deep: !0 }), b(o, (e) => {
      s("update:modelValue", o.value), S.value.increment(JSON.parse(JSON.stringify(e)));
    }, { deep: !0 }), b(B, () => s("perms", B.value));
    const J = p(() => F.value ? !1 : S.value.changed());
    b(J, (e) => s("modified-data", e)), t.readResource && L();
    const K = (e, l) => {
      if (a.value = !1, n.value = l.httpStatus, !l.success) {
        v.value = !0, s("error", l.httpStatus);
        return;
      }
      v.value = !0, s("drop", l);
    }, Q = (e, l) => {
      if (a.value = !1, n.value = l.httpStatus, !l.success) {
        v.value = !0, s("error", l.httpStatus);
        return;
      }
      v.value = !0;
      let h = t.saveIsCreate ? "create" : "update";
      s(h, l);
    }, M = () => {
      a.value = !0, n.value = -1;
    }, T = () => {
      a.value = !1;
    };
    return w({
      doDrop: () => {
        y.value && typeof y.value.click == "function" && y.value.click();
      },
      doRefresh: L,
      doSave: () => {
        k.value && typeof k.value.click == "function" && k.value.click();
      }
    }), (e, l) => {
      const h = g("lkt-button"), W = g("lkt-field-switch"), $ = g("lkt-http-info"), X = g("lkt-loader");
      return d(), m("article", te, [
        G.value ? (d(), m("header", ae, [
          I("h1", le, N(u.title), 1),
          I("div", ue, [
            C(e.$slots, "post-title", {
              item: o.value,
              loading: a.value
            })
          ])
        ])) : D("", !0),
        _(I("div", oe, [
          _(V(h, {
            ref: (f) => y.value = f,
            palette: "danger",
            disabled: u.dropDisabled,
            "confirm-modal": u.dropConfirm,
            resource: u.dropResource,
            "resource-data": u.dropData,
            onLoading: M,
            onLoaded: T,
            onClick: K
          }, {
            default: x(() => [
              j(R)["button-drop"] ? C(e.$slots, "button-drop", {
                key: 0,
                item: o.value,
                editMode: i.value
              }) : (d(), m("span", re, N(u.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [O, !a.value && i.value && c.value]
          ]),
          _(V(h, {
            ref: (f) => k.value = f,
            palette: "success",
            disabled: !J.value,
            "confirm-modal": P.value,
            resource: U.value,
            "resource-data": z.value,
            onLoading: M,
            onLoaded: T,
            onClick: Q
          }, {
            default: x(() => [
              j(R)["button-save"] ? C(e.$slots, "button-save", {
                key: 0,
                item: o.value,
                editMode: i.value
              }) : (d(), m("span", se, N(u.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [O, !a.value && i.value && c.value]
          ]),
          _(V(W, {
            modelValue: i.value,
            "onUpdate:modelValue": l[0] || (l[0] = (f) => i.value = f),
            label: u.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [O, !a.value && c.value]
          ])
        ], 512), [
          [O, c.value]
        ]),
        a.value ? D("", !0) : (d(), m("div", de, [
          c.value ? (d(), m("div", ne, [
            v.value ? (d(), q($, {
              key: 0,
              code: n.value,
              quick: "",
              palette: n.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: l[1] || (l[1] = (f) => v.value = !1)
            }, null, 8, ["code", "palette"])) : D("", !0),
            C(e.$slots, "item", {
              item: o.value,
              loading: a.value,
              editMode: i.value
            })
          ])) : (d(), q($, {
            key: 1,
            code: n.value
          }, null, 8, ["code"]))
        ])),
        a.value ? (d(), q(X, { key: 2 })) : D("", !0)
      ]);
    };
  }
});
const ye = {
  install: (u, w = {}) => {
    u.component("LktItemCrud", ce);
  }
};
export {
  ye as default
};
