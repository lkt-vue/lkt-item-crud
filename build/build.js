import { defineComponent as ge, ref as l, watch as h, useSlots as ye, computed as y, resolveComponent as le, createElementBlock as T, createCommentVNode as p, openBlock as s, withDirectives as _, createBlock as M, unref as c, renderSlot as D, vShow as x, mergeProps as ee, withCtx as $, mergeDefaults as De, nextTick as Se, onMounted as Ue, resolveDynamicComponent as Ie, normalizeProps as we, guardReactiveProps as Te, createElementVNode as Me, toDisplayString as Re, createSlots as ve } from "vue";
import { httpCall as Ee } from "lkt-http-client";
import { DataState as ce } from "lkt-data-state";
import { ensureButtonConfig as E, LktSettings as n, ItemCrudMode as w, ItemCrudButtonNavVisibility as re, TablePermission as ie, ItemCrudView as fe, ItemCrudButtonNavPosition as me, NotificationType as N, getDefaultValues as Ne, ItemCrud as $e, ToastPositionX as q } from "lkt-vue-kernel";
import { closeModal as Ve } from "lkt-modal";
import { __ as Le } from "lkt-i18n";
import { openToast as z } from "lkt-toast";
const G = class G {
};
G.debugEnabled = !1, G.defaultSaveIcon = "", G.defaultDropIcon = "";
let F = G;
const g = (...B) => {
  F.debugEnabled && console.info("[LktItemCrud] ", ...B);
}, tt = (B = !0) => {
  F.debugEnabled = B;
}, Oe = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Ae = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, je = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Pe = {
  key: 5,
  class: "lkt-item-crud-buttons"
}, be = /* @__PURE__ */ ge({
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
  setup(B, { expose: J, emit: te }) {
    const o = te, a = B, f = l(E(a.createButton, n.defaultCreateButton)), r = l(E(a.updateButton, n.defaultUpdateButton)), d = l(E(a.dropButton, n.defaultDropButton)), C = l(E(a.editModeButton, n.defaultEditModeButton));
    h(() => a.createButton, (t) => {
      f.value = E(t, n.defaultCreateButton);
    }, { deep: !0 }), h(() => a.updateButton, (t) => {
      r.value = E(t, n.defaultUpdateButton);
    }, { deep: !0 }), h(() => a.dropButton, (t) => {
      d.value = E(t, n.defaultDropButton);
    }, { deep: !0 }), h(() => a.editModeButton, (t) => {
      C.value = E(t, n.defaultEditModeButton);
    }, { deep: !0 });
    const b = ye(), k = l(null), I = l(null), v = l(a.loading);
    h(() => a.loading, (t) => v.value = t), h(v, (t) => o("update:loading", t));
    const i = l(a.editing);
    h(() => a.editing, (t) => i.value = t), h(i, (t) => o("update:editing", t));
    const U = () => {
      v.value = !0;
    }, V = () => {
      v.value = !1;
    }, R = (t, m) => {
      typeof t > "u" || o("create", t, m);
    }, H = (t, m) => {
      typeof t > "u" || o("save", t, m);
    }, Q = (t, m) => {
      typeof t > "u" || o("drop", t, m);
    };
    J({
      doSave: () => {
        k.value && typeof k.value.click == "function" && k.value.click();
      },
      doDrop: () => {
        I.value && typeof I.value.click == "function" && I.value.click();
      }
    });
    const O = y(() => {
      var t, m;
      return a.mode !== w.Update || !a.canUpdate || !a.dataChanged ? !1 : typeof ((t = r.value) == null ? void 0 : t.disabled) == "function" ? !r.value.disabled(a.item) : typeof ((m = r.value) == null ? void 0 : m.disabled) == "boolean" ? !r.value.disabled : !0;
    }), j = y(() => {
      var t, m;
      return a.mode !== w.Create || !a.dataChanged ? !1 : typeof ((t = f.value) == null ? void 0 : t.disabled) == "function" ? !f.value.disabled(a.item) : typeof ((m = f.value) == null ? void 0 : m.disabled) == "boolean" ? !f.value.disabled : !0;
    }), A = y(() => {
      var t, m;
      return a.canDrop ? typeof ((t = d.value) == null ? void 0 : t.disabled) == "function" ? !d.value.disabled(a.item) : typeof ((m = d.value) == null ? void 0 : m.disabled) == "boolean" ? !d.value.disabled : !0 : !1;
    }), P = y(() => !a.canDrop || a.dropButton === !1 ? !1 : !a.canUpdate && a.canDrop ? !0 : !v.value && a.editing && a.httpSuccessRead), X = y(() => a.mode === w.Create && a.createButton === !1 || a.mode === w.Update && a.updateButton === !1 ? !1 : a.dataChanged ? O.value || j.value : v.value ? !1 : a.mode === w.Create ? !0 : a.buttonNavVisibility === re.Never ? !1 : a.editing && a.httpSuccessRead), K = y(() => a.editModeButton === !1 || !a.canSwitchEditMode || !a.canUpdate && !a.canDrop || !a.canUpdate && a.canDrop ? !1 : !v.value && a.mode !== w.Create && a.httpSuccessRead), Z = y(() => a.buttonNavVisibility === re.Always && (O.value || j.value || A.value) || b["prev-buttons-ever"] ? !0 : a.buttonNavVisibility === re.Never ? !1 : X.value || P.value || K.value);
    return (t, m) => {
      const W = le("lkt-button");
      return Z.value ? (s(), T("div", Oe, [
        c(b)["prev-buttons-ever"] ? _((s(), T("div", Ae, [
          D(t.$slots, "prev-buttons-ever", {
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          })
        ], 512)), [
          [x, !v.value]
        ]) : p("", !0),
        c(b)["prev-buttons"] ? _((s(), T("div", je, [
          D(t.$slots, "prev-buttons", {
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          })
        ], 512)), [
          [x, i.value && !v.value]
        ]) : p("", !0),
        t.mode === c(w).Update && X.value ? (s(), M(W, ee({
          key: 2,
          ref_key: "saveButtonRef",
          ref: k
        }, r.value, {
          disabled: !O.value,
          onLoading: U,
          onLoaded: V,
          onClick: H
        }), {
          default: $(() => [
            c(b)["button-save"] ? D(t.$slots, "button-save", {
              key: 0,
              item: t.item,
              editMode: i.value,
              isCreate: !1,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : p("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])) : t.mode === c(w).Create && X.value ? (s(), M(W, ee({
          key: 3,
          ref_key: "saveButtonRef",
          ref: k
        }, f.value, {
          disabled: !j.value,
          onLoading: U,
          onLoaded: V,
          onClick: R
        }), {
          default: $(() => [
            c(b)["button-save"] ? D(t.$slots, "button-save", {
              key: 0,
              item: t.item,
              editMode: i.value,
              isCreate: !0,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : p("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])) : p("", !0),
        t.mode !== c(w).Create ? _((s(), M(W, ee({
          key: 4,
          ref_key: "dropButtonRef",
          ref: I
        }, d.value, {
          disabled: !A.value,
          onLoading: U,
          onLoaded: V,
          onClick: Q
        }), {
          default: $(() => [
            c(b)["button-drop"] ? D(t.$slots, "button-drop", {
              key: 0,
              item: t.item,
              editMode: i.value,
              isCreate: !1,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : p("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])), [
          [x, P.value]
        ]) : p("", !0),
        c(b).buttons ? _((s(), T("div", Pe, [
          D(t.$slots, "buttons")
        ], 512)), [
          [x, i.value && !v.value]
        ]) : p("", !0),
        K.value ? (s(), M(W, ee({ key: 6 }, C.value, {
          checked: i.value,
          "onUpdate:checked": m[0] || (m[0] = (ae) => i.value = ae),
          class: "lkt-item-crud--switch-mode-button"
        }), null, 16, ["checked"])) : p("", !0)
      ])) : p("", !0);
    };
  }
}), Xe = { class: "lkt-item-crud" }, qe = {
  key: 0,
  class: "lkt-item-crud_header"
}, ze = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, Fe = {
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
}, Ge = /* @__PURE__ */ ge({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ De({
    modelValue: {},
    editing: { type: Boolean },
    perms: {},
    mode: {},
    view: {},
    editModeButton: { type: [Object, Boolean] },
    dropButton: { type: [Object, Boolean] },
    createButton: { type: [Object, Boolean] },
    updateButton: { type: [Object, Boolean] },
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
  }, Ne($e)),
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
  setup(B, { expose: J, emit: te }) {
    const o = B, a = ye(), f = te, r = l(!0), d = l(o.modelValue), C = l(o.perms), b = l(o.editing), k = l(!1), I = l(!1), v = l(200), i = l(new ce(d.value, o.dataStateConfig)), U = l(!1), V = l(new ce(o.readData)), R = l(o.mode === w.Create), H = l(!1), Q = l(!1), L = l(null), Y = y(() => !R.value && Array.isArray(C.value) && C.value.includes(ie.Update)), O = y(() => !R.value && Array.isArray(C.value) && C.value.includes(ie.Drop)), j = y(() => !R.value && Array.isArray(C.value) && C.value.includes(ie.SwitchEditMode)), A = async () => {
      g("fetchItem"), r.value = !0, v.value = -1, I.value = !1;
      try {
        const e = await Ee(o.readResource, o.readData);
        if (g("fetchItem -> response", e), r.value = !1, v.value = e.httpStatus, !e.success) {
          k.value = !1, v.value = e.httpStatus, f("error", e.httpStatus);
          return;
        }
        k.value = !0, d.value = e.data, C.value = e.perms, i.value.increment(d.value).turnStoredIntoOriginal(), U.value = i.value.changed(), V.value.turnStoredIntoOriginal(), f("read", e);
      } catch {
        r.value = !1, k.value = !1, v.value = 404, f("error", 404);
        return;
      }
    };
    h(() => o.modelValue, (e) => {
      d.value = e, i.value.increment(e);
    }, { deep: !0 }), h(d, (e) => {
      if (H.value = !0, g("item updated ->", d.value), typeof o.beforeEmitUpdate == "function") {
        g("item updated -> has beforeEmitUpdate");
        let u = o.beforeEmitUpdate(d.value);
        g("item updated -> override with: ", u), typeof u == "object" && (d.value = u);
      }
      f("update:modelValue", d.value), g("item updated -> update dataState"), i.value.increment(e), U.value = i.value.changed(), Se(() => H.value = !1);
    }, { deep: !0 }), h(C, () => f("perms", C.value)), h(U, (e) => {
      f("modified-data", e);
    }), h(() => o.readData, (e) => {
      V.value.increment(e), V.value.changed() && A();
    }), h(() => o.editing, (e) => {
      g("editing updated -> updating editMode", e), b.value = e;
    }), h(b, (e) => {
      g("editMode updated -> emit update", e), f("update:editing", e);
    }), Ue(() => {
      o.readResource && !R.value ? A() : (R.value, k.value = !0, b.value = !0, r.value = !1, i.value.increment(d.value).turnStoredIntoOriginal(), U.value = i.value.changed());
    });
    const P = (e, u) => {
      if (u) {
        if (r.value = !1, typeof e < "u" && (v.value = e.httpStatus, !e.success))
          return I.value = !0, f("error", e.httpStatus), !1;
        I.value = !0;
      }
      return !0;
    }, X = (e) => {
      !ue.value && e.autoReloadId && (g("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), o.readData.id = e.autoReloadId, g("doAutoReloadId -> turning off create mode"), R.value = !1, A());
    }, K = (e, u) => {
      if (g("onCreate"), !P(u, o.createButton.resource)) {
        o.notificationType === N.Toast && z({
          text: n.defaultCreateErrorText,
          details: n.defaultCreateErrorDetails,
          icon: n.defaultCreateErrorIcon,
          positionX: q.Right
        });
        return;
      }
      Q.value = !0, g("onCreate -> turn stored data into original"), i.value.increment(d.value).turnStoredIntoOriginal(), o.notificationType === N.Toast && z({
        text: n.defaultCreateSuccessText,
        details: n.defaultCreateSuccessDetails,
        icon: n.defaultCreateSuccessIcon,
        positionX: q.Right
      }), X(u), f("create", u);
    }, Z = (e, u) => {
      if (g("onUpdate"), !P(u, o.updateButton.resource)) {
        o.notificationType === N.Toast && z({
          text: n.defaultUpdateErrorText,
          details: n.defaultUpdateErrorDetails,
          icon: n.defaultUpdateErrorIcon,
          positionX: q.Right
        });
        return;
      }
      g("onUpdate -> turn stored data into original"), i.value.turnStoredIntoOriginal(), o.notificationType === N.Toast && z({
        text: n.defaultUpdateSuccessText,
        details: n.defaultUpdateSuccessDetails,
        icon: n.defaultUpdateSuccessIcon,
        positionX: q.Right
      }), X(u), f("update", u);
    }, t = (e, u) => {
      if (g("onDrop"), !P(u, o.dropButton.resource)) {
        o.notificationType === N.Toast && z({
          text: n.defaultDropErrorText,
          details: n.defaultDropErrorDetails,
          icon: n.defaultDropErrorIcon,
          positionX: q.Right
        });
        return;
      }
      o.notificationType === N.Toast && z({
        text: n.defaultDropSuccessText,
        details: n.defaultDropSuccessDetails,
        icon: n.defaultDropSuccessIcon,
        positionX: q.Right
      }), f("drop", u), o.view === fe.Modal && (g("onDrop -> close modal"), Ve(o.modalConfig.modalName, o.modalConfig.modalKey));
    };
    J({
      doDrop: () => {
        L.value && L.value.doDrop();
      },
      doRefresh: A,
      doSave: () => {
        L.value && L.value.doSave();
      },
      hasModifiedData: () => i.value.changed()
    });
    const ae = y(() => {
      var e;
      return i.value.changed() ? (e = o.modalConfig) == null ? void 0 : e.closeConfirm : "";
    }), he = (e) => {
      var u;
      if (typeof ((u = o.modalConfig) == null ? void 0 : u.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...e,
          itemCreated: Q.value
        });
    }, oe = y(() => o.title.startsWith("__:") ? String(Le(o.title.substring(3))) : o.title), Be = y(() => r.value ? !1 : oe.value.length > 0 || !!a["post-title"]), ue = y(() => o.view === fe.Modal), se = y(() => ue.value ? "lkt-modal" : "section"), ke = y(() => se.value === "lkt-modal" ? {
      title: o.title,
      item: d.value,
      ...o.modalConfig,
      beforeClose: he,
      closeConfirm: ae.value
    } : {});
    return (e, u) => {
      const pe = le("lkt-http-info"), Ce = le("lkt-loader");
      return s(), M(Ie(se.value), we(Te(ke.value)), {
        default: $(() => [
          Me("article", Xe, [
            !ue.value && Be.value ? (s(), T("header", qe, [
              c(a)["pre-title"] ? (s(), T("div", ze, [
                D(e.$slots, "pre-title", {
                  item: d.value,
                  loading: r.value
                })
              ])) : p("", !0),
              oe.value.length > 0 ? (s(), T("h1", Fe, Re(oe.value), 1)) : p("", !0),
              c(a)["post-title"] ? (s(), T("div", He, [
                D(e.$slots, "post-title", {
                  item: d.value,
                  loading: r.value
                })
              ])) : p("", !0)
            ])) : p("", !0),
            e.buttonNavPosition === c(me).Top ? (s(), M(be, {
              key: 1,
              ref_key: "buttonNav",
              ref: L,
              loading: r.value,
              "onUpdate:loading": u[0] || (u[0] = (S) => r.value = S),
              editing: b.value,
              "onUpdate:editing": u[1] || (u[1] = (S) => b.value = S),
              item: d.value,
              mode: e.mode,
              view: e.view,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": e.createButton,
              "update-button": e.updateButton,
              "drop-button": e.dropButton,
              "edit-mode-button": e.editModeButton,
              "data-changed": U.value,
              "http-success-read": k.value,
              "can-update": Y.value,
              "can-drop": O.value,
              "can-switch-edit-mode": j.value,
              perms: C.value,
              onCreate: K,
              onSave: Z,
              onDrop: t
            }, ve({ _: 2 }, [
              c(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: $(({ canUpdate: S, canDrop: ne, perms: de }) => [
                  D(e.$slots, "prev-buttons-ever", {
                    canUpdate: S,
                    canDrop: ne,
                    perms: de
                  })
                ]),
                key: "0"
              } : void 0,
              c(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: $(({ canUpdate: S, canDrop: ne, perms: de }) => [
                  D(e.$slots, "prev-buttons", {
                    canUpdate: S,
                    canDrop: ne,
                    perms: de
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "perms"])) : p("", !0),
            r.value ? p("", !0) : (s(), T("div", Ke, [
              k.value ? (s(), T("div", We, [
                I.value && e.notificationType === c(N).Inline ? (s(), M(pe, {
                  key: 0,
                  code: v.value,
                  palette: v.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: u[2] || (u[2] = (S) => I.value = !1)
                }, null, 8, ["code", "palette"])) : p("", !0),
                D(e.$slots, "item", {
                  item: d.value,
                  loading: r.value,
                  editMode: b.value,
                  isCreate: R.value,
                  canUpdate: Y.value,
                  canDrop: O.value,
                  itemBeingEdited: H.value
                })
              ])) : e.notificationType === c(N).Inline ? (s(), M(pe, {
                key: 1,
                code: v.value
              }, null, 8, ["code"])) : p("", !0)
            ])),
            r.value ? (s(), M(Ce, { key: 3 })) : p("", !0),
            e.buttonNavPosition === c(me).Bottom ? (s(), M(be, {
              key: 4,
              ref_key: "buttonNav",
              ref: L,
              loading: r.value,
              "onUpdate:loading": u[3] || (u[3] = (S) => r.value = S),
              editing: b.value,
              "onUpdate:editing": u[4] || (u[4] = (S) => b.value = S),
              item: d.value,
              mode: e.mode,
              view: e.view,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": e.createButton,
              "update-button": e.updateButton,
              "drop-button": e.dropButton,
              "edit-mode-button": e.editModeButton,
              "data-changed": U.value,
              "http-success-read": k.value,
              "can-update": Y.value,
              "can-drop": O.value,
              "can-switch-edit-mode": j.value,
              onCreate: K,
              onSave: Z,
              onDrop: t
            }, ve({ _: 2 }, [
              c(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  D(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              c(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  D(e.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode"])) : p("", !0)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), at = {
  install: (B, J = {}) => {
    B.component("lkt-item-crud") === void 0 && B.component("lkt-item-crud", Ge);
  }
}, ot = (B) => {
  F.defaultSaveIcon = B;
}, ut = (B) => {
  F.defaultDropIcon = B;
};
export {
  tt as debugLktItemCrud,
  at as default,
  ut as setItemCrudDefaultDropIcon,
  ot as setItemCrudDefaultSaveIcon
};
