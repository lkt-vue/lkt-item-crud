import { defineComponent as ce, useSlots as ve, ref as i, computed as s, watch as b, nextTick as fe, resolveComponent as L, openBlock as f, createElementBlock as w, unref as C, renderSlot as U, createCommentVNode as m, createElementVNode as X, toDisplayString as pe, withDirectives as O, createBlock as T, withCtx as Y, vShow as $, createVNode as Z } from "vue";
import { httpCall as me } from "lkt-http-client";
import { DataState as ee } from "lkt-data-state";
import { execModal as he, refreshModal as ke, closeModal as be, openModal as Ce, reOpenModal as De } from "lkt-modal";
const q = class q {
};
q.debugEnabled = !1;
let F = q;
const u = (...l) => {
  F.debugEnabled && console.info("[LktItemCrud] ", ...l);
}, Te = (l = !0) => {
  F.debugEnabled = l;
}, j = (l) => {
  u("runModalCallback -> init", l);
  let h = l.modalKey ? l.modalKey : "_", M = l.args ? l.args : {};
  switch (l.action) {
    case "reOpen":
      return De(l.modalName, h, M);
    case "open":
      return Ce(l.modalName, h, M);
    case "close":
      return be(l.modalName, h);
    case "refresh":
      return ke(l.modalName, h, M);
    case "exec":
      let e = l.method;
      return e ? he(l.modalName, h, e, M) : void 0;
  }
}, Se = { class: "lkt-item-crud" }, ye = {
  key: 0,
  class: "lkt-item-crud_header"
}, ge = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, Me = { class: "lkt-item-crud_header-title" }, Be = {
  key: 1,
  class: "lkt-item-crud_header-slot"
}, _e = { class: "lkt-item-crud-buttons" }, we = {
  key: 1,
  class: "lkt-item-crud_content"
}, Ie = {
  key: 0,
  class: "lkt-grid-1"
}, Ee = /* @__PURE__ */ ce({
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
  setup(l, { expose: h, emit: M }) {
    const e = l, p = ve(), n = M;
    let ae = [];
    const d = i(!0), r = i(e.modelValue), I = i(ae), c = i(e.editing), k = i(!1), D = i(!1), v = i(200), R = i(null), V = i(null), B = i(new ee(r.value, e.dataStateConfig)), J = i(new ee(e.readData)), o = i(e.isCreate), K = i(!1), te = s(() => o.value ? e.createConfirm : e.updateConfirm), le = s(() => o.value ? e.createConfirmData : e.updateConfirmData), x = s(() => o.value ? e.createResource : e.updateResource), oe = s(() => o.value ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), ue = s(() => o.value ? e.createDisabled : e.updateDisabled), S = s(() => !o.value && I.value.includes("update")), y = s(() => !o.value && I.value.includes("drop")), N = async () => {
      u("fetchItem"), d.value = !0, v.value = -1, D.value = !1;
      try {
        const a = await me(e.readResource, e.readData);
        if (u("fetchItem -> response", a), d.value = !1, v.value = a.httpStatus, !a.success) {
          k.value = !1, v.value = a.httpStatus, n("error", a.httpStatus);
          return;
        }
        k.value = !0, r.value = a.data, I.value = a.perms, B.value.increment(r.value).turnStoredIntoOriginal(), J.value.turnStoredIntoOriginal(), n("read", a);
      } catch {
        d.value = !1, k.value = !1, v.value = 404, n("error", 404);
        return;
      }
    }, de = s(() => d.value ? !1 : e.title || !!p["post-title"]);
    b(() => e.modelValue, (a) => {
      r.value = a, B.value.increment(a);
    }, { deep: !0 }), b(r, (a) => {
      if (K.value = !0, u("item updated ->", r.value), typeof e.beforeEmitUpdate == "function") {
        u("item updated -> has beforeEmitUpdate");
        let t = e.beforeEmitUpdate(r.value);
        u("item updated -> override with: ", t), typeof t == "object" && (r.value = t);
      }
      n("update:modelValue", r.value), u("item updated -> update dataState"), B.value.increment(a), fe(() => K.value = !1);
    }, { deep: !0 }), b(I, () => n("perms", I.value));
    const H = s(() => ue.value || !o.value && !S.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : B.value.changed());
    b(H, (a) => n("modified-data", a)), b(o, (a) => n("update:isCreate", a)), b(() => e.readData, (a) => {
      J.value.increment(a), J.value.changed() && N();
    }), b(() => e.editing, (a) => {
      u("editing updated -> updating editMode", a), c.value = a;
    }), b(c, (a) => {
      u("editMode updated -> emit update", a), n("update:editing", a);
    }), e.readResource && !o.value ? N() : o.value && (k.value = !0, c.value = !0, d.value = !1);
    const re = (a, t) => {
      if (d.value = !1, v.value = t.httpStatus, !t.success) {
        D.value = !0, n("error", t.httpStatus);
        return;
      }
      D.value = !0, e.onDropModalCallbacks.length > 0 && (u("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach((g) => {
        j(g);
      })), n("drop", t);
    }, ne = (a, t) => {
      if (u("onSave -> received response:", t), n("before-save"), x.value) {
        if (d.value = !1, v.value = t.httpStatus, !t.success) {
          D.value = !0, n("error", t.httpStatus);
          return;
        }
        D.value = !0;
      }
      let g = o.value ? "create" : "update";
      o.value || (u("onSave -> turn stored data into original"), B.value.turnStoredIntoOriginal()), g === "create" ? typeof e.onCreate == "function" && (u("onSave -> trigger onCreate callback"), e.onCreate(t), e.onCreateModalCallbacks.length > 0 && (u("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((E) => {
        j(E);
      }))) : typeof e.onUpdate == "function" && (u("onSave -> trigger onUpdate callback"), e.onUpdate(t), e.onUpdateModalCallbacks.length > 0 && (u("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((E) => {
        j(E);
      }))), !e.insideModal && t.autoReloadId && (u("onSave -> autoReloadId detected: ", t.autoReloadId), e.readData.id = t.autoReloadId, u("onSave -> turning off create mode"), o.value = !1, N()), n(g, t);
    }, P = () => {
      d.value = !0, v.value = -1;
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
      }
    });
    const A = s(() => !S.value && y.value ? !0 : !e.hiddenDrop && !d.value && c.value && k.value), G = s(() => B.value.changed() ? !0 : d.value ? !1 : o.value ? !0 : !e.hiddenSave && c.value && k.value), Q = s(() => e.hideSwitchEdition || !S.value && !y.value || !S.value && y.value ? !1 : !d.value && !o.value && k.value && !(e.dropDisabled && e.updateDisabled)), ie = s(() => !e.hiddenButtons && (G.value || A.value || Q.value));
    return (a, t) => {
      const g = L("lkt-button"), E = L("lkt-field-switch"), W = L("lkt-http-info"), se = L("lkt-loader");
      return f(), w("article", Se, [
        de.value ? (f(), w("header", ye, [
          C(p)["pre-title"] ? (f(), w("div", ge, [
            U(a.$slots, "pre-title", {
              item: r.value,
              loading: d.value
            })
          ])) : m("", !0),
          X("h1", Me, pe(a.title), 1),
          C(p)["post-title"] ? (f(), w("div", Be, [
            U(a.$slots, "post-title", {
              item: r.value,
              loading: d.value
            })
          ])) : m("", !0)
        ])) : m("", !0),
        O(X("div", _e, [
          o.value ? m("", !0) : O((f(), T(g, {
            key: 0,
            ref: (_) => V.value = _,
            palette: "danger",
            disabled: a.dropDisabled || !y.value,
            "confirm-modal": a.dropConfirm,
            "confirm-data": a.dropConfirmData,
            resource: a.dropResource,
            "resource-data": a.dropData,
            text: C(p)["button-drop"] ? "" : a.dropText,
            icon: C(p)["button-drop"] ? "" : a.dropIcon,
            onLoading: P,
            onLoaded: z,
            onClick: re
          }, {
            default: Y(() => [
              C(p)["button-drop"] ? U(a.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: o.value,
                canUpdate: S.value,
                canDrop: y.value
              }) : m("", !0)
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"])), [
            [$, A.value]
          ]),
          O(Z(g, {
            ref: (_) => R.value = _,
            palette: "success",
            disabled: !H.value,
            "confirm-modal": te.value,
            "confirm-data": le.value,
            resource: x.value,
            "resource-data": oe.value,
            text: C(p)["button-save"] ? "" : a.saveText,
            icon: C(p)["button-save"] ? "" : a.saveIcon,
            onLoading: P,
            onLoaded: z,
            onClick: ne
          }, {
            default: Y(() => [
              C(p)["button-save"] ? U(a.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: o.value,
                canUpdate: S.value,
                canDrop: y.value
              }) : m("", !0)
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data", "text", "icon"]), [
            [$, G.value]
          ]),
          O(Z(E, {
            modelValue: c.value,
            "onUpdate:modelValue": t[0] || (t[0] = (_) => c.value = _),
            label: a.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [$, Q.value]
          ])
        ], 512), [
          [$, ie.value]
        ]),
        d.value ? m("", !0) : (f(), w("div", we, [
          k.value ? (f(), w("div", Ie, [
            D.value ? (f(), T(W, {
              key: 0,
              code: v.value,
              quick: "",
              palette: v.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: t[1] || (t[1] = (_) => D.value = !1)
            }, null, 8, ["code", "palette"])) : m("", !0),
            U(a.$slots, "item", {
              item: r.value,
              loading: d.value,
              editMode: c.value,
              isCreate: o.value,
              canUpdate: S.value,
              canDrop: y.value,
              itemBeingEdited: K.value
            })
          ])) : (f(), T(W, {
            key: 1,
            code: v.value
          }, null, 8, ["code"]))
        ])),
        d.value ? (f(), T(se, { key: 2 })) : m("", !0)
      ]);
    };
  }
}), $e = {
  install: (l, h = {}) => {
    l.component("lkt-item-crud") === void 0 && l.component("lkt-item-crud", Ee);
  }
};
export {
  Te as debugLktItemCrud,
  $e as default
};
