import { defineComponent as ye, ref as v, watch as h, useSlots as ke, computed as k, resolveComponent as se, createElementBlock as $, createCommentVNode as n, openBlock as i, createBlock as B, mergeProps as O, withCtx as R, renderSlot as g, withDirectives as Y, unref as d, vShow as Z, Fragment as De, mergeDefaults as Ue, nextTick as Se, onMounted as Ie, resolveDynamicComponent as we, normalizeProps as Me, guardReactiveProps as Re, createElementVNode as Te, toDisplayString as Ee, createSlots as ce } from "vue";
import { httpCall as $e } from "lkt-http-client";
import { DataState as fe } from "lkt-data-state";
import { ensureButtonConfig as j, LktSettings as r, ItemCrudMode as w, ItemCrudButtonNavVisibility as le, TablePermission as ie, ItemCrudView as me, ItemCrudButtonNavPosition as be, NotificationType as P, getDefaultValues as Ne, ItemCrud as Le, ToastPositionX as H } from "lkt-vue-kernel";
import { closeModal as Ve } from "lkt-modal";
import { __ as Oe } from "lkt-i18n";
import { openToast as K } from "lkt-toast";
const _ = class _ {
};
_.debugEnabled = !1, _.defaultSaveIcon = "", _.defaultDropIcon = "";
let W = _;
const y = (...C) => {
  W.debugEnabled && console.info("[LktItemCrud] ", ...C);
}, at = (C = !0) => {
  W.debugEnabled = C;
}, je = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Ae = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Pe = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Xe = {
  key: 5,
  class: "lkt-item-crud-buttons"
}, ge = /* @__PURE__ */ ye({
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
  setup(C, { expose: x, emit: oe }) {
    const o = oe, a = C, b = v(j(a.createButton, r.defaultCreateButton)), s = v(j(a.updateButton, r.defaultUpdateButton)), l = v(j(a.dropButton, r.defaultDropButton)), D = v(j(a.editModeButton, r.defaultEditModeButton)), T = v(j(a.groupButton, r.defaultGroupButton));
    h(() => a.createButton, (e) => {
      b.value = j(e, r.defaultCreateButton);
    }, { deep: !0 }), h(() => a.updateButton, (e) => {
      s.value = j(e, r.defaultUpdateButton);
    }, { deep: !0 }), h(() => a.dropButton, (e) => {
      l.value = j(e, r.defaultDropButton);
    }, { deep: !0 }), h(() => a.editModeButton, (e) => {
      D.value = j(e, r.defaultEditModeButton);
    }, { deep: !0 });
    const c = ke(), I = v(null), U = v(null), p = v(a.loading);
    h(() => a.loading, (e) => p.value = e), h(p, (e) => o("update:loading", e));
    const f = v(a.editing);
    h(() => a.editing, (e) => f.value = e), h(f, (e) => o("update:editing", e));
    const N = () => {
      p.value = !0;
    }, S = () => {
      p.value = !1;
    }, G = (e, m) => {
      typeof e > "u" || o("create", e, m);
    }, J = (e, m) => {
      typeof e > "u" || o("save", e, m);
    }, L = (e, m) => {
      typeof e > "u" || o("drop", e, m);
    };
    x({
      doSave: () => {
        I.value && typeof I.value.click == "function" && I.value.click();
      },
      doDrop: () => {
        U.value && typeof U.value.click == "function" && U.value.click();
      }
    });
    const X = k(() => {
      var e, m;
      return a.mode !== w.Update || !a.canUpdate || !a.dataChanged ? !1 : typeof ((e = s.value) == null ? void 0 : e.disabled) == "function" ? !s.value.disabled(a.item) : typeof ((m = s.value) == null ? void 0 : m.disabled) == "boolean" ? !s.value.disabled : !0;
    }), V = k(() => {
      var e, m;
      return a.mode !== w.Create || !a.dataChanged ? !1 : typeof ((e = b.value) == null ? void 0 : e.disabled) == "function" ? !b.value.disabled(a.item) : typeof ((m = b.value) == null ? void 0 : m.disabled) == "boolean" ? !b.value.disabled : !0;
    }), F = k(() => {
      var e, m;
      return a.canDrop ? typeof ((e = l.value) == null ? void 0 : e.disabled) == "function" ? !l.value.disabled(a.item) : typeof ((m = l.value) == null ? void 0 : m.disabled) == "boolean" ? !l.value.disabled : !0 : !1;
    }), q = k(() => !a.canDrop || a.dropButton === !1 ? !1 : !a.canUpdate && a.canDrop ? !0 : !p.value && a.editing && a.httpSuccessRead), A = k(() => a.mode === w.Create && a.createButton === !1 || a.mode === w.Update && a.updateButton === !1 ? !1 : a.dataChanged ? X.value || V.value : p.value ? !1 : a.mode === w.Create ? !0 : a.buttonNavVisibility === le.Never ? !1 : a.editing && a.httpSuccessRead), z = k(() => a.editModeButton === !1 || !a.canSwitchEditMode || !a.canUpdate && !a.canDrop || !a.canUpdate && a.canDrop ? !1 : !p.value && a.mode !== w.Create && a.httpSuccessRead), ae = k(() => a.buttonNavVisibility === le.Always && (X.value || V.value || F.value) || c["prev-buttons-ever"] ? !0 : a.buttonNavVisibility === le.Never ? !1 : A.value || q.value || z.value);
    return (e, m) => {
      const E = se("lkt-button");
      return ae.value ? (i(), $("div", je, [
        e.groupButton !== !1 ? (i(), B(E, O({
          key: 0,
          ref: "groupButton"
        }, T.value, { class: "lkt-item-crud-group-button" }), {
          split: R(() => [
            z.value ? (i(), B(E, O({ key: 0 }, D.value, {
              checked: f.value,
              "onUpdate:checked": m[0] || (m[0] = (Q) => f.value = Q),
              class: "lkt-item-crud--switch-mode-button"
            }), null, 16, ["checked"])) : n("", !0),
            d(c)["prev-buttons-ever"] ? g(e.$slots, "prev-buttons-ever", {
              key: 1,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : n("", !0),
            d(c)["prev-buttons"] ? g(e.$slots, "prev-buttons", {
              key: 2,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : n("", !0),
            e.mode === d(w).Update && A.value ? (i(), B(E, O({
              key: 3,
              ref_key: "saveButtonRef",
              ref: I
            }, s.value, {
              disabled: !X.value,
              onLoading: N,
              onLoaded: S,
              onClick: J
            }), {
              default: R(() => [
                d(c)["button-save"] ? g(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: f.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : n("", !0)
              ]),
              _: 3
            }, 16, ["disabled"])) : e.mode === d(w).Create && A.value ? (i(), B(E, O({
              key: 4,
              ref_key: "saveButtonRef",
              ref: I
            }, b.value, {
              disabled: !V.value,
              onLoading: N,
              onLoaded: S,
              onClick: G
            }), {
              default: R(() => [
                d(c)["button-save"] ? g(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: f.value,
                  isCreate: !0,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : n("", !0)
              ]),
              _: 3
            }, 16, ["disabled"])) : n("", !0),
            e.mode !== d(w).Create ? Y((i(), B(E, O({
              key: 5,
              ref_key: "dropButtonRef",
              ref: U
            }, l.value, {
              disabled: !F.value,
              onLoading: N,
              onLoaded: S,
              onClick: L
            }), {
              default: R(() => [
                d(c)["button-drop"] ? g(e.$slots, "button-drop", {
                  key: 0,
                  item: e.item,
                  editMode: f.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : n("", !0)
              ]),
              _: 3
            }, 16, ["disabled"])), [
              [Z, q.value]
            ]) : n("", !0),
            d(c).buttons ? g(e.$slots, "buttons", { key: 6 }) : n("", !0)
          ]),
          _: 3
        }, 16)) : (i(), $(De, { key: 1 }, [
          d(c)["prev-buttons-ever"] ? Y((i(), $("div", Ae, [
            g(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [Z, !p.value]
          ]) : n("", !0),
          d(c)["prev-buttons"] ? Y((i(), $("div", Pe, [
            g(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [Z, f.value && !p.value]
          ]) : n("", !0),
          e.mode === d(w).Update && A.value ? (i(), B(E, O({
            key: 2,
            ref_key: "saveButtonRef",
            ref: I
          }, s.value, {
            disabled: !X.value,
            onLoading: N,
            onLoaded: S,
            onClick: J
          }), {
            default: R(() => [
              d(c)["button-save"] ? g(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: f.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : n("", !0)
            ]),
            _: 3
          }, 16, ["disabled"])) : e.mode === d(w).Create && A.value ? (i(), B(E, O({
            key: 3,
            ref_key: "saveButtonRef",
            ref: I
          }, b.value, {
            disabled: !V.value,
            onLoading: N,
            onLoaded: S,
            onClick: G
          }), {
            default: R(() => [
              d(c)["button-save"] ? g(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: f.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : n("", !0)
            ]),
            _: 3
          }, 16, ["disabled"])) : n("", !0),
          e.mode !== d(w).Create ? Y((i(), B(E, O({
            key: 4,
            ref_key: "dropButtonRef",
            ref: U
          }, l.value, {
            disabled: !F.value,
            onLoading: N,
            onLoaded: S,
            onClick: L
          }), {
            default: R(() => [
              d(c)["button-drop"] ? g(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: f.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : n("", !0)
            ]),
            _: 3
          }, 16, ["disabled"])), [
            [Z, q.value]
          ]) : n("", !0),
          d(c).buttons ? Y((i(), $("div", Xe, [
            g(e.$slots, "buttons")
          ], 512)), [
            [Z, f.value && !p.value]
          ]) : n("", !0),
          z.value ? (i(), B(E, O({ key: 6 }, D.value, {
            checked: f.value,
            "onUpdate:checked": m[1] || (m[1] = (Q) => f.value = Q),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : n("", !0)
        ], 64))
      ])) : n("", !0);
    };
  }
}), Fe = { class: "lkt-item-crud" }, Ge = {
  key: 0,
  class: "lkt-item-crud_header"
}, qe = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, ze = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, He = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Ke = {
  key: 2,
  class: "lkt-item-crud_content"
}, We = {
  key: 0,
  class: "lkt-grid-1"
}, Je = /* @__PURE__ */ ye({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ Ue({
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
  }, Ne(Le)),
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
  setup(C, { expose: x, emit: oe }) {
    const o = C, a = ke(), b = oe, s = v(!0), l = v(o.modelValue), D = v(o.perms), T = v(o.editing), c = v(!1), I = v(!1), U = v(200), p = v(new fe(l.value, o.dataStateConfig)), f = v(!1), N = v(new fe(o.readData)), S = v(o.mode === w.Create), G = v(!1), J = v(!1), L = v(null), ee = k(() => !S.value && Array.isArray(D.value) && D.value.includes(ie.Update)), te = k(() => !S.value && Array.isArray(D.value) && D.value.includes(ie.Drop)), X = k(() => !S.value && Array.isArray(D.value) && D.value.includes(ie.SwitchEditMode)), V = async () => {
      y("fetchItem"), s.value = !0, U.value = -1, I.value = !1;
      try {
        const t = await $e(o.readResource, o.readData);
        if (y("fetchItem -> response", t), s.value = !1, U.value = t.httpStatus, !t.success) {
          c.value = !1, U.value = t.httpStatus, b("error", t.httpStatus);
          return;
        }
        c.value = !0, l.value = t.data, D.value = t.perms, p.value.increment(l.value).turnStoredIntoOriginal(), f.value = p.value.changed(), N.value.turnStoredIntoOriginal(), b("read", t);
      } catch {
        s.value = !1, c.value = !1, U.value = 404, b("error", 404);
        return;
      }
    };
    h(() => o.modelValue, (t) => {
      l.value = t, p.value.increment(t);
    }, { deep: !0 }), h(l, (t) => {
      if (G.value = !0, y("item updated ->", l.value), typeof o.beforeEmitUpdate == "function") {
        y("item updated -> has beforeEmitUpdate");
        let u = o.beforeEmitUpdate(l.value);
        y("item updated -> override with: ", u), typeof u == "object" && (l.value = u);
      }
      b("update:modelValue", l.value), y("item updated -> update dataState"), p.value.increment(t), f.value = p.value.changed(), Se(() => G.value = !1);
    }, { deep: !0 }), h(D, () => b("perms", D.value)), h(f, (t) => {
      b("modified-data", t);
    }), h(() => o.readData, (t) => {
      N.value.increment(t), N.value.changed() && V();
    }), h(() => o.editing, (t) => {
      y("editing updated -> updating editMode", t), T.value = t;
    }), h(T, (t) => {
      y("editMode updated -> emit update", t), b("update:editing", t);
    }), Ie(() => {
      o.readResource && !S.value ? V() : (S.value, c.value = !0, T.value = !0, s.value = !1, p.value.increment(l.value).turnStoredIntoOriginal(), f.value = p.value.changed());
    });
    const F = (t, u) => {
      if (u) {
        if (s.value = !1, typeof t < "u" && (U.value = t.httpStatus, !t.success))
          return I.value = !0, b("error", t.httpStatus), !1;
        I.value = !0;
      }
      return !0;
    }, q = (t) => {
      !ne.value && t.autoReloadId && (y("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), o.readData.id = t.autoReloadId, y("doAutoReloadId -> turning off create mode"), S.value = !1, V());
    }, A = (t, u) => {
      if (y("onCreate"), !F(u, o.createButton.resource)) {
        o.notificationType === P.Toast && K({
          text: r.defaultCreateErrorText,
          details: r.defaultCreateErrorDetails,
          icon: r.defaultCreateErrorIcon,
          positionX: H.Right
        });
        return;
      }
      J.value = !0, y("onCreate -> turn stored data into original"), p.value.increment(l.value).turnStoredIntoOriginal(), o.notificationType === P.Toast && K({
        text: r.defaultCreateSuccessText,
        details: r.defaultCreateSuccessDetails,
        icon: r.defaultCreateSuccessIcon,
        positionX: H.Right
      }), q(u), b("create", u);
    }, z = (t, u) => {
      if (y("onUpdate"), !F(u, o.updateButton.resource)) {
        o.notificationType === P.Toast && K({
          text: r.defaultUpdateErrorText,
          details: r.defaultUpdateErrorDetails,
          icon: r.defaultUpdateErrorIcon,
          positionX: H.Right
        });
        return;
      }
      y("onUpdate -> turn stored data into original"), p.value.turnStoredIntoOriginal(), o.notificationType === P.Toast && K({
        text: r.defaultUpdateSuccessText,
        details: r.defaultUpdateSuccessDetails,
        icon: r.defaultUpdateSuccessIcon,
        positionX: H.Right
      }), q(u), b("update", u);
    }, ae = (t, u) => {
      if (y("onDrop"), !F(u, o.dropButton.resource)) {
        o.notificationType === P.Toast && K({
          text: r.defaultDropErrorText,
          details: r.defaultDropErrorDetails,
          icon: r.defaultDropErrorIcon,
          positionX: H.Right
        });
        return;
      }
      o.notificationType === P.Toast && K({
        text: r.defaultDropSuccessText,
        details: r.defaultDropSuccessDetails,
        icon: r.defaultDropSuccessIcon,
        positionX: H.Right
      }), b("drop", u), o.view === me.Modal && (y("onDrop -> close modal"), Ve(o.modalConfig.modalName, o.modalConfig.modalKey));
    };
    x({
      doDrop: () => {
        L.value && L.value.doDrop();
      },
      doRefresh: V,
      doSave: () => {
        L.value && L.value.doSave();
      },
      hasModifiedData: () => p.value.changed()
    });
    const E = k(() => {
      var t;
      return p.value.changed() ? (t = o.modalConfig) == null ? void 0 : t.closeConfirm : "";
    }), Q = (t) => {
      var u;
      if (typeof ((u = o.modalConfig) == null ? void 0 : u.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...t,
          itemCreated: J.value
        });
    }, ue = k(() => o.title.startsWith("__:") ? String(Oe(o.title.substring(3))) : o.title), Be = k(() => s.value ? !1 : ue.value.length > 0 || !!a["post-title"]), ne = k(() => o.view === me.Modal), pe = k(() => ne.value ? "lkt-modal" : "section"), he = k(() => pe.value === "lkt-modal" ? {
      title: o.title,
      item: l.value,
      ...o.modalConfig,
      beforeClose: Q,
      closeConfirm: E.value
    } : {});
    return (t, u) => {
      const ve = se("lkt-http-info"), Ce = se("lkt-loader");
      return i(), B(we(pe.value), Me(Re(he.value)), {
        default: R(() => [
          Te("article", Fe, [
            !ne.value && Be.value ? (i(), $("header", Ge, [
              d(a)["pre-title"] ? (i(), $("div", qe, [
                g(t.$slots, "pre-title", {
                  item: l.value,
                  loading: s.value
                })
              ])) : n("", !0),
              ue.value.length > 0 ? (i(), $("h1", ze, Ee(ue.value), 1)) : n("", !0),
              d(a)["post-title"] ? (i(), $("div", He, [
                g(t.$slots, "post-title", {
                  item: l.value,
                  loading: s.value
                })
              ])) : n("", !0)
            ])) : n("", !0),
            t.buttonNavPosition === d(be).Top ? (i(), B(ge, {
              key: 1,
              ref_key: "buttonNav",
              ref: L,
              loading: s.value,
              "onUpdate:loading": u[0] || (u[0] = (M) => s.value = M),
              editing: T.value,
              "onUpdate:editing": u[1] || (u[1] = (M) => T.value = M),
              item: l.value,
              mode: t.mode,
              view: t.view,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": t.createButton,
              "update-button": t.updateButton,
              "drop-button": t.dropButton,
              "edit-mode-button": t.editModeButton,
              "group-button": t.groupButton,
              "data-changed": f.value,
              "http-success-read": c.value,
              "can-update": ee.value,
              "can-drop": te.value,
              "can-switch-edit-mode": X.value,
              perms: D.value,
              onCreate: A,
              onSave: z,
              onDrop: ae
            }, ce({ _: 2 }, [
              d(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: R(({ canUpdate: M, canDrop: de, perms: re }) => [
                  g(t.$slots, "prev-buttons-ever", {
                    canUpdate: M,
                    canDrop: de,
                    perms: re
                  })
                ]),
                key: "0"
              } : void 0,
              d(a)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: R(({ canUpdate: M, canDrop: de, perms: re }) => [
                  g(t.$slots, "prev-buttons", {
                    canUpdate: M,
                    canDrop: de,
                    perms: re
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "perms"])) : n("", !0),
            s.value ? n("", !0) : (i(), $("div", Ke, [
              c.value ? (i(), $("div", We, [
                I.value && t.notificationType === d(P).Inline ? (i(), B(ve, {
                  key: 0,
                  code: U.value,
                  palette: U.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: u[2] || (u[2] = (M) => I.value = !1)
                }, null, 8, ["code", "palette"])) : n("", !0),
                g(t.$slots, "item", {
                  item: l.value,
                  loading: s.value,
                  editMode: T.value,
                  isCreate: S.value,
                  canUpdate: ee.value,
                  canDrop: te.value,
                  itemBeingEdited: G.value
                })
              ])) : t.notificationType === d(P).Inline ? (i(), B(ve, {
                key: 1,
                code: U.value
              }, null, 8, ["code"])) : n("", !0)
            ])),
            s.value ? (i(), B(Ce, { key: 3 })) : n("", !0),
            t.buttonNavPosition === d(be).Bottom ? (i(), B(ge, {
              key: 4,
              ref_key: "buttonNav",
              ref: L,
              loading: s.value,
              "onUpdate:loading": u[3] || (u[3] = (M) => s.value = M),
              editing: T.value,
              "onUpdate:editing": u[4] || (u[4] = (M) => T.value = M),
              item: l.value,
              mode: t.mode,
              view: t.view,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": t.createButton,
              "update-button": t.updateButton,
              "drop-button": t.dropButton,
              "edit-mode-button": t.editModeButton,
              "group-button": t.groupButton,
              "data-changed": f.value,
              "http-success-read": c.value,
              "can-update": ee.value,
              "can-drop": te.value,
              "can-switch-edit-mode": X.value,
              onCreate: A,
              onSave: z,
              onDrop: ae
            }, ce({ _: 2 }, [
              d(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: R(() => [
                  g(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              d(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: R(() => [
                  g(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode"])) : n("", !0)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), ot = {
  install: (C, x = {}) => {
    C.component("lkt-item-crud") === void 0 && C.component("lkt-item-crud", Je);
  }
}, ut = (C) => {
  W.defaultSaveIcon = C;
}, nt = (C) => {
  W.defaultDropIcon = C;
};
export {
  at as debugLktItemCrud,
  ot as default,
  nt as setItemCrudDefaultDropIcon,
  ut as setItemCrudDefaultSaveIcon
};
