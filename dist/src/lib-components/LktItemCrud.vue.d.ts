declare const _default: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            title: string;
            modelValue: Record<string, any>;
            readData: Record<string, any>;
        }> & Omit<{
            readonly title: string;
            readonly modelValue: Record<string, any>;
            readonly readResource: string;
            readonly readData: Record<string, any>;
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onRead?: ((...args: any[]) => any) | undefined;
            onSave?: ((...args: any[]) => any) | undefined;
            onPerms?: ((...args: any[]) => any) | undefined;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
            title: {
                type: StringConstructor;
                default: string;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onRead?: ((...args: any[]) => any) | undefined;
            onSave?: ((...args: any[]) => any) | undefined;
            onPerms?: ((...args: any[]) => any) | undefined;
        }, "title" | "modelValue" | "readData">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot<any> | undefined;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null;
        $emit: (event: "update:modelValue" | "read" | "save" | "perms", ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
            title: {
                type: StringConstructor;
                default: string;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onRead?: ((...args: any[]) => any) | undefined;
            onSave?: ((...args: any[]) => any) | undefined;
            onPerms?: ((...args: any[]) => any) | undefined;
        }, {
            fetchItem: () => Promise<void>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "read" | "save" | "perms")[], string, {
            title: string;
            modelValue: Record<string, any>;
            readData: Record<string, any>;
        }, {}, string, {}> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<{
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
        title: {
            type: StringConstructor;
            default: string;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onRead?: ((...args: any[]) => any) | undefined;
        onSave?: ((...args: any[]) => any) | undefined;
        onPerms?: ((...args: any[]) => any) | undefined;
    } & import("vue").ShallowUnwrapRef<{
        fetchItem: () => Promise<void>;
    }> & {} & import("vue").ComponentCustomProperties & {};
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
    title: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onRead?: ((...args: any[]) => any) | undefined;
    onSave?: ((...args: any[]) => any) | undefined;
    onPerms?: ((...args: any[]) => any) | undefined;
}, {
    fetchItem: () => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "read" | "save" | "perms")[], "update:modelValue" | "read" | "save" | "perms", {
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
