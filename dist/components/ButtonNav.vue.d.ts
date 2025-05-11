import { ButtonConfig, ItemCrudButtonNavVisibility, ItemCrudMode, ItemCrudView, LktObject, ModificationView } from 'lkt-vue-kernel';
type __VLS_Props = {
    item: LktObject;
    modifications: LktObject;
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
    modificationView?: boolean | Array<ModificationView>;
    pickedModificationView: string;
    editableView: ModificationView;
};
declare var __VLS_9: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_11: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_49: {}, __VLS_65: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_67: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_105: {}, __VLS_107: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_109: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_147: {};
type __VLS_Slots = {} & {
    'prev-buttons-ever'?: (props: typeof __VLS_9) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_11) => any;
} & {
    buttons?: (props: typeof __VLS_49) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_65) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_67) => any;
} & {
    buttons?: (props: typeof __VLS_105) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_107) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_109) => any;
} & {
    buttons?: (props: typeof __VLS_147) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    doSave: () => void;
    doDrop: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    drop: (...args: any[]) => void;
    create: (...args: any[]) => void;
    "update:loading": (...args: any[]) => void;
    "update:editing": (...args: any[]) => void;
    "update:pickedModificationView": (...args: any[]) => void;
    save: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onDrop?: ((...args: any[]) => any) | undefined;
    onCreate?: ((...args: any[]) => any) | undefined;
    "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
    "onUpdate:editing"?: ((...args: any[]) => any) | undefined;
    "onUpdate:pickedModificationView"?: ((...args: any[]) => any) | undefined;
    onSave?: ((...args: any[]) => any) | undefined;
}>, {
    item: LktObject;
    modifications: LktObject;
    editing: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
