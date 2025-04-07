import { defineComponent as Be, ref as p, watch as h, useSlots as ke, computed as k, resolveComponent as se, createElementBlock as E, createCommentVNode as l, openBlock as m, createBlock as A, mergeProps as N, withCtx as M, renderSlot as g, withDirectives as V, unref as n, createVNode as K, vShow as O, Fragment as Ue, mergeDefaults as Se, nextTick as Ie, onMounted as we, resolveDynamicComponent as Me, normalizeProps as Re, guardReactiveProps as Te, createElementVNode as Ee, toDisplayString as $e, createSlots as ce } from "vue";
import { httpCall as Le } from "lkt-http-client";
import { DataState as fe } from "lkt-data-state";
import { ensureButtonConfig as j, LktSettings as d, ItemCrudMode as w, ItemCrudButtonNavVisibility as me, TablePermission as ie, ItemCrudView as be, ItemCrudButtonNavPosition as ge, NotificationType as X, getDefaultValues as Ne, ItemCrud as Ve, ToastPositionX as W } from "lkt-vue-kernel";
import { closeModal as Oe } from "lkt-modal";
import { __ as je } from "lkt-i18n";
import { openToast as J } from "lkt-toast";
const x = class x {
};
x.debugEnabled = !1, x.defaultSaveIcon = "", x.defaultDropIcon = "";
let Q = x;
const B = (...C) => {
  Q.debugEnabled && console.info("[LktItemCrud] ", ...C);
}, ot = (C = !0) => {
  Q.debugEnabled = C;
}, Ae = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Pe = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Xe = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Fe = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, ye = /* @__PURE__ */ Be({
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
  setup(C, { expose: ee, emit: ue }) {
    const o = ue, a = C, b = p(j(a.createButton, d.defaultCreateButton)), i = p(j(a.updateButton, d.defaultUpdateButton)), r = p(j(a.dropButton, d.defaultDropButton)), y = p(j(a.editModeButton, d.defaultEditModeButton)), R = p(j(a.groupButton, d.defaultGroupButton));
    h(() => a.createButton, (e) => {
      b.value = j(e, d.defaultCreateButton);
    }, { deep: !0 }), h(() => a.updateButton, (e) => {
      i.value = j(e, d.defaultUpdateButton);
    }, { deep: !0 }), h(() => a.dropButton, (e) => {
      r.value = j(e, d.defaultDropButton);
    }, { deep: !0 }), h(() => a.editModeButton, (e) => {
      y.value = j(e, d.defaultEditModeButton);
    }, { deep: !0 });
    const v = ke(), S = p(null), D = p(null), s = p(a.loading);
    h(() => a.loading, (e) => s.value = e), h(s, (e) => o("update:loading", e));
    const c = p(a.editing);
    h(() => a.editing, (e) => c.value = e), h(c, (e) => o("update:editing", e));
    const $ = () => {
      s.value = !0;
    }, U = () => {
      s.value = !1;
    }, G = (e, f) => {
      typeof e > "u" || o("create", e, f);
    }, Y = (e, f) => {
      typeof e > "u" || o("save", e, f);
    }, L = (e, f) => {
      typeof e > "u" || o("drop", e, f);
    };
    ee({
      doSave: () => {
        S.value && typeof S.value.click == "function" && S.value.click();
      },
      doDrop: () => {
        D.value && typeof D.value.click == "function" && D.value.click();
      }
    });
    const Z = k(() => {
      var e, f;
      return a.mode !== w.Update || !a.canUpdate || !a.dataChanged ? !1 : typeof ((e = i.value) == null ? void 0 : e.disabled) == "function" ? !i.value.disabled(a.item) : typeof ((f = i.value) == null ? void 0 : f.disabled) == "boolean" ? !i.value.disabled : !0;
    }), F = k(() => {
      var e, f;
      return a.mode !== w.Create || !a.dataChanged ? !1 : typeof ((e = b.value) == null ? void 0 : e.disabled) == "function" ? !b.value.disabled(a.item) : typeof ((f = b.value) == null ? void 0 : f.disabled) == "boolean" ? !b.value.disabled : !0;
    }), q = k(() => {
      var e, f;
      return a.canDrop ? typeof ((e = r.value) == null ? void 0 : e.disabled) == "function" ? !r.value.disabled(a.item) : typeof ((f = r.value) == null ? void 0 : f.disabled) == "boolean" ? !r.value.disabled : !0 : !1;
    }), z = k(() => !a.canDrop || a.dropButton === !1 ? !1 : !a.canUpdate && a.canDrop ? !0 : !s.value && a.editing && a.httpSuccessRead), P = k(() => a.mode === w.Create && a.createButton === !1 || a.mode === w.Update && a.updateButton === !1 || s.value ? !1 : a.editing && a.httpSuccessRead), H = k(() => a.editModeButton === !1 || !a.canSwitchEditMode || !a.canUpdate && !a.canDrop || !a.canUpdate && a.canDrop ? !1 : !s.value && a.mode !== w.Create && a.httpSuccessRead), oe = k(() => a.buttonNavVisibility === me.Always || v["prev-buttons-ever"] ? !0 : a.buttonNavVisibility === me.Never ? !1 : P.value || z.value || H.value);
    return (e, f) => {
      const T = se("lkt-button");
      return oe.value ? (m(), E("div", Ae, [
        e.groupButton !== !1 ? (m(), A(T, N({
          key: 0,
          ref: "groupButton"
        }, R.value, { class: "lkt-item-crud-group-button" }), {
          split: M(() => [
            H.value ? (m(), A(T, N({ key: 0 }, y.value, {
              checked: c.value,
              "onUpdate:checked": f[0] || (f[0] = (_) => c.value = _),
              class: "lkt-item-crud--switch-mode-button"
            }), null, 16, ["checked"])) : l("", !0),
            n(v)["prev-buttons-ever"] ? g(e.$slots, "prev-buttons-ever", {
              key: 1,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : l("", !0),
            n(v)["prev-buttons"] ? g(e.$slots, "prev-buttons", {
              key: 2,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : l("", !0),
            V(K(T, N({
              ref_key: "saveButtonRef",
              ref: S
            }, i.value, {
              disabled: !Z.value,
              onLoading: $,
              onLoaded: U,
              onClick: Y
            }), {
              default: M(() => [
                n(v)["button-save"] ? g(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: c.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : l("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [O, e.mode === n(w).Update && P.value]
            ]),
            V(K(T, N({
              ref_key: "saveButtonRef",
              ref: S
            }, b.value, {
              disabled: !F.value,
              onLoading: $,
              onLoaded: U,
              onClick: G
            }), {
              default: M(() => [
                n(v)["button-save"] ? g(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: c.value,
                  isCreate: !0,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : l("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [O, e.mode === n(w).Create && P.value]
            ]),
            V(K(T, N({
              ref_key: "dropButtonRef",
              ref: D
            }, r.value, {
              disabled: !q.value,
              onLoading: $,
              onLoaded: U,
              onClick: L
            }), {
              default: M(() => [
                n(v)["button-drop"] ? g(e.$slots, "button-drop", {
                  key: 0,
                  item: e.item,
                  editMode: c.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : l("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [O, z.value && e.mode !== n(w).Create]
            ]),
            n(v).buttons ? g(e.$slots, "buttons", { key: 3 }) : l("", !0)
          ]),
          _: 3
        }, 16)) : (m(), E(Ue, { key: 1 }, [
          n(v)["prev-buttons-ever"] ? V((m(), E("div", Pe, [
            g(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [O, !s.value]
          ]) : l("", !0),
          n(v)["prev-buttons"] ? V((m(), E("div", Xe, [
            g(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [O, c.value && !s.value]
          ]) : l("", !0),
          V(K(T, N({
            ref_key: "saveButtonRef",
            ref: S
          }, i.value, {
            disabled: !Z.value,
            onLoading: $,
            onLoaded: U,
            onClick: Y
          }), {
            default: M(() => [
              n(v)["button-save"] ? g(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: c.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : l("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [O, e.mode === n(w).Update && P.value]
          ]),
          V(K(T, N({
            ref_key: "saveButtonRef",
            ref: S
          }, b.value, {
            disabled: !F.value,
            onLoading: $,
            onLoaded: U,
            onClick: G
          }), {
            default: M(() => [
              n(v)["button-save"] ? g(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: c.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : l("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [O, e.mode === n(w).Create && P.value]
          ]),
          V(K(T, N({
            ref_key: "dropButtonRef",
            ref: D
          }, r.value, {
            disabled: !q.value,
            onLoading: $,
            onLoaded: U,
            onClick: L
          }), {
            default: M(() => [
              n(v)["button-drop"] ? g(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: c.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : l("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [O, z.value && e.mode !== n(w).Create]
          ]),
          n(v).buttons ? V((m(), E("div", Fe, [
            g(e.$slots, "buttons")
          ], 512)), [
            [O, c.value && !s.value]
          ]) : l("", !0),
          H.value ? (m(), A(T, N({ key: 3 }, y.value, {
            checked: c.value,
            "onUpdate:checked": f[1] || (f[1] = (_) => c.value = _),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : l("", !0)
        ], 64))
      ])) : l("", !0);
    };
  }
}), Ge = { class: "lkt-item-crud" }, qe = {
  key: 0,
  class: "lkt-item-crud_header"
}, ze = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, He = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, Ke = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, We = {
  key: 2,
  class: "lkt-item-crud_content"
}, Je = {
  key: 0,
  class: "lkt-grid-1"
}, Qe = /* @__PURE__ */ Be({
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
  }, Ne(Ve)),
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
  setup(C, { expose: ee, emit: ue }) {
    const o = C, a = ke(), b = ue, i = p(!0), r = p(o.modelValue), y = p(o.perms), R = p(o.editing), v = p(!1), S = p(!1), D = p(200), s = p(new fe(r.value, o.dataStateConfig)), c = p(!1), $ = p(new fe(o.readData)), U = p(o.mode === w.Create), G = p(!1), Y = p(!1), L = p(null), te = k(() => !U.value && Array.isArray(y.value) && y.value.includes(ie.Update)), ae = k(() => !U.value && Array.isArray(y.value) && y.value.includes(ie.Drop)), Z = k(() => !U.value && Array.isArray(y.value) && y.value.includes(ie.SwitchEditMode)), F = async () => {
      B("fetchItem"), i.value = !0, D.value = -1, S.value = !1;
      try {
        const t = await Le(o.readResource, o.readData);
        if (B("fetchItem -> response", t), i.value = !1, D.value = t.httpStatus, !t.success) {
          v.value = !1, D.value = t.httpStatus, b("error", t.httpStatus);
          return;
        }
        v.value = !0, r.value = t.data, y.value = t.perms, s.value.increment(r.value).turnStoredIntoOriginal(), c.value = s.value.changed(), $.value.turnStoredIntoOriginal(), b("read", t);
      } catch {
        i.value = !1, v.value = !1, D.value = 404, b("error", 404);
        return;
      }
    };
    h(() => o.modelValue, (t) => {
      r.value = t, s.value.increment(t);
    }, { deep: !0 }), h(r, (t) => {
      if (G.value = !0, B("item updated ->", r.value), typeof o.beforeEmitUpdate == "function") {
        B("item updated -> has beforeEmitUpdate");
        let u = o.beforeEmitUpdate(r.value);
        B("item updated -> override with: ", u), typeof u == "object" && (r.value = u);
      }
      b("update:modelValue", r.value), B("item updated -> update dataState"), s.value.increment(t), c.value = s.value.changed(), Ie(() => G.value = !1);
    }, { deep: !0 }), h(y, () => b("perms", y.value)), h(c, (t) => {
      b("modified-data", t);
    }), h(() => o.readData, (t) => {
      $.value.increment(t), $.value.changed() && F();
    }), h(() => o.editing, (t) => {
      B("editing updated -> updating editMode", t), R.value = t;
    }), h(R, (t) => {
      B("editMode updated -> emit update", t), b("update:editing", t);
    }), we(() => {
      o.readResource && !U.value ? F() : (U.value, v.value = !0, R.value = !0, i.value = !1, s.value.increment(r.value).turnStoredIntoOriginal(), c.value = s.value.changed());
    });
    const q = (t, u) => {
      if (u) {
        if (i.value = !1, typeof t < "u" && (D.value = t.httpStatus, !t.success))
          return S.value = !0, b("error", t.httpStatus), !1;
        S.value = !0;
      }
      return !0;
    }, z = (t) => {
      !de.value && typeof t < "u" && t.autoReloadId && (B("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), o.readData.id = t.autoReloadId, B("doAutoReloadId -> turning off create mode"), U.value = !1, F());
    }, P = (t, u) => {
      if (B("onCreate"), !q(u, o.createButton.resource)) {
        o.notificationType === X.Toast && J({
          text: d.defaultCreateErrorText,
          details: d.defaultCreateErrorDetails,
          icon: d.defaultCreateErrorIcon,
          positionX: W.Right
        });
        return;
      }
      Y.value = !0, B("onCreate -> turn stored data into original"), s.value.increment(r.value).turnStoredIntoOriginal(), o.notificationType === X.Toast && J({
        text: d.defaultCreateSuccessText,
        details: d.defaultCreateSuccessDetails,
        icon: d.defaultCreateSuccessIcon,
        positionX: W.Right
      }), z(u), b("create", u);
    }, H = (t, u) => {
      if (B("onUpdate"), !q(u, o.updateButton.resource)) {
        o.notificationType === X.Toast && J({
          text: d.defaultUpdateErrorText,
          details: d.defaultUpdateErrorDetails,
          icon: d.defaultUpdateErrorIcon,
          positionX: W.Right
        });
        return;
      }
      B("onUpdate -> turn stored data into original"), s.value.turnStoredIntoOriginal(), o.notificationType === X.Toast && J({
        text: d.defaultUpdateSuccessText,
        details: d.defaultUpdateSuccessDetails,
        icon: d.defaultUpdateSuccessIcon,
        positionX: W.Right
      }), z(u), b("update", u);
    }, oe = (t, u) => {
      if (B("onDrop"), !q(u, o.dropButton.resource)) {
        o.notificationType === X.Toast && J({
          text: d.defaultDropErrorText,
          details: d.defaultDropErrorDetails,
          icon: d.defaultDropErrorIcon,
          positionX: W.Right
        });
        return;
      }
      o.notificationType === X.Toast && J({
        text: d.defaultDropSuccessText,
        details: d.defaultDropSuccessDetails,
        icon: d.defaultDropSuccessIcon,
        positionX: W.Right
      }), b("drop", u), o.view === be.Modal && (B("onDrop -> close modal"), Oe(o.modalConfig.modalName, o.modalConfig.modalKey));
    };
    ee({
      doDrop: () => {
        L.value && L.value.doDrop();
      },
      doRefresh: F,
      doSave: () => {
        L.value && L.value.doSave();
      },
      hasModifiedData: () => s.value.changed()
    });
    const T = k(() => {
      var t;
      return s.value.changed() ? (t = o.modalConfig) == null ? void 0 : t.closeConfirm : "";
    }), _ = (t) => {
      var u;
      if (typeof ((u = o.modalConfig) == null ? void 0 : u.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...t,
          itemCreated: Y.value
        });
    }, ne = k(() => o.title.startsWith("__:") ? String(je(o.title.substring(3))) : o.title), he = k(() => i.value ? !1 : ne.value.length > 0 || !!a["post-title"]), de = k(() => o.view === be.Modal), pe = k(() => de.value ? "lkt-modal" : "section"), Ce = k(() => pe.value === "lkt-modal" ? {
      title: o.title,
      item: r.value,
      ...o.modalConfig,
      beforeClose: _,
      closeConfirm: T.value
    } : {});
    return (t, u) => {
      const ve = se("lkt-http-info"), De = se("lkt-loader");
      return m(), A(Me(pe.value), Re(Te(Ce.value)), {
        default: M(() => [
          Ee("article", Ge, [
            !de.value && he.value ? (m(), E("header", qe, [
              n(a)["pre-title"] ? (m(), E("div", ze, [
                g(t.$slots, "pre-title", {
                  item: r.value,
                  loading: i.value
                })
              ])) : l("", !0),
              ne.value.length > 0 ? (m(), E("h1", He, $e(ne.value), 1)) : l("", !0),
              n(a)["post-title"] ? (m(), E("div", Ke, [
                g(t.$slots, "post-title", {
                  item: r.value,
                  loading: i.value
                })
              ])) : l("", !0)
            ])) : l("", !0),
            t.buttonNavPosition === n(ge).Top ? (m(), A(ye, {
              key: 1,
              ref_key: "buttonNav",
              ref: L,
              loading: i.value,
              "onUpdate:loading": u[0] || (u[0] = (I) => i.value = I),
              editing: R.value,
              "onUpdate:editing": u[1] || (u[1] = (I) => R.value = I),
              item: r.value,
              mode: t.mode,
              view: t.view,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": t.createButton,
              "update-button": t.updateButton,
              "drop-button": t.dropButton,
              "edit-mode-button": t.editModeButton,
              "group-button": t.groupButton,
              "data-changed": c.value,
              "http-success-read": v.value,
              "can-update": te.value,
              "can-drop": ae.value,
              "can-switch-edit-mode": Z.value,
              perms: y.value,
              onCreate: P,
              onSave: H,
              onDrop: oe
            }, ce({ _: 2 }, [
              n(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: M(({ canUpdate: I, canDrop: re, perms: le }) => [
                  g(t.$slots, "prev-buttons-ever", {
                    canUpdate: I,
                    canDrop: re,
                    perms: le
                  })
                ]),
                key: "0"
              } : void 0,
              n(a)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: M(({ canUpdate: I, canDrop: re, perms: le }) => [
                  g(t.$slots, "prev-buttons", {
                    canUpdate: I,
                    canDrop: re,
                    perms: le
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "perms"])) : l("", !0),
            i.value ? l("", !0) : (m(), E("div", We, [
              v.value ? (m(), E("div", Je, [
                S.value && t.notificationType === n(X).Inline ? (m(), A(ve, {
                  key: 0,
                  code: D.value,
                  palette: D.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: u[2] || (u[2] = (I) => S.value = !1)
                }, null, 8, ["code", "palette"])) : l("", !0),
                g(t.$slots, "item", {
                  item: r.value,
                  loading: i.value,
                  editMode: R.value,
                  isCreate: U.value,
                  canUpdate: te.value,
                  canDrop: ae.value,
                  itemBeingEdited: G.value,
                  perms: y.value
                })
              ])) : t.notificationType === n(X).Inline ? (m(), A(ve, {
                key: 1,
                code: D.value
              }, null, 8, ["code"])) : l("", !0)
            ])),
            i.value ? (m(), A(De, { key: 3 })) : l("", !0),
            t.buttonNavPosition === n(ge).Bottom ? (m(), A(ye, {
              key: 4,
              ref_key: "buttonNav",
              ref: L,
              loading: i.value,
              "onUpdate:loading": u[3] || (u[3] = (I) => i.value = I),
              editing: R.value,
              "onUpdate:editing": u[4] || (u[4] = (I) => R.value = I),
              item: r.value,
              mode: t.mode,
              view: t.view,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": t.createButton,
              "update-button": t.updateButton,
              "drop-button": t.dropButton,
              "edit-mode-button": t.editModeButton,
              "group-button": t.groupButton,
              "data-changed": c.value,
              "http-success-read": v.value,
              "can-update": te.value,
              "can-drop": ae.value,
              "can-switch-edit-mode": Z.value,
              perms: y.value,
              onCreate: P,
              onSave: H,
              onDrop: oe
            }, ce({ _: 2 }, [
              n(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: M(() => [
                  g(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              n(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: M(() => [
                  g(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "perms"])) : l("", !0)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), ut = {
  install: (C, ee = {}) => {
    C.component("lkt-item-crud") === void 0 && C.component("lkt-item-crud", Qe);
  }
}, nt = (C) => {
  Q.defaultSaveIcon = C;
}, dt = (C) => {
  Q.defaultDropIcon = C;
};
export {
  ot as debugLktItemCrud,
  ut as default,
  dt as setItemCrudDefaultDropIcon,
  nt as setItemCrudDefaultSaveIcon
};
