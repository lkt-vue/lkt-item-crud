import { FormConfig } from 'lkt-vue-kernel';

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