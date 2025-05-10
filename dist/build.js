import { defineComponent as Le, ref as s, watch as g, useSlots as je, computed as D, resolveComponent as be, createElementBlock as F, createCommentVNode as d, openBlock as m, createBlock as N, Fragment as Oe, renderSlot as f, withDirectives as j, mergeProps as E, unref as n, createVNode as Q, withCtx as M, vShow as P, normalizeProps as Ge, mergeDefaults as He, nextTick as qe, onMounted as ze, resolveDynamicComponent as Qe, createSlots as me, createElementVNode as Ye, toDisplayString as Ze } from "vue";
import { httpCall as _e } from "lkt-http-client";
import { DataState as ge } from "lkt-data-state";
import { ModificationView as B, ItemCrudMode as V, ItemCrudButtonNavVisibility as $e, ButtonType as xe, TablePermission as Me, ensureButtonConfig as Y, LktSettings as v, ItemCrudView as Ne, ItemCrudButtonNavPosition as Ie, NotificationType as x, getDefaultValues as et, ItemCrud as tt, ToastPositionX as ne } from "lkt-vue-kernel";
import { closeModal as at, updateModalKey as ot } from "lkt-modal";
import { __ as nt } from "lkt-i18n";
import { openToast as ie } from "lkt-toast";
import { useRouter as it } from "vue-router";
const re = class re {
};
re.debugEnabled = !1, re.defaultSaveIcon = "", re.defaultDropIcon = "";
let ue = re;
const w = (...C) => {
  ue.debugEnabled && console.info("[LktItemCrud] ", ...C);
}, Vt = (C = !0) => {
  ue.debugEnabled = C;
}, ut = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, dt = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, lt = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, rt = {
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
  setup(C, { expose: X, emit: ee }) {
    const a = ee, i = C, h = s(i.pickedModificationView);
    g(() => i.pickedModificationView, (e) => h.value = e), g(h, (e) => a("update:pickedModificationView", e));
    const u = je(), p = s(null), l = s(null), b = s(i.loading);
    g(() => i.loading, (e) => b.value = e), g(b, (e) => a("update:loading", e));
    const y = s(i.editing);
    g(() => i.editing, (e) => y.value = e), g(y, (e) => a("update:editing", e));
    const c = () => {
      b.value = !0;
    }, k = () => {
      b.value = !1;
    }, Z = (e, U) => {
      typeof e > "u" || a("create", e, U);
    }, O = (e, U) => {
      typeof e > "u" || a("save", e, U);
    }, H = (e, U) => {
      typeof e > "u" || a("drop", e, U);
    }, J = D(() => i.editableView === B.Modifications ? i.modifications : i.item);
    X({
      doSave: () => {
        p.value && typeof p.value.click == "function" && p.value.click();
      },
      doDrop: () => {
        l.value && typeof l.value.click == "function" && l.value.click();
      }
    });
    const I = D(() => !i.canDrop || i.dropButton === !1 ? !1 : !i.canUpdate && i.canDrop ? !0 : !b.value && i.editing && i.httpSuccessRead), K = D(() => i.mode === V.Create && i.createButton === !1 || i.mode === V.Update && i.updateButton === !1 || b.value ? !1 : i.editing && i.httpSuccessRead), $ = D(() => i.editModeButton === !1 || !i.canSwitchEditMode || !i.canUpdate && !i.canDrop || !i.canUpdate && i.canDrop ? !1 : !b.value && i.mode !== V.Create && i.httpSuccessRead), le = D(() => i.buttonNavVisibility === $e.Always || u["prev-buttons-ever"] ? !0 : i.buttonNavVisibility === $e.Never ? !1 : K.value || I.value || $.value), _ = D(() => i.modificationView === !1 ? [] : i.modificationView === !0 ? [
      B.Current,
      B.Modifications,
      B.SplitView,
      B.Differences
    ] : Array.isArray(i.modificationView) ? i.modificationView : []), q = D(() => {
      let e = [];
      return _.value.includes(B.Current) && e.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: h.value === B.Current,
        events: {
          click: () => {
            h.value = B.Current;
          }
        }
      }), _.value.includes(B.Modifications) && e.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: h.value === B.Modifications,
        events: {
          click: () => {
            h.value = B.Modifications;
          }
        }
      }), _.value.includes(B.SplitView) && e.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: h.value === B.SplitView,
        events: {
          click: () => {
            h.value = B.SplitView;
          }
        }
      }), _.value.includes(B.Differences) && e.push({
        text: "Differences",
        icon: "lkt-icn-search",
        disabled: h.value === B.Differences,
        events: {
          click: () => {
            h.value = B.Differences;
          }
        }
      }), e;
    });
    return (e, U) => {
      var G, L;
      const S = be("lkt-button");
      return le.value ? (m(), F("div", ut, [
        e.grouped && e.groupButtonAsModalActions ? (m(), F(Oe, { key: 0 }, [
          $.value ? (m(), N(S, E({ key: 0 }, e.editModeButton, {
            checked: y.value,
            "onUpdate:checked": U[0] || (U[0] = (R) => y.value = R),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0),
          n(u)["prev-buttons-ever"] ? f(e.$slots, "prev-buttons-ever", {
            key: 1,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          n(u)["prev-buttons"] ? f(e.$slots, "prev-buttons", {
            key: 2,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          j(Q(S, E({
            ref_key: "saveButtonRef",
            ref: p
          }, {
            ...e.updateButton,
            modalData: {
              ...(G = e.updateButton) == null ? void 0 : G.modalData,
              ...J.value
            }
          }, {
            disabled: !e.ableToUpdate,
            onLoading: c,
            onLoaded: k,
            onClick: O
          }), {
            default: M(() => [
              n(u)["button-save"] ? f(e.$slots, "button-save", {
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
            [P, e.mode === n(V).Update && K.value]
          ]),
          j(Q(S, E({
            ref_key: "saveButtonRef",
            ref: p
          }, {
            ...e.createButton,
            modalData: {
              ...(L = e.createButton) == null ? void 0 : L.modalData,
              ...J.value
            }
          }, {
            disabled: !e.ableToCreate,
            onLoading: c,
            onLoaded: k,
            onClick: Z
          }), {
            default: M(() => [
              n(u)["button-save"] ? f(e.$slots, "button-save", {
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
            [P, e.mode === n(V).Create && K.value]
          ]),
          j(Q(S, E({
            ref_key: "dropButtonRef",
            ref: l
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: c,
            onLoaded: k,
            onClick: H
          }), {
            default: M(() => [
              n(u)["button-drop"] ? f(e.$slots, "button-drop", {
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
            [P, I.value && e.mode !== n(V).Create]
          ]),
          n(u).buttons ? f(e.$slots, "buttons", { key: 3 }) : d("", !0)
        ], 64)) : e.grouped ? (m(), N(S, E({
          key: 1,
          ref: "groupButton"
        }, e.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: M(() => [
            $.value ? (m(), N(S, E({ key: 0 }, e.editModeButton, {
              checked: y.value,
              "onUpdate:checked": U[1] || (U[1] = (R) => y.value = R),
              class: "lkt-item-crud--switch-mode-button"
            }), null, 16, ["checked"])) : d("", !0),
            n(u)["prev-buttons-ever"] ? f(e.$slots, "prev-buttons-ever", {
              key: 1,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : d("", !0),
            n(u)["prev-buttons"] ? f(e.$slots, "prev-buttons", {
              key: 2,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : d("", !0),
            j(Q(S, E({
              ref_key: "saveButtonRef",
              ref: p
            }, e.updateButton, {
              disabled: !e.ableToUpdate,
              onLoading: c,
              onLoaded: k,
              onClick: O
            }), {
              default: M(() => [
                n(u)["button-save"] ? f(e.$slots, "button-save", {
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
              [P, e.mode === n(V).Update && K.value]
            ]),
            j(Q(S, E({
              ref_key: "saveButtonRef",
              ref: p
            }, e.createButton, {
              disabled: !e.ableToCreate,
              onLoading: c,
              onLoaded: k,
              onClick: Z
            }), {
              default: M(() => [
                n(u)["button-save"] ? f(e.$slots, "button-save", {
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
              [P, e.mode === n(V).Create && K.value]
            ]),
            j(Q(S, E({
              ref_key: "dropButtonRef",
              ref: l
            }, e.dropButton, {
              disabled: !e.ableToDrop,
              onLoading: c,
              onLoaded: k,
              onClick: H
            }), {
              default: M(() => [
                n(u)["button-drop"] ? f(e.$slots, "button-drop", {
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
              [P, I.value && e.mode !== n(V).Create]
            ]),
            n(u).buttons ? f(e.$slots, "buttons", { key: 3 }) : d("", !0)
          ]),
          _: 3
        }, 16)) : (m(), F(Oe, { key: 2 }, [
          n(u)["prev-buttons-ever"] ? j((m(), F("div", dt, [
            f(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [P, !b.value]
          ]) : d("", !0),
          n(u)["prev-buttons"] ? j((m(), F("div", lt, [
            f(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [P, y.value && !b.value]
          ]) : d("", !0),
          j(Q(S, E({
            ref_key: "saveButtonRef",
            ref: p
          }, e.updateButton, {
            disabled: !e.ableToUpdate,
            onLoading: c,
            onLoaded: k,
            onClick: O
          }), {
            default: M(() => [
              n(u)["button-save"] ? f(e.$slots, "button-save", {
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
            [P, e.mode === n(V).Update && K.value]
          ]),
          j(Q(S, E({
            ref_key: "saveButtonRef",
            ref: p
          }, e.createButton, {
            disabled: !e.ableToCreate,
            onLoading: c,
            onLoaded: k,
            onClick: Z
          }), {
            default: M(() => [
              n(u)["button-save"] ? f(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: y.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: !1
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [P, e.mode === n(V).Create && K.value]
          ]),
          j(Q(S, E({
            ref_key: "dropButtonRef",
            ref: l
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: c,
            onLoaded: k,
            onClick: H
          }), {
            default: M(() => [
              n(u)["button-drop"] ? f(e.$slots, "button-drop", {
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
            [P, I.value && e.mode !== n(V).Create]
          ]),
          n(u).buttons ? j((m(), F("div", rt, [
            f(e.$slots, "buttons")
          ], 512)), [
            [P, y.value && !b.value]
          ]) : d("", !0),
          _.value.length > 0 ? (m(), N(S, Ge(E({ key: 3 }, {
            type: n(xe).Tooltip,
            icon: "lkt-icn-column-sort",
            class: "lkt-item-crud--modifications-button",
            splitButtons: q.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : d("", !0),
          $.value ? (m(), N(S, E({ key: 4 }, e.editModeButton, {
            checked: y.value,
            "onUpdate:checked": U[2] || (U[2] = (R) => y.value = R),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0)
        ], 64))
      ])) : d("", !0);
    };
  }
}), st = (C, X, ee) => {
  let a = new ge(JSON.parse(JSON.stringify(C)), {
    onlyProps: Pe(ee),
    recursiveOnlyProps: !1
  });
  return a.increment(JSON.parse(JSON.stringify(X))), a;
}, Pe = (C) => {
  if (C.items === void 0) return [];
  if (C.items.length === 0) return [];
  let X = [];
  for (let ee in C.items) {
    let a = C.items[ee];
    switch (a.type) {
      case "field":
        a.key !== void 0 && X.push(a.key);
        break;
      case "form":
        a.form && (X = [...X, ...Pe(a.form)]);
        break;
    }
  }
  return X;
}, pt = { class: "lkt-item-crud" }, vt = {
  key: 0,
  class: "lkt-item-crud_header"
}, ft = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, ct = {
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
  setup(C, { expose: X, emit: ee }) {
    const a = C, i = it(), h = je(), u = ee, p = s(!0), l = s(a.modelValue), b = s(a.modifications), y = s(a.customData), c = s(a.perms), k = s(a.editing), Z = s(!1), O = s(!1), H = s(!1), J = s(200), T = s(new ge(l.value, a.dataStateConfig)), de = s(new ge(b.value, a.dataStateConfig)), I = s(!1), K = s(new ge(a.readData)), $ = s(a.mode === V.Create), le = s(!1), _ = s(!1), q = s(null), e = D(() => !$.value && Array.isArray(c.value) && c.value.includes(Me.Update)), U = D(() => !$.value && Array.isArray(c.value) && c.value.includes(Me.Drop)), S = D(() => !$.value && Array.isArray(c.value) && c.value.includes(Me.SwitchEditMode)), G = s(B.Current);
    g(() => a.mode, (t) => {
      $.value = t === V.Create;
    }), g(() => a.perms, (t) => {
      c.value = t;
    }), g(c, (t) => {
      u("update:perms", t);
    }), g(() => a.customData, (t) => {
      y.value = t;
    }), g(y, (t) => {
      u("update:customData", t);
    }), g(() => a.modifications, (t) => {
      de.value.increment(t), b.value = t;
    }, { deep: !0 }), g(b, (t) => {
      Re(), de.value.increment(t), oe.value === B.Modifications && (I.value = de.value.changed()), u("update:modifications", t);
    }, { deep: !0 });
    const L = s(Y(a.createButton, v.defaultCreateButton)), R = s(Y(a.updateButton, v.defaultUpdateButton)), z = s(Y(a.dropButton, v.defaultDropButton)), se = s(Y(a.editModeButton, v.defaultEditModeButton)), ye = s(Y(a.groupButton, v.defaultGroupButton));
    g(() => a.createButton, (t) => {
      L.value = Y(t, v.defaultCreateButton);
    }, { deep: !0 }), g(() => a.updateButton, (t) => {
      R.value = Y(t, v.defaultUpdateButton);
    }, { deep: !0 }), g(() => a.dropButton, (t) => {
      z.value = Y(t, v.defaultDropButton);
    }, { deep: !0 }), g(() => a.editModeButton, (t) => {
      se.value = Y(t, v.defaultEditModeButton);
    }, { deep: !0 });
    const pe = async () => {
      var t, o, W;
      w("fetchItem"), p.value = !0, J.value = -1, H.value = !1, typeof ((t = a.events) == null ? void 0 : t.httpStart) == "function" && a.events.httpStart();
      try {
        const A = await _e(a.readResource, a.readData);
        if (w("fetchItem -> response", A), p.value = !1, J.value = A.httpStatus, y.value = A.custom, !A.success) {
          O.value = !1, J.value = A.httpStatus, typeof ((o = a.events) == null ? void 0 : o.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: A
          }), u("error", A.httpStatus);
          return;
        }
        O.value = !0, l.value = A.data, b.value = A.modifications, c.value = A.perms, T.value.increment(l.value).turnStoredIntoOriginal(), de.value.increment(b.value).turnStoredIntoOriginal(), I.value = T.value.changed(), K.value.turnStoredIntoOriginal(), typeof ((W = a.events) == null ? void 0 : W.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: A
        }), u("read", A);
      } catch {
        p.value = !1, O.value = !1, J.value = 404, u("error", 404);
        return;
      }
    };
    g(() => a.modelValue, (t) => {
      l.value = t, T.value.increment(t);
    }, { deep: !0 }), g(l, (t) => {
      if (le.value = !0, w("item updated ->", l.value), typeof a.beforeEmitUpdate == "function") {
        w("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(l.value);
        w("item updated -> override with: ", o), typeof o == "object" && (l.value = o);
      }
      Re(), u("update:modelValue", l.value), w("item updated -> update dataState"), T.value.increment(t), oe.value === B.Current && (I.value = T.value.changed()), qe(() => le.value = !1);
    }, { deep: !0 }), g(c, () => u("perms", c.value)), g(I, (t) => {
      u("modified-data", t);
    }), g(() => a.readData, (t) => {
      K.value.increment(t), K.value.changed() && pe();
    }), g(() => a.editing, (t) => {
      w("editing updated -> updating editMode", t), k.value = t;
    }), g(k, (t) => {
      w("editMode updated -> emit update", t), u("update:editing", t);
    });
    const Te = s(void 0), Re = () => {
      ce.value && (Te.value = st(l.value, b.value, a.form));
    };
    ze(() => {
      a.readResource && !$.value ? pe() : ($.value, O.value = !0, k.value = !0, p.value = !1, T.value.increment(l.value).turnStoredIntoOriginal(), I.value = T.value.changed());
    });
    const ke = (t, o) => {
      if (o) {
        if (p.value = !1, typeof t < "u" && (J.value = t.httpStatus, !t.success))
          return H.value = !0, u("error", t.httpStatus), !1;
        H.value = !0;
      }
      return !0;
    }, Ae = (t, o) => {
      if (w("doAutoReloadId -> enter: ", t), typeof t < "u" && t.autoReloadId)
        if (w("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), typeof o < "u") {
          let W = o;
          typeof o == "function" && (W = o(t.autoReloadId)), i.push(W);
        } else we.value ? (w("doAutoReloadId -> insideModal: ", a), ot(a.modalConfig.modalName, a.modalConfig.modalKey, t.autoReloadId)) : (w("doAutoReloadId -> outsideModal"), a.readData.id = t.autoReloadId, w("doAutoReloadId -> turning off create mode"), $.value = !1, pe());
    }, Be = (t, o) => {
      if (w("onCreate"), !ke(o, L.value.resource)) {
        a.notificationType === x.Toast && ie({
          text: v.defaultCreateErrorText,
          details: v.defaultCreateErrorDetails,
          icon: v.defaultCreateErrorIcon,
          positionX: ne.Right
        });
        return;
      }
      _.value = !0, w("onCreate -> turn stored data into original"), T.value.increment(l.value).turnStoredIntoOriginal(), a.notificationType === x.Toast && ie({
        text: v.defaultCreateSuccessText,
        details: v.defaultCreateSuccessDetails,
        icon: v.defaultCreateSuccessIcon,
        positionX: ne.Right
      }), Ae(o, a.redirectOnCreate), w("onCreate -> beforeEmitCreate"), u("create", o);
    }, De = (t, o) => {
      if (w("onUpdate"), !ke(o, R.value.resource)) {
        a.notificationType === x.Toast && ie({
          text: v.defaultUpdateErrorText,
          details: v.defaultUpdateErrorDetails,
          icon: v.defaultUpdateErrorIcon,
          positionX: ne.Right
        });
        return;
      }
      w("onUpdate -> turn stored data into original"), T.value.turnStoredIntoOriginal(), a.notificationType === x.Toast && ie({
        text: v.defaultUpdateSuccessText,
        details: v.defaultUpdateSuccessDetails,
        icon: v.defaultUpdateSuccessIcon,
        positionX: ne.Right
      }), Ae(o), u("update", o);
    }, Ce = (t, o) => {
      if (w("onDrop"), !ke(o, z.value.resource)) {
        a.notificationType === x.Toast && ie({
          text: v.defaultDropErrorText,
          details: v.defaultDropErrorDetails,
          icon: v.defaultDropErrorIcon,
          positionX: ne.Right
        });
        return;
      }
      if (a.notificationType === x.Toast && ie({
        text: v.defaultDropSuccessText,
        details: v.defaultDropSuccessDetails,
        icon: v.defaultDropSuccessIcon,
        positionX: ne.Right
      }), u("drop", o), a.view === Ne.Modal && (w("onDrop -> close modal"), at(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let W = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (W = a.redirectOnDrop()), i.push(W);
      }
    };
    X({
      doDrop: () => {
        q.value && q.value.doDrop();
      },
      doRefresh: pe,
      doSave: () => {
        q.value && q.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        T.value.increment(l.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => T.value.changed()
    });
    const Fe = D(() => {
      var t;
      return T.value.changed() ? (t = a.modalConfig) == null ? void 0 : t.closeConfirm : "";
    }), Xe = (t) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...t,
          itemCreated: _.value
        });
    }, he = D(() => a.title.startsWith("__:") ? String(nt(a.title.substring(3))) : a.title), Je = D(() => p.value ? !1 : he.value.length > 0 || !!h["post-title"]), we = D(() => a.view === Ne.Modal), Ee = D(() => we.value ? "lkt-modal" : "section"), ve = D(() => {
      var t, o;
      return a.mode !== V.Update || !e.value || !a.enabledSaveWithoutChanges && !I.value || ce.value && !Z.value ? !1 : typeof ((t = R.value) == null ? void 0 : t.disabled) == "function" ? !R.value.disabled({
        prop: l.value
      }) : typeof ((o = R.value) == null ? void 0 : o.disabled) == "boolean" ? !R.value.disabled : !0;
    }), fe = D(() => {
      var t, o;
      return a.mode !== V.Create || !a.enabledSaveWithoutChanges && !I.value || ce.value && !Z.value ? !1 : typeof ((t = L.value) == null ? void 0 : t.disabled) == "function" ? !L.value.disabled({
        prop: l.value
      }) : typeof ((o = L.value) == null ? void 0 : o.disabled) == "boolean" ? !L.value.disabled : !0;
    }), Ue = D(() => {
      var t, o;
      return U.value ? typeof ((t = z.value) == null ? void 0 : t.disabled) == "function" ? !z.value.disabled({
        prop: l.value
      }) : typeof ((o = z.value) == null ? void 0 : o.disabled) == "boolean" ? !z.value.disabled : !0 : !1;
    }), Ke = D(() => Ee.value === "lkt-modal" ? {
      title: a.title,
      item: l.value,
      ...a.modalConfig,
      beforeClose: Xe,
      closeConfirm: Fe.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: fe.value || ve.value
      } : !1
    } : {}), ce = D(() => typeof a.form == "object" && Object.keys(a.form).length > 0), Se = D(() => Object.keys(b.value).length === 0 ? [] : a.modificationView), oe = D(() => Object.keys(b.value).length === 0 ? B.Current : B.Modifications);
    return (t, o) => {
      const W = be("lkt-http-info"), A = be("lkt-form"), We = be("lkt-loader");
      return m(), N(Qe(Ee.value), E(Ke.value, { class: "lkt-item-crud" }), me({
        default: M(() => [
          Ye("article", pt, [
            !we.value && Je.value ? (m(), F("header", vt, [
              n(h)["pre-title"] ? (m(), F("div", ft, [
                f(t.$slots, "pre-title", {
                  item: l.value,
                  loading: p.value
                })
              ])) : d("", !0),
              he.value.length > 0 ? (m(), F("h1", ct, Ze(he.value), 1)) : d("", !0),
              n(h)["post-title"] ? (m(), F("div", mt, [
                f(t.$slots, "post-title", {
                  item: l.value,
                  loading: p.value
                })
              ])) : d("", !0)
            ])) : d("", !0),
            t.buttonNavPosition === n(Ie).Top && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (m(), N(Ve, {
              key: 1,
              ref_key: "buttonNav",
              ref: q,
              loading: p.value,
              "onUpdate:loading": o[3] || (o[3] = (r) => p.value = r),
              editing: k.value,
              "onUpdate:editing": o[4] || (o[4] = (r) => k.value = r),
              "picked-modification-view": G.value,
              "onUpdate:pickedModificationView": o[5] || (o[5] = (r) => G.value = r),
              item: l.value,
              modifications: b.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": L.value,
              "update-button": R.value,
              "drop-button": z.value,
              "edit-mode-button": se.value,
              "group-button": ye.value,
              "data-changed": I.value,
              "http-success-read": O.value,
              "can-update": e.value,
              "can-drop": U.value,
              "can-switch-edit-mode": S.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": fe.value,
              "able-to-update": ve.value,
              "able-to-drop": Ue.value,
              perms: c.value,
              "modification-view": Se.value,
              "editable-view": oe.value,
              onCreate: Be,
              onSave: De,
              onDrop: Ce
            }, me({ _: 2 }, [
              n(h)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: M(({ canUpdate: r, canDrop: te, perms: ae }) => [
                  f(t.$slots, "prev-buttons-ever", {
                    canUpdate: r,
                    canDrop: te,
                    perms: ae
                  })
                ]),
                key: "0"
              } : void 0,
              n(h)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: M(({ canUpdate: r, canDrop: te, perms: ae }) => [
                  f(t.$slots, "prev-buttons", {
                    canUpdate: r,
                    canDrop: te,
                    perms: ae
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : d("", !0),
            p.value ? d("", !0) : (m(), F("div", bt, [
              O.value ? (m(), F("div", gt, [
                H.value && t.notificationType === n(x).Inline ? (m(), N(W, {
                  key: 0,
                  code: J.value,
                  palette: J.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: o[6] || (o[6] = (r) => H.value = !1)
                }, null, 8, ["code", "palette"])) : d("", !0),
                ce.value ? (m(), N(A, {
                  key: 1,
                  modelValue: l.value,
                  "onUpdate:modelValue": o[7] || (o[7] = (r) => l.value = r),
                  modifications: b.value,
                  "onUpdate:modifications": o[8] || (o[8] = (r) => b.value = r),
                  valid: Z.value,
                  "onUpdate:valid": o[9] || (o[9] = (r) => Z.value = r),
                  form: t.form,
                  "modification-view": G.value,
                  "modification-data-state": Te.value,
                  "editable-views": [oe.value],
                  disabled: !k.value
                }, null, 8, ["modelValue", "modifications", "valid", "form", "modification-view", "modification-data-state", "editable-views", "disabled"])) : f(t.$slots, "item", {
                  key: 2,
                  item: l.value,
                  loading: p.value,
                  editMode: k.value,
                  isCreate: $.value,
                  canUpdate: e.value,
                  canDrop: U.value,
                  itemBeingEdited: le.value,
                  perms: c.value
                })
              ])) : t.notificationType === n(x).Inline ? (m(), N(W, {
                key: 1,
                code: J.value
              }, null, 8, ["code"])) : d("", !0)
            ])),
            p.value ? (m(), N(We, { key: 3 })) : d("", !0),
            t.buttonNavPosition === n(Ie).Bottom && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (m(), N(Ve, {
              key: 4,
              ref_key: "buttonNav",
              ref: q,
              loading: p.value,
              "onUpdate:loading": o[10] || (o[10] = (r) => p.value = r),
              editing: k.value,
              "onUpdate:editing": o[11] || (o[11] = (r) => k.value = r),
              "picked-modification-view": G.value,
              "onUpdate:pickedModificationView": o[12] || (o[12] = (r) => G.value = r),
              item: l.value,
              modifications: b.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": L.value,
              "update-button": R.value,
              "drop-button": z.value,
              "edit-mode-button": se.value,
              "group-button": ye.value,
              "data-changed": I.value,
              "http-success-read": O.value,
              "can-update": e.value,
              "can-drop": U.value,
              "can-switch-edit-mode": S.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": fe.value,
              "able-to-update": ve.value,
              "able-to-drop": Ue.value,
              perms: c.value,
              "modification-view": Se.value,
              "editable-view": oe.value,
              onCreate: Be,
              onSave: De,
              onDrop: Ce
            }, me({ _: 2 }, [
              n(h)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: M(() => [
                  f(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              n(h)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: M(() => [
                  f(t.$slots, "prev-buttons")
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
            t.buttonNavPosition === n(Ie).Top ? (m(), N(Ve, {
              key: 0,
              ref_key: "buttonNav",
              ref: q,
              loading: p.value,
              "onUpdate:loading": o[0] || (o[0] = (r) => p.value = r),
              editing: k.value,
              "onUpdate:editing": o[1] || (o[1] = (r) => k.value = r),
              "picked-modification-view": G.value,
              "onUpdate:pickedModificationView": o[2] || (o[2] = (r) => G.value = r),
              item: l.value,
              modifications: b.value,
              mode: t.mode,
              view: t.view,
              grouped: !0,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": L.value,
              "update-button": R.value,
              "drop-button": z.value,
              "edit-mode-button": se.value,
              "group-button": ye.value,
              "data-changed": I.value,
              "http-success-read": O.value,
              "can-update": e.value,
              "can-drop": U.value,
              "can-switch-edit-mode": S.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": fe.value,
              "able-to-update": ve.value,
              "able-to-drop": Ue.value,
              perms: c.value,
              "modification-view": Se.value,
              "editable-view": oe.value,
              onCreate: Be,
              onSave: De,
              onDrop: Ce
            }, me({ _: 2 }, [
              n(h)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: M(({ canUpdate: r, canDrop: te, perms: ae }) => [
                  f(t.$slots, "prev-buttons-ever", {
                    canUpdate: r,
                    canDrop: te,
                    perms: ae
                  })
                ]),
                key: "0"
              } : void 0,
              n(h)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: M(({ canUpdate: r, canDrop: te, perms: ae }) => [
                  f(t.$slots, "prev-buttons", {
                    canUpdate: r,
                    canDrop: te,
                    perms: ae
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
  install: (C, X = {}) => {
    C.component("lkt-item-crud") === void 0 && C.component("lkt-item-crud", yt);
  }
}, Rt = (C) => {
  ue.defaultSaveIcon = C;
}, At = (C) => {
  ue.defaultDropIcon = C;
};
export {
  Vt as debugLktItemCrud,
  Tt as default,
  At as setItemCrudDefaultDropIcon,
  Rt as setItemCrudDefaultSaveIcon
};
