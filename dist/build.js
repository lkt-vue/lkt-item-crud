import { defineComponent as ne, useSlots as se, ref as s, computed as d, watch as D, resolveComponent as q, openBlock as c, createElementBlock as h, createElementVNode as E, toDisplayString as j, renderSlot as w, createCommentVNode as g, withDirectives as O, createBlock as V, withCtx as G, unref as K, vShow as I, createVNode as Q } from "vue";
import { httpCall as ie } from "lkt-http-client";
import { DataState as ce } from "lkt-data-state";
const N = class N {
};
N.debugEnabled = !1;
let U = N;
const p = (...u) => {
  U.debugEnabled && console.info("[LktItemCrud] ", ...u);
}, we = (u = !0) => {
  U.debugEnabled = u;
}, ve = { class: "lkt-item-crud" }, fe = {
  key: 0,
  class: "lkt-item-crud_header"
}, pe = { class: "lkt-item-crud_header-title" }, me = { class: "lkt-item-crud_header-slot" }, ye = { class: "lkt-item-crud-buttons" }, he = { key: 1 }, Se = { key: 1 }, be = {
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
    const e = u, L = se(), n = W;
    let X = [];
    const o = s(!0), r = s(e.modelValue), S = s(X), v = s(!1), f = s(!1), m = s(!1), i = s(200), C = s(null), B = s(null), b = s(new ce(r.value)), a = s(e.isCreate), Y = d(() => a.value ? e.createConfirm : e.updateConfirm), Z = d(() => a.value ? e.createConfirmData : e.updateConfirmData), $ = d(() => a.value ? e.createResource : e.updateResource), ee = d(() => a.value ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), te = d(() => a.value ? e.createDisabled : e.updateDisabled), _ = d(() => !a.value && S.value.includes("update")), R = d(() => !a.value && S.value.includes("drop")), M = async () => {
      p("fetchItem"), o.value = !0, i.value = -1, m.value = !1;
      try {
        const t = await ie(e.readResource, e.readData);
        if (p("fetchItem -> response", t), o.value = !1, i.value = t.httpStatus, !t.success) {
          f.value = !1, i.value = t.httpStatus, n("error", t.httpStatus);
          return;
        }
        f.value = !0, r.value = t.data, S.value = t.perms, b.value.increment(r.value).turnStoredIntoOriginal(), n("read", t);
      } catch {
        o.value = !1, f.value = !1, i.value = 404, n("error", 404);
        return;
      }
    }, ae = d(() => o.value ? !1 : e.title || !!L["post-title"]);
    D(() => e.modelValue, (t) => {
      r.value = t, b.value.increment(t);
    }, { deep: !0 }), D(r, (t) => {
      typeof e.beforeEmitUpdate == "function" && e.beforeEmitUpdate(r.value), n("update:modelValue", r.value), b.value.increment(t);
    }, { deep: !0 }), D(S, () => n("perms", S.value));
    const x = d(() => te.value || !a.value && !_.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : b.value.changed());
    D(x, (t) => n("modified-data", t)), D(a, (t) => n("update:isCreate", t)), e.readResource && !a.value ? M() : a.value && (f.value = !0, v.value = !0, o.value = !1);
    const le = (t, l) => {
      if (o.value = !1, i.value = l.httpStatus, !l.success) {
        m.value = !0, n("error", l.httpStatus);
        return;
      }
      m.value = !0, n("drop", l);
    }, ue = (t, l) => {
      if (p("onSave -> received response:", l), $.value) {
        if (o.value = !1, i.value = l.httpStatus, !l.success) {
          m.value = !0, n("error", l.httpStatus);
          return;
        }
        m.value = !0;
      }
      let k = a.value ? "create" : "update";
      a.value || (p("onSave -> turn stored data into original"), b.value.turnStoredIntoOriginal()), k === "create" ? typeof e.onCreate == "function" && (p("onSave -> trigger onCreate callback"), e.onCreate(l)) : typeof e.onUpdate == "function" && (p("onSave -> trigger onUpdate callback"), e.onUpdate(l)), !e.insideModal && l.autoReloadId && (p("onSave -> autoReloadId detected: ", l.autoReloadId), e.readData.id = l.autoReloadId, p("onSave -> turning off create mode"), a.value = !1, M()), n(k, l);
    }, F = () => {
      o.value = !0, i.value = -1;
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
    const A = d(() => !e.hiddenDrop && !o.value && v.value && f.value), H = d(() => o.value ? !1 : a.value ? !0 : !e.hiddenSave && v.value && f.value), P = d(() => !o.value && !a.value && f.value && !(e.dropDisabled && e.updateDisabled)), oe = d(() => !e.hiddenButtons && (H.value || A.value || P.value));
    return (t, l) => {
      const k = q("lkt-button"), re = q("lkt-field-switch"), z = q("lkt-http-info"), de = q("lkt-loader");
      return c(), h("article", ve, [
        ae.value ? (c(), h("header", fe, [
          E("h1", pe, j(u.title), 1),
          E("div", me, [
            w(t.$slots, "post-title", {
              item: r.value,
              loading: o.value
            })
          ])
        ])) : g("", !0),
        O(E("div", ye, [
          a.value ? g("", !0) : O((c(), V(k, {
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
              K(L)["button-drop"] ? w(t.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: v.value,
                isCreate: a.value,
                canUpdate: _.value,
                canDrop: R.value
              }) : (c(), h("span", he, j(u.dropText), 1))
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
              K(L)["button-save"] ? w(t.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: v.value,
                isCreate: a.value,
                canUpdate: _.value,
                canDrop: R.value
              }) : (c(), h("span", Se, j(u.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"]), [
            [I, H.value]
          ]),
          O(Q(re, {
            modelValue: v.value,
            "onUpdate:modelValue": l[0] || (l[0] = (y) => v.value = y),
            label: u.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [I, P.value]
          ])
        ], 512), [
          [I, oe.value]
        ]),
        o.value ? g("", !0) : (c(), h("div", be, [
          f.value ? (c(), h("div", ke, [
            m.value ? (c(), V(z, {
              key: 0,
              code: i.value,
              quick: "",
              palette: i.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: l[1] || (l[1] = (y) => m.value = !1)
            }, null, 8, ["code", "palette"])) : g("", !0),
            w(t.$slots, "item", {
              item: r.value,
              loading: o.value,
              editMode: v.value,
              isCreate: a.value,
              canUpdate: _.value,
              canDrop: R.value
            })
          ])) : (c(), V(z, {
            key: 1,
            code: i.value
          }, null, 8, ["code"]))
        ])),
        o.value ? (c(), V(de, { key: 2 })) : g("", !0)
      ]);
    };
  }
}), Oe = {
  install: (u, T = {}) => {
    u.component("lkt-item-crud") === void 0 && u.component("lkt-item-crud", ge);
  }
};
export {
  we as debugLktItemCrud,
  Oe as default
};
