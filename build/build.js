import { defineComponent as We, ref as p, watch as g, useSlots as Ge, computed as h, resolveComponent as ce, createElementBlock as w, createCommentVNode as B, openBlock as n, createBlock as m, Fragment as j, renderSlot as T, withDirectives as C, mergeProps as f, normalizeProps as Ce, unref as d, renderList as H, vShow as D, createVNode as x, withCtx as Q, mergeDefaults as et, nextTick as Xe, onMounted as tt, resolveDynamicComponent as at, createSlots as fe, toDisplayString as ot } from "vue";
import { httpCall as nt } from "lkt-http-client";
import { DataState as Ae } from "lkt-data-state";
import { ModificationView as S, ItemCrudMode as A, ItemCrudButtonNavVisibility as He, ButtonType as Oe, TablePermission as Le, ensureButtonConfig as ee, LktSettings as b, getFormDataState as ut, ItemCrudView as Ke, getFormSlotKeys as it, ItemCrudButtonNavPosition as $e, NotificationType as ne, getDefaultValues as lt, ItemCrud as rt, ToastPositionX as se } from "lkt-vue-kernel";
import { closeModal as dt, updateModalKey as st } from "lkt-modal";
import { __ as vt } from "lkt-i18n";
import { openToast as ve } from "lkt-toast";
import { useRouter as pt } from "vue-router";
const me = class me {
};
me.debugEnabled = !1, me.defaultSaveIcon = "", me.defaultDropIcon = "";
let pe = me;
const V = (...$) => {
  pe.debugEnabled && console.info("[LktItemCrud] ", ...$);
}, Ot = ($ = !0) => {
  pe.debugEnabled = $;
}, ft = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, ct = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, mt = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, bt = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, Ne = /* @__PURE__ */ We({
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
  setup($, { expose: be, emit: De }) {
    const a = De, u = $, M = p(u.pickedModificationView);
    g(() => u.pickedModificationView, (t) => M.value = t), g(M, (t) => a("update:pickedModificationView", t));
    const y = Ge(), c = p(null), s = p(null), i = p(u.loading);
    g(() => u.loading, (t) => i.value = t), g(i, (t) => a("update:loading", t));
    const E = p(u.editing);
    g(() => u.editing, (t) => E.value = t), g(E, (t) => a("update:editing", t));
    const k = () => {
      i.value = !0;
    }, U = () => {
      i.value = !1;
    }, te = (t, L) => {
      typeof t > "u" || a("create", t, L);
    }, Y = (t, L) => {
      typeof t > "u" || a("save", t, L);
    }, F = (t, L) => {
      typeof t > "u" || a("drop", t, L);
    }, K = h(() => u.editableView === S.Modifications ? u.modifications : u.item);
    be({
      doSave: () => {
        c.value && typeof c.value.click == "function" && c.value.click();
      },
      doDrop: () => {
        s.value && typeof s.value.click == "function" && s.value.click();
      }
    });
    const W = h(() => !u.canDrop || u.dropButton === !1 ? !1 : !u.canUpdate && u.canDrop ? !0 : !i.value && u.editing && u.httpSuccessRead), I = h(() => u.mode === A.Create && u.createButton === !1 || u.mode === A.Update && u.updateButton === !1 || i.value ? !1 : u.editing && u.httpSuccessRead), ae = h(() => u.editModeButton === !1 || !u.canSwitchEditMode || !u.canUpdate && !u.canDrop || !u.canUpdate && u.canDrop ? !1 : !i.value && u.mode !== A.Create && u.httpSuccessRead), J = h(() => u.buttonNavVisibility === He.Always || y["prev-buttons-ever"] ? !0 : u.buttonNavVisibility === He.Never ? !1 : I.value || W.value || ae.value), G = h(() => u.modificationView === !1 ? [] : u.modificationView === !0 ? [
      S.Current,
      S.Modifications,
      S.SplitView,
      S.Differences
    ] : Array.isArray(u.modificationView) ? u.modificationView : []), re = h(() => {
      let t = [];
      return G.value.includes(S.Current) && t.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: M.value === S.Current,
        events: {
          click: () => {
            M.value = S.Current;
          }
        }
      }), G.value.includes(S.Modifications) && t.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: M.value === S.Modifications,
        events: {
          click: () => {
            M.value = S.Modifications;
          }
        }
      }), G.value.includes(S.SplitView) && t.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: M.value === S.SplitView,
        events: {
          click: () => {
            M.value = S.SplitView;
          }
        }
      }), G.value.includes(S.Differences) && t.push({
        text: "Differences",
        icon: "lkt-icn-balance",
        disabled: M.value === S.Differences,
        events: {
          click: () => {
            M.value = S.Differences;
          }
        }
      }), t;
    });
    return (t, L) => {
      var _, de, P, q;
      const r = ce("lkt-button");
      return J.value ? (n(), w("div", ft, [
        t.grouped && t.groupButtonAsModalActions ? (n(), w(j, { key: 0 }, [
          ae.value ? (n(), m(r, f({ key: 0 }, t.editModeButton, {
            checked: E.value,
            "onUpdate:checked": L[0] || (L[0] = (v) => E.value = v),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : B("", !0),
          G.value.length > 0 ? (n(), m(r, Ce(f({ key: 1 }, {
            type: d(Oe).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: re.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : B("", !0),
          (n(!0), w(j, null, H(t.navStartButtons, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          d(y)["prev-buttons-ever"] ? T(t.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : B("", !0),
          (n(!0), w(j, null, H(t.navStartButtonsEditing, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, E.value && !i.value]
          ])), 256)),
          d(y)["prev-buttons"] ? T(t.$slots, "prev-buttons", {
            key: 3,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : B("", !0),
          C(x(r, f({
            ref_key: "saveButtonRef",
            ref: c
          }, {
            ...t.updateButton,
            resourceData: {
              ...(_ = t.updateButton) == null ? void 0 : _.resourceData,
              ...K.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: k,
            onLoaded: U,
            onClick: Y
          }), null, 16), [
            [D, t.mode === d(A).Update && I.value]
          ]),
          C(x(r, f({
            ref_key: "saveButtonRef",
            ref: c
          }, {
            ...t.createButton,
            resourceData: {
              ...(de = t.createButton) == null ? void 0 : de.resourceData,
              ...K.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: k,
            onLoaded: U,
            onClick: te
          }), null, 16), [
            [D, t.mode === d(A).Create && I.value]
          ]),
          C(x(r, f({
            ref_key: "dropButtonRef",
            ref: s
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: k,
            onLoaded: U,
            onClick: F
          }), null, 16, ["disabled"]), [
            [D, W.value && t.mode !== d(A).Create]
          ]),
          d(y).buttons ? T(t.$slots, "buttons", { key: 4 }) : B("", !0),
          (n(!0), w(j, null, H(t.navEndButtons, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          (n(!0), w(j, null, H(t.navEndButtonsEditing, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, E.value && !i.value]
          ])), 256))
        ], 64)) : t.grouped ? (n(), m(r, f({
          key: 1,
          ref: "groupButton"
        }, t.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: Q(() => {
            var v, z;
            return [
              ae.value ? (n(), m(r, f({ key: 0 }, t.editModeButton, {
                checked: E.value,
                "onUpdate:checked": L[1] || (L[1] = (N) => E.value = N),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : B("", !0),
              G.value.length > 0 ? (n(), m(r, Ce(f({ key: 1 }, {
                type: d(Oe).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: re.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : B("", !0),
              (n(!0), w(j, null, H(t.navStartButtons, (N) => C((n(), m(r, f({ ref_for: !0 }, N), null, 16)), [
                [D, !i.value]
              ])), 256)),
              d(y)["prev-buttons-ever"] ? T(t.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : B("", !0),
              (n(!0), w(j, null, H(t.navStartButtonsEditing, (N) => C((n(), m(r, f({ ref_for: !0 }, N), null, 16)), [
                [D, E.value && !i.value]
              ])), 256)),
              d(y)["prev-buttons"] ? T(t.$slots, "prev-buttons", {
                key: 3,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : B("", !0),
              C(x(r, f({
                ref_key: "saveButtonRef",
                ref: c
              }, {
                ...t.updateButton,
                resourceData: {
                  ...(v = t.updateButton) == null ? void 0 : v.resourceData,
                  ...K.value
                },
                disabled: !t.ableToUpdate
              }, {
                onLoading: k,
                onLoaded: U,
                onClick: Y
              }), null, 16), [
                [D, t.mode === d(A).Update && I.value]
              ]),
              C(x(r, f({
                ref_key: "saveButtonRef",
                ref: c
              }, {
                ...t.createButton,
                resourceData: {
                  ...(z = t.createButton) == null ? void 0 : z.resourceData,
                  ...K.value
                },
                disabled: !t.ableToCreate
              }, {
                disabled: !t.ableToCreate,
                onLoading: k,
                onLoaded: U,
                onClick: te
              }), null, 16, ["disabled"]), [
                [D, t.mode === d(A).Create && I.value]
              ]),
              C(x(r, f({
                ref_key: "dropButtonRef",
                ref: s
              }, t.dropButton, {
                disabled: !t.ableToDrop,
                onLoading: k,
                onLoaded: U,
                onClick: F
              }), null, 16, ["disabled"]), [
                [D, W.value && t.mode !== d(A).Create]
              ]),
              d(y).buttons ? T(t.$slots, "buttons", { key: 4 }) : B("", !0),
              (n(!0), w(j, null, H(t.navEndButtons, (N) => C((n(), m(r, f({ ref_for: !0 }, N), null, 16)), [
                [D, !i.value]
              ])), 256)),
              (n(!0), w(j, null, H(t.navEndButtonsEditing, (N) => C((n(), m(r, f({ ref_for: !0 }, N), null, 16)), [
                [D, E.value && !i.value]
              ])), 256))
            ];
          }),
          _: 3
        }, 16)) : (n(), w(j, { key: 2 }, [
          (n(!0), w(j, null, H(t.navStartButtons, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          d(y)["prev-buttons-ever"] ? C((n(), w("div", ct, [
            T(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [D, !i.value]
          ]) : B("", !0),
          (n(!0), w(j, null, H(t.navStartButtonsEditing, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, E.value && !i.value]
          ])), 256)),
          d(y)["prev-buttons"] ? C((n(), w("div", mt, [
            T(t.$slots, "prev-buttons", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [D, E.value && !i.value]
          ]) : B("", !0),
          C(x(r, f({
            ref_key: "saveButtonRef",
            ref: c
          }, {
            ...t.updateButton,
            resourceData: {
              ...(P = t.updateButton) == null ? void 0 : P.resourceData,
              ...K.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: k,
            onLoaded: U,
            onClick: Y
          }), null, 16), [
            [D, t.mode === d(A).Update && I.value]
          ]),
          C(x(r, f({
            ref_key: "saveButtonRef",
            ref: c
          }, {
            ...t.createButton,
            resourceData: {
              ...(q = t.createButton) == null ? void 0 : q.resourceData,
              ...K.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: k,
            onLoaded: U,
            onClick: te
          }), null, 16), [
            [D, t.mode === d(A).Create && I.value]
          ]),
          C(x(r, f({
            ref_key: "dropButtonRef",
            ref: s
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: k,
            onLoaded: U,
            onClick: F
          }), null, 16, ["disabled"]), [
            [D, W.value && t.mode !== d(A).Create]
          ]),
          d(y).buttons ? C((n(), w("div", bt, [
            T(t.$slots, "buttons")
          ], 512)), [
            [D, E.value && !i.value]
          ]) : B("", !0),
          (n(!0), w(j, null, H(t.navEndButtons, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          (n(!0), w(j, null, H(t.navEndButtonsEditing, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, E.value && !i.value]
          ])), 256)),
          G.value.length > 0 ? (n(), m(r, Ce(f({ key: 3 }, {
            type: d(Oe).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: re.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : B("", !0),
          ae.value ? (n(), m(r, f({ key: 4 }, t.editModeButton, {
            checked: E.value,
            "onUpdate:checked": L[2] || (L[2] = (v) => E.value = v),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : B("", !0)
        ], 64))
      ])) : B("", !0);
    };
  }
}), gt = {
  key: 1,
  class: "lkt-item-crud_header"
}, Bt = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, yt = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, kt = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, ht = {
  key: 3,
  class: "lkt-item-crud_content"
}, Ct = {
  key: 0,
  class: "lkt-grid-1"
}, Dt = /* @__PURE__ */ We({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ et({
    modelValue: {},
    modifications: {},
    editing: { type: Boolean },
    perms: {},
    customData: {},
    form: {},
    formUiConfig: {},
    mode: {},
    view: {},
    visibleView: {},
    modificationViews: { type: [Boolean, Array] },
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
  }, lt(rt)),
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
  setup($, { expose: be, emit: De }) {
    const a = $, u = pt(), M = Ge(), y = De, c = p(!0), s = p(a.modelValue), i = p(a.modifications), E = p(a.customData), k = p(a.perms), U = p(a.editing), te = p(!1), Y = p(!1), F = p(!1), K = p(!1), Z = p(200), O = p(new Ae(s.value, a.dataStateConfig)), W = p(new Ae(i.value, a.dataStateConfig)), I = p(!1), ae = p(new Ae(a.readData)), J = p(a.mode === A.Create), G = p(!1), re = p(!1), t = p(null), L = p(null), r = h(() => !J.value && a.updateButton !== !1 && Array.isArray(k.value) && k.value.includes(Le.Update)), _ = h(() => !J.value && a.dropButton !== !1 && Array.isArray(k.value) && k.value.includes(Le.Drop)), de = h(() => a.editModeButton !== !1 && !J.value && Array.isArray(k.value) && k.value.includes(Le.SwitchEditMode)), P = p(a.visibleView);
    g(() => a.visibleView, (e) => {
      P.value = e;
    }), g(P, (e) => {
      y("update:visibleView", e);
    }), g(() => a.mode, (e) => {
      J.value = e === A.Create;
    }), g(() => a.perms, (e) => {
      k.value = e;
    }), g(k, (e) => {
      y("update:perms", e);
    }), g(() => a.customData, (e) => {
      E.value = e;
    }), g(E, (e) => {
      y("update:customData", e);
    }), g(() => a.modifications, (e) => {
      W.value.increment(e), i.value = e;
    }, { deep: !0 }), g(i, (e) => {
      Se(), W.value.increment(e), ue.value === S.Modifications && (I.value = W.value.changed()), y("update:modifications", e);
    }, { deep: !0 });
    const q = p(ee(a.createButton, b.defaultCreateButton)), v = p(ee(a.updateButton, b.defaultUpdateButton)), z = p(ee(a.dropButton, b.defaultDropButton)), N = p(ee(a.editModeButton, b.defaultEditModeButton)), we = p(ee(a.groupButton, b.defaultGroupButton));
    g(() => a.createButton, (e) => {
      q.value = ee(e, b.defaultCreateButton);
    }, { deep: !0 }), g(() => a.updateButton, (e) => {
      v.value = ee(e, b.defaultUpdateButton);
    }, { deep: !0 }), g(() => a.dropButton, (e) => {
      z.value = ee(e, b.defaultDropButton);
    }, { deep: !0 }), g(() => a.editModeButton, (e) => {
      N.value = ee(e, b.defaultEditModeButton);
    }, { deep: !0 });
    const ge = async () => {
      var e, o, X;
      V("fetchItem"), c.value = !0, Z.value = -1, K.value = !1, typeof ((e = a.events) == null ? void 0 : e.httpStart) == "function" && a.events.httpStart();
      try {
        const R = await nt(a.readResource, a.readData);
        if (V("fetchItem -> response", R), c.value = !1, Z.value = R.httpStatus, E.value = R.custom, !R.success) {
          F.value = !1, Z.value = R.httpStatus, typeof ((o = a.events) == null ? void 0 : o.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: R
          }), y("error", R.httpStatus);
          return;
        }
        F.value = !0, s.value = R.data, i.value = Array.isArray(R.modifications) ? {} : R.modifications, k.value = R.perms, O.value.increment(s.value).turnStoredIntoOriginal(), W.value.increment(i.value).turnStoredIntoOriginal(), I.value = O.value.changed(), ae.value.turnStoredIntoOriginal(), Object.keys(i.value).length > 0 && (P.value = S.Modifications), oe.value && (Se(), Xe(() => {
          L.value.turnStoredIntoOriginal();
        })), typeof ((X = a.events) == null ? void 0 : X.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: R
        }), y("read", R);
      } catch {
        c.value = !1, F.value = !1, Z.value = 404, y("error", 404);
        return;
      }
    };
    g(G, (e) => {
      e && Xe(() => G.value = !1);
    }), g(() => a.modelValue, (e) => {
      s.value = e, O.value.increment(e);
    }, { deep: !0 }), g(s, (e) => {
      if (V("item updated ->", s.value), typeof a.beforeEmitUpdate == "function") {
        V("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(s.value);
        V("item updated -> override with: ", o), typeof o == "object" && (s.value = o);
      }
      oe.value && Se(), y("update:modelValue", s.value), V("item updated -> update dataState"), O.value.increment(e), ue.value === S.Current && (I.value = O.value.changed()), G.value = !0;
    }, { deep: !0 }), g(k, () => y("perms", k.value)), g(I, (e) => {
      y("modified-data", e);
    }), g(() => a.readData, (e) => {
      ae.value.increment(e), ae.value.changed() && ge();
    }), g(() => a.editing, (e) => {
      V("editing updated -> updating editMode", e), U.value = e;
    }), g(U, (e) => {
      V("editMode updated -> emit update", e), y("update:editing", e);
    });
    const je = p(void 0), Se = () => {
      oe.value && (je.value = ut(s.value, i.value, a.form));
    };
    tt(() => {
      a.readResource && !J.value ? ge() : (J.value, F.value = !0, U.value = !0, c.value = !1, O.value.increment(s.value).turnStoredIntoOriginal(), I.value = O.value.changed());
    });
    const Ue = (e, o) => {
      if (o) {
        if (c.value = !1, typeof e < "u" && (Z.value = e.httpStatus, !e.success))
          return K.value = !0, y("error", e.httpStatus), !1;
        K.value = !0;
      }
      return !0;
    }, Fe = (e, o) => {
      if (V("doAutoReloadId -> enter: ", e), typeof e < "u" && e.autoReloadId)
        if (V("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), typeof o < "u") {
          let X = o;
          typeof o == "function" && (X = o(e.autoReloadId)), u.push(X);
        } else Be.value ? (V("doAutoReloadId -> insideModal: ", a), st(a.modalConfig.modalName, a.modalConfig.modalKey, e.autoReloadId)) : (V("doAutoReloadId -> outsideModal"), a.readData.id = e.autoReloadId, V("doAutoReloadId -> turning off create mode"), J.value = !1, ge());
    }, Me = (e, o) => {
      if (V("onCreate"), !Ue(o, q.value.resource)) {
        a.notificationType === ne.Toast && ve({
          text: b.defaultCreateErrorText,
          details: b.defaultCreateErrorDetails,
          icon: b.defaultCreateErrorIcon,
          positionX: se.Right
        });
        return;
      }
      re.value = !0, V("onCreate -> turn stored data into original"), O.value.increment(s.value).turnStoredIntoOriginal(), W.value.turnStoredIntoOriginal(), a.notificationType === ne.Toast && ve({
        text: b.defaultCreateSuccessText,
        details: b.defaultCreateSuccessDetails,
        icon: b.defaultCreateSuccessIcon,
        positionX: se.Right
      }), Fe(o, a.redirectOnCreate), V("onCreate -> beforeEmitCreate"), y("create", o);
    }, Ee = (e, o) => {
      if (V("onUpdate"), !Ue(o, v.value.resource)) {
        a.notificationType === ne.Toast && ve({
          text: b.defaultUpdateErrorText,
          details: b.defaultUpdateErrorDetails,
          icon: b.defaultUpdateErrorIcon,
          positionX: se.Right
        });
        return;
      }
      V("onUpdate -> turn stored data into original"), O.value.turnStoredIntoOriginal(), W.value.turnStoredIntoOriginal(), a.notificationType === ne.Toast && ve({
        text: b.defaultUpdateSuccessText,
        details: b.defaultUpdateSuccessDetails,
        icon: b.defaultUpdateSuccessIcon,
        positionX: se.Right
      }), Fe(o), y("update", o);
    }, Ve = (e, o) => {
      if (V("onDrop"), !Ue(o, z.value.resource)) {
        a.notificationType === ne.Toast && ve({
          text: b.defaultDropErrorText,
          details: b.defaultDropErrorDetails,
          icon: b.defaultDropErrorIcon,
          positionX: se.Right
        });
        return;
      }
      if (a.notificationType === ne.Toast && ve({
        text: b.defaultDropSuccessText,
        details: b.defaultDropSuccessDetails,
        icon: b.defaultDropSuccessIcon,
        positionX: se.Right
      }), y("drop", o), a.view === Ke.Modal && (V("onDrop -> close modal"), dt(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let X = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (X = a.redirectOnDrop()), u.push(X);
      }
    };
    be({
      doDrop: () => {
        t.value && t.value.doDrop();
      },
      doRefresh: ge,
      doSave: () => {
        t.value && t.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        O.value.increment(s.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => O.value.changed()
    });
    const qe = h(() => {
      var e, o, X;
      return he.value ? oe.value ? Y.value ? (e = a.modalConfig) == null ? void 0 : e.closeConfirm : "" : ue.value === S.Modifications ? W.value.changed() ? (o = a.modalConfig) == null ? void 0 : o.closeConfirm : "" : O.value.changed() ? (X = a.modalConfig) == null ? void 0 : X.closeConfirm : "" : "";
    }), ze = (e) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...e,
          itemCreated: re.value
        });
    }, Ie = h(() => a.title.startsWith("__:") ? String(vt(a.title.substring(3))) : a.title), Je = h(() => c.value ? !1 : Ie.value.length > 0 || !!M["post-title"]), Qe = h(() => c.value ? !1 : typeof a.header == "object" && Object.keys(a.header).length > 0), Be = h(() => a.view === Ke.Modal), Pe = h(() => Be.value ? "lkt-modal" : "section"), ye = h(() => {
      var e, o;
      return a.mode !== A.Update || !r.value || !a.enabledSaveWithoutChanges && !I.value || oe.value && (!te.value || !Y.value) ? !1 : typeof ((e = v.value) == null ? void 0 : e.disabled) == "function" ? !v.value.disabled({
        prop: s.value
      }) : typeof ((o = v.value) == null ? void 0 : o.disabled) == "boolean" ? !v.value.disabled : !0;
    }), ke = h(() => {
      var e, o;
      return a.mode !== A.Create || !a.enabledSaveWithoutChanges && !I.value || oe.value && !te.value && !Y.value ? !1 : typeof ((e = q.value) == null ? void 0 : e.disabled) == "function" ? !q.value.disabled({
        prop: s.value
      }) : typeof ((o = q.value) == null ? void 0 : o.disabled) == "boolean" ? !q.value.disabled : !0;
    }), Te = h(() => {
      var e, o;
      return _.value ? typeof ((e = z.value) == null ? void 0 : e.disabled) == "function" ? !z.value.disabled({
        prop: s.value
      }) : typeof ((o = z.value) == null ? void 0 : o.disabled) == "boolean" ? !z.value.disabled : !0 : !1;
    }), Ye = h(() => Pe.value === "lkt-modal" ? {
      title: a.title,
      item: s.value,
      ...a.modalConfig,
      beforeClose: ze,
      closeConfirm: qe.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: ke.value || ye.value
      } : !1
    } : {}), oe = h(() => typeof a.form == "object" && Object.keys(a.form).length > 0), Re = h(() => Object.keys(i.value).length === 0 ? [] : a.modificationViews), ue = h(() => Object.keys(i.value).length === 0 ? S.Current : S.Modifications), he = h(() => J.value || r.value || _.value), Ze = h(() => oe.value ? it(a.form) : []);
    return (e, o) => {
      const X = ce("lkt-header"), R = ce("lkt-http-info"), _e = ce("lkt-form"), xe = ce("lkt-loader");
      return n(), m(at(Pe.value), f(Ye.value, { class: "lkt-item-crud" }), fe({
        default: Q(() => [
          !Be.value && Qe.value ? (n(), m(X, Ce(f({ key: 0 }, e.header)), null, 16)) : !Be.value && Je.value ? (n(), w("header", gt, [
            d(M)["pre-title"] ? (n(), w("div", Bt, [
              T(e.$slots, "pre-title", {
                item: s.value,
                loading: c.value
              })
            ])) : B("", !0),
            Ie.value.length > 0 ? (n(), w("h1", yt, ot(Ie.value), 1)) : B("", !0),
            d(M)["post-title"] ? (n(), w("div", kt, [
              T(e.$slots, "post-title", {
                item: s.value,
                loading: c.value
              })
            ])) : B("", !0)
          ])) : B("", !0),
          e.buttonNavPosition === d($e).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) && he.value ? (n(), m(Ne, {
            key: 2,
            ref_key: "buttonNav",
            ref: t,
            loading: c.value,
            "onUpdate:loading": o[3] || (o[3] = (l) => c.value = l),
            editing: U.value,
            "onUpdate:editing": o[4] || (o[4] = (l) => U.value = l),
            "picked-modification-view": P.value,
            "onUpdate:pickedModificationView": o[5] || (o[5] = (l) => P.value = l),
            item: s.value,
            modifications: i.value,
            mode: e.mode,
            view: e.view,
            grouped: e.groupButton !== !1,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": q.value,
            "update-button": v.value,
            "drop-button": z.value,
            "edit-mode-button": N.value,
            "group-button": we.value,
            "data-changed": I.value,
            "http-success-read": F.value,
            "can-update": r.value,
            "can-drop": _.value,
            "can-switch-edit-mode": de.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": ke.value,
            "able-to-update": ye.value,
            "able-to-drop": Te.value,
            perms: k.value,
            "modification-view": Re.value,
            "editable-view": ue.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            onCreate: Me,
            onSave: Ee,
            onDrop: Ve
          }, fe({ _: 2 }, [
            d(M)["prev-buttons-ever"] ? {
              name: "prev-buttons-ever",
              fn: Q(({ canUpdate: l, canDrop: ie, perms: le }) => [
                T(e.$slots, "prev-buttons-ever", {
                  canUpdate: l,
                  canDrop: ie,
                  perms: le
                })
              ]),
              key: "0"
            } : void 0,
            d(M)["prev-buttons"] ? {
              name: "prev-buttons",
              fn: Q(({ canUpdate: l, canDrop: ie, perms: le }) => [
                T(e.$slots, "prev-buttons", {
                  canUpdate: l,
                  canDrop: ie,
                  perms: le
                })
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing"])) : B("", !0),
          c.value ? B("", !0) : (n(), w("div", ht, [
            F.value ? (n(), w("div", Ct, [
              K.value && e.notificationType === d(ne).Inline ? (n(), m(R, {
                key: 0,
                code: Z.value,
                palette: Z.value === 200 ? "success" : "danger",
                quick: "",
                "can-close": "",
                onClose: o[6] || (o[6] = (l) => K.value = !1)
              }, null, 8, ["code", "palette"])) : B("", !0),
              oe.value ? (n(), m(_e, f({
                key: 1,
                ref_key: "formRef",
                ref: L,
                modelValue: s.value,
                "onUpdate:modelValue": o[7] || (o[7] = (l) => s.value = l),
                modifications: i.value,
                "onUpdate:modifications": o[8] || (o[8] = (l) => i.value = l),
                valid: te.value,
                "onUpdate:valid": o[9] || (o[9] = (l) => te.value = l),
                changed: Y.value,
                "onUpdate:changed": o[10] || (o[10] = (l) => Y.value = l)
              }, {
                ...e.formUiConfig,
                form: e.form,
                differencesTableConfig: e.differencesTableConfig,
                visibleView: P.value,
                modificationDataState: je.value,
                editableViews: [ue.value],
                disabled: !U.value
              }), fe({ _: 2 }, [
                H(Ze.value, (l) => ({
                  name: l,
                  fn: Q(({}) => [
                    T(e.$slots, l)
                  ])
                }))
              ]), 1040, ["modelValue", "modifications", "valid", "changed"])) : T(e.$slots, "item", {
                key: 2,
                item: s.value,
                loading: c.value,
                editMode: U.value,
                isCreate: J.value,
                canUpdate: r.value,
                canDrop: _.value,
                itemBeingEdited: G.value,
                perms: k.value
              })
            ])) : e.notificationType === d(ne).Inline ? (n(), m(R, {
              key: 1,
              code: Z.value
            }, null, 8, ["code"])) : B("", !0)
          ])),
          c.value ? (n(), m(xe, { key: 4 })) : B("", !0),
          e.buttonNavPosition === d($e).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) && he.value ? (n(), m(Ne, {
            key: 5,
            ref_key: "buttonNav",
            ref: t,
            loading: c.value,
            "onUpdate:loading": o[11] || (o[11] = (l) => c.value = l),
            editing: U.value,
            "onUpdate:editing": o[12] || (o[12] = (l) => U.value = l),
            "picked-modification-view": P.value,
            "onUpdate:pickedModificationView": o[13] || (o[13] = (l) => P.value = l),
            item: s.value,
            modifications: i.value,
            mode: e.mode,
            view: e.view,
            grouped: e.groupButton !== !1,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": q.value,
            "update-button": v.value,
            "drop-button": z.value,
            "edit-mode-button": N.value,
            "group-button": we.value,
            "data-changed": I.value,
            "http-success-read": F.value,
            "can-update": r.value,
            "can-drop": _.value,
            "can-switch-edit-mode": de.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": ke.value,
            "able-to-update": ye.value,
            "able-to-drop": Te.value,
            perms: k.value,
            "modification-view": Re.value,
            "editable-view": ue.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            onCreate: Me,
            onSave: Ee,
            onDrop: Ve
          }, fe({ _: 2 }, [
            d(M)["prev-buttons-ever"] ? {
              name: "prev-buttons-ever",
              fn: Q(() => [
                T(e.$slots, "prev-buttons-ever")
              ]),
              key: "0"
            } : void 0,
            d(M)["prev-buttons"] ? {
              name: "prev-buttons-ever",
              fn: Q(() => [
                T(e.$slots, "prev-buttons")
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing"])) : B("", !0)
        ]),
        _: 2
      }, [
        e.groupButton !== !1 && e.groupButtonAsModalActions && he.value ? {
          name: "header-actions",
          fn: Q(() => [
            e.buttonNavPosition === d($e).Top ? (n(), m(Ne, {
              key: 0,
              ref_key: "buttonNav",
              ref: t,
              loading: c.value,
              "onUpdate:loading": o[0] || (o[0] = (l) => c.value = l),
              editing: U.value,
              "onUpdate:editing": o[1] || (o[1] = (l) => U.value = l),
              "picked-modification-view": P.value,
              "onUpdate:pickedModificationView": o[2] || (o[2] = (l) => P.value = l),
              item: s.value,
              modifications: i.value,
              mode: e.mode,
              view: e.view,
              grouped: !0,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": q.value,
              "update-button": v.value,
              "drop-button": z.value,
              "edit-mode-button": N.value,
              "group-button": we.value,
              "data-changed": I.value,
              "http-success-read": F.value,
              "can-update": r.value,
              "can-drop": _.value,
              "can-switch-edit-mode": de.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": ke.value,
              "able-to-update": ye.value,
              "able-to-drop": Te.value,
              perms: k.value,
              "modification-view": Re.value,
              "editable-view": ue.value,
              "nav-start-buttons": e.navStartButtons,
              "nav-start-buttons-editing": e.navStartButtonsEditing,
              "nav-end-buttons": e.navEndButtons,
              "nav-end-buttons-editing": e.navEndButtonsEditing,
              onCreate: Me,
              onSave: Ee,
              onDrop: Ve
            }, fe({ _: 2 }, [
              d(M)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: Q(({ canUpdate: l, canDrop: ie, perms: le }) => [
                  T(e.$slots, "prev-buttons-ever", {
                    canUpdate: l,
                    canDrop: ie,
                    perms: le
                  })
                ]),
                key: "0"
              } : void 0,
              d(M)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: Q(({ canUpdate: l, canDrop: ie, perms: le }) => [
                  T(e.$slots, "prev-buttons", {
                    canUpdate: l,
                    canDrop: ie,
                    perms: le
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing"])) : B("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), Lt = {
  install: ($, be = {}) => {
    $.component("lkt-item-crud") === void 0 && $.component("lkt-item-crud", Dt);
  }
}, $t = ($) => {
  pe.defaultSaveIcon = $;
}, Nt = ($) => {
  pe.defaultDropIcon = $;
};
export {
  Ot as debugLktItemCrud,
  Lt as default,
  Nt as setItemCrudDefaultDropIcon,
  $t as setItemCrudDefaultSaveIcon
};
