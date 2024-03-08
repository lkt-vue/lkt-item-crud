import { defineComponent as ue, useSlots as re, ref as s, computed as o, watch as B, resolveComponent as w, openBlock as i, createElementBlock as m, createElementVNode as j, toDisplayString as M, renderSlot as O, createCommentVNode as h, withDirectives as R, createBlock as V, withCtx as A, unref as H, vShow as q, createVNode as P } from "vue";
import { httpCall as oe } from "lkt-http-client";
import { DataState as de } from "lkt-data-state";
const ne = { class: "lkt-item-crud" }, se = {
  key: 0,
  class: "lkt-item-crud_header"
}, ie = { class: "lkt-item-crud_header-title" }, ce = { class: "lkt-item-crud_header-slot" }, fe = { class: "lkt-item-crud-buttons" }, ve = { key: 1 }, pe = { key: 1 }, me = {
  key: 1,
  class: "lkt-item-crud_content"
}, ye = {
  key: 0,
  class: "lkt-grid-1"
}, Ce = { name: "LktItemCrud", inheritAttrs: !1 }, he = /* @__PURE__ */ ue({
  ...Ce,
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
    saveValidator: { type: Function, required: !1, default: () => !0 },
    onCreate: { type: Function, required: !1, default: () => !0 },
    onUpdate: { type: Function, required: !1, default: () => !0 }
  },
  emits: ["update:modelValue", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(a, { expose: U, emit: z }) {
    const e = a, _ = re(), d = z;
    let G = [];
    const l = s(!0), r = s(e.modelValue), y = s(G), c = s(!1), f = s(!1), v = s(!1), n = s(200), S = s(null), k = s(null), C = s(new de(r.value)), K = o(() => e.isCreate ? e.createConfirm : e.updateConfirm), Q = o(() => e.isCreate ? e.createConfirmData : e.updateConfirmData), I = o(() => e.isCreate ? e.createResource : e.updateResource), W = o(() => e.isCreate ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), X = o(() => e.isCreate ? e.createDisabled : e.updateDisabled), D = o(() => !e.isCreate && y.value.includes("update")), b = o(() => !e.isCreate && y.value.includes("drop")), L = async () => {
      l.value = !0, n.value = -1, v.value = !1;
      try {
        const t = await oe(e.readResource, e.readData);
        if (l.value = !1, n.value = t.httpStatus, !t.success) {
          f.value = !1, n.value = t.httpStatus, d("error", t.httpStatus);
          return;
        }
        f.value = !0, r.value = t.data, y.value = t.perms, C.value.increment(r.value).turnStoredIntoOriginal(), d("read", t);
      } catch {
        l.value = !1, f.value = !1, n.value = 404, d("error", 404);
        return;
      }
    }, Y = o(() => l.value ? !1 : e.title || !!_["post-title"]);
    B(() => e.modelValue, (t) => {
      r.value = t, C.value.increment(t);
    }, { deep: !0 }), B(r, (t) => {
      d("update:modelValue", r.value), C.value.increment(t);
    }, { deep: !0 }), B(y, () => d("perms", y.value));
    const N = o(() => X.value || !e.isCreate && !D.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : C.value.changed());
    B(N, (t) => d("modified-data", t)), e.readResource && !e.isCreate ? L() : e.isCreate && (f.value = !0, c.value = !0, l.value = !1);
    const Z = (t, u) => {
      if (l.value = !1, n.value = u.httpStatus, !u.success) {
        v.value = !0, d("error", u.httpStatus);
        return;
      }
      v.value = !0, d("drop", u);
    }, ee = (t, u) => {
      if (I.value) {
        if (l.value = !1, n.value = u.httpStatus, !u.success) {
          v.value = !0, d("error", u.httpStatus);
          return;
        }
        v.value = !0;
      }
      let g = e.isCreate ? "create" : "update";
      e.isCreate || C.value.turnStoredIntoOriginal(), u.autoReloadId && (e.readData.id = u.autoReloadId, L()), e.isCreate && typeof e.onCreate == "function" && e.onCreate(), !e.isCreate && typeof e.onUpdate == "function" && e.onUpdate(), d(g, u);
    }, T = () => {
      l.value = !0, n.value = -1;
    }, $ = () => {
      l.value = !1;
    };
    U({
      doDrop: () => {
        k.value && typeof k.value.click == "function" && k.value.click();
      },
      doRefresh: L,
      doSave: () => {
        S.value && typeof S.value.click == "function" && S.value.click();
      }
    });
    const x = o(() => !e.hiddenDrop && !l.value && c.value && f.value), J = o(() => l.value ? !1 : e.isCreate ? !0 : !e.hiddenSave && c.value && f.value), E = o(() => !l.value && !e.isCreate && f.value), te = o(() => !e.hiddenButtons && (J.value || x.value || E.value));
    return (t, u) => {
      const g = w("lkt-button"), ae = w("lkt-field-switch"), F = w("lkt-http-info"), le = w("lkt-loader");
      return i(), m("article", ne, [
        Y.value ? (i(), m("header", se, [
          j("h1", ie, M(a.title), 1),
          j("div", ce, [
            O(t.$slots, "post-title", {
              item: r.value,
              loading: l.value
            })
          ])
        ])) : h("", !0),
        R(j("div", fe, [
          a.isCreate ? h("", !0) : R((i(), V(g, {
            key: 0,
            ref: (p) => k.value = p,
            palette: "danger",
            disabled: a.dropDisabled || !b.value,
            "confirm-modal": a.dropConfirm,
            "confirm-data": a.dropConfirmData,
            resource: a.dropResource,
            "resource-data": a.dropData,
            onLoading: T,
            onLoaded: $,
            onClick: Z
          }, {
            default: A(() => [
              H(_)["button-drop"] ? O(t.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: a.isCreate,
                canUpdate: D.value,
                canDrop: b.value
              }) : (i(), m("span", ve, M(a.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"])), [
            [q, x.value]
          ]),
          R(P(g, {
            ref: (p) => S.value = p,
            palette: "success",
            disabled: !N.value,
            "confirm-modal": K.value,
            "confirm-data": Q.value,
            resource: I.value,
            "resource-data": W.value,
            onLoading: T,
            onLoaded: $,
            onClick: ee
          }, {
            default: A(() => [
              H(_)["button-save"] ? O(t.$slots, "button-save", {
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
            [q, J.value]
          ]),
          R(P(ae, {
            modelValue: c.value,
            "onUpdate:modelValue": u[0] || (u[0] = (p) => c.value = p),
            label: a.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [q, E.value]
          ])
        ], 512), [
          [q, te.value]
        ]),
        l.value ? h("", !0) : (i(), m("div", me, [
          f.value ? (i(), m("div", ye, [
            v.value ? (i(), V(F, {
              key: 0,
              code: n.value,
              quick: "",
              palette: n.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: u[1] || (u[1] = (p) => v.value = !1)
            }, null, 8, ["code", "palette"])) : h("", !0),
            O(t.$slots, "item", {
              item: r.value,
              loading: l.value,
              editMode: c.value,
              isCreate: a.isCreate,
              canUpdate: D.value,
              canDrop: b.value
            })
          ])) : (i(), V(F, {
            key: 1,
            code: n.value
          }, null, 8, ["code"]))
        ])),
        l.value ? (i(), V(le, { key: 2 })) : h("", !0)
      ]);
    };
  }
}), Be = {
  install: (a, U = {}) => {
    a.component("lkt-item-crud") === void 0 && a.component("lkt-item-crud", he);
  }
};
export {
  Be as default
};
