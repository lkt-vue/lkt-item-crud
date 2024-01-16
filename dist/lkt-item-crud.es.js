import { defineComponent as le, useSlots as ue, ref as i, computed as r, watch as B, resolveComponent as w, openBlock as d, createElementBlock as p, createElementVNode as H, toDisplayString as q, renderSlot as R, createCommentVNode as k, withDirectives as O, createBlock as V, withCtx as A, unref as F, vShow as I, createVNode as P } from "vue";
import { httpCall as oe } from "lkt-http-client";
import { DataState as re } from "lkt-data-state";
import de from "lkt-button";
import se from "lkt-http-info";
import ne from "lkt-loader";
const ie = { class: "lkt-item-crud" }, ce = {
  key: 0,
  class: "lkt-item-crud_header"
}, ve = { class: "lkt-item-crud_header-title" }, fe = { class: "lkt-item-crud_header-slot" }, pe = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, me = { key: 1 }, ke = { key: 1 }, he = {
  key: 2,
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
  setup(t, { expose: M, emit: z }) {
    const e = t, _ = ue(), s = z;
    let G = [];
    const l = i(!0), o = i(e.modelValue), h = i(G), c = i(!1), v = i(!1), f = i(!1), n = i(200), S = i(null), C = i(null), y = i(new re(o.value)), K = r(() => e.isCreate ? e.createConfirm : e.updateConfirm), N = r(() => e.isCreate ? e.createResource : e.updateResource), Q = r(() => e.isCreate ? { ...e.createData, ...JSON.parse(JSON.stringify(o.value)) } : { ...e.updateData, ...JSON.parse(JSON.stringify(o.value)) }), W = r(() => e.isCreate ? e.createDisabled : e.updateDisabled), D = r(() => !e.isCreate && h.value.includes("update")), b = r(() => !e.isCreate && h.value.includes("drop")), L = async () => {
      l.value = !0, n.value = -1, f.value = !1;
      try {
        const a = await oe(e.readResource, e.readData);
        if (l.value = !1, n.value = a.httpStatus, !a.success) {
          v.value = !1, n.value = a.httpStatus, s("error", a.httpStatus);
          return;
        }
        v.value = !0, o.value = a.data, h.value = a.perms, y.value.increment(o.value).turnStoredIntoOriginal(), s("read", a);
      } catch {
        l.value = !1, v.value = !1, n.value = 404, s("error", 404);
        return;
      }
    }, X = r(() => l.value ? !1 : e.title || !!_["post-title"]);
    B(() => e.modelValue, (a) => {
      o.value = a, y.value.increment(a);
    }, { deep: !0 }), B(o, (a) => {
      s("update:modelValue", o.value), y.value.increment(a);
    }, { deep: !0 }), B(h, () => s("perms", h.value));
    const T = r(() => W.value || !e.isCreate && !D.value || typeof e.saveValidator == "function" && !e.saveValidator(o.value) ? !1 : y.value.changed());
    B(T, (a) => s("modified-data", a)), e.readResource && !e.isCreate ? L() : e.isCreate && (v.value = !0, c.value = !0, l.value = !1);
    const Y = (a, u) => {
      if (l.value = !1, n.value = u.httpStatus, !u.success) {
        f.value = !0, s("error", u.httpStatus);
        return;
      }
      f.value = !0, s("drop", u);
    }, Z = (a, u) => {
      if (N.value) {
        if (l.value = !1, n.value = u.httpStatus, !u.success) {
          f.value = !0, s("error", u.httpStatus);
          return;
        }
        f.value = !0;
      }
      let g = e.isCreate ? "create" : "update";
      e.isCreate || y.value.turnStoredIntoOriginal(), u.autoReloadId && (e.readData.id = u.autoReloadId, L()), s(g, u);
    }, $ = () => {
      l.value = !0, n.value = -1;
    }, x = () => {
      l.value = !1;
    };
    M({
      doDrop: () => {
        C.value && typeof C.value.click == "function" && C.value.click();
      },
      doRefresh: L,
      doSave: () => {
        S.value && typeof S.value.click == "function" && S.value.click();
      }
    });
    const j = r(() => !e.hiddenDrop && !l.value && c.value && v.value), U = r(() => !e.hiddenSave && !l.value && c.value && v.value), J = r(() => !l.value && !e.isCreate && v.value), ee = r(() => !e.hiddenButtons && (U.value || j.value || J.value));
    return (a, u) => {
      const g = w("lkt-button"), te = w("lkt-field-switch"), E = w("lkt-http-info"), ae = w("lkt-loader");
      return d(), p("article", ie, [
        X.value ? (d(), p("header", ce, [
          H("h1", ve, q(t.title), 1),
          H("div", fe, [
            R(a.$slots, "post-title", {
              item: o.value,
              loading: l.value
            })
          ])
        ])) : k("", !0),
        ee.value ? (d(), p("div", pe, [
          t.isCreate ? k("", !0) : O((d(), V(g, {
            key: 0,
            ref: (m) => C.value = m,
            palette: "danger",
            disabled: t.dropDisabled || !b.value,
            "confirm-modal": t.dropConfirm,
            resource: t.dropResource,
            "resource-data": t.dropData,
            onLoading: $,
            onLoaded: x,
            onClick: Y
          }, {
            default: A(() => [
              F(_)["button-drop"] ? R(a.$slots, "button-drop", {
                key: 0,
                item: o.value,
                editMode: c.value,
                isCreate: t.isCreate,
                canUpdate: D.value,
                canDrop: b.value
              }) : (d(), p("span", me, q(t.dropText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"])), [
            [I, j.value]
          ]),
          O(P(g, {
            ref: (m) => S.value = m,
            palette: "success",
            disabled: !T.value,
            "confirm-modal": K.value,
            resource: N.value,
            "resource-data": Q.value,
            onLoading: $,
            onLoaded: x,
            onClick: Z
          }, {
            default: A(() => [
              F(_)["button-save"] ? R(a.$slots, "button-save", {
                key: 0,
                item: o.value,
                editMode: c.value,
                isCreate: t.isCreate,
                canUpdate: D.value,
                canDrop: b.value
              }) : (d(), p("span", ke, q(t.saveText), 1))
            ]),
            _: 3
          }, 8, ["disabled", "confirm-modal", "resource", "resource-data"]), [
            [I, U.value]
          ]),
          O(P(te, {
            modelValue: c.value,
            "onUpdate:modelValue": u[0] || (u[0] = (m) => c.value = m),
            label: t.editModeText
          }, null, 8, ["modelValue", "label"]), [
            [I, J.value]
          ])
        ])) : k("", !0),
        l.value ? k("", !0) : (d(), p("div", he, [
          v.value ? (d(), p("div", ye, [
            f.value ? (d(), V(E, {
              key: 0,
              code: n.value,
              quick: "",
              palette: n.value === 200 ? "success" : "danger",
              "can-close": "",
              onClose: u[1] || (u[1] = (m) => f.value = !1)
            }, null, 8, ["code", "palette"])) : k("", !0),
            R(a.$slots, "item", {
              item: o.value,
              loading: l.value,
              editMode: c.value,
              isCreate: t.isCreate,
              canUpdate: D.value,
              canDrop: b.value
            })
          ])) : (d(), V(E, {
            key: 1,
            code: n.value
          }, null, 8, ["code"]))
        ])),
        l.value ? (d(), V(ae, { key: 3 })) : k("", !0)
      ]);
    };
  }
});
const Le = {
  install: (t, M = {}) => {
    t.component("lkt-item-crud") === void 0 && t.component("lkt-item-crud", Ce), t.component("lkt-button") === void 0 && t.use(de), t.component("lkt-http-info") === void 0 && t.use(se), t.component("lkt-loader") === void 0 && t.use(ne);
  }
};
export {
  Le as default
};
