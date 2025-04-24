import { defineComponent as ke, ref as f, watch as S, useSlots as Ce, computed as U, resolveComponent as ce, createElementBlock as N, createCommentVNode as d, openBlock as m, createBlock as j, Fragment as be, renderSlot as p, withDirectives as E, mergeProps as T, unref as n, createVNode as P, withCtx as D, vShow as L, mergeDefaults as Se, nextTick as Me, onMounted as Ie, resolveDynamicComponent as we, createSlots as de, createElementVNode as Re, toDisplayString as Te } from "vue";
import { httpCall as $e } from "lkt-http-client";
import { DataState as ge } from "lkt-data-state";
import { ensureButtonConfig as X, LktSettings as v, ItemCrudMode as h, ItemCrudButtonNavVisibility as ye, TablePermission as se, ItemCrudView as Be, ItemCrudButtonNavPosition as pe, NotificationType as G, getDefaultValues as Ae, ItemCrud as Ee, ToastPositionX as _ } from "lkt-vue-kernel";
import { closeModal as Le, updateModalKey as Ne } from "lkt-modal";
import { __ as Ve } from "lkt-i18n";
import { openToast as x } from "lkt-toast";
const ne = class ne {
};
ne.debugEnabled = !1, ne.defaultSaveIcon = "", ne.defaultDropIcon = "";
let ee = ne;
const B = (...R) => {
  ee.debugEnabled && console.info("[LktItemCrud] ", ...R);
}, at = (R = !0) => {
  ee.debugEnabled = R;
}, Oe = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, je = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Pe = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Xe = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, ve = /* @__PURE__ */ ke({
  __name: "ButtonNav",
  props: {
    item: { default: () => ({}) },
    editing: { type: Boolean, default: !1 },
    loading: { type: Boolean },
    view: {},
    mode: {},
    createButton: { type: [Object, Boolean] },
    updateButton: { type: [Object, Boolean] },
    dropButton: { type: [Object, Boolean] },
    editModeButton: { type: [Object, Boolean] },
    groupButton: { type: [Object, Boolean] },
    groupButtonAsModalActions: { type: Boolean },
    dataChanged: { type: Boolean },
    canUpdate: { type: Boolean },
    canDrop: { type: Boolean },
    canSwitchEditMode: { type: Boolean },
    perms: {},
    httpSuccessRead: { type: Boolean },
    buttonNavVisibility: {}
  },
  emits: [
    "update:loading",
    "update:editing",
    "create",
    "save",
    "drop"
  ],
  setup(R, { expose: ue, emit: re }) {
    const o = re, a = R, g = f(X(a.createButton, v.defaultCreateButton)), s = f(X(a.updateButton, v.defaultUpdateButton)), r = f(X(a.dropButton, v.defaultDropButton)), k = f(X(a.editModeButton, v.defaultEditModeButton)), $ = f(X(a.groupButton, v.defaultGroupButton));
    S(() => a.createButton, (e) => {
      g.value = X(e, v.defaultCreateButton);
    }, { deep: !0 }), S(() => a.updateButton, (e) => {
      s.value = X(e, v.defaultUpdateButton);
    }, { deep: !0 }), S(() => a.dropButton, (e) => {
      r.value = X(e, v.defaultDropButton);
    }, { deep: !0 }), S(() => a.editModeButton, (e) => {
      k.value = X(e, v.defaultEditModeButton);
    }, { deep: !0 });
    const l = Ce(), M = f(null), I = f(null), c = f(a.loading);
    S(() => a.loading, (e) => c.value = e), S(c, (e) => o("update:loading", e));
    const i = f(a.editing);
    S(() => a.editing, (e) => i.value = e), S(i, (e) => o("update:editing", e));
    const A = () => {
      c.value = !0;
    }, C = () => {
      c.value = !1;
    }, q = (e, b) => {
      typeof e > "u" || o("create", e, b);
    }, Z = (e, b) => {
      typeof e > "u" || o("save", e, b);
    }, V = (e, b) => {
      typeof e > "u" || o("drop", e, b);
    };
    ue({
      doSave: () => {
        M.value && typeof M.value.click == "function" && M.value.click();
      },
      doDrop: () => {
        I.value && typeof I.value.click == "function" && I.value.click();
      }
    });
    const H = U(() => {
      var e, b;
      return a.mode !== h.Update || !a.canUpdate || !a.dataChanged ? !1 : typeof ((e = s.value) == null ? void 0 : e.disabled) == "function" ? !s.value.disabled(a.item) : typeof ((b = s.value) == null ? void 0 : b.disabled) == "boolean" ? !s.value.disabled : !0;
    }), K = U(() => {
      var e, b;
      return a.mode !== h.Create || !a.dataChanged ? !1 : typeof ((e = g.value) == null ? void 0 : e.disabled) == "function" ? !g.value.disabled(a.item) : typeof ((b = g.value) == null ? void 0 : b.disabled) == "boolean" ? !g.value.disabled : !0;
    }), W = U(() => {
      var e, b;
      return a.canDrop ? typeof ((e = r.value) == null ? void 0 : e.disabled) == "function" ? !r.value.disabled(a.item) : typeof ((b = r.value) == null ? void 0 : b.disabled) == "boolean" ? !r.value.disabled : !0 : !1;
    }), z = U(() => !a.canDrop || a.dropButton === !1 ? !1 : !a.canUpdate && a.canDrop ? !0 : !c.value && a.editing && a.httpSuccessRead), O = U(() => a.mode === h.Create && a.createButton === !1 || a.mode === h.Update && a.updateButton === !1 || c.value ? !1 : a.editing && a.httpSuccessRead), F = U(() => a.editModeButton === !1 || !a.canSwitchEditMode || !a.canUpdate && !a.canDrop || !a.canUpdate && a.canDrop ? !1 : !c.value && a.mode !== h.Create && a.httpSuccessRead), oe = U(() => a.buttonNavVisibility === ye.Always || l["prev-buttons-ever"] ? !0 : a.buttonNavVisibility === ye.Never ? !1 : O.value || z.value || F.value);
    return (e, b) => {
      const w = ce("lkt-button");
      return oe.value ? (m(), N("div", Oe, [
        e.groupButton !== !1 && e.groupButtonAsModalActions ? (m(), N(be, { key: 0 }, [
          F.value ? (m(), j(w, T({ key: 0 }, k.value, {
            checked: i.value,
            "onUpdate:checked": b[0] || (b[0] = (J) => i.value = J),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0),
          n(l)["prev-buttons-ever"] ? p(e.$slots, "prev-buttons-ever", {
            key: 1,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          n(l)["prev-buttons"] ? p(e.$slots, "prev-buttons", {
            key: 2,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          E(P(w, T({
            ref_key: "saveButtonRef",
            ref: M
          }, s.value, {
            disabled: !H.value,
            onLoading: A,
            onLoaded: C,
            onClick: Z
          }), {
            default: D(() => [
              n(l)["button-save"] ? p(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: i.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, e.mode === n(h).Update && O.value]
          ]),
          E(P(w, T({
            ref_key: "saveButtonRef",
            ref: M
          }, g.value, {
            disabled: !K.value,
            onLoading: A,
            onLoaded: C,
            onClick: q
          }), {
            default: D(() => [
              n(l)["button-save"] ? p(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: i.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, e.mode === n(h).Create && O.value]
          ]),
          E(P(w, T({
            ref_key: "dropButtonRef",
            ref: I
          }, r.value, {
            disabled: !W.value,
            onLoading: A,
            onLoaded: C,
            onClick: V
          }), {
            default: D(() => [
              n(l)["button-drop"] ? p(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: i.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, z.value && e.mode !== n(h).Create]
          ]),
          n(l).buttons ? p(e.$slots, "buttons", { key: 3 }) : d("", !0)
        ], 64)) : e.groupButton !== !1 ? (m(), j(w, T({
          key: 1,
          ref: "groupButton"
        }, $.value, { class: "lkt-item-crud-group-button" }), {
          split: D(() => [
            F.value ? (m(), j(w, T({ key: 0 }, k.value, {
              checked: i.value,
              "onUpdate:checked": b[1] || (b[1] = (J) => i.value = J),
              class: "lkt-item-crud--switch-mode-button"
            }), null, 16, ["checked"])) : d("", !0),
            n(l)["prev-buttons-ever"] ? p(e.$slots, "prev-buttons-ever", {
              key: 1,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : d("", !0),
            n(l)["prev-buttons"] ? p(e.$slots, "prev-buttons", {
              key: 2,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : d("", !0),
            E(P(w, T({
              ref_key: "saveButtonRef",
              ref: M
            }, s.value, {
              disabled: !H.value,
              onLoading: A,
              onLoaded: C,
              onClick: Z
            }), {
              default: D(() => [
                n(l)["button-save"] ? p(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: i.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : d("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [L, e.mode === n(h).Update && O.value]
            ]),
            E(P(w, T({
              ref_key: "saveButtonRef",
              ref: M
            }, g.value, {
              disabled: !K.value,
              onLoading: A,
              onLoaded: C,
              onClick: q
            }), {
              default: D(() => [
                n(l)["button-save"] ? p(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: i.value,
                  isCreate: !0,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : d("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [L, e.mode === n(h).Create && O.value]
            ]),
            E(P(w, T({
              ref_key: "dropButtonRef",
              ref: I
            }, r.value, {
              disabled: !W.value,
              onLoading: A,
              onLoaded: C,
              onClick: V
            }), {
              default: D(() => [
                n(l)["button-drop"] ? p(e.$slots, "button-drop", {
                  key: 0,
                  item: e.item,
                  editMode: i.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : d("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [L, z.value && e.mode !== n(h).Create]
            ]),
            n(l).buttons ? p(e.$slots, "buttons", { key: 3 }) : d("", !0)
          ]),
          _: 3
        }, 16)) : (m(), N(be, { key: 2 }, [
          n(l)["prev-buttons-ever"] ? E((m(), N("div", je, [
            p(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [L, !c.value]
          ]) : d("", !0),
          n(l)["prev-buttons"] ? E((m(), N("div", Pe, [
            p(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [L, i.value && !c.value]
          ]) : d("", !0),
          E(P(w, T({
            ref_key: "saveButtonRef",
            ref: M
          }, s.value, {
            disabled: !H.value,
            onLoading: A,
            onLoaded: C,
            onClick: Z
          }), {
            default: D(() => [
              n(l)["button-save"] ? p(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: i.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, e.mode === n(h).Update && O.value]
          ]),
          E(P(w, T({
            ref_key: "saveButtonRef",
            ref: M
          }, g.value, {
            disabled: !K.value,
            onLoading: A,
            onLoaded: C,
            onClick: q
          }), {
            default: D(() => [
              n(l)["button-save"] ? p(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: i.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: !1
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, e.mode === n(h).Create && O.value]
          ]),
          E(P(w, T({
            ref_key: "dropButtonRef",
            ref: I
          }, r.value, {
            disabled: !W.value,
            onLoading: A,
            onLoaded: C,
            onClick: V
          }), {
            default: D(() => [
              n(l)["button-drop"] ? p(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: i.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, z.value && e.mode !== n(h).Create]
          ]),
          n(l).buttons ? E((m(), N("div", Xe, [
            p(e.$slots, "buttons")
          ], 512)), [
            [L, i.value && !c.value]
          ]) : d("", !0),
          F.value ? (m(), j(w, T({ key: 3 }, k.value, {
            checked: i.value,
            "onUpdate:checked": b[2] || (b[2] = (J) => i.value = J),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0)
        ], 64))
      ])) : d("", !0);
    };
  }
}), Ke = { class: "lkt-item-crud" }, Fe = {
  key: 0,
  class: "lkt-item-crud_header"
}, Ge = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, qe = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, He = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, We = {
  key: 2,
  class: "lkt-item-crud_content"
}, ze = {
  key: 0,
  class: "lkt-grid-1"
}, Je = /* @__PURE__ */ ke({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ Se({
    modelValue: {},
    editing: { type: Boolean },
    perms: {},
    mode: {},
    view: {},
    editModeButton: { type: [Object, Boolean] },
    dropButton: { type: [Object, Boolean] },
    createButton: { type: [Object, Boolean] },
    updateButton: { type: [Object, Boolean] },
    groupButton: { type: [Object, Boolean] },
    groupButtonAsModalActions: { type: Boolean },
    buttonNavPosition: {},
    buttonNavVisibility: {},
    modalConfig: {},
    saveConfig: {},
    dataStateConfig: {},
    readResource: {},
    readData: {},
    title: {},
    beforeEmitUpdate: { type: Function },
    notificationType: {}
  }, Ae(Ee)),
  emits: [
    "update:modelValue",
    "update:editing",
    "read",
    "create",
    "update",
    "drop",
    "before-save",
    "perms",
    "error",
    "modified-data"
  ],
  setup(R, { expose: ue, emit: re }) {
    const o = R, a = Ce(), g = re, s = f(!0), r = f(o.modelValue), k = f(o.perms), $ = f(o.editing), l = f(!1), M = f(!1), I = f(200), c = f(new ge(r.value, o.dataStateConfig)), i = f(!1), A = f(new ge(o.readData)), C = f(o.mode === h.Create), q = f(!1), Z = f(!1), V = f(null), te = U(() => !C.value && Array.isArray(k.value) && k.value.includes(se.Update)), ae = U(() => !C.value && Array.isArray(k.value) && k.value.includes(se.Drop)), H = U(() => !C.value && Array.isArray(k.value) && k.value.includes(se.SwitchEditMode));
    S(() => o.mode, (t) => {
      C.value = t === h.Create;
    });
    const K = async () => {
      B("fetchItem"), s.value = !0, I.value = -1, M.value = !1;
      try {
        const t = await $e(o.readResource, o.readData);
        if (B("fetchItem -> response", t), s.value = !1, I.value = t.httpStatus, !t.success) {
          l.value = !1, I.value = t.httpStatus, g("error", t.httpStatus);
          return;
        }
        l.value = !0, r.value = t.data, k.value = t.perms, c.value.increment(r.value).turnStoredIntoOriginal(), i.value = c.value.changed(), A.value.turnStoredIntoOriginal(), g("read", t);
      } catch {
        s.value = !1, l.value = !1, I.value = 404, g("error", 404);
        return;
      }
    };
    S(() => o.modelValue, (t) => {
      r.value = t, c.value.increment(t);
    }, { deep: !0 }), S(r, (t) => {
      if (q.value = !0, B("item updated ->", r.value), typeof o.beforeEmitUpdate == "function") {
        B("item updated -> has beforeEmitUpdate");
        let u = o.beforeEmitUpdate(r.value);
        B("item updated -> override with: ", u), typeof u == "object" && (r.value = u);
      }
      g("update:modelValue", r.value), B("item updated -> update dataState"), c.value.increment(t), i.value = c.value.changed(), Me(() => q.value = !1);
    }, { deep: !0 }), S(k, () => g("perms", k.value)), S(i, (t) => {
      g("modified-data", t);
    }), S(() => o.readData, (t) => {
      A.value.increment(t), A.value.changed() && K();
    }), S(() => o.editing, (t) => {
      B("editing updated -> updating editMode", t), $.value = t;
    }), S($, (t) => {
      B("editMode updated -> emit update", t), g("update:editing", t);
    }), Ie(() => {
      o.readResource && !C.value ? K() : (C.value, l.value = !0, $.value = !0, s.value = !1, c.value.increment(r.value).turnStoredIntoOriginal(), i.value = c.value.changed());
    });
    const W = (t, u) => {
      if (u) {
        if (s.value = !1, typeof t < "u" && (I.value = t.httpStatus, !t.success))
          return M.value = !0, g("error", t.httpStatus), !1;
        M.value = !0;
      }
      return !0;
    }, z = (t) => {
      B("doAutoReloadId -> enter: ", t), typeof t < "u" && t.autoReloadId && (B("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), ie.value ? (B("doAutoReloadId -> insideModal: ", o), Ne(o.modalConfig.modalName, o.modalConfig.modalKey, t.autoReloadId)) : (B("doAutoReloadId -> outsideModal"), o.readData.id = t.autoReloadId, B("doAutoReloadId -> turning off create mode"), C.value = !1, K()));
    }, O = (t, u) => {
      if (B("onCreate"), !W(u, o.createButton.resource)) {
        o.notificationType === G.Toast && x({
          text: v.defaultCreateErrorText,
          details: v.defaultCreateErrorDetails,
          icon: v.defaultCreateErrorIcon,
          positionX: _.Right
        });
        return;
      }
      Z.value = !0, B("onCreate -> turn stored data into original"), c.value.increment(r.value).turnStoredIntoOriginal(), o.notificationType === G.Toast && x({
        text: v.defaultCreateSuccessText,
        details: v.defaultCreateSuccessDetails,
        icon: v.defaultCreateSuccessIcon,
        positionX: _.Right
      }), z(u), B("onCreate -> beforeEmitCreate"), g("create", u);
    }, F = (t, u) => {
      if (B("onUpdate"), !W(u, o.updateButton.resource)) {
        o.notificationType === G.Toast && x({
          text: v.defaultUpdateErrorText,
          details: v.defaultUpdateErrorDetails,
          icon: v.defaultUpdateErrorIcon,
          positionX: _.Right
        });
        return;
      }
      B("onUpdate -> turn stored data into original"), c.value.turnStoredIntoOriginal(), o.notificationType === G.Toast && x({
        text: v.defaultUpdateSuccessText,
        details: v.defaultUpdateSuccessDetails,
        icon: v.defaultUpdateSuccessIcon,
        positionX: _.Right
      }), z(u), g("update", u);
    }, oe = (t, u) => {
      if (B("onDrop"), !W(u, o.dropButton.resource)) {
        o.notificationType === G.Toast && x({
          text: v.defaultDropErrorText,
          details: v.defaultDropErrorDetails,
          icon: v.defaultDropErrorIcon,
          positionX: _.Right
        });
        return;
      }
      o.notificationType === G.Toast && x({
        text: v.defaultDropSuccessText,
        details: v.defaultDropSuccessDetails,
        icon: v.defaultDropSuccessIcon,
        positionX: _.Right
      }), g("drop", u), o.view === Be.Modal && (B("onDrop -> close modal"), Le(o.modalConfig.modalName, o.modalConfig.modalKey));
    };
    ue({
      doDrop: () => {
        V.value && V.value.doDrop();
      },
      doRefresh: K,
      doSave: () => {
        V.value && V.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        c.value.increment(r.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => c.value.changed()
    });
    const w = U(() => {
      var t;
      return c.value.changed() ? (t = o.modalConfig) == null ? void 0 : t.closeConfirm : "";
    }), J = (t) => {
      var u;
      if (typeof ((u = o.modalConfig) == null ? void 0 : u.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...t,
          itemCreated: Z.value
        });
    }, le = U(() => o.title.startsWith("__:") ? String(Ve(o.title.substring(3))) : o.title), De = U(() => s.value ? !1 : le.value.length > 0 || !!a["post-title"]), ie = U(() => o.view === Be.Modal), fe = U(() => ie.value ? "lkt-modal" : "section"), he = U(() => fe.value === "lkt-modal" ? {
      title: o.title,
      item: r.value,
      ...o.modalConfig,
      beforeClose: J,
      closeConfirm: w.value
    } : {});
    return (t, u) => {
      const me = ce("lkt-http-info"), Ue = ce("lkt-loader");
      return m(), j(we(fe.value), T(he.value, { class: "lkt-item-crud" }), de({
        default: D(() => [
          Re("article", Ke, [
            !ie.value && De.value ? (m(), N("header", Fe, [
              n(a)["pre-title"] ? (m(), N("div", Ge, [
                p(t.$slots, "pre-title", {
                  item: r.value,
                  loading: s.value
                })
              ])) : d("", !0),
              le.value.length > 0 ? (m(), N("h1", qe, Te(le.value), 1)) : d("", !0),
              n(a)["post-title"] ? (m(), N("div", He, [
                p(t.$slots, "post-title", {
                  item: r.value,
                  loading: s.value
                })
              ])) : d("", !0)
            ])) : d("", !0),
            t.buttonNavPosition === n(pe).Top && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (m(), j(ve, {
              key: 1,
              ref_key: "buttonNav",
              ref: V,
              loading: s.value,
              "onUpdate:loading": u[2] || (u[2] = (y) => s.value = y),
              editing: $.value,
              "onUpdate:editing": u[3] || (u[3] = (y) => $.value = y),
              item: r.value,
              mode: t.mode,
              view: t.view,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": t.createButton,
              "update-button": t.updateButton,
              "drop-button": t.dropButton,
              "edit-mode-button": t.editModeButton,
              "group-button": t.groupButton,
              "data-changed": i.value,
              "http-success-read": l.value,
              "can-update": te.value,
              "can-drop": ae.value,
              "can-switch-edit-mode": H.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              perms: k.value,
              onCreate: O,
              onSave: F,
              onDrop: oe
            }, de({ _: 2 }, [
              n(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: D(({ canUpdate: y, canDrop: Q, perms: Y }) => [
                  p(t.$slots, "prev-buttons-ever", {
                    canUpdate: y,
                    canDrop: Q,
                    perms: Y
                  })
                ]),
                key: "0"
              } : void 0,
              n(a)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: D(({ canUpdate: y, canDrop: Q, perms: Y }) => [
                  p(t.$slots, "prev-buttons", {
                    canUpdate: y,
                    canDrop: Q,
                    perms: Y
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "perms"])) : d("", !0),
            s.value ? d("", !0) : (m(), N("div", We, [
              l.value ? (m(), N("div", ze, [
                M.value && t.notificationType === n(G).Inline ? (m(), j(me, {
                  key: 0,
                  code: I.value,
                  palette: I.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: u[4] || (u[4] = (y) => M.value = !1)
                }, null, 8, ["code", "palette"])) : d("", !0),
                p(t.$slots, "item", {
                  item: r.value,
                  loading: s.value,
                  editMode: $.value,
                  isCreate: C.value,
                  canUpdate: te.value,
                  canDrop: ae.value,
                  itemBeingEdited: q.value,
                  perms: k.value
                })
              ])) : t.notificationType === n(G).Inline ? (m(), j(me, {
                key: 1,
                code: I.value
              }, null, 8, ["code"])) : d("", !0)
            ])),
            s.value ? (m(), j(Ue, { key: 3 })) : d("", !0),
            t.buttonNavPosition === n(pe).Bottom && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (m(), j(ve, {
              key: 4,
              ref_key: "buttonNav",
              ref: V,
              loading: s.value,
              "onUpdate:loading": u[5] || (u[5] = (y) => s.value = y),
              editing: $.value,
              "onUpdate:editing": u[6] || (u[6] = (y) => $.value = y),
              item: r.value,
              mode: t.mode,
              view: t.view,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": t.createButton,
              "update-button": t.updateButton,
              "drop-button": t.dropButton,
              "edit-mode-button": t.editModeButton,
              "group-button": t.groupButton,
              "data-changed": i.value,
              "http-success-read": l.value,
              "can-update": te.value,
              "can-drop": ae.value,
              "can-switch-edit-mode": H.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              perms: k.value,
              onCreate: O,
              onSave: F,
              onDrop: oe
            }, de({ _: 2 }, [
              n(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: D(() => [
                  p(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              n(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: D(() => [
                  p(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "perms"])) : d("", !0)
          ])
        ]),
        _: 2
      }, [
        t.groupButton !== !1 && t.groupButtonAsModalActions ? {
          name: "header-actions",
          fn: D(() => [
            t.buttonNavPosition === n(pe).Top ? (m(), j(ve, {
              key: 0,
              ref_key: "buttonNav",
              ref: V,
              loading: s.value,
              "onUpdate:loading": u[0] || (u[0] = (y) => s.value = y),
              editing: $.value,
              "onUpdate:editing": u[1] || (u[1] = (y) => $.value = y),
              item: r.value,
              mode: t.mode,
              view: t.view,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": t.createButton,
              "update-button": t.updateButton,
              "drop-button": t.dropButton,
              "edit-mode-button": t.editModeButton,
              "group-button": t.groupButton,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "data-changed": i.value,
              "http-success-read": l.value,
              "can-update": te.value,
              "can-drop": ae.value,
              "can-switch-edit-mode": H.value,
              perms: k.value,
              onCreate: O,
              onSave: F,
              onDrop: oe
            }, de({ _: 2 }, [
              n(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: D(({ canUpdate: y, canDrop: Q, perms: Y }) => [
                  p(t.$slots, "prev-buttons-ever", {
                    canUpdate: y,
                    canDrop: Q,
                    perms: Y
                  })
                ]),
                key: "0"
              } : void 0,
              n(a)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: D(({ canUpdate: y, canDrop: Q, perms: Y }) => [
                  p(t.$slots, "prev-buttons", {
                    canUpdate: y,
                    canDrop: Q,
                    perms: Y
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "group-button-as-modal-actions", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "perms"])) : d("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), ot = {
  install: (R, ue = {}) => {
    R.component("lkt-item-crud") === void 0 && R.component("lkt-item-crud", Je);
  }
}, nt = (R) => {
  ee.defaultSaveIcon = R;
}, ut = (R) => {
  ee.defaultDropIcon = R;
};
export {
  at as debugLktItemCrud,
  ot as default,
  ut as setItemCrudDefaultDropIcon,
  nt as setItemCrudDefaultSaveIcon
};
