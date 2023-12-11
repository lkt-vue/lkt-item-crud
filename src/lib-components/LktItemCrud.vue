<script lang="ts">
export default {name: "LktItemCrud", inheritAttrs: false}
</script>

<script setup lang="ts">
import {ref, watch} from "vue";
import {httpCall} from "lkt-http-client";

const props = defineProps({
    modelValue: {type: Object, required: false, default: () => ({})},
    readResource: {type: String, required: true},
    readData: {type: Object, required: false, default: () => ({})},
    title: {type: String, default: ''},
});

const emit = defineEmits(['update:modelValue', 'read', 'save', 'perms']);

const loading = ref(true),
    item = ref(props.modelValue),
    perms = ref([]);

const fetchItem = async () => {
    return await httpCall(props.readResource, props.readData).then(r => {
        loading.value = false;
        item.value = r.data;
        perms.value = r.perms;
        emit('read', r);
    });
}

watch(() => props.modelValue, v => item.value = v);
watch(item, () => emit('update:modelValue', item.value));
watch(perms, () => emit('perms', perms.value));

// const save = async (data: LktObject) => {
//     const resource = props.id > 0 ? props.update : props.create;
//
//     return await httpCall(resource, {id: props.id, ...data}).then(r => {
//         loading.value = false;
//         emit('save', r);
//     });
// }

// Fetch item
if (props.readResource) fetchItem();

defineExpose({
    fetchItem,
    // save,
});
</script>

<template>
    <article class="lkt-item-crud">
        <header class="lkt-item-crud_header" v-if="!loading">
            <h1 class="lkt-item-crud_header-title">{{ title }}</h1>
            <div class="lkt-item-crud_header-slot">
                <slot name="post-title" v-bind:item="item"></slot>
            </div>
        </header>
        <div class="lkt-item-crud_content" v-if="!loading">
            <slot name="item" v-bind:item="item"></slot>
        </div>
        <lkt-loader v-if="loading"></lkt-loader>
    </article>
</template>