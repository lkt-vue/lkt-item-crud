import { defineComponent as pe, useSlots as me, ref as s, computed as n, watch as y, nextTick as he, resolveComponent as J, openBlock as c, createBlock as N, resolveDynamicComponent as Ce, normalizeProps as ke, guardReactiveProps as be, withCtx as P, createElementVNode as Z, createElementBlock as B, unref as h, renderSlot as R, createCommentVNode as v, toDisplayString as De, withDirectives as V, createVNode as ee, vShow as T } from "vue";
import { httpCall as ye } from "lkt-http-client";
import { DataState as ae } from "lkt-data-state";
import { execModal as Se, refreshModal as ge, closeModal as Me, openModal as Ie, reOpenModal as Be } from "lkt-modal";
import { __ as _e } from "lkt-i18n";
const L = class L {
};
L.debugEnabled = !1, L.defaultSaveIcon = "", L.defaultDropIcon = "";
let S = L;
const u = (...t) => {
  S.debugEnabled && console.info("[LktItemCrud] ", ...t);
}, qe = (t = !0) => {
  S.debugEnabled = t;
}, j = (t) => {
  u("runModalCallback -> init", t);
  let C = t.modalKey ? t.modalKey : "_", _ = t.args ? t.args : {};
  switch (t.action) {
    case "reOpen":
      return Be(t.modalName, C, _);
    case "open":
      return Ie(t.modalName, C, _);
    case "close":
      return Me(t.modalName, C);
    case "refresh":
      return ge(t.modalName, C, _);
    case "exec":
      let e = t.method;
      return e ? Se(t.modalName, C, e, _) : void 0;
  }
}, we = { class: "lkt-item-crud" }, Ee = {
  key: 0,
  class: "lkt-item-crud_header"
}, Re = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, Ue = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, Ne = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Ve = { class: "lkt-item-crud-buttons" }, Te = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Le = {
  key: 1,
  class: "lkt-item-crud_content"
}, Oe = {
  key: 0,
  class: "lkt-grid-1"
}, $e = /* @__PURE__ */ pe({
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
  setup(t, { expose: C, emit: _ }) {
    const e = t, p = me(), i = _;
    let te = [];
    const d = s(!0), r = s(e.modelValue), U = s(te), f = s(e.editing), k = s(!1), g = s(!1), m = s(200), O = s(null), $ = s(null), b = s(new ae(r.value, e.dataStateConfig)), K = s(new ae(e.readData)), o = s(e.isCreate), x = s(!1), le = n(() => o.value ? e.createConfirm : e.updateConfirm), oe = n(() => o.value ? e.createConfirmData : e.updateConfirmData), q = n(() => o.value ? e.createResource : e.updateResource), ue = n(() => o.value ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), de = n(() => o.value ? e.createDisabled : e.updateDisabled), M = n(() => !o.value && U.value.includes("update")), I = n(() => !o.value && U.value.includes("drop")), z = async () => {
      u("fetchItem"), d.value = !0, m.value = -1, g.value = !1;
      try {
        const a = await ye(e.readResource, e.readData);
        if (u("fetchItem -> response", a), d.value = !1, m.value = a.httpStatus, !a.success) {
          k.value = !1, m.value = a.httpStatus, i("error", a.httpStatus);
          return;
        }
        k.value = !0, r.value = a.data, U.value = a.perms, b.value.increment(r.value).turnStoredIntoOriginal(), K.value.turnStoredIntoOriginal(), i("read", a);
      } catch {
        d.value = !1, k.value = !1, m.value = 404, i("error", 404);
        return;
      }
    };
    y(() => e.modelValue, (a) => {
      r.value = a, b.value.increment(a);
    }, { deep: !0 }), y(r, (a) => {
      if (x.value = !0, u("item updated ->", r.value), typeof e.beforeEmitUpdate == "function") {
        u("item updated -> has beforeEmitUpdate");
        let l = e.beforeEmitUpdate(r.value);
        u("item updated -> override with: ", l), typeof l == "object" && (r.value = l);
      }
      i("update:modelValue", r.value), u("item updated -> update dataState"), b.value.increment(a), he(() => x.value = !1);
    }, { deep: !0 }), y(U, () => i("perms", U.value));
    const A = n(() => de.value || !o.value && !M.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : b.value.changed());
    y(A, (a) => i("modified-data", a)), y(o, (a) => i("update:isCreate", a)), y(() => e.readData, (a) => {
      K.value.increment(a), K.value.changed() && z();
    }), y(() => e.editing, (a) => {
      u("editing updated -> updating editMode", a), f.value = a;
    }), y(f, (a) => {
      u("editMode updated -> emit update", a), i("update:editing", a);
    }), e.readResource && !o.value ? z() : o.value && (k.value = !0, f.value = !0, d.value = !1);
    const re = (a, l) => {
      if (d.value = !1, m.value = l.httpStatus, !l.success) {
        g.value = !0, i("error", l.httpStatus);
        return;
      }
      g.value = !0, e.onDropModalCallbacks.length > 0 && (u("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach((D) => {
        j(D);
      })), i("drop", l);
    }, ne = (a, l) => {
      if (u("onSave -> received response:", l), i("before-save"), q.value) {
        if (d.value = !1, m.value = l.httpStatus, !l.success) {
          g.value = !0, i("error", l.httpStatus);
          return;
        }
        g.value = !0;
      }
      let D = o.value ? "create" : "update";
      o.value || (u("onSave -> turn stored data into original"), b.value.turnStoredIntoOriginal()), D === "create" ? typeof e.onCreate == "function" && (u("onSave -> trigger onCreate callback"), e.onCreate(l), e.onCreateModalCallbacks.length > 0 && (u("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((w) => {
        j(w);
      }))) : typeof e.onUpdate == "function" && (u("onSave -> trigger onUpdate callback"), e.onUpdate(l), e.onUpdateModalCallbacks.length > 0 && (u("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((w) => {
        j(w);
      }))), !e.insideModal && l.autoReloadId && (u("onSave -> autoReloadId detected: ", l.autoReloadId), e.readData.id = l.autoReloadId, u("onSave -> turning off create mode"), o.value = !1, z()), i(D, l);
    }, H = () => {
      d.value = !0, m.value = -1;
    }, W = () => {
      d.value = !1;
    };
    C({
      doDrop: () => {
        $.value && typeof $.value.click == "function" && $.value.click();
      },
      doRefresh: z,
      doSave: () => {
        O.value && typeof O.value.click == "function" && O.value.click();
      },
      hasModifiedData: () => b.value.changed()
    });
    const ie = n(() => b.value.changed() ? e.editedCloseConfirm : ""), G = n(() => !M.value && I.value ? !0 : !e.hiddenDrop && !d.value && f.value && k.value), Q = n(() => b.value.changed() ? !0 : d.value ? !1 : o.value ? !0 : !e.hiddenSave && f.value && k.value), X = n(() => e.hideSwitchEdition || !M.value && !I.value || !M.value && I.value ? !1 : !d.value && !o.value && k.value && !(e.dropDisabled && e.updateDisabled)), se = n(() => !e.hiddenButtons && (Q.value || G.value || X.value)), F = n(() => e.title.startsWith("__:") ? String(_e(e.title.substring(3))) : e.title), ce = n(() => d.value ? !1 : F.value.length > 0 || !!p["post-title"]), Y = n(() => e.insideModal ? "lkt-modal" : "section"), fe = n(() => Y.value === "lkt-modal" ? {
      "modal-name": e.modalName,
      "modal-key": e.modalKey,
      "z-index": e.zIndex,
      "pre-title": e.preTitle,
      "show-close": e.showClose,
      "before-close": e.beforeClose,
      "disabled-close": e.disabledClose,
      "disabled-veil-click": e.disabledVeilClick,
      "close-confirm": ie.value,
      "close-confirm-key": e.editedCloseConfirmKey,
      title: e.title,
      size: e.size
    } : {});
    return (a, l) => {
      const D = J("lkt-button"), w = J("lkt-http-info"), ve = J("lkt-loader");
      return c(), N(Ce(Y.value), ke(be(fe.value)), {
        default: P(() => [
          Z("article", we, [
            !a.insideModal && ce.value ? (c(), B("header", Ee, [
              h(p)["pre-title"] ? (c(), B("div", Re, [
                R(a.$slots, "pre-title", {
                  item: r.value,
                  loading: d.value
                })
              ])) : v("", !0),
              F.value.length > 0 ? (c(), B("h1", Ue, De(F.value), 1)) : v("", !0),
              h(p)["post-title"] ? (c(), B("div", Ne, [
                R(a.$slots, "post-title", {
                  item: r.value,
                  loading: d.value
                })
              ])) : v("", !0)
            ])) : v("", !0),
            V(Z("div", Ve, [
              V(ee(D, {
                ref: (E) => O.value = E,
                palette: "success",
                disabled: !A.value,
                "confirm-modal": le.value,
                "confirm-data": oe.value,
                resource: q.value,
                "resource-data": ue.value,
                text: h(p)["button-save"] ? "" : a.saveText,
                icon: h(p)["button-save"] ? "" : a.saveIcon,
                onLoading: H,
                onLoaded: W,
                onClick: ne
              }, {
                default: P(() => [
                  h(p)["button-save"] ? R(a.$slots, "button-save", {
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
                [T, Q.value]
              ]),
              o.value ? v("", !0) : V((c(), N(D, {
                key: 0,
                ref: (E) => $.value = E,
                palette: "danger",
                disabled: a.dropDisabled || !I.value,
                "confirm-modal": a.dropConfirm,
                "confirm-data": a.dropConfirmData,
                resource: a.dropResource,
                "resource-data": a.dropData,
                text: h(p)["button-drop"] ? "" : a.dropText,
                icon: h(p)["button-drop"] ? "" : a.dropIcon,
                onLoading: H,
                onLoaded: W,
                onClick: re
              }, {
                default: P(() => [
                  h(p)["button-drop"] ? R(a.$slots, "button-drop", {
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
                [T, G.value]
              ]),
              h(p).buttons ? V((c(), B("div", Te, [
                R(a.$slots, "buttons")
              ], 512)), [
                [T, f.value]
              ]) : v("", !0),
              V(ee(D, {
                checked: f.value,
                "onUpdate:checked": l[0] || (l[0] = (E) => f.value = E),
                class: "lkt-item-crud--switch-mode-button",
                "show-switch": "",
                text: a.editModeText
              }, null, 8, ["checked", "text"]), [
                [T, X.value]
              ])
            ], 512), [
              [T, se.value]
            ]),
            d.value ? v("", !0) : (c(), B("div", Le, [
              k.value ? (c(), B("div", Oe, [
                g.value ? (c(), N(w, {
                  key: 0,
                  code: m.value,
                  quick: "",
                  palette: m.value === 200 ? "success" : "danger",
                  "can-close": "",
                  onClose: l[1] || (l[1] = (E) => g.value = !1)
                }, null, 8, ["code", "palette"])) : v("", !0),
                R(a.$slots, "item", {
                  item: r.value,
                  loading: d.value,
                  editMode: f.value,
                  isCreate: o.value,
                  canUpdate: M.value,
                  canDrop: I.value,
                  itemBeingEdited: x.value
                })
              ])) : (c(), N(w, {
                key: 1,
                code: m.value
              }, null, 8, ["code"]))
            ])),
            d.value ? (c(), N(ve, { key: 2 })) : v("", !0)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), Ae = {
  install: (t, C = {}) => {
    t.component("lkt-item-crud") === void 0 && t.component("lkt-item-crud", $e);
  }
}, He = (t) => {
  S.defaultSaveIcon = t;
}, We = (t) => {
  S.defaultDropIcon = t;
};
export {
  qe as debugLktItemCrud,
  Ae as default,
  We as setItemCrudDefaultDropIcon,
  He as setItemCrudDefaultSaveIcon
};
