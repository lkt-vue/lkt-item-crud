import { defineComponent as ie, useSlots as ce, ref as s, computed as n, watch as _, nextTick as ve, resolveComponent as E, openBlock as v, createElementBlock as D, createElementVNode as J, toDisplayString as K, renderSlot as V, createCommentVNode as g, withDirectives as I, createBlock as N, withCtx as X, unref as Y, vShow as L, createVNode as Z } from "vue";
import { httpCall as fe } from "lkt-http-client";
import { DataState as pe } from "lkt-data-state";
import { execModal as me, refreshModal as he, closeModal as ke, openModal as Ce, reOpenModal as be } from "lkt-modal";
const q = class q {
};
q.debugEnabled = !1;
let O = q;
const r = (...l) => {
  O.debugEnabled && console.info("[LktItemCrud] ", ...l);
}, Te = (l = !0) => {
  O.debugEnabled = l;
}, j = (l) => {
  r("runModalCallback -> init", l);
  let f = l.modalKey ? l.modalKey : "_", C = l.args ? l.args : {};
  switch (l.action) {
    case "reOpen":
      return be(l.modalName, f, C);
    case "open":
      return Ce(l.modalName, f, C);
    case "close":
      return ke(l.modalName, f);
    case "refresh":
      return he(l.modalName, f, C);
    case "exec":
      let e = l.method;
      return e ? me(l.modalName, f, e, C) : void 0;
  }
}, De = { class: "lkt-item-crud" }, Se = {
  key: 0,
  class: "lkt-item-crud_header"
}, ye = { class: "lkt-item-crud_header-title" }, Me = { class: "lkt-item-crud_header-slot" }, _e = { class: "lkt-item-crud-buttons" }, ge = { key: 1 }, Be = { key: 1 }, Ue = {
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
    onUpdateModalCallbacks: { default: () => [] },
    onDropModalCallbacks: { default: () => [] }
  },
  emits: ["update:modelValue", "update:isCreate", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(l, { expose: f, emit: C }) {
    const e = l, T = ce(), i = C;
    let ee = [];
    const d = s(!0), u = s(e.modelValue), S = s(ee), p = s(!1), m = s(!1), h = s(!1), c = s(200), B = s(null), U = s(null), y = s(new pe(u.value, e.dataStateConfig)), o = s(e.isCreate), $ = s(!1), ae = n(() => o.value ? e.createConfirm : e.updateConfirm), te = n(() => o.value ? e.createConfirmData : e.updateConfirmData), H = n(() => o.value ? e.createResource : e.updateResource), le = n(() => o.value ? { ...e.createData, ...JSON.parse(JSON.stringify(u.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(u.value)) }), oe = n(() => o.value ? e.createDisabled : e.updateDisabled), w = n(() => !o.value && S.value.includes("update")), R = n(() => !o.value && S.value.includes("drop")), F = async () => {
      r("fetchItem"), d.value = !0, c.value = -1, h.value = !1;
      try {
        const a = await fe(e.readResource, e.readData);
        if (r("fetchItem -> response", a), d.value = !1, c.value = a.httpStatus, !a.success) {
          m.value = !1, c.value = a.httpStatus, i("error", a.httpStatus);
          return;
        }
        m.value = !0, u.value = a.data, S.value = a.perms, y.value.increment(u.value).turnStoredIntoOriginal(), i("read", a);
      } catch {
        d.value = !1, m.value = !1, c.value = 404, i("error", 404);
        return;
      }
    }, ue = n(() => d.value ? !1 : e.title || !!T["post-title"]);
    _(() => e.modelValue, (a) => {
      u.value = a, y.value.increment(a);
    }, { deep: !0 }), _(u, (a) => {
      if ($.value = !0, r("item updated ->", u.value), typeof e.beforeEmitUpdate == "function") {
        r("item updated -> has beforeEmitUpdate");
        let t = e.beforeEmitUpdate(u.value);
        r("item updated -> override with: ", t), typeof t == "object" && (u.value = t);
      }
      i("update:modelValue", u.value), r("item updated -> update dataState"), y.value.increment(a), ve(() => $.value = !1);
    }, { deep: !0 }), _(S, () => i("perms", S.value));
    const P = n(() => oe.value || !o.value && !w.value || typeof e.saveValidator == "function" && !e.saveValidator(u.value) ? !1 : y.value.changed());
    _(P, (a) => i("modified-data", a)), _(o, (a) => i("update:isCreate", a)), e.readResource && !o.value ? F() : o.value && (m.value = !0, p.value = !0, d.value = !1);
    const de = (a, t) => {
      if (d.value = !1, c.value = t.httpStatus, !t.success) {
        h.value = !0, i("error", t.httpStatus);
        return;
      }
      h.value = !0, e.onDropModalCallbacks.length > 0 && (r("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach((k) => {
        j(k);
      })), i("drop", t);
    }, re = (a, t) => {
      if (r("onSave -> received response:", t), H.value) {
        if (d.value = !1, c.value = t.httpStatus, !t.success) {
          h.value = !0, i("error", t.httpStatus);
          return;
        }
        h.value = !0;
      }
      let k = o.value ? "create" : "update";
      o.value || (r("onSave -> turn stored data into original"), y.value.turnStoredIntoOriginal()), k === "create" ? typeof e.onCreate == "function" && (r("onSave -> trigger onCreate callback"), e.onCreate(t), e.onCreateModalCallbacks.length > 0 && (r("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((M) => {
        j(M);
      }))) : typeof e.onUpdate == "function" && (r("onSave -> trigger onUpdate callback"), e.onUpdate(t), e.onUpdateModalCallbacks.length > 0 && (r("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((M) => {
        j(M);
      }))), !e.insideModal && t.autoReloadId && (r("onSave -> autoReloadId detected: ", t.autoReloadId), e.readData.id = t.autoReloadId, r("onSave -> turning off create mode"), o.value = !1, F()), i(k, t);
    }, x = () => {
      d.value = !0, c.value = -1;
    }, z = () => {
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
    const A = n(() => !e.hiddenDrop && !d.value && p.value && m.value), G = n(() => d.value ? !1 : o.value ? !0 : !e.hiddenSave && p.value && m.value), Q = n(() => !d.value && !o.value && m.value && !(e.dropDisabled && e.updateDisabled)), ne = n(() => !e.hiddenButtons && (G.value || A.value || Q.value));
    return n(() => u), (a, t) => {
      const k = E("lkt-button"), M = E("lkt-field-switch"), W = E("lkt-http-info"), se = E("lkt-loader");
      return v(), D("article", De, [
        ue.value ? (v(), D("header", Se, [
          J("h1", ye, K(a.title), 1),
          J("div", Me, [
            V(a.$slots, "post-title", {
              item: u.value,
              loading: d.value
            })
          ])
        ])) : g("", !0),
        I(J("div", _e, [
          o.value ? g("", !0) : I((v(), N(k, {
            key: 0,
            ref: (b) => U.value = b,
            palette: "danger",
            disabled: a.dropDisabled || !R.value,
            "confirm-modal": a.dropConfirm,
            "confirm-data": a.dropConfirmData,
            resource: a.dropResource,
            "resource-data": a.dropData,
            onLoading: x,
            onLoaded: z,
            onClick: de
          }, {
            default: X(() => [
              Y(T)["button-drop"] ? V(a.$slots, "button-drop", {
                key: 0,
                item: u.value,
                editMode: p.value,
                isCreate: o.value,
                canUpdate: w.value,
                canDrop: R.value
              }) : (v(), D("span", ge, K(a.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"])), [
            [L, A.value]
          ]),
          I(Z(k, {
            ref: (b) => B.value = b,
            palette: "success",
            disabled: !P.value,
            "confirm-modal": ae.value,
            "confirm-data": te.value,
            resource: H.value,
            "resource-data": le.value,
            onLoading: x,
            onLoaded: z,
            onClick: re
          }, {
            default: X(() => [
              Y(T)["button-save"] ? V(a.$slots, "button-save", {
                key: 0,
                item: u.value,
                editMode: p.value,
                isCreate: o.value,
                canUpdate: w.value,
                canDrop: R.value
              }) : (v(), D("span", Be, K(a.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"]), [
            [L, G.value]
          ]),
          I(Z(M, {
            modelValue: p.value,
            "onUpdate:modelValue": t[0] || (t[0] = (b) => p.value = b),
            label: a.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [L, Q.value]
          ])
        ], 512), [
          [L, ne.value]
        ]),
        d.value ? g("", !0) : (v(), D("div", Ue, [
          m.value ? (v(), D("div", we, [
            h.value ? (v(), N(W, {
              key: 0,
              code: c.value,
              quick: "",
              palette: c.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: t[1] || (t[1] = (b) => h.value = !1)
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
          ])) : (v(), N(W, {
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
