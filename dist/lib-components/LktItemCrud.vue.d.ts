import { ButtonConfig, FormUiConfig, ItemCrudButtonNavPosition, ItemCrudConfig, ItemCrudMode, ItemCrudView, LktObject, ModalConfig, ModificationView, NotificationType } from 'lkt-vue-kernel';
declare var __VLS_17: {
    canUpdate: any;
    canDrop: any;
    perms: any;
}, __VLS_19: {
    canUpdate: any;
    canDrop: any;
    perms: any;
}, __VLS_25: {
    item: LktObject;
    loading: boolean;
}, __VLS_27: {
    item: LktObject;
    loading: boolean;
}, __VLS_40: {
    canUpdate: any;
    canDrop: any;
    perms: any;
}, __VLS_42: {
    canUpdate: any;
    canDrop: any;
    perms: any;
}, __VLS_55: {
    canUpdate: any;
    canDrop: any;
    perms: any;
}, __VLS_57: {
    canUpdate: any;
    canDrop: any;
    perms: any;
}, __VLS_74: string, __VLS_75: {}, __VLS_77: {
    item: LktObject;
    loading: false;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean;
    canDrop: boolean;
    itemBeingEdited: boolean;
    perms: string[];
}, __VLS_98: {}, __VLS_100: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_74>]?: (props: typeof __VLS_75) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_17) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_19) => any;
} & {
    'pre-title'?: (props: typeof __VLS_25) => any;
} & {
    'post-title'?: (props: typeof __VLS_27) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_40) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_42) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_55) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_57) => any;
} & {
    item?: (props: typeof __VLS_77) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_98) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_100) => any;
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
    "update:perms": (...args: any[]) => void;
    "update:customData": (...args: any[]) => void;
    "update:modifications": (...args: any[]) => void;
    "update:visibleView": (...args: any[]) => void;
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
    "onUpdate:perms"?: ((...args: any[]) => any) | undefined;
    "onUpdate:customData"?: ((...args: any[]) => any) | undefined;
    "onUpdate:modifications"?: ((...args: any[]) => any) | undefined;
    "onUpdate:visibleView"?: ((...args: any[]) => any) | undefined;
    "onBefore-save"?: ((...args: any[]) => any) | undefined;
    "onModified-data"?: ((...args: any[]) => any) | undefined;
}>, {
    view: ItemCrudView;
    form: import("lkt-vue-kernel").FormConfig | Function;
    header: import("lkt-vue-kernel").HeaderConfig;
    title: string;
    mode: ItemCrudMode;
    modifications: LktObject;
    modelValue: LktObject;
    createButton: ButtonConfig | false;
    events: import("lkt-vue-kernel").ItemCrudEvents;
    editing: boolean;
    perms: import("lkt-vue-kernel").ValidTablePermission[];
    customData: LktObject;
    formUiConfig: Partial<FormUiConfig>;
    visibleView: ModificationView;
    modificationViews: boolean | Array<ModificationView>;
    editModeButton: ButtonConfig | false;
    dropButton: ButtonConfig | false;
    createAndNewButton: ButtonConfig | false;
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
    differencesTableConfig: import("lkt-vue-kernel").TableConfig | ((config: import("lkt-vue-kernel").TableConfig) => import("lkt-vue-kernel").TableConfig);
    navStartButtons: Array<ButtonConfig>;
    navStartButtonsEditing: Array<ButtonConfig>;
    navEndButtons: Array<ButtonConfig>;
    navEndButtonsEditing: Array<ButtonConfig>;
    updateConfig: import("lkt-vue-kernel").ItemCrudSaveConfig;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
