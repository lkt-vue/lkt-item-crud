import { ButtonConfig, ItemCrudButtonNavPosition, ItemCrudConfig, ItemCrudMode, ItemCrudView, LktObject, ModalConfig, NotificationType } from 'lkt-vue-kernel';
declare var __VLS_17: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_19: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_21: {
    item: LktObject;
    loading: boolean;
}, __VLS_23: {
    item: LktObject;
    loading: boolean;
}, __VLS_36: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_38: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_48: {
    item: LktObject;
    loading: false;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean;
    canDrop: boolean;
    itemBeingEdited: boolean;
    perms: string[];
}, __VLS_69: {}, __VLS_71: {};
type __VLS_Slots = {} & {
    'prev-buttons-ever'?: (props: typeof __VLS_17) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_19) => any;
} & {
    'pre-title'?: (props: typeof __VLS_21) => any;
} & {
    'post-title'?: (props: typeof __VLS_23) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_36) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_38) => any;
} & {
    item?: (props: typeof __VLS_48) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_69) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_71) => any;
};
declare const __VLS_component: import("vue").DefineComponent<ItemCrudConfig, {
    doDrop: () => void;
    doRefresh: () => Promise<void>;
    doSave: () => void;
    turnStoredDataIntoOriginal: () => void;
    hasModifiedData: () => boolean;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (...args: any[]) => void;
    drop: (...args: any[]) => void;
    update: (...args: any[]) => void;
    create: (...args: any[]) => void;
    read: (...args: any[]) => void;
    perms: (...args: any[]) => void;
    "update:editing": (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    "before-save": (...args: any[]) => void;
    "modified-data": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<ItemCrudConfig> & Readonly<{
    onError?: ((...args: any[]) => any) | undefined;
    onDrop?: ((...args: any[]) => any) | undefined;
    onUpdate?: ((...args: any[]) => any) | undefined;
    onCreate?: ((...args: any[]) => any) | undefined;
    onRead?: ((...args: any[]) => any) | undefined;
    onPerms?: ((...args: any[]) => any) | undefined;
    "onUpdate:editing"?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onBefore-save"?: ((...args: any[]) => any) | undefined;
    "onModified-data"?: ((...args: any[]) => any) | undefined;
}>, {
    view: ItemCrudView;
    title: string;
    mode: ItemCrudMode;
    modelValue: LktObject;
    editing: boolean;
    perms: import("lkt-vue-kernel").ValidTablePermission[];
    editModeButton: ButtonConfig | false;
    dropButton: ButtonConfig | false;
    createButton: ButtonConfig | false;
    updateButton: ButtonConfig | false;
    groupButton: ButtonConfig | boolean;
    groupButtonAsModalActions: boolean;
    buttonNavPosition: ItemCrudButtonNavPosition;
    buttonNavVisibility: import("lkt-vue-kernel").ItemCrudButtonNavVisibility;
    modalConfig: ModalConfig;
    saveConfig: import("lkt-vue-kernel").SaveConfig;
    dataStateConfig: import("lkt-data-state").DataStateConfig;
    readResource: string;
    readData: LktObject;
    beforeEmitUpdate: Function;
    notificationType: NotificationType;
    enabledSaveWithoutChanges: boolean;
    redirectOnCreate: string | ((id: number | string) => string);
    redirectOnDrop: string | (() => string);
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
