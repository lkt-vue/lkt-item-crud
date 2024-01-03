<script lang="ts">
export default {name: "LktItemCrud", inheritAttrs: false}
</script>

<script setup lang="ts">
import {ref, watch, useSlots, computed} from "vue";
import {httpCall, HTTPResponse} from "lkt-http-client";
import {DataState} from "lkt-data-state";

const props = defineProps({
    modelValue: {type: Object, required: false, default: () => ({})},
    title: {type: String, default: ''},

    editModeText: {type: String, default: 'Edition Mode'},
    saveText: {type: String, default: 'Save'},
    dropText: {type: String, default: 'Delete'},

    readResource: {type: String, required: true},
    createResource: {type: String, required: false},
    updateResource: {type: String, required: false},
    dropResource: {type: String, required: false},

    readData: {type: Object, required: false, default: () => ({})},
    createData: {type: Object, required: false, default: () => ({})},
    updateData: {type: Object, required: false, default: () => ({})},
    dropData: {type: Object, required: false, default: () => ({})},

    isCreate: {type: Boolean, default: false},
    createConfirm: {type: String, default: ''},
    updateConfirm: {type: String, default: ''},
    dropConfirm: {type: String, default: ''},

    createDisabled: {type: Boolean, default: false},
    updateDisabled: {type: Boolean, default: false},
    dropDisabled: {type: Boolean, default: false},

    saveValidator: {type: Function, required: false, default: () => true},
});

const slots = useSlots();

const emit = defineEmits(['update:modelValue', 'read', 'create', 'update', 'drop', 'perms', 'error', 'modified-data']);

let basePerms: string[] = [];

const isLoading = ref(true),
    item = ref(props.modelValue),
    perms = ref(basePerms),
    editMode = ref(false),
    httpSuccessRead = ref(false),
    showStoreMessage = ref(false),
    httpStatus = ref(200),
    saveButton = ref(null),
    dropButton = ref(null),
    dataState = ref(new DataState(item.value));

const saveConfirm = computed(() => {
        return props.isCreate
            ? props.createConfirm
            : props.updateConfirm;
    }),
    saveResource = computed(() => {
        return props.isCreate
            ? props.createResource
            : props.updateResource;
    }),
    saveData = computed(() => {
        return props.isCreate
            ? props.createData
            : props.updateData;
    }),
    saveDisabled = computed(() => {
        return props.isCreate
            ? props.createDisabled
            : props.updateDisabled;
    })

const fetchItem = async () => {
    isLoading.value = true;
    httpStatus.value = -1;
    try {
        const r = await httpCall(props.readResource, props.readData);
        isLoading.value = false;
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
    emit('update:modelValue', item.value);
    dataState.value.increment(v);
}, {deep: true});

watch(perms, () => emit('perms', perms.value));

const ableToSave = computed(() => {
    if (saveDisabled.value) return false;

    if (typeof props.saveValidator === 'function' && !props.saveValidator(item.value)) return false;

    return dataState.value.changed();
});
watch(ableToSave, (v) => emit('modified-data', v));

// Fetch item
if (props.readResource && !props.isCreate) fetchItem();
else if (props.isCreate) {
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
        emit('drop', r)

    },
    onSave = ($event: PointerEvent, r: HTTPResponse) => {
        isLoading.value = false;
        httpStatus.value = r.httpStatus;
        if (!r.success) {
            showStoreMessage.value = true;
            emit('error', r.httpStatus);
            return;
        }
        showStoreMessage.value = true;
        let emits: 'create' | 'update' = props.isCreate ? 'create' : 'update';
        if (!props.isCreate) {
            dataState.value.turnStoredIntoOriginal();
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
</script>

<template>
    <article class="lkt-item-crud">
        <header class="lkt-item-crud_header" v-if="displayHeader">
            <h1 class="lkt-item-crud_header-title">{{ title }}</h1>
            <div class="lkt-item-crud_header-slot">
                <slot name="post-title" v-bind:item="item" v-bind:loading="isLoading"></slot>
            </div>
        </header>
        <div class="lkt-item-crud-buttons" v-show="httpSuccessRead">
            <lkt-button
                :ref="(el:any) => dropButton = el"
                v-show="!isLoading && editMode && httpSuccessRead"
                v-if="!isCreate"
                palette="danger"
                v-bind:disabled="dropDisabled"
                v-bind:confirm-modal="dropConfirm"
                v-bind:resource="dropResource"
                v-bind:resource-data="dropData"
                v-on:loading="onButtonLoading"
                v-on:loaded="onButtonLoaded"
                v-on:click="onDrop">
                <slot v-if="!!slots['button-drop']" name="button-drop" v-bind:item="item"
                      v-bind:edit-mode="editMode"></slot>
                <span v-else>{{ dropText }}</span>
            </lkt-button>

            <lkt-button
                :ref="(el:any) => saveButton = el"
                v-show="!isLoading && editMode && httpSuccessRead"
                palette="success"
                v-bind:disabled="!ableToSave"
                v-bind:confirm-modal="saveConfirm"
                v-bind:resource="saveResource"
                v-bind:resource-data="saveData"
                v-on:loading="onButtonLoading"
                v-on:loaded="onButtonLoaded"
                v-on:click="onSave">
                <slot v-if="!!slots['button-save']" name="button-save" v-bind:item="item"
                      v-bind:edit-mode="editMode"></slot>
                <span v-else>{{ saveText }}</span>
            </lkt-button>

            <lkt-field-switch
                v-show="!isLoading && httpSuccessRead && !isCreate" v-model="editMode"
                :label="editModeText"></lkt-field-switch>
        </div>
        <div class="lkt-item-crud_content" v-if="!isLoading">
            <div v-if="httpSuccessRead" class="lkt-grid-1">
                <lkt-http-info :code="httpStatus" v-if="showStoreMessage" quick
                               :palette="httpStatus === 200 ? 'success' : 'danger'" can-close
                               v-on:close="showStoreMessage = false"></lkt-http-info>
                <slot name="item" v-bind:item="item" v-bind:loading="isLoading" v-bind:edit-mode="editMode"></slot>
            </div>
            <lkt-http-info :code="httpStatus" v-else></lkt-http-info>
        </div>
        <lkt-loader v-if="isLoading"></lkt-loader>
    </article>
</template>