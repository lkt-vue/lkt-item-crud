import { defineComponent as Ge, ref as p, watch as g, useSlots as qe, computed as k, resolveComponent as me, createElementBlock as w, createCommentVNode as B, openBlock as n, createBlock as m, Fragment as F, renderSlot as T, withDirectives as C, mergeProps as f, normalizeProps as De, unref as d, renderList as H, vShow as D, createVNode as x, withCtx as Q, mergeDefaults as tt, nextTick as He, onMounted as at, resolveDynamicComponent as ot, createSlots as ce, toDisplayString as nt } from "vue";
import { httpCall as ut } from "lkt-http-client";
import { DataState as Oe } from "lkt-data-state";
import { ModificationView as S, ItemCrudMode as A, ItemCrudButtonNavVisibility as Ke, ButtonType as Le, TablePermission as $e, ensureButtonConfig as ee, LktSettings as b, getFormDataState as it, ItemCrudView as We, getFormSlotKeys as lt, ItemCrudButtonNavPosition as Ne, NotificationType as ne, getDefaultValues as rt, ItemCrud as dt, ToastPositionX as se } from "lkt-vue-kernel";
import { closeModal as st, updateModalKey as vt } from "lkt-modal";
import { __ as pt } from "lkt-i18n";
import { openToast as ve } from "lkt-toast";
import { useRouter as ft } from "vue-router";
const be = class be {
};
be.debugEnabled = !1, be.defaultSaveIcon = "", be.defaultDropIcon = "";
let pe = be;
const V = (...$) => {
  pe.debugEnabled && console.info("[LktItemCrud] ", ...$);
}, Lt = ($ = !0) => {
  pe.debugEnabled = $;
}, ct = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, mt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, bt = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, gt = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, je = /* @__PURE__ */ Ge({
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
  setup($, { expose: ge, emit: we }) {
    const a = we, u = $, M = p(u.pickedModificationView);
    g(() => u.pickedModificationView, (t) => M.value = t), g(M, (t) => a("update:pickedModificationView", t));
    const y = qe(), c = p(null), s = p(null), i = p(u.loading);
    g(() => u.loading, (t) => i.value = t), g(i, (t) => a("update:loading", t));
    const E = p(u.editing);
    g(() => u.editing, (t) => E.value = t), g(E, (t) => a("update:editing", t));
    const h = () => {
      i.value = !0;
    }, U = () => {
      i.value = !1;
    }, te = (t, L) => {
      typeof t > "u" || a("create", t, L);
    }, Y = (t, L) => {
      typeof t > "u" || a("save", t, L);
    }, P = (t, L) => {
      typeof t > "u" || a("drop", t, L);
    }, K = k(() => u.editableView === S.Modifications ? u.modifications : u.item);
    ge({
      doSave: () => {
        c.value && typeof c.value.click == "function" && c.value.click();
      },
      doDrop: () => {
        s.value && typeof s.value.click == "function" && s.value.click();
      }
    });
    const W = k(() => !u.canDrop || u.dropButton === !1 ? !1 : !u.canUpdate && u.canDrop ? !0 : !i.value && u.editing && u.httpSuccessRead), I = k(() => u.mode === A.Create && u.createButton === !1 || u.mode === A.Update && u.updateButton === !1 || i.value ? !1 : u.editing && u.httpSuccessRead), ae = k(() => u.editModeButton === !1 || !u.canSwitchEditMode || !u.canUpdate && !u.canDrop || !u.canUpdate && u.canDrop ? !1 : !i.value && u.mode !== A.Create && u.httpSuccessRead), J = k(() => u.buttonNavVisibility === Ke.Always || y["prev-buttons-ever"] ? !0 : u.buttonNavVisibility === Ke.Never ? !1 : I.value || W.value || ae.value), G = k(() => u.modificationView === !1 ? [] : u.modificationView === !0 ? [
      S.Current,
      S.Modifications,
      S.SplitView,
      S.Differences
    ] : Array.isArray(u.modificationView) ? u.modificationView : []), re = k(() => {
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
      var _, de, N, q;
      const r = me("lkt-button");
      return J.value ? (n(), w("div", ct, [
        t.grouped && t.groupButtonAsModalActions ? (n(), w(F, { key: 0 }, [
          ae.value ? (n(), m(r, f({ key: 0 }, t.editModeButton, {
            checked: E.value,
            "onUpdate:checked": L[0] || (L[0] = (v) => E.value = v),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : B("", !0),
          G.value.length > 0 ? (n(), m(r, De(f({ key: 1 }, {
            type: d(Le).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: re.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : B("", !0),
          (n(!0), w(F, null, H(t.navStartButtons, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          d(y)["prev-buttons-ever"] ? T(t.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : B("", !0),
          (n(!0), w(F, null, H(t.navStartButtonsEditing, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
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
            onLoading: h,
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
            onLoading: h,
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
            onLoading: h,
            onLoaded: U,
            onClick: P
          }), null, 16, ["disabled"]), [
            [D, W.value && t.mode !== d(A).Create]
          ]),
          d(y).buttons ? T(t.$slots, "buttons", { key: 4 }) : B("", !0),
          (n(!0), w(F, null, H(t.navEndButtons, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          (n(!0), w(F, null, H(t.navEndButtonsEditing, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
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
                "onUpdate:checked": L[1] || (L[1] = (j) => E.value = j),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : B("", !0),
              G.value.length > 0 ? (n(), m(r, De(f({ key: 1 }, {
                type: d(Le).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: re.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : B("", !0),
              (n(!0), w(F, null, H(t.navStartButtons, (j) => C((n(), m(r, f({ ref_for: !0 }, j), null, 16)), [
                [D, !i.value]
              ])), 256)),
              d(y)["prev-buttons-ever"] ? T(t.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : B("", !0),
              (n(!0), w(F, null, H(t.navStartButtonsEditing, (j) => C((n(), m(r, f({ ref_for: !0 }, j), null, 16)), [
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
                onLoading: h,
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
                onLoading: h,
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
                onLoading: h,
                onLoaded: U,
                onClick: P
              }), null, 16, ["disabled"]), [
                [D, W.value && t.mode !== d(A).Create]
              ]),
              d(y).buttons ? T(t.$slots, "buttons", { key: 4 }) : B("", !0),
              (n(!0), w(F, null, H(t.navEndButtons, (j) => C((n(), m(r, f({ ref_for: !0 }, j), null, 16)), [
                [D, !i.value]
              ])), 256)),
              (n(!0), w(F, null, H(t.navEndButtonsEditing, (j) => C((n(), m(r, f({ ref_for: !0 }, j), null, 16)), [
                [D, E.value && !i.value]
              ])), 256))
            ];
          }),
          _: 3
        }, 16)) : (n(), w(F, { key: 2 }, [
          (n(!0), w(F, null, H(t.navStartButtons, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          d(y)["prev-buttons-ever"] ? C((n(), w("div", mt, [
            T(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [D, !i.value]
          ]) : B("", !0),
          (n(!0), w(F, null, H(t.navStartButtonsEditing, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, E.value && !i.value]
          ])), 256)),
          d(y)["prev-buttons"] ? C((n(), w("div", bt, [
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
              ...(N = t.updateButton) == null ? void 0 : N.resourceData,
              ...K.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: h,
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
            onLoading: h,
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
            onLoading: h,
            onLoaded: U,
            onClick: P
          }), null, 16, ["disabled"]), [
            [D, W.value && t.mode !== d(A).Create]
          ]),
          d(y).buttons ? C((n(), w("div", gt, [
            T(t.$slots, "buttons")
          ], 512)), [
            [D, E.value && !i.value]
          ]) : B("", !0),
          (n(!0), w(F, null, H(t.navEndButtons, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          (n(!0), w(F, null, H(t.navEndButtonsEditing, (v) => C((n(), m(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, E.value && !i.value]
          ])), 256)),
          G.value.length > 0 ? (n(), m(r, De(f({ key: 3 }, {
            type: d(Le).Tooltip,
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
}), Bt = {
  key: 1,
  class: "lkt-item-crud_header"
}, yt = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, kt = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, ht = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Ct = {
  key: 3,
  class: "lkt-item-crud_content"
}, Dt = {
  key: 0,
  class: "lkt-grid-1"
}, wt = /* @__PURE__ */ Ge({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ tt({
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
  }, rt(dt)),
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
  setup($, { expose: ge, emit: we }) {
    const a = $, u = ft(), M = qe(), y = we, c = p(!0), s = p(a.modelValue), i = p(a.modifications), E = p(a.customData), h = p(a.perms), U = p(a.editing), te = p(!1), Y = p(!1), P = p(!1), K = p(!1), Z = p(200), O = p(new Oe(s.value, a.dataStateConfig)), W = p(new Oe(i.value, a.dataStateConfig)), I = p(!1), ae = p(new Oe(a.readData)), J = p(a.mode === A.Create), G = p(!1), re = p(!1), t = p(null), L = p(null), r = k(() => !J.value && a.updateButton !== !1 && Array.isArray(h.value) && h.value.includes($e.Update)), _ = k(() => !J.value && a.dropButton !== !1 && Array.isArray(h.value) && h.value.includes($e.Drop)), de = k(() => a.editModeButton !== !1 && !J.value && Array.isArray(h.value) && h.value.includes($e.SwitchEditMode)), N = p(a.visibleView);
    g(() => a.visibleView, (e) => {
      N.value = e;
    }), g(N, (e) => {
      y("update:visibleView", e);
    }), g(() => a.mode, (e) => {
      J.value = e === A.Create;
    }), g(() => a.perms, (e) => {
      h.value = e;
    }), g(h, (e) => {
      y("update:perms", e);
    }), g(() => a.customData, (e) => {
      E.value = e;
    }), g(E, (e) => {
      y("update:customData", e);
    }), g(() => a.modifications, (e) => {
      W.value.increment(e), i.value = e;
    }, { deep: !0 }), g(i, (e) => {
      Ue(), W.value.increment(e), ue.value === S.Modifications && (I.value = W.value.changed()), y("update:modifications", e);
    }, { deep: !0 });
    const q = p(ee(a.createButton, b.defaultCreateButton)), v = p(ee(a.updateButton, b.defaultUpdateButton)), z = p(ee(a.dropButton, b.defaultDropButton)), j = p(ee(a.editModeButton, b.defaultEditModeButton)), Se = p(ee(a.groupButton, b.defaultGroupButton));
    g(() => a.createButton, (e) => {
      q.value = ee(e, b.defaultCreateButton);
    }, { deep: !0 }), g(() => a.updateButton, (e) => {
      v.value = ee(e, b.defaultUpdateButton);
    }, { deep: !0 }), g(() => a.dropButton, (e) => {
      z.value = ee(e, b.defaultDropButton);
    }, { deep: !0 }), g(() => a.editModeButton, (e) => {
      j.value = ee(e, b.defaultEditModeButton);
    }, { deep: !0 });
    const Be = async () => {
      var e, o, X;
      V("fetchItem"), c.value = !0, Z.value = -1, K.value = !1, typeof ((e = a.events) == null ? void 0 : e.httpStart) == "function" && a.events.httpStart();
      try {
        const R = await ut(a.readResource, a.readData);
        if (V("fetchItem -> response", R), c.value = !1, Z.value = R.httpStatus, E.value = R.custom, !R.success) {
          P.value = !1, Z.value = R.httpStatus, typeof ((o = a.events) == null ? void 0 : o.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: R
          }), y("error", R.httpStatus);
          return;
        }
        P.value = !0, s.value = R.data, i.value = Array.isArray(R.modifications) ? {} : R.modifications, h.value = R.perms, O.value.increment(s.value).turnStoredIntoOriginal(), W.value.increment(i.value).turnStoredIntoOriginal(), I.value = O.value.changed(), ae.value.turnStoredIntoOriginal(), Object.keys(i.value).length > 0 && (N.value = S.Modifications), oe.value && (Ue(), He(() => {
          L.value.turnStoredIntoOriginal();
        })), typeof ((X = a.events) == null ? void 0 : X.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: R
        }), y("read", R);
      } catch {
        c.value = !1, P.value = !1, Z.value = 404, y("error", 404);
        return;
      }
    };
    g(G, (e) => {
      e && He(() => G.value = !1);
    }), g(() => a.modelValue, (e) => {
      s.value = e, O.value.increment(e);
    }, { deep: !0 }), g(s, (e) => {
      if (V("item updated ->", s.value), typeof a.beforeEmitUpdate == "function") {
        V("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(s.value);
        V("item updated -> override with: ", o), typeof o == "object" && (s.value = o);
      }
      oe.value && Ue(), y("update:modelValue", s.value), V("item updated -> update dataState"), O.value.increment(e), ue.value === S.Current && (I.value = O.value.changed()), G.value = !0;
    }, { deep: !0 }), g(h, () => y("perms", h.value)), g(I, (e) => {
      y("modified-data", e);
    }), g(() => a.readData, (e) => {
      ae.value.increment(e), ae.value.changed() && Be();
    }), g(() => a.editing, (e) => {
      V("editing updated -> updating editMode", e), U.value = e;
    }), g(U, (e) => {
      V("editMode updated -> emit update", e), y("update:editing", e);
    });
    const Fe = p(void 0), Ue = () => {
      oe.value && (Fe.value = it(s.value, i.value, fe.value));
    };
    at(() => {
      a.readResource && !J.value ? Be() : (J.value, P.value = !0, U.value = !0, c.value = !1, O.value.increment(s.value).turnStoredIntoOriginal(), I.value = O.value.changed());
    });
    const Me = (e, o) => {
      if (o) {
        if (c.value = !1, typeof e < "u" && (Z.value = e.httpStatus, !e.success))
          return K.value = !0, y("error", e.httpStatus), !1;
        K.value = !0;
      }
      return !0;
    }, Pe = (e, o) => {
      if (V("doAutoReloadId -> enter: ", e), typeof e < "u" && e.autoReloadId)
        if (V("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), typeof o < "u") {
          let X = o;
          typeof o == "function" && (X = o(e.autoReloadId)), u.push(X);
        } else ye.value ? (V("doAutoReloadId -> insideModal: ", a), vt(a.modalConfig.modalName, a.modalConfig.modalKey, e.autoReloadId)) : (V("doAutoReloadId -> outsideModal"), a.readData.id = e.autoReloadId, V("doAutoReloadId -> turning off create mode"), J.value = !1, Be());
    }, Ee = (e, o) => {
      if (V("onCreate"), !Me(o, q.value.resource)) {
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
      }), Pe(o, a.redirectOnCreate), V("onCreate -> beforeEmitCreate"), y("create", o);
    }, Ve = (e, o) => {
      if (V("onUpdate"), !Me(o, v.value.resource)) {
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
      }), Pe(o), y("update", o);
    }, Ie = (e, o) => {
      if (V("onDrop"), !Me(o, z.value.resource)) {
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
      }), y("drop", o), a.view === We.Modal && (V("onDrop -> close modal"), st(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let X = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (X = a.redirectOnDrop()), u.push(X);
      }
    };
    ge({
      doDrop: () => {
        t.value && t.value.doDrop();
      },
      doRefresh: Be,
      doSave: () => {
        t.value && t.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        O.value.increment(s.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => O.value.changed()
    });
    const ze = k(() => {
      var e, o, X;
      return Ce.value ? oe.value ? Y.value ? (e = a.modalConfig) == null ? void 0 : e.closeConfirm : "" : ue.value === S.Modifications ? W.value.changed() ? (o = a.modalConfig) == null ? void 0 : o.closeConfirm : "" : O.value.changed() ? (X = a.modalConfig) == null ? void 0 : X.closeConfirm : "" : "";
    }), Je = (e) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...e,
          itemCreated: re.value
        });
    }, Te = k(() => a.title.startsWith("__:") ? String(pt(a.title.substring(3))) : a.title), Qe = k(() => c.value ? !1 : Te.value.length > 0 || !!M["post-title"]), Ye = k(() => c.value ? !1 : typeof a.header == "object" && Object.keys(a.header).length > 0), ye = k(() => a.view === We.Modal), Xe = k(() => ye.value ? "lkt-modal" : "section"), ke = k(() => {
      var e, o;
      return a.mode !== A.Update || !r.value || !a.enabledSaveWithoutChanges && !I.value || oe.value && (!te.value || !Y.value) ? !1 : typeof ((e = v.value) == null ? void 0 : e.disabled) == "function" ? !v.value.disabled({
        prop: s.value
      }) : typeof ((o = v.value) == null ? void 0 : o.disabled) == "boolean" ? !v.value.disabled : !0;
    }), he = k(() => {
      var e, o;
      return a.mode !== A.Create || !a.enabledSaveWithoutChanges && !I.value || oe.value && !te.value && !Y.value ? !1 : typeof ((e = q.value) == null ? void 0 : e.disabled) == "function" ? !q.value.disabled({
        prop: s.value
      }) : typeof ((o = q.value) == null ? void 0 : o.disabled) == "boolean" ? !q.value.disabled : !0;
    }), Re = k(() => {
      var e, o;
      return _.value ? typeof ((e = z.value) == null ? void 0 : e.disabled) == "function" ? !z.value.disabled({
        prop: s.value
      }) : typeof ((o = z.value) == null ? void 0 : o.disabled) == "boolean" ? !z.value.disabled : !0 : !1;
    }), Ze = k(() => Xe.value === "lkt-modal" ? {
      title: a.title,
      item: s.value,
      ...a.modalConfig,
      beforeClose: Je,
      closeConfirm: ze.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: he.value || ke.value
      } : !1
    } : {}), oe = k(() => typeof fe.value == "object" && Object.keys(fe.value).length > 0), Ae = k(() => Object.keys(i.value).length === 0 ? [] : a.modificationViews), ue = k(() => Object.keys(i.value).length === 0 ? S.Current : S.Modifications), Ce = k(() => J.value || r.value || _.value), _e = k(() => oe.value ? lt(fe.value) : []), fe = k(() => typeof a.form == "function" ? a.form({
      mode: a.mode,
      view: N.value
    }) : a.form);
    return (e, o) => {
      const X = me("lkt-header"), R = me("lkt-http-info"), xe = me("lkt-form"), et = me("lkt-loader");
      return n(), m(ot(Xe.value), f(Ze.value, { class: "lkt-item-crud" }), ce({
        default: Q(() => [
          !ye.value && Ye.value ? (n(), m(X, De(f({ key: 0 }, e.header)), null, 16)) : !ye.value && Qe.value ? (n(), w("header", Bt, [
            d(M)["pre-title"] ? (n(), w("div", yt, [
              T(e.$slots, "pre-title", {
                item: s.value,
                loading: c.value
              })
            ])) : B("", !0),
            Te.value.length > 0 ? (n(), w("h1", kt, nt(Te.value), 1)) : B("", !0),
            d(M)["post-title"] ? (n(), w("div", ht, [
              T(e.$slots, "post-title", {
                item: s.value,
                loading: c.value
              })
            ])) : B("", !0)
          ])) : B("", !0),
          e.buttonNavPosition === d(Ne).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) && Ce.value ? (n(), m(je, {
            key: 2,
            ref_key: "buttonNav",
            ref: t,
            loading: c.value,
            "onUpdate:loading": o[3] || (o[3] = (l) => c.value = l),
            editing: U.value,
            "onUpdate:editing": o[4] || (o[4] = (l) => U.value = l),
            "picked-modification-view": N.value,
            "onUpdate:pickedModificationView": o[5] || (o[5] = (l) => N.value = l),
            item: s.value,
            modifications: i.value,
            mode: e.mode,
            view: e.view,
            grouped: e.groupButton !== !1,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": q.value,
            "update-button": v.value,
            "drop-button": z.value,
            "edit-mode-button": j.value,
            "group-button": Se.value,
            "data-changed": I.value,
            "http-success-read": P.value,
            "can-update": r.value,
            "can-drop": _.value,
            "can-switch-edit-mode": de.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": he.value,
            "able-to-update": ke.value,
            "able-to-drop": Re.value,
            perms: h.value,
            "modification-view": Ae.value,
            "editable-view": ue.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            onCreate: Ee,
            onSave: Ve,
            onDrop: Ie
          }, ce({ _: 2 }, [
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
          c.value ? B("", !0) : (n(), w("div", Ct, [
            P.value ? (n(), w("div", Dt, [
              K.value && e.notificationType === d(ne).Inline ? (n(), m(R, {
                key: 0,
                code: Z.value,
                palette: Z.value === 200 ? "success" : "danger",
                quick: "",
                "can-close": "",
                onClose: o[6] || (o[6] = (l) => K.value = !1)
              }, null, 8, ["code", "palette"])) : B("", !0),
              oe.value ? (n(), m(xe, f({
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
                form: fe.value,
                differencesTableConfig: e.differencesTableConfig,
                visibleView: N.value,
                modificationDataState: Fe.value,
                editableViews: [ue.value],
                disabled: !U.value
              }), ce({ _: 2 }, [
                H(_e.value, (l) => ({
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
                perms: h.value
              })
            ])) : e.notificationType === d(ne).Inline ? (n(), m(R, {
              key: 1,
              code: Z.value
            }, null, 8, ["code"])) : B("", !0)
          ])),
          c.value ? (n(), m(et, { key: 4 })) : B("", !0),
          e.buttonNavPosition === d(Ne).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) && Ce.value ? (n(), m(je, {
            key: 5,
            ref_key: "buttonNav",
            ref: t,
            loading: c.value,
            "onUpdate:loading": o[11] || (o[11] = (l) => c.value = l),
            editing: U.value,
            "onUpdate:editing": o[12] || (o[12] = (l) => U.value = l),
            "picked-modification-view": N.value,
            "onUpdate:pickedModificationView": o[13] || (o[13] = (l) => N.value = l),
            item: s.value,
            modifications: i.value,
            mode: e.mode,
            view: e.view,
            grouped: e.groupButton !== !1,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": q.value,
            "update-button": v.value,
            "drop-button": z.value,
            "edit-mode-button": j.value,
            "group-button": Se.value,
            "data-changed": I.value,
            "http-success-read": P.value,
            "can-update": r.value,
            "can-drop": _.value,
            "can-switch-edit-mode": de.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": he.value,
            "able-to-update": ke.value,
            "able-to-drop": Re.value,
            perms: h.value,
            "modification-view": Ae.value,
            "editable-view": ue.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            onCreate: Ee,
            onSave: Ve,
            onDrop: Ie
          }, ce({ _: 2 }, [
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
        e.groupButton !== !1 && e.groupButtonAsModalActions && Ce.value ? {
          name: "header-actions",
          fn: Q(() => [
            e.buttonNavPosition === d(Ne).Top ? (n(), m(je, {
              key: 0,
              ref_key: "buttonNav",
              ref: t,
              loading: c.value,
              "onUpdate:loading": o[0] || (o[0] = (l) => c.value = l),
              editing: U.value,
              "onUpdate:editing": o[1] || (o[1] = (l) => U.value = l),
              "picked-modification-view": N.value,
              "onUpdate:pickedModificationView": o[2] || (o[2] = (l) => N.value = l),
              item: s.value,
              modifications: i.value,
              mode: e.mode,
              view: e.view,
              grouped: !0,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": q.value,
              "update-button": v.value,
              "drop-button": z.value,
              "edit-mode-button": j.value,
              "group-button": Se.value,
              "data-changed": I.value,
              "http-success-read": P.value,
              "can-update": r.value,
              "can-drop": _.value,
              "can-switch-edit-mode": de.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": he.value,
              "able-to-update": ke.value,
              "able-to-drop": Re.value,
              perms: h.value,
              "modification-view": Ae.value,
              "editable-view": ue.value,
              "nav-start-buttons": e.navStartButtons,
              "nav-start-buttons-editing": e.navStartButtonsEditing,
              "nav-end-buttons": e.navEndButtons,
              "nav-end-buttons-editing": e.navEndButtonsEditing,
              onCreate: Ee,
              onSave: Ve,
              onDrop: Ie
            }, ce({ _: 2 }, [
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
}), $t = {
  install: ($, ge = {}) => {
    $.component("lkt-item-crud") === void 0 && $.component("lkt-item-crud", wt);
  }
}, Nt = ($) => {
  pe.defaultSaveIcon = $;
}, jt = ($) => {
  pe.defaultDropIcon = $;
};
export {
  Lt as debugLktItemCrud,
  $t as default,
  jt as setItemCrudDefaultDropIcon,
  Nt as setItemCrudDefaultSaveIcon
};
