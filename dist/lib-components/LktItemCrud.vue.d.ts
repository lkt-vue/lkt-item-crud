import { ItemCrudButtonNavPosition, ItemCrudConfig, ItemCrudMode, ItemCrudView, LktObject, NotificationType } from 'lkt-vue-kernel';
declare var __VLS_6: {
    item: LktObject;
    loading: boolean;
}, __VLS_8: {
    item: LktObject;
    loading: boolean;
}, __VLS_21: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_23: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_33: {
    item: LktObject;
    loading: false;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean;
    canDrop: boolean;
    itemBeingEdited: boolean;
    perms: string[];
}, __VLS_54: {}, __VLS_56: {};
type __VLS_Slots = {} & {
    'pre-title'?: (props: typeof __VLS_6) => any;
} & {
    'post-title'?: (props: typeof __VLS_8) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_21) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_23) => any;
} & {
    item?: (props: typeof __VLS_33) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_54) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_56) => any;
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
    editModeButton: import("lkt-vue-kernel").ButtonConfig | false;
    dropButton: import("lkt-vue-kernel").ButtonConfig | false;
    createButton: import("lkt-vue-kernel").ButtonConfig | false;
    updateButton: import("lkt-vue-kernel").ButtonConfig | false;
    groupButton: import("lkt-vue-kernel").ButtonConfig | boolean;
    buttonNavPosition: ItemCrudButtonNavPosition;
    buttonNavVisibility: import("lkt-vue-kernel").ItemCrudButtonNavVisibility;
    modalConfig: import("lkt-vue-kernel").ModalConfig;
    saveConfig: import("lkt-vue-kernel").SaveConfig;
    dataStateConfig: import("lkt-data-state").DataStateConfig;
    readResource: string;
    readData: LktObject;
    beforeEmitUpdate: Function;
    notificationType: NotificationType;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
