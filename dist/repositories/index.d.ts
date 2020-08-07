export declare const repositories: {
    configs: (framework: any) => import("../container").Repository;
    features: {
        dashboard: boolean;
        clean: boolean;
        css: boolean;
        svg: boolean;
        image: boolean;
        font: boolean;
        js: boolean;
        manifest: boolean;
        optimize: boolean;
        terser: boolean;
        vendor: boolean;
        splitting: boolean;
        minify: boolean;
        react: boolean;
        browserSync: boolean;
        dependencyManifest: boolean;
        dump: boolean;
        hash: boolean;
        hot: boolean;
        inlineManifest: boolean;
        overlay: boolean;
        scss: boolean;
        cssModules: boolean;
        scssModules: boolean;
        purge: boolean;
        sourceMap: boolean;
        translate: boolean;
        uglify: boolean;
        watch: boolean;
        debug: boolean;
    };
    options: {
        copy: import("./types").Copy;
        dependencyManifest: import("@wordpress/dependency-extraction-webpack-plugin/build-types").Options;
        dev: {};
        devtool: string;
        extensions: string[];
        filenameTemplate: {
            hashed: string;
            default: string;
        };
        headers: {
            'Access-Control-Allow-Origin': string;
            'Access-Control-Allow-Methods': string;
            'Access-Control-Allow-Headers': string;
        };
        inlineManifest: {
            name: string;
        };
        postCss: {};
        scss: {};
        splitting: {
            maxChunks: any;
        };
        target: "web";
        terser: {
            terserOptions: {
                parse: {
                    ecma: number;
                };
                compress: {
                    ecma: number;
                    warnings: boolean;
                    comparisons: boolean;
                    inline: number;
                };
                mangle: {
                    safari10: boolean;
                };
                output: {
                    ecma: number;
                    comments: boolean;
                    ascii_only: boolean;
                };
            };
            cache: boolean;
            parallel: boolean;
        };
        uglify: {
            cache: boolean;
            chunkFilter: ({ name }: {
                name: any;
            }) => boolean;
            extractComments: boolean;
            parallel: boolean;
            uglifyOptions: {
                output: {
                    beautify: boolean;
                };
                compress: boolean;
                mangle: {
                    toplevel: boolean;
                };
            };
        };
        vendor: {
            name: string;
        };
    };
    loaders: {
        babel: string;
        css: string;
        file: string;
        eslint: string;
        miniCss: string;
        postCss: string;
        resolveUrl: string;
        scss: string;
        style: string;
        svgr: string;
        url: string;
        ts: string;
    };
    paths: {
        cwd: string;
        project: string;
        framework: string;
        src: string;
        dist: unknown;
        public: unknown;
    };
    cli: {
        args: (framework: any) => {
            level: unknown;
            mode: any;
            host: any;
            port: any;
            proxy: any;
            src: any;
            dist: any;
            feature: any;
        };
        flags: {
            log: boolean;
            hot: boolean;
            watch: boolean;
        };
    };
    env: (framework: any) => import("dotenv/types").DotenvParseOutput;
    adapters: import("./plugins/types").PluginsRepo;
    plugins: import("./plugins/types").PluginsRepo;
    presets: {
        eslint: {
            config: {
                extends: string[];
                plugins: string[];
                globals: {
                    wp: boolean;
                };
                parser: string;
                parserOptions: {
                    ecmaVersion: number;
                };
                settings: {
                    react: {
                        version: string;
                    };
                };
                env: {
                    browser: boolean;
                    node: boolean;
                };
                rules: {
                    strict: number;
                    'no-console': number;
                    'no-extra-semi': number;
                    'comma-dangle': (string | {
                        arrays: string;
                        objects: string;
                        imports: string;
                        exports: string;
                        functions: string;
                    })[];
                };
            };
            file: string;
        };
        postCss: {
            config: {
                plugins: any[];
            };
            file: string;
        };
        stylelint: {
            config: {
                extends: string;
                rules: {
                    'declaration-colon-newline-after': null;
                    'value-list-comma-newline-after': null;
                    'no-empty-source': null;
                    'no-descending-specificity': null;
                    'at-rule-empty-line-before': null;
                    'at-rule-no-unknown': (boolean | {
                        ignoreAtRules: string[];
                    })[];
                };
            };
            file: string;
        };
        "babel-wp": {
            config: () => {
                presets: any[];
                plugins: any[];
            };
            file: string;
        };
    };
};
//# sourceMappingURL=index.d.ts.map