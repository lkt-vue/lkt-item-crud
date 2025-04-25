import { ButtonConfig, ItemCrudButtonNavVisibility, ItemCrudMode, ItemCrudView, LktObject } from 'lkt-vue-kernel';
type __VLS_Props = {
    item: LktObject;
    editing?: boolean;
    loading?: boolean;
    grouped?: boolean;
    view: ItemCrudView;
    mode: ItemCrudMode;
    createButton?: ButtonConfig | false;
    updateButton?: ButtonConfig | false;
    dropButton?: ButtonConfig | false;
    editModeButton?: ButtonConfig | false;
    groupButton?: ButtonConfig | boolean;
    groupButtonAsModalActions?: boolean;
    dataChanged: boolean;
    ableToCreate?: boolean;
    ableToUpdate?: boolean;
    ableToDrop?: boolean;
    canUpdate?: boolean;
    canDrop?: boolean;
    canSwitchEditMode?: boolean;
    perms?: Array<string>;
    httpSuccessRead?: boolean;
    buttonNavVisibility: ItemCrudButtonNavVisibility;
};
declare var __VLS_5: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_7: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_21: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_35: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_49: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_51: {}, __VLS_63: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_65: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_79: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_93: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_107: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_109: {}, __VLS_111: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_113: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_127: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_141: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean;
}, __VLS_155: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_157: {};
type __VLS_Slots = {} & {
    'prev-buttons-ever'?: (props: typeof __VLS_5) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_7) => any;
} & {
    'button-save'?: (props: typeof __VLS_21) => any;
} & {
    'button-save'?: (props: typeof __VLS_35) => any;
} & {
    'button-drop'?: (props: typeof __VLS_49) => any;
} & {
    buttons?: (props: typeof __VLS_51) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_63) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_65) => any;
} & {
    'button-save'?: (props: typeof __VLS_79) => any;
} & {
    'button-save'?: (props: typeof __VLS_93) => any;
} & {
    'button-drop'?: (props: typeof __VLS_107) => any;
} & {
    buttons?: (props: typeof __VLS_109) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_111) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_113) => any;
} & {
    'button-save'?: (props: typeof __VLS_127) => any;
} & {
    'button-save'?: (props: typeof __VLS_141) => any;
} & {
    'button-drop'?: (props: typeof __VLS_155) => any;
} & {
    buttons?: (props: typeof __VLS_157) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    doSave: () => void;
    doDrop: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    drop: (...args: any[]) => void;
    create: (...args: any[]) => void;
    "update:loading": (...args: any[]) => void;
    "update:editing": (...args: any[]) => void;
    save: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onDrop?: ((...args: any[]) => any) | undefined;
    onCreate?: ((...args: any[]) => any) | undefined;
    "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
    "onUpdate:editing"?: ((...args: any[]) => any) | undefined;
    onSave?: ((...args: any[]) => any) | undefined;
}>, {
    item: LktObject;
    editing: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
