import { defineComponent as Ne, ref as s, watch as b, useSlots as Le, computed as D, resolveComponent as me, createElementBlock as X, createCommentVNode as d, openBlock as m, createBlock as N, Fragment as Ee, renderSlot as f, withDirectives as P, mergeProps as E, unref as n, createVNode as q, withCtx as S, vShow as F, normalizeProps as We, mergeDefaults as Ge, nextTick as He, onMounted as qe, resolveDynamicComponent as ze, createSlots as ce, createElementVNode as Qe, toDisplayString as Ye } from "vue";
import { httpCall as Ze } from "lkt-http-client";
import { DataState as Ve } from "lkt-data-state";
import { ModificationView as U, ItemCrudMode as I, ItemCrudButtonNavVisibility as Oe, ButtonType as _e, TablePermission as Ue, ensureButtonConfig as z, LktSettings as v, ItemCrudView as $e, ItemCrudButtonNavPosition as Se, NotificationType as _, getDefaultValues as xe, ItemCrud as et, ToastPositionX as oe } from "lkt-vue-kernel";
import { closeModal as tt, updateModalKey as at } from "lkt-modal";
import { __ as ot } from "lkt-i18n";
import { openToast as ne } from "lkt-toast";
import { useRouter as nt } from "vue-router";
const ue = class ue {
};
ue.debugEnabled = !1, ue.defaultSaveIcon = "", ue.defaultDropIcon = "";
let ie = ue;
const w = (...C) => {
  ie.debugEnabled && console.info("[LktItemCrud] ", ...C);
}, Vt = (C = !0) => {
  ie.debugEnabled = C;
}, it = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, ut = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, dt = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, lt = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, Me = /* @__PURE__ */ Ne({
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
  setup(C, { expose: J, emit: x }) {
    const a = x, i = C, h = s(i.pickedModificationView);
    b(() => i.pickedModificationView, (e) => h.value = e), b(h, (e) => a("update:pickedModificationView", e));
    const u = Le(), p = s(null), l = s(null), y = s(i.loading);
    b(() => i.loading, (e) => y.value = e), b(y, (e) => a("update:loading", e));
    const g = s(i.editing);
    b(() => i.editing, (e) => g.value = e), b(g, (e) => a("update:editing", e));
    const c = () => {
      y.value = !0;
    }, k = () => {
      y.value = !1;
    }, Q = (e, V) => {
      typeof e > "u" || a("create", e, V);
    }, O = (e, V) => {
      typeof e > "u" || a("save", e, V);
    }, H = (e, V) => {
      typeof e > "u" || a("drop", e, V);
    }, K = D(() => i.editableView === U.Modifications ? i.modifications : i.item);
    J({
      doSave: () => {
        p.value && typeof p.value.click == "function" && p.value.click();
      },
      doDrop: () => {
        l.value && typeof l.value.click == "function" && l.value.click();
      }
    });
    const Y = D(() => !i.canDrop || i.dropButton === !1 ? !1 : !i.canUpdate && i.canDrop ? !0 : !y.value && i.editing && i.httpSuccessRead), M = D(() => i.mode === I.Create && i.createButton === !1 || i.mode === I.Update && i.updateButton === !1 || y.value ? !1 : i.editing && i.httpSuccessRead), Z = D(() => i.editModeButton === !1 || !i.canSwitchEditMode || !i.canUpdate && !i.canDrop || !i.canUpdate && i.canDrop ? !1 : !y.value && i.mode !== I.Create && i.httpSuccessRead), de = D(() => i.buttonNavVisibility === Oe.Always || u["prev-buttons-ever"] ? !0 : i.buttonNavVisibility === Oe.Never ? !1 : M.value || Y.value || Z.value), $ = D(() => i.modificationView === !1 ? [] : i.modificationView === !0 ? [
      U.Current,
      U.Modifications,
      U.SplitView,
      U.Differences
    ] : Array.isArray(i.modificationView) ? i.modificationView : []), ee = D(() => {
      let e = [];
      return $.value.includes(U.Current) && e.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: h.value === U.Current,
        events: {
          click: () => {
            h.value = U.Current;
          }
        }
      }), $.value.includes(U.Modifications) && e.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: h.value === U.Modifications,
        events: {
          click: () => {
            h.value = U.Modifications;
          }
        }
      }), $.value.includes(U.SplitView) && e.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: h.value === U.SplitView,
        events: {
          click: () => {
            h.value = U.SplitView;
          }
        }
      }), $.value.includes(U.Differences) && e.push({
        text: "Differences",
        icon: "lkt-icn-search",
        disabled: h.value === U.Differences,
        events: {
          click: () => {
            h.value = U.Differences;
          }
        }
      }), e;
    });
    return (e, V) => {
      var L, j;
      const B = me("lkt-button");
      return de.value ? (m(), X("div", it, [
        e.grouped && e.groupButtonAsModalActions ? (m(), X(Ee, { key: 0 }, [
          Z.value ? (m(), N(B, E({ key: 0 }, e.editModeButton, {
            checked: g.value,
            "onUpdate:checked": V[0] || (V[0] = (R) => g.value = R),
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
          P(q(B, E({
            ref_key: "saveButtonRef",
            ref: p
          }, {
            ...e.updateButton,
            modalData: {
              ...(L = e.updateButton) == null ? void 0 : L.modalData,
              ...K.value
            }
          }, {
            disabled: !e.ableToUpdate,
            onLoading: c,
            onLoaded: k,
            onClick: O
          }), {
            default: S(() => [
              n(u)["button-save"] ? f(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: g.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [F, e.mode === n(I).Update && M.value]
          ]),
          P(q(B, E({
            ref_key: "saveButtonRef",
            ref: p
          }, {
            ...e.createButton,
            modalData: {
              ...(j = e.createButton) == null ? void 0 : j.modalData,
              ...K.value
            }
          }, {
            disabled: !e.ableToCreate,
            onLoading: c,
            onLoaded: k,
            onClick: Q
          }), {
            default: S(() => [
              n(u)["button-save"] ? f(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: g.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [F, e.mode === n(I).Create && M.value]
          ]),
          P(q(B, E({
            ref_key: "dropButtonRef",
            ref: l
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: c,
            onLoaded: k,
            onClick: H
          }), {
            default: S(() => [
              n(u)["button-drop"] ? f(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: g.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [F, Y.value && e.mode !== n(I).Create]
          ]),
          n(u).buttons ? f(e.$slots, "buttons", { key: 3 }) : d("", !0)
        ], 64)) : e.grouped ? (m(), N(B, E({
          key: 1,
          ref: "groupButton"
        }, e.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: S(() => [
            Z.value ? (m(), N(B, E({ key: 0 }, e.editModeButton, {
              checked: g.value,
              "onUpdate:checked": V[1] || (V[1] = (R) => g.value = R),
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
            P(q(B, E({
              ref_key: "saveButtonRef",
              ref: p
            }, e.updateButton, {
              disabled: !e.ableToUpdate,
              onLoading: c,
              onLoaded: k,
              onClick: O
            }), {
              default: S(() => [
                n(u)["button-save"] ? f(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: g.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : d("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [F, e.mode === n(I).Update && M.value]
            ]),
            P(q(B, E({
              ref_key: "saveButtonRef",
              ref: p
            }, e.createButton, {
              disabled: !e.ableToCreate,
              onLoading: c,
              onLoaded: k,
              onClick: Q
            }), {
              default: S(() => [
                n(u)["button-save"] ? f(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: g.value,
                  isCreate: !0,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : d("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [F, e.mode === n(I).Create && M.value]
            ]),
            P(q(B, E({
              ref_key: "dropButtonRef",
              ref: l
            }, e.dropButton, {
              disabled: !e.ableToDrop,
              onLoading: c,
              onLoaded: k,
              onClick: H
            }), {
              default: S(() => [
                n(u)["button-drop"] ? f(e.$slots, "button-drop", {
                  key: 0,
                  item: e.item,
                  editMode: g.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : d("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [F, Y.value && e.mode !== n(I).Create]
            ]),
            n(u).buttons ? f(e.$slots, "buttons", { key: 3 }) : d("", !0)
          ]),
          _: 3
        }, 16)) : (m(), X(Ee, { key: 2 }, [
          n(u)["prev-buttons-ever"] ? P((m(), X("div", ut, [
            f(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [F, !y.value]
          ]) : d("", !0),
          n(u)["prev-buttons"] ? P((m(), X("div", dt, [
            f(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [F, g.value && !y.value]
          ]) : d("", !0),
          P(q(B, E({
            ref_key: "saveButtonRef",
            ref: p
          }, e.updateButton, {
            disabled: !e.ableToUpdate,
            onLoading: c,
            onLoaded: k,
            onClick: O
          }), {
            default: S(() => [
              n(u)["button-save"] ? f(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: g.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [F, e.mode === n(I).Update && M.value]
          ]),
          P(q(B, E({
            ref_key: "saveButtonRef",
            ref: p
          }, e.createButton, {
            disabled: !e.ableToCreate,
            onLoading: c,
            onLoaded: k,
            onClick: Q
          }), {
            default: S(() => [
              n(u)["button-save"] ? f(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: g.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: !1
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [F, e.mode === n(I).Create && M.value]
          ]),
          P(q(B, E({
            ref_key: "dropButtonRef",
            ref: l
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: c,
            onLoaded: k,
            onClick: H
          }), {
            default: S(() => [
              n(u)["button-drop"] ? f(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: g.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [F, Y.value && e.mode !== n(I).Create]
          ]),
          n(u).buttons ? P((m(), X("div", lt, [
            f(e.$slots, "buttons")
          ], 512)), [
            [F, g.value && !y.value]
          ]) : d("", !0),
          $.value.length > 0 ? (m(), N(B, We(E({ key: 3 }, {
            type: n(_e).Tooltip,
            icon: "lkt-icn-column-sort",
            class: "lkt-item-crud--modifications-button",
            splitButtons: ee.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : d("", !0),
          Z.value ? (m(), N(B, E({ key: 4 }, e.editModeButton, {
            checked: g.value,
            "onUpdate:checked": V[2] || (V[2] = (R) => g.value = R),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0)
        ], 64))
      ])) : d("", !0);
    };
  }
}), rt = (C, J, x) => {
  let a = new Ve(JSON.parse(JSON.stringify(C)), {
    onlyProps: je(x),
    recursiveOnlyProps: !1
  });
  return a.increment(JSON.parse(JSON.stringify(J))), a;
}, je = (C) => {
  if (C.items === void 0) return [];
  if (C.items.length === 0) return [];
  let J = [];
  for (let x in C.items) {
    let a = C.items[x];
    switch (a.type) {
      case "field":
        a.key !== void 0 && J.push(a.key);
        break;
      case "form":
        a.form && (J = [...J, ...je(a.form)]);
        break;
    }
  }
  return J;
}, st = { class: "lkt-item-crud" }, pt = {
  key: 0,
  class: "lkt-item-crud_header"
}, vt = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, ft = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, ct = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, mt = {
  key: 2,
  class: "lkt-item-crud_content"
}, bt = {
  key: 0,
  class: "lkt-grid-1"
}, gt = /* @__PURE__ */ Ne({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ Ge({
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
  }, xe(et)),
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
  setup(C, { expose: J, emit: x }) {
    const a = C, i = nt(), h = Le(), u = x, p = s(!0), l = s(a.modelValue), y = s(a.modifications), g = s(a.customData), c = s(a.perms), k = s(a.editing), Q = s(!1), O = s(!1), H = s(!1), K = s(200), T = s(new Ve(l.value, a.dataStateConfig)), W = s(!1), Y = s(new Ve(a.readData)), M = s(a.mode === I.Create), Z = s(!1), de = s(!1), $ = s(null), ee = D(() => !M.value && Array.isArray(c.value) && c.value.includes(Ue.Update)), e = D(() => !M.value && Array.isArray(c.value) && c.value.includes(Ue.Drop)), V = D(() => !M.value && Array.isArray(c.value) && c.value.includes(Ue.SwitchEditMode)), B = s(U.Current);
    b(() => a.mode, (t) => {
      M.value = t === I.Create;
    }), b(() => a.perms, (t) => {
      c.value = t;
    }), b(c, (t) => {
      u("update:perms", t);
    }), b(() => a.customData, (t) => {
      g.value = t;
    }), b(g, (t) => {
      u("update:customData", t);
    }), b(() => a.modifications, (t) => {
      y.value = t;
    }), b(y, (t) => {
      Te(), u("update:modifications", t);
    });
    const L = s(z(a.createButton, v.defaultCreateButton)), j = s(z(a.updateButton, v.defaultUpdateButton)), R = s(z(a.dropButton, v.defaultDropButton)), le = s(z(a.editModeButton, v.defaultEditModeButton)), be = s(z(a.groupButton, v.defaultGroupButton));
    b(() => a.createButton, (t) => {
      L.value = z(t, v.defaultCreateButton);
    }, { deep: !0 }), b(() => a.updateButton, (t) => {
      j.value = z(t, v.defaultUpdateButton);
    }, { deep: !0 }), b(() => a.dropButton, (t) => {
      R.value = z(t, v.defaultDropButton);
    }, { deep: !0 }), b(() => a.editModeButton, (t) => {
      le.value = z(t, v.defaultEditModeButton);
    }, { deep: !0 });
    const re = async () => {
      var t, o, G;
      w("fetchItem"), p.value = !0, K.value = -1, H.value = !1, typeof ((t = a.events) == null ? void 0 : t.httpStart) == "function" && a.events.httpStart();
      try {
        const A = await Ze(a.readResource, a.readData);
        if (w("fetchItem -> response", A), p.value = !1, K.value = A.httpStatus, g.value = A.custom, !A.success) {
          O.value = !1, K.value = A.httpStatus, typeof ((o = a.events) == null ? void 0 : o.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: A
          }), u("error", A.httpStatus);
          return;
        }
        O.value = !0, l.value = A.data, y.value = A.modifications, c.value = A.perms, T.value.increment(l.value).turnStoredIntoOriginal(), W.value = T.value.changed(), Y.value.turnStoredIntoOriginal(), typeof ((G = a.events) == null ? void 0 : G.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: A
        }), u("read", A);
      } catch {
        p.value = !1, O.value = !1, K.value = 404, u("error", 404);
        return;
      }
    };
    b(() => a.modelValue, (t) => {
      l.value = t, T.value.increment(t);
    }, { deep: !0 }), b(l, (t) => {
      if (Z.value = !0, w("item updated ->", l.value), typeof a.beforeEmitUpdate == "function") {
        w("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(l.value);
        w("item updated -> override with: ", o), typeof o == "object" && (l.value = o);
      }
      Te(), u("update:modelValue", l.value), w("item updated -> update dataState"), T.value.increment(t), W.value = T.value.changed(), He(() => Z.value = !1);
    }, { deep: !0 }), b(c, () => u("perms", c.value)), b(W, (t) => {
      u("modified-data", t);
    }), b(() => a.readData, (t) => {
      Y.value.increment(t), Y.value.changed() && re();
    }), b(() => a.editing, (t) => {
      w("editing updated -> updating editMode", t), k.value = t;
    }), b(k, (t) => {
      w("editMode updated -> emit update", t), u("update:editing", t);
    });
    const Ie = s(void 0), Te = () => {
      ve.value && (Ie.value = rt(l.value, y.value, a.form));
    };
    qe(() => {
      a.readResource && !M.value ? re() : (M.value, O.value = !0, k.value = !0, p.value = !1, T.value.increment(l.value).turnStoredIntoOriginal(), W.value = T.value.changed());
    });
    const ge = (t, o) => {
      if (o) {
        if (p.value = !1, typeof t < "u" && (K.value = t.httpStatus, !t.success))
          return H.value = !0, u("error", t.httpStatus), !1;
        H.value = !0;
      }
      return !0;
    }, Re = (t, o) => {
      if (w("doAutoReloadId -> enter: ", t), typeof t < "u" && t.autoReloadId)
        if (w("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), typeof o < "u") {
          let G = o;
          typeof o == "function" && (G = o(t.autoReloadId)), i.push(G);
        } else Ce.value ? (w("doAutoReloadId -> insideModal: ", a), at(a.modalConfig.modalName, a.modalConfig.modalKey, t.autoReloadId)) : (w("doAutoReloadId -> outsideModal"), a.readData.id = t.autoReloadId, w("doAutoReloadId -> turning off create mode"), M.value = !1, re());
    }, ye = (t, o) => {
      if (w("onCreate"), !ge(o, L.value.resource)) {
        a.notificationType === _.Toast && ne({
          text: v.defaultCreateErrorText,
          details: v.defaultCreateErrorDetails,
          icon: v.defaultCreateErrorIcon,
          positionX: oe.Right
        });
        return;
      }
      de.value = !0, w("onCreate -> turn stored data into original"), T.value.increment(l.value).turnStoredIntoOriginal(), a.notificationType === _.Toast && ne({
        text: v.defaultCreateSuccessText,
        details: v.defaultCreateSuccessDetails,
        icon: v.defaultCreateSuccessIcon,
        positionX: oe.Right
      }), Re(o, a.redirectOnCreate), w("onCreate -> beforeEmitCreate"), u("create", o);
    }, ke = (t, o) => {
      if (w("onUpdate"), !ge(o, j.value.resource)) {
        a.notificationType === _.Toast && ne({
          text: v.defaultUpdateErrorText,
          details: v.defaultUpdateErrorDetails,
          icon: v.defaultUpdateErrorIcon,
          positionX: oe.Right
        });
        return;
      }
      w("onUpdate -> turn stored data into original"), T.value.turnStoredIntoOriginal(), a.notificationType === _.Toast && ne({
        text: v.defaultUpdateSuccessText,
        details: v.defaultUpdateSuccessDetails,
        icon: v.defaultUpdateSuccessIcon,
        positionX: oe.Right
      }), Re(o), u("update", o);
    }, Be = (t, o) => {
      if (w("onDrop"), !ge(o, R.value.resource)) {
        a.notificationType === _.Toast && ne({
          text: v.defaultDropErrorText,
          details: v.defaultDropErrorDetails,
          icon: v.defaultDropErrorIcon,
          positionX: oe.Right
        });
        return;
      }
      if (a.notificationType === _.Toast && ne({
        text: v.defaultDropSuccessText,
        details: v.defaultDropSuccessDetails,
        icon: v.defaultDropSuccessIcon,
        positionX: oe.Right
      }), u("drop", o), a.view === $e.Modal && (w("onDrop -> close modal"), tt(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let G = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (G = a.redirectOnDrop()), i.push(G);
      }
    };
    J({
      doDrop: () => {
        $.value && $.value.doDrop();
      },
      doRefresh: re,
      doSave: () => {
        $.value && $.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        T.value.increment(l.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => T.value.changed()
    });
    const Pe = D(() => {
      var t;
      return T.value.changed() ? (t = a.modalConfig) == null ? void 0 : t.closeConfirm : "";
    }), Fe = (t) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...t,
          itemCreated: de.value
        });
    }, De = D(() => a.title.startsWith("__:") ? String(ot(a.title.substring(3))) : a.title), Xe = D(() => p.value ? !1 : De.value.length > 0 || !!h["post-title"]), Ce = D(() => a.view === $e.Modal), Ae = D(() => Ce.value ? "lkt-modal" : "section"), se = D(() => {
      var t, o;
      return a.mode !== I.Update || !ee.value || !a.enabledSaveWithoutChanges && !W.value || ve.value && !Q.value ? !1 : typeof ((t = j.value) == null ? void 0 : t.disabled) == "function" ? !j.value.disabled({
        prop: l.value
      }) : typeof ((o = j.value) == null ? void 0 : o.disabled) == "boolean" ? !j.value.disabled : !0;
    }), pe = D(() => {
      var t, o;
      return a.mode !== I.Create || !a.enabledSaveWithoutChanges && !W.value || ve.value && !Q.value ? !1 : typeof ((t = L.value) == null ? void 0 : t.disabled) == "function" ? !L.value.disabled({
        prop: l.value
      }) : typeof ((o = L.value) == null ? void 0 : o.disabled) == "boolean" ? !L.value.disabled : !0;
    }), he = D(() => {
      var t, o;
      return e.value ? typeof ((t = R.value) == null ? void 0 : t.disabled) == "function" ? !R.value.disabled({
        prop: l.value
      }) : typeof ((o = R.value) == null ? void 0 : o.disabled) == "boolean" ? !R.value.disabled : !0 : !1;
    }), Je = D(() => Ae.value === "lkt-modal" ? {
      title: a.title,
      item: l.value,
      ...a.modalConfig,
      beforeClose: Fe,
      closeConfirm: Pe.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: pe.value || se.value
      } : !1
    } : {}), ve = D(() => typeof a.form == "object" && Object.keys(a.form).length > 0), we = D(() => Object.keys(y.value).length === 0 ? [] : a.modificationView), fe = D(() => Object.keys(y.value).length === 0 ? [U.Current] : [U.Modifications]);
    return (t, o) => {
      const G = me("lkt-http-info"), A = me("lkt-form"), Ke = me("lkt-loader");
      return m(), N(ze(Ae.value), E(Je.value, { class: "lkt-item-crud" }), ce({
        default: S(() => [
          Qe("article", st, [
            !Ce.value && Xe.value ? (m(), X("header", pt, [
              n(h)["pre-title"] ? (m(), X("div", vt, [
                f(t.$slots, "pre-title", {
                  item: l.value,
                  loading: p.value
                })
              ])) : d("", !0),
              De.value.length > 0 ? (m(), X("h1", ft, Ye(De.value), 1)) : d("", !0),
              n(h)["post-title"] ? (m(), X("div", ct, [
                f(t.$slots, "post-title", {
                  item: l.value,
                  loading: p.value
                })
              ])) : d("", !0)
            ])) : d("", !0),
            t.buttonNavPosition === n(Se).Top && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (m(), N(Me, {
              key: 1,
              ref_key: "buttonNav",
              ref: $,
              loading: p.value,
              "onUpdate:loading": o[3] || (o[3] = (r) => p.value = r),
              editing: k.value,
              "onUpdate:editing": o[4] || (o[4] = (r) => k.value = r),
              "picked-modification-view": B.value,
              "onUpdate:pickedModificationView": o[5] || (o[5] = (r) => B.value = r),
              item: l.value,
              modifications: y.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": L.value,
              "update-button": j.value,
              "drop-button": R.value,
              "edit-mode-button": le.value,
              "group-button": be.value,
              "data-changed": W.value,
              "http-success-read": O.value,
              "can-update": ee.value,
              "can-drop": e.value,
              "can-switch-edit-mode": V.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": pe.value,
              "able-to-update": se.value,
              "able-to-drop": he.value,
              perms: c.value,
              "modification-view": we.value,
              "editable-view": fe.value[0],
              onCreate: ye,
              onSave: ke,
              onDrop: Be
            }, ce({ _: 2 }, [
              n(h)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: S(({ canUpdate: r, canDrop: te, perms: ae }) => [
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
                fn: S(({ canUpdate: r, canDrop: te, perms: ae }) => [
                  f(t.$slots, "prev-buttons", {
                    canUpdate: r,
                    canDrop: te,
                    perms: ae
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "modifications", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view", "editable-view"])) : d("", !0),
            p.value ? d("", !0) : (m(), X("div", mt, [
              O.value ? (m(), X("div", bt, [
                H.value && t.notificationType === n(_).Inline ? (m(), N(G, {
                  key: 0,
                  code: K.value,
                  palette: K.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: o[6] || (o[6] = (r) => H.value = !1)
                }, null, 8, ["code", "palette"])) : d("", !0),
                ve.value ? (m(), N(A, {
                  key: 1,
                  modelValue: l.value,
                  "onUpdate:modelValue": o[7] || (o[7] = (r) => l.value = r),
                  modifications: y.value,
                  "onUpdate:modifications": o[8] || (o[8] = (r) => y.value = r),
                  valid: Q.value,
                  "onUpdate:valid": o[9] || (o[9] = (r) => Q.value = r),
                  form: t.form,
                  "modification-view": B.value,
                  "modification-data-state": Ie.value,
                  "editable-views": fe.value,
                  disabled: !k.value
                }, null, 8, ["modelValue", "modifications", "valid", "form", "modification-view", "modification-data-state", "editable-views", "disabled"])) : f(t.$slots, "item", {
                  key: 2,
                  item: l.value,
                  loading: p.value,
                  editMode: k.value,
                  isCreate: M.value,
                  canUpdate: ee.value,
                  canDrop: e.value,
                  itemBeingEdited: Z.value,
                  perms: c.value
                })
              ])) : t.notificationType === n(_).Inline ? (m(), N(G, {
                key: 1,
                code: K.value
              }, null, 8, ["code"])) : d("", !0)
            ])),
            p.value ? (m(), N(Ke, { key: 3 })) : d("", !0),
            t.buttonNavPosition === n(Se).Bottom && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (m(), N(Me, {
              key: 4,
              ref_key: "buttonNav",
              ref: $,
              loading: p.value,
              "onUpdate:loading": o[10] || (o[10] = (r) => p.value = r),
              editing: k.value,
              "onUpdate:editing": o[11] || (o[11] = (r) => k.value = r),
              "picked-modification-view": B.value,
              "onUpdate:pickedModificationView": o[12] || (o[12] = (r) => B.value = r),
              item: l.value,
              modifications: y.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": L.value,
              "update-button": j.value,
              "drop-button": R.value,
              "edit-mode-button": le.value,
              "group-button": be.value,
              "data-changed": W.value,
              "http-success-read": O.value,
              "can-update": ee.value,
              "can-drop": e.value,
              "can-switch-edit-mode": V.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": pe.value,
              "able-to-update": se.value,
              "able-to-drop": he.value,
              perms: c.value,
              "modification-view": we.value,
              "editable-view": fe.value[0],
              onCreate: ye,
              onSave: ke,
              onDrop: Be
            }, ce({ _: 2 }, [
              n(h)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: S(() => [
                  f(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              n(h)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: S(() => [
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
          fn: S(() => [
            t.buttonNavPosition === n(Se).Top ? (m(), N(Me, {
              key: 0,
              ref_key: "buttonNav",
              ref: $,
              loading: p.value,
              "onUpdate:loading": o[0] || (o[0] = (r) => p.value = r),
              editing: k.value,
              "onUpdate:editing": o[1] || (o[1] = (r) => k.value = r),
              "picked-modification-view": B.value,
              "onUpdate:pickedModificationView": o[2] || (o[2] = (r) => B.value = r),
              item: l.value,
              modifications: y.value,
              mode: t.mode,
              view: t.view,
              grouped: !0,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": L.value,
              "update-button": j.value,
              "drop-button": R.value,
              "edit-mode-button": le.value,
              "group-button": be.value,
              "data-changed": W.value,
              "http-success-read": O.value,
              "can-update": ee.value,
              "can-drop": e.value,
              "can-switch-edit-mode": V.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": pe.value,
              "able-to-update": se.value,
              "able-to-drop": he.value,
              perms: c.value,
              "modification-view": we.value,
              "editable-view": fe.value[0],
              onCreate: ye,
              onSave: ke,
              onDrop: Be
            }, ce({ _: 2 }, [
              n(h)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: S(({ canUpdate: r, canDrop: te, perms: ae }) => [
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
                fn: S(({ canUpdate: r, canDrop: te, perms: ae }) => [
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
}), It = {
  install: (C, J = {}) => {
    C.component("lkt-item-crud") === void 0 && C.component("lkt-item-crud", gt);
  }
}, Tt = (C) => {
  ie.defaultSaveIcon = C;
}, Rt = (C) => {
  ie.defaultDropIcon = C;
};
export {
  Vt as debugLktItemCrud,
  It as default,
  Rt as setItemCrudDefaultDropIcon,
  Tt as setItemCrudDefaultSaveIcon
};
