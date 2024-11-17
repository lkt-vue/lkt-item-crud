<script setup lang="ts">
    import { computed, nextTick, ref, useSlots, watch } from 'vue';
    import { httpCall, HTTPResponse } from 'lkt-http-client';
    import { DataState } from 'lkt-data-state';
    import { debug } from '../functions/debug';
    import { LktObject } from 'lkt-ts-interfaces';
    import { ModalCallbackConfig } from '../types/ModalCallbackConfig';
    import { runModalCallback } from '../functions/modalCallbacks';
    import { __ } from 'lkt-i18n';
    import { Settings } from '../settings/Settings';
    import ButtonNav from '../components/ButtonNav.vue';
    import { ButtonNavPosition } from '../enums/ButtonNavPosition';
    import { ButtonNavVisibility } from '../enums/ButtonNavVisibility';

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
        beforeEmitUpdate: Function | undefined
        onCreate: Function | undefined
        onUpdate: Function | undefined
        insideModal: boolean
        hideSwitchEdition: boolean
        dataStateConfig: LktObject
        onCreateModalCallbacks: ModalCallbackConfig[]
        onUpdateModalCallbacks: ModalCallbackConfig[]
        onDropModalCallbacks: ModalCallbackConfig[]
        editing: boolean
        buttonNavPosition?: ButtonNavPosition
        buttonNavVisibility?: ButtonNavVisibility

        // Modal props
        size: string
        preTitle: string
        showClose: boolean
        disabledClose: boolean
        disabledVeilClick: boolean
        modalName: string
        modalKey: string
        zIndex: number
        editedCloseConfirm: string
        editedCloseConfirmKey: string | number
        beforeClose: Function | undefined

    }>(), {
        modelValue: () => ({}),
        title: '',
        editModeText: 'Edition Mode',
        saveText: 'Save',
        dropText: 'Delete',
        saveIcon: () => Settings.defaultSaveIcon,
        dropIcon: () => Settings.defaultDropIcon,
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
        buttonNavPosition: ButtonNavPosition.Top,
        buttonNavVisibility: ButtonNavVisibility.Changed,

        // Modal props
        size: '',
        preTitle: '',
        showClose: true,
        disabledClose: false,
        disabledVeilClick: false,
        modalName: '',
        modalKey: '_',
        zIndex: 500,
        editedCloseConfirm: '',
        editedCloseConfirmKey: '_',
        beforeClose: undefined,
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

    const buttonNav = ref(null);

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
                return { ...props.createData, ...JSON.parse(JSON.stringify(item.value)) };
            }
            return { ...props.updateData, ...JSON.parse(JSON.stringify(item.value)) };
        }),
        saveDisabled = computed(() => {
            return createMode.value
                ? props.createDisabled
                : props.updateDisabled;
        }),
        canUpdate = computed(() => !createMode.value && Array.isArray(perms.value) && perms.value.includes('update')),
        canDrop = computed(() => !createMode.value && Array.isArray(perms.value) && perms.value.includes('drop'));

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
    };


    watch(() => props.modelValue, v => {
        item.value = v;
        dataState.value.increment(v);
    }, { deep: true });

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
        nextTick(() => itemBeingEdited.value = false);
    }, { deep: true });

    watch(perms, () => emit('perms', perms.value));

    const ableToSave = computed(() => {
        if (saveDisabled.value) return false;
        if (!createMode.value && !canUpdate.value) return false;

        if (typeof props.saveValidator === 'function' && !props.saveValidator(item.value)) return false;

        return dataState.value.changed();
    });

    const ableToDrop = computed(() => {
        return !props.dropDisabled && canDrop.value;
    });
    watch(ableToSave, (v) => emit('modified-data', v));
    watch(createMode, (v) => emit('update:isCreate', v));

    watch(() => props.readData, v => {
        readDataState.value.increment(v);
        if (readDataState.value.changed()) fetchItem();
    });

    watch(() => props.editing, v => {
        debug('editing updated -> updating editMode', v);
        editMode.value = v;
    });
    watch(editMode, (v) => {
        debug('editMode updated -> emit update', v);
        emit('update:editing', v);
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
            emit('drop', r);
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
            emit(emits, r);
        },
        doSave = () => {
            // @ts-ignore
            if (buttonNav.value) saveButton.value.doSave();
        },
        doDrop = () => {
            // @ts-ignore
            if (buttonNav.value) dropButton.value.doDrop();
        };

    defineExpose({
        doDrop,
        doRefresh: fetchItem,
        doSave,
        hasModifiedData: () => dataState.value.changed(),
    });


    const closeConfirm = computed(() => {
        return dataState.value.changed() ? props.editedCloseConfirm : '';
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

            if (props.buttonNavVisibility === ButtonNavVisibility.Always) {
                return ableToSave.value;
            }

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
            if (props.buttonNavVisibility === ButtonNavVisibility.Always && (ableToSave.value || ableToDrop.value)) return true;
            if (slots['prev-buttons-ever']) return true;
            return !props.hiddenButtons && (showSaveButton.value || showDropButton.value || showSwitchButton.value);
        }),
        computedTitle = computed(() => {
            if (props.title.startsWith('__:')) {
                return String(__(props.title.substring(3)));
            }
            return props.title;
        }),
        displayHeader = computed(() => {
            if (isLoading.value) return false;

            return computedTitle.value.length > 0 || !!slots['post-title'];
        }),
        computedContainerTag = computed(() => {
            if (props.insideModal) return 'lkt-modal';
            return 'section';
        }),
        computedContainerAttrs = computed(() => {
            if (computedContainerTag.value === 'lkt-modal') {
                return {
                    'modal-name': props.modalName,
                    'modal-key': props.modalKey,
                    'z-index': props.zIndex,
                    'pre-title': props.preTitle,
                    'show-close': props.showClose,
                    'before-close': props.beforeClose,
                    'disabled-close': props.disabledClose,
                    'disabled-veil-click': props.disabledVeilClick,
                    'close-confirm': closeConfirm.value,
                    'close-confirm-key': props.editedCloseConfirmKey,
                    title: props.title,
                    size: props.size,
                };
            }
            return {};
        });
</script>

<template>
    <component
        :is="computedContainerTag"
        v-bind="computedContainerAttrs"
    >
        <article class="lkt-item-crud">
            <header class="lkt-item-crud_header" v-if="!insideModal && displayHeader">
                <div class="lkt-item-crud_header-slot" v-if="slots['pre-title']">
                    <slot name="pre-title" :item="item" :loading="isLoading"/>
                </div>
                <h1 class="lkt-item-crud_header-title" v-if="computedTitle.length > 0">{{ computedTitle }}</h1>
                <div class="lkt-item-crud_header-slot" v-if="slots['post-title']">
                    <slot name="post-title" :item="item" :loading="isLoading"/>
                </div>
            </header>

            <button-nav
                ref="buttonNav"
                v-if="showButtons && buttonNavPosition === 'top'"
                v-model:loading="isLoading"
                v-model:editing="editMode"
                :item="item"
                :create-mode="createMode"
                :can-update="canUpdate"
                :can-drop="canDrop"
                :show-switch-button="showSwitchButton"
                :show-save-button="showSaveButton"
                :show-drop-button="showDropButton"
                :able-to-save="ableToSave"
                :able-to-drop="ableToDrop"
                :save-confirm="saveConfirm"
                :drop-confirm="dropConfirm"
                :confirm-data="confirmData"
                :drop-confirm-data="dropConfirmData"
                :save-resource="saveResource"
                :drop-resource="dropResource"
                :save-data="saveData"
                :drop-data="dropData"
                :save-text="saveText"
                :drop-text="dropText"
                :save-icon="saveIcon"
                :drop-icon="dropIcon"
                :edit-mode-text="editModeText"
                @save="onSave"
                @drop="onDrop"
            >
                <template #prev-buttons-ever v-if="slots['prev-buttons-ever']">
                    <slot name="prev-buttons-ever" />
                </template>
                <template #prev-buttons-ever v-if="slots['prev-buttons']">
                    <slot name="prev-buttons" />
                </template>
            </button-nav>

            <div class="lkt-item-crud_content" v-if="!isLoading">
                <div v-if="httpSuccessRead" class="lkt-grid-1">
                    <lkt-http-info :code="httpStatus" v-if="showStoreMessage" quick
                                   :palette="httpStatus === 200 ? 'success' : 'danger'" can-close
                                   v-on:close="showStoreMessage = false"/>
                    <slot name="item" :item="item" :loading="isLoading" :edit-mode="editMode"
                          :is-create="createMode"
                          :can-update="canUpdate"
                          :can-drop="canDrop"
                          :item-being-edited="itemBeingEdited"></slot>
                </div>
                <lkt-http-info :code="httpStatus" v-else/>
            </div>
            <lkt-loader v-if="isLoading" />

            <button-nav
                ref="buttonNav"
                v-if="buttonNavPosition === ButtonNavPosition.Bottom"
                v-show="showButtons"
                v-model:loading="isLoading"
                v-model:editing="editMode"
                :item="item"
                :create-mode="createMode"
                :can-update="canUpdate"
                :can-drop="canDrop"
                :show-switch-button="showSwitchButton"
                :show-save-button="showSaveButton"
                :show-drop-button="showDropButton"
                :able-to-save="ableToSave"
                :able-to-drop="ableToDrop"
                :save-confirm="saveConfirm"
                :drop-confirm="dropConfirm"
                :confirm-data="confirmData"
                :drop-confirm-data="dropConfirmData"
                :save-resource="saveResource"
                :drop-resource="dropResource"
                :save-data="saveData"
                :drop-data="dropData"
                :save-text="saveText"
                :drop-text="dropText"
                :save-icon="saveIcon"
                :drop-icon="dropIcon"
                :edit-mode-text="editModeText"
                @save="onSave"
                @drop="onDrop"
            >
                <template #prev-buttons-ever v-if="slots['prev-buttons-ever']">
                    <slot name="prev-buttons-ever" />
                </template>
                <template #prev-buttons-ever v-if="slots['prev-buttons']">
                    <slot name="prev-buttons" />
                </template>
            </button-nav>
        </article>
    </component>
</template>