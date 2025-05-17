import { defineComponent as Xe, ref as d, watch as p, useSlots as Ke, computed as g, resolveComponent as ye, createElementBlock as W, createCommentVNode as v, openBlock as c, createBlock as R, Fragment as je, renderSlot as S, withDirectives as X, mergeProps as U, normalizeProps as Ve, unref as i, createVNode as J, vShow as K, withCtx as q, mergeDefaults as Qe, nextTick as Ye, onMounted as Ze, resolveDynamicComponent as _e, createSlots as pe, createElementVNode as xe, toDisplayString as et, renderList as tt } from "vue";
import { httpCall as ot } from "lkt-http-client";
import { DataState as Te } from "lkt-data-state";
import { ModificationView as k, ItemCrudMode as T, ItemCrudButtonNavVisibility as Fe, ButtonType as Ie, TablePermission as Re, ensureButtonConfig as Q, LktSettings as s, getFormDataState as at, ItemCrudView as Pe, getFormSlotKeys as nt, ItemCrudButtonNavPosition as Ae, NotificationType as _, getDefaultValues as ut, ItemCrud as it, ToastPositionX as le } from "lkt-vue-kernel";
import { closeModal as lt, updateModalKey as dt } from "lkt-modal";
import { __ as rt } from "lkt-i18n";
import { openToast as de } from "lkt-toast";
import { useRouter as st } from "vue-router";
const ve = class ve {
};
ve.debugEnabled = !1, ve.defaultSaveIcon = "", ve.defaultDropIcon = "";
let re = ve;
const D = (...A) => {
  re.debugEnabled && console.info("[LktItemCrud] ", ...A);
}, Et = (A = !0) => {
  re.debugEnabled = A;
}, pt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, vt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, ct = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, ft = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, Ee = /* @__PURE__ */ Xe({
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
    editableView: {}
  },
  emits: [
    "update:loading",
    "update:editing",
    "update:pickedModificationView",
    "create",
    "save",
    "drop"
  ],
  setup(A, { expose: ce, emit: ke }) {
    const o = ke, n = A, C = d(n.pickedModificationView);
    p(() => n.pickedModificationView, (t) => C.value = t), p(C, (t) => o("update:pickedModificationView", t));
    const f = Ke(), r = d(null), l = d(null), m = d(n.loading);
    p(() => n.loading, (t) => m.value = t), p(m, (t) => o("update:loading", t));
    const E = d(n.editing);
    p(() => n.editing, (t) => E.value = t), p(E, (t) => o("update:editing", t));
    const b = () => {
      m.value = !0;
    }, B = () => {
      m.value = !1;
    }, Y = (t, w) => {
      typeof t > "u" || o("create", t, w);
    }, x = (t, w) => {
      typeof t > "u" || o("save", t, w);
    }, L = (t, w) => {
      typeof t > "u" || o("drop", t, w);
    }, $ = g(() => n.editableView === k.Modifications ? n.modifications : n.item);
    ce({
      doSave: () => {
        r.value && typeof r.value.click == "function" && r.value.click();
      },
      doDrop: () => {
        l.value && typeof l.value.click == "function" && l.value.click();
      }
    });
    const G = g(() => !n.canDrop || n.dropButton === !1 ? !1 : !n.canUpdate && n.canDrop ? !0 : !m.value && n.editing && n.httpSuccessRead), h = g(() => n.mode === T.Create && n.createButton === !1 || n.mode === T.Update && n.updateButton === !1 || m.value ? !1 : n.editing && n.httpSuccessRead), Z = g(() => n.editModeButton === !1 || !n.canSwitchEditMode || !n.canUpdate && !n.canDrop || !n.canUpdate && n.canDrop ? !1 : !m.value && n.mode !== T.Create && n.httpSuccessRead), H = g(() => n.buttonNavVisibility === Fe.Always || f["prev-buttons-ever"] ? !0 : n.buttonNavVisibility === Fe.Never ? !1 : h.value || G.value || Z.value), j = g(() => n.modificationView === !1 ? [] : n.modificationView === !0 ? [
      k.Current,
      k.Modifications,
      k.SplitView,
      k.Differences
    ] : Array.isArray(n.modificationView) ? n.modificationView : []), ue = g(() => {
      let t = [];
      return j.value.includes(k.Current) && t.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: C.value === k.Current,
        events: {
          click: () => {
            C.value = k.Current;
          }
        }
      }), j.value.includes(k.Modifications) && t.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: C.value === k.Modifications,
        events: {
          click: () => {
            C.value = k.Modifications;
          }
        }
      }), j.value.includes(k.SplitView) && t.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: C.value === k.SplitView,
        events: {
          click: () => {
            C.value = k.SplitView;
          }
        }
      }), j.value.includes(k.Differences) && t.push({
        text: "Differences",
        icon: "lkt-icn-balance",
        disabled: C.value === k.Differences,
        events: {
          click: () => {
            C.value = k.Differences;
          }
        }
      }), t;
    });
    return (t, w) => {
      var ie, N, F, P;
      const y = ye("lkt-button");
      return H.value ? (c(), W("div", pt, [
        t.grouped && t.groupButtonAsModalActions ? (c(), W(je, { key: 0 }, [
          Z.value ? (c(), R(y, U({ key: 0 }, t.editModeButton, {
            checked: E.value,
            "onUpdate:checked": w[0] || (w[0] = (M) => E.value = M),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : v("", !0),
          j.value.length > 0 ? (c(), R(y, Ve(U({ key: 1 }, {
            type: i(Ie).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: ue.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : v("", !0),
          i(f)["prev-buttons-ever"] ? S(t.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : v("", !0),
          i(f)["prev-buttons"] ? S(t.$slots, "prev-buttons", {
            key: 3,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : v("", !0),
          X(J(y, U({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.updateButton,
            resourceData: {
              ...(ie = t.updateButton) == null ? void 0 : ie.resourceData,
              ...$.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: b,
            onLoaded: B,
            onClick: x
          }), null, 16), [
            [K, t.mode === i(T).Update && h.value]
          ]),
          X(J(y, U({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.createButton,
            resourceData: {
              ...(N = t.createButton) == null ? void 0 : N.resourceData,
              ...$.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: b,
            onLoaded: B,
            onClick: Y
          }), null, 16), [
            [K, t.mode === i(T).Create && h.value]
          ]),
          X(J(y, U({
            ref_key: "dropButtonRef",
            ref: l
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: b,
            onLoaded: B,
            onClick: L
          }), null, 16, ["disabled"]), [
            [K, G.value && t.mode !== i(T).Create]
          ]),
          i(f).buttons ? S(t.$slots, "buttons", { key: 4 }) : v("", !0)
        ], 64)) : t.grouped ? (c(), R(y, U({
          key: 1,
          ref: "groupButton"
        }, t.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: q(() => {
            var M, ee;
            return [
              Z.value ? (c(), R(y, U({ key: 0 }, t.editModeButton, {
                checked: E.value,
                "onUpdate:checked": w[1] || (w[1] = (se) => E.value = se),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : v("", !0),
              j.value.length > 0 ? (c(), R(y, Ve(U({ key: 1 }, {
                type: i(Ie).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: ue.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : v("", !0),
              i(f)["prev-buttons-ever"] ? S(t.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : v("", !0),
              i(f)["prev-buttons"] ? S(t.$slots, "prev-buttons", {
                key: 3,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : v("", !0),
              X(J(y, U({
                ref_key: "saveButtonRef",
                ref: r
              }, {
                ...t.updateButton,
                resourceData: {
                  ...(M = t.updateButton) == null ? void 0 : M.resourceData,
                  ...$.value
                },
                disabled: !t.ableToUpdate
              }, {
                onLoading: b,
                onLoaded: B,
                onClick: x
              }), null, 16), [
                [K, t.mode === i(T).Update && h.value]
              ]),
              X(J(y, U({
                ref_key: "saveButtonRef",
                ref: r
              }, {
                ...t.createButton,
                resourceData: {
                  ...(ee = t.createButton) == null ? void 0 : ee.resourceData,
                  ...$.value
                },
                disabled: !t.ableToCreate
              }, {
                disabled: !t.ableToCreate,
                onLoading: b,
                onLoaded: B,
                onClick: Y
              }), null, 16, ["disabled"]), [
                [K, t.mode === i(T).Create && h.value]
              ]),
              X(J(y, U({
                ref_key: "dropButtonRef",
                ref: l
              }, t.dropButton, {
                disabled: !t.ableToDrop,
                onLoading: b,
                onLoaded: B,
                onClick: L
              }), null, 16, ["disabled"]), [
                [K, G.value && t.mode !== i(T).Create]
              ]),
              i(f).buttons ? S(t.$slots, "buttons", { key: 4 }) : v("", !0)
            ];
          }),
          _: 3
        }, 16)) : (c(), W(je, { key: 2 }, [
          i(f)["prev-buttons-ever"] ? X((c(), W("div", vt, [
            S(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [K, !m.value]
          ]) : v("", !0),
          i(f)["prev-buttons"] ? X((c(), W("div", ct, [
            S(t.$slots, "prev-buttons", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [K, E.value && !m.value]
          ]) : v("", !0),
          X(J(y, U({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.updateButton,
            resourceData: {
              ...(F = t.updateButton) == null ? void 0 : F.resourceData,
              ...$.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: b,
            onLoaded: B,
            onClick: x
          }), null, 16), [
            [K, t.mode === i(T).Update && h.value]
          ]),
          X(J(y, U({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.createButton,
            resourceData: {
              ...(P = t.createButton) == null ? void 0 : P.resourceData,
              ...$.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: b,
            onLoaded: B,
            onClick: Y
          }), null, 16), [
            [K, t.mode === i(T).Create && h.value]
          ]),
          X(J(y, U({
            ref_key: "dropButtonRef",
            ref: l
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: b,
            onLoaded: B,
            onClick: L
          }), null, 16, ["disabled"]), [
            [K, G.value && t.mode !== i(T).Create]
          ]),
          i(f).buttons ? X((c(), W("div", ft, [
            S(t.$slots, "buttons")
          ], 512)), [
            [K, E.value && !m.value]
          ]) : v("", !0),
          j.value.length > 0 ? (c(), R(y, Ve(U({ key: 3 }, {
            type: i(Ie).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: ue.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : v("", !0),
          Z.value ? (c(), R(y, U({ key: 4 }, t.editModeButton, {
            checked: E.value,
            "onUpdate:checked": w[2] || (w[2] = (M) => E.value = M),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : v("", !0)
        ], 64))
      ])) : v("", !0);
    };
  }
}), mt = { class: "lkt-item-crud" }, bt = {
  key: 0,
  class: "lkt-item-crud_header"
}, gt = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, yt = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, kt = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Bt = {
  key: 2,
  class: "lkt-item-crud_content"
}, Ct = {
  key: 0,
  class: "lkt-grid-1"
}, Dt = /* @__PURE__ */ Xe({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ Qe({
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
    events: {}
  }, ut(it)),
  emits: [
    "update:modelValue",
    "update:editing",
    "update:perms",
    "update:customData",
    "update:modifications",
    "update:modificationView",
    "read",
    "create",
    "update",
    "drop",
    "before-save",
    "perms",
    "error",
    "modified-data"
  ],
  setup(A, { expose: ce, emit: ke }) {
    const o = A, n = st(), C = Ke(), f = ke, r = d(!0), l = d(o.modelValue), m = d(o.modifications), E = d(o.customData), b = d(o.perms), B = d(o.editing), Y = d(!1), x = d(!1), L = d(!1), $ = d(!1), z = d(200), I = d(new Te(l.value, o.dataStateConfig)), G = d(new Te(m.value, o.dataStateConfig)), h = d(!1), Z = d(new Te(o.readData)), H = d(o.mode === T.Create), j = d(!1), ue = d(!1), t = d(null), w = g(() => !H.value && Array.isArray(b.value) && b.value.includes(Re.Update)), y = g(() => !H.value && Array.isArray(b.value) && b.value.includes(Re.Drop)), ie = g(() => !H.value && Array.isArray(b.value) && b.value.includes(Re.SwitchEditMode)), N = d(o.visibleView);
    p(() => o.visibleView, (e) => {
      N.value = e;
    }), p(N, (e) => {
      f("update:modificationView", e);
    }), p(() => o.mode, (e) => {
      H.value = e === T.Create;
    }), p(() => o.perms, (e) => {
      b.value = e;
    }), p(b, (e) => {
      f("update:perms", e);
    }), p(() => o.customData, (e) => {
      E.value = e;
    }), p(E, (e) => {
      f("update:customData", e);
    }), p(() => o.modifications, (e) => {
      G.value.increment(e), m.value = e;
    }, { deep: !0 }), p(m, (e) => {
      Le(), G.value.increment(e), oe.value === k.Modifications && (h.value = G.value.changed()), f("update:modifications", e);
    }, { deep: !0 });
    const F = d(Q(o.createButton, s.defaultCreateButton)), P = d(Q(o.updateButton, s.defaultUpdateButton)), M = d(Q(o.dropButton, s.defaultDropButton)), ee = d(Q(o.editModeButton, s.defaultEditModeButton)), se = d(Q(o.groupButton, s.defaultGroupButton));
    p(() => o.createButton, (e) => {
      F.value = Q(e, s.defaultCreateButton);
    }, { deep: !0 }), p(() => o.updateButton, (e) => {
      P.value = Q(e, s.defaultUpdateButton);
    }, { deep: !0 }), p(() => o.dropButton, (e) => {
      M.value = Q(e, s.defaultDropButton);
    }, { deep: !0 }), p(() => o.editModeButton, (e) => {
      ee.value = Q(e, s.defaultEditModeButton);
    }, { deep: !0 });
    const fe = async () => {
      var e, a, O;
      D("fetchItem"), r.value = !0, z.value = -1, $.value = !1, typeof ((e = o.events) == null ? void 0 : e.httpStart) == "function" && o.events.httpStart();
      try {
        const V = await ot(o.readResource, o.readData);
        if (D("fetchItem -> response", V), r.value = !1, z.value = V.httpStatus, E.value = V.custom, !V.success) {
          L.value = !1, z.value = V.httpStatus, typeof ((a = o.events) == null ? void 0 : a.httpEnd) == "function" && o.events.httpEnd({
            httpResponse: V
          }), f("error", V.httpStatus);
          return;
        }
        L.value = !0, l.value = V.data, m.value = Array.isArray(V.modifications) ? {} : V.modifications, b.value = V.perms, I.value.increment(l.value).turnStoredIntoOriginal(), G.value.increment(m.value).turnStoredIntoOriginal(), h.value = I.value.changed(), Z.value.turnStoredIntoOriginal(), Object.keys(m.value).length > 0 && (N.value = k.Modifications), typeof ((O = o.events) == null ? void 0 : O.httpEnd) == "function" && o.events.httpEnd({
          httpResponse: V
        }), f("read", V);
      } catch {
        r.value = !1, L.value = !1, z.value = 404, f("error", 404);
        return;
      }
    };
    p(j, (e) => {
      e && Ye(() => j.value = !1);
    }), p(() => o.modelValue, (e) => {
      l.value = e, I.value.increment(e);
    }, { deep: !0 }), p(l, (e) => {
      if (D("item updated ->", l.value), typeof o.beforeEmitUpdate == "function") {
        D("item updated -> has beforeEmitUpdate");
        let a = o.beforeEmitUpdate(l.value);
        D("item updated -> override with: ", a), typeof a == "object" && (l.value = a);
      }
      te.value && Le(), f("update:modelValue", l.value), D("item updated -> update dataState"), I.value.increment(e), oe.value === k.Current && (h.value = I.value.changed()), j.value = !0;
    }, { deep: !0 }), p(b, () => f("perms", b.value)), p(h, (e) => {
      f("modified-data", e);
    }), p(() => o.readData, (e) => {
      Z.value.increment(e), Z.value.changed() && fe();
    }), p(() => o.editing, (e) => {
      D("editing updated -> updating editMode", e), B.value = e;
    }), p(B, (e) => {
      D("editMode updated -> emit update", e), f("update:editing", e);
    });
    const Oe = d(void 0), Le = () => {
      te.value && (Oe.value = at(l.value, m.value, o.form));
    };
    Ze(() => {
      o.readResource && !H.value ? fe() : (H.value, L.value = !0, B.value = !0, r.value = !1, I.value.increment(l.value).turnStoredIntoOriginal(), h.value = I.value.changed());
    });
    const Be = (e, a) => {
      if (a) {
        if (r.value = !1, typeof e < "u" && (z.value = e.httpStatus, !e.success))
          return $.value = !0, f("error", e.httpStatus), !1;
        $.value = !0;
      }
      return !0;
    }, Ne = (e, a) => {
      if (D("doAutoReloadId -> enter: ", e), typeof e < "u" && e.autoReloadId)
        if (D("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), typeof a < "u") {
          let O = a;
          typeof a == "function" && (O = a(e.autoReloadId)), n.push(O);
        } else Se.value ? (D("doAutoReloadId -> insideModal: ", o), dt(o.modalConfig.modalName, o.modalConfig.modalKey, e.autoReloadId)) : (D("doAutoReloadId -> outsideModal"), o.readData.id = e.autoReloadId, D("doAutoReloadId -> turning off create mode"), H.value = !1, fe());
    }, Ce = (e, a) => {
      if (D("onCreate"), !Be(a, F.value.resource)) {
        o.notificationType === _.Toast && de({
          text: s.defaultCreateErrorText,
          details: s.defaultCreateErrorDetails,
          icon: s.defaultCreateErrorIcon,
          positionX: le.Right
        });
        return;
      }
      ue.value = !0, D("onCreate -> turn stored data into original"), I.value.increment(l.value).turnStoredIntoOriginal(), o.notificationType === _.Toast && de({
        text: s.defaultCreateSuccessText,
        details: s.defaultCreateSuccessDetails,
        icon: s.defaultCreateSuccessIcon,
        positionX: le.Right
      }), Ne(a, o.redirectOnCreate), D("onCreate -> beforeEmitCreate"), f("create", a);
    }, De = (e, a) => {
      if (D("onUpdate"), !Be(a, P.value.resource)) {
        o.notificationType === _.Toast && de({
          text: s.defaultUpdateErrorText,
          details: s.defaultUpdateErrorDetails,
          icon: s.defaultUpdateErrorIcon,
          positionX: le.Right
        });
        return;
      }
      D("onUpdate -> turn stored data into original"), I.value.turnStoredIntoOriginal(), o.notificationType === _.Toast && de({
        text: s.defaultUpdateSuccessText,
        details: s.defaultUpdateSuccessDetails,
        icon: s.defaultUpdateSuccessIcon,
        positionX: le.Right
      }), Ne(a), f("update", a);
    }, he = (e, a) => {
      if (D("onDrop"), !Be(a, M.value.resource)) {
        o.notificationType === _.Toast && de({
          text: s.defaultDropErrorText,
          details: s.defaultDropErrorDetails,
          icon: s.defaultDropErrorIcon,
          positionX: le.Right
        });
        return;
      }
      if (o.notificationType === _.Toast && de({
        text: s.defaultDropSuccessText,
        details: s.defaultDropSuccessDetails,
        icon: s.defaultDropSuccessIcon,
        positionX: le.Right
      }), f("drop", a), o.view === Pe.Modal && (D("onDrop -> close modal"), lt(o.modalConfig.modalName, o.modalConfig.modalKey)), typeof o.redirectOnDrop < "u") {
        let O = o.redirectOnDrop;
        typeof o.redirectOnDrop == "function" && (O = o.redirectOnDrop()), n.push(O);
      }
    };
    ce({
      doDrop: () => {
        t.value && t.value.doDrop();
      },
      doRefresh: fe,
      doSave: () => {
        t.value && t.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        I.value.increment(l.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => I.value.changed()
    });
    const We = g(() => {
      var e, a, O;
      return ge.value ? te.value ? x.value ? (e = o.modalConfig) == null ? void 0 : e.closeConfirm : "" : oe.value === k.Modifications ? G.value.changed() ? (a = o.modalConfig) == null ? void 0 : a.closeConfirm : "" : I.value.changed() ? (O = o.modalConfig) == null ? void 0 : O.closeConfirm : "" : "";
    }), He = (e) => {
      var a;
      if (typeof ((a = o.modalConfig) == null ? void 0 : a.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...e,
          itemCreated: ue.value
        });
    }, we = g(() => o.title.startsWith("__:") ? String(rt(o.title.substring(3))) : o.title), Ge = g(() => r.value ? !1 : we.value.length > 0 || !!C["post-title"]), Se = g(() => o.view === Pe.Modal), $e = g(() => Se.value ? "lkt-modal" : "section"), me = g(() => {
      var e, a;
      return o.mode !== T.Update || !w.value || !o.enabledSaveWithoutChanges && !h.value || te.value && !Y.value ? !1 : typeof ((e = P.value) == null ? void 0 : e.disabled) == "function" ? !P.value.disabled({
        prop: l.value
      }) : typeof ((a = P.value) == null ? void 0 : a.disabled) == "boolean" ? !P.value.disabled : !0;
    }), be = g(() => {
      var e, a;
      return o.mode !== T.Create || !o.enabledSaveWithoutChanges && !h.value || te.value && !Y.value ? !1 : typeof ((e = F.value) == null ? void 0 : e.disabled) == "function" ? !F.value.disabled({
        prop: l.value
      }) : typeof ((a = F.value) == null ? void 0 : a.disabled) == "boolean" ? !F.value.disabled : !0;
    }), Ue = g(() => {
      var e, a;
      return y.value ? typeof ((e = M.value) == null ? void 0 : e.disabled) == "function" ? !M.value.disabled({
        prop: l.value
      }) : typeof ((a = M.value) == null ? void 0 : a.disabled) == "boolean" ? !M.value.disabled : !0 : !1;
    }), qe = g(() => $e.value === "lkt-modal" ? {
      title: o.title,
      item: l.value,
      ...o.modalConfig,
      beforeClose: He,
      closeConfirm: We.value,
      headerActionsButton: o.groupButton !== !1 ? {
        dot: be.value || me.value
      } : !1
    } : {}), te = g(() => typeof o.form == "object" && Object.keys(o.form).length > 0), Me = g(() => Object.keys(m.value).length === 0 ? [] : o.modificationViews), oe = g(() => Object.keys(m.value).length === 0 ? k.Current : k.Modifications), ge = g(() => H.value || w.value || y.value), ze = g(() => te.value ? nt(o.form) : []);
    return (e, a) => {
      const O = ye("lkt-http-info"), V = ye("lkt-form"), Je = ye("lkt-loader");
      return c(), R(_e($e.value), U(qe.value, { class: "lkt-item-crud" }), pe({
        default: q(() => [
          xe("article", mt, [
            !Se.value && Ge.value ? (c(), W("header", bt, [
              i(C)["pre-title"] ? (c(), W("div", gt, [
                S(e.$slots, "pre-title", {
                  item: l.value,
                  loading: r.value
                })
              ])) : v("", !0),
              we.value.length > 0 ? (c(), W("h1", yt, et(we.value), 1)) : v("", !0),
              i(C)["post-title"] ? (c(), W("div", kt, [
                S(e.$slots, "post-title", {
                  item: l.value,
                  loading: r.value
                })
              ])) : v("", !0)
            ])) : v("", !0),
            e.buttonNavPosition === i(Ae).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) && ge.value ? (c(), R(Ee, {
              key: 1,
              ref_key: "buttonNav",
              ref: t,
              loading: r.value,
              "onUpdate:loading": a[3] || (a[3] = (u) => r.value = u),
              editing: B.value,
              "onUpdate:editing": a[4] || (a[4] = (u) => B.value = u),
              "picked-modification-view": N.value,
              "onUpdate:pickedModificationView": a[5] || (a[5] = (u) => N.value = u),
              item: l.value,
              modifications: m.value,
              mode: e.mode,
              view: e.view,
              grouped: e.groupButton !== !1,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": F.value,
              "update-button": P.value,
              "drop-button": M.value,
              "edit-mode-button": ee.value,
              "group-button": se.value,
              "data-changed": h.value,
              "http-success-read": L.value,
              "can-update": w.value,
              "can-drop": y.value,
              "can-switch-edit-mode": ie.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": be.value,
              "able-to-update": me.value,
              "able-to-drop": Ue.value,
              perms: b.value,
              "modification-view": Me.value,
              "editable-view": oe.value,
              onCreate: Ce,
              onSave: De,
              onDrop: he
            }, pe({ _: 2 }, [
              i(C)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: q(({ canUpdate: u, canDrop: ae, perms: ne }) => [
                  S(e.$slots, "prev-buttons-ever", {
                    canUpdate: u,
                    canDrop: ae,
                    perms: ne
                  })
                ]),
                key: "0"
              } : void 0,
              i(C)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: q(({ canUpdate: u, canDrop: ae, perms: ne }) => [
                  S(e.$slots, "prev-buttons", {
                    canUpdate: u,
                    canDrop: ae,
                    perms: ne
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : v("", !0),
            r.value ? v("", !0) : (c(), W("div", Bt, [
              L.value ? (c(), W("div", Ct, [
                $.value && e.notificationType === i(_).Inline ? (c(), R(O, {
                  key: 0,
                  code: z.value,
                  palette: z.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: a[6] || (a[6] = (u) => $.value = !1)
                }, null, 8, ["code", "palette"])) : v("", !0),
                te.value ? (c(), R(V, U({
                  key: 1,
                  modelValue: l.value,
                  "onUpdate:modelValue": a[7] || (a[7] = (u) => l.value = u),
                  modifications: m.value,
                  "onUpdate:modifications": a[8] || (a[8] = (u) => m.value = u),
                  valid: Y.value,
                  "onUpdate:valid": a[9] || (a[9] = (u) => Y.value = u),
                  changed: x.value,
                  "onUpdate:changed": a[10] || (a[10] = (u) => x.value = u)
                }, {
                  ...e.formUiConfig,
                  form: e.form,
                  differencesTableConfig: e.differencesTableConfig,
                  visibleView: N.value,
                  modificationDataState: Oe.value,
                  editableViews: [oe.value],
                  disabled: !B.value
                }), pe({ _: 2 }, [
                  tt(ze.value, (u) => ({
                    name: u,
                    fn: q(({}) => [
                      S(e.$slots, u)
                    ])
                  }))
                ]), 1040, ["modelValue", "modifications", "valid", "changed"])) : S(e.$slots, "item", {
                  key: 2,
                  item: l.value,
                  loading: r.value,
                  editMode: B.value,
                  isCreate: H.value,
                  canUpdate: w.value,
                  canDrop: y.value,
                  itemBeingEdited: j.value,
                  perms: b.value
                })
              ])) : e.notificationType === i(_).Inline ? (c(), R(O, {
                key: 1,
                code: z.value
              }, null, 8, ["code"])) : v("", !0)
            ])),
            r.value ? (c(), R(Je, { key: 3 })) : v("", !0),
            e.buttonNavPosition === i(Ae).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) && ge.value ? (c(), R(Ee, {
              key: 4,
              ref_key: "buttonNav",
              ref: t,
              loading: r.value,
              "onUpdate:loading": a[11] || (a[11] = (u) => r.value = u),
              editing: B.value,
              "onUpdate:editing": a[12] || (a[12] = (u) => B.value = u),
              "picked-modification-view": N.value,
              "onUpdate:pickedModificationView": a[13] || (a[13] = (u) => N.value = u),
              item: l.value,
              modifications: m.value,
              mode: e.mode,
              view: e.view,
              grouped: e.groupButton !== !1,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": F.value,
              "update-button": P.value,
              "drop-button": M.value,
              "edit-mode-button": ee.value,
              "group-button": se.value,
              "data-changed": h.value,
              "http-success-read": L.value,
              "can-update": w.value,
              "can-drop": y.value,
              "can-switch-edit-mode": ie.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": be.value,
              "able-to-update": me.value,
              "able-to-drop": Ue.value,
              perms: b.value,
              "modification-view": Me.value,
              "editable-view": oe.value,
              onCreate: Ce,
              onSave: De,
              onDrop: he
            }, pe({ _: 2 }, [
              i(C)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: q(() => [
                  S(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              i(C)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: q(() => [
                  S(e.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : v("", !0)
          ])
        ]),
        _: 2
      }, [
        e.groupButton !== !1 && e.groupButtonAsModalActions && ge.value ? {
          name: "header-actions",
          fn: q(() => [
            e.buttonNavPosition === i(Ae).Top ? (c(), R(Ee, {
              key: 0,
              ref_key: "buttonNav",
              ref: t,
              loading: r.value,
              "onUpdate:loading": a[0] || (a[0] = (u) => r.value = u),
              editing: B.value,
              "onUpdate:editing": a[1] || (a[1] = (u) => B.value = u),
              "picked-modification-view": N.value,
              "onUpdate:pickedModificationView": a[2] || (a[2] = (u) => N.value = u),
              item: l.value,
              modifications: m.value,
              mode: e.mode,
              view: e.view,
              grouped: !0,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": F.value,
              "update-button": P.value,
              "drop-button": M.value,
              "edit-mode-button": ee.value,
              "group-button": se.value,
              "data-changed": h.value,
              "http-success-read": L.value,
              "can-update": w.value,
              "can-drop": y.value,
              "can-switch-edit-mode": ie.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": be.value,
              "able-to-update": me.value,
              "able-to-drop": Ue.value,
              perms: b.value,
              "modification-view": Me.value,
              "editable-view": oe.value,
              onCreate: Ce,
              onSave: De,
              onDrop: he
            }, pe({ _: 2 }, [
              i(C)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: q(({ canUpdate: u, canDrop: ae, perms: ne }) => [
                  S(e.$slots, "prev-buttons-ever", {
                    canUpdate: u,
                    canDrop: ae,
                    perms: ne
                  })
                ]),
                key: "0"
              } : void 0,
              i(C)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: q(({ canUpdate: u, canDrop: ae, perms: ne }) => [
                  S(e.$slots, "prev-buttons", {
                    canUpdate: u,
                    canDrop: ae,
                    perms: ne
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : v("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), Ot = {
  install: (A, ce = {}) => {
    A.component("lkt-item-crud") === void 0 && A.component("lkt-item-crud", Dt);
  }
}, Lt = (A) => {
  re.defaultSaveIcon = A;
}, Nt = (A) => {
  re.defaultDropIcon = A;
};
export {
  Et as debugLktItemCrud,
  Ot as default,
  Nt as setItemCrudDefaultDropIcon,
  Lt as setItemCrudDefaultSaveIcon
};
