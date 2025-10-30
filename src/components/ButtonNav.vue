<script setup lang="ts">
    import { computed, ref, SetupContext, useSlots, watch } from 'vue';
    import {
        ButtonConfig,
        ButtonType,
        ItemCrudButtonNavVisibility,
        ItemCrudMode, ItemCrudSaveConfig,
        ItemCrudView,
        LktObject,
        ModificationView,
    } from 'lkt-vue-kernel';
    import { HTTPResponse } from 'lkt-http-client';

    const emit = defineEmits([
        'update:loading',
        'update:editing',
        'update:pickedModificationView',
        'create',
        'save',
        'drop',
    ]);

    const props = withDefaults(defineProps<{
        item: LktObject,
        modifications: LktObject,
        editing?: boolean
        loading?: boolean
        grouped?: boolean

        view: ItemCrudView
        mode: ItemCrudMode

        createButton?: ButtonConfig | false
        createAndNewButton?: ButtonConfig | false
        updateButton?: ButtonConfig | false
        dropButton?: ButtonConfig | false
        editModeButton?: ButtonConfig | false
        groupButton?: ButtonConfig | boolean
        groupButtonAsModalActions?: boolean

        dataChanged: boolean

        ableToCreate?: boolean
        ableToCreateAndNew?: boolean
        ableToUpdate?: boolean
        ableToDrop?: boolean
        canCreate?: boolean
        canUpdate?: boolean
        canDrop?: boolean
        canSwitchEditMode?: boolean
        perms?: Array<string>

        httpSuccessRead?: boolean

        buttonNavVisibility: ItemCrudButtonNavVisibility
        modificationView?: boolean | Array<ModificationView>
        pickedModificationView: string
        editableView: ModificationView

        navStartButtons?: Array<ButtonConfig>
        navStartButtonsEditing?: Array<ButtonConfig>
        navEndButtons?: Array<ButtonConfig>
        navEndButtonsEditing?: Array<ButtonConfig>

        updateConfig: ItemCrudSaveConfig


    }>(), {
        item: () => ({}),
        modifications: () => ({}),
        editing: false,
        isLoading: false,
    });

    const selectedModificationView = ref(props.pickedModificationView);

    watch(() => props.pickedModificationView, v => selectedModificationView.value = v);
    watch(selectedModificationView, v => emit('update:pickedModificationView', v));

    const slots: SetupContext['slots'] = useSlots();

    const createButtonRef = ref(<HTMLButtonElement | null>null);
    const createAndNewButtonRef = ref(<HTMLButtonElement | null>null);
    const saveButtonRef = ref(<HTMLButtonElement | null>null);
    const dropButtonRef = ref(<HTMLButtonElement | null>null);

    const isLoading = ref(props.loading);
    watch(() => props.loading, v => isLoading.value = v);
    watch(isLoading, v => {
        if (props.updateConfig.executionMode === 'blocking') {
            emit('update:loading', v);
        }
    });

    const isEditing = ref(props.editing);
    watch(() => props.editing, v => isEditing.value = v);
    watch(isEditing, v => emit('update:editing', v));

    const onButtonLoading = () => {
            isLoading.value = true;
        },
        onButtonLoaded = () => {
            isLoading.value = false;
        },
        onCreate = ($event: Event | undefined, r: HTTPResponse) => {
            if (typeof $event === 'undefined') return;
            emit('create', $event, r);
        },
        onSave = ($event: Event | undefined, r: HTTPResponse) => {
            if (typeof $event === 'undefined') return;
            emit('save', $event, r);
        },
        onDrop = ($event: Event | undefined, r: HTTPResponse) => {
            if (typeof $event === 'undefined') return;
            emit('drop', $event, r);
        };

    const computedUpdateData = computed(() => {
        if (props.editableView === ModificationView.Modifications) return props.modifications;
        return props.item;
    })

    const doSave = () => {
            if (showSaveButton.value) {
                switch (props.mode) {
                    case ItemCrudMode.Update:
                        if (saveButtonRef.value && typeof saveButtonRef.value.click === 'function') saveButtonRef.value.click();
                        break;

                    case ItemCrudMode.Create:
                        if (createButtonRef.value && typeof createButtonRef.value.click === 'function') createButtonRef.value.click();
                        break;
                }
            }
        },
        doDrop = () => {
            if (dropButtonRef.value && typeof dropButtonRef.value.click === 'function') dropButtonRef.value.click();
        };

    defineExpose({
        doSave,
        doDrop,
    });


    const showDropButton = computed(() => {
            if (!props.canDrop || props.dropButton === false) return false;
            if (!props.canUpdate && props.canDrop) return true;

            return !isLoading.value
                && props.editing
                && props.httpSuccessRead;
        }),
        showSaveButton = computed(() => {
            if (props.mode === ItemCrudMode.Create && (props.createButton === false || !props.canCreate)) return false;
            if (props.mode === ItemCrudMode.Update && (props.updateButton === false || !props.canUpdate)) return false;
            if (isLoading.value) return false;

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
            if (props.buttonNavVisibility === ItemCrudButtonNavVisibility.Always) return true;
            if (slots['prev-buttons-ever']) return true;
            if (props.buttonNavVisibility === ItemCrudButtonNavVisibility.Never) return false;
            return showSaveButton.value || showDropButton.value || showSwitchButton.value;
        });

    const computedModificationView = computed(() => {
            if (props.modificationView === false) return [];
            if (props.modificationView === true) return [
                ModificationView.Current,
                ModificationView.Modifications,
                ModificationView.SplitView,
                ModificationView.Differences,
            ];
            if (Array.isArray(props.modificationView)) return props.modificationView;
            return [];
        }),
        computedModificationSplitButtons = computed(() => {

            let r = [];

            if (computedModificationView.value.includes(ModificationView.Current)) {
                r.push({
                    text: 'Current',
                    icon: 'lkt-icn-see',
                    disabled: selectedModificationView.value === ModificationView.Current,
                    events: {
                        click: () => {
                            selectedModificationView.value = ModificationView.Current;
                        }
                    }
                });
            }

            if (computedModificationView.value.includes(ModificationView.Modifications)) {
                r.push({
                    text: 'Modifications',
                    icon: 'lkt-icn-edit',
                    disabled: selectedModificationView.value === ModificationView.Modifications,
                    events: {
                        click: () => {
                            selectedModificationView.value = ModificationView.Modifications;
                        }
                    }
                });
            }

            if (computedModificationView.value.includes(ModificationView.SplitView)) {
                r.push({
                    text: 'Split View',
                    icon: 'lkt-icn-columns',
                    disabled: selectedModificationView.value === ModificationView.SplitView,
                    events: {
                        click: () => {
                            selectedModificationView.value = ModificationView.SplitView;
                        }
                    }
                });
            }

            if (computedModificationView.value.includes(ModificationView.Differences)) {

                r.push({
                    text: 'Differences',
                    icon: 'lkt-icn-balance',
                    disabled: selectedModificationView.value === ModificationView.Differences,
                    events: {
                        click: () => {
                            selectedModificationView.value = ModificationView.Differences;
                        }
                    }
                });
            }

            return r;
        });

</script>

<template>
    <div v-if="showButtons" class="lkt-item-crud-buttons">

        <template v-if="grouped && groupButtonAsModalActions">
            <lkt-button
                v-if="showSwitchButton"
                v-bind="editModeButton"
                v-model:checked="isEditing"
                class="lkt-item-crud--switch-mode-button" />

            <lkt-button
                v-if="computedModificationView.length > 0"
                v-bind="<ButtonConfig>{
                    type: ButtonType.Tooltip,
                    icon: 'lkt-icn-cross-arrows',
                    class: 'lkt-item-crud--modifications-button',
                    splitButtons: computedModificationSplitButtons,
                    tooltip: {
                        contentClass: 'lkt-flex-column',
                    }
                }"
            />

            <lkt-button v-for="btn in navStartButtons" v-bind="btn" v-show="!isLoading"/>

            <template v-if="slots['prev-buttons-ever']" v-show="!isLoading">
                <slot name="prev-buttons-ever"
                      :can-update="canUpdate"
                      :can-drop="canDrop"
                      :perms="perms"
                />
            </template>

            <lkt-button v-for="btn in navStartButtonsEditing" v-bind="btn" v-show="isEditing && !isLoading"/>

            <template v-if="slots['prev-buttons']" v-show="isEditing && !isLoading">
                <slot name="prev-buttons"
                      :can-update="canUpdate"
                      :can-drop="canDrop"
                      :perms="perms"
                />
            </template>

            <lkt-button
                ref="saveButtonRef"
                v-show="mode === ItemCrudMode.Update && showSaveButton"
                v-bind="{
                    ...updateButton,
                    resourceData: {
                        ...updateButton?.resourceData,
                        ...computedUpdateData
                    },
                    disabled: !ableToUpdate
                }"
                @loading="onButtonLoading"
                @loaded="onButtonLoaded"
                @click="onSave"
            />

            <lkt-button
                ref="createButtonRef"
                v-show="mode === ItemCrudMode.Create && showSaveButton"
                v-bind="{
                    ...createButton,
                    resourceData: {
                        ...createButton?.resourceData,
                        ...computedUpdateData
                    },
                    disabled: !ableToCreate
                }"
                @loading="onButtonLoading"
                @loaded="onButtonLoaded"
                @click="onCreate"
            />

            <lkt-button
                ref="createAndNewButtonRef"
                v-show="mode === ItemCrudMode.Create && showSaveButton && ableToCreateAndNew"
                v-bind="{
                    ...createAndNewButton,
                    resourceData: {
                        ...createAndNewButton?.resourceData,
                        ...computedUpdateData
                    },
                    disabled: !ableToCreate
                }"
                @loading="onButtonLoading"
                @loaded="onButtonLoaded"
                @click="onCreate"
            />

            <lkt-button
                ref="dropButtonRef"
                v-show="showDropButton && mode !== ItemCrudMode.Create"
                v-bind="dropButton"
                :disabled="!ableToDrop"
                @loading="onButtonLoading"
                @loaded="onButtonLoaded"
                @click="onDrop"
            />

            <template v-if="slots.buttons" v-show="isEditing && !isLoading">
                <slot name="buttons" />
            </template>

            <lkt-button v-for="btn in navEndButtons" v-bind="btn" v-show="!isLoading"/>

            <lkt-button v-for="btn in navEndButtonsEditing" v-bind="btn" v-show="isEditing && !isLoading"/>
        </template>
        <template v-else-if="grouped">
            <lkt-button
                ref="groupButton"
                v-bind="groupButton"
                class="lkt-item-crud-group-button"
            >
                <template #split>
                    <lkt-button
                        v-if="showSwitchButton"
                        v-bind="editModeButton"
                        v-model:checked="isEditing"
                        class="lkt-item-crud--switch-mode-button" />

                    <lkt-button
                        v-if="computedModificationView.length > 0"
                        v-bind="<ButtonConfig>{
                            type: ButtonType.Tooltip,
                            icon: 'lkt-icn-cross-arrows',
                            class: 'lkt-item-crud--modifications-button',
                            splitButtons: computedModificationSplitButtons,
                            tooltip: {
                                contentClass: 'lkt-flex-column',
                            }
                        }"
                    />

                    <lkt-button v-for="btn in navStartButtons" v-bind="btn" v-show="!isLoading"/>

                    <template v-if="slots['prev-buttons-ever']" v-show="!isLoading">
                        <slot name="prev-buttons-ever"
                              :can-update="canUpdate"
                              :can-drop="canDrop"
                              :perms="perms"
                        />
                    </template>

                    <lkt-button v-for="btn in navStartButtonsEditing" v-bind="btn" v-show="isEditing && !isLoading"/>

                    <template v-if="slots['prev-buttons']" v-show="isEditing && !isLoading">
                        <slot name="prev-buttons"
                              :can-update="canUpdate"
                              :can-drop="canDrop"
                              :perms="perms"
                        />
                    </template>

                    <lkt-button
                        ref="saveButtonRef"
                        v-show="mode === ItemCrudMode.Update && showSaveButton"
                        v-bind="{
                            ...updateButton,
                            resourceData: {
                                ...updateButton?.resourceData,
                                ...computedUpdateData
                            },
                            disabled: !ableToUpdate
                        }"
                        @loading="onButtonLoading"
                        @loaded="onButtonLoaded"
                        @click="onSave"
                    />

                    <lkt-button
                        ref="createButtonRef"
                        v-show="mode === ItemCrudMode.Create && showSaveButton"
                        v-bind="{
                            ...createButton,
                            resourceData: {
                                ...createButton?.resourceData,
                                ...computedUpdateData
                            },
                            disabled: !ableToCreate
                        }"
                        :disabled="!ableToCreate"
                        @loading="onButtonLoading"
                        @loaded="onButtonLoaded"
                        @click="onCreate"
                    />

                    <lkt-button
                        ref="createAndNewButtonRef"
                        v-show="mode === ItemCrudMode.Create && showSaveButton && ableToCreateAndNew"
                        v-bind="{
                            ...createAndNewButton,
                            resourceData: {
                                ...createAndNewButton?.resourceData,
                                ...computedUpdateData
                            },
                            disabled: !ableToCreate
                        }"
                        :disabled="!ableToCreate"
                        @loading="onButtonLoading"
                        @loaded="onButtonLoaded"
                        @click="onCreate"
                    />

                    <lkt-button
                        ref="dropButtonRef"
                        v-show="showDropButton && mode !== ItemCrudMode.Create"
                        v-bind="dropButton"
                        :disabled="!ableToDrop"
                        @loading="onButtonLoading"
                        @loaded="onButtonLoaded"
                        @click="onDrop"
                    />

                    <template v-if="slots.buttons" v-show="isEditing && !isLoading">
                        <slot name="buttons" />
                    </template>

                    <lkt-button v-for="btn in navEndButtons" v-bind="btn" v-show="!isLoading"/>

                    <lkt-button v-for="btn in navEndButtonsEditing" v-bind="btn" v-show="isEditing && !isLoading"/>
                </template>
            </lkt-button>
        </template>

        <template v-else>

            <lkt-button v-for="btn in navStartButtons" v-bind="btn" v-show="!isLoading"/>

            <div class="lkt-item-crud-buttons" v-if="slots['prev-buttons-ever']" v-show="!isLoading">
                <slot name="prev-buttons-ever"
                      :can-update="canUpdate"
                      :can-drop="canDrop"
                      :perms="perms"
                />
            </div>

            <lkt-button v-for="btn in navStartButtonsEditing" v-bind="btn" v-show="isEditing && !isLoading"/>

            <div class="lkt-item-crud-buttons" v-if="slots['prev-buttons']" v-show="isEditing && !isLoading">
                <slot name="prev-buttons"
                      :can-update="canUpdate"
                      :can-drop="canDrop"
                      :perms="perms"
                />
            </div>

            <lkt-button
                ref="saveButtonRef"
                v-show="mode === ItemCrudMode.Update && showSaveButton"
                v-bind="{
                    ...updateButton,
                    resourceData: {
                        ...updateButton?.resourceData,
                        ...computedUpdateData
                    },
                    disabled: !ableToUpdate
                }"
                @loading="onButtonLoading"
                @loaded="onButtonLoaded"
                @click="onSave"
            />

            <lkt-button
                ref="createButtonRef"
                v-show="mode === ItemCrudMode.Create && showSaveButton"
                v-bind="{
                    ...createButton,
                    resourceData: {
                        ...createButton?.resourceData,
                        ...computedUpdateData
                    },
                    disabled: !ableToCreate
                }"
                @loading="onButtonLoading"
                @loaded="onButtonLoaded"
                @click="onCreate"
            />

            <lkt-button
                ref="createAndNewButtonRef"
                v-show="mode === ItemCrudMode.Create && showSaveButton && ableToCreateAndNew"
                v-bind="{
                    ...createAndNewButton,
                    resourceData: {
                        ...createAndNewButton?.resourceData,
                        ...computedUpdateData
                    },
                    disabled: !ableToCreate
                }"
                @loading="onButtonLoading"
                @loaded="onButtonLoaded"
                @click="onCreate"
            />

            <lkt-button
                ref="dropButtonRef"
                v-show="showDropButton && mode !== ItemCrudMode.Create"
                v-bind="dropButton"
                :disabled="!ableToDrop"
                @loading="onButtonLoading"
                @loaded="onButtonLoaded"
                @click="onDrop"
            />

            <div class="lkt-item-crud-buttons" v-if="slots.buttons" v-show="isEditing && !isLoading">
                <slot name="buttons" />
            </div>

            <lkt-button v-for="btn in navEndButtons" v-bind="btn" v-show="!isLoading"/>

            <lkt-button v-for="btn in navEndButtonsEditing" v-bind="btn" v-show="isEditing && !isLoading"/>

            <lkt-button
                v-if="computedModificationView.length > 0"
                v-bind="<ButtonConfig>{
                    type: ButtonType.Tooltip,
                    icon: 'lkt-icn-cross-arrows',
                    class: 'lkt-item-crud--modifications-button',
                    splitButtons: computedModificationSplitButtons,
                    tooltip: {
                        contentClass: 'lkt-flex-column',
                    }
                }"
            />

            <lkt-button
                v-if="showSwitchButton"
                v-bind="editModeButton"
                v-model:checked="isEditing"
                class="lkt-item-crud--switch-mode-button" />

        </template>
    </div>
</template>