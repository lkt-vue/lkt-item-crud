import { defineComponent as pe, ref as d, watch as h, useSlots as ce, computed as g, resolveComponent as oe, createElementBlock as w, createCommentVNode as s, openBlock as i, withDirectives as J, createBlock as I, unref as f, renderSlot as C, vShow as Q, mergeProps as X, withCtx as V, mergeDefaults as he, nextTick as ke, onMounted as Be, resolveDynamicComponent as Ce, normalizeProps as De, guardReactiveProps as Se, createElementVNode as we, toDisplayString as Ie, createSlots as le } from "vue";
import { httpCall as Ue } from "lkt-http-client";
import { DataState as re } from "lkt-data-state";
import { ensureButtonConfig as $, LktSettings as N, ItemCrudMode as E, ItemCrudButtonNavVisibility as te, TablePermission as ae, ItemCrudView as ie, ItemCrudButtonNavPosition as se, getDefaultValues as Me, ItemCrud as Re } from "lkt-vue-kernel";
import { closeModal as $e } from "lkt-modal";
import { __ as Ne } from "lkt-i18n";
const K = class K {
};
K.debugEnabled = !1, K.defaultSaveIcon = "", K.defaultDropIcon = "";
let O = K;
const b = (...k) => {
  O.debugEnabled && console.info("[LktItemCrud] ", ...k);
}, Xe = (k = !0) => {
  O.debugEnabled = k;
}, Ee = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Ve = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Le = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Ae = {
  key: 5,
  class: "lkt-item-crud-buttons"
}, ve = /* @__PURE__ */ pe({
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
  setup(k, { expose: W, emit: Y }) {
    const o = Y, a = k, v = d($(a.createButton, N.defaultCreateButton)), M = d($(a.updateButton, N.defaultUpdateButton)), n = d($(a.dropButton, N.defaultDropButton)), l = d($(a.editModeButton, N.defaultEditModeButton));
    h(() => a.createButton, (t) => {
      v.value = $(t, N.defaultCreateButton);
    }, { deep: !0 }), h(() => a.updateButton, (t) => {
      M.value = $(t, N.defaultUpdateButton);
    }, { deep: !0 }), h(() => a.dropButton, (t) => {
      n.value = $(t, N.defaultDropButton);
    }, { deep: !0 }), h(() => a.editModeButton, (t) => {
      l.value = $(t, N.defaultEditModeButton);
    }, { deep: !0 });
    const c = ce(), B = d(null), D = d(null), m = d(a.loading);
    h(() => a.loading, (t) => m.value = t), h(m, (t) => o("update:loading", t));
    const p = d(a.editing);
    h(() => a.editing, (t) => p.value = t), h(p, (t) => o("update:editing", t));
    const y = () => {
      m.value = !0;
    }, S = () => {
      m.value = !1;
    }, j = (t, r) => {
      o("create", t, r);
    }, U = (t, r) => {
      o("save", t, r);
    }, q = (t, r) => {
      o("drop", t, r);
    };
    W({
      doSave: () => {
        B.value && typeof B.value.click == "function" && B.value.click();
      },
      doDrop: () => {
        D.value && typeof D.value.click == "function" && D.value.click();
      }
    });
    const T = g(() => {
      var t, r;
      return a.mode !== E.Create && !a.canUpdate ? !1 : typeof ((t = M.value) == null ? void 0 : t.disabled) == "function" ? M.value.disabled(a.item) : typeof ((r = M.value) == null ? void 0 : r.disabled) == "boolean" ? M.value.disabled : a.dataChanged;
    }), _ = g(() => {
      var t, r;
      return a.mode !== E.Create ? !1 : typeof ((t = v.value) == null ? void 0 : t.disabled) == "function" ? v.value.disabled(a.item) : typeof ((r = v.value) == null ? void 0 : r.disabled) == "boolean" ? v.value.disabled : a.dataChanged;
    }), z = g(() => {
      var t, r;
      return a.canDrop ? typeof ((t = n.value) == null ? void 0 : t.disabled) == "function" ? n.value.disabled(a.item) : typeof ((r = n.value) == null ? void 0 : r.disabled) == "boolean" ? n.value.disabled : !0 : !1;
    }), A = g(() => a.canDrop ? !a.canUpdate && a.canDrop ? !0 : !m.value && a.editing && a.httpSuccessRead : !1), P = g(() => a.dataChanged ? !0 : m.value ? !1 : a.mode === E.Create ? !0 : a.buttonNavVisibility === te.Never ? !1 : a.editing && a.httpSuccessRead), F = g(() => !a.canSwitchEditMode || !a.canUpdate && !a.canDrop || !a.canUpdate && a.canDrop ? !1 : !m.value && a.mode !== E.Create && a.httpSuccessRead), G = g(() => a.buttonNavVisibility === te.Always && (T.value || _.value || z.value) || c["prev-buttons-ever"] ? !0 : a.buttonNavVisibility === te.Never ? !1 : P.value || A.value || F.value);
    return (t, r) => {
      const H = oe("lkt-button");
      return G.value ? (i(), w("div", Ee, [
        f(c)["prev-buttons-ever"] ? J((i(), w("div", Ve, [
          C(t.$slots, "prev-buttons-ever")
        ], 512)), [
          [Q, !m.value]
        ]) : s("", !0),
        f(c)["prev-buttons"] ? J((i(), w("div", Le, [
          C(t.$slots, "prev-buttons")
        ], 512)), [
          [Q, p.value && !m.value]
        ]) : s("", !0),
        t.mode === f(E).Update && P.value ? (i(), I(H, X({
          key: 2,
          ref_key: "saveButtonRef",
          ref: B
        }, M.value, {
          disabled: !T.value,
          onLoading: y,
          onLoaded: S,
          onClick: U
        }), {
          default: V(() => [
            f(c)["button-save"] ? C(t.$slots, "button-save", {
              key: 0,
              item: t.item,
              editMode: p.value,
              isCreate: !1,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : s("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])) : t.mode === f(E).Create && P.value ? (i(), I(H, X({
          key: 3,
          ref_key: "saveButtonRef",
          ref: B
        }, v.value, {
          disabled: !_.value,
          onLoading: y,
          onLoaded: S,
          onClick: j
        }), {
          default: V(() => [
            f(c)["button-save"] ? C(t.$slots, "button-save", {
              key: 0,
              item: t.item,
              editMode: p.value,
              isCreate: !0,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : s("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])) : s("", !0),
        t.mode !== f(E).Create ? J((i(), I(H, X({
          key: 4,
          ref_key: "dropButtonRef",
          ref: D
        }, n.value, {
          disabled: !z.value,
          onLoading: y,
          onLoaded: S,
          onClick: q
        }), {
          default: V(() => [
            f(c)["button-drop"] ? C(t.$slots, "button-drop", {
              key: 0,
              item: t.item,
              editMode: p.value,
              isCreate: !1,
              canUpdate: t.canUpdate,
              canDrop: t.canDrop
            }) : s("", !0)
          ]),
          _: 3
        }, 16, ["disabled"])), [
          [Q, A.value]
        ]) : s("", !0),
        f(c).buttons ? J((i(), w("div", Ae, [
          C(t.$slots, "buttons")
        ], 512)), [
          [Q, p.value && !m.value]
        ]) : s("", !0),
        F.value ? (i(), I(H, X({ key: 6 }, l.value, {
          checked: p.value,
          "onUpdate:checked": r[0] || (r[0] = (ue) => p.value = ue),
          class: "lkt-item-crud--switch-mode-button"
        }), null, 16, ["checked"])) : s("", !0)
      ])) : s("", !0);
    };
  }
}), Pe = { class: "lkt-item-crud" }, Te = {
  key: 0,
  class: "lkt-item-crud_header"
}, _e = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, Oe = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, je = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, qe = {
  key: 2,
  class: "lkt-item-crud_content"
}, ze = {
  key: 0,
  class: "lkt-grid-1"
}, Fe = /* @__PURE__ */ pe({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ he({
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
    beforeEmitUpdate: { type: Function }
  }, Me(Re)),
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
  setup(k, { expose: W, emit: Y }) {
    const o = k, a = ce(), v = Y;
    let M = [];
    const n = d(!0), l = d(o.modelValue), c = d(M), B = d(o.editing), D = d(!1), m = d(!1), p = d(200), y = d(new re(l.value, o.dataStateConfig)), S = d(!1), j = d(new re(o.readData)), U = d(o.mode === E.Create), q = d(!1), Z = d(!1), L = d(null), T = g(() => !U.value && Array.isArray(c.value) && c.value.includes(ae.Update)), _ = g(() => !U.value && Array.isArray(c.value) && c.value.includes(ae.Drop)), z = g(() => !U.value && Array.isArray(c.value) && c.value.includes(ae.SwitchEditMode)), A = async () => {
      b("fetchItem"), n.value = !0, p.value = -1, m.value = !1;
      try {
        const e = await Ue(o.readResource, o.readData);
        if (b("fetchItem -> response", e), n.value = !1, p.value = e.httpStatus, !e.success) {
          D.value = !1, p.value = e.httpStatus, v("error", e.httpStatus);
          return;
        }
        D.value = !0, l.value = e.data, c.value = e.perms, y.value.increment(l.value).turnStoredIntoOriginal(), S.value = y.value.changed(), j.value.turnStoredIntoOriginal(), v("read", e);
      } catch {
        n.value = !1, D.value = !1, p.value = 404, v("error", 404);
        return;
      }
    };
    h(() => o.modelValue, (e) => {
      l.value = e, y.value.increment(e);
    }, { deep: !0 }), h(l, (e) => {
      if (q.value = !0, b("item updated ->", l.value), typeof o.beforeEmitUpdate == "function") {
        b("item updated -> has beforeEmitUpdate");
        let u = o.beforeEmitUpdate(l.value);
        b("item updated -> override with: ", u), typeof u == "object" && (l.value = u);
      }
      v("update:modelValue", l.value), b("item updated -> update dataState"), y.value.increment(e), S.value = y.value.changed(), ke(() => q.value = !1);
    }, { deep: !0 }), h(c, () => v("perms", c.value)), h(S, (e) => {
      v("modified-data", e);
    }), h(() => o.readData, (e) => {
      j.value.increment(e), j.value.changed() && A();
    }), h(() => o.editing, (e) => {
      b("editing updated -> updating editMode", e), B.value = e;
    }), h(B, (e) => {
      b("editMode updated -> emit update", e), v("update:editing", e);
    }), Be(() => {
      o.readResource && !U.value ? A() : U.value && (D.value = !0, B.value = !0, n.value = !1, y.value.increment(l.value).turnStoredIntoOriginal(), S.value = y.value.changed());
    });
    const P = (e, u) => {
      if (u) {
        if (n.value = !1, typeof e < "u" && (p.value = e.httpStatus, !e.success))
          return m.value = !0, v("error", e.httpStatus), !1;
        m.value = !0;
      }
      return !0;
    }, F = (e) => {
      !ee.value && e.autoReloadId && (b("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), o.readData.id = e.autoReloadId, b("doAutoReloadId -> turning off create mode"), U.value = !1, A());
    }, G = (e, u) => {
      b("onCreate"), P(u, o.createButton.resource) && (Z.value = !0, b("onCreate -> turn stored data into original"), y.value.increment(l.value).turnStoredIntoOriginal(), F(u), v("create", u));
    }, t = (e, u) => {
      b("onUpdate"), P(u, o.updateButton.resource) && (b("onUpdate -> turn stored data into original"), y.value.turnStoredIntoOriginal(), F(u), v("update", u));
    }, r = (e, u) => {
      b("onDrop"), P(u, o.dropButton.resource) && (v("drop", u), o.view === ie.Modal && (b("onDrop -> close modal"), $e(o.modalConfig.modalName, o.modalConfig.modalKey)));
    };
    W({
      doDrop: () => {
        L.value && L.value.doDrop();
      },
      doRefresh: A,
      doSave: () => {
        L.value && L.value.doSave();
      },
      hasModifiedData: () => y.value.changed()
    });
    const fe = g(() => {
      var e;
      return y.value.changed() ? (e = o.modalConfig) == null ? void 0 : e.closeConfirm : "";
    }), me = (e) => {
      var u;
      if (typeof ((u = o.modalConfig) == null ? void 0 : u.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...e,
          itemCreated: Z.value
        });
    }, x = g(() => o.title.startsWith("__:") ? String(Ne(o.title.substring(3))) : o.title), be = g(() => n.value ? !1 : x.value.length > 0 || !!a["post-title"]), ee = g(() => o.view === ie.Modal), ne = g(() => ee.value ? "lkt-modal" : "section"), ge = g(() => ne.value === "lkt-modal" ? {
      title: o.title,
      item: l.value,
      ...o.modalConfig,
      "before-close": me,
      "close-confirm": fe.value
    } : {});
    return (e, u) => {
      const de = oe("lkt-http-info"), ye = oe("lkt-loader");
      return i(), I(Ce(ne.value), De(Se(ge.value)), {
        default: V(() => [
          we("article", Pe, [
            !ee.value && be.value ? (i(), w("header", Te, [
              f(a)["pre-title"] ? (i(), w("div", _e, [
                C(e.$slots, "pre-title", {
                  item: l.value,
                  loading: n.value
                })
              ])) : s("", !0),
              x.value.length > 0 ? (i(), w("h1", Oe, Ie(x.value), 1)) : s("", !0),
              f(a)["post-title"] ? (i(), w("div", je, [
                C(e.$slots, "post-title", {
                  item: l.value,
                  loading: n.value
                })
              ])) : s("", !0)
            ])) : s("", !0),
            e.buttonNavPosition === f(se).Top ? (i(), I(ve, {
              key: 1,
              ref_key: "buttonNav",
              ref: L,
              loading: n.value,
              "onUpdate:loading": u[0] || (u[0] = (R) => n.value = R),
              editing: B.value,
              "onUpdate:editing": u[1] || (u[1] = (R) => B.value = R),
              item: l.value,
              mode: e.mode,
              view: e.view,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": e.createButton,
              "update-button": e.updateButton,
              "drop-button": e.dropButton,
              "edit-mode-button": e.editModeButton,
              "data-changed": S.value,
              "http-success-read": D.value,
              "can-update": T.value,
              "can-drop": _.value,
              "can-switch-edit-mode": z.value,
              onCreate: G,
              onSave: t,
              onDrop: r
            }, le({ _: 2 }, [
              f(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: V(() => [
                  C(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              f(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: V(() => [
                  C(e.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode"])) : s("", !0),
            n.value ? s("", !0) : (i(), w("div", qe, [
              D.value ? (i(), w("div", ze, [
                m.value ? (i(), I(de, {
                  key: 0,
                  code: p.value,
                  quick: "",
                  palette: p.value === 200 ? "success" : "danger",
                  "can-close": "",
                  onClose: u[2] || (u[2] = (R) => m.value = !1)
                }, null, 8, ["code", "palette"])) : s("", !0),
                C(e.$slots, "item", {
                  item: l.value,
                  loading: n.value,
                  editMode: B.value,
                  isCreate: U.value,
                  canUpdate: T.value,
                  canDrop: _.value,
                  itemBeingEdited: q.value
                })
              ])) : (i(), I(de, {
                key: 1,
                code: p.value
              }, null, 8, ["code"]))
            ])),
            n.value ? (i(), I(ye, { key: 3 })) : s("", !0),
            e.buttonNavPosition === f(se).Bottom ? (i(), I(ve, {
              key: 4,
              ref_key: "buttonNav",
              ref: L,
              loading: n.value,
              "onUpdate:loading": u[3] || (u[3] = (R) => n.value = R),
              editing: B.value,
              "onUpdate:editing": u[4] || (u[4] = (R) => B.value = R),
              item: l.value,
              mode: e.mode,
              view: e.view,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": e.createButton,
              "update-button": e.updateButton,
              "drop-button": e.dropButton,
              "edit-mode-button": e.editModeButton,
              "data-changed": S.value,
              "http-success-read": D.value,
              "can-update": T.value,
              "can-drop": _.value,
              "can-switch-edit-mode": z.value,
              onCreate: G,
              onSave: t,
              onDrop: r
            }, le({ _: 2 }, [
              f(a)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: V(() => [
                  C(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              f(a)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: V(() => [
                  C(e.$slots, "prev-buttons")
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
}), Ye = {
  install: (k, W = {}) => {
    k.component("lkt-item-crud") === void 0 && k.component("lkt-item-crud", Fe);
  }
}, Ze = (k) => {
  O.defaultSaveIcon = k;
}, xe = (k) => {
  O.defaultDropIcon = k;
};
export {
  Xe as debugLktItemCrud,
  Ye as default,
  xe as setItemCrudDefaultDropIcon,
  Ze as setItemCrudDefaultSaveIcon
};
