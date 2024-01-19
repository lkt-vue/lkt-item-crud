import { defineComponent as le, useSlots as ue, ref as n, computed as r, watch as B, resolveComponent as w, openBlock as i, createElementBlock as m, createElementVNode as I, toDisplayString as M, renderSlot as R, createCommentVNode as y, withDirectives as V, createBlock as _, withCtx as A, unref as F, vShow as L, createVNode as P } from "vue";
import { httpCall as oe } from "lkt-http-client";
import { DataState as re } from "lkt-data-state";
import de from "lkt-button";
import se from "lkt-http-info";
import ne from "lkt-loader";
const ie = { class: "lkt-item-crud" }, ce = {
  key: 0,
  class: "lkt-item-crud_header"
}, ve = { class: "lkt-item-crud_header-title" }, fe = { class: "lkt-item-crud_header-slot" }, pe = { class: "lkt-item-crud-buttons" }, me = { key: 1 }, he = { key: 1 }, ke = {
  key: 1,
  class: "lkt-item-crud_content"
}, ye = {
  key: 0,
  class: "lkt-grid-1"
}, Se = { name: "LktItemCrud", inheritAttrs: !1 }, Ce = /* @__PURE__ */ le({
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
    createDisabled: { type: Boolean, default: !1 },
    updateDisabled: { type: Boolean, default: !1 },
    dropDisabled: { type: Boolean, default: !1 },
    saveValidator: { type: Function, required: !1, default: () => !0 }
  },
  emits: ["update:modelValue", "read", "create", "update", "drop", "perms", "error", "modified-data"],
  setup(t, { expose: N, emit: z }) {
    const e = t, q = ue(), d = z;
    let G = [];
    const l = n(!0), o = n(e.modelValue), h = n(G), c = n(!1), v = n(!1), f = n(!1), s = n(200), S = n(null), C = n(null), k = n(new re(o.value)), K = r(() => e.isCreate ? e.createConfirm : e.updateConfirm), T = r(() => e.isCreate ? e.createResource : e.updateResource), Q = r(() => e.isCreate ? { ...e.createData, ...JSON.parse(JSON.stringify(o.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(o.value)) }), W = r(() => e.isCreate ? e.createDisabled : e.updateDisabled), D = r(() => !e.isCreate && h.value.includes("update")), b = r(() => !e.isCreate && h.value.includes("drop")), O = async () => {
      l.value = !0, s.value = -1, f.value = !1;
      try {
        const a = await oe(e.readResource, e.readData);
        if (l.value = !1, s.value = a.httpStatus, !a.success) {
          v.value = !1, s.value = a.httpStatus, d("error", a.httpStatus);
          return;
        }
        v.value = !0, o.value = a.data, h.value = a.perms, k.value.increment(o.value).turnStoredIntoOriginal(), d("read", a);
      } catch {
        l.value = !1, v.value = !1, s.value = 404, d("error", 404);
        return;
      }
    }, X = r(() => l.value ? !1 : e.title || !!q["post-title"]);
    B(() => e.modelValue, (a) => {
      o.value = a, k.value.increment(a);
    }, { deep: !0 }), B(o, (a) => {
      d("update:modelValue", o.value), k.value.increment(a);
    }, { deep: !0 }), B(h, () => d("perms", h.value));
    const $ = r(() => W.value || !e.isCreate && !D.value || typeof e.saveValidator == "function" && !e.saveValidator(o.value) ? !1 : k.value.changed());
    B($, (a) => d("modified-data", a)), e.readResource && !e.isCreate ? O() : e.isCreate && (v.value = !0, c.value = !0, l.value = !1);
    const Y = (a, u) => {
      if (l.value = !1, s.value = u.httpStatus, !u.success) {
        f.value = !0, d("error", u.httpStatus);
        return;
      }
      f.value = !0, d("drop", u);
    }, Z = (a, u) => {
      if (T.value) {
        if (l.value = !1, s.value = u.httpStatus, !u.success) {
          f.value = !0, d("error", u.httpStatus);
          return;
        }
        f.value = !0;
      }
      let g = e.isCreate ? "create" : "update";
      e.isCreate || k.value.turnStoredIntoOriginal(), u.autoReloadId && (e.readData.id = u.autoReloadId, O()), d(g, u);
    }, x = () => {
      l.value = !0, s.value = -1;
    }, j = () => {
      l.value = !1;
    };
    N({
      doDrop: () => {
        C.value && typeof C.value.click == "function" && C.value.click();
      },
      doRefresh: O,
      doSave: () => {
        S.value && typeof S.value.click == "function" && S.value.click();
      }
    });
    const U = r(() => !e.hiddenDrop && !l.value && c.value && v.value), J = r(() => !e.hiddenSave && !l.value && c.value && v.value), E = r(() => !l.value && !e.isCreate && v.value), ee = r(() => !e.hiddenButtons && (J.value || U.value || E.value));
    return (a, u) => {
      const g = w("lkt-button"), te = w("lkt-field-switch"), H = w("lkt-http-info"), ae = w("lkt-loader");
      return i(), m("article", ie, [
        X.value ? (i(), m("header", ce, [
          I("h1", ve, M(t.title), 1),
          I("div", fe, [
            R(a.$slots, "post-title", {
              item: o.value,
              loading: l.value
            })
          ])
        ])) : y("", !0),
        V(I("div", pe, [
          t.isCreate ? y("", !0) : V((i(), _(g, {
            key: 0,
            ref: (p) => C.value = p,
            palette: "danger",
            disabled: t.dropDisabled || !b.value,
            "confirm-modal": t.dropConfirm,
            resource: t.dropResource,
            "resource-data": t.dropData,
            onLoading: x,
            onLoaded: j,
            onClick: Y
          }, {
            default: A(() => [
              F(q)["button-drop"] ? R(a.$slots, "button-drop", {
                key: 0,
                item: o.value,
                editMode: c.value,
                isCreate: t.isCreate,
                canUpdate: D.value,
                canDrop: b.value
              }) : (i(), m("span", me, M(t.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"])), [
            [L, U.value]
          ]),
          V(P(g, {
            ref: (p) => S.value = p,
            palette: "success",
            disabled: !$.value,
            "confirm-modal": K.value,
            resource: T.value,
            "resource-data": Q.value,
            onLoading: x,
            onLoaded: j,
            onClick: Z
          }, {
            default: A(() => [
              F(q)["button-save"] ? R(a.$slots, "button-save", {
                key: 0,
                item: o.value,
                editMode: c.value,
                isCreate: t.isCreate,
                canUpdate: D.value,
                canDrop: b.value
              }) : (i(), m("span", he, M(t.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [L, J.value]
          ]),
          V(P(te, {
            modelValue: c.value,
            "onUpdate:modelValue": u[0] || (u[0] = (p) => c.value = p),
            label: t.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [L, E.value]
          ])
        ], 512), [
          [L, ee.value]
        ]),
        l.value ? y("", !0) : (i(), m("div", ke, [
          v.value ? (i(), m("div", ye, [
            f.value ? (i(), _(H, {
              key: 0,
              code: s.value,
              quick: "",
              palette: s.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: u[1] || (u[1] = (p) => f.value = !1)
            }, null, 8, ["code", "palette"])) : y("", !0),
            R(a.$slots, "item", {
              item: o.value,
              loading: l.value,
              editMode: c.value,
              isCreate: t.isCreate,
              canUpdate: D.value,
              canDrop: b.value
            })
          ])) : (i(), _(H, {
            key: 1,
            code: s.value
          }, null, 8, ["code"]))
        ])),
        l.value ? (i(), _(ae, { key: 2 })) : y("", !0)
      ]);
    };
  }
});
const Le = {
  install: (t, N = {}) => {
    t.component("lkt-item-crud") === void 0 && t.component("lkt-item-crud", Ce), t.component("lkt-button") === void 0 && t.use(de), t.component("lkt-http-info") === void 0 && t.use(se), t.component("lkt-loader") === void 0 && t.use(ne);
  }
};
export {
  Le as default
};
