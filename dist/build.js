import { defineComponent as Le, ref as s, watch as g, useSlots as je, computed as D, resolveComponent as ge, createElementBlock as J, createCommentVNode as d, openBlock as b, createBlock as N, Fragment as Ee, renderSlot as c, withDirectives as F, mergeProps as O, unref as n, createVNode as Y, withCtx as M, vShow as X, normalizeProps as Ge, mergeDefaults as He, nextTick as qe, onMounted as ze, resolveDynamicComponent as Qe, createSlots as be, createElementVNode as Ye, toDisplayString as Ze } from "vue";
import { httpCall as _e } from "lkt-http-client";
import { DataState as ye } from "lkt-data-state";
import { ModificationView as k, ItemCrudMode as V, ItemCrudButtonNavVisibility as $e, ButtonType as xe, TablePermission as Me, ensureButtonConfig as Z, LktSettings as v, ItemCrudView as Ne, ItemCrudButtonNavPosition as Ie, NotificationType as ee, getDefaultValues as et, ItemCrud as tt, ToastPositionX as de } from "lkt-vue-kernel";
import { closeModal as at, updateModalKey as ot } from "lkt-modal";
import { __ as nt } from "lkt-i18n";
import { openToast as re } from "lkt-toast";
import { useRouter as it } from "vue-router";
const ve = class ve {
};
ve.debugEnabled = !1, ve.defaultSaveIcon = "", ve.defaultDropIcon = "";
let le = ve;
const w = (...C) => {
  le.debugEnabled && console.info("[LktItemCrud] ", ...C);
}, Vt = (C = !0) => {
  le.debugEnabled = C;
}, ut = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, dt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, rt = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, lt = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, Ve = /* @__PURE__ */ Le({
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
  setup(C, { expose: K, emit: te }) {
    const a = te, i = C, h = s(i.pickedModificationView);
    g(() => i.pickedModificationView, (e) => h.value = e), g(h, (e) => a("update:pickedModificationView", e));
    const u = je(), p = s(null), r = s(null), f = s(i.loading);
    g(() => i.loading, (e) => f.value = e), g(f, (e) => a("update:loading", e));
    const y = s(i.editing);
    g(() => i.editing, (e) => y.value = e), g(y, (e) => a("update:editing", e));
    const m = () => {
      f.value = !0;
    }, B = () => {
      f.value = !1;
    }, _ = (e, U) => {
      typeof e > "u" || a("create", e, U);
    }, E = (e, U) => {
      typeof e > "u" || a("save", e, U);
    }, z = (e, U) => {
      typeof e > "u" || a("drop", e, U);
    }, T = D(() => i.editableView === k.Modifications ? i.modifications : i.item);
    K({
      doSave: () => {
        p.value && typeof p.value.click == "function" && p.value.click();
      },
      doDrop: () => {
        r.value && typeof r.value.click == "function" && r.value.click();
      }
    });
    const I = D(() => !i.canDrop || i.dropButton === !1 ? !1 : !i.canUpdate && i.canDrop ? !0 : !f.value && i.editing && i.httpSuccessRead), W = D(() => i.mode === V.Create && i.createButton === !1 || i.mode === V.Update && i.updateButton === !1 || f.value ? !1 : i.editing && i.httpSuccessRead), $ = D(() => i.editModeButton === !1 || !i.canSwitchEditMode || !i.canUpdate && !i.canDrop || !i.canUpdate && i.canDrop ? !1 : !f.value && i.mode !== V.Create && i.httpSuccessRead), pe = D(() => i.buttonNavVisibility === $e.Always || u["prev-buttons-ever"] ? !0 : i.buttonNavVisibility === $e.Never ? !1 : W.value || I.value || $.value), x = D(() => i.modificationView === !1 ? [] : i.modificationView === !0 ? [
      k.Current,
      k.Modifications,
      k.SplitView,
      k.Differences
    ] : Array.isArray(i.modificationView) ? i.modificationView : []), Q = D(() => {
      let e = [];
      return x.value.includes(k.Current) && e.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: h.value === k.Current,
        events: {
          click: () => {
            h.value = k.Current;
          }
        }
      }), x.value.includes(k.Modifications) && e.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: h.value === k.Modifications,
        events: {
          click: () => {
            h.value = k.Modifications;
          }
        }
      }), x.value.includes(k.SplitView) && e.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: h.value === k.SplitView,
        events: {
          click: () => {
            h.value = k.SplitView;
          }
        }
      }), x.value.includes(k.Differences) && e.push({
        text: "Differences",
        icon: "lkt-icn-balance",
        disabled: h.value === k.Differences,
        events: {
          click: () => {
            h.value = k.Differences;
          }
        }
      }), e;
    });
    return (e, U) => {
      var G, L, j, P;
      const S = ge("lkt-button");
      return pe.value ? (b(), J("div", ut, [
        e.grouped && e.groupButtonAsModalActions ? (b(), J(Ee, { key: 0 }, [
          $.value ? (b(), N(S, O({ key: 0 }, e.editModeButton, {
            checked: y.value,
            "onUpdate:checked": U[0] || (U[0] = (H) => y.value = H),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0),
          n(u)["prev-buttons-ever"] ? c(e.$slots, "prev-buttons-ever", {
            key: 1,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          n(u)["prev-buttons"] ? c(e.$slots, "prev-buttons", {
            key: 2,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          F(Y(S, O({
            ref_key: "saveButtonRef",
            ref: p
          }, {
            ...e.updateButton,
            resourceData: {
              ...(G = e.updateButton) == null ? void 0 : G.resourceData,
              ...T.value
            },
            disabled: !e.ableToUpdate
          }, {
            onLoading: m,
            onLoaded: B,
            onClick: E
          }), {
            default: M(() => [
              n(u)["button-save"] ? c(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: y.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16), [
            [X, e.mode === n(V).Update && W.value]
          ]),
          F(Y(S, O({
            ref_key: "saveButtonRef",
            ref: p
          }, {
            ...e.createButton,
            resourceData: {
              ...(L = e.createButton) == null ? void 0 : L.resourceData,
              ...T.value
            },
            disabled: !e.ableToCreate
          }, {
            onLoading: m,
            onLoaded: B,
            onClick: _
          }), {
            default: M(() => [
              n(u)["button-save"] ? c(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: y.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16), [
            [X, e.mode === n(V).Create && W.value]
          ]),
          F(Y(S, O({
            ref_key: "dropButtonRef",
            ref: r
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: m,
            onLoaded: B,
            onClick: z
          }), {
            default: M(() => [
              n(u)["button-drop"] ? c(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: y.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [X, I.value && e.mode !== n(V).Create]
          ]),
          n(u).buttons ? c(e.$slots, "buttons", { key: 3 }) : d("", !0)
        ], 64)) : e.grouped ? (b(), N(S, O({
          key: 1,
          ref: "groupButton"
        }, e.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: M(() => {
            var H, ne;
            return [
              $.value ? (b(), N(S, O({ key: 0 }, e.editModeButton, {
                checked: y.value,
                "onUpdate:checked": U[1] || (U[1] = (ie) => y.value = ie),
                class: "lkt-item-crud--switch-mode-button"
              }), null, 16, ["checked"])) : d("", !0),
              n(u)["prev-buttons-ever"] ? c(e.$slots, "prev-buttons-ever", {
                key: 1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop,
                perms: e.perms
              }) : d("", !0),
              n(u)["prev-buttons"] ? c(e.$slots, "prev-buttons", {
                key: 2,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop,
                perms: e.perms
              }) : d("", !0),
              F(Y(S, O({
                ref_key: "saveButtonRef",
                ref: p
              }, {
                ...e.updateButton,
                resourceData: {
                  ...(H = e.updateButton) == null ? void 0 : H.resourceData,
                  ...T.value
                },
                disabled: !e.ableToUpdate
              }, {
                onLoading: m,
                onLoaded: B,
                onClick: E
              }), {
                default: M(() => [
                  n(u)["button-save"] ? c(e.$slots, "button-save", {
                    key: 0,
                    item: e.item,
                    editMode: y.value,
                    isCreate: !1,
                    canUpdate: e.canUpdate,
                    canDrop: e.canDrop
                  }) : d("", !0)
                ]),
                _: 3
              }, 16), [
                [X, e.mode === n(V).Update && W.value]
              ]),
              F(Y(S, O({
                ref_key: "saveButtonRef",
                ref: p
              }, {
                ...e.createButton,
                resourceData: {
                  ...(ne = e.createButton) == null ? void 0 : ne.resourceData,
                  ...T.value
                },
                disabled: !e.ableToCreate
              }, {
                disabled: !e.ableToCreate,
                onLoading: m,
                onLoaded: B,
                onClick: _
              }), {
                default: M(() => [
                  n(u)["button-save"] ? c(e.$slots, "button-save", {
                    key: 0,
                    item: e.item,
                    editMode: y.value,
                    isCreate: !0,
                    canUpdate: e.canUpdate,
                    canDrop: e.canDrop
                  }) : d("", !0)
                ]),
                _: 3
              }, 16, ["disabled"]), [
                [X, e.mode === n(V).Create && W.value]
              ]),
              F(Y(S, O({
                ref_key: "dropButtonRef",
                ref: r
              }, e.dropButton, {
                disabled: !e.ableToDrop,
                onLoading: m,
                onLoaded: B,
                onClick: z
              }), {
                default: M(() => [
                  n(u)["button-drop"] ? c(e.$slots, "button-drop", {
                    key: 0,
                    item: e.item,
                    editMode: y.value,
                    isCreate: !1,
                    canUpdate: e.canUpdate,
                    canDrop: e.canDrop
                  }) : d("", !0)
                ]),
                _: 3
              }, 16, ["disabled"]), [
                [X, I.value && e.mode !== n(V).Create]
              ]),
              n(u).buttons ? c(e.$slots, "buttons", { key: 3 }) : d("", !0)
            ];
          }),
          _: 3
        }, 16)) : (b(), J(Ee, { key: 2 }, [
          n(u)["prev-buttons-ever"] ? F((b(), J("div", dt, [
            c(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [X, !f.value]
          ]) : d("", !0),
          n(u)["prev-buttons"] ? F((b(), J("div", rt, [
            c(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [X, y.value && !f.value]
          ]) : d("", !0),
          F(Y(S, O({
            ref_key: "saveButtonRef",
            ref: p
          }, {
            ...e.updateButton,
            resourceData: {
              ...(j = e.updateButton) == null ? void 0 : j.resourceData,
              ...T.value
            },
            disabled: !e.ableToUpdate
          }, {
            onLoading: m,
            onLoaded: B,
            onClick: E
          }), {
            default: M(() => [
              n(u)["button-save"] ? c(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: y.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16), [
            [X, e.mode === n(V).Update && W.value]
          ]),
          F(Y(S, O({
            ref_key: "saveButtonRef",
            ref: p
          }, {
            ...e.createButton,
            resourceData: {
              ...(P = e.createButton) == null ? void 0 : P.resourceData,
              ...T.value
            },
            disabled: !e.ableToCreate
          }, {
            onLoading: m,
            onLoaded: B,
            onClick: _
          }), {
            default: M(() => [
              n(u)["button-save"] ? c(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: y.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: !1
              }) : d("", !0)
            ]),
            _: 3
          }, 16), [
            [X, e.mode === n(V).Create && W.value]
          ]),
          F(Y(S, O({
            ref_key: "dropButtonRef",
            ref: r
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: m,
            onLoaded: B,
            onClick: z
          }), {
            default: M(() => [
              n(u)["button-drop"] ? c(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: y.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [X, I.value && e.mode !== n(V).Create]
          ]),
          n(u).buttons ? F((b(), J("div", lt, [
            c(e.$slots, "buttons")
          ], 512)), [
            [X, y.value && !f.value]
          ]) : d("", !0),
          x.value.length > 0 ? (b(), N(S, Ge(O({ key: 3 }, {
            type: n(xe).Tooltip,
            icon: "lkt-icn-cross-arrows",
            class: "lkt-item-crud--modifications-button",
            splitButtons: Q.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : d("", !0),
          $.value ? (b(), N(S, O({ key: 4 }, e.editModeButton, {
            checked: y.value,
            "onUpdate:checked": U[2] || (U[2] = (H) => y.value = H),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0)
        ], 64))
      ])) : d("", !0);
    };
  }
}), st = (C, K, te) => {
  let a = new ye(JSON.parse(JSON.stringify(C)), {
    onlyProps: Pe(te),
    recursiveOnlyProps: !1
  });
  return a.increment(JSON.parse(JSON.stringify(K))), a;
}, Pe = (C) => {
  if (C.items === void 0) return [];
  if (C.items.length === 0) return [];
  let K = [];
  for (let te in C.items) {
    let a = C.items[te];
    switch (a.type) {
      case "field":
        a.key !== void 0 && K.push(a.key);
        break;
      case "form":
        a.form && (K = [...K, ...Pe(a.form)]);
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
}, yt = /* @__PURE__ */ Le({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ He({
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
  setup(C, { expose: K, emit: te }) {
    const a = C, i = it(), h = je(), u = te, p = s(!0), r = s(a.modelValue), f = s(a.modifications), y = s(a.customData), m = s(a.perms), B = s(a.editing), _ = s(!1), E = s(!1), z = s(!1), T = s(200), R = s(new ye(r.value, a.dataStateConfig)), se = s(new ye(f.value, a.dataStateConfig)), I = s(!1), W = s(new ye(a.readData)), $ = s(a.mode === V.Create), pe = s(!1), x = s(!1), Q = s(null), e = D(() => !$.value && Array.isArray(m.value) && m.value.includes(Me.Update)), U = D(() => !$.value && Array.isArray(m.value) && m.value.includes(Me.Drop)), S = D(() => !$.value && Array.isArray(m.value) && m.value.includes(Me.SwitchEditMode)), G = s(k.Current);
    g(() => a.mode, (t) => {
      $.value = t === V.Create;
    }), g(() => a.perms, (t) => {
      m.value = t;
    }), g(m, (t) => {
      u("update:perms", t);
    }), g(() => a.customData, (t) => {
      y.value = t;
    }), g(y, (t) => {
      u("update:customData", t);
    }), g(() => a.modifications, (t) => {
      se.value.increment(t), f.value = t;
    }, { deep: !0 }), g(f, (t) => {
      Re(), se.value.increment(t), ue.value === k.Modifications && (I.value = se.value.changed()), u("update:modifications", t);
    }, { deep: !0 });
    const L = s(Z(a.createButton, v.defaultCreateButton)), j = s(Z(a.updateButton, v.defaultUpdateButton)), P = s(Z(a.dropButton, v.defaultDropButton)), H = s(Z(a.editModeButton, v.defaultEditModeButton)), ne = s(Z(a.groupButton, v.defaultGroupButton));
    g(() => a.createButton, (t) => {
      L.value = Z(t, v.defaultCreateButton);
    }, { deep: !0 }), g(() => a.updateButton, (t) => {
      j.value = Z(t, v.defaultUpdateButton);
    }, { deep: !0 }), g(() => a.dropButton, (t) => {
      P.value = Z(t, v.defaultDropButton);
    }, { deep: !0 }), g(() => a.editModeButton, (t) => {
      H.value = Z(t, v.defaultEditModeButton);
    }, { deep: !0 });
    const ie = async () => {
      var t, o, q;
      w("fetchItem"), p.value = !0, T.value = -1, z.value = !1, typeof ((t = a.events) == null ? void 0 : t.httpStart) == "function" && a.events.httpStart();
      try {
        const A = await _e(a.readResource, a.readData);
        if (w("fetchItem -> response", A), p.value = !1, T.value = A.httpStatus, y.value = A.custom, !A.success) {
          E.value = !1, T.value = A.httpStatus, typeof ((o = a.events) == null ? void 0 : o.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: A
          }), u("error", A.httpStatus);
          return;
        }
        E.value = !0, r.value = A.data, f.value = A.modifications, m.value = A.perms, R.value.increment(r.value).turnStoredIntoOriginal(), se.value.increment(f.value).turnStoredIntoOriginal(), I.value = R.value.changed(), W.value.turnStoredIntoOriginal(), Object.keys(f.value).length > 0 && (G.value = k.Modifications), typeof ((q = a.events) == null ? void 0 : q.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: A
        }), u("read", A);
      } catch {
        p.value = !1, E.value = !1, T.value = 404, u("error", 404);
        return;
      }
    };
    g(() => a.modelValue, (t) => {
      r.value = t, R.value.increment(t);
    }, { deep: !0 }), g(r, (t) => {
      if (pe.value = !0, w("item updated ->", r.value), typeof a.beforeEmitUpdate == "function") {
        w("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(r.value);
        w("item updated -> override with: ", o), typeof o == "object" && (r.value = o);
      }
      Re(), u("update:modelValue", r.value), w("item updated -> update dataState"), R.value.increment(t), ue.value === k.Current && (I.value = R.value.changed()), qe(() => pe.value = !1);
    }, { deep: !0 }), g(m, () => u("perms", m.value)), g(I, (t) => {
      u("modified-data", t);
    }), g(() => a.readData, (t) => {
      W.value.increment(t), W.value.changed() && ie();
    }), g(() => a.editing, (t) => {
      w("editing updated -> updating editMode", t), B.value = t;
    }), g(B, (t) => {
      w("editMode updated -> emit update", t), u("update:editing", t);
    });
    const Te = s(void 0), Re = () => {
      me.value && (Te.value = st(r.value, f.value, a.form));
    };
    ze(() => {
      a.readResource && !$.value ? ie() : ($.value, E.value = !0, B.value = !0, p.value = !1, R.value.increment(r.value).turnStoredIntoOriginal(), I.value = R.value.changed());
    });
    const ke = (t, o) => {
      if (o) {
        if (p.value = !1, typeof t < "u" && (T.value = t.httpStatus, !t.success))
          return z.value = !0, u("error", t.httpStatus), !1;
        z.value = !0;
      }
      return !0;
    }, Ae = (t, o) => {
      if (w("doAutoReloadId -> enter: ", t), typeof t < "u" && t.autoReloadId)
        if (w("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), typeof o < "u") {
          let q = o;
          typeof o == "function" && (q = o(t.autoReloadId)), i.push(q);
        } else we.value ? (w("doAutoReloadId -> insideModal: ", a), ot(a.modalConfig.modalName, a.modalConfig.modalKey, t.autoReloadId)) : (w("doAutoReloadId -> outsideModal"), a.readData.id = t.autoReloadId, w("doAutoReloadId -> turning off create mode"), $.value = !1, ie());
    }, Be = (t, o) => {
      if (w("onCreate"), !ke(o, L.value.resource)) {
        a.notificationType === ee.Toast && re({
          text: v.defaultCreateErrorText,
          details: v.defaultCreateErrorDetails,
          icon: v.defaultCreateErrorIcon,
          positionX: de.Right
        });
        return;
      }
      x.value = !0, w("onCreate -> turn stored data into original"), R.value.increment(r.value).turnStoredIntoOriginal(), a.notificationType === ee.Toast && re({
        text: v.defaultCreateSuccessText,
        details: v.defaultCreateSuccessDetails,
        icon: v.defaultCreateSuccessIcon,
        positionX: de.Right
      }), Ae(o, a.redirectOnCreate), w("onCreate -> beforeEmitCreate"), u("create", o);
    }, De = (t, o) => {
      if (w("onUpdate"), !ke(o, j.value.resource)) {
        a.notificationType === ee.Toast && re({
          text: v.defaultUpdateErrorText,
          details: v.defaultUpdateErrorDetails,
          icon: v.defaultUpdateErrorIcon,
          positionX: de.Right
        });
        return;
      }
      w("onUpdate -> turn stored data into original"), R.value.turnStoredIntoOriginal(), a.notificationType === ee.Toast && re({
        text: v.defaultUpdateSuccessText,
        details: v.defaultUpdateSuccessDetails,
        icon: v.defaultUpdateSuccessIcon,
        positionX: de.Right
      }), Ae(o), u("update", o);
    }, Ce = (t, o) => {
      if (w("onDrop"), !ke(o, P.value.resource)) {
        a.notificationType === ee.Toast && re({
          text: v.defaultDropErrorText,
          details: v.defaultDropErrorDetails,
          icon: v.defaultDropErrorIcon,
          positionX: de.Right
        });
        return;
      }
      if (a.notificationType === ee.Toast && re({
        text: v.defaultDropSuccessText,
        details: v.defaultDropSuccessDetails,
        icon: v.defaultDropSuccessIcon,
        positionX: de.Right
      }), u("drop", o), a.view === Ne.Modal && (w("onDrop -> close modal"), at(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let q = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (q = a.redirectOnDrop()), i.push(q);
      }
    };
    K({
      doDrop: () => {
        Q.value && Q.value.doDrop();
      },
      doRefresh: ie,
      doSave: () => {
        Q.value && Q.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        R.value.increment(r.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => R.value.changed()
    });
    const Fe = D(() => {
      var t;
      return R.value.changed() ? (t = a.modalConfig) == null ? void 0 : t.closeConfirm : "";
    }), Xe = (t) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...t,
          itemCreated: x.value
        });
    }, he = D(() => a.title.startsWith("__:") ? String(nt(a.title.substring(3))) : a.title), Je = D(() => p.value ? !1 : he.value.length > 0 || !!h["post-title"]), we = D(() => a.view === Ne.Modal), Oe = D(() => we.value ? "lkt-modal" : "section"), ce = D(() => {
      var t, o;
      return a.mode !== V.Update || !e.value || !a.enabledSaveWithoutChanges && !I.value || me.value && !_.value ? !1 : typeof ((t = j.value) == null ? void 0 : t.disabled) == "function" ? !j.value.disabled({
        prop: r.value
      }) : typeof ((o = j.value) == null ? void 0 : o.disabled) == "boolean" ? !j.value.disabled : !0;
    }), fe = D(() => {
      var t, o;
      return a.mode !== V.Create || !a.enabledSaveWithoutChanges && !I.value || me.value && !_.value ? !1 : typeof ((t = L.value) == null ? void 0 : t.disabled) == "function" ? !L.value.disabled({
        prop: r.value
      }) : typeof ((o = L.value) == null ? void 0 : o.disabled) == "boolean" ? !L.value.disabled : !0;
    }), Ue = D(() => {
      var t, o;
      return U.value ? typeof ((t = P.value) == null ? void 0 : t.disabled) == "function" ? !P.value.disabled({
        prop: r.value
      }) : typeof ((o = P.value) == null ? void 0 : o.disabled) == "boolean" ? !P.value.disabled : !0 : !1;
    }), Ke = D(() => Oe.value === "lkt-modal" ? {
      title: a.title,
      item: r.value,
      ...a.modalConfig,
      beforeClose: Xe,
      closeConfirm: Fe.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: fe.value || ce.value
      } : !1
    } : {}), me = D(() => typeof a.form == "object" && Object.keys(a.form).length > 0), Se = D(() => Object.keys(f.value).length === 0 ? [] : a.modificationView), ue = D(() => Object.keys(f.value).length === 0 ? k.Current : k.Modifications);
    return (t, o) => {
      const q = ge("lkt-http-info"), A = ge("lkt-form"), We = ge("lkt-loader");
      return b(), N(Qe(Oe.value), O(Ke.value, { class: "lkt-item-crud" }), be({
        default: M(() => [
          Ye("article", pt, [
            !we.value && Je.value ? (b(), J("header", vt, [
              n(h)["pre-title"] ? (b(), J("div", ct, [
                c(t.$slots, "pre-title", {
                  item: r.value,
                  loading: p.value
                })
              ])) : d("", !0),
              he.value.length > 0 ? (b(), J("h1", ft, Ze(he.value), 1)) : d("", !0),
              n(h)["post-title"] ? (b(), J("div", mt, [
                c(t.$slots, "post-title", {
                  item: r.value,
                  loading: p.value
                })
              ])) : d("", !0)
            ])) : d("", !0),
            t.buttonNavPosition === n(Ie).Top && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (b(), N(Ve, {
              key: 1,
              ref_key: "buttonNav",
              ref: Q,
              loading: p.value,
              "onUpdate:loading": o[3] || (o[3] = (l) => p.value = l),
              editing: B.value,
              "onUpdate:editing": o[4] || (o[4] = (l) => B.value = l),
              "picked-modification-view": G.value,
              "onUpdate:pickedModificationView": o[5] || (o[5] = (l) => G.value = l),
              item: r.value,
              modifications: f.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": L.value,
              "update-button": j.value,
              "drop-button": P.value,
              "edit-mode-button": H.value,
              "group-button": ne.value,
              "data-changed": I.value,
              "http-success-read": E.value,
              "can-update": e.value,
              "can-drop": U.value,
              "can-switch-edit-mode": S.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": fe.value,
              "able-to-update": ce.value,
              "able-to-drop": Ue.value,
              perms: m.value,
              "modification-view": Se.value,
              "editable-view": ue.value,
              onCreate: Be,
              onSave: De,
              onDrop: Ce
            }, be({ _: 2 }, [
              n(h)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: M(({ canUpdate: l, canDrop: ae, perms: oe }) => [
                  c(t.$slots, "prev-buttons-ever", {
                    canUpdate: l,
                    canDrop: ae,
                    perms: oe
                  })
                ]),
                key: "0"
              } : void 0,
              n(h)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: M(({ canUpdate: l, canDrop: ae, perms: oe }) => [
                  c(t.$slots, "prev-buttons", {
                    canUpdate: l,
                    canDrop: ae,
                    perms: oe
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : d("", !0),
            p.value ? d("", !0) : (b(), J("div", bt, [
              E.value ? (b(), J("div", gt, [
                z.value && t.notificationType === n(ee).Inline ? (b(), N(q, {
                  key: 0,
                  code: T.value,
                  palette: T.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: o[6] || (o[6] = (l) => z.value = !1)
                }, null, 8, ["code", "palette"])) : d("", !0),
                me.value ? (b(), N(A, {
                  key: 1,
                  modelValue: r.value,
                  "onUpdate:modelValue": o[7] || (o[7] = (l) => r.value = l),
                  modifications: f.value,
                  "onUpdate:modifications": o[8] || (o[8] = (l) => f.value = l),
                  valid: _.value,
                  "onUpdate:valid": o[9] || (o[9] = (l) => _.value = l),
                  form: t.form,
                  "visible-view": G.value,
                  "modification-data-state": Te.value,
                  "editable-views": [ue.value],
                  disabled: !B.value
                }, null, 8, ["modelValue", "modifications", "valid", "form", "visible-view", "modification-data-state", "editable-views", "disabled"])) : c(t.$slots, "item", {
                  key: 2,
                  item: r.value,
                  loading: p.value,
                  editMode: B.value,
                  isCreate: $.value,
                  canUpdate: e.value,
                  canDrop: U.value,
                  itemBeingEdited: pe.value,
                  perms: m.value
                })
              ])) : t.notificationType === n(ee).Inline ? (b(), N(q, {
                key: 1,
                code: T.value
              }, null, 8, ["code"])) : d("", !0)
            ])),
            p.value ? (b(), N(We, { key: 3 })) : d("", !0),
            t.buttonNavPosition === n(Ie).Bottom && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (b(), N(Ve, {
              key: 4,
              ref_key: "buttonNav",
              ref: Q,
              loading: p.value,
              "onUpdate:loading": o[10] || (o[10] = (l) => p.value = l),
              editing: B.value,
              "onUpdate:editing": o[11] || (o[11] = (l) => B.value = l),
              "picked-modification-view": G.value,
              "onUpdate:pickedModificationView": o[12] || (o[12] = (l) => G.value = l),
              item: r.value,
              modifications: f.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": L.value,
              "update-button": j.value,
              "drop-button": P.value,
              "edit-mode-button": H.value,
              "group-button": ne.value,
              "data-changed": I.value,
              "http-success-read": E.value,
              "can-update": e.value,
              "can-drop": U.value,
              "can-switch-edit-mode": S.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": fe.value,
              "able-to-update": ce.value,
              "able-to-drop": Ue.value,
              perms: m.value,
              "modification-view": Se.value,
              "editable-view": ue.value,
              onCreate: Be,
              onSave: De,
              onDrop: Ce
            }, be({ _: 2 }, [
              n(h)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: M(() => [
                  c(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              n(h)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: M(() => [
                  c(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : d("", !0)
          ])
        ]),
        _: 2
      }, [
        t.groupButton !== !1 && t.groupButtonAsModalActions ? {
          name: "header-actions",
          fn: M(() => [
            t.buttonNavPosition === n(Ie).Top ? (b(), N(Ve, {
              key: 0,
              ref_key: "buttonNav",
              ref: Q,
              loading: p.value,
              "onUpdate:loading": o[0] || (o[0] = (l) => p.value = l),
              editing: B.value,
              "onUpdate:editing": o[1] || (o[1] = (l) => B.value = l),
              "picked-modification-view": G.value,
              "onUpdate:pickedModificationView": o[2] || (o[2] = (l) => G.value = l),
              item: r.value,
              modifications: f.value,
              mode: t.mode,
              view: t.view,
              grouped: !0,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": L.value,
              "update-button": j.value,
              "drop-button": P.value,
              "edit-mode-button": H.value,
              "group-button": ne.value,
              "data-changed": I.value,
              "http-success-read": E.value,
              "can-update": e.value,
              "can-drop": U.value,
              "can-switch-edit-mode": S.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": fe.value,
              "able-to-update": ce.value,
              "able-to-drop": Ue.value,
              perms: m.value,
              "modification-view": Se.value,
              "editable-view": ue.value,
              onCreate: Be,
              onSave: De,
              onDrop: Ce
            }, be({ _: 2 }, [
              n(h)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: M(({ canUpdate: l, canDrop: ae, perms: oe }) => [
                  c(t.$slots, "prev-buttons-ever", {
                    canUpdate: l,
                    canDrop: ae,
                    perms: oe
                  })
                ]),
                key: "0"
              } : void 0,
              n(h)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: M(({ canUpdate: l, canDrop: ae, perms: oe }) => [
                  c(t.$slots, "prev-buttons", {
                    canUpdate: l,
                    canDrop: ae,
                    perms: oe
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : d("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), Tt = {
  install: (C, K = {}) => {
    C.component("lkt-item-crud") === void 0 && C.component("lkt-item-crud", yt);
  }
}, Rt = (C) => {
  le.defaultSaveIcon = C;
}, At = (C) => {
  le.defaultDropIcon = C;
};
export {
  Vt as debugLktItemCrud,
  Tt as default,
  At as setItemCrudDefaultDropIcon,
  Rt as setItemCrudDefaultSaveIcon
};
