<script setup lang="ts">
    import { computed, ref, SetupContext, useSlots, watch } from 'vue';
    import {
        ButtonConfig,
        ensureButtonConfig,
        ItemCrudButtonNavVisibility,
        ItemCrudMode,
        ItemCrudView,
        LktObject,
        LktSettings,
    } from 'lkt-vue-kernel';
    import { HTTPResponse } from 'lkt-http-client';

    const emit = defineEmits([
        'update:loading',
        'update:editing',
        'create',
        'save',
        'drop',
    ]);

    const props = withDefaults(defineProps<{
        item: LktObject,
        editing?: boolean
        loading?: boolean

        view: ItemCrudView
        mode: ItemCrudMode

        createButton?: ButtonConfig|false
        updateButton?: ButtonConfig|false
        dropButton?: ButtonConfig|false
        editModeButton?: ButtonConfig|false

        dataChanged: boolean

        canUpdate?: boolean
        canDrop?: boolean
        canSwitchEditMode?: boolean

        httpSuccessRead?: boolean

        buttonNavVisibility: ItemCrudButtonNavVisibility
    }>(), {
        item: () => ({}),
        editing: false,
        isLoading: false,
    });

    const safeCreateButton = ref(ensureButtonConfig(props.createButton, LktSettings.defaultCreateButton)),
        safeUpdateButton = ref(ensureButtonConfig(props.updateButton, LktSettings.defaultUpdateButton)),
        safeDropButton = ref(ensureButtonConfig(props.dropButton, LktSettings.defaultDropButton)),
        safeEditModeButton = ref(ensureButtonConfig(props.editModeButton, LktSettings.defaultEditModeButton));

    watch(() => props.createButton, v => {
        safeCreateButton.value = ensureButtonConfig(v, LktSettings.defaultCreateButton);
    }, { deep: true });

    watch(() => props.updateButton, v => {
        safeUpdateButton.value = ensureButtonConfig(v, LktSettings.defaultUpdateButton);
    }, { deep: true });

    watch(() => props.dropButton, v => {
        safeDropButton.value = ensureButtonConfig(v, LktSettings.defaultDropButton);
    }, { deep: true });

    watch(() => props.editModeButton, v => {
        safeEditModeButton.value = ensureButtonConfig(v, LktSettings.defaultEditModeButton);
    }, { deep: true });

    const slots: SetupContext['slots'] = useSlots();

    const saveButtonRef = ref(<HTMLButtonElement | null>null);
    const dropButtonRef = ref(<HTMLButtonElement | null>null);

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
        onCreate = ($event: Event|undefined, r: HTTPResponse) => {
            if (typeof $event === 'undefined') return;
            emit('create', $event, r);
        },
        onSave = ($event: Event|undefined, r: HTTPResponse) => {
            if (typeof $event === 'undefined') return;
            emit('save', $event, r);
        },
        onDrop = ($event: Event|undefined, r: HTTPResponse) => {
            if (typeof $event === 'undefined') return;
            emit('drop', $event, r);
        };

    const doSave = () => {
            if (saveButtonRef.value && typeof saveButtonRef.value.click === 'function') saveButtonRef.value.click();
        },
        doDrop = () => {
            if (dropButtonRef.value && typeof dropButtonRef.value.click === 'function') dropButtonRef.value.click();
        };

    defineExpose({
        doSave,
        doDrop,
    });


    const ableToUpdate = computed(() => {
            if (props.mode !== ItemCrudMode.Create && !props.canUpdate) return false;
            if (!props.dataChanged) return false;

            if (typeof safeUpdateButton.value?.disabled === 'function') return !safeUpdateButton.value.disabled(props.item);
            if (typeof safeUpdateButton.value?.disabled === 'boolean') return !safeUpdateButton.value.disabled;

            return true;
        }),
        ableToCreate = computed(() => {
            if (props.mode !== ItemCrudMode.Create) return false;
            if (!props.dataChanged) return false;

            if (typeof safeCreateButton.value?.disabled === 'function') return !safeCreateButton.value.disabled(props.item);
            if (typeof safeCreateButton.value?.disabled === 'boolean') return !safeCreateButton.value.disabled;

            return true;
        }),
        ableToDrop = computed(() => {

            if (!props.canDrop) return false;

            if (typeof safeDropButton.value?.disabled === 'function') return !safeDropButton.value.disabled(props.item);
            if (typeof safeDropButton.value?.disabled === 'boolean') return !safeDropButton.value.disabled;

            return true;
        }),
        showDropButton = computed(() => {
            if (!props.canDrop || props.dropButton === false) return false;
            if (!props.canUpdate && props.canDrop) return true;

            return !isLoading.value
                && props.editing
                && props.httpSuccessRead;
        }),
        showSaveButton = computed(() => {
            if (props.mode === ItemCrudMode.Create && props.createButton === false) return false;
            if (props.mode === ItemCrudMode.Update && props.updateButton === false) return false;
            if (props.dataChanged) return true;
            if (isLoading.value) return false;

            if (props.mode === ItemCrudMode.Create) {
                return true;
            }

            if (props.buttonNavVisibility === ItemCrudButtonNavVisibility.Never) {
                return false;
            }

            return props.editing
                && props.httpSuccessRead;
        }),
        showSwitchButton = computed(() => {
            if (props.editModeButton === false) return false;
            if (!props.canSwitchEditMode) return false;
            if (!props.canUpdate && !props.canDrop) return false;
            if (!props.canUpdate && props.canDrop) return false;

            return !isLoading.value
                && props.mode !== ItemCrudMode.Create
                && props.httpSuccessRead;
        }),
        showButtons = computed(() => {
            if (props.buttonNavVisibility === ItemCrudButtonNavVisibility.Always && (ableToUpdate.value || ableToCreate.value || ableToDrop.value)) return true;
            if (slots['prev-buttons-ever']) return true;
            if (props.buttonNavVisibility === ItemCrudButtonNavVisibility.Never) return false;
            return showSaveButton.value || showDropButton.value || showSwitchButton.value;
        });

</script>

<template>
    <div v-if="showButtons" class="lkt-item-crud-buttons">

        <div class="lkt-item-crud-buttons" v-if="slots['prev-buttons-ever']" v-show="!isLoading">
            <slot name="prev-buttons-ever" />
        </div>

        <div class="lkt-item-crud-buttons" v-if="slots['prev-buttons']" v-show="isEditing && !isLoading">
            <slot name="prev-buttons" />
        </div>

        <lkt-button
            ref="saveButtonRef"
            v-if="mode === ItemCrudMode.Update && showSaveButton"
            v-bind="safeUpdateButton"
            :disabled="!ableToUpdate"
            @loading="onButtonLoading"
            @loaded="onButtonLoaded"
            @click="onSave">
            <slot v-if="!!slots['button-save']" name="button-save" :item="item"
                  :edit-mode="isEditing"
                  :is-create="false"
                  :can-update="canUpdate"
                  :can-drop="canDrop" />
        </lkt-button>

        <lkt-button
            ref="saveButtonRef"
            v-else-if="mode === ItemCrudMode.Create && showSaveButton"
            v-bind="safeCreateButton"
            :disabled="!ableToCreate"
            @loading="onButtonLoading"
            @loaded="onButtonLoaded"
            @click="onCreate">
            <slot v-if="!!slots['button-save']" name="button-save" :item="item"
                  :edit-mode="isEditing"
                  :is-create="true"
                  :can-update="canUpdate"
                  :can-drop="canDrop" />
        </lkt-button>

        <lkt-button
            ref="dropButtonRef"
            v-show="showDropButton"
            v-if="mode !== ItemCrudMode.Create"
            v-bind="safeDropButton"
            :disabled="!ableToDrop"
            @loading="onButtonLoading"
            @loaded="onButtonLoaded"
            @click="onDrop">
            <slot v-if="!!slots['button-drop']" name="button-drop" :item="item"
                  :edit-mode="isEditing"
                  :is-create="false"
                  :can-update="canUpdate"
                  :can-drop="canDrop" />
        </lkt-button>

        <div class="lkt-item-crud-buttons" v-if="slots.buttons" v-show="isEditing && !isLoading">
            <slot name="buttons" />
        </div>

        <lkt-button
            v-if="showSwitchButton"
            v-bind="safeEditModeButton"
            v-model:checked="isEditing"
            class="lkt-item-crud--switch-mode-button" />
    </div>
</template>