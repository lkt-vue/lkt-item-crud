import { defineComponent as ve, useSlots as pe, ref as p, watch as y, resolveComponent as Z, openBlock as s, createElementBlock as w, unref as m, withDirectives as z, renderSlot as k, vShow as K, createCommentVNode as c, createBlock as M, withCtx as E, computed as i, nextTick as he, resolveDynamicComponent as ye, normalizeProps as ke, guardReactiveProps as Ce, createElementVNode as De, toDisplayString as ge, createSlots as ne } from "vue";
import { httpCall as Se } from "lkt-http-client";
import { DataState as se } from "lkt-data-state";
import { execModal as we, refreshModal as Be, closeModal as Me, openModal as Ie, reOpenModal as Te } from "lkt-modal";
import { __ as Ue } from "lkt-i18n";
const F = class F {
};
F.debugEnabled = !1, F.defaultSaveIcon = "", F.defaultDropIcon = "";
let U = F;
const v = (...o) => {
  U.debugEnabled && console.info("[LktItemCrud] ", ...o);
}, Xe = (o = !0) => {
  U.debugEnabled = o;
}, Y = (o) => {
  v("runModalCallback -> init", o);
  let g = o.modalKey ? o.modalKey : "_", I = o.args ? o.args : {};
  switch (o.action) {
    case "reOpen":
      return Te(o.modalName, g, I);
    case "open":
      return Ie(o.modalName, g, I);
    case "close":
      return Me(o.modalName, g);
    case "refresh":
      return Be(o.modalName, g, I);
    case "exec":
      let e = o.method;
      return e ? we(o.modalName, g, e, I) : void 0;
  }
}, Re = { class: "lkt-item-crud-buttons" }, Ne = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, $e = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Ee = {
  key: 4,
  class: "lkt-item-crud-buttons"
}, ie = /* @__PURE__ */ ve({
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
    const e = I, b = o, u = pe(), V = p(null), r = p(null), d = p(b.loading);
    y(() => b.loading, (a) => d.value = a), y(d, (a) => e("update:loading", a));
    const f = p(b.editing);
    y(() => b.editing, (a) => f.value = a), y(f, (a) => e("update:editing", a));
    const h = () => {
      d.value = !0;
    }, C = () => {
      d.value = !1;
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
        r.value && typeof r.value.click == "function" && r.value.click();
      }
    }), (a, S) => {
      const n = Z("lkt-button");
      return s(), w("div", Re, [
        m(u)["prev-buttons-ever"] ? z((s(), w("div", Ne, [
          k(a.$slots, "prev-buttons-ever")
        ], 512)), [
          [K, !d.value]
        ]) : c("", !0),
        m(u)["prev-buttons"] ? z((s(), w("div", $e, [
          k(a.$slots, "prev-buttons")
        ], 512)), [
          [K, f.value && !d.value]
        ]) : c("", !0),
        a.showSaveButton ? (s(), M(n, {
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
          onLoaded: C,
          onClick: B
        }, {
          default: E(() => [
            m(u)["button-save"] ? k(a.$slots, "button-save", {
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
        a.createMode ? c("", !0) : z((s(), M(n, {
          key: 3,
          ref_key: "dropButton",
          ref: r,
          palette: "danger",
          disabled: !a.ableToDrop,
          "confirm-modal": a.dropConfirm,
          "confirm-data": a.dropConfirmData,
          resource: a.dropResource,
          "resource-data": a.dropData,
          text: m(u)["button-drop"] ? "" : a.dropText,
          icon: m(u)["button-drop"] ? "" : a.dropIcon,
          onLoading: h,
          onLoaded: C,
          onClick: D
        }, {
          default: E(() => [
            m(u)["button-drop"] ? k(a.$slots, "button-drop", {
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
        m(u).buttons ? z((s(), w("div", Ee, [
          k(a.$slots, "buttons")
        ], 512)), [
          [K, f.value && !d.value]
        ]) : c("", !0),
        a.showSwitchButton ? (s(), M(n, {
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
const Ve = { class: "lkt-item-crud" }, Le = {
  key: 0,
  class: "lkt-item-crud_header"
}, Oe = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, Ae = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, ze = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Ke = {
  key: 2,
  class: "lkt-item-crud_content"
}, Fe = {
  key: 0,
  class: "lkt-grid-1"
}, Pe = /* @__PURE__ */ ve({
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
    const e = o, b = pe(), u = I;
    let V = [];
    const r = p(!0), d = p(e.modelValue), f = p(V), h = p(e.editing), C = p(!1), B = p(!1), D = p(200), x = p(null), ee = p(null), a = p(new se(d.value, e.dataStateConfig)), S = p(new se(e.readData)), n = p(e.isCreate), L = p(!1), P = p(null), te = i(() => n.value ? e.createConfirm : e.updateConfirm), ae = i(() => n.value ? e.createConfirmData : e.updateConfirmData), q = i(() => n.value ? e.createResource : e.updateResource), oe = i(() => n.value ? { ...e.createData, ...JSON.parse(JSON.stringify(d.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(d.value)) }), ce = i(() => n.value ? e.createDisabled : e.updateDisabled), R = i(() => !n.value && Array.isArray(f.value) && f.value.includes("update")), N = i(() => !n.value && Array.isArray(f.value) && f.value.includes("drop")), J = async () => {
      v("fetchItem"), r.value = !0, D.value = -1, B.value = !1;
      try {
        const t = await Se(e.readResource, e.readData);
        if (v("fetchItem -> response", t), r.value = !1, D.value = t.httpStatus, !t.success) {
          C.value = !1, D.value = t.httpStatus, u("error", t.httpStatus);
          return;
        }
        C.value = !0, d.value = t.data, f.value = t.perms, a.value.increment(d.value).turnStoredIntoOriginal(), S.value.turnStoredIntoOriginal(), u("read", t);
      } catch {
        r.value = !1, C.value = !1, D.value = 404, u("error", 404);
        return;
      }
    };
    y(() => e.modelValue, (t) => {
      d.value = t, a.value.increment(t);
    }, { deep: !0 }), y(d, (t) => {
      if (L.value = !0, v("item updated ->", d.value), typeof e.beforeEmitUpdate == "function") {
        v("item updated -> has beforeEmitUpdate");
        let l = e.beforeEmitUpdate(d.value);
        v("item updated -> override with: ", l), typeof l == "object" && (d.value = l);
      }
      u("update:modelValue", d.value), v("item updated -> update dataState"), a.value.increment(t), he(() => L.value = !1);
    }, { deep: !0 }), y(f, () => u("perms", f.value));
    const O = i(() => ce.value || !n.value && !R.value || typeof e.saveValidator == "function" && !e.saveValidator(d.value) ? !1 : a.value.changed()), H = i(() => !e.dropDisabled && N.value);
    y(O, (t) => u("modified-data", t)), y(n, (t) => u("update:isCreate", t)), y(() => e.readData, (t) => {
      S.value.increment(t), S.value.changed() && J();
    }), y(() => e.editing, (t) => {
      v("editing updated -> updating editMode", t), h.value = t;
    }), y(h, (t) => {
      v("editMode updated -> emit update", t), u("update:editing", t);
    }), e.readResource && !n.value ? J() : n.value && (C.value = !0, h.value = !0, r.value = !1);
    const le = (t, l) => {
      if (r.value = !1, D.value = l.httpStatus, !l.success) {
        B.value = !0, u("error", l.httpStatus);
        return;
      }
      B.value = !0, e.onDropModalCallbacks.length > 0 && (v("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach(($) => {
        Y($);
      })), u("drop", l);
    }, de = (t, l) => {
      if (v("onSave -> received response:", l), u("before-save"), q.value) {
        if (r.value = !1, typeof l < "u" && (D.value = l.httpStatus, l.success)) {
          B.value = !0, u("error", l.httpStatus);
          return;
        }
        B.value = !0;
      }
      let $ = n.value ? "create" : "update";
      n.value || (v("onSave -> turn stored data into original"), a.value.turnStoredIntoOriginal()), $ === "create" ? typeof e.onCreate == "function" && (v("onSave -> trigger onCreate callback"), e.onCreate(l), e.onCreateModalCallbacks.length > 0 && (v("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((A) => {
        Y(A);
      }))) : typeof e.onUpdate == "function" && (v("onSave -> trigger onUpdate callback"), e.onUpdate(l), e.onUpdateModalCallbacks.length > 0 && (v("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((A) => {
        Y(A);
      }))), !e.insideModal && l.autoReloadId && (v("onSave -> autoReloadId detected: ", l.autoReloadId), e.readData.id = l.autoReloadId, v("onSave -> turning off create mode"), n.value = !1, J()), u($, l);
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
    const fe = i(() => a.value.changed() ? e.editedCloseConfirm : ""), W = i(() => !R.value && N.value ? !0 : !e.hiddenDrop && !r.value && h.value && C.value), G = i(() => a.value.changed() ? !0 : r.value ? !1 : n.value ? !0 : e.buttonNavVisibility === j.Always ? O.value : !e.hiddenSave && h.value && C.value), Q = i(() => e.hideSwitchEdition || !R.value && !N.value || !R.value && N.value ? !1 : !r.value && !n.value && C.value && !(e.dropDisabled && e.updateDisabled)), re = i(() => e.buttonNavVisibility === j.Always && (O.value || H.value) || b["prev-buttons-ever"] ? !0 : !e.hiddenButtons && (G.value || W.value || Q.value)), X = i(() => e.title.startsWith("__:") ? String(Ue(e.title.substring(3))) : e.title), me = i(() => r.value ? !1 : X.value.length > 0 || !!b["post-title"]), ue = i(() => e.insideModal ? "lkt-modal" : "section"), be = i(() => ue.value === "lkt-modal" ? {
      "modal-name": e.modalName,
      "modal-key": e.modalKey,
      "z-index": e.zIndex,
      "pre-title": e.preTitle,
      "show-close": e.showClose,
      "before-close": e.beforeClose,
      "disabled-close": e.disabledClose,
      "disabled-veil-click": e.disabledVeilClick,
      "close-confirm": fe.value,
      "close-confirm-key": e.editedCloseConfirmKey,
      title: e.title,
      size: e.size
    } : {});
    return (t, l) => {
      const $ = Z("lkt-http-info"), A = Z("lkt-loader");
      return s(), M(ye(ue.value), ke(Ce(be.value)), {
        default: E(() => [
          De("article", Ve, [
            !t.insideModal && me.value ? (s(), w("header", Le, [
              m(b)["pre-title"] ? (s(), w("div", Oe, [
                k(t.$slots, "pre-title", {
                  item: d.value,
                  loading: r.value
                })
              ])) : c("", !0),
              X.value.length > 0 ? (s(), w("h1", Ae, ge(X.value), 1)) : c("", !0),
              m(b)["post-title"] ? (s(), w("div", ze, [
                k(t.$slots, "post-title", {
                  item: d.value,
                  loading: r.value
                })
              ])) : c("", !0)
            ])) : c("", !0),
            re.value && t.buttonNavPosition === "top" ? (s(), M(ie, {
              key: 1,
              ref_key: "buttonNav",
              ref: P,
              loading: r.value,
              "onUpdate:loading": l[0] || (l[0] = (T) => r.value = T),
              editing: h.value,
              "onUpdate:editing": l[1] || (l[1] = (T) => h.value = T),
              item: d.value,
              "create-mode": n.value,
              "can-update": R.value,
              "can-drop": N.value,
              "show-switch-button": Q.value,
              "show-save-button": G.value,
              "show-drop-button": W.value,
              "able-to-save": O.value,
              "able-to-drop": H.value,
              "save-confirm": te.value,
              "drop-confirm": t.dropConfirm,
              "confirm-data": ae.value,
              "drop-confirm-data": t.dropConfirmData,
              "save-resource": q.value,
              "drop-resource": t.dropResource,
              "save-data": oe.value,
              "drop-data": t.dropData,
              "save-text": t.saveText,
              "drop-text": t.dropText,
              "save-icon": t.saveIcon,
              "drop-icon": t.dropIcon,
              "edit-mode-text": t.editModeText,
              onSave: de,
              onDrop: le
            }, ne({ _: 2 }, [
              m(b)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: E(() => [
                  k(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              m(b)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: E(() => [
                  k(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "create-mode", "can-update", "can-drop", "show-switch-button", "show-save-button", "show-drop-button", "able-to-save", "able-to-drop", "save-confirm", "drop-confirm", "confirm-data", "drop-confirm-data", "save-resource", "drop-resource", "save-data", "drop-data", "save-text", "drop-text", "save-icon", "drop-icon", "edit-mode-text"])) : c("", !0),
            r.value ? c("", !0) : (s(), w("div", Ke, [
              C.value ? (s(), w("div", Fe, [
                B.value ? (s(), M($, {
                  key: 0,
                  code: D.value,
                  quick: "",
                  palette: D.value === 200 ? "success" : "danger",
                  "can-close": "",
                  onClose: l[2] || (l[2] = (T) => B.value = !1)
                }, null, 8, ["code", "palette"])) : c("", !0),
                k(t.$slots, "item", {
                  item: d.value,
                  loading: r.value,
                  editMode: h.value,
                  isCreate: n.value,
                  canUpdate: R.value,
                  canDrop: N.value,
                  itemBeingEdited: L.value
                })
              ])) : (s(), M($, {
                key: 1,
                code: D.value
              }, null, 8, ["code"]))
            ])),
            r.value ? (s(), M(A, { key: 3 })) : c("", !0),
            t.buttonNavPosition === m(_).Bottom ? z((s(), M(ie, {
              key: 4,
              ref_key: "buttonNav",
              ref: P,
              loading: r.value,
              "onUpdate:loading": l[3] || (l[3] = (T) => r.value = T),
              editing: h.value,
              "onUpdate:editing": l[4] || (l[4] = (T) => h.value = T),
              item: d.value,
              "create-mode": n.value,
              "can-update": R.value,
              "can-drop": N.value,
              "show-switch-button": Q.value,
              "show-save-button": G.value,
              "show-drop-button": W.value,
              "able-to-save": O.value,
              "able-to-drop": H.value,
              "save-confirm": te.value,
              "drop-confirm": t.dropConfirm,
              "confirm-data": ae.value,
              "drop-confirm-data": t.dropConfirmData,
              "save-resource": q.value,
              "drop-resource": t.dropResource,
              "save-data": oe.value,
              "drop-data": t.dropData,
              "save-text": t.saveText,
              "drop-text": t.dropText,
              "save-icon": t.saveIcon,
              "drop-icon": t.dropIcon,
              "edit-mode-text": t.editModeText,
              onSave: de,
              onDrop: le
            }, ne({ _: 2 }, [
              m(b)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: E(() => [
                  k(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              m(b)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: E(() => [
                  k(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "create-mode", "can-update", "can-drop", "show-switch-button", "show-save-button", "show-drop-button", "able-to-save", "able-to-drop", "save-confirm", "drop-confirm", "confirm-data", "drop-confirm-data", "save-resource", "drop-resource", "save-data", "drop-data", "save-text", "drop-text", "save-icon", "drop-icon", "edit-mode-text"])), [
              [K, re.value]
            ]) : c("", !0)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), Ye = {
  install: (o, g = {}) => {
    o.component("lkt-item-crud") === void 0 && o.component("lkt-item-crud", Pe);
  }
}, Ze = (o) => {
  U.defaultSaveIcon = o;
}, _e = (o) => {
  U.defaultDropIcon = o;
};
export {
  Xe as debugLktItemCrud,
  Ye as default,
  _e as setItemCrudDefaultDropIcon,
  Ze as setItemCrudDefaultSaveIcon
};
