import { defineComponent as le, useSlots as ue, ref as n, computed as o, watch as B, resolveComponent as w, openBlock as i, createElementBlock as m, createElementVNode as M, toDisplayString as I, renderSlot as R, createCommentVNode as S, withDirectives as V, createBlock as _, withCtx as F, unref as H, vShow as q, createVNode as P } from "vue";
import { httpCall as re } from "lkt-http-client";
import { DataState as oe } from "lkt-data-state";
const se = { class: "lkt-item-crud" }, de = {
  key: 0,
  class: "lkt-item-crud_header"
}, ne = { class: "lkt-item-crud_header-title" }, ie = { class: "lkt-item-crud_header-slot" }, ce = { class: "lkt-item-crud-buttons" }, ve = { key: 1 }, fe = { key: 1 }, pe = {
  key: 1,
  class: "lkt-item-crud_content"
}, me = {
  key: 0,
  class: "lkt-grid-1"
}, he = { name: "LktItemCrud", inheritAttrs: !1 }, ye = /* @__PURE__ */ le({
  ...he,
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
    createDisabled: { type: Boolean, default: !1 },
    updateDisabled: { type: Boolean, default: !1 },
    dropDisabled: { type: Boolean, default: !1 },
    saveValidator: { type: Function, required: !1, default: () => !0 }
  },
  emits: ["update:modelValue", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(a, { expose: N, emit: z }) {
    const e = a, O = ue(), s = z;
    let G = [];
    const l = n(!0), r = n(e.modelValue), h = n(G), c = n(!1), v = n(!1), f = n(!1), d = n(200), k = n(null), C = n(null), y = n(new oe(r.value)), K = o(() => e.isCreate ? e.createConfirm : e.updateConfirm), T = o(() => e.isCreate ? e.createResource : e.updateResource), Q = o(() => e.isCreate ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), W = o(() => e.isCreate ? e.createDisabled : e.updateDisabled), D = o(() => !e.isCreate && h.value.includes("update")), b = o(() => !e.isCreate && h.value.includes("drop")), L = async () => {
      l.value = !0, d.value = -1, f.value = !1;
      try {
        const t = await re(e.readResource, e.readData);
        if (l.value = !1, d.value = t.httpStatus, !t.success) {
          v.value = !1, d.value = t.httpStatus, s("error", t.httpStatus);
          return;
        }
        v.value = !0, r.value = t.data, h.value = t.perms, y.value.increment(r.value).turnStoredIntoOriginal(), s("read", t);
      } catch {
        l.value = !1, v.value = !1, d.value = 404, s("error", 404);
        return;
      }
    }, X = o(() => l.value ? !1 : e.title || !!O["post-title"]);
    B(() => e.modelValue, (t) => {
      r.value = t, y.value.increment(t);
    }, { deep: !0 }), B(r, (t) => {
      s("update:modelValue", r.value), y.value.increment(t);
    }, { deep: !0 }), B(h, () => s("perms", h.value));
    const $ = o(() => W.value || !e.isCreate && !D.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : y.value.changed());
    B($, (t) => s("modified-data", t)), e.readResource && !e.isCreate ? L() : e.isCreate && (v.value = !0, c.value = !0, l.value = !1);
    const Y = (t, u) => {
      if (l.value = !1, d.value = u.httpStatus, !u.success) {
        f.value = !0, s("error", u.httpStatus);
        return;
      }
      f.value = !0, s("drop", u);
    }, Z = (t, u) => {
      if (T.value) {
        if (l.value = !1, d.value = u.httpStatus, !u.success) {
          f.value = !0, s("error", u.httpStatus);
          return;
        }
        f.value = !0;
      }
      let g = e.isCreate ? "create" : "update";
      e.isCreate || y.value.turnStoredIntoOriginal(), u.autoReloadId && (e.readData.id = u.autoReloadId, L()), s(g, u);
    }, x = () => {
      l.value = !0, d.value = -1;
    }, j = () => {
      l.value = !1;
    };
    N({
      doDrop: () => {
        C.value && typeof C.value.click == "function" && C.value.click();
      },
      doRefresh: L,
      doSave: () => {
        k.value && typeof k.value.click == "function" && k.value.click();
      }
    });
    const U = o(() => !e.hiddenDrop && !l.value && c.value && v.value), J = o(() => l.value ? !1 : e.isCreate ? !0 : !e.hiddenSave && c.value && v.value), E = o(() => !l.value && !e.isCreate && v.value), ee = o(() => !e.hiddenButtons && (J.value || U.value || E.value));
    return (t, u) => {
      const g = w("lkt-button"), te = w("lkt-field-switch"), A = w("lkt-http-info"), ae = w("lkt-loader");
      return i(), m("article", se, [
        X.value ? (i(), m("header", de, [
          M("h1", ne, I(a.title), 1),
          M("div", ie, [
            R(t.$slots, "post-title", {
              item: r.value,
              loading: l.value
            })
          ])
        ])) : S("", !0),
        V(M("div", ce, [
          a.isCreate ? S("", !0) : V((i(), _(g, {
            key: 0,
            ref: (p) => C.value = p,
            palette: "danger",
            disabled: a.dropDisabled || !b.value,
            "confirm-modal": a.dropConfirm,
            resource: a.dropResource,
            "resource-data": a.dropData,
            onLoading: x,
            onLoaded: j,
            onClick: Y
          }, {
            default: F(() => [
              H(O)["button-drop"] ? R(t.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: a.isCreate,
                canUpdate: D.value,
                canDrop: b.value
              }) : (i(), m("span", ve, I(a.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"])), [
            [q, U.value]
          ]),
          V(P(g, {
            ref: (p) => k.value = p,
            palette: "success",
            disabled: !$.value,
            "confirm-modal": K.value,
            resource: T.value,
            "resource-data": Q.value,
            onLoading: x,
            onLoaded: j,
            onClick: Z
          }, {
            default: F(() => [
              H(O)["button-save"] ? R(t.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: a.isCreate,
                canUpdate: D.value,
                canDrop: b.value
              }) : (i(), m("span", fe, I(a.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [q, J.value]
          ]),
          V(P(te, {
            modelValue: c.value,
            "onUpdate:modelValue": u[0] || (u[0] = (p) => c.value = p),
            label: a.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [q, E.value]
          ])
        ], 512), [
          [q, ee.value]
        ]),
        l.value ? S("", !0) : (i(), m("div", pe, [
          v.value ? (i(), m("div", me, [
            f.value ? (i(), _(A, {
              key: 0,
              code: d.value,
              quick: "",
              palette: d.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: u[1] || (u[1] = (p) => f.value = !1)
            }, null, 8, ["code", "palette"])) : S("", !0),
            R(t.$slots, "item", {
              item: r.value,
              loading: l.value,
              editMode: c.value,
              isCreate: a.isCreate,
              canUpdate: D.value,
              canDrop: b.value
            })
          ])) : (i(), _(A, {
            key: 1,
            code: d.value
          }, null, 8, ["code"]))
        ])),
        l.value ? (i(), _(ae, { key: 2 })) : S("", !0)
      ]);
    };
  }
}), ge = {
  install: (a, N = {}) => {
    a.component("lkt-item-crud") === void 0 && a.component("lkt-item-crud", ye);
  }
};
export {
  ge as default
};
