import { defineComponent as ve, useSlots as ce, ref as s, computed as n, watch as b, nextTick as fe, resolveComponent as L, openBlock as v, createElementBlock as _, unref as C, renderSlot as U, createCommentVNode as p, toDisplayString as pe, withDirectives as O, createElementVNode as me, createBlock as T, withCtx as Y, vShow as $, createVNode as Z } from "vue";
import { httpCall as he } from "lkt-http-client";
import { DataState as ee } from "lkt-data-state";
import { execModal as ke, refreshModal as be, closeModal as Ce, openModal as De, reOpenModal as Se } from "lkt-modal";
import { __ as ye } from "lkt-i18n";
const q = class q {
};
q.debugEnabled = !1;
let F = q;
const u = (...l) => {
  F.debugEnabled && console.info("[LktItemCrud] ", ...l);
}, Je = (l = !0) => {
  F.debugEnabled = l;
}, j = (l) => {
  u("runModalCallback -> init", l);
  let h = l.modalKey ? l.modalKey : "_", B = l.args ? l.args : {};
  switch (l.action) {
    case "reOpen":
      return Se(l.modalName, h, B);
    case "open":
      return De(l.modalName, h, B);
    case "close":
      return Ce(l.modalName, h);
    case "refresh":
      return be(l.modalName, h, B);
    case "exec":
      let e = l.method;
      return e ? ke(l.modalName, h, e, B) : void 0;
  }
}, ge = { class: "lkt-item-crud" }, Me = {
  key: 0,
  class: "lkt-item-crud_header"
}, _e = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, Be = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, we = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Ie = { class: "lkt-item-crud-buttons" }, Ee = {
  key: 1,
  class: "lkt-item-crud_content"
}, Ue = {
  key: 0,
  class: "lkt-grid-1"
}, Re = /* @__PURE__ */ ve({
  __name: "LktItemCrud",
  props: {
    modelValue: { default: () => ({}) },
    title: { default: "" },
    editModeText: { default: "Edition Mode" },
    saveText: { default: "Save" },
    saveIcon: {},
    dropText: { default: "Delete" },
    dropIcon: {},
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
  setup(l, { expose: h, emit: B }) {
    const e = l, m = ce(), i = B;
    let ae = [];
    const d = s(!0), r = s(e.modelValue), I = s(ae), c = s(e.editing), k = s(!1), D = s(!1), f = s(200), R = s(null), V = s(null), S = s(new ee(r.value, e.dataStateConfig)), J = s(new ee(e.readData)), o = s(e.isCreate), K = s(!1), te = n(() => o.value ? e.createConfirm : e.updateConfirm), le = n(() => o.value ? e.createConfirmData : e.updateConfirmData), H = n(() => o.value ? e.createResource : e.updateResource), oe = n(() => o.value ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), ue = n(() => o.value ? e.createDisabled : e.updateDisabled), y = n(() => !o.value && I.value.includes("update")), g = n(() => !o.value && I.value.includes("drop")), N = async () => {
      u("fetchItem"), d.value = !0, f.value = -1, D.value = !1;
      try {
        const a = await he(e.readResource, e.readData);
        if (u("fetchItem -> response", a), d.value = !1, f.value = a.httpStatus, !a.success) {
          k.value = !1, f.value = a.httpStatus, i("error", a.httpStatus);
          return;
        }
        k.value = !0, r.value = a.data, I.value = a.perms, S.value.increment(r.value).turnStoredIntoOriginal(), J.value.turnStoredIntoOriginal(), i("read", a);
      } catch {
        d.value = !1, k.value = !1, f.value = 404, i("error", 404);
        return;
      }
    };
    b(() => e.modelValue, (a) => {
      r.value = a, S.value.increment(a);
    }, { deep: !0 }), b(r, (a) => {
      if (K.value = !0, u("item updated ->", r.value), typeof e.beforeEmitUpdate == "function") {
        u("item updated -> has beforeEmitUpdate");
        let t = e.beforeEmitUpdate(r.value);
        u("item updated -> override with: ", t), typeof t == "object" && (r.value = t);
      }
      i("update:modelValue", r.value), u("item updated -> update dataState"), S.value.increment(a), fe(() => K.value = !1);
    }, { deep: !0 }), b(I, () => i("perms", I.value));
    const P = n(() => ue.value || !o.value && !y.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : S.value.changed());
    b(P, (a) => i("modified-data", a)), b(o, (a) => i("update:isCreate", a)), b(() => e.readData, (a) => {
      J.value.increment(a), J.value.changed() && N();
    }), b(() => e.editing, (a) => {
      u("editing updated -> updating editMode", a), c.value = a;
    }), b(c, (a) => {
      u("editMode updated -> emit update", a), i("update:editing", a);
    }), e.readResource && !o.value ? N() : o.value && (k.value = !0, c.value = !0, d.value = !1);
    const de = (a, t) => {
      if (d.value = !1, f.value = t.httpStatus, !t.success) {
        D.value = !0, i("error", t.httpStatus);
        return;
      }
      D.value = !0, e.onDropModalCallbacks.length > 0 && (u("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach((M) => {
        j(M);
      })), i("drop", t);
    }, re = (a, t) => {
      if (u("onSave -> received response:", t), i("before-save"), H.value) {
        if (d.value = !1, f.value = t.httpStatus, !t.success) {
          D.value = !0, i("error", t.httpStatus);
          return;
        }
        D.value = !0;
      }
      let M = o.value ? "create" : "update";
      o.value || (u("onSave -> turn stored data into original"), S.value.turnStoredIntoOriginal()), M === "create" ? typeof e.onCreate == "function" && (u("onSave -> trigger onCreate callback"), e.onCreate(t), e.onCreateModalCallbacks.length > 0 && (u("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((E) => {
        j(E);
      }))) : typeof e.onUpdate == "function" && (u("onSave -> trigger onUpdate callback"), e.onUpdate(t), e.onUpdateModalCallbacks.length > 0 && (u("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((E) => {
        j(E);
      }))), !e.insideModal && t.autoReloadId && (u("onSave -> autoReloadId detected: ", t.autoReloadId), e.readData.id = t.autoReloadId, u("onSave -> turning off create mode"), o.value = !1, N()), i(M, t);
    }, W = () => {
      d.value = !0, f.value = -1;
    }, z = () => {
      d.value = !1;
    };
    h({
      doDrop: () => {
        V.value && typeof V.value.click == "function" && V.value.click();
      },
      doRefresh: N,
      doSave: () => {
        R.value && typeof R.value.click == "function" && R.value.click();
      },
      hasModifiedData: () => S.value.changed()
    });
    const A = n(() => !y.value && g.value ? !0 : !e.hiddenDrop && !d.value && c.value && k.value), G = n(() => S.value.changed() ? !0 : d.value ? !1 : o.value ? !0 : !e.hiddenSave && c.value && k.value), Q = n(() => e.hideSwitchEdition || !y.value && !g.value || !y.value && g.value ? !1 : !d.value && !o.value && k.value && !(e.dropDisabled && e.updateDisabled)), ne = n(() => !e.hiddenButtons && (G.value || A.value || Q.value)), x = n(() => e.title.startsWith("__:") ? String(ye(e.title.substring(3))) : e.title), ie = n(() => d.value ? !1 : x.value.length > 0 || !!m["post-title"]);
    return (a, t) => {
      const M = L("lkt-button"), E = L("lkt-field-switch"), X = L("lkt-http-info"), se = L("lkt-loader");
      return v(), _("article", ge, [
        ie.value ? (v(), _("header", Me, [
          C(m)["pre-title"] ? (v(), _("div", _e, [
            U(a.$slots, "pre-title", {
              item: r.value,
              loading: d.value
            })
          ])) : p("", !0),
          x.value.length > 0 ? (v(), _("h1", Be, pe(x.value), 1)) : p("", !0),
          C(m)["post-title"] ? (v(), _("div", we, [
            U(a.$slots, "post-title", {
              item: r.value,
              loading: d.value
            })
          ])) : p("", !0)
        ])) : p("", !0),
        O(me("div", Ie, [
          o.value ? p("", !0) : O((v(), T(M, {
            key: 0,
            ref: (w) => V.value = w,
            palette: "danger",
            disabled: a.dropDisabled || !g.value,
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
              C(m)["button-drop"] ? U(a.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: o.value,
                canUpdate: y.value,
                canDrop: g.value
              }) : p("", !0)
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])), [
            [$, A.value]
          ]),
          O(Z(M, {
            ref: (w) => R.value = w,
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
              C(m)["button-save"] ? U(a.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: o.value,
                canUpdate: y.value,
                canDrop: g.value
              }) : p("", !0)
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"]), [
            [$, G.value]
          ]),
          O(Z(E, {
            modelValue: c.value,
            "onUpdate:modelValue": t[0] || (t[0] = (w) => c.value = w),
            label: a.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [$, Q.value]
          ])
        ], 512), [
          [$, ne.value]
        ]),
        d.value ? p("", !0) : (v(), _("div", Ee, [
          k.value ? (v(), _("div", Ue, [
            D.value ? (v(), T(X, {
              key: 0,
              code: f.value,
              quick: "",
              palette: f.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: t[1] || (t[1] = (w) => D.value = !1)
            }, null, 8, ["code", "palette"])) : p("", !0),
            U(a.$slots, "item", {
              item: r.value,
              loading: d.value,
              editMode: c.value,
              isCreate: o.value,
              canUpdate: y.value,
              canDrop: g.value,
              itemBeingEdited: K.value
            })
          ])) : (v(), T(X, {
            key: 1,
            code: f.value
          }, null, 8, ["code"]))
        ])),
        d.value ? (v(), T(se, { key: 2 })) : p("", !0)
      ]);
    };
  }
}), Ke = {
  install: (l, h = {}) => {
    l.component("lkt-item-crud") === void 0 && l.component("lkt-item-crud", Re);
  }
};
export {
  Je as debugLktItemCrud,
  Ke as default
};
