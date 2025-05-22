import { defineComponent as He, ref as p, watch as b, useSlots as Ge, computed as w, resolveComponent as ke, createElementBlock as h, createCommentVNode as B, openBlock as n, createBlock as g, Fragment as F, renderSlot as T, withDirectives as C, mergeProps as f, normalizeProps as Re, unref as d, renderList as K, vShow as D, createVNode as x, withCtx as Q, mergeDefaults as _e, nextTick as Xe, onMounted as xe, resolveDynamicComponent as et, createSlots as fe, createElementVNode as tt, toDisplayString as at } from "vue";
import { httpCall as ot } from "lkt-http-client";
import { DataState as Ae } from "lkt-data-state";
import { ModificationView as S, ItemCrudMode as A, ItemCrudButtonNavVisibility as Ke, ButtonType as Oe, TablePermission as Le, ensureButtonConfig as ee, LktSettings as m, getFormDataState as nt, ItemCrudView as We, getFormSlotKeys as ut, ItemCrudButtonNavPosition as Ne, NotificationType as ne, getDefaultValues as it, ItemCrud as lt, ToastPositionX as se } from "lkt-vue-kernel";
import { closeModal as rt, updateModalKey as dt } from "lkt-modal";
import { __ as st } from "lkt-i18n";
import { openToast as ve } from "lkt-toast";
import { useRouter as vt } from "vue-router";
const ce = class ce {
};
ce.debugEnabled = !1, ce.defaultSaveIcon = "", ce.defaultDropIcon = "";
let pe = ce;
const V = (...N) => {
  pe.debugEnabled && console.info("[LktItemCrud] ", ...N);
}, Ot = (N = !0) => {
  pe.debugEnabled = N;
}, pt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, ft = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, ct = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, mt = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, $e = /* @__PURE__ */ He({
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
  setup(N, { expose: me, emit: Ce }) {
    const a = Ce, u = N, E = p(u.pickedModificationView);
    b(() => u.pickedModificationView, (t) => E.value = t), b(E, (t) => a("update:pickedModificationView", t));
    const y = Ge(), c = p(null), s = p(null), i = p(u.loading);
    b(() => u.loading, (t) => i.value = t), b(i, (t) => a("update:loading", t));
    const M = p(u.editing);
    b(() => u.editing, (t) => M.value = t), b(M, (t) => a("update:editing", t));
    const k = () => {
      i.value = !0;
    }, U = () => {
      i.value = !1;
    }, te = (t, L) => {
      typeof t > "u" || a("create", t, L);
    }, Y = (t, L) => {
      typeof t > "u" || a("save", t, L);
    }, P = (t, L) => {
      typeof t > "u" || a("drop", t, L);
    }, W = w(() => u.editableView === S.Modifications ? u.modifications : u.item);
    me({
      doSave: () => {
        c.value && typeof c.value.click == "function" && c.value.click();
      },
      doDrop: () => {
        s.value && typeof s.value.click == "function" && s.value.click();
      }
    });
    const H = w(() => !u.canDrop || u.dropButton === !1 ? !1 : !u.canUpdate && u.canDrop ? !0 : !i.value && u.editing && u.httpSuccessRead), I = w(() => u.mode === A.Create && u.createButton === !1 || u.mode === A.Update && u.updateButton === !1 || i.value ? !1 : u.editing && u.httpSuccessRead), ae = w(() => u.editModeButton === !1 || !u.canSwitchEditMode || !u.canUpdate && !u.canDrop || !u.canUpdate && u.canDrop ? !1 : !i.value && u.mode !== A.Create && u.httpSuccessRead), J = w(() => u.buttonNavVisibility === Ke.Always || y["prev-buttons-ever"] ? !0 : u.buttonNavVisibility === Ke.Never ? !1 : I.value || H.value || ae.value), G = w(() => u.modificationView === !1 ? [] : u.modificationView === !0 ? [
      S.Current,
      S.Modifications,
      S.SplitView,
      S.Differences
    ] : Array.isArray(u.modificationView) ? u.modificationView : []), re = w(() => {
      let t = [];
      return G.value.includes(S.Current) && t.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: E.value === S.Current,
        events: {
          click: () => {
            E.value = S.Current;
          }
        }
      }), G.value.includes(S.Modifications) && t.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: E.value === S.Modifications,
        events: {
          click: () => {
            E.value = S.Modifications;
          }
        }
      }), G.value.includes(S.SplitView) && t.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: E.value === S.SplitView,
        events: {
          click: () => {
            E.value = S.SplitView;
          }
        }
      }), G.value.includes(S.Differences) && t.push({
        text: "Differences",
        icon: "lkt-icn-balance",
        disabled: E.value === S.Differences,
        events: {
          click: () => {
            E.value = S.Differences;
          }
        }
      }), t;
    });
    return (t, L) => {
      var _, de, X, q;
      const r = ke("lkt-button");
      return J.value ? (n(), h("div", pt, [
        t.grouped && t.groupButtonAsModalActions ? (n(), h(F, { key: 0 }, [
          ae.value ? (n(), g(r, f({ key: 0 }, t.editModeButton, {
            checked: M.value,
            "onUpdate:checked": L[0] || (L[0] = (v) => M.value = v),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : B("", !0),
          G.value.length > 0 ? (n(), g(r, Re(f({ key: 1 }, {
            type: d(Oe).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: re.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : B("", !0),
          (n(!0), h(F, null, K(t.navStartButtons, (v) => C((n(), g(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          d(y)["prev-buttons-ever"] ? T(t.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : B("", !0),
          (n(!0), h(F, null, K(t.navStartButtonsEditing, (v) => C((n(), g(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, M.value && !i.value]
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
              ...W.value
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
              ...W.value
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
            onClick: P
          }), null, 16, ["disabled"]), [
            [D, H.value && t.mode !== d(A).Create]
          ]),
          d(y).buttons ? T(t.$slots, "buttons", { key: 4 }) : B("", !0),
          (n(!0), h(F, null, K(t.navEndButtons, (v) => C((n(), g(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          (n(!0), h(F, null, K(t.navEndButtonsEditing, (v) => C((n(), g(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, M.value && !i.value]
          ])), 256))
        ], 64)) : t.grouped ? (n(), g(r, f({
          key: 1,
          ref: "groupButton"
        }, t.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: Q(() => {
            var v, z;
            return [
              ae.value ? (n(), g(r, f({ key: 0 }, t.editModeButton, {
                checked: M.value,
                "onUpdate:checked": L[1] || (L[1] = ($) => M.value = $),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : B("", !0),
              G.value.length > 0 ? (n(), g(r, Re(f({ key: 1 }, {
                type: d(Oe).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: re.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : B("", !0),
              (n(!0), h(F, null, K(t.navStartButtons, ($) => C((n(), g(r, f({ ref_for: !0 }, $), null, 16)), [
                [D, !i.value]
              ])), 256)),
              d(y)["prev-buttons-ever"] ? T(t.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : B("", !0),
              (n(!0), h(F, null, K(t.navStartButtonsEditing, ($) => C((n(), g(r, f({ ref_for: !0 }, $), null, 16)), [
                [D, M.value && !i.value]
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
                  ...W.value
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
                  ...W.value
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
                onClick: P
              }), null, 16, ["disabled"]), [
                [D, H.value && t.mode !== d(A).Create]
              ]),
              d(y).buttons ? T(t.$slots, "buttons", { key: 4 }) : B("", !0),
              (n(!0), h(F, null, K(t.navEndButtons, ($) => C((n(), g(r, f({ ref_for: !0 }, $), null, 16)), [
                [D, !i.value]
              ])), 256)),
              (n(!0), h(F, null, K(t.navEndButtonsEditing, ($) => C((n(), g(r, f({ ref_for: !0 }, $), null, 16)), [
                [D, M.value && !i.value]
              ])), 256))
            ];
          }),
          _: 3
        }, 16)) : (n(), h(F, { key: 2 }, [
          (n(!0), h(F, null, K(t.navStartButtons, (v) => C((n(), g(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          d(y)["prev-buttons-ever"] ? C((n(), h("div", ft, [
            T(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [D, !i.value]
          ]) : B("", !0),
          (n(!0), h(F, null, K(t.navStartButtonsEditing, (v) => C((n(), g(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, M.value && !i.value]
          ])), 256)),
          d(y)["prev-buttons"] ? C((n(), h("div", ct, [
            T(t.$slots, "prev-buttons", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [D, M.value && !i.value]
          ]) : B("", !0),
          C(x(r, f({
            ref_key: "saveButtonRef",
            ref: c
          }, {
            ...t.updateButton,
            resourceData: {
              ...(X = t.updateButton) == null ? void 0 : X.resourceData,
              ...W.value
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
              ...W.value
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
            onClick: P
          }), null, 16, ["disabled"]), [
            [D, H.value && t.mode !== d(A).Create]
          ]),
          d(y).buttons ? C((n(), h("div", mt, [
            T(t.$slots, "buttons")
          ], 512)), [
            [D, M.value && !i.value]
          ]) : B("", !0),
          (n(!0), h(F, null, K(t.navEndButtons, (v) => C((n(), g(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          (n(!0), h(F, null, K(t.navEndButtonsEditing, (v) => C((n(), g(r, f({ ref_for: !0 }, v), null, 16)), [
            [D, M.value && !i.value]
          ])), 256)),
          G.value.length > 0 ? (n(), g(r, Re(f({ key: 3 }, {
            type: d(Oe).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: re.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : B("", !0),
          ae.value ? (n(), g(r, f({ key: 4 }, t.editModeButton, {
            checked: M.value,
            "onUpdate:checked": L[2] || (L[2] = (v) => M.value = v),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : B("", !0)
        ], 64))
      ])) : B("", !0);
    };
  }
}), bt = { class: "lkt-item-crud" }, gt = {
  key: 0,
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
}, Ct = {
  key: 2,
  class: "lkt-item-crud_content"
}, Dt = {
  key: 0,
  class: "lkt-grid-1"
}, ht = /* @__PURE__ */ He({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ _e({
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
  }, it(lt)),
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
  setup(N, { expose: me, emit: Ce }) {
    const a = N, u = vt(), E = Ge(), y = Ce, c = p(!0), s = p(a.modelValue), i = p(a.modifications), M = p(a.customData), k = p(a.perms), U = p(a.editing), te = p(!1), Y = p(!1), P = p(!1), W = p(!1), Z = p(200), O = p(new Ae(s.value, a.dataStateConfig)), H = p(new Ae(i.value, a.dataStateConfig)), I = p(!1), ae = p(new Ae(a.readData)), J = p(a.mode === A.Create), G = p(!1), re = p(!1), t = p(null), L = p(null), r = w(() => !J.value && a.updateButton !== !1 && Array.isArray(k.value) && k.value.includes(Le.Update)), _ = w(() => !J.value && a.dropButton !== !1 && Array.isArray(k.value) && k.value.includes(Le.Drop)), de = w(() => a.editModeButton !== !1 && !J.value && Array.isArray(k.value) && k.value.includes(Le.SwitchEditMode)), X = p(a.visibleView);
    b(() => a.visibleView, (e) => {
      X.value = e;
    }), b(X, (e) => {
      y("update:visibleView", e);
    }), b(() => a.mode, (e) => {
      J.value = e === A.Create;
    }), b(() => a.perms, (e) => {
      k.value = e;
    }), b(k, (e) => {
      y("update:perms", e);
    }), b(() => a.customData, (e) => {
      M.value = e;
    }), b(M, (e) => {
      y("update:customData", e);
    }), b(() => a.modifications, (e) => {
      H.value.increment(e), i.value = e;
    }, { deep: !0 }), b(i, (e) => {
      he(), H.value.increment(e), ue.value === S.Modifications && (I.value = H.value.changed()), y("update:modifications", e);
    }, { deep: !0 });
    const q = p(ee(a.createButton, m.defaultCreateButton)), v = p(ee(a.updateButton, m.defaultUpdateButton)), z = p(ee(a.dropButton, m.defaultDropButton)), $ = p(ee(a.editModeButton, m.defaultEditModeButton)), De = p(ee(a.groupButton, m.defaultGroupButton));
    b(() => a.createButton, (e) => {
      q.value = ee(e, m.defaultCreateButton);
    }, { deep: !0 }), b(() => a.updateButton, (e) => {
      v.value = ee(e, m.defaultUpdateButton);
    }, { deep: !0 }), b(() => a.dropButton, (e) => {
      z.value = ee(e, m.defaultDropButton);
    }, { deep: !0 }), b(() => a.editModeButton, (e) => {
      $.value = ee(e, m.defaultEditModeButton);
    }, { deep: !0 });
    const be = async () => {
      var e, o, j;
      V("fetchItem"), c.value = !0, Z.value = -1, W.value = !1, typeof ((e = a.events) == null ? void 0 : e.httpStart) == "function" && a.events.httpStart();
      try {
        const R = await ot(a.readResource, a.readData);
        if (V("fetchItem -> response", R), c.value = !1, Z.value = R.httpStatus, M.value = R.custom, !R.success) {
          P.value = !1, Z.value = R.httpStatus, typeof ((o = a.events) == null ? void 0 : o.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: R
          }), y("error", R.httpStatus);
          return;
        }
        P.value = !0, s.value = R.data, i.value = Array.isArray(R.modifications) ? {} : R.modifications, k.value = R.perms, O.value.increment(s.value).turnStoredIntoOriginal(), H.value.increment(i.value).turnStoredIntoOriginal(), I.value = O.value.changed(), ae.value.turnStoredIntoOriginal(), Object.keys(i.value).length > 0 && (X.value = S.Modifications), oe.value && (he(), Xe(() => {
          L.value.turnStoredIntoOriginal();
        })), typeof ((j = a.events) == null ? void 0 : j.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: R
        }), y("read", R);
      } catch {
        c.value = !1, P.value = !1, Z.value = 404, y("error", 404);
        return;
      }
    };
    b(G, (e) => {
      e && Xe(() => G.value = !1);
    }), b(() => a.modelValue, (e) => {
      s.value = e, O.value.increment(e);
    }, { deep: !0 }), b(s, (e) => {
      if (V("item updated ->", s.value), typeof a.beforeEmitUpdate == "function") {
        V("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(s.value);
        V("item updated -> override with: ", o), typeof o == "object" && (s.value = o);
      }
      oe.value && he(), y("update:modelValue", s.value), V("item updated -> update dataState"), O.value.increment(e), ue.value === S.Current && (I.value = O.value.changed()), G.value = !0;
    }, { deep: !0 }), b(k, () => y("perms", k.value)), b(I, (e) => {
      y("modified-data", e);
    }), b(() => a.readData, (e) => {
      ae.value.increment(e), ae.value.changed() && be();
    }), b(() => a.editing, (e) => {
      V("editing updated -> updating editMode", e), U.value = e;
    }), b(U, (e) => {
      V("editMode updated -> emit update", e), y("update:editing", e);
    });
    const je = p(void 0), he = () => {
      oe.value && (je.value = nt(s.value, i.value, a.form));
    };
    xe(() => {
      a.readResource && !J.value ? be() : (J.value, P.value = !0, U.value = !0, c.value = !1, O.value.increment(s.value).turnStoredIntoOriginal(), I.value = O.value.changed());
    });
    const we = (e, o) => {
      if (o) {
        if (c.value = !1, typeof e < "u" && (Z.value = e.httpStatus, !e.success))
          return W.value = !0, y("error", e.httpStatus), !1;
        W.value = !0;
      }
      return !0;
    }, Fe = (e, o) => {
      if (V("doAutoReloadId -> enter: ", e), typeof e < "u" && e.autoReloadId)
        if (V("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), typeof o < "u") {
          let j = o;
          typeof o == "function" && (j = o(e.autoReloadId)), u.push(j);
        } else Ve.value ? (V("doAutoReloadId -> insideModal: ", a), dt(a.modalConfig.modalName, a.modalConfig.modalKey, e.autoReloadId)) : (V("doAutoReloadId -> outsideModal"), a.readData.id = e.autoReloadId, V("doAutoReloadId -> turning off create mode"), J.value = !1, be());
    }, Se = (e, o) => {
      if (V("onCreate"), !we(o, q.value.resource)) {
        a.notificationType === ne.Toast && ve({
          text: m.defaultCreateErrorText,
          details: m.defaultCreateErrorDetails,
          icon: m.defaultCreateErrorIcon,
          positionX: se.Right
        });
        return;
      }
      re.value = !0, V("onCreate -> turn stored data into original"), O.value.increment(s.value).turnStoredIntoOriginal(), H.value.turnStoredIntoOriginal(), a.notificationType === ne.Toast && ve({
        text: m.defaultCreateSuccessText,
        details: m.defaultCreateSuccessDetails,
        icon: m.defaultCreateSuccessIcon,
        positionX: se.Right
      }), Fe(o, a.redirectOnCreate), V("onCreate -> beforeEmitCreate"), y("create", o);
    }, Ue = (e, o) => {
      if (V("onUpdate"), !we(o, v.value.resource)) {
        a.notificationType === ne.Toast && ve({
          text: m.defaultUpdateErrorText,
          details: m.defaultUpdateErrorDetails,
          icon: m.defaultUpdateErrorIcon,
          positionX: se.Right
        });
        return;
      }
      V("onUpdate -> turn stored data into original"), O.value.turnStoredIntoOriginal(), H.value.turnStoredIntoOriginal(), a.notificationType === ne.Toast && ve({
        text: m.defaultUpdateSuccessText,
        details: m.defaultUpdateSuccessDetails,
        icon: m.defaultUpdateSuccessIcon,
        positionX: se.Right
      }), Fe(o), y("update", o);
    }, Ee = (e, o) => {
      if (V("onDrop"), !we(o, z.value.resource)) {
        a.notificationType === ne.Toast && ve({
          text: m.defaultDropErrorText,
          details: m.defaultDropErrorDetails,
          icon: m.defaultDropErrorIcon,
          positionX: se.Right
        });
        return;
      }
      if (a.notificationType === ne.Toast && ve({
        text: m.defaultDropSuccessText,
        details: m.defaultDropSuccessDetails,
        icon: m.defaultDropSuccessIcon,
        positionX: se.Right
      }), y("drop", o), a.view === We.Modal && (V("onDrop -> close modal"), rt(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let j = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (j = a.redirectOnDrop()), u.push(j);
      }
    };
    me({
      doDrop: () => {
        t.value && t.value.doDrop();
      },
      doRefresh: be,
      doSave: () => {
        t.value && t.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        O.value.increment(s.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => O.value.changed()
    });
    const qe = w(() => {
      var e, o, j;
      return ye.value ? oe.value ? Y.value ? (e = a.modalConfig) == null ? void 0 : e.closeConfirm : "" : ue.value === S.Modifications ? H.value.changed() ? (o = a.modalConfig) == null ? void 0 : o.closeConfirm : "" : O.value.changed() ? (j = a.modalConfig) == null ? void 0 : j.closeConfirm : "" : "";
    }), ze = (e) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...e,
          itemCreated: re.value
        });
    }, Me = w(() => a.title.startsWith("__:") ? String(st(a.title.substring(3))) : a.title), Je = w(() => c.value ? !1 : Me.value.length > 0 || !!E["post-title"]), Ve = w(() => a.view === We.Modal), Pe = w(() => Ve.value ? "lkt-modal" : "section"), ge = w(() => {
      var e, o;
      return a.mode !== A.Update || !r.value || !a.enabledSaveWithoutChanges && !I.value || oe.value && (!te.value || !Y.value) ? !1 : typeof ((e = v.value) == null ? void 0 : e.disabled) == "function" ? !v.value.disabled({
        prop: s.value
      }) : typeof ((o = v.value) == null ? void 0 : o.disabled) == "boolean" ? !v.value.disabled : !0;
    }), Be = w(() => {
      var e, o;
      return a.mode !== A.Create || !a.enabledSaveWithoutChanges && !I.value || oe.value && !te.value && !Y.value ? !1 : typeof ((e = q.value) == null ? void 0 : e.disabled) == "function" ? !q.value.disabled({
        prop: s.value
      }) : typeof ((o = q.value) == null ? void 0 : o.disabled) == "boolean" ? !q.value.disabled : !0;
    }), Ie = w(() => {
      var e, o;
      return _.value ? typeof ((e = z.value) == null ? void 0 : e.disabled) == "function" ? !z.value.disabled({
        prop: s.value
      }) : typeof ((o = z.value) == null ? void 0 : o.disabled) == "boolean" ? !z.value.disabled : !0 : !1;
    }), Qe = w(() => Pe.value === "lkt-modal" ? {
      title: a.title,
      item: s.value,
      ...a.modalConfig,
      beforeClose: ze,
      closeConfirm: qe.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: Be.value || ge.value
      } : !1
    } : {}), oe = w(() => typeof a.form == "object" && Object.keys(a.form).length > 0), Te = w(() => Object.keys(i.value).length === 0 ? [] : a.modificationViews), ue = w(() => Object.keys(i.value).length === 0 ? S.Current : S.Modifications), ye = w(() => J.value || r.value || _.value), Ye = w(() => oe.value ? ut(a.form) : []);
    return (e, o) => {
      const j = ke("lkt-http-info"), R = ke("lkt-form"), Ze = ke("lkt-loader");
      return n(), g(et(Pe.value), f(Qe.value, { class: "lkt-item-crud" }), fe({
        default: Q(() => [
          tt("article", bt, [
            !Ve.value && Je.value ? (n(), h("header", gt, [
              d(E)["pre-title"] ? (n(), h("div", Bt, [
                T(e.$slots, "pre-title", {
                  item: s.value,
                  loading: c.value
                })
              ])) : B("", !0),
              Me.value.length > 0 ? (n(), h("h1", yt, at(Me.value), 1)) : B("", !0),
              d(E)["post-title"] ? (n(), h("div", kt, [
                T(e.$slots, "post-title", {
                  item: s.value,
                  loading: c.value
                })
              ])) : B("", !0)
            ])) : B("", !0),
            e.buttonNavPosition === d(Ne).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) && ye.value ? (n(), g($e, {
              key: 1,
              ref_key: "buttonNav",
              ref: t,
              loading: c.value,
              "onUpdate:loading": o[3] || (o[3] = (l) => c.value = l),
              editing: U.value,
              "onUpdate:editing": o[4] || (o[4] = (l) => U.value = l),
              "picked-modification-view": X.value,
              "onUpdate:pickedModificationView": o[5] || (o[5] = (l) => X.value = l),
              item: s.value,
              modifications: i.value,
              mode: e.mode,
              view: e.view,
              grouped: e.groupButton !== !1,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": q.value,
              "update-button": v.value,
              "drop-button": z.value,
              "edit-mode-button": $.value,
              "group-button": De.value,
              "data-changed": I.value,
              "http-success-read": P.value,
              "can-update": r.value,
              "can-drop": _.value,
              "can-switch-edit-mode": de.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": Be.value,
              "able-to-update": ge.value,
              "able-to-drop": Ie.value,
              perms: k.value,
              "modification-view": Te.value,
              "editable-view": ue.value,
              "nav-start-buttons": e.navStartButtons,
              "nav-start-buttons-editing": e.navStartButtonsEditing,
              "nav-end-buttons": e.navEndButtons,
              "nav-end-buttons-editing": e.navEndButtonsEditing,
              onCreate: Se,
              onSave: Ue,
              onDrop: Ee
            }, fe({ _: 2 }, [
              d(E)["prev-buttons-ever"] ? {
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
              d(E)["prev-buttons"] ? {
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
            c.value ? B("", !0) : (n(), h("div", Ct, [
              P.value ? (n(), h("div", Dt, [
                W.value && e.notificationType === d(ne).Inline ? (n(), g(j, {
                  key: 0,
                  code: Z.value,
                  palette: Z.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: o[6] || (o[6] = (l) => W.value = !1)
                }, null, 8, ["code", "palette"])) : B("", !0),
                oe.value ? (n(), g(R, f({
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
                  visibleView: X.value,
                  modificationDataState: je.value,
                  editableViews: [ue.value],
                  disabled: !U.value
                }), fe({ _: 2 }, [
                  K(Ye.value, (l) => ({
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
              ])) : e.notificationType === d(ne).Inline ? (n(), g(j, {
                key: 1,
                code: Z.value
              }, null, 8, ["code"])) : B("", !0)
            ])),
            c.value ? (n(), g(Ze, { key: 3 })) : B("", !0),
            e.buttonNavPosition === d(Ne).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) && ye.value ? (n(), g($e, {
              key: 4,
              ref_key: "buttonNav",
              ref: t,
              loading: c.value,
              "onUpdate:loading": o[11] || (o[11] = (l) => c.value = l),
              editing: U.value,
              "onUpdate:editing": o[12] || (o[12] = (l) => U.value = l),
              "picked-modification-view": X.value,
              "onUpdate:pickedModificationView": o[13] || (o[13] = (l) => X.value = l),
              item: s.value,
              modifications: i.value,
              mode: e.mode,
              view: e.view,
              grouped: e.groupButton !== !1,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": q.value,
              "update-button": v.value,
              "drop-button": z.value,
              "edit-mode-button": $.value,
              "group-button": De.value,
              "data-changed": I.value,
              "http-success-read": P.value,
              "can-update": r.value,
              "can-drop": _.value,
              "can-switch-edit-mode": de.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": Be.value,
              "able-to-update": ge.value,
              "able-to-drop": Ie.value,
              perms: k.value,
              "modification-view": Te.value,
              "editable-view": ue.value,
              "nav-start-buttons": e.navStartButtons,
              "nav-start-buttons-editing": e.navStartButtonsEditing,
              "nav-end-buttons": e.navEndButtons,
              "nav-end-buttons-editing": e.navEndButtonsEditing,
              onCreate: Se,
              onSave: Ue,
              onDrop: Ee
            }, fe({ _: 2 }, [
              d(E)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: Q(() => [
                  T(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              d(E)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: Q(() => [
                  T(e.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing"])) : B("", !0)
          ])
        ]),
        _: 2
      }, [
        e.groupButton !== !1 && e.groupButtonAsModalActions && ye.value ? {
          name: "header-actions",
          fn: Q(() => [
            e.buttonNavPosition === d(Ne).Top ? (n(), g($e, {
              key: 0,
              ref_key: "buttonNav",
              ref: t,
              loading: c.value,
              "onUpdate:loading": o[0] || (o[0] = (l) => c.value = l),
              editing: U.value,
              "onUpdate:editing": o[1] || (o[1] = (l) => U.value = l),
              "picked-modification-view": X.value,
              "onUpdate:pickedModificationView": o[2] || (o[2] = (l) => X.value = l),
              item: s.value,
              modifications: i.value,
              mode: e.mode,
              view: e.view,
              grouped: !0,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": q.value,
              "update-button": v.value,
              "drop-button": z.value,
              "edit-mode-button": $.value,
              "group-button": De.value,
              "data-changed": I.value,
              "http-success-read": P.value,
              "can-update": r.value,
              "can-drop": _.value,
              "can-switch-edit-mode": de.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": Be.value,
              "able-to-update": ge.value,
              "able-to-drop": Ie.value,
              perms: k.value,
              "modification-view": Te.value,
              "editable-view": ue.value,
              "nav-start-buttons": e.navStartButtons,
              "nav-start-buttons-editing": e.navStartButtonsEditing,
              "nav-end-buttons": e.navEndButtons,
              "nav-end-buttons-editing": e.navEndButtonsEditing,
              onCreate: Se,
              onSave: Ue,
              onDrop: Ee
            }, fe({ _: 2 }, [
              d(E)["prev-buttons-ever"] ? {
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
              d(E)["prev-buttons"] ? {
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
  install: (N, me = {}) => {
    N.component("lkt-item-crud") === void 0 && N.component("lkt-item-crud", ht);
  }
}, Nt = (N) => {
  pe.defaultSaveIcon = N;
}, $t = (N) => {
  pe.defaultDropIcon = N;
};
export {
  Ot as debugLktItemCrud,
  Lt as default,
  $t as setItemCrudDefaultDropIcon,
  Nt as setItemCrudDefaultSaveIcon
};
