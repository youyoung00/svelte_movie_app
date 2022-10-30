
// const production = process.env.NODE_ENV === 'production'
// function babelOptions(){
//     return {
//         plugins: production 
//             ? ['transform-remove-console'] 
//             : []
//     }
// }

// module.export = {
//     preprocess: require('svelte-preprocess')({
//         scss: {
//             prependData: '@import "./src/scss/main.scss";'
//         },
//         postcss: {
//             plugins: [
//                 require('autoprefixer')()
//             ]
//         },
//         babel: babelOptions()
//     })
// }