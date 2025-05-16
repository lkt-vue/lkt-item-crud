import { defineComponent as Xe, ref as d, watch as p, useSlots as We, computed as k, resolveComponent as ye, createElementBlock as H, createCommentVNode as v, openBlock as c, createBlock as R, Fragment as je, renderSlot as U, withDirectives as X, mergeProps as S, normalizeProps as Ve, unref as u, createVNode as z, vShow as W, withCtx as Q, mergeDefaults as Je, nextTick as Qe, onMounted as Ye, resolveDynamicComponent as Ze, createSlots as ge, createElementVNode as _e, toDisplayString as xe } from "vue";
import { httpCall as et } from "lkt-http-client";
import { DataState as Te } from "lkt-data-state";
import { ModificationView as y, ItemCrudMode as T, ItemCrudButtonNavVisibility as Fe, ButtonType as Ie, TablePermission as Re, ensureButtonConfig as J, LktSettings as s, getFormDataState as tt, ItemCrudView as Pe, ItemCrudButtonNavPosition as Ae, NotificationType as _, getDefaultValues as ot, ItemCrud as at, ToastPositionX as le } from "lkt-vue-kernel";
import { closeModal as nt, updateModalKey as it } from "lkt-modal";
import { __ as ut } from "lkt-i18n";
import { openToast as de } from "lkt-toast";
import { useRouter as lt } from "vue-router";
const pe = class pe {
};
pe.debugEnabled = !1, pe.defaultSaveIcon = "", pe.defaultDropIcon = "";
let re = pe;
const D = (...A) => {
  re.debugEnabled && console.info("[LktItemCrud] ", ...A);
}, It = (A = !0) => {
  re.debugEnabled = A;
}, dt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, rt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, st = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, pt = {
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
  setup(A, { expose: ve, emit: ke }) {
    const o = ke, n = A, C = d(n.pickedModificationView);
    p(() => n.pickedModificationView, (t) => C.value = t), p(C, (t) => o("update:pickedModificationView", t));
    const f = We(), r = d(null), l = d(null), m = d(n.loading);
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
    }, $ = k(() => n.editableView === y.Modifications ? n.modifications : n.item);
    ve({
      doSave: () => {
        r.value && typeof r.value.click == "function" && r.value.click();
      },
      doDrop: () => {
        l.value && typeof l.value.click == "function" && l.value.click();
      }
    });
    const G = k(() => !n.canDrop || n.dropButton === !1 ? !1 : !n.canUpdate && n.canDrop ? !0 : !m.value && n.editing && n.httpSuccessRead), h = k(() => n.mode === T.Create && n.createButton === !1 || n.mode === T.Update && n.updateButton === !1 || m.value ? !1 : n.editing && n.httpSuccessRead), Z = k(() => n.editModeButton === !1 || !n.canSwitchEditMode || !n.canUpdate && !n.canDrop || !n.canUpdate && n.canDrop ? !1 : !m.value && n.mode !== T.Create && n.httpSuccessRead), K = k(() => n.buttonNavVisibility === Fe.Always || f["prev-buttons-ever"] ? !0 : n.buttonNavVisibility === Fe.Never ? !1 : h.value || G.value || Z.value), j = k(() => n.modificationView === !1 ? [] : n.modificationView === !0 ? [
      y.Current,
      y.Modifications,
      y.SplitView,
      y.Differences
    ] : Array.isArray(n.modificationView) ? n.modificationView : []), ne = k(() => {
      let t = [];
      return j.value.includes(y.Current) && t.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: C.value === y.Current,
        events: {
          click: () => {
            C.value = y.Current;
          }
        }
      }), j.value.includes(y.Modifications) && t.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: C.value === y.Modifications,
        events: {
          click: () => {
            C.value = y.Modifications;
          }
        }
      }), j.value.includes(y.SplitView) && t.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: C.value === y.SplitView,
        events: {
          click: () => {
            C.value = y.SplitView;
          }
        }
      }), j.value.includes(y.Differences) && t.push({
        text: "Differences",
        icon: "lkt-icn-balance",
        disabled: C.value === y.Differences,
        events: {
          click: () => {
            C.value = y.Differences;
          }
        }
      }), t;
    });
    return (t, w) => {
      var ie, N, F, P;
      const g = ye("lkt-button");
      return K.value ? (c(), H("div", dt, [
        t.grouped && t.groupButtonAsModalActions ? (c(), H(je, { key: 0 }, [
          Z.value ? (c(), R(g, S({ key: 0 }, t.editModeButton, {
            checked: E.value,
            "onUpdate:checked": w[0] || (w[0] = (M) => E.value = M),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : v("", !0),
          j.value.length > 0 ? (c(), R(g, Ve(S({ key: 1 }, {
            type: u(Ie).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: ne.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : v("", !0),
          u(f)["prev-buttons-ever"] ? U(t.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : v("", !0),
          u(f)["prev-buttons"] ? U(t.$slots, "prev-buttons", {
            key: 3,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : v("", !0),
          X(z(g, S({
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
            [W, t.mode === u(T).Update && h.value]
          ]),
          X(z(g, S({
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
            [W, t.mode === u(T).Create && h.value]
          ]),
          X(z(g, S({
            ref_key: "dropButtonRef",
            ref: l
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: b,
            onLoaded: B,
            onClick: L
          }), null, 16, ["disabled"]), [
            [W, G.value && t.mode !== u(T).Create]
          ]),
          u(f).buttons ? U(t.$slots, "buttons", { key: 4 }) : v("", !0)
        ], 64)) : t.grouped ? (c(), R(g, S({
          key: 1,
          ref: "groupButton"
        }, t.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: Q(() => {
            var M, ee;
            return [
              Z.value ? (c(), R(g, S({ key: 0 }, t.editModeButton, {
                checked: E.value,
                "onUpdate:checked": w[1] || (w[1] = (se) => E.value = se),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : v("", !0),
              j.value.length > 0 ? (c(), R(g, Ve(S({ key: 1 }, {
                type: u(Ie).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: ne.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : v("", !0),
              u(f)["prev-buttons-ever"] ? U(t.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : v("", !0),
              u(f)["prev-buttons"] ? U(t.$slots, "prev-buttons", {
                key: 3,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : v("", !0),
              X(z(g, S({
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
                [W, t.mode === u(T).Update && h.value]
              ]),
              X(z(g, S({
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
                [W, t.mode === u(T).Create && h.value]
              ]),
              X(z(g, S({
                ref_key: "dropButtonRef",
                ref: l
              }, t.dropButton, {
                disabled: !t.ableToDrop,
                onLoading: b,
                onLoaded: B,
                onClick: L
              }), null, 16, ["disabled"]), [
                [W, G.value && t.mode !== u(T).Create]
              ]),
              u(f).buttons ? U(t.$slots, "buttons", { key: 4 }) : v("", !0)
            ];
          }),
          _: 3
        }, 16)) : (c(), H(je, { key: 2 }, [
          u(f)["prev-buttons-ever"] ? X((c(), H("div", rt, [
            U(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [W, !m.value]
          ]) : v("", !0),
          u(f)["prev-buttons"] ? X((c(), H("div", st, [
            U(t.$slots, "prev-buttons", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [W, E.value && !m.value]
          ]) : v("", !0),
          X(z(g, S({
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
            [W, t.mode === u(T).Update && h.value]
          ]),
          X(z(g, S({
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
            [W, t.mode === u(T).Create && h.value]
          ]),
          X(z(g, S({
            ref_key: "dropButtonRef",
            ref: l
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: b,
            onLoaded: B,
            onClick: L
          }), null, 16, ["disabled"]), [
            [W, G.value && t.mode !== u(T).Create]
          ]),
          u(f).buttons ? X((c(), H("div", pt, [
            U(t.$slots, "buttons")
          ], 512)), [
            [W, E.value && !m.value]
          ]) : v("", !0),
          j.value.length > 0 ? (c(), R(g, Ve(S({ key: 3 }, {
            type: u(Ie).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: ne.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : v("", !0),
          Z.value ? (c(), R(g, S({ key: 4 }, t.editModeButton, {
            checked: E.value,
            "onUpdate:checked": w[2] || (w[2] = (M) => E.value = M),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : v("", !0)
        ], 64))
      ])) : v("", !0);
    };
  }
}), vt = { class: "lkt-item-crud" }, ct = {
  key: 0,
  class: "lkt-item-crud_header"
}, ft = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, mt = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, bt = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, gt = {
  key: 2,
  class: "lkt-item-crud_content"
}, yt = {
  key: 0,
  class: "lkt-grid-1"
}, kt = /* @__PURE__ */ Xe({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ Je({
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
  }, ot(at)),
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
  setup(A, { expose: ve, emit: ke }) {
    const o = A, n = lt(), C = We(), f = ke, r = d(!0), l = d(o.modelValue), m = d(o.modifications), E = d(o.customData), b = d(o.perms), B = d(o.editing), Y = d(!1), x = d(!1), L = d(!1), $ = d(!1), q = d(200), I = d(new Te(l.value, o.dataStateConfig)), G = d(new Te(m.value, o.dataStateConfig)), h = d(!1), Z = d(new Te(o.readData)), K = d(o.mode === T.Create), j = d(!1), ne = d(!1), t = d(null), w = k(() => !K.value && Array.isArray(b.value) && b.value.includes(Re.Update)), g = k(() => !K.value && Array.isArray(b.value) && b.value.includes(Re.Drop)), ie = k(() => !K.value && Array.isArray(b.value) && b.value.includes(Re.SwitchEditMode)), N = d(o.visibleView);
    p(() => o.visibleView, (e) => {
      N.value = e;
    }), p(N, (e) => {
      f("update:modificationView", e);
    }), p(() => o.mode, (e) => {
      K.value = e === T.Create;
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
      Le(), G.value.increment(e), te.value === y.Modifications && (h.value = G.value.changed()), f("update:modifications", e);
    }, { deep: !0 });
    const F = d(J(o.createButton, s.defaultCreateButton)), P = d(J(o.updateButton, s.defaultUpdateButton)), M = d(J(o.dropButton, s.defaultDropButton)), ee = d(J(o.editModeButton, s.defaultEditModeButton)), se = d(J(o.groupButton, s.defaultGroupButton));
    p(() => o.createButton, (e) => {
      F.value = J(e, s.defaultCreateButton);
    }, { deep: !0 }), p(() => o.updateButton, (e) => {
      P.value = J(e, s.defaultUpdateButton);
    }, { deep: !0 }), p(() => o.dropButton, (e) => {
      M.value = J(e, s.defaultDropButton);
    }, { deep: !0 }), p(() => o.editModeButton, (e) => {
      ee.value = J(e, s.defaultEditModeButton);
    }, { deep: !0 });
    const ce = async () => {
      var e, a, O;
      D("fetchItem"), r.value = !0, q.value = -1, $.value = !1, typeof ((e = o.events) == null ? void 0 : e.httpStart) == "function" && o.events.httpStart();
      try {
        const V = await et(o.readResource, o.readData);
        if (D("fetchItem -> response", V), r.value = !1, q.value = V.httpStatus, E.value = V.custom, !V.success) {
          L.value = !1, q.value = V.httpStatus, typeof ((a = o.events) == null ? void 0 : a.httpEnd) == "function" && o.events.httpEnd({
            httpResponse: V
          }), f("error", V.httpStatus);
          return;
        }
        L.value = !0, l.value = V.data, m.value = Array.isArray(V.modifications) ? {} : V.modifications, b.value = V.perms, I.value.increment(l.value).turnStoredIntoOriginal(), G.value.increment(m.value).turnStoredIntoOriginal(), h.value = I.value.changed(), Z.value.turnStoredIntoOriginal(), Object.keys(m.value).length > 0 && (N.value = y.Modifications), typeof ((O = o.events) == null ? void 0 : O.httpEnd) == "function" && o.events.httpEnd({
          httpResponse: V
        }), f("read", V);
      } catch {
        r.value = !1, L.value = !1, q.value = 404, f("error", 404);
        return;
      }
    };
    p(j, (e) => {
      e && Qe(() => j.value = !1);
    }), p(() => o.modelValue, (e) => {
      l.value = e, I.value.increment(e);
    }, { deep: !0 }), p(l, (e) => {
      if (D("item updated ->", l.value), typeof o.beforeEmitUpdate == "function") {
        D("item updated -> has beforeEmitUpdate");
        let a = o.beforeEmitUpdate(l.value);
        D("item updated -> override with: ", a), typeof a == "object" && (l.value = a);
      }
      ue.value && Le(), f("update:modelValue", l.value), D("item updated -> update dataState"), I.value.increment(e), te.value === y.Current && (h.value = I.value.changed()), j.value = !0;
    }, { deep: !0 }), p(b, () => f("perms", b.value)), p(h, (e) => {
      f("modified-data", e);
    }), p(() => o.readData, (e) => {
      Z.value.increment(e), Z.value.changed() && ce();
    }), p(() => o.editing, (e) => {
      D("editing updated -> updating editMode", e), B.value = e;
    }), p(B, (e) => {
      D("editMode updated -> emit update", e), f("update:editing", e);
    });
    const Oe = d(void 0), Le = () => {
      ue.value && (Oe.value = tt(l.value, m.value, o.form));
    };
    Ye(() => {
      o.readResource && !K.value ? ce() : (K.value, L.value = !0, B.value = !0, r.value = !1, I.value.increment(l.value).turnStoredIntoOriginal(), h.value = I.value.changed());
    });
    const Be = (e, a) => {
      if (a) {
        if (r.value = !1, typeof e < "u" && (q.value = e.httpStatus, !e.success))
          return $.value = !0, f("error", e.httpStatus), !1;
        $.value = !0;
      }
      return !0;
    }, Ne = (e, a) => {
      if (D("doAutoReloadId -> enter: ", e), typeof e < "u" && e.autoReloadId)
        if (D("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), typeof a < "u") {
          let O = a;
          typeof a == "function" && (O = a(e.autoReloadId)), n.push(O);
        } else Se.value ? (D("doAutoReloadId -> insideModal: ", o), it(o.modalConfig.modalName, o.modalConfig.modalKey, e.autoReloadId)) : (D("doAutoReloadId -> outsideModal"), o.readData.id = e.autoReloadId, D("doAutoReloadId -> turning off create mode"), K.value = !1, ce());
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
      ne.value = !0, D("onCreate -> turn stored data into original"), I.value.increment(l.value).turnStoredIntoOriginal(), o.notificationType === _.Toast && de({
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
      }), f("drop", a), o.view === Pe.Modal && (D("onDrop -> close modal"), nt(o.modalConfig.modalName, o.modalConfig.modalKey)), typeof o.redirectOnDrop < "u") {
        let O = o.redirectOnDrop;
        typeof o.redirectOnDrop == "function" && (O = o.redirectOnDrop()), n.push(O);
      }
    };
    ve({
      doDrop: () => {
        t.value && t.value.doDrop();
      },
      doRefresh: ce,
      doSave: () => {
        t.value && t.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        I.value.increment(l.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => I.value.changed()
    });
    const He = k(() => {
      var e, a, O;
      return be.value ? ue.value ? x.value ? (e = o.modalConfig) == null ? void 0 : e.closeConfirm : "" : te.value === y.Modifications ? G.value.changed() ? (a = o.modalConfig) == null ? void 0 : a.closeConfirm : "" : I.value.changed() ? (O = o.modalConfig) == null ? void 0 : O.closeConfirm : "" : "";
    }), Ke = (e) => {
      var a;
      if (typeof ((a = o.modalConfig) == null ? void 0 : a.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...e,
          itemCreated: ne.value
        });
    }, we = k(() => o.title.startsWith("__:") ? String(ut(o.title.substring(3))) : o.title), Ge = k(() => r.value ? !1 : we.value.length > 0 || !!C["post-title"]), Se = k(() => o.view === Pe.Modal), $e = k(() => Se.value ? "lkt-modal" : "section"), fe = k(() => {
      var e, a;
      return o.mode !== T.Update || !w.value || !o.enabledSaveWithoutChanges && !h.value || ue.value && !Y.value ? !1 : typeof ((e = P.value) == null ? void 0 : e.disabled) == "function" ? !P.value.disabled({
        prop: l.value
      }) : typeof ((a = P.value) == null ? void 0 : a.disabled) == "boolean" ? !P.value.disabled : !0;
    }), me = k(() => {
      var e, a;
      return o.mode !== T.Create || !o.enabledSaveWithoutChanges && !h.value || ue.value && !Y.value ? !1 : typeof ((e = F.value) == null ? void 0 : e.disabled) == "function" ? !F.value.disabled({
        prop: l.value
      }) : typeof ((a = F.value) == null ? void 0 : a.disabled) == "boolean" ? !F.value.disabled : !0;
    }), Ue = k(() => {
      var e, a;
      return g.value ? typeof ((e = M.value) == null ? void 0 : e.disabled) == "function" ? !M.value.disabled({
        prop: l.value
      }) : typeof ((a = M.value) == null ? void 0 : a.disabled) == "boolean" ? !M.value.disabled : !0 : !1;
    }), qe = k(() => $e.value === "lkt-modal" ? {
      title: o.title,
      item: l.value,
      ...o.modalConfig,
      beforeClose: Ke,
      closeConfirm: He.value,
      headerActionsButton: o.groupButton !== !1 ? {
        dot: me.value || fe.value
      } : !1
    } : {}), ue = k(() => typeof o.form == "object" && Object.keys(o.form).length > 0), Me = k(() => Object.keys(m.value).length === 0 ? [] : o.modificationViews), te = k(() => Object.keys(m.value).length === 0 ? y.Current : y.Modifications), be = k(() => K.value || w.value || g.value);
    return (e, a) => {
      const O = ye("lkt-http-info"), V = ye("lkt-form"), ze = ye("lkt-loader");
      return c(), R(Ze($e.value), S(qe.value, { class: "lkt-item-crud" }), ge({
        default: Q(() => [
          _e("article", vt, [
            !Se.value && Ge.value ? (c(), H("header", ct, [
              u(C)["pre-title"] ? (c(), H("div", ft, [
                U(e.$slots, "pre-title", {
                  item: l.value,
                  loading: r.value
                })
              ])) : v("", !0),
              we.value.length > 0 ? (c(), H("h1", mt, xe(we.value), 1)) : v("", !0),
              u(C)["post-title"] ? (c(), H("div", bt, [
                U(e.$slots, "post-title", {
                  item: l.value,
                  loading: r.value
                })
              ])) : v("", !0)
            ])) : v("", !0),
            e.buttonNavPosition === u(Ae).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) && be.value ? (c(), R(Ee, {
              key: 1,
              ref_key: "buttonNav",
              ref: t,
              loading: r.value,
              "onUpdate:loading": a[3] || (a[3] = (i) => r.value = i),
              editing: B.value,
              "onUpdate:editing": a[4] || (a[4] = (i) => B.value = i),
              "picked-modification-view": N.value,
              "onUpdate:pickedModificationView": a[5] || (a[5] = (i) => N.value = i),
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
              "can-drop": g.value,
              "can-switch-edit-mode": ie.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": me.value,
              "able-to-update": fe.value,
              "able-to-drop": Ue.value,
              perms: b.value,
              "modification-view": Me.value,
              "editable-view": te.value,
              onCreate: Ce,
              onSave: De,
              onDrop: he
            }, ge({ _: 2 }, [
              u(C)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: Q(({ canUpdate: i, canDrop: oe, perms: ae }) => [
                  U(e.$slots, "prev-buttons-ever", {
                    canUpdate: i,
                    canDrop: oe,
                    perms: ae
                  })
                ]),
                key: "0"
              } : void 0,
              u(C)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: Q(({ canUpdate: i, canDrop: oe, perms: ae }) => [
                  U(e.$slots, "prev-buttons", {
                    canUpdate: i,
                    canDrop: oe,
                    perms: ae
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : v("", !0),
            r.value ? v("", !0) : (c(), H("div", gt, [
              L.value ? (c(), H("div", yt, [
                $.value && e.notificationType === u(_).Inline ? (c(), R(O, {
                  key: 0,
                  code: q.value,
                  palette: q.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: a[6] || (a[6] = (i) => $.value = !1)
                }, null, 8, ["code", "palette"])) : v("", !0),
                ue.value ? (c(), R(V, S({
                  key: 1,
                  modelValue: l.value,
                  "onUpdate:modelValue": a[7] || (a[7] = (i) => l.value = i),
                  modifications: m.value,
                  "onUpdate:modifications": a[8] || (a[8] = (i) => m.value = i),
                  valid: Y.value,
                  "onUpdate:valid": a[9] || (a[9] = (i) => Y.value = i),
                  changed: x.value,
                  "onUpdate:changed": a[10] || (a[10] = (i) => x.value = i)
                }, {
                  ...e.formUiConfig,
                  form: e.form,
                  differencesTableConfig: e.differencesTableConfig,
                  visibleView: N.value,
                  modificationDataState: Oe.value,
                  editableViews: [te.value],
                  disabled: !B.value
                }), null, 16, ["modelValue", "modifications", "valid", "changed"])) : U(e.$slots, "item", {
                  key: 2,
                  item: l.value,
                  loading: r.value,
                  editMode: B.value,
                  isCreate: K.value,
                  canUpdate: w.value,
                  canDrop: g.value,
                  itemBeingEdited: j.value,
                  perms: b.value
                })
              ])) : e.notificationType === u(_).Inline ? (c(), R(O, {
                key: 1,
                code: q.value
              }, null, 8, ["code"])) : v("", !0)
            ])),
            r.value ? (c(), R(ze, { key: 3 })) : v("", !0),
            e.buttonNavPosition === u(Ae).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) && be.value ? (c(), R(Ee, {
              key: 4,
              ref_key: "buttonNav",
              ref: t,
              loading: r.value,
              "onUpdate:loading": a[11] || (a[11] = (i) => r.value = i),
              editing: B.value,
              "onUpdate:editing": a[12] || (a[12] = (i) => B.value = i),
              "picked-modification-view": N.value,
              "onUpdate:pickedModificationView": a[13] || (a[13] = (i) => N.value = i),
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
              "can-drop": g.value,
              "can-switch-edit-mode": ie.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": me.value,
              "able-to-update": fe.value,
              "able-to-drop": Ue.value,
              perms: b.value,
              "modification-view": Me.value,
              "editable-view": te.value,
              onCreate: Ce,
              onSave: De,
              onDrop: he
            }, ge({ _: 2 }, [
              u(C)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: Q(() => [
                  U(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              u(C)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: Q(() => [
                  U(e.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : v("", !0)
          ])
        ]),
        _: 2
      }, [
        e.groupButton !== !1 && e.groupButtonAsModalActions && be.value ? {
          name: "header-actions",
          fn: Q(() => [
            e.buttonNavPosition === u(Ae).Top ? (c(), R(Ee, {
              key: 0,
              ref_key: "buttonNav",
              ref: t,
              loading: r.value,
              "onUpdate:loading": a[0] || (a[0] = (i) => r.value = i),
              editing: B.value,
              "onUpdate:editing": a[1] || (a[1] = (i) => B.value = i),
              "picked-modification-view": N.value,
              "onUpdate:pickedModificationView": a[2] || (a[2] = (i) => N.value = i),
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
              "can-drop": g.value,
              "can-switch-edit-mode": ie.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": me.value,
              "able-to-update": fe.value,
              "able-to-drop": Ue.value,
              perms: b.value,
              "modification-view": Me.value,
              "editable-view": te.value,
              onCreate: Ce,
              onSave: De,
              onDrop: he
            }, ge({ _: 2 }, [
              u(C)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: Q(({ canUpdate: i, canDrop: oe, perms: ae }) => [
                  U(e.$slots, "prev-buttons-ever", {
                    canUpdate: i,
                    canDrop: oe,
                    perms: ae
                  })
                ]),
                key: "0"
              } : void 0,
              u(C)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: Q(({ canUpdate: i, canDrop: oe, perms: ae }) => [
                  U(e.$slots, "prev-buttons", {
                    canUpdate: i,
                    canDrop: oe,
                    perms: ae
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
}), Rt = {
  install: (A, ve = {}) => {
    A.component("lkt-item-crud") === void 0 && A.component("lkt-item-crud", kt);
  }
}, At = (A) => {
  re.defaultSaveIcon = A;
}, Et = (A) => {
  re.defaultDropIcon = A;
};
export {
  It as debugLktItemCrud,
  Rt as default,
  Et as setItemCrudDefaultDropIcon,
  At as setItemCrudDefaultSaveIcon
};
