<script lang="ts">
export default {name: "LktItemCrud", inheritAttrs: false}
</script>

<script setup lang="ts">
import {ref, watch, useSlots, computed} from "vue";
import {httpCall} from "lkt-http-client";
import {LktObject} from "lkt-ts-interfaces";

const props = defineProps({
    modelValue: {type: Object, required: false, default: () => ({})},
    readResource: {type: String, required: true},
    readData: {type: Object, required: false, default: () => ({})},
    createResource: {type: String, required: false},
    updateResource: {type: String, required: false},
    dropResource: {type: String, required: false},
    title: {type: String, default: ''},
});

const slots = useSlots();

const emit = defineEmits(['update:modelValue', 'read', 'create', 'update', 'drop', 'perms', 'error']);

let basePerms: string[] = [];

const loading = ref(true),
    item = ref(props.modelValue),
    perms = ref(basePerms),
    httpStatus = ref(200);

const fetchItem = async () => {
    loading.value = true;
    return await httpCall(props.readResource, props.readData).then((r) => {
        loading.value = false;
        if (!r.success) {
            httpStatus.value = r.httpStatus;
            emit('error', r.httpStatus);
            return;
        }
        item.value = r.data;
        perms.value = r.perms;
        emit('read', r);
    });
}

const displayHeader = computed(() => {
    if (loading.value) return false;

    return props.title || !!slots['post-title'];
})

watch(() => props.modelValue, v => item.value = v);
watch(item, () => emit('update:modelValue', item.value));
watch(perms, () => emit('perms', perms.value));

const create = async (data: LktObject) => {
    const resource = props.createResource;

    loading.value = true;
    return await httpCall(resource, {...data}).then(r => {
        loading.value = false;
        emit('create', r);
    });
}

const update = async (data: LktObject) => {
    const resource = props.updateResource;

    loading.value = true;
    return await httpCall(resource, {...data}).then(r => {
        loading.value = false;
        emit('update', r);
    });
}

const drop = async (data: LktObject) => {
    const resource = props.dropResource;

    loading.value = true;
    return await httpCall(resource, {...data}).then(r => {
        loading.value = false;
        emit('drop', r);
    });
}

// Fetch item
if (props.readResource) fetchItem();

defineExpose({
    fetchItem,
    create,
    update,
    drop,
    refresh: fetchItem
});
</script>

<template>
    <article class="lkt-item-crud">
        <header class="lkt-item-crud_header" v-if="displayHeader">
            <h1 class="lkt-item-crud_header-title">{{ title }}</h1>
            <div class="lkt-item-crud_header-slot">
                <slot name="post-title" v-bind:item="item" v-bind:loading="loading"></slot>
            </div>
        </header>
        <div class="lkt-item-crud_content" v-if="!loading">
            <div v-if="httpStatus === 200">
                <slot name="item" v-bind:item="item" v-bind:loading="loading"></slot>
            </div>
            <div v-if="httpStatus !== 200">
                An error occurred!
            </div>
        </div>
        <lkt-loader v-if="loading"></lkt-loader>
    </article>
</template>