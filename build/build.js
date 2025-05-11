import { defineComponent as Pe, ref as d, watch as b, useSlots as Fe, computed as k, resolveComponent as ge, createElementBlock as X, createCommentVNode as p, openBlock as v, createBlock as A, Fragment as Le, renderSlot as U, withDirectives as P, mergeProps as S, normalizeProps as Me, unref as i, createVNode as Y, vShow as F, withCtx as _, mergeDefaults as qe, nextTick as ze, onMounted as Qe, resolveDynamicComponent as Ye, createSlots as be, createElementVNode as Ze, toDisplayString as _e } from "vue";
import { httpCall as xe } from "lkt-http-client";
import { DataState as ye } from "lkt-data-state";
import { ModificationView as g, ItemCrudMode as T, ItemCrudButtonNavVisibility as $e, ButtonType as Te, TablePermission as Ve, ensureButtonConfig as Z, LktSettings as s, ItemCrudView as je, ItemCrudButtonNavPosition as Ie, NotificationType as ee, getDefaultValues as et, ItemCrud as tt, ToastPositionX as le } from "lkt-vue-kernel";
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
}, Vt = (B = !0) => {
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
  setup(B, { expose: J, emit: te }) {
    const o = te, n = B, D = d(n.pickedModificationView);
    b(() => n.pickedModificationView, (t) => D.value = t), b(D, (t) => o("update:pickedModificationView", t));
    const c = Fe(), r = d(null), u = d(null), f = d(n.loading);
    b(() => n.loading, (t) => f.value = t), b(f, (t) => o("update:loading", t));
    const O = d(n.editing);
    b(() => n.editing, (t) => O.value = t), b(O, (t) => o("update:editing", t));
    const m = () => {
      f.value = !0;
    }, y = () => {
      f.value = !1;
    }, x = (t, w) => {
      typeof t > "u" || o("create", t, w);
    }, E = (t, w) => {
      typeof t > "u" || o("save", t, w);
    }, Q = (t, w) => {
      typeof t > "u" || o("drop", t, w);
    }, V = k(() => n.editableView === g.Modifications ? n.modifications : n.item);
    J({
      doSave: () => {
        r.value && typeof r.value.click == "function" && r.value.click();
      },
      doDrop: () => {
        u.value && typeof u.value.click == "function" && u.value.click();
      }
    });
    const M = k(() => !n.canDrop || n.dropButton === !1 ? !1 : !n.canUpdate && n.canDrop ? !0 : !f.value && n.editing && n.httpSuccessRead), K = k(() => n.mode === T.Create && n.createButton === !1 || n.mode === T.Update && n.updateButton === !1 || f.value ? !1 : n.editing && n.httpSuccessRead), N = k(() => n.editModeButton === !1 || !n.canSwitchEditMode || !n.canUpdate && !n.canDrop || !n.canUpdate && n.canDrop ? !1 : !f.value && n.mode !== T.Create && n.httpSuccessRead), pe = k(() => n.buttonNavVisibility === $e.Always || c["prev-buttons-ever"] ? !0 : n.buttonNavVisibility === $e.Never ? !1 : K.value || M.value || N.value), z = k(() => n.modificationView === !1 ? [] : n.modificationView === !0 ? [
      g.Current,
      g.Modifications,
      g.SplitView,
      g.Differences
    ] : Array.isArray(n.modificationView) ? n.modificationView : []), W = k(() => {
      let t = [];
      return z.value.includes(g.Current) && t.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: D.value === g.Current,
        events: {
          click: () => {
            D.value = g.Current;
          }
        }
      }), z.value.includes(g.Modifications) && t.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: D.value === g.Modifications,
        events: {
          click: () => {
            D.value = g.Modifications;
          }
        }
      }), z.value.includes(g.SplitView) && t.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: D.value === g.SplitView,
        events: {
          click: () => {
            D.value = g.SplitView;
          }
        }
      }), z.value.includes(g.Differences) && t.push({
        text: "Differences",
        icon: "lkt-icn-balance",
        disabled: D.value === g.Differences,
        events: {
          click: () => {
            D.value = g.Differences;
          }
        }
      }), t;
    });
    return (t, w) => {
      var G, L, $, j;
      const h = ge("lkt-button");
      return pe.value ? (v(), X("div", ut, [
        t.grouped && t.groupButtonAsModalActions ? (v(), X(Le, { key: 0 }, [
          N.value ? (v(), A(h, S({ key: 0 }, t.editModeButton, {
            checked: O.value,
            "onUpdate:checked": w[0] || (w[0] = (H) => O.value = H),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : p("", !0),
          z.value.length > 0 ? (v(), A(h, Me(S({ key: 1 }, {
            type: i(Te).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: W.value,
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
          P(Y(h, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.updateButton,
            resourceData: {
              ...(G = t.updateButton) == null ? void 0 : G.resourceData,
              ...V.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: m,
            onLoaded: y,
            onClick: E
          }), null, 16), [
            [F, t.mode === i(T).Update && K.value]
          ]),
          P(Y(h, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.createButton,
            resourceData: {
              ...(L = t.createButton) == null ? void 0 : L.resourceData,
              ...V.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: m,
            onLoaded: y,
            onClick: x
          }), null, 16), [
            [F, t.mode === i(T).Create && K.value]
          ]),
          P(Y(h, S({
            ref_key: "dropButtonRef",
            ref: u
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: m,
            onLoaded: y,
            onClick: Q
          }), null, 16, ["disabled"]), [
            [F, M.value && t.mode !== i(T).Create]
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
                type: i(Te).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: W.value,
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
              P(Y(h, S({
                ref_key: "saveButtonRef",
                ref: r
              }, {
                ...t.updateButton,
                resourceData: {
                  ...(H = t.updateButton) == null ? void 0 : H.resourceData,
                  ...V.value
                },
                disabled: !t.ableToUpdate
              }, {
                onLoading: m,
                onLoaded: y,
                onClick: E
              }), null, 16), [
                [F, t.mode === i(T).Update && K.value]
              ]),
              P(Y(h, S({
                ref_key: "saveButtonRef",
                ref: r
              }, {
                ...t.createButton,
                resourceData: {
                  ...(ne = t.createButton) == null ? void 0 : ne.resourceData,
                  ...V.value
                },
                disabled: !t.ableToCreate
              }, {
                disabled: !t.ableToCreate,
                onLoading: m,
                onLoaded: y,
                onClick: x
              }), null, 16, ["disabled"]), [
                [F, t.mode === i(T).Create && K.value]
              ]),
              P(Y(h, S({
                ref_key: "dropButtonRef",
                ref: u
              }, t.dropButton, {
                disabled: !t.ableToDrop,
                onLoading: m,
                onLoaded: y,
                onClick: Q
              }), null, 16, ["disabled"]), [
                [F, M.value && t.mode !== i(T).Create]
              ]),
              i(c).buttons ? U(t.$slots, "buttons", { key: 4 }) : p("", !0)
            ];
          }),
          _: 3
        }, 16)) : (v(), X(Le, { key: 2 }, [
          i(c)["prev-buttons-ever"] ? P((v(), X("div", lt, [
            U(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [F, !f.value]
          ]) : p("", !0),
          i(c)["prev-buttons"] ? P((v(), X("div", dt, [
            U(t.$slots, "prev-buttons", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [F, O.value && !f.value]
          ]) : p("", !0),
          P(Y(h, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.updateButton,
            resourceData: {
              ...($ = t.updateButton) == null ? void 0 : $.resourceData,
              ...V.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: m,
            onLoaded: y,
            onClick: E
          }), null, 16), [
            [F, t.mode === i(T).Update && K.value]
          ]),
          P(Y(h, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.createButton,
            resourceData: {
              ...(j = t.createButton) == null ? void 0 : j.resourceData,
              ...V.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: m,
            onLoaded: y,
            onClick: x
          }), null, 16), [
            [F, t.mode === i(T).Create && K.value]
          ]),
          P(Y(h, S({
            ref_key: "dropButtonRef",
            ref: u
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: m,
            onLoaded: y,
            onClick: Q
          }), null, 16, ["disabled"]), [
            [F, M.value && t.mode !== i(T).Create]
          ]),
          i(c).buttons ? P((v(), X("div", rt, [
            U(t.$slots, "buttons")
          ], 512)), [
            [F, O.value && !f.value]
          ]) : p("", !0),
          z.value.length > 0 ? (v(), A(h, Me(S({ key: 3 }, {
            type: i(Te).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: W.value,
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
}), st = (B, J, te) => {
  let o = new ye(JSON.parse(JSON.stringify(B)), {
    onlyProps: Xe(te),
    recursiveOnlyProps: !1
  });
  return o.increment(JSON.parse(JSON.stringify(J))), o;
}, Xe = (B) => {
  if (B.items === void 0) return [];
  if (B.items.length === 0) return [];
  let J = [];
  for (let te in B.items) {
    let o = B.items[te];
    switch (o.type) {
      case "field":
        o.key !== void 0 && J.push(o.key);
        break;
      case "form":
        o.form && (J = [...J, ...Xe(o.form)]);
        break;
    }
  }
  return J;
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
    modificationView: { type: [Boolean, Array] },
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
    "read",
    "create",
    "update",
    "drop",
    "before-save",
    "perms",
    "error",
    "modified-data"
  ],
  setup(B, { expose: J, emit: te }) {
    const o = B, n = it(), D = Fe(), c = te, r = d(!0), u = d(o.modelValue), f = d(o.modifications), O = d(o.customData), m = d(o.perms), y = d(o.editing), x = d(!1), E = d(!1), Q = d(!1), V = d(200), I = d(new ye(u.value, o.dataStateConfig)), se = d(new ye(f.value, o.dataStateConfig)), M = d(!1), K = d(new ye(o.readData)), N = d(o.mode === T.Create), pe = d(!1), z = d(!1), W = d(null), t = k(() => !N.value && Array.isArray(m.value) && m.value.includes(Ve.Update)), w = k(() => !N.value && Array.isArray(m.value) && m.value.includes(Ve.Drop)), h = k(() => !N.value && Array.isArray(m.value) && m.value.includes(Ve.SwitchEditMode)), G = d(g.Current);
    b(() => o.mode, (e) => {
      N.value = e === T.Create;
    }), b(() => o.perms, (e) => {
      m.value = e;
    }), b(m, (e) => {
      c("update:perms", e);
    }), b(() => o.customData, (e) => {
      O.value = e;
    }), b(O, (e) => {
      c("update:customData", e);
    }), b(() => o.modifications, (e) => {
      se.value.increment(e), f.value = e;
    }, { deep: !0 }), b(f, (e) => {
      Oe(), se.value.increment(e), ue.value === g.Modifications && (M.value = se.value.changed()), c("update:modifications", e);
    }, { deep: !0 });
    const L = d(Z(o.createButton, s.defaultCreateButton)), $ = d(Z(o.updateButton, s.defaultUpdateButton)), j = d(Z(o.dropButton, s.defaultDropButton)), H = d(Z(o.editModeButton, s.defaultEditModeButton)), ne = d(Z(o.groupButton, s.defaultGroupButton));
    b(() => o.createButton, (e) => {
      L.value = Z(e, s.defaultCreateButton);
    }, { deep: !0 }), b(() => o.updateButton, (e) => {
      $.value = Z(e, s.defaultUpdateButton);
    }, { deep: !0 }), b(() => o.dropButton, (e) => {
      j.value = Z(e, s.defaultDropButton);
    }, { deep: !0 }), b(() => o.editModeButton, (e) => {
      H.value = Z(e, s.defaultEditModeButton);
    }, { deep: !0 });
    const ie = async () => {
      var e, a, q;
      C("fetchItem"), r.value = !0, V.value = -1, Q.value = !1, typeof ((e = o.events) == null ? void 0 : e.httpStart) == "function" && o.events.httpStart();
      try {
        const R = await xe(o.readResource, o.readData);
        if (C("fetchItem -> response", R), r.value = !1, V.value = R.httpStatus, O.value = R.custom, !R.success) {
          E.value = !1, V.value = R.httpStatus, typeof ((a = o.events) == null ? void 0 : a.httpEnd) == "function" && o.events.httpEnd({
            httpResponse: R
          }), c("error", R.httpStatus);
          return;
        }
        E.value = !0, u.value = R.data, f.value = R.modifications, m.value = R.perms, I.value.increment(u.value).turnStoredIntoOriginal(), se.value.increment(f.value).turnStoredIntoOriginal(), M.value = I.value.changed(), K.value.turnStoredIntoOriginal(), Object.keys(f.value).length > 0 && (G.value = g.Modifications), typeof ((q = o.events) == null ? void 0 : q.httpEnd) == "function" && o.events.httpEnd({
          httpResponse: R
        }), c("read", R);
      } catch {
        r.value = !1, E.value = !1, V.value = 404, c("error", 404);
        return;
      }
    };
    b(() => o.modelValue, (e) => {
      u.value = e, I.value.increment(e);
    }, { deep: !0 }), b(u, (e) => {
      if (pe.value = !0, C("item updated ->", u.value), typeof o.beforeEmitUpdate == "function") {
        C("item updated -> has beforeEmitUpdate");
        let a = o.beforeEmitUpdate(u.value);
        C("item updated -> override with: ", a), typeof a == "object" && (u.value = a);
      }
      Oe(), c("update:modelValue", u.value), C("item updated -> update dataState"), I.value.increment(e), ue.value === g.Current && (M.value = I.value.changed()), ze(() => pe.value = !1);
    }, { deep: !0 }), b(m, () => c("perms", m.value)), b(M, (e) => {
      c("modified-data", e);
    }), b(() => o.readData, (e) => {
      K.value.increment(e), K.value.changed() && ie();
    }), b(() => o.editing, (e) => {
      C("editing updated -> updating editMode", e), y.value = e;
    }), b(y, (e) => {
      C("editMode updated -> emit update", e), c("update:editing", e);
    });
    const Ae = d(void 0), Oe = () => {
      me.value && (Ae.value = st(u.value, f.value, o.form));
    };
    Qe(() => {
      o.readResource && !N.value ? ie() : (N.value, E.value = !0, y.value = !0, r.value = !1, I.value.increment(u.value).turnStoredIntoOriginal(), M.value = I.value.changed());
    });
    const ke = (e, a) => {
      if (a) {
        if (r.value = !1, typeof e < "u" && (V.value = e.httpStatus, !e.success))
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
      if (C("onCreate"), !ke(a, L.value.resource)) {
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
      if (C("onUpdate"), !ke(a, $.value.resource)) {
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
      if (C("onDrop"), !ke(a, j.value.resource)) {
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
    J({
      doDrop: () => {
        W.value && W.value.doDrop();
      },
      doRefresh: ie,
      doSave: () => {
        W.value && W.value.doSave();
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
      return o.mode !== T.Update || !t.value || !o.enabledSaveWithoutChanges && !M.value || me.value && !x.value ? !1 : typeof ((e = $.value) == null ? void 0 : e.disabled) == "function" ? !$.value.disabled({
        prop: u.value
      }) : typeof ((a = $.value) == null ? void 0 : a.disabled) == "boolean" ? !$.value.disabled : !0;
    }), fe = k(() => {
      var e, a;
      return o.mode !== T.Create || !o.enabledSaveWithoutChanges && !M.value || me.value && !x.value ? !1 : typeof ((e = L.value) == null ? void 0 : e.disabled) == "function" ? !L.value.disabled({
        prop: u.value
      }) : typeof ((a = L.value) == null ? void 0 : a.disabled) == "boolean" ? !L.value.disabled : !0;
    }), Se = k(() => {
      var e, a;
      return w.value ? typeof ((e = j.value) == null ? void 0 : e.disabled) == "function" ? !j.value.disabled({
        prop: u.value
      }) : typeof ((a = j.value) == null ? void 0 : a.disabled) == "boolean" ? !j.value.disabled : !0 : !1;
    }), Ge = k(() => Ne.value === "lkt-modal" ? {
      title: o.title,
      item: u.value,
      ...o.modalConfig,
      beforeClose: Ke,
      closeConfirm: Je.value,
      headerActionsButton: o.groupButton !== !1 ? {
        dot: fe.value || ce.value
      } : !1
    } : {}), me = k(() => typeof o.form == "object" && Object.keys(o.form).length > 0), Ue = k(() => Object.keys(f.value).length === 0 ? [] : o.modificationView), ue = k(() => Object.keys(f.value).length === 0 ? g.Current : g.Modifications);
    return (e, a) => {
      const q = ge("lkt-http-info"), R = ge("lkt-form"), He = ge("lkt-loader");
      return v(), A(Ye(Ne.value), S(Ge.value, { class: "lkt-item-crud" }), be({
        default: _(() => [
          Ze("article", pt, [
            !we.value && We.value ? (v(), X("header", vt, [
              i(D)["pre-title"] ? (v(), X("div", ct, [
                U(e.$slots, "pre-title", {
                  item: u.value,
                  loading: r.value
                })
              ])) : p("", !0),
              Ce.value.length > 0 ? (v(), X("h1", ft, _e(Ce.value), 1)) : p("", !0),
              i(D)["post-title"] ? (v(), X("div", mt, [
                U(e.$slots, "post-title", {
                  item: u.value,
                  loading: r.value
                })
              ])) : p("", !0)
            ])) : p("", !0),
            e.buttonNavPosition === i(Ie).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) ? (v(), A(Re, {
              key: 1,
              ref_key: "buttonNav",
              ref: W,
              loading: r.value,
              "onUpdate:loading": a[3] || (a[3] = (l) => r.value = l),
              editing: y.value,
              "onUpdate:editing": a[4] || (a[4] = (l) => y.value = l),
              "picked-modification-view": G.value,
              "onUpdate:pickedModificationView": a[5] || (a[5] = (l) => G.value = l),
              item: u.value,
              modifications: f.value,
              mode: e.mode,
              view: e.view,
              grouped: e.groupButton !== !1,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": L.value,
              "update-button": $.value,
              "drop-button": j.value,
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
              perms: m.value,
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
            r.value ? p("", !0) : (v(), X("div", bt, [
              E.value ? (v(), X("div", gt, [
                Q.value && e.notificationType === i(ee).Inline ? (v(), A(q, {
                  key: 0,
                  code: V.value,
                  palette: V.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: a[6] || (a[6] = (l) => Q.value = !1)
                }, null, 8, ["code", "palette"])) : p("", !0),
                me.value ? (v(), A(R, S({
                  key: 1,
                  modelValue: u.value,
                  "onUpdate:modelValue": a[7] || (a[7] = (l) => u.value = l),
                  modifications: f.value,
                  "onUpdate:modifications": a[8] || (a[8] = (l) => f.value = l),
                  valid: x.value,
                  "onUpdate:valid": a[9] || (a[9] = (l) => x.value = l)
                }, {
                  form: e.form,
                  differencesTableConfig: e.differencesTableConfig,
                  visibleView: G.value,
                  modificationDataState: Ae.value,
                  editableViews: [ue.value],
                  disabled: !y.value
                }), null, 16, ["modelValue", "modifications", "valid"])) : U(e.$slots, "item", {
                  key: 2,
                  item: u.value,
                  loading: r.value,
                  editMode: y.value,
                  isCreate: N.value,
                  canUpdate: t.value,
                  canDrop: w.value,
                  itemBeingEdited: pe.value,
                  perms: m.value
                })
              ])) : e.notificationType === i(ee).Inline ? (v(), A(q, {
                key: 1,
                code: V.value
              }, null, 8, ["code"])) : p("", !0)
            ])),
            r.value ? (v(), A(He, { key: 3 })) : p("", !0),
            e.buttonNavPosition === i(Ie).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) ? (v(), A(Re, {
              key: 4,
              ref_key: "buttonNav",
              ref: W,
              loading: r.value,
              "onUpdate:loading": a[10] || (a[10] = (l) => r.value = l),
              editing: y.value,
              "onUpdate:editing": a[11] || (a[11] = (l) => y.value = l),
              "picked-modification-view": G.value,
              "onUpdate:pickedModificationView": a[12] || (a[12] = (l) => G.value = l),
              item: u.value,
              modifications: f.value,
              mode: e.mode,
              view: e.view,
              grouped: e.groupButton !== !1,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": L.value,
              "update-button": $.value,
              "drop-button": j.value,
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
              perms: m.value,
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
              ref: W,
              loading: r.value,
              "onUpdate:loading": a[0] || (a[0] = (l) => r.value = l),
              editing: y.value,
              "onUpdate:editing": a[1] || (a[1] = (l) => y.value = l),
              "picked-modification-view": G.value,
              "onUpdate:pickedModificationView": a[2] || (a[2] = (l) => G.value = l),
              item: u.value,
              modifications: f.value,
              mode: e.mode,
              view: e.view,
              grouped: !0,
              "button-nav-visibility": e.buttonNavVisibility,
              "create-button": L.value,
              "update-button": $.value,
              "drop-button": j.value,
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
              perms: m.value,
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
  install: (B, J = {}) => {
    B.component("lkt-item-crud") === void 0 && B.component("lkt-item-crud", yt);
  }
}, Rt = (B) => {
  re.defaultSaveIcon = B;
}, At = (B) => {
  re.defaultDropIcon = B;
};
export {
  Vt as debugLktItemCrud,
  It as default,
  At as setItemCrudDefaultDropIcon,
  Rt as setItemCrudDefaultSaveIcon
};
