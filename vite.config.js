import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';

const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'build');
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
            fileName: 'build',
            formats: ['es']
        },
        outDir,
        minify: true,
        rollupOptions: {
            external: [
                'vue',
                'lkt-button',
                'lkt-modal',
                'lkt-loader',
                'lkt-http-client',
                'lkt-http-info',
                'lkt-i18n',
                'lkt-toast',
                'lkt-string-tools',
                'lkt-vue-tools',
                'lkt-data-state',
                'lkt-vue-kernel',
            ],
            output: {
                globals: {
                    vue: 'Vue',
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