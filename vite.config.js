import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';

const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const test = resolve(__dirname, 'test');
const snapshots = resolve(__dirname, 'snapshots');

export default {
    plugins: [vue()],
    resolve: {
        alias: {'@': src, '@test': test}
    },
    build: {
        lib: {
            entry: `${src}/index.ts`,
            name: 'LktItemCrud',
            fileName: (format) => `lkt-item-crud.${format}.js`
        },
        outDir,
        minify: true,
        rollupOptions: {
            external: [
                'vue',
                '@vuepic/vue-datepicker',
                'vue-next-select',
                'suneditor',
                'katex',
                'lkt-button',
                'lkt-field-switch',
                'lkt-loader',
                'lkt-http-client',
                'lkt-http-info',
                'lkt-tools',
                'lkt-string-tools',
                'lkt-vue-tools',
                'lkt-control-tools',
                'lkt-data-state',
                'lkt-events'
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    '@vuepic/vue-datepicker': 'Datepicker',
                    'vue-next-select': 'VueSelect',
                    'suneditor': 'suneditor',
                    'katex': 'katex',
                    'lkt-tools': 'LktTools',
                    'lkt-data-state': 'LktDataState',
                    'lkt-http-client': 'LktHttpClient',
                    'lkt-string-tools': 'LktStringTools',
                    'lkt-vue-tools': 'LktVueTools',
                    'lkt-events': 'LktEvents',
                },
                sourcemapExcludeSources: true
            }
        }
    },
    test: {
        coverage: {
            reporter: ['text', 'lcov']
        },
        resolveSnapshotPath: (testPath, snapExtension) => {
            const path = testPath.split('/').splice(-2);
            return `${snapshots}/${path[0]}/${path[1]}${snapExtension}`;
        }
    }
};