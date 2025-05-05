import { defineComponent as Me, useSlots as Te, ref as f, watch as k, computed as S, resolveComponent as ke, createElementBlock as N, createCommentVNode as d, openBlock as b, createBlock as j, Fragment as Ce, renderSlot as s, withDirectives as $, mergeProps as R, unref as u, createVNode as G, withCtx as C, vShow as L, mergeDefaults as $e, nextTick as Le, onMounted as Ne, resolveDynamicComponent as Oe, createSlots as re, createElementVNode as Ve, toDisplayString as je } from "vue";
import { httpCall as Pe } from "lkt-http-client";
import { DataState as Ue } from "lkt-data-state";
import { ItemCrudMode as I, ItemCrudButtonNavVisibility as Se, TablePermission as ge, ensureButtonConfig as q, LktSettings as i, ItemCrudView as Ie, ItemCrudButtonNavPosition as ye, NotificationType as J, getDefaultValues as Xe, ItemCrud as Fe, ToastPositionX as Z } from "lkt-vue-kernel";
import { closeModal as We, updateModalKey as Ke } from "lkt-modal";
import { __ as Ge } from "lkt-i18n";
import { openToast as _ } from "lkt-toast";
import { useRouter as qe } from "vue-router";
const ee = class ee {
};
ee.debugEnabled = !1, ee.defaultSaveIcon = "", ee.defaultDropIcon = "";
let x = ee;
const B = (...T) => {
  x.debugEnabled && console.info("[LktItemCrud] ", ...T);
}, ct = (T = !0) => {
  x.debugEnabled = T;
}, He = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, ze = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Je = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Qe = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, Be = /* @__PURE__ */ Me({
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
  setup(T, { expose: te, emit: le }) {
    const a = le, r = T, l = Te(), c = f(null), p = f(null), n = f(r.loading);
    k(() => r.loading, (e) => n.value = e), k(n, (e) => a("update:loading", e));
    const m = f(r.editing);
    k(() => r.editing, (e) => m.value = e), k(m, (e) => a("update:editing", e));
    const v = () => {
      n.value = !0;
    }, g = () => {
      n.value = !1;
    }, A = (e, D) => {
      typeof e > "u" || a("create", e, D);
    }, P = (e, D) => {
      typeof e > "u" || a("save", e, D);
    }, E = (e, D) => {
      typeof e > "u" || a("drop", e, D);
    };
    te({
      doSave: () => {
        c.value && typeof c.value.click == "function" && c.value.click();
      },
      doDrop: () => {
        p.value && typeof p.value.click == "function" && p.value.click();
      }
    });
    const H = S(() => !r.canDrop || r.dropButton === !1 ? !1 : !r.canUpdate && r.canDrop ? !0 : !n.value && r.editing && r.httpSuccessRead), U = S(() => r.mode === I.Create && r.createButton === !1 || r.mode === I.Update && r.updateButton === !1 || n.value ? !1 : r.editing && r.httpSuccessRead), z = S(() => r.editModeButton === !1 || !r.canSwitchEditMode || !r.canUpdate && !r.canDrop || !r.canUpdate && r.canDrop ? !1 : !n.value && r.mode !== I.Create && r.httpSuccessRead), ae = S(() => r.buttonNavVisibility === Se.Always || l["prev-buttons-ever"] ? !0 : r.buttonNavVisibility === Se.Never ? !1 : U.value || H.value || z.value);
    return (e, D) => {
      const h = ke("lkt-button");
      return ae.value ? (b(), N("div", He, [
        e.grouped && e.groupButtonAsModalActions ? (b(), N(Ce, { key: 0 }, [
          z.value ? (b(), j(h, R({ key: 0 }, e.editModeButton, {
            checked: m.value,
            "onUpdate:checked": D[0] || (D[0] = (X) => m.value = X),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0),
          u(l)["prev-buttons-ever"] ? s(e.$slots, "prev-buttons-ever", {
            key: 1,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          u(l)["prev-buttons"] ? s(e.$slots, "prev-buttons", {
            key: 2,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          $(G(h, R({
            ref_key: "saveButtonRef",
            ref: c
          }, e.updateButton, {
            disabled: !e.ableToUpdate,
            onLoading: v,
            onLoaded: g,
            onClick: P
          }), {
            default: C(() => [
              u(l)["button-save"] ? s(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: m.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, e.mode === u(I).Update && U.value]
          ]),
          $(G(h, R({
            ref_key: "saveButtonRef",
            ref: c
          }, e.createButton, {
            disabled: !e.ableToCreate,
            onLoading: v,
            onLoaded: g,
            onClick: A
          }), {
            default: C(() => [
              u(l)["button-save"] ? s(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: m.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, e.mode === u(I).Create && U.value]
          ]),
          $(G(h, R({
            ref_key: "dropButtonRef",
            ref: p
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: v,
            onLoaded: g,
            onClick: E
          }), {
            default: C(() => [
              u(l)["button-drop"] ? s(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: m.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, H.value && e.mode !== u(I).Create]
          ]),
          u(l).buttons ? s(e.$slots, "buttons", { key: 3 }) : d("", !0)
        ], 64)) : e.grouped ? (b(), j(h, R({
          key: 1,
          ref: "groupButton"
        }, e.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: C(() => [
            z.value ? (b(), j(h, R({ key: 0 }, e.editModeButton, {
              checked: m.value,
              "onUpdate:checked": D[1] || (D[1] = (X) => m.value = X),
              class: "lkt-item-crud--switch-mode-button"
            }), null, 16, ["checked"])) : d("", !0),
            u(l)["prev-buttons-ever"] ? s(e.$slots, "prev-buttons-ever", {
              key: 1,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : d("", !0),
            u(l)["prev-buttons"] ? s(e.$slots, "prev-buttons", {
              key: 2,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : d("", !0),
            $(G(h, R({
              ref_key: "saveButtonRef",
              ref: c
            }, e.updateButton, {
              disabled: !e.ableToUpdate,
              onLoading: v,
              onLoaded: g,
              onClick: P
            }), {
              default: C(() => [
                u(l)["button-save"] ? s(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: m.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : d("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [L, e.mode === u(I).Update && U.value]
            ]),
            $(G(h, R({
              ref_key: "saveButtonRef",
              ref: c
            }, e.createButton, {
              disabled: !e.ableToCreate,
              onLoading: v,
              onLoaded: g,
              onClick: A
            }), {
              default: C(() => [
                u(l)["button-save"] ? s(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: m.value,
                  isCreate: !0,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : d("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [L, e.mode === u(I).Create && U.value]
            ]),
            $(G(h, R({
              ref_key: "dropButtonRef",
              ref: p
            }, e.dropButton, {
              disabled: !e.ableToDrop,
              onLoading: v,
              onLoaded: g,
              onClick: E
            }), {
              default: C(() => [
                u(l)["button-drop"] ? s(e.$slots, "button-drop", {
                  key: 0,
                  item: e.item,
                  editMode: m.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : d("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [L, H.value && e.mode !== u(I).Create]
            ]),
            u(l).buttons ? s(e.$slots, "buttons", { key: 3 }) : d("", !0)
          ]),
          _: 3
        }, 16)) : (b(), N(Ce, { key: 2 }, [
          u(l)["prev-buttons-ever"] ? $((b(), N("div", ze, [
            s(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [L, !n.value]
          ]) : d("", !0),
          u(l)["prev-buttons"] ? $((b(), N("div", Je, [
            s(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [L, m.value && !n.value]
          ]) : d("", !0),
          $(G(h, R({
            ref_key: "saveButtonRef",
            ref: c
          }, e.updateButton, {
            disabled: !e.ableToUpdate,
            onLoading: v,
            onLoaded: g,
            onClick: P
          }), {
            default: C(() => [
              u(l)["button-save"] ? s(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: m.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, e.mode === u(I).Update && U.value]
          ]),
          $(G(h, R({
            ref_key: "saveButtonRef",
            ref: c
          }, e.createButton, {
            disabled: !e.ableToCreate,
            onLoading: v,
            onLoaded: g,
            onClick: A
          }), {
            default: C(() => [
              u(l)["button-save"] ? s(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: m.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: !1
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, e.mode === u(I).Create && U.value]
          ]),
          $(G(h, R({
            ref_key: "dropButtonRef",
            ref: p
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: v,
            onLoaded: g,
            onClick: E
          }), {
            default: C(() => [
              u(l)["button-drop"] ? s(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: m.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, H.value && e.mode !== u(I).Create]
          ]),
          u(l).buttons ? $((b(), N("div", Qe, [
            s(e.$slots, "buttons")
          ], 512)), [
            [L, m.value && !n.value]
          ]) : d("", !0),
          z.value ? (b(), j(h, R({ key: 3 }, e.editModeButton, {
            checked: m.value,
            "onUpdate:checked": D[2] || (D[2] = (X) => m.value = X),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0)
        ], 64))
      ])) : d("", !0);
    };
  }
}), Ye = { class: "lkt-item-crud" }, Ze = {
  key: 0,
  class: "lkt-item-crud_header"
}, _e = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, xe = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, et = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, tt = {
  key: 2,
  class: "lkt-item-crud_content"
}, at = {
  key: 0,
  class: "lkt-grid-1"
}, ot = /* @__PURE__ */ Me({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ $e({
    modelValue: {},
    editing: { type: Boolean },
    perms: {},
    customData: {},
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
    redirectOnDrop: { type: [String, Function] },
    events: {}
  }, Xe(Fe)),
  emits: [
    "update:modelValue",
    "update:editing",
    "update:perms",
    "update:customData",
    "read",
    "create",
    "update",
    "drop",
    "before-save",
    "perms",
    "error",
    "modified-data"
  ],
  setup(T, { expose: te, emit: le }) {
    const a = T, r = qe(), l = Te(), c = le, p = f(!0), n = f(a.modelValue), m = f(a.customData), v = f(a.perms), g = f(a.editing), A = f(!1), P = f(!1), E = f(200), M = f(new Ue(n.value, a.dataStateConfig)), O = f(!1), H = f(new Ue(a.readData)), U = f(a.mode === I.Create), z = f(!1), ae = f(!1), e = f(null), D = S(() => !U.value && Array.isArray(v.value) && v.value.includes(ge.Update)), h = S(() => !U.value && Array.isArray(v.value) && v.value.includes(ge.Drop)), X = S(() => !U.value && Array.isArray(v.value) && v.value.includes(ge.SwitchEditMode));
    k(() => a.mode, (t) => {
      U.value = t === I.Create;
    }), k(() => a.perms, (t) => {
      v.value = t;
    }), k(v, (t) => {
      c("update:perms", t);
    }), k(() => a.customData, (t) => {
      m.value = t;
    }), k(m, (t) => {
      c("update:customData", t);
    });
    const F = f(q(a.createButton, i.defaultCreateButton)), W = f(q(a.updateButton, i.defaultUpdateButton)), K = f(q(a.dropButton, i.defaultDropButton)), oe = f(q(a.editModeButton, i.defaultEditModeButton)), ie = f(q(a.groupButton, i.defaultGroupButton));
    k(() => a.createButton, (t) => {
      F.value = q(t, i.defaultCreateButton);
    }, { deep: !0 }), k(() => a.updateButton, (t) => {
      W.value = q(t, i.defaultUpdateButton);
    }, { deep: !0 }), k(() => a.dropButton, (t) => {
      K.value = q(t, i.defaultDropButton);
    }, { deep: !0 }), k(() => a.editModeButton, (t) => {
      oe.value = q(t, i.defaultEditModeButton);
    }, { deep: !0 });
    const ue = async () => {
      var t, o, V;
      B("fetchItem"), p.value = !0, E.value = -1, P.value = !1, typeof ((t = a.events) == null ? void 0 : t.httpStart) == "function" && a.events.httpStart();
      try {
        const w = await Pe(a.readResource, a.readData);
        if (B("fetchItem -> response", w), p.value = !1, E.value = w.httpStatus, m.value = w.custom, !w.success) {
          A.value = !1, E.value = w.httpStatus, typeof ((o = a.events) == null ? void 0 : o.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: w
          }), c("error", w.httpStatus);
          return;
        }
        A.value = !0, n.value = w.data, v.value = w.perms, M.value.increment(n.value).turnStoredIntoOriginal(), O.value = M.value.changed(), H.value.turnStoredIntoOriginal(), typeof ((V = a.events) == null ? void 0 : V.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: w
        }), c("read", w);
      } catch {
        p.value = !1, A.value = !1, E.value = 404, c("error", 404);
        return;
      }
    };
    k(() => a.modelValue, (t) => {
      n.value = t, M.value.increment(t);
    }, { deep: !0 }), k(n, (t) => {
      if (z.value = !0, B("item updated ->", n.value), typeof a.beforeEmitUpdate == "function") {
        B("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(n.value);
        B("item updated -> override with: ", o), typeof o == "object" && (n.value = o);
      }
      c("update:modelValue", n.value), B("item updated -> update dataState"), M.value.increment(t), O.value = M.value.changed(), Le(() => z.value = !1);
    }, { deep: !0 }), k(v, () => c("perms", v.value)), k(O, (t) => {
      c("modified-data", t);
    }), k(() => a.readData, (t) => {
      H.value.increment(t), H.value.changed() && ue();
    }), k(() => a.editing, (t) => {
      B("editing updated -> updating editMode", t), g.value = t;
    }), k(g, (t) => {
      B("editMode updated -> emit update", t), c("update:editing", t);
    }), Ne(() => {
      a.readResource && !U.value ? ue() : (U.value, A.value = !0, g.value = !0, p.value = !1, M.value.increment(n.value).turnStoredIntoOriginal(), O.value = M.value.changed());
    });
    const se = (t, o) => {
      if (o) {
        if (p.value = !1, typeof t < "u" && (E.value = t.httpStatus, !t.success))
          return P.value = !0, c("error", t.httpStatus), !1;
        P.value = !0;
      }
      return !0;
    }, he = (t, o) => {
      if (B("doAutoReloadId -> enter: ", t), typeof t < "u" && t.autoReloadId)
        if (B("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), typeof o < "u") {
          let V = o;
          typeof o == "function" && (V = o(t.autoReloadId)), r.push(V);
        } else me.value ? (B("doAutoReloadId -> insideModal: ", a), Ke(a.modalConfig.modalName, a.modalConfig.modalKey, t.autoReloadId)) : (B("doAutoReloadId -> outsideModal"), a.readData.id = t.autoReloadId, B("doAutoReloadId -> turning off create mode"), U.value = !1, ue());
    }, pe = (t, o) => {
      if (B("onCreate"), !se(o, F.value.resource)) {
        a.notificationType === J.Toast && _({
          text: i.defaultCreateErrorText,
          details: i.defaultCreateErrorDetails,
          icon: i.defaultCreateErrorIcon,
          positionX: Z.Right
        });
        return;
      }
      ae.value = !0, B("onCreate -> turn stored data into original"), M.value.increment(n.value).turnStoredIntoOriginal(), a.notificationType === J.Toast && _({
        text: i.defaultCreateSuccessText,
        details: i.defaultCreateSuccessDetails,
        icon: i.defaultCreateSuccessIcon,
        positionX: Z.Right
      }), he(o, a.redirectOnCreate), B("onCreate -> beforeEmitCreate"), c("create", o);
    }, ve = (t, o) => {
      if (B("onUpdate"), !se(o, W.value.resource)) {
        a.notificationType === J.Toast && _({
          text: i.defaultUpdateErrorText,
          details: i.defaultUpdateErrorDetails,
          icon: i.defaultUpdateErrorIcon,
          positionX: Z.Right
        });
        return;
      }
      B("onUpdate -> turn stored data into original"), M.value.turnStoredIntoOriginal(), a.notificationType === J.Toast && _({
        text: i.defaultUpdateSuccessText,
        details: i.defaultUpdateSuccessDetails,
        icon: i.defaultUpdateSuccessIcon,
        positionX: Z.Right
      }), he(o), c("update", o);
    }, fe = (t, o) => {
      if (B("onDrop"), !se(o, K.value.resource)) {
        a.notificationType === J.Toast && _({
          text: i.defaultDropErrorText,
          details: i.defaultDropErrorDetails,
          icon: i.defaultDropErrorIcon,
          positionX: Z.Right
        });
        return;
      }
      if (a.notificationType === J.Toast && _({
        text: i.defaultDropSuccessText,
        details: i.defaultDropSuccessDetails,
        icon: i.defaultDropSuccessIcon,
        positionX: Z.Right
      }), c("drop", o), a.view === Ie.Modal && (B("onDrop -> close modal"), We(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let V = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (V = a.redirectOnDrop()), r.push(V);
      }
    };
    te({
      doDrop: () => {
        e.value && e.value.doDrop();
      },
      doRefresh: ue,
      doSave: () => {
        e.value && e.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        M.value.increment(n.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => M.value.changed()
    });
    const we = S(() => {
      var t;
      return M.value.changed() ? (t = a.modalConfig) == null ? void 0 : t.closeConfirm : "";
    }), Re = (t) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...t,
          itemCreated: ae.value
        });
    }, ce = S(() => a.title.startsWith("__:") ? String(Ge(a.title.substring(3))) : a.title), Ae = S(() => p.value ? !1 : ce.value.length > 0 || !!l["post-title"]), me = S(() => a.view === Ie.Modal), De = S(() => me.value ? "lkt-modal" : "section"), ne = S(() => {
      var t, o;
      return a.mode !== I.Update || !D.value || !a.enabledSaveWithoutChanges && !O.value ? !1 : typeof ((t = W.value) == null ? void 0 : t.disabled) == "function" ? !W.value.disabled({
        prop: n.value
      }) : typeof ((o = W.value) == null ? void 0 : o.disabled) == "boolean" ? !W.value.disabled : !0;
    }), de = S(() => {
      var t, o;
      return a.mode !== I.Create || !a.enabledSaveWithoutChanges && !O.value ? !1 : typeof ((t = F.value) == null ? void 0 : t.disabled) == "function" ? !F.value.disabled({
        prop: n.value
      }) : typeof ((o = F.value) == null ? void 0 : o.disabled) == "boolean" ? !F.value.disabled : !0;
    }), be = S(() => {
      var t, o;
      return h.value ? typeof ((t = K.value) == null ? void 0 : t.disabled) == "function" ? !K.value.disabled({
        prop: n.value
      }) : typeof ((o = K.value) == null ? void 0 : o.disabled) == "boolean" ? !K.value.disabled : !0 : !1;
    }), Ee = S(() => De.value === "lkt-modal" ? {
      title: a.title,
      item: n.value,
      ...a.modalConfig,
      beforeClose: Re,
      closeConfirm: we.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: de.value || ne.value
      } : !1
    } : {});
    return (t, o) => {
      const V = ke("lkt-http-info"), w = ke("lkt-loader");
      return b(), j(Oe(De.value), R(Ee.value, { class: "lkt-item-crud" }), re({
        default: C(() => [
          Ve("article", Ye, [
            !me.value && Ae.value ? (b(), N("header", Ze, [
              u(l)["pre-title"] ? (b(), N("div", _e, [
                s(t.$slots, "pre-title", {
                  item: n.value,
                  loading: p.value
                })
              ])) : d("", !0),
              ce.value.length > 0 ? (b(), N("h1", xe, je(ce.value), 1)) : d("", !0),
              u(l)["post-title"] ? (b(), N("div", et, [
                s(t.$slots, "post-title", {
                  item: n.value,
                  loading: p.value
                })
              ])) : d("", !0)
            ])) : d("", !0),
            t.buttonNavPosition === u(ye).Top && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (b(), j(Be, {
              key: 1,
              ref_key: "buttonNav",
              ref: e,
              loading: p.value,
              "onUpdate:loading": o[2] || (o[2] = (y) => p.value = y),
              editing: g.value,
              "onUpdate:editing": o[3] || (o[3] = (y) => g.value = y),
              item: n.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": F.value,
              "update-button": W.value,
              "drop-button": K.value,
              "edit-mode-button": oe.value,
              "group-button": ie.value,
              "data-changed": O.value,
              "http-success-read": A.value,
              "can-update": D.value,
              "can-drop": h.value,
              "can-switch-edit-mode": X.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": de.value,
              "able-to-update": ne.value,
              "able-to-drop": be.value,
              perms: v.value,
              onCreate: pe,
              onSave: ve,
              onDrop: fe
            }, re({ _: 2 }, [
              u(l)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: C(({ canUpdate: y, canDrop: Q, perms: Y }) => [
                  s(t.$slots, "prev-buttons-ever", {
                    canUpdate: y,
                    canDrop: Q,
                    perms: Y
                  })
                ]),
                key: "0"
              } : void 0,
              u(l)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: C(({ canUpdate: y, canDrop: Q, perms: Y }) => [
                  s(t.$slots, "prev-buttons", {
                    canUpdate: y,
                    canDrop: Q,
                    perms: Y
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms"])) : d("", !0),
            p.value ? d("", !0) : (b(), N("div", tt, [
              A.value ? (b(), N("div", at, [
                P.value && t.notificationType === u(J).Inline ? (b(), j(V, {
                  key: 0,
                  code: E.value,
                  palette: E.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: o[4] || (o[4] = (y) => P.value = !1)
                }, null, 8, ["code", "palette"])) : d("", !0),
                s(t.$slots, "item", {
                  item: n.value,
                  loading: p.value,
                  editMode: g.value,
                  isCreate: U.value,
                  canUpdate: D.value,
                  canDrop: h.value,
                  itemBeingEdited: z.value,
                  perms: v.value
                })
              ])) : t.notificationType === u(J).Inline ? (b(), j(V, {
                key: 1,
                code: E.value
              }, null, 8, ["code"])) : d("", !0)
            ])),
            p.value ? (b(), j(w, { key: 3 })) : d("", !0),
            t.buttonNavPosition === u(ye).Bottom && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (b(), j(Be, {
              key: 4,
              ref_key: "buttonNav",
              ref: e,
              loading: p.value,
              "onUpdate:loading": o[5] || (o[5] = (y) => p.value = y),
              editing: g.value,
              "onUpdate:editing": o[6] || (o[6] = (y) => g.value = y),
              item: n.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": F.value,
              "update-button": W.value,
              "drop-button": K.value,
              "edit-mode-button": oe.value,
              "group-button": ie.value,
              "data-changed": O.value,
              "http-success-read": A.value,
              "can-update": D.value,
              "can-drop": h.value,
              "can-switch-edit-mode": X.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": de.value,
              "able-to-update": ne.value,
              "able-to-drop": be.value,
              perms: v.value,
              onCreate: pe,
              onSave: ve,
              onDrop: fe
            }, re({ _: 2 }, [
              u(l)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: C(() => [
                  s(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              u(l)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: C(() => [
                  s(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms"])) : d("", !0)
          ])
        ]),
        _: 2
      }, [
        t.groupButton !== !1 && t.groupButtonAsModalActions ? {
          name: "header-actions",
          fn: C(() => [
            t.buttonNavPosition === u(ye).Top ? (b(), j(Be, {
              key: 0,
              ref_key: "buttonNav",
              ref: e,
              loading: p.value,
              "onUpdate:loading": o[0] || (o[0] = (y) => p.value = y),
              editing: g.value,
              "onUpdate:editing": o[1] || (o[1] = (y) => g.value = y),
              item: n.value,
              mode: t.mode,
              view: t.view,
              grouped: !0,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": F.value,
              "update-button": W.value,
              "drop-button": K.value,
              "edit-mode-button": oe.value,
              "group-button": ie.value,
              "data-changed": O.value,
              "http-success-read": A.value,
              "can-update": D.value,
              "can-drop": h.value,
              "can-switch-edit-mode": X.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": de.value,
              "able-to-update": ne.value,
              "able-to-drop": be.value,
              perms: v.value,
              onCreate: pe,
              onSave: ve,
              onDrop: fe
            }, re({ _: 2 }, [
              u(l)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: C(({ canUpdate: y, canDrop: Q, perms: Y }) => [
                  s(t.$slots, "prev-buttons-ever", {
                    canUpdate: y,
                    canDrop: Q,
                    perms: Y
                  })
                ]),
                key: "0"
              } : void 0,
              u(l)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: C(({ canUpdate: y, canDrop: Q, perms: Y }) => [
                  s(t.$slots, "prev-buttons", {
                    canUpdate: y,
                    canDrop: Q,
                    perms: Y
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms"])) : d("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), mt = {
  install: (T, te = {}) => {
    T.component("lkt-item-crud") === void 0 && T.component("lkt-item-crud", ot);
  }
}, bt = (T) => {
  x.defaultSaveIcon = T;
}, gt = (T) => {
  x.defaultDropIcon = T;
};
export {
  ct as debugLktItemCrud,
  mt as default,
  gt as setItemCrudDefaultDropIcon,
  bt as setItemCrudDefaultSaveIcon
};
