import { defineComponent as we, useSlots as Re, ref as c, watch as D, computed as U, resolveComponent as le, createElementBlock as N, createCommentVNode as d, openBlock as m, createBlock as O, Fragment as Se, renderSlot as s, withDirectives as $, mergeProps as R, unref as u, createVNode as q, withCtx as C, vShow as L, mergeDefaults as Ne, nextTick as Ve, onMounted as je, resolveDynamicComponent as Pe, createSlots as re, createElementVNode as Xe, toDisplayString as Fe } from "vue";
import { httpCall as We } from "lkt-http-client";
import { DataState as Ie } from "lkt-data-state";
import { ItemCrudMode as S, ItemCrudButtonNavVisibility as Me, TablePermission as ke, ensureButtonConfig as z, LktSettings as i, ItemCrudView as Te, ItemCrudButtonNavPosition as De, NotificationType as J, getDefaultValues as Ke, ItemCrud as Ge, ToastPositionX as Z } from "lkt-vue-kernel";
import { closeModal as He, updateModalKey as qe } from "lkt-modal";
import { __ as ze } from "lkt-i18n";
import { openToast as _ } from "lkt-toast";
import { useRouter as Je } from "vue-router";
const te = class te {
};
te.debugEnabled = !1, te.defaultSaveIcon = "", te.defaultDropIcon = "";
let x = te;
const k = (...T) => {
  x.debugEnabled && console.info("[LktItemCrud] ", ...T);
}, gt = (T = !0) => {
  x.debugEnabled = T;
}, Qe = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Ye = {
  key: 0,
  class: "lkt-item-crud-buttons"
}, Ze = {
  key: 1,
  class: "lkt-item-crud-buttons"
}, _e = {
  key: 2,
  class: "lkt-item-crud-buttons"
}, he = /* @__PURE__ */ we({
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
  setup(T, { expose: ae, emit: ie }) {
    const a = ie, r = T, l = Re(), b = c(null), v = c(null), n = c(r.loading);
    D(() => r.loading, (e) => n.value = e), D(n, (e) => a("update:loading", e));
    const g = c(r.editing);
    D(() => r.editing, (e) => g.value = e), D(g, (e) => a("update:editing", e));
    const f = () => {
      n.value = !0;
    }, y = () => {
      n.value = !1;
    }, X = (e, B) => {
      typeof e > "u" || a("create", e, B);
    }, A = (e, B) => {
      typeof e > "u" || a("save", e, B);
    }, F = (e, B) => {
      typeof e > "u" || a("drop", e, B);
    };
    ae({
      doSave: () => {
        b.value && typeof b.value.click == "function" && b.value.click();
      },
      doDrop: () => {
        v.value && typeof v.value.click == "function" && v.value.click();
      }
    });
    const M = U(() => !r.canDrop || r.dropButton === !1 ? !1 : !r.canUpdate && r.canDrop ? !0 : !n.value && r.editing && r.httpSuccessRead), V = U(() => r.mode === S.Create && r.createButton === !1 || r.mode === S.Update && r.updateButton === !1 || n.value ? !1 : r.editing && r.httpSuccessRead), E = U(() => r.editModeButton === !1 || !r.canSwitchEditMode || !r.canUpdate && !r.canDrop || !r.canUpdate && r.canDrop ? !1 : !n.value && r.mode !== S.Create && r.httpSuccessRead), ee = U(() => r.buttonNavVisibility === Me.Always || l["prev-buttons-ever"] ? !0 : r.buttonNavVisibility === Me.Never ? !1 : V.value || M.value || E.value);
    return (e, B) => {
      const h = le("lkt-button");
      return ee.value ? (m(), N("div", Qe, [
        e.grouped && e.groupButtonAsModalActions ? (m(), N(Se, { key: 0 }, [
          E.value ? (m(), O(h, R({ key: 0 }, e.editModeButton, {
            checked: g.value,
            "onUpdate:checked": B[0] || (B[0] = (j) => g.value = j),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0),
          u(l)["prev-buttons-ever"] ? s(e.$slots, "prev-buttons-ever", {
            key: 1,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          u(l)["prev-buttons"] ? s(e.$slots, "prev-buttons", {
            key: 2,
            canUpdate: e.canUpdate,
            canDrop: e.canDrop,
            perms: e.perms
          }) : d("", !0),
          $(q(h, R({
            ref_key: "saveButtonRef",
            ref: b
          }, e.updateButton, {
            disabled: !e.ableToUpdate,
            onLoading: f,
            onLoaded: y,
            onClick: A
          }), {
            default: C(() => [
              u(l)["button-save"] ? s(e.$slots, "button-save", {
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
            [L, e.mode === u(S).Update && V.value]
          ]),
          $(q(h, R({
            ref_key: "saveButtonRef",
            ref: b
          }, e.createButton, {
            disabled: !e.ableToCreate,
            onLoading: f,
            onLoaded: y,
            onClick: X
          }), {
            default: C(() => [
              u(l)["button-save"] ? s(e.$slots, "button-save", {
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
            [L, e.mode === u(S).Create && V.value]
          ]),
          $(q(h, R({
            ref_key: "dropButtonRef",
            ref: v
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: f,
            onLoaded: y,
            onClick: F
          }), {
            default: C(() => [
              u(l)["button-drop"] ? s(e.$slots, "button-drop", {
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
            [L, M.value && e.mode !== u(S).Create]
          ]),
          u(l).buttons ? s(e.$slots, "buttons", { key: 3 }) : d("", !0)
        ], 64)) : e.grouped ? (m(), O(h, R({
          key: 1,
          ref: "groupButton"
        }, e.groupButton, { class: "lkt-item-crud-group-button" }), {
          split: C(() => [
            E.value ? (m(), O(h, R({ key: 0 }, e.editModeButton, {
              checked: g.value,
              "onUpdate:checked": B[1] || (B[1] = (j) => g.value = j),
              class: "lkt-item-crud--switch-mode-button"
            }), null, 16, ["checked"])) : d("", !0),
            u(l)["prev-buttons-ever"] ? s(e.$slots, "prev-buttons-ever", {
              key: 1,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : d("", !0),
            u(l)["prev-buttons"] ? s(e.$slots, "prev-buttons", {
              key: 2,
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            }) : d("", !0),
            $(q(h, R({
              ref_key: "saveButtonRef",
              ref: b
            }, e.updateButton, {
              disabled: !e.ableToUpdate,
              onLoading: f,
              onLoaded: y,
              onClick: A
            }), {
              default: C(() => [
                u(l)["button-save"] ? s(e.$slots, "button-save", {
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
              [L, e.mode === u(S).Update && V.value]
            ]),
            $(q(h, R({
              ref_key: "saveButtonRef",
              ref: b
            }, e.createButton, {
              disabled: !e.ableToCreate,
              onLoading: f,
              onLoaded: y,
              onClick: X
            }), {
              default: C(() => [
                u(l)["button-save"] ? s(e.$slots, "button-save", {
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
              [L, e.mode === u(S).Create && V.value]
            ]),
            $(q(h, R({
              ref_key: "dropButtonRef",
              ref: v
            }, e.dropButton, {
              disabled: !e.ableToDrop,
              onLoading: f,
              onLoaded: y,
              onClick: F
            }), {
              default: C(() => [
                u(l)["button-drop"] ? s(e.$slots, "button-drop", {
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
              [L, M.value && e.mode !== u(S).Create]
            ]),
            u(l).buttons ? s(e.$slots, "buttons", { key: 3 }) : d("", !0)
          ]),
          _: 3
        }, 16)) : (m(), N(Se, { key: 2 }, [
          u(l)["prev-buttons-ever"] ? $((m(), N("div", Ye, [
            s(e.$slots, "prev-buttons-ever", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [L, !n.value]
          ]) : d("", !0),
          u(l)["prev-buttons"] ? $((m(), N("div", Ze, [
            s(e.$slots, "prev-buttons", {
              canUpdate: e.canUpdate,
              canDrop: e.canDrop,
              perms: e.perms
            })
          ], 512)), [
            [L, g.value && !n.value]
          ]) : d("", !0),
          $(q(h, R({
            ref_key: "saveButtonRef",
            ref: b
          }, e.updateButton, {
            disabled: !e.ableToUpdate,
            onLoading: f,
            onLoaded: y,
            onClick: A
          }), {
            default: C(() => [
              u(l)["button-save"] ? s(e.$slots, "button-save", {
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
            [L, e.mode === u(S).Update && V.value]
          ]),
          $(q(h, R({
            ref_key: "saveButtonRef",
            ref: b
          }, e.createButton, {
            disabled: !e.ableToCreate,
            onLoading: f,
            onLoaded: y,
            onClick: X
          }), {
            default: C(() => [
              u(l)["button-save"] ? s(e.$slots, "button-save", {
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
            [L, e.mode === u(S).Create && V.value]
          ]),
          $(q(h, R({
            ref_key: "dropButtonRef",
            ref: v
          }, e.dropButton, {
            disabled: !e.ableToDrop,
            onLoading: f,
            onLoaded: y,
            onClick: F
          }), {
            default: C(() => [
              u(l)["button-drop"] ? s(e.$slots, "button-drop", {
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
            [L, M.value && e.mode !== u(S).Create]
          ]),
          u(l).buttons ? $((m(), N("div", _e, [
            s(e.$slots, "buttons")
          ], 512)), [
            [L, g.value && !n.value]
          ]) : d("", !0),
          E.value ? (m(), O(h, R({ key: 3 }, e.editModeButton, {
            checked: g.value,
            "onUpdate:checked": B[2] || (B[2] = (j) => g.value = j),
            class: "lkt-item-crud--switch-mode-button"
          }), null, 16, ["checked"])) : d("", !0)
        ], 64))
      ])) : d("", !0);
    };
  }
}), xe = { class: "lkt-item-crud" }, et = {
  key: 0,
  class: "lkt-item-crud_header"
}, tt = {
  key: 0,
  class: "lkt-item-crud_header-slot"
}, at = {
  key: 1,
  class: "lkt-item-crud_header-title"
}, ot = {
  key: 2,
  class: "lkt-item-crud_header-slot"
}, ut = {
  key: 2,
  class: "lkt-item-crud_content"
}, nt = {
  key: 0,
  class: "lkt-grid-1"
}, dt = /* @__PURE__ */ we({
  __name: "LktItemCrud",
  props: /* @__PURE__ */ Ne({
    modelValue: {},
    editing: { type: Boolean },
    perms: {},
    customData: {},
    form: {},
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
    notificationType: {},
    enabledSaveWithoutChanges: { type: Boolean },
    redirectOnCreate: { type: [String, Function] },
    redirectOnDrop: { type: [String, Function] },
    events: {}
  }, Ke(Ge)),
  emits: [
    "update:modelValue",
    "update:editing",
    "update:perms",
    "update:customData",
    "update:form",
    "read",
    "create",
    "update",
    "drop",
    "before-save",
    "perms",
    "error",
    "modified-data"
  ],
  setup(T, { expose: ae, emit: ie }) {
    const a = T, r = Je(), l = Re(), b = ie, v = c(!0), n = c(a.modelValue), g = c(a.customData), f = c(a.perms), y = c(a.editing), X = c(!1), A = c(!1), F = c(!1), W = c(200), I = c(new Ie(n.value, a.dataStateConfig)), M = c(!1), V = c(new Ie(a.readData)), E = c(a.mode === S.Create), ee = c(!1), e = c(!1), B = c(null), h = U(() => !E.value && Array.isArray(f.value) && f.value.includes(ke.Update)), j = U(() => !E.value && Array.isArray(f.value) && f.value.includes(ke.Drop)), se = U(() => !E.value && Array.isArray(f.value) && f.value.includes(ke.SwitchEditMode));
    D(() => a.mode, (t) => {
      E.value = t === S.Create;
    }), D(() => a.perms, (t) => {
      f.value = t;
    }), D(f, (t) => {
      b("update:perms", t);
    }), D(() => a.customData, (t) => {
      g.value = t;
    }), D(g, (t) => {
      b("update:customData", t);
    });
    const K = c(z(a.createButton, i.defaultCreateButton)), G = c(z(a.updateButton, i.defaultUpdateButton)), H = c(z(a.dropButton, i.defaultDropButton)), oe = c(z(a.editModeButton, i.defaultEditModeButton)), pe = c(z(a.groupButton, i.defaultGroupButton));
    D(() => a.createButton, (t) => {
      K.value = z(t, i.defaultCreateButton);
    }, { deep: !0 }), D(() => a.updateButton, (t) => {
      G.value = z(t, i.defaultUpdateButton);
    }, { deep: !0 }), D(() => a.dropButton, (t) => {
      H.value = z(t, i.defaultDropButton);
    }, { deep: !0 }), D(() => a.editModeButton, (t) => {
      oe.value = z(t, i.defaultEditModeButton);
    }, { deep: !0 });
    const ue = async () => {
      var t, o, P;
      k("fetchItem"), v.value = !0, W.value = -1, F.value = !1, typeof ((t = a.events) == null ? void 0 : t.httpStart) == "function" && a.events.httpStart();
      try {
        const w = await We(a.readResource, a.readData);
        if (k("fetchItem -> response", w), v.value = !1, W.value = w.httpStatus, g.value = w.custom, !w.success) {
          A.value = !1, W.value = w.httpStatus, typeof ((o = a.events) == null ? void 0 : o.httpEnd) == "function" && a.events.httpEnd({
            httpResponse: w
          }), b("error", w.httpStatus);
          return;
        }
        A.value = !0, n.value = w.data, f.value = w.perms, I.value.increment(n.value).turnStoredIntoOriginal(), M.value = I.value.changed(), V.value.turnStoredIntoOriginal(), typeof ((P = a.events) == null ? void 0 : P.httpEnd) == "function" && a.events.httpEnd({
          httpResponse: w
        }), b("read", w);
      } catch {
        v.value = !1, A.value = !1, W.value = 404, b("error", 404);
        return;
      }
    };
    D(() => a.modelValue, (t) => {
      n.value = t, I.value.increment(t);
    }, { deep: !0 }), D(n, (t) => {
      if (ee.value = !0, k("item updated ->", n.value), typeof a.beforeEmitUpdate == "function") {
        k("item updated -> has beforeEmitUpdate");
        let o = a.beforeEmitUpdate(n.value);
        k("item updated -> override with: ", o), typeof o == "object" && (n.value = o);
      }
      b("update:modelValue", n.value), k("item updated -> update dataState"), I.value.increment(t), M.value = I.value.changed(), Ve(() => ee.value = !1);
    }, { deep: !0 }), D(f, () => b("perms", f.value)), D(M, (t) => {
      b("modified-data", t);
    }), D(() => a.readData, (t) => {
      V.value.increment(t), V.value.changed() && ue();
    }), D(() => a.editing, (t) => {
      k("editing updated -> updating editMode", t), y.value = t;
    }), D(y, (t) => {
      k("editMode updated -> emit update", t), b("update:editing", t);
    }), je(() => {
      a.readResource && !E.value ? ue() : (E.value, A.value = !0, y.value = !0, v.value = !1, I.value.increment(n.value).turnStoredIntoOriginal(), M.value = I.value.changed());
    });
    const ve = (t, o) => {
      if (o) {
        if (v.value = !1, typeof t < "u" && (W.value = t.httpStatus, !t.success))
          return F.value = !0, b("error", t.httpStatus), !1;
        F.value = !0;
      }
      return !0;
    }, Ce = (t, o) => {
      if (k("doAutoReloadId -> enter: ", t), typeof t < "u" && t.autoReloadId)
        if (k("doAutoReloadId -> autoReloadId detected: ", t.autoReloadId), typeof o < "u") {
          let P = o;
          typeof o == "function" && (P = o(t.autoReloadId)), r.push(P);
        } else ge.value ? (k("doAutoReloadId -> insideModal: ", a), qe(a.modalConfig.modalName, a.modalConfig.modalKey, t.autoReloadId)) : (k("doAutoReloadId -> outsideModal"), a.readData.id = t.autoReloadId, k("doAutoReloadId -> turning off create mode"), E.value = !1, ue());
    }, fe = (t, o) => {
      if (k("onCreate"), !ve(o, K.value.resource)) {
        a.notificationType === J.Toast && _({
          text: i.defaultCreateErrorText,
          details: i.defaultCreateErrorDetails,
          icon: i.defaultCreateErrorIcon,
          positionX: Z.Right
        });
        return;
      }
      e.value = !0, k("onCreate -> turn stored data into original"), I.value.increment(n.value).turnStoredIntoOriginal(), a.notificationType === J.Toast && _({
        text: i.defaultCreateSuccessText,
        details: i.defaultCreateSuccessDetails,
        icon: i.defaultCreateSuccessIcon,
        positionX: Z.Right
      }), Ce(o, a.redirectOnCreate), k("onCreate -> beforeEmitCreate"), b("create", o);
    }, ce = (t, o) => {
      if (k("onUpdate"), !ve(o, G.value.resource)) {
        a.notificationType === J.Toast && _({
          text: i.defaultUpdateErrorText,
          details: i.defaultUpdateErrorDetails,
          icon: i.defaultUpdateErrorIcon,
          positionX: Z.Right
        });
        return;
      }
      k("onUpdate -> turn stored data into original"), I.value.turnStoredIntoOriginal(), a.notificationType === J.Toast && _({
        text: i.defaultUpdateSuccessText,
        details: i.defaultUpdateSuccessDetails,
        icon: i.defaultUpdateSuccessIcon,
        positionX: Z.Right
      }), Ce(o), b("update", o);
    }, me = (t, o) => {
      if (k("onDrop"), !ve(o, H.value.resource)) {
        a.notificationType === J.Toast && _({
          text: i.defaultDropErrorText,
          details: i.defaultDropErrorDetails,
          icon: i.defaultDropErrorIcon,
          positionX: Z.Right
        });
        return;
      }
      if (a.notificationType === J.Toast && _({
        text: i.defaultDropSuccessText,
        details: i.defaultDropSuccessDetails,
        icon: i.defaultDropSuccessIcon,
        positionX: Z.Right
      }), b("drop", o), a.view === Te.Modal && (k("onDrop -> close modal"), He(a.modalConfig.modalName, a.modalConfig.modalKey)), typeof a.redirectOnDrop < "u") {
        let P = a.redirectOnDrop;
        typeof a.redirectOnDrop == "function" && (P = a.redirectOnDrop()), r.push(P);
      }
    };
    ae({
      doDrop: () => {
        B.value && B.value.doDrop();
      },
      doRefresh: ue,
      doSave: () => {
        B.value && B.value.doSave();
      },
      turnStoredDataIntoOriginal: () => {
        I.value.increment(n.value).turnStoredIntoOriginal();
      },
      hasModifiedData: () => I.value.changed()
    });
    const Ae = U(() => {
      var t;
      return I.value.changed() ? (t = a.modalConfig) == null ? void 0 : t.closeConfirm : "";
    }), Ee = (t) => {
      var o;
      if (typeof ((o = a.modalConfig) == null ? void 0 : o.beforeClose) == "function")
        return a.modalConfig.beforeClose({
          ...t,
          itemCreated: e.value
        });
    }, be = U(() => a.title.startsWith("__:") ? String(ze(a.title.substring(3))) : a.title), $e = U(() => v.value ? !1 : be.value.length > 0 || !!l["post-title"]), ge = U(() => a.view === Te.Modal), Ue = U(() => ge.value ? "lkt-modal" : "section"), ne = U(() => {
      var t, o;
      return a.mode !== S.Update || !h.value || !a.enabledSaveWithoutChanges && !M.value || (console.log("ableToUpdate", X.value), Be.value && !X.value) ? !1 : typeof ((t = G.value) == null ? void 0 : t.disabled) == "function" ? !G.value.disabled({
        prop: n.value
      }) : typeof ((o = G.value) == null ? void 0 : o.disabled) == "boolean" ? !G.value.disabled : !0;
    }), de = U(() => {
      var t, o;
      return a.mode !== S.Create || !a.enabledSaveWithoutChanges && !M.value || Be.value && !X.value ? !1 : typeof ((t = K.value) == null ? void 0 : t.disabled) == "function" ? !K.value.disabled({
        prop: n.value
      }) : typeof ((o = K.value) == null ? void 0 : o.disabled) == "boolean" ? !K.value.disabled : !0;
    }), ye = U(() => {
      var t, o;
      return j.value ? typeof ((t = H.value) == null ? void 0 : t.disabled) == "function" ? !H.value.disabled({
        prop: n.value
      }) : typeof ((o = H.value) == null ? void 0 : o.disabled) == "boolean" ? !H.value.disabled : !0 : !1;
    }), Le = U(() => Ue.value === "lkt-modal" ? {
      title: a.title,
      item: n.value,
      ...a.modalConfig,
      beforeClose: Ee,
      closeConfirm: Ae.value,
      headerActionsButton: a.groupButton !== !1 ? {
        dot: de.value || ne.value
      } : !1
    } : {}), Be = U(() => typeof a.form == "object" && Object.keys(a.form).length > 0);
    return (t, o) => {
      const P = le("lkt-http-info"), w = le("lkt-form"), Oe = le("lkt-loader");
      return m(), O(Pe(Ue.value), R(Le.value, { class: "lkt-item-crud" }), re({
        default: C(() => [
          Xe("article", xe, [
            !ge.value && $e.value ? (m(), N("header", et, [
              u(l)["pre-title"] ? (m(), N("div", tt, [
                s(t.$slots, "pre-title", {
                  item: n.value,
                  loading: v.value
                })
              ])) : d("", !0),
              be.value.length > 0 ? (m(), N("h1", at, Fe(be.value), 1)) : d("", !0),
              u(l)["post-title"] ? (m(), N("div", ot, [
                s(t.$slots, "post-title", {
                  item: n.value,
                  loading: v.value
                })
              ])) : d("", !0)
            ])) : d("", !0),
            t.buttonNavPosition === u(De).Top && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (m(), O(he, {
              key: 1,
              ref_key: "buttonNav",
              ref: B,
              loading: v.value,
              "onUpdate:loading": o[2] || (o[2] = (p) => v.value = p),
              editing: y.value,
              "onUpdate:editing": o[3] || (o[3] = (p) => y.value = p),
              item: n.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": K.value,
              "update-button": G.value,
              "drop-button": H.value,
              "edit-mode-button": oe.value,
              "group-button": pe.value,
              "data-changed": M.value,
              "http-success-read": A.value,
              "can-update": h.value,
              "can-drop": j.value,
              "can-switch-edit-mode": se.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": de.value,
              "able-to-update": ne.value,
              "able-to-drop": ye.value,
              perms: f.value,
              onCreate: fe,
              onSave: ce,
              onDrop: me
            }, re({ _: 2 }, [
              u(l)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: C(({ canUpdate: p, canDrop: Q, perms: Y }) => [
                  s(t.$slots, "prev-buttons-ever", {
                    canUpdate: p,
                    canDrop: Q,
                    perms: Y
                  })
                ]),
                key: "0"
              } : void 0,
              u(l)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: C(({ canUpdate: p, canDrop: Q, perms: Y }) => [
                  s(t.$slots, "prev-buttons", {
                    canUpdate: p,
                    canDrop: Q,
                    perms: Y
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["loading", "editing", "item", "mode", "view", "grouped", "button-nav-visibility", "create-button", "update-button", "drop-button", "edit-mode-button", "group-button", "data-changed", "http-success-read", "can-update", "can-drop", "can-switch-edit-mode", "group-button-as-modal-actions", "able-to-create", "able-to-update", "able-to-drop", "perms"])) : d("", !0),
            v.value ? d("", !0) : (m(), N("div", ut, [
              A.value ? (m(), N("div", nt, [
                F.value && t.notificationType === u(J).Inline ? (m(), O(P, {
                  key: 0,
                  code: W.value,
                  palette: W.value === 200 ? "success" : "danger",
                  quick: "",
                  "can-close": "",
                  onClose: o[4] || (o[4] = (p) => F.value = !1)
                }, null, 8, ["code", "palette"])) : d("", !0),
                Be.value ? (m(), O(w, {
                  key: 1,
                  modelValue: n.value,
                  "onUpdate:modelValue": o[5] || (o[5] = (p) => n.value = p),
                  form: t.form,
                  "onUpdate:form": o[6] || (o[6] = (p) => t.form = p),
                  valid: X.value,
                  "onUpdate:valid": o[7] || (o[7] = (p) => X.value = p)
                }, null, 8, ["modelValue", "form", "valid"])) : s(t.$slots, "item", {
                  key: 2,
                  item: n.value,
                  loading: v.value,
                  editMode: y.value,
                  isCreate: E.value,
                  canUpdate: h.value,
                  canDrop: j.value,
                  itemBeingEdited: ee.value,
                  perms: f.value
                })
              ])) : t.notificationType === u(J).Inline ? (m(), O(P, {
                key: 1,
                code: W.value
              }, null, 8, ["code"])) : d("", !0)
            ])),
            v.value ? (m(), O(Oe, { key: 3 })) : d("", !0),
            t.buttonNavPosition === u(De).Bottom && (t.groupButton === !1 || !t.groupButtonAsModalActions) ? (m(), O(he, {
              key: 4,
              ref_key: "buttonNav",
              ref: B,
              loading: v.value,
              "onUpdate:loading": o[8] || (o[8] = (p) => v.value = p),
              editing: y.value,
              "onUpdate:editing": o[9] || (o[9] = (p) => y.value = p),
              item: n.value,
              mode: t.mode,
              view: t.view,
              grouped: t.groupButton !== !1,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": K.value,
              "update-button": G.value,
              "drop-button": H.value,
              "edit-mode-button": oe.value,
              "group-button": pe.value,
              "data-changed": M.value,
              "http-success-read": A.value,
              "can-update": h.value,
              "can-drop": j.value,
              "can-switch-edit-mode": se.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": de.value,
              "able-to-update": ne.value,
              "able-to-drop": ye.value,
              perms: f.value,
              onCreate: fe,
              onSave: ce,
              onDrop: me
            }, re({ _: 2 }, [
              u(l)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: C(() => [
                  s(t.$slots, "prev-buttons-ever")
                ]),
                key: "0"
              } : void 0,
              u(l)["prev-buttons"] ? {
                name: "prev-buttons-ever",
                fn: C(() => [
                  s(t.$slots, "prev-buttons")
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
            t.buttonNavPosition === u(De).Top ? (m(), O(he, {
              key: 0,
              ref_key: "buttonNav",
              ref: B,
              loading: v.value,
              "onUpdate:loading": o[0] || (o[0] = (p) => v.value = p),
              editing: y.value,
              "onUpdate:editing": o[1] || (o[1] = (p) => y.value = p),
              item: n.value,
              mode: t.mode,
              view: t.view,
              grouped: !0,
              "button-nav-visibility": t.buttonNavVisibility,
              "create-button": K.value,
              "update-button": G.value,
              "drop-button": H.value,
              "edit-mode-button": oe.value,
              "group-button": pe.value,
              "data-changed": M.value,
              "http-success-read": A.value,
              "can-update": h.value,
              "can-drop": j.value,
              "can-switch-edit-mode": se.value,
              "group-button-as-modal-actions": t.groupButtonAsModalActions,
              "able-to-create": de.value,
              "able-to-update": ne.value,
              "able-to-drop": ye.value,
              perms: f.value,
              onCreate: fe,
              onSave: ce,
              onDrop: me
            }, re({ _: 2 }, [
              u(l)["prev-buttons-ever"] ? {
                name: "prev-buttons-ever",
                fn: C(({ canUpdate: p, canDrop: Q, perms: Y }) => [
                  s(t.$slots, "prev-buttons-ever", {
                    canUpdate: p,
                    canDrop: Q,
                    perms: Y
                  })
                ]),
                key: "0"
              } : void 0,
              u(l)["prev-buttons"] ? {
                name: "prev-buttons",
                fn: C(({ canUpdate: p, canDrop: Q, perms: Y }) => [
                  s(t.$slots, "prev-buttons", {
                    canUpdate: p,
                    canDrop: Q,
                    perms: Y
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
}), yt = {
  install: (T, ae = {}) => {
    T.component("lkt-item-crud") === void 0 && T.component("lkt-item-crud", dt);
  }
}, Bt = (T) => {
  x.defaultSaveIcon = T;
}, kt = (T) => {
  x.defaultDropIcon = T;
};
export {
  gt as debugLktItemCrud,
  yt as default,
  kt as setItemCrudDefaultDropIcon,
  Bt as setItemCrudDefaultSaveIcon
};
