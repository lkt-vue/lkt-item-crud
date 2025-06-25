import { defineComponent as Je, ref as p, watch as C, useSlots as Qe, computed as b, resolveComponent as Be, createElementBlock as S, createCommentVNode as w, openBlock as n, createBlock as g, Fragment as F, renderSlot as I, withDirectives as B, mergeProps as v, normalizeProps as Me, unref as d, renderList as K, vShow as y, createVNode as J, withCtx as _, mergeDefaults as nt, nextTick as Ge, onMounted as ut, resolveDynamicComponent as it, createSlots as ge, toDisplayString as lt } from "vue";
import { httpCall as rt } from "lkt-http-client";
import { DataState as je } from "lkt-data-state";
import { ModificationView as U, ItemCrudMode as V, ItemCrudButtonNavVisibility as qe, ButtonType as Fe, TablePermission as Ue, ensureButtonConfig as Z, LktSettings as k, getFormDataState as dt, ItemCrudView as ze, getFormSlotKeys as st, ItemCrudButtonNavPosition as Pe, NotificationType as ue, getDefaultValues as vt, ItemCrud as pt, ToastPositionX as fe } from "lkt-vue-kernel";
import { closeModal as ft, updateModalKey as ct } from "lkt-modal";
import { __ as mt } from "lkt-i18n";
import { openToast as ce } from "lkt-toast";
import { useRouter as bt } from "vue-router";
const ye = class ye {
};
ye.debugEnabled = !1, ye.defaultSaveIcon = "", ye.defaultDropIcon = "";
let me = ye;
const T = (...$) => {
  me.debugEnabled && console.info("[LktItemCrud] ", ...$);
}, jt = ($ = !0) => {
  me.debugEnabled = $;
}, gt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Bt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, yt = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, kt = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, Xe = /* @__PURE__ */ Je({
  __name: "ButtonNav",
  props: {
    item: { default: () => ({}) },
    modifications: { default: () => ({}) },
    editing: { type: Boolean, default: !1 },
    loading: { type: Boolean },
    grouped: { type: Boolean },
    view: {},
    mode: {},
    createButton: { type: [Object, Boolean] },
    createAndNewButton: { type: [Object, Boolean] },
    updateButton: { type: [Object, Boolean] },
    dropButton: { type: [Object, Boolean] },
    editModeButton: { type: [Object, Boolean] },
    groupButton: { type: [Object, Boolean] },
    groupButtonAsModalActions: { type: Boolean },
    dataChanged: { type: Boolean },
    ableToCreate: { type: Boolean },
    ableToCreateAndNew: { type: Boolean },
    ableToUpdate: { type: Boolean },
    ableToDrop: { type: Boolean },
    canCreate: { type: Boolean },
    canUpdate: { type: Boolean },
    canDrop: { type: Boolean },
    canSwitchEditMode: { type: Boolean },
    perms: {},
    httpSuccessRead: { type: Boolean },
    buttonNavVisibility: {},
    modificationView: { type: [Boolean, Array] },
    pickedModificationView: {},
    editableView: {},
    navStartButtons: {},
    navStartButtonsEditing: {},
    navEndButtons: {},
    navEndButtonsEditing: {}
  },
  emits: [
    "update:loading",
    "update:editing",
    "update:pickedModificationView",
    "create",
    "save",
    "drop"
  ],
  setup($, { expose: ke, emit: Ee }) {
    const a = Ee, u = $, E = p(u.pickedModificationView);
    C(() => u.pickedModificationView, (e) => E.value = e), C(E, (e) => a("update:pickedModificationView", e));
    const h = Qe(), f = p(null), s = p(null), i = p(u.loading);
    C(() => u.loading, (e) => i.value = e), C(i, (e) => a("update:loading", e));
    const A = p(u.editing);
    C(() => u.editing, (e) => A.value = e), C(A, (e) => a("update:editing", e));
    const m = () => {
      i.value = !0;
    }, D = () => {
      i.value = !1;
    }, Q = (e, L) => {
      typeof e > "u" || a("create", e, L);
    }, x = (e, L) => {
      typeof e > "u" || a("save", e, L);
    }, P = (e, L) => {
      typeof e > "u" || a("drop", e, L);
    }, N = b(() => u.editableView === U.Modifications ? u.modifications : u.item);
    ke({
      doSave: () => {
        f.value && typeof f.value.click == "function" && f.value.click();
      },
      doDrop: () => {
        s.value && typeof s.value.click == "function" && s.value.click();
      }
    });
    const W = b(() => !u.canDrop || u.dropButton === !1 ? !1 : !u.canUpdate && u.canDrop ? !0 : !i.value && u.editing && u.httpSuccessRead), M = b(() => u.mode === V.Create && (u.createButton === !1 || !u.canCreate) || u.mode === V.Update && (u.updateButton === !1 || !u.canUpdate) || i.value ? !1 : u.editing && u.httpSuccessRead), oe = b(() => u.editModeButton === !1 || !u.canSwitchEditMode || !u.canUpdate && !u.canDrop || !u.canUpdate && u.canDrop ? !1 : !i.value && u.mode !== V.Create && u.httpSuccessRead), Y = b(() => u.buttonNavVisibility === qe.Always || h["prev-buttons-ever"] ? !0 : u.buttonNavVisibility === qe.Never ? !1 : M.value || W.value || oe.value), G = b(() => u.modificationView === !1 ? [] : u.modificationView === !0 ? [
      U.Current,
      U.Modifications,
      U.SplitView,
      U.Differences
    ] : Array.isArray(u.modificationView) ? u.modificationView : []), se = b(() => {
      let e = [];
      return G.value.includes(U.Current) && e.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: E.value === U.Current,
        events: {
          click: () => {
            E.value = U.Current;
          }
        }
      }), G.value.includes(U.Modifications) && e.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: E.value === U.Modifications,
        events: {
          click: () => {
            E.value = U.Modifications;
          }
        }
      }), G.value.includes(U.SplitView) && e.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: E.value === U.SplitView,
        events: {
          click: () => {
            E.value = U.SplitView;
          }
        }
      }), G.value.includes(U.Differences) && e.push({
        text: "Differences",
        icon: "lkt-icn-balance",
        disabled: E.value === U.Differences,
        events: {
          click: () => {
            E.value = U.Differences;
          }
        }
      }), e;
    });
    return (e, L) => {
      var te, ae, ve, j, q, pe;
      const l = Be("lkt-button");
      return Y.value ? (n(), S("div", gt, [
        e.grouped && e.groupButtonAsModalActions ? (n(), S(F, { key: 0 }, [
          oe.value ? (n(), g(l, v({ key: 0 }, e.editModeButton, {
            checked: A.value,
            "onUpdate:checked": L[0] || (L[0] = (c) => A.value = c),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : w("", !0),
          G.value.length > 0 ? (n(), g(l, Me(v({ key: 1 }, {
            type: d(Fe).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: se.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : w("", !0),
          (n(!0), S(F, null, K(e.navStartButtons, (c) => B((n(), g(l, v({ ref_for: !0 }, c), null, 16)), [
            [y, !i.value]
          ])), 256)),
          d(h)["prev-buttons-ever"] ? I(e.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : w("", !0),
          (n(!0), S(F, null, K(e.navStartButtonsEditing, (c) => B((n(), g(l, v({ ref_for: !0 }, c), null, 16)), [
            [y, A.value && !i.value]
          ])), 256)),
          d(h)["prev-buttons"] ? I(e.$slots, "prev-buttons", {
            key: 3,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : w("", !0),
          B(J(l, v({
            ref_key: "saveButtonRef",
            ref: f
          }, {
            ...e.updateButton,
            resourceData: {
              ...(te = e.updateButton) == null ? void 0 : te.resourceData,
              ...N.value
            },
            disabled: !e.ableToUpdate
          }, {
            onLoading: m,
            onLoaded: D,
            onClick: x
          }), null, 16), [
            [y, e.mode === d(V).Update && M.value]
          ]),
          B(J(l, v({
            ref_key: "saveButtonRef",
            ref: f
          }, {
            ...e.createButton,
            resourceData: {
              ...(ae = e.createButton) == null ? void 0 : ae.resourceData,
              ...N.value
            },
            disabled: !e.ableToCreate
          }, {
            onLoading: m,
            onLoaded: D,
            onClick: Q
          }), null, 16), [
            [y, e.mode === d(V).Create && M.value]
          ]),
          B(J(l, v({
            ref_key: "saveButtonRef",
            ref: f
          }, {
            ...e.createAndNewButton,
            resourceData: {
              ...(ve = e.createAndNewButton) == null ? void 0 : ve.resourceData,
              ...N.value
            },
            disabled: !e.ableToCreate
          }, {
            onLoading: m,
            onLoaded: D,
            onClick: Q
          }), null, 16), [
            [y, e.mode === d(V).Create && M.value && e.ableToCreateAndNew]
          ]),
          B(J(l, v({
            ref_key: "dropButtonRef",
            ref: s
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: m,
            onLoaded: D,
            onClick: P
          }), null, 16, ["disabled"]), [
            [y, W.value && e.mode !== d(V).Create]
          ]),
          d(h).buttons ? I(e.$slots, "buttons", { key: 4 }) : w("", !0),
          (n(!0), S(F, null, K(e.navEndButtons, (c) => B((n(), g(l, v({ ref_for: !0 }, c), null, 16)), [
            [y, !i.value]
          ])), 256)),
          (n(!0), S(F, null, K(e.navEndButtonsEditing, (c) => B((n(), g(l, v({ ref_for: !0 }, c), null, 16)), [
            [y, A.value && !i.value]
          ])), 256))
        ], 64)) : e.grouped ? (n(), g(l, v({
          key: 1,
          ref: "groupButton"
        }, e.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: _(() => {
            var c, z, ie;
            return [
              oe.value ? (n(), g(l, v({ key: 0 }, e.editModeButton, {
                checked: A.value,
                "onUpdate:checked": L[1] || (L[1] = (X) => A.value = X),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : w("", !0),
              G.value.length > 0 ? (n(), g(l, Me(v({ key: 1 }, {
                type: d(Fe).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: se.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : w("", !0),
              (n(!0), S(F, null, K(e.navStartButtons, (X) => B((n(), g(l, v({ ref_for: !0 }, X), null, 16)), [
                [y, !i.value]
              ])), 256)),
              d(h)["prev-buttons-ever"] ? I(e.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop,
                perms: e.perms
              }) : w("", !0),
              (n(!0), S(F, null, K(e.navStartButtonsEditing, (X) => B((n(), g(l, v({ ref_for: !0 }, X), null, 16)), [
                [y, A.value && !i.value]
              ])), 256)),
              d(h)["prev-buttons"] ? I(e.$slots, "prev-buttons", {
                key: 3,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop,
                perms: e.perms
              }) : w("", !0),
              B(J(l, v({
                ref_key: "saveButtonRef",
                ref: f
              }, {
                ...e.updateButton,
                resourceData: {
                  ...(c = e.updateButton) == null ? void 0 : c.resourceData,
                  ...N.value
                },
                disabled: !e.ableToUpdate
              }, {
                onLoading: m,
                onLoaded: D,
                onClick: x
              }), null, 16), [
                [y, e.mode === d(V).Update && M.value]
              ]),
              B(J(l, v({
                ref_key: "saveButtonRef",
                ref: f
              }, {
                ...e.createButton,
                resourceData: {
                  ...(z = e.createButton) == null ? void 0 : z.resourceData,
                  ...N.value
                },
                disabled: !e.ableToCreate
              }, {
                disabled: !e.ableToCreate,
                onLoading: m,
                onLoaded: D,
                onClick: Q
              }), null, 16, ["disabled"]), [
                [y, e.mode === d(V).Create && M.value]
              ]),
              B(J(l, v({
                ref_key: "saveButtonRef",
                ref: f
              }, {
                ...e.createAndNewButton,
                resourceData: {
                  ...(ie = e.createAndNewButton) == null ? void 0 : ie.resourceData,
                  ...N.value
                },
                disabled: !e.ableToCreate
              }, {
                disabled: !e.ableToCreate,
                onLoading: m,
                onLoaded: D,
                onClick: Q
              }), null, 16, ["disabled"]), [
                [y, e.mode === d(V).Create && M.value && e.ableToCreateAndNew]
              ]),
              B(J(l, v({
                ref_key: "dropButtonRef",
                ref: s
              }, e.dropButton, {
                disabled: !e.ableToDrop,
                onLoading: m,
                onLoaded: D,
                onClick: P
              }), null, 16, ["disabled"]), [
                [y, W.value && e.mode !== d(V).Create]
              ]),
              d(h).buttons ? I(e.$slots, "buttons", { key: 4 }) : w("", !0),
              (n(!0), S(F, null, K(e.navEndButtons, (X) => B((n(), g(l, v({ ref_for: !0 }, X), null, 16)), [
                [y, !i.value]
              ])), 256)),
              (n(!0), S(F, null, K(e.navEndButtonsEditing, (X) => B((n(), g(l, v({ ref_for: !0 }, X), null, 16)), [
                [y, A.value && !i.value]
              ])), 256))
            ];
          }),
          _: 3
        }, 16)) : (n(), S(F, { key: 2 }, [
          (n(!0), S(F, null, K(e.navStartButtons, (c) => B((n(), g(l, v({ ref_for: !0 }, c), null, 16)), [
            [y, !i.value]
          ])), 256)),
          d(h)["prev-buttons-ever"] ? B((n(), S("div", Bt, [
            I(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [y, !i.value]
          ]) : w("", !0),
          (n(!0), S(F, null, K(e.navStartButtonsEditing, (c) => B((n(), g(l, v({ ref_for: !0 }, c), null, 16)), [
            [y, A.value && !i.value]
          ])), 256)),
          d(h)["prev-buttons"] ? B((n(), S("div", yt, [
            I(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [y, A.value && !i.value]
          ]) : w("", !0),
          B(J(l, v({
            ref_key: "saveButtonRef",
            ref: f
          }, {
            ...e.updateButton,
            resourceData: {
              ...(j = e.updateButton) == null ? void 0 : j.resourceData,
              ...N.value
            },
            disabled: !e.ableToUpdate
          }, {
            onLoading: m,
            onLoaded: D,
            onClick: x
          }), null, 16), [
            [y, e.mode === d(V).Update && M.value]
          ]),
          B(J(l, v({
            ref_key: "saveButtonRef",
            ref: f
          }, {
            ...e.createButton,
            resourceData: {
              ...(q = e.createButton) == null ? void 0 : q.resourceData,
              ...N.value
            },
            disabled: !e.ableToCreate
          }, {
            onLoading: m,
            onLoaded: D,
            onClick: Q
          }), null, 16), [
            [y, e.mode === d(V).Create && M.value]
          ]),
          B(J(l, v({
            ref_key: "saveButtonRef",
            ref: f
          }, {
            ...e.createAndNewButton,
            resourceData: {
              ...(pe = e.createAndNewButton) == null ? void 0 : pe.resourceData,
              ...N.value
            },
            disabled: !e.ableToCreate
          }, {
            onLoading: m,
            onLoaded: D,
            onClick: Q
          }), null, 16), [
            [y, e.mode === d(V).Create && M.value && e.ableToCreateAndNew]
          ]),
          B(J(l, v({
            ref_key: "dropButtonRef",
            ref: s
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: m,
            onLoaded: D,
            onClick: P
          }), null, 16, ["disabled"]), [
            [y, W.value && e.mode !== d(V).Create]
          ]),
          d(h).buttons ? B((n(), S("div", kt, [
            I(e.$slots, "buttons")
          ], 512)), [
            [y, A.value && !i.value]
          ]) : w("", !0),
          (n(!0), S(F, null, K(e.navEndButtons, (c) => B((n(), g(l, v({ ref_for: !0 }, c), null, 16)), [
            [y, !i.value]
          ])), 256)),
          (n(!0), S(F, null, K(e.navEndButtonsEditing, (c) => B((n(), g(l, v({ ref_for: !0 }, c), null, 16)), [
            [y, A.value && !i.value]
          ])), 256)),
          G.value.length > 0 ? (n(), g(l, Me(v({ key: 3 }, {
            type: d(Fe).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: se.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : w("", !0),
          oe.value ? (n(), g(l, v({ key: 4 }, e.editModeButton, {
            checked: A.value,
            "onUpdate:checked": L[2] || (L[2] = (c) => A.value = c),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : w("", !0)
        ], 64))
      ])) : w("", !0);
    };
  }
}), Ct = {
  key: 1,
  class: "lkt-item-crud_header"
}, wt = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, ht = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, Dt = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, St = {
  key: 3,
  class: "lkt-item-crud_content"
}, Ut = {
  key: 0,
  class: "lkt-grid-1"
}, Mt = /* @__PURE__ */ Je({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ nt({
    modelValue: {},
    modifications: {},
    editing: { type: Boolean },
    perms: {},
    customData: {},
    form: { type: [Object, Function] },
    formUiConfig: {},
    mode: {},
    view: {},
    visibleView: {},
    modificationViews: { type: [Boolean, Array] },
    editModeButton: { type: [Object, Boolean] },
    dropButton: { type: [Object, Boolean] },
    createButton: { type: [Object, Boolean] },
    createAndNewButton: { type: [Object, Boolean] },
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
    header: {},
    beforeEmitUpdate: { type: Function },
    notificationType: {},
    enabledSaveWithoutChanges: { type: Boolean },
    redirectOnCreate: { type: [String, Function] },
    redirectOnDrop: { type: [String, Function] },
    differencesTableConfig: { type: [Object, Function] },
    navStartButtons: {},
    navStartButtonsEditing: {},
    navEndButtons: {},
    navEndButtonsEditing: {},
    events: {}
  }, vt(pt)),
  emits: [
    "update:modelValue",
    "update:editing",
    "update:perms",
    "update:customData",
    "update:modifications",
    "update:visibleView",
    "read",
    "create",
    "update",
    "drop",
    "before-save",
    "perms",
    "error",
    "modified-data"
  ],
  setup($, { expose: ke, emit: Ee }) {
    const a = $, u = bt(), E = Qe(), h = Ee, f = p(!0), s = p(a.modelValue), i = p(a.modifications), A = p(a.customData), m = p(a.perms), D = p(a.editing), Q = p(!1), x = p(!1), P = p(!1), N = p(!1), ee = p(200), O = p(new je(s.value, a.dataStateConfig)), W = p(new je(i.value, a.dataStateConfig)), M = p(!1), oe = p(new je(a.readData)), Y = p(a.mode === V.Create), G = p(!1), se = p(!1), e = p(null), L = p(null), l = b(() => Y.value && a.createButton !== !1 && Array.isArray(m.value) && m.value.includes(Ue.Create)), te = b(() => !Y.value && a.updateButton !== !1 && Array.isArray(m.value) && m.value.includes(Ue.Update)), ae = b(() => !Y.value && a.dropButton !== !1 && Array.isArray(m.value) && m.value.includes(Ue.Drop)), ve = b(() => a.editModeButton !== !1 && !Y.value && Array.isArray(m.value) && m.value.includes(Ue.SwitchEditMode)), j = p(a.visibleView);
    C(() => a.visibleView, (t) => {
      j.value = t;
    }), C(j, (t) => {
      h("update:visibleView", t);
    }), C(() => a.mode, (t) => {
      Y.value = t === V.Create;
    }), C(() => a.perms, (t) => {
      m.value = t;
    }), C(m, (t) => {
      h("update:perms", t);
    }), C(() => a.customData, (t) => {
      A.value = t;
    }), C(A, (t) => {
      h("update:customData", t);
    }), C(() => a.modifications, (t) => {
      W.value.increment(t), i.value = t;
    }, { deep: !0 }), C(i, (t) => {
      Ae(), W.value.increment(t), le.value === U.Modifications && (M.value = W.value.changed()), h("update:modifications", t);
    }, { deep: !0 });
    const q = p(Z(a.createButton, k.defaultCreateButton)), pe = p(Z(a.createAndNewButton, a.createButton)), c = p(Z(a.updateButton, k.defaultUpdateButton)), z = p(Z(a.dropButton, k.defaultDropButton)), ie = p(Z(a.editModeButton, k.defaultEditModeButton)), X = p(Z(a.groupButton, k.defaultGroupButton));
    C(() => a.createButton, (t) => {
      q.value = Z(t, k.defaultCreateButton);
    }, { deep: !0 }), C(() => a.updateButton, (t) => {
      c.value = Z(t, k.defaultUpdateButton);
    }, { deep: !0 }), C(() => a.dropButton, (t) => {
      z.value = Z(t, k.defaultDropButton);
    }, { deep: !0 }), C(() => a.editModeButton, (t) => {
      ie.value = Z(t, k.defaultEditModeButton);
    }, { deep: !0 });
    const Ce = async () => {
      var t, o, H;
      T("fetchItem"), f.value = !0, ee.value = -1, N.value = !1, typeof ((t = a.events) == null ? void 0 : t.httpStart) == "function" && a.events.httpStart();
      try {
        const R = await rt(a.readResource, a.readData);
        if (T("fetchItem -> response", R), f.value = !1, ee.value = R.httpStatus, A.value = R.custom, !R.success) {
          P.value = !1, ee.value = R.httpStatus, typeof ((o = a.events) == null ? void 0 : o.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: R
          }), h("error", R.httpStatus);
          return;
        }
        P.value = !0, s.value = R.data, i.value = Array.isArray(R.modifications) ? {} : R.modifications, m.value = R.perms, O.value.increment(s.value).turnStoredIntoOriginal(), W.value.increment(i.value).turnStoredIntoOriginal(), M.value = O.value.changed(), oe.value.turnStoredIntoOriginal(), Object.keys(i.value).length > 0 && (j.value = U.Modifications), ne.value && (Ae(), Ge(() => {
          L.value.turnStoredIntoOriginal();
        })), typeof ((H = a.events) == null ? void 0 : H.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: R
        }), h("read", R);
      } catch {
        f.value = !1, P.value = !1, ee.value = 404, h("error", 404);
        return;
      }
    };
    C(G, (t) => {
      t && Ge(() => G.value = !1);
    }), C(() => a.modelValue, (t) => {
      s.value = t, O.value.increment(t);
    }, { deep: !0 }), C(s, (t) => {
      if (T("item updated ->", s.value), typeof a.beforeEmitUpdate == "function") {
        T("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(s.value);
        T("item updated -> override with: ", o), typeof o == "object" && (s.value = o);
      }
      ne.value && Ae(), h("update:modelValue", s.value), T("item updated -> update dataState"), O.value.increment(t), le.value === U.Current && (M.value = O.value.changed()), G.value = !0;
    }, { deep: !0 }), C(m, () => h("perms", m.value)), C(M, (t) => {
      h("modified-data", t);
    }), C(() => a.readData, (t) => {
      oe.value.increment(t), oe.value.changed() && Ce();
    }), C(() => a.editing, (t) => {
      T("editing updated -> updating editMode", t), D.value = t;
    }), C(D, (t) => {
      T("editMode updated -> emit update", t), h("update:editing", t);
    });
    const He = p(void 0), Ae = () => {
      ne.value && (He.value = dt(s.value, i.value, be.value));
    };
    ut(() => {
      a.readResource && !Y.value ? Ce() : (Y.value, P.value = !0, D.value = !0, f.value = !1, O.value.increment(s.value).turnStoredIntoOriginal(), M.value = O.value.changed());
    });
    const Te = (t, o) => {
      if (o) {
        if (f.value = !1, typeof t < "u" && (ee.value = t.httpStatus, !t.success))
          return N.value = !0, h("error", t.httpStatus), !1;
        N.value = !0;
      }
      return !0;
    }, Ke = (t, o) => {
      if (T("doAutoReloadId -> enter: ", t), typeof t < "u" && t.autoReloadId)
        if (T("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), typeof o < "u") {
          let H = o;
          typeof o == "function" && (H = o(t.autoReloadId)), u.push(H);
        } else we.value ? (T("doAutoReloadId -> insideModal: ", a), ct(a.modalConfig.modalName, a.modalConfig.modalKey, t.autoReloadId)) : (T("doAutoReloadId -> outsideModal"), a.readData.id = t.autoReloadId, T("doAutoReloadId -> turning off create mode"), Y.value = !1, Ce());
    }, Ve = (t, o) => {
      if (T("onCreate"), !Te(o, q.value.resource)) {
        a.notificationType === ue.Toast && ce({
          text: k.defaultCreateErrorText,
          details: k.defaultCreateErrorDetails,
          icon: k.defaultCreateErrorIcon,
          positionX: fe.Right
        });
        return;
      }
      se.value = !0, T("onCreate -> turn stored data into original"), O.value.increment(s.value).turnStoredIntoOriginal(), W.value.turnStoredIntoOriginal(), a.notificationType === ue.Toast && ce({
        text: k.defaultCreateSuccessText,
        details: k.defaultCreateSuccessDetails,
        icon: k.defaultCreateSuccessIcon,
        positionX: fe.Right
      }), Ke(o, a.redirectOnCreate), T("onCreate -> beforeEmitCreate"), h("create", o);
    }, Ie = (t, o) => {
      if (T("onUpdate"), !Te(o, c.value.resource)) {
        a.notificationType === ue.Toast && ce({
          text: k.defaultUpdateErrorText,
          details: k.defaultUpdateErrorDetails,
          icon: k.defaultUpdateErrorIcon,
          positionX: fe.Right
        });
        return;
      }
      T("onUpdate -> turn stored data into original"), O.value.turnStoredIntoOriginal(), W.value.turnStoredIntoOriginal(), a.notificationType === ue.Toast && ce({
        text: k.defaultUpdateSuccessText,
        details: k.defaultUpdateSuccessDetails,
        icon: k.defaultUpdateSuccessIcon,
        positionX: fe.Right
      }), Ke(o), h("update", o);
    }, Re = (t, o) => {
      if (T("onDrop"), !Te(o, z.value.resource)) {
        a.notificationType === ue.Toast && ce({
          text: k.defaultDropErrorText,
          details: k.defaultDropErrorDetails,
          icon: k.defaultDropErrorIcon,
          positionX: fe.Right
        });
        return;
      }
      if (a.notificationType === ue.Toast && ce({
        text: k.defaultDropSuccessText,
        details: k.defaultDropSuccessDetails,
        icon: k.defaultDropSuccessIcon,
        positionX: fe.Right
      }), h("drop", o), a.view === ze.Modal && (T("onDrop -> close modal"), ft(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let H = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (H = a.redirectOnDrop()), u.push(H);
      }
    };
    ke({
      doDrop: () => {
        e.value && e.value.doDrop();
      },
      doRefresh: Ce,
      doSave: () => {
        e.value && e.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        O.value.increment(s.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => O.value.changed()
    });
    const Ye = b(() => {
      var t, o, H;
      return Se.value ? ne.value ? x.value ? (t = a.modalConfig) == null ? void 0 : t.closeConfirm : "" : le.value === U.Modifications ? W.value.changed() ? (o = a.modalConfig) == null ? void 0 : o.closeConfirm : "" : O.value.changed() ? (H = a.modalConfig) == null ? void 0 : H.closeConfirm : "" : "";
    }), Ze = (t) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...t,
          itemCreated: se.value
        });
    }, Ne = b(() => a.title.startsWith("__:") ? String(mt(a.title.substring(3))) : a.title), _e = b(() => f.value ? !1 : Ne.value.length > 0 || !!E["post-title"]), xe = b(() => f.value ? !1 : typeof a.header == "object" && Object.keys(a.header).length > 0), we = b(() => a.view === ze.Modal), We = b(() => we.value ? "lkt-modal" : "section"), he = b(() => {
      var t, o;
      return a.mode !== V.Update || !te.value || !a.enabledSaveWithoutChanges && !M.value || ne.value && (!Q.value || !x.value) ? !1 : typeof ((t = c.value) == null ? void 0 : t.disabled) == "function" ? !c.value.disabled({
        prop: s.value
      }) : typeof ((o = c.value) == null ? void 0 : o.disabled) == "boolean" ? !c.value.disabled : !0;
    }), De = b(() => {
      var t, o;
      return a.mode !== V.Create || !l.value || !a.enabledSaveWithoutChanges && !M.value || ne.value && !Q.value && !x.value ? !1 : typeof ((t = q.value) == null ? void 0 : t.disabled) == "function" ? !q.value.disabled({
        prop: s.value
      }) : typeof ((o = q.value) == null ? void 0 : o.disabled) == "boolean" ? !q.value.disabled : !0;
    }), Oe = b(() => a.createAndNewButton !== !1 && typeof a.createAndNewButton == "object" && !Array.isArray(a.createAndNewButton) && Object.keys(a.createAndNewButton).length > 0), Le = b(() => {
      var t, o;
      return ae.value ? typeof ((t = z.value) == null ? void 0 : t.disabled) == "function" ? !z.value.disabled({
        prop: s.value
      }) : typeof ((o = z.value) == null ? void 0 : o.disabled) == "boolean" ? !z.value.disabled : !0 : !1;
    }), et = b(() => We.value === "lkt-modal" ? {
      title: a.title,
      item: s.value,
      ...a.modalConfig,
      beforeClose: Ze,
      closeConfirm: Ye.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: De.value || he.value
      } : !1
    } : {}), ne = b(() => typeof be.value == "object" && Object.keys(be.value).length > 0), $e = b(() => Object.keys(i.value).length === 0 ? [] : a.modificationViews), le = b(() => Object.keys(i.value).length === 0 ? U.Current : U.Modifications), Se = b(() => l.value || te.value || ae.value), tt = b(() => ne.value ? st(be.value) : []), be = b(() => typeof a.form == "function" ? a.form({
      mode: a.mode,
      view: j.value,
      item: s.value,
      modifications: i.value,
      editing: D.value
    }) : a.form);
    return (t, o) => {
      const H = Be("lkt-header"), R = Be("lkt-http-info"), at = Be("lkt-form"), ot = Be("lkt-loader");
      return n(), g(it(We.value), v(et.value, { class: "lkt-item-crud" }), ge({
        default: _(() => [
          !we.value && xe.value ? (n(), g(H, Me(v({ key: 0 }, t.header)), null, 16)) : !we.value && _e.value ? (n(), S("header", Ct, [
            d(E)["pre-title"] ? (n(), S("div", wt, [
              I(t.$slots, "pre-title", {
                item: s.value,
                loading: f.value
              })
            ])) : w("", !0),
            Ne.value.length > 0 ? (n(), S("h1", ht, lt(Ne.value), 1)) : w("", !0),
            d(E)["post-title"] ? (n(), S("div", Dt, [
              I(t.$slots, "post-title", {
                item: s.value,
                loading: f.value
              })
            ])) : w("", !0)
          ])) : w("", !0),
          t.buttonNavPosition === d(Pe).Top && (t.groupButton === !1 || !t.groupButtonAsModalActions) && Se.value ? (n(), g(Xe, {
            key: 2,
            ref_key: "buttonNav",
            ref: e,
            loading: f.value,
            "onUpdate:loading": o[3] || (o[3] = (r) => f.value = r),
            editing: D.value,
            "onUpdate:editing": o[4] || (o[4] = (r) => D.value = r),
            "picked-modification-view": j.value,
            "onUpdate:pickedModificationView": o[5] || (o[5] = (r) => j.value = r),
            item: s.value,
            modifications: i.value,
            mode: t.mode,
            view: t.view,
            grouped: t.groupButton !== !1,
            "button-nav-visibility": t.buttonNavVisibility,
            "create-button": q.value,
            "create-and-new-button": pe.value,
            "update-button": c.value,
            "drop-button": z.value,
            "edit-mode-button": ie.value,
            "group-button": X.value,
            "data-changed": M.value,
            "http-success-read": P.value,
            "can-create": l.value,
            "can-update": te.value,
            "can-drop": ae.value,
            "can-switch-edit-mode": ve.value,
            "group-button-as-modal-actions": t.groupButtonAsModalActions,
            "able-to-create": De.value,
            "able-to-create-and-new": Oe.value,
            "able-to-update": he.value,
            "able-to-drop": Le.value,
            perms: m.value,
            "modification-view": $e.value,
            "editable-view": le.value,
            "nav-start-buttons": t.navStartButtons,
            "nav-start-buttons-editing": t.navStartButtonsEditing,
            "nav-end-buttons": t.navEndButtons,
            "nav-end-buttons-editing": t.navEndButtonsEditing,
            onCreate: Ve,
            onSave: Ie,
            onDrop: Re
          }, ge({ _: 2 }, [
            d(E)["prev-buttons-ever"] ? {
              name: "prev-buttons-ever",
              fn: _(({ canUpdate: r, canDrop: re, perms: de }) => [
                I(t.$slots, "prev-buttons-ever", {
                  canUpdate: r,
                  canDrop: re,
                  perms: de
                })
              ]),
              key: "0"
            } : void 0,
            d(E)["prev-buttons"] ? {
              name: "prev-buttons",
              fn: _(({ canUpdate: r, canDrop: re, perms: de }) => [
                I(t.$slots, "prev-buttons", {
                  canUpdate: r,
                  canDrop: re,
                  perms: de
                })
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing"])) : w("", !0),
          f.value ? w("", !0) : (n(), S("div", St, [
            P.value ? (n(), S("div", Ut, [
              N.value && t.notificationType === d(ue).Inline ? (n(), g(R, {
                key: 0,
                code: ee.value,
                palette: ee.value === 200 ? "success" : "danger",
                quick: "",
                "can-close": "",
                onClose: o[6] || (o[6] = (r) => N.value = !1)
              }, null, 8, ["code", "palette"])) : w("", !0),
              ne.value ? (n(), g(at, v({
                key: 1,
                ref_key: "formRef",
                ref: L,
                modelValue: s.value,
                "onUpdate:modelValue": o[7] || (o[7] = (r) => s.value = r),
                modifications: i.value,
                "onUpdate:modifications": o[8] || (o[8] = (r) => i.value = r),
                valid: Q.value,
                "onUpdate:valid": o[9] || (o[9] = (r) => Q.value = r),
                changed: x.value,
                "onUpdate:changed": o[10] || (o[10] = (r) => x.value = r)
              }, {
                ...t.formUiConfig,
                form: be.value,
                differencesTableConfig: t.differencesTableConfig,
                visibleView: j.value,
                modificationDataState: He.value,
                editableViews: [le.value],
                disabled: !D.value
              }), ge({ _: 2 }, [
                K(tt.value, (r) => ({
                  name: r,
                  fn: _(({}) => [
                    I(t.$slots, r)
                  ])
                }))
              ]), 1040, ["modelValue", "modifications", "valid", "changed"])) : I(t.$slots, "item", {
                key: 2,
                item: s.value,
                loading: f.value,
                editMode: D.value,
                isCreate: Y.value,
                canUpdate: te.value,
                canDrop: ae.value,
                itemBeingEdited: G.value,
                perms: m.value
              })
            ])) : t.notificationType === d(ue).Inline ? (n(), g(R, {
              key: 1,
              code: ee.value
            }, null, 8, ["code"])) : w("", !0)
          ])),
          f.value ? (n(), g(ot, { key: 4 })) : w("", !0),
          t.buttonNavPosition === d(Pe).Bottom && (t.groupButton === !1 || !t.groupButtonAsModalActions) && Se.value ? (n(), g(Xe, {
            key: 5,
            ref_key: "buttonNav",
            ref: e,
            loading: f.value,
            "onUpdate:loading": o[11] || (o[11] = (r) => f.value = r),
            editing: D.value,
            "onUpdate:editing": o[12] || (o[12] = (r) => D.value = r),
            "picked-modification-view": j.value,
            "onUpdate:pickedModificationView": o[13] || (o[13] = (r) => j.value = r),
            item: s.value,
            modifications: i.value,
            mode: t.mode,
            view: t.view,
            grouped: t.groupButton !== !1,
            "button-nav-visibility": t.buttonNavVisibility,
            "create-button": q.value,
            "create-and-new-button": pe.value,
            "update-button": c.value,
            "drop-button": z.value,
            "edit-mode-button": ie.value,
            "group-button": X.value,
            "data-changed": M.value,
            "http-success-read": P.value,
            "can-create": l.value,
            "can-update": te.value,
            "can-drop": ae.value,
            "can-switch-edit-mode": ve.value,
            "group-button-as-modal-actions": t.groupButtonAsModalActions,
            "able-to-create": De.value,
            "able-to-create-and-new": Oe.value,
            "able-to-update": he.value,
            "able-to-drop": Le.value,
            perms: m.value,
            "modification-view": $e.value,
            "editable-view": le.value,
            "nav-start-buttons": t.navStartButtons,
            "nav-start-buttons-editing": t.navStartButtonsEditing,
            "nav-end-buttons": t.navEndButtons,
            "nav-end-buttons-editing": t.navEndButtonsEditing,
            onCreate: Ve,
            onSave: Ie,
            onDrop: Re
          }, ge({ _: 2 }, [
            d(E)["prev-buttons-ever"] ? {
              name: "prev-buttons-ever",
              fn: _(() => [
                I(t.$slots, "prev-buttons-ever")
              ]),
              key: "0"
            } : void 0,
            d(E)["prev-buttons"] ? {
              name: "prev-buttons-ever",
              fn: _(() => [
                I(t.$slots, "prev-buttons")
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing"])) : w("", !0)
        ]),
        _: 2
      }, [
        t.groupButton !== !1 && t.groupButtonAsModalActions && Se.value ? {
          name: "header-actions",
          fn: _(() => [
            t.buttonNavPosition === d(Pe).Top ? (n(), g(Xe, {
              key: 0,
              ref_key: "buttonNav",
              ref: e,
              loading: f.value,
              "onUpdate:loading": o[0] || (o[0] = (r) => f.value = r),
              editing: D.value,
              "onUpdate:editing": o[1] || (o[1] = (r) => D.value = r),
              "picked-modification-view": j.value,
              "onUpdate:pickedModificationView": o[2] || (o[2] = (r) => j.value = r),
              item: s.value,
              modifications: i.value,
              mode: t.mode,
              view: t.view,
              grouped: !0,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": q.value,
              "create-and-new-button": pe.value,
              "update-button": c.value,
              "drop-button": z.value,
              "edit-mode-button": ie.value,
              "group-button": X.value,
              "data-changed": M.value,
              "http-success-read": P.value,
              "can-create": l.value,
              "can-update": te.value,
              "can-drop": ae.value,
              "can-switch-edit-mode": ve.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": De.value,
              "able-to-create-and-new": Oe.value,
              "able-to-update": he.value,
              "able-to-drop": Le.value,
              perms: m.value,
              "modification-view": $e.value,
              "editable-view": le.value,
              "nav-start-buttons": t.navStartButtons,
              "nav-start-buttons-editing": t.navStartButtonsEditing,
              "nav-end-buttons": t.navEndButtons,
              "nav-end-buttons-editing": t.navEndButtonsEditing,
              onCreate: Ve,
              onSave: Ie,
              onDrop: Re
            }, ge({ _: 2 }, [
              d(E)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: _(({ canUpdate: r, canDrop: re, perms: de }) => [
                  I(t.$slots, "prev-buttons-ever", {
                    canUpdate: r,
                    canDrop: re,
                    perms: de
                  })
                ]),
                key: "0"
              } : void 0,
              d(E)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: _(({ canUpdate: r, canDrop: re, perms: de }) => [
                  I(t.$slots, "prev-buttons", {
                    canUpdate: r,
                    canDrop: re,
                    perms: de
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing"])) : w("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), Ft = {
  install: ($, ke = {}) => {
    $.component("lkt-item-crud") === void 0 && $.component("lkt-item-crud", Mt);
  }
}, Pt = ($) => {
  me.defaultSaveIcon = $;
}, Xt = ($) => {
  me.defaultDropIcon = $;
};
export {
  jt as debugLktItemCrud,
  Ft as default,
  Xt as setItemCrudDefaultDropIcon,
  Pt as setItemCrudDefaultSaveIcon
};
