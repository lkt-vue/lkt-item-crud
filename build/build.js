import { defineComponent as Be, ref as p, watch as h, useSlots as ke, computed as k, resolveComponent as se, createElementBlock as E, createCommentVNode as i, openBlock as b, createBlock as j, mergeProps as L, withCtx as M, renderSlot as y, withDirectives as O, unref as n, createVNode as H, vShow as V, Fragment as Ue, mergeDefaults as Se, nextTick as Ie, onMounted as we, resolveDynamicComponent as Me, normalizeProps as Re, guardReactiveProps as Te, createElementVNode as Ee, toDisplayString as $e, createSlots as ce } from "vue";
import { httpCall as Ne } from "lkt-http-client";
import { DataState as fe } from "lkt-data-state";
import { ensureButtonConfig as A, LktSettings as r, ItemCrudMode as I, ItemCrudButtonNavVisibility as me, TablePermission as ie, ItemCrudView as be, ItemCrudButtonNavPosition as ge, NotificationType as X, getDefaultValues as Le, ItemCrud as Oe, ToastPositionX as W } from "lkt-vue-kernel";
import { closeModal as Ve, updateModalKey as Ae } from "lkt-modal";
import { __ as je } from "lkt-i18n";
import { openToast as J } from "lkt-toast";
const x = class x {
};
x.debugEnabled = !1, x.defaultSaveIcon = "", x.defaultDropIcon = "";
let Q = x;
const m = (...D) => {
  Q.debugEnabled && console.info("[LktItemCrud] ", ...D);
}, ut = (D = !0) => {
  Q.debugEnabled = D;
}, Pe = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Xe = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Ke = {
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
  setup(D, { expose: ee, emit: ue }) {
    const o = ue, a = D, g = p(A(a.createButton, r.defaultCreateButton)), s = p(A(a.updateButton, r.defaultUpdateButton)), d = p(A(a.dropButton, r.defaultDropButton)), B = p(A(a.editModeButton, r.defaultEditModeButton)), R = p(A(a.groupButton, r.defaultGroupButton));
    h(() => a.createButton, (e) => {
      g.value = A(e, r.defaultCreateButton);
    }, { deep: !0 }), h(() => a.updateButton, (e) => {
      s.value = A(e, r.defaultUpdateButton);
    }, { deep: !0 }), h(() => a.dropButton, (e) => {
      d.value = A(e, r.defaultDropButton);
    }, { deep: !0 }), h(() => a.editModeButton, (e) => {
      B.value = A(e, r.defaultEditModeButton);
    }, { deep: !0 });
    const v = ke(), S = p(null), U = p(null), l = p(a.loading);
    h(() => a.loading, (e) => l.value = e), h(l, (e) => o("update:loading", e));
    const c = p(a.editing);
    h(() => a.editing, (e) => c.value = e), h(c, (e) => o("update:editing", e));
    const $ = () => {
      l.value = !0;
    }, C = () => {
      l.value = !1;
    }, F = (e, f) => {
      typeof e > "u" || o("create", e, f);
    }, Y = (e, f) => {
      typeof e > "u" || o("save", e, f);
    }, N = (e, f) => {
      typeof e > "u" || o("drop", e, f);
    };
    ee({
      doSave: () => {
        S.value && typeof S.value.click == "function" && S.value.click();
      },
      doDrop: () => {
        U.value && typeof U.value.click == "function" && U.value.click();
      }
    });
    const Z = k(() => {
      var e, f;
      return a.mode !== I.Update || !a.canUpdate || !a.dataChanged ? !1 : typeof ((e = s.value) == null ? void 0 : e.disabled) == "function" ? !s.value.disabled(a.item) : typeof ((f = s.value) == null ? void 0 : f.disabled) == "boolean" ? !s.value.disabled : !0;
    }), K = k(() => {
      var e, f;
      return a.mode !== I.Create || !a.dataChanged ? !1 : typeof ((e = g.value) == null ? void 0 : e.disabled) == "function" ? !g.value.disabled(a.item) : typeof ((f = g.value) == null ? void 0 : f.disabled) == "boolean" ? !g.value.disabled : !0;
    }), G = k(() => {
      var e, f;
      return a.canDrop ? typeof ((e = d.value) == null ? void 0 : e.disabled) == "function" ? !d.value.disabled(a.item) : typeof ((f = d.value) == null ? void 0 : f.disabled) == "boolean" ? !d.value.disabled : !0 : !1;
    }), q = k(() => !a.canDrop || a.dropButton === !1 ? !1 : !a.canUpdate && a.canDrop ? !0 : !l.value && a.editing && a.httpSuccessRead), P = k(() => a.mode === I.Create && a.createButton === !1 || a.mode === I.Update && a.updateButton === !1 || l.value ? !1 : a.editing && a.httpSuccessRead), z = k(() => a.editModeButton === !1 || !a.canSwitchEditMode || !a.canUpdate && !a.canDrop || !a.canUpdate && a.canDrop ? !1 : !l.value && a.mode !== I.Create && a.httpSuccessRead), oe = k(() => a.buttonNavVisibility === me.Always || v["prev-buttons-ever"] ? !0 : a.buttonNavVisibility === me.Never ? !1 : P.value || q.value || z.value);
    return (e, f) => {
      const T = se("lkt-button");
      return oe.value ? (b(), E("div", Pe, [
        e.groupButton !== !1 ? (b(), j(T, L({
          key: 0,
          ref: "groupButton"
        }, R.value, { class: "lkt-item-crud-group-button" }), {
          split: M(() => [
            z.value ? (b(), j(T, L({ key: 0 }, B.value, {
              checked: c.value,
              "onUpdate:checked": f[0] || (f[0] = (_) => c.value = _),
              class: "lkt-item-crud--switch-mode-button"
            }), null, 16, ["checked"])) : i("", !0),
            n(v)["prev-buttons-ever"] ? y(e.$slots, "prev-buttons-ever", {
              key: 1,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : i("", !0),
            n(v)["prev-buttons"] ? y(e.$slots, "prev-buttons", {
              key: 2,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : i("", !0),
            O(H(T, L({
              ref_key: "saveButtonRef",
              ref: S
            }, s.value, {
              disabled: !Z.value,
              onLoading: $,
              onLoaded: C,
              onClick: Y
            }), {
              default: M(() => [
                n(v)["button-save"] ? y(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: c.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : i("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [V, e.mode === n(I).Update && P.value]
            ]),
            O(H(T, L({
              ref_key: "saveButtonRef",
              ref: S
            }, g.value, {
              disabled: !K.value,
              onLoading: $,
              onLoaded: C,
              onClick: F
            }), {
              default: M(() => [
                n(v)["button-save"] ? y(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: c.value,
                  isCreate: !0,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : i("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [V, e.mode === n(I).Create && P.value]
            ]),
            O(H(T, L({
              ref_key: "dropButtonRef",
              ref: U
            }, d.value, {
              disabled: !G.value,
              onLoading: $,
              onLoaded: C,
              onClick: N
            }), {
              default: M(() => [
                n(v)["button-drop"] ? y(e.$slots, "button-drop", {
                  key: 0,
                  item: e.item,
                  editMode: c.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : i("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [V, q.value && e.mode !== n(I).Create]
            ]),
            n(v).buttons ? y(e.$slots, "buttons", { key: 3 }) : i("", !0)
          ]),
          _: 3
        }, 16)) : (b(), E(Ue, { key: 1 }, [
          n(v)["prev-buttons-ever"] ? O((b(), E("div", Xe, [
            y(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [V, !l.value]
          ]) : i("", !0),
          n(v)["prev-buttons"] ? O((b(), E("div", Ke, [
            y(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [V, c.value && !l.value]
          ]) : i("", !0),
          O(H(T, L({
            ref_key: "saveButtonRef",
            ref: S
          }, s.value, {
            disabled: !Z.value,
            onLoading: $,
            onLoaded: C,
            onClick: Y
          }), {
            default: M(() => [
              n(v)["button-save"] ? y(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: c.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : i("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [V, e.mode === n(I).Update && P.value]
          ]),
          O(H(T, L({
            ref_key: "saveButtonRef",
            ref: S
          }, g.value, {
            disabled: !K.value,
            onLoading: $,
            onLoaded: C,
            onClick: F
          }), {
            default: M(() => [
              n(v)["button-save"] ? y(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: c.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: !1
              }) : i("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [V, e.mode === n(I).Create && P.value]
          ]),
          O(H(T, L({
            ref_key: "dropButtonRef",
            ref: U
          }, d.value, {
            disabled: !G.value,
            onLoading: $,
            onLoaded: C,
            onClick: N
          }), {
            default: M(() => [
              n(v)["button-drop"] ? y(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: c.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : i("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [V, q.value && e.mode !== n(I).Create]
          ]),
          n(v).buttons ? O((b(), E("div", Fe, [
            y(e.$slots, "buttons")
          ], 512)), [
            [V, c.value && !l.value]
          ]) : i("", !0),
          z.value ? (b(), j(T, L({ key: 3 }, B.value, {
            checked: c.value,
            "onUpdate:checked": f[1] || (f[1] = (_) => c.value = _),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : i("", !0)
        ], 64))
      ])) : i("", !0);
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
}, We = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Je = {
  key: 2,
  class: "lkt-item-crud_content"
}, Qe = {
  key: 0,
  class: "lkt-grid-1"
}, Ye = /* @__PURE__ */ Be({
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
  }, Le(Oe)),
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
  setup(D, { expose: ee, emit: ue }) {
    const o = D, a = ke(), g = ue, s = p(!0), d = p(o.modelValue), B = p(o.perms), R = p(o.editing), v = p(!1), S = p(!1), U = p(200), l = p(new fe(d.value, o.dataStateConfig)), c = p(!1), $ = p(new fe(o.readData)), C = p(o.mode === I.Create), F = p(!1), Y = p(!1), N = p(null), te = k(() => !C.value && Array.isArray(B.value) && B.value.includes(ie.Update)), ae = k(() => !C.value && Array.isArray(B.value) && B.value.includes(ie.Drop)), Z = k(() => !C.value && Array.isArray(B.value) && B.value.includes(ie.SwitchEditMode));
    h(() => o.mode, (t) => {
      C.value = t === I.Create;
    });
    const K = async () => {
      m("fetchItem"), s.value = !0, U.value = -1, S.value = !1;
      try {
        const t = await Ne(o.readResource, o.readData);
        if (m("fetchItem -> response", t), s.value = !1, U.value = t.httpStatus, !t.success) {
          v.value = !1, U.value = t.httpStatus, g("error", t.httpStatus);
          return;
        }
        v.value = !0, d.value = t.data, B.value = t.perms, l.value.increment(d.value).turnStoredIntoOriginal(), c.value = l.value.changed(), $.value.turnStoredIntoOriginal(), g("read", t);
      } catch {
        s.value = !1, v.value = !1, U.value = 404, g("error", 404);
        return;
      }
    };
    h(() => o.modelValue, (t) => {
      d.value = t, l.value.increment(t);
    }, { deep: !0 }), h(d, (t) => {
      if (F.value = !0, m("item updated ->", d.value), typeof o.beforeEmitUpdate == "function") {
        m("item updated -> has beforeEmitUpdate");
        let u = o.beforeEmitUpdate(d.value);
        m("item updated -> override with: ", u), typeof u == "object" && (d.value = u);
      }
      g("update:modelValue", d.value), m("item updated -> update dataState"), l.value.increment(t), c.value = l.value.changed(), Ie(() => F.value = !1);
    }, { deep: !0 }), h(B, () => g("perms", B.value)), h(c, (t) => {
      g("modified-data", t);
    }), h(() => o.readData, (t) => {
      $.value.increment(t), $.value.changed() && K();
    }), h(() => o.editing, (t) => {
      m("editing updated -> updating editMode", t), R.value = t;
    }), h(R, (t) => {
      m("editMode updated -> emit update", t), g("update:editing", t);
    }), we(() => {
      o.readResource && !C.value ? K() : (C.value, v.value = !0, R.value = !0, s.value = !1, l.value.increment(d.value).turnStoredIntoOriginal(), c.value = l.value.changed());
    });
    const G = (t, u) => {
      if (u) {
        if (s.value = !1, typeof t < "u" && (U.value = t.httpStatus, !t.success))
          return S.value = !0, g("error", t.httpStatus), !1;
        S.value = !0;
      }
      return !0;
    }, q = (t) => {
      m("doAutoReloadId -> enter: ", t), typeof t < "u" && t.autoReloadId && (m("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), de.value ? (m("doAutoReloadId -> insideModal: ", o), Ae(o.modalConfig.modalName, o.modalConfig.modalKey, t.autoReloadId)) : (m("doAutoReloadId -> outsideModal"), o.readData.id = t.autoReloadId, m("doAutoReloadId -> turning off create mode"), C.value = !1, K()));
    }, P = (t, u) => {
      if (m("onCreate"), !G(u, o.createButton.resource)) {
        o.notificationType === X.Toast && J({
          text: r.defaultCreateErrorText,
          details: r.defaultCreateErrorDetails,
          icon: r.defaultCreateErrorIcon,
          positionX: W.Right
        });
        return;
      }
      Y.value = !0, m("onCreate -> turn stored data into original"), l.value.increment(d.value).turnStoredIntoOriginal(), o.notificationType === X.Toast && J({
        text: r.defaultCreateSuccessText,
        details: r.defaultCreateSuccessDetails,
        icon: r.defaultCreateSuccessIcon,
        positionX: W.Right
      }), q(u), m("onCreate -> beforeEmitCreate"), g("create", u);
    }, z = (t, u) => {
      if (m("onUpdate"), !G(u, o.updateButton.resource)) {
        o.notificationType === X.Toast && J({
          text: r.defaultUpdateErrorText,
          details: r.defaultUpdateErrorDetails,
          icon: r.defaultUpdateErrorIcon,
          positionX: W.Right
        });
        return;
      }
      m("onUpdate -> turn stored data into original"), l.value.turnStoredIntoOriginal(), o.notificationType === X.Toast && J({
        text: r.defaultUpdateSuccessText,
        details: r.defaultUpdateSuccessDetails,
        icon: r.defaultUpdateSuccessIcon,
        positionX: W.Right
      }), q(u), g("update", u);
    }, oe = (t, u) => {
      if (m("onDrop"), !G(u, o.dropButton.resource)) {
        o.notificationType === X.Toast && J({
          text: r.defaultDropErrorText,
          details: r.defaultDropErrorDetails,
          icon: r.defaultDropErrorIcon,
          positionX: W.Right
        });
        return;
      }
      o.notificationType === X.Toast && J({
        text: r.defaultDropSuccessText,
        details: r.defaultDropSuccessDetails,
        icon: r.defaultDropSuccessIcon,
        positionX: W.Right
      }), g("drop", u), o.view === be.Modal && (m("onDrop -> close modal"), Ve(o.modalConfig.modalName, o.modalConfig.modalKey));
    };
    ee({
      doDrop: () => {
        N.value && N.value.doDrop();
      },
      doRefresh: K,
      doSave: () => {
        N.value && N.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        l.value.increment(d.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => l.value.changed()
    });
    const T = k(() => {
      var t;
      return l.value.changed() ? (t = o.modalConfig) == null ? void 0 : t.closeConfirm : "";
    }), _ = (t) => {
      var u;
      if (typeof ((u = o.modalConfig) == null ? void 0 : u.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...t,
          itemCreated: Y.value
        });
    }, ne = k(() => o.title.startsWith("__:") ? String(je(o.title.substring(3))) : o.title), he = k(() => s.value ? !1 : ne.value.length > 0 || !!a["post-title"]), de = k(() => o.view === be.Modal), pe = k(() => de.value ? "lkt-modal" : "section"), Ce = k(() => pe.value === "lkt-modal" ? {
      title: o.title,
      item: d.value,
      ...o.modalConfig,
      beforeClose: _,
      closeConfirm: T.value
    } : {});
    return (t, u) => {
      const ve = se("lkt-http-info"), De = se("lkt-loader");
      return b(), j(Me(pe.value), Re(Te(Ce.value)), {
        default: M(() => [
          Ee("article", Ge, [
            !de.value && he.value ? (b(), E("header", qe, [
              n(a)["pre-title"] ? (b(), E("div", ze, [
                y(t.$slots, "pre-title", {
                  item: d.value,
                  loading: s.value
                })
              ])) : i("", !0),
              ne.value.length > 0 ? (b(), E("h1", He, $e(ne.value), 1)) : i("", !0),
              n(a)["post-title"] ? (b(), E("div", We, [
                y(t.$slots, "post-title", {
                  item: d.value,
                  loading: s.value
                })
              ])) : i("", !0)
            ])) : i("", !0),
            t.buttonNavPosition === n(ge).Top ? (b(), j(ye, {
              key: 1,
              ref_key: "buttonNav",
              ref: N,
              loading: s.value,
              "onUpdate:loading": u[0] || (u[0] = (w) => s.value = w),
              editing: R.value,
              "onUpdate:editing": u[1] || (u[1] = (w) => R.value = w),
              item: d.value,
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
              perms: B.value,
              onCreate: P,
              onSave: z,
              onDrop: oe
            }, ce({ _: 2 }, [
              n(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: M(({ canUpdate: w, canDrop: re, perms: le }) => [
                  y(t.$slots, "prev-buttons-ever", {
                    canUpdate: w,
                    canDrop: re,
                    perms: le
                  })
                ]),
                key: "0"
              } : void 0,
              n(a)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: M(({ canUpdate: w, canDrop: re, perms: le }) => [
                  y(t.$slots, "prev-buttons", {
                    canUpdate: w,
                    canDrop: re,
                    perms: le
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "perms"])) : i("", !0),
            s.value ? i("", !0) : (b(), E("div", Je, [
              v.value ? (b(), E("div", Qe, [
                S.value && t.notificationType === n(X).Inline ? (b(), j(ve, {
                  key: 0,
                  code: U.value,
                  palette: U.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: u[2] || (u[2] = (w) => S.value = !1)
                }, null, 8, ["code", "palette"])) : i("", !0),
                y(t.$slots, "item", {
                  item: d.value,
                  loading: s.value,
                  editMode: R.value,
                  isCreate: C.value,
                  canUpdate: te.value,
                  canDrop: ae.value,
                  itemBeingEdited: F.value,
                  perms: B.value
                })
              ])) : t.notificationType === n(X).Inline ? (b(), j(ve, {
                key: 1,
                code: U.value
              }, null, 8, ["code"])) : i("", !0)
            ])),
            s.value ? (b(), j(De, { key: 3 })) : i("", !0),
            t.buttonNavPosition === n(ge).Bottom ? (b(), j(ye, {
              key: 4,
              ref_key: "buttonNav",
              ref: N,
              loading: s.value,
              "onUpdate:loading": u[3] || (u[3] = (w) => s.value = w),
              editing: R.value,
              "onUpdate:editing": u[4] || (u[4] = (w) => R.value = w),
              item: d.value,
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
              perms: B.value,
              onCreate: P,
              onSave: z,
              onDrop: oe
            }, ce({ _: 2 }, [
              n(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: M(() => [
                  y(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              n(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: M(() => [
                  y(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "perms"])) : i("", !0)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), nt = {
  install: (D, ee = {}) => {
    D.component("lkt-item-crud") === void 0 && D.component("lkt-item-crud", Ye);
  }
}, dt = (D) => {
  Q.defaultSaveIcon = D;
}, rt = (D) => {
  Q.defaultDropIcon = D;
};
export {
  ut as debugLktItemCrud,
  nt as default,
  rt as setItemCrudDefaultDropIcon,
  dt as setItemCrudDefaultSaveIcon
};
