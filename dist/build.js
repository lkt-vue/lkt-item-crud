import { defineComponent as me, ref as d, watch as k, useSlots as be, computed as y, resolveComponent as de, createElementBlock as w, createCommentVNode as s, openBlock as l, withDirectives as J, createBlock as U, unref as v, renderSlot as D, vShow as Q, mergeProps as Y, withCtx as $, mergeDefaults as Ce, nextTick as De, onMounted as Se, resolveDynamicComponent as Ie, normalizeProps as we, guardReactiveProps as Ue, createElementVNode as Me, toDisplayString as Ee, createSlots as se } from "vue";
import { httpCall as Re } from "lkt-http-client";
import { DataState as ve } from "lkt-data-state";
import { ensureButtonConfig as T, LktSettings as m, ItemCrudMode as N, ItemCrudButtonNavVisibility as ae, TablePermission as oe, ItemCrudView as pe, ItemCrudButtonNavPosition as ce, NotificationType as H, getDefaultValues as Te, ItemCrud as Ne, ToastPositionX as ue } from "lkt-vue-kernel";
import { closeModal as $e } from "lkt-modal";
import { __ as Ve } from "lkt-i18n";
import { openToast as ne } from "lkt-toast";
const K = class K {
};
K.debugEnabled = !1, K.defaultSaveIcon = "", K.defaultDropIcon = "";
let O = K;
const g = (...B) => {
  O.debugEnabled && console.info("[LktItemCrud] ", ...B);
}, et = (B = !0) => {
  O.debugEnabled = B;
}, Le = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Ae = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Pe = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, _e = {
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
  setup(B, { expose: W, emit: Z }) {
    const o = Z, a = B, p = d(T(a.createButton, m.defaultCreateButton)), E = d(T(a.updateButton, m.defaultUpdateButton)), n = d(T(a.dropButton, m.defaultDropButton)), r = d(T(a.editModeButton, m.defaultEditModeButton));
    k(() => a.createButton, (t) => {
      p.value = T(t, m.defaultCreateButton);
    }, { deep: !0 }), k(() => a.updateButton, (t) => {
      E.value = T(t, m.defaultUpdateButton);
    }, { deep: !0 }), k(() => a.dropButton, (t) => {
      n.value = T(t, m.defaultDropButton);
    }, { deep: !0 }), k(() => a.editModeButton, (t) => {
      r.value = T(t, m.defaultEditModeButton);
    }, { deep: !0 });
    const f = be(), C = d(null), S = d(null), b = d(a.loading);
    k(() => a.loading, (t) => b.value = t), k(b, (t) => o("update:loading", t));
    const c = d(a.editing);
    k(() => a.editing, (t) => c.value = t), k(c, (t) => o("update:editing", t));
    const h = () => {
      b.value = !0;
    }, I = () => {
      b.value = !1;
    }, X = (t, i) => {
      o("create", t, i);
    }, M = (t, i) => {
      o("save", t, i);
    }, j = (t, i) => {
      o("drop", t, i);
    };
    W({
      doSave: () => {
        C.value && typeof C.value.click == "function" && C.value.click();
      },
      doDrop: () => {
        S.value && typeof S.value.click == "function" && S.value.click();
      }
    });
    const P = y(() => {
      var t, i;
      return a.mode !== N.Create && !a.canUpdate || !a.dataChanged ? !1 : typeof ((t = E.value) == null ? void 0 : t.disabled) == "function" ? !E.value.disabled(a.item) : typeof ((i = E.value) == null ? void 0 : i.disabled) == "boolean" ? !E.value.disabled : !0;
    }), _ = y(() => {
      var t, i;
      return a.mode !== N.Create || !a.dataChanged ? !1 : typeof ((t = p.value) == null ? void 0 : t.disabled) == "function" ? !p.value.disabled(a.item) : typeof ((i = p.value) == null ? void 0 : i.disabled) == "boolean" ? !p.value.disabled : !0;
    }), q = y(() => {
      var t, i;
      return a.canDrop ? typeof ((t = n.value) == null ? void 0 : t.disabled) == "function" ? !n.value.disabled(a.item) : typeof ((i = n.value) == null ? void 0 : i.disabled) == "boolean" ? !n.value.disabled : !0 : !1;
    }), L = y(() => a.canDrop ? !a.canUpdate && a.canDrop ? !0 : !b.value && a.editing && a.httpSuccessRead : !1), A = y(() => a.dataChanged ? !0 : b.value ? !1 : a.mode === N.Create ? !0 : a.buttonNavVisibility === ae.Never ? !1 : a.editing && a.httpSuccessRead), z = y(() => !a.canSwitchEditMode || !a.canUpdate && !a.canDrop || !a.canUpdate && a.canDrop ? !1 : !b.value && a.mode !== N.Create && a.httpSuccessRead), G = y(() => a.buttonNavVisibility === ae.Always && (P.value || _.value || q.value) || f["prev-buttons-ever"] ? !0 : a.buttonNavVisibility === ae.Never ? !1 : A.value || L.value || z.value);
    return (t, i) => {
      const F = de("lkt-button");
      return G.value ? (l(), w("div", Le, [
        v(f)["prev-buttons-ever"] ? J((l(), w("div", Ae, [
          D(t.$slots, "prev-buttons-ever")
        ], 512)), [
          [Q, !b.value]
        ]) : s("", !0),
        v(f)["prev-buttons"] ? J((l(), w("div", Pe, [
          D(t.$slots, "prev-buttons")
        ], 512)), [
          [Q, c.value && !b.value]
        ]) : s("", !0),
        t.mode === v(N).Update && A.value ? (l(), U(F, Y({
          key: 2,
          ref_key: "saveButtonRef",
          ref: C
        }, E.value, {
          disabled: !P.value,
          onLoading: h,
          onLoaded: I,
          onClick: M
        }), {
          default: $(() => [
            v(f)["button-save"] ? D(t.$slots, "button-save", {
              key: 0,
              item: t.item,
              editMode: c.value,
              isCreate: !1,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : s("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])) : t.mode === v(N).Create && A.value ? (l(), U(F, Y({
          key: 3,
          ref_key: "saveButtonRef",
          ref: C
        }, p.value, {
          disabled: !_.value,
          onLoading: h,
          onLoaded: I,
          onClick: X
        }), {
          default: $(() => [
            v(f)["button-save"] ? D(t.$slots, "button-save", {
              key: 0,
              item: t.item,
              editMode: c.value,
              isCreate: !0,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : s("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])) : s("", !0),
        t.mode !== v(N).Create ? J((l(), U(F, Y({
          key: 4,
          ref_key: "dropButtonRef",
          ref: S
        }, n.value, {
          disabled: !q.value,
          onLoading: h,
          onLoaded: I,
          onClick: j
        }), {
          default: $(() => [
            v(f)["button-drop"] ? D(t.$slots, "button-drop", {
              key: 0,
              item: t.item,
              editMode: c.value,
              isCreate: !1,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : s("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])), [
          [Q, L.value]
        ]) : s("", !0),
        v(f).buttons ? J((l(), w("div", _e, [
          D(t.$slots, "buttons")
        ], 512)), [
          [Q, c.value && !b.value]
        ]) : s("", !0),
        z.value ? (l(), U(F, Y({ key: 6 }, r.value, {
          checked: c.value,
          "onUpdate:checked": i[0] || (i[0] = (re) => c.value = re),
          class: "lkt-item-crud--switch-mode-button"
        }), null, 16, ["checked"])) : s("", !0)
      ])) : s("", !0);
    };
  }
}), Oe = { class: "lkt-item-crud" }, Xe = {
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
  props: /* @__PURE__ */ Ce({
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
  }, Te(Ne)),
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
  setup(B, { expose: W, emit: Z }) {
    const o = B, a = be(), p = Z;
    let E = [];
    const n = d(!0), r = d(o.modelValue), f = d(E), C = d(o.editing), S = d(!1), b = d(!1), c = d(200), h = d(new ve(r.value, o.dataStateConfig)), I = d(!1), X = d(new ve(o.readData)), M = d(o.mode === N.Create), j = d(!1), x = d(!1), V = d(null), P = y(() => !M.value && Array.isArray(f.value) && f.value.includes(oe.Update)), _ = y(() => !M.value && Array.isArray(f.value) && f.value.includes(oe.Drop)), q = y(() => !M.value && Array.isArray(f.value) && f.value.includes(oe.SwitchEditMode)), L = async () => {
      g("fetchItem"), n.value = !0, c.value = -1, b.value = !1;
      try {
        const e = await Re(o.readResource, o.readData);
        if (g("fetchItem -> response", e), n.value = !1, c.value = e.httpStatus, !e.success) {
          S.value = !1, c.value = e.httpStatus, p("error", e.httpStatus);
          return;
        }
        S.value = !0, r.value = e.data, f.value = e.perms, h.value.increment(r.value).turnStoredIntoOriginal(), I.value = h.value.changed(), X.value.turnStoredIntoOriginal(), p("read", e);
      } catch {
        n.value = !1, S.value = !1, c.value = 404, p("error", 404);
        return;
      }
    };
    k(() => o.modelValue, (e) => {
      r.value = e, h.value.increment(e);
    }, { deep: !0 }), k(r, (e) => {
      if (j.value = !0, g("item updated ->", r.value), typeof o.beforeEmitUpdate == "function") {
        g("item updated -> has beforeEmitUpdate");
        let u = o.beforeEmitUpdate(r.value);
        g("item updated -> override with: ", u), typeof u == "object" && (r.value = u);
      }
      p("update:modelValue", r.value), g("item updated -> update dataState"), h.value.increment(e), I.value = h.value.changed(), De(() => j.value = !1);
    }, { deep: !0 }), k(f, () => p("perms", f.value)), k(I, (e) => {
      p("modified-data", e);
    }), k(() => o.readData, (e) => {
      X.value.increment(e), X.value.changed() && L();
    }), k(() => o.editing, (e) => {
      g("editing updated -> updating editMode", e), C.value = e;
    }), k(C, (e) => {
      g("editMode updated -> emit update", e), p("update:editing", e);
    }), Se(() => {
      o.readResource && !M.value ? L() : M.value && (S.value = !0, C.value = !0, n.value = !1, h.value.increment(r.value).turnStoredIntoOriginal(), I.value = h.value.changed());
    });
    const A = (e, u) => {
      if (u) {
        if (n.value = !1, typeof e < "u" && (c.value = e.httpStatus, !e.success))
          return b.value = !0, p("error", e.httpStatus), !1;
        b.value = !0;
      }
      return !0;
    }, z = (e) => {
      !te.value && e.autoReloadId && (g("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), o.readData.id = e.autoReloadId, g("doAutoReloadId -> turning off create mode"), M.value = !1, L());
    }, G = (e, u) => {
      if (g("onCreate"), !A(u, o.createButton.resource)) {
        o.notificationType === H.Toast && ne({
          text: m.defaultCreateErrorText,
          details: m.defaultCreateErrorDetails,
          icon: m.defaultCreateErrorIcon,
          positionX: ue.Right
        });
        return;
      }
      x.value = !0, g("onCreate -> turn stored data into original"), h.value.increment(r.value).turnStoredIntoOriginal(), z(u), p("create", u);
    }, t = (e, u) => {
      if (g("onUpdate"), !A(u, o.updateButton.resource)) {
        o.notificationType === H.Toast && ne({
          text: m.defaultUpdateErrorText,
          details: m.defaultUpdateErrorDetails,
          icon: m.defaultUpdateErrorIcon,
          positionX: ue.Right
        });
        return;
      }
      g("onUpdate -> turn stored data into original"), h.value.turnStoredIntoOriginal(), z(u), p("update", u);
    }, i = (e, u) => {
      if (g("onDrop"), !A(u, o.dropButton.resource)) {
        o.notificationType === H.Toast && ne({
          text: m.defaultDropErrorText,
          details: m.defaultDropErrorDetails,
          icon: m.defaultDropErrorIcon,
          positionX: ue.Right
        });
        return;
      }
      p("drop", u), o.view === pe.Modal && (g("onDrop -> close modal"), $e(o.modalConfig.modalName, o.modalConfig.modalKey));
    };
    W({
      doDrop: () => {
        V.value && V.value.doDrop();
      },
      doRefresh: L,
      doSave: () => {
        V.value && V.value.doSave();
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
          itemCreated: x.value
        });
    }, ee = y(() => o.title.startsWith("__:") ? String(Ve(o.title.substring(3))) : o.title), he = y(() => n.value ? !1 : ee.value.length > 0 || !!a["post-title"]), te = y(() => o.view === pe.Modal), ie = y(() => te.value ? "lkt-modal" : "section"), ke = y(() => ie.value === "lkt-modal" ? {
      title: o.title,
      item: r.value,
      ...o.modalConfig,
      "before-close": ye,
      "close-confirm": ge.value
    } : {});
    return (e, u) => {
      const le = de("lkt-http-info"), Be = de("lkt-loader");
      return l(), U(Ie(ie.value), we(Ue(ke.value)), {
        default: $(() => [
          Me("article", Oe, [
            !te.value && he.value ? (l(), w("header", Xe, [
              v(a)["pre-title"] ? (l(), w("div", je, [
                D(e.$slots, "pre-title", {
                  item: r.value,
                  loading: n.value
                })
              ])) : s("", !0),
              ee.value.length > 0 ? (l(), w("h1", qe, Ee(ee.value), 1)) : s("", !0),
              v(a)["post-title"] ? (l(), w("div", ze, [
                D(e.$slots, "post-title", {
                  item: r.value,
                  loading: n.value
                })
              ])) : s("", !0)
            ])) : s("", !0),
            e.buttonNavPosition === v(ce).Top ? (l(), U(fe, {
              key: 1,
              ref_key: "buttonNav",
              ref: V,
              loading: n.value,
              "onUpdate:loading": u[0] || (u[0] = (R) => n.value = R),
              editing: C.value,
              "onUpdate:editing": u[1] || (u[1] = (R) => C.value = R),
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
              "can-update": P.value,
              "can-drop": _.value,
              "can-switch-edit-mode": q.value,
              onCreate: G,
              onSave: t,
              onDrop: i
            }, se({ _: 2 }, [
              v(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  D(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              v(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  D(e.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode"])) : s("", !0),
            n.value ? s("", !0) : (l(), w("div", Fe, [
              S.value ? (l(), w("div", He, [
                b.value && e.notificationType === v(H).Inline ? (l(), U(le, {
                  key: 0,
                  code: c.value,
                  palette: c.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: u[2] || (u[2] = (R) => b.value = !1)
                }, null, 8, ["code", "palette"])) : s("", !0),
                D(e.$slots, "item", {
                  item: r.value,
                  loading: n.value,
                  editMode: C.value,
                  isCreate: M.value,
                  canUpdate: P.value,
                  canDrop: _.value,
                  itemBeingEdited: j.value
                })
              ])) : e.notificationType === v(H).Inline ? (l(), U(le, {
                key: 1,
                code: c.value
              }, null, 8, ["code"])) : s("", !0)
            ])),
            n.value ? (l(), U(Be, { key: 3 })) : s("", !0),
            e.buttonNavPosition === v(ce).Bottom ? (l(), U(fe, {
              key: 4,
              ref_key: "buttonNav",
              ref: V,
              loading: n.value,
              "onUpdate:loading": u[3] || (u[3] = (R) => n.value = R),
              editing: C.value,
              "onUpdate:editing": u[4] || (u[4] = (R) => C.value = R),
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
              "can-update": P.value,
              "can-drop": _.value,
              "can-switch-edit-mode": q.value,
              onCreate: G,
              onSave: t,
              onDrop: i
            }, se({ _: 2 }, [
              v(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  D(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              v(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: $(() => [
                  D(e.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode"])) : s("", !0)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), tt = {
  install: (B, W = {}) => {
    B.component("lkt-item-crud") === void 0 && B.component("lkt-item-crud", Ke);
  }
}, at = (B) => {
  O.defaultSaveIcon = B;
}, ot = (B) => {
  O.defaultDropIcon = B;
};
export {
  et as debugLktItemCrud,
  tt as default,
  ot as setItemCrudDefaultDropIcon,
  at as setItemCrudDefaultSaveIcon
};
