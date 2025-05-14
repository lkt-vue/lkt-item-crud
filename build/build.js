import { defineComponent as Pe, ref as d, watch as f, useSlots as Fe, computed as k, resolveComponent as ge, createElementBlock as J, createCommentVNode as p, openBlock as v, createBlock as A, Fragment as Le, renderSlot as U, withDirectives as F, mergeProps as S, normalizeProps as Me, unref as i, createVNode as Y, vShow as X, withCtx as _, mergeDefaults as qe, nextTick as ze, onMounted as Qe, resolveDynamicComponent as Ye, createSlots as be, createElementVNode as Ze, toDisplayString as _e } from "vue";
import { httpCall as xe } from "lkt-http-client";
import { DataState as ye } from "lkt-data-state";
import { ModificationView as y, ItemCrudMode as V, ItemCrudButtonNavVisibility as $e, ButtonType as Ve, TablePermission as Te, ensureButtonConfig as Z, LktSettings as s, ItemCrudView as je, ItemCrudButtonNavPosition as Ie, NotificationType as ee, getDefaultValues as et, ItemCrud as tt, ToastPositionX as le } from "lkt-vue-kernel";
import { closeModal as ot, updateModalKey as at } from "lkt-modal";
import { __ as nt } from "lkt-i18n";
import { openToast as de } from "lkt-toast";
import { useRouter as it } from "vue-router";
const ve = class ve {
};
ve.debugEnabled = !1, ve.defaultSaveIcon = "", ve.defaultDropIcon = "";
let re = ve;
const C = (...B) => {
  re.debugEnabled && console.info("[LktItemCrud] ", ...B);
}, Tt = (B = !0) => {
  re.debugEnabled = B;
}, ut = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, lt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, dt = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, rt = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, Re = /* @__PURE__ */ Pe({
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
  setup(B, { expose: K, emit: te }) {
    const o = te, n = B, D = d(n.pickedModificationView);
    f(() => n.pickedModificationView, (t) => D.value = t), f(D, (t) => o("update:pickedModificationView", t));
    const c = Fe(), r = d(null), u = d(null), m = d(n.loading);
    f(() => n.loading, (t) => m.value = t), f(m, (t) => o("update:loading", t));
    const O = d(n.editing);
    f(() => n.editing, (t) => O.value = t), f(O, (t) => o("update:editing", t));
    const b = () => {
      m.value = !0;
    }, g = () => {
      m.value = !1;
    }, x = (t, w) => {
      typeof t > "u" || o("create", t, w);
    }, E = (t, w) => {
      typeof t > "u" || o("save", t, w);
    }, Q = (t, w) => {
      typeof t > "u" || o("drop", t, w);
    }, T = k(() => n.editableView === y.Modifications ? n.modifications : n.item);
    K({
      doSave: () => {
        r.value && typeof r.value.click == "function" && r.value.click();
      },
      doDrop: () => {
        u.value && typeof u.value.click == "function" && u.value.click();
      }
    });
    const M = k(() => !n.canDrop || n.dropButton === !1 ? !1 : !n.canUpdate && n.canDrop ? !0 : !m.value && n.editing && n.httpSuccessRead), W = k(() => n.mode === V.Create && n.createButton === !1 || n.mode === V.Update && n.updateButton === !1 || m.value ? !1 : n.editing && n.httpSuccessRead), N = k(() => n.editModeButton === !1 || !n.canSwitchEditMode || !n.canUpdate && !n.canDrop || !n.canUpdate && n.canDrop ? !1 : !m.value && n.mode !== V.Create && n.httpSuccessRead), pe = k(() => n.buttonNavVisibility === $e.Always || c["prev-buttons-ever"] ? !0 : n.buttonNavVisibility === $e.Never ? !1 : W.value || M.value || N.value), z = k(() => n.modificationView === !1 ? [] : n.modificationView === !0 ? [
      y.Current,
      y.Modifications,
      y.SplitView,
      y.Differences
    ] : Array.isArray(n.modificationView) ? n.modificationView : []), G = k(() => {
      let t = [];
      return z.value.includes(y.Current) && t.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: D.value === y.Current,
        events: {
          click: () => {
            D.value = y.Current;
          }
        }
      }), z.value.includes(y.Modifications) && t.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: D.value === y.Modifications,
        events: {
          click: () => {
            D.value = y.Modifications;
          }
        }
      }), z.value.includes(y.SplitView) && t.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: D.value === y.SplitView,
        events: {
          click: () => {
            D.value = y.SplitView;
          }
        }
      }), z.value.includes(y.Differences) && t.push({
        text: "Differences",
        icon: "lkt-icn-balance",
        disabled: D.value === y.Differences,
        events: {
          click: () => {
            D.value = y.Differences;
          }
        }
      }), t;
    });
    return (t, w) => {
      var L, $, j, P;
      const h = ge("lkt-button");
      return pe.value ? (v(), J("div", ut, [
        t.grouped && t.groupButtonAsModalActions ? (v(), J(Le, { key: 0 }, [
          N.value ? (v(), A(h, S({ key: 0 }, t.editModeButton, {
            checked: O.value,
            "onUpdate:checked": w[0] || (w[0] = (H) => O.value = H),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : p("", !0),
          z.value.length > 0 ? (v(), A(h, Me(S({ key: 1 }, {
            type: i(Ve).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: G.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : p("", !0),
          i(c)["prev-buttons-ever"] ? U(t.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : p("", !0),
          i(c)["prev-buttons"] ? U(t.$slots, "prev-buttons", {
            key: 3,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : p("", !0),
          F(Y(h, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.updateButton,
            resourceData: {
              ...(L = t.updateButton) == null ? void 0 : L.resourceData,
              ...T.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: b,
            onLoaded: g,
            onClick: E
          }), null, 16), [
            [X, t.mode === i(V).Update && W.value]
          ]),
          F(Y(h, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.createButton,
            resourceData: {
              ...($ = t.createButton) == null ? void 0 : $.resourceData,
              ...T.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: b,
            onLoaded: g,
            onClick: x
          }), null, 16), [
            [X, t.mode === i(V).Create && W.value]
          ]),
          F(Y(h, S({
            ref_key: "dropButtonRef",
            ref: u
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: b,
            onLoaded: g,
            onClick: Q
          }), null, 16, ["disabled"]), [
            [X, M.value && t.mode !== i(V).Create]
          ]),
          i(c).buttons ? U(t.$slots, "buttons", { key: 4 }) : p("", !0)
        ], 64)) : t.grouped ? (v(), A(h, S({
          key: 1,
          ref: "groupButton"
        }, t.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: _(() => {
            var H, ne;
            return [
              N.value ? (v(), A(h, S({ key: 0 }, t.editModeButton, {
                checked: O.value,
                "onUpdate:checked": w[1] || (w[1] = (ie) => O.value = ie),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : p("", !0),
              z.value.length > 0 ? (v(), A(h, Me(S({ key: 1 }, {
                type: i(Ve).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: G.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : p("", !0),
              i(c)["prev-buttons-ever"] ? U(t.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : p("", !0),
              i(c)["prev-buttons"] ? U(t.$slots, "prev-buttons", {
                key: 3,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : p("", !0),
              F(Y(h, S({
                ref_key: "saveButtonRef",
                ref: r
              }, {
                ...t.updateButton,
                resourceData: {
                  ...(H = t.updateButton) == null ? void 0 : H.resourceData,
                  ...T.value
                },
                disabled: !t.ableToUpdate
              }, {
                onLoading: b,
                onLoaded: g,
                onClick: E
              }), null, 16), [
                [X, t.mode === i(V).Update && W.value]
              ]),
              F(Y(h, S({
                ref_key: "saveButtonRef",
                ref: r
              }, {
                ...t.createButton,
                resourceData: {
                  ...(ne = t.createButton) == null ? void 0 : ne.resourceData,
                  ...T.value
                },
                disabled: !t.ableToCreate
              }, {
                disabled: !t.ableToCreate,
                onLoading: b,
                onLoaded: g,
                onClick: x
              }), null, 16, ["disabled"]), [
                [X, t.mode === i(V).Create && W.value]
              ]),
              F(Y(h, S({
                ref_key: "dropButtonRef",
                ref: u
              }, t.dropButton, {
                disabled: !t.ableToDrop,
                onLoading: b,
                onLoaded: g,
                onClick: Q
              }), null, 16, ["disabled"]), [
                [X, M.value && t.mode !== i(V).Create]
              ]),
              i(c).buttons ? U(t.$slots, "buttons", { key: 4 }) : p("", !0)
            ];
          }),
          _: 3
        }, 16)) : (v(), J(Le, { key: 2 }, [
          i(c)["prev-buttons-ever"] ? F((v(), J("div", lt, [
            U(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [X, !m.value]
          ]) : p("", !0),
          i(c)["prev-buttons"] ? F((v(), J("div", dt, [
            U(t.$slots, "prev-buttons", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [X, O.value && !m.value]
          ]) : p("", !0),
          F(Y(h, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.updateButton,
            resourceData: {
              ...(j = t.updateButton) == null ? void 0 : j.resourceData,
              ...T.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: b,
            onLoaded: g,
            onClick: E
          }), null, 16), [
            [X, t.mode === i(V).Update && W.value]
          ]),
          F(Y(h, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.createButton,
            resourceData: {
              ...(P = t.createButton) == null ? void 0 : P.resourceData,
              ...T.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: b,
            onLoaded: g,
            onClick: x
          }), null, 16), [
            [X, t.mode === i(V).Create && W.value]
          ]),
          F(Y(h, S({
            ref_key: "dropButtonRef",
            ref: u
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: b,
            onLoaded: g,
            onClick: Q
          }), null, 16, ["disabled"]), [
            [X, M.value && t.mode !== i(V).Create]
          ]),
          i(c).buttons ? F((v(), J("div", rt, [
            U(t.$slots, "buttons")
          ], 512)), [
            [X, O.value && !m.value]
          ]) : p("", !0),
          z.value.length > 0 ? (v(), A(h, Me(S({ key: 3 }, {
            type: i(Ve).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: G.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : p("", !0),
          N.value ? (v(), A(h, S({ key: 4 }, t.editModeButton, {
            checked: O.value,
            "onUpdate:checked": w[2] || (w[2] = (H) => O.value = H),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : p("", !0)
        ], 64))
      ])) : p("", !0);
    };
  }
}), st = (B, K, te) => {
  let o = new ye(JSON.parse(JSON.stringify(B)), {
    onlyProps: Xe(te),
    recursiveOnlyProps: !1
  });
  return o.increment(JSON.parse(JSON.stringify(K))), o;
}, Xe = (B) => {
  if (B.items === void 0) return [];
  if (B.items.length === 0) return [];
  let K = [];
  for (let te in B.items) {
    let o = B.items[te];
    switch (o.type) {
      case "field":
        o.key !== void 0 && K.push(o.key);
        break;
      case "form":
        o.form && (K = [...K, ...Xe(o.form)]);
        break;
    }
  }
  return K;
}, pt = { class: "lkt-item-crud" }, vt = {
  key: 0,
  class: "lkt-item-crud_header"
}, ct = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, ft = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, mt = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, bt = {
  key: 2,
  class: "lkt-item-crud_content"
}, gt = {
  key: 0,
  class: "lkt-grid-1"
}, yt = /* @__PURE__ */ Pe({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ qe({
    modelValue: {},
    modifications: {},
    editing: { type: Boolean },
    perms: {},
    customData: {},
    form: {},
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
  }, et(tt)),
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
  setup(B, { expose: K, emit: te }) {
    const o = B, n = it(), D = Fe(), c = te, r = d(!0), u = d(o.modelValue), m = d(o.modifications), O = d(o.customData), b = d(o.perms), g = d(o.editing), x = d(!1), E = d(!1), Q = d(!1), T = d(200), I = d(new ye(u.value, o.dataStateConfig)), se = d(new ye(m.value, o.dataStateConfig)), M = d(!1), W = d(new ye(o.readData)), N = d(o.mode === V.Create), pe = d(!1), z = d(!1), G = d(null), t = k(() => !N.value && Array.isArray(b.value) && b.value.includes(Te.Update)), w = k(() => !N.value && Array.isArray(b.value) && b.value.includes(Te.Drop)), h = k(() => !N.value && Array.isArray(b.value) && b.value.includes(Te.SwitchEditMode)), L = d(o.visibleView);
    f(() => o.visibleView, (e) => {
      L.value = e;
    }), f(L, (e) => {
      c("update:modificationView", e);
    }), f(() => o.mode, (e) => {
      N.value = e === V.Create;
    }), f(() => o.perms, (e) => {
      b.value = e;
    }), f(b, (e) => {
      c("update:perms", e);
    }), f(() => o.customData, (e) => {
      O.value = e;
    }), f(O, (e) => {
      c("update:customData", e);
    }), f(() => o.modifications, (e) => {
      se.value.increment(e), m.value = e;
    }, { deep: !0 }), f(m, (e) => {
      Oe(), se.value.increment(e), ue.value === y.Modifications && (M.value = se.value.changed()), c("update:modifications", e);
    }, { deep: !0 });
    const $ = d(Z(o.createButton, s.defaultCreateButton)), j = d(Z(o.updateButton, s.defaultUpdateButton)), P = d(Z(o.dropButton, s.defaultDropButton)), H = d(Z(o.editModeButton, s.defaultEditModeButton)), ne = d(Z(o.groupButton, s.defaultGroupButton));
    f(() => o.createButton, (e) => {
      $.value = Z(e, s.defaultCreateButton);
    }, { deep: !0 }), f(() => o.updateButton, (e) => {
      j.value = Z(e, s.defaultUpdateButton);
    }, { deep: !0 }), f(() => o.dropButton, (e) => {
      P.value = Z(e, s.defaultDropButton);
    }, { deep: !0 }), f(() => o.editModeButton, (e) => {
      H.value = Z(e, s.defaultEditModeButton);
    }, { deep: !0 });
    const ie = async () => {
      var e, a, q;
      C("fetchItem"), r.value = !0, T.value = -1, Q.value = !1, typeof ((e = o.events) == null ? void 0 : e.httpStart) == "function" && o.events.httpStart();
      try {
        const R = await xe(o.readResource, o.readData);
        if (C("fetchItem -> response", R), r.value = !1, T.value = R.httpStatus, O.value = R.custom, !R.success) {
          E.value = !1, T.value = R.httpStatus, typeof ((a = o.events) == null ? void 0 : a.httpEnd) == "function" && o.events.httpEnd({
            httpResponse: R
          }), c("error", R.httpStatus);
          return;
        }
        E.value = !0, u.value = R.data, m.value = R.modifications, b.value = R.perms, I.value.increment(u.value).turnStoredIntoOriginal(), se.value.increment(m.value).turnStoredIntoOriginal(), M.value = I.value.changed(), W.value.turnStoredIntoOriginal(), Object.keys(m.value).length > 0 && (L.value = y.Modifications), typeof ((q = o.events) == null ? void 0 : q.httpEnd) == "function" && o.events.httpEnd({
          httpResponse: R
        }), c("read", R);
      } catch {
        r.value = !1, E.value = !1, T.value = 404, c("error", 404);
        return;
      }
    };
    f(() => o.modelValue, (e) => {
      u.value = e, I.value.increment(e);
    }, { deep: !0 }), f(u, (e) => {
      if (pe.value = !0, C("item updated ->", u.value), typeof o.beforeEmitUpdate == "function") {
        C("item updated -> has beforeEmitUpdate");
        let a = o.beforeEmitUpdate(u.value);
        C("item updated -> override with: ", a), typeof a == "object" && (u.value = a);
      }
      Oe(), c("update:modelValue", u.value), C("item updated -> update dataState"), I.value.increment(e), ue.value === y.Current && (M.value = I.value.changed()), ze(() => pe.value = !1);
    }, { deep: !0 }), f(b, () => c("perms", b.value)), f(M, (e) => {
      c("modified-data", e);
    }), f(() => o.readData, (e) => {
      W.value.increment(e), W.value.changed() && ie();
    }), f(() => o.editing, (e) => {
      C("editing updated -> updating editMode", e), g.value = e;
    }), f(g, (e) => {
      C("editMode updated -> emit update", e), c("update:editing", e);
    });
    const Ae = d(void 0), Oe = () => {
      me.value && (Ae.value = st(u.value, m.value, o.form));
    };
    Qe(() => {
      o.readResource && !N.value ? ie() : (N.value, E.value = !0, g.value = !0, r.value = !1, I.value.increment(u.value).turnStoredIntoOriginal(), M.value = I.value.changed());
    });
    const ke = (e, a) => {
      if (a) {
        if (r.value = !1, typeof e < "u" && (T.value = e.httpStatus, !e.success))
          return Q.value = !0, c("error", e.httpStatus), !1;
        Q.value = !0;
      }
      return !0;
    }, Ee = (e, a) => {
      if (C("doAutoReloadId -> enter: ", e), typeof e < "u" && e.autoReloadId)
        if (C("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), typeof a < "u") {
          let q = a;
          typeof a == "function" && (q = a(e.autoReloadId)), n.push(q);
        } else we.value ? (C("doAutoReloadId -> insideModal: ", o), at(o.modalConfig.modalName, o.modalConfig.modalKey, e.autoReloadId)) : (C("doAutoReloadId -> outsideModal"), o.readData.id = e.autoReloadId, C("doAutoReloadId -> turning off create mode"), N.value = !1, ie());
    }, Be = (e, a) => {
      if (C("onCreate"), !ke(a, $.value.resource)) {
        o.notificationType === ee.Toast && de({
          text: s.defaultCreateErrorText,
          details: s.defaultCreateErrorDetails,
          icon: s.defaultCreateErrorIcon,
          positionX: le.Right
        });
        return;
      }
      z.value = !0, C("onCreate -> turn stored data into original"), I.value.increment(u.value).turnStoredIntoOriginal(), o.notificationType === ee.Toast && de({
        text: s.defaultCreateSuccessText,
        details: s.defaultCreateSuccessDetails,
        icon: s.defaultCreateSuccessIcon,
        positionX: le.Right
      }), Ee(a, o.redirectOnCreate), C("onCreate -> beforeEmitCreate"), c("create", a);
    }, De = (e, a) => {
      if (C("onUpdate"), !ke(a, j.value.resource)) {
        o.notificationType === ee.Toast && de({
          text: s.defaultUpdateErrorText,
          details: s.defaultUpdateErrorDetails,
          icon: s.defaultUpdateErrorIcon,
          positionX: le.Right
        });
        return;
      }
      C("onUpdate -> turn stored data into original"), I.value.turnStoredIntoOriginal(), o.notificationType === ee.Toast && de({
        text: s.defaultUpdateSuccessText,
        details: s.defaultUpdateSuccessDetails,
        icon: s.defaultUpdateSuccessIcon,
        positionX: le.Right
      }), Ee(a), c("update", a);
    }, he = (e, a) => {
      if (C("onDrop"), !ke(a, P.value.resource)) {
        o.notificationType === ee.Toast && de({
          text: s.defaultDropErrorText,
          details: s.defaultDropErrorDetails,
          icon: s.defaultDropErrorIcon,
          positionX: le.Right
        });
        return;
      }
      if (o.notificationType === ee.Toast && de({
        text: s.defaultDropSuccessText,
        details: s.defaultDropSuccessDetails,
        icon: s.defaultDropSuccessIcon,
        positionX: le.Right
      }), c("drop", a), o.view === je.Modal && (C("onDrop -> close modal"), ot(o.modalConfig.modalName, o.modalConfig.modalKey)), typeof o.redirectOnDrop < "u") {
        let q = o.redirectOnDrop;
        typeof o.redirectOnDrop == "function" && (q = o.redirectOnDrop()), n.push(q);
      }
    };
    K({
      doDrop: () => {
        G.value && G.value.doDrop();
      },
      doRefresh: ie,
      doSave: () => {
        G.value && G.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        I.value.increment(u.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => I.value.changed()
    });
    const Je = k(() => {
      var e;
      return I.value.changed() ? (e = o.modalConfig) == null ? void 0 : e.closeConfirm : "";
    }), Ke = (e) => {
      var a;
      if (typeof ((a = o.modalConfig) == null ? void 0 : a.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...e,
          itemCreated: z.value
        });
    }, Ce = k(() => o.title.startsWith("__:") ? String(nt(o.title.substring(3))) : o.title), We = k(() => r.value ? !1 : Ce.value.length > 0 || !!D["post-title"]), we = k(() => o.view === je.Modal), Ne = k(() => we.value ? "lkt-modal" : "section"), ce = k(() => {
      var e, a;
      return o.mode !== V.Update || !t.value || !o.enabledSaveWithoutChanges && !M.value || me.value && !x.value ? !1 : typeof ((e = j.value) == null ? void 0 : e.disabled) == "function" ? !j.value.disabled({
        prop: u.value
      }) : typeof ((a = j.value) == null ? void 0 : a.disabled) == "boolean" ? !j.value.disabled : !0;
    }), fe = k(() => {
      var e, a;
      return o.mode !== V.Create || !o.enabledSaveWithoutChanges && !M.value || me.value && !x.value ? !1 : typeof ((e = $.value) == null ? void 0 : e.disabled) == "function" ? !$.value.disabled({
        prop: u.value
      }) : typeof ((a = $.value) == null ? void 0 : a.disabled) == "boolean" ? !$.value.disabled : !0;
    }), Se = k(() => {
      var e, a;
      return w.value ? typeof ((e = P.value) == null ? void 0 : e.disabled) == "function" ? !P.value.disabled({
        prop: u.value
      }) : typeof ((a = P.value) == null ? void 0 : a.disabled) == "boolean" ? !P.value.disabled : !0 : !1;
    }), Ge = k(() => Ne.value === "lkt-modal" ? {
      title: o.title,
      item: u.value,
      ...o.modalConfig,
      beforeClose: Ke,
      closeConfirm: Je.value,
      headerActionsButton: o.groupButton !== !1 ? {
        dot: fe.value || ce.value
      } : !1
    } : {}), me = k(() => typeof o.form == "object" && Object.keys(o.form).length > 0), Ue = k(() => Object.keys(m.value).length === 0 ? [] : o.modificationViews), ue = k(() => Object.keys(m.value).length === 0 ? y.Current : y.Modifications);
    return (e, a) => {
      const q = ge("lkt-http-info"), R = ge("lkt-form"), He = ge("lkt-loader");
      return v(), A(Ye(Ne.value), S(Ge.value, { class: "lkt-item-crud" }), be({
        default: _(() => [
          Ze("article", pt, [
            !we.value && We.value ? (v(), J("header", vt, [
              i(D)["pre-title"] ? (v(), J("div", ct, [
                U(e.$slots, "pre-title", {
                  item: u.value,
                  loading: r.value
                })
              ])) : p("", !0),
              Ce.value.length > 0 ? (v(), J("h1", ft, _e(Ce.value), 1)) : p("", !0),
              i(D)["post-title"] ? (v(), J("div", mt, [
                U(e.$slots, "post-title", {
                  item: u.value,
                  loading: r.value
                })
              ])) : p("", !0)
            ])) : p("", !0),
            e.buttonNavPosition === i(Ie).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) ? (v(), A(Re, {
              key: 1,
              ref_key: "buttonNav",
              ref: G,
              loading: r.value,
              "onUpdate:loading": a[3] || (a[3] = (l) => r.value = l),
              editing: g.value,
              "onUpdate:editing": a[4] || (a[4] = (l) => g.value = l),
              "picked-modification-view": L.value,
              "onUpdate:pickedModificationView": a[5] || (a[5] = (l) => L.value = l),
              item: u.value,
              modifications: m.value,
              mode: e.mode,
              view: e.view,
              grouped: e.groupButton !== !1,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": $.value,
              "update-button": j.value,
              "drop-button": P.value,
              "edit-mode-button": H.value,
              "group-button": ne.value,
              "data-changed": M.value,
              "http-success-read": E.value,
              "can-update": t.value,
              "can-drop": w.value,
              "can-switch-edit-mode": h.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": fe.value,
              "able-to-update": ce.value,
              "able-to-drop": Se.value,
              perms: b.value,
              "modification-view": Ue.value,
              "editable-view": ue.value,
              onCreate: Be,
              onSave: De,
              onDrop: he
            }, be({ _: 2 }, [
              i(D)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: _(({ canUpdate: l, canDrop: oe, perms: ae }) => [
                  U(e.$slots, "prev-buttons-ever", {
                    canUpdate: l,
                    canDrop: oe,
                    perms: ae
                  })
                ]),
                key: "0"
              } : void 0,
              i(D)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: _(({ canUpdate: l, canDrop: oe, perms: ae }) => [
                  U(e.$slots, "prev-buttons", {
                    canUpdate: l,
                    canDrop: oe,
                    perms: ae
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : p("", !0),
            r.value ? p("", !0) : (v(), J("div", bt, [
              E.value ? (v(), J("div", gt, [
                Q.value && e.notificationType === i(ee).Inline ? (v(), A(q, {
                  key: 0,
                  code: T.value,
                  palette: T.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: a[6] || (a[6] = (l) => Q.value = !1)
                }, null, 8, ["code", "palette"])) : p("", !0),
                me.value ? (v(), A(R, S({
                  key: 1,
                  modelValue: u.value,
                  "onUpdate:modelValue": a[7] || (a[7] = (l) => u.value = l),
                  modifications: m.value,
                  "onUpdate:modifications": a[8] || (a[8] = (l) => m.value = l),
                  valid: x.value,
                  "onUpdate:valid": a[9] || (a[9] = (l) => x.value = l)
                }, {
                  form: e.form,
                  differencesTableConfig: e.differencesTableConfig,
                  visibleView: L.value,
                  modificationDataState: Ae.value,
                  editableViews: [ue.value],
                  disabled: !g.value
                }), null, 16, ["modelValue", "modifications", "valid"])) : U(e.$slots, "item", {
                  key: 2,
                  item: u.value,
                  loading: r.value,
                  editMode: g.value,
                  isCreate: N.value,
                  canUpdate: t.value,
                  canDrop: w.value,
                  itemBeingEdited: pe.value,
                  perms: b.value
                })
              ])) : e.notificationType === i(ee).Inline ? (v(), A(q, {
                key: 1,
                code: T.value
              }, null, 8, ["code"])) : p("", !0)
            ])),
            r.value ? (v(), A(He, { key: 3 })) : p("", !0),
            e.buttonNavPosition === i(Ie).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) ? (v(), A(Re, {
              key: 4,
              ref_key: "buttonNav",
              ref: G,
              loading: r.value,
              "onUpdate:loading": a[10] || (a[10] = (l) => r.value = l),
              editing: g.value,
              "onUpdate:editing": a[11] || (a[11] = (l) => g.value = l),
              "picked-modification-view": L.value,
              "onUpdate:pickedModificationView": a[12] || (a[12] = (l) => L.value = l),
              item: u.value,
              modifications: m.value,
              mode: e.mode,
              view: e.view,
              grouped: e.groupButton !== !1,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": $.value,
              "update-button": j.value,
              "drop-button": P.value,
              "edit-mode-button": H.value,
              "group-button": ne.value,
              "data-changed": M.value,
              "http-success-read": E.value,
              "can-update": t.value,
              "can-drop": w.value,
              "can-switch-edit-mode": h.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": fe.value,
              "able-to-update": ce.value,
              "able-to-drop": Se.value,
              perms: b.value,
              "modification-view": Ue.value,
              "editable-view": ue.value,
              onCreate: Be,
              onSave: De,
              onDrop: he
            }, be({ _: 2 }, [
              i(D)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: _(() => [
                  U(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              i(D)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: _(() => [
                  U(e.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : p("", !0)
          ])
        ]),
        _: 2
      }, [
        e.groupButton !== !1 && e.groupButtonAsModalActions ? {
          name: "header-actions",
          fn: _(() => [
            e.buttonNavPosition === i(Ie).Top ? (v(), A(Re, {
              key: 0,
              ref_key: "buttonNav",
              ref: G,
              loading: r.value,
              "onUpdate:loading": a[0] || (a[0] = (l) => r.value = l),
              editing: g.value,
              "onUpdate:editing": a[1] || (a[1] = (l) => g.value = l),
              "picked-modification-view": L.value,
              "onUpdate:pickedModificationView": a[2] || (a[2] = (l) => L.value = l),
              item: u.value,
              modifications: m.value,
              mode: e.mode,
              view: e.view,
              grouped: !0,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": $.value,
              "update-button": j.value,
              "drop-button": P.value,
              "edit-mode-button": H.value,
              "group-button": ne.value,
              "data-changed": M.value,
              "http-success-read": E.value,
              "can-update": t.value,
              "can-drop": w.value,
              "can-switch-edit-mode": h.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": fe.value,
              "able-to-update": ce.value,
              "able-to-drop": Se.value,
              perms: b.value,
              "modification-view": Ue.value,
              "editable-view": ue.value,
              onCreate: Be,
              onSave: De,
              onDrop: he
            }, be({ _: 2 }, [
              i(D)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: _(({ canUpdate: l, canDrop: oe, perms: ae }) => [
                  U(e.$slots, "prev-buttons-ever", {
                    canUpdate: l,
                    canDrop: oe,
                    perms: ae
                  })
                ]),
                key: "0"
              } : void 0,
              i(D)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: _(({ canUpdate: l, canDrop: oe, perms: ae }) => [
                  U(e.$slots, "prev-buttons", {
                    canUpdate: l,
                    canDrop: oe,
                    perms: ae
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : p("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), It = {
  install: (B, K = {}) => {
    B.component("lkt-item-crud") === void 0 && B.component("lkt-item-crud", yt);
  }
}, Rt = (B) => {
  re.defaultSaveIcon = B;
}, At = (B) => {
  re.defaultDropIcon = B;
};
export {
  Tt as debugLktItemCrud,
  It as default,
  At as setItemCrudDefaultDropIcon,
  Rt as setItemCrudDefaultSaveIcon
};
