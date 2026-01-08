import { defineComponent as Ye, ref as s, watch as w, useSlots as Ze, computed as y, resolveComponent as he, createElementBlock as S, createCommentVNode as C, openBlock as n, createBlock as c, Fragment as K, renderSlot as I, withDirectives as g, mergeProps as v, normalizeProps as je, unref as d, renderList as J, vShow as B, createVNode as Z, withCtx as _, mergeDefaults as nt, nextTick as ze, onMounted as ut, resolveDynamicComponent as it, createSlots as ge, toDisplayString as lt } from "vue";
import { httpCall as dt } from "lkt-http-client";
import { DataState as Ke } from "lkt-data-state";
import { ModificationView as E, ItemCrudMode as V, ItemCrudButtonNavVisibility as Je, ButtonType as We, TablePermission as Oe, ensureButtonConfig as oe, LktSettings as k, getFormDataState as rt, extractI18nValue as st, ItemCrudView as Qe, getFormSlotKeys as vt, ItemCrudButtonNavPosition as Le, NotificationType as ve, getDefaultValues as pt, ItemCrud as ft, ToastPositionX as ne } from "lkt-vue-kernel";
import { closeModal as ct, updateModalKey as mt } from "lkt-modal";
import { openToast as ue } from "lkt-toast";
import { useRouter as bt } from "vue-router";
const De = class De {
};
De.debugEnabled = !1, De.defaultSaveIcon = "", De.defaultDropIcon = "";
let Be = De;
const T = (...H) => {
  Be.debugEnabled && console.info("[LktItemCrud] ", ...H);
}, $t = (H = !0) => {
  Be.debugEnabled = H;
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
}, $e = /* @__PURE__ */ Ye({
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
    navEndButtonsEditing: {},
    updateConfig: {}
  },
  emits: [
    "update:loading",
    "update:editing",
    "update:pickedModificationView",
    "create",
    "save",
    "drop"
  ],
  setup(H, { expose: Se, emit: Fe }) {
    const a = Fe, i = H, M = s(i.pickedModificationView);
    w(() => i.pickedModificationView, (t) => M.value = t), w(M, (t) => a("update:pickedModificationView", t));
    const h = Ze(), m = s(null), p = s(null), U = s(null), te = s(null), l = s(i.loading);
    w(() => i.loading, (t) => l.value = t), w(l, (t) => {
      i.updateConfig.executionMode === "blocking" && a("update:loading", t);
    });
    const f = s(i.editing);
    w(() => i.editing, (t) => f.value = t), w(f, (t) => a("update:editing", t));
    const L = () => {
      l.value = !0;
    }, O = () => {
      l.value = !1;
    }, $ = (t, R) => {
      typeof t > "u" || a("create", t, R);
    }, ie = (t, R) => {
      typeof t > "u" || a("save", t, R);
    }, Q = (t, R) => {
      typeof t > "u" || a("drop", t, R);
    }, D = y(() => i.editableView === E.Modifications ? i.modifications : i.item);
    Se({
      doSave: () => {
        if (A.value)
          switch (i.mode) {
            case V.Update:
              U.value && typeof U.value.click == "function" && U.value.click();
              break;
            case V.Create:
              m.value && typeof m.value.click == "function" && m.value.click();
              break;
          }
      },
      doDrop: () => {
        te.value && typeof te.value.click == "function" && te.value.click();
      }
    });
    const re = y(() => !i.canDrop || i.dropButton === !1 ? !1 : !i.canUpdate && i.canDrop ? !0 : !l.value && i.editing && i.httpSuccessRead), A = y(() => i.mode === V.Create && (i.createButton === !1 || !i.canCreate) || i.mode === V.Update && (i.updateButton === !1 || !i.canUpdate) || l.value ? !1 : i.editing && i.httpSuccessRead), le = y(() => i.editModeButton === !1 || !i.canSwitchEditMode || !i.canUpdate && !i.canDrop || !i.canUpdate && i.canDrop ? !1 : !l.value && i.mode !== V.Create && i.httpSuccessRead), Ue = y(() => i.buttonNavVisibility === Je.Always || h["prev-buttons-ever"] ? !0 : i.buttonNavVisibility === Je.Never ? !1 : A.value || re.value || le.value), X = y(() => i.modificationView === !1 ? [] : i.modificationView === !0 ? [
      E.Current,
      E.Modifications,
      E.SplitView,
      E.Differences
    ] : Array.isArray(i.modificationView) ? i.modificationView : []), be = y(() => {
      let t = [];
      return X.value.includes(E.Current) && t.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: M.value === E.Current,
        events: {
          click: () => {
            M.value = E.Current;
          }
        }
      }), X.value.includes(E.Modifications) && t.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: M.value === E.Modifications,
        events: {
          click: () => {
            M.value = E.Modifications;
          }
        }
      }), X.value.includes(E.SplitView) && t.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: M.value === E.SplitView,
        events: {
          click: () => {
            M.value = E.SplitView;
          }
        }
      }), X.value.includes(E.Differences) && t.push({
        text: "Differences",
        icon: "lkt-icn-balance",
        disabled: M.value === E.Differences,
        events: {
          click: () => {
            M.value = E.Differences;
          }
        }
      }), t;
    });
    return (t, R) => {
      var pe, P, G, fe, q, z;
      const r = he("lkt-button");
      return Ue.value ? (n(), S("div", gt, [
        t.grouped && t.groupButtonAsModalActions ? (n(), S(K, { key: 0 }, [
          le.value ? (n(), c(r, v({ key: 0 }, t.editModeButton, {
            checked: f.value,
            "onUpdate:checked": R[0] || (R[0] = (b) => f.value = b),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : C("", !0),
          X.value.length > 0 ? (n(), c(r, je(v({ key: 1 }, {
            type: d(We).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: be.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : C("", !0),
          (n(!0), S(K, null, J(t.navStartButtons, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, !l.value]
          ])), 256)),
          d(h)["prev-buttons-ever"] ? I(t.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : C("", !0),
          (n(!0), S(K, null, J(t.navStartButtonsEditing, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, f.value && !l.value]
          ])), 256)),
          d(h)["prev-buttons"] ? I(t.$slots, "prev-buttons", {
            key: 3,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : C("", !0),
          g(Z(r, v({
            ref_key: "saveButtonRef",
            ref: U
          }, {
            ...t.updateButton,
            resourceData: {
              ...(pe = t.updateButton) == null ? void 0 : pe.resourceData,
              ...D.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: L,
            onLoaded: O,
            onClick: ie
          }), null, 16), [
            [B, t.mode === d(V).Update && A.value]
          ]),
          g(Z(r, v({
            ref_key: "createButtonRef",
            ref: m
          }, {
            ...t.createButton,
            resourceData: {
              ...(P = t.createButton) == null ? void 0 : P.resourceData,
              ...D.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: L,
            onLoaded: O,
            onClick: $
          }), null, 16), [
            [B, t.mode === d(V).Create && A.value]
          ]),
          g(Z(r, v({
            ref_key: "createAndNewButtonRef",
            ref: p
          }, {
            ...t.createAndNewButton,
            resourceData: {
              ...(G = t.createAndNewButton) == null ? void 0 : G.resourceData,
              ...D.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: L,
            onLoaded: O,
            onClick: $
          }), null, 16), [
            [B, t.mode === d(V).Create && A.value && t.ableToCreateAndNew]
          ]),
          g(Z(r, v({
            ref_key: "dropButtonRef",
            ref: te
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: L,
            onLoaded: O,
            onClick: Q
          }), null, 16, ["disabled"]), [
            [B, re.value && t.mode !== d(V).Create]
          ]),
          d(h).buttons ? I(t.$slots, "buttons", { key: 4 }) : C("", !0),
          (n(!0), S(K, null, J(t.navEndButtons, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, !l.value]
          ])), 256)),
          (n(!0), S(K, null, J(t.navEndButtonsEditing, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, f.value && !l.value]
          ])), 256))
        ], 64)) : t.grouped ? (n(), c(r, v({
          key: 1,
          ref: "groupButton"
        }, t.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: _(() => {
            var b, ce, me;
            return [
              le.value ? (n(), c(r, v({ key: 0 }, t.editModeButton, {
                checked: f.value,
                "onUpdate:checked": R[1] || (R[1] = (Y) => f.value = Y),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : C("", !0),
              X.value.length > 0 ? (n(), c(r, je(v({ key: 1 }, {
                type: d(We).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: be.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : C("", !0),
              (n(!0), S(K, null, J(t.navStartButtons, (Y) => g((n(), c(r, v({ ref_for: !0 }, Y), null, 16)), [
                [B, !l.value]
              ])), 256)),
              d(h)["prev-buttons-ever"] ? I(t.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : C("", !0),
              (n(!0), S(K, null, J(t.navStartButtonsEditing, (Y) => g((n(), c(r, v({ ref_for: !0 }, Y), null, 16)), [
                [B, f.value && !l.value]
              ])), 256)),
              d(h)["prev-buttons"] ? I(t.$slots, "prev-buttons", {
                key: 3,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : C("", !0),
              g(Z(r, v({
                ref_key: "saveButtonRef",
                ref: U
              }, {
                ...t.updateButton,
                resourceData: {
                  ...(b = t.updateButton) == null ? void 0 : b.resourceData,
                  ...D.value
                },
                disabled: !t.ableToUpdate
              }, {
                onLoading: L,
                onLoaded: O,
                onClick: ie
              }), null, 16), [
                [B, t.mode === d(V).Update && A.value]
              ]),
              g(Z(r, v({
                ref_key: "createButtonRef",
                ref: m
              }, {
                ...t.createButton,
                resourceData: {
                  ...(ce = t.createButton) == null ? void 0 : ce.resourceData,
                  ...D.value
                },
                disabled: !t.ableToCreate
              }, {
                disabled: !t.ableToCreate,
                onLoading: L,
                onLoaded: O,
                onClick: $
              }), null, 16, ["disabled"]), [
                [B, t.mode === d(V).Create && A.value]
              ]),
              g(Z(r, v({
                ref_key: "createAndNewButtonRef",
                ref: p
              }, {
                ...t.createAndNewButton,
                resourceData: {
                  ...(me = t.createAndNewButton) == null ? void 0 : me.resourceData,
                  ...D.value
                },
                disabled: !t.ableToCreate
              }, {
                disabled: !t.ableToCreate,
                onLoading: L,
                onLoaded: O,
                onClick: $
              }), null, 16, ["disabled"]), [
                [B, t.mode === d(V).Create && A.value && t.ableToCreateAndNew]
              ]),
              g(Z(r, v({
                ref_key: "dropButtonRef",
                ref: te
              }, t.dropButton, {
                disabled: !t.ableToDrop,
                onLoading: L,
                onLoaded: O,
                onClick: Q
              }), null, 16, ["disabled"]), [
                [B, re.value && t.mode !== d(V).Create]
              ]),
              d(h).buttons ? I(t.$slots, "buttons", { key: 4 }) : C("", !0),
              (n(!0), S(K, null, J(t.navEndButtons, (Y) => g((n(), c(r, v({ ref_for: !0 }, Y), null, 16)), [
                [B, !l.value]
              ])), 256)),
              (n(!0), S(K, null, J(t.navEndButtonsEditing, (Y) => g((n(), c(r, v({ ref_for: !0 }, Y), null, 16)), [
                [B, f.value && !l.value]
              ])), 256))
            ];
          }),
          _: 3
        }, 16)) : (n(), S(K, { key: 2 }, [
          (n(!0), S(K, null, J(t.navStartButtons, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, !l.value]
          ])), 256)),
          d(h)["prev-buttons-ever"] ? g((n(), S("div", Bt, [
            I(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [B, !l.value]
          ]) : C("", !0),
          (n(!0), S(K, null, J(t.navStartButtonsEditing, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, f.value && !l.value]
          ])), 256)),
          d(h)["prev-buttons"] ? g((n(), S("div", yt, [
            I(t.$slots, "prev-buttons", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [B, f.value && !l.value]
          ]) : C("", !0),
          g(Z(r, v({
            ref_key: "saveButtonRef",
            ref: U
          }, {
            ...t.updateButton,
            resourceData: {
              ...(fe = t.updateButton) == null ? void 0 : fe.resourceData,
              ...D.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: L,
            onLoaded: O,
            onClick: ie
          }), null, 16), [
            [B, t.mode === d(V).Update && A.value]
          ]),
          g(Z(r, v({
            ref_key: "createButtonRef",
            ref: m
          }, {
            ...t.createButton,
            resourceData: {
              ...(q = t.createButton) == null ? void 0 : q.resourceData,
              ...D.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: L,
            onLoaded: O,
            onClick: $
          }), null, 16), [
            [B, t.mode === d(V).Create && A.value]
          ]),
          g(Z(r, v({
            ref_key: "createAndNewButtonRef",
            ref: p
          }, {
            ...t.createAndNewButton,
            resourceData: {
              ...(z = t.createAndNewButton) == null ? void 0 : z.resourceData,
              ...D.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: L,
            onLoaded: O,
            onClick: $
          }), null, 16), [
            [B, t.mode === d(V).Create && A.value && t.ableToCreateAndNew]
          ]),
          g(Z(r, v({
            ref_key: "dropButtonRef",
            ref: te
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: L,
            onLoaded: O,
            onClick: Q
          }), null, 16, ["disabled"]), [
            [B, re.value && t.mode !== d(V).Create]
          ]),
          d(h).buttons ? g((n(), S("div", kt, [
            I(t.$slots, "buttons")
          ], 512)), [
            [B, f.value && !l.value]
          ]) : C("", !0),
          (n(!0), S(K, null, J(t.navEndButtons, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, !l.value]
          ])), 256)),
          (n(!0), S(K, null, J(t.navEndButtonsEditing, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, f.value && !l.value]
          ])), 256)),
          X.value.length > 0 ? (n(), c(r, je(v({ key: 3 }, {
            type: d(We).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: be.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : C("", !0),
          le.value ? (n(), c(r, v({ key: 4 }, t.editModeButton, {
            checked: f.value,
            "onUpdate:checked": R[2] || (R[2] = (b) => f.value = b),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : C("", !0)
        ], 64))
      ])) : C("", !0);
    };
  }
}), wt = {
  key: 1,
  class: "lkt-item-crud_header"
}, Ct = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, ht = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, Dt = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, St = {
  key: 4,
  class: "lkt-item-crud_content"
}, Ut = {
  key: 0,
  class: "lkt-grid-1"
}, Et = /* @__PURE__ */ Ye({
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
    events: {},
    updateConfig: {}
  }, pt(ft)),
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
  setup(H, { expose: Se, emit: Fe }) {
    const a = H, i = bt(), M = Ze(), h = Fe, m = s(!0), p = s(a.modelValue), U = s(a.modifications), te = s(a.customData), l = s(a.perms), f = s(a.editing), L = s(!1), O = s(!1), $ = s(!1), ie = s(!1), Q = s(200), D = s(new Ke(p.value, a.dataStateConfig)), de = s(new Ke(U.value, a.dataStateConfig)), W = s(!1), re = s(new Ke(a.readData)), A = s(a.mode === V.Create), le = s(!1), Ue = s(!1), X = s(null), be = s(null), t = y(() => A.value && a.createButton !== !1 && Array.isArray(l.value) && l.value.includes(Oe.Create)), R = y(() => !A.value && a.updateButton !== !1 && Array.isArray(l.value) && l.value.includes(Oe.Update)), r = y(() => !A.value && a.dropButton !== !1 && Array.isArray(l.value) && l.value.includes(Oe.Drop)), pe = y(() => a.editModeButton !== !1 && !A.value && Array.isArray(l.value) && l.value.includes(Oe.SwitchEditMode)), P = s(a.visibleView);
    w(() => a.visibleView, (e) => {
      P.value = e;
    }), w(P, (e) => {
      h("update:visibleView", e);
    }), w(() => a.mode, (e) => {
      A.value = e === V.Create;
    }), w(() => a.perms, (e) => {
      l.value = e;
    }), w(l, (e) => {
      h("update:perms", e);
    }), w(() => a.customData, (e) => {
      te.value = e;
    }), w(te, (e) => {
      h("update:customData", e);
    }), w(() => a.modifications, (e) => {
      de.value.increment(e), U.value = e;
    }, { deep: !0 }), w(U, (e) => {
      Xe(), de.value.increment(e), se.value === E.Modifications && (W.value = de.value.changed()), h("update:modifications", e);
    }, { deep: !0 });
    const G = s(oe(a.createButton, k.defaultCreateButton)), fe = s(oe(a.createAndNewButton, a.createButton)), q = s(oe(a.updateButton, k.defaultUpdateButton)), z = s(oe(a.dropButton, k.defaultDropButton)), b = s(oe(a.editModeButton, k.defaultEditModeButton)), ce = s(oe(a.groupButton, k.defaultGroupButton));
    w(() => a.createButton, (e) => {
      G.value = oe(e, k.defaultCreateButton);
    }, { deep: !0 }), w(() => a.updateButton, (e) => {
      q.value = oe(e, k.defaultUpdateButton);
    }, { deep: !0 }), w(() => a.dropButton, (e) => {
      z.value = oe(e, k.defaultDropButton);
    }, { deep: !0 }), w(() => a.editModeButton, (e) => {
      b.value = oe(e, k.defaultEditModeButton);
    }, { deep: !0 });
    const me = async () => {
      var e, o, N, j;
      T("fetchItem"), m.value = !0, Q.value = -1, ie.value = !1, typeof ((e = a.events) == null ? void 0 : e.httpStart) == "function" && a.events.httpStart();
      try {
        const F = await dt(a.readResource, a.readData);
        if ((o = F.notifications) == null || o.forEach((Ne) => {
          Ne.category === "toast" && ue({
            positionX: ne.Right,
            ...Ne.payload
          });
        }), T("fetchItem -> response", F), m.value = !1, Q.value = F.httpStatus, te.value = F.custom, !F.success) {
          $.value = !1, Q.value = F.httpStatus, typeof ((N = a.events) == null ? void 0 : N.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: F
          }), h("error", F.httpStatus);
          return;
        }
        $.value = !0, p.value = F.data, U.value = Array.isArray(F.modifications) ? {} : F.modifications, l.value = F.perms, D.value.increment(p.value).turnStoredIntoOriginal(), de.value.increment(U.value).turnStoredIntoOriginal(), W.value = D.value.changed(), re.value.turnStoredIntoOriginal(), Object.keys(U.value).length > 0 && (P.value = E.Modifications), ae.value && (Xe(), ze(() => {
          be.value.turnStoredIntoOriginal();
        })), typeof ((j = a.events) == null ? void 0 : j.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: F
        }), h("read", F);
      } catch {
        m.value = !1, $.value = !1, Q.value = 404, h("error", 404);
        return;
      }
    };
    w(le, (e) => {
      e && ze(() => le.value = !1);
    }), w(() => a.modelValue, (e) => {
      p.value = e, D.value.increment(e);
    }, { deep: !0 }), w(p, (e) => {
      if (T("item updated ->", p.value), typeof a.beforeEmitUpdate == "function") {
        T("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(p.value);
        T("item updated -> override with: ", o), typeof o == "object" && (p.value = o);
      }
      ae.value && Xe(), h("update:modelValue", p.value), T("item updated -> update dataState"), D.value.increment(e), se.value === E.Current && (W.value = D.value.changed(), T("item updated -> dataState changed")), le.value = !0;
    }, { deep: !0 }), w(l, () => h("perms", l.value)), w(W, (e) => {
      h("modified-data", e);
    }), w(() => a.readData, (e) => {
      re.value.increment(e), re.value.changed() && me();
    }), w(() => a.editing, (e) => {
      T("editing updated -> updating editMode", e), f.value = e;
    }), w(f, (e) => {
      T("editMode updated -> emit update", e), h("update:editing", e);
    });
    const Y = s(void 0), Xe = () => {
      ae.value && (Y.value = rt(p.value, U.value, Ce.value));
    };
    ut(() => {
      a.readResource && !A.value ? me() : (A.value, $.value = !0, f.value = !0, m.value = !1, D.value.increment(p.value).turnStoredIntoOriginal(), W.value = D.value.changed());
    });
    const Pe = (e, o) => {
      if (o) {
        if (m.value = !1, typeof e < "u" && (Q.value = e.httpStatus, !e.success))
          return ie.value = !0, h("error", e.httpStatus), !1;
        ie.value = !0;
      }
      return !0;
    }, Ge = (e, o) => {
      if (T("doAutoReloadId -> enter: ", e), typeof e < "u" && e.autoReloadId)
        if (T("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), typeof o < "u") {
          let N = o;
          typeof o == "function" && (N = o(e.autoReloadId)), i.push(N);
        } else Te.value ? (T("doAutoReloadId -> insideModal: ", a), mt(a.modalConfig.modalName, a.modalConfig.modalKey, e.autoReloadId)) : (T("doAutoReloadId -> outsideModal"), a.readData.id = e.autoReloadId, T("doAutoReloadId -> turning off create mode"), A.value = !1, me());
    }, Ee = (e, o) => {
      var N;
      if (T("onCreate"), (N = o.notifications) == null || N.forEach((j) => {
        j.category === "toast" && ue({
          positionX: ne.Right,
          ...j.payload
        });
      }), !Pe(o, G.value.resource)) {
        a.notificationType === ve.Toast && ue({
          text: k.defaultCreateErrorText,
          details: k.defaultCreateErrorDetails,
          icon: k.defaultCreateErrorIcon,
          positionX: ne.Right,
          ...o.toast
        });
        return;
      }
      Ue.value = !0, T("onCreate -> turn stored data into original"), D.value.increment(p.value).turnStoredIntoOriginal(), de.value.turnStoredIntoOriginal(), a.notificationType === ve.Toast && ue({
        text: k.defaultCreateSuccessText,
        details: k.defaultCreateSuccessDetails,
        icon: k.defaultCreateSuccessIcon,
        positionX: ne.Right,
        ...o.toast
      }), Ge(o, a.redirectOnCreate), T("onCreate -> beforeEmitCreate"), h("create", o);
    }, Me = (e, o) => {
      var N;
      if (T("onUpdate"), (N = o.notifications) == null || N.forEach((j) => {
        j.category === "toast" && ue({
          positionX: ne.Right,
          ...j.payload
        });
      }), !Pe(o, q.value.resource)) {
        a.notificationType === ve.Toast && ue({
          text: k.defaultUpdateErrorText,
          details: k.defaultUpdateErrorDetails,
          icon: k.defaultUpdateErrorIcon,
          positionX: ne.Right,
          ...o.toast
        });
        return;
      }
      T("onUpdate -> turn stored data into original"), D.value.turnStoredIntoOriginal(), de.value.turnStoredIntoOriginal(), a.notificationType === ve.Toast && ue({
        text: k.defaultUpdateSuccessText,
        details: k.defaultUpdateSuccessDetails,
        icon: k.defaultUpdateSuccessIcon,
        positionX: ne.Right,
        ...o.toast
      }), Ge(o), h("update", o);
    }, Ae = (e, o) => {
      var N;
      if (T("onDrop"), (N = o.notifications) == null || N.forEach((j) => {
        j.category === "toast" && ue({
          positionX: ne.Right,
          ...j.payload
        });
      }), !Pe(o, z.value.resource)) {
        a.notificationType === ve.Toast && ue({
          text: k.defaultDropErrorText,
          details: k.defaultDropErrorDetails,
          icon: k.defaultDropErrorIcon,
          positionX: ne.Right,
          ...o.toast
        });
        return;
      }
      if (a.notificationType === ve.Toast && ue({
        text: k.defaultDropSuccessText,
        details: k.defaultDropSuccessDetails,
        icon: k.defaultDropSuccessIcon,
        positionX: ne.Right,
        ...o.toast
      }), h("drop", o), a.view === Qe.Modal && (T("onDrop -> close modal"), ct(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let j = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (j = a.redirectOnDrop()), i.push(j);
      }
    };
    Se({
      doDrop: () => {
        X.value && X.value.doDrop();
      },
      doRefresh: me,
      doSave: () => {
        X.value && X.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        D.value.increment(p.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => D.value.changed()
    });
    const _e = y(() => {
      var e, o, N;
      return we.value ? ae.value ? O.value ? (e = a.modalConfig) == null ? void 0 : e.closeConfirm : "" : se.value === E.Modifications ? de.value.changed() ? (o = a.modalConfig) == null ? void 0 : o.closeConfirm : "" : D.value.changed() ? (N = a.modalConfig) == null ? void 0 : N.closeConfirm : "" : "";
    }), xe = (e) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...e,
          itemCreated: Ue.value
        });
    }, He = y(() => st(a.title)), et = y(() => m.value ? !1 : He.value.length > 0 || !!M["post-title"]), tt = y(() => m.value ? !1 : typeof a.header == "object" && Object.keys(a.header).length > 0), Te = y(() => a.view === Qe.Modal), qe = y(() => Te.value ? "lkt-modal" : "section"), ye = y(() => {
      var e, o;
      if (a.mode !== V.Update || !R.value || ae.value && !L.value)
        return !1;
      if (!a.enabledSaveWithoutChanges) {
        if (ae.value) {
          if (!O.value) return !1;
        } else if (!W.value)
          return !1;
      }
      return typeof ((e = q.value) == null ? void 0 : e.disabled) == "function" ? !q.value.disabled({
        prop: p.value
      }) : typeof ((o = q.value) == null ? void 0 : o.disabled) == "boolean" ? !q.value.disabled : !0;
    }), ke = y(() => {
      var e, o;
      if (a.mode !== V.Create || !t.value || ae.value && !L.value)
        return !1;
      if (!a.enabledSaveWithoutChanges) {
        if (ae.value) {
          if (!O.value) return !1;
        } else if (!W.value)
          return !1;
      }
      return typeof ((e = G.value) == null ? void 0 : e.disabled) == "function" ? !G.value.disabled({
        prop: p.value
      }) : typeof ((o = G.value) == null ? void 0 : o.disabled) == "boolean" ? !G.value.disabled : !0;
    }), Ve = y(() => a.createAndNewButton !== !1 && typeof a.createAndNewButton == "object" && !Array.isArray(a.createAndNewButton) && Object.keys(a.createAndNewButton).length > 0), Ie = y(() => {
      var e, o;
      return r.value ? typeof ((e = z.value) == null ? void 0 : e.disabled) == "function" ? !z.value.disabled({
        prop: p.value
      }) : typeof ((o = z.value) == null ? void 0 : o.disabled) == "boolean" ? !z.value.disabled : !0 : !1;
    }), at = y(() => qe.value === "lkt-modal" ? {
      title: a.title,
      item: p.value,
      ...a.modalConfig,
      beforeClose: xe,
      closeConfirm: _e.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: ke.value || ye.value
      } : !1
    } : {}), ae = y(() => typeof Ce.value == "object" && Object.keys(Ce.value).length > 0), Re = y(() => Object.keys(U.value).length === 0 ? [] : a.modificationViews), se = y(() => Object.keys(U.value).length === 0 ? E.Current : E.Modifications), we = y(() => t.value || R.value || r.value), ot = y(() => ae.value ? vt(Ce.value) : []), Ce = y(() => typeof a.form == "function" ? a.form({
      mode: a.mode,
      view: P.value,
      item: p.value,
      modifications: U.value,
      editing: f.value
    }) : a.form);
    return (e, o) => {
      const N = he("lkt-header"), j = he("lkt-http-info"), F = he("lkt-form"), Ne = he("lkt-loader");
      return n(), c(it(qe.value), v(at.value, { class: "lkt-item-crud" }), ge({
        default: _(() => [
          !Te.value && tt.value ? (n(), c(N, je(v({ key: 0 }, e.header)), null, 16)) : !Te.value && et.value ? (n(), S("header", wt, [
            d(M)["pre-title"] ? (n(), S("div", Ct, [
              I(e.$slots, "pre-title", {
                item: p.value,
                loading: m.value
              })
            ])) : C("", !0),
            He.value.length > 0 ? (n(), S("h1", ht, lt(He.value), 1)) : C("", !0),
            d(M)["post-title"] ? (n(), S("div", Dt, [
              I(e.$slots, "post-title", {
                item: p.value,
                loading: m.value
              })
            ])) : C("", !0)
          ])) : C("", !0),
          e.buttonNavPosition === d(Le).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) && we.value ? (n(), c($e, {
            key: 2,
            ref_key: "buttonNav",
            ref: X,
            loading: m.value,
            "onUpdate:loading": o[3] || (o[3] = (u) => m.value = u),
            editing: f.value,
            "onUpdate:editing": o[4] || (o[4] = (u) => f.value = u),
            "picked-modification-view": P.value,
            "onUpdate:pickedModificationView": o[5] || (o[5] = (u) => P.value = u),
            item: p.value,
            modifications: U.value,
            mode: e.mode,
            view: e.view,
            grouped: e.groupButton !== !1,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": G.value,
            "create-and-new-button": fe.value,
            "update-button": q.value,
            "drop-button": z.value,
            "edit-mode-button": b.value,
            "group-button": ce.value,
            "data-changed": W.value,
            "http-success-read": $.value,
            "can-create": t.value,
            "can-update": R.value,
            "can-drop": r.value,
            "can-switch-edit-mode": pe.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": ke.value,
            "able-to-create-and-new": Ve.value,
            "able-to-update": ye.value,
            "able-to-drop": Ie.value,
            perms: l.value,
            "modification-view": Re.value,
            "editable-view": se.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            "update-config": e.updateConfig,
            onCreate: Ee,
            onSave: Me,
            onDrop: Ae
          }, ge({ _: 2 }, [
            d(M)["prev-buttons-ever"] ? {
              name: "prev-buttons-ever",
              fn: _(({ canUpdate: u, canDrop: x, perms: ee }) => [
                I(e.$slots, "prev-buttons-ever", {
                  canUpdate: u,
                  canDrop: x,
                  perms: ee
                })
              ]),
              key: "0"
            } : void 0,
            d(M)["prev-buttons"] ? {
              name: "prev-buttons",
              fn: _(({ canUpdate: u, canDrop: x, perms: ee }) => [
                I(e.$slots, "prev-buttons", {
                  canUpdate: u,
                  canDrop: x,
                  perms: ee
                })
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing", "update-config"])) : we.value && e.buttonNavPosition === d(Le).Hidden ? g((n(), c($e, {
            key: 3,
            ref_key: "buttonNav",
            ref: X,
            loading: m.value,
            "onUpdate:loading": o[6] || (o[6] = (u) => m.value = u),
            editing: f.value,
            "onUpdate:editing": o[7] || (o[7] = (u) => f.value = u),
            "picked-modification-view": P.value,
            "onUpdate:pickedModificationView": o[8] || (o[8] = (u) => P.value = u),
            item: p.value,
            modifications: U.value,
            mode: e.mode,
            view: e.view,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": G.value,
            "create-and-new-button": fe.value,
            "update-button": q.value,
            "drop-button": z.value,
            "edit-mode-button": b.value,
            "group-button": ce.value,
            "data-changed": W.value,
            "http-success-read": $.value,
            "can-create": t.value,
            "can-update": R.value,
            "can-drop": r.value,
            "can-switch-edit-mode": pe.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": ke.value,
            "able-to-create-and-new": Ve.value,
            "able-to-update": ye.value,
            "able-to-drop": Ie.value,
            perms: l.value,
            "modification-view": Re.value,
            "editable-view": se.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            "update-config": e.updateConfig,
            onCreate: Ee,
            onSave: Me,
            onDrop: Ae
          }, ge({ _: 2 }, [
            d(M)["prev-buttons-ever"] ? {
              name: "prev-buttons-ever",
              fn: _(({ canUpdate: u, canDrop: x, perms: ee }) => [
                I(e.$slots, "prev-buttons-ever", {
                  canUpdate: u,
                  canDrop: x,
                  perms: ee
                })
              ]),
              key: "0"
            } : void 0,
            d(M)["prev-buttons"] ? {
              name: "prev-buttons",
              fn: _(({ canUpdate: u, canDrop: x, perms: ee }) => [
                I(e.$slots, "prev-buttons", {
                  canUpdate: u,
                  canDrop: x,
                  perms: ee
                })
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing", "update-config"])), [
            [B, !1]
          ]) : C("", !0),
          m.value ? C("", !0) : (n(), S("div", St, [
            $.value ? (n(), S("div", Ut, [
              ie.value && e.notificationType === d(ve).Inline ? (n(), c(j, {
                key: 0,
                code: Q.value,
                palette: Q.value === 200 ? "success" : "danger",
                quick: "",
                "can-close": "",
                onClose: o[9] || (o[9] = (u) => ie.value = !1)
              }, null, 8, ["code", "palette"])) : C("", !0),
              ae.value ? (n(), c(F, v({
                key: 1,
                ref_key: "formRef",
                ref: be,
                modelValue: p.value,
                "onUpdate:modelValue": o[10] || (o[10] = (u) => p.value = u),
                modifications: U.value,
                "onUpdate:modifications": o[11] || (o[11] = (u) => U.value = u),
                valid: L.value,
                "onUpdate:valid": o[12] || (o[12] = (u) => L.value = u),
                changed: O.value,
                "onUpdate:changed": o[13] || (o[13] = (u) => O.value = u)
              }, {
                ...e.formUiConfig,
                form: Ce.value,
                differencesTableConfig: e.differencesTableConfig,
                visibleView: P.value,
                modificationDataState: Y.value,
                editableViews: [se.value],
                disabled: !f.value
              }), ge({ _: 2 }, [
                J(ot.value, (u) => ({
                  name: u,
                  fn: _(({}) => [
                    I(e.$slots, u)
                  ])
                }))
              ]), 1040, ["modelValue", "modifications", "valid", "changed"])) : I(e.$slots, "item", {
                key: 2,
                item: p.value,
                loading: m.value,
                editMode: f.value,
                isCreate: A.value,
                canUpdate: R.value,
                canDrop: r.value,
                itemBeingEdited: le.value,
                perms: l.value
              })
            ])) : e.notificationType === d(ve).Inline ? (n(), c(j, {
              key: 1,
              code: Q.value
            }, null, 8, ["code"])) : C("", !0)
          ])),
          m.value ? (n(), c(Ne, { key: 5 })) : C("", !0),
          e.buttonNavPosition === d(Le).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) && we.value ? (n(), c($e, {
            key: 6,
            ref_key: "buttonNav",
            ref: X,
            loading: m.value,
            "onUpdate:loading": o[14] || (o[14] = (u) => m.value = u),
            editing: f.value,
            "onUpdate:editing": o[15] || (o[15] = (u) => f.value = u),
            "picked-modification-view": P.value,
            "onUpdate:pickedModificationView": o[16] || (o[16] = (u) => P.value = u),
            item: p.value,
            modifications: U.value,
            mode: e.mode,
            view: e.view,
            grouped: e.groupButton !== !1,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": G.value,
            "create-and-new-button": fe.value,
            "update-button": q.value,
            "drop-button": z.value,
            "edit-mode-button": b.value,
            "group-button": ce.value,
            "data-changed": W.value,
            "http-success-read": $.value,
            "can-create": t.value,
            "can-update": R.value,
            "can-drop": r.value,
            "can-switch-edit-mode": pe.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": ke.value,
            "able-to-create-and-new": Ve.value,
            "able-to-update": ye.value,
            "able-to-drop": Ie.value,
            perms: l.value,
            "modification-view": Re.value,
            "editable-view": se.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            "update-config": e.updateConfig,
            onCreate: Ee,
            onSave: Me,
            onDrop: Ae
          }, ge({ _: 2 }, [
            d(M)["prev-buttons-ever"] ? {
              name: "prev-buttons-ever",
              fn: _(() => [
                I(e.$slots, "prev-buttons-ever")
              ]),
              key: "0"
            } : void 0,
            d(M)["prev-buttons"] ? {
              name: "prev-buttons-ever",
              fn: _(() => [
                I(e.$slots, "prev-buttons")
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing", "update-config"])) : C("", !0)
        ]),
        _: 2
      }, [
        e.groupButton !== !1 && e.groupButtonAsModalActions && we.value ? {
          name: "header-actions",
          fn: _(() => [
            e.buttonNavPosition === d(Le).Top ? (n(), c($e, {
              key: 0,
              ref_key: "buttonNav",
              ref: X,
              loading: m.value,
              "onUpdate:loading": o[0] || (o[0] = (u) => m.value = u),
              editing: f.value,
              "onUpdate:editing": o[1] || (o[1] = (u) => f.value = u),
              "picked-modification-view": P.value,
              "onUpdate:pickedModificationView": o[2] || (o[2] = (u) => P.value = u),
              item: p.value,
              modifications: U.value,
              mode: e.mode,
              view: e.view,
              grouped: !0,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": G.value,
              "create-and-new-button": fe.value,
              "update-button": q.value,
              "drop-button": z.value,
              "edit-mode-button": b.value,
              "group-button": ce.value,
              "data-changed": W.value,
              "http-success-read": $.value,
              "can-create": t.value,
              "can-update": R.value,
              "can-drop": r.value,
              "can-switch-edit-mode": pe.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": ke.value,
              "able-to-create-and-new": Ve.value,
              "able-to-update": ye.value,
              "able-to-drop": Ie.value,
              perms: l.value,
              "modification-view": Re.value,
              "editable-view": se.value,
              "nav-start-buttons": e.navStartButtons,
              "nav-start-buttons-editing": e.navStartButtonsEditing,
              "nav-end-buttons": e.navEndButtons,
              "nav-end-buttons-editing": e.navEndButtonsEditing,
              "update-config": e.updateConfig,
              onCreate: Ee,
              onSave: Me,
              onDrop: Ae
            }, ge({ _: 2 }, [
              d(M)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: _(({ canUpdate: u, canDrop: x, perms: ee }) => [
                  I(e.$slots, "prev-buttons-ever", {
                    canUpdate: u,
                    canDrop: x,
                    perms: ee
                  })
                ]),
                key: "0"
              } : void 0,
              d(M)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: _(({ canUpdate: u, canDrop: x, perms: ee }) => [
                  I(e.$slots, "prev-buttons", {
                    canUpdate: u,
                    canDrop: x,
                    perms: ee
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing", "update-config"])) : C("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), jt = {
  install: (H, Se = {}) => {
    H.component("lkt-item-crud") === void 0 && H.component("lkt-item-crud", Et);
  }
}, Ft = (H) => {
  Be.defaultSaveIcon = H;
}, Xt = (H) => {
  Be.defaultDropIcon = H;
};
export {
  $t as debugLktItemCrud,
  jt as default,
  Xt as setItemCrudDefaultDropIcon,
  Ft as setItemCrudDefaultSaveIcon
};
