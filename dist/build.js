import { defineComponent as oe, useSlots as re, ref as s, computed as d, watch as k, resolveComponent as w, openBlock as c, createElementBlock as y, createElementVNode as j, toDisplayString as U, renderSlot as O, createCommentVNode as D, withDirectives as R, createBlock as V, withCtx as H, unref as P, vShow as q, createVNode as z } from "vue";
import { httpCall as de } from "lkt-http-client";
import { DataState as ne } from "lkt-data-state";
const se = { class: "lkt-item-crud" }, ie = {
  key: 0,
  class: "lkt-item-crud_header"
}, ce = { class: "lkt-item-crud_header-title" }, ve = { class: "lkt-item-crud_header-slot" }, fe = { class: "lkt-item-crud-buttons" }, pe = { key: 1 }, me = { key: 1 }, ye = {
  key: 1,
  class: "lkt-item-crud_content"
}, he = {
  key: 0,
  class: "lkt-grid-1"
}, Se = { name: "LktItemCrud", inheritAttrs: !1 }, ke = /* @__PURE__ */ oe({
  ...Se,
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
    onCreate: { type: Function, required: !1, default: () => !0 },
    onUpdate: { type: Function, required: !1, default: () => !0 }
  },
  emits: ["update:modelValue", "update:isCreate", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(o, { expose: I, emit: G }) {
    const e = o, L = re(), n = G;
    let K = [];
    const l = s(!0), r = s(e.modelValue), h = s(K), v = s(!1), f = s(!1), p = s(!1), i = s(200), C = s(null), b = s(null), S = s(new ne(r.value)), a = s(a.value), Q = d(() => a.value ? e.createConfirm : e.updateConfirm), W = d(() => a.value ? e.createConfirmData : e.updateConfirmData), N = d(() => a.value ? e.createResource : e.updateResource), X = d(() => a.value ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), Y = d(() => a.value ? e.createDisabled : e.updateDisabled), g = d(() => !a.value && h.value.includes("update")), B = d(() => !a.value && h.value.includes("drop")), M = async () => {
      l.value = !0, i.value = -1, p.value = !1;
      try {
        const t = await de(e.readResource, e.readData);
        if (l.value = !1, i.value = t.httpStatus, !t.success) {
          f.value = !1, i.value = t.httpStatus, n("error", t.httpStatus);
          return;
        }
        f.value = !0, r.value = t.data, h.value = t.perms, S.value.increment(r.value).turnStoredIntoOriginal(), n("read", t);
      } catch {
        l.value = !1, f.value = !1, i.value = 404, n("error", 404);
        return;
      }
    }, Z = d(() => l.value ? !1 : e.title || !!L["post-title"]);
    k(() => e.modelValue, (t) => {
      r.value = t, S.value.increment(t);
    }, { deep: !0 }), k(r, (t) => {
      n("update:modelValue", r.value), S.value.increment(t);
    }, { deep: !0 }), k(h, () => n("perms", h.value));
    const T = d(() => Y.value || !a.value && !g.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : S.value.changed());
    k(T, (t) => n("modified-data", t)), k(a, (t) => n("update:isCreate", t)), e.readResource && !a.value ? M() : a.value && (f.value = !0, v.value = !0, l.value = !1);
    const ee = (t, u) => {
      if (l.value = !1, i.value = u.httpStatus, !u.success) {
        p.value = !0, n("error", u.httpStatus);
        return;
      }
      p.value = !0, n("drop", u);
    }, te = (t, u) => {
      if (N.value) {
        if (l.value = !1, i.value = u.httpStatus, !u.success) {
          p.value = !0, n("error", u.httpStatus);
          return;
        }
        p.value = !0;
      }
      let _ = a.value ? "create" : "update";
      a.value || S.value.turnStoredIntoOriginal(), u.autoReloadId && (e.readData.id = u.autoReloadId, a.value = !1, M()), a.value ? typeof e.onCreate == "function" && e.onCreate() : typeof e.onUpdate == "function" && e.onUpdate(), n(_, u);
    }, $ = () => {
      l.value = !0, i.value = -1;
    }, x = () => {
      l.value = !1;
    };
    I({
      doDrop: () => {
        b.value && typeof b.value.click == "function" && b.value.click();
      },
      doRefresh: M,
      doSave: () => {
        C.value && typeof C.value.click == "function" && C.value.click();
      }
    });
    const J = d(() => !e.hiddenDrop && !l.value && v.value && f.value), E = d(() => l.value ? !1 : a.value ? !0 : !e.hiddenSave && v.value && f.value), F = d(() => !l.value && !a.value && f.value), ae = d(() => !e.hiddenButtons && (E.value || J.value || F.value));
    return (t, u) => {
      const _ = w("lkt-button"), le = w("lkt-field-switch"), A = w("lkt-http-info"), ue = w("lkt-loader");
      return c(), y("article", se, [
        Z.value ? (c(), y("header", ie, [
          j("h1", ce, U(o.title), 1),
          j("div", ve, [
            O(t.$slots, "post-title", {
              item: r.value,
              loading: l.value
            })
          ])
        ])) : D("", !0),
        R(j("div", fe, [
          a.value ? D("", !0) : R((c(), V(_, {
            key: 0,
            ref: (m) => b.value = m,
            palette: "danger",
            disabled: o.dropDisabled || !B.value,
            "confirm-modal": o.dropConfirm,
            "confirm-data": o.dropConfirmData,
            resource: o.dropResource,
            "resource-data": o.dropData,
            onLoading: $,
            onLoaded: x,
            onClick: ee
          }, {
            default: H(() => [
              P(L)["button-drop"] ? O(t.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: v.value,
                isCreate: a.value,
                canUpdate: g.value,
                canDrop: B.value
              }) : (c(), y("span", pe, U(o.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"])), [
            [q, J.value]
          ]),
          R(z(_, {
            ref: (m) => C.value = m,
            palette: "success",
            disabled: !T.value,
            "confirm-modal": Q.value,
            "confirm-data": W.value,
            resource: N.value,
            "resource-data": X.value,
            onLoading: $,
            onLoaded: x,
            onClick: te
          }, {
            default: H(() => [
              P(L)["button-save"] ? O(t.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: v.value,
                isCreate: a.value,
                canUpdate: g.value,
                canDrop: B.value
              }) : (c(), y("span", me, U(o.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "confirm-data", "resource", "resource-data"]), [
            [q, E.value]
          ]),
          R(z(le, {
            modelValue: v.value,
            "onUpdate:modelValue": u[0] || (u[0] = (m) => v.value = m),
            label: o.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [q, F.value]
          ])
        ], 512), [
          [q, ae.value]
        ]),
        l.value ? D("", !0) : (c(), y("div", ye, [
          f.value ? (c(), y("div", he, [
            p.value ? (c(), V(A, {
              key: 0,
              code: i.value,
              quick: "",
              palette: i.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: u[1] || (u[1] = (m) => p.value = !1)
            }, null, 8, ["code", "palette"])) : D("", !0),
            O(t.$slots, "item", {
              item: r.value,
              loading: l.value,
              editMode: v.value,
              isCreate: a.value,
              canUpdate: g.value,
              canDrop: B.value
            })
          ])) : (c(), V(A, {
            key: 1,
            code: i.value
          }, null, 8, ["code"]))
        ])),
        l.value ? (c(), V(ue, { key: 2 })) : D("", !0)
      ]);
    };
  }
}), _e = {
  install: (o, I = {}) => {
    o.component("lkt-item-crud") === void 0 && o.component("lkt-item-crud", ke);
  }
};
export {
  _e as default
};
