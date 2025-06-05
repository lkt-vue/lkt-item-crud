import { defineComponent as qe, ref as p, watch as y, useSlots as ze, computed as B, resolveComponent as me, createElementBlock as w, createCommentVNode as k, openBlock as n, createBlock as m, Fragment as F, renderSlot as R, withDirectives as h, mergeProps as f, normalizeProps as Se, unref as s, renderList as H, vShow as D, createVNode as x, withCtx as J, mergeDefaults as at, nextTick as Ke, onMounted as ot, resolveDynamicComponent as nt, createSlots as ce, toDisplayString as ut } from "vue";
import { httpCall as it } from "lkt-http-client";
import { DataState as $e } from "lkt-data-state";
import { ModificationView as U, ItemCrudMode as O, ItemCrudButtonNavVisibility as We, ButtonType as Ne, TablePermission as we, ensureButtonConfig as ee, LktSettings as g, getFormDataState as lt, ItemCrudView as Ge, getFormSlotKeys as rt, ItemCrudButtonNavPosition as je, NotificationType as ne, getDefaultValues as dt, ItemCrud as st, ToastPositionX as se } from "lkt-vue-kernel";
import { closeModal as vt, updateModalKey as pt } from "lkt-modal";
import { __ as ft } from "lkt-i18n";
import { openToast as ve } from "lkt-toast";
import { useRouter as ct } from "vue-router";
const be = class be {
};
be.debugEnabled = !1, be.defaultSaveIcon = "", be.defaultDropIcon = "";
let pe = be;
const V = (...N) => {
  pe.debugEnabled && console.info("[LktItemCrud] ", ...N);
}, $t = (N = !0) => {
  pe.debugEnabled = N;
}, mt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, bt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, gt = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, yt = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, Fe = /* @__PURE__ */ qe({
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
  setup(N, { expose: ge, emit: Ue }) {
    const a = Ue, u = N, M = p(u.pickedModificationView);
    y(() => u.pickedModificationView, (t) => M.value = t), y(M, (t) => a("update:pickedModificationView", t));
    const C = ze(), c = p(null), r = p(null), i = p(u.loading);
    y(() => u.loading, (t) => i.value = t), y(i, (t) => a("update:loading", t));
    const E = p(u.editing);
    y(() => u.editing, (t) => E.value = t), y(E, (t) => a("update:editing", t));
    const b = () => {
      i.value = !0;
    }, S = () => {
      i.value = !1;
    }, te = (t, $) => {
      typeof t > "u" || a("create", t, $);
    }, Q = (t, $) => {
      typeof t > "u" || a("save", t, $);
    }, P = (t, $) => {
      typeof t > "u" || a("drop", t, $);
    }, K = B(() => u.editableView === U.Modifications ? u.modifications : u.item);
    ge({
      doSave: () => {
        c.value && typeof c.value.click == "function" && c.value.click();
      },
      doDrop: () => {
        r.value && typeof r.value.click == "function" && r.value.click();
      }
    });
    const W = B(() => !u.canDrop || u.dropButton === !1 ? !1 : !u.canUpdate && u.canDrop ? !0 : !i.value && u.editing && u.httpSuccessRead), I = B(() => u.mode === O.Create && (u.createButton === !1 || !u.canCreate) || u.mode === O.Update && (u.updateButton === !1 || !u.canUpdate) || i.value ? !1 : u.editing && u.httpSuccessRead), ae = B(() => u.editModeButton === !1 || !u.canSwitchEditMode || !u.canUpdate && !u.canDrop || !u.canUpdate && u.canDrop ? !1 : !i.value && u.mode !== O.Create && u.httpSuccessRead), z = B(() => u.buttonNavVisibility === We.Always || C["prev-buttons-ever"] ? !0 : u.buttonNavVisibility === We.Never ? !1 : I.value || W.value || ae.value), G = B(() => u.modificationView === !1 ? [] : u.modificationView === !0 ? [
      U.Current,
      U.Modifications,
      U.SplitView,
      U.Differences
    ] : Array.isArray(u.modificationView) ? u.modificationView : []), re = B(() => {
      let t = [];
      return G.value.includes(U.Current) && t.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: M.value === U.Current,
        events: {
          click: () => {
            M.value = U.Current;
          }
        }
      }), G.value.includes(U.Modifications) && t.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: M.value === U.Modifications,
        events: {
          click: () => {
            M.value = U.Modifications;
          }
        }
      }), G.value.includes(U.SplitView) && t.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: M.value === U.SplitView,
        events: {
          click: () => {
            M.value = U.SplitView;
          }
        }
      }), G.value.includes(U.Differences) && t.push({
        text: "Differences",
        icon: "lkt-icn-balance",
        disabled: M.value === U.Differences,
        events: {
          click: () => {
            M.value = U.Differences;
          }
        }
      }), t;
    });
    return (t, $) => {
      var Z, _, de, j;
      const d = me("lkt-button");
      return z.value ? (n(), w("div", mt, [
        t.grouped && t.groupButtonAsModalActions ? (n(), w(F, { key: 0 }, [
          ae.value ? (n(), m(d, f({ key: 0 }, t.editModeButton, {
            checked: E.value,
            "onUpdate:checked": $[0] || ($[0] = (v) => E.value = v),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : k("", !0),
          G.value.length > 0 ? (n(), m(d, Se(f({ key: 1 }, {
            type: s(Ne).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: re.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : k("", !0),
          (n(!0), w(F, null, H(t.navStartButtons, (v) => h((n(), m(d, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          s(C)["prev-buttons-ever"] ? R(t.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : k("", !0),
          (n(!0), w(F, null, H(t.navStartButtonsEditing, (v) => h((n(), m(d, f({ ref_for: !0 }, v), null, 16)), [
            [D, E.value && !i.value]
          ])), 256)),
          s(C)["prev-buttons"] ? R(t.$slots, "prev-buttons", {
            key: 3,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : k("", !0),
          h(x(d, f({
            ref_key: "saveButtonRef",
            ref: c
          }, {
            ...t.updateButton,
            resourceData: {
              ...(Z = t.updateButton) == null ? void 0 : Z.resourceData,
              ...K.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: b,
            onLoaded: S,
            onClick: Q
          }), null, 16), [
            [D, t.mode === s(O).Update && I.value]
          ]),
          h(x(d, f({
            ref_key: "saveButtonRef",
            ref: c
          }, {
            ...t.createButton,
            resourceData: {
              ...(_ = t.createButton) == null ? void 0 : _.resourceData,
              ...K.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: b,
            onLoaded: S,
            onClick: te
          }), null, 16), [
            [D, t.mode === s(O).Create && I.value]
          ]),
          h(x(d, f({
            ref_key: "dropButtonRef",
            ref: r
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: b,
            onLoaded: S,
            onClick: P
          }), null, 16, ["disabled"]), [
            [D, W.value && t.mode !== s(O).Create]
          ]),
          s(C).buttons ? R(t.$slots, "buttons", { key: 4 }) : k("", !0),
          (n(!0), w(F, null, H(t.navEndButtons, (v) => h((n(), m(d, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          (n(!0), w(F, null, H(t.navEndButtonsEditing, (v) => h((n(), m(d, f({ ref_for: !0 }, v), null, 16)), [
            [D, E.value && !i.value]
          ])), 256))
        ], 64)) : t.grouped ? (n(), m(d, f({
          key: 1,
          ref: "groupButton"
        }, t.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: J(() => {
            var v, q;
            return [
              ae.value ? (n(), m(d, f({ key: 0 }, t.editModeButton, {
                checked: E.value,
                "onUpdate:checked": $[1] || ($[1] = (T) => E.value = T),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : k("", !0),
              G.value.length > 0 ? (n(), m(d, Se(f({ key: 1 }, {
                type: s(Ne).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: re.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : k("", !0),
              (n(!0), w(F, null, H(t.navStartButtons, (T) => h((n(), m(d, f({ ref_for: !0 }, T), null, 16)), [
                [D, !i.value]
              ])), 256)),
              s(C)["prev-buttons-ever"] ? R(t.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : k("", !0),
              (n(!0), w(F, null, H(t.navStartButtonsEditing, (T) => h((n(), m(d, f({ ref_for: !0 }, T), null, 16)), [
                [D, E.value && !i.value]
              ])), 256)),
              s(C)["prev-buttons"] ? R(t.$slots, "prev-buttons", {
                key: 3,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : k("", !0),
              h(x(d, f({
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
                onLoading: b,
                onLoaded: S,
                onClick: Q
              }), null, 16), [
                [D, t.mode === s(O).Update && I.value]
              ]),
              h(x(d, f({
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
                disabled: !t.ableToCreate,
                onLoading: b,
                onLoaded: S,
                onClick: te
              }), null, 16, ["disabled"]), [
                [D, t.mode === s(O).Create && I.value]
              ]),
              h(x(d, f({
                ref_key: "dropButtonRef",
                ref: r
              }, t.dropButton, {
                disabled: !t.ableToDrop,
                onLoading: b,
                onLoaded: S,
                onClick: P
              }), null, 16, ["disabled"]), [
                [D, W.value && t.mode !== s(O).Create]
              ]),
              s(C).buttons ? R(t.$slots, "buttons", { key: 4 }) : k("", !0),
              (n(!0), w(F, null, H(t.navEndButtons, (T) => h((n(), m(d, f({ ref_for: !0 }, T), null, 16)), [
                [D, !i.value]
              ])), 256)),
              (n(!0), w(F, null, H(t.navEndButtonsEditing, (T) => h((n(), m(d, f({ ref_for: !0 }, T), null, 16)), [
                [D, E.value && !i.value]
              ])), 256))
            ];
          }),
          _: 3
        }, 16)) : (n(), w(F, { key: 2 }, [
          (n(!0), w(F, null, H(t.navStartButtons, (v) => h((n(), m(d, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          s(C)["prev-buttons-ever"] ? h((n(), w("div", bt, [
            R(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [D, !i.value]
          ]) : k("", !0),
          (n(!0), w(F, null, H(t.navStartButtonsEditing, (v) => h((n(), m(d, f({ ref_for: !0 }, v), null, 16)), [
            [D, E.value && !i.value]
          ])), 256)),
          s(C)["prev-buttons"] ? h((n(), w("div", gt, [
            R(t.$slots, "prev-buttons", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [D, E.value && !i.value]
          ]) : k("", !0),
          h(x(d, f({
            ref_key: "saveButtonRef",
            ref: c
          }, {
            ...t.updateButton,
            resourceData: {
              ...(de = t.updateButton) == null ? void 0 : de.resourceData,
              ...K.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: b,
            onLoaded: S,
            onClick: Q
          }), null, 16), [
            [D, t.mode === s(O).Update && I.value]
          ]),
          h(x(d, f({
            ref_key: "saveButtonRef",
            ref: c
          }, {
            ...t.createButton,
            resourceData: {
              ...(j = t.createButton) == null ? void 0 : j.resourceData,
              ...K.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: b,
            onLoaded: S,
            onClick: te
          }), null, 16), [
            [D, t.mode === s(O).Create && I.value]
          ]),
          h(x(d, f({
            ref_key: "dropButtonRef",
            ref: r
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: b,
            onLoaded: S,
            onClick: P
          }), null, 16, ["disabled"]), [
            [D, W.value && t.mode !== s(O).Create]
          ]),
          s(C).buttons ? h((n(), w("div", yt, [
            R(t.$slots, "buttons")
          ], 512)), [
            [D, E.value && !i.value]
          ]) : k("", !0),
          (n(!0), w(F, null, H(t.navEndButtons, (v) => h((n(), m(d, f({ ref_for: !0 }, v), null, 16)), [
            [D, !i.value]
          ])), 256)),
          (n(!0), w(F, null, H(t.navEndButtonsEditing, (v) => h((n(), m(d, f({ ref_for: !0 }, v), null, 16)), [
            [D, E.value && !i.value]
          ])), 256)),
          G.value.length > 0 ? (n(), m(d, Se(f({ key: 3 }, {
            type: s(Ne).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: re.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : k("", !0),
          ae.value ? (n(), m(d, f({ key: 4 }, t.editModeButton, {
            checked: E.value,
            "onUpdate:checked": $[2] || ($[2] = (v) => E.value = v),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : k("", !0)
        ], 64))
      ])) : k("", !0);
    };
  }
}), Bt = {
  key: 1,
  class: "lkt-item-crud_header"
}, kt = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, Ct = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, ht = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Dt = {
  key: 3,
  class: "lkt-item-crud_content"
}, wt = {
  key: 0,
  class: "lkt-grid-1"
}, St = /* @__PURE__ */ qe({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ at({
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
  }, dt(st)),
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
  setup(N, { expose: ge, emit: Ue }) {
    const a = N, u = ct(), M = ze(), C = Ue, c = p(!0), r = p(a.modelValue), i = p(a.modifications), E = p(a.customData), b = p(a.perms), S = p(a.editing), te = p(!1), Q = p(!1), P = p(!1), K = p(!1), Y = p(200), L = p(new $e(r.value, a.dataStateConfig)), W = p(new $e(i.value, a.dataStateConfig)), I = p(!1), ae = p(new $e(a.readData)), z = p(a.mode === O.Create), G = p(!1), re = p(!1), t = p(null), $ = p(null), d = B(() => z.value && a.createButton !== !1 && Array.isArray(b.value) && b.value.includes(we.Create)), Z = B(() => !z.value && a.updateButton !== !1 && Array.isArray(b.value) && b.value.includes(we.Update)), _ = B(() => !z.value && a.dropButton !== !1 && Array.isArray(b.value) && b.value.includes(we.Drop)), de = B(() => a.editModeButton !== !1 && !z.value && Array.isArray(b.value) && b.value.includes(we.SwitchEditMode)), j = p(a.visibleView);
    y(() => a.visibleView, (e) => {
      j.value = e;
    }), y(j, (e) => {
      C("update:visibleView", e);
    }), y(() => a.mode, (e) => {
      z.value = e === O.Create;
    }), y(() => a.perms, (e) => {
      b.value = e;
    }), y(b, (e) => {
      C("update:perms", e);
    }), y(() => a.customData, (e) => {
      E.value = e;
    }), y(E, (e) => {
      C("update:customData", e);
    }), y(() => a.modifications, (e) => {
      W.value.increment(e), i.value = e;
    }, { deep: !0 }), y(i, (e) => {
      Ee(), W.value.increment(e), ue.value === U.Modifications && (I.value = W.value.changed()), C("update:modifications", e);
    }, { deep: !0 });
    const v = p(ee(a.createButton, g.defaultCreateButton)), q = p(ee(a.updateButton, g.defaultUpdateButton)), T = p(ee(a.dropButton, g.defaultDropButton)), ye = p(ee(a.editModeButton, g.defaultEditModeButton)), Me = p(ee(a.groupButton, g.defaultGroupButton));
    y(() => a.createButton, (e) => {
      v.value = ee(e, g.defaultCreateButton);
    }, { deep: !0 }), y(() => a.updateButton, (e) => {
      q.value = ee(e, g.defaultUpdateButton);
    }, { deep: !0 }), y(() => a.dropButton, (e) => {
      T.value = ee(e, g.defaultDropButton);
    }, { deep: !0 }), y(() => a.editModeButton, (e) => {
      ye.value = ee(e, g.defaultEditModeButton);
    }, { deep: !0 });
    const Be = async () => {
      var e, o, X;
      V("fetchItem"), c.value = !0, Y.value = -1, K.value = !1, typeof ((e = a.events) == null ? void 0 : e.httpStart) == "function" && a.events.httpStart();
      try {
        const A = await it(a.readResource, a.readData);
        if (V("fetchItem -> response", A), c.value = !1, Y.value = A.httpStatus, E.value = A.custom, !A.success) {
          P.value = !1, Y.value = A.httpStatus, typeof ((o = a.events) == null ? void 0 : o.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: A
          }), C("error", A.httpStatus);
          return;
        }
        P.value = !0, r.value = A.data, i.value = Array.isArray(A.modifications) ? {} : A.modifications, b.value = A.perms, L.value.increment(r.value).turnStoredIntoOriginal(), W.value.increment(i.value).turnStoredIntoOriginal(), I.value = L.value.changed(), ae.value.turnStoredIntoOriginal(), Object.keys(i.value).length > 0 && (j.value = U.Modifications), oe.value && (Ee(), Ke(() => {
          $.value.turnStoredIntoOriginal();
        })), typeof ((X = a.events) == null ? void 0 : X.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: A
        }), C("read", A);
      } catch {
        c.value = !1, P.value = !1, Y.value = 404, C("error", 404);
        return;
      }
    };
    y(G, (e) => {
      e && Ke(() => G.value = !1);
    }), y(() => a.modelValue, (e) => {
      r.value = e, L.value.increment(e);
    }, { deep: !0 }), y(r, (e) => {
      if (V("item updated ->", r.value), typeof a.beforeEmitUpdate == "function") {
        V("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(r.value);
        V("item updated -> override with: ", o), typeof o == "object" && (r.value = o);
      }
      oe.value && Ee(), C("update:modelValue", r.value), V("item updated -> update dataState"), L.value.increment(e), ue.value === U.Current && (I.value = L.value.changed()), G.value = !0;
    }, { deep: !0 }), y(b, () => C("perms", b.value)), y(I, (e) => {
      C("modified-data", e);
    }), y(() => a.readData, (e) => {
      ae.value.increment(e), ae.value.changed() && Be();
    }), y(() => a.editing, (e) => {
      V("editing updated -> updating editMode", e), S.value = e;
    }), y(S, (e) => {
      V("editMode updated -> emit update", e), C("update:editing", e);
    });
    const Pe = p(void 0), Ee = () => {
      oe.value && (Pe.value = lt(r.value, i.value, fe.value));
    };
    ot(() => {
      a.readResource && !z.value ? Be() : (z.value, P.value = !0, S.value = !0, c.value = !1, L.value.increment(r.value).turnStoredIntoOriginal(), I.value = L.value.changed());
    });
    const Ve = (e, o) => {
      if (o) {
        if (c.value = !1, typeof e < "u" && (Y.value = e.httpStatus, !e.success))
          return K.value = !0, C("error", e.httpStatus), !1;
        K.value = !0;
      }
      return !0;
    }, Xe = (e, o) => {
      if (V("doAutoReloadId -> enter: ", e), typeof e < "u" && e.autoReloadId)
        if (V("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), typeof o < "u") {
          let X = o;
          typeof o == "function" && (X = o(e.autoReloadId)), u.push(X);
        } else ke.value ? (V("doAutoReloadId -> insideModal: ", a), pt(a.modalConfig.modalName, a.modalConfig.modalKey, e.autoReloadId)) : (V("doAutoReloadId -> outsideModal"), a.readData.id = e.autoReloadId, V("doAutoReloadId -> turning off create mode"), z.value = !1, Be());
    }, Ie = (e, o) => {
      if (V("onCreate"), !Ve(o, v.value.resource)) {
        a.notificationType === ne.Toast && ve({
          text: g.defaultCreateErrorText,
          details: g.defaultCreateErrorDetails,
          icon: g.defaultCreateErrorIcon,
          positionX: se.Right
        });
        return;
      }
      re.value = !0, V("onCreate -> turn stored data into original"), L.value.increment(r.value).turnStoredIntoOriginal(), W.value.turnStoredIntoOriginal(), a.notificationType === ne.Toast && ve({
        text: g.defaultCreateSuccessText,
        details: g.defaultCreateSuccessDetails,
        icon: g.defaultCreateSuccessIcon,
        positionX: se.Right
      }), Xe(o, a.redirectOnCreate), V("onCreate -> beforeEmitCreate"), C("create", o);
    }, Te = (e, o) => {
      if (V("onUpdate"), !Ve(o, q.value.resource)) {
        a.notificationType === ne.Toast && ve({
          text: g.defaultUpdateErrorText,
          details: g.defaultUpdateErrorDetails,
          icon: g.defaultUpdateErrorIcon,
          positionX: se.Right
        });
        return;
      }
      V("onUpdate -> turn stored data into original"), L.value.turnStoredIntoOriginal(), W.value.turnStoredIntoOriginal(), a.notificationType === ne.Toast && ve({
        text: g.defaultUpdateSuccessText,
        details: g.defaultUpdateSuccessDetails,
        icon: g.defaultUpdateSuccessIcon,
        positionX: se.Right
      }), Xe(o), C("update", o);
    }, Re = (e, o) => {
      if (V("onDrop"), !Ve(o, T.value.resource)) {
        a.notificationType === ne.Toast && ve({
          text: g.defaultDropErrorText,
          details: g.defaultDropErrorDetails,
          icon: g.defaultDropErrorIcon,
          positionX: se.Right
        });
        return;
      }
      if (a.notificationType === ne.Toast && ve({
        text: g.defaultDropSuccessText,
        details: g.defaultDropSuccessDetails,
        icon: g.defaultDropSuccessIcon,
        positionX: se.Right
      }), C("drop", o), a.view === Ge.Modal && (V("onDrop -> close modal"), vt(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
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
        L.value.increment(r.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => L.value.changed()
    });
    const Je = B(() => {
      var e, o, X;
      return De.value ? oe.value ? Q.value ? (e = a.modalConfig) == null ? void 0 : e.closeConfirm : "" : ue.value === U.Modifications ? W.value.changed() ? (o = a.modalConfig) == null ? void 0 : o.closeConfirm : "" : L.value.changed() ? (X = a.modalConfig) == null ? void 0 : X.closeConfirm : "" : "";
    }), Qe = (e) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...e,
          itemCreated: re.value
        });
    }, Ae = B(() => a.title.startsWith("__:") ? String(ft(a.title.substring(3))) : a.title), Ye = B(() => c.value ? !1 : Ae.value.length > 0 || !!M["post-title"]), Ze = B(() => c.value ? !1 : typeof a.header == "object" && Object.keys(a.header).length > 0), ke = B(() => a.view === Ge.Modal), He = B(() => ke.value ? "lkt-modal" : "section"), Ce = B(() => {
      var e, o;
      return a.mode !== O.Update || !Z.value || !a.enabledSaveWithoutChanges && !I.value || oe.value && (!te.value || !Q.value) ? !1 : typeof ((e = q.value) == null ? void 0 : e.disabled) == "function" ? !q.value.disabled({
        prop: r.value
      }) : typeof ((o = q.value) == null ? void 0 : o.disabled) == "boolean" ? !q.value.disabled : !0;
    }), he = B(() => {
      var e, o;
      return a.mode !== O.Create || !d.value || !a.enabledSaveWithoutChanges && !I.value || oe.value && !te.value && !Q.value ? !1 : typeof ((e = v.value) == null ? void 0 : e.disabled) == "function" ? !v.value.disabled({
        prop: r.value
      }) : typeof ((o = v.value) == null ? void 0 : o.disabled) == "boolean" ? !v.value.disabled : !0;
    }), Oe = B(() => {
      var e, o;
      return _.value ? typeof ((e = T.value) == null ? void 0 : e.disabled) == "function" ? !T.value.disabled({
        prop: r.value
      }) : typeof ((o = T.value) == null ? void 0 : o.disabled) == "boolean" ? !T.value.disabled : !0 : !1;
    }), _e = B(() => He.value === "lkt-modal" ? {
      title: a.title,
      item: r.value,
      ...a.modalConfig,
      beforeClose: Qe,
      closeConfirm: Je.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: he.value || Ce.value
      } : !1
    } : {}), oe = B(() => typeof fe.value == "object" && Object.keys(fe.value).length > 0), Le = B(() => Object.keys(i.value).length === 0 ? [] : a.modificationViews), ue = B(() => Object.keys(i.value).length === 0 ? U.Current : U.Modifications), De = B(() => d.value || Z.value || _.value), xe = B(() => oe.value ? rt(fe.value) : []), fe = B(() => typeof a.form == "function" ? a.form({
      mode: a.mode,
      view: j.value,
      item: r.value,
      modifications: i.value,
      editing: S.value
    }) : a.form);
    return (e, o) => {
      const X = me("lkt-header"), A = me("lkt-http-info"), et = me("lkt-form"), tt = me("lkt-loader");
      return n(), m(nt(He.value), f(_e.value, { class: "lkt-item-crud" }), ce({
        default: J(() => [
          !ke.value && Ze.value ? (n(), m(X, Se(f({ key: 0 }, e.header)), null, 16)) : !ke.value && Ye.value ? (n(), w("header", Bt, [
            s(M)["pre-title"] ? (n(), w("div", kt, [
              R(e.$slots, "pre-title", {
                item: r.value,
                loading: c.value
              })
            ])) : k("", !0),
            Ae.value.length > 0 ? (n(), w("h1", Ct, ut(Ae.value), 1)) : k("", !0),
            s(M)["post-title"] ? (n(), w("div", ht, [
              R(e.$slots, "post-title", {
                item: r.value,
                loading: c.value
              })
            ])) : k("", !0)
          ])) : k("", !0),
          e.buttonNavPosition === s(je).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) && De.value ? (n(), m(Fe, {
            key: 2,
            ref_key: "buttonNav",
            ref: t,
            loading: c.value,
            "onUpdate:loading": o[3] || (o[3] = (l) => c.value = l),
            editing: S.value,
            "onUpdate:editing": o[4] || (o[4] = (l) => S.value = l),
            "picked-modification-view": j.value,
            "onUpdate:pickedModificationView": o[5] || (o[5] = (l) => j.value = l),
            item: r.value,
            modifications: i.value,
            mode: e.mode,
            view: e.view,
            grouped: e.groupButton !== !1,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": v.value,
            "update-button": q.value,
            "drop-button": T.value,
            "edit-mode-button": ye.value,
            "group-button": Me.value,
            "data-changed": I.value,
            "http-success-read": P.value,
            "can-create": d.value,
            "can-update": Z.value,
            "can-drop": _.value,
            "can-switch-edit-mode": de.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": he.value,
            "able-to-update": Ce.value,
            "able-to-drop": Oe.value,
            perms: b.value,
            "modification-view": Le.value,
            "editable-view": ue.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            onCreate: Ie,
            onSave: Te,
            onDrop: Re
          }, ce({ _: 2 }, [
            s(M)["prev-buttons-ever"] ? {
              name: "prev-buttons-ever",
              fn: J(({ canUpdate: l, canDrop: ie, perms: le }) => [
                R(e.$slots, "prev-buttons-ever", {
                  canUpdate: l,
                  canDrop: ie,
                  perms: le
                })
              ]),
              key: "0"
            } : void 0,
            s(M)["prev-buttons"] ? {
              name: "prev-buttons",
              fn: J(({ canUpdate: l, canDrop: ie, perms: le }) => [
                R(e.$slots, "prev-buttons", {
                  canUpdate: l,
                  canDrop: ie,
                  perms: le
                })
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing"])) : k("", !0),
          c.value ? k("", !0) : (n(), w("div", Dt, [
            P.value ? (n(), w("div", wt, [
              K.value && e.notificationType === s(ne).Inline ? (n(), m(A, {
                key: 0,
                code: Y.value,
                palette: Y.value === 200 ? "success" : "danger",
                quick: "",
                "can-close": "",
                onClose: o[6] || (o[6] = (l) => K.value = !1)
              }, null, 8, ["code", "palette"])) : k("", !0),
              oe.value ? (n(), m(et, f({
                key: 1,
                ref_key: "formRef",
                ref: $,
                modelValue: r.value,
                "onUpdate:modelValue": o[7] || (o[7] = (l) => r.value = l),
                modifications: i.value,
                "onUpdate:modifications": o[8] || (o[8] = (l) => i.value = l),
                valid: te.value,
                "onUpdate:valid": o[9] || (o[9] = (l) => te.value = l),
                changed: Q.value,
                "onUpdate:changed": o[10] || (o[10] = (l) => Q.value = l)
              }, {
                ...e.formUiConfig,
                form: fe.value,
                differencesTableConfig: e.differencesTableConfig,
                visibleView: j.value,
                modificationDataState: Pe.value,
                editableViews: [ue.value],
                disabled: !S.value
              }), ce({ _: 2 }, [
                H(xe.value, (l) => ({
                  name: l,
                  fn: J(({}) => [
                    R(e.$slots, l)
                  ])
                }))
              ]), 1040, ["modelValue", "modifications", "valid", "changed"])) : R(e.$slots, "item", {
                key: 2,
                item: r.value,
                loading: c.value,
                editMode: S.value,
                isCreate: z.value,
                canUpdate: Z.value,
                canDrop: _.value,
                itemBeingEdited: G.value,
                perms: b.value
              })
            ])) : e.notificationType === s(ne).Inline ? (n(), m(A, {
              key: 1,
              code: Y.value
            }, null, 8, ["code"])) : k("", !0)
          ])),
          c.value ? (n(), m(tt, { key: 4 })) : k("", !0),
          e.buttonNavPosition === s(je).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) && De.value ? (n(), m(Fe, {
            key: 5,
            ref_key: "buttonNav",
            ref: t,
            loading: c.value,
            "onUpdate:loading": o[11] || (o[11] = (l) => c.value = l),
            editing: S.value,
            "onUpdate:editing": o[12] || (o[12] = (l) => S.value = l),
            "picked-modification-view": j.value,
            "onUpdate:pickedModificationView": o[13] || (o[13] = (l) => j.value = l),
            item: r.value,
            modifications: i.value,
            mode: e.mode,
            view: e.view,
            grouped: e.groupButton !== !1,
            "button-nav-visibility": e.buttonNavVisibility,
            "create-button": v.value,
            "update-button": q.value,
            "drop-button": T.value,
            "edit-mode-button": ye.value,
            "group-button": Me.value,
            "data-changed": I.value,
            "http-success-read": P.value,
            "can-create": d.value,
            "can-update": Z.value,
            "can-drop": _.value,
            "can-switch-edit-mode": de.value,
            "group-button-as-modal-actions": e.groupButtonAsModalActions,
            "able-to-create": he.value,
            "able-to-update": Ce.value,
            "able-to-drop": Oe.value,
            perms: b.value,
            "modification-view": Le.value,
            "editable-view": ue.value,
            "nav-start-buttons": e.navStartButtons,
            "nav-start-buttons-editing": e.navStartButtonsEditing,
            "nav-end-buttons": e.navEndButtons,
            "nav-end-buttons-editing": e.navEndButtonsEditing,
            onCreate: Ie,
            onSave: Te,
            onDrop: Re
          }, ce({ _: 2 }, [
            s(M)["prev-buttons-ever"] ? {
              name: "prev-buttons-ever",
              fn: J(() => [
                R(e.$slots, "prev-buttons-ever")
              ]),
              key: "0"
            } : void 0,
            s(M)["prev-buttons"] ? {
              name: "prev-buttons-ever",
              fn: J(() => [
                R(e.$slots, "prev-buttons")
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing"])) : k("", !0)
        ]),
        _: 2
      }, [
        e.groupButton !== !1 && e.groupButtonAsModalActions && De.value ? {
          name: "header-actions",
          fn: J(() => [
            e.buttonNavPosition === s(je).Top ? (n(), m(Fe, {
              key: 0,
              ref_key: "buttonNav",
              ref: t,
              loading: c.value,
              "onUpdate:loading": o[0] || (o[0] = (l) => c.value = l),
              editing: S.value,
              "onUpdate:editing": o[1] || (o[1] = (l) => S.value = l),
              "picked-modification-view": j.value,
              "onUpdate:pickedModificationView": o[2] || (o[2] = (l) => j.value = l),
              item: r.value,
              modifications: i.value,
              mode: e.mode,
              view: e.view,
              grouped: !0,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": v.value,
              "update-button": q.value,
              "drop-button": T.value,
              "edit-mode-button": ye.value,
              "group-button": Me.value,
              "data-changed": I.value,
              "http-success-read": P.value,
              "can-create": d.value,
              "can-update": Z.value,
              "can-drop": _.value,
              "can-switch-edit-mode": de.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": he.value,
              "able-to-update": Ce.value,
              "able-to-drop": Oe.value,
              perms: b.value,
              "modification-view": Le.value,
              "editable-view": ue.value,
              "nav-start-buttons": e.navStartButtons,
              "nav-start-buttons-editing": e.navStartButtonsEditing,
              "nav-end-buttons": e.navEndButtons,
              "nav-end-buttons-editing": e.navEndButtonsEditing,
              onCreate: Ie,
              onSave: Te,
              onDrop: Re
            }, ce({ _: 2 }, [
              s(M)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: J(({ canUpdate: l, canDrop: ie, perms: le }) => [
                  R(e.$slots, "prev-buttons-ever", {
                    canUpdate: l,
                    canDrop: ie,
                    perms: le
                  })
                ]),
                key: "0"
              } : void 0,
              s(M)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: J(({ canUpdate: l, canDrop: ie, perms: le }) => [
                  R(e.$slots, "prev-buttons", {
                    canUpdate: l,
                    canDrop: ie,
                    perms: le
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-create", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view", "nav-start-buttons", "nav-start-buttons-editing", "nav-end-buttons", "nav-end-buttons-editing"])) : k("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), Nt = {
  install: (N, ge = {}) => {
    N.component("lkt-item-crud") === void 0 && N.component("lkt-item-crud", St);
  }
}, jt = (N) => {
  pe.defaultSaveIcon = N;
}, Ft = (N) => {
  pe.defaultDropIcon = N;
};
export {
  $t as debugLktItemCrud,
  Nt as default,
  Ft as setItemCrudDefaultDropIcon,
  jt as setItemCrudDefaultSaveIcon
};
