import { defineComponent as Se, useSlots as Ie, ref as f, watch as U, computed as S, resolveComponent as ye, createElementBlock as L, createCommentVNode as r, openBlock as c, createBlock as V, Fragment as Ce, renderSlot as p, withDirectives as $, mergeProps as w, unref as u, createVNode as W, withCtx as D, vShow as E, mergeDefaults as $e, nextTick as Ee, onMounted as Le, resolveDynamicComponent as Ne, createSlots as ne, createElementVNode as Oe, toDisplayString as Ve } from "vue";
import { httpCall as je } from "lkt-http-client";
import { DataState as De } from "lkt-data-state";
import { ItemCrudMode as I, ItemCrudButtonNavVisibility as he, TablePermission as me, ensureButtonConfig as K, LktSettings as s, ItemCrudView as Ue, ItemCrudButtonNavPosition as be, NotificationType as q, getDefaultValues as Pe, ItemCrud as Xe, ToastPositionX as Q } from "lkt-vue-kernel";
import { closeModal as Fe, updateModalKey as We } from "lkt-modal";
import { __ as Ke } from "lkt-i18n";
import { openToast as Y } from "lkt-toast";
import { useRouter as Ge } from "vue-router";
const _ = class _ {
};
_.debugEnabled = !1, _.defaultSaveIcon = "", _.defaultDropIcon = "";
let Z = _;
const y = (...T) => {
  Z.debugEnabled && console.info("[LktItemCrud] ", ...T);
}, ft = (T = !0) => {
  Z.debugEnabled = T;
}, qe = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, He = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, ze = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Je = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, ge = /* @__PURE__ */ Se({
  __name: "ButtonNav",
  props: {
    item: { default: () => ({}) },
    editing: { type: Boolean, default: !1 },
    loading: { type: Boolean },
    grouped: { type: Boolean },
    view: {},
    mode: {},
    createButton: { type: [Object, Boolean] },
    updateButton: { type: [Object, Boolean] },
    dropButton: { type: [Object, Boolean] },
    editModeButton: { type: [Object, Boolean] },
    groupButton: { type: [Object, Boolean] },
    groupButtonAsModalActions: { type: Boolean },
    dataChanged: { type: Boolean },
    ableToCreate: { type: Boolean },
    ableToUpdate: { type: Boolean },
    ableToDrop: { type: Boolean },
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
  setup(T, { expose: x, emit: de }) {
    const a = de, l = T, i = Ie(), m = f(null), v = f(null), n = f(l.loading);
    U(() => l.loading, (e) => n.value = e), U(n, (e) => a("update:loading", e));
    const d = f(l.editing);
    U(() => l.editing, (e) => d.value = e), U(d, (e) => a("update:editing", e));
    const b = () => {
      n.value = !0;
    }, B = () => {
      n.value = !1;
    }, j = (e, C) => {
      typeof e > "u" || a("create", e, C);
    }, A = (e, C) => {
      typeof e > "u" || a("save", e, C);
    }, k = (e, C) => {
      typeof e > "u" || a("drop", e, C);
    };
    x({
      doSave: () => {
        m.value && typeof m.value.click == "function" && m.value.click();
      },
      doDrop: () => {
        v.value && typeof v.value.click == "function" && v.value.click();
      }
    });
    const R = S(() => !l.canDrop || l.dropButton === !1 ? !1 : !l.canUpdate && l.canDrop ? !0 : !n.value && l.editing && l.httpSuccessRead), O = S(() => l.mode === I.Create && l.createButton === !1 || l.mode === I.Update && l.updateButton === !1 || n.value ? !1 : l.editing && l.httpSuccessRead), H = S(() => l.editModeButton === !1 || !l.canSwitchEditMode || !l.canUpdate && !l.canDrop || !l.canUpdate && l.canDrop ? !1 : !n.value && l.mode !== I.Create && l.httpSuccessRead), P = S(() => l.buttonNavVisibility === he.Always || i["prev-buttons-ever"] ? !0 : l.buttonNavVisibility === he.Never ? !1 : O.value || R.value || H.value);
    return (e, C) => {
      const h = ye("lkt-button");
      return P.value ? (c(), L("div", qe, [
        e.grouped && e.groupButtonAsModalActions ? (c(), L(Ce, { key: 0 }, [
          H.value ? (c(), V(h, w({ key: 0 }, e.editModeButton, {
            checked: d.value,
            "onUpdate:checked": C[0] || (C[0] = (M) => d.value = M),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : r("", !0),
          u(i)["prev-buttons-ever"] ? p(e.$slots, "prev-buttons-ever", {
            key: 1,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : r("", !0),
          u(i)["prev-buttons"] ? p(e.$slots, "prev-buttons", {
            key: 2,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : r("", !0),
          $(W(h, w({
            ref_key: "saveButtonRef",
            ref: m
          }, e.updateButton, {
            disabled: !e.ableToUpdate,
            onLoading: b,
            onLoaded: B,
            onClick: A
          }), {
            default: D(() => [
              u(i)["button-save"] ? p(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: d.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : r("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [E, e.mode === u(I).Update && O.value]
          ]),
          $(W(h, w({
            ref_key: "saveButtonRef",
            ref: m
          }, e.createButton, {
            disabled: !e.ableToCreate,
            onLoading: b,
            onLoaded: B,
            onClick: j
          }), {
            default: D(() => [
              u(i)["button-save"] ? p(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: d.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : r("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [E, e.mode === u(I).Create && O.value]
          ]),
          $(W(h, w({
            ref_key: "dropButtonRef",
            ref: v
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: b,
            onLoaded: B,
            onClick: k
          }), {
            default: D(() => [
              u(i)["button-drop"] ? p(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: d.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : r("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [E, R.value && e.mode !== u(I).Create]
          ]),
          u(i).buttons ? p(e.$slots, "buttons", { key: 3 }) : r("", !0)
        ], 64)) : e.grouped ? (c(), V(h, w({
          key: 1,
          ref: "groupButton"
        }, e.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: D(() => [
            H.value ? (c(), V(h, w({ key: 0 }, e.editModeButton, {
              checked: d.value,
              "onUpdate:checked": C[1] || (C[1] = (M) => d.value = M),
              class: "lkt-item-crud--switch-mode-button"
            }), null, 16, ["checked"])) : r("", !0),
            u(i)["prev-buttons-ever"] ? p(e.$slots, "prev-buttons-ever", {
              key: 1,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : r("", !0),
            u(i)["prev-buttons"] ? p(e.$slots, "prev-buttons", {
              key: 2,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : r("", !0),
            $(W(h, w({
              ref_key: "saveButtonRef",
              ref: m
            }, e.updateButton, {
              disabled: !e.ableToUpdate,
              onLoading: b,
              onLoaded: B,
              onClick: A
            }), {
              default: D(() => [
                u(i)["button-save"] ? p(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: d.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : r("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [E, e.mode === u(I).Update && O.value]
            ]),
            $(W(h, w({
              ref_key: "saveButtonRef",
              ref: m
            }, e.createButton, {
              disabled: !e.ableToCreate,
              onLoading: b,
              onLoaded: B,
              onClick: j
            }), {
              default: D(() => [
                u(i)["button-save"] ? p(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: d.value,
                  isCreate: !0,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : r("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [E, e.mode === u(I).Create && O.value]
            ]),
            $(W(h, w({
              ref_key: "dropButtonRef",
              ref: v
            }, e.dropButton, {
              disabled: !e.ableToDrop,
              onLoading: b,
              onLoaded: B,
              onClick: k
            }), {
              default: D(() => [
                u(i)["button-drop"] ? p(e.$slots, "button-drop", {
                  key: 0,
                  item: e.item,
                  editMode: d.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : r("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [E, R.value && e.mode !== u(I).Create]
            ]),
            u(i).buttons ? p(e.$slots, "buttons", { key: 3 }) : r("", !0)
          ]),
          _: 3
        }, 16)) : (c(), L(Ce, { key: 2 }, [
          u(i)["prev-buttons-ever"] ? $((c(), L("div", He, [
            p(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [E, !n.value]
          ]) : r("", !0),
          u(i)["prev-buttons"] ? $((c(), L("div", ze, [
            p(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [E, d.value && !n.value]
          ]) : r("", !0),
          $(W(h, w({
            ref_key: "saveButtonRef",
            ref: m
          }, e.updateButton, {
            disabled: !e.ableToUpdate,
            onLoading: b,
            onLoaded: B,
            onClick: A
          }), {
            default: D(() => [
              u(i)["button-save"] ? p(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: d.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : r("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [E, e.mode === u(I).Update && O.value]
          ]),
          $(W(h, w({
            ref_key: "saveButtonRef",
            ref: m
          }, e.createButton, {
            disabled: !e.ableToCreate,
            onLoading: b,
            onLoaded: B,
            onClick: j
          }), {
            default: D(() => [
              u(i)["button-save"] ? p(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: d.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: !1
              }) : r("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [E, e.mode === u(I).Create && O.value]
          ]),
          $(W(h, w({
            ref_key: "dropButtonRef",
            ref: v
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: b,
            onLoaded: B,
            onClick: k
          }), {
            default: D(() => [
              u(i)["button-drop"] ? p(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: d.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : r("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [E, R.value && e.mode !== u(I).Create]
          ]),
          u(i).buttons ? $((c(), L("div", Je, [
            p(e.$slots, "buttons")
          ], 512)), [
            [E, d.value && !n.value]
          ]) : r("", !0),
          H.value ? (c(), V(h, w({ key: 3 }, e.editModeButton, {
            checked: d.value,
            "onUpdate:checked": C[2] || (C[2] = (M) => d.value = M),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : r("", !0)
        ], 64))
      ])) : r("", !0);
    };
  }
}), Qe = { class: "lkt-item-crud" }, Ye = {
  key: 0,
  class: "lkt-item-crud_header"
}, Ze = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, _e = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, xe = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, et = {
  key: 2,
  class: "lkt-item-crud_content"
}, tt = {
  key: 0,
  class: "lkt-grid-1"
}, at = /* @__PURE__ */ Se({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ $e({
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
    notificationType: {},
    enabledSaveWithoutChanges: { type: Boolean },
    redirectOnCreate: { type: [String, Function] },
    redirectOnDrop: { type: [String, Function] }
  }, Pe(Xe)),
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
  setup(T, { expose: x, emit: de }) {
    const a = T, l = Ge(), i = Ie(), m = de, v = f(!0), n = f(a.modelValue), d = f(a.perms), b = f(a.editing), B = f(!1), j = f(!1), A = f(200), k = f(new De(n.value, a.dataStateConfig)), N = f(!1), ee = f(new De(a.readData)), R = f(a.mode === I.Create), O = f(!1), H = f(!1), P = f(null), e = S(() => !R.value && Array.isArray(d.value) && d.value.includes(me.Update)), C = S(() => !R.value && Array.isArray(d.value) && d.value.includes(me.Drop)), h = S(() => !R.value && Array.isArray(d.value) && d.value.includes(me.SwitchEditMode));
    U(() => a.mode, (t) => {
      R.value = t === I.Create;
    });
    const M = f(K(a.createButton, s.defaultCreateButton)), X = f(K(a.updateButton, s.defaultUpdateButton)), F = f(K(a.dropButton, s.defaultDropButton)), te = f(K(a.editModeButton, s.defaultEditModeButton)), re = f(K(a.groupButton, s.defaultGroupButton));
    U(() => a.createButton, (t) => {
      M.value = K(t, s.defaultCreateButton);
    }, { deep: !0 }), U(() => a.updateButton, (t) => {
      X.value = K(t, s.defaultUpdateButton);
    }, { deep: !0 }), U(() => a.dropButton, (t) => {
      F.value = K(t, s.defaultDropButton);
    }, { deep: !0 }), U(() => a.editModeButton, (t) => {
      te.value = K(t, s.defaultEditModeButton);
    }, { deep: !0 });
    const ae = async () => {
      y("fetchItem"), v.value = !0, A.value = -1, j.value = !1;
      try {
        const t = await je(a.readResource, a.readData);
        if (y("fetchItem -> response", t), v.value = !1, A.value = t.httpStatus, !t.success) {
          B.value = !1, A.value = t.httpStatus, m("error", t.httpStatus);
          return;
        }
        B.value = !0, n.value = t.data, d.value = t.perms, k.value.increment(n.value).turnStoredIntoOriginal(), N.value = k.value.changed(), ee.value.turnStoredIntoOriginal(), m("read", t);
      } catch {
        v.value = !1, B.value = !1, A.value = 404, m("error", 404);
        return;
      }
    };
    U(() => a.modelValue, (t) => {
      n.value = t, k.value.increment(t);
    }, { deep: !0 }), U(n, (t) => {
      if (O.value = !0, y("item updated ->", n.value), typeof a.beforeEmitUpdate == "function") {
        y("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(n.value);
        y("item updated -> override with: ", o), typeof o == "object" && (n.value = o);
      }
      m("update:modelValue", n.value), y("item updated -> update dataState"), k.value.increment(t), N.value = k.value.changed(), Ee(() => O.value = !1);
    }, { deep: !0 }), U(d, () => m("perms", d.value)), U(N, (t) => {
      m("modified-data", t);
    }), U(() => a.readData, (t) => {
      ee.value.increment(t), ee.value.changed() && ae();
    }), U(() => a.editing, (t) => {
      y("editing updated -> updating editMode", t), b.value = t;
    }), U(b, (t) => {
      y("editMode updated -> emit update", t), m("update:editing", t);
    }), Le(() => {
      a.readResource && !R.value ? ae() : (R.value, B.value = !0, b.value = !0, v.value = !1, k.value.increment(n.value).turnStoredIntoOriginal(), N.value = k.value.changed());
    });
    const le = (t, o) => {
      if (o) {
        if (v.value = !1, typeof t < "u" && (A.value = t.httpStatus, !t.success))
          return j.value = !0, m("error", t.httpStatus), !1;
        j.value = !0;
      }
      return !0;
    }, Be = (t, o) => {
      if (y("doAutoReloadId -> enter: ", t), typeof t < "u" && t.autoReloadId)
        if (y("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), typeof o < "u") {
          let G = o;
          typeof o == "function" && (G = o(t.autoReloadId)), l.push(G);
        } else fe.value ? (y("doAutoReloadId -> insideModal: ", a), We(a.modalConfig.modalName, a.modalConfig.modalKey, t.autoReloadId)) : (y("doAutoReloadId -> outsideModal"), a.readData.id = t.autoReloadId, y("doAutoReloadId -> turning off create mode"), R.value = !1, ae());
    }, ie = (t, o) => {
      if (y("onCreate"), !le(o, M.value.resource)) {
        a.notificationType === q.Toast && Y({
          text: s.defaultCreateErrorText,
          details: s.defaultCreateErrorDetails,
          icon: s.defaultCreateErrorIcon,
          positionX: Q.Right
        });
        return;
      }
      H.value = !0, y("onCreate -> turn stored data into original"), k.value.increment(n.value).turnStoredIntoOriginal(), a.notificationType === q.Toast && Y({
        text: s.defaultCreateSuccessText,
        details: s.defaultCreateSuccessDetails,
        icon: s.defaultCreateSuccessIcon,
        positionX: Q.Right
      }), Be(o, a.redirectOnCreate), y("onCreate -> beforeEmitCreate"), m("create", o);
    }, se = (t, o) => {
      if (y("onUpdate"), !le(o, X.value.resource)) {
        a.notificationType === q.Toast && Y({
          text: s.defaultUpdateErrorText,
          details: s.defaultUpdateErrorDetails,
          icon: s.defaultUpdateErrorIcon,
          positionX: Q.Right
        });
        return;
      }
      y("onUpdate -> turn stored data into original"), k.value.turnStoredIntoOriginal(), a.notificationType === q.Toast && Y({
        text: s.defaultUpdateSuccessText,
        details: s.defaultUpdateSuccessDetails,
        icon: s.defaultUpdateSuccessIcon,
        positionX: Q.Right
      }), Be(o), m("update", o);
    }, pe = (t, o) => {
      if (y("onDrop"), !le(o, F.value.resource)) {
        a.notificationType === q.Toast && Y({
          text: s.defaultDropErrorText,
          details: s.defaultDropErrorDetails,
          icon: s.defaultDropErrorIcon,
          positionX: Q.Right
        });
        return;
      }
      if (a.notificationType === q.Toast && Y({
        text: s.defaultDropSuccessText,
        details: s.defaultDropSuccessDetails,
        icon: s.defaultDropSuccessIcon,
        positionX: Q.Right
      }), m("drop", o), a.view === Ue.Modal && (y("onDrop -> close modal"), Fe(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let G = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (G = a.redirectOnDrop()), l.push(G);
      }
    };
    x({
      doDrop: () => {
        P.value && P.value.doDrop();
      },
      doRefresh: ae,
      doSave: () => {
        P.value && P.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        k.value.increment(n.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => k.value.changed()
    });
    const Me = S(() => {
      var t;
      return k.value.changed() ? (t = a.modalConfig) == null ? void 0 : t.closeConfirm : "";
    }), Te = (t) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...t,
          itemCreated: H.value
        });
    }, ve = S(() => a.title.startsWith("__:") ? String(Ke(a.title.substring(3))) : a.title), we = S(() => v.value ? !1 : ve.value.length > 0 || !!i["post-title"]), fe = S(() => a.view === Ue.Modal), ke = S(() => fe.value ? "lkt-modal" : "section"), oe = S(() => {
      var t, o;
      return a.mode !== I.Update || !e.value || !a.enabledSaveWithoutChanges && !N.value ? !1 : typeof ((t = X.value) == null ? void 0 : t.disabled) == "function" ? !X.value.disabled(n.value) : typeof ((o = X.value) == null ? void 0 : o.disabled) == "boolean" ? !X.value.disabled : !0;
    }), ue = S(() => {
      var t, o;
      return a.mode !== I.Create || !a.enabledSaveWithoutChanges && !N.value ? !1 : typeof ((t = M.value) == null ? void 0 : t.disabled) == "function" ? !M.value.disabled(n.value) : typeof ((o = M.value) == null ? void 0 : o.disabled) == "boolean" ? !M.value.disabled : !0;
    }), ce = S(() => {
      var t, o;
      return C.value ? typeof ((t = F.value) == null ? void 0 : t.disabled) == "function" ? !F.value.disabled(n.value) : typeof ((o = F.value) == null ? void 0 : o.disabled) == "boolean" ? !F.value.disabled : !0 : !1;
    }), Re = S(() => ke.value === "lkt-modal" ? {
      title: a.title,
      item: n.value,
      ...a.modalConfig,
      beforeClose: Te,
      closeConfirm: Me.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: ue.value || oe.value
      } : !1
    } : {});
    return (t, o) => {
      const G = ye("lkt-http-info"), Ae = ye("lkt-loader");
      return c(), V(Ne(ke.value), w(Re.value, { class: "lkt-item-crud" }), ne({
        default: D(() => [
          Oe("article", Qe, [
            !fe.value && we.value ? (c(), L("header", Ye, [
              u(i)["pre-title"] ? (c(), L("div", Ze, [
                p(t.$slots, "pre-title", {
                  item: n.value,
                  loading: v.value
                })
              ])) : r("", !0),
              ve.value.length > 0 ? (c(), L("h1", _e, Ve(ve.value), 1)) : r("", !0),
              u(i)["post-title"] ? (c(), L("div", xe, [
                p(t.$slots, "post-title", {
                  item: n.value,
                  loading: v.value
                })
              ])) : r("", !0)
            ])) : r("", !0),
            t.buttonNavPosition === u(be).Top && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (c(), V(ge, {
              key: 1,
              ref_key: "buttonNav",
              ref: P,
              loading: v.value,
              "onUpdate:loading": o[2] || (o[2] = (g) => v.value = g),
              editing: b.value,
              "onUpdate:editing": o[3] || (o[3] = (g) => b.value = g),
              item: n.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": M.value,
              "update-button": X.value,
              "drop-button": F.value,
              "edit-mode-button": te.value,
              "group-button": re.value,
              "data-changed": N.value,
              "http-success-read": B.value,
              "can-update": e.value,
              "can-drop": C.value,
              "can-switch-edit-mode": h.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": ue.value,
              "able-to-update": oe.value,
              "able-to-drop": ce.value,
              perms: d.value,
              onCreate: ie,
              onSave: se,
              onDrop: pe
            }, ne({ _: 2 }, [
              u(i)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: D(({ canUpdate: g, canDrop: z, perms: J }) => [
                  p(t.$slots, "prev-buttons-ever", {
                    canUpdate: g,
                    canDrop: z,
                    perms: J
                  })
                ]),
                key: "0"
              } : void 0,
              u(i)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: D(({ canUpdate: g, canDrop: z, perms: J }) => [
                  p(t.$slots, "prev-buttons", {
                    canUpdate: g,
                    canDrop: z,
                    perms: J
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms"])) : r("", !0),
            v.value ? r("", !0) : (c(), L("div", et, [
              B.value ? (c(), L("div", tt, [
                j.value && t.notificationType === u(q).Inline ? (c(), V(G, {
                  key: 0,
                  code: A.value,
                  palette: A.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: o[4] || (o[4] = (g) => j.value = !1)
                }, null, 8, ["code", "palette"])) : r("", !0),
                p(t.$slots, "item", {
                  item: n.value,
                  loading: v.value,
                  editMode: b.value,
                  isCreate: R.value,
                  canUpdate: e.value,
                  canDrop: C.value,
                  itemBeingEdited: O.value,
                  perms: d.value
                })
              ])) : t.notificationType === u(q).Inline ? (c(), V(G, {
                key: 1,
                code: A.value
              }, null, 8, ["code"])) : r("", !0)
            ])),
            v.value ? (c(), V(Ae, { key: 3 })) : r("", !0),
            t.buttonNavPosition === u(be).Bottom && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (c(), V(ge, {
              key: 4,
              ref_key: "buttonNav",
              ref: P,
              loading: v.value,
              "onUpdate:loading": o[5] || (o[5] = (g) => v.value = g),
              editing: b.value,
              "onUpdate:editing": o[6] || (o[6] = (g) => b.value = g),
              item: n.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": M.value,
              "update-button": X.value,
              "drop-button": F.value,
              "edit-mode-button": te.value,
              "group-button": re.value,
              "data-changed": N.value,
              "http-success-read": B.value,
              "can-update": e.value,
              "can-drop": C.value,
              "can-switch-edit-mode": h.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": ue.value,
              "able-to-update": oe.value,
              "able-to-drop": ce.value,
              perms: d.value,
              onCreate: ie,
              onSave: se,
              onDrop: pe
            }, ne({ _: 2 }, [
              u(i)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: D(() => [
                  p(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              u(i)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: D(() => [
                  p(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms"])) : r("", !0)
          ])
        ]),
        _: 2
      }, [
        t.groupButton !== !1 && t.groupButtonAsModalActions ? {
          name: "header-actions",
          fn: D(() => [
            t.buttonNavPosition === u(be).Top ? (c(), V(ge, {
              key: 0,
              ref_key: "buttonNav",
              ref: P,
              loading: v.value,
              "onUpdate:loading": o[0] || (o[0] = (g) => v.value = g),
              editing: b.value,
              "onUpdate:editing": o[1] || (o[1] = (g) => b.value = g),
              item: n.value,
              mode: t.mode,
              view: t.view,
              grouped: !0,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": M.value,
              "update-button": X.value,
              "drop-button": F.value,
              "edit-mode-button": te.value,
              "group-button": re.value,
              "data-changed": N.value,
              "http-success-read": B.value,
              "can-update": e.value,
              "can-drop": C.value,
              "can-switch-edit-mode": h.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": ue.value,
              "able-to-update": oe.value,
              "able-to-drop": ce.value,
              perms: d.value,
              onCreate: ie,
              onSave: se,
              onDrop: pe
            }, ne({ _: 2 }, [
              u(i)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: D(({ canUpdate: g, canDrop: z, perms: J }) => [
                  p(t.$slots, "prev-buttons-ever", {
                    canUpdate: g,
                    canDrop: z,
                    perms: J
                  })
                ]),
                key: "0"
              } : void 0,
              u(i)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: D(({ canUpdate: g, canDrop: z, perms: J }) => [
                  p(t.$slots, "prev-buttons", {
                    canUpdate: g,
                    canDrop: z,
                    perms: J
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms"])) : r("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), ct = {
  install: (T, x = {}) => {
    T.component("lkt-item-crud") === void 0 && T.component("lkt-item-crud", at);
  }
}, mt = (T) => {
  Z.defaultSaveIcon = T;
}, bt = (T) => {
  Z.defaultDropIcon = T;
};
export {
  ft as debugLktItemCrud,
  ct as default,
  bt as setItemCrudDefaultDropIcon,
  mt as setItemCrudDefaultSaveIcon
};
