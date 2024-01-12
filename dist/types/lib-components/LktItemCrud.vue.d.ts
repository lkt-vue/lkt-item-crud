declare const _default: {
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        editModeText: {
            type: StringConstructor;
            default: string;
        };
        saveText: {
            type: StringConstructor;
            default: string;
        };
        dropText: {
            type: StringConstructor;
            default: string;
        };
        readResource: {
            type: StringConstructor;
            required: false;
        };
        createResource: {
            type: StringConstructor;
            required: false;
        };
        updateResource: {
            type: StringConstructor;
            required: false;
        };
        dropResource: {
            type: StringConstructor;
            required: false;
        };
        readData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        createData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        updateData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        dropData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        isCreate: {
            type: BooleanConstructor;
            default: boolean;
        };
        createConfirm: {
            type: StringConstructor;
            default: string;
        };
        updateConfirm: {
            type: StringConstructor;
            default: string;
        };
        dropConfirm: {
            type: StringConstructor;
            default: string;
        };
        createDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        updateDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        dropDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        saveValidator: {
            type: FunctionConstructor;
            required: false;
            default: () => boolean;
        };
    }>> & {
        onError?: ((...args: any[]) => any) | undefined;
        onDrop?: ((...args: any[]) => any) | undefined;
        onUpdate?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onRead?: ((...args: any[]) => any) | undefined;
        onCreate?: ((...args: any[]) => any) | undefined;
        onPerms?: ((...args: any[]) => any) | undefined;
        "onModified-data"?: ((...args: any[]) => any) | undefined;
    }, {
        doDrop: () => void;
        doRefresh: () => Promise<void>;
        doSave: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("error" | "drop" | "update" | "update:modelValue" | "read" | "create" | "perms" | "modified-data")[], import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        editModeText: {
            type: StringConstructor;
            default: string;
        };
        saveText: {
            type: StringConstructor;
            default: string;
        };
        dropText: {
            type: StringConstructor;
            default: string;
        };
        readResource: {
            type: StringConstructor;
            required: false;
        };
        createResource: {
            type: StringConstructor;
            required: false;
        };
        updateResource: {
            type: StringConstructor;
            required: false;
        };
        dropResource: {
            type: StringConstructor;
            required: false;
        };
        readData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        createData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        updateData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        dropData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        isCreate: {
            type: BooleanConstructor;
            default: boolean;
        };
        createConfirm: {
            type: StringConstructor;
            default: string;
        };
        updateConfirm: {
            type: StringConstructor;
            default: string;
        };
        dropConfirm: {
            type: StringConstructor;
            default: string;
        };
        createDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        updateDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        dropDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        saveValidator: {
            type: FunctionConstructor;
            required: false;
            default: () => boolean;
        };
    }>> & {
        onError?: ((...args: any[]) => any) | undefined;
        onDrop?: ((...args: any[]) => any) | undefined;
        onUpdate?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onRead?: ((...args: any[]) => any) | undefined;
        onCreate?: ((...args: any[]) => any) | undefined;
        onPerms?: ((...args: any[]) => any) | undefined;
        "onModified-data"?: ((...args: any[]) => any) | undefined;
    }, {
        title: string;
        modelValue: Record<string, any>;
        editModeText: string;
        saveText: string;
        dropText: string;
        readData: Record<string, any>;
        createData: Record<string, any>;
        updateData: Record<string, any>;
        dropData: Record<string, any>;
        isCreate: boolean;
        createConfirm: string;
        updateConfirm: string;
        dropConfirm: string;
        createDisabled: boolean;
        updateDisabled: boolean;
        dropDisabled: boolean;
        saveValidator: Function;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        editModeText: {
            type: StringConstructor;
            default: string;
        };
        saveText: {
            type: StringConstructor;
            default: string;
        };
        dropText: {
            type: StringConstructor;
            default: string;
        };
        readResource: {
            type: StringConstructor;
            required: false;
        };
        createResource: {
            type: StringConstructor;
            required: false;
        };
        updateResource: {
            type: StringConstructor;
            required: false;
        };
        dropResource: {
            type: StringConstructor;
            required: false;
        };
        readData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        createData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        updateData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        dropData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        isCreate: {
            type: BooleanConstructor;
            default: boolean;
        };
        createConfirm: {
            type: StringConstructor;
            default: string;
        };
        updateConfirm: {
            type: StringConstructor;
            default: string;
        };
        dropConfirm: {
            type: StringConstructor;
            default: string;
        };
        createDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        updateDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        dropDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        saveValidator: {
            type: FunctionConstructor;
            required: false;
            default: () => boolean;
        };
    }>> & {
        onError?: ((...args: any[]) => any) | undefined;
        onDrop?: ((...args: any[]) => any) | undefined;
        onUpdate?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onRead?: ((...args: any[]) => any) | undefined;
        onCreate?: ((...args: any[]) => any) | undefined;
        onPerms?: ((...args: any[]) => any) | undefined;
        "onModified-data"?: ((...args: any[]) => any) | undefined;
    }, {
        doDrop: () => void;
        doRefresh: () => Promise<void>;
        doSave: () => void;
    }, {}, {}, {}, {
        title: string;
        modelValue: Record<string, any>;
        editModeText: string;
        saveText: string;
        dropText: string;
        readData: Record<string, any>;
        createData: Record<string, any>;
        updateData: Record<string, any>;
        dropData: Record<string, any>;
        isCreate: boolean;
        createConfirm: string;
        updateConfirm: string;
        dropConfirm: string;
        createDisabled: boolean;
        updateDisabled: boolean;
        dropDisabled: boolean;
        saveValidator: Function;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ObjectConstructor;
        required: false;
        default: () => {};
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    editModeText: {
        type: StringConstructor;
        default: string;
    };
    saveText: {
        type: StringConstructor;
        default: string;
    };
    dropText: {
        type: StringConstructor;
        default: string;
    };
    readResource: {
        type: StringConstructor;
        required: false;
    };
    createResource: {
        type: StringConstructor;
        required: false;
    };
    updateResource: {
        type: StringConstructor;
        required: false;
    };
    dropResource: {
        type: StringConstructor;
        required: false;
    };
    readData: {
        type: ObjectConstructor;
        required: false;
        default: () => {};
    };
    createData: {
        type: ObjectConstructor;
        required: false;
        default: () => {};
    };
    updateData: {
        type: ObjectConstructor;
        required: false;
        default: () => {};
    };
    dropData: {
        type: ObjectConstructor;
        required: false;
        default: () => {};
    };
    isCreate: {
        type: BooleanConstructor;
        default: boolean;
    };
    createConfirm: {
        type: StringConstructor;
        default: string;
    };
    updateConfirm: {
        type: StringConstructor;
        default: string;
    };
    dropConfirm: {
        type: StringConstructor;
        default: string;
    };
    createDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    updateDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    dropDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    saveValidator: {
        type: FunctionConstructor;
        required: false;
        default: () => boolean;
    };
}>> & {
    onError?: ((...args: any[]) => any) | undefined;
    onDrop?: ((...args: any[]) => any) | undefined;
    onUpdate?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onRead?: ((...args: any[]) => any) | undefined;
    onCreate?: ((...args: any[]) => any) | undefined;
    onPerms?: ((...args: any[]) => any) | undefined;
    "onModified-data"?: ((...args: any[]) => any) | undefined;
}, {
    doDrop: () => void;
    doRefresh: () => Promise<void>;
    doSave: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("error" | "drop" | "update" | "update:modelValue" | "read" | "create" | "perms" | "modified-data")[], "error" | "drop" | "update" | "update:modelValue" | "read" | "create" | "perms" | "modified-data", {
    title: string;
    modelValue: Record<string, any>;
    editModeText: string;
    saveText: string;
    dropText: string;
    readData: Record<string, any>;
    createData: Record<string, any>;
    updateData: Record<string, any>;
    dropData: Record<string, any>;
    isCreate: boolean;
    createConfirm: string;
    updateConfirm: string;
    dropConfirm: string;
    createDisabled: boolean;
    updateDisabled: boolean;
    dropDisabled: boolean;
    saveValidator: Function;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        'post-title': (_: {
            item: Record<string, any>;
            loading: boolean;
        }) => any;
        'button-drop': (_: {
            item: Record<string, any>;
            editMode: boolean;
            isCreate: false;
            canUpdate: boolean;
            canDrop: boolean;
        }) => any;
        'button-save': (_: {
            item: Record<string, any>;
            editMode: boolean;
            isCreate: boolean;
            canUpdate: boolean;
            canDrop: boolean;
        }) => any;
        item: (_: {
            item: Record<string, any>;
            loading: false;
            editMode: boolean;
            isCreate: boolean;
            canUpdate: boolean;
            canDrop: boolean;
        }) => any;
    };
});
export default _default;
