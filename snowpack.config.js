const production = process.env.NODE_ENV === 'production'
function babelOptions(){
    return {
        plugins: production 
            ? ['transform-remove-console'] 
            : []
    }
}

module.exports = {
    mount: {
        public: '/',
        src: '/_dist_'
    },
    plugins: [
        [
            '@snowpack/plugin-svelte'
        , {
            preprocess: require('svelte-preprocess')({
                scss: {
                    prependData: '@import "./src/scss/main.scss";'
                },
                postcss: {
                    plugins: [
                        require('autoprefixer')()
                    ]
                },
                babel: babelOptions()
            })
        }
    ],
        ['@snowpack/plugin-babel', {
            transformOptions: babelOptions()
        }],
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-optimize'
    ],
    alias: {
        '~': './src'
    },
    devOptions: {
        port: 8079
    }
}