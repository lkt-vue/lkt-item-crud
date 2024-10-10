import { defineComponent as ve, useSlots as pe, ref as s, computed as n, watch as D, nextTick as me, resolveComponent as j, openBlock as c, createBlock as _, resolveDynamicComponent as he, withCtx as q, createElementVNode as Z, createElementBlock as B, unref as h, renderSlot as R, createCommentVNode as v, toDisplayString as Ce, withDirectives as V, createVNode as x, vShow as T } from "vue";
import { httpCall as be } from "lkt-http-client";
import { DataState as ee } from "lkt-data-state";
import { execModal as ke, refreshModal as ye, closeModal as De, openModal as Se, reOpenModal as ge } from "lkt-modal";
import { __ as Me } from "lkt-i18n";
const L = class L {
};
L.debugEnabled = !1, L.defaultSaveIcon = "", L.defaultDropIcon = "";
let S = L;
const d = (...t) => {
  S.debugEnabled && console.info("[LktItemCrud] ", ...t);
}, je = (t = !0) => {
  S.debugEnabled = t;
}, H = (t) => {
  d("runModalCallback -> init", t);
  let C = t.modalKey ? t.modalKey : "_", w = t.args ? t.args : {};
  switch (t.action) {
    case "reOpen":
      return ge(t.modalName, C, w);
    case "open":
      return Se(t.modalName, C, w);
    case "close":
      return De(t.modalName, C);
    case "refresh":
      return ye(t.modalName, C, w);
    case "exec":
      let a = t.method;
      return a ? ke(t.modalName, C, a, w) : void 0;
  }
}, Ie = { class: "lkt-item-crud" }, Be = {
  key: 0,
  class: "lkt-item-crud_header"
}, we = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, Ee = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, Ue = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Re = { class: "lkt-item-crud-buttons" }, Ne = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, _e = {
  key: 1,
  class: "lkt-item-crud_content"
}, Ve = {
  key: 0,
  class: "lkt-grid-1"
}, Te = /* @__PURE__ */ ve({
  __name: "LktItemCrud",
  props: {
    modelValue: { default: () => ({}) },
    title: { default: "" },
    editModeText: { default: "Edition Mode" },
    saveText: { default: "Save" },
    saveIcon: { default: () => S.defaultSaveIcon },
    dropText: { default: "Delete" },
    dropIcon: { default: () => S.defaultDropIcon },
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
    hideSwitchEdition: { type: Boolean, default: !1 },
    dataStateConfig: { default: () => ({}) },
    onCreateModalCallbacks: { default: () => [] },
    onUpdateModalCallbacks: { default: () => [] },
    onDropModalCallbacks: { default: () => [] },
    editing: { type: Boolean, default: !1 },
    size: { default: "" },
    preTitle: { default: "" },
    showClose: { type: Boolean, default: !0 },
    disabledClose: { type: Boolean, default: !1 },
    disabledVeilClick: { type: Boolean, default: !1 },
    modalName: { default: "" },
    modalKey: { default: "_" },
    zIndex: { default: 500 },
    editedCloseConfirm: { default: "" },
    editedCloseConfirmKey: { default: "_" },
    beforeClose: { type: Function, default: void 0 }
  },
  emits: ["update:modelValue", "update:isCreate", "update:editing", "read", "create", "update", "drop", "before-save", "perms", "error", "modified-data"],
  setup(t, { expose: C, emit: w }) {
    const a = t, p = pe(), i = w;
    let ae = [];
    const u = s(!0), r = s(a.modelValue), N = s(ae), f = s(a.editing), b = s(!1), g = s(!1), m = s(200), O = s(null), $ = s(null), k = s(new ee(r.value, a.dataStateConfig)), K = s(new ee(a.readData)), o = s(a.isCreate), F = s(!1), te = n(() => o.value ? a.createConfirm : a.updateConfirm), le = n(() => o.value ? a.createConfirmData : a.updateConfirmData), P = n(() => o.value ? a.createResource : a.updateResource), oe = n(() => o.value ? { ...a.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...a.updateData, ...JSON.parse(JSON.stringify(r.value)) }), de = n(() => o.value ? a.createDisabled : a.updateDisabled), M = n(() => !o.value && N.value.includes("update")), I = n(() => !o.value && N.value.includes("drop")), z = async () => {
      d("fetchItem"), u.value = !0, m.value = -1, g.value = !1;
      try {
        const e = await be(a.readResource, a.readData);
        if (d("fetchItem -> response", e), u.value = !1, m.value = e.httpStatus, !e.success) {
          b.value = !1, m.value = e.httpStatus, i("error", e.httpStatus);
          return;
        }
        b.value = !0, r.value = e.data, N.value = e.perms, k.value.increment(r.value).turnStoredIntoOriginal(), K.value.turnStoredIntoOriginal(), i("read", e);
      } catch {
        u.value = !1, b.value = !1, m.value = 404, i("error", 404);
        return;
      }
    };
    D(() => a.modelValue, (e) => {
      r.value = e, k.value.increment(e);
    }, { deep: !0 }), D(r, (e) => {
      if (F.value = !0, d("item updated ->", r.value), typeof a.beforeEmitUpdate == "function") {
        d("item updated -> has beforeEmitUpdate");
        let l = a.beforeEmitUpdate(r.value);
        d("item updated -> override with: ", l), typeof l == "object" && (r.value = l);
      }
      i("update:modelValue", r.value), d("item updated -> update dataState"), k.value.increment(e), me(() => F.value = !1);
    }, { deep: !0 }), D(N, () => i("perms", N.value));
    const W = n(() => de.value || !o.value && !M.value || typeof a.saveValidator == "function" && !a.saveValidator(r.value) ? !1 : k.value.changed());
    D(W, (e) => i("modified-data", e)), D(o, (e) => i("update:isCreate", e)), D(() => a.readData, (e) => {
      K.value.increment(e), K.value.changed() && z();
    }), D(() => a.editing, (e) => {
      d("editing updated -> updating editMode", e), f.value = e;
    }), D(f, (e) => {
      d("editMode updated -> emit update", e), i("update:editing", e);
    }), a.readResource && !o.value ? z() : o.value && (b.value = !0, f.value = !0, u.value = !1);
    const ue = (e, l) => {
      if (u.value = !1, m.value = l.httpStatus, !l.success) {
        g.value = !0, i("error", l.httpStatus);
        return;
      }
      g.value = !0, a.onDropModalCallbacks.length > 0 && (d("onDrop -> has onDropModalCallbacks"), a.onDropModalCallbacks.forEach((y) => {
        H(y);
      })), i("drop", l);
    }, re = (e, l) => {
      if (d("onSave -> received response:", l), i("before-save"), P.value) {
        if (u.value = !1, m.value = l.httpStatus, !l.success) {
          g.value = !0, i("error", l.httpStatus);
          return;
        }
        g.value = !0;
      }
      let y = o.value ? "create" : "update";
      o.value || (d("onSave -> turn stored data into original"), k.value.turnStoredIntoOriginal()), y === "create" ? typeof a.onCreate == "function" && (d("onSave -> trigger onCreate callback"), a.onCreate(l), a.onCreateModalCallbacks.length > 0 && (d("onSave -> has onCreateModalCallbacks"), a.onCreateModalCallbacks.forEach((E) => {
        H(E);
      }))) : typeof a.onUpdate == "function" && (d("onSave -> trigger onUpdate callback"), a.onUpdate(l), a.onUpdateModalCallbacks.length > 0 && (d("onSave -> has onUpdateModalCallbacks"), a.onUpdateModalCallbacks.forEach((E) => {
        H(E);
      }))), !a.insideModal && l.autoReloadId && (d("onSave -> autoReloadId detected: ", l.autoReloadId), a.readData.id = l.autoReloadId, d("onSave -> turning off create mode"), o.value = !1, z()), i(y, l);
    }, A = () => {
      u.value = !0, m.value = -1;
    }, G = () => {
      u.value = !1;
    };
    C({
      doDrop: () => {
        $.value && typeof $.value.click == "function" && $.value.click();
      },
      doRefresh: z,
      doSave: () => {
        O.value && typeof O.value.click == "function" && O.value.click();
      },
      hasModifiedData: () => k.value.changed()
    });
    const Q = n(() => !M.value && I.value ? !0 : !a.hiddenDrop && !u.value && f.value && b.value), X = n(() => k.value.changed() ? !0 : u.value ? !1 : o.value ? !0 : !a.hiddenSave && f.value && b.value), Y = n(() => a.hideSwitchEdition || !M.value && !I.value || !M.value && I.value ? !1 : !u.value && !o.value && b.value && !(a.dropDisabled && a.updateDisabled)), ne = n(() => !a.hiddenButtons && (X.value || Q.value || Y.value)), J = n(() => a.title.startsWith("__:") ? String(Me(a.title.substring(3))) : a.title), ie = n(() => u.value ? !1 : J.value.length > 0 || !!p["post-title"]), se = n(() => a.insideModal ? "lkt-modal" : "section"), ce = n(() => k.value.changed() ? a.editedCloseConfirm : "");
    return (e, l) => {
      const y = j("lkt-button"), E = j("lkt-http-info"), fe = j("lkt-loader");
      return c(), _(he(se.value), {
        "pre-title": e.preTitle,
        title: e.title,
        "modal-name": e.modalName,
        "modal-key": e.modalKey,
        "z-index": e.zIndex,
        size: e.size,
        "show-close": e.showClose,
        "before-close": e.beforeClose,
        "disabled-close": e.disabledClose,
        "disabled-veil-click": e.disabledVeilClick,
        "close-confirm": ce.value,
        "close-confirm-key": e.editedCloseConfirmKey
      }, {
        default: q(() => [
          Z("article", Ie, [
            !e.insideModal && ie.value ? (c(), B("header", Be, [
              h(p)["pre-title"] ? (c(), B("div", we, [
                R(e.$slots, "pre-title", {
                  item: r.value,
                  loading: u.value
                })
              ])) : v("", !0),
              J.value.length > 0 ? (c(), B("h1", Ee, Ce(J.value), 1)) : v("", !0),
              h(p)["post-title"] ? (c(), B("div", Ue, [
                R(e.$slots, "post-title", {
                  item: r.value,
                  loading: u.value
                })
              ])) : v("", !0)
            ])) : v("", !0),
            V(Z("div", Re, [
              V(x(y, {
                ref: (U) => O.value = U,
                palette: "success",
                disabled: !W.value,
                "confirm-modal": te.value,
                "confirm-data": le.value,
                resource: P.value,
                "resource-data": oe.value,
                text: h(p)["button-save"] ? "" : e.saveText,
                icon: h(p)["button-save"] ? "" : e.saveIcon,
                onLoading: A,
                onLoaded: G,
                onClick: re
              }, {
                default: q(() => [
                  h(p)["button-save"] ? R(e.$slots, "button-save", {
                    key: 0,
                    item: r.value,
                    editMode: f.value,
                    isCreate: o.value,
                    canUpdate: M.value,
                    canDrop: I.value
                  }) : v("", !0)
                ]),
                _: 3
              }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"]), [
                [T, X.value]
              ]),
              o.value ? v("", !0) : V((c(), _(y, {
                key: 0,
                ref: (U) => $.value = U,
                palette: "danger",
                disabled: e.dropDisabled || !I.value,
                "confirm-modal": e.dropConfirm,
                "confirm-data": e.dropConfirmData,
                resource: e.dropResource,
                "resource-data": e.dropData,
                text: h(p)["button-drop"] ? "" : e.dropText,
                icon: h(p)["button-drop"] ? "" : e.dropIcon,
                onLoading: A,
                onLoaded: G,
                onClick: ue
              }, {
                default: q(() => [
                  h(p)["button-drop"] ? R(e.$slots, "button-drop", {
                    key: 0,
                    item: r.value,
                    editMode: f.value,
                    isCreate: o.value,
                    canUpdate: M.value,
                    canDrop: I.value
                  }) : v("", !0)
                ]),
                _: 3
              }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])), [
                [T, Q.value]
              ]),
              h(p).buttons ? V((c(), B("div", Ne, [
                R(e.$slots, "buttons")
              ], 512)), [
                [T, f.value]
              ]) : v("", !0),
              V(x(y, {
                checked: f.value,
                "onUpdate:checked": l[0] || (l[0] = (U) => f.value = U),
                class: "lkt-item-crud--switch-mode-button",
                "show-switch": "",
                text: e.editModeText
              }, null, 8, ["checked", "text"]), [
                [T, Y.value]
              ])
            ], 512), [
              [T, ne.value]
            ]),
            u.value ? v("", !0) : (c(), B("div", _e, [
              b.value ? (c(), B("div", Ve, [
                g.value ? (c(), _(E, {
                  key: 0,
                  code: m.value,
                  quick: "",
                  palette: m.value === 200 ? "success" : "danger",
                  "can-close": "",
                  onClose: l[1] || (l[1] = (U) => g.value = !1)
                }, null, 8, ["code", "palette"])) : v("", !0),
                R(e.$slots, "item", {
                  item: r.value,
                  loading: u.value,
                  editMode: f.value,
                  isCreate: o.value,
                  canUpdate: M.value,
                  canDrop: I.value,
                  itemBeingEdited: F.value
                })
              ])) : (c(), _(E, {
                key: 1,
                code: m.value
              }, null, 8, ["code"]))
            ])),
            u.value ? (c(), _(fe, { key: 2 })) : v("", !0)
          ])
        ]),
        _: 3
      }, 8, ["pre-title", "title", "modal-name", "modal-key", "z-index", "size", "show-close", "before-close", "disabled-close", "disabled-veil-click", "close-confirm", "close-confirm-key"]);
    };
  }
}), qe = {
  install: (t, C = {}) => {
    t.component("lkt-item-crud") === void 0 && t.component("lkt-item-crud", Te);
  }
}, He = (t) => {
  S.defaultSaveIcon = t;
}, Pe = (t) => {
  S.defaultDropIcon = t;
};
export {
  je as debugLktItemCrud,
  qe as default,
  Pe as setItemCrudDefaultDropIcon,
  He as setItemCrudDefaultSaveIcon
};
