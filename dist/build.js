import { defineComponent as se, useSlots as ie, ref as r, computed as d, watch as S, nextTick as ve, resolveComponent as w, openBlock as v, createElementBlock as k, createElementVNode as $, toDisplayString as O, renderSlot as V, createCommentVNode as y, withDirectives as I, createBlock as U, withCtx as Q, unref as W, vShow as E, createVNode as X } from "vue";
import { httpCall as ce } from "lkt-http-client";
import { DataState as fe } from "lkt-data-state";
const F = class F {
};
F.debugEnabled = !1;
let L = F;
const n = (...c) => {
  L.debugEnabled && console.info("[LktItemCrud] ", ...c);
}, Ie = (c = !0) => {
  L.debugEnabled = c;
}, pe = { class: "lkt-item-crud" }, me = {
  key: 0,
  class: "lkt-item-crud_header"
}, he = { class: "lkt-item-crud_header-title" }, ke = { class: "lkt-item-crud_header-slot" }, De = { class: "lkt-item-crud-buttons" }, be = { key: 1 }, Ce = { key: 1 }, Se = {
  key: 1,
  class: "lkt-item-crud_content"
}, ye = {
  key: 0,
  class: "lkt-grid-1"
}, ge = /* @__PURE__ */ se({
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
    dataStateConfig: { default: () => ({}) }
  },
  emits: ["update:modelValue", "update:isCreate", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(c, { expose: J, emit: Y }) {
    const t = c, M = ie(), s = Y;
    let Z = [];
    const o = r(!0), u = r(t.modelValue), D = r(Z), f = r(!1), p = r(!1), m = r(!1), i = r(200), g = r(null), _ = r(null), b = r(new fe(u.value, t.dataStateConfig)), l = r(t.isCreate), T = r(!1), x = d(() => l.value ? t.createConfirm : t.updateConfirm), ee = d(() => l.value ? t.createConfirmData : t.updateConfirmData), j = d(() => l.value ? t.createResource : t.updateResource), te = d(() => l.value ? { ...t.createData, ...JSON.parse(JSON.stringify(u.value)) } : { ...t.updateData, ...JSON.parse(JSON.stringify(u.value)) }), ae = d(() => l.value ? t.createDisabled : t.updateDisabled), B = d(() => !l.value && D.value.includes("update")), R = d(() => !l.value && D.value.includes("drop")), N = async () => {
      n("fetchItem"), o.value = !0, i.value = -1, m.value = !1;
      try {
        const e = await ce(t.readResource, t.readData);
        if (n("fetchItem -> response", e), o.value = !1, i.value = e.httpStatus, !e.success) {
          p.value = !1, i.value = e.httpStatus, s("error", e.httpStatus);
          return;
        }
        p.value = !0, u.value = e.data, D.value = e.perms, b.value.increment(u.value).turnStoredIntoOriginal(), s("read", e);
      } catch {
        o.value = !1, p.value = !1, i.value = 404, s("error", 404);
        return;
      }
    }, le = d(() => o.value ? !1 : t.title || !!M["post-title"]);
    S(() => t.modelValue, (e) => {
      u.value = e, b.value.increment(e);
    }, { deep: !0 }), S(u, (e) => {
      if (T.value = !0, n("item updated ->", u.value), typeof t.beforeEmitUpdate == "function") {
        n("item updated -> has beforeEmitUpdate");
        let a = t.beforeEmitUpdate(u.value);
        n("item updated -> override with: ", a), typeof a == "object" && (u.value = a);
      }
      s("update:modelValue", u.value), n("item updated -> update dataState"), b.value.increment(e), ve(() => T.value = !1);
    }, { deep: !0 }), S(D, () => s("perms", D.value));
    const q = d(() => ae.value || !l.value && !B.value || typeof t.saveValidator == "function" && !t.saveValidator(u.value) ? !1 : b.value.changed());
    S(q, (e) => s("modified-data", e)), S(l, (e) => s("update:isCreate", e)), t.readResource && !l.value ? N() : l.value && (p.value = !0, f.value = !0, o.value = !1);
    const ue = (e, a) => {
      if (o.value = !1, i.value = a.httpStatus, !a.success) {
        m.value = !0, s("error", a.httpStatus);
        return;
      }
      m.value = !0, s("drop", a);
    }, oe = (e, a) => {
      if (n("onSave -> received response:", a), j.value) {
        if (o.value = !1, i.value = a.httpStatus, !a.success) {
          m.value = !0, s("error", a.httpStatus);
          return;
        }
        m.value = !0;
      }
      let C = l.value ? "create" : "update";
      l.value || (n("onSave -> turn stored data into original"), b.value.turnStoredIntoOriginal()), C === "create" ? typeof t.onCreate == "function" && (n("onSave -> trigger onCreate callback"), t.onCreate(a)) : typeof t.onUpdate == "function" && (n("onSave -> trigger onUpdate callback"), t.onUpdate(a)), !t.insideModal && a.autoReloadId && (n("onSave -> autoReloadId detected: ", a.autoReloadId), t.readData.id = a.autoReloadId, n("onSave -> turning off create mode"), l.value = !1, N()), s(C, a);
    }, H = () => {
      o.value = !0, i.value = -1;
    }, P = () => {
      o.value = !1;
    };
    J({
      doDrop: () => {
        _.value && typeof _.value.click == "function" && _.value.click();
      },
      doRefresh: N,
      doSave: () => {
        g.value && typeof g.value.click == "function" && g.value.click();
      }
    });
    const z = d(() => !t.hiddenDrop && !o.value && f.value && p.value), A = d(() => o.value ? !1 : l.value ? !0 : !t.hiddenSave && f.value && p.value), G = d(() => !o.value && !l.value && p.value && !(t.dropDisabled && t.updateDisabled)), de = d(() => !t.hiddenButtons && (A.value || z.value || G.value));
    return d(() => u), (e, a) => {
      const C = w("lkt-button"), re = w("lkt-field-switch"), K = w("lkt-http-info"), ne = w("lkt-loader");
      return v(), k("article", pe, [
        le.value ? (v(), k("header", me, [
          $("h1", he, O(e.title), 1),
          $("div", ke, [
            V(e.$slots, "post-title", {
              item: u.value,
              loading: o.value
            })
          ])
        ])) : y("", !0),
        I($("div", De, [
          l.value ? y("", !0) : I((v(), U(C, {
            key: 0,
            ref: (h) => _.value = h,
            palette: "danger",
            disabled: e.dropDisabled || !R.value,
            "confirm-modal": e.dropConfirm,
            "confirm-data": e.dropConfirmData,
            resource: e.dropResource,
            "resource-data": e.dropData,
            onLoading: H,
            onLoaded: P,
            onClick: ue
          }, {
            default: Q(() => [
              W(M)["button-drop"] ? V(e.$slots, "button-drop", {
                key: 0,
                item: u.value,
                editMode: f.value,
                isCreate: l.value,
                canUpdate: B.value,
                canDrop: R.value
              }) : (v(), k("span", be, O(e.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"])), [
            [E, z.value]
          ]),
          I(X(C, {
            ref: (h) => g.value = h,
            palette: "success",
            disabled: !q.value,
            "confirm-modal": x.value,
            "confirm-data": ee.value,
            resource: j.value,
            "resource-data": te.value,
            onLoading: H,
            onLoaded: P,
            onClick: oe
          }, {
            default: Q(() => [
              W(M)["button-save"] ? V(e.$slots, "button-save", {
                key: 0,
                item: u.value,
                editMode: f.value,
                isCreate: l.value,
                canUpdate: B.value,
                canDrop: R.value
              }) : (v(), k("span", Ce, O(e.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"]), [
            [E, A.value]
          ]),
          I(X(re, {
            modelValue: f.value,
            "onUpdate:modelValue": a[0] || (a[0] = (h) => f.value = h),
            label: e.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [E, G.value]
          ])
        ], 512), [
          [E, de.value]
        ]),
        o.value ? y("", !0) : (v(), k("div", Se, [
          p.value ? (v(), k("div", ye, [
            m.value ? (v(), U(K, {
              key: 0,
              code: i.value,
              quick: "",
              palette: i.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: a[1] || (a[1] = (h) => m.value = !1)
            }, null, 8, ["code", "palette"])) : y("", !0),
            V(e.$slots, "item", {
              item: u.value,
              loading: o.value,
              editMode: f.value,
              isCreate: l.value,
              canUpdate: B.value,
              canDrop: R.value,
              itemBeingEdited: T.value
            })
          ])) : (v(), U(K, {
            key: 1,
            code: i.value
          }, null, 8, ["code"]))
        ])),
        o.value ? (v(), U(ne, { key: 2 })) : y("", !0)
      ]);
    };
  }
}), Ue = {
  install: (c, J = {}) => {
    c.component("lkt-item-crud") === void 0 && c.component("lkt-item-crud", ge);
  }
};
export {
  Ie as debugLktItemCrud,
  Ue as default
};
