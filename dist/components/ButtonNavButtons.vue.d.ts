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
    editMode: any;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_35: {
    item: LktObject;
    editMode: any;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_49: {
    item: LktObject;
    editMode: any;
    isCreate: boolean;
    canUpdate: boolean | undefined;
    canDrop: boolean | undefined;
}, __VLS_51: {};
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
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
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
