import { defineComponent as pe, useSlots as ce, ref as v, watch as C, resolveComponent as Z, openBlock as c, createElementBlock as S, unref as f, withDirectives as I, renderSlot as k, vShow as T, createCommentVNode as m, createVNode as _, withCtx as E, createBlock as O, computed as s, nextTick as Ce, resolveDynamicComponent as ke, normalizeProps as ye, guardReactiveProps as De, createElementVNode as ge, toDisplayString as Se, createSlots as se } from "vue";
import { httpCall as we } from "lkt-http-client";
import { DataState as ie } from "lkt-data-state";
import { execModal as Be, refreshModal as Me, closeModal as Ie, openModal as Te, reOpenModal as Ue } from "lkt-modal";
import { __ as Ne } from "lkt-i18n";
const F = class F {
};
F.debugEnabled = !1, F.defaultSaveIcon = "", F.defaultDropIcon = "";
let U = F;
const i = (...o) => {
  U.debugEnabled && console.info("[LktItemCrud] ", ...o);
}, Ye = (o = !0) => {
  U.debugEnabled = o;
}, Y = (o) => {
  i("runModalCallback -> init", o);
  let g = o.modalKey ? o.modalKey : "_", B = o.args ? o.args : {};
  switch (o.action) {
    case "reOpen":
      return Ue(o.modalName, g, B);
    case "open":
      return Te(o.modalName, g, B);
    case "close":
      return Ie(o.modalName, g);
    case "refresh":
      return Me(o.modalName, g, B);
    case "exec":
      let e = o.method;
      return e ? Be(o.modalName, g, e, B) : void 0;
  }
}, Re = { class: "lkt-item-crud-buttons" }, $e = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Ee = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Ve = {
  key: 3,
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
  setup(o, { expose: g, emit: B }) {
    const e = B, b = o, u = ce(), V = v(null), r = v(null), d = v(b.loading);
    C(() => b.loading, (t) => d.value = t), C(d, (t) => e("update:loading", t));
    const p = v(b.editing);
    C(() => b.editing, (t) => p.value = t), C(p, (t) => e("update:editing", t));
    const h = () => {
      d.value = !0;
    }, y = () => {
      d.value = !1;
    }, w = () => {
      e("save");
    }, D = () => {
      e("drop");
    };
    return g({
      doSave: () => {
        V.value && typeof V.value.click == "function" && V.value.click();
      },
      doDrop: () => {
        r.value && typeof r.value.click == "function" && r.value.click();
      }
    }), (t, L) => {
      const n = Z("lkt-button");
      return c(), S("div", Re, [
        f(u)["prev-buttons-ever"] ? I((c(), S("div", $e, [
          k(t.$slots, "prev-buttons-ever")
        ], 512)), [
          [T, !d.value]
        ]) : m("", !0),
        f(u)["prev-buttons"] ? I((c(), S("div", Ee, [
          k(t.$slots, "prev-buttons")
        ], 512)), [
          [T, p.value && !d.value]
        ]) : m("", !0),
        I(_(n, {
          ref_key: "saveButton",
          ref: V,
          palette: "success",
          disabled: !t.ableToSave,
          "confirm-modal": t.saveConfirm,
          "confirm-data": t.confirmData,
          resource: t.saveResource,
          "resource-data": t.saveData,
          text: f(u)["button-save"] ? "" : t.saveText,
          icon: f(u)["button-save"] ? "" : t.saveIcon,
          onLoading: h,
          onLoaded: y,
          onClick: w
        }, {
          default: E(() => [
            f(u)["button-save"] ? k(t.$slots, "button-save", {
              key: 0,
              item: t.item,
              editMode: p.value,
              isCreate: t.createMode,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : m("", !0)
          ]),
          _: 3
        }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"]), [
          [T, t.showSaveButton]
        ]),
        t.createMode ? m("", !0) : I((c(), O(n, {
          key: 2,
          ref_key: "dropButton",
          ref: r,
          palette: "danger",
          disabled: !t.ableToDrop,
          "confirm-modal": t.dropConfirm,
          "confirm-data": t.dropConfirmData,
          resource: t.dropResource,
          "resource-data": t.dropData,
          text: f(u)["button-drop"] ? "" : t.dropText,
          icon: f(u)["button-drop"] ? "" : t.dropIcon,
          onLoading: h,
          onLoaded: y,
          onClick: D
        }, {
          default: E(() => [
            f(u)["button-drop"] ? k(t.$slots, "button-drop", {
              key: 0,
              item: t.item,
              editMode: p.value,
              isCreate: t.createMode,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : m("", !0)
          ]),
          _: 3
        }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])), [
          [T, t.showDropButton]
        ]),
        f(u).buttons ? I((c(), S("div", Ve, [
          k(t.$slots, "buttons")
        ], 512)), [
          [T, p.value && !d.value]
        ]) : m("", !0),
        I(_(n, {
          checked: p.value,
          "onUpdate:checked": L[0] || (L[0] = (A) => p.value = A),
          class: "lkt-item-crud--switch-mode-button",
          "show-switch": "",
          text: t.editModeText
        }, null, 8, ["checked", "text"]), [
          [T, t.showSwitchButton]
        ])
      ]);
    };
  }
});
var x = /* @__PURE__ */ ((o) => (o.Top = "top", o.Bottom = "bottom", o))(x || {}), j = /* @__PURE__ */ ((o) => (o.Changed = "changed", o.Always = "always", o))(j || {});
const Le = { class: "lkt-item-crud" }, Oe = {
  key: 0,
  class: "lkt-item-crud_header"
}, Ae = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, ze = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, Ke = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Fe = {
  key: 1,
  class: "lkt-item-crud_content"
}, Pe = {
  key: 0,
  class: "lkt-grid-1"
}, Je = /* @__PURE__ */ pe({
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
    buttonNavPosition: { default: x.Top },
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
  setup(o, { expose: g, emit: B }) {
    const e = o, b = ce(), u = B;
    let V = [];
    const r = v(!0), d = v(e.modelValue), p = v(V), h = v(e.editing), y = v(!1), w = v(!1), D = v(200), ee = v(null), ae = v(null), t = v(new ie(d.value, e.dataStateConfig)), L = v(new ie(e.readData)), n = v(e.isCreate), A = v(!1), P = v(null), te = s(() => n.value ? e.createConfirm : e.updateConfirm), oe = s(() => n.value ? e.createConfirmData : e.updateConfirmData), q = s(() => n.value ? e.createResource : e.updateResource), le = s(() => n.value ? { ...e.createData, ...JSON.parse(JSON.stringify(d.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(d.value)) }), fe = s(() => n.value ? e.createDisabled : e.updateDisabled), N = s(() => !n.value && Array.isArray(p.value) && p.value.includes("update")), R = s(() => !n.value && Array.isArray(p.value) && p.value.includes("drop")), J = async () => {
      i("fetchItem"), r.value = !0, D.value = -1, w.value = !1;
      try {
        const a = await we(e.readResource, e.readData);
        if (i("fetchItem -> response", a), r.value = !1, D.value = a.httpStatus, !a.success) {
          y.value = !1, D.value = a.httpStatus, u("error", a.httpStatus);
          return;
        }
        y.value = !0, d.value = a.data, p.value = a.perms, t.value.increment(d.value).turnStoredIntoOriginal(), L.value.turnStoredIntoOriginal(), u("read", a);
      } catch {
        r.value = !1, y.value = !1, D.value = 404, u("error", 404);
        return;
      }
    };
    C(() => e.modelValue, (a) => {
      d.value = a, t.value.increment(a);
    }, { deep: !0 }), C(d, (a) => {
      if (A.value = !0, i("item updated ->", d.value), typeof e.beforeEmitUpdate == "function") {
        i("item updated -> has beforeEmitUpdate");
        let l = e.beforeEmitUpdate(d.value);
        i("item updated -> override with: ", l), typeof l == "object" && (d.value = l);
      }
      u("update:modelValue", d.value), i("item updated -> update dataState"), t.value.increment(a), Ce(() => A.value = !1);
    }, { deep: !0 }), C(p, () => u("perms", p.value));
    const z = s(() => fe.value || !n.value && !N.value || typeof e.saveValidator == "function" && !e.saveValidator(d.value) ? !1 : t.value.changed()), H = s(() => !e.dropDisabled && R.value);
    C(z, (a) => u("modified-data", a)), C(n, (a) => u("update:isCreate", a)), C(() => e.readData, (a) => {
      L.value.increment(a), L.value.changed() && J();
    }), C(() => e.editing, (a) => {
      i("editing updated -> updating editMode", a), h.value = a;
    }), C(h, (a) => {
      i("editMode updated -> emit update", a), u("update:editing", a);
    }), e.readResource && !n.value ? J() : n.value && (y.value = !0, h.value = !0, r.value = !1);
    const de = (a, l) => {
      if (r.value = !1, D.value = l.httpStatus, !l.success) {
        w.value = !0, u("error", l.httpStatus);
        return;
      }
      w.value = !0, e.onDropModalCallbacks.length > 0 && (i("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach(($) => {
        Y($);
      })), u("drop", l);
    }, re = (a, l) => {
      if (i("onSave -> received response:", l), u("before-save"), q.value) {
        if (r.value = !1, D.value = l.httpStatus, !l.success) {
          w.value = !0, u("error", l.httpStatus);
          return;
        }
        w.value = !0;
      }
      let $ = n.value ? "create" : "update";
      n.value || (i("onSave -> turn stored data into original"), t.value.turnStoredIntoOriginal()), $ === "create" ? typeof e.onCreate == "function" && (i("onSave -> trigger onCreate callback"), e.onCreate(l), e.onCreateModalCallbacks.length > 0 && (i("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((K) => {
        Y(K);
      }))) : typeof e.onUpdate == "function" && (i("onSave -> trigger onUpdate callback"), e.onUpdate(l), e.onUpdateModalCallbacks.length > 0 && (i("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((K) => {
        Y(K);
      }))), !e.insideModal && l.autoReloadId && (i("onSave -> autoReloadId detected: ", l.autoReloadId), e.readData.id = l.autoReloadId, i("onSave -> turning off create mode"), n.value = !1, J()), u($, l);
    };
    g({
      doDrop: () => {
        P.value && ae.value.doDrop();
      },
      doRefresh: J,
      doSave: () => {
        P.value && ee.value.doSave();
      },
      hasModifiedData: () => t.value.changed()
    });
    const me = s(() => t.value.changed() ? e.editedCloseConfirm : ""), W = s(() => !N.value && R.value ? !0 : !e.hiddenDrop && !r.value && h.value && y.value), G = s(() => t.value.changed() ? !0 : r.value ? !1 : n.value ? !0 : e.buttonNavVisibility === j.Always ? z.value : !e.hiddenSave && h.value && y.value), Q = s(() => e.hideSwitchEdition || !N.value && !R.value || !N.value && R.value ? !1 : !r.value && !n.value && y.value && !(e.dropDisabled && e.updateDisabled)), ue = s(() => e.buttonNavVisibility === j.Always && (z.value || H.value) || b["prev-buttons-ever"] ? !0 : !e.hiddenButtons && (G.value || W.value || Q.value)), X = s(() => e.title.startsWith("__:") ? String(Ne(e.title.substring(3))) : e.title), be = s(() => r.value ? !1 : X.value.length > 0 || !!b["post-title"]), ne = s(() => e.insideModal ? "lkt-modal" : "section"), he = s(() => ne.value === "lkt-modal" ? {
      "modal-name": e.modalName,
      "modal-key": e.modalKey,
      "z-index": e.zIndex,
      "pre-title": e.preTitle,
      "show-close": e.showClose,
      "before-close": e.beforeClose,
      "disabled-close": e.disabledClose,
      "disabled-veil-click": e.disabledVeilClick,
      "close-confirm": me.value,
      "close-confirm-key": e.editedCloseConfirmKey,
      title: e.title,
      size: e.size
    } : {});
    return (a, l) => {
      const $ = Z("lkt-http-info"), K = Z("lkt-loader");
      return c(), O(ke(ne.value), ye(De(he.value)), {
        default: E(() => [
          ge("article", Le, [
            !a.insideModal && be.value ? (c(), S("header", Oe, [
              f(b)["pre-title"] ? (c(), S("div", Ae, [
                k(a.$slots, "pre-title", {
                  item: d.value,
                  loading: r.value
                })
              ])) : m("", !0),
              X.value.length > 0 ? (c(), S("h1", ze, Se(X.value), 1)) : m("", !0),
              f(b)["post-title"] ? (c(), S("div", Ke, [
                k(a.$slots, "post-title", {
                  item: d.value,
                  loading: r.value
                })
              ])) : m("", !0)
            ])) : m("", !0),
            I(_(ve, {
              ref_key: "buttonNav",
              ref: P,
              loading: r.value,
              "onUpdate:loading": l[0] || (l[0] = (M) => r.value = M),
              editing: h.value,
              "onUpdate:editing": l[1] || (l[1] = (M) => h.value = M),
              item: d.value,
              "create-mode": n.value,
              "can-update": N.value,
              "can-drop": R.value,
              "show-switch-button": Q.value,
              "show-save-button": G.value,
              "show-drop-button": W.value,
              "able-to-save": z.value,
              "able-to-drop": H.value,
              "save-confirm": te.value,
              "drop-confirm": a.dropConfirm,
              "confirm-data": oe.value,
              "drop-confirm-data": a.dropConfirmData,
              "save-resource": q.value,
              "drop-resource": a.dropResource,
              "save-data": le.value,
              "drop-data": a.dropData,
              "save-text": a.saveText,
              "drop-text": a.dropText,
              "save-icon": a.saveIcon,
              "drop-icon": a.dropIcon,
              "edit-mode-text": a.editModeText,
              onSave: re,
              onDrop: de
            }, se({ _: 2 }, [
              f(b)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: E(() => [
                  k(a.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              f(b)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: E(() => [
                  k(a.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "create-mode", "can-update", "can-drop", "show-switch-button", "show-save-button", "show-drop-button", "able-to-save", "able-to-drop", "save-confirm", "drop-confirm", "confirm-data", "drop-confirm-data", "save-resource", "drop-resource", "save-data", "drop-data", "save-text", "drop-text", "save-icon", "drop-icon", "edit-mode-text"]), [
              [T, ue.value && a.buttonNavPosition === "top"]
            ]),
            r.value ? m("", !0) : (c(), S("div", Fe, [
              y.value ? (c(), S("div", Pe, [
                w.value ? (c(), O($, {
                  key: 0,
                  code: D.value,
                  quick: "",
                  palette: D.value === 200 ? "success" : "danger",
                  "can-close": "",
                  onClose: l[2] || (l[2] = (M) => w.value = !1)
                }, null, 8, ["code", "palette"])) : m("", !0),
                k(a.$slots, "item", {
                  item: d.value,
                  loading: r.value,
                  editMode: h.value,
                  isCreate: n.value,
                  canUpdate: N.value,
                  canDrop: R.value,
                  itemBeingEdited: A.value
                })
              ])) : (c(), O($, {
                key: 1,
                code: D.value
              }, null, 8, ["code"]))
            ])),
            r.value ? (c(), O(K, { key: 2 })) : m("", !0),
            a.buttonNavPosition === f(x).Bottom ? I((c(), O(ve, {
              key: 3,
              ref_key: "buttonNav",
              ref: P,
              loading: r.value,
              "onUpdate:loading": l[3] || (l[3] = (M) => r.value = M),
              editing: h.value,
              "onUpdate:editing": l[4] || (l[4] = (M) => h.value = M),
              item: d.value,
              "create-mode": n.value,
              "can-update": N.value,
              "can-drop": R.value,
              "show-switch-button": Q.value,
              "show-save-button": G.value,
              "show-drop-button": W.value,
              "able-to-save": z.value,
              "able-to-drop": H.value,
              "save-confirm": te.value,
              "drop-confirm": a.dropConfirm,
              "confirm-data": oe.value,
              "drop-confirm-data": a.dropConfirmData,
              "save-resource": q.value,
              "drop-resource": a.dropResource,
              "save-data": le.value,
              "drop-data": a.dropData,
              "save-text": a.saveText,
              "drop-text": a.dropText,
              "save-icon": a.saveIcon,
              "drop-icon": a.dropIcon,
              "edit-mode-text": a.editModeText,
              onSave: re,
              onDrop: de
            }, se({ _: 2 }, [
              f(b)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: E(() => [
                  k(a.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              f(b)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: E(() => [
                  k(a.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "create-mode", "can-update", "can-drop", "show-switch-button", "show-save-button", "show-drop-button", "able-to-save", "able-to-drop", "save-confirm", "drop-confirm", "confirm-data", "drop-confirm-data", "save-resource", "drop-resource", "save-data", "drop-data", "save-text", "drop-text", "save-icon", "drop-icon", "edit-mode-text"])), [
              [T, ue.value]
            ]) : m("", !0)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), Ze = {
  install: (o, g = {}) => {
    o.component("lkt-item-crud") === void 0 && o.component("lkt-item-crud", Je);
  }
}, _e = (o) => {
  U.defaultSaveIcon = o;
}, xe = (o) => {
  U.defaultDropIcon = o;
};
export {
  Ye as debugLktItemCrud,
  Ze as default,
  xe as setItemCrudDefaultDropIcon,
  _e as setItemCrudDefaultSaveIcon
};
