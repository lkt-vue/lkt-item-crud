import { FormConfig, LktObject } from 'lkt-vue-kernel';
import { DataState } from 'lkt-data-state';

export const getModificationsDataState = (value: LktObject, modifications: LktObject, form: FormConfig) => {
    let r = new DataState(JSON.parse(JSON.stringify(value)), {
        onlyProps: detectFormFieldsKeys(form),
        recursiveOnlyProps: false,
    });
    r.increment(JSON.parse(JSON.stringify(modifications)));
    return r;
};

export const detectFormFieldsKeys = (form: FormConfig) => {
    if (form.items === undefined) return [];
    if (form.items.length === 0) return [];

    let r: string[] = [];

    for (let i in form.items) {
        let item = form.items[i];
        switch (item.type) {
            case 'field':
                if (item.key !== undefined) {
                    r.push(item.key);
                }
                break;

            case 'form':
                if (item.form) {
                    r = [...r, ...detectFormFieldsKeys(item.form)];
                }
                break;
        }
    }
    return r;
};