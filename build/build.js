import { defineComponent as Ue, useSlots as Se, ref as m, watch as h, computed as U, resolveComponent as be, createElementBlock as N, createCommentVNode as d, openBlock as b, createBlock as V, Fragment as ke, renderSlot as v, withDirectives as E, mergeProps as R, unref as u, createVNode as X, withCtx as C, vShow as L, mergeDefaults as Ae, nextTick as $e, onMounted as Ee, resolveDynamicComponent as Le, createSlots as oe, createElementVNode as Ne, toDisplayString as Ve } from "vue";
import { httpCall as Oe } from "lkt-http-client";
import { DataState as Ce } from "lkt-data-state";
import { ItemCrudMode as S, ItemCrudButtonNavVisibility as De, TablePermission as fe, ensureButtonConfig as K, LktSettings as p, ItemCrudView as he, ItemCrudButtonNavPosition as ce, NotificationType as G, getDefaultValues as je, ItemCrud as Pe, ToastPositionX as z } from "lkt-vue-kernel";
import { closeModal as Xe, updateModalKey as Ke } from "lkt-modal";
import { __ as Fe } from "lkt-i18n";
import { openToast as J } from "lkt-toast";
const Y = class Y {
};
Y.debugEnabled = !1, Y.defaultSaveIcon = "", Y.defaultDropIcon = "";
let Q = Y;
const y = (...T) => {
  Q.debugEnabled && console.info("[LktItemCrud] ", ...T);
}, st = (T = !0) => {
  Q.debugEnabled = T;
}, Ge = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, qe = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, He = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, We = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, me = /* @__PURE__ */ Ue({
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
    buttonNavVisibility: {}
  },
  emits: [
    "update:loading",
    "update:editing",
    "create",
    "save",
    "drop"
  ],
  setup(T, { expose: Z, emit: ue }) {
    const a = ue, n = T, r = Se(), s = m(null), i = m(null), f = m(n.loading);
    h(() => n.loading, (e) => f.value = e), h(f, (e) => a("update:loading", e));
    const l = m(n.editing);
    h(() => n.editing, (e) => l.value = e), h(l, (e) => a("update:editing", e));
    const B = () => {
      f.value = !0;
    }, M = () => {
      f.value = !1;
    }, A = (e, D) => {
      typeof e > "u" || a("create", e, D);
    }, k = (e, D) => {
      typeof e > "u" || a("save", e, D);
    }, w = (e, D) => {
      typeof e > "u" || a("drop", e, D);
    };
    Z({
      doSave: () => {
        s.value && typeof s.value.click == "function" && s.value.click();
      },
      doDrop: () => {
        i.value && typeof i.value.click == "function" && i.value.click();
      }
    });
    const F = U(() => !n.canDrop || n.dropButton === !1 ? !1 : !n.canUpdate && n.canDrop ? !0 : !f.value && n.editing && n.httpSuccessRead), O = U(() => n.mode === S.Create && n.createButton === !1 || n.mode === S.Update && n.updateButton === !1 || f.value ? !1 : n.editing && n.httpSuccessRead), $ = U(() => n.editModeButton === !1 || !n.canSwitchEditMode || !n.canUpdate && !n.canDrop || !n.canUpdate && n.canDrop ? !1 : !f.value && n.mode !== S.Create && n.httpSuccessRead), q = U(() => n.buttonNavVisibility === De.Always || r["prev-buttons-ever"] ? !0 : n.buttonNavVisibility === De.Never ? !1 : O.value || F.value || $.value);
    return (e, D) => {
      const c = be("lkt-button");
      return q.value ? (b(), N("div", Ge, [
        e.grouped && e.groupButtonAsModalActions ? (b(), N(ke, { key: 0 }, [
          $.value ? (b(), V(c, R({ key: 0 }, e.editModeButton, {
            checked: l.value,
            "onUpdate:checked": D[0] || (D[0] = (I) => l.value = I),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0),
          u(r)["prev-buttons-ever"] ? v(e.$slots, "prev-buttons-ever", {
            key: 1,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          u(r)["prev-buttons"] ? v(e.$slots, "prev-buttons", {
            key: 2,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          E(X(c, R({
            ref_key: "saveButtonRef",
            ref: s
          }, e.updateButton, {
            disabled: !e.ableToUpdate,
            onLoading: B,
            onLoaded: M,
            onClick: k
          }), {
            default: C(() => [
              u(r)["button-save"] ? v(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: l.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, e.mode === u(S).Update && O.value]
          ]),
          E(X(c, R({
            ref_key: "saveButtonRef",
            ref: s
          }, e.createButton, {
            disabled: !e.ableToCreate,
            onLoading: B,
            onLoaded: M,
            onClick: A
          }), {
            default: C(() => [
              u(r)["button-save"] ? v(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: l.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, e.mode === u(S).Create && O.value]
          ]),
          E(X(c, R({
            ref_key: "dropButtonRef",
            ref: i
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: B,
            onLoaded: M,
            onClick: w
          }), {
            default: C(() => [
              u(r)["button-drop"] ? v(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: l.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, F.value && e.mode !== u(S).Create]
          ]),
          u(r).buttons ? v(e.$slots, "buttons", { key: 3 }) : d("", !0)
        ], 64)) : e.grouped ? (b(), V(c, R({
          key: 1,
          ref: "groupButton"
        }, e.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: C(() => [
            $.value ? (b(), V(c, R({ key: 0 }, e.editModeButton, {
              checked: l.value,
              "onUpdate:checked": D[1] || (D[1] = (I) => l.value = I),
              class: "lkt-item-crud--switch-mode-button"
            }), null, 16, ["checked"])) : d("", !0),
            u(r)["prev-buttons-ever"] ? v(e.$slots, "prev-buttons-ever", {
              key: 1,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : d("", !0),
            u(r)["prev-buttons"] ? v(e.$slots, "prev-buttons", {
              key: 2,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : d("", !0),
            E(X(c, R({
              ref_key: "saveButtonRef",
              ref: s
            }, e.updateButton, {
              disabled: !e.ableToUpdate,
              onLoading: B,
              onLoaded: M,
              onClick: k
            }), {
              default: C(() => [
                u(r)["button-save"] ? v(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: l.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : d("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [L, e.mode === u(S).Update && O.value]
            ]),
            E(X(c, R({
              ref_key: "saveButtonRef",
              ref: s
            }, e.createButton, {
              disabled: !e.ableToCreate,
              onLoading: B,
              onLoaded: M,
              onClick: A
            }), {
              default: C(() => [
                u(r)["button-save"] ? v(e.$slots, "button-save", {
                  key: 0,
                  item: e.item,
                  editMode: l.value,
                  isCreate: !0,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : d("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [L, e.mode === u(S).Create && O.value]
            ]),
            E(X(c, R({
              ref_key: "dropButtonRef",
              ref: i
            }, e.dropButton, {
              disabled: !e.ableToDrop,
              onLoading: B,
              onLoaded: M,
              onClick: w
            }), {
              default: C(() => [
                u(r)["button-drop"] ? v(e.$slots, "button-drop", {
                  key: 0,
                  item: e.item,
                  editMode: l.value,
                  isCreate: !1,
                  canUpdate: e.canUpdate,
                  canDrop: e.canDrop
                }) : d("", !0)
              ]),
              _: 3
            }, 16, ["disabled"]), [
              [L, F.value && e.mode !== u(S).Create]
            ]),
            u(r).buttons ? v(e.$slots, "buttons", { key: 3 }) : d("", !0)
          ]),
          _: 3
        }, 16)) : (b(), N(ke, { key: 2 }, [
          u(r)["prev-buttons-ever"] ? E((b(), N("div", qe, [
            v(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [L, !f.value]
          ]) : d("", !0),
          u(r)["prev-buttons"] ? E((b(), N("div", He, [
            v(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [L, l.value && !f.value]
          ]) : d("", !0),
          E(X(c, R({
            ref_key: "saveButtonRef",
            ref: s
          }, e.updateButton, {
            disabled: !e.ableToUpdate,
            onLoading: B,
            onLoaded: M,
            onClick: k
          }), {
            default: C(() => [
              u(r)["button-save"] ? v(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: l.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, e.mode === u(S).Update && O.value]
          ]),
          E(X(c, R({
            ref_key: "saveButtonRef",
            ref: s
          }, e.createButton, {
            disabled: !e.ableToCreate,
            onLoading: B,
            onLoaded: M,
            onClick: A
          }), {
            default: C(() => [
              u(r)["button-save"] ? v(e.$slots, "button-save", {
                key: 0,
                item: e.item,
                editMode: l.value,
                isCreate: !0,
                canUpdate: e.canUpdate,
                canDrop: !1
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, e.mode === u(S).Create && O.value]
          ]),
          E(X(c, R({
            ref_key: "dropButtonRef",
            ref: i
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: B,
            onLoaded: M,
            onClick: w
          }), {
            default: C(() => [
              u(r)["button-drop"] ? v(e.$slots, "button-drop", {
                key: 0,
                item: e.item,
                editMode: l.value,
                isCreate: !1,
                canUpdate: e.canUpdate,
                canDrop: e.canDrop
              }) : d("", !0)
            ]),
            _: 3
          }, 16, ["disabled"]), [
            [L, F.value && e.mode !== u(S).Create]
          ]),
          u(r).buttons ? E((b(), N("div", We, [
            v(e.$slots, "buttons")
          ], 512)), [
            [L, l.value && !f.value]
          ]) : d("", !0),
          $.value ? (b(), V(c, R({ key: 3 }, e.editModeButton, {
            checked: l.value,
            "onUpdate:checked": D[2] || (D[2] = (I) => l.value = I),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0)
        ], 64))
      ])) : d("", !0);
    };
  }
}), ze = { class: "lkt-item-crud" }, Je = {
  key: 0,
  class: "lkt-item-crud_header"
}, Qe = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, Ye = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, Ze = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, _e = {
  key: 2,
  class: "lkt-item-crud_content"
}, xe = {
  key: 0,
  class: "lkt-grid-1"
}, et = /* @__PURE__ */ Ue({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ Ae({
    modelValue: {},
    editing: { type: Boolean },
    perms: {},
    mode: {},
    view: {},
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
    notificationType: {}
  }, je(Pe)),
  emits: [
    "update:modelValue",
    "update:editing",
    "read",
    "create",
    "update",
    "drop",
    "before-save",
    "perms",
    "error",
    "modified-data"
  ],
  setup(T, { expose: Z, emit: ue }) {
    const a = T, n = Se(), r = ue, s = m(!0), i = m(a.modelValue), f = m(a.perms), l = m(a.editing), B = m(!1), M = m(!1), A = m(200), k = m(new Ce(i.value, a.dataStateConfig)), w = m(!1), _ = m(new Ce(a.readData)), j = m(a.mode === S.Create), F = m(!1), O = m(!1), $ = m(null), q = U(() => !j.value && Array.isArray(f.value) && f.value.includes(fe.Update)), e = U(() => !j.value && Array.isArray(f.value) && f.value.includes(fe.Drop)), D = U(() => !j.value && Array.isArray(f.value) && f.value.includes(fe.SwitchEditMode));
    h(() => a.mode, (t) => {
      j.value = t === S.Create;
    });
    const c = m(K(a.createButton, p.defaultCreateButton)), I = m(K(a.updateButton, p.defaultUpdateButton)), P = m(K(a.dropButton, p.defaultDropButton)), x = m(K(a.editModeButton, p.defaultEditModeButton)), ne = m(K(a.groupButton, p.defaultGroupButton));
    h(() => a.createButton, (t) => {
      c.value = K(t, p.defaultCreateButton);
    }, { deep: !0 }), h(() => a.updateButton, (t) => {
      I.value = K(t, p.defaultUpdateButton);
    }, { deep: !0 }), h(() => a.dropButton, (t) => {
      P.value = K(t, p.defaultDropButton);
    }, { deep: !0 }), h(() => a.editModeButton, (t) => {
      x.value = K(t, p.defaultEditModeButton);
    }, { deep: !0 });
    const ee = async () => {
      y("fetchItem"), s.value = !0, A.value = -1, M.value = !1;
      try {
        const t = await Oe(a.readResource, a.readData);
        if (y("fetchItem -> response", t), s.value = !1, A.value = t.httpStatus, !t.success) {
          B.value = !1, A.value = t.httpStatus, r("error", t.httpStatus);
          return;
        }
        B.value = !0, i.value = t.data, f.value = t.perms, k.value.increment(i.value).turnStoredIntoOriginal(), w.value = k.value.changed(), _.value.turnStoredIntoOriginal(), r("read", t);
      } catch {
        s.value = !1, B.value = !1, A.value = 404, r("error", 404);
        return;
      }
    };
    h(() => a.modelValue, (t) => {
      i.value = t, k.value.increment(t);
    }, { deep: !0 }), h(i, (t) => {
      if (F.value = !0, y("item updated ->", i.value), typeof a.beforeEmitUpdate == "function") {
        y("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(i.value);
        y("item updated -> override with: ", o), typeof o == "object" && (i.value = o);
      }
      r("update:modelValue", i.value), y("item updated -> update dataState"), k.value.increment(t), w.value = k.value.changed(), $e(() => F.value = !1);
    }, { deep: !0 }), h(f, () => r("perms", f.value)), h(w, (t) => {
      r("modified-data", t);
    }), h(() => a.readData, (t) => {
      _.value.increment(t), _.value.changed() && ee();
    }), h(() => a.editing, (t) => {
      y("editing updated -> updating editMode", t), l.value = t;
    }), h(l, (t) => {
      y("editMode updated -> emit update", t), r("update:editing", t);
    }), Ee(() => {
      a.readResource && !j.value ? ee() : (j.value, B.value = !0, l.value = !0, s.value = !1, k.value.increment(i.value).turnStoredIntoOriginal(), w.value = k.value.changed());
    });
    const de = (t, o) => {
      if (o) {
        if (s.value = !1, typeof t < "u" && (A.value = t.httpStatus, !t.success))
          return M.value = !0, r("error", t.httpStatus), !1;
        M.value = !0;
      }
      return !0;
    }, ge = (t) => {
      y("doAutoReloadId -> enter: ", t), typeof t < "u" && t.autoReloadId && (y("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), pe.value ? (y("doAutoReloadId -> insideModal: ", a), Ke(a.modalConfig.modalName, a.modalConfig.modalKey, t.autoReloadId)) : (y("doAutoReloadId -> outsideModal"), a.readData.id = t.autoReloadId, y("doAutoReloadId -> turning off create mode"), j.value = !1, ee()));
    }, re = (t, o) => {
      if (y("onCreate"), !de(o, c.value.resource)) {
        a.notificationType === G.Toast && J({
          text: p.defaultCreateErrorText,
          details: p.defaultCreateErrorDetails,
          icon: p.defaultCreateErrorIcon,
          positionX: z.Right
        });
        return;
      }
      O.value = !0, y("onCreate -> turn stored data into original"), k.value.increment(i.value).turnStoredIntoOriginal(), a.notificationType === G.Toast && J({
        text: p.defaultCreateSuccessText,
        details: p.defaultCreateSuccessDetails,
        icon: p.defaultCreateSuccessIcon,
        positionX: z.Right
      }), ge(o), y("onCreate -> beforeEmitCreate"), r("create", o);
    }, le = (t, o) => {
      if (y("onUpdate"), !de(o, I.value.resource)) {
        a.notificationType === G.Toast && J({
          text: p.defaultUpdateErrorText,
          details: p.defaultUpdateErrorDetails,
          icon: p.defaultUpdateErrorIcon,
          positionX: z.Right
        });
        return;
      }
      y("onUpdate -> turn stored data into original"), k.value.turnStoredIntoOriginal(), a.notificationType === G.Toast && J({
        text: p.defaultUpdateSuccessText,
        details: p.defaultUpdateSuccessDetails,
        icon: p.defaultUpdateSuccessIcon,
        positionX: z.Right
      }), ge(o), r("update", o);
    }, ie = (t, o) => {
      if (y("onDrop"), !de(o, P.value.resource)) {
        a.notificationType === G.Toast && J({
          text: p.defaultDropErrorText,
          details: p.defaultDropErrorDetails,
          icon: p.defaultDropErrorIcon,
          positionX: z.Right
        });
        return;
      }
      a.notificationType === G.Toast && J({
        text: p.defaultDropSuccessText,
        details: p.defaultDropSuccessDetails,
        icon: p.defaultDropSuccessIcon,
        positionX: z.Right
      }), r("drop", o), a.view === he.Modal && (y("onDrop -> close modal"), Xe(a.modalConfig.modalName, a.modalConfig.modalKey));
    };
    Z({
      doDrop: () => {
        $.value && $.value.doDrop();
      },
      doRefresh: ee,
      doSave: () => {
        $.value && $.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        k.value.increment(i.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => k.value.changed()
    });
    const Me = U(() => {
      var t;
      return k.value.changed() ? (t = a.modalConfig) == null ? void 0 : t.closeConfirm : "";
    }), Ie = (t) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...t,
          itemCreated: O.value
        });
    }, se = U(() => a.title.startsWith("__:") ? String(Fe(a.title.substring(3))) : a.title), Te = U(() => s.value ? !1 : se.value.length > 0 || !!n["post-title"]), pe = U(() => a.view === he.Modal), ye = U(() => pe.value ? "lkt-modal" : "section"), te = U(() => {
      var t, o;
      return a.mode !== S.Update || !q.value || !w.value ? !1 : typeof ((t = I.value) == null ? void 0 : t.disabled) == "function" ? !I.value.disabled(i.value) : typeof ((o = I.value) == null ? void 0 : o.disabled) == "boolean" ? !I.value.disabled : !0;
    }), ae = U(() => {
      var t, o;
      return a.mode !== S.Create || !w.value ? !1 : typeof ((t = c.value) == null ? void 0 : t.disabled) == "function" ? !c.value.disabled(i.value) : typeof ((o = c.value) == null ? void 0 : o.disabled) == "boolean" ? !c.value.disabled : !0;
    }), ve = U(() => {
      var t, o;
      return e.value ? typeof ((t = P.value) == null ? void 0 : t.disabled) == "function" ? !P.value.disabled(i.value) : typeof ((o = P.value) == null ? void 0 : o.disabled) == "boolean" ? !P.value.disabled : !0 : !1;
    }), we = U(() => ye.value === "lkt-modal" ? {
      title: a.title,
      item: i.value,
      ...a.modalConfig,
      beforeClose: Ie,
      closeConfirm: Me.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: ae.value || te.value
      } : !1
    } : {});
    return (t, o) => {
      const Be = be("lkt-http-info"), Re = be("lkt-loader");
      return b(), V(Le(ye.value), R(we.value, { class: "lkt-item-crud" }), oe({
        default: C(() => [
          Ne("article", ze, [
            !pe.value && Te.value ? (b(), N("header", Je, [
              u(n)["pre-title"] ? (b(), N("div", Qe, [
                v(t.$slots, "pre-title", {
                  item: i.value,
                  loading: s.value
                })
              ])) : d("", !0),
              se.value.length > 0 ? (b(), N("h1", Ye, Ve(se.value), 1)) : d("", !0),
              u(n)["post-title"] ? (b(), N("div", Ze, [
                v(t.$slots, "post-title", {
                  item: i.value,
                  loading: s.value
                })
              ])) : d("", !0)
            ])) : d("", !0),
            t.buttonNavPosition === u(ce).Top && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (b(), V(me, {
              key: 1,
              ref_key: "buttonNav",
              ref: $,
              loading: s.value,
              "onUpdate:loading": o[2] || (o[2] = (g) => s.value = g),
              editing: l.value,
              "onUpdate:editing": o[3] || (o[3] = (g) => l.value = g),
              item: i.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": c.value,
              "update-button": I.value,
              "drop-button": P.value,
              "edit-mode-button": x.value,
              "group-button": ne.value,
              "data-changed": w.value,
              "http-success-read": B.value,
              "can-update": q.value,
              "can-drop": e.value,
              "can-switch-edit-mode": D.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": ae.value,
              "able-to-update": te.value,
              "able-to-drop": ve.value,
              perms: f.value,
              onCreate: re,
              onSave: le,
              onDrop: ie
            }, oe({ _: 2 }, [
              u(n)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: C(({ canUpdate: g, canDrop: H, perms: W }) => [
                  v(t.$slots, "prev-buttons-ever", {
                    canUpdate: g,
                    canDrop: H,
                    perms: W
                  })
                ]),
                key: "0"
              } : void 0,
              u(n)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: C(({ canUpdate: g, canDrop: H, perms: W }) => [
                  v(t.$slots, "prev-buttons", {
                    canUpdate: g,
                    canDrop: H,
                    perms: W
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms"])) : d("", !0),
            s.value ? d("", !0) : (b(), N("div", _e, [
              B.value ? (b(), N("div", xe, [
                M.value && t.notificationType === u(G).Inline ? (b(), V(Be, {
                  key: 0,
                  code: A.value,
                  palette: A.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: o[4] || (o[4] = (g) => M.value = !1)
                }, null, 8, ["code", "palette"])) : d("", !0),
                v(t.$slots, "item", {
                  item: i.value,
                  loading: s.value,
                  editMode: l.value,
                  isCreate: j.value,
                  canUpdate: q.value,
                  canDrop: e.value,
                  itemBeingEdited: F.value,
                  perms: f.value
                })
              ])) : t.notificationType === u(G).Inline ? (b(), V(Be, {
                key: 1,
                code: A.value
              }, null, 8, ["code"])) : d("", !0)
            ])),
            s.value ? (b(), V(Re, { key: 3 })) : d("", !0),
            t.buttonNavPosition === u(ce).Bottom && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (b(), V(me, {
              key: 4,
              ref_key: "buttonNav",
              ref: $,
              loading: s.value,
              "onUpdate:loading": o[5] || (o[5] = (g) => s.value = g),
              editing: l.value,
              "onUpdate:editing": o[6] || (o[6] = (g) => l.value = g),
              item: i.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": c.value,
              "update-button": I.value,
              "drop-button": P.value,
              "edit-mode-button": x.value,
              "group-button": ne.value,
              "data-changed": w.value,
              "http-success-read": B.value,
              "can-update": q.value,
              "can-drop": e.value,
              "can-switch-edit-mode": D.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": ae.value,
              "able-to-update": te.value,
              "able-to-drop": ve.value,
              perms: f.value,
              onCreate: re,
              onSave: le,
              onDrop: ie
            }, oe({ _: 2 }, [
              u(n)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: C(() => [
                  v(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              u(n)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: C(() => [
                  v(t.$slots, "prev-buttons")
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms"])) : d("", !0)
          ])
        ]),
        _: 2
      }, [
        t.groupButton !== !1 && t.groupButtonAsModalActions ? {
          name: "header-actions",
          fn: C(() => [
            t.buttonNavPosition === u(ce).Top ? (b(), V(me, {
              key: 0,
              ref_key: "buttonNav",
              ref: $,
              loading: s.value,
              "onUpdate:loading": o[0] || (o[0] = (g) => s.value = g),
              editing: l.value,
              "onUpdate:editing": o[1] || (o[1] = (g) => l.value = g),
              item: i.value,
              mode: t.mode,
              view: t.view,
              grouped: !0,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": c.value,
              "update-button": I.value,
              "drop-button": P.value,
              "edit-mode-button": x.value,
              "group-button": ne.value,
              "data-changed": w.value,
              "http-success-read": B.value,
              "can-update": q.value,
              "can-drop": e.value,
              "can-switch-edit-mode": D.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": ae.value,
              "able-to-update": te.value,
              "able-to-drop": ve.value,
              perms: f.value,
              onCreate: re,
              onSave: le,
              onDrop: ie
            }, oe({ _: 2 }, [
              u(n)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: C(({ canUpdate: g, canDrop: H, perms: W }) => [
                  v(t.$slots, "prev-buttons-ever", {
                    canUpdate: g,
                    canDrop: H,
                    perms: W
                  })
                ]),
                key: "0"
              } : void 0,
              u(n)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: C(({ canUpdate: g, canDrop: H, perms: W }) => [
                  v(t.$slots, "prev-buttons", {
                    canUpdate: g,
                    canDrop: H,
                    perms: W
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms"])) : d("", !0)
          ]),
          key: "0"
        } : void 0
      ]), 1040);
    };
  }
}), pt = {
  install: (T, Z = {}) => {
    T.component("lkt-item-crud") === void 0 && T.component("lkt-item-crud", et);
  }
}, vt = (T) => {
  Q.defaultSaveIcon = T;
}, ft = (T) => {
  Q.defaultDropIcon = T;
};
export {
  st as debugLktItemCrud,
  pt as default,
  ft as setItemCrudDefaultDropIcon,
  vt as setItemCrudDefaultSaveIcon
};
