import { defineComponent as me, ref as l, watch as h, useSlots as be, computed as y, resolveComponent as ie, createElementBlock as w, createCommentVNode as v, openBlock as s, withDirectives as Z, createBlock as T, unref as c, renderSlot as k, vShow as x, mergeProps as ee, withCtx as $, mergeDefaults as Ce, nextTick as ke, onMounted as De, resolveDynamicComponent as Se, normalizeProps as Ie, guardReactiveProps as Ue, createElementVNode as we, toDisplayString as Te, createSlots as se } from "vue";
import { httpCall as Me } from "lkt-http-client";
import { DataState as ve } from "lkt-data-state";
import { ensureButtonConfig as E, LktSettings as n, ItemCrudMode as U, ItemCrudButtonNavVisibility as ne, TablePermission as de, ItemCrudView as pe, ItemCrudButtonNavPosition as ce, NotificationType as N, getDefaultValues as Re, ItemCrud as Ee, ToastPositionX as X } from "lkt-vue-kernel";
import { closeModal as Ne } from "lkt-modal";
import { __ as $e } from "lkt-i18n";
import { openToast as _ } from "lkt-toast";
const W = class W {
};
W.debugEnabled = !1, W.defaultSaveIcon = "", W.defaultDropIcon = "";
let q = W;
const g = (...B) => {
  q.debugEnabled && console.info("[LktItemCrud] ", ...B);
}, xe = (B = !0) => {
  q.debugEnabled = B;
}, Ve = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Le = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Oe = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Ae = {
  key: 5,
  class: "lkt-item-crud-buttons"
}, fe = /* @__PURE__ */ me({
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
  setup(B, { expose: G, emit: te }) {
    const o = te, a = B, f = l(E(a.createButton, n.defaultCreateButton)), i = l(E(a.updateButton, n.defaultUpdateButton)), d = l(E(a.dropButton, n.defaultDropButton)), D = l(E(a.editModeButton, n.defaultEditModeButton));
    h(() => a.createButton, (t) => {
      f.value = E(t, n.defaultCreateButton);
    }, { deep: !0 }), h(() => a.updateButton, (t) => {
      i.value = E(t, n.defaultUpdateButton);
    }, { deep: !0 }), h(() => a.dropButton, (t) => {
      d.value = E(t, n.defaultDropButton);
    }, { deep: !0 }), h(() => a.editModeButton, (t) => {
      D.value = E(t, n.defaultEditModeButton);
    }, { deep: !0 });
    const b = be(), C = l(null), I = l(null), p = l(a.loading);
    h(() => a.loading, (t) => p.value = t), h(p, (t) => o("update:loading", t));
    const r = l(a.editing);
    h(() => a.editing, (t) => r.value = t), h(r, (t) => o("update:editing", t));
    const S = () => {
      p.value = !0;
    }, V = () => {
      p.value = !1;
    }, M = (t, m) => {
      typeof t > "u" || o("create", t, m);
    }, z = (t, m) => {
      typeof t > "u" || o("save", t, m);
    }, J = (t, m) => {
      typeof t > "u" || o("drop", t, m);
    };
    G({
      doSave: () => {
        C.value && typeof C.value.click == "function" && C.value.click();
      },
      doDrop: () => {
        I.value && typeof I.value.click == "function" && I.value.click();
      }
    });
    const A = y(() => {
      var t, m;
      return a.mode !== U.Create && !a.canUpdate || !a.dataChanged ? !1 : typeof ((t = i.value) == null ? void 0 : t.disabled) == "function" ? !i.value.disabled(a.item) : typeof ((m = i.value) == null ? void 0 : m.disabled) == "boolean" ? !i.value.disabled : !0;
    }), F = y(() => {
      var t, m;
      return a.mode !== U.Create || !a.dataChanged ? !1 : typeof ((t = f.value) == null ? void 0 : t.disabled) == "function" ? !f.value.disabled(a.item) : typeof ((m = f.value) == null ? void 0 : m.disabled) == "boolean" ? !f.value.disabled : !0;
    }), O = y(() => {
      var t, m;
      return a.canDrop ? typeof ((t = d.value) == null ? void 0 : t.disabled) == "function" ? !d.value.disabled(a.item) : typeof ((m = d.value) == null ? void 0 : m.disabled) == "boolean" ? !d.value.disabled : !0 : !1;
    }), j = y(() => !a.canDrop || a.dropButton === !1 ? !1 : !a.canUpdate && a.canDrop ? !0 : !p.value && a.editing && a.httpSuccessRead), P = y(() => a.mode === U.Create && a.createButton === !1 || a.mode === U.Update && a.updateButton === !1 ? !1 : a.dataChanged ? !0 : p.value ? !1 : a.mode === U.Create ? !0 : a.buttonNavVisibility === ne.Never ? !1 : a.editing && a.httpSuccessRead), H = y(() => a.editModeButton === !1 || !a.canSwitchEditMode || !a.canUpdate && !a.canDrop || !a.canUpdate && a.canDrop ? !1 : !p.value && a.mode !== U.Create && a.httpSuccessRead), Y = y(() => a.buttonNavVisibility === ne.Always && (A.value || F.value || O.value) || b["prev-buttons-ever"] ? !0 : a.buttonNavVisibility === ne.Never ? !1 : P.value || j.value || H.value);
    return (t, m) => {
      const K = ie("lkt-button");
      return Y.value ? (s(), w("div", Ve, [
        c(b)["prev-buttons-ever"] ? Z((s(), w("div", Le, [
          k(t.$slots, "prev-buttons-ever")
        ], 512)), [
          [x, !p.value]
        ]) : v("", !0),
        c(b)["prev-buttons"] ? Z((s(), w("div", Oe, [
          k(t.$slots, "prev-buttons")
        ], 512)), [
          [x, r.value && !p.value]
        ]) : v("", !0),
        t.mode === c(U).Update && P.value ? (s(), T(K, ee({
          key: 2,
          ref_key: "saveButtonRef",
          ref: C
        }, i.value, {
          disabled: !A.value,
          onLoading: S,
          onLoaded: V,
          onClick: z
        }), {
          default: $(() => [
            c(b)["button-save"] ? k(t.$slots, "button-save", {
              key: 0,
              item: t.item,
              editMode: r.value,
              isCreate: !1,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : v("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])) : t.mode === c(U).Create && P.value ? (s(), T(K, ee({
          key: 3,
          ref_key: "saveButtonRef",
          ref: C
        }, f.value, {
          disabled: !F.value,
          onLoading: S,
          onLoaded: V,
          onClick: M
        }), {
          default: $(() => [
            c(b)["button-save"] ? k(t.$slots, "button-save", {
              key: 0,
              item: t.item,
              editMode: r.value,
              isCreate: !0,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : v("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])) : v("", !0),
        t.mode !== c(U).Create ? Z((s(), T(K, ee({
          key: 4,
          ref_key: "dropButtonRef",
          ref: I
        }, d.value, {
          disabled: !O.value,
          onLoading: S,
          onLoaded: V,
          onClick: J
        }), {
          default: $(() => [
            c(b)["button-drop"] ? k(t.$slots, "button-drop", {
              key: 0,
              item: t.item,
              editMode: r.value,
              isCreate: !1,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : v("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])), [
          [x, j.value]
        ]) : v("", !0),
        c(b).buttons ? Z((s(), w("div", Ae, [
          k(t.$slots, "buttons")
        ], 512)), [
          [x, r.value && !p.value]
        ]) : v("", !0),
        H.value ? (s(), T(K, ee({ key: 6 }, D.value, {
          checked: r.value,
          "onUpdate:checked": m[0] || (m[0] = (ae) => r.value = ae),
          class: "lkt-item-crud--switch-mode-button"
        }), null, 16, ["checked"])) : v("", !0)
      ])) : v("", !0);
    };
  }
}), je = { class: "lkt-item-crud" }, Pe = {
  key: 0,
  class: "lkt-item-crud_header"
}, Xe = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, _e = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, qe = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, ze = {
  key: 2,
  class: "lkt-item-crud_content"
}, Fe = {
  key: 0,
  class: "lkt-grid-1"
}, He = /* @__PURE__ */ me({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ Ce({
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
  }, Re(Ee)),
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
  setup(B, { expose: G, emit: te }) {
    const o = B, a = be(), f = te, i = l(!0), d = l(o.modelValue), D = l(o.perms), b = l(o.editing), C = l(!1), I = l(!1), p = l(200), r = l(new ve(d.value, o.dataStateConfig)), S = l(!1), V = l(new ve(o.readData)), M = l(o.mode === U.Create), z = l(!1), J = l(!1), L = l(null), Q = y(() => !M.value && Array.isArray(D.value) && D.value.includes(de.Update)), A = y(() => !M.value && Array.isArray(D.value) && D.value.includes(de.Drop)), F = y(() => !M.value && Array.isArray(D.value) && D.value.includes(de.SwitchEditMode)), O = async () => {
      g("fetchItem"), i.value = !0, p.value = -1, I.value = !1;
      try {
        const e = await Me(o.readResource, o.readData);
        if (g("fetchItem -> response", e), i.value = !1, p.value = e.httpStatus, !e.success) {
          C.value = !1, p.value = e.httpStatus, f("error", e.httpStatus);
          return;
        }
        C.value = !0, d.value = e.data, D.value = e.perms, r.value.increment(d.value).turnStoredIntoOriginal(), S.value = r.value.changed(), V.value.turnStoredIntoOriginal(), f("read", e);
      } catch {
        i.value = !1, C.value = !1, p.value = 404, f("error", 404);
        return;
      }
    };
    h(() => o.modelValue, (e) => {
      d.value = e, r.value.increment(e);
    }, { deep: !0 }), h(d, (e) => {
      if (z.value = !0, g("item updated ->", d.value), typeof o.beforeEmitUpdate == "function") {
        g("item updated -> has beforeEmitUpdate");
        let u = o.beforeEmitUpdate(d.value);
        g("item updated -> override with: ", u), typeof u == "object" && (d.value = u);
      }
      f("update:modelValue", d.value), g("item updated -> update dataState"), r.value.increment(e), S.value = r.value.changed(), ke(() => z.value = !1);
    }, { deep: !0 }), h(D, () => f("perms", D.value)), h(S, (e) => {
      f("modified-data", e);
    }), h(() => o.readData, (e) => {
      V.value.increment(e), V.value.changed() && O();
    }), h(() => o.editing, (e) => {
      g("editing updated -> updating editMode", e), b.value = e;
    }), h(b, (e) => {
      g("editMode updated -> emit update", e), f("update:editing", e);
    }), De(() => {
      o.readResource && !M.value ? O() : (M.value, C.value = !0, b.value = !0, i.value = !1, r.value.increment(d.value).turnStoredIntoOriginal(), S.value = r.value.changed());
    });
    const j = (e, u) => {
      if (u) {
        if (i.value = !1, typeof e < "u" && (p.value = e.httpStatus, !e.success))
          return I.value = !0, f("error", e.httpStatus), !1;
        I.value = !0;
      }
      return !0;
    }, P = (e) => {
      !ue.value && e.autoReloadId && (g("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), o.readData.id = e.autoReloadId, g("doAutoReloadId -> turning off create mode"), M.value = !1, O());
    }, H = (e, u) => {
      if (g("onCreate"), !j(u, o.createButton.resource)) {
        o.notificationType === N.Toast && _({
          text: n.defaultCreateErrorText,
          details: n.defaultCreateErrorDetails,
          icon: n.defaultCreateErrorIcon,
          positionX: X.Right
        });
        return;
      }
      J.value = !0, g("onCreate -> turn stored data into original"), r.value.increment(d.value).turnStoredIntoOriginal(), o.notificationType === N.Toast && _({
        text: n.defaultCreateSuccessText,
        details: n.defaultCreateSuccessDetails,
        icon: n.defaultCreateSuccessIcon,
        positionX: X.Right
      }), P(u), f("create", u);
    }, Y = (e, u) => {
      if (g("onUpdate"), !j(u, o.updateButton.resource)) {
        o.notificationType === N.Toast && _({
          text: n.defaultUpdateErrorText,
          details: n.defaultUpdateErrorDetails,
          icon: n.defaultUpdateErrorIcon,
          positionX: X.Right
        });
        return;
      }
      g("onUpdate -> turn stored data into original"), r.value.turnStoredIntoOriginal(), o.notificationType === N.Toast && _({
        text: n.defaultUpdateSuccessText,
        details: n.defaultUpdateSuccessDetails,
        icon: n.defaultUpdateSuccessIcon,
        positionX: X.Right
      }), P(u), f("update", u);
    }, t = (e, u) => {
      if (g("onDrop"), !j(u, o.dropButton.resource)) {
        o.notificationType === N.Toast && _({
          text: n.defaultDropErrorText,
          details: n.defaultDropErrorDetails,
          icon: n.defaultDropErrorIcon,
          positionX: X.Right
        });
        return;
      }
      o.notificationType === N.Toast && _({
        text: n.defaultDropSuccessText,
        details: n.defaultDropSuccessDetails,
        icon: n.defaultDropSuccessIcon,
        positionX: X.Right
      }), f("drop", u), o.view === pe.Modal && (g("onDrop -> close modal"), Ne(o.modalConfig.modalName, o.modalConfig.modalKey));
    };
    G({
      doDrop: () => {
        L.value && L.value.doDrop();
      },
      doRefresh: O,
      doSave: () => {
        L.value && L.value.doSave();
      },
      hasModifiedData: () => r.value.changed()
    });
    const ae = y(() => {
      var e;
      return r.value.changed() ? (e = o.modalConfig) == null ? void 0 : e.closeConfirm : "";
    }), ge = (e) => {
      var u;
      if (typeof ((u = o.modalConfig) == null ? void 0 : u.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...e,
          itemCreated: J.value
        });
    }, oe = y(() => o.title.startsWith("__:") ? String($e(o.title.substring(3))) : o.title), ye = y(() => i.value ? !1 : oe.value.length > 0 || !!a["post-title"]), ue = y(() => o.view === pe.Modal), re = y(() => ue.value ? "lkt-modal" : "section"), he = y(() => re.value === "lkt-modal" ? {
      title: o.title,
      item: d.value,
      ...o.modalConfig,
      beforeClose: ge,
      closeConfirm: ae.value
    } : {});
    return (e, u) => {
      const le = ie("lkt-http-info"), Be = ie("lkt-loader");
      return s(), T(Se(re.value), Ie(Ue(he.value)), {
        default: $(() => [
          we("article", je, [
            !ue.value && ye.value ? (s(), w("header", Pe, [
              c(a)["pre-title"] ? (s(), w("div", Xe, [
                k(e.$slots, "pre-title", {
                  item: d.value,
                  loading: i.value
                })
              ])) : v("", !0),
              oe.value.length > 0 ? (s(), w("h1", _e, Te(oe.value), 1)) : v("", !0),
              c(a)["post-title"] ? (s(), w("div", qe, [
                k(e.$slots, "post-title", {
                  item: d.value,
                  loading: i.value
                })
              ])) : v("", !0)
            ])) : v("", !0),
            e.buttonNavPosition === c(ce).Top ? (s(), T(fe, {
              key: 1,
              ref_key: "buttonNav",
              ref: L,
              loading: i.value,
              "onUpdate:loading": u[0] || (u[0] = (R) => i.value = R),
              editing: b.value,
              "onUpdate:editing": u[1] || (u[1] = (R) => b.value = R),
              item: d.value,
              mode: e.mode,
              view: e.view,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": e.createButton,
              "update-button": e.updateButton,
              "drop-button": e.dropButton,
              "edit-mode-button": e.editModeButton,
              "data-changed": S.value,
              "http-success-read": C.value,
              "can-update": Q.value,
              "can-drop": A.value,
              "can-switch-edit-mode": F.value,
              onCreate: H,
              onSave: Y,
              onDrop: t
            }, se({ _: 2 }, [
              c(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  k(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              c(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  k(e.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode"])) : v("", !0),
            i.value ? v("", !0) : (s(), w("div", ze, [
              C.value ? (s(), w("div", Fe, [
                I.value && e.notificationType === c(N).Inline ? (s(), T(le, {
                  key: 0,
                  code: p.value,
                  palette: p.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: u[2] || (u[2] = (R) => I.value = !1)
                }, null, 8, ["code", "palette"])) : v("", !0),
                k(e.$slots, "item", {
                  item: d.value,
                  loading: i.value,
                  editMode: b.value,
                  isCreate: M.value,
                  canUpdate: Q.value,
                  canDrop: A.value,
                  itemBeingEdited: z.value
                })
              ])) : e.notificationType === c(N).Inline ? (s(), T(le, {
                key: 1,
                code: p.value
              }, null, 8, ["code"])) : v("", !0)
            ])),
            i.value ? (s(), T(Be, { key: 3 })) : v("", !0),
            e.buttonNavPosition === c(ce).Bottom ? (s(), T(fe, {
              key: 4,
              ref_key: "buttonNav",
              ref: L,
              loading: i.value,
              "onUpdate:loading": u[3] || (u[3] = (R) => i.value = R),
              editing: b.value,
              "onUpdate:editing": u[4] || (u[4] = (R) => b.value = R),
              item: d.value,
              mode: e.mode,
              view: e.view,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": e.createButton,
              "update-button": e.updateButton,
              "drop-button": e.dropButton,
              "edit-mode-button": e.editModeButton,
              "data-changed": S.value,
              "http-success-read": C.value,
              "can-update": Q.value,
              "can-drop": A.value,
              "can-switch-edit-mode": F.value,
              onCreate: H,
              onSave: Y,
              onDrop: t
            }, se({ _: 2 }, [
              c(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  k(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              c(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  k(e.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode"])) : v("", !0)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), et = {
  install: (B, G = {}) => {
    B.component("lkt-item-crud") === void 0 && B.component("lkt-item-crud", He);
  }
}, tt = (B) => {
  q.defaultSaveIcon = B;
}, at = (B) => {
  q.defaultDropIcon = B;
};
export {
  xe as debugLktItemCrud,
  et as default,
  at as setItemCrudDefaultDropIcon,
  tt as setItemCrudDefaultSaveIcon
};
