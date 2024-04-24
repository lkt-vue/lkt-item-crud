import { defineComponent as ie, useSlots as ce, ref as s, computed as n, watch as M, nextTick as ve, resolveComponent as E, openBlock as v, createElementBlock as b, createElementVNode as J, toDisplayString as K, renderSlot as V, createCommentVNode as g, withDirectives as I, createBlock as N, withCtx as W, unref as X, vShow as L, createVNode as Y } from "vue";
import { httpCall as fe } from "lkt-http-client";
import { DataState as pe } from "lkt-data-state";
import { execModal as me, refreshModal as he, closeModal as ke, openModal as Ce, reOpenModal as be } from "lkt-modal";
const j = class j {
};
j.debugEnabled = !1;
let O = j;
const r = (...l) => {
  O.debugEnabled && console.info("[LktItemCrud] ", ...l);
}, Te = (l = !0) => {
  O.debugEnabled = l;
}, Z = (l) => {
  r("runModalCallback -> init", l);
  let f = l.modalKey ? l.modalKey : "_", k = l.args ? l.args : {};
  switch (l.action) {
    case "reOpen":
      return be(l.modalName, f, k);
    case "open":
      return Ce(l.modalName, f, k);
    case "close":
      return ke(l.modalName, f);
    case "refresh":
      return he(l.modalName, f, k);
    case "exec":
      let e = l.method;
      return e ? me(l.modalName, f, e, k) : void 0;
  }
}, De = { class: "lkt-item-crud" }, Se = {
  key: 0,
  class: "lkt-item-crud_header"
}, ye = { class: "lkt-item-crud_header-title" }, _e = { class: "lkt-item-crud_header-slot" }, Me = { class: "lkt-item-crud-buttons" }, ge = { key: 1 }, Be = { key: 1 }, Ue = {
  key: 1,
  class: "lkt-item-crud_content"
}, we = {
  key: 0,
  class: "lkt-grid-1"
}, Re = /* @__PURE__ */ ie({
  __name: "LktItemCrud",
  props: {
    modelValue: { default: () => ({}) },
    title: { default: "" },
    editModeText: { default: "Edition Mode" },
    saveText: { default: "Save" },
    dropText: { default: "Delete" },
    hiddenSave: { type: Boolean, default: !1 },
    hiddenDrop: { type: Boolean, default: !1 },
    hiddenButtons: { type: Boolean, default: !1 },
    readResource: { default: "" },
    createResource: { default: "" },
    updateResource: { default: "" },
    dropResource: { default: "" },
    readData: { default: () => ({}) },
    createData: { default: () => ({}) },
    updateData: { default: () => ({}) },
    dropData: { default: () => ({}) },
    isCreate: { type: Boolean, default: !1 },
    createConfirm: { default: "" },
    updateConfirm: { default: "" },
    dropConfirm: { default: "" },
    createConfirmData: { default: () => ({}) },
    updateConfirmData: { default: () => ({}) },
    dropConfirmData: { default: () => ({}) },
    createDisabled: { type: Boolean, default: !1 },
    updateDisabled: { type: Boolean, default: !1 },
    dropDisabled: { type: Boolean, default: !1 },
    saveValidator: { type: Function, default: () => !0 },
    beforeEmitUpdate: { type: Function, default: void 0 },
    onCreate: { type: Function, default: void 0 },
    onUpdate: { type: Function, default: void 0 },
    insideModal: { type: Boolean, default: !1 },
    dataStateConfig: { default: () => ({}) },
    onCreateModalCallbacks: { default: () => [] },
    onUpdateModalCallbacks: { default: () => [] }
  },
  emits: ["update:modelValue", "update:isCreate", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(l, { expose: f, emit: k }) {
    const e = l, T = ce(), i = k;
    let ee = [];
    const d = s(!0), u = s(e.modelValue), D = s(ee), p = s(!1), m = s(!1), h = s(!1), c = s(200), B = s(null), U = s(null), S = s(new pe(u.value, e.dataStateConfig)), o = s(e.isCreate), $ = s(!1), ae = n(() => o.value ? e.createConfirm : e.updateConfirm), te = n(() => o.value ? e.createConfirmData : e.updateConfirmData), q = n(() => o.value ? e.createResource : e.updateResource), le = n(() => o.value ? { ...e.createData, ...JSON.parse(JSON.stringify(u.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(u.value)) }), oe = n(() => o.value ? e.createDisabled : e.updateDisabled), w = n(() => !o.value && D.value.includes("update")), R = n(() => !o.value && D.value.includes("drop")), F = async () => {
      r("fetchItem"), d.value = !0, c.value = -1, h.value = !1;
      try {
        const a = await fe(e.readResource, e.readData);
        if (r("fetchItem -> response", a), d.value = !1, c.value = a.httpStatus, !a.success) {
          m.value = !1, c.value = a.httpStatus, i("error", a.httpStatus);
          return;
        }
        m.value = !0, u.value = a.data, D.value = a.perms, S.value.increment(u.value).turnStoredIntoOriginal(), i("read", a);
      } catch {
        d.value = !1, m.value = !1, c.value = 404, i("error", 404);
        return;
      }
    }, ue = n(() => d.value ? !1 : e.title || !!T["post-title"]);
    M(() => e.modelValue, (a) => {
      u.value = a, S.value.increment(a);
    }, { deep: !0 }), M(u, (a) => {
      if ($.value = !0, r("item updated ->", u.value), typeof e.beforeEmitUpdate == "function") {
        r("item updated -> has beforeEmitUpdate");
        let t = e.beforeEmitUpdate(u.value);
        r("item updated -> override with: ", t), typeof t == "object" && (u.value = t);
      }
      i("update:modelValue", u.value), r("item updated -> update dataState"), S.value.increment(a), ve(() => $.value = !1);
    }, { deep: !0 }), M(D, () => i("perms", D.value));
    const H = n(() => oe.value || !o.value && !w.value || typeof e.saveValidator == "function" && !e.saveValidator(u.value) ? !1 : S.value.changed());
    M(H, (a) => i("modified-data", a)), M(o, (a) => i("update:isCreate", a)), e.readResource && !o.value ? F() : o.value && (m.value = !0, p.value = !0, d.value = !1);
    const de = (a, t) => {
      if (d.value = !1, c.value = t.httpStatus, !t.success) {
        h.value = !0, i("error", t.httpStatus);
        return;
      }
      h.value = !0, i("drop", t);
    }, re = (a, t) => {
      if (r("onSave -> received response:", t), q.value) {
        if (d.value = !1, c.value = t.httpStatus, !t.success) {
          h.value = !0, i("error", t.httpStatus);
          return;
        }
        h.value = !0;
      }
      let y = o.value ? "create" : "update";
      o.value || (r("onSave -> turn stored data into original"), S.value.turnStoredIntoOriginal()), y === "create" ? typeof e.onCreate == "function" && (r("onSave -> trigger onCreate callback"), e.onCreate(t), e.onCreateModalCallbacks.length > 0 && (r("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((_) => {
        Z(_);
      }))) : typeof e.onUpdate == "function" && (r("onSave -> trigger onUpdate callback"), e.onUpdate(t), e.onUpdateModalCallbacks.length > 0 && (r("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((_) => {
        Z(_);
      }))), !e.insideModal && t.autoReloadId && (r("onSave -> autoReloadId detected: ", t.autoReloadId), e.readData.id = t.autoReloadId, r("onSave -> turning off create mode"), o.value = !1, F()), i(y, t);
    }, P = () => {
      d.value = !0, c.value = -1;
    }, x = () => {
      d.value = !1;
    };
    f({
      doDrop: () => {
        U.value && typeof U.value.click == "function" && U.value.click();
      },
      doRefresh: F,
      doSave: () => {
        B.value && typeof B.value.click == "function" && B.value.click();
      }
    });
    const z = n(() => !e.hiddenDrop && !d.value && p.value && m.value), A = n(() => d.value ? !1 : o.value ? !0 : !e.hiddenSave && p.value && m.value), G = n(() => !d.value && !o.value && m.value && !(e.dropDisabled && e.updateDisabled)), ne = n(() => !e.hiddenButtons && (A.value || z.value || G.value));
    return n(() => u), (a, t) => {
      const y = E("lkt-button"), _ = E("lkt-field-switch"), Q = E("lkt-http-info"), se = E("lkt-loader");
      return v(), b("article", De, [
        ue.value ? (v(), b("header", Se, [
          J("h1", ye, K(a.title), 1),
          J("div", _e, [
            V(a.$slots, "post-title", {
              item: u.value,
              loading: d.value
            })
          ])
        ])) : g("", !0),
        I(J("div", Me, [
          o.value ? g("", !0) : I((v(), N(y, {
            key: 0,
            ref: (C) => U.value = C,
            palette: "danger",
            disabled: a.dropDisabled || !R.value,
            "confirm-modal": a.dropConfirm,
            "confirm-data": a.dropConfirmData,
            resource: a.dropResource,
            "resource-data": a.dropData,
            onLoading: P,
            onLoaded: x,
            onClick: de
          }, {
            default: W(() => [
              X(T)["button-drop"] ? V(a.$slots, "button-drop", {
                key: 0,
                item: u.value,
                editMode: p.value,
                isCreate: o.value,
                canUpdate: w.value,
                canDrop: R.value
              }) : (v(), b("span", ge, K(a.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"])), [
            [L, z.value]
          ]),
          I(Y(y, {
            ref: (C) => B.value = C,
            palette: "success",
            disabled: !H.value,
            "confirm-modal": ae.value,
            "confirm-data": te.value,
            resource: q.value,
            "resource-data": le.value,
            onLoading: P,
            onLoaded: x,
            onClick: re
          }, {
            default: W(() => [
              X(T)["button-save"] ? V(a.$slots, "button-save", {
                key: 0,
                item: u.value,
                editMode: p.value,
                isCreate: o.value,
                canUpdate: w.value,
                canDrop: R.value
              }) : (v(), b("span", Be, K(a.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"]), [
            [L, A.value]
          ]),
          I(Y(_, {
            modelValue: p.value,
            "onUpdate:modelValue": t[0] || (t[0] = (C) => p.value = C),
            label: a.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [L, G.value]
          ])
        ], 512), [
          [L, ne.value]
        ]),
        d.value ? g("", !0) : (v(), b("div", Ue, [
          m.value ? (v(), b("div", we, [
            h.value ? (v(), N(Q, {
              key: 0,
              code: c.value,
              quick: "",
              palette: c.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: t[1] || (t[1] = (C) => h.value = !1)
            }, null, 8, ["code", "palette"])) : g("", !0),
            V(a.$slots, "item", {
              item: u.value,
              loading: d.value,
              editMode: p.value,
              isCreate: o.value,
              canUpdate: w.value,
              canDrop: R.value,
              itemBeingEdited: $.value
            })
          ])) : (v(), N(Q, {
            key: 1,
            code: c.value
          }, null, 8, ["code"]))
        ])),
        d.value ? (v(), N(se, { key: 2 })) : g("", !0)
      ]);
    };
  }
}), $e = {
  install: (l, f = {}) => {
    l.component("lkt-item-crud") === void 0 && l.component("lkt-item-crud", Re);
  }
};
export {
  Te as debugLktItemCrud,
  $e as default
};
