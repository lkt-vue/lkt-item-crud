import { defineComponent as Je, ref as s, watch as w, useSlots as Qe, computed as y, resolveComponent as Ce, createElementBlock as S, createCommentVNode as C, openBlock as n, createBlock as c, Fragment as X, renderSlot as I, withDirectives as g, mergeProps as v, normalizeProps as Le, unref as d, renderList as z, vShow as B, createVNode as Y, withCtx as Z, mergeDefaults as nt, nextTick as Ge, onMounted as ut, resolveDynamicComponent as it, createSlots as ce, toDisplayString as lt } from "vue";
import { httpCall as dt } from "lkt-http-client";
import { DataState as Xe } from "lkt-data-state";
import { ModificationView as E, ItemCrudMode as V, ItemCrudButtonNavVisibility as qe, ButtonType as He, TablePermission as Ne, ensureButtonConfig as ae, LktSettings as k, getFormDataState as rt, extractI18nValue as st, ItemCrudView as ze, getFormSlotKeys as vt, ItemCrudButtonNavPosition as Re, NotificationType as de, getDefaultValues as pt, ItemCrud as ft, ToastPositionX as me } from "lkt-vue-kernel";
import { closeModal as ct, updateModalKey as mt } from "lkt-modal";
import { openToast as be } from "lkt-toast";
import { useRouter as bt } from "vue-router";
const De = class De {
};
De.debugEnabled = !1, De.defaultSaveIcon = "", De.defaultDropIcon = "";
let ge = De;
const T = (...P) => {
  ge.debugEnabled && console.info("[LktItemCrud] ", ...P);
}, $t = (P = !0) => {
  ge.debugEnabled = P;
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
}, Oe = /* @__PURE__ */ Je({
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
  setup(P, { expose: he, emit: $e }) {
    const a = $e, i = P, M = s(i.pickedModificationView);
    w(() => i.pickedModificationView, (t) => M.value = t), w(M, (t) => a("update:pickedModificationView", t));
    const D = Qe(), m = s(null), p = s(null), U = s(null), ee = s(null), l = s(i.loading);
    w(() => i.loading, (t) => l.value = t), w(l, (t) => {
      i.updateConfig.executionMode === "blocking" && a("update:loading", t);
    });
    const f = s(i.editing);
    w(() => i.editing, (t) => f.value = t), w(f, (t) => a("update:editing", t));
    const O = () => {
      l.value = !0;
    }, R = () => {
      l.value = !1;
    }, L = (t, N) => {
      typeof t > "u" || a("create", t, N);
    }, oe = (t, N) => {
      typeof t > "u" || a("save", t, N);
    }, J = (t, N) => {
      typeof t > "u" || a("drop", t, N);
    }, h = y(() => i.editableView === E.Modifications ? i.modifications : i.item);
    he({
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
        ee.value && typeof ee.value.click == "function" && ee.value.click();
      }
    });
    const ie = y(() => !i.canDrop || i.dropButton === !1 ? !1 : !i.canUpdate && i.canDrop ? !0 : !l.value && i.editing && i.httpSuccessRead), A = y(() => i.mode === V.Create && (i.createButton === !1 || !i.canCreate) || i.mode === V.Update && (i.updateButton === !1 || !i.canUpdate) || l.value ? !1 : i.editing && i.httpSuccessRead), ne = y(() => i.editModeButton === !1 || !i.canSwitchEditMode || !i.canUpdate && !i.canDrop || !i.canUpdate && i.canDrop ? !1 : !l.value && i.mode !== V.Create && i.httpSuccessRead), Se = y(() => i.buttonNavVisibility === qe.Always || D["prev-buttons-ever"] ? !0 : i.buttonNavVisibility === qe.Never ? !1 : A.value || ie.value || ne.value), j = y(() => i.modificationView === !1 ? [] : i.modificationView === !0 ? [
      E.Current,
      E.Modifications,
      E.SplitView,
      E.Differences
    ] : Array.isArray(i.modificationView) ? i.modificationView : []), fe = y(() => {
      let t = [];
      return j.value.includes(E.Current) && t.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: M.value === E.Current,
        events: {
          click: () => {
            M.value = E.Current;
          }
        }
      }), j.value.includes(E.Modifications) && t.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: M.value === E.Modifications,
        events: {
          click: () => {
            M.value = E.Modifications;
          }
        }
      }), j.value.includes(E.SplitView) && t.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: M.value === E.SplitView,
        events: {
          click: () => {
            M.value = E.SplitView;
          }
        }
      }), j.value.includes(E.Differences) && t.push({
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
    return (t, N) => {
      var re, F, K, se, W, G;
      const r = Ce("lkt-button");
      return Se.value ? (n(), S("div", gt, [
        t.grouped && t.groupButtonAsModalActions ? (n(), S(X, { key: 0 }, [
          ne.value ? (n(), c(r, v({ key: 0 }, t.editModeButton, {
            checked: f.value,
            "onUpdate:checked": N[0] || (N[0] = (b) => f.value = b),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : C("", !0),
          j.value.length > 0 ? (n(), c(r, Le(v({ key: 1 }, {
            type: d(He).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: fe.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : C("", !0),
          (n(!0), S(X, null, z(t.navStartButtons, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, !l.value]
          ])), 256)),
          d(D)["prev-buttons-ever"] ? I(t.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : C("", !0),
          (n(!0), S(X, null, z(t.navStartButtonsEditing, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, f.value && !l.value]
          ])), 256)),
          d(D)["prev-buttons"] ? I(t.$slots, "prev-buttons", {
            key: 3,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : C("", !0),
          g(Y(r, v({
            ref_key: "saveButtonRef",
            ref: U
          }, {
            ...t.updateButton,
            resourceData: {
              ...(re = t.updateButton) == null ? void 0 : re.resourceData,
              ...h.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: O,
            onLoaded: R,
            onClick: oe
          }), null, 16), [
            [B, t.mode === d(V).Update && A.value]
          ]),
          g(Y(r, v({
            ref_key: "createButtonRef",
            ref: m
          }, {
            ...t.createButton,
            resourceData: {
              ...(F = t.createButton) == null ? void 0 : F.resourceData,
              ...h.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: O,
            onLoaded: R,
            onClick: L
          }), null, 16), [
            [B, t.mode === d(V).Create && A.value]
          ]),
          g(Y(r, v({
            ref_key: "createAndNewButtonRef",
            ref: p
          }, {
            ...t.createAndNewButton,
            resourceData: {
              ...(K = t.createAndNewButton) == null ? void 0 : K.resourceData,
              ...h.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: O,
            onLoaded: R,
            onClick: L
          }), null, 16), [
            [B, t.mode === d(V).Create && A.value && t.ableToCreateAndNew]
          ]),
          g(Y(r, v({
            ref_key: "dropButtonRef",
            ref: ee
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: O,
            onLoaded: R,
            onClick: J
          }), null, 16, ["disabled"]), [
            [B, ie.value && t.mode !== d(V).Create]
          ]),
          d(D).buttons ? I(t.$slots, "buttons", { key: 4 }) : C("", !0),
          (n(!0), S(X, null, z(t.navEndButtons, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, !l.value]
          ])), 256)),
          (n(!0), S(X, null, z(t.navEndButtonsEditing, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, f.value && !l.value]
          ])), 256))
        ], 64)) : t.grouped ? (n(), c(r, v({
          key: 1,
          ref: "groupButton"
        }, t.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: Z(() => {
            var b, ve, pe;
            return [
              ne.value ? (n(), c(r, v({ key: 0 }, t.editModeButton, {
                checked: f.value,
                "onUpdate:checked": N[1] || (N[1] = (Q) => f.value = Q),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : C("", !0),
              j.value.length > 0 ? (n(), c(r, Le(v({ key: 1 }, {
                type: d(He).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: fe.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : C("", !0),
              (n(!0), S(X, null, z(t.navStartButtons, (Q) => g((n(), c(r, v({ ref_for: !0 }, Q), null, 16)), [
                [B, !l.value]
              ])), 256)),
              d(D)["prev-buttons-ever"] ? I(t.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : C("", !0),
              (n(!0), S(X, null, z(t.navStartButtonsEditing, (Q) => g((n(), c(r, v({ ref_for: !0 }, Q), null, 16)), [
                [B, f.value && !l.value]
              ])), 256)),
              d(D)["prev-buttons"] ? I(t.$slots, "prev-buttons", {
                key: 3,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : C("", !0),
              g(Y(r, v({
                ref_key: "saveButtonRef",
                ref: U
              }, {
                ...t.updateButton,
                resourceData: {
                  ...(b = t.updateButton) == null ? void 0 : b.resourceData,
                  ...h.value
                },
                disabled: !t.ableToUpdate
              }, {
                onLoading: O,
                onLoaded: R,
                onClick: oe
              }), null, 16), [
                [B, t.mode === d(V).Update && A.value]
              ]),
              g(Y(r, v({
                ref_key: "createButtonRef",
                ref: m
              }, {
                ...t.createButton,
                resourceData: {
                  ...(ve = t.createButton) == null ? void 0 : ve.resourceData,
                  ...h.value
                },
                disabled: !t.ableToCreate
              }, {
                disabled: !t.ableToCreate,
                onLoading: O,
                onLoaded: R,
                onClick: L
              }), null, 16, ["disabled"]), [
                [B, t.mode === d(V).Create && A.value]
              ]),
              g(Y(r, v({
                ref_key: "createAndNewButtonRef",
                ref: p
              }, {
                ...t.createAndNewButton,
                resourceData: {
                  ...(pe = t.createAndNewButton) == null ? void 0 : pe.resourceData,
                  ...h.value
                },
                disabled: !t.ableToCreate
              }, {
                disabled: !t.ableToCreate,
                onLoading: O,
                onLoaded: R,
                onClick: L
              }), null, 16, ["disabled"]), [
                [B, t.mode === d(V).Create && A.value && t.ableToCreateAndNew]
              ]),
              g(Y(r, v({
                ref_key: "dropButtonRef",
                ref: ee
              }, t.dropButton, {
                disabled: !t.ableToDrop,
                onLoading: O,
                onLoaded: R,
                onClick: J
              }), null, 16, ["disabled"]), [
                [B, ie.value && t.mode !== d(V).Create]
              ]),
              d(D).buttons ? I(t.$slots, "buttons", { key: 4 }) : C("", !0),
              (n(!0), S(X, null, z(t.navEndButtons, (Q) => g((n(), c(r, v({ ref_for: !0 }, Q), null, 16)), [
                [B, !l.value]
              ])), 256)),
              (n(!0), S(X, null, z(t.navEndButtonsEditing, (Q) => g((n(), c(r, v({ ref_for: !0 }, Q), null, 16)), [
                [B, f.value && !l.value]
              ])), 256))
            ];
          }),
          _: 3
        }, 16)) : (n(), S(X, { key: 2 }, [
          (n(!0), S(X, null, z(t.navStartButtons, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, !l.value]
          ])), 256)),
          d(D)["prev-buttons-ever"] ? g((n(), S("div", Bt, [
            I(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [B, !l.value]
          ]) : C("", !0),
          (n(!0), S(X, null, z(t.navStartButtonsEditing, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, f.value && !l.value]
          ])), 256)),
          d(D)["prev-buttons"] ? g((n(), S("div", yt, [
            I(t.$slots, "prev-buttons", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [B, f.value && !l.value]
          ]) : C("", !0),
          g(Y(r, v({
            ref_key: "saveButtonRef",
            ref: U
          }, {
            ...t.updateButton,
            resourceData: {
              ...(se = t.updateButton) == null ? void 0 : se.resourceData,
              ...h.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: O,
            onLoaded: R,
            onClick: oe
          }), null, 16), [
            [B, t.mode === d(V).Update && A.value]
          ]),
          g(Y(r, v({
            ref_key: "createButtonRef",
            ref: m
          }, {
            ...t.createButton,
            resourceData: {
              ...(W = t.createButton) == null ? void 0 : W.resourceData,
              ...h.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: O,
            onLoaded: R,
            onClick: L
          }), null, 16), [
            [B, t.mode === d(V).Create && A.value]
          ]),
          g(Y(r, v({
            ref_key: "createAndNewButtonRef",
            ref: p
          }, {
            ...t.createAndNewButton,
            resourceData: {
              ...(G = t.createAndNewButton) == null ? void 0 : G.resourceData,
              ...h.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: O,
            onLoaded: R,
            onClick: L
          }), null, 16), [
            [B, t.mode === d(V).Create && A.value && t.ableToCreateAndNew]
          ]),
          g(Y(r, v({
            ref_key: "dropButtonRef",
            ref: ee
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: O,
            onLoaded: R,
            onClick: J
          }), null, 16, ["disabled"]), [
            [B, ie.value && t.mode !== d(V).Create]
          ]),
          d(D).buttons ? g((n(), S("div", kt, [
            I(t.$slots, "buttons")
          ], 512)), [
            [B, f.value && !l.value]
          ]) : C("", !0),
          (n(!0), S(X, null, z(t.navEndButtons, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, !l.value]
          ])), 256)),
          (n(!0), S(X, null, z(t.navEndButtonsEditing, (b) => g((n(), c(r, v({ ref_for: !0 }, b), null, 16)), [
            [B, f.value && !l.value]
          ])), 256)),
          j.value.length > 0 ? (n(), c(r, Le(v({ key: 3 }, {
            type: d(He).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: fe.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : C("", !0),
          ne.value ? (n(), c(r, v({ key: 4 }, t.editModeButton, {
            checked: f.value,
            "onUpdate:checked": N[2] || (N[2] = (b) => f.value = b),
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
}, Dt = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, ht = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, St = {
  key: 4,
  class: "lkt-item-crud_content"
}, Ut = {
  key: 0,
  class: "lkt-grid-1"
}, Et = /* @__PURE__ */ Je({
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
  setup(P, { expose: he, emit: $e }) {
    const a = P, i = bt(), M = Qe(), D = $e, m = s(!0), p = s(a.modelValue), U = s(a.modifications), ee = s(a.customData), l = s(a.perms), f = s(a.editing), O = s(!1), R = s(!1), L = s(!1), oe = s(!1), J = s(200), h = s(new Xe(p.value, a.dataStateConfig)), ue = s(new Xe(U.value, a.dataStateConfig)), H = s(!1), ie = s(new Xe(a.readData)), A = s(a.mode === V.Create), ne = s(!1), Se = s(!1), j = s(null), fe = s(null), t = y(() => A.value && a.createButton !== !1 && Array.isArray(l.value) && l.value.includes(Ne.Create)), N = y(() => !A.value && a.updateButton !== !1 && Array.isArray(l.value) && l.value.includes(Ne.Update)), r = y(() => !A.value && a.dropButton !== !1 && Array.isArray(l.value) && l.value.includes(Ne.Drop)), re = y(() => a.editModeButton !== !1 && !A.value && Array.isArray(l.value) && l.value.includes(Ne.SwitchEditMode)), F = s(a.visibleView);
    w(() => a.visibleView, (e) => {
      F.value = e;
    }), w(F, (e) => {
      D("update:visibleView", e);
    }), w(() => a.mode, (e) => {
      A.value = e === V.Create;
    }), w(() => a.perms, (e) => {
      l.value = e;
    }), w(l, (e) => {
      D("update:perms", e);
    }), w(() => a.customData, (e) => {
      ee.value = e;
    }), w(ee, (e) => {
      D("update:customData", e);
    }), w(() => a.modifications, (e) => {
      ue.value.increment(e), U.value = e;
    }, { deep: !0 }), w(U, (e) => {
      je(), ue.value.increment(e), le.value === E.Modifications && (H.value = ue.value.changed()), D("update:modifications", e);
    }, { deep: !0 });
    const K = s(ae(a.createButton, k.defaultCreateButton)), se = s(ae(a.createAndNewButton, a.createButton)), W = s(ae(a.updateButton, k.defaultUpdateButton)), G = s(ae(a.dropButton, k.defaultDropButton)), b = s(ae(a.editModeButton, k.defaultEditModeButton)), ve = s(ae(a.groupButton, k.defaultGroupButton));
    w(() => a.createButton, (e) => {
      K.value = ae(e, k.defaultCreateButton);
    }, { deep: !0 }), w(() => a.updateButton, (e) => {
      W.value = ae(e, k.defaultUpdateButton);
    }, { deep: !0 }), w(() => a.dropButton, (e) => {
      G.value = ae(e, k.defaultDropButton);
    }, { deep: !0 }), w(() => a.editModeButton, (e) => {
      b.value = ae(e, k.defaultEditModeButton);
    }, { deep: !0 });
    const pe = async () => {
      var e, o, q;
      T("fetchItem"), m.value = !0, J.value = -1, oe.value = !1, typeof ((e = a.events) == null ? void 0 : e.httpStart) == "function" && a.events.httpStart();
      try {
        const $ = await dt(a.readResource, a.readData);
        if (T("fetchItem -> response", $), m.value = !1, J.value = $.httpStatus, ee.value = $.custom, !$.success) {
          L.value = !1, J.value = $.httpStatus, typeof ((o = a.events) == null ? void 0 : o.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: $
          }), D("error", $.httpStatus);
          return;
        }
        L.value = !0, p.value = $.data, U.value = Array.isArray($.modifications) ? {} : $.modifications, l.value = $.perms, h.value.increment(p.value).turnStoredIntoOriginal(), ue.value.increment(U.value).turnStoredIntoOriginal(), H.value = h.value.changed(), ie.value.turnStoredIntoOriginal(), Object.keys(U.value).length > 0 && (F.value = E.Modifications), te.value && (je(), Ge(() => {
          fe.value.turnStoredIntoOriginal();
        })), typeof ((q = a.events) == null ? void 0 : q.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: $
        }), D("read", $);
      } catch {
        m.value = !1, L.value = !1, J.value = 404, D("error", 404);
        return;
      }
    };
    w(ne, (e) => {
      e && Ge(() => ne.value = !1);
    }), w(() => a.modelValue, (e) => {
      p.value = e, h.value.increment(e);
    }, { deep: !0 }), w(p, (e) => {
      if (T("item updated ->", p.value), typeof a.beforeEmitUpdate == "function") {
        T("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(p.value);
        T("item updated -> override with: ", o), typeof o == "object" && (p.value = o);
      }
      te.value && je(), D("update:modelValue", p.value), T("item updated -> update dataState"), h.value.increment(e), le.value === E.Current && (H.value = h.value.changed(), T("item updated -> dataState changed")), ne.value = !0;
    }, { deep: !0 }), w(l, () => D("perms", l.value)), w(H, (e) => {
      D("modified-data", e);
    }), w(() => a.readData, (e) => {
      ie.value.increment(e), ie.value.changed() && pe();
    }), w(() => a.editing, (e) => {
      T("editing updated -> updating editMode", e), f.value = e;
    }), w(f, (e) => {
      T("editMode updated -> emit update", e), D("update:editing", e);
    });
    const Q = s(void 0), je = () => {
      te.value && (Q.value = rt(p.value, U.value, we.value));
    };
    ut(() => {
      a.readResource && !A.value ? pe() : (A.value, L.value = !0, f.value = !0, m.value = !1, h.value.increment(p.value).turnStoredIntoOriginal(), H.value = h.value.changed());
    });
    const Fe = (e, o) => {
      if (o) {
        if (m.value = !1, typeof e < "u" && (J.value = e.httpStatus, !e.success))
          return oe.value = !0, D("error", e.httpStatus), !1;
        oe.value = !0;
      }
      return !0;
    }, Ke = (e, o) => {
      if (T("doAutoReloadId -> enter: ", e), typeof e < "u" && e.autoReloadId)
        if (T("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), typeof o < "u") {
          let q = o;
          typeof o == "function" && (q = o(e.autoReloadId)), i.push(q);
        } else Ae.value ? (T("doAutoReloadId -> insideModal: ", a), mt(a.modalConfig.modalName, a.modalConfig.modalKey, e.autoReloadId)) : (T("doAutoReloadId -> outsideModal"), a.readData.id = e.autoReloadId, T("doAutoReloadId -> turning off create mode"), A.value = !1, pe());
    }, Ue = (e, o) => {
      if (T("onCreate"), !Fe(o, K.value.resource)) {
        a.notificationType === de.Toast && be({
          text: k.defaultCreateErrorText,
          details: k.defaultCreateErrorDetails,
          icon: k.defaultCreateErrorIcon,
          positionX: me.Right
        });
        return;
      }
      Se.value = !0, T("onCreate -> turn stored data into original"), h.value.increment(p.value).turnStoredIntoOriginal(), ue.value.turnStoredIntoOriginal(), a.notificationType === de.Toast && be({
        text: k.defaultCreateSuccessText,
        details: k.defaultCreateSuccessDetails,
        icon: k.defaultCreateSuccessIcon,
        positionX: me.Right
      }), Ke(o, a.redirectOnCreate), T("onCreate -> beforeEmitCreate"), D("create", o);
    }, Ee = (e, o) => {
      if (T("onUpdate"), !Fe(o, W.value.resource)) {
        a.notificationType === de.Toast && be({
          text: k.defaultUpdateErrorText,
          details: k.defaultUpdateErrorDetails,
          icon: k.defaultUpdateErrorIcon,
          positionX: me.Right
        });
        return;
      }
      T("onUpdate -> turn stored data into original"), h.value.turnStoredIntoOriginal(), ue.value.turnStoredIntoOriginal(), a.notificationType === de.Toast && be({
        text: k.defaultUpdateSuccessText,
        details: k.defaultUpdateSuccessDetails,
        icon: k.defaultUpdateSuccessIcon,
        positionX: me.Right
      }), Ke(o), D("update", o);
    }, Me = (e, o) => {
      if (T("onDrop"), !Fe(o, G.value.resource)) {
        a.notificationType === de.Toast && be({
          text: k.defaultDropErrorText,
          details: k.defaultDropErrorDetails,
          icon: k.defaultDropErrorIcon,
          positionX: me.Right
        });
        return;
      }
      if (a.notificationType === de.Toast && be({
        text: k.defaultDropSuccessText,
        details: k.defaultDropSuccessDetails,
        icon: k.defaultDropSuccessIcon,
        positionX: me.Right
      }), D("drop", o), a.view === ze.Modal && (T("onDrop -> close modal"), ct(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let q = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (q = a.redirectOnDrop()), i.push(q);
      }
    };
    he({
      doDrop: () => {
        j.value && j.value.doDrop();
      },
      doRefresh: pe,
      doSave: () => {
        j.value && j.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        h.value.increment(p.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => h.value.changed()
    });
    const Ye = y(() => {
      var e, o, q;
      return ke.value ? te.value ? R.value ? (e = a.modalConfig) == null ? void 0 : e.closeConfirm : "" : le.value === E.Modifications ? ue.value.changed() ? (o = a.modalConfig) == null ? void 0 : o.closeConfirm : "" : h.value.changed() ? (q = a.modalConfig) == null ? void 0 : q.closeConfirm : "" : "";
    }), Ze = (e) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...e,
          itemCreated: Se.value
        });
    }, Pe = y(() => st(a.title)), _e = y(() => m.value ? !1 : Pe.value.length > 0 || !!M["post-title"]), xe = y(() => m.value ? !1 : typeof a.header == "object" && Object.keys(a.header).length > 0), Ae = y(() => a.view === ze.Modal), We = y(() => Ae.value ? "lkt-modal" : "section"), Be = y(() => {
      var e, o;
      if (a.mode !== V.Update || !N.value || te.value && !O.value)
        return !1;
      if (!a.enabledSaveWithoutChanges) {
        if (te.value) {
          if (!R.value) return !1;
        } else if (!H.value)
          return !1;
      }
      return typeof ((e = W.value) == null ? void 0 : e.disabled) == "function" ? !W.value.disabled({
        prop: p.value
      }) : typeof ((o = W.value) == null ? void 0 : o.disabled) == "boolean" ? !W.value.disabled : !0;
    }), ye = y(() => {
      var e, o;
      if (a.mode !== V.Create || !t.value || te.value && !O.value)
        return !1;
      if (!a.enabledSaveWithoutChanges) {
        if (te.value) {
          if (!R.value) return !1;
        } else if (!H.value)
          return !1;
      }
      return typeof ((e = K.value) == null ? void 0 : e.disabled) == "function" ? !K.value.disabled({
        prop: p.value
      }) : typeof ((o = K.value) == null ? void 0 : o.disabled) == "boolean" ? !K.value.disabled : !0;
    }), Te = y(() => a.createAndNewButton !== !1 && typeof a.createAndNewButton == "object" && !Array.isArray(a.createAndNewButton) && Object.keys(a.createAndNewButton).length > 0), Ve = y(() => {
      var e, o;
      return r.value ? typeof ((e = G.value) == null ? void 0 : e.disabled) == "function" ? !G.value.disabled({
        prop: p.value
      }) : typeof ((o = G.value) == null ? void 0 : o.disabled) == "boolean" ? !G.value.disabled : !0 : !1;
    }), et = y(() => We.value === "lkt-modal" ? {
      title: a.title,
      item: p.value,
      ...a.modalConfig,
      beforeClose: Ze,
      closeConfirm: Ye.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: ye.value || Be.value
      } : !1
    } : {}), te = y(() => typeof we.value == "object" && Object.keys(we.value).length > 0), Ie = y(() => Object.keys(U.value).length === 0 ? [] : a.modificationViews), le = y(() => Object.keys(U.value).length === 0 ? E.Current : E.Modifications), ke = y(() => t.value || N.value || r.value), tt = y(() => te.value ? vt(we.value) : []), we = y(() => typeof a.form == "function" ? a.form({
      mode: a.mode,
      view: F.value,
      item: p.value,
      modifications: U.value,
      editing: f.value
    }) : a.form);
    return (e, o) => {
      const q = Ce("lkt-header"), $ = Ce("lkt-http-info"), at = Ce("lkt-form"), ot = Ce("lkt-loader");
      return n(), c(it(We.value), v(et.value, { class: "lkt-item-crud" }), ce({
        default: Z(() => [
          !Ae.value && xe.value ? (n(), c(q, Le(v({ key: 0 }, e.header)), null, 16)) : !Ae.value && _e.value ? (n(), S("header", wt, [
            d(M)["pre-title"] ? (n(), S("div", Ct, [
              I(e.$slots, "pre-title", {
                item: p.value,
                loading: m.value
              })
            ])) : C("", !0),
            Pe.value.length > 0 ? (n(), S("h1", Dt, lt(Pe.value), 1)) : C("", !0),
            d(M)["post-title"] ? (n(), S("div", ht, [
              I(e.$slots, "post-title", {
                item: p.value,
                loading: m.value
              })
            ])) : C("", !0)
          ])) : C("", !0),
          e.buttonNavPosition === d(Re).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) && ke.value ? (n(), c(Oe, {
            key: 2,
            ref_key: "buttonNav",
            ref: j,
            loading: m.value,
            "onUpdate:loading": o[3] || (o[3] = (u) => m.value = u),
            editing: f.value,
            "onUpdate:editing": o[4] || (o[4] = (u) => f.value = u),
            "picked-modification-view": F.value,
            "onUpdate:pickedModificationView": o[5] || (o[5] = (u) => F.value = u),
            item: p.value,
            modifications: U.value,
            mode: e.mode,
            view: e.view,
            grouped: e.groupButton !== !1,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": K.value,
            "create-and-new-button": se.value,
            "update-button": W.value,
            "drop-button": G.value,
            "edit-mode-button": b.value,
            "group-button": ve.value,
            "data-changed": H.value,
            "http-success-read": L.value,
            "can-create": t.value,
            "can-update": N.value,
            "can-drop": r.value,
            "can-switch-edit-mode": re.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": ye.value,
            "able-to-create-and-new": Te.value,
            "able-to-update": Be.value,
            "able-to-drop": Ve.value,
            perms: l.value,
            "modification-view": Ie.value,
            "editable-view": le.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            "update-config": e.updateConfig,
            onCreate: Ue,
            onSave: Ee,
            onDrop: Me
          }, ce({ _: 2 }, [
            d(M)["prev-buttons-ever"] ? {
              name: "prev-buttons-ever",
              fn: Z(({ canUpdate: u, canDrop: _, perms: x }) => [
                I(e.$slots, "prev-buttons-ever", {
                  canUpdate: u,
                  canDrop: _,
                  perms: x
                })
              ]),
              key: "0"
            } : void 0,
            d(M)["prev-buttons"] ? {
              name: "prev-buttons",
              fn: Z(({ canUpdate: u, canDrop: _, perms: x }) => [
                I(e.$slots, "prev-buttons", {
                  canUpdate: u,
                  canDrop: _,
                  perms: x
                })
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing", "update-config"])) : ke.value && e.buttonNavPosition === d(Re).Hidden ? g((n(), c(Oe, {
            key: 3,
            ref_key: "buttonNav",
            ref: j,
            loading: m.value,
            "onUpdate:loading": o[6] || (o[6] = (u) => m.value = u),
            editing: f.value,
            "onUpdate:editing": o[7] || (o[7] = (u) => f.value = u),
            "picked-modification-view": F.value,
            "onUpdate:pickedModificationView": o[8] || (o[8] = (u) => F.value = u),
            item: p.value,
            modifications: U.value,
            mode: e.mode,
            view: e.view,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": K.value,
            "create-and-new-button": se.value,
            "update-button": W.value,
            "drop-button": G.value,
            "edit-mode-button": b.value,
            "group-button": ve.value,
            "data-changed": H.value,
            "http-success-read": L.value,
            "can-create": t.value,
            "can-update": N.value,
            "can-drop": r.value,
            "can-switch-edit-mode": re.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": ye.value,
            "able-to-create-and-new": Te.value,
            "able-to-update": Be.value,
            "able-to-drop": Ve.value,
            perms: l.value,
            "modification-view": Ie.value,
            "editable-view": le.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            "update-config": e.updateConfig,
            onCreate: Ue,
            onSave: Ee,
            onDrop: Me
          }, ce({ _: 2 }, [
            d(M)["prev-buttons-ever"] ? {
              name: "prev-buttons-ever",
              fn: Z(({ canUpdate: u, canDrop: _, perms: x }) => [
                I(e.$slots, "prev-buttons-ever", {
                  canUpdate: u,
                  canDrop: _,
                  perms: x
                })
              ]),
              key: "0"
            } : void 0,
            d(M)["prev-buttons"] ? {
              name: "prev-buttons",
              fn: Z(({ canUpdate: u, canDrop: _, perms: x }) => [
                I(e.$slots, "prev-buttons", {
                  canUpdate: u,
                  canDrop: _,
                  perms: x
                })
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing", "update-config"])), [
            [B, !1]
          ]) : C("", !0),
          m.value ? C("", !0) : (n(), S("div", St, [
            L.value ? (n(), S("div", Ut, [
              oe.value && e.notificationType === d(de).Inline ? (n(), c($, {
                key: 0,
                code: J.value,
                palette: J.value === 200 ? "success" : "danger",
                quick: "",
                "can-close": "",
                onClose: o[9] || (o[9] = (u) => oe.value = !1)
              }, null, 8, ["code", "palette"])) : C("", !0),
              te.value ? (n(), c(at, v({
                key: 1,
                ref_key: "formRef",
                ref: fe,
                modelValue: p.value,
                "onUpdate:modelValue": o[10] || (o[10] = (u) => p.value = u),
                modifications: U.value,
                "onUpdate:modifications": o[11] || (o[11] = (u) => U.value = u),
                valid: O.value,
                "onUpdate:valid": o[12] || (o[12] = (u) => O.value = u),
                changed: R.value,
                "onUpdate:changed": o[13] || (o[13] = (u) => R.value = u)
              }, {
                ...e.formUiConfig,
                form: we.value,
                differencesTableConfig: e.differencesTableConfig,
                visibleView: F.value,
                modificationDataState: Q.value,
                editableViews: [le.value],
                disabled: !f.value
              }), ce({ _: 2 }, [
                z(tt.value, (u) => ({
                  name: u,
                  fn: Z(({}) => [
                    I(e.$slots, u)
                  ])
                }))
              ]), 1040, ["modelValue", "modifications", "valid", "changed"])) : I(e.$slots, "item", {
                key: 2,
                item: p.value,
                loading: m.value,
                editMode: f.value,
                isCreate: A.value,
                canUpdate: N.value,
                canDrop: r.value,
                itemBeingEdited: ne.value,
                perms: l.value
              })
            ])) : e.notificationType === d(de).Inline ? (n(), c($, {
              key: 1,
              code: J.value
            }, null, 8, ["code"])) : C("", !0)
          ])),
          m.value ? (n(), c(ot, { key: 5 })) : C("", !0),
          e.buttonNavPosition === d(Re).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) && ke.value ? (n(), c(Oe, {
            key: 6,
            ref_key: "buttonNav",
            ref: j,
            loading: m.value,
            "onUpdate:loading": o[14] || (o[14] = (u) => m.value = u),
            editing: f.value,
            "onUpdate:editing": o[15] || (o[15] = (u) => f.value = u),
            "picked-modification-view": F.value,
            "onUpdate:pickedModificationView": o[16] || (o[16] = (u) => F.value = u),
            item: p.value,
            modifications: U.value,
            mode: e.mode,
            view: e.view,
            grouped: e.groupButton !== !1,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": K.value,
            "create-and-new-button": se.value,
            "update-button": W.value,
            "drop-button": G.value,
            "edit-mode-button": b.value,
            "group-button": ve.value,
            "data-changed": H.value,
            "http-success-read": L.value,
            "can-create": t.value,
            "can-update": N.value,
            "can-drop": r.value,
            "can-switch-edit-mode": re.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": ye.value,
            "able-to-create-and-new": Te.value,
            "able-to-update": Be.value,
            "able-to-drop": Ve.value,
            perms: l.value,
            "modification-view": Ie.value,
            "editable-view": le.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            "update-config": e.updateConfig,
            onCreate: Ue,
            onSave: Ee,
            onDrop: Me
          }, ce({ _: 2 }, [
            d(M)["prev-buttons-ever"] ? {
              name: "prev-buttons-ever",
              fn: Z(() => [
                I(e.$slots, "prev-buttons-ever")
              ]),
              key: "0"
            } : void 0,
            d(M)["prev-buttons"] ? {
              name: "prev-buttons-ever",
              fn: Z(() => [
                I(e.$slots, "prev-buttons")
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing", "update-config"])) : C("", !0)
        ]),
        _: 2
      }, [
        e.groupButton !== !1 && e.groupButtonAsModalActions && ke.value ? {
          name: "header-actions",
          fn: Z(() => [
            e.buttonNavPosition === d(Re).Top ? (n(), c(Oe, {
              key: 0,
              ref_key: "buttonNav",
              ref: j,
              loading: m.value,
              "onUpdate:loading": o[0] || (o[0] = (u) => m.value = u),
              editing: f.value,
              "onUpdate:editing": o[1] || (o[1] = (u) => f.value = u),
              "picked-modification-view": F.value,
              "onUpdate:pickedModificationView": o[2] || (o[2] = (u) => F.value = u),
              item: p.value,
              modifications: U.value,
              mode: e.mode,
              view: e.view,
              grouped: !0,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": K.value,
              "create-and-new-button": se.value,
              "update-button": W.value,
              "drop-button": G.value,
              "edit-mode-button": b.value,
              "group-button": ve.value,
              "data-changed": H.value,
              "http-success-read": L.value,
              "can-create": t.value,
              "can-update": N.value,
              "can-drop": r.value,
              "can-switch-edit-mode": re.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": ye.value,
              "able-to-create-and-new": Te.value,
              "able-to-update": Be.value,
              "able-to-drop": Ve.value,
              perms: l.value,
              "modification-view": Ie.value,
              "editable-view": le.value,
              "nav-start-buttons": e.navStartButtons,
              "nav-start-buttons-editing": e.navStartButtonsEditing,
              "nav-end-buttons": e.navEndButtons,
              "nav-end-buttons-editing": e.navEndButtonsEditing,
              "update-config": e.updateConfig,
              onCreate: Ue,
              onSave: Ee,
              onDrop: Me
            }, ce({ _: 2 }, [
              d(M)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: Z(({ canUpdate: u, canDrop: _, perms: x }) => [
                  I(e.$slots, "prev-buttons-ever", {
                    canUpdate: u,
                    canDrop: _,
                    perms: x
                  })
                ]),
                key: "0"
              } : void 0,
              d(M)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: Z(({ canUpdate: u, canDrop: _, perms: x }) => [
                  I(e.$slots, "prev-buttons", {
                    canUpdate: u,
                    canDrop: _,
                    perms: x
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
  install: (P, he = {}) => {
    P.component("lkt-item-crud") === void 0 && P.component("lkt-item-crud", Et);
  }
}, Ft = (P) => {
  ge.defaultSaveIcon = P;
}, Pt = (P) => {
  ge.defaultDropIcon = P;
};
export {
  $t as debugLktItemCrud,
  jt as default,
  Pt as setItemCrudDefaultDropIcon,
  Ft as setItemCrudDefaultSaveIcon
};
