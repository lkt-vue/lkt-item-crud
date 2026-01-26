import { defineComponent as Ze, ref as s, watch as k, useSlots as _e, computed as B, resolveComponent as Ce, createElementBlock as S, createCommentVNode as w, openBlock as n, createBlock as f, Fragment as H, renderSlot as I, withDirectives as m, mergeProps as v, normalizeProps as je, unref as d, renderList as J, vShow as g, createVNode as Y, withCtx as Z, mergeDefaults as lt, nextTick as Je, onMounted as dt, resolveDynamicComponent as rt, createSlots as ve, toDisplayString as st } from "vue";
import { httpCall as vt } from "lkt-http-client";
import { DataState as Ke } from "lkt-data-state";
import { ModificationView as E, ItemCrudMode as V, ItemCrudButtonNavVisibility as Qe, ButtonType as We, TablePermission as Oe, ensureButtonConfig as ae, LktSettings as h, getFormDataState as pt, extractI18nValue as ct, ItemCrudView as Ye, getFormSlotKeys as ft, ItemCrudButtonNavPosition as Le, NotificationType as de, getDefaultValues as bt, ItemCrud as mt, ToastPositionX as pe } from "lkt-vue-kernel";
import { closeModal as gt, updateModalKey as Bt } from "lkt-modal";
import { openToast as ce } from "lkt-toast";
import { useRouter as yt } from "vue-router";
const De = class De {
};
De.debugEnabled = !1, De.defaultSaveIcon = "", De.defaultDropIcon = "";
let fe = De;
const T = (...X) => {
  fe.debugEnabled && console.info("[LktItemCrud] ", ...X);
}, Pt = (X = !0) => {
  fe.debugEnabled = X;
}, kt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, wt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Ct = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, Dt = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, $e = /* @__PURE__ */ Ze({
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
  setup(X, { expose: he, emit: Fe }) {
    const a = Fe, i = X, M = s(i.pickedModificationView);
    k(() => i.pickedModificationView, (t) => M.value = t), k(M, (t) => a("update:pickedModificationView", t));
    const C = _e(), b = s(null), p = s(null), U = s(null), ee = s(null), l = s(i.loading);
    k(() => i.loading, (t) => l.value = t), k(l, (t) => {
      i.updateConfig.executionMode === "blocking" && a("update:loading", t);
    });
    const c = s(i.editing);
    k(() => i.editing, (t) => c.value = t), k(c, (t) => a("update:editing", t));
    const O = () => {
      l.value = !0;
    }, R = () => {
      l.value = !1;
    }, L = (t, N) => {
      typeof t > "u" || a("create", t, N);
    }, oe = (t, N) => {
      typeof t > "u" || a("save", t, N);
    }, Q = (t, N) => {
      typeof t > "u" || a("drop", t, N);
    }, D = B(() => i.editableView === E.Modifications ? i.modifications : i.item);
    he({
      doSave: () => {
        if (A.value)
          switch (i.mode) {
            case V.Update:
              U.value && typeof U.value.click == "function" && U.value.click();
              break;
            case V.Create:
              b.value && typeof b.value.click == "function" && b.value.click();
              break;
          }
      },
      doDrop: () => {
        ee.value && typeof ee.value.click == "function" && ee.value.click();
      }
    });
    const ie = B(() => !i.canDrop || i.dropButton === !1 ? !1 : !i.canUpdate && i.canDrop ? !0 : !l.value && i.editing && i.httpSuccessRead), A = B(() => i.mode === V.Create && (i.createButton === !1 || !i.canCreate) || i.mode === V.Update && (i.updateButton === !1 || !i.canUpdate) || l.value ? !1 : i.editing && i.httpSuccessRead), ne = B(() => i.editModeButton === !1 || !i.canSwitchEditMode || !i.canUpdate && !i.canDrop || !i.canUpdate && i.canDrop ? !1 : !l.value && i.mode !== V.Create && i.httpSuccessRead), Se = B(() => i.buttonNavVisibility === Qe.Always || C["prev-buttons-ever"] ? !0 : i.buttonNavVisibility === Qe.Never ? !1 : A.value || ie.value || ne.value), j = B(() => i.modificationView === !1 ? [] : i.modificationView === !0 ? [
      E.Current,
      E.Modifications,
      E.SplitView,
      E.Differences
    ] : Array.isArray(i.modificationView) ? i.modificationView : []), se = B(() => {
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
      var re, F, be, me, ge, W;
      const r = Ce("lkt-button");
      return Se.value ? (n(), S("div", kt, [
        t.grouped && t.groupButtonAsModalActions ? (n(), S(H, { key: 0 }, [
          ne.value ? (n(), f(r, v({ key: 0 }, t.editModeButton, {
            checked: c.value,
            "onUpdate:checked": N[0] || (N[0] = (y) => c.value = y),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : w("", !0),
          j.value.length > 0 ? (n(), f(r, je(v({ key: 1 }, {
            type: d(We).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: se.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : w("", !0),
          (n(!0), S(H, null, J(t.navStartButtons, (y) => m((n(), f(r, v({ ref_for: !0 }, y), null, 16)), [
            [g, !l.value]
          ])), 256)),
          d(C)["prev-buttons-ever"] ? I(t.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : w("", !0),
          (n(!0), S(H, null, J(t.navStartButtonsEditing, (y) => m((n(), f(r, v({ ref_for: !0 }, y), null, 16)), [
            [g, c.value && !l.value]
          ])), 256)),
          d(C)["prev-buttons"] ? I(t.$slots, "prev-buttons", {
            key: 3,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : w("", !0),
          m(Y(r, v({
            ref_key: "saveButtonRef",
            ref: U
          }, {
            ...t.updateButton,
            resourceData: {
              ...(re = t.updateButton) == null ? void 0 : re.resourceData,
              ...D.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: O,
            onLoaded: R,
            onClick: oe
          }), null, 16), [
            [g, t.mode === d(V).Update && A.value]
          ]),
          m(Y(r, v({
            ref_key: "createButtonRef",
            ref: b
          }, {
            ...t.createButton,
            resourceData: {
              ...(F = t.createButton) == null ? void 0 : F.resourceData,
              ...D.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: O,
            onLoaded: R,
            onClick: L
          }), null, 16), [
            [g, t.mode === d(V).Create && A.value]
          ]),
          m(Y(r, v({
            ref_key: "createAndNewButtonRef",
            ref: p
          }, {
            ...t.createAndNewButton,
            resourceData: {
              ...(be = t.createAndNewButton) == null ? void 0 : be.resourceData,
              ...D.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: O,
            onLoaded: R,
            onClick: L
          }), null, 16), [
            [g, t.mode === d(V).Create && A.value && t.ableToCreateAndNew]
          ]),
          m(Y(r, v({
            ref_key: "dropButtonRef",
            ref: ee
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: O,
            onLoaded: R,
            onClick: Q
          }), null, 16, ["disabled"]), [
            [g, ie.value && t.mode !== d(V).Create]
          ]),
          d(C).buttons ? I(t.$slots, "buttons", { key: 4 }) : w("", !0),
          (n(!0), S(H, null, J(t.navEndButtons, (y) => m((n(), f(r, v({ ref_for: !0 }, y), null, 16)), [
            [g, !l.value]
          ])), 256)),
          (n(!0), S(H, null, J(t.navEndButtonsEditing, (y) => m((n(), f(r, v({ ref_for: !0 }, y), null, 16)), [
            [g, c.value && !l.value]
          ])), 256))
        ], 64)) : t.grouped ? (n(), f(r, v({
          key: 1,
          ref: "groupButton"
        }, t.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: Z(() => {
            var y, G, q;
            return [
              ne.value ? (n(), f(r, v({ key: 0 }, t.editModeButton, {
                checked: c.value,
                "onUpdate:checked": N[1] || (N[1] = (P) => c.value = P),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : w("", !0),
              j.value.length > 0 ? (n(), f(r, je(v({ key: 1 }, {
                type: d(We).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: se.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : w("", !0),
              (n(!0), S(H, null, J(t.navStartButtons, (P) => m((n(), f(r, v({ ref_for: !0 }, P), null, 16)), [
                [g, !l.value]
              ])), 256)),
              d(C)["prev-buttons-ever"] ? I(t.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : w("", !0),
              (n(!0), S(H, null, J(t.navStartButtonsEditing, (P) => m((n(), f(r, v({ ref_for: !0 }, P), null, 16)), [
                [g, c.value && !l.value]
              ])), 256)),
              d(C)["prev-buttons"] ? I(t.$slots, "prev-buttons", {
                key: 3,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : w("", !0),
              m(Y(r, v({
                ref_key: "saveButtonRef",
                ref: U
              }, {
                ...t.updateButton,
                resourceData: {
                  ...(y = t.updateButton) == null ? void 0 : y.resourceData,
                  ...D.value
                },
                disabled: !t.ableToUpdate
              }, {
                onLoading: O,
                onLoaded: R,
                onClick: oe
              }), null, 16), [
                [g, t.mode === d(V).Update && A.value]
              ]),
              m(Y(r, v({
                ref_key: "createButtonRef",
                ref: b
              }, {
                ...t.createButton,
                resourceData: {
                  ...(G = t.createButton) == null ? void 0 : G.resourceData,
                  ...D.value
                },
                disabled: !t.ableToCreate
              }, {
                disabled: !t.ableToCreate,
                onLoading: O,
                onLoaded: R,
                onClick: L
              }), null, 16, ["disabled"]), [
                [g, t.mode === d(V).Create && A.value]
              ]),
              m(Y(r, v({
                ref_key: "createAndNewButtonRef",
                ref: p
              }, {
                ...t.createAndNewButton,
                resourceData: {
                  ...(q = t.createAndNewButton) == null ? void 0 : q.resourceData,
                  ...D.value
                },
                disabled: !t.ableToCreate
              }, {
                disabled: !t.ableToCreate,
                onLoading: O,
                onLoaded: R,
                onClick: L
              }), null, 16, ["disabled"]), [
                [g, t.mode === d(V).Create && A.value && t.ableToCreateAndNew]
              ]),
              m(Y(r, v({
                ref_key: "dropButtonRef",
                ref: ee
              }, t.dropButton, {
                disabled: !t.ableToDrop,
                onLoading: O,
                onLoaded: R,
                onClick: Q
              }), null, 16, ["disabled"]), [
                [g, ie.value && t.mode !== d(V).Create]
              ]),
              d(C).buttons ? I(t.$slots, "buttons", { key: 4 }) : w("", !0),
              (n(!0), S(H, null, J(t.navEndButtons, (P) => m((n(), f(r, v({ ref_for: !0 }, P), null, 16)), [
                [g, !l.value]
              ])), 256)),
              (n(!0), S(H, null, J(t.navEndButtonsEditing, (P) => m((n(), f(r, v({ ref_for: !0 }, P), null, 16)), [
                [g, c.value && !l.value]
              ])), 256))
            ];
          }),
          _: 3
        }, 16)) : (n(), S(H, { key: 2 }, [
          (n(!0), S(H, null, J(t.navStartButtons, (y) => m((n(), f(r, v({ ref_for: !0 }, y), null, 16)), [
            [g, !l.value]
          ])), 256)),
          d(C)["prev-buttons-ever"] ? m((n(), S("div", wt, [
            I(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [g, !l.value]
          ]) : w("", !0),
          (n(!0), S(H, null, J(t.navStartButtonsEditing, (y) => m((n(), f(r, v({ ref_for: !0 }, y), null, 16)), [
            [g, c.value && !l.value]
          ])), 256)),
          d(C)["prev-buttons"] ? m((n(), S("div", Ct, [
            I(t.$slots, "prev-buttons", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [g, c.value && !l.value]
          ]) : w("", !0),
          m(Y(r, v({
            ref_key: "saveButtonRef",
            ref: U
          }, {
            ...t.updateButton,
            resourceData: {
              ...(me = t.updateButton) == null ? void 0 : me.resourceData,
              ...D.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: O,
            onLoaded: R,
            onClick: oe
          }), null, 16), [
            [g, t.mode === d(V).Update && A.value]
          ]),
          m(Y(r, v({
            ref_key: "createButtonRef",
            ref: b
          }, {
            ...t.createButton,
            resourceData: {
              ...(ge = t.createButton) == null ? void 0 : ge.resourceData,
              ...D.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: O,
            onLoaded: R,
            onClick: L
          }), null, 16), [
            [g, t.mode === d(V).Create && A.value]
          ]),
          m(Y(r, v({
            ref_key: "createAndNewButtonRef",
            ref: p
          }, {
            ...t.createAndNewButton,
            resourceData: {
              ...(W = t.createAndNewButton) == null ? void 0 : W.resourceData,
              ...D.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: O,
            onLoaded: R,
            onClick: L
          }), null, 16), [
            [g, t.mode === d(V).Create && A.value && t.ableToCreateAndNew]
          ]),
          m(Y(r, v({
            ref_key: "dropButtonRef",
            ref: ee
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: O,
            onLoaded: R,
            onClick: Q
          }), null, 16, ["disabled"]), [
            [g, ie.value && t.mode !== d(V).Create]
          ]),
          d(C).buttons ? m((n(), S("div", Dt, [
            I(t.$slots, "buttons")
          ], 512)), [
            [g, c.value && !l.value]
          ]) : w("", !0),
          (n(!0), S(H, null, J(t.navEndButtons, (y) => m((n(), f(r, v({ ref_for: !0 }, y), null, 16)), [
            [g, !l.value]
          ])), 256)),
          (n(!0), S(H, null, J(t.navEndButtonsEditing, (y) => m((n(), f(r, v({ ref_for: !0 }, y), null, 16)), [
            [g, c.value && !l.value]
          ])), 256)),
          j.value.length > 0 ? (n(), f(r, je(v({ key: 3 }, {
            type: d(We).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: se.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : w("", !0),
          ne.value ? (n(), f(r, v({ key: 4 }, t.editModeButton, {
            checked: c.value,
            "onUpdate:checked": N[2] || (N[2] = (y) => c.value = y),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : w("", !0)
        ], 64))
      ])) : w("", !0);
    };
  }
}), ht = {
  key: 1,
  class: "lkt-item-crud_header"
}, St = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, Ut = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, Et = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Mt = {
  key: 4,
  class: "lkt-item-crud_content"
}, At = {
  key: 0,
  class: "lkt-grid-1"
}, Tt = /* @__PURE__ */ Ze({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ lt({
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
  }, bt(mt)),
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
  setup(X, { expose: he, emit: Fe }) {
    const a = X, i = yt(), M = _e(), C = Fe, b = s(!0), p = s(a.modelValue), U = s(a.modifications), ee = s(a.customData), l = s(a.perms), c = s(a.editing), O = s(!1), R = s(!1), L = s(!1), oe = s(!1), Q = s(200), D = s(new Ke(p.value, a.dataStateConfig)), ue = s(new Ke(U.value, a.dataStateConfig)), K = s(!1), ie = s(new Ke(a.readData)), A = s(a.mode === V.Create), ne = s(!1), Se = s(!1), j = s(null), se = s(null), t = B(() => A.value && a.createButton !== !1 && Array.isArray(l.value) && l.value.includes(Oe.Create)), N = B(() => !A.value && a.updateButton !== !1 && Array.isArray(l.value) && l.value.includes(Oe.Update)), r = B(() => !A.value && a.dropButton !== !1 && Array.isArray(l.value) && l.value.includes(Oe.Drop)), re = B(() => a.editModeButton !== !1 && !A.value && Array.isArray(l.value) && l.value.includes(Oe.SwitchEditMode)), F = s(a.visibleView);
    k(() => a.visibleView, (e) => {
      F.value = e;
    }), k(F, (e) => {
      C("update:visibleView", e);
    }), k(() => a.mode, (e) => {
      A.value = e === V.Create;
    }), k(() => a.perms, (e) => {
      l.value = e;
    }), k(l, (e) => {
      C("update:perms", e);
    }), k(() => a.customData, (e) => {
      ee.value = e;
    }), k(ee, (e) => {
      C("update:customData", e);
    }), k(() => a.modifications, (e) => {
      ue.value.increment(e), U.value = e;
    }, { deep: !0 }), k(U, (e) => {
      Pe(), ue.value.increment(e), le.value === E.Modifications && (K.value = ue.value.changed()), C("update:modifications", e);
    }, { deep: !0 });
    const be = () => ae(ae(a.createButton, h.defaultCreateButton), { class: "is-save-button" }, "combine"), me = () => ae(ae(a.updateButton, h.defaultUpdateButton), { class: "is-save-button" }, "combine"), ge = () => ae(ae(a.dropButton, h.defaultDropButton), { class: "is-drop-button" }, "combine"), W = s(be()), y = s(ae(a.createAndNewButton, a.createButton)), G = s(me()), q = s(ge()), P = s(ae(a.editModeButton, h.defaultEditModeButton)), Ue = s(ae(a.groupButton, h.defaultGroupButton));
    k(() => a.createButton, (e) => {
      W.value = be();
    }, { deep: !0 }), k(() => a.updateButton, (e) => {
      G.value = me();
    }, { deep: !0 }), k(() => a.dropButton, (e) => {
      q.value = ge();
    }, { deep: !0 }), k(() => a.editModeButton, (e) => {
      P.value = ae(e, h.defaultEditModeButton);
    }, { deep: !0 });
    const Ee = async () => {
      var e, o, z;
      T("fetchItem"), b.value = !0, Q.value = -1, oe.value = !1, typeof ((e = a.events) == null ? void 0 : e.httpStart) == "function" && a.events.httpStart();
      try {
        const $ = await vt(a.readResource, a.readData);
        if (T("fetchItem -> response", $), b.value = !1, Q.value = $.httpStatus, ee.value = $.custom, !$.success) {
          L.value = !1, Q.value = $.httpStatus, typeof ((o = a.events) == null ? void 0 : o.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: $
          }), C("error", $.httpStatus);
          return;
        }
        L.value = !0, p.value = $.data, U.value = Array.isArray($.modifications) ? {} : $.modifications, l.value = $.perms, D.value.increment(p.value).turnStoredIntoOriginal(), ue.value.increment(U.value).turnStoredIntoOriginal(), K.value = D.value.changed(), ie.value.turnStoredIntoOriginal(), Object.keys(U.value).length > 0 && (F.value = E.Modifications), te.value && (Pe(), Je(() => {
          se.value.turnStoredIntoOriginal();
        })), typeof ((z = a.events) == null ? void 0 : z.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: $
        }), C("read", $);
      } catch {
        b.value = !1, L.value = !1, Q.value = 404, C("error", 404);
        return;
      }
    };
    k(ne, (e) => {
      e && Je(() => ne.value = !1);
    }), k(() => a.modelValue, (e) => {
      p.value = e, D.value.increment(e);
    }, { deep: !0 }), k(p, (e) => {
      if (T("item updated ->", p.value), typeof a.beforeEmitUpdate == "function") {
        T("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(p.value);
        T("item updated -> override with: ", o), typeof o == "object" && (p.value = o);
      }
      te.value && Pe(), C("update:modelValue", p.value), T("item updated -> update dataState"), D.value.increment(e), le.value === E.Current && (K.value = D.value.changed(), T("item updated -> dataState changed")), ne.value = !0;
    }, { deep: !0 }), k(l, () => C("perms", l.value)), k(K, (e) => {
      C("modified-data", e);
    }), k(() => a.readData, (e) => {
      ie.value.increment(e), ie.value.changed() && Ee();
    }), k(() => a.editing, (e) => {
      T("editing updated -> updating editMode", e), c.value = e;
    }), k(c, (e) => {
      T("editMode updated -> emit update", e), C("update:editing", e);
    });
    const Ge = s(void 0), Pe = () => {
      te.value && (Ge.value = pt(p.value, U.value, we.value));
    };
    dt(() => {
      a.readResource && !A.value ? Ee() : (A.value, L.value = !0, c.value = !0, b.value = !1, D.value.increment(p.value).turnStoredIntoOriginal(), K.value = D.value.changed());
    });
    const Xe = (e, o) => {
      if (o) {
        if (b.value = !1, typeof e < "u" && (Q.value = e.httpStatus, !e.success))
          return oe.value = !0, C("error", e.httpStatus), !1;
        oe.value = !0;
      }
      return !0;
    }, qe = (e, o) => {
      if (T("doAutoReloadId -> enter: ", e), typeof e < "u" && e.autoReloadId)
        if (T("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), typeof o < "u") {
          let z = o;
          typeof o == "function" && (z = o(e.autoReloadId)), i.push(z);
        } else Ve.value ? (T("doAutoReloadId -> insideModal: ", a), Bt(a.modalConfig.modalName, a.modalConfig.modalKey, e.autoReloadId)) : (T("doAutoReloadId -> outsideModal"), a.readData.id = e.autoReloadId, T("doAutoReloadId -> turning off create mode"), A.value = !1, Ee());
    }, Me = (e, o) => {
      if (T("onCreate"), !Xe(o, W.value.resource)) {
        a.notificationType === de.Toast && ce({
          text: h.defaultCreateErrorText,
          details: h.defaultCreateErrorDetails,
          icon: h.defaultCreateErrorIcon,
          positionX: pe.Right,
          ...o.toast
        });
        return;
      }
      Se.value = !0, T("onCreate -> turn stored data into original"), D.value.increment(p.value).turnStoredIntoOriginal(), ue.value.turnStoredIntoOriginal(), a.notificationType === de.Toast && ce({
        text: h.defaultCreateSuccessText,
        details: h.defaultCreateSuccessDetails,
        icon: h.defaultCreateSuccessIcon,
        positionX: pe.Right,
        ...o.toast
      }), qe(o, a.redirectOnCreate), T("onCreate -> beforeEmitCreate"), C("create", o);
    }, Ae = (e, o) => {
      if (T("onUpdate"), !Xe(o, G.value.resource)) {
        a.notificationType === de.Toast && ce({
          text: h.defaultUpdateErrorText,
          details: h.defaultUpdateErrorDetails,
          icon: h.defaultUpdateErrorIcon,
          positionX: pe.Right,
          ...o.toast
        });
        return;
      }
      T("onUpdate -> turn stored data into original"), D.value.turnStoredIntoOriginal(), ue.value.turnStoredIntoOriginal(), a.notificationType === de.Toast && ce({
        text: h.defaultUpdateSuccessText,
        details: h.defaultUpdateSuccessDetails,
        icon: h.defaultUpdateSuccessIcon,
        positionX: pe.Right,
        ...o.toast
      }), qe(o), C("update", o);
    }, Te = (e, o) => {
      if (T("onDrop"), !Xe(o, q.value.resource)) {
        a.notificationType === de.Toast && ce({
          text: h.defaultDropErrorText,
          details: h.defaultDropErrorDetails,
          icon: h.defaultDropErrorIcon,
          positionX: pe.Right,
          ...o.toast
        });
        return;
      }
      if (a.notificationType === de.Toast && ce({
        text: h.defaultDropSuccessText,
        details: h.defaultDropSuccessDetails,
        icon: h.defaultDropSuccessIcon,
        positionX: pe.Right,
        ...o.toast
      }), C("drop", o), a.view === Ye.Modal && (T("onDrop -> close modal"), gt(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let z = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (z = a.redirectOnDrop()), i.push(z);
      }
    };
    he({
      doDrop: () => {
        j.value && j.value.doDrop();
      },
      doRefresh: Ee,
      doSave: () => {
        j.value && j.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        D.value.increment(p.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => D.value.changed()
    });
    const xe = B(() => {
      var e, o, z;
      return ke.value ? te.value ? R.value ? (e = a.modalConfig) == null ? void 0 : e.closeConfirm : "" : le.value === E.Modifications ? ue.value.changed() ? (o = a.modalConfig) == null ? void 0 : o.closeConfirm : "" : D.value.changed() ? (z = a.modalConfig) == null ? void 0 : z.closeConfirm : "" : "";
    }), et = (e) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...e,
          itemCreated: Se.value
        });
    }, He = B(() => ct(a.title)), tt = B(() => b.value ? !1 : He.value.length > 0 || !!M["post-title"]), at = B(() => b.value ? !1 : typeof a.header == "object" && Object.keys(a.header).length > 0), Ve = B(() => a.view === Ye.Modal), ze = B(() => Ve.value ? "lkt-modal" : "section"), Be = B(() => {
      var e, o;
      if (a.mode !== V.Update || !N.value || te.value && !O.value)
        return !1;
      if (!a.enabledSaveWithoutChanges) {
        if (te.value) {
          if (!R.value) return !1;
        } else if (!K.value)
          return !1;
      }
      return typeof ((e = G.value) == null ? void 0 : e.disabled) == "function" ? !G.value.disabled({
        prop: p.value
      }) : typeof ((o = G.value) == null ? void 0 : o.disabled) == "boolean" ? !G.value.disabled : !0;
    }), ye = B(() => {
      var e, o;
      if (a.mode !== V.Create || !t.value || te.value && !O.value)
        return !1;
      if (!a.enabledSaveWithoutChanges) {
        if (te.value) {
          if (!R.value) return !1;
        } else if (!K.value)
          return !1;
      }
      return typeof ((e = W.value) == null ? void 0 : e.disabled) == "function" ? !W.value.disabled({
        prop: p.value
      }) : typeof ((o = W.value) == null ? void 0 : o.disabled) == "boolean" ? !W.value.disabled : !0;
    }), Ie = B(() => a.createAndNewButton !== !1 && typeof a.createAndNewButton == "object" && !Array.isArray(a.createAndNewButton) && Object.keys(a.createAndNewButton).length > 0), Ne = B(() => {
      var e, o;
      return r.value ? typeof ((e = q.value) == null ? void 0 : e.disabled) == "function" ? !q.value.disabled({
        prop: p.value
      }) : typeof ((o = q.value) == null ? void 0 : o.disabled) == "boolean" ? !q.value.disabled : !0 : !1;
    }), ot = B(() => ze.value === "lkt-modal" ? {
      title: a.title,
      item: p.value,
      ...a.modalConfig,
      beforeClose: et,
      closeConfirm: xe.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: ye.value || Be.value
      } : !1
    } : {}), te = B(() => typeof we.value == "object" && Object.keys(we.value).length > 0), Re = B(() => Object.keys(U.value).length === 0 ? [] : a.modificationViews), le = B(() => Object.keys(U.value).length === 0 ? E.Current : E.Modifications), ke = B(() => t.value || N.value || r.value), nt = B(() => te.value ? ft(we.value) : []), we = B(() => typeof a.form == "function" ? a.form({
      mode: a.mode,
      view: F.value,
      item: p.value,
      modifications: U.value,
      editing: c.value
    }) : a.form);
    return (e, o) => {
      const z = Ce("lkt-header"), $ = Ce("lkt-http-info"), ut = Ce("lkt-form"), it = Ce("lkt-loader");
      return n(), f(rt(ze.value), v(ot.value, { class: "lkt-item-crud" }), ve({
        default: Z(() => [
          !Ve.value && at.value ? (n(), f(z, je(v({ key: 0 }, e.header)), null, 16)) : !Ve.value && tt.value ? (n(), S("header", ht, [
            d(M)["pre-title"] ? (n(), S("div", St, [
              I(e.$slots, "pre-title", {
                item: p.value,
                loading: b.value
              })
            ])) : w("", !0),
            He.value.length > 0 ? (n(), S("h1", Ut, st(He.value), 1)) : w("", !0),
            d(M)["post-title"] ? (n(), S("div", Et, [
              I(e.$slots, "post-title", {
                item: p.value,
                loading: b.value
              })
            ])) : w("", !0)
          ])) : w("", !0),
          e.buttonNavPosition === d(Le).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) && ke.value ? (n(), f($e, {
            key: 2,
            ref_key: "buttonNav",
            ref: j,
            loading: b.value,
            "onUpdate:loading": o[3] || (o[3] = (u) => b.value = u),
            editing: c.value,
            "onUpdate:editing": o[4] || (o[4] = (u) => c.value = u),
            "picked-modification-view": F.value,
            "onUpdate:pickedModificationView": o[5] || (o[5] = (u) => F.value = u),
            item: p.value,
            modifications: U.value,
            mode: e.mode,
            view: e.view,
            grouped: e.groupButton !== !1,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": W.value,
            "create-and-new-button": y.value,
            "update-button": G.value,
            "drop-button": q.value,
            "edit-mode-button": P.value,
            "group-button": Ue.value,
            "data-changed": K.value,
            "http-success-read": L.value,
            "can-create": t.value,
            "can-update": N.value,
            "can-drop": r.value,
            "can-switch-edit-mode": re.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": ye.value,
            "able-to-create-and-new": Ie.value,
            "able-to-update": Be.value,
            "able-to-drop": Ne.value,
            perms: l.value,
            "modification-view": Re.value,
            "editable-view": le.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            "update-config": e.updateConfig,
            onCreate: Me,
            onSave: Ae,
            onDrop: Te
          }, ve({ _: 2 }, [
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
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing", "update-config"])) : ke.value && e.buttonNavPosition === d(Le).Hidden ? m((n(), f($e, {
            key: 3,
            ref_key: "buttonNav",
            ref: j,
            loading: b.value,
            "onUpdate:loading": o[6] || (o[6] = (u) => b.value = u),
            editing: c.value,
            "onUpdate:editing": o[7] || (o[7] = (u) => c.value = u),
            "picked-modification-view": F.value,
            "onUpdate:pickedModificationView": o[8] || (o[8] = (u) => F.value = u),
            item: p.value,
            modifications: U.value,
            mode: e.mode,
            view: e.view,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": W.value,
            "create-and-new-button": y.value,
            "update-button": G.value,
            "drop-button": q.value,
            "edit-mode-button": P.value,
            "group-button": Ue.value,
            "data-changed": K.value,
            "http-success-read": L.value,
            "can-create": t.value,
            "can-update": N.value,
            "can-drop": r.value,
            "can-switch-edit-mode": re.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": ye.value,
            "able-to-create-and-new": Ie.value,
            "able-to-update": Be.value,
            "able-to-drop": Ne.value,
            perms: l.value,
            "modification-view": Re.value,
            "editable-view": le.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            "update-config": e.updateConfig,
            onCreate: Me,
            onSave: Ae,
            onDrop: Te
          }, ve({ _: 2 }, [
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
            [g, !1]
          ]) : w("", !0),
          b.value ? w("", !0) : (n(), S("div", Mt, [
            L.value ? (n(), S("div", At, [
              oe.value && e.notificationType === d(de).Inline ? (n(), f($, {
                key: 0,
                code: Q.value,
                palette: Q.value === 200 ? "success" : "danger",
                quick: "",
                "can-close": "",
                onClose: o[9] || (o[9] = (u) => oe.value = !1)
              }, null, 8, ["code", "palette"])) : w("", !0),
              te.value ? (n(), f(ut, v({
                key: 1,
                ref_key: "formRef",
                ref: se,
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
                modificationDataState: Ge.value,
                editableViews: [le.value],
                disabled: !c.value
              }), ve({ _: 2 }, [
                J(nt.value, (u) => ({
                  name: u,
                  fn: Z(({}) => [
                    I(e.$slots, u)
                  ])
                }))
              ]), 1040, ["modelValue", "modifications", "valid", "changed"])) : I(e.$slots, "item", {
                key: 2,
                item: p.value,
                loading: b.value,
                editMode: c.value,
                isCreate: A.value,
                canUpdate: N.value,
                canDrop: r.value,
                itemBeingEdited: ne.value,
                perms: l.value
              })
            ])) : e.notificationType === d(de).Inline ? (n(), f($, {
              key: 1,
              code: Q.value
            }, null, 8, ["code"])) : w("", !0)
          ])),
          b.value ? (n(), f(it, { key: 5 })) : w("", !0),
          e.buttonNavPosition === d(Le).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) && ke.value ? (n(), f($e, {
            key: 6,
            ref_key: "buttonNav",
            ref: j,
            loading: b.value,
            "onUpdate:loading": o[14] || (o[14] = (u) => b.value = u),
            editing: c.value,
            "onUpdate:editing": o[15] || (o[15] = (u) => c.value = u),
            "picked-modification-view": F.value,
            "onUpdate:pickedModificationView": o[16] || (o[16] = (u) => F.value = u),
            item: p.value,
            modifications: U.value,
            mode: e.mode,
            view: e.view,
            grouped: e.groupButton !== !1,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": W.value,
            "create-and-new-button": y.value,
            "update-button": G.value,
            "drop-button": q.value,
            "edit-mode-button": P.value,
            "group-button": Ue.value,
            "data-changed": K.value,
            "http-success-read": L.value,
            "can-create": t.value,
            "can-update": N.value,
            "can-drop": r.value,
            "can-switch-edit-mode": re.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": ye.value,
            "able-to-create-and-new": Ie.value,
            "able-to-update": Be.value,
            "able-to-drop": Ne.value,
            perms: l.value,
            "modification-view": Re.value,
            "editable-view": le.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            "update-config": e.updateConfig,
            onCreate: Me,
            onSave: Ae,
            onDrop: Te
          }, ve({ _: 2 }, [
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
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing", "update-config"])) : w("", !0)
        ]),
        _: 2
      }, [
        e.groupButton !== !1 && e.groupButtonAsModalActions && ke.value ? {
          name: "header-actions",
          fn: Z(() => [
            e.buttonNavPosition === d(Le).Top ? (n(), f($e, {
              key: 0,
              ref_key: "buttonNav",
              ref: j,
              loading: b.value,
              "onUpdate:loading": o[0] || (o[0] = (u) => b.value = u),
              editing: c.value,
              "onUpdate:editing": o[1] || (o[1] = (u) => c.value = u),
              "picked-modification-view": F.value,
              "onUpdate:pickedModificationView": o[2] || (o[2] = (u) => F.value = u),
              item: p.value,
              modifications: U.value,
              mode: e.mode,
              view: e.view,
              grouped: !0,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": W.value,
              "create-and-new-button": y.value,
              "update-button": G.value,
              "drop-button": q.value,
              "edit-mode-button": P.value,
              "group-button": Ue.value,
              "data-changed": K.value,
              "http-success-read": L.value,
              "can-create": t.value,
              "can-update": N.value,
              "can-drop": r.value,
              "can-switch-edit-mode": re.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": ye.value,
              "able-to-create-and-new": Ie.value,
              "able-to-update": Be.value,
              "able-to-drop": Ne.value,
              perms: l.value,
              "modification-view": Re.value,
              "editable-view": le.value,
              "nav-start-buttons": e.navStartButtons,
              "nav-start-buttons-editing": e.navStartButtonsEditing,
              "nav-end-buttons": e.navEndButtons,
              "nav-end-buttons-editing": e.navEndButtonsEditing,
              "update-config": e.updateConfig,
              onCreate: Me,
              onSave: Ae,
              onDrop: Te
            }, ve({ _: 2 }, [
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
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "button-nav-visibility", "create-button", "create-and-new-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-create-and-new", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing", "update-config"])) : w("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), Xt = {
  install: (X, he = {}) => {
    X.component("lkt-item-crud") === void 0 && X.component("lkt-item-crud", Tt);
  }
}, Ht = (X) => {
  fe.defaultSaveIcon = X;
}, Kt = (X) => {
  fe.defaultDropIcon = X;
};
export {
  Pt as debugLktItemCrud,
  Xt as default,
  Kt as setItemCrudDefaultDropIcon,
  Ht as setItemCrudDefaultSaveIcon
};
