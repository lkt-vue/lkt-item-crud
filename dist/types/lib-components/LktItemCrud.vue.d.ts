import { LktObject } from "lkt-ts-interfaces";
declare const _default: {
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        readResource: {
            type: StringConstructor;
            required: true;
        };
        readData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
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
        title: {
            type: StringConstructor;
            default: string;
        };
    }>> & {
        onDrop?: ((...args: any[]) => any) | undefined;
        onUpdate?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onRead?: ((...args: any[]) => any) | undefined;
        onCreate?: ((...args: any[]) => any) | undefined;
        onPerms?: ((...args: any[]) => any) | undefined;
    }, {
        fetchItem: () => Promise<void>;
        create: (data: LktObject) => Promise<void>;
        update: (data: LktObject) => Promise<void>;
        drop: (data: LktObject) => Promise<void>;
        refresh: () => Promise<void>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("drop" | "update" | "update:modelValue" | "read" | "create" | "perms")[], import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
        };
        readResource: {
            type: StringConstructor;
            required: true;
        };
        readData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
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
        title: {
            type: StringConstructor;
            default: string;
        };
    }>> & {
        onDrop?: ((...args: any[]) => any) | undefined;
        onUpdate?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onRead?: ((...args: any[]) => any) | undefined;
        onCreate?: ((...args: any[]) => any) | undefined;
        onPerms?: ((...args: any[]) => any) | undefined;
    }, {
        title: string;
        modelValue: Record<string, any>;
        readData: Record<string, any>;
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
        readResource: {
            type: StringConstructor;
            required: true;
        };
        readData: {
            type: ObjectConstructor;
            required: false;
            default: () => {};
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
        title: {
            type: StringConstructor;
            default: string;
        };
    }>> & {
        onDrop?: ((...args: any[]) => any) | undefined;
        onUpdate?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onRead?: ((...args: any[]) => any) | undefined;
        onCreate?: ((...args: any[]) => any) | undefined;
        onPerms?: ((...args: any[]) => any) | undefined;
    }, {
        fetchItem: () => Promise<void>;
        create: (data: LktObject) => Promise<void>;
        update: (data: LktObject) => Promise<void>;
        drop: (data: LktObject) => Promise<void>;
        refresh: () => Promise<void>;
    }, {}, {}, {}, {
        title: string;
        modelValue: Record<string, any>;
        readData: Record<string, any>;
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
    readResource: {
        type: StringConstructor;
        required: true;
    };
    readData: {
        type: ObjectConstructor;
        required: false;
        default: () => {};
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
    title: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onDrop?: ((...args: any[]) => any) | undefined;
    onUpdate?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onRead?: ((...args: any[]) => any) | undefined;
    onCreate?: ((...args: any[]) => any) | undefined;
    onPerms?: ((...args: any[]) => any) | undefined;
}, {
    fetchItem: () => Promise<void>;
    create: (data: LktObject) => Promise<void>;
    update: (data: LktObject) => Promise<void>;
    drop: (data: LktObject) => Promise<void>;
    refresh: () => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("drop" | "update" | "update:modelValue" | "read" | "create" | "perms")[], "drop" | "update" | "update:modelValue" | "read" | "create" | "perms", {
    title: string;
    modelValue: Record<string, any>;
    readData: Record<string, any>;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        'post-title': (_: {
            item: Record<string, any>;
        }) => any;
        item: (_: {
            item: Record<string, any>;
        }) => any;
    };
});
export default _default;
