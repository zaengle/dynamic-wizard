require('dotenv').config();

const mix = require('laravel-mix');
const path = require('path');
const tailwindcss = require('tailwindcss');

mix
    .options({
        https: true,
    })
    .postCss("./src/css/app.css", "dist", [
        require("postcss-import"),
        require("tailwindcss/nesting"),
        tailwindcss("./tailwind.config.js"),
        require("autoprefixer"),
    ])
    .js("./src/js/app.js", "dist")
    .react()
    .setPublicPath("web")
    .sourceMaps()
    .browserSync({
        open: false,
        ui: false,
        watch: true,
        cors: true,
        files: [
            "./templates/**/*",
            `./web/dist/**/*`,
        ],
        host: process.env.DDEV_HOSTNAME,
        proxy: {
            target: "localhost",
        },
    });

if (mix.inProduction()) {
    mix.version();
}