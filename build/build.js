import { defineComponent as me, ref as i, watch as k, useSlots as be, computed as y, resolveComponent as de, createElementBlock as U, createCommentVNode as v, openBlock as s, withDirectives as Y, createBlock as w, unref as p, renderSlot as D, vShow as Z, mergeProps as x, withCtx as V, mergeDefaults as Be, nextTick as De, onMounted as Se, resolveDynamicComponent as Ie, normalizeProps as Ue, guardReactiveProps as we, createElementVNode as Te, toDisplayString as Me, createSlots as se } from "vue";
import { httpCall as Re } from "lkt-http-client";
import { DataState as ve } from "lkt-data-state";
import { ensureButtonConfig as E, LktSettings as n, ItemCrudMode as $, ItemCrudButtonNavVisibility as ue, TablePermission as ne, ItemCrudView as pe, ItemCrudButtonNavPosition as ce, NotificationType as N, getDefaultValues as Ee, ItemCrud as Ne, ToastPositionX as O } from "lkt-vue-kernel";
import { closeModal as $e } from "lkt-modal";
import { __ as Ve } from "lkt-i18n";
import { openToast as j } from "lkt-toast";
const G = class G {
};
G.debugEnabled = !1, G.defaultSaveIcon = "", G.defaultDropIcon = "";
let q = G;
const g = (...C) => {
  q.debugEnabled && console.info("[LktItemCrud] ", ...C);
}, et = (C = !0) => {
  q.debugEnabled = C;
}, Le = {
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
}, fe = /* @__PURE__ */ me({
  __name: "ButtonNav",
  props: {
    item: { default: () => ({}) },
    editing: { type: Boolean, default: !1 },
    loading: { type: Boolean },
    view: {},
    mode: {},
    createButton: {},
    updateButton: {},
    dropButton: {},
    editModeButton: {},
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
  setup(C, { expose: J, emit: ee }) {
    const o = ee, a = C, c = i(E(a.createButton, n.defaultCreateButton)), M = i(E(a.updateButton, n.defaultUpdateButton)), d = i(E(a.dropButton, n.defaultDropButton)), r = i(E(a.editModeButton, n.defaultEditModeButton));
    k(() => a.createButton, (t) => {
      c.value = E(t, n.defaultCreateButton);
    }, { deep: !0 }), k(() => a.updateButton, (t) => {
      M.value = E(t, n.defaultUpdateButton);
    }, { deep: !0 }), k(() => a.dropButton, (t) => {
      d.value = E(t, n.defaultDropButton);
    }, { deep: !0 }), k(() => a.editModeButton, (t) => {
      r.value = E(t, n.defaultEditModeButton);
    }, { deep: !0 });
    const m = be(), B = i(null), S = i(null), b = i(a.loading);
    k(() => a.loading, (t) => b.value = t), k(b, (t) => o("update:loading", t));
    const f = i(a.editing);
    k(() => a.editing, (t) => f.value = t), k(f, (t) => o("update:editing", t));
    const h = () => {
      b.value = !0;
    }, I = () => {
      b.value = !1;
    }, z = (t, l) => {
      typeof t > "u" || o("create", t, l);
    }, T = (t, l) => {
      typeof t > "u" || o("save", t, l);
    }, F = (t, l) => {
      typeof t > "u" || o("drop", t, l);
    };
    J({
      doSave: () => {
        B.value && typeof B.value.click == "function" && B.value.click();
      },
      doDrop: () => {
        S.value && typeof S.value.click == "function" && S.value.click();
      }
    });
    const X = y(() => {
      var t, l;
      return a.mode !== $.Create && !a.canUpdate || !a.dataChanged ? !1 : typeof ((t = M.value) == null ? void 0 : t.disabled) == "function" ? !M.value.disabled(a.item) : typeof ((l = M.value) == null ? void 0 : l.disabled) == "boolean" ? !M.value.disabled : !0;
    }), _ = y(() => {
      var t, l;
      return a.mode !== $.Create || !a.dataChanged ? !1 : typeof ((t = c.value) == null ? void 0 : t.disabled) == "function" ? !c.value.disabled(a.item) : typeof ((l = c.value) == null ? void 0 : l.disabled) == "boolean" ? !c.value.disabled : !0;
    }), H = y(() => {
      var t, l;
      return a.canDrop ? typeof ((t = d.value) == null ? void 0 : t.disabled) == "function" ? !d.value.disabled(a.item) : typeof ((l = d.value) == null ? void 0 : l.disabled) == "boolean" ? !d.value.disabled : !0 : !1;
    }), A = y(() => a.canDrop ? !a.canUpdate && a.canDrop ? !0 : !b.value && a.editing && a.httpSuccessRead : !1), P = y(() => a.dataChanged ? !0 : b.value ? !1 : a.mode === $.Create ? !0 : a.buttonNavVisibility === ue.Never ? !1 : a.editing && a.httpSuccessRead), K = y(() => !a.canSwitchEditMode || !a.canUpdate && !a.canDrop || !a.canUpdate && a.canDrop ? !1 : !b.value && a.mode !== $.Create && a.httpSuccessRead), Q = y(() => a.buttonNavVisibility === ue.Always && (X.value || _.value || H.value) || m["prev-buttons-ever"] ? !0 : a.buttonNavVisibility === ue.Never ? !1 : P.value || A.value || K.value);
    return (t, l) => {
      const W = de("lkt-button");
      return Q.value ? (s(), U("div", Le, [
        p(m)["prev-buttons-ever"] ? Y((s(), U("div", Ae, [
          D(t.$slots, "prev-buttons-ever")
        ], 512)), [
          [Z, !b.value]
        ]) : v("", !0),
        p(m)["prev-buttons"] ? Y((s(), U("div", Pe, [
          D(t.$slots, "prev-buttons")
        ], 512)), [
          [Z, f.value && !b.value]
        ]) : v("", !0),
        t.mode === p($).Update && P.value ? (s(), w(W, x({
          key: 2,
          ref_key: "saveButtonRef",
          ref: B
        }, M.value, {
          disabled: !X.value,
          onLoading: h,
          onLoaded: I,
          onClick: T
        }), {
          default: V(() => [
            p(m)["button-save"] ? D(t.$slots, "button-save", {
              key: 0,
              item: t.item,
              editMode: f.value,
              isCreate: !1,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : v("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])) : t.mode === p($).Create && P.value ? (s(), w(W, x({
          key: 3,
          ref_key: "saveButtonRef",
          ref: B
        }, c.value, {
          disabled: !_.value,
          onLoading: h,
          onLoaded: I,
          onClick: z
        }), {
          default: V(() => [
            p(m)["button-save"] ? D(t.$slots, "button-save", {
              key: 0,
              item: t.item,
              editMode: f.value,
              isCreate: !0,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : v("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])) : v("", !0),
        t.mode !== p($).Create ? Y((s(), w(W, x({
          key: 4,
          ref_key: "dropButtonRef",
          ref: S
        }, d.value, {
          disabled: !H.value,
          onLoading: h,
          onLoaded: I,
          onClick: F
        }), {
          default: V(() => [
            p(m)["button-drop"] ? D(t.$slots, "button-drop", {
              key: 0,
              item: t.item,
              editMode: f.value,
              isCreate: !1,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : v("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])), [
          [Z, A.value]
        ]) : v("", !0),
        p(m).buttons ? Y((s(), U("div", Xe, [
          D(t.$slots, "buttons")
        ], 512)), [
          [Z, f.value && !b.value]
        ]) : v("", !0),
        K.value ? (s(), w(W, x({ key: 6 }, r.value, {
          checked: f.value,
          "onUpdate:checked": l[0] || (l[0] = (ie) => f.value = ie),
          class: "lkt-item-crud--switch-mode-button"
        }), null, 16, ["checked"])) : v("", !0)
      ])) : v("", !0);
    };
  }
}), _e = { class: "lkt-item-crud" }, Oe = {
  key: 0,
  class: "lkt-item-crud_header"
}, je = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, qe = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, ze = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Fe = {
  key: 2,
  class: "lkt-item-crud_content"
}, He = {
  key: 0,
  class: "lkt-grid-1"
}, Ke = /* @__PURE__ */ me({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ Be({
    modelValue: {},
    editing: { type: Boolean },
    mode: {},
    view: {},
    editModeButton: {},
    dropButton: {},
    createButton: {},
    updateButton: {},
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
  }, Ee(Ne)),
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
  setup(C, { expose: J, emit: ee }) {
    const o = C, a = be(), c = ee;
    let M = [];
    const d = i(!0), r = i(o.modelValue), m = i(M), B = i(o.editing), S = i(!1), b = i(!1), f = i(200), h = i(new ve(r.value, o.dataStateConfig)), I = i(!1), z = i(new ve(o.readData)), T = i(o.mode === $.Create), F = i(!1), te = i(!1), L = i(null), X = y(() => !T.value && Array.isArray(m.value) && m.value.includes(ne.Update)), _ = y(() => !T.value && Array.isArray(m.value) && m.value.includes(ne.Drop)), H = y(() => !T.value && Array.isArray(m.value) && m.value.includes(ne.SwitchEditMode)), A = async () => {
      g("fetchItem"), d.value = !0, f.value = -1, b.value = !1;
      try {
        const e = await Re(o.readResource, o.readData);
        if (g("fetchItem -> response", e), d.value = !1, f.value = e.httpStatus, !e.success) {
          S.value = !1, f.value = e.httpStatus, c("error", e.httpStatus);
          return;
        }
        S.value = !0, r.value = e.data, m.value = e.perms, h.value.increment(r.value).turnStoredIntoOriginal(), I.value = h.value.changed(), z.value.turnStoredIntoOriginal(), c("read", e);
      } catch {
        d.value = !1, S.value = !1, f.value = 404, c("error", 404);
        return;
      }
    };
    k(() => o.modelValue, (e) => {
      r.value = e, h.value.increment(e);
    }, { deep: !0 }), k(r, (e) => {
      if (F.value = !0, g("item updated ->", r.value), typeof o.beforeEmitUpdate == "function") {
        g("item updated -> has beforeEmitUpdate");
        let u = o.beforeEmitUpdate(r.value);
        g("item updated -> override with: ", u), typeof u == "object" && (r.value = u);
      }
      c("update:modelValue", r.value), g("item updated -> update dataState"), h.value.increment(e), I.value = h.value.changed(), De(() => F.value = !1);
    }, { deep: !0 }), k(m, () => c("perms", m.value)), k(I, (e) => {
      c("modified-data", e);
    }), k(() => o.readData, (e) => {
      z.value.increment(e), z.value.changed() && A();
    }), k(() => o.editing, (e) => {
      g("editing updated -> updating editMode", e), B.value = e;
    }), k(B, (e) => {
      g("editMode updated -> emit update", e), c("update:editing", e);
    }), Se(() => {
      o.readResource && !T.value ? A() : T.value && (S.value = !0, B.value = !0, d.value = !1, h.value.increment(r.value).turnStoredIntoOriginal(), I.value = h.value.changed());
    });
    const P = (e, u) => {
      if (u) {
        if (d.value = !1, typeof e < "u" && (f.value = e.httpStatus, !e.success))
          return b.value = !0, c("error", e.httpStatus), !1;
        b.value = !0;
      }
      return !0;
    }, K = (e) => {
      !oe.value && e.autoReloadId && (g("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), o.readData.id = e.autoReloadId, g("doAutoReloadId -> turning off create mode"), T.value = !1, A());
    }, Q = (e, u) => {
      if (g("onCreate"), !P(u, o.createButton.resource)) {
        o.notificationType === N.Toast && j({
          text: n.defaultCreateErrorText,
          details: n.defaultCreateErrorDetails,
          icon: n.defaultCreateErrorIcon,
          positionX: O.Right
        });
        return;
      }
      te.value = !0, g("onCreate -> turn stored data into original"), h.value.increment(r.value).turnStoredIntoOriginal(), o.notificationType === N.Toast && j({
        text: n.defaultCreateSuccessText,
        details: n.defaultCreateSuccessDetails,
        icon: n.defaultCreateSuccessIcon,
        positionX: O.Right
      }), K(u), c("create", u);
    }, t = (e, u) => {
      if (g("onUpdate"), !P(u, o.updateButton.resource)) {
        o.notificationType === N.Toast && j({
          text: n.defaultUpdateErrorText,
          details: n.defaultUpdateErrorDetails,
          icon: n.defaultUpdateErrorIcon,
          positionX: O.Right
        });
        return;
      }
      g("onUpdate -> turn stored data into original"), h.value.turnStoredIntoOriginal(), o.notificationType === N.Toast && j({
        text: n.defaultUpdateSuccessText,
        details: n.defaultUpdateSuccessDetails,
        icon: n.defaultUpdateSuccessIcon,
        positionX: O.Right
      }), K(u), c("update", u);
    }, l = (e, u) => {
      if (g("onDrop"), !P(u, o.dropButton.resource)) {
        o.notificationType === N.Toast && j({
          text: n.defaultDropErrorText,
          details: n.defaultDropErrorDetails,
          icon: n.defaultDropErrorIcon,
          positionX: O.Right
        });
        return;
      }
      o.notificationType === N.Toast && j({
        text: n.defaultDropSuccessText,
        details: n.defaultDropSuccessDetails,
        icon: n.defaultDropSuccessIcon,
        positionX: O.Right
      }), c("drop", u), o.view === pe.Modal && (g("onDrop -> close modal"), $e(o.modalConfig.modalName, o.modalConfig.modalKey));
    };
    J({
      doDrop: () => {
        L.value && L.value.doDrop();
      },
      doRefresh: A,
      doSave: () => {
        L.value && L.value.doSave();
      },
      hasModifiedData: () => h.value.changed()
    });
    const ge = y(() => {
      var e;
      return h.value.changed() ? (e = o.modalConfig) == null ? void 0 : e.closeConfirm : "";
    }), ye = (e) => {
      var u;
      if (typeof ((u = o.modalConfig) == null ? void 0 : u.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...e,
          itemCreated: te.value
        });
    }, ae = y(() => o.title.startsWith("__:") ? String(Ve(o.title.substring(3))) : o.title), he = y(() => d.value ? !1 : ae.value.length > 0 || !!a["post-title"]), oe = y(() => o.view === pe.Modal), re = y(() => oe.value ? "lkt-modal" : "section"), ke = y(() => re.value === "lkt-modal" ? {
      title: o.title,
      item: r.value,
      ...o.modalConfig,
      "before-close": ye,
      "close-confirm": ge.value
    } : {});
    return (e, u) => {
      const le = de("lkt-http-info"), Ce = de("lkt-loader");
      return s(), w(Ie(re.value), Ue(we(ke.value)), {
        default: V(() => [
          Te("article", _e, [
            !oe.value && he.value ? (s(), U("header", Oe, [
              p(a)["pre-title"] ? (s(), U("div", je, [
                D(e.$slots, "pre-title", {
                  item: r.value,
                  loading: d.value
                })
              ])) : v("", !0),
              ae.value.length > 0 ? (s(), U("h1", qe, Me(ae.value), 1)) : v("", !0),
              p(a)["post-title"] ? (s(), U("div", ze, [
                D(e.$slots, "post-title", {
                  item: r.value,
                  loading: d.value
                })
              ])) : v("", !0)
            ])) : v("", !0),
            e.buttonNavPosition === p(ce).Top ? (s(), w(fe, {
              key: 1,
              ref_key: "buttonNav",
              ref: L,
              loading: d.value,
              "onUpdate:loading": u[0] || (u[0] = (R) => d.value = R),
              editing: B.value,
              "onUpdate:editing": u[1] || (u[1] = (R) => B.value = R),
              item: r.value,
              mode: e.mode,
              view: e.view,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": e.createButton,
              "update-button": e.updateButton,
              "drop-button": e.dropButton,
              "edit-mode-button": e.editModeButton,
              "data-changed": I.value,
              "http-success-read": S.value,
              "can-update": X.value,
              "can-drop": _.value,
              "can-switch-edit-mode": H.value,
              onCreate: Q,
              onSave: t,
              onDrop: l
            }, se({ _: 2 }, [
              p(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: V(() => [
                  D(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              p(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: V(() => [
                  D(e.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode"])) : v("", !0),
            d.value ? v("", !0) : (s(), U("div", Fe, [
              S.value ? (s(), U("div", He, [
                b.value && e.notificationType === p(N).Inline ? (s(), w(le, {
                  key: 0,
                  code: f.value,
                  palette: f.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: u[2] || (u[2] = (R) => b.value = !1)
                }, null, 8, ["code", "palette"])) : v("", !0),
                D(e.$slots, "item", {
                  item: r.value,
                  loading: d.value,
                  editMode: B.value,
                  isCreate: T.value,
                  canUpdate: X.value,
                  canDrop: _.value,
                  itemBeingEdited: F.value
                })
              ])) : e.notificationType === p(N).Inline ? (s(), w(le, {
                key: 1,
                code: f.value
              }, null, 8, ["code"])) : v("", !0)
            ])),
            d.value ? (s(), w(Ce, { key: 3 })) : v("", !0),
            e.buttonNavPosition === p(ce).Bottom ? (s(), w(fe, {
              key: 4,
              ref_key: "buttonNav",
              ref: L,
              loading: d.value,
              "onUpdate:loading": u[3] || (u[3] = (R) => d.value = R),
              editing: B.value,
              "onUpdate:editing": u[4] || (u[4] = (R) => B.value = R),
              item: r.value,
              mode: e.mode,
              view: e.view,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": e.createButton,
              "update-button": e.updateButton,
              "drop-button": e.dropButton,
              "edit-mode-button": e.editModeButton,
              "data-changed": I.value,
              "http-success-read": S.value,
              "can-update": X.value,
              "can-drop": _.value,
              "can-switch-edit-mode": H.value,
              onCreate: Q,
              onSave: t,
              onDrop: l
            }, se({ _: 2 }, [
              p(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: V(() => [
                  D(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              p(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: V(() => [
                  D(e.$slots, "prev-buttons")
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
}), tt = {
  install: (C, J = {}) => {
    C.component("lkt-item-crud") === void 0 && C.component("lkt-item-crud", Ke);
  }
}, at = (C) => {
  q.defaultSaveIcon = C;
}, ot = (C) => {
  q.defaultDropIcon = C;
};
export {
  et as debugLktItemCrud,
  tt as default,
  ot as setItemCrudDefaultDropIcon,
  at as setItemCrudDefaultSaveIcon
};
