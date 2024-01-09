import { defineComponent as Z, useSlots as ee, ref as d, computed as v, watch as R, resolveComponent as V, openBlock as i, createElementBlock as m, createElementVNode as I, toDisplayString as M, renderSlot as _, createCommentVNode as C, withDirectives as q, createBlock as B, withCtx as U, unref as J, vShow as O, createVNode as E } from "vue";
import { httpCall as te } from "lkt-http-client";
import { DataState as ae } from "lkt-data-state";
const le = { class: "lkt-item-crud" }, ue = {
  key: 0,
  class: "lkt-item-crud_header"
}, re = { class: "lkt-item-crud_header-title" }, oe = { class: "lkt-item-crud_header-slot" }, se = { class: "lkt-item-crud-buttons" }, de = { key: 1 }, ie = { key: 1 }, ne = {
  key: 1,
  class: "lkt-item-crud_content"
}, ce = {
  key: 0,
  class: "lkt-grid-1"
}, ve = { name: "LktItemCrud", inheritAttrs: !1 }, fe = /* @__PURE__ */ Z({
  ...ve,
  props: {
    modelValue: { type: Object, required: !1, default: () => ({}) },
    title: { type: String, default: "" },
    editModeText: { type: String, default: "Edition Mode" },
    saveText: { type: String, default: "Save" },
    dropText: { type: String, default: "Delete" },
    readResource: { type: String, required: !0 },
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
    createDisabled: { type: Boolean, default: !1 },
    updateDisabled: { type: Boolean, default: !1 },
    dropDisabled: { type: Boolean, default: !1 },
    saveValidator: { type: Function, required: !1, default: () => !0 }
  },
  emits: ["update:modelValue", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(a, { expose: N, emit: A }) {
    const e = a, L = ee(), o = A;
    let F = [];
    const l = d(!0), r = d(e.modelValue), y = d(F), c = d(!1), n = d(!1), f = d(!1), s = d(200), S = d(null), h = d(null), k = d(new ae(r.value)), H = v(() => e.isCreate ? e.createConfirm : e.updateConfirm), P = v(() => e.isCreate ? e.createResource : e.updateResource), z = v(() => e.isCreate ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), G = v(() => e.isCreate ? e.createDisabled : e.updateDisabled), D = v(() => !e.isCreate && y.value.includes("update")), b = v(() => !e.isCreate && y.value.includes("drop")), w = async () => {
      l.value = !0, s.value = -1, f.value = !1;
      try {
        const t = await te(e.readResource, e.readData);
        if (l.value = !1, s.value = t.httpStatus, !t.success) {
          n.value = !1, s.value = t.httpStatus, o("error", t.httpStatus);
          return;
        }
        n.value = !0, r.value = t.data, y.value = t.perms, k.value.increment(r.value).turnStoredIntoOriginal(), o("read", t);
      } catch {
        l.value = !1, n.value = !1, s.value = 404, o("error", 404);
        return;
      }
    }, K = v(() => l.value ? !1 : e.title || !!L["post-title"]);
    R(() => e.modelValue, (t) => {
      r.value = t, k.value.increment(t);
    }, { deep: !0 }), R(r, (t) => {
      o("update:modelValue", r.value), k.value.increment(t);
    }, { deep: !0 }), R(y, () => o("perms", y.value));
    const T = v(() => G.value || !e.isCreate && !D.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : k.value.changed());
    R(T, (t) => o("modified-data", t)), e.readResource && !e.isCreate ? w() : e.isCreate && (n.value = !0, c.value = !0, l.value = !1);
    const Q = (t, u) => {
      if (l.value = !1, s.value = u.httpStatus, !u.success) {
        f.value = !0, o("error", u.httpStatus);
        return;
      }
      f.value = !0, o("drop", u);
    }, W = (t, u) => {
      if (l.value = !1, s.value = u.httpStatus, !u.success) {
        f.value = !0, o("error", u.httpStatus);
        return;
      }
      f.value = !0;
      let g = e.isCreate ? "create" : "update";
      e.isCreate || k.value.turnStoredIntoOriginal(), u.autoReloadId && (e.readData.id = u.autoReloadId, w()), o(g, u);
    }, $ = () => {
      l.value = !0, s.value = -1;
    }, x = () => {
      l.value = !1;
    };
    return N({
      doDrop: () => {
        h.value && typeof h.value.click == "function" && h.value.click();
      },
      doRefresh: w,
      doSave: () => {
        S.value && typeof S.value.click == "function" && S.value.click();
      }
    }), (t, u) => {
      const g = V("lkt-button"), X = V("lkt-field-switch"), j = V("lkt-http-info"), Y = V("lkt-loader");
      return i(), m("article", le, [
        K.value ? (i(), m("header", ue, [
          I("h1", re, M(a.title), 1),
          I("div", oe, [
            _(t.$slots, "post-title", {
              item: r.value,
              loading: l.value
            })
          ])
        ])) : C("", !0),
        q(I("div", se, [
          a.isCreate ? C("", !0) : q((i(), B(g, {
            key: 0,
            ref: (p) => h.value = p,
            palette: "danger",
            disabled: a.dropDisabled || !b.value,
            "confirm-modal": a.dropConfirm,
            resource: a.dropResource,
            "resource-data": a.dropData,
            onLoading: $,
            onLoaded: x,
            onClick: Q
          }, {
            default: U(() => [
              J(L)["button-drop"] ? _(t.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: a.isCreate,
                canUpdate: D.value,
                canDrop: b.value
              }) : (i(), m("span", de, M(a.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"])), [
            [O, !l.value && c.value && n.value]
          ]),
          q(E(g, {
            ref: (p) => S.value = p,
            palette: "success",
            disabled: !T.value,
            "confirm-modal": H.value,
            resource: P.value,
            "resource-data": z.value,
            onLoading: $,
            onLoaded: x,
            onClick: W
          }, {
            default: U(() => [
              J(L)["button-save"] ? _(t.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: a.isCreate,
                canUpdate: D.value,
                canDrop: b.value
              }) : (i(), m("span", ie, M(a.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [O, !l.value && c.value && n.value]
          ]),
          q(E(X, {
            modelValue: c.value,
            "onUpdate:modelValue": u[0] || (u[0] = (p) => c.value = p),
            label: a.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [O, !l.value && n.value && !a.isCreate]
          ])
        ], 512), [
          [O, n.value]
        ]),
        l.value ? C("", !0) : (i(), m("div", ne, [
          n.value ? (i(), m("div", ce, [
            f.value ? (i(), B(j, {
              key: 0,
              code: s.value,
              quick: "",
              palette: s.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: u[1] || (u[1] = (p) => f.value = !1)
            }, null, 8, ["code", "palette"])) : C("", !0),
            _(t.$slots, "item", {
              item: r.value,
              loading: l.value,
              editMode: c.value,
              isCreate: a.isCreate,
              canUpdate: D.value,
              canDrop: b.value
            })
          ])) : (i(), B(j, {
            key: 1,
            code: s.value
          }, null, 8, ["code"]))
        ])),
        l.value ? (i(), B(Y, { key: 2 })) : C("", !0)
      ]);
    };
  }
});
const Se = {
  install: (a, N = {}) => {
    a.component("LktItemCrud", fe);
  }
};
export {
  Se as default
};
