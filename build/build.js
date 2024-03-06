import { defineComponent as ue, useSlots as re, ref as n, computed as o, watch as B, resolveComponent as w, openBlock as i, createElementBlock as m, createElementVNode as j, toDisplayString as M, renderSlot as O, createCommentVNode as C, withDirectives as R, createBlock as V, withCtx as F, unref as H, vShow as _, createVNode as P } from "vue";
import { httpCall as oe } from "lkt-http-client";
import { DataState as de } from "lkt-data-state";
const se = { class: "lkt-item-crud" }, ne = {
  key: 0,
  class: "lkt-item-crud_header"
}, ie = { class: "lkt-item-crud_header-title" }, ce = { class: "lkt-item-crud_header-slot" }, ve = { class: "lkt-item-crud-buttons" }, fe = { key: 1 }, pe = { key: 1 }, me = {
  key: 1,
  class: "lkt-item-crud_content"
}, ye = {
  key: 0,
  class: "lkt-grid-1"
}, he = { name: "LktItemCrud", inheritAttrs: !1 }, Ce = /* @__PURE__ */ ue({
  ...he,
  props: {
    modelValue: { type: Object, required: !1, default: () => ({}) },
    title: { type: String, default: "" },
    editModeText: { type: String, default: "Edition Mode" },
    saveText: { type: String, default: "Save" },
    dropText: { type: String, default: "Delete" },
    hiddenSave: { type: Boolean, default: !1 },
    hiddenDrop: { type: Boolean, default: !1 },
    hiddenButtons: { type: Boolean, default: !1 },
    readResource: { type: String, required: !1 },
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
    createConfirmData: { type: Object, default: () => ({}) },
    updateConfirmData: { type: Object, default: () => ({}) },
    dropConfirmData: { type: Object, default: () => ({}) },
    createDisabled: { type: Boolean, default: !1 },
    updateDisabled: { type: Boolean, default: !1 },
    dropDisabled: { type: Boolean, default: !1 },
    saveValidator: { type: Function, required: !1, default: () => !0 }
  },
  emits: ["update:modelValue", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(a, { expose: I, emit: z }) {
    const e = a, q = re(), d = z;
    let G = [];
    const l = n(!0), r = n(e.modelValue), y = n(G), c = n(!1), v = n(!1), f = n(!1), s = n(200), S = n(null), k = n(null), h = n(new de(r.value)), K = o(() => e.isCreate ? e.createConfirm : e.updateConfirm), Q = o(() => e.isCreate ? e.createConfirmData : e.updateConfirmData), N = o(() => e.isCreate ? e.createResource : e.updateResource), W = o(() => e.isCreate ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), X = o(() => e.isCreate ? e.createDisabled : e.updateDisabled), D = o(() => !e.isCreate && y.value.includes("update")), b = o(() => !e.isCreate && y.value.includes("drop")), L = async () => {
      l.value = !0, s.value = -1, f.value = !1;
      try {
        const t = await oe(e.readResource, e.readData);
        if (l.value = !1, s.value = t.httpStatus, !t.success) {
          v.value = !1, s.value = t.httpStatus, d("error", t.httpStatus);
          return;
        }
        v.value = !0, r.value = t.data, y.value = t.perms, h.value.increment(r.value).turnStoredIntoOriginal(), d("read", t);
      } catch {
        l.value = !1, v.value = !1, s.value = 404, d("error", 404);
        return;
      }
    }, Y = o(() => l.value ? !1 : e.title || !!q["post-title"]);
    B(() => e.modelValue, (t) => {
      r.value = t, h.value.increment(t);
    }, { deep: !0 }), B(r, (t) => {
      d("update:modelValue", r.value), h.value.increment(t);
    }, { deep: !0 }), B(y, () => d("perms", y.value));
    const T = o(() => X.value || !e.isCreate && !D.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : h.value.changed());
    B(T, (t) => d("modified-data", t)), e.readResource && !e.isCreate ? L() : e.isCreate && (v.value = !0, c.value = !0, l.value = !1);
    const Z = (t, u) => {
      if (l.value = !1, s.value = u.httpStatus, !u.success) {
        f.value = !0, d("error", u.httpStatus);
        return;
      }
      f.value = !0, d("drop", u);
    }, ee = (t, u) => {
      if (N.value) {
        if (l.value = !1, s.value = u.httpStatus, !u.success) {
          f.value = !0, d("error", u.httpStatus);
          return;
        }
        f.value = !0;
      }
      let g = e.isCreate ? "create" : "update";
      e.isCreate || h.value.turnStoredIntoOriginal(), u.autoReloadId && (e.readData.id = u.autoReloadId, L()), d(g, u);
    }, $ = () => {
      l.value = !0, s.value = -1;
    }, x = () => {
      l.value = !1;
    };
    I({
      doDrop: () => {
        k.value && typeof k.value.click == "function" && k.value.click();
      },
      doRefresh: L,
      doSave: () => {
        S.value && typeof S.value.click == "function" && S.value.click();
      }
    });
    const U = o(() => !e.hiddenDrop && !l.value && c.value && v.value), J = o(() => l.value ? !1 : e.isCreate ? !0 : !e.hiddenSave && c.value && v.value), E = o(() => !l.value && !e.isCreate && v.value), te = o(() => !e.hiddenButtons && (J.value || U.value || E.value));
    return (t, u) => {
      const g = w("lkt-button"), ae = w("lkt-field-switch"), A = w("lkt-http-info"), le = w("lkt-loader");
      return i(), m("article", se, [
        Y.value ? (i(), m("header", ne, [
          j("h1", ie, M(a.title), 1),
          j("div", ce, [
            O(t.$slots, "post-title", {
              item: r.value,
              loading: l.value
            })
          ])
        ])) : C("", !0),
        R(j("div", ve, [
          a.isCreate ? C("", !0) : R((i(), V(g, {
            key: 0,
            ref: (p) => k.value = p,
            palette: "danger",
            disabled: a.dropDisabled || !b.value,
            "confirm-modal": a.dropConfirm,
            "confirm-data": a.dropConfirmData,
            resource: a.dropResource,
            "resource-data": a.dropData,
            onLoading: $,
            onLoaded: x,
            onClick: Z
          }, {
            default: F(() => [
              H(q)["button-drop"] ? O(t.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: a.isCreate,
                canUpdate: D.value,
                canDrop: b.value
              }) : (i(), m("span", fe, M(a.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"])), [
            [_, U.value]
          ]),
          R(P(g, {
            ref: (p) => S.value = p,
            palette: "success",
            disabled: !T.value,
            "confirm-modal": K.value,
            "confirm-data": Q.value,
            resource: N.value,
            "resource-data": W.value,
            onLoading: $,
            onLoaded: x,
            onClick: ee
          }, {
            default: F(() => [
              H(q)["button-save"] ? O(t.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: a.isCreate,
                canUpdate: D.value,
                canDrop: b.value
              }) : (i(), m("span", pe, M(a.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"]), [
            [_, J.value]
          ]),
          R(P(ae, {
            modelValue: c.value,
            "onUpdate:modelValue": u[0] || (u[0] = (p) => c.value = p),
            label: a.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [_, E.value]
          ])
        ], 512), [
          [_, te.value]
        ]),
        l.value ? C("", !0) : (i(), m("div", me, [
          v.value ? (i(), m("div", ye, [
            f.value ? (i(), V(A, {
              key: 0,
              code: s.value,
              quick: "",
              palette: s.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: u[1] || (u[1] = (p) => f.value = !1)
            }, null, 8, ["code", "palette"])) : C("", !0),
            O(t.$slots, "item", {
              item: r.value,
              loading: l.value,
              editMode: c.value,
              isCreate: a.isCreate,
              canUpdate: D.value,
              canDrop: b.value
            })
          ])) : (i(), V(A, {
            key: 1,
            code: s.value
          }, null, 8, ["code"]))
        ])),
        l.value ? (i(), V(le, { key: 2 })) : C("", !0)
      ]);
    };
  }
}), Be = {
  install: (a, I = {}) => {
    a.component("lkt-item-crud") === void 0 && a.component("lkt-item-crud", Ce);
  }
};
export {
  Be as default
};
