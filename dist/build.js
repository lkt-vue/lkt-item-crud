import { defineComponent as Oe, ref as s, watch as b, useSlots as Ne, computed as B, resolveComponent as ce, createElementBlock as P, createCommentVNode as d, openBlock as m, createBlock as N, Fragment as Ae, renderSlot as f, withDirectives as L, mergeProps as A, unref as n, createVNode as Q, withCtx as S, vShow as j, normalizeProps as We, mergeDefaults as Ge, nextTick as He, onMounted as qe, resolveDynamicComponent as ze, createSlots as fe, createElementVNode as Qe, toDisplayString as Ye } from "vue";
import { httpCall as Ze } from "lkt-http-client";
import { DataState as Me } from "lkt-data-state";
import { ItemCrudMode as I, ItemCrudButtonNavVisibility as Ee, ModificationView as M, ButtonType as _e, TablePermission as Ue, ensureButtonConfig as Y, LktSettings as v, ItemCrudView as $e, ItemCrudButtonNavPosition as we, NotificationType as x, getDefaultValues as xe, ItemCrud as et, ToastPositionX as ae } from "lkt-vue-kernel";
import { closeModal as tt, updateModalKey as ot } from "lkt-modal";
import { __ as at } from "lkt-i18n";
import { openToast as ne } from "lkt-toast";
import { useRouter as nt } from "vue-router";
const re = class re {
};
re.debugEnabled = !1, re.defaultSaveIcon = "", re.defaultDropIcon = "";
let ue = re;
const C = (...g) => {
  ue.debugEnabled && console.info("[LktItemCrud] ", ...g);
}, It = (g = !0) => {
  ue.debugEnabled = g;
}, ut = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, it = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, dt = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, rt = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, Se = /* @__PURE__ */ Oe({
  __name: "ButtonNav",
  props: {
    item: { default: () => ({}) },
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
    pickedModificationView: {}
  },
  emits: [
    "update:loading",
    "update:editing",
    "update:pickedModificationView",
    "create",
    "save",
    "drop"
  ],
  setup(g, { expose: F, emit: ee }) {
    const o = ee, u = g, D = s(u.pickedModificationView);
    b(() => u.pickedModificationView, (e) => D.value = e), b(D, (e) => o("update:pickedModificationView", e));
    const i = Ne(), p = s(null), r = s(null), h = s(u.loading);
    b(() => u.loading, (e) => h.value = e), b(h, (e) => o("update:loading", e));
    const y = s(u.editing);
    b(() => u.editing, (e) => y.value = e), b(y, (e) => o("update:editing", e));
    const c = () => {
      h.value = !0;
    }, k = () => {
      h.value = !1;
    }, Z = (e, U) => {
      typeof e > "u" || o("create", e, U);
    }, $ = (e, U) => {
      typeof e > "u" || o("save", e, U);
    }, K = (e, U) => {
      typeof e > "u" || o("drop", e, U);
    };
    F({
      doSave: () => {
        p.value && typeof p.value.click == "function" && p.value.click();
      },
      doDrop: () => {
        r.value && typeof r.value.click == "function" && r.value.click();
      }
    });
    const V = B(() => !u.canDrop || u.dropButton === !1 ? !1 : !u.canUpdate && u.canDrop ? !0 : !h.value && u.editing && u.httpSuccessRead), X = B(() => u.mode === I.Create && u.createButton === !1 || u.mode === I.Update && u.updateButton === !1 || h.value ? !1 : u.editing && u.httpSuccessRead), O = B(() => u.editModeButton === !1 || !u.canSwitchEditMode || !u.canUpdate && !u.canDrop || !u.canUpdate && u.canDrop ? !1 : !h.value && u.mode !== I.Create && u.httpSuccessRead), ie = B(() => u.buttonNavVisibility === Ee.Always || i["prev-buttons-ever"] ? !0 : u.buttonNavVisibility === Ee.Never ? !1 : X.value || V.value || O.value), _ = B(() => u.modificationView === !1 ? [] : u.modificationView === !0 ? [
      M.Current,
      M.Modifications,
      M.SplitView,
      M.Differences
    ] : Array.isArray(u.modificationView) ? u.modificationView : []), G = B(() => {
      let e = [];
      return _.value.includes(M.Current) && e.push({
        text: "Current",
        icon: "lkt-icn-see",
        disabled: D.value === M.Current,
        events: {
          click: () => {
            D.value = M.Current;
          }
        }
      }), _.value.includes(M.Modifications) && e.push({
        text: "Modifications",
        icon: "lkt-icn-edit",
        disabled: D.value === M.Modifications,
        events: {
          click: () => {
            D.value = M.Modifications;
          }
        }
      }), _.value.includes(M.SplitView) && e.push({
        text: "Split View",
        icon: "lkt-icn-columns",
        disabled: D.value === M.SplitView,
        events: {
          click: () => {
            D.value = M.SplitView;
          }
        }
      }), _.value.includes(M.Differences) && e.push({
        text: "Differences",
        icon: "lkt-icn-search",
        disabled: D.value === M.Differences,
        events: {
          click: () => {
            D.value = M.Differences;
          }
        }
      }), e;
    });
    return (e, U) => {
      const w = ce("lkt-button");
      return ie.value ? (m(), P("div", ut, [
        e.grouped && e.groupButtonAsModalActions ? (m(), P(Ae, { key: 0 }, [
          O.value ? (m(), N(w, A({ key: 0 }, e.editModeButton, {
            checked: y.value,
            "onUpdate:checked": U[0] || (U[0] = (E) => y.value = E),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0),
          n(i)["prev-buttons-ever"] ? f(e.$slots, "prev-buttons-ever", {
            key: 1,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          n(i)["prev-buttons"] ? f(e.$slots, "prev-buttons", {
            key: 2,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          L(Q(w, A({
            ref_key: "saveButtonRef",
            ref: p
          }, e.updateButton, {
            disabled: !e.ableToUpdate,
            onLoading: c,
            onLoaded: k,
            onClick: $
          }), {
            default: S(() => [
              n(i)["button-save"] ? f(e.$slots, "button-save", {
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
            [j, e.mode === n(I).Update && X.value]
          ]),
          L(Q(w, A({
            ref_key: "saveButtonRef",
            ref: p
          }, e.createButton, {
            disabled: !e.ableToCreate,
            onLoading: c,
            onLoaded: k,
            onClick: Z
          }), {
            default: S(() => [
              n(i)["button-save"] ? f(e.$slots, "button-save", {
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
            [j, e.mode === n(I).Create && X.value]
          ]),
          L(Q(w, A({
            ref_key: "dropButtonRef",
            ref: r
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: c,
            onLoaded: k,
            onClick: K
          }), {
            default: S(() => [
              n(i)["button-drop"] ? f(e.$slots, "button-drop", {
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
            [j, V.value && e.mode !== n(I).Create]
          ]),
          n(i).buttons ? f(e.$slots, "buttons", { key: 3 }) : d("", !0)
        ], 64)) : e.grouped ? (m(), N(w, A({
          key: 1,
          ref: "groupButton"
        }, e.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: S(() => [
            O.value ? (m(), N(w, A({ key: 0 }, e.editModeButton, {
              checked: y.value,
              "onUpdate:checked": U[1] || (U[1] = (E) => y.value = E),
              class: "lkt-item-crud--switch-mode-button"
            }), null, 16, ["checked"])) : d("", !0),
            n(i)["prev-buttons-ever"] ? f(e.$slots, "prev-buttons-ever", {
              key: 1,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : d("", !0),
            n(i)["prev-buttons"] ? f(e.$slots, "prev-buttons", {
              key: 2,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : d("", !0),
            L(Q(w, A({
              ref_key: "saveButtonRef",
              ref: p
            }, e.updateButton, {
              disabled: !e.ableToUpdate,
              onLoading: c,
              onLoaded: k,
              onClick: $
            }), {
              default: S(() => [
                n(i)["button-save"] ? f(e.$slots, "button-save", {
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
              [j, e.mode === n(I).Update && X.value]
            ]),
            L(Q(w, A({
              ref_key: "saveButtonRef",
              ref: p
            }, e.createButton, {
              disabled: !e.ableToCreate,
              onLoading: c,
              onLoaded: k,
              onClick: Z
            }), {
              default: S(() => [
                n(i)["button-save"] ? f(e.$slots, "button-save", {
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
              [j, e.mode === n(I).Create && X.value]
            ]),
            L(Q(w, A({
              ref_key: "dropButtonRef",
              ref: r
            }, e.dropButton, {
              disabled: !e.ableToDrop,
              onLoading: c,
              onLoaded: k,
              onClick: K
            }), {
              default: S(() => [
                n(i)["button-drop"] ? f(e.$slots, "button-drop", {
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
              [j, V.value && e.mode !== n(I).Create]
            ]),
            n(i).buttons ? f(e.$slots, "buttons", { key: 3 }) : d("", !0)
          ]),
          _: 3
        }, 16)) : (m(), P(Ae, { key: 2 }, [
          n(i)["prev-buttons-ever"] ? L((m(), P("div", it, [
            f(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [j, !h.value]
          ]) : d("", !0),
          n(i)["prev-buttons"] ? L((m(), P("div", dt, [
            f(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [j, y.value && !h.value]
          ]) : d("", !0),
          L(Q(w, A({
            ref_key: "saveButtonRef",
            ref: p
          }, e.updateButton, {
            disabled: !e.ableToUpdate,
            onLoading: c,
            onLoaded: k,
            onClick: $
          }), {
            default: S(() => [
              n(i)["button-save"] ? f(e.$slots, "button-save", {
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
            [j, e.mode === n(I).Update && X.value]
          ]),
          L(Q(w, A({
            ref_key: "saveButtonRef",
            ref: p
          }, e.createButton, {
            disabled: !e.ableToCreate,
            onLoading: c,
            onLoaded: k,
            onClick: Z
          }), {
            default: S(() => [
              n(i)["button-save"] ? f(e.$slots, "button-save", {
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
            [j, e.mode === n(I).Create && X.value]
          ]),
          L(Q(w, A({
            ref_key: "dropButtonRef",
            ref: r
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: c,
            onLoaded: k,
            onClick: K
          }), {
            default: S(() => [
              n(i)["button-drop"] ? f(e.$slots, "button-drop", {
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
            [j, V.value && e.mode !== n(I).Create]
          ]),
          n(i).buttons ? L((m(), P("div", rt, [
            f(e.$slots, "buttons")
          ], 512)), [
            [j, y.value && !h.value]
          ]) : d("", !0),
          O.value ? (m(), N(w, A({ key: 3 }, e.editModeButton, {
            checked: y.value,
            "onUpdate:checked": U[2] || (U[2] = (E) => y.value = E),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0),
          _.value.length > 0 ? (m(), N(w, We(A({ key: 4 }, {
            type: n(_e).Tooltip,
            icon: "lkt-icn-column-sort",
            class: "lkt-item-crud--modifications-button",
            splitButtons: G.value,
            tooltip: {
              contentClass: "lkt-flex-column"
            }
          })), null, 16)) : d("", !0)
        ], 64))
      ])) : d("", !0);
    };
  }
}), lt = (g, F, ee) => {
  let o = new Me(JSON.parse(JSON.stringify(g)), {
    onlyProps: Le(ee),
    recursiveOnlyProps: !1
  });
  return o.increment(JSON.parse(JSON.stringify(F))), o;
}, Le = (g) => {
  if (g.items === void 0) return [];
  if (g.items.length === 0) return [];
  let F = [];
  for (let ee in g.items) {
    let o = g.items[ee];
    switch (o.type) {
      case "field":
        o.key !== void 0 && F.push(o.key);
        break;
      case "form":
        o.form && (F = [...F, ...Le(o.form)]);
        break;
    }
  }
  return F;
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
}, yt = /* @__PURE__ */ Oe({
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
  setup(g, { expose: F, emit: ee }) {
    const o = g, u = nt(), D = Ne(), i = ee, p = s(!0), r = s(o.modelValue), h = s(o.modifications), y = s(o.customData), c = s(o.perms), k = s(o.editing), Z = s(!1), $ = s(!1), K = s(!1), W = s(200), T = s(new Me(r.value, o.dataStateConfig)), V = s(!1), X = s(new Me(o.readData)), O = s(o.mode === I.Create), ie = s(!1), _ = s(!1), G = s(null), e = B(() => !O.value && Array.isArray(c.value) && c.value.includes(Ue.Update)), U = B(() => !O.value && Array.isArray(c.value) && c.value.includes(Ue.Drop)), w = B(() => !O.value && Array.isArray(c.value) && c.value.includes(Ue.SwitchEditMode)), E = s(M.Current);
    b(() => o.mode, (t) => {
      O.value = t === I.Create;
    }), b(() => o.perms, (t) => {
      c.value = t;
    }), b(c, (t) => {
      i("update:perms", t);
    }), b(() => o.customData, (t) => {
      y.value = t;
    }), b(y, (t) => {
      i("update:customData", t);
    }), b(() => o.modifications, (t) => {
      h.value = t;
    }), b(h, (t) => {
      Te(), i("update:modifications", t);
    });
    const H = s(Y(o.createButton, v.defaultCreateButton)), q = s(Y(o.updateButton, v.defaultUpdateButton)), z = s(Y(o.dropButton, v.defaultDropButton)), le = s(Y(o.editModeButton, v.defaultEditModeButton)), me = s(Y(o.groupButton, v.defaultGroupButton));
    b(() => o.createButton, (t) => {
      H.value = Y(t, v.defaultCreateButton);
    }, { deep: !0 }), b(() => o.updateButton, (t) => {
      q.value = Y(t, v.defaultUpdateButton);
    }, { deep: !0 }), b(() => o.dropButton, (t) => {
      z.value = Y(t, v.defaultDropButton);
    }, { deep: !0 }), b(() => o.editModeButton, (t) => {
      le.value = Y(t, v.defaultEditModeButton);
    }, { deep: !0 });
    const se = async () => {
      var t, a, J;
      C("fetchItem"), p.value = !0, W.value = -1, K.value = !1, typeof ((t = o.events) == null ? void 0 : t.httpStart) == "function" && o.events.httpStart();
      try {
        const R = await Ze(o.readResource, o.readData);
        if (C("fetchItem -> response", R), p.value = !1, W.value = R.httpStatus, y.value = R.custom, !R.success) {
          $.value = !1, W.value = R.httpStatus, typeof ((a = o.events) == null ? void 0 : a.httpEnd) == "function" && o.events.httpEnd({
            httpResponse: R
          }), i("error", R.httpStatus);
          return;
        }
        $.value = !0, r.value = R.data, h.value = R.modifications, c.value = R.perms, T.value.increment(r.value).turnStoredIntoOriginal(), V.value = T.value.changed(), X.value.turnStoredIntoOriginal(), typeof ((J = o.events) == null ? void 0 : J.httpEnd) == "function" && o.events.httpEnd({
          httpResponse: R
        }), i("read", R);
      } catch {
        p.value = !1, $.value = !1, W.value = 404, i("error", 404);
        return;
      }
    };
    b(() => o.modelValue, (t) => {
      r.value = t, T.value.increment(t);
    }, { deep: !0 }), b(r, (t) => {
      if (ie.value = !0, C("item updated ->", r.value), typeof o.beforeEmitUpdate == "function") {
        C("item updated -> has beforeEmitUpdate");
        let a = o.beforeEmitUpdate(r.value);
        C("item updated -> override with: ", a), typeof a == "object" && (r.value = a);
      }
      Te(), i("update:modelValue", r.value), C("item updated -> update dataState"), T.value.increment(t), V.value = T.value.changed(), He(() => ie.value = !1);
    }, { deep: !0 }), b(c, () => i("perms", c.value)), b(V, (t) => {
      i("modified-data", t);
    }), b(() => o.readData, (t) => {
      X.value.increment(t), X.value.changed() && se();
    }), b(() => o.editing, (t) => {
      C("editing updated -> updating editMode", t), k.value = t;
    }), b(k, (t) => {
      C("editMode updated -> emit update", t), i("update:editing", t);
    });
    const Ie = s(void 0), Te = () => {
      de.value && (Ie.value = lt(r.value, h.value, o.form));
    };
    qe(() => {
      o.readResource && !O.value ? se() : (O.value, $.value = !0, k.value = !0, p.value = !1, T.value.increment(r.value).turnStoredIntoOriginal(), V.value = T.value.changed());
    });
    const be = (t, a) => {
      if (a) {
        if (p.value = !1, typeof t < "u" && (W.value = t.httpStatus, !t.success))
          return K.value = !0, i("error", t.httpStatus), !1;
        K.value = !0;
      }
      return !0;
    }, Ve = (t, a) => {
      if (C("doAutoReloadId -> enter: ", t), typeof t < "u" && t.autoReloadId)
        if (C("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), typeof a < "u") {
          let J = a;
          typeof a == "function" && (J = a(t.autoReloadId)), u.push(J);
        } else De.value ? (C("doAutoReloadId -> insideModal: ", o), ot(o.modalConfig.modalName, o.modalConfig.modalKey, t.autoReloadId)) : (C("doAutoReloadId -> outsideModal"), o.readData.id = t.autoReloadId, C("doAutoReloadId -> turning off create mode"), O.value = !1, se());
    }, ye = (t, a) => {
      if (C("onCreate"), !be(a, H.value.resource)) {
        o.notificationType === x.Toast && ne({
          text: v.defaultCreateErrorText,
          details: v.defaultCreateErrorDetails,
          icon: v.defaultCreateErrorIcon,
          positionX: ae.Right
        });
        return;
      }
      _.value = !0, C("onCreate -> turn stored data into original"), T.value.increment(r.value).turnStoredIntoOriginal(), o.notificationType === x.Toast && ne({
        text: v.defaultCreateSuccessText,
        details: v.defaultCreateSuccessDetails,
        icon: v.defaultCreateSuccessIcon,
        positionX: ae.Right
      }), Ve(a, o.redirectOnCreate), C("onCreate -> beforeEmitCreate"), i("create", a);
    }, ge = (t, a) => {
      if (C("onUpdate"), !be(a, q.value.resource)) {
        o.notificationType === x.Toast && ne({
          text: v.defaultUpdateErrorText,
          details: v.defaultUpdateErrorDetails,
          icon: v.defaultUpdateErrorIcon,
          positionX: ae.Right
        });
        return;
      }
      C("onUpdate -> turn stored data into original"), T.value.turnStoredIntoOriginal(), o.notificationType === x.Toast && ne({
        text: v.defaultUpdateSuccessText,
        details: v.defaultUpdateSuccessDetails,
        icon: v.defaultUpdateSuccessIcon,
        positionX: ae.Right
      }), Ve(a), i("update", a);
    }, ke = (t, a) => {
      if (C("onDrop"), !be(a, z.value.resource)) {
        o.notificationType === x.Toast && ne({
          text: v.defaultDropErrorText,
          details: v.defaultDropErrorDetails,
          icon: v.defaultDropErrorIcon,
          positionX: ae.Right
        });
        return;
      }
      if (o.notificationType === x.Toast && ne({
        text: v.defaultDropSuccessText,
        details: v.defaultDropSuccessDetails,
        icon: v.defaultDropSuccessIcon,
        positionX: ae.Right
      }), i("drop", a), o.view === $e.Modal && (C("onDrop -> close modal"), tt(o.modalConfig.modalName, o.modalConfig.modalKey)), typeof o.redirectOnDrop < "u") {
        let J = o.redirectOnDrop;
        typeof o.redirectOnDrop == "function" && (J = o.redirectOnDrop()), u.push(J);
      }
    };
    F({
      doDrop: () => {
        G.value && G.value.doDrop();
      },
      doRefresh: se,
      doSave: () => {
        G.value && G.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        T.value.increment(r.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => T.value.changed()
    });
    const je = B(() => {
      var t;
      return T.value.changed() ? (t = o.modalConfig) == null ? void 0 : t.closeConfirm : "";
    }), Pe = (t) => {
      var a;
      if (typeof ((a = o.modalConfig) == null ? void 0 : a.beforeClose) == "function")
        return o.modalConfig.beforeClose({
          ...t,
          itemCreated: _.value
        });
    }, Be = B(() => o.title.startsWith("__:") ? String(at(o.title.substring(3))) : o.title), Fe = B(() => p.value ? !1 : Be.value.length > 0 || !!D["post-title"]), De = B(() => o.view === $e.Modal), Re = B(() => De.value ? "lkt-modal" : "section"), pe = B(() => {
      var t, a;
      return o.mode !== I.Update || !e.value || !o.enabledSaveWithoutChanges && !V.value || de.value && !Z.value ? !1 : typeof ((t = q.value) == null ? void 0 : t.disabled) == "function" ? !q.value.disabled({
        prop: r.value
      }) : typeof ((a = q.value) == null ? void 0 : a.disabled) == "boolean" ? !q.value.disabled : !0;
    }), ve = B(() => {
      var t, a;
      return o.mode !== I.Create || !o.enabledSaveWithoutChanges && !V.value || de.value && !Z.value ? !1 : typeof ((t = H.value) == null ? void 0 : t.disabled) == "function" ? !H.value.disabled({
        prop: r.value
      }) : typeof ((a = H.value) == null ? void 0 : a.disabled) == "boolean" ? !H.value.disabled : !0;
    }), Ce = B(() => {
      var t, a;
      return U.value ? typeof ((t = z.value) == null ? void 0 : t.disabled) == "function" ? !z.value.disabled({
        prop: r.value
      }) : typeof ((a = z.value) == null ? void 0 : a.disabled) == "boolean" ? !z.value.disabled : !0 : !1;
    }), Xe = B(() => Re.value === "lkt-modal" ? {
      title: o.title,
      item: r.value,
      ...o.modalConfig,
      beforeClose: Pe,
      closeConfirm: je.value,
      headerActionsButton: o.groupButton !== !1 ? {
        dot: ve.value || pe.value
      } : !1
    } : {}), de = B(() => typeof o.form == "object" && Object.keys(o.form).length > 0), he = B(() => Object.keys(h.value).length === 0 ? [] : o.modificationView), Je = (t) => typeof t.supportedModifications > "u" || t.supportedModifications === !0 || Array.isArray(t.supportedModifications) && t.supportedModifications.includes(E.value);
    return B(() => de.value ? {
      ...o.form,
      items: o.form.items.filter(Je)
    } : {}), (t, a) => {
      const J = ce("lkt-http-info"), R = ce("lkt-form"), Ke = ce("lkt-loader");
      return m(), N(ze(Re.value), A(Xe.value, { class: "lkt-item-crud" }), fe({
        default: S(() => [
          Qe("article", st, [
            !De.value && Fe.value ? (m(), P("header", pt, [
              n(D)["pre-title"] ? (m(), P("div", vt, [
                f(t.$slots, "pre-title", {
                  item: r.value,
                  loading: p.value
                })
              ])) : d("", !0),
              Be.value.length > 0 ? (m(), P("h1", ft, Ye(Be.value), 1)) : d("", !0),
              n(D)["post-title"] ? (m(), P("div", ct, [
                f(t.$slots, "post-title", {
                  item: r.value,
                  loading: p.value
                })
              ])) : d("", !0)
            ])) : d("", !0),
            t.buttonNavPosition === n(we).Top && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (m(), N(Se, {
              key: 1,
              ref_key: "buttonNav",
              ref: G,
              loading: p.value,
              "onUpdate:loading": a[3] || (a[3] = (l) => p.value = l),
              editing: k.value,
              "onUpdate:editing": a[4] || (a[4] = (l) => k.value = l),
              "picked-modification-view": E.value,
              "onUpdate:pickedModificationView": a[5] || (a[5] = (l) => E.value = l),
              item: r.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": H.value,
              "update-button": q.value,
              "drop-button": z.value,
              "edit-mode-button": le.value,
              "group-button": me.value,
              "data-changed": V.value,
              "http-success-read": $.value,
              "can-update": e.value,
              "can-drop": U.value,
              "can-switch-edit-mode": w.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": ve.value,
              "able-to-update": pe.value,
              "able-to-drop": Ce.value,
              perms: c.value,
              "modification-view": he.value,
              onCreate: ye,
              onSave: ge,
              onDrop: ke
            }, fe({ _: 2 }, [
              n(D)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: S(({ canUpdate: l, canDrop: te, perms: oe }) => [
                  f(t.$slots, "prev-buttons-ever", {
                    canUpdate: l,
                    canDrop: te,
                    perms: oe
                  })
                ]),
                key: "0"
              } : void 0,
              n(D)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: S(({ canUpdate: l, canDrop: te, perms: oe }) => [
                  f(t.$slots, "prev-buttons", {
                    canUpdate: l,
                    canDrop: te,
                    perms: oe
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view"])) : d("", !0),
            p.value ? d("", !0) : (m(), P("div", mt, [
              $.value ? (m(), P("div", bt, [
                K.value && t.notificationType === n(x).Inline ? (m(), N(J, {
                  key: 0,
                  code: W.value,
                  palette: W.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: a[6] || (a[6] = (l) => K.value = !1)
                }, null, 8, ["code", "palette"])) : d("", !0),
                de.value ? (m(), N(R, {
                  key: 1,
                  modelValue: r.value,
                  "onUpdate:modelValue": a[7] || (a[7] = (l) => r.value = l),
                  modifications: h.value,
                  "onUpdate:modifications": a[8] || (a[8] = (l) => h.value = l),
                  valid: Z.value,
                  "onUpdate:valid": a[9] || (a[9] = (l) => Z.value = l),
                  form: t.form,
                  "modification-view": E.value,
                  "modification-data-state": Ie.value
                }, null, 8, ["modelValue", "modifications", "valid", "form", "modification-view", "modification-data-state"])) : f(t.$slots, "item", {
                  key: 2,
                  item: r.value,
                  loading: p.value,
                  editMode: k.value,
                  isCreate: O.value,
                  canUpdate: e.value,
                  canDrop: U.value,
                  itemBeingEdited: ie.value,
                  perms: c.value
                })
              ])) : t.notificationType === n(x).Inline ? (m(), N(J, {
                key: 1,
                code: W.value
              }, null, 8, ["code"])) : d("", !0)
            ])),
            p.value ? (m(), N(Ke, { key: 3 })) : d("", !0),
            t.buttonNavPosition === n(we).Bottom && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (m(), N(Se, {
              key: 4,
              ref_key: "buttonNav",
              ref: G,
              loading: p.value,
              "onUpdate:loading": a[10] || (a[10] = (l) => p.value = l),
              editing: k.value,
              "onUpdate:editing": a[11] || (a[11] = (l) => k.value = l),
              "picked-modification-view": E.value,
              "onUpdate:pickedModificationView": a[12] || (a[12] = (l) => E.value = l),
              item: r.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": H.value,
              "update-button": q.value,
              "drop-button": z.value,
              "edit-mode-button": le.value,
              "group-button": me.value,
              "data-changed": V.value,
              "http-success-read": $.value,
              "can-update": e.value,
              "can-drop": U.value,
              "can-switch-edit-mode": w.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": ve.value,
              "able-to-update": pe.value,
              "able-to-drop": Ce.value,
              perms: c.value,
              "modification-view": he.value,
              onCreate: ye,
              onSave: ge,
              onDrop: ke
            }, fe({ _: 2 }, [
              n(D)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: S(() => [
                  f(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              n(D)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: S(() => [
                  f(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view"])) : d("", !0)
          ])
        ]),
        _: 2
      }, [
        t.groupButton !== !1 && t.groupButtonAsModalActions ? {
          name: "header-actions",
          fn: S(() => [
            t.buttonNavPosition === n(we).Top ? (m(), N(Se, {
              key: 0,
              ref_key: "buttonNav",
              ref: G,
              loading: p.value,
              "onUpdate:loading": a[0] || (a[0] = (l) => p.value = l),
              editing: k.value,
              "onUpdate:editing": a[1] || (a[1] = (l) => k.value = l),
              "picked-modification-view": E.value,
              "onUpdate:pickedModificationView": a[2] || (a[2] = (l) => E.value = l),
              item: r.value,
              mode: t.mode,
              view: t.view,
              grouped: !0,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": H.value,
              "update-button": q.value,
              "drop-button": z.value,
              "edit-mode-button": le.value,
              "group-button": me.value,
              "data-changed": V.value,
              "http-success-read": $.value,
              "can-update": e.value,
              "can-drop": U.value,
              "can-switch-edit-mode": w.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": ve.value,
              "able-to-update": pe.value,
              "able-to-drop": Ce.value,
              perms: c.value,
              "modification-view": he.value,
              onCreate: ye,
              onSave: ge,
              onDrop: ke
            }, fe({ _: 2 }, [
              n(D)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: S(({ canUpdate: l, canDrop: te, perms: oe }) => [
                  f(t.$slots, "prev-buttons-ever", {
                    canUpdate: l,
                    canDrop: te,
                    perms: oe
                  })
                ]),
                key: "0"
              } : void 0,
              n(D)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: S(({ canUpdate: l, canDrop: te, perms: oe }) => [
                  f(t.$slots, "prev-buttons", {
                    canUpdate: l,
                    canDrop: te,
                    perms: oe
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "picked-modification-view", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms", "modification-view"])) : d("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), Tt = {
  install: (g, F = {}) => {
    g.component("lkt-item-crud") === void 0 && g.component("lkt-item-crud", yt);
  }
}, Vt = (g) => {
  ue.defaultSaveIcon = g;
}, Rt = (g) => {
  ue.defaultDropIcon = g;
};
export {
  It as debugLktItemCrud,
  Tt as default,
  Rt as setItemCrudDefaultDropIcon,
  Vt as setItemCrudDefaultSaveIcon
};
