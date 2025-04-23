import { ButtonConfig, ItemCrudButtonNavVisibility, ItemCrudMode, ItemCrudView, LktObject } from 'lkt-vue-kernel';
type __VLS_Props = {
    item: LktObject;
    editing?: boolean;
    loading?: boolean;
    view: ItemCrudView;
    mode: ItemCrudMode;
    createButton?: ButtonConfig | false;
    updateButton?: ButtonConfig | false;
    dropButton?: ButtonConfig | false;
    editModeButton?: ButtonConfig | false;
    groupButton?: ButtonConfig | boolean;
    dataChanged: boolean;
    canUpdate?: boolean;
    canDrop?: boolean;
    canSwitchEditMode?: boolean;
    perms?: Array<string>;
    httpSuccessRead?: boolean;
    buttonNavVisibility: ItemCrudButtonNavVisibility;
};
declare var __VLS_11: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_13: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_27: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_41: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_55: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_57: {}, __VLS_59: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_61: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_75: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_89: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean;
}, __VLS_103: {
    item: LktObject;
    editMode: boolean;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_105: {};
type __VLS_Slots = {} & {
    'prev-buttons-ever'?: (props: typeof __VLS_11) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_13) => any;
} & {
    'button-save'?: (props: typeof __VLS_27) => any;
} & {
    'button-save'?: (props: typeof __VLS_41) => any;
} & {
    'button-drop'?: (props: typeof __VLS_55) => any;
} & {
    buttons?: (props: typeof __VLS_57) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_59) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_61) => any;
} & {
    'button-save'?: (props: typeof __VLS_75) => any;
} & {
    'button-save'?: (props: typeof __VLS_89) => any;
} & {
    'button-drop'?: (props: typeof __VLS_103) => any;
} & {
    buttons?: (props: typeof __VLS_105) => any;
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
