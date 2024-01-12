import { defineComponent as Z, useSlots as ee, ref as d, computed as v, watch as R, resolveComponent as V, openBlock as i, createElementBlock as p, createElementVNode as I, toDisplayString as M, renderSlot as L, createCommentVNode as C, withDirectives as B, createBlock as _, withCtx as J, unref as E, vShow as q, createVNode as H } from "vue";
import { httpCall as te } from "lkt-http-client";
import { DataState as ae } from "lkt-data-state";
import le from "lkt-button";
import ue from "lkt-http-info";
import re from "lkt-loader";
const oe = { class: "lkt-item-crud" }, se = {
  key: 0,
  class: "lkt-item-crud_header"
}, de = { class: "lkt-item-crud_header-title" }, ie = { class: "lkt-item-crud_header-slot" }, ne = { class: "lkt-item-crud-buttons" }, ce = { key: 1 }, ve = { key: 1 }, fe = {
  key: 1,
  class: "lkt-item-crud_content"
}, me = {
  key: 0,
  class: "lkt-grid-1"
}, pe = { name: "LktItemCrud", inheritAttrs: !1 }, ke = /* @__PURE__ */ Z({
  ...pe,
  props: {
    modelValue: { type: Object, required: !1, default: () => ({}) },
    title: { type: String, default: "" },
    editModeText: { type: String, default: "Edition Mode" },
    saveText: { type: String, default: "Save" },
    dropText: { type: String, default: "Delete" },
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
  setup(t, { expose: N, emit: A }) {
    const e = t, O = ee(), o = A;
    let F = [];
    const l = d(!0), r = d(e.modelValue), k = d(F), c = d(!1), n = d(!1), f = d(!1), s = d(200), S = d(null), h = d(null), y = d(new ae(r.value)), P = v(() => e.isCreate ? e.createConfirm : e.updateConfirm), T = v(() => e.isCreate ? e.createResource : e.updateResource), z = v(() => e.isCreate ? { ...e.createData, ...JSON.parse(JSON.stringify(r.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(r.value)) }), G = v(() => e.isCreate ? e.createDisabled : e.updateDisabled), b = v(() => !e.isCreate && k.value.includes("update")), D = v(() => !e.isCreate && k.value.includes("drop")), w = async () => {
      l.value = !0, s.value = -1, f.value = !1;
      try {
        const a = await te(e.readResource, e.readData);
        if (l.value = !1, s.value = a.httpStatus, !a.success) {
          n.value = !1, s.value = a.httpStatus, o("error", a.httpStatus);
          return;
        }
        n.value = !0, r.value = a.data, k.value = a.perms, y.value.increment(r.value).turnStoredIntoOriginal(), o("read", a);
      } catch {
        l.value = !1, n.value = !1, s.value = 404, o("error", 404);
        return;
      }
    }, K = v(() => l.value ? !1 : e.title || !!O["post-title"]);
    R(() => e.modelValue, (a) => {
      r.value = a, y.value.increment(a);
    }, { deep: !0 }), R(r, (a) => {
      o("update:modelValue", r.value), y.value.increment(a);
    }, { deep: !0 }), R(k, () => o("perms", k.value));
    const $ = v(() => G.value || !e.isCreate && !b.value || typeof e.saveValidator == "function" && !e.saveValidator(r.value) ? !1 : y.value.changed());
    R($, (a) => o("modified-data", a)), e.readResource && !e.isCreate ? w() : e.isCreate && (n.value = !0, c.value = !0, l.value = !1);
    const Q = (a, u) => {
      if (l.value = !1, s.value = u.httpStatus, !u.success) {
        f.value = !0, o("error", u.httpStatus);
        return;
      }
      f.value = !0, o("drop", u);
    }, W = (a, u) => {
      if (T.value) {
        if (l.value = !1, s.value = u.httpStatus, !u.success) {
          f.value = !0, o("error", u.httpStatus);
          return;
        }
        f.value = !0;
      }
      let g = e.isCreate ? "create" : "update";
      e.isCreate || y.value.turnStoredIntoOriginal(), u.autoReloadId && (e.readData.id = u.autoReloadId, w()), o(g, u);
    }, x = () => {
      l.value = !0, s.value = -1;
    }, j = () => {
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
    }), (a, u) => {
      const g = V("lkt-button"), X = V("lkt-field-switch"), U = V("lkt-http-info"), Y = V("lkt-loader");
      return i(), p("article", oe, [
        K.value ? (i(), p("header", se, [
          I("h1", de, M(t.title), 1),
          I("div", ie, [
            L(a.$slots, "post-title", {
              item: r.value,
              loading: l.value
            })
          ])
        ])) : C("", !0),
        B(I("div", ne, [
          t.isCreate ? C("", !0) : B((i(), _(g, {
            key: 0,
            ref: (m) => h.value = m,
            palette: "danger",
            disabled: t.dropDisabled || !D.value,
            "confirm-modal": t.dropConfirm,
            resource: t.dropResource,
            "resource-data": t.dropData,
            onLoading: x,
            onLoaded: j,
            onClick: Q
          }, {
            default: J(() => [
              E(O)["button-drop"] ? L(a.$slots, "button-drop", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: t.isCreate,
                canUpdate: b.value,
                canDrop: D.value
              }) : (i(), p("span", ce, M(t.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"])), [
            [q, !l.value && c.value && n.value]
          ]),
          B(H(g, {
            ref: (m) => S.value = m,
            palette: "success",
            disabled: !$.value,
            "confirm-modal": P.value,
            resource: T.value,
            "resource-data": z.value,
            onLoading: x,
            onLoaded: j,
            onClick: W
          }, {
            default: J(() => [
              E(O)["button-save"] ? L(a.$slots, "button-save", {
                key: 0,
                item: r.value,
                editMode: c.value,
                isCreate: t.isCreate,
                canUpdate: b.value,
                canDrop: D.value
              }) : (i(), p("span", ve, M(t.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [q, !l.value && c.value && n.value]
          ]),
          B(H(X, {
            modelValue: c.value,
            "onUpdate:modelValue": u[0] || (u[0] = (m) => c.value = m),
            label: t.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [q, !l.value && n.value && !t.isCreate]
          ])
        ], 512), [
          [q, n.value]
        ]),
        l.value ? C("", !0) : (i(), p("div", fe, [
          n.value ? (i(), p("div", me, [
            f.value ? (i(), _(U, {
              key: 0,
              code: s.value,
              quick: "",
              palette: s.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: u[1] || (u[1] = (m) => f.value = !1)
            }, null, 8, ["code", "palette"])) : C("", !0),
            L(a.$slots, "item", {
              item: r.value,
              loading: l.value,
              editMode: c.value,
              isCreate: t.isCreate,
              canUpdate: b.value,
              canDrop: D.value
            })
          ])) : (i(), _(U, {
            key: 1,
            code: s.value
          }, null, 8, ["code"]))
        ])),
        l.value ? (i(), _(Y, { key: 2 })) : C("", !0)
      ]);
    };
  }
});
const Ve = {
  install: (t, N = {}) => {
    t.component("lkt-item-crud") === void 0 && t.component("lkt-item-crud", ke), t.component("lkt-button") === void 0 && t.use(le), t.component("lkt-http-info") === void 0 && t.use(ue), t.component("lkt-loader") === void 0 && t.use(re);
  }
};
export {
  Ve as default
};
