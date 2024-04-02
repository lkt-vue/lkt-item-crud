import { defineComponent as ne, useSlots as ie, ref as s, computed as d, watch as D, resolveComponent as w, openBlock as v, createElementBlock as h, createElementVNode as E, toDisplayString as j, renderSlot as q, createCommentVNode as g, withDirectives as O, createBlock as V, withCtx as G, unref as K, vShow as I, createVNode as Q } from "vue";
import { httpCall as se } from "lkt-http-client";
import { DataState as ce } from "lkt-data-state";
const N = class N {
};
N.debugEnabled = !1;
let U = N;
const n = (...u) => {
  U.debugEnabled && console.info("[LktItemCrud] ", ...u);
}, qe = (u = !0) => {
  U.debugEnabled = u;
}, ve = { class: "lkt-item-crud" }, fe = {
  key: 0,
  class: "lkt-item-crud_header"
}, pe = { class: "lkt-item-crud_header-title" }, me = { class: "lkt-item-crud_header-slot" }, ye = { class: "lkt-item-crud-buttons" }, he = { key: 1 }, be = { key: 1 }, Se = {
  key: 1,
  class: "lkt-item-crud_content"
}, ke = {
  key: 0,
  class: "lkt-grid-1"
}, De = { name: "LktItemCrud", inheritAttrs: !1 }, ge = /* @__PURE__ */ ne({
  ...De,
  props: {
    modelValue: { type: Object, required: !1, default: () => ({}) },
    title: { type: String, default: "" },
    editModeText: { type: String, default: "Edition Mode" },
    saveText: { type: String, default: "Save" },
    dropText: { type: String, default: "Delete" },
    hiddenSave: { type: Boolean, default: !1 },
    hiddenDrop: { type: Boolean, default: !1 },
    hiddenButtons: { type: Boolean, default: !1 },
    readResource: { type: String, required: !1 },
    createResource: { type: String, required: !1 },
    updateResource: { type: String, required: !1 },
    dropResource: { type: String, required: !1 },
    readData: { type: Object, required: !1, default: () => ({}) },
    createData: { type: Object, required: !1, default: () => ({}) },
    updateData: { type: Object, required: !1, default: () => ({}) },
    dropData: { type: Object, required: !1, default: () => ({}) },
    isCreate: { type: Boolean, default: !1 },
    createConfirm: { type: String, default: "" },
    updateConfirm: { type: String, default: "" },
    dropConfirm: { type: String, default: "" },
    createConfirmData: { type: Object, default: () => ({}) },
    updateConfirmData: { type: Object, default: () => ({}) },
    dropConfirmData: { type: Object, default: () => ({}) },
    createDisabled: { type: Boolean, default: !1 },
    updateDisabled: { type: Boolean, default: !1 },
    dropDisabled: { type: Boolean, default: !1 },
    saveValidator: { type: Function, required: !1, default: () => !0 },
    beforeEmitUpdate: { type: Function, required: !1, default: () => !0 },
    onCreate: { type: Function, required: !1, default: () => !0 },
    onUpdate: { type: Function, required: !1, default: () => !0 },
    insideModal: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:isCreate", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(u, { expose: T, emit: W }) {
    const e = u, L = ie(), i = W;
    let X = [];
    const o = s(!0), r = s(e.modelValue), b = s(X), f = s(!1), p = s(!1), m = s(!1), c = s(200), C = s(null), B = s(null), S = s(new ce(r.value)), l = s(e.isCreate), Y = d(() => l.value ? e.createConfirm : e.updateConfirm), Z = d(() => l.value ? e.createConfirmData : e.updateConfirmData), $ = d(() => l.value ? e.createResource : e.updateResource), ee = d(() => l.value ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), te = d(() => l.value ? e.createDisabled : e.updateDisabled), _ = d(() => !l.value && b.value.includes("update")), R = d(() => !l.value && b.value.includes("drop")), M = async () => {
      n("fetchItem"), o.value = !0, c.value = -1, m.value = !1;
      try {
        const t = await se(e.readResource, e.readData);
        if (n("fetchItem -> response", t), o.value = !1, c.value = t.httpStatus, !t.success) {
          p.value = !1, c.value = t.httpStatus, i("error", t.httpStatus);
          return;
        }
        p.value = !0, r.value = t.data, b.value = t.perms, S.value.increment(r.value).turnStoredIntoOriginal(), i("read", t);
      } catch {
        o.value = !1, p.value = !1, c.value = 404, i("error", 404);
        return;
      }
    }, ae = d(() => o.value ? !1 : e.title || !!L["post-title"]);
    D(() => e.modelValue, (t) => {
      r.value = t, S.value.increment(t);
    }, { deep: !0 }), D(r, (t) => {
      if (n("item updated ->", r.value), typeof e.beforeEmitUpdate == "function") {
        n("item updated -> has beforeEmitUpdate");
        let a = e.beforeEmitUpdate(r.value);
        n("item updated -> override with: ", a), typeof a == "object" && (r.value = a);
      }
      i("update:modelValue", r.value), n("item updated -> update dataState"), S.value.increment(t);
    }, { deep: !0 }), D(b, () => i("perms", b.value));
    const x = d(() => te.value || !l.value && !_.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : S.value.changed());
    D(x, (t) => i("modified-data", t)), D(l, (t) => i("update:isCreate", t)), e.readResource && !l.value ? M() : l.value && (p.value = !0, f.value = !0, o.value = !1);
    const le = (t, a) => {
      if (o.value = !1, c.value = a.httpStatus, !a.success) {
        m.value = !0, i("error", a.httpStatus);
        return;
      }
      m.value = !0, i("drop", a);
    }, ue = (t, a) => {
      if (n("onSave -> received response:", a), $.value) {
        if (o.value = !1, c.value = a.httpStatus, !a.success) {
          m.value = !0, i("error", a.httpStatus);
          return;
        }
        m.value = !0;
      }
      let k = l.value ? "create" : "update";
      l.value || (n("onSave -> turn stored data into original"), S.value.turnStoredIntoOriginal()), k === "create" ? typeof e.onCreate == "function" && (n("onSave -> trigger onCreate callback"), e.onCreate(a)) : typeof e.onUpdate == "function" && (n("onSave -> trigger onUpdate callback"), e.onUpdate(a)), !e.insideModal && a.autoReloadId && (n("onSave -> autoReloadId detected: ", a.autoReloadId), e.readData.id = a.autoReloadId, n("onSave -> turning off create mode"), l.value = !1, M()), i(k, a);
    }, F = () => {
      o.value = !0, c.value = -1;
    }, J = () => {
      o.value = !1;
    };
    T({
      doDrop: () => {
        B.value && typeof B.value.click == "function" && B.value.click();
      },
      doRefresh: M,
      doSave: () => {
        C.value && typeof C.value.click == "function" && C.value.click();
      }
    });
    const A = d(() => !e.hiddenDrop && !o.value && f.value && p.value), H = d(() => o.value ? !1 : l.value ? !0 : !e.hiddenSave && f.value && p.value), P = d(() => !o.value && !l.value && p.value && !(e.dropDisabled && e.updateDisabled)), oe = d(() => !e.hiddenButtons && (H.value || A.value || P.value));
    return (t, a) => {
      const k = w("lkt-button"), re = w("lkt-field-switch"), z = w("lkt-http-info"), de = w("lkt-loader");
      return v(), h("article", ve, [
        ae.value ? (v(), h("header", fe, [
          E("h1", pe, j(u.title), 1),
          E("div", me, [
            q(t.$slots, "post-title", {
              item: r.value,
              loading: o.value
            })
          ])
        ])) : g("", !0),
        O(E("div", ye, [
          l.value ? g("", !0) : O((v(), V(k, {
            key: 0,
            ref: (y) => B.value = y,
            palette: "danger",
            disabled: u.dropDisabled || !R.value,
            "confirm-modal": u.dropConfirm,
            "confirm-data": u.dropConfirmData,
            resource: u.dropResource,
            "resource-data": u.dropData,
            onLoading: F,
            onLoaded: J,
            onClick: le
          }, {
            default: G(() => [
              K(L)["button-drop"] ? q(t.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: f.value,
                isCreate: l.value,
                canUpdate: _.value,
                canDrop: R.value
              }) : (v(), h("span", he, j(u.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"])), [
            [I, A.value]
          ]),
          O(Q(k, {
            ref: (y) => C.value = y,
            palette: "success",
            disabled: !x.value,
            "confirm-modal": Y.value,
            "confirm-data": Z.value,
            resource: $.value,
            "resource-data": ee.value,
            onLoading: F,
            onLoaded: J,
            onClick: ue
          }, {
            default: G(() => [
              K(L)["button-save"] ? q(t.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: f.value,
                isCreate: l.value,
                canUpdate: _.value,
                canDrop: R.value
              }) : (v(), h("span", be, j(u.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"]), [
            [I, H.value]
          ]),
          O(Q(re, {
            modelValue: f.value,
            "onUpdate:modelValue": a[0] || (a[0] = (y) => f.value = y),
            label: u.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [I, P.value]
          ])
        ], 512), [
          [I, oe.value]
        ]),
        o.value ? g("", !0) : (v(), h("div", Se, [
          p.value ? (v(), h("div", ke, [
            m.value ? (v(), V(z, {
              key: 0,
              code: c.value,
              quick: "",
              palette: c.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: a[1] || (a[1] = (y) => m.value = !1)
            }, null, 8, ["code", "palette"])) : g("", !0),
            q(t.$slots, "item", {
              item: r.value,
              loading: o.value,
              editMode: f.value,
              isCreate: l.value,
              canUpdate: _.value,
              canDrop: R.value
            })
          ])) : (v(), V(z, {
            key: 1,
            code: c.value
          }, null, 8, ["code"]))
        ])),
        o.value ? (v(), V(de, { key: 2 })) : g("", !0)
      ]);
    };
  }
}), Oe = {
  install: (u, T = {}) => {
    u.component("lkt-item-crud") === void 0 && u.component("lkt-item-crud", ge);
  }
};
export {
  qe as debugLktItemCrud,
  Oe as default
};
