import { defineComponent as We, ref as d, watch as p, useSlots as He, computed as g, resolveComponent as ye, createElementBlock as H, createCommentVNode as v, openBlock as c, createBlock as R, Fragment as Fe, renderSlot as w, withDirectives as K, mergeProps as S, normalizeProps as Te, unref as i, createVNode as Y, vShow as W, withCtx as q, mergeDefaults as Ze, nextTick as Pe, onMounted as _e, resolveDynamicComponent as xe, createSlots as pe, createElementVNode as et, toDisplayString as tt, renderList as ot } from "vue";
import { httpCall as at } from "lkt-http-client";
import { DataState as Re } from "lkt-data-state";
import { ModificationView as k, ItemCrudMode as V, ItemCrudButtonNavVisibility as Xe, ButtonType as Ae, TablePermission as Ee, ensureButtonConfig as Z, LktSettings as s, getFormDataState as nt, ItemCrudView as Ke, getFormSlotKeys as ut, ItemCrudButtonNavPosition as Oe, NotificationType as te, getDefaultValues as it, ItemCrud as lt, ToastPositionX as de } from "lkt-vue-kernel";
import { closeModal as dt, updateModalKey as rt } from "lkt-modal";
import { __ as st } from "lkt-i18n";
import { openToast as re } from "lkt-toast";
import { useRouter as pt } from "vue-router";
const ve = class ve {
};
ve.debugEnabled = !1, ve.defaultSaveIcon = "", ve.defaultDropIcon = "";
let se = ve;
const D = (...A) => {
  se.debugEnabled && console.info("[LktItemCrud] ", ...A);
}, Ot = (A = !0) => {
  se.debugEnabled = A;
}, vt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, ct = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, ft = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, mt = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, Le = /* @__PURE__ */ We({
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
    const f = He(), r = d(null), l = d(null), m = d(n.loading);
    p(() => n.loading, (t) => m.value = t), p(m, (t) => o("update:loading", t));
    const E = d(n.editing);
    p(() => n.editing, (t) => E.value = t), p(E, (t) => o("update:editing", t));
    const b = () => {
      m.value = !0;
    }, B = () => {
      m.value = !1;
    }, _ = (t, T) => {
      typeof t > "u" || o("create", t, T);
    }, z = (t, T) => {
      typeof t > "u" || o("save", t, T);
    }, L = (t, T) => {
      typeof t > "u" || o("drop", t, T);
    }, $ = g(() => n.editableView === k.Modifications ? n.modifications : n.item);
    ce({
      doSave: () => {
        r.value && typeof r.value.click == "function" && r.value.click();
      },
      doDrop: () => {
        l.value && typeof l.value.click == "function" && l.value.click();
      }
    });
    const j = g(() => !n.canDrop || n.dropButton === !1 ? !1 : !n.canUpdate && n.canDrop ? !0 : !m.value && n.editing && n.httpSuccessRead), h = g(() => n.mode === V.Create && n.createButton === !1 || n.mode === V.Update && n.updateButton === !1 || m.value ? !1 : n.editing && n.httpSuccessRead), x = g(() => n.editModeButton === !1 || !n.canSwitchEditMode || !n.canUpdate && !n.canDrop || !n.canUpdate && n.canDrop ? !1 : !m.value && n.mode !== V.Create && n.httpSuccessRead), G = g(() => n.buttonNavVisibility === Xe.Always || f["prev-buttons-ever"] ? !0 : n.buttonNavVisibility === Xe.Never ? !1 : h.value || j.value || x.value), F = g(() => n.modificationView === !1 ? [] : n.modificationView === !0 ? [
      k.Current,
      k.Modifications,
      k.SplitView,
      k.Differences
    ] : Array.isArray(n.modificationView) ? n.modificationView : []), ue = g(() => {
      let t = [];
      return F.value.includes(k.Current) && t.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: C.value === k.Current,
        events: {
          click: () => {
            C.value = k.Current;
          }
        }
      }), F.value.includes(k.Modifications) && t.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: C.value === k.Modifications,
        events: {
          click: () => {
            C.value = k.Modifications;
          }
        }
      }), F.value.includes(k.SplitView) && t.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: C.value === k.SplitView,
        events: {
          click: () => {
            C.value = k.SplitView;
          }
        }
      }), F.value.includes(k.Differences) && t.push({
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
    return (t, T) => {
      var Q, ie, N, P;
      const y = ye("lkt-button");
      return G.value ? (c(), H("div", vt, [
        t.grouped && t.groupButtonAsModalActions ? (c(), H(Fe, { key: 0 }, [
          x.value ? (c(), R(y, S({ key: 0 }, t.editModeButton, {
            checked: E.value,
            "onUpdate:checked": T[0] || (T[0] = (U) => E.value = U),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : v("", !0),
          F.value.length > 0 ? (c(), R(y, Te(S({ key: 1 }, {
            type: i(Ae).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: ue.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : v("", !0),
          i(f)["prev-buttons-ever"] ? w(t.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : v("", !0),
          i(f)["prev-buttons"] ? w(t.$slots, "prev-buttons", {
            key: 3,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : v("", !0),
          K(Y(y, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.updateButton,
            resourceData: {
              ...(Q = t.updateButton) == null ? void 0 : Q.resourceData,
              ...$.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: b,
            onLoaded: B,
            onClick: z
          }), null, 16), [
            [W, t.mode === i(V).Update && h.value]
          ]),
          K(Y(y, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.createButton,
            resourceData: {
              ...(ie = t.createButton) == null ? void 0 : ie.resourceData,
              ...$.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: b,
            onLoaded: B,
            onClick: _
          }), null, 16), [
            [W, t.mode === i(V).Create && h.value]
          ]),
          K(Y(y, S({
            ref_key: "dropButtonRef",
            ref: l
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: b,
            onLoaded: B,
            onClick: L
          }), null, 16, ["disabled"]), [
            [W, j.value && t.mode !== i(V).Create]
          ]),
          i(f).buttons ? w(t.$slots, "buttons", { key: 4 }) : v("", !0)
        ], 64)) : t.grouped ? (c(), R(y, S({
          key: 1,
          ref: "groupButton"
        }, t.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: q(() => {
            var U, X;
            return [
              x.value ? (c(), R(y, S({ key: 0 }, t.editModeButton, {
                checked: E.value,
                "onUpdate:checked": T[1] || (T[1] = (le) => E.value = le),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : v("", !0),
              F.value.length > 0 ? (c(), R(y, Te(S({ key: 1 }, {
                type: i(Ae).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: ue.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : v("", !0),
              i(f)["prev-buttons-ever"] ? w(t.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : v("", !0),
              i(f)["prev-buttons"] ? w(t.$slots, "prev-buttons", {
                key: 3,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : v("", !0),
              K(Y(y, S({
                ref_key: "saveButtonRef",
                ref: r
              }, {
                ...t.updateButton,
                resourceData: {
                  ...(U = t.updateButton) == null ? void 0 : U.resourceData,
                  ...$.value
                },
                disabled: !t.ableToUpdate
              }, {
                onLoading: b,
                onLoaded: B,
                onClick: z
              }), null, 16), [
                [W, t.mode === i(V).Update && h.value]
              ]),
              K(Y(y, S({
                ref_key: "saveButtonRef",
                ref: r
              }, {
                ...t.createButton,
                resourceData: {
                  ...(X = t.createButton) == null ? void 0 : X.resourceData,
                  ...$.value
                },
                disabled: !t.ableToCreate
              }, {
                disabled: !t.ableToCreate,
                onLoading: b,
                onLoaded: B,
                onClick: _
              }), null, 16, ["disabled"]), [
                [W, t.mode === i(V).Create && h.value]
              ]),
              K(Y(y, S({
                ref_key: "dropButtonRef",
                ref: l
              }, t.dropButton, {
                disabled: !t.ableToDrop,
                onLoading: b,
                onLoaded: B,
                onClick: L
              }), null, 16, ["disabled"]), [
                [W, j.value && t.mode !== i(V).Create]
              ]),
              i(f).buttons ? w(t.$slots, "buttons", { key: 4 }) : v("", !0)
            ];
          }),
          _: 3
        }, 16)) : (c(), H(Fe, { key: 2 }, [
          i(f)["prev-buttons-ever"] ? K((c(), H("div", ct, [
            w(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [W, !m.value]
          ]) : v("", !0),
          i(f)["prev-buttons"] ? K((c(), H("div", ft, [
            w(t.$slots, "prev-buttons", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [W, E.value && !m.value]
          ]) : v("", !0),
          K(Y(y, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.updateButton,
            resourceData: {
              ...(N = t.updateButton) == null ? void 0 : N.resourceData,
              ...$.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: b,
            onLoaded: B,
            onClick: z
          }), null, 16), [
            [W, t.mode === i(V).Update && h.value]
          ]),
          K(Y(y, S({
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
            onClick: _
          }), null, 16), [
            [W, t.mode === i(V).Create && h.value]
          ]),
          K(Y(y, S({
            ref_key: "dropButtonRef",
            ref: l
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: b,
            onLoaded: B,
            onClick: L
          }), null, 16, ["disabled"]), [
            [W, j.value && t.mode !== i(V).Create]
          ]),
          i(f).buttons ? K((c(), H("div", mt, [
            w(t.$slots, "buttons")
          ], 512)), [
            [W, E.value && !m.value]
          ]) : v("", !0),
          F.value.length > 0 ? (c(), R(y, Te(S({ key: 3 }, {
            type: i(Ae).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: ue.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : v("", !0),
          x.value ? (c(), R(y, S({ key: 4 }, t.editModeButton, {
            checked: E.value,
            "onUpdate:checked": T[2] || (T[2] = (U) => E.value = U),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : v("", !0)
        ], 64))
      ])) : v("", !0);
    };
  }
}), bt = { class: "lkt-item-crud" }, gt = {
  key: 0,
  class: "lkt-item-crud_header"
}, yt = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, kt = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, Bt = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, Ct = {
  key: 2,
  class: "lkt-item-crud_content"
}, Dt = {
  key: 0,
  class: "lkt-grid-1"
}, ht = /* @__PURE__ */ We({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ Ze({
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
  }, it(lt)),
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
    const o = A, n = pt(), C = He(), f = ke, r = d(!0), l = d(o.modelValue), m = d(o.modifications), E = d(o.customData), b = d(o.perms), B = d(o.editing), _ = d(!1), z = d(!1), L = d(!1), $ = d(!1), J = d(200), I = d(new Re(l.value, o.dataStateConfig)), j = d(new Re(m.value, o.dataStateConfig)), h = d(!1), x = d(new Re(o.readData)), G = d(o.mode === V.Create), F = d(!1), ue = d(!1), t = d(null), T = d(null), y = g(() => !G.value && o.updateButton !== !1 && Array.isArray(b.value) && b.value.includes(Ee.Update)), Q = g(() => !G.value && o.dropButton !== !1 && Array.isArray(b.value) && b.value.includes(Ee.Drop)), ie = g(() => o.editModeButton !== !1 && !G.value && Array.isArray(b.value) && b.value.includes(Ee.SwitchEditMode)), N = d(o.visibleView);
    p(() => o.visibleView, (e) => {
      N.value = e;
    }), p(N, (e) => {
      f("update:modificationView", e);
    }), p(() => o.mode, (e) => {
      G.value = e === V.Create;
    }), p(() => o.perms, (e) => {
      b.value = e;
    }), p(b, (e) => {
      f("update:perms", e);
    }), p(() => o.customData, (e) => {
      E.value = e;
    }), p(E, (e) => {
      f("update:customData", e);
    }), p(() => o.modifications, (e) => {
      j.value.increment(e), m.value = e;
    }, { deep: !0 }), p(m, (e) => {
      Ce(), j.value.increment(e), oe.value === k.Modifications && (h.value = j.value.changed()), f("update:modifications", e);
    }, { deep: !0 });
    const P = d(Z(o.createButton, s.defaultCreateButton)), U = d(Z(o.updateButton, s.defaultUpdateButton)), X = d(Z(o.dropButton, s.defaultDropButton)), le = d(Z(o.editModeButton, s.defaultEditModeButton)), Be = d(Z(o.groupButton, s.defaultGroupButton));
    p(() => o.createButton, (e) => {
      P.value = Z(e, s.defaultCreateButton);
    }, { deep: !0 }), p(() => o.updateButton, (e) => {
      U.value = Z(e, s.defaultUpdateButton);
    }, { deep: !0 }), p(() => o.dropButton, (e) => {
      X.value = Z(e, s.defaultDropButton);
    }, { deep: !0 }), p(() => o.editModeButton, (e) => {
      le.value = Z(e, s.defaultEditModeButton);
    }, { deep: !0 });
    const fe = async () => {
      var e, a, O;
      D("fetchItem"), r.value = !0, J.value = -1, $.value = !1, typeof ((e = o.events) == null ? void 0 : e.httpStart) == "function" && o.events.httpStart();
      try {
        const M = await at(o.readResource, o.readData);
        if (D("fetchItem -> response", M), r.value = !1, J.value = M.httpStatus, E.value = M.custom, !M.success) {
          L.value = !1, J.value = M.httpStatus, typeof ((a = o.events) == null ? void 0 : a.httpEnd) == "function" && o.events.httpEnd({
            httpResponse: M
          }), f("error", M.httpStatus);
          return;
        }
        L.value = !0, l.value = M.data, m.value = Array.isArray(M.modifications) ? {} : M.modifications, b.value = M.perms, I.value.increment(l.value).turnStoredIntoOriginal(), j.value.increment(m.value).turnStoredIntoOriginal(), h.value = I.value.changed(), x.value.turnStoredIntoOriginal(), Object.keys(m.value).length > 0 && (N.value = k.Modifications), ee.value && (Ce(), Pe(() => {
          T.value.turnStoredIntoOriginal();
        })), typeof ((O = o.events) == null ? void 0 : O.httpEnd) == "function" && o.events.httpEnd({
          httpResponse: M
        }), f("read", M);
      } catch {
        r.value = !1, L.value = !1, J.value = 404, f("error", 404);
        return;
      }
    };
    p(F, (e) => {
      e && Pe(() => F.value = !1);
    }), p(() => o.modelValue, (e) => {
      l.value = e, I.value.increment(e);
    }, { deep: !0 }), p(l, (e) => {
      if (D("item updated ->", l.value), typeof o.beforeEmitUpdate == "function") {
        D("item updated -> has beforeEmitUpdate");
        let a = o.beforeEmitUpdate(l.value);
        D("item updated -> override with: ", a), typeof a == "object" && (l.value = a);
      }
      ee.value && Ce(), f("update:modelValue", l.value), D("item updated -> update dataState"), I.value.increment(e), oe.value === k.Current && (h.value = I.value.changed()), F.value = !0;
    }, { deep: !0 }), p(b, () => f("perms", b.value)), p(h, (e) => {
      f("modified-data", e);
    }), p(() => o.readData, (e) => {
      x.value.increment(e), x.value.changed() && fe();
    }), p(() => o.editing, (e) => {
      D("editing updated -> updating editMode", e), B.value = e;
    }), p(B, (e) => {
      D("editMode updated -> emit update", e), f("update:editing", e);
    });
    const Ne = d(void 0), Ce = () => {
      ee.value && (Ne.value = nt(l.value, m.value, o.form));
    };
    _e(() => {
      o.readResource && !G.value ? fe() : (G.value, L.value = !0, B.value = !0, r.value = !1, I.value.increment(l.value).turnStoredIntoOriginal(), h.value = I.value.changed());
    });
    const De = (e, a) => {
      if (a) {
        if (r.value = !1, typeof e < "u" && (J.value = e.httpStatus, !e.success))
          return $.value = !0, f("error", e.httpStatus), !1;
        $.value = !0;
      }
      return !0;
    }, $e = (e, a) => {
      if (D("doAutoReloadId -> enter: ", e), typeof e < "u" && e.autoReloadId)
        if (D("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), typeof a < "u") {
          let O = a;
          typeof a == "function" && (O = a(e.autoReloadId)), n.push(O);
        } else Me.value ? (D("doAutoReloadId -> insideModal: ", o), rt(o.modalConfig.modalName, o.modalConfig.modalKey, e.autoReloadId)) : (D("doAutoReloadId -> outsideModal"), o.readData.id = e.autoReloadId, D("doAutoReloadId -> turning off create mode"), G.value = !1, fe());
    }, he = (e, a) => {
      if (D("onCreate"), !De(a, P.value.resource)) {
        o.notificationType === te.Toast && re({
          text: s.defaultCreateErrorText,
          details: s.defaultCreateErrorDetails,
          icon: s.defaultCreateErrorIcon,
          positionX: de.Right
        });
        return;
      }
      ue.value = !0, D("onCreate -> turn stored data into original"), I.value.increment(l.value).turnStoredIntoOriginal(), j.value.turnStoredIntoOriginal(), o.notificationType === te.Toast && re({
        text: s.defaultCreateSuccessText,
        details: s.defaultCreateSuccessDetails,
        icon: s.defaultCreateSuccessIcon,
        positionX: de.Right
      }), $e(a, o.redirectOnCreate), D("onCreate -> beforeEmitCreate"), f("create", a);
    }, we = (e, a) => {
      if (D("onUpdate"), !De(a, U.value.resource)) {
        o.notificationType === te.Toast && re({
          text: s.defaultUpdateErrorText,
          details: s.defaultUpdateErrorDetails,
          icon: s.defaultUpdateErrorIcon,
          positionX: de.Right
        });
        return;
      }
      D("onUpdate -> turn stored data into original"), I.value.turnStoredIntoOriginal(), j.value.turnStoredIntoOriginal(), o.notificationType === te.Toast && re({
        text: s.defaultUpdateSuccessText,
        details: s.defaultUpdateSuccessDetails,
        icon: s.defaultUpdateSuccessIcon,
        positionX: de.Right
      }), $e(a), f("update", a);
    }, Se = (e, a) => {
      if (D("onDrop"), !De(a, X.value.resource)) {
        o.notificationType === te.Toast && re({
          text: s.defaultDropErrorText,
          details: s.defaultDropErrorDetails,
          icon: s.defaultDropErrorIcon,
          positionX: de.Right
        });
        return;
      }
      if (o.notificationType === te.Toast && re({
        text: s.defaultDropSuccessText,
        details: s.defaultDropSuccessDetails,
        icon: s.defaultDropSuccessIcon,
        positionX: de.Right
      }), f("drop", a), o.view === Ke.Modal && (D("onDrop -> close modal"), dt(o.modalConfig.modalName, o.modalConfig.modalKey)), typeof o.redirectOnDrop < "u") {
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
    const Ge = g(() => {
      var e, a, O;
      return ge.value ? ee.value ? z.value ? (e = o.modalConfig) == null ? void 0 : e.closeConfirm : "" : oe.value === k.Modifications ? j.value.changed() ? (a = o.modalConfig) == null ? void 0 : a.closeConfirm : "" : I.value.changed() ? (O = o.modalConfig) == null ? void 0 : O.closeConfirm : "" : "";
    }), qe = (e) => {
      var a;
      if (typeof ((a = o.modalConfig) == null ? void 0 : a.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...e,
          itemCreated: ue.value
        });
    }, Ue = g(() => o.title.startsWith("__:") ? String(st(o.title.substring(3))) : o.title), ze = g(() => r.value ? !1 : Ue.value.length > 0 || !!C["post-title"]), Me = g(() => o.view === Ke.Modal), je = g(() => Me.value ? "lkt-modal" : "section"), me = g(() => {
      var e, a;
      return o.mode !== V.Update || !y.value || !o.enabledSaveWithoutChanges && !h.value || ee.value && (!_.value || !z.value) ? !1 : typeof ((e = U.value) == null ? void 0 : e.disabled) == "function" ? !U.value.disabled({
        prop: l.value
      }) : typeof ((a = U.value) == null ? void 0 : a.disabled) == "boolean" ? !U.value.disabled : !0;
    }), be = g(() => {
      var e, a;
      return o.mode !== V.Create || !o.enabledSaveWithoutChanges && !h.value || ee.value && !_.value && !z.value ? !1 : typeof ((e = P.value) == null ? void 0 : e.disabled) == "function" ? !P.value.disabled({
        prop: l.value
      }) : typeof ((a = P.value) == null ? void 0 : a.disabled) == "boolean" ? !P.value.disabled : !0;
    }), Ve = g(() => {
      var e, a;
      return Q.value ? typeof ((e = X.value) == null ? void 0 : e.disabled) == "function" ? !X.value.disabled({
        prop: l.value
      }) : typeof ((a = X.value) == null ? void 0 : a.disabled) == "boolean" ? !X.value.disabled : !0 : !1;
    }), Je = g(() => je.value === "lkt-modal" ? {
      title: o.title,
      item: l.value,
      ...o.modalConfig,
      beforeClose: qe,
      closeConfirm: Ge.value,
      headerActionsButton: o.groupButton !== !1 ? {
        dot: be.value || me.value
      } : !1
    } : {}), ee = g(() => typeof o.form == "object" && Object.keys(o.form).length > 0), Ie = g(() => Object.keys(m.value).length === 0 ? [] : o.modificationViews), oe = g(() => Object.keys(m.value).length === 0 ? k.Current : k.Modifications), ge = g(() => G.value || y.value || Q.value), Qe = g(() => ee.value ? ut(o.form) : []);
    return (e, a) => {
      const O = ye("lkt-http-info"), M = ye("lkt-form"), Ye = ye("lkt-loader");
      return c(), R(xe(je.value), S(Je.value, { class: "lkt-item-crud" }), pe({
        default: q(() => [
          et("article", bt, [
            !Me.value && ze.value ? (c(), H("header", gt, [
              i(C)["pre-title"] ? (c(), H("div", yt, [
                w(e.$slots, "pre-title", {
                  item: l.value,
                  loading: r.value
                })
              ])) : v("", !0),
              Ue.value.length > 0 ? (c(), H("h1", kt, tt(Ue.value), 1)) : v("", !0),
              i(C)["post-title"] ? (c(), H("div", Bt, [
                w(e.$slots, "post-title", {
                  item: l.value,
                  loading: r.value
                })
              ])) : v("", !0)
            ])) : v("", !0),
            e.buttonNavPosition === i(Oe).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) && ge.value ? (c(), R(Le, {
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
              "create-button": P.value,
              "update-button": U.value,
              "drop-button": X.value,
              "edit-mode-button": le.value,
              "group-button": Be.value,
              "data-changed": h.value,
              "http-success-read": L.value,
              "can-update": y.value,
              "can-drop": Q.value,
              "can-switch-edit-mode": ie.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": be.value,
              "able-to-update": me.value,
              "able-to-drop": Ve.value,
              perms: b.value,
              "modification-view": Ie.value,
              "editable-view": oe.value,
              onCreate: he,
              onSave: we,
              onDrop: Se
            }, pe({ _: 2 }, [
              i(C)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: q(({ canUpdate: u, canDrop: ae, perms: ne }) => [
                  w(e.$slots, "prev-buttons-ever", {
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
                  w(e.$slots, "prev-buttons", {
                    canUpdate: u,
                    canDrop: ae,
                    perms: ne
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : v("", !0),
            r.value ? v("", !0) : (c(), H("div", Ct, [
              L.value ? (c(), H("div", Dt, [
                $.value && e.notificationType === i(te).Inline ? (c(), R(O, {
                  key: 0,
                  code: J.value,
                  palette: J.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: a[6] || (a[6] = (u) => $.value = !1)
                }, null, 8, ["code", "palette"])) : v("", !0),
                ee.value ? (c(), R(M, S({
                  key: 1,
                  ref_key: "formRef",
                  ref: T,
                  modelValue: l.value,
                  "onUpdate:modelValue": a[7] || (a[7] = (u) => l.value = u),
                  modifications: m.value,
                  "onUpdate:modifications": a[8] || (a[8] = (u) => m.value = u),
                  valid: _.value,
                  "onUpdate:valid": a[9] || (a[9] = (u) => _.value = u),
                  changed: z.value,
                  "onUpdate:changed": a[10] || (a[10] = (u) => z.value = u)
                }, {
                  ...e.formUiConfig,
                  form: e.form,
                  differencesTableConfig: e.differencesTableConfig,
                  visibleView: N.value,
                  modificationDataState: Ne.value,
                  editableViews: [oe.value],
                  disabled: !B.value
                }), pe({ _: 2 }, [
                  ot(Qe.value, (u) => ({
                    name: u,
                    fn: q(({}) => [
                      w(e.$slots, u)
                    ])
                  }))
                ]), 1040, ["modelValue", "modifications", "valid", "changed"])) : w(e.$slots, "item", {
                  key: 2,
                  item: l.value,
                  loading: r.value,
                  editMode: B.value,
                  isCreate: G.value,
                  canUpdate: y.value,
                  canDrop: Q.value,
                  itemBeingEdited: F.value,
                  perms: b.value
                })
              ])) : e.notificationType === i(te).Inline ? (c(), R(O, {
                key: 1,
                code: J.value
              }, null, 8, ["code"])) : v("", !0)
            ])),
            r.value ? (c(), R(Ye, { key: 3 })) : v("", !0),
            e.buttonNavPosition === i(Oe).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) && ge.value ? (c(), R(Le, {
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
              "create-button": P.value,
              "update-button": U.value,
              "drop-button": X.value,
              "edit-mode-button": le.value,
              "group-button": Be.value,
              "data-changed": h.value,
              "http-success-read": L.value,
              "can-update": y.value,
              "can-drop": Q.value,
              "can-switch-edit-mode": ie.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": be.value,
              "able-to-update": me.value,
              "able-to-drop": Ve.value,
              perms: b.value,
              "modification-view": Ie.value,
              "editable-view": oe.value,
              onCreate: he,
              onSave: we,
              onDrop: Se
            }, pe({ _: 2 }, [
              i(C)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: q(() => [
                  w(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              i(C)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: q(() => [
                  w(e.$slots, "prev-buttons")
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
            e.buttonNavPosition === i(Oe).Top ? (c(), R(Le, {
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
              "create-button": P.value,
              "update-button": U.value,
              "drop-button": X.value,
              "edit-mode-button": le.value,
              "group-button": Be.value,
              "data-changed": h.value,
              "http-success-read": L.value,
              "can-update": y.value,
              "can-drop": Q.value,
              "can-switch-edit-mode": ie.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": be.value,
              "able-to-update": me.value,
              "able-to-drop": Ve.value,
              perms: b.value,
              "modification-view": Ie.value,
              "editable-view": oe.value,
              onCreate: he,
              onSave: we,
              onDrop: Se
            }, pe({ _: 2 }, [
              i(C)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: q(({ canUpdate: u, canDrop: ae, perms: ne }) => [
                  w(e.$slots, "prev-buttons-ever", {
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
                  w(e.$slots, "prev-buttons", {
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
}), Lt = {
  install: (A, ce = {}) => {
    A.component("lkt-item-crud") === void 0 && A.component("lkt-item-crud", ht);
  }
}, Nt = (A) => {
  se.defaultSaveIcon = A;
}, $t = (A) => {
  se.defaultDropIcon = A;
};
export {
  Ot as debugLktItemCrud,
  Lt as default,
  $t as setItemCrudDefaultDropIcon,
  Nt as setItemCrudDefaultSaveIcon
};
