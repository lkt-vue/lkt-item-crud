import { defineComponent as ce, useSlots as ve, ref as i, computed as s, watch as m, nextTick as fe, resolveComponent as V, openBlock as h, createElementBlock as N, createElementVNode as x, toDisplayString as pe, renderSlot as L, createCommentVNode as y, withDirectives as O, createBlock as T, unref as _, withCtx as Y, vShow as $, createVNode as Z } from "vue";
import { httpCall as me } from "lkt-http-client";
import { DataState as ee } from "lkt-data-state";
import { execModal as he, refreshModal as be, closeModal as ke, openModal as Ce, reOpenModal as De } from "lkt-modal";
const q = class q {
};
q.debugEnabled = !1;
let F = q;
const u = (...l) => {
  F.debugEnabled && console.info("[LktItemCrud] ", ...l);
}, Oe = (l = !0) => {
  F.debugEnabled = l;
}, j = (l) => {
  u("runModalCallback -> init", l);
  let f = l.modalKey ? l.modalKey : "_", g = l.args ? l.args : {};
  switch (l.action) {
    case "reOpen":
      return De(l.modalName, f, g);
    case "open":
      return Ce(l.modalName, f, g);
    case "close":
      return ke(l.modalName, f);
    case "refresh":
      return be(l.modalName, f, g);
    case "exec":
      let e = l.method;
      return e ? he(l.modalName, f, e, g) : void 0;
  }
}, Se = { class: "lkt-item-crud" }, ye = {
  key: 0,
  class: "lkt-item-crud_header"
}, ge = { class: "lkt-item-crud_header-title" }, Me = { class: "lkt-item-crud_header-slot" }, Be = { class: "lkt-item-crud-buttons" }, _e = {
  key: 1,
  class: "lkt-item-crud_content"
}, we = {
  key: 0,
  class: "lkt-grid-1"
}, Ie = /* @__PURE__ */ ce({
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
  setup(l, { expose: f, emit: g }) {
    const e = l, b = ve(), n = g;
    let ae = [];
    const d = i(!0), r = i(e.modelValue), w = i(ae), c = i(e.editing), p = i(!1), k = i(!1), v = i(200), E = i(null), U = i(null), M = i(new ee(r.value, e.dataStateConfig)), J = i(new ee(e.readData)), o = i(e.isCreate), K = i(!1), te = s(() => o.value ? e.createConfirm : e.updateConfirm), le = s(() => o.value ? e.createConfirmData : e.updateConfirmData), H = s(() => o.value ? e.createResource : e.updateResource), oe = s(() => o.value ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), ue = s(() => o.value ? e.createDisabled : e.updateDisabled), C = s(() => !o.value && w.value.includes("update")), D = s(() => !o.value && w.value.includes("drop")), R = async () => {
      u("fetchItem"), d.value = !0, v.value = -1, k.value = !1;
      try {
        const a = await me(e.readResource, e.readData);
        if (u("fetchItem -> response", a), d.value = !1, v.value = a.httpStatus, !a.success) {
          p.value = !1, v.value = a.httpStatus, n("error", a.httpStatus);
          return;
        }
        p.value = !0, r.value = a.data, w.value = a.perms, M.value.increment(r.value).turnStoredIntoOriginal(), J.value.turnStoredIntoOriginal(), n("read", a);
      } catch {
        d.value = !1, p.value = !1, v.value = 404, n("error", 404);
        return;
      }
    }, de = s(() => d.value ? !1 : e.title || !!b["post-title"]);
    m(() => e.modelValue, (a) => {
      r.value = a, M.value.increment(a);
    }, { deep: !0 }), m(r, (a) => {
      if (K.value = !0, u("item updated ->", r.value), typeof e.beforeEmitUpdate == "function") {
        u("item updated -> has beforeEmitUpdate");
        let t = e.beforeEmitUpdate(r.value);
        u("item updated -> override with: ", t), typeof t == "object" && (r.value = t);
      }
      n("update:modelValue", r.value), u("item updated -> update dataState"), M.value.increment(a), fe(() => K.value = !1);
    }, { deep: !0 }), m(w, () => n("perms", w.value));
    const P = s(() => ue.value || !o.value && !C.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : M.value.changed());
    m(P, (a) => n("modified-data", a)), m(o, (a) => n("update:isCreate", a)), m(() => e.readData, (a) => {
      J.value.increment(a), J.value.changed() && R();
    }), m(() => e.editing, (a) => {
      u("editing updated -> updating editMode", a), c.value = a;
    }), m(c, (a) => {
      u("editMode updated -> emit update", a), n("update:editing", a);
    }), e.readResource && !o.value ? R() : o.value && (p.value = !0, c.value = !0, d.value = !1);
    const re = (a, t) => {
      if (d.value = !1, v.value = t.httpStatus, !t.success) {
        k.value = !0, n("error", t.httpStatus);
        return;
      }
      k.value = !0, e.onDropModalCallbacks.length > 0 && (u("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach((S) => {
        j(S);
      })), n("drop", t);
    }, ne = (a, t) => {
      if (u("onSave -> received response:", t), n("before-save"), H.value) {
        if (d.value = !1, v.value = t.httpStatus, !t.success) {
          k.value = !0, n("error", t.httpStatus);
          return;
        }
        k.value = !0;
      }
      let S = o.value ? "create" : "update";
      o.value || (u("onSave -> turn stored data into original"), M.value.turnStoredIntoOriginal()), S === "create" ? typeof e.onCreate == "function" && (u("onSave -> trigger onCreate callback"), e.onCreate(t), e.onCreateModalCallbacks.length > 0 && (u("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((I) => {
        j(I);
      }))) : typeof e.onUpdate == "function" && (u("onSave -> trigger onUpdate callback"), e.onUpdate(t), e.onUpdateModalCallbacks.length > 0 && (u("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((I) => {
        j(I);
      }))), !e.insideModal && t.autoReloadId && (u("onSave -> autoReloadId detected: ", t.autoReloadId), e.readData.id = t.autoReloadId, u("onSave -> turning off create mode"), o.value = !1, R()), n(S, t);
    }, z = () => {
      d.value = !0, v.value = -1;
    }, A = () => {
      d.value = !1;
    };
    f({
      doDrop: () => {
        U.value && typeof U.value.click == "function" && U.value.click();
      },
      doRefresh: R,
      doSave: () => {
        E.value && typeof E.value.click == "function" && E.value.click();
      }
    });
    const G = s(() => !C.value && D.value ? !0 : !e.hiddenDrop && !d.value && c.value && p.value), Q = s(() => M.value.changed() ? !0 : d.value ? !1 : o.value ? !0 : !e.hiddenSave && c.value && p.value), W = s(() => e.hideSwitchEdition || !C.value && !D.value || !C.value && D.value ? !1 : !d.value && !o.value && p.value && !(e.dropDisabled && e.updateDisabled)), ie = s(() => !e.hiddenButtons && (Q.value || G.value || W.value));
    return (a, t) => {
      const S = V("lkt-button"), I = V("lkt-field-switch"), X = V("lkt-http-info"), se = V("lkt-loader");
      return h(), N("article", Se, [
        de.value ? (h(), N("header", ye, [
          x("h1", ge, pe(a.title), 1),
          x("div", Me, [
            L(a.$slots, "post-title", {
              item: r.value,
              loading: d.value
            })
          ])
        ])) : y("", !0),
        O(x("div", Be, [
          o.value ? y("", !0) : O((h(), T(S, {
            key: 0,
            ref: (B) => U.value = B,
            palette: "danger",
            disabled: a.dropDisabled || !D.value,
            "confirm-modal": a.dropConfirm,
            "confirm-data": a.dropConfirmData,
            resource: a.dropResource,
            "resource-data": a.dropData,
            text: _(b)["button-drop"] ? "" : a.dropText,
            icon: _(b)["button-drop"] ? "" : a.dropIcon,
            onLoading: z,
            onLoaded: A,
            onClick: re
          }, {
            default: Y(() => [
              _(b)["button-drop"] ? L(a.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: o.value,
                canUpdate: C.value,
                canDrop: D.value
              }) : y("", !0)
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])), [
            [$, G.value]
          ]),
          O(Z(S, {
            ref: (B) => E.value = B,
            palette: "success",
            disabled: !P.value,
            "confirm-modal": te.value,
            "confirm-data": le.value,
            resource: H.value,
            "resource-data": oe.value,
            text: _(b)["button-save"] ? "" : a.saveText,
            icon: _(b)["button-save"] ? "" : a.saveIcon,
            onLoading: z,
            onLoaded: A,
            onClick: ne
          }, {
            default: Y(() => [
              _(b)["button-save"] ? L(a.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: o.value,
                canUpdate: C.value,
                canDrop: D.value
              }) : y("", !0)
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"]), [
            [$, Q.value]
          ]),
          O(Z(I, {
            modelValue: c.value,
            "onUpdate:modelValue": t[0] || (t[0] = (B) => c.value = B),
            label: a.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [$, W.value]
          ])
        ], 512), [
          [$, ie.value]
        ]),
        d.value ? y("", !0) : (h(), N("div", _e, [
          p.value ? (h(), N("div", we, [
            k.value ? (h(), T(X, {
              key: 0,
              code: v.value,
              quick: "",
              palette: v.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: t[1] || (t[1] = (B) => k.value = !1)
            }, null, 8, ["code", "palette"])) : y("", !0),
            L(a.$slots, "item", {
              item: r.value,
              loading: d.value,
              editMode: c.value,
              isCreate: o.value,
              canUpdate: C.value,
              canDrop: D.value,
              itemBeingEdited: K.value
            })
          ])) : (h(), T(X, {
            key: 1,
            code: v.value
          }, null, 8, ["code"]))
        ])),
        d.value ? (h(), T(se, { key: 2 })) : y("", !0)
      ]);
    };
  }
}), Te = {
  install: (l, f = {}) => {
    l.component("lkt-item-crud") === void 0 && l.component("lkt-item-crud", Ie);
  }
};
export {
  Oe as debugLktItemCrud,
  Te as default
};
