<script setup lang="ts">
    import { ref, useSlots, watch } from 'vue';
    import { LktObject } from 'lkt-ts-interfaces';
    import { HTTPResponse } from 'lkt-http-client';

    const emit = defineEmits(['update:loading', 'update:editing', 'save', 'drop']);

    const props = withDefaults(defineProps<{
        item: LktObject,
        editing?: boolean
        loading?: boolean
        createMode?: boolean
        canUpdate?: boolean
        canDrop?: boolean
        showSwitchButton?: boolean
        showSaveButton?: boolean
        showDropButton?: boolean
        ableToSave?: boolean
        ableToDrop?: boolean
        saveConfirm?: string
        dropConfirm?: string
        confirmData?: LktObject
        dropConfirmData?: LktObject
        saveResource?: string
        dropResource?: string
        saveData?: LktObject
        dropData?: LktObject
        saveText?: string
        dropText?: string
        saveIcon?: string
        dropIcon?: string
        editModeText?: string

    }>(), {
        item: () => ({}),
        editing: false,
        isLoading: false,
        showSaveButton: false,
        ableToSave: false,
    });

    const slots = useSlots();

    const saveButton = ref(<HTMLButtonElement|null>null);
    const dropButton = ref(<HTMLButtonElement|null>null);

    const isLoading = ref(props.loading);
    watch(() => props.loading, v => isLoading.value = v);
    watch(isLoading, v => emit('update:loading', v));

    const isEditing = ref(props.editing);
    watch(() => props.editing, v => isEditing.value = v);
    watch(isEditing, v => emit('update:editing', v));

    const onButtonLoading = () => {
            isLoading.value = true;
        },
        onButtonLoaded = () => {
            isLoading.value = false;
        },
        onSave = ($event: Event, r: HTTPResponse) => {
            emit('save', $event, r);
        },
        onDrop = ($event: Event, r: HTTPResponse) => {
            emit('drop', $event, r);
        };

    const doSave = () => {
            if (saveButton.value && typeof saveButton.value.click === 'function') saveButton.value.click();
        },
        doDrop = () => {
            if (dropButton.value && typeof dropButton.value.click === 'function') dropButton.value.click();
        };

    defineExpose({
        doSave,
        doDrop,
    })

</script>

<template>
    <div class="lkt-item-crud-buttons">

        <div class="lkt-item-crud-buttons" v-if="slots['prev-buttons-ever']" v-show="!isLoading">
            <slot name="prev-buttons-ever" />
        </div>

        <div class="lkt-item-crud-buttons" v-if="slots['prev-buttons']" v-show="isEditing && !isLoading">
            <slot name="prev-buttons" />
        </div>

        <lkt-button
            ref="saveButton"
            v-if="showSaveButton"
            palette="success"
            :disabled="!ableToSave"
            :confirm-modal="saveConfirm"
            :confirm-data="confirmData"
            :resource="saveResource"
            :resource-data="saveData"
            :text="slots['button-save'] ? '' : saveText"
            :icon="slots['button-save'] ? '' : saveIcon"
            @loading="onButtonLoading"
            @loaded="onButtonLoaded"
            @click="onSave">
            <slot v-if="!!slots['button-save']" name="button-save" :item="item"
                  :edit-mode="isEditing"
                  :is-create="createMode"
                  :can-update="canUpdate"
                  :can-drop="canDrop"></slot>
        </lkt-button>

        <lkt-button
            ref="dropButton"
            v-show="showDropButton"
            v-if="!createMode"
            palette="danger"
            :disabled="!ableToDrop"
            :confirm-modal="dropConfirm"
            :confirm-data="dropConfirmData"
            :resource="dropResource"
            :resource-data="dropData"
            :text="slots['button-drop'] ? '' : dropText"
            :icon="slots['button-drop'] ? '' : dropIcon"
            @loading="onButtonLoading"
            @loaded="onButtonLoaded"
            @click="onDrop">
            <slot v-if="!!slots['button-drop']" name="button-drop" :item="item"
                  :edit-mode="isEditing"
                  :is-create="createMode"
                  :can-update="canUpdate"
                  :can-drop="canDrop"></slot>
        </lkt-button>

        <div class="lkt-item-crud-buttons" v-if="slots.buttons" v-show="isEditing && !isLoading">
            <slot name="buttons" />
        </div>

        <lkt-button
            v-if="showSwitchButton"
            v-model:checked="isEditing"
            class="lkt-item-crud--switch-mode-button"
            show-switch
            :text="editModeText" />
    </div>
</template>