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
    createAndNewButton?: ButtonConfig | false;
    updateButton?: ButtonConfig | false;
    dropButton?: ButtonConfig | false;
    editModeButton?: ButtonConfig | false;
    groupButton?: ButtonConfig | boolean;
    groupButtonAsModalActions?: boolean;
    dataChanged: boolean;
    ableToCreate?: boolean;
    ableToCreateAndNew?: boolean;
    ableToUpdate?: boolean;
    ableToDrop?: boolean;
    canCreate?: boolean;
    canUpdate?: boolean;
    canDrop?: boolean;
    canSwitchEditMode?: boolean;
    perms?: Array<string>;
    httpSuccessRead?: boolean;
    buttonNavVisibility: ItemCrudButtonNavVisibility;
    modificationView?: boolean | Array<ModificationView>;
    pickedModificationView: string;
    editableView: ModificationView;
    navStartButtons?: Array<ButtonConfig>;
    navStartButtonsEditing?: Array<ButtonConfig>;
    navEndButtons?: Array<ButtonConfig>;
    navEndButtonsEditing?: Array<ButtonConfig>;
};
declare var __VLS_13: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_19: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_69: {}, __VLS_97: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_103: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_153: {}, __VLS_167: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_173: {
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
    perms: string[] | undefined;
}, __VLS_223: {};
type __VLS_Slots = {} & {
    'prev-buttons-ever'?: (props: typeof __VLS_13) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_19) => any;
} & {
    buttons?: (props: typeof __VLS_69) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_97) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_103) => any;
} & {
    buttons?: (props: typeof __VLS_153) => any;
} & {
    'prev-buttons-ever'?: (props: typeof __VLS_167) => any;
} & {
    'prev-buttons'?: (props: typeof __VLS_173) => any;
} & {
    buttons?: (props: typeof __VLS_223) => any;
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
