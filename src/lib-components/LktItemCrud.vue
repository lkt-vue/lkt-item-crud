<script setup lang="ts">
    import { computed, nextTick, onMounted, ref, SetupContext, useSlots, watch } from 'vue';
    import { httpCall, HTTPResponse } from 'lkt-http-client';
    import { DataState } from 'lkt-data-state';
    import { debug } from '../functions/debug';
    import {
        ButtonConfig,
        ensureButtonConfig,
        extractI18nValue,
        FormUiConfig,
        getDefaultValues,
        getFormDataState,
        getFormSlotKeys,
        ItemCrud,
        ItemCrudButtonNavPosition,
        ItemCrudConfig,
        ItemCrudMode,
        ItemCrudView,
        LktObject,
        LktSettings,
        ModalConfig,
        ModificationView,
        NotificationType,
        TablePermission,
        ToastConfig,
        ToastPositionX,
    } from 'lkt-vue-kernel';
    import { closeModal, updateModalKey } from 'lkt-modal';
    import ButtonNav from '../components/ButtonNav.vue';
    import { openToast } from 'lkt-toast';
    import { useRouter } from 'vue-router';

    // defineOptions({
    //     inheritAttrs: false
    // })

    const props = withDefaults(defineProps<ItemCrudConfig>(), getDefaultValues(ItemCrud));

    const router = useRouter();

    const slots: SetupContext['slots'] = useSlots();

    const emit = defineEmits([
        'update:modelValue',
        'update:editing',
        'update:perms',
        'update:customData',
        'update:modifications',
        'update:visibleView',
        'read',
        'create',
        'update',
        'drop',
        'before-save',
        'perms',
        'error',
        'modified-data',
    ]);

    const isLoading = ref(true),
        item = ref(props.modelValue),
        itemModifications = ref(props.modifications),
        custom = ref(props.customData),
        permissions = ref(props.perms),
        editMode = ref(props.editing),
        validForm = ref(false),
        changedForm = ref(false),
        httpSuccessRead = ref(false),
        showStoreMessage = ref(false),
        httpStatus = ref(200),
        dataState = ref(new DataState(item.value, props.dataStateConfig)),
        modificationsDataState = ref(new DataState(itemModifications.value, props.dataStateConfig)),
        dataChanged = ref(false),
        readDataState = ref(new DataState(props.readData)),
        createMode = ref(props.mode === ItemCrudMode.Create),
        itemBeingEdited = ref(false),
        itemCreated = ref(false),
        buttonNav = ref(null),
        formRef = ref(null),
        canCreate = computed(() => createMode.value && props.createButton !== false && Array.isArray(permissions.value) && permissions.value.includes(TablePermission.Create)),
        canUpdate = computed(() => !createMode.value && props.updateButton !== false && Array.isArray(permissions.value) && permissions.value.includes(TablePermission.Update)),
        canDrop = computed(() => !createMode.value && props.dropButton !== false && Array.isArray(permissions.value) && permissions.value.includes(TablePermission.Drop)),
        canSwitchEditMode = computed(() => props.editModeButton !== false && !createMode.value && Array.isArray(permissions.value) && permissions.value.includes(TablePermission.SwitchEditMode));

    const pickedModificationView = ref(props.visibleView);

    watch(() => props.visibleView, (v) => {
        pickedModificationView.value = v
    });

    watch(pickedModificationView, (v) => {
        emit('update:visibleView', v);
    })

    watch(() => props.mode, (v) => {
        createMode.value = v === ItemCrudMode.Create;
    })

    watch(() => props.perms, (v) => {permissions.value = v});
    watch(permissions, (v) => {emit('update:perms', v)});

    watch(() => props.customData, (v) => {custom.value = v});
    watch(custom, (v) => {emit('update:customData', v)});

    watch(() => props.modifications, (v) => {
        modificationsDataState.value.increment(v);
        itemModifications.value = v
    }, {deep: true});

    watch(itemModifications, (v) => {
        resetFormDifferencesChecker();
        modificationsDataState.value.increment(v);

        if (computedEditableView.value === ModificationView.Modifications) {
            dataChanged.value = modificationsDataState.value.changed();
        }
        emit('update:modifications', v)
    }, {deep: true});

    const safeCreateButton = ref(ensureButtonConfig(props.createButton, LktSettings.defaultCreateButton)),
        safeCreateAndNewButton = ref(ensureButtonConfig(props.createAndNewButton, props.createButton)),
        safeUpdateButton = ref(ensureButtonConfig(props.updateButton, LktSettings.defaultUpdateButton)),
        safeDropButton = ref(ensureButtonConfig(props.dropButton, LktSettings.defaultDropButton)),
        safeEditModeButton = ref(ensureButtonConfig(props.editModeButton, LktSettings.defaultEditModeButton)),
        safeGroupButton = ref(ensureButtonConfig(props.groupButton, LktSettings.defaultGroupButton));

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

    const fetchItem = async () => {
        debug('fetchItem');
        isLoading.value = true;
        httpStatus.value = -1;
        showStoreMessage.value = false;

        if (typeof props.events?.httpStart === 'function') {
            props.events.httpStart();
        }

        try {
            const r: HTTPResponse = await httpCall(props.readResource, props.readData);
            debug('fetchItem -> response', r);
            isLoading.value = false;
            httpStatus.value = r.httpStatus;
            custom.value = r.custom;
            if (!r.success) {
                httpSuccessRead.value = false;
                httpStatus.value = r.httpStatus;

                if (typeof props.events?.httpEnd === 'function') {
                    props.events.httpEnd({
                        httpResponse: r,
                    });
                }
                emit('error', r.httpStatus);
                return;
            }
            httpSuccessRead.value = true;
            item.value = r.data;
            itemModifications.value = Array.isArray(r.modifications) ? {} : r.modifications;
            permissions.value = r.perms;
            dataState.value.increment(item.value).turnStoredIntoOriginal();
            modificationsDataState.value.increment(itemModifications.value).turnStoredIntoOriginal();
            dataChanged.value = dataState.value.changed();
            readDataState.value.turnStoredIntoOriginal();

            if (Object.keys(itemModifications.value).length > 0) {
                pickedModificationView.value = ModificationView.Modifications;
            }

            if (computedHasForm.value) {
                resetFormDifferencesChecker();
                nextTick(() => {
                    formRef.value.turnStoredIntoOriginal();
                })
            }

            if (typeof props.events?.httpEnd === 'function') {
                props.events.httpEnd({
                    httpResponse: r,
                });
            }
            emit('read', r);

        } catch (e) {
            isLoading.value = false;
            httpSuccessRead.value = false;
            httpStatus.value = 404;
            emit('error', 404);
            return;
        }
    };

    watch(itemBeingEdited, (v) => {
        if (v) nextTick(() => itemBeingEdited.value = false);
    })


    watch(() => props.modelValue, v => {
        item.value = v;
        dataState.value.increment(v);
    }, { deep: true });

    watch(item, (v) => {
        debug('item updated ->', item.value);
        if (typeof props.beforeEmitUpdate === 'function') {
            debug('item updated -> has beforeEmitUpdate');
            let override = props.beforeEmitUpdate(item.value);
            debug('item updated -> override with: ', override);
            if (typeof override === 'object') item.value = override;
        }
        if (computedHasForm.value) {
            resetFormDifferencesChecker();
        }
        emit('update:modelValue', item.value);
        debug('item updated -> update dataState');
        dataState.value.increment(v);
        if (computedEditableView.value === ModificationView.Current) {
            dataChanged.value = dataState.value.changed();
            debug('item updated -> dataState changed');
        }
        itemBeingEdited.value = true;
    }, { deep: true });

    watch(permissions, () => emit('perms', permissions.value));
    watch(dataChanged, (v) => {
        emit('modified-data', v);
    });

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

    const formDifferencesChecker = ref(undefined);
    const resetFormDifferencesChecker = () => {
        if (computedHasForm.value) {
            formDifferencesChecker.value = getFormDataState(item.value, itemModifications.value, computedForm.value);
        }
    }

    onMounted(() => {
        // Fetch item
        if (props.readResource && !createMode.value) fetchItem();
        else if (createMode.value) {
            httpSuccessRead.value = true;
            editMode.value = true;
            isLoading.value = false;
            dataState.value.increment(item.value).turnStoredIntoOriginal();
            dataChanged.value = dataState.value.changed();
        }
        // Offline mode
        else {
            httpSuccessRead.value = true;
            editMode.value = true;
            isLoading.value = false;
            dataState.value.increment(item.value).turnStoredIntoOriginal();
            dataChanged.value = dataState.value.changed();
        }
    });

    const ensureValidResourceSave = (r: HTTPResponse, resource?: string) => {
            if (resource) {
                isLoading.value = false;
                if (typeof r !== 'undefined') {
                    httpStatus.value = r.httpStatus;
                    if (!r.success) {
                        showStoreMessage.value = true;
                        emit('error', r.httpStatus);
                        return false;
                    }
                }
                showStoreMessage.value = true;
            }
            return true;
        },
        doAutoReloadId = (r?: HTTPResponse, redirect?: string|Function) => {
            debug('doAutoReloadId -> enter: ', r);
            if (typeof r !== 'undefined' && r.autoReloadId) {
                debug('doAutoReloadId -> autoReloadId detected: ', r.autoReloadId);
                if (typeof redirect !== 'undefined') {
                    let route = redirect;
                    if (typeof redirect === 'function') route = redirect(r.autoReloadId);
                    router.push(route);
                }
                else if (!computedInsideModal.value) {
                    debug('doAutoReloadId -> outsideModal');
                    props.readData['id'] = r.autoReloadId;
                    debug('doAutoReloadId -> turning off create mode');
                    createMode.value = false;
                    fetchItem();
                } else {
                    debug('doAutoReloadId -> insideModal: ', props);
                    updateModalKey(props.modalConfig.modalName, props.modalConfig.modalKey, r.autoReloadId);
                }
            }
        },
        onCreate = ($event: PointerEvent, r: HTTPResponse) => {
            debug('onCreate');
            if (!ensureValidResourceSave(r, safeCreateButton.value.resource)) {
                if (props.notificationType === NotificationType.Toast) {
                    openToast(<ToastConfig>{
                        text: LktSettings.defaultCreateErrorText,
                        details: LktSettings.defaultCreateErrorDetails,
                        icon: LktSettings.defaultCreateErrorIcon,
                        positionX: ToastPositionX.Right,
                        ...r.toast,
                    });
                }
                return;
            }
            itemCreated.value = true;
            debug('onCreate -> turn stored data into original');
            dataState.value.increment(item.value).turnStoredIntoOriginal();
            modificationsDataState.value.turnStoredIntoOriginal();
            if (props.notificationType === NotificationType.Toast) {
                openToast(<ToastConfig>{
                    text: LktSettings.defaultCreateSuccessText,
                    details: LktSettings.defaultCreateSuccessDetails,
                    icon: LktSettings.defaultCreateSuccessIcon,
                    positionX: ToastPositionX.Right,
                    ...r.toast,
                });
            }
            doAutoReloadId(r, props.redirectOnCreate);
            debug('onCreate -> beforeEmitCreate');
            emit('create', r);
        },
        onUpdate = ($event: PointerEvent, r: HTTPResponse) => {
            debug('onUpdate');
            if (!ensureValidResourceSave(r, safeUpdateButton.value.resource)) {
                if (props.notificationType === NotificationType.Toast) {
                    openToast(<ToastConfig>{
                        text: LktSettings.defaultUpdateErrorText,
                        details: LktSettings.defaultUpdateErrorDetails,
                        icon: LktSettings.defaultUpdateErrorIcon,
                        positionX: ToastPositionX.Right,
                        ...r.toast,
                    });
                }
                return;
            }
            debug('onUpdate -> turn stored data into original');
            dataState.value.turnStoredIntoOriginal();
            modificationsDataState.value.turnStoredIntoOriginal();
            if (props.notificationType === NotificationType.Toast) {
                openToast(<ToastConfig>{
                    text: LktSettings.defaultUpdateSuccessText,
                    details: LktSettings.defaultUpdateSuccessDetails,
                    icon: LktSettings.defaultUpdateSuccessIcon,
                    positionX: ToastPositionX.Right,
                    ...r.toast,
                });
            }
            doAutoReloadId(r);
            emit('update', r);
        },
        onDrop = ($event: PointerEvent, r: HTTPResponse) => {
            debug('onDrop');
            if (!ensureValidResourceSave(r, safeDropButton.value.resource)) {
                if (props.notificationType === NotificationType.Toast) {
                    openToast(<ToastConfig>{
                        text: LktSettings.defaultDropErrorText,
                        details: LktSettings.defaultDropErrorDetails,
                        icon: LktSettings.defaultDropErrorIcon,
                        positionX: ToastPositionX.Right,
                        ...r.toast,
                    });
                }
                return;
            }
            if (props.notificationType === NotificationType.Toast) {
                openToast(<ToastConfig>{
                    text: LktSettings.defaultDropSuccessText,
                    details: LktSettings.defaultDropSuccessDetails,
                    icon: LktSettings.defaultDropSuccessIcon,
                    positionX: ToastPositionX.Right,
                    ...r.toast,
                });
            }
            emit('drop', r);
            if (props.view === ItemCrudView.Modal) {
                debug('onDrop -> close modal');
                //@ts-ignore
                closeModal(props.modalConfig.modalName, props.modalConfig.modalKey);
            }

            if (typeof props.redirectOnDrop !== 'undefined') {
                let route = props.redirectOnDrop;
                if (typeof props.redirectOnDrop === 'function') route = props.redirectOnDrop();
                router.push(route);
            }
        },
        doSave = () => {
            // @ts-ignore
            if (buttonNav.value) buttonNav.value.doSave();
        },
        doDrop = () => {
            // @ts-ignore
            if (buttonNav.value) buttonNav.value.doDrop();
        };

    defineExpose({
        doDrop,
        doRefresh: fetchItem,
        doSave,
        turnStoredDataIntoOriginal: () => {
            dataState.value.increment(item.value).turnStoredIntoOriginal();
        },
        hasModifiedData: () => dataState.value.changed(),
    });


    const closeConfirm = computed(() => {
        if (!computedHasButtons.value) return '';
        if (computedHasForm.value) return changedForm.value ? props.modalConfig?.closeConfirm : '';

        if (computedEditableView.value === ModificationView.Modifications) {
            return modificationsDataState.value.changed() ? props.modalConfig?.closeConfirm : '';
        }
        return dataState.value.changed() ? props.modalConfig?.closeConfirm : '';
    });

    const crudBeforeClose = (modalData: LktObject) => {
        if (typeof props.modalConfig?.beforeClose === 'function') {
            //@ts-ignore
            return props.modalConfig.beforeClose({
                ...modalData,
                itemCreated: itemCreated.value,
            });
        }
    };

    const computedTitle = computed(() => extractI18nValue(props.title)),
        displayHeader = computed(() => {
            if (isLoading.value) return false;

            return computedTitle.value.length > 0 || !!slots['post-title'];
        }),
        displayLktHeader = computed(() => {
            if (isLoading.value) return false;
            return typeof props.header === 'object'
                && Object.keys(props.header).length > 0;
        }),
        computedInsideModal = computed(() => {
            return props.view === ItemCrudView.Modal;
        }),
        computedContainerTag = computed(() => {
            if (computedInsideModal.value) return 'lkt-modal';
            return 'section';
        }),
        ableToUpdate = computed(() => {
            if (props.mode !== ItemCrudMode.Update || !canUpdate.value) return false;
            if (computedHasForm.value) {
                if (!validForm.value) return false;
            }
            if (!props.enabledSaveWithoutChanges) {
                if (computedHasForm.value) {
                    if (!changedForm.value) return false;
                } else if (!dataChanged.value) {
                    return false;
                }
            }

            if (typeof safeUpdateButton.value?.disabled === 'function') return !safeUpdateButton.value.disabled({
                prop: item.value
            });
            if (typeof safeUpdateButton.value?.disabled === 'boolean') return !safeUpdateButton.value.disabled;

            return true;
        }),
        ableToCreate = computed(() => {
            if (props.mode !== ItemCrudMode.Create || !canCreate.value) return false;
            if (computedHasForm.value) {
                if (!validForm.value) return false;
            }
            if (!props.enabledSaveWithoutChanges) {
                if (computedHasForm.value) {
                    if (!changedForm.value) return false;
                } else if (!dataChanged.value) {
                    return false;
                }
            }
            // if (!props.enabledSaveWithoutChanges && !computedHasForm.value && !dataChanged.value) return false;
            // if (computedHasForm.value && (!validForm.value || (!props.enabledSaveWithoutChanges && !changedForm.value))) return false;

            if (typeof safeCreateButton.value?.disabled === 'function') return !safeCreateButton.value.disabled({
                prop: item.value
            });
            if (typeof safeCreateButton.value?.disabled === 'boolean') return !safeCreateButton.value.disabled;

            return true;
        }),
        ableToCreateAndNew = computed(() => {
            return props.createAndNewButton !== false
                && typeof props.createAndNewButton === 'object'
                && !Array.isArray(props.createAndNewButton)
                && Object.keys(props.createAndNewButton).length > 0;
        }),
        ableToDrop = computed(() => {

            if (!canDrop.value) return false;

            if (typeof safeDropButton.value?.disabled === 'function') return !safeDropButton.value.disabled({
                prop: item.value
            });
            if (typeof safeDropButton.value?.disabled === 'boolean') return !safeDropButton.value.disabled;

            return true;
        }),
        computedContainerAttrs = computed(() => {
            if (computedContainerTag.value === 'lkt-modal') {
                return <ModalConfig>{
                    ...{
                        title: props.title,
                        item: item.value,
                    },
                    ...props.modalConfig,
                    ...{
                        beforeClose: crudBeforeClose,
                        closeConfirm: closeConfirm.value,
                    },
                    headerActionsButton: props.groupButton !== false ? <ButtonConfig>{
                        dot: ableToCreate.value || ableToUpdate.value,
                    } : false
                };
            }
            return {};
        }),
        computedHasForm = computed(() => {
            return (typeof computedForm.value === 'object' && Object.keys(computedForm.value).length > 0);
        }),
        computedModificationViews = computed(() => {
            if (Object.keys(itemModifications.value).length === 0) return [];
            return props.modificationViews;
        });

    const computedEditableView = computed(() => {
        if (Object.keys(itemModifications.value).length === 0) return ModificationView.Current;
        return ModificationView.Modifications;
    })

    const computedHasButtons = computed(() => {
        return canCreate.value || canUpdate.value || canDrop.value;
    })

    const computedFormSlots = computed(() => {
        if (computedHasForm.value) return getFormSlotKeys(computedForm.value);
        return [];
    })

    const computedForm = computed(() => {
        if (typeof props.form === 'function') return props.form({
            mode: props.mode,
            view: pickedModificationView.value,
            item: item.value,
            modifications: itemModifications.value,
            editing: editMode.value
        });
        return props.form;
    })
</script>

<template>
    <component
        :is="computedContainerTag"
        v-bind="computedContainerAttrs"
        class="lkt-item-crud"
    >
        <template v-if="groupButton !== false && groupButtonAsModalActions && computedHasButtons" #header-actions>
            <button-nav
                ref="buttonNav"
                v-if="buttonNavPosition === ItemCrudButtonNavPosition.Top"
                v-model:loading="isLoading"
                v-model:editing="editMode"
                v-model:picked-modification-view="pickedModificationView"
                :item="item"
                :modifications="itemModifications"
                :mode="mode"
                :view="view"
                :grouped="true"
                :button-nav-visibility="buttonNavVisibility"
                :create-button="safeCreateButton"
                :create-and-new-button="safeCreateAndNewButton"
                :update-button="safeUpdateButton"
                :drop-button="safeDropButton"
                :edit-mode-button="safeEditModeButton"
                :group-button="safeGroupButton"
                :data-changed="dataChanged"
                :http-success-read="httpSuccessRead"
                :can-create="canCreate"
                :can-update="canUpdate"
                :can-drop="canDrop"
                :can-switch-edit-mode="canSwitchEditMode"
                :group-button-as-modal-actions="groupButtonAsModalActions"
                :able-to-create="ableToCreate"
                :able-to-create-and-new="ableToCreateAndNew"
                :able-to-update="ableToUpdate"
                :able-to-drop="ableToDrop"
                :perms="permissions"
                :modification-view="computedModificationViews"
                :editable-view="computedEditableView"
                :nav-start-buttons="navStartButtons"
                :nav-start-buttons-editing="navStartButtonsEditing"
                :nav-end-buttons="navEndButtons"
                :nav-end-buttons-editing="navEndButtonsEditing"
                :update-config="updateConfig"
                @create="onCreate"
                @save="onUpdate"
                @drop="onDrop"
            >
                <template #prev-buttons-ever="{canUpdate, canDrop, perms}" v-if="slots['prev-buttons-ever']">
                    <slot name="prev-buttons-ever"
                          :can-update="canUpdate"
                          :can-drop="canDrop"
                          :perms="perms"
                    />
                </template>
                <template #prev-buttons="{canUpdate, canDrop, perms}" v-if="slots['prev-buttons']">
                    <slot name="prev-buttons"
                          :can-update="canUpdate"
                          :can-drop="canDrop"
                          :perms="perms"
                    />
                </template>
            </button-nav>
        </template>

        <lkt-header v-if="!computedInsideModal && displayLktHeader" v-bind="header"/>
        <header class="lkt-item-crud_header" v-else-if="!computedInsideModal && displayHeader">
            <div class="lkt-item-crud_header-slot" v-if="slots['pre-title']">
                <slot name="pre-title" :item="item" :loading="isLoading" />
            </div>
            <h1 class="lkt-item-crud_header-title" v-if="computedTitle.length > 0">{{ computedTitle }}</h1>
            <div class="lkt-item-crud_header-slot" v-if="slots['post-title']">
                <slot name="post-title" :item="item" :loading="isLoading" />
            </div>
        </header>

        <button-nav
            ref="buttonNav"
            v-if="buttonNavPosition === ItemCrudButtonNavPosition.Top && (groupButton === false || !groupButtonAsModalActions) && computedHasButtons"
            v-model:loading="isLoading"
            v-model:editing="editMode"
            v-model:picked-modification-view="pickedModificationView"
            :item="item"
            :modifications="itemModifications"
            :mode="mode"
            :view="view"
            :grouped="groupButton !== false"
            :button-nav-visibility="buttonNavVisibility"
            :create-button="safeCreateButton"
            :create-and-new-button="safeCreateAndNewButton"
            :update-button="safeUpdateButton"
            :drop-button="safeDropButton"
            :edit-mode-button="safeEditModeButton"
            :group-button="safeGroupButton"
            :data-changed="dataChanged"
            :http-success-read="httpSuccessRead"
            :can-create="canCreate"
            :can-update="canUpdate"
            :can-drop="canDrop"
            :can-switch-edit-mode="canSwitchEditMode"
            :group-button-as-modal-actions="groupButtonAsModalActions"
            :able-to-create="ableToCreate"
            :able-to-create-and-new="ableToCreateAndNew"
            :able-to-update="ableToUpdate"
            :able-to-drop="ableToDrop"
            :perms="permissions"
            :modification-view="computedModificationViews"
            :editable-view="computedEditableView"
            :nav-start-buttons="navStartButtons"
            :nav-start-buttons-editing="navStartButtonsEditing"
            :nav-end-buttons="navEndButtons"
            :nav-end-buttons-editing="navEndButtonsEditing"
            :update-config="updateConfig"
            @create="onCreate"
            @save="onUpdate"
            @drop="onDrop"
        >
            <template #prev-buttons-ever="{canUpdate, canDrop, perms}" v-if="slots['prev-buttons-ever']">
                <slot name="prev-buttons-ever"
                      :can-update="canUpdate"
                      :can-drop="canDrop"
                      :perms="perms"
                />
            </template>
            <template #prev-buttons="{canUpdate, canDrop, perms}" v-if="slots['prev-buttons']">
                <slot name="prev-buttons"
                      :can-update="canUpdate"
                      :can-drop="canDrop"
                      :perms="perms"
                />
            </template>
        </button-nav>
        <template v-else-if="computedHasButtons && buttonNavPosition === ItemCrudButtonNavPosition.Hidden">
            <button-nav
                ref="buttonNav"
                v-show="false"
                v-model:loading="isLoading"
                v-model:editing="editMode"
                v-model:picked-modification-view="pickedModificationView"
                :item="item"
                :modifications="itemModifications"
                :mode="mode"
                :view="view"
                :button-nav-visibility="buttonNavVisibility"
                :create-button="safeCreateButton"
                :create-and-new-button="safeCreateAndNewButton"
                :update-button="safeUpdateButton"
                :drop-button="safeDropButton"
                :edit-mode-button="safeEditModeButton"
                :group-button="safeGroupButton"
                :data-changed="dataChanged"
                :http-success-read="httpSuccessRead"
                :can-create="canCreate"
                :can-update="canUpdate"
                :can-drop="canDrop"
                :can-switch-edit-mode="canSwitchEditMode"
                :group-button-as-modal-actions="groupButtonAsModalActions"
                :able-to-create="ableToCreate"
                :able-to-create-and-new="ableToCreateAndNew"
                :able-to-update="ableToUpdate"
                :able-to-drop="ableToDrop"
                :perms="permissions"
                :modification-view="computedModificationViews"
                :editable-view="computedEditableView"
                :nav-start-buttons="navStartButtons"
                :nav-start-buttons-editing="navStartButtonsEditing"
                :nav-end-buttons="navEndButtons"
                :nav-end-buttons-editing="navEndButtonsEditing"
                :update-config="updateConfig"
                @create="onCreate"
                @save="onUpdate"
                @drop="onDrop"
            >
                <template #prev-buttons-ever="{canUpdate, canDrop, perms}" v-if="slots['prev-buttons-ever']">
                    <slot name="prev-buttons-ever"
                          :can-update="canUpdate"
                          :can-drop="canDrop"
                          :perms="perms"
                    />
                </template>
                <template #prev-buttons="{canUpdate, canDrop, perms}" v-if="slots['prev-buttons']">
                    <slot name="prev-buttons"
                          :can-update="canUpdate"
                          :can-drop="canDrop"
                          :perms="perms"
                    />
                </template>
            </button-nav>
        </template>

        <div class="lkt-item-crud_content" v-if="!isLoading">
            <div v-if="httpSuccessRead" class="lkt-grid-1">
                <lkt-http-info
                    v-if="showStoreMessage && notificationType === NotificationType.Inline"
                    :code="httpStatus"
                    :palette="httpStatus === 200 ? 'success' : 'danger'"
                    quick
                    can-close
                    v-on:close="showStoreMessage = false" />

                <template v-if="computedHasForm">
                    <lkt-form
                        ref="formRef"
                        v-model="item"
                        v-model:modifications="itemModifications"
                        v-model:valid="validForm"
                        v-model:changed="changedForm"
                        v-bind="<FormUiConfig>{
                                ...formUiConfig,
                                form: computedForm,
                                differencesTableConfig,
                                visibleView: pickedModificationView,
                                modificationDataState: formDifferencesChecker,
                                editableViews: [computedEditableView],
                                disabled: !editMode,
                            }"
                    >
                        <template v-for="formSlot in computedFormSlots" v-slot:[formSlot]="{}">
                            <slot :name="formSlot"/>
                        </template>
                    </lkt-form>
                </template>

                <template v-else>
                    <slot name="item"
                          :item="item"
                          :loading="isLoading"
                          :edit-mode="editMode"
                          :is-create="createMode"
                          :can-update="canUpdate"
                          :can-drop="canDrop"
                          :item-being-edited="itemBeingEdited"
                          :perms="permissions"
                    />
                </template>
            </div>
            <lkt-http-info :code="httpStatus" v-else-if="notificationType === NotificationType.Inline" />
        </div>
        <lkt-loader v-if="isLoading" />

        <button-nav
            ref="buttonNav"
            v-if="buttonNavPosition === ItemCrudButtonNavPosition.Bottom && (groupButton === false || !groupButtonAsModalActions) && computedHasButtons"
            v-model:loading="isLoading"
            v-model:editing="editMode"
            v-model:picked-modification-view="pickedModificationView"
            :item="item"
            :modifications="itemModifications"
            :mode="mode"
            :view="view"
            :grouped="groupButton !== false"
            :button-nav-visibility="buttonNavVisibility"
            :create-button="safeCreateButton"
            :create-and-new-button="safeCreateAndNewButton"
            :update-button="safeUpdateButton"
            :drop-button="safeDropButton"
            :edit-mode-button="safeEditModeButton"
            :group-button="safeGroupButton"
            :data-changed="dataChanged"
            :http-success-read="httpSuccessRead"
            :can-create="canCreate"
            :can-update="canUpdate"
            :can-drop="canDrop"
            :can-switch-edit-mode="canSwitchEditMode"
            :group-button-as-modal-actions="groupButtonAsModalActions"
            :able-to-create="ableToCreate"
            :able-to-create-and-new="ableToCreateAndNew"
            :able-to-update="ableToUpdate"
            :able-to-drop="ableToDrop"
            :perms="permissions"
            :modification-view="computedModificationViews"
            :editable-view="computedEditableView"
            :nav-start-buttons="navStartButtons"
            :nav-start-buttons-editing="navStartButtonsEditing"
            :nav-end-buttons="navEndButtons"
            :nav-end-buttons-editing="navEndButtonsEditing"
            :update-config="updateConfig"
            @create="onCreate"
            @save="onUpdate"
            @drop="onDrop"
        >
            <template #prev-buttons-ever v-if="slots['prev-buttons-ever']">
                <slot name="prev-buttons-ever" />
            </template>
            <template #prev-buttons-ever v-if="slots['prev-buttons']">
                <slot name="prev-buttons" />
            </template>
        </button-nav>
    </component>
</template>