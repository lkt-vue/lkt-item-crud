import { defineComponent as pe, useSlots as me, ref as v, computed as n, watch as S, nextTick as he, resolveComponent as x, openBlock as s, createBlock as T, resolveDynamicComponent as be, normalizeProps as Ce, guardReactiveProps as ke, withCtx as P, createElementVNode as Z, createElementBlock as b, unref as m, renderSlot as g, createCommentVNode as f, toDisplayString as ye, withDirectives as w, vShow as E, createVNode as ee } from "vue";
import { httpCall as De } from "lkt-http-client";
import { DataState as te } from "lkt-data-state";
import { execModal as Se, refreshModal as ge, closeModal as Me, openModal as Ie, reOpenModal as Be } from "lkt-modal";
import { __ as _e } from "lkt-i18n";
const L = class L {
};
L.debugEnabled = !1, L.defaultSaveIcon = "", L.defaultDropIcon = "";
let M = L;
const d = (...a) => {
  M.debugEnabled && console.info("[LktItemCrud] ", ...a);
}, He = (a = !0) => {
  M.debugEnabled = a;
}, j = (a) => {
  d("runModalCallback -> init", a);
  let C = a.modalKey ? a.modalKey : "_", R = a.args ? a.args : {};
  switch (a.action) {
    case "reOpen":
      return Be(a.modalName, C, R);
    case "open":
      return Ie(a.modalName, C, R);
    case "close":
      return Me(a.modalName, C);
    case "refresh":
      return ge(a.modalName, C, R);
    case "exec":
      let e = a.method;
      return e ? Se(a.modalName, C, e, R) : void 0;
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
  key: 0,
  class: "lkt-item-crud-buttons"
}, Le = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, $e = {
  key: 3,
  class: "lkt-item-crud-buttons"
}, Oe = {
  key: 1,
  class: "lkt-item-crud_content"
}, ze = {
  key: 0,
  class: "lkt-grid-1"
}, Ke = /* @__PURE__ */ pe({
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
  setup(a, { expose: C, emit: R }) {
    const e = a, i = me(), c = R;
    let ae = [];
    const o = v(!0), r = v(e.modelValue), V = v(ae), p = v(e.editing), k = v(!1), I = v(!1), h = v(200), $ = v(null), O = v(null), y = v(new te(r.value, e.dataStateConfig)), K = v(new te(e.readData)), u = v(e.isCreate), F = v(!1), le = n(() => u.value ? e.createConfirm : e.updateConfirm), oe = n(() => u.value ? e.createConfirmData : e.updateConfirmData), q = n(() => u.value ? e.createResource : e.updateResource), ue = n(() => u.value ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), de = n(() => u.value ? e.createDisabled : e.updateDisabled), B = n(() => !u.value && V.value.includes("update")), _ = n(() => !u.value && V.value.includes("drop")), z = async () => {
      d("fetchItem"), o.value = !0, h.value = -1, I.value = !1;
      try {
        const t = await De(e.readResource, e.readData);
        if (d("fetchItem -> response", t), o.value = !1, h.value = t.httpStatus, !t.success) {
          k.value = !1, h.value = t.httpStatus, c("error", t.httpStatus);
          return;
        }
        k.value = !0, r.value = t.data, V.value = t.perms, y.value.increment(r.value).turnStoredIntoOriginal(), K.value.turnStoredIntoOriginal(), c("read", t);
      } catch {
        o.value = !1, k.value = !1, h.value = 404, c("error", 404);
        return;
      }
    };
    S(() => e.modelValue, (t) => {
      r.value = t, y.value.increment(t);
    }, { deep: !0 }), S(r, (t) => {
      if (F.value = !0, d("item updated ->", r.value), typeof e.beforeEmitUpdate == "function") {
        d("item updated -> has beforeEmitUpdate");
        let l = e.beforeEmitUpdate(r.value);
        d("item updated -> override with: ", l), typeof l == "object" && (r.value = l);
      }
      c("update:modelValue", r.value), d("item updated -> update dataState"), y.value.increment(t), he(() => F.value = !1);
    }, { deep: !0 }), S(V, () => c("perms", V.value));
    const A = n(() => de.value || !u.value && !B.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : y.value.changed());
    S(A, (t) => c("modified-data", t)), S(u, (t) => c("update:isCreate", t)), S(() => e.readData, (t) => {
      K.value.increment(t), K.value.changed() && z();
    }), S(() => e.editing, (t) => {
      d("editing updated -> updating editMode", t), p.value = t;
    }), S(p, (t) => {
      d("editMode updated -> emit update", t), c("update:editing", t);
    }), e.readResource && !u.value ? z() : u.value && (k.value = !0, p.value = !0, o.value = !1);
    const re = (t, l) => {
      if (o.value = !1, h.value = l.httpStatus, !l.success) {
        I.value = !0, c("error", l.httpStatus);
        return;
      }
      I.value = !0, e.onDropModalCallbacks.length > 0 && (d("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach((D) => {
        j(D);
      })), c("drop", l);
    }, ne = (t, l) => {
      if (d("onSave -> received response:", l), c("before-save"), q.value) {
        if (o.value = !1, h.value = l.httpStatus, !l.success) {
          I.value = !0, c("error", l.httpStatus);
          return;
        }
        I.value = !0;
      }
      let D = u.value ? "create" : "update";
      u.value || (d("onSave -> turn stored data into original"), y.value.turnStoredIntoOriginal()), D === "create" ? typeof e.onCreate == "function" && (d("onSave -> trigger onCreate callback"), e.onCreate(l), e.onCreateModalCallbacks.length > 0 && (d("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((U) => {
        j(U);
      }))) : typeof e.onUpdate == "function" && (d("onSave -> trigger onUpdate callback"), e.onUpdate(l), e.onUpdateModalCallbacks.length > 0 && (d("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((U) => {
        j(U);
      }))), !e.insideModal && l.autoReloadId && (d("onSave -> autoReloadId detected: ", l.autoReloadId), e.readData.id = l.autoReloadId, d("onSave -> turning off create mode"), u.value = !1, z()), c(D, l);
    }, H = () => {
      o.value = !0, h.value = -1;
    }, W = () => {
      o.value = !1;
    };
    C({
      doDrop: () => {
        O.value && typeof O.value.click == "function" && O.value.click();
      },
      doRefresh: z,
      doSave: () => {
        $.value && typeof $.value.click == "function" && $.value.click();
      },
      hasModifiedData: () => y.value.changed()
    });
    const se = n(() => y.value.changed() ? e.editedCloseConfirm : ""), G = n(() => !B.value && _.value ? !0 : !e.hiddenDrop && !o.value && p.value && k.value), Q = n(() => y.value.changed() ? !0 : o.value ? !1 : u.value ? !0 : !e.hiddenSave && p.value && k.value), X = n(() => e.hideSwitchEdition || !B.value && !_.value || !B.value && _.value ? !1 : !o.value && !u.value && k.value && !(e.dropDisabled && e.updateDisabled)), ie = n(() => i["prev-buttons-ever"] ? !0 : !e.hiddenButtons && (Q.value || G.value || X.value)), J = n(() => e.title.startsWith("__:") ? String(_e(e.title.substring(3))) : e.title), ce = n(() => o.value ? !1 : J.value.length > 0 || !!i["post-title"]), Y = n(() => e.insideModal ? "lkt-modal" : "section"), ve = n(() => Y.value === "lkt-modal" ? {
      "modal-name": e.modalName,
      "modal-key": e.modalKey,
      "z-index": e.zIndex,
      "pre-title": e.preTitle,
      "show-close": e.showClose,
      "before-close": e.beforeClose,
      "disabled-close": e.disabledClose,
      "disabled-veil-click": e.disabledVeilClick,
      "close-confirm": se.value,
      "close-confirm-key": e.editedCloseConfirmKey,
      title: e.title,
      size: e.size
    } : {});
    return (t, l) => {
      const D = x("lkt-button"), U = x("lkt-http-info"), fe = x("lkt-loader");
      return s(), T(be(Y.value), Ce(ke(ve.value)), {
        default: P(() => [
          Z("article", we, [
            !t.insideModal && ce.value ? (s(), b("header", Ee, [
              m(i)["pre-title"] ? (s(), b("div", Re, [
                g(t.$slots, "pre-title", {
                  item: r.value,
                  loading: o.value
                })
              ])) : f("", !0),
              J.value.length > 0 ? (s(), b("h1", Ue, ye(J.value), 1)) : f("", !0),
              m(i)["post-title"] ? (s(), b("div", Ne, [
                g(t.$slots, "post-title", {
                  item: r.value,
                  loading: o.value
                })
              ])) : f("", !0)
            ])) : f("", !0),
            w(Z("div", Ve, [
              m(i)["prev-buttons-ever"] ? w((s(), b("div", Te, [
                g(t.$slots, "prev-buttons-ever")
              ], 512)), [
                [E, !o.value]
              ]) : f("", !0),
              m(i)["prev-buttons"] ? w((s(), b("div", Le, [
                g(t.$slots, "prev-buttons")
              ], 512)), [
                [E, p.value && !o.value]
              ]) : f("", !0),
              w(ee(D, {
                ref: (N) => $.value = N,
                palette: "success",
                disabled: !A.value,
                "confirm-modal": le.value,
                "confirm-data": oe.value,
                resource: q.value,
                "resource-data": ue.value,
                text: m(i)["button-save"] ? "" : t.saveText,
                icon: m(i)["button-save"] ? "" : t.saveIcon,
                onLoading: H,
                onLoaded: W,
                onClick: ne
              }, {
                default: P(() => [
                  m(i)["button-save"] ? g(t.$slots, "button-save", {
                    key: 0,
                    item: r.value,
                    editMode: p.value,
                    isCreate: u.value,
                    canUpdate: B.value,
                    canDrop: _.value
                  }) : f("", !0)
                ]),
                _: 3
              }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"]), [
                [E, Q.value]
              ]),
              u.value ? f("", !0) : w((s(), T(D, {
                key: 2,
                ref: (N) => O.value = N,
                palette: "danger",
                disabled: t.dropDisabled || !_.value,
                "confirm-modal": t.dropConfirm,
                "confirm-data": t.dropConfirmData,
                resource: t.dropResource,
                "resource-data": t.dropData,
                text: m(i)["button-drop"] ? "" : t.dropText,
                icon: m(i)["button-drop"] ? "" : t.dropIcon,
                onLoading: H,
                onLoaded: W,
                onClick: re
              }, {
                default: P(() => [
                  m(i)["button-drop"] ? g(t.$slots, "button-drop", {
                    key: 0,
                    item: r.value,
                    editMode: p.value,
                    isCreate: u.value,
                    canUpdate: B.value,
                    canDrop: _.value
                  }) : f("", !0)
                ]),
                _: 3
              }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])), [
                [E, G.value]
              ]),
              m(i).buttons ? w((s(), b("div", $e, [
                g(t.$slots, "buttons")
              ], 512)), [
                [E, p.value && !o.value]
              ]) : f("", !0),
              w(ee(D, {
                checked: p.value,
                "onUpdate:checked": l[0] || (l[0] = (N) => p.value = N),
                class: "lkt-item-crud--switch-mode-button",
                "show-switch": "",
                text: t.editModeText
              }, null, 8, ["checked", "text"]), [
                [E, X.value]
              ])
            ], 512), [
              [E, ie.value]
            ]),
            o.value ? f("", !0) : (s(), b("div", Oe, [
              k.value ? (s(), b("div", ze, [
                I.value ? (s(), T(U, {
                  key: 0,
                  code: h.value,
                  quick: "",
                  palette: h.value === 200 ? "success" : "danger",
                  "can-close": "",
                  onClose: l[1] || (l[1] = (N) => I.value = !1)
                }, null, 8, ["code", "palette"])) : f("", !0),
                g(t.$slots, "item", {
                  item: r.value,
                  loading: o.value,
                  editMode: p.value,
                  isCreate: u.value,
                  canUpdate: B.value,
                  canDrop: _.value,
                  itemBeingEdited: F.value
                })
              ])) : (s(), T(U, {
                key: 1,
                code: h.value
              }, null, 8, ["code"]))
            ])),
            o.value ? (s(), T(fe, { key: 2 })) : f("", !0)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), We = {
  install: (a, C = {}) => {
    a.component("lkt-item-crud") === void 0 && a.component("lkt-item-crud", Ke);
  }
}, Ge = (a) => {
  M.defaultSaveIcon = a;
}, Qe = (a) => {
  M.defaultDropIcon = a;
};
export {
  He as debugLktItemCrud,
  We as default,
  Qe as setItemCrudDefaultDropIcon,
  Ge as setItemCrudDefaultSaveIcon
};
