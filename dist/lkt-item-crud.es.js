import { defineComponent as X, useSlots as Y, ref as d, computed as p, watch as b, resolveComponent as g, openBlock as i, createElementBlock as m, createElementVNode as L, toDisplayString as w, renderSlot as D, createCommentVNode as k, withDirectives as _, createBlock as R, withCtx as x, unref as j, vShow as V, createVNode as J } from "vue";
import { httpCall as Z } from "lkt-http-client";
import { DataState as ee } from "lkt-data-state";
const te = { class: "lkt-item-crud" }, ae = {
  key: 0,
  class: "lkt-item-crud_header"
}, le = { class: "lkt-item-crud_header-title" }, ue = { class: "lkt-item-crud_header-slot" }, re = { class: "lkt-item-crud-buttons" }, oe = { key: 1 }, se = { key: 1 }, de = {
  key: 1,
  class: "lkt-item-crud_content"
}, ie = {
  key: 0,
  class: "lkt-grid-1"
}, ne = { name: "LktItemCrud", inheritAttrs: !1 }, ce = /* @__PURE__ */ X({
  ...ne,
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
  setup(u, { expose: I, emit: E }) {
    const e = u, q = Y(), o = E;
    let A = [];
    const a = d(!0), r = d(e.modelValue), B = d(A), c = d(!1), n = d(!1), v = d(!1), s = d(200), S = d(null), h = d(null), y = d(new ee(r.value)), F = p(() => e.isCreate ? e.createConfirm : e.updateConfirm), H = p(() => e.isCreate ? e.createResource : e.updateResource), P = p(() => e.isCreate ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), U = p(() => e.isCreate ? e.createDisabled : e.updateDisabled), O = async () => {
      a.value = !0, s.value = -1, v.value = !1;
      try {
        const t = await Z(e.readResource, e.readData);
        if (a.value = !1, s.value = t.httpStatus, !t.success) {
          n.value = !1, s.value = t.httpStatus, o("error", t.httpStatus);
          return;
        }
        n.value = !0, r.value = t.data, B.value = t.perms, y.value.increment(r.value).turnStoredIntoOriginal(), o("read", t);
      } catch {
        a.value = !1, n.value = !1, s.value = 404, o("error", 404);
        return;
      }
    }, z = p(() => a.value ? !1 : e.title || !!q["post-title"]);
    b(() => e.modelValue, (t) => {
      r.value = t, y.value.increment(t);
    }, { deep: !0 }), b(r, (t) => {
      o("update:modelValue", r.value), y.value.increment(t);
    }, { deep: !0 }), b(B, () => o("perms", B.value));
    const M = p(() => U.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : y.value.changed());
    b(M, (t) => o("modified-data", t)), e.readResource && !e.isCreate ? O() : e.isCreate && (n.value = !0, c.value = !0, a.value = !1);
    const G = (t, l) => {
      if (a.value = !1, s.value = l.httpStatus, !l.success) {
        v.value = !0, o("error", l.httpStatus);
        return;
      }
      v.value = !0, o("drop", l);
    }, K = (t, l) => {
      if (a.value = !1, s.value = l.httpStatus, !l.success) {
        v.value = !0, o("error", l.httpStatus);
        return;
      }
      v.value = !0;
      let C = e.isCreate ? "create" : "update";
      e.isCreate || y.value.turnStoredIntoOriginal(), l.autoReloadId && (e.readData.id = l.autoReloadId, O()), o(C, l);
    }, N = () => {
      a.value = !0, s.value = -1;
    }, T = () => {
      a.value = !1;
    };
    return I({
      doDrop: () => {
        h.value && typeof h.value.click == "function" && h.value.click();
      },
      doRefresh: O,
      doSave: () => {
        S.value && typeof S.value.click == "function" && S.value.click();
      }
    }), (t, l) => {
      const C = g("lkt-button"), Q = g("lkt-field-switch"), $ = g("lkt-http-info"), W = g("lkt-loader");
      return i(), m("article", te, [
        z.value ? (i(), m("header", ae, [
          L("h1", le, w(u.title), 1),
          L("div", ue, [
            D(t.$slots, "post-title", {
              item: r.value,
              loading: a.value
            })
          ])
        ])) : k("", !0),
        _(L("div", re, [
          u.isCreate ? k("", !0) : _((i(), R(C, {
            key: 0,
            ref: (f) => h.value = f,
            palette: "danger",
            disabled: u.dropDisabled,
            "confirm-modal": u.dropConfirm,
            resource: u.dropResource,
            "resource-data": u.dropData,
            onLoading: N,
            onLoaded: T,
            onClick: G
          }, {
            default: x(() => [
              j(q)["button-drop"] ? D(t.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: c.value
              }) : (i(), m("span", oe, w(u.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"])), [
            [V, !a.value && c.value && n.value]
          ]),
          _(J(C, {
            ref: (f) => S.value = f,
            palette: "success",
            disabled: !M.value,
            "confirm-modal": F.value,
            resource: H.value,
            "resource-data": P.value,
            onLoading: N,
            onLoaded: T,
            onClick: K
          }, {
            default: x(() => [
              j(q)["button-save"] ? D(t.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: c.value
              }) : (i(), m("span", se, w(u.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [V, !a.value && c.value && n.value]
          ]),
          _(J(Q, {
            modelValue: c.value,
            "onUpdate:modelValue": l[0] || (l[0] = (f) => c.value = f),
            label: u.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [V, !a.value && n.value && !u.isCreate]
          ])
        ], 512), [
          [V, n.value]
        ]),
        a.value ? k("", !0) : (i(), m("div", de, [
          n.value ? (i(), m("div", ie, [
            v.value ? (i(), R($, {
              key: 0,
              code: s.value,
              quick: "",
              palette: s.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: l[1] || (l[1] = (f) => v.value = !1)
            }, null, 8, ["code", "palette"])) : k("", !0),
            D(t.$slots, "item", {
              item: r.value,
              loading: a.value,
              editMode: c.value
            })
          ])) : (i(), R($, {
            key: 1,
            code: s.value
          }, null, 8, ["code"]))
        ])),
        a.value ? (i(), R(W, { key: 2 })) : k("", !0)
      ]);
    };
  }
});
const ke = {
  install: (u, I = {}) => {
    u.component("LktItemCrud", ce);
  }
};
export {
  ke as default
};
