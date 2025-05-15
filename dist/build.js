import { defineComponent as Fe, ref as d, watch as f, useSlots as Xe, computed as y, resolveComponent as ye, createElementBlock as J, createCommentVNode as p, openBlock as v, createBlock as A, Fragment as $e, renderSlot as U, withDirectives as F, mergeProps as S, normalizeProps as Ve, unref as n, createVNode as Y, vShow as X, withCtx as _, mergeDefaults as ze, nextTick as Qe, onMounted as Ye, resolveDynamicComponent as Ze, createSlots as ge, createElementVNode as _e, toDisplayString as xe } from "vue";
import { httpCall as et } from "lkt-http-client";
import { DataState as ke } from "lkt-data-state";
import { ModificationView as g, ItemCrudMode as T, ItemCrudButtonNavVisibility as je, ButtonType as Te, TablePermission as Ie, ensureButtonConfig as Z, LktSettings as s, ItemCrudView as Pe, ItemCrudButtonNavPosition as Re, NotificationType as ee, getDefaultValues as tt, ItemCrud as ot, ToastPositionX as de } from "lkt-vue-kernel";
import { closeModal as at, updateModalKey as it } from "lkt-modal";
import { __ as nt } from "lkt-i18n";
import { openToast as re } from "lkt-toast";
import { useRouter as ut } from "vue-router";
const ve = class ve {
};
ve.debugEnabled = !1, ve.defaultSaveIcon = "", ve.defaultDropIcon = "";
let se = ve;
const D = (...B) => {
  se.debugEnabled && console.info("[LktItemCrud] ", ...B);
}, It = (B = !0) => {
  se.debugEnabled = B;
}, lt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, dt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, rt = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, st = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, Ae = /* @__PURE__ */ Fe({
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
    const o = te, i = B, C = d(i.pickedModificationView);
    f(() => i.pickedModificationView, (t) => C.value = t), f(C, (t) => o("update:pickedModificationView", t));
    const c = Xe(), r = d(null), u = d(null), m = d(i.loading);
    f(() => i.loading, (t) => m.value = t), f(m, (t) => o("update:loading", t));
    const O = d(i.editing);
    f(() => i.editing, (t) => O.value = t), f(O, (t) => o("update:editing", t));
    const b = () => {
      m.value = !0;
    }, k = () => {
      m.value = !1;
    }, x = (t, w) => {
      typeof t > "u" || o("create", t, w);
    }, N = (t, w) => {
      typeof t > "u" || o("save", t, w);
    }, Q = (t, w) => {
      typeof t > "u" || o("drop", t, w);
    }, I = y(() => i.editableView === g.Modifications ? i.modifications : i.item);
    K({
      doSave: () => {
        r.value && typeof r.value.click == "function" && r.value.click();
      },
      doDrop: () => {
        u.value && typeof u.value.click == "function" && u.value.click();
      }
    });
    const M = y(() => !i.canDrop || i.dropButton === !1 ? !1 : !i.canUpdate && i.canDrop ? !0 : !m.value && i.editing && i.httpSuccessRead), W = y(() => i.mode === T.Create && i.createButton === !1 || i.mode === T.Update && i.updateButton === !1 || m.value ? !1 : i.editing && i.httpSuccessRead), E = y(() => i.editModeButton === !1 || !i.canSwitchEditMode || !i.canUpdate && !i.canDrop || !i.canUpdate && i.canDrop ? !1 : !m.value && i.mode !== T.Create && i.httpSuccessRead), pe = y(() => i.buttonNavVisibility === je.Always || c["prev-buttons-ever"] ? !0 : i.buttonNavVisibility === je.Never ? !1 : W.value || M.value || E.value), z = y(() => i.modificationView === !1 ? [] : i.modificationView === !0 ? [
      g.Current,
      g.Modifications,
      g.SplitView,
      g.Differences
    ] : Array.isArray(i.modificationView) ? i.modificationView : []), H = y(() => {
      let t = [];
      return z.value.includes(g.Current) && t.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: C.value === g.Current,
        events: {
          click: () => {
            C.value = g.Current;
          }
        }
      }), z.value.includes(g.Modifications) && t.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: C.value === g.Modifications,
        events: {
          click: () => {
            C.value = g.Modifications;
          }
        }
      }), z.value.includes(g.SplitView) && t.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: C.value === g.SplitView,
        events: {
          click: () => {
            C.value = g.SplitView;
          }
        }
      }), z.value.includes(g.Differences) && t.push({
        text: "Differences",
        icon: "lkt-icn-balance",
        disabled: C.value === g.Differences,
        events: {
          click: () => {
            C.value = g.Differences;
          }
        }
      }), t;
    });
    return (t, w) => {
      var L, $, j, P;
      const h = ye("lkt-button");
      return pe.value ? (v(), J("div", lt, [
        t.grouped && t.groupButtonAsModalActions ? (v(), J($e, { key: 0 }, [
          E.value ? (v(), A(h, S({ key: 0 }, t.editModeButton, {
            checked: O.value,
            "onUpdate:checked": w[0] || (w[0] = (G) => O.value = G),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : p("", !0),
          z.value.length > 0 ? (v(), A(h, Ve(S({ key: 1 }, {
            type: n(Te).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: H.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : p("", !0),
          n(c)["prev-buttons-ever"] ? U(t.$slots, "prev-buttons-ever", {
            key: 2,
            canUpdate: t.canUpdate,
            canDrop: t.canDrop,
            perms: t.perms
          }) : p("", !0),
          n(c)["prev-buttons"] ? U(t.$slots, "prev-buttons", {
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
              ...I.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: b,
            onLoaded: k,
            onClick: N
          }), null, 16), [
            [X, t.mode === n(T).Update && W.value]
          ]),
          F(Y(h, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.createButton,
            resourceData: {
              ...($ = t.createButton) == null ? void 0 : $.resourceData,
              ...I.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: b,
            onLoaded: k,
            onClick: x
          }), null, 16), [
            [X, t.mode === n(T).Create && W.value]
          ]),
          F(Y(h, S({
            ref_key: "dropButtonRef",
            ref: u
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: b,
            onLoaded: k,
            onClick: Q
          }), null, 16, ["disabled"]), [
            [X, M.value && t.mode !== n(T).Create]
          ]),
          n(c).buttons ? U(t.$slots, "buttons", { key: 4 }) : p("", !0)
        ], 64)) : t.grouped ? (v(), A(h, S({
          key: 1,
          ref: "groupButton"
        }, t.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: _(() => {
            var G, ue;
            return [
              E.value ? (v(), A(h, S({ key: 0 }, t.editModeButton, {
                checked: O.value,
                "onUpdate:checked": w[1] || (w[1] = (le) => O.value = le),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : p("", !0),
              z.value.length > 0 ? (v(), A(h, Ve(S({ key: 1 }, {
                type: n(Te).Tooltip,
                icon: "lkt-icn-cross-arrows",
                class: "lkt-item-crud--modifications-button",
                splitButtons: H.value,
                tooltip: {
                  contentClass: "lkt-flex-column"
                }
              })), null, 16)) : p("", !0),
              n(c)["prev-buttons-ever"] ? U(t.$slots, "prev-buttons-ever", {
                key: 2,
                canUpdate: t.canUpdate,
                canDrop: t.canDrop,
                perms: t.perms
              }) : p("", !0),
              n(c)["prev-buttons"] ? U(t.$slots, "prev-buttons", {
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
                  ...(G = t.updateButton) == null ? void 0 : G.resourceData,
                  ...I.value
                },
                disabled: !t.ableToUpdate
              }, {
                onLoading: b,
                onLoaded: k,
                onClick: N
              }), null, 16), [
                [X, t.mode === n(T).Update && W.value]
              ]),
              F(Y(h, S({
                ref_key: "saveButtonRef",
                ref: r
              }, {
                ...t.createButton,
                resourceData: {
                  ...(ue = t.createButton) == null ? void 0 : ue.resourceData,
                  ...I.value
                },
                disabled: !t.ableToCreate
              }, {
                disabled: !t.ableToCreate,
                onLoading: b,
                onLoaded: k,
                onClick: x
              }), null, 16, ["disabled"]), [
                [X, t.mode === n(T).Create && W.value]
              ]),
              F(Y(h, S({
                ref_key: "dropButtonRef",
                ref: u
              }, t.dropButton, {
                disabled: !t.ableToDrop,
                onLoading: b,
                onLoaded: k,
                onClick: Q
              }), null, 16, ["disabled"]), [
                [X, M.value && t.mode !== n(T).Create]
              ]),
              n(c).buttons ? U(t.$slots, "buttons", { key: 4 }) : p("", !0)
            ];
          }),
          _: 3
        }, 16)) : (v(), J($e, { key: 2 }, [
          n(c)["prev-buttons-ever"] ? F((v(), J("div", dt, [
            U(t.$slots, "prev-buttons-ever", {
              canUpdate: t.canUpdate,
              canDrop: t.canDrop,
              perms: t.perms
            })
          ], 512)), [
            [X, !m.value]
          ]) : p("", !0),
          n(c)["prev-buttons"] ? F((v(), J("div", rt, [
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
              ...I.value
            },
            disabled: !t.ableToUpdate
          }, {
            onLoading: b,
            onLoaded: k,
            onClick: N
          }), null, 16), [
            [X, t.mode === n(T).Update && W.value]
          ]),
          F(Y(h, S({
            ref_key: "saveButtonRef",
            ref: r
          }, {
            ...t.createButton,
            resourceData: {
              ...(P = t.createButton) == null ? void 0 : P.resourceData,
              ...I.value
            },
            disabled: !t.ableToCreate
          }, {
            onLoading: b,
            onLoaded: k,
            onClick: x
          }), null, 16), [
            [X, t.mode === n(T).Create && W.value]
          ]),
          F(Y(h, S({
            ref_key: "dropButtonRef",
            ref: u
          }, t.dropButton, {
            disabled: !t.ableToDrop,
            onLoading: b,
            onLoaded: k,
            onClick: Q
          }), null, 16, ["disabled"]), [
            [X, M.value && t.mode !== n(T).Create]
          ]),
          n(c).buttons ? F((v(), J("div", st, [
            U(t.$slots, "buttons")
          ], 512)), [
            [X, O.value && !m.value]
          ]) : p("", !0),
          z.value.length > 0 ? (v(), A(h, Ve(S({ key: 3 }, {
            type: n(Te).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: H.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : p("", !0),
          E.value ? (v(), A(h, S({ key: 4 }, t.editModeButton, {
            checked: O.value,
            "onUpdate:checked": w[2] || (w[2] = (G) => O.value = G),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : p("", !0)
        ], 64))
      ])) : p("", !0);
    };
  }
}), pt = (B, K, te) => {
  let o = new ke(JSON.parse(JSON.stringify(B)), {
    onlyProps: Je(te),
    recursiveOnlyProps: !1
  });
  return o.increment(JSON.parse(JSON.stringify(K))), o;
}, Je = (B) => {
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
        o.form && (K = [...K, ...Je(o.form)]);
        break;
    }
  }
  return K;
}, vt = { class: "lkt-item-crud" }, ct = {
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
}, kt = /* @__PURE__ */ Fe({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ ze({
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
  }, tt(ot)),
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
    const o = B, i = ut(), C = Xe(), c = te, r = d(!0), u = d(o.modelValue), m = d(o.modifications), O = d(o.customData), b = d(o.perms), k = d(o.editing), x = d(!1), N = d(!1), Q = d(!1), I = d(200), R = d(new ke(u.value, o.dataStateConfig)), ne = d(new ke(m.value, o.dataStateConfig)), M = d(!1), W = d(new ke(o.readData)), E = d(o.mode === T.Create), pe = d(!1), z = d(!1), H = d(null), t = y(() => !E.value && Array.isArray(b.value) && b.value.includes(Ie.Update)), w = y(() => !E.value && Array.isArray(b.value) && b.value.includes(Ie.Drop)), h = y(() => !E.value && Array.isArray(b.value) && b.value.includes(Ie.SwitchEditMode)), L = d(o.visibleView);
    f(() => o.visibleView, (e) => {
      L.value = e;
    }), f(L, (e) => {
      c("update:modificationView", e);
    }), f(() => o.mode, (e) => {
      E.value = e === T.Create;
    }), f(() => o.perms, (e) => {
      b.value = e;
    }), f(b, (e) => {
      c("update:perms", e);
    }), f(() => o.customData, (e) => {
      O.value = e;
    }), f(O, (e) => {
      c("update:customData", e);
    }), f(() => o.modifications, (e) => {
      ne.value.increment(e), m.value = e;
    }, { deep: !0 }), f(m, (e) => {
      Ee(), ne.value.increment(e), oe.value === g.Modifications && (M.value = ne.value.changed()), c("update:modifications", e);
    }, { deep: !0 });
    const $ = d(Z(o.createButton, s.defaultCreateButton)), j = d(Z(o.updateButton, s.defaultUpdateButton)), P = d(Z(o.dropButton, s.defaultDropButton)), G = d(Z(o.editModeButton, s.defaultEditModeButton)), ue = d(Z(o.groupButton, s.defaultGroupButton));
    f(() => o.createButton, (e) => {
      $.value = Z(e, s.defaultCreateButton);
    }, { deep: !0 }), f(() => o.updateButton, (e) => {
      j.value = Z(e, s.defaultUpdateButton);
    }, { deep: !0 }), f(() => o.dropButton, (e) => {
      P.value = Z(e, s.defaultDropButton);
    }, { deep: !0 }), f(() => o.editModeButton, (e) => {
      G.value = Z(e, s.defaultEditModeButton);
    }, { deep: !0 });
    const le = async () => {
      var e, a, q;
      D("fetchItem"), r.value = !0, I.value = -1, Q.value = !1, typeof ((e = o.events) == null ? void 0 : e.httpStart) == "function" && o.events.httpStart();
      try {
        const V = await et(o.readResource, o.readData);
        if (D("fetchItem -> response", V), r.value = !1, I.value = V.httpStatus, O.value = V.custom, !V.success) {
          N.value = !1, I.value = V.httpStatus, typeof ((a = o.events) == null ? void 0 : a.httpEnd) == "function" && o.events.httpEnd({
            httpResponse: V
          }), c("error", V.httpStatus);
          return;
        }
        N.value = !0, u.value = V.data, m.value = Array.isArray(V.modifications) ? {} : V.modifications, b.value = V.perms, R.value.increment(u.value).turnStoredIntoOriginal(), ne.value.increment(m.value).turnStoredIntoOriginal(), M.value = R.value.changed(), W.value.turnStoredIntoOriginal(), Object.keys(m.value).length > 0 && (L.value = g.Modifications), typeof ((q = o.events) == null ? void 0 : q.httpEnd) == "function" && o.events.httpEnd({
          httpResponse: V
        }), c("read", V);
      } catch {
        r.value = !1, N.value = !1, I.value = 404, c("error", 404);
        return;
      }
    };
    f(() => o.modelValue, (e) => {
      u.value = e, R.value.increment(e);
    }, { deep: !0 }), f(u, (e) => {
      if (pe.value = !0, D("item updated ->", u.value), typeof o.beforeEmitUpdate == "function") {
        D("item updated -> has beforeEmitUpdate");
        let a = o.beforeEmitUpdate(u.value);
        D("item updated -> override with: ", a), typeof a == "object" && (u.value = a);
      }
      Ee(), c("update:modelValue", u.value), D("item updated -> update dataState"), R.value.increment(e), oe.value === g.Current && (M.value = R.value.changed()), Qe(() => pe.value = !1);
    }, { deep: !0 }), f(b, () => c("perms", b.value)), f(M, (e) => {
      c("modified-data", e);
    }), f(() => o.readData, (e) => {
      W.value.increment(e), W.value.changed() && le();
    }), f(() => o.editing, (e) => {
      D("editing updated -> updating editMode", e), k.value = e;
    }), f(k, (e) => {
      D("editMode updated -> emit update", e), c("update:editing", e);
    });
    const Oe = d(void 0), Ee = () => {
      me.value && (Oe.value = pt(u.value, m.value, o.form));
    };
    Ye(() => {
      o.readResource && !E.value ? le() : (E.value, N.value = !0, k.value = !0, r.value = !1, R.value.increment(u.value).turnStoredIntoOriginal(), M.value = R.value.changed());
    });
    const Be = (e, a) => {
      if (a) {
        if (r.value = !1, typeof e < "u" && (I.value = e.httpStatus, !e.success))
          return Q.value = !0, c("error", e.httpStatus), !1;
        Q.value = !0;
      }
      return !0;
    }, Ne = (e, a) => {
      if (D("doAutoReloadId -> enter: ", e), typeof e < "u" && e.autoReloadId)
        if (D("doAutoReloadId -> autoReloadId detected: ", e.autoReloadId), typeof a < "u") {
          let q = a;
          typeof a == "function" && (q = a(e.autoReloadId)), i.push(q);
        } else Se.value ? (D("doAutoReloadId -> insideModal: ", o), it(o.modalConfig.modalName, o.modalConfig.modalKey, e.autoReloadId)) : (D("doAutoReloadId -> outsideModal"), o.readData.id = e.autoReloadId, D("doAutoReloadId -> turning off create mode"), E.value = !1, le());
    }, Ce = (e, a) => {
      if (D("onCreate"), !Be(a, $.value.resource)) {
        o.notificationType === ee.Toast && re({
          text: s.defaultCreateErrorText,
          details: s.defaultCreateErrorDetails,
          icon: s.defaultCreateErrorIcon,
          positionX: de.Right
        });
        return;
      }
      z.value = !0, D("onCreate -> turn stored data into original"), R.value.increment(u.value).turnStoredIntoOriginal(), o.notificationType === ee.Toast && re({
        text: s.defaultCreateSuccessText,
        details: s.defaultCreateSuccessDetails,
        icon: s.defaultCreateSuccessIcon,
        positionX: de.Right
      }), Ne(a, o.redirectOnCreate), D("onCreate -> beforeEmitCreate"), c("create", a);
    }, he = (e, a) => {
      if (D("onUpdate"), !Be(a, j.value.resource)) {
        o.notificationType === ee.Toast && re({
          text: s.defaultUpdateErrorText,
          details: s.defaultUpdateErrorDetails,
          icon: s.defaultUpdateErrorIcon,
          positionX: de.Right
        });
        return;
      }
      D("onUpdate -> turn stored data into original"), R.value.turnStoredIntoOriginal(), o.notificationType === ee.Toast && re({
        text: s.defaultUpdateSuccessText,
        details: s.defaultUpdateSuccessDetails,
        icon: s.defaultUpdateSuccessIcon,
        positionX: de.Right
      }), Ne(a), c("update", a);
    }, De = (e, a) => {
      if (D("onDrop"), !Be(a, P.value.resource)) {
        o.notificationType === ee.Toast && re({
          text: s.defaultDropErrorText,
          details: s.defaultDropErrorDetails,
          icon: s.defaultDropErrorIcon,
          positionX: de.Right
        });
        return;
      }
      if (o.notificationType === ee.Toast && re({
        text: s.defaultDropSuccessText,
        details: s.defaultDropSuccessDetails,
        icon: s.defaultDropSuccessIcon,
        positionX: de.Right
      }), c("drop", a), o.view === Pe.Modal && (D("onDrop -> close modal"), at(o.modalConfig.modalName, o.modalConfig.modalKey)), typeof o.redirectOnDrop < "u") {
        let q = o.redirectOnDrop;
        typeof o.redirectOnDrop == "function" && (q = o.redirectOnDrop()), i.push(q);
      }
    };
    K({
      doDrop: () => {
        H.value && H.value.doDrop();
      },
      doRefresh: le,
      doSave: () => {
        H.value && H.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        R.value.increment(u.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => R.value.changed()
    });
    const Ke = y(() => {
      var e, a;
      return be.value ? oe.value === g.Modifications ? ne.value.changed() ? (e = o.modalConfig) == null ? void 0 : e.closeConfirm : "" : R.value.changed() ? (a = o.modalConfig) == null ? void 0 : a.closeConfirm : "" : "";
    }), We = (e) => {
      var a;
      if (typeof ((a = o.modalConfig) == null ? void 0 : a.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...e,
          itemCreated: z.value
        });
    }, we = y(() => o.title.startsWith("__:") ? String(nt(o.title.substring(3))) : o.title), He = y(() => r.value ? !1 : we.value.length > 0 || !!C["post-title"]), Se = y(() => o.view === Pe.Modal), Le = y(() => Se.value ? "lkt-modal" : "section"), ce = y(() => {
      var e, a;
      return o.mode !== T.Update || !t.value || !o.enabledSaveWithoutChanges && !M.value || me.value && !x.value ? !1 : typeof ((e = j.value) == null ? void 0 : e.disabled) == "function" ? !j.value.disabled({
        prop: u.value
      }) : typeof ((a = j.value) == null ? void 0 : a.disabled) == "boolean" ? !j.value.disabled : !0;
    }), fe = y(() => {
      var e, a;
      return o.mode !== T.Create || !o.enabledSaveWithoutChanges && !M.value || me.value && !x.value ? !1 : typeof ((e = $.value) == null ? void 0 : e.disabled) == "function" ? !$.value.disabled({
        prop: u.value
      }) : typeof ((a = $.value) == null ? void 0 : a.disabled) == "boolean" ? !$.value.disabled : !0;
    }), Ue = y(() => {
      var e, a;
      return w.value ? typeof ((e = P.value) == null ? void 0 : e.disabled) == "function" ? !P.value.disabled({
        prop: u.value
      }) : typeof ((a = P.value) == null ? void 0 : a.disabled) == "boolean" ? !P.value.disabled : !0 : !1;
    }), Ge = y(() => Le.value === "lkt-modal" ? {
      title: o.title,
      item: u.value,
      ...o.modalConfig,
      beforeClose: We,
      closeConfirm: Ke.value,
      headerActionsButton: o.groupButton !== !1 ? {
        dot: fe.value || ce.value
      } : !1
    } : {}), me = y(() => typeof o.form == "object" && Object.keys(o.form).length > 0), Me = y(() => Object.keys(m.value).length === 0 ? [] : o.modificationViews), oe = y(() => Object.keys(m.value).length === 0 ? g.Current : g.Modifications), be = y(() => E.value || t.value || w.value);
    return (e, a) => {
      const q = ye("lkt-http-info"), V = ye("lkt-form"), qe = ye("lkt-loader");
      return v(), A(Ze(Le.value), S(Ge.value, { class: "lkt-item-crud" }), ge({
        default: _(() => [
          _e("article", vt, [
            !Se.value && He.value ? (v(), J("header", ct, [
              n(C)["pre-title"] ? (v(), J("div", ft, [
                U(e.$slots, "pre-title", {
                  item: u.value,
                  loading: r.value
                })
              ])) : p("", !0),
              we.value.length > 0 ? (v(), J("h1", mt, xe(we.value), 1)) : p("", !0),
              n(C)["post-title"] ? (v(), J("div", bt, [
                U(e.$slots, "post-title", {
                  item: u.value,
                  loading: r.value
                })
              ])) : p("", !0)
            ])) : p("", !0),
            e.buttonNavPosition === n(Re).Top && (e.groupButton === !1 || !e.groupButtonAsModalActions) && be.value ? (v(), A(Ae, {
              key: 1,
              ref_key: "buttonNav",
              ref: H,
              loading: r.value,
              "onUpdate:loading": a[3] || (a[3] = (l) => r.value = l),
              editing: k.value,
              "onUpdate:editing": a[4] || (a[4] = (l) => k.value = l),
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
              "edit-mode-button": G.value,
              "group-button": ue.value,
              "data-changed": M.value,
              "http-success-read": N.value,
              "can-update": t.value,
              "can-drop": w.value,
              "can-switch-edit-mode": h.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": fe.value,
              "able-to-update": ce.value,
              "able-to-drop": Ue.value,
              perms: b.value,
              "modification-view": Me.value,
              "editable-view": oe.value,
              onCreate: Ce,
              onSave: he,
              onDrop: De
            }, ge({ _: 2 }, [
              n(C)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: _(({ canUpdate: l, canDrop: ae, perms: ie }) => [
                  U(e.$slots, "prev-buttons-ever", {
                    canUpdate: l,
                    canDrop: ae,
                    perms: ie
                  })
                ]),
                key: "0"
              } : void 0,
              n(C)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: _(({ canUpdate: l, canDrop: ae, perms: ie }) => [
                  U(e.$slots, "prev-buttons", {
                    canUpdate: l,
                    canDrop: ae,
                    perms: ie
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : p("", !0),
            r.value ? p("", !0) : (v(), J("div", gt, [
              N.value ? (v(), J("div", yt, [
                Q.value && e.notificationType === n(ee).Inline ? (v(), A(q, {
                  key: 0,
                  code: I.value,
                  palette: I.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: a[6] || (a[6] = (l) => Q.value = !1)
                }, null, 8, ["code", "palette"])) : p("", !0),
                me.value ? (v(), A(V, S({
                  key: 1,
                  modelValue: u.value,
                  "onUpdate:modelValue": a[7] || (a[7] = (l) => u.value = l),
                  modifications: m.value,
                  "onUpdate:modifications": a[8] || (a[8] = (l) => m.value = l),
                  valid: x.value,
                  "onUpdate:valid": a[9] || (a[9] = (l) => x.value = l)
                }, {
                  ...e.formUiConfig,
                  form: e.form,
                  differencesTableConfig: e.differencesTableConfig,
                  visibleView: L.value,
                  modificationDataState: Oe.value,
                  editableViews: [oe.value],
                  disabled: !k.value
                }), null, 16, ["modelValue", "modifications", "valid"])) : U(e.$slots, "item", {
                  key: 2,
                  item: u.value,
                  loading: r.value,
                  editMode: k.value,
                  isCreate: E.value,
                  canUpdate: t.value,
                  canDrop: w.value,
                  itemBeingEdited: pe.value,
                  perms: b.value
                })
              ])) : e.notificationType === n(ee).Inline ? (v(), A(q, {
                key: 1,
                code: I.value
              }, null, 8, ["code"])) : p("", !0)
            ])),
            r.value ? (v(), A(qe, { key: 3 })) : p("", !0),
            e.buttonNavPosition === n(Re).Bottom && (e.groupButton === !1 || !e.groupButtonAsModalActions) && be.value ? (v(), A(Ae, {
              key: 4,
              ref_key: "buttonNav",
              ref: H,
              loading: r.value,
              "onUpdate:loading": a[10] || (a[10] = (l) => r.value = l),
              editing: k.value,
              "onUpdate:editing": a[11] || (a[11] = (l) => k.value = l),
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
              "edit-mode-button": G.value,
              "group-button": ue.value,
              "data-changed": M.value,
              "http-success-read": N.value,
              "can-update": t.value,
              "can-drop": w.value,
              "can-switch-edit-mode": h.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": fe.value,
              "able-to-update": ce.value,
              "able-to-drop": Ue.value,
              perms: b.value,
              "modification-view": Me.value,
              "editable-view": oe.value,
              onCreate: Ce,
              onSave: he,
              onDrop: De
            }, ge({ _: 2 }, [
              n(C)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: _(() => [
                  U(e.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              n(C)["prev-buttons"] ? {
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
        e.groupButton !== !1 && e.groupButtonAsModalActions && be.value ? {
          name: "header-actions",
          fn: _(() => [
            e.buttonNavPosition === n(Re).Top ? (v(), A(Ae, {
              key: 0,
              ref_key: "buttonNav",
              ref: H,
              loading: r.value,
              "onUpdate:loading": a[0] || (a[0] = (l) => r.value = l),
              editing: k.value,
              "onUpdate:editing": a[1] || (a[1] = (l) => k.value = l),
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
              "edit-mode-button": G.value,
              "group-button": ue.value,
              "data-changed": M.value,
              "http-success-read": N.value,
              "can-update": t.value,
              "can-drop": w.value,
              "can-switch-edit-mode": h.value,
              "group-button-as-modal-actions": e.groupButtonAsModalActions,
              "able-to-create": fe.value,
              "able-to-update": ce.value,
              "able-to-drop": Ue.value,
              perms: b.value,
              "modification-view": Me.value,
              "editable-view": oe.value,
              onCreate: Ce,
              onSave: he,
              onDrop: De
            }, ge({ _: 2 }, [
              n(C)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: _(({ canUpdate: l, canDrop: ae, perms: ie }) => [
                  U(e.$slots, "prev-buttons-ever", {
                    canUpdate: l,
                    canDrop: ae,
                    perms: ie
                  })
                ]),
                key: "0"
              } : void 0,
              n(C)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: _(({ canUpdate: l, canDrop: ae, perms: ie }) => [
                  U(e.$slots, "prev-buttons", {
                    canUpdate: l,
                    canDrop: ae,
                    perms: ie
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
}), Rt = {
  install: (B, K = {}) => {
    B.component("lkt-item-crud") === void 0 && B.component("lkt-item-crud", kt);
  }
}, At = (B) => {
  se.defaultSaveIcon = B;
}, Ot = (B) => {
  se.defaultDropIcon = B;
};
export {
  It as debugLktItemCrud,
  Rt as default,
  Ot as setItemCrudDefaultDropIcon,
  At as setItemCrudDefaultSaveIcon
};
