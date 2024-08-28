import { defineComponent as ce, useSlots as ve, ref as s, computed as n, watch as b, nextTick as fe, resolveComponent as T, openBlock as c, createElementBlock as _, unref as C, renderSlot as R, createCommentVNode as p, toDisplayString as pe, withDirectives as $, createElementVNode as me, createBlock as F, withCtx as Y, vShow as J, createVNode as Z } from "vue";
import { httpCall as he } from "lkt-http-client";
import { DataState as ee } from "lkt-data-state";
import { execModal as ke, refreshModal as be, closeModal as Ce, openModal as De, reOpenModal as Se } from "lkt-modal";
import { __ as ye } from "lkt-i18n";
const V = class V {
};
V.debugEnabled = !1, V.defaultSaveIcon = "", V.defaultDropIcon = "";
let D = V;
const u = (...t) => {
  D.debugEnabled && console.info("[LktItemCrud] ", ...t);
}, Je = (t = !0) => {
  D.debugEnabled = t;
}, q = (t) => {
  u("runModalCallback -> init", t);
  let h = t.modalKey ? t.modalKey : "_", B = t.args ? t.args : {};
  switch (t.action) {
    case "reOpen":
      return Se(t.modalName, h, B);
    case "open":
      return De(t.modalName, h, B);
    case "close":
      return Ce(t.modalName, h);
    case "refresh":
      return be(t.modalName, h, B);
    case "exec":
      let e = t.method;
      return e ? ke(t.modalName, h, e, B) : void 0;
  }
}, ge = { class: "lkt-item-crud" }, Me = {
  key: 0,
  class: "lkt-item-crud_header"
}, Ie = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, _e = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, Be = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, we = { class: "lkt-item-crud-buttons" }, Ee = {
  key: 1,
  class: "lkt-item-crud_content"
}, Ue = {
  key: 0,
  class: "lkt-grid-1"
}, Re = /* @__PURE__ */ ce({
  __name: "LktItemCrud",
  props: {
    modelValue: { default: () => ({}) },
    title: { default: "" },
    editModeText: { default: "Edition Mode" },
    saveText: { default: "Save" },
    saveIcon: { default: () => D.defaultSaveIcon },
    dropText: { default: "Delete" },
    dropIcon: { default: () => D.defaultDropIcon },
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
    editing: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:isCreate", "update:editing", "read", "create", "update", "drop", "before-save", "perms", "error", "modified-data"],
  setup(t, { expose: h, emit: B }) {
    const e = t, m = ve(), i = B;
    let ae = [];
    const d = s(!0), r = s(e.modelValue), E = s(ae), v = s(e.editing), k = s(!1), S = s(!1), f = s(200), N = s(null), L = s(null), y = s(new ee(r.value, e.dataStateConfig)), K = s(new ee(e.readData)), o = s(e.isCreate), x = s(!1), te = n(() => o.value ? e.createConfirm : e.updateConfirm), le = n(() => o.value ? e.createConfirmData : e.updateConfirmData), H = n(() => o.value ? e.createResource : e.updateResource), oe = n(() => o.value ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), ue = n(() => o.value ? e.createDisabled : e.updateDisabled), g = n(() => !o.value && E.value.includes("update")), M = n(() => !o.value && E.value.includes("drop")), O = async () => {
      u("fetchItem"), d.value = !0, f.value = -1, S.value = !1;
      try {
        const a = await he(e.readResource, e.readData);
        if (u("fetchItem -> response", a), d.value = !1, f.value = a.httpStatus, !a.success) {
          k.value = !1, f.value = a.httpStatus, i("error", a.httpStatus);
          return;
        }
        k.value = !0, r.value = a.data, E.value = a.perms, y.value.increment(r.value).turnStoredIntoOriginal(), K.value.turnStoredIntoOriginal(), i("read", a);
      } catch {
        d.value = !1, k.value = !1, f.value = 404, i("error", 404);
        return;
      }
    };
    b(() => e.modelValue, (a) => {
      r.value = a, y.value.increment(a);
    }, { deep: !0 }), b(r, (a) => {
      if (x.value = !0, u("item updated ->", r.value), typeof e.beforeEmitUpdate == "function") {
        u("item updated -> has beforeEmitUpdate");
        let l = e.beforeEmitUpdate(r.value);
        u("item updated -> override with: ", l), typeof l == "object" && (r.value = l);
      }
      i("update:modelValue", r.value), u("item updated -> update dataState"), y.value.increment(a), fe(() => x.value = !1);
    }, { deep: !0 }), b(E, () => i("perms", E.value));
    const P = n(() => ue.value || !o.value && !g.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : y.value.changed());
    b(P, (a) => i("modified-data", a)), b(o, (a) => i("update:isCreate", a)), b(() => e.readData, (a) => {
      K.value.increment(a), K.value.changed() && O();
    }), b(() => e.editing, (a) => {
      u("editing updated -> updating editMode", a), v.value = a;
    }), b(v, (a) => {
      u("editMode updated -> emit update", a), i("update:editing", a);
    }), e.readResource && !o.value ? O() : o.value && (k.value = !0, v.value = !0, d.value = !1);
    const de = (a, l) => {
      if (d.value = !1, f.value = l.httpStatus, !l.success) {
        S.value = !0, i("error", l.httpStatus);
        return;
      }
      S.value = !0, e.onDropModalCallbacks.length > 0 && (u("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach((I) => {
        q(I);
      })), i("drop", l);
    }, re = (a, l) => {
      if (u("onSave -> received response:", l), i("before-save"), H.value) {
        if (d.value = !1, f.value = l.httpStatus, !l.success) {
          S.value = !0, i("error", l.httpStatus);
          return;
        }
        S.value = !0;
      }
      let I = o.value ? "create" : "update";
      o.value || (u("onSave -> turn stored data into original"), y.value.turnStoredIntoOriginal()), I === "create" ? typeof e.onCreate == "function" && (u("onSave -> trigger onCreate callback"), e.onCreate(l), e.onCreateModalCallbacks.length > 0 && (u("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((U) => {
        q(U);
      }))) : typeof e.onUpdate == "function" && (u("onSave -> trigger onUpdate callback"), e.onUpdate(l), e.onUpdateModalCallbacks.length > 0 && (u("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((U) => {
        q(U);
      }))), !e.insideModal && l.autoReloadId && (u("onSave -> autoReloadId detected: ", l.autoReloadId), e.readData.id = l.autoReloadId, u("onSave -> turning off create mode"), o.value = !1, O()), i(I, l);
    }, W = () => {
      d.value = !0, f.value = -1;
    }, z = () => {
      d.value = !1;
    };
    h({
      doDrop: () => {
        L.value && typeof L.value.click == "function" && L.value.click();
      },
      doRefresh: O,
      doSave: () => {
        N.value && typeof N.value.click == "function" && N.value.click();
      },
      hasModifiedData: () => y.value.changed()
    });
    const A = n(() => !g.value && M.value ? !0 : !e.hiddenDrop && !d.value && v.value && k.value), G = n(() => y.value.changed() ? !0 : d.value ? !1 : o.value ? !0 : !e.hiddenSave && v.value && k.value), Q = n(() => e.hideSwitchEdition || !g.value && !M.value || !g.value && M.value ? !1 : !d.value && !o.value && k.value && !(e.dropDisabled && e.updateDisabled)), ne = n(() => !e.hiddenButtons && (G.value || A.value || Q.value)), j = n(() => e.title.startsWith("__:") ? String(ye(e.title.substring(3))) : e.title), ie = n(() => d.value ? !1 : j.value.length > 0 || !!m["post-title"]);
    return (a, l) => {
      const I = T("lkt-button"), U = T("lkt-field-switch"), X = T("lkt-http-info"), se = T("lkt-loader");
      return c(), _("article", ge, [
        ie.value ? (c(), _("header", Me, [
          C(m)["pre-title"] ? (c(), _("div", Ie, [
            R(a.$slots, "pre-title", {
              item: r.value,
              loading: d.value
            })
          ])) : p("", !0),
          j.value.length > 0 ? (c(), _("h1", _e, pe(j.value), 1)) : p("", !0),
          C(m)["post-title"] ? (c(), _("div", Be, [
            R(a.$slots, "post-title", {
              item: r.value,
              loading: d.value
            })
          ])) : p("", !0)
        ])) : p("", !0),
        $(me("div", we, [
          o.value ? p("", !0) : $((c(), F(I, {
            key: 0,
            ref: (w) => L.value = w,
            palette: "danger",
            disabled: a.dropDisabled || !M.value,
            "confirm-modal": a.dropConfirm,
            "confirm-data": a.dropConfirmData,
            resource: a.dropResource,
            "resource-data": a.dropData,
            text: C(m)["button-drop"] ? "" : a.dropText,
            icon: C(m)["button-drop"] ? "" : a.dropIcon,
            onLoading: W,
            onLoaded: z,
            onClick: de
          }, {
            default: Y(() => [
              C(m)["button-drop"] ? R(a.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: v.value,
                isCreate: o.value,
                canUpdate: g.value,
                canDrop: M.value
              }) : p("", !0)
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])), [
            [J, A.value]
          ]),
          $(Z(I, {
            ref: (w) => N.value = w,
            palette: "success",
            disabled: !P.value,
            "confirm-modal": te.value,
            "confirm-data": le.value,
            resource: H.value,
            "resource-data": oe.value,
            text: C(m)["button-save"] ? "" : a.saveText,
            icon: C(m)["button-save"] ? "" : a.saveIcon,
            onLoading: W,
            onLoaded: z,
            onClick: re
          }, {
            default: Y(() => [
              C(m)["button-save"] ? R(a.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: v.value,
                isCreate: o.value,
                canUpdate: g.value,
                canDrop: M.value
              }) : p("", !0)
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"]), [
            [J, G.value]
          ]),
          $(Z(U, {
            modelValue: v.value,
            "onUpdate:modelValue": l[0] || (l[0] = (w) => v.value = w),
            label: a.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [J, Q.value]
          ])
        ], 512), [
          [J, ne.value]
        ]),
        d.value ? p("", !0) : (c(), _("div", Ee, [
          k.value ? (c(), _("div", Ue, [
            S.value ? (c(), F(X, {
              key: 0,
              code: f.value,
              quick: "",
              palette: f.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: l[1] || (l[1] = (w) => S.value = !1)
            }, null, 8, ["code", "palette"])) : p("", !0),
            R(a.$slots, "item", {
              item: r.value,
              loading: d.value,
              editMode: v.value,
              isCreate: o.value,
              canUpdate: g.value,
              canDrop: M.value,
              itemBeingEdited: x.value
            })
          ])) : (c(), F(X, {
            key: 1,
            code: f.value
          }, null, 8, ["code"]))
        ])),
        d.value ? (c(), F(se, { key: 2 })) : p("", !0)
      ]);
    };
  }
}), Ke = {
  install: (t, h = {}) => {
    t.component("lkt-item-crud") === void 0 && t.component("lkt-item-crud", Re);
  }
}, xe = (t) => {
  D.defaultSaveIcon = t;
}, je = (t) => {
  D.defaultDropIcon = t;
};
export {
  Je as debugLktItemCrud,
  Ke as default,
  je as setItemCrudDefaultDropIcon,
  xe as setItemCrudDefaultSaveIcon
};
