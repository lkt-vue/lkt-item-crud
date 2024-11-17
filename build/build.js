import { defineComponent as ve, useSlots as pe, ref as p, watch as k, resolveComponent as Z, openBlock as s, createElementBlock as S, unref as m, withDirectives as z, renderSlot as y, vShow as K, createCommentVNode as c, createBlock as B, withCtx as $, computed as i, nextTick as he, resolveDynamicComponent as ke, normalizeProps as ye, guardReactiveProps as Ce, createElementVNode as De, toDisplayString as ge, createSlots as ne } from "vue";
import { httpCall as Se } from "lkt-http-client";
import { DataState as se } from "lkt-data-state";
import { execModal as we, refreshModal as Be, closeModal as Me, openModal as Ie, reOpenModal as Te } from "lkt-modal";
import { __ as Ue } from "lkt-i18n";
const F = class F {
};
F.debugEnabled = !1, F.defaultSaveIcon = "", F.defaultDropIcon = "";
let T = F;
const v = (...o) => {
  T.debugEnabled && console.info("[LktItemCrud] ", ...o);
}, Xe = (o = !0) => {
  T.debugEnabled = o;
}, Y = (o) => {
  v("runModalCallback -> init", o);
  let g = o.modalKey ? o.modalKey : "_", M = o.args ? o.args : {};
  switch (o.action) {
    case "reOpen":
      return Te(o.modalName, g, M);
    case "open":
      return Ie(o.modalName, g, M);
    case "close":
      return Me(o.modalName, g);
    case "refresh":
      return Be(o.modalName, g, M);
    case "exec":
      let e = o.method;
      return e ? we(o.modalName, g, e, M) : void 0;
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
  setup(o, { expose: g, emit: M }) {
    const e = M, b = o, u = pe(), E = p(null), r = p(null), d = p(b.loading);
    k(() => b.loading, (t) => d.value = t), k(d, (t) => e("update:loading", t));
    const f = p(b.editing);
    k(() => b.editing, (t) => f.value = t), k(f, (t) => e("update:editing", t));
    const h = () => {
      d.value = !0;
    }, C = () => {
      d.value = !1;
    }, w = () => {
      e("save");
    }, D = () => {
      e("drop");
    };
    return g({
      doSave: () => {
        E.value && typeof E.value.click == "function" && E.value.click();
      },
      doDrop: () => {
        r.value && typeof r.value.click == "function" && r.value.click();
      }
    }), (t, V) => {
      const n = Z("lkt-button");
      return s(), S("div", Re, [
        m(u)["prev-buttons-ever"] ? z((s(), S("div", Ne, [
          y(t.$slots, "prev-buttons-ever")
        ], 512)), [
          [K, !d.value]
        ]) : c("", !0),
        m(u)["prev-buttons"] ? z((s(), S("div", $e, [
          y(t.$slots, "prev-buttons")
        ], 512)), [
          [K, f.value && !d.value]
        ]) : c("", !0),
        t.showSaveButton ? (s(), B(n, {
          key: 2,
          ref_key: "saveButton",
          ref: E,
          palette: "success",
          disabled: !t.ableToSave,
          "confirm-modal": t.saveConfirm,
          "confirm-data": t.confirmData,
          resource: t.saveResource,
          "resource-data": t.saveData,
          text: m(u)["button-save"] ? "" : t.saveText,
          icon: m(u)["button-save"] ? "" : t.saveIcon,
          onLoading: h,
          onLoaded: C,
          onClick: w
        }, {
          default: $(() => [
            m(u)["button-save"] ? y(t.$slots, "button-save", {
              key: 0,
              item: t.item,
              editMode: f.value,
              isCreate: t.createMode,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : c("", !0)
          ]),
          _: 3
        }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])) : c("", !0),
        t.createMode ? c("", !0) : z((s(), B(n, {
          key: 3,
          ref_key: "dropButton",
          ref: r,
          palette: "danger",
          disabled: !t.ableToDrop,
          "confirm-modal": t.dropConfirm,
          "confirm-data": t.dropConfirmData,
          resource: t.dropResource,
          "resource-data": t.dropData,
          text: m(u)["button-drop"] ? "" : t.dropText,
          icon: m(u)["button-drop"] ? "" : t.dropIcon,
          onLoading: h,
          onLoaded: C,
          onClick: D
        }, {
          default: $(() => [
            m(u)["button-drop"] ? y(t.$slots, "button-drop", {
              key: 0,
              item: t.item,
              editMode: f.value,
              isCreate: t.createMode,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : c("", !0)
          ]),
          _: 3
        }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])), [
          [K, t.showDropButton]
        ]),
        m(u).buttons ? z((s(), S("div", Ee, [
          y(t.$slots, "buttons")
        ], 512)), [
          [K, f.value && !d.value]
        ]) : c("", !0),
        t.showSwitchButton ? (s(), B(n, {
          key: 5,
          checked: f.value,
          "onUpdate:checked": V[0] || (V[0] = (L) => f.value = L),
          class: "lkt-item-crud--switch-mode-button",
          "show-switch": "",
          text: t.editModeText
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
    saveIcon: { default: () => T.defaultSaveIcon },
    dropText: { default: "Delete" },
    dropIcon: { default: () => T.defaultDropIcon },
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
  setup(o, { expose: g, emit: M }) {
    const e = o, b = pe(), u = M;
    let E = [];
    const r = p(!0), d = p(e.modelValue), f = p(E), h = p(e.editing), C = p(!1), w = p(!1), D = p(200), x = p(null), ee = p(null), t = p(new se(d.value, e.dataStateConfig)), V = p(new se(e.readData)), n = p(e.isCreate), L = p(!1), P = p(null), ae = i(() => n.value ? e.createConfirm : e.updateConfirm), te = i(() => n.value ? e.createConfirmData : e.updateConfirmData), q = i(() => n.value ? e.createResource : e.updateResource), oe = i(() => n.value ? { ...e.createData, ...JSON.parse(JSON.stringify(d.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(d.value)) }), ce = i(() => n.value ? e.createDisabled : e.updateDisabled), U = i(() => !n.value && Array.isArray(f.value) && f.value.includes("update")), R = i(() => !n.value && Array.isArray(f.value) && f.value.includes("drop")), J = async () => {
      v("fetchItem"), r.value = !0, D.value = -1, w.value = !1;
      try {
        const a = await Se(e.readResource, e.readData);
        if (v("fetchItem -> response", a), r.value = !1, D.value = a.httpStatus, !a.success) {
          C.value = !1, D.value = a.httpStatus, u("error", a.httpStatus);
          return;
        }
        C.value = !0, d.value = a.data, f.value = a.perms, t.value.increment(d.value).turnStoredIntoOriginal(), V.value.turnStoredIntoOriginal(), u("read", a);
      } catch {
        r.value = !1, C.value = !1, D.value = 404, u("error", 404);
        return;
      }
    };
    k(() => e.modelValue, (a) => {
      d.value = a, t.value.increment(a);
    }, { deep: !0 }), k(d, (a) => {
      if (L.value = !0, v("item updated ->", d.value), typeof e.beforeEmitUpdate == "function") {
        v("item updated -> has beforeEmitUpdate");
        let l = e.beforeEmitUpdate(d.value);
        v("item updated -> override with: ", l), typeof l == "object" && (d.value = l);
      }
      u("update:modelValue", d.value), v("item updated -> update dataState"), t.value.increment(a), he(() => L.value = !1);
    }, { deep: !0 }), k(f, () => u("perms", f.value));
    const O = i(() => ce.value || !n.value && !U.value || typeof e.saveValidator == "function" && !e.saveValidator(d.value) ? !1 : t.value.changed()), H = i(() => !e.dropDisabled && R.value);
    k(O, (a) => u("modified-data", a)), k(n, (a) => u("update:isCreate", a)), k(() => e.readData, (a) => {
      V.value.increment(a), V.value.changed() && J();
    }), k(() => e.editing, (a) => {
      v("editing updated -> updating editMode", a), h.value = a;
    }), k(h, (a) => {
      v("editMode updated -> emit update", a), u("update:editing", a);
    }), e.readResource && !n.value ? J() : n.value && (C.value = !0, h.value = !0, r.value = !1);
    const le = (a, l) => {
      if (r.value = !1, D.value = l.httpStatus, !l.success) {
        w.value = !0, u("error", l.httpStatus);
        return;
      }
      w.value = !0, e.onDropModalCallbacks.length > 0 && (v("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach((N) => {
        Y(N);
      })), u("drop", l);
    }, de = (a, l) => {
      if (v("onSave -> received response:", l), u("before-save"), q.value) {
        if (r.value = !1, D.value = l.httpStatus, !l.success) {
          w.value = !0, u("error", l.httpStatus);
          return;
        }
        w.value = !0;
      }
      let N = n.value ? "create" : "update";
      n.value || (v("onSave -> turn stored data into original"), t.value.turnStoredIntoOriginal()), N === "create" ? typeof e.onCreate == "function" && (v("onSave -> trigger onCreate callback"), e.onCreate(l), e.onCreateModalCallbacks.length > 0 && (v("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((A) => {
        Y(A);
      }))) : typeof e.onUpdate == "function" && (v("onSave -> trigger onUpdate callback"), e.onUpdate(l), e.onUpdateModalCallbacks.length > 0 && (v("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((A) => {
        Y(A);
      }))), !e.insideModal && l.autoReloadId && (v("onSave -> autoReloadId detected: ", l.autoReloadId), e.readData.id = l.autoReloadId, v("onSave -> turning off create mode"), n.value = !1, J()), u(N, l);
    };
    g({
      doDrop: () => {
        P.value && ee.value.doDrop();
      },
      doRefresh: J,
      doSave: () => {
        P.value && x.value.doSave();
      },
      hasModifiedData: () => t.value.changed()
    });
    const fe = i(() => t.value.changed() ? e.editedCloseConfirm : ""), W = i(() => !U.value && R.value ? !0 : !e.hiddenDrop && !r.value && h.value && C.value), G = i(() => t.value.changed() ? !0 : r.value ? !1 : n.value ? !0 : e.buttonNavVisibility === j.Always ? O.value : !e.hiddenSave && h.value && C.value), Q = i(() => e.hideSwitchEdition || !U.value && !R.value || !U.value && R.value ? !1 : !r.value && !n.value && C.value && !(e.dropDisabled && e.updateDisabled)), re = i(() => e.buttonNavVisibility === j.Always && (O.value || H.value) || b["prev-buttons-ever"] ? !0 : !e.hiddenButtons && (G.value || W.value || Q.value)), X = i(() => e.title.startsWith("__:") ? String(Ue(e.title.substring(3))) : e.title), me = i(() => r.value ? !1 : X.value.length > 0 || !!b["post-title"]), ue = i(() => e.insideModal ? "lkt-modal" : "section"), be = i(() => ue.value === "lkt-modal" ? {
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
    return (a, l) => {
      const N = Z("lkt-http-info"), A = Z("lkt-loader");
      return s(), B(ke(ue.value), ye(Ce(be.value)), {
        default: $(() => [
          De("article", Ve, [
            !a.insideModal && me.value ? (s(), S("header", Le, [
              m(b)["pre-title"] ? (s(), S("div", Oe, [
                y(a.$slots, "pre-title", {
                  item: d.value,
                  loading: r.value
                })
              ])) : c("", !0),
              X.value.length > 0 ? (s(), S("h1", Ae, ge(X.value), 1)) : c("", !0),
              m(b)["post-title"] ? (s(), S("div", ze, [
                y(a.$slots, "post-title", {
                  item: d.value,
                  loading: r.value
                })
              ])) : c("", !0)
            ])) : c("", !0),
            re.value && a.buttonNavPosition === "top" ? (s(), B(ie, {
              key: 1,
              ref_key: "buttonNav",
              ref: P,
              loading: r.value,
              "onUpdate:loading": l[0] || (l[0] = (I) => r.value = I),
              editing: h.value,
              "onUpdate:editing": l[1] || (l[1] = (I) => h.value = I),
              item: d.value,
              "create-mode": n.value,
              "can-update": U.value,
              "can-drop": R.value,
              "show-switch-button": Q.value,
              "show-save-button": G.value,
              "show-drop-button": W.value,
              "able-to-save": O.value,
              "able-to-drop": H.value,
              "save-confirm": ae.value,
              "drop-confirm": a.dropConfirm,
              "confirm-data": te.value,
              "drop-confirm-data": a.dropConfirmData,
              "save-resource": q.value,
              "drop-resource": a.dropResource,
              "save-data": oe.value,
              "drop-data": a.dropData,
              "save-text": a.saveText,
              "drop-text": a.dropText,
              "save-icon": a.saveIcon,
              "drop-icon": a.dropIcon,
              "edit-mode-text": a.editModeText,
              onSave: de,
              onDrop: le
            }, ne({ _: 2 }, [
              m(b)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  y(a.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              m(b)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  y(a.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "create-mode", "can-update", "can-drop", "show-switch-button", "show-save-button", "show-drop-button", "able-to-save", "able-to-drop", "save-confirm", "drop-confirm", "confirm-data", "drop-confirm-data", "save-resource", "drop-resource", "save-data", "drop-data", "save-text", "drop-text", "save-icon", "drop-icon", "edit-mode-text"])) : c("", !0),
            r.value ? c("", !0) : (s(), S("div", Ke, [
              C.value ? (s(), S("div", Fe, [
                w.value ? (s(), B(N, {
                  key: 0,
                  code: D.value,
                  quick: "",
                  palette: D.value === 200 ? "success" : "danger",
                  "can-close": "",
                  onClose: l[2] || (l[2] = (I) => w.value = !1)
                }, null, 8, ["code", "palette"])) : c("", !0),
                y(a.$slots, "item", {
                  item: d.value,
                  loading: r.value,
                  editMode: h.value,
                  isCreate: n.value,
                  canUpdate: U.value,
                  canDrop: R.value,
                  itemBeingEdited: L.value
                })
              ])) : (s(), B(N, {
                key: 1,
                code: D.value
              }, null, 8, ["code"]))
            ])),
            r.value ? (s(), B(A, { key: 3 })) : c("", !0),
            a.buttonNavPosition === m(_).Bottom ? z((s(), B(ie, {
              key: 4,
              ref_key: "buttonNav",
              ref: P,
              loading: r.value,
              "onUpdate:loading": l[3] || (l[3] = (I) => r.value = I),
              editing: h.value,
              "onUpdate:editing": l[4] || (l[4] = (I) => h.value = I),
              item: d.value,
              "create-mode": n.value,
              "can-update": U.value,
              "can-drop": R.value,
              "show-switch-button": Q.value,
              "show-save-button": G.value,
              "show-drop-button": W.value,
              "able-to-save": O.value,
              "able-to-drop": H.value,
              "save-confirm": ae.value,
              "drop-confirm": a.dropConfirm,
              "confirm-data": te.value,
              "drop-confirm-data": a.dropConfirmData,
              "save-resource": q.value,
              "drop-resource": a.dropResource,
              "save-data": oe.value,
              "drop-data": a.dropData,
              "save-text": a.saveText,
              "drop-text": a.dropText,
              "save-icon": a.saveIcon,
              "drop-icon": a.dropIcon,
              "edit-mode-text": a.editModeText,
              onSave: de,
              onDrop: le
            }, ne({ _: 2 }, [
              m(b)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  y(a.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              m(b)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  y(a.$slots, "prev-buttons")
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
  T.defaultSaveIcon = o;
}, _e = (o) => {
  T.defaultDropIcon = o;
};
export {
  Xe as debugLktItemCrud,
  Ye as default,
  _e as setItemCrudDefaultDropIcon,
  Ze as setItemCrudDefaultSaveIcon
};
