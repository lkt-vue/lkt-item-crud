import { defineComponent as X, useSlots as Y, ref as s, computed as p, watch as b, resolveComponent as g, openBlock as d, createElementBlock as m, createElementVNode as L, toDisplayString as w, renderSlot as D, createCommentVNode as y, withDirectives as _, createBlock as V, withCtx as j, unref as E, vShow as R, createVNode as N } from "vue";
import { httpCall as Z } from "lkt-http-client";
import { DataState as ee } from "lkt-data-state";
const te = { class: "lkt-item-crud" }, ae = {
  key: 0,
  class: "lkt-item-crud_header"
}, le = { class: "lkt-item-crud_header-title" }, ue = { class: "lkt-item-crud_header-slot" }, re = { class: "lkt-item-crud-buttons" }, oe = { key: 1 }, se = { key: 1 }, de = {
  key: 1,
  class: "lkt-item-crud_content"
}, ie = {
  key: 0,
  class: "lkt-grid-1"
}, ne = { name: "LktItemCrud", inheritAttrs: !1 }, ce = /* @__PURE__ */ X({
  ...ne,
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
    isCreate: { type: Boolean, default: !1 },
    createConfirm: { type: String, default: "" },
    updateConfirm: { type: String, default: "" },
    dropConfirm: { type: String, default: "" },
    createDisabled: { type: Boolean, default: !1 },
    updateDisabled: { type: Boolean, default: !1 },
    dropDisabled: { type: Boolean, default: !1 },
    saveValidator: { type: Function, required: !1, default: () => !0 }
  },
  emits: ["update:modelValue", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(u, { expose: M, emit: A }) {
    const e = u, q = Y(), o = A;
    let F = [];
    const a = s(!0), r = s(e.modelValue), B = s(F), c = s(!1), i = s(!1), v = s(!1), n = s(200), h = s(null), S = s(null), k = s(new ee(r.value)), H = p(() => e.isCreate ? e.createConfirm : e.updateConfirm), P = p(() => e.isCreate ? e.createResource : e.updateResource), U = p(() => e.isCreate ? e.createData : e.updateData), z = p(() => e.isCreate ? e.createDisabled : e.updateDisabled), I = async () => {
      a.value = !0, n.value = -1;
      try {
        const t = await Z(e.readResource, e.readData);
        if (a.value = !1, !t.success) {
          i.value = !1, n.value = t.httpStatus, o("error", t.httpStatus);
          return;
        }
        i.value = !0, r.value = t.data, B.value = t.perms, k.value.increment(r.value).turnStoredIntoOriginal(), o("read", t);
      } catch {
        a.value = !1, i.value = !1, n.value = 404, o("error", 404);
        return;
      }
    }, G = p(() => a.value ? !1 : e.title || !!q["post-title"]);
    b(() => e.modelValue, (t) => {
      r.value = t, k.value.increment(t);
    }, { deep: !0 }), b(r, (t) => {
      o("update:modelValue", r.value), k.value.increment(t);
    }, { deep: !0 }), b(B, () => o("perms", B.value));
    const O = p(() => z.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : k.value.changed());
    b(O, (t) => o("modified-data", t)), e.readResource && !e.isCreate ? I() : e.isCreate && (i.value = !0, c.value = !0, a.value = !1);
    const J = (t, l) => {
      if (a.value = !1, n.value = l.httpStatus, !l.success) {
        v.value = !0, o("error", l.httpStatus);
        return;
      }
      v.value = !0, o("drop", l);
    }, K = (t, l) => {
      if (a.value = !1, n.value = l.httpStatus, !l.success) {
        v.value = !0, o("error", l.httpStatus);
        return;
      }
      v.value = !0;
      let C = e.isCreate ? "create" : "update";
      e.isCreate || k.value.turnStoredIntoOriginal(), o(C, l);
    }, T = () => {
      a.value = !0, n.value = -1;
    }, $ = () => {
      a.value = !1;
    };
    return M({
      doDrop: () => {
        S.value && typeof S.value.click == "function" && S.value.click();
      },
      doRefresh: I,
      doSave: () => {
        h.value && typeof h.value.click == "function" && h.value.click();
      }
    }), (t, l) => {
      const C = g("lkt-button"), Q = g("lkt-field-switch"), x = g("lkt-http-info"), W = g("lkt-loader");
      return d(), m("article", te, [
        G.value ? (d(), m("header", ae, [
          L("h1", le, w(u.title), 1),
          L("div", ue, [
            D(t.$slots, "post-title", {
              item: r.value,
              loading: a.value
            })
          ])
        ])) : y("", !0),
        _(L("div", re, [
          u.isCreate ? y("", !0) : _((d(), V(C, {
            key: 0,
            ref: (f) => S.value = f,
            palette: "danger",
            disabled: u.dropDisabled,
            "confirm-modal": u.dropConfirm,
            resource: u.dropResource,
            "resource-data": u.dropData,
            onLoading: T,
            onLoaded: $,
            onClick: J
          }, {
            default: j(() => [
              E(q)["button-drop"] ? D(t.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: c.value
              }) : (d(), m("span", oe, w(u.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"])), [
            [R, !a.value && c.value && i.value]
          ]),
          _(N(C, {
            ref: (f) => h.value = f,
            palette: "success",
            disabled: !O.value,
            "confirm-modal": H.value,
            resource: P.value,
            "resource-data": U.value,
            onLoading: T,
            onLoaded: $,
            onClick: K
          }, {
            default: j(() => [
              E(q)["button-save"] ? D(t.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: c.value
              }) : (d(), m("span", se, w(u.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [R, !a.value && c.value && i.value]
          ]),
          _(N(Q, {
            modelValue: c.value,
            "onUpdate:modelValue": l[0] || (l[0] = (f) => c.value = f),
            label: u.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [R, !a.value && i.value && !u.isCreate]
          ])
        ], 512), [
          [R, i.value]
        ]),
        a.value ? y("", !0) : (d(), m("div", de, [
          i.value ? (d(), m("div", ie, [
            v.value ? (d(), V(x, {
              key: 0,
              code: n.value,
              quick: "",
              palette: n.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: l[1] || (l[1] = (f) => v.value = !1)
            }, null, 8, ["code", "palette"])) : y("", !0),
            D(t.$slots, "item", {
              item: r.value,
              loading: a.value,
              editMode: c.value
            })
          ])) : (d(), V(x, {
            key: 1,
            code: n.value
          }, null, 8, ["code"]))
        ])),
        a.value ? (d(), V(W, { key: 2 })) : y("", !0)
      ]);
    };
  }
});
const ye = {
  install: (u, M = {}) => {
    u.component("LktItemCrud", ce);
  }
};
export {
  ye as default
};
