import { defineComponent as pe, useSlots as ce, ref as s, watch as C, resolveComponent as Z, openBlock as i, createElementBlock as w, unref as m, withDirectives as z, renderSlot as y, vShow as K, createCommentVNode as c, createBlock as M, withCtx as E, computed as v, nextTick as ye, onMounted as ke, resolveDynamicComponent as De, normalizeProps as ge, guardReactiveProps as Se, createElementVNode as we, toDisplayString as Be, createSlots as se } from "vue";
import { httpCall as Me } from "lkt-http-client";
import { DataState as ie } from "lkt-data-state";
import { execModal as Ie, refreshModal as Te, closeModal as Ue, openModal as Re, reOpenModal as Ne } from "lkt-modal";
import { __ as $e } from "lkt-i18n";
const F = class F {
};
F.debugEnabled = !1, F.defaultSaveIcon = "", F.defaultDropIcon = "";
let U = F;
const p = (...o) => {
  U.debugEnabled && console.info("[LktItemCrud] ", ...o);
}, _e = (o = !0) => {
  U.debugEnabled = o;
}, Y = (o) => {
  p("runModalCallback -> init", o);
  let g = o.modalKey ? o.modalKey : "_", I = o.args ? o.args : {};
  switch (o.action) {
    case "reOpen":
      return Ne(o.modalName, g, I);
    case "open":
      return Re(o.modalName, g, I);
    case "close":
      return Ue(o.modalName, g);
    case "refresh":
      return Te(o.modalName, g, I);
    case "exec":
      let e = o.method;
      return e ? Ie(o.modalName, g, e, I) : void 0;
  }
}, Ee = { class: "lkt-item-crud-buttons" }, Ve = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Le = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Oe = {
  key: 4,
  class: "lkt-item-crud-buttons"
}, ve = /* @__PURE__ */ pe({
  __name: "ButtonNav",
  props: {
    item: { default: () => ({}) },
    editing: { type: Boolean, default: !1 },
    loading: { type: Boolean },
    createMode: { type: Boolean },
    canUpdate: { type: Boolean },
    canDrop: { type: Boolean },
    showSwitchButton: { type: Boolean },
    showSaveButton: { type: Boolean, default: !1 },
    showDropButton: { type: Boolean },
    ableToSave: { type: Boolean, default: !1 },
    ableToDrop: { type: Boolean },
    saveConfirm: {},
    dropConfirm: {},
    confirmData: {},
    dropConfirmData: {},
    saveResource: {},
    dropResource: {},
    saveData: {},
    dropData: {},
    saveText: {},
    dropText: {},
    saveIcon: {},
    dropIcon: {},
    editModeText: {}
  },
  emits: ["update:loading", "update:editing", "save", "drop"],
  setup(o, { expose: g, emit: I }) {
    const e = I, b = o, u = ce(), V = s(null), d = s(null), r = s(b.loading);
    C(() => b.loading, (a) => r.value = a), C(r, (a) => e("update:loading", a));
    const f = s(b.editing);
    C(() => b.editing, (a) => f.value = a), C(f, (a) => e("update:editing", a));
    const h = () => {
      r.value = !0;
    }, k = () => {
      r.value = !1;
    }, B = (a, S) => {
      e("save", a, S);
    }, D = (a, S) => {
      e("drop", a, S);
    };
    return g({
      doSave: () => {
        V.value && typeof V.value.click == "function" && V.value.click();
      },
      doDrop: () => {
        d.value && typeof d.value.click == "function" && d.value.click();
      }
    }), (a, S) => {
      const n = Z("lkt-button");
      return i(), w("div", Ee, [
        m(u)["prev-buttons-ever"] ? z((i(), w("div", Ve, [
          y(a.$slots, "prev-buttons-ever")
        ], 512)), [
          [K, !r.value]
        ]) : c("", !0),
        m(u)["prev-buttons"] ? z((i(), w("div", Le, [
          y(a.$slots, "prev-buttons")
        ], 512)), [
          [K, f.value && !r.value]
        ]) : c("", !0),
        a.showSaveButton ? (i(), M(n, {
          key: 2,
          ref_key: "saveButton",
          ref: V,
          palette: "success",
          disabled: !a.ableToSave,
          "confirm-modal": a.saveConfirm,
          "confirm-data": a.confirmData,
          resource: a.saveResource,
          "resource-data": a.saveData,
          text: m(u)["button-save"] ? "" : a.saveText,
          icon: m(u)["button-save"] ? "" : a.saveIcon,
          onLoading: h,
          onLoaded: k,
          onClick: B
        }, {
          default: E(() => [
            m(u)["button-save"] ? y(a.$slots, "button-save", {
              key: 0,
              item: a.item,
              editMode: f.value,
              isCreate: a.createMode,
              canUpdate: a.canUpdate,
              canDrop: a.canDrop
            }) : c("", !0)
          ]),
          _: 3
        }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])) : c("", !0),
        a.createMode ? c("", !0) : z((i(), M(n, {
          key: 3,
          ref_key: "dropButton",
          ref: d,
          palette: "danger",
          disabled: !a.ableToDrop,
          "confirm-modal": a.dropConfirm,
          "confirm-data": a.dropConfirmData,
          resource: a.dropResource,
          "resource-data": a.dropData,
          text: m(u)["button-drop"] ? "" : a.dropText,
          icon: m(u)["button-drop"] ? "" : a.dropIcon,
          onLoading: h,
          onLoaded: k,
          onClick: D
        }, {
          default: E(() => [
            m(u)["button-drop"] ? y(a.$slots, "button-drop", {
              key: 0,
              item: a.item,
              editMode: f.value,
              isCreate: a.createMode,
              canUpdate: a.canUpdate,
              canDrop: a.canDrop
            }) : c("", !0)
          ]),
          _: 3
        }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])), [
          [K, a.showDropButton]
        ]),
        m(u).buttons ? z((i(), w("div", Oe, [
          y(a.$slots, "buttons")
        ], 512)), [
          [K, f.value && !r.value]
        ]) : c("", !0),
        a.showSwitchButton ? (i(), M(n, {
          key: 5,
          checked: f.value,
          "onUpdate:checked": S[0] || (S[0] = (L) => f.value = L),
          class: "lkt-item-crud--switch-mode-button",
          "show-switch": "",
          text: a.editModeText
        }, null, 8, ["checked", "text"])) : c("", !0)
      ]);
    };
  }
});
var _ = /* @__PURE__ */ ((o) => (o.Top = "top", o.Bottom = "bottom", o))(_ || {}), j = /* @__PURE__ */ ((o) => (o.Changed = "changed", o.Always = "always", o))(j || {});
const Ae = { class: "lkt-item-crud" }, ze = {
  key: 0,
  class: "lkt-item-crud_header"
}, Ke = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, Fe = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, Pe = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Je = {
  key: 2,
  class: "lkt-item-crud_content"
}, je = {
  key: 0,
  class: "lkt-grid-1"
}, qe = /* @__PURE__ */ pe({
  __name: "LktItemCrud",
  props: {
    modelValue: { default: () => ({}) },
    title: { default: "" },
    editModeText: { default: "Edition Mode" },
    saveText: { default: "Save" },
    saveIcon: { default: () => U.defaultSaveIcon },
    dropText: { default: "Delete" },
    dropIcon: { default: () => U.defaultDropIcon },
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
    buttonNavPosition: { default: _.Top },
    buttonNavVisibility: { default: j.Changed },
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
  setup(o, { expose: g, emit: I }) {
    const e = o, b = ce(), u = I;
    let V = [];
    const d = s(!0), r = s(e.modelValue), f = s(V), h = s(e.editing), k = s(!1), B = s(!1), D = s(200), x = s(null), ee = s(null), a = s(new ie(r.value, e.dataStateConfig)), S = s(new ie(e.readData)), n = s(e.isCreate), L = s(!1), te = s(!1), P = s(null), ae = v(() => n.value ? e.createConfirm : e.updateConfirm), oe = v(() => n.value ? e.createConfirmData : e.updateConfirmData), q = v(() => n.value ? e.createResource : e.updateResource), le = v(() => n.value ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), fe = v(() => n.value ? e.createDisabled : e.updateDisabled), R = v(() => !n.value && Array.isArray(f.value) && f.value.includes("update")), N = v(() => !n.value && Array.isArray(f.value) && f.value.includes("drop")), J = async () => {
      p("fetchItem"), d.value = !0, D.value = -1, B.value = !1;
      try {
        const t = await Me(e.readResource, e.readData);
        if (p("fetchItem -> response", t), d.value = !1, D.value = t.httpStatus, !t.success) {
          k.value = !1, D.value = t.httpStatus, u("error", t.httpStatus);
          return;
        }
        k.value = !0, r.value = t.data, f.value = t.perms, a.value.increment(r.value).turnStoredIntoOriginal(), S.value.turnStoredIntoOriginal(), u("read", t);
      } catch {
        d.value = !1, k.value = !1, D.value = 404, u("error", 404);
        return;
      }
    };
    C(() => e.modelValue, (t) => {
      r.value = t, a.value.increment(t);
    }, { deep: !0 }), C(r, (t) => {
      if (L.value = !0, p("item updated ->", r.value), typeof e.beforeEmitUpdate == "function") {
        p("item updated -> has beforeEmitUpdate");
        let l = e.beforeEmitUpdate(r.value);
        p("item updated -> override with: ", l), typeof l == "object" && (r.value = l);
      }
      u("update:modelValue", r.value), p("item updated -> update dataState"), a.value.increment(t), ye(() => L.value = !1);
    }, { deep: !0 }), C(f, () => u("perms", f.value));
    const O = v(() => fe.value || !n.value && !R.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : a.value.changed()), H = v(() => !e.dropDisabled && N.value);
    C(O, (t) => u("modified-data", t)), C(n, (t) => u("update:isCreate", t)), C(() => e.readData, (t) => {
      S.value.increment(t), S.value.changed() && J();
    }), C(() => e.editing, (t) => {
      p("editing updated -> updating editMode", t), h.value = t;
    }), C(h, (t) => {
      p("editMode updated -> emit update", t), u("update:editing", t);
    }), ke(() => {
      e.readResource && !n.value ? J() : n.value && (k.value = !0, h.value = !0, d.value = !1, a.value.increment(r.value).turnStoredIntoOriginal());
    });
    const re = (t, l) => {
      if (d.value = !1, D.value = l.httpStatus, !l.success) {
        B.value = !0, u("error", l.httpStatus);
        return;
      }
      B.value = !0, e.onDropModalCallbacks.length > 0 && (p("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach(($) => {
        Y($);
      })), u("drop", l);
    }, de = (t, l) => {
      if (p("onSave -> received response:", l), u("before-save"), q.value) {
        if (d.value = !1, typeof l < "u" && (D.value = l.httpStatus, !l.success)) {
          B.value = !0, u("error", l.httpStatus);
          return;
        }
        B.value = !0;
      }
      let $ = n.value ? "create" : "update";
      n.value || (p("onSave -> turn stored data into original"), a.value.turnStoredIntoOriginal()), $ === "create" ? (te.value = !0, a.value.increment(r.value).turnStoredIntoOriginal(), typeof e.onCreate == "function" && (p("onSave -> trigger onCreate callback"), e.onCreate(l), e.onCreateModalCallbacks.length > 0 && (p("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((A) => {
        Y(A);
      })))) : typeof e.onUpdate == "function" && (p("onSave -> trigger onUpdate callback"), e.onUpdate(l), e.onUpdateModalCallbacks.length > 0 && (p("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((A) => {
        Y(A);
      }))), !e.insideModal && l.autoReloadId && (p("onSave -> autoReloadId detected: ", l.autoReloadId), e.readData.id = l.autoReloadId, p("onSave -> turning off create mode"), n.value = !1, J()), u($, l);
    };
    g({
      doDrop: () => {
        P.value && ee.value.doDrop();
      },
      doRefresh: J,
      doSave: () => {
        P.value && x.value.doSave();
      },
      hasModifiedData: () => a.value.changed()
    });
    const me = v(() => a.value.changed() ? e.editedCloseConfirm : ""), be = (t) => {
      if (console.log("crudBeforeClose: ", t), typeof e.beforeClose == "function")
        return e.beforeClose({
          ...t,
          itemCreated: te.value
        });
    }, W = v(() => !R.value && N.value ? !0 : !e.hiddenDrop && !d.value && h.value && k.value), G = v(() => a.value.changed() ? !0 : d.value ? !1 : n.value ? !0 : e.buttonNavVisibility === j.Always ? O.value : !e.hiddenSave && h.value && k.value), Q = v(() => e.hideSwitchEdition || !R.value && !N.value || !R.value && N.value ? !1 : !d.value && !n.value && k.value && !(e.dropDisabled && e.updateDisabled)), ue = v(() => e.buttonNavVisibility === j.Always && (O.value || H.value) || b["prev-buttons-ever"] ? !0 : !e.hiddenButtons && (G.value || W.value || Q.value)), X = v(() => e.title.startsWith("__:") ? String($e(e.title.substring(3))) : e.title), he = v(() => d.value ? !1 : X.value.length > 0 || !!b["post-title"]), ne = v(() => e.insideModal ? "lkt-modal" : "section"), Ce = v(() => ne.value === "lkt-modal" ? {
      "modal-name": e.modalName,
      "modal-key": e.modalKey,
      "z-index": e.zIndex,
      "pre-title": e.preTitle,
      "show-close": e.showClose,
      "before-close": be,
      "disabled-close": e.disabledClose,
      "disabled-veil-click": e.disabledVeilClick,
      "close-confirm": me.value,
      "close-confirm-key": e.editedCloseConfirmKey,
      title: e.title,
      size: e.size,
      item: r.value
    } : {});
    return (t, l) => {
      const $ = Z("lkt-http-info"), A = Z("lkt-loader");
      return i(), M(De(ne.value), ge(Se(Ce.value)), {
        default: E(() => [
          we("article", Ae, [
            !t.insideModal && he.value ? (i(), w("header", ze, [
              m(b)["pre-title"] ? (i(), w("div", Ke, [
                y(t.$slots, "pre-title", {
                  item: r.value,
                  loading: d.value
                })
              ])) : c("", !0),
              X.value.length > 0 ? (i(), w("h1", Fe, Be(X.value), 1)) : c("", !0),
              m(b)["post-title"] ? (i(), w("div", Pe, [
                y(t.$slots, "post-title", {
                  item: r.value,
                  loading: d.value
                })
              ])) : c("", !0)
            ])) : c("", !0),
            ue.value && t.buttonNavPosition === "top" ? (i(), M(ve, {
              key: 1,
              ref_key: "buttonNav",
              ref: P,
              loading: d.value,
              "onUpdate:loading": l[0] || (l[0] = (T) => d.value = T),
              editing: h.value,
              "onUpdate:editing": l[1] || (l[1] = (T) => h.value = T),
              item: r.value,
              "create-mode": n.value,
              "can-update": R.value,
              "can-drop": N.value,
              "show-switch-button": Q.value,
              "show-save-button": G.value,
              "show-drop-button": W.value,
              "able-to-save": O.value,
              "able-to-drop": H.value,
              "save-confirm": ae.value,
              "drop-confirm": t.dropConfirm,
              "confirm-data": oe.value,
              "drop-confirm-data": t.dropConfirmData,
              "save-resource": q.value,
              "drop-resource": t.dropResource,
              "save-data": le.value,
              "drop-data": t.dropData,
              "save-text": t.saveText,
              "drop-text": t.dropText,
              "save-icon": t.saveIcon,
              "drop-icon": t.dropIcon,
              "edit-mode-text": t.editModeText,
              onSave: de,
              onDrop: re
            }, se({ _: 2 }, [
              m(b)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: E(() => [
                  y(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              m(b)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: E(() => [
                  y(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "create-mode", "can-update", "can-drop", "show-switch-button", "show-save-button", "show-drop-button", "able-to-save", "able-to-drop", "save-confirm", "drop-confirm", "confirm-data", "drop-confirm-data", "save-resource", "drop-resource", "save-data", "drop-data", "save-text", "drop-text", "save-icon", "drop-icon", "edit-mode-text"])) : c("", !0),
            d.value ? c("", !0) : (i(), w("div", Je, [
              k.value ? (i(), w("div", je, [
                B.value ? (i(), M($, {
                  key: 0,
                  code: D.value,
                  quick: "",
                  palette: D.value === 200 ? "success" : "danger",
                  "can-close": "",
                  onClose: l[2] || (l[2] = (T) => B.value = !1)
                }, null, 8, ["code", "palette"])) : c("", !0),
                y(t.$slots, "item", {
                  item: r.value,
                  loading: d.value,
                  editMode: h.value,
                  isCreate: n.value,
                  canUpdate: R.value,
                  canDrop: N.value,
                  itemBeingEdited: L.value
                })
              ])) : (i(), M($, {
                key: 1,
                code: D.value
              }, null, 8, ["code"]))
            ])),
            d.value ? (i(), M(A, { key: 3 })) : c("", !0),
            t.buttonNavPosition === m(_).Bottom ? z((i(), M(ve, {
              key: 4,
              ref_key: "buttonNav",
              ref: P,
              loading: d.value,
              "onUpdate:loading": l[3] || (l[3] = (T) => d.value = T),
              editing: h.value,
              "onUpdate:editing": l[4] || (l[4] = (T) => h.value = T),
              item: r.value,
              "create-mode": n.value,
              "can-update": R.value,
              "can-drop": N.value,
              "show-switch-button": Q.value,
              "show-save-button": G.value,
              "show-drop-button": W.value,
              "able-to-save": O.value,
              "able-to-drop": H.value,
              "save-confirm": ae.value,
              "drop-confirm": t.dropConfirm,
              "confirm-data": oe.value,
              "drop-confirm-data": t.dropConfirmData,
              "save-resource": q.value,
              "drop-resource": t.dropResource,
              "save-data": le.value,
              "drop-data": t.dropData,
              "save-text": t.saveText,
              "drop-text": t.dropText,
              "save-icon": t.saveIcon,
              "drop-icon": t.dropIcon,
              "edit-mode-text": t.editModeText,
              onSave: de,
              onDrop: re
            }, se({ _: 2 }, [
              m(b)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: E(() => [
                  y(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              m(b)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: E(() => [
                  y(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "create-mode", "can-update", "can-drop", "show-switch-button", "show-save-button", "show-drop-button", "able-to-save", "able-to-drop", "save-confirm", "drop-confirm", "confirm-data", "drop-confirm-data", "save-resource", "drop-resource", "save-data", "drop-data", "save-text", "drop-text", "save-icon", "drop-icon", "edit-mode-text"])), [
              [K, ue.value]
            ]) : c("", !0)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), xe = {
  install: (o, g = {}) => {
    o.component("lkt-item-crud") === void 0 && o.component("lkt-item-crud", qe);
  }
}, et = (o) => {
  U.defaultSaveIcon = o;
}, tt = (o) => {
  U.defaultDropIcon = o;
};
export {
  _e as debugLktItemCrud,
  xe as default,
  tt as setItemCrudDefaultDropIcon,
  et as setItemCrudDefaultSaveIcon
};
