import { defineComponent as ve, useSlots as fe, ref as s, computed as i, watch as h, nextTick as pe, resolveComponent as I, openBlock as f, createElementBlock as M, createElementVNode as K, toDisplayString as j, renderSlot as V, createCommentVNode as w, withDirectives as N, createBlock as L, withCtx as Y, unref as Z, vShow as O, createVNode as ee } from "vue";
import { httpCall as me } from "lkt-http-client";
import { DataState as ae } from "lkt-data-state";
import { execModal as he, refreshModal as ke, closeModal as Ce, openModal as be, reOpenModal as De } from "lkt-modal";
const H = class H {
};
H.debugEnabled = !1;
let T = H;
const u = (...l) => {
  T.debugEnabled && console.info("[LktItemCrud] ", ...l);
}, $e = (l = !0) => {
  T.debugEnabled = l;
}, q = (l) => {
  u("runModalCallback -> init", l);
  let p = l.modalKey ? l.modalKey : "_", S = l.args ? l.args : {};
  switch (l.action) {
    case "reOpen":
      return De(l.modalName, p, S);
    case "open":
      return be(l.modalName, p, S);
    case "close":
      return Ce(l.modalName, p);
    case "refresh":
      return ke(l.modalName, p, S);
    case "exec":
      let e = l.method;
      return e ? he(l.modalName, p, e, S) : void 0;
  }
}, Se = { class: "lkt-item-crud" }, ye = {
  key: 0,
  class: "lkt-item-crud_header"
}, ge = { class: "lkt-item-crud_header-title" }, Me = { class: "lkt-item-crud_header-slot" }, _e = { class: "lkt-item-crud-buttons" }, Be = { key: 1 }, we = { key: 1 }, Ee = {
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
    dropText: { default: "Delete" },
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
  setup(l, { expose: p, emit: S }) {
    const e = l, $ = fe(), n = S;
    let te = [];
    const d = s(!0), r = s(e.modelValue), _ = s(te), c = s(e.editing), m = s(!1), k = s(!1), v = s(200), E = s(null), U = s(null), y = s(new ae(r.value, e.dataStateConfig)), F = s(new ae(e.readData)), o = s(e.isCreate), J = s(!1), le = i(() => o.value ? e.createConfirm : e.updateConfirm), oe = i(() => o.value ? e.createConfirmData : e.updateConfirmData), P = i(() => o.value ? e.createResource : e.updateResource), ue = i(() => o.value ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), de = i(() => o.value ? e.createDisabled : e.updateDisabled), C = i(() => !o.value && _.value.includes("update")), b = i(() => !o.value && _.value.includes("drop")), R = async () => {
      u("fetchItem"), d.value = !0, v.value = -1, k.value = !1;
      try {
        const a = await me(e.readResource, e.readData);
        if (u("fetchItem -> response", a), d.value = !1, v.value = a.httpStatus, !a.success) {
          m.value = !1, v.value = a.httpStatus, n("error", a.httpStatus);
          return;
        }
        m.value = !0, r.value = a.data, _.value = a.perms, y.value.increment(r.value).turnStoredIntoOriginal(), F.value.turnStoredIntoOriginal(), n("read", a);
      } catch {
        d.value = !1, m.value = !1, v.value = 404, n("error", 404);
        return;
      }
    }, re = i(() => d.value ? !1 : e.title || !!$["post-title"]);
    h(() => e.modelValue, (a) => {
      r.value = a, y.value.increment(a);
    }, { deep: !0 }), h(r, (a) => {
      if (J.value = !0, u("item updated ->", r.value), typeof e.beforeEmitUpdate == "function") {
        u("item updated -> has beforeEmitUpdate");
        let t = e.beforeEmitUpdate(r.value);
        u("item updated -> override with: ", t), typeof t == "object" && (r.value = t);
      }
      n("update:modelValue", r.value), u("item updated -> update dataState"), y.value.increment(a), pe(() => J.value = !1);
    }, { deep: !0 }), h(_, () => n("perms", _.value));
    const x = i(() => de.value || !o.value && !C.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : y.value.changed());
    h(x, (a) => n("modified-data", a)), h(o, (a) => n("update:isCreate", a)), h(() => e.readData, (a) => {
      F.value.increment(a), F.value.changed() && R();
    }), h(() => e.editing, (a) => {
      u("editing updated -> updating editMode", a), c.value = a;
    }), h(c, (a) => {
      u("editMode updated -> emit update", a), n("update:editing", a);
    }), e.readResource && !o.value ? R() : o.value && (m.value = !0, c.value = !0, d.value = !1);
    const ne = (a, t) => {
      if (d.value = !1, v.value = t.httpStatus, !t.success) {
        k.value = !0, n("error", t.httpStatus);
        return;
      }
      k.value = !0, e.onDropModalCallbacks.length > 0 && (u("onDrop -> has onDropModalCallbacks"), e.onDropModalCallbacks.forEach((D) => {
        q(D);
      })), n("drop", t);
    }, se = (a, t) => {
      if (u("onSave -> received response:", t), n("before-save"), P.value) {
        if (d.value = !1, v.value = t.httpStatus, !t.success) {
          k.value = !0, n("error", t.httpStatus);
          return;
        }
        k.value = !0;
      }
      let D = o.value ? "create" : "update";
      o.value || (u("onSave -> turn stored data into original"), y.value.turnStoredIntoOriginal()), D === "create" ? typeof e.onCreate == "function" && (u("onSave -> trigger onCreate callback"), e.onCreate(t), e.onCreateModalCallbacks.length > 0 && (u("onSave -> has onCreateModalCallbacks"), e.onCreateModalCallbacks.forEach((B) => {
        q(B);
      }))) : typeof e.onUpdate == "function" && (u("onSave -> trigger onUpdate callback"), e.onUpdate(t), e.onUpdateModalCallbacks.length > 0 && (u("onSave -> has onUpdateModalCallbacks"), e.onUpdateModalCallbacks.forEach((B) => {
        q(B);
      }))), !e.insideModal && t.autoReloadId && (u("onSave -> autoReloadId detected: ", t.autoReloadId), e.readData.id = t.autoReloadId, u("onSave -> turning off create mode"), o.value = !1, R()), n(D, t);
    }, z = () => {
      d.value = !0, v.value = -1;
    }, A = () => {
      d.value = !1;
    };
    p({
      doDrop: () => {
        U.value && typeof U.value.click == "function" && U.value.click();
      },
      doRefresh: R,
      doSave: () => {
        E.value && typeof E.value.click == "function" && E.value.click();
      }
    });
    const G = i(() => !C.value && b.value ? !0 : !e.hiddenDrop && !d.value && c.value && m.value), Q = i(() => y.value.changed() ? !0 : d.value ? !1 : o.value ? !0 : !e.hiddenSave && c.value && m.value), W = i(() => e.hideSwitchEdition || !C.value && !b.value || !C.value && b.value ? !1 : !d.value && !o.value && m.value && !(e.dropDisabled && e.updateDisabled)), ie = i(() => !e.hiddenButtons && (Q.value || G.value || W.value));
    return (a, t) => {
      const D = I("lkt-button"), B = I("lkt-field-switch"), X = I("lkt-http-info"), ce = I("lkt-loader");
      return f(), M("article", Se, [
        re.value ? (f(), M("header", ye, [
          K("h1", ge, j(a.title), 1),
          K("div", Me, [
            V(a.$slots, "post-title", {
              item: r.value,
              loading: d.value
            })
          ])
        ])) : w("", !0),
        N(K("div", _e, [
          o.value ? w("", !0) : N((f(), L(D, {
            key: 0,
            ref: (g) => U.value = g,
            palette: "danger",
            disabled: a.dropDisabled || !b.value,
            "confirm-modal": a.dropConfirm,
            "confirm-data": a.dropConfirmData,
            resource: a.dropResource,
            "resource-data": a.dropData,
            onLoading: z,
            onLoaded: A,
            onClick: ne
          }, {
            default: Y(() => [
              Z($)["button-drop"] ? V(a.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: o.value,
                canUpdate: C.value,
                canDrop: b.value
              }) : (f(), M("span", Be, j(a.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"])), [
            [O, G.value]
          ]),
          N(ee(D, {
            ref: (g) => E.value = g,
            palette: "success",
            disabled: !x.value,
            "confirm-modal": le.value,
            "confirm-data": oe.value,
            resource: P.value,
            "resource-data": ue.value,
            onLoading: z,
            onLoaded: A,
            onClick: se
          }, {
            default: Y(() => [
              Z($)["button-save"] ? V(a.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: o.value,
                canUpdate: C.value,
                canDrop: b.value
              }) : (f(), M("span", we, j(a.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"]), [
            [O, Q.value]
          ]),
          N(ee(B, {
            modelValue: c.value,
            "onUpdate:modelValue": t[0] || (t[0] = (g) => c.value = g),
            label: a.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [O, W.value]
          ])
        ], 512), [
          [O, ie.value]
        ]),
        d.value ? w("", !0) : (f(), M("div", Ee, [
          m.value ? (f(), M("div", Ue, [
            k.value ? (f(), L(X, {
              key: 0,
              code: v.value,
              quick: "",
              palette: v.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: t[1] || (t[1] = (g) => k.value = !1)
            }, null, 8, ["code", "palette"])) : w("", !0),
            V(a.$slots, "item", {
              item: r.value,
              loading: d.value,
              editMode: c.value,
              isCreate: o.value,
              canUpdate: C.value,
              canDrop: b.value,
              itemBeingEdited: J.value
            })
          ])) : (f(), L(X, {
            key: 1,
            code: v.value
          }, null, 8, ["code"]))
        ])),
        d.value ? (f(), L(ce, { key: 2 })) : w("", !0)
      ]);
    };
  }
}), Fe = {
  install: (l, p = {}) => {
    l.component("lkt-item-crud") === void 0 && l.component("lkt-item-crud", Re);
  }
};
export {
  $e as debugLktItemCrud,
  Fe as default
};
