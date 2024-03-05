import { defineComponent as re, useSlots as ue, ref as n, computed as o, watch as B, resolveComponent as w, openBlock as i, createElementBlock as m, createElementVNode as M, toDisplayString as I, renderSlot as R, createCommentVNode as C, withDirectives as V, createBlock as _, withCtx as F, unref as H, vShow as q, createVNode as P } from "vue";
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
}, he = { name: "LktItemCrud", inheritAttrs: !1 }, Ce = /* @__PURE__ */ re({
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
    createConfirmData: { type: String, default: "" },
    updateConfirmData: { type: String, default: "" },
    dropConfirmData: { type: String, default: "" },
    createDisabled: { type: Boolean, default: !1 },
    updateDisabled: { type: Boolean, default: !1 },
    dropDisabled: { type: Boolean, default: !1 },
    saveValidator: { type: Function, required: !1, default: () => !0 }
  },
  emits: ["update:modelValue", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(a, { expose: N, emit: z }) {
    const e = a, O = ue(), d = z;
    let G = [];
    const l = n(!0), u = n(e.modelValue), y = n(G), c = n(!1), v = n(!1), f = n(!1), s = n(200), S = n(null), k = n(null), h = n(new de(u.value)), K = o(() => e.isCreate ? e.createConfirm : e.updateConfirm), Q = o(() => e.isCreate ? e.createConfirmData : e.updateConfirmData), T = o(() => e.isCreate ? e.createResource : e.updateResource), W = o(() => e.isCreate ? { ...e.createData, ...JSON.parse(JSON.stringify(u.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(u.value)) }), X = o(() => e.isCreate ? e.createDisabled : e.updateDisabled), D = o(() => !e.isCreate && y.value.includes("update")), g = o(() => !e.isCreate && y.value.includes("drop")), L = async () => {
      l.value = !0, s.value = -1, f.value = !1;
      try {
        const t = await oe(e.readResource, e.readData);
        if (l.value = !1, s.value = t.httpStatus, !t.success) {
          v.value = !1, s.value = t.httpStatus, d("error", t.httpStatus);
          return;
        }
        v.value = !0, u.value = t.data, y.value = t.perms, h.value.increment(u.value).turnStoredIntoOriginal(), d("read", t);
      } catch {
        l.value = !1, v.value = !1, s.value = 404, d("error", 404);
        return;
      }
    }, Y = o(() => l.value ? !1 : e.title || !!O["post-title"]);
    B(() => e.modelValue, (t) => {
      u.value = t, h.value.increment(t);
    }, { deep: !0 }), B(u, (t) => {
      d("update:modelValue", u.value), h.value.increment(t);
    }, { deep: !0 }), B(y, () => d("perms", y.value));
    const $ = o(() => X.value || !e.isCreate && !D.value || typeof e.saveValidator == "function" && !e.saveValidator(u.value) ? !1 : h.value.changed());
    B($, (t) => d("modified-data", t)), e.readResource && !e.isCreate ? L() : e.isCreate && (v.value = !0, c.value = !0, l.value = !1);
    const Z = (t, r) => {
      if (l.value = !1, s.value = r.httpStatus, !r.success) {
        f.value = !0, d("error", r.httpStatus);
        return;
      }
      f.value = !0, d("drop", r);
    }, ee = (t, r) => {
      if (T.value) {
        if (l.value = !1, s.value = r.httpStatus, !r.success) {
          f.value = !0, d("error", r.httpStatus);
          return;
        }
        f.value = !0;
      }
      let b = e.isCreate ? "create" : "update";
      e.isCreate || h.value.turnStoredIntoOriginal(), r.autoReloadId && (e.readData.id = r.autoReloadId, L()), d(b, r);
    }, x = () => {
      l.value = !0, s.value = -1;
    }, j = () => {
      l.value = !1;
    };
    N({
      doDrop: () => {
        k.value && typeof k.value.click == "function" && k.value.click();
      },
      doRefresh: L,
      doSave: () => {
        S.value && typeof S.value.click == "function" && S.value.click();
      }
    });
    const U = o(() => !e.hiddenDrop && !l.value && c.value && v.value), J = o(() => l.value ? !1 : e.isCreate ? !0 : !e.hiddenSave && c.value && v.value), E = o(() => !l.value && !e.isCreate && v.value), te = o(() => !e.hiddenButtons && (J.value || U.value || E.value));
    return (t, r) => {
      const b = w("lkt-button"), ae = w("lkt-field-switch"), A = w("lkt-http-info"), le = w("lkt-loader");
      return i(), m("article", se, [
        Y.value ? (i(), m("header", ne, [
          M("h1", ie, I(a.title), 1),
          M("div", ce, [
            R(t.$slots, "post-title", {
              item: u.value,
              loading: l.value
            })
          ])
        ])) : C("", !0),
        V(M("div", ve, [
          a.isCreate ? C("", !0) : V((i(), _(b, {
            key: 0,
            ref: (p) => k.value = p,
            palette: "danger",
            disabled: a.dropDisabled || !g.value,
            "confirm-modal": a.dropConfirm,
            "confirm-data": a.dropConfirmData,
            resource: a.dropResource,
            "resource-data": a.dropData,
            onLoading: x,
            onLoaded: j,
            onClick: Z
          }, {
            default: F(() => [
              H(O)["button-drop"] ? R(t.$slots, "button-drop", {
                key: 0,
                item: u.value,
                editMode: c.value,
                isCreate: a.isCreate,
                canUpdate: D.value,
                canDrop: g.value
              }) : (i(), m("span", fe, I(a.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"])), [
            [q, U.value]
          ]),
          V(P(b, {
            ref: (p) => S.value = p,
            palette: "success",
            disabled: !$.value,
            "confirm-modal": K.value,
            "confirm-data": Q.value,
            resource: T.value,
            "resource-data": W.value,
            onLoading: x,
            onLoaded: j,
            onClick: ee
          }, {
            default: F(() => [
              H(O)["button-save"] ? R(t.$slots, "button-save", {
                key: 0,
                item: u.value,
                editMode: c.value,
                isCreate: a.isCreate,
                canUpdate: D.value,
                canDrop: g.value
              }) : (i(), m("span", pe, I(a.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"]), [
            [q, J.value]
          ]),
          V(P(ae, {
            modelValue: c.value,
            "onUpdate:modelValue": r[0] || (r[0] = (p) => c.value = p),
            label: a.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [q, E.value]
          ])
        ], 512), [
          [q, te.value]
        ]),
        l.value ? C("", !0) : (i(), m("div", me, [
          v.value ? (i(), m("div", ye, [
            f.value ? (i(), _(A, {
              key: 0,
              code: s.value,
              quick: "",
              palette: s.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: r[1] || (r[1] = (p) => f.value = !1)
            }, null, 8, ["code", "palette"])) : C("", !0),
            R(t.$slots, "item", {
              item: u.value,
              loading: l.value,
              editMode: c.value,
              isCreate: a.isCreate,
              canUpdate: D.value,
              canDrop: g.value
            })
          ])) : (i(), _(A, {
            key: 1,
            code: s.value
          }, null, 8, ["code"]))
        ])),
        l.value ? (i(), _(le, { key: 2 })) : C("", !0)
      ]);
    };
  }
}), Be = {
  install: (a, N = {}) => {
    a.component("lkt-item-crud") === void 0 && a.component("lkt-item-crud", Ce);
  }
};
export {
  Be as default
};
