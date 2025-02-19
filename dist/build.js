import { defineComponent as pe, useSlots as fe, ref as n, watch as C, resolveComponent as Z, createElementBlock as S, openBlock as i, withDirectives as O, createCommentVNode as p, createBlock as w, unref as c, renderSlot as k, vShow as z, withCtx as N, computed as s, nextTick as ke, onMounted as ye, resolveDynamicComponent as De, normalizeProps as ge, guardReactiveProps as Se, createElementVNode as Be, toDisplayString as we, createSlots as ne } from "vue";
import { httpCall as Ie } from "lkt-http-client";
import { DataState as ie } from "lkt-data-state";
import { ItemCrudButtonNavVisibility as X, ItemCrudButtonNavPosition as se } from "lkt-vue-kernel";
import { runModalCallback as Y } from "lkt-modal";
import { __ as Me } from "lkt-i18n";
const A = class A {
};
A.debugEnabled = !1, A.defaultSaveIcon = "", A.defaultDropIcon = "";
let M = A;
const v = (...m) => {
  M.debugEnabled && console.info("[LktItemCrud] ", ...m);
}, Qe = (m = !0) => {
  M.debugEnabled = m;
}, Te = { class: "lkt-item-crud-buttons" }, Ue = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Re = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Ne = {
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
  emits: [
    "update:loading",
    "update:editing",
    "save",
    "drop"
  ],
  setup(m, { expose: P, emit: K }) {
    const e = K, b = m, r = fe(), $ = n(null), d = n(null), l = n(b.loading);
    C(() => b.loading, (a) => l.value = a), C(l, (a) => e("update:loading", a));
    const f = n(b.editing);
    C(() => b.editing, (a) => f.value = a), C(f, (a) => e("update:editing", a));
    const h = () => {
      l.value = !0;
    }, y = () => {
      l.value = !1;
    }, B = (a, g) => {
      e("save", a, g);
    }, D = (a, g) => {
      e("drop", a, g);
    };
    return P({
      doSave: () => {
        $.value && typeof $.value.click == "function" && $.value.click();
      },
      doDrop: () => {
        d.value && typeof d.value.click == "function" && d.value.click();
      }
    }), (a, g) => {
      const u = Z("lkt-button");
      return i(), S("div", Te, [
        c(r)["prev-buttons-ever"] ? O((i(), S("div", Ue, [
          k(a.$slots, "prev-buttons-ever")
        ], 512)), [
          [z, !l.value]
        ]) : p("", !0),
        c(r)["prev-buttons"] ? O((i(), S("div", Re, [
          k(a.$slots, "prev-buttons")
        ], 512)), [
          [z, f.value && !l.value]
        ]) : p("", !0),
        a.showSaveButton ? (i(), w(u, {
          key: 2,
          ref_key: "saveButton",
          ref: $,
          palette: "success",
          disabled: !a.ableToSave,
          "confirm-modal": a.saveConfirm,
          "confirm-data": a.confirmData,
          resource: a.saveResource,
          "resource-data": a.saveData,
          text: c(r)["button-save"] ? "" : a.saveText,
          icon: c(r)["button-save"] ? "" : a.saveIcon,
          onLoading: h,
          onLoaded: y,
          onClick: B
        }, {
          default: N(() => [
            c(r)["button-save"] ? k(a.$slots, "button-save", {
              key: 0,
              item: a.item,
              editMode: f.value,
              isCreate: a.createMode,
              canUpdate: a.canUpdate,
              canDrop: a.canDrop
            }) : p("", !0)
          ]),
          _: 3
        }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])) : p("", !0),
        a.createMode ? p("", !0) : O((i(), w(u, {
          key: 3,
          ref_key: "dropButton",
          ref: d,
          palette: "danger",
          disabled: !a.ableToDrop,
          "confirm-modal": a.dropConfirm,
          "confirm-data": a.dropConfirmData,
          resource: a.dropResource,
          "resource-data": a.dropData,
          text: c(r)["button-drop"] ? "" : a.dropText,
          icon: c(r)["button-drop"] ? "" : a.dropIcon,
          onLoading: h,
          onLoaded: y,
          onClick: D
        }, {
          default: N(() => [
            c(r)["button-drop"] ? k(a.$slots, "button-drop", {
              key: 0,
              item: a.item,
              editMode: f.value,
              isCreate: a.createMode,
              canUpdate: a.canUpdate,
              canDrop: a.canDrop
            }) : p("", !0)
          ]),
          _: 3
        }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])), [
          [z, a.showDropButton]
        ]),
        c(r).buttons ? O((i(), S("div", Ne, [
          k(a.$slots, "buttons")
        ], 512)), [
          [z, f.value && !l.value]
        ]) : p("", !0),
        a.showSwitchButton ? (i(), w(u, {
          key: 5,
          checked: f.value,
          "onUpdate:checked": g[0] || (g[0] = (E) => f.value = E),
          class: "lkt-item-crud--switch-mode-button",
          "show-switch": "",
          text: a.editModeText
        }, null, 8, ["checked", "text"])) : p("", !0)
      ]);
    };
  }
}), $e = { class: "lkt-item-crud" }, Ee = {
  key: 0,
  class: "lkt-item-crud_header"
}, Ve = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, Le = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, Oe = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, ze = {
  key: 2,
  class: "lkt-item-crud_content"
}, Ae = {
  key: 0,
  class: "lkt-grid-1"
}, Pe = /* @__PURE__ */ pe({
  __name: "LktItemCrud",
  props: {
    modelValue: { default: () => ({}) },
    title: { default: "" },
    editModeText: { default: "Edition Mode" },
    saveText: { default: "Save" },
    saveIcon: { default: () => M.defaultSaveIcon },
    dropText: { default: "Delete" },
    dropIcon: { default: () => M.defaultDropIcon },
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
    buttonNavPosition: { default: se.Top },
    buttonNavVisibility: { default: X.Changed },
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
  setup(m, { expose: P, emit: K }) {
    const e = m, b = fe(), r = K;
    let $ = [];
    const d = n(!0), l = n(e.modelValue), f = n($), h = n(e.editing), y = n(!1), B = n(!1), D = n(200), _ = n(null), x = n(null), a = n(new ie(l.value, e.dataStateConfig)), g = n(new ie(e.readData)), u = n(e.isCreate), E = n(!1), ee = n(!1), F = n(null), te = s(() => u.value ? e.createConfirm : e.updateConfirm), ae = s(() => u.value ? e.createConfirmData : e.updateConfirmData), j = s(() => u.value ? e.createResource : e.updateResource), oe = s(() => u.value ? { ...e.createData, ...JSON.parse(JSON.stringify(l.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(l.value)) }), ce = s(() => u.value ? e.createDisabled : e.updateDisabled), T = s(() => !u.value && Array.isArray(f.value) && f.value.includes("update")), U = s(() => !u.value && Array.isArray(f.value) && f.value.includes("drop")), J = async () => {
      v("fetchItem"), d.value = !0, D.value = -1, B.value = !1;
      try {
        const t = await Ie(e.readResource, e.readData);
        if (v("fetchItem -> response", t), d.value = !1, D.value = t.httpStatus, !t.success) {
          y.value = !1, D.value = t.httpStatus, r("error", t.httpStatus);
          return;
        }
        y.value = !0, l.value = t.data, f.value = t.perms, a.value.increment(l.value).turnStoredIntoOriginal(), g.value.turnStoredIntoOriginal(), r("read", t);
      } catch {
        d.value = !1, y.value = !1, D.value = 404, r("error", 404);
        return;
      }
    };
    C(() => e.modelValue, (t) => {
      l.value = t, a.value.increment(t);
    }, { deep: !0 }), C(l, (t) => {
      if (E.value = !0, v("item updated ->", l.value), typeof e.beforeEmitUpdate == "function") {
        v("item updated -> has beforeEmitUpdate");
        let o = e.beforeEmitUpdate(l.value);
        v("item updated -> override with: ", o), typeof o == "object" && (l.value = o);
      }
      r("update:modelValue", l.value), v("item updated -> update dataState"), a.value.increment(t), ke(() => E.value = !1);
    }, { deep: !0 }), C(f, () => r("perms", f.value));
    const V = s(() => ce.value || !u.value && !T.value || typeof e.saveValidator == "function" && !e.saveValidator(l.value) ? !1 : a.value.changed()), q = s(() => !e.dropDisabled && U.value);
    C(V, (t) => r("modified-data", t)), C(u, (t) => r("update:isCreate", t)), C(() => e.readData, (t) => {
      g.value.increment(t), g.value.changed() && J();
    }), C(() => e.editing, (t) => {
      v("editing updated -> updating editMode", t), h.value = t;
    }), C(h, (t) => {
      v("editMode updated -> emit update", t), r("update:editing", t);
    }), ye(() => {
      e.readResource && !u.value ? J() : u.value && (y.value = !0, h.value = !0, d.value = !1, a.value.increment(l.value).turnStoredIntoOriginal());
    });
    const le = (t, o) => {
      if (d.value = !1, D.value = o.httpStatus, !o.success) {
        B.value = !0, r("error", o.httpStatus);
        return;
      }
      B.value = !0, e.onDropModalCallbacks.length > 0 && (v("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach((R) => {
        Y(R);
      })), r("drop", o);
    }, de = (t, o) => {
      if (v("onSave -> received response:", o), r("before-save"), j.value) {
        if (d.value = !1, typeof o < "u" && (D.value = o.httpStatus, !o.success)) {
          B.value = !0, r("error", o.httpStatus);
          return;
        }
        B.value = !0;
      }
      let R = u.value ? "create" : "update";
      u.value || (v("onSave -> turn stored data into original"), a.value.turnStoredIntoOriginal()), R === "create" ? (ee.value = !0, a.value.increment(l.value).turnStoredIntoOriginal(), typeof e.onCreate == "function" && (v("onSave -> trigger onCreate callback"), e.onCreate(o), e.onCreateModalCallbacks.length > 0 && (v("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((L) => {
        Y(L);
      })))) : typeof e.onUpdate == "function" && (v("onSave -> trigger onUpdate callback"), e.onUpdate(o), e.onUpdateModalCallbacks.length > 0 && (v("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((L) => {
        Y(L);
      }))), !e.insideModal && o.autoReloadId && (v("onSave -> autoReloadId detected: ", o.autoReloadId), e.readData.id = o.autoReloadId, v("onSave -> turning off create mode"), u.value = !1, J()), r(R, o);
    };
    P({
      doDrop: () => {
        F.value && x.value.doDrop();
      },
      doRefresh: J,
      doSave: () => {
        F.value && _.value.doSave();
      },
      hasModifiedData: () => a.value.changed()
    });
    const me = s(() => a.value.changed() ? e.editedCloseConfirm : ""), be = (t) => {
      if (typeof e.beforeClose == "function")
        return e.beforeClose({
          ...t,
          itemCreated: ee.value
        });
    }, H = s(() => !T.value && U.value ? !0 : !e.hiddenDrop && !d.value && h.value && y.value), W = s(() => a.value.changed() ? !0 : d.value ? !1 : u.value ? !0 : e.buttonNavVisibility === X.Always ? V.value : !e.hiddenSave && h.value && y.value), G = s(() => e.hideSwitchEdition || !T.value && !U.value || !T.value && U.value ? !1 : !d.value && !u.value && y.value && !(e.dropDisabled && e.updateDisabled)), re = s(() => e.buttonNavVisibility === X.Always && (V.value || q.value) || b["prev-buttons-ever"] ? !0 : !e.hiddenButtons && (W.value || H.value || G.value)), Q = s(() => e.title.startsWith("__:") ? String(Me(e.title.substring(3))) : e.title), he = s(() => d.value ? !1 : Q.value.length > 0 || !!b["post-title"]), ue = s(() => e.insideModal ? "lkt-modal" : "section"), Ce = s(() => ue.value === "lkt-modal" ? {
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
      item: l.value
    } : {});
    return (t, o) => {
      const R = Z("lkt-http-info"), L = Z("lkt-loader");
      return i(), w(De(ue.value), ge(Se(Ce.value)), {
        default: N(() => [
          Be("article", $e, [
            !t.insideModal && he.value ? (i(), S("header", Ee, [
              c(b)["pre-title"] ? (i(), S("div", Ve, [
                k(t.$slots, "pre-title", {
                  item: l.value,
                  loading: d.value
                })
              ])) : p("", !0),
              Q.value.length > 0 ? (i(), S("h1", Le, we(Q.value), 1)) : p("", !0),
              c(b)["post-title"] ? (i(), S("div", Oe, [
                k(t.$slots, "post-title", {
                  item: l.value,
                  loading: d.value
                })
              ])) : p("", !0)
            ])) : p("", !0),
            re.value && t.buttonNavPosition === "top" ? (i(), w(ve, {
              key: 1,
              ref_key: "buttonNav",
              ref: F,
              loading: d.value,
              "onUpdate:loading": o[0] || (o[0] = (I) => d.value = I),
              editing: h.value,
              "onUpdate:editing": o[1] || (o[1] = (I) => h.value = I),
              item: l.value,
              "create-mode": u.value,
              "can-update": T.value,
              "can-drop": U.value,
              "show-switch-button": G.value,
              "show-save-button": W.value,
              "show-drop-button": H.value,
              "able-to-save": V.value,
              "able-to-drop": q.value,
              "save-confirm": te.value,
              "drop-confirm": t.dropConfirm,
              "confirm-data": ae.value,
              "drop-confirm-data": t.dropConfirmData,
              "save-resource": j.value,
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
              c(b)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: N(() => [
                  k(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              c(b)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: N(() => [
                  k(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "create-mode", "can-update", "can-drop", "show-switch-button", "show-save-button", "show-drop-button", "able-to-save", "able-to-drop", "save-confirm", "drop-confirm", "confirm-data", "drop-confirm-data", "save-resource", "drop-resource", "save-data", "drop-data", "save-text", "drop-text", "save-icon", "drop-icon", "edit-mode-text"])) : p("", !0),
            d.value ? p("", !0) : (i(), S("div", ze, [
              y.value ? (i(), S("div", Ae, [
                B.value ? (i(), w(R, {
                  key: 0,
                  code: D.value,
                  quick: "",
                  palette: D.value === 200 ? "success" : "danger",
                  "can-close": "",
                  onClose: o[2] || (o[2] = (I) => B.value = !1)
                }, null, 8, ["code", "palette"])) : p("", !0),
                k(t.$slots, "item", {
                  item: l.value,
                  loading: d.value,
                  editMode: h.value,
                  isCreate: u.value,
                  canUpdate: T.value,
                  canDrop: U.value,
                  itemBeingEdited: E.value
                })
              ])) : (i(), w(R, {
                key: 1,
                code: D.value
              }, null, 8, ["code"]))
            ])),
            d.value ? (i(), w(L, { key: 3 })) : p("", !0),
            t.buttonNavPosition === c(se).Bottom ? O((i(), w(ve, {
              key: 4,
              ref_key: "buttonNav",
              ref: F,
              loading: d.value,
              "onUpdate:loading": o[3] || (o[3] = (I) => d.value = I),
              editing: h.value,
              "onUpdate:editing": o[4] || (o[4] = (I) => h.value = I),
              item: l.value,
              "create-mode": u.value,
              "can-update": T.value,
              "can-drop": U.value,
              "show-switch-button": G.value,
              "show-save-button": W.value,
              "show-drop-button": H.value,
              "able-to-save": V.value,
              "able-to-drop": q.value,
              "save-confirm": te.value,
              "drop-confirm": t.dropConfirm,
              "confirm-data": ae.value,
              "drop-confirm-data": t.dropConfirmData,
              "save-resource": j.value,
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
              c(b)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: N(() => [
                  k(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              c(b)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: N(() => [
                  k(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "create-mode", "can-update", "can-drop", "show-switch-button", "show-save-button", "show-drop-button", "able-to-save", "able-to-drop", "save-confirm", "drop-confirm", "confirm-data", "drop-confirm-data", "save-resource", "drop-resource", "save-data", "drop-data", "save-text", "drop-text", "save-icon", "drop-icon", "edit-mode-text"])), [
              [z, re.value]
            ]) : p("", !0)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), Xe = {
  install: (m, P = {}) => {
    m.component("lkt-item-crud") === void 0 && m.component("lkt-item-crud", Pe);
  }
}, Ye = (m) => {
  M.defaultSaveIcon = m;
}, Ze = (m) => {
  M.defaultDropIcon = m;
};
export {
  Qe as debugLktItemCrud,
  Xe as default,
  Ze as setItemCrudDefaultDropIcon,
  Ye as setItemCrudDefaultSaveIcon
};
