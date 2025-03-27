<script setup lang="ts">
    import { computed, nextTick, onMounted, ref, SetupContext, useSlots, watch } from 'vue';
    import { httpCall, HTTPResponse } from 'lkt-http-client';
    import { DataState } from 'lkt-data-state';
    import { debug } from '../functions/debug';
    import {
        getDefaultValues,
        ItemCrud,
        ItemCrudButtonNavPosition,
        ItemCrudConfig,
        ItemCrudMode,
        ItemCrudView,
        LktObject,
        LktSettings,
        NotificationType,
        TablePermission,
        ToastConfig,
        ToastPositionX,
    } from 'lkt-vue-kernel';
    import { closeModal } from 'lkt-modal';
    import { __ } from 'lkt-i18n';
    import ButtonNav from '../components/ButtonNav.vue';
    import { openToast } from 'lkt-toast';

    // defineOptions({
    //     inheritAttrs: false
    // })

    const props = withDefaults(defineProps<ItemCrudConfig>(), getDefaultValues(ItemCrud));

    const slots: SetupContext['slots'] = useSlots();

    const emit = defineEmits([
        'update:modelValue',
        'update:editing',
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
        perms = ref(props.perms),
        editMode = ref(props.editing),
        httpSuccessRead = ref(false),
        showStoreMessage = ref(false),
        httpStatus = ref(200),
        dataState = ref(new DataState(item.value, props.dataStateConfig)),
        dataChanged = ref(false),
        readDataState = ref(new DataState(props.readData)),
        createMode = ref(props.mode === ItemCrudMode.Create),
        itemBeingEdited = ref(false),
        itemCreated = ref(false),
        buttonNav = ref(null),
        canUpdate = computed(() => !createMode.value && Array.isArray(perms.value) && perms.value.includes(TablePermission.Update)),
        canDrop = computed(() => !createMode.value && Array.isArray(perms.value) && perms.value.includes(TablePermission.Drop)),
        canSwitchEditMode = computed(() => !createMode.value && Array.isArray(perms.value) && perms.value.includes(TablePermission.SwitchEditMode));

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
            dataChanged.value = dataState.value.changed();
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
        dataChanged.value = dataState.value.changed();
        nextTick(() => itemBeingEdited.value = false);
    }, { deep: true });

    watch(perms, () => emit('perms', perms.value));
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
        doAutoReloadId = (r: HTTPResponse) => {
            if (!computedInsideModal.value && r.autoReloadId) {
                debug('doAutoReloadId -> autoReloadId detected: ', r.autoReloadId);
                props.readData['id'] = r.autoReloadId;
                debug('doAutoReloadId -> turning off create mode');
                createMode.value = false;
                fetchItem();
            }
        },
        onCreate = ($event: PointerEvent, r: HTTPResponse) => {
            debug('onCreate');
            if (!ensureValidResourceSave(r, props.createButton.resource)) {
                if (props.notificationType === NotificationType.Toast) {
                    openToast(<ToastConfig>{
                        text: LktSettings.defaultCreateErrorText,
                        details: LktSettings.defaultCreateErrorDetails,
                        icon: LktSettings.defaultCreateErrorIcon,
                        positionX: ToastPositionX.Right,
                    });
                }
                return;
            }
            itemCreated.value = true;
            debug('onCreate -> turn stored data into original');
            dataState.value.increment(item.value).turnStoredIntoOriginal();
            if (props.notificationType === NotificationType.Toast) {
                openToast(<ToastConfig>{
                    text: LktSettings.defaultCreateSuccessText,
                    details: LktSettings.defaultCreateSuccessDetails,
                    icon: LktSettings.defaultCreateSuccessIcon,
                    positionX: ToastPositionX.Right,
                });
            }
            doAutoReloadId(r);
            emit('create', r);
        },
        onUpdate = ($event: PointerEvent, r: HTTPResponse) => {
            debug('onUpdate');
            if (!ensureValidResourceSave(r, props.updateButton.resource)) {
                if (props.notificationType === NotificationType.Toast) {
                    openToast(<ToastConfig>{
                        text: LktSettings.defaultUpdateErrorText,
                        details: LktSettings.defaultUpdateErrorDetails,
                        icon: LktSettings.defaultUpdateErrorIcon,
                        positionX: ToastPositionX.Right,
                    });
                }
                return;
            }
            debug('onUpdate -> turn stored data into original');
            dataState.value.turnStoredIntoOriginal();
            if (props.notificationType === NotificationType.Toast) {
                openToast(<ToastConfig>{
                    text: LktSettings.defaultUpdateSuccessText,
                    details: LktSettings.defaultUpdateSuccessDetails,
                    icon: LktSettings.defaultUpdateSuccessIcon,
                    positionX: ToastPositionX.Right,
                });
            }
            doAutoReloadId(r);
            emit('update', r);
        },
        onDrop = ($event: PointerEvent, r: HTTPResponse) => {
            debug('onDrop');
            if (!ensureValidResourceSave(r, props.dropButton.resource)) {
                if (props.notificationType === NotificationType.Toast) {
                    openToast(<ToastConfig>{
                        text: LktSettings.defaultDropErrorText,
                        details: LktSettings.defaultDropErrorDetails,
                        icon: LktSettings.defaultDropErrorIcon,
                        positionX: ToastPositionX.Right,
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
                });
            }
            emit('drop', r);
            if (props.view === ItemCrudView.Modal) {
                debug('onDrop -> close modal');
                //@ts-ignore
                closeModal(props.modalConfig.modalName, props.modalConfig.modalKey);
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
        hasModifiedData: () => dataState.value.changed(),
    });


    const closeConfirm = computed(() => {
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

    const computedTitle = computed(() => {
            if (props.title.startsWith('__:')) {
                return String(__(props.title.substring(3)));
            }
            return props.title;
        }),
        displayHeader = computed(() => {
            if (isLoading.value) return false;

            return computedTitle.value.length > 0 || !!slots['post-title'];
        }),
        computedInsideModal = computed(() => {
            return props.view === ItemCrudView.Modal;
        }),
        computedContainerTag = computed(() => {
            if (computedInsideModal.value) return 'lkt-modal';
            return 'section';
        }),
        computedContainerAttrs = computed(() => {
            if (computedContainerTag.value === 'lkt-modal') {
                return {
                    ...{
                        title: props.title,
                        item: item.value,
                    },
                    ...props.modalConfig,
                    ...{
                        beforeClose: crudBeforeClose,
                        closeConfirm: closeConfirm.value,
                    },
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
            <header class="lkt-item-crud_header" v-if="!computedInsideModal && displayHeader">
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
                v-if="buttonNavPosition === ItemCrudButtonNavPosition.Top"
                v-model:loading="isLoading"
                v-model:editing="editMode"
                :item="item"
                :mode="mode"
                :view="view"
                :button-nav-visibility="buttonNavVisibility"
                :create-button="createButton"
                :update-button="updateButton"
                :drop-button="dropButton"
                :edit-mode-button="editModeButton"
                :group-button="groupButton"
                :data-changed="dataChanged"
                :http-success-read="httpSuccessRead"
                :can-update="canUpdate"
                :can-drop="canDrop"
                :can-switch-edit-mode="canSwitchEditMode"
                :perms="perms"
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

            <div class="lkt-item-crud_content" v-if="!isLoading">
                <div v-if="httpSuccessRead" class="lkt-grid-1">
                    <lkt-http-info
                        v-if="showStoreMessage && notificationType === NotificationType.Inline"
                        :code="httpStatus"
                        :palette="httpStatus === 200 ? 'success' : 'danger'"
                        quick
                        can-close
                        v-on:close="showStoreMessage = false" />
                    <slot name="item" :item="item" :loading="isLoading" :edit-mode="editMode"
                          :is-create="createMode"
                          :can-update="canUpdate"
                          :can-drop="canDrop"
                          :item-being-edited="itemBeingEdited"></slot>
                </div>
                <lkt-http-info :code="httpStatus" v-else-if="notificationType === NotificationType.Inline" />
            </div>
            <lkt-loader v-if="isLoading" />

            <button-nav
                ref="buttonNav"
                v-if="buttonNavPosition === ItemCrudButtonNavPosition.Bottom"
                v-model:loading="isLoading"
                v-model:editing="editMode"
                :item="item"
                :mode="mode"
                :view="view"
                :button-nav-visibility="buttonNavVisibility"
                :create-button="createButton"
                :update-button="updateButton"
                :drop-button="dropButton"
                :edit-mode-button="editModeButton"
                :group-button="groupButton"
                :data-changed="dataChanged"
                :http-success-read="httpSuccessRead"
                :can-update="canUpdate"
                :can-drop="canDrop"
                :can-switch-edit-mode="canSwitchEditMode"
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
        </article>
    </component>
</template>