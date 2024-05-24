import { LktObject } from "lkt-ts-interfaces";
import { ModalCallbackConfig } from "../types/ModalCallbackConfig";
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: LktObject;
    title: string;
    editModeText: string;
    saveText: string;
    dropText: string;
    hiddenSave: boolean;
    hiddenDrop: boolean;
    hiddenButtons: boolean;
    readResource: string;
    createResource: string;
    updateResource: string;
    dropResource: string;
    readData: LktObject;
    createData: LktObject;
    updateData: LktObject;
    dropData: LktObject;
    isCreate: boolean;
    createConfirm: string;
    updateConfirm: string;
    dropConfirm: string;
    createConfirmData: LktObject;
    updateConfirmData: LktObject;
    dropConfirmData: LktObject;
    createDisabled: boolean;
    updateDisabled: boolean;
    dropDisabled: boolean;
    saveValidator: Function;
    beforeEmitUpdate: Function | undefined;
    onCreate: Function | undefined;
    onUpdate: Function | undefined;
    insideModal: boolean;
    dataStateConfig: LktObject;
    onCreateModalCallbacks: ModalCallbackConfig[];
    onUpdateModalCallbacks: ModalCallbackConfig[];
    onDropModalCallbacks: ModalCallbackConfig[];
    editing: boolean;
}>, {
    modelValue: () => {};
    title: string;
    editModeText: string;
    saveText: string;
    dropText: string;
    hiddenSave: boolean;
    hiddenDrop: boolean;
    hiddenButtons: boolean;
    readResource: string;
    createResource: string;
    updateResource: string;
    dropResource: string;
    readData: () => {};
    createData: () => {};
    updateData: () => {};
    dropData: () => {};
    isCreate: boolean;
    createConfirm: string;
    updateConfirm: string;
    dropConfirm: string;
    createConfirmData: () => {};
    updateConfirmData: () => {};
    dropConfirmData: () => {};
    createDisabled: boolean;
    updateDisabled: boolean;
    dropDisabled: boolean;
    saveValidator: () => true;
    beforeEmitUpdate: undefined;
    onCreate: undefined;
    onUpdate: undefined;
    insideModal: boolean;
    dataStateConfig: () => {};
    onCreateModalCallbacks: () => never[];
    onUpdateModalCallbacks: () => never[];
    onDropModalCallbacks: () => never[];
    editing: boolean;
}>, {
    doDrop: () => void;
    doRefresh: () => Promise<void>;
    doSave: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (...args: any[]) => void;
    drop: (...args: any[]) => void;
    update: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    "update:isCreate": (...args: any[]) => void;
    "update:editing": (...args: any[]) => void;
    read: (...args: any[]) => void;
    create: (...args: any[]) => void;
    "before-save": (...args: any[]) => void;
    perms: (...args: any[]) => void;
    "modified-data": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: LktObject;
    title: string;
    editModeText: string;
    saveText: string;
    dropText: string;
    hiddenSave: boolean;
    hiddenDrop: boolean;
    hiddenButtons: boolean;
    readResource: string;
    createResource: string;
    updateResource: string;
    dropResource: string;
    readData: LktObject;
    createData: LktObject;
    updateData: LktObject;
    dropData: LktObject;
    isCreate: boolean;
    createConfirm: string;
    updateConfirm: string;
    dropConfirm: string;
    createConfirmData: LktObject;
    updateConfirmData: LktObject;
    dropConfirmData: LktObject;
    createDisabled: boolean;
    updateDisabled: boolean;
    dropDisabled: boolean;
    saveValidator: Function;
    beforeEmitUpdate: Function | undefined;
    onCreate: Function | undefined;
    onUpdate: Function | undefined;
    insideModal: boolean;
    dataStateConfig: LktObject;
    onCreateModalCallbacks: ModalCallbackConfig[];
    onUpdateModalCallbacks: ModalCallbackConfig[];
    onDropModalCallbacks: ModalCallbackConfig[];
    editing: boolean;
}>, {
    modelValue: () => {};
    title: string;
    editModeText: string;
    saveText: string;
    dropText: string;
    hiddenSave: boolean;
    hiddenDrop: boolean;
    hiddenButtons: boolean;
    readResource: string;
    createResource: string;
    updateResource: string;
    dropResource: string;
    readData: () => {};
    createData: () => {};
    updateData: () => {};
    dropData: () => {};
    isCreate: boolean;
    createConfirm: string;
    updateConfirm: string;
    dropConfirm: string;
    createConfirmData: () => {};
    updateConfirmData: () => {};
    dropConfirmData: () => {};
    createDisabled: boolean;
    updateDisabled: boolean;
    dropDisabled: boolean;
    saveValidator: () => true;
    beforeEmitUpdate: undefined;
    onCreate: undefined;
    onUpdate: undefined;
    insideModal: boolean;
    dataStateConfig: () => {};
    onCreateModalCallbacks: () => never[];
    onUpdateModalCallbacks: () => never[];
    onDropModalCallbacks: () => never[];
    editing: boolean;
}>>> & {
    onError?: ((...args: any[]) => any) | undefined;
    onDrop?: ((...args: any[]) => any) | undefined;
    onCreate?: ((...args: any[]) => any) | undefined;
    onUpdate?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:isCreate"?: ((...args: any[]) => any) | undefined;
    "onUpdate:editing"?: ((...args: any[]) => any) | undefined;
    onRead?: ((...args: any[]) => any) | undefined;
    "onBefore-save"?: ((...args: any[]) => any) | undefined;
    onPerms?: ((...args: any[]) => any) | undefined;
    "onModified-data"?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    modelValue: LktObject;
    editModeText: string;
    saveText: string;
    dropText: string;
    hiddenSave: boolean;
    hiddenDrop: boolean;
    hiddenButtons: boolean;
    readResource: string;
    createResource: string;
    updateResource: string;
    dropResource: string;
    readData: LktObject;
    createData: LktObject;
    updateData: LktObject;
    dropData: LktObject;
    isCreate: boolean;
    createConfirm: string;
    updateConfirm: string;
    dropConfirm: string;
    createConfirmData: LktObject;
    updateConfirmData: LktObject;
    dropConfirmData: LktObject;
    createDisabled: boolean;
    updateDisabled: boolean;
    dropDisabled: boolean;
    saveValidator: Function;
    beforeEmitUpdate: Function | undefined;
    onCreate: Function | undefined;
    onUpdate: Function | undefined;
    insideModal: boolean;
    dataStateConfig: LktObject;
    onCreateModalCallbacks: ModalCallbackConfig[];
    onUpdateModalCallbacks: ModalCallbackConfig[];
    onDropModalCallbacks: ModalCallbackConfig[];
    editing: boolean;
}, {}>, {
    "post-title"?(_: {
        item: LktObject;
        loading: boolean;
    }): any;
    "button-drop"?(_: {
        item: LktObject;
        editMode: boolean;
        isCreate: false;
        canUpdate: boolean;
        canDrop: boolean;
    }): any;
    "button-save"?(_: {
        item: LktObject;
        editMode: boolean;
        isCreate: boolean;
        canUpdate: boolean;
        canDrop: boolean;
    }): any;
    item?(_: {
        item: LktObject;
        loading: false;
        editMode: boolean;
        isCreate: boolean;
        canUpdate: boolean;
        canDrop: boolean;
        itemBeingEdited: boolean;
    }): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
