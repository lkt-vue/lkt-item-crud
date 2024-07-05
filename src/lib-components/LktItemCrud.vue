<script setup lang="ts">
import {ref, watch, useSlots, computed, nextTick} from "vue";
import {httpCall, HTTPResponse} from "lkt-http-client";
import {DataState} from "lkt-data-state";
import {debug} from "../functions/debug";
import {LktObject} from "lkt-ts-interfaces";
import {ModalCallbackConfig} from "../types/ModalCallbackConfig";
import {runModalCallback} from "../functions/modalCallbacks";

const props = withDefaults(defineProps<{
    modelValue: LktObject
    title: string
    editModeText: string
    saveText: string
    saveIcon: string
    dropText: string
    dropIcon: string
    hiddenSave: boolean
    hiddenDrop: boolean
    hiddenButtons: boolean
    readResource: string
    createResource: string
    updateResource: string
    dropResource: string
    readData: LktObject
    createData: LktObject
    updateData: LktObject
    dropData: LktObject
    isCreate: boolean
    createConfirm: string
    updateConfirm: string
    dropConfirm: string
    createConfirmData: LktObject
    updateConfirmData: LktObject
    dropConfirmData: LktObject
    createDisabled: boolean
    updateDisabled: boolean
    dropDisabled: boolean
    saveValidator: Function
    beforeEmitUpdate: Function|undefined
    onCreate: Function|undefined
    onUpdate: Function|undefined
    insideModal: boolean
    hideSwitchEdition: boolean
    dataStateConfig: LktObject
    onCreateModalCallbacks: ModalCallbackConfig[]
    onUpdateModalCallbacks: ModalCallbackConfig[]
    onDropModalCallbacks: ModalCallbackConfig[]
    editing: boolean
}>(), {
    modelValue: () => ({}),
    title: '',
    editModeText: 'Edition Mode',
    saveText: 'Save',
    dropText: 'Delete',
    hiddenSave: false,
    hiddenDrop: false,
    hiddenButtons: false,
    readResource: '',
    createResource: '',
    updateResource: '',
    dropResource: '',
    readData: () => ({}),
    createData: () => ({}),
    updateData: () => ({}),
    dropData: () => ({}),
    isCreate: false,
    createConfirm: '',
    updateConfirm: '',
    dropConfirm: '',
    createConfirmData: () => ({}),
    updateConfirmData: () => ({}),
    dropConfirmData: () => ({}),
    createDisabled: false,
    updateDisabled: false,
    dropDisabled: false,
    saveValidator: () => true,
    beforeEmitUpdate: undefined,
    onCreate: undefined,
    onUpdate: undefined,
    insideModal: false,
    hideSwitchEdition: false,
    dataStateConfig: () => ({}),
    onCreateModalCallbacks: () => [],
    onUpdateModalCallbacks: () => [],
    onDropModalCallbacks: () => [],
    editing: false,
});

const slots = useSlots();

const emit = defineEmits(['update:modelValue', 'update:isCreate', 'update:editing', 'read', 'create', 'update', 'drop', 'before-save', 'perms', 'error', 'modified-data']);

let basePerms: string[] = [];

const isLoading = ref(true),
    item = ref(props.modelValue),
    perms = ref(basePerms),
    editMode = ref(props.editing),
    httpSuccessRead = ref(false),
    showStoreMessage = ref(false),
    httpStatus = ref(200),
    saveButton = ref(null),
    dropButton = ref(null),
    dataState = ref(new DataState(item.value, props.dataStateConfig)),
    readDataState = ref(new DataState(props.readData)),
    createMode = ref(props.isCreate),
    itemBeingEdited = ref(false);

const saveConfirm = computed(() => {
        return createMode.value
            ? props.createConfirm
            : props.updateConfirm;
    }),
    confirmData = computed(() => {
        return createMode.value
            ? props.createConfirmData
            : props.updateConfirmData;
    }),
    saveResource = computed(() => {
        return createMode.value
            ? props.createResource
            : props.updateResource;
    }),
    saveData = computed(() => {
        if (createMode.value) {
            return {...props.createData, ...JSON.parse(JSON.stringify(item.value))};
        }
        return {...props.updateData, ...JSON.parse(JSON.stringify(item.value))};
    }),
    saveDisabled = computed(() => {
        return createMode.value
            ? props.createDisabled
            : props.updateDisabled;
    }),
    canUpdate = computed(() => !createMode.value && perms.value.includes('update')),
    canDrop = computed(() => !createMode.value && perms.value.includes('drop'));

const fetchItem = async () => {
    debug('fetchItem');
    isLoading.value = true;
    httpStatus.value = -1;
    showStoreMessage.value = false;
    try {
        const r = await httpCall(props.readResource, props.readData);
        debug('fetchItem -> response', r);
        isLoading.value = false;
        httpStatus.value = r.httpStatus;
        if (!r.success) {
            httpSuccessRead.value = false;
            httpStatus.value = r.httpStatus;
            emit('error', r.httpStatus);
            return;
        }
        httpSuccessRead.value = true;
        item.value = r.data;
        perms.value = r.perms;
        dataState.value.increment(item.value).turnStoredIntoOriginal();
        readDataState.value.turnStoredIntoOriginal();
        emit('read', r);
    } catch (e) {
        isLoading.value = false;
        httpSuccessRead.value = false;
        httpStatus.value = 404;
        emit('error', 404);
        return;
    }
}

const displayHeader = computed(() => {
    if (isLoading.value) return false;

    return props.title || !!slots['post-title'];
})

watch(() => props.modelValue, v => {
    item.value = v;
    dataState.value.increment(v);
}, {deep: true});

watch(item, (v) => {
    itemBeingEdited.value = true;
    debug('item updated ->', item.value);
    if (typeof props.beforeEmitUpdate === 'function') {
        debug('item updated -> has beforeEmitUpdate');
        let override = props.beforeEmitUpdate(item.value);
        debug('item updated -> override with: ', override);
        if (typeof override === 'object') item.value = override;
    }
    emit('update:modelValue', item.value);
    debug('item updated -> update dataState');
    dataState.value.increment(v);
    nextTick(() => itemBeingEdited.value = false)
}, {deep: true});

watch(perms, () => emit('perms', perms.value));

const ableToSave = computed(() => {
    if (saveDisabled.value) return false;
    if (!createMode.value && !canUpdate.value) return false;

    if (typeof props.saveValidator === 'function' && !props.saveValidator(item.value)) return false;

    return dataState.value.changed();
});
watch(ableToSave, (v) => emit('modified-data', v));
watch(createMode, (v) => emit('update:isCreate', v));

watch(() => props.readData, v => {
    readDataState.value.increment(v);
    if (readDataState.value.changed()) fetchItem()
})

watch(() => props.editing, v => {
    debug('editing updated -> updating editMode', v);
    editMode.value = v;
});
watch(editMode, (v) => {
    debug('editMode updated -> emit update', v);
    emit('update:editing', v)
});

// Fetch item
if (props.readResource && !createMode.value) fetchItem();
else if (createMode.value) {
    httpSuccessRead.value = true;
    editMode.value = true;
    isLoading.value = false;
}

const onDrop = ($event: PointerEvent, r: HTTPResponse) => {
        isLoading.value = false;
        httpStatus.value = r.httpStatus;
        if (!r.success) {
            showStoreMessage.value = true;
            emit('error', r.httpStatus);
            return;
        }
        showStoreMessage.value = true;
        if (props.onDropModalCallbacks.length > 0) {
            debug('onDrop -> has onDropModalCallbacks');
            props.onDropModalCallbacks.forEach(cb => {
                runModalCallback(cb);
            });
        }
        emit('drop', r)
    },
    onSave = ($event: PointerEvent, r: HTTPResponse) => {
        debug('onSave -> received response:', r);
        emit('before-save');
        if (saveResource.value) {
            isLoading.value = false;
            httpStatus.value = r.httpStatus;
            if (!r.success) {
                showStoreMessage.value = true;
                emit('error', r.httpStatus);
                return;
            }
            showStoreMessage.value = true;
        }
        let emits: 'create' | 'update' = createMode.value ? 'create' : 'update';
        if (!createMode.value) {
            debug('onSave -> turn stored data into original');
            dataState.value.turnStoredIntoOriginal();
        }

        if (emits === 'create') {
            if (typeof props.onCreate === 'function') {
                debug('onSave -> trigger onCreate callback');
                props.onCreate(r);
                if (props.onCreateModalCallbacks.length > 0) {
                    debug('onSave -> has onCreateModalCallbacks');
                    props.onCreateModalCallbacks.forEach(cb => {
                        runModalCallback(cb);
                    });
                }
            }
        } else {
            if (typeof props.onUpdate === 'function') {
                debug('onSave -> trigger onUpdate callback');
                props.onUpdate(r);
                if (props.onUpdateModalCallbacks.length > 0) {
                    debug('onSave -> has onUpdateModalCallbacks');
                    props.onUpdateModalCallbacks.forEach(cb => {
                        runModalCallback(cb);
                    });
                }
            }
        }

        if (!props.insideModal && r.autoReloadId) {
            debug('onSave -> autoReloadId detected: ', r.autoReloadId);
            props.readData['id'] = r.autoReloadId;
            debug('onSave -> turning off create mode');
            createMode.value = false;
            fetchItem();
        }
        emit(emits, r)
    },
    onButtonLoading = () => {
        isLoading.value = true;
        httpStatus.value = -1;
    },
    onButtonLoaded = () => {
        isLoading.value = false;
    },
    doSave = () => {
        // @ts-ignore
        if (saveButton.value && typeof saveButton.value.click === 'function') saveButton.value.click();
    },
    doDrop = () => {
        // @ts-ignore
        if (dropButton.value && typeof dropButton.value.click === 'function') dropButton.value.click();
    }

defineExpose({
    doDrop,
    doRefresh: fetchItem,
    doSave
});

const showDropButton = computed(() => {
        if (!canUpdate.value && canDrop.value) return true;

        return !props.hiddenDrop
            && !isLoading.value
            && editMode.value
            && httpSuccessRead.value;
    }),
    showSaveButton = computed(() => {

        if (dataState.value.changed()) return true;
        if (isLoading.value) return false;

        if (createMode.value) return true;

        return !props.hiddenSave
            && editMode.value
            && httpSuccessRead.value;
    }),
    showSwitchButton = computed(() => {
        if (props.hideSwitchEdition) return false;
        if (!canUpdate.value && !canDrop.value) return false;
        if (!canUpdate.value && canDrop.value) return false;

        return !isLoading.value
            && !createMode.value
            && httpSuccessRead.value
            && !(props.dropDisabled && props.updateDisabled);
    }),
    showButtons = computed(() => {
        return !props.hiddenButtons && (showSaveButton.value || showDropButton.value || showSwitchButton.value);
    });
</script>

<template>
    <article class="lkt-item-crud">
        <header class="lkt-item-crud_header" v-if="displayHeader">
            <h1 class="lkt-item-crud_header-title">{{ title }}</h1>
            <div class="lkt-item-crud_header-slot">
                <slot name="post-title" v-bind:item="item" v-bind:loading="isLoading"></slot>
            </div>
        </header>
        <div class="lkt-item-crud-buttons" v-show="showButtons">
            <lkt-button
                :ref="(el:any) => dropButton = el"
                v-show="showDropButton"
                v-if="!createMode"
                palette="danger"
                v-bind:disabled="dropDisabled || !canDrop"
                v-bind:confirm-modal="dropConfirm"
                v-bind:confirm-data="dropConfirmData"
                v-bind:resource="dropResource"
                v-bind:resource-data="dropData"
                :text="slots['button-drop'] ? '' : dropText"
                :icon="slots['button-drop'] ? '' : dropIcon"
                v-on:loading="onButtonLoading"
                v-on:loaded="onButtonLoaded"
                v-on:click="onDrop">
                <slot v-if="!!slots['button-drop']" name="button-drop" v-bind:item="item"
                      v-bind:edit-mode="editMode"
                      v-bind:is-create="createMode"
                      v-bind:can-update="canUpdate"
                      v-bind:can-drop="canDrop"></slot>
            </lkt-button>

            <lkt-button
                :ref="(el:any) => saveButton = el"
                v-show="showSaveButton"
                palette="success"
                v-bind:disabled="!ableToSave"
                v-bind:confirm-modal="saveConfirm"
                v-bind:confirm-data="confirmData"
                v-bind:resource="saveResource"
                v-bind:resource-data="saveData"
                :text="slots['button-save'] ? '' : saveText"
                :icon="slots['button-save'] ? '' : saveIcon"
                v-on:loading="onButtonLoading"
                v-on:loaded="onButtonLoaded"
                v-on:click="onSave">
                <slot v-if="!!slots['button-save']" name="button-save" v-bind:item="item"
                      v-bind:edit-mode="editMode"
                      v-bind:is-create="createMode"
                      v-bind:can-update="canUpdate"
                      v-bind:can-drop="canDrop"></slot>
            </lkt-button>

            <lkt-field-switch
                v-show="showSwitchButton" v-model="editMode"
                :label="editModeText"></lkt-field-switch>
        </div>
        <div class="lkt-item-crud_content" v-if="!isLoading">
            <div v-if="httpSuccessRead" class="lkt-grid-1">
                <lkt-http-info :code="httpStatus" v-if="showStoreMessage" quick
                               :palette="httpStatus === 200 ? 'success' : 'danger'" can-close
                               v-on:close="showStoreMessage = false"></lkt-http-info>
                <slot name="item" v-bind:item="item" v-bind:loading="isLoading" v-bind:edit-mode="editMode"
                      v-bind:is-create="createMode"
                      v-bind:can-update="canUpdate"
                      v-bind:can-drop="canDrop"
                      v-bind:item-being-edited="itemBeingEdited"></slot>
            </div>
            <lkt-http-info :code="httpStatus" v-else></lkt-http-info>
        </div>
        <lkt-loader v-if="isLoading"></lkt-loader>
    </article>
</template>