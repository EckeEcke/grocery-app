<<<<<<< HEAD
// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */

module.exports = {
    pwa: {
        manifestOptions: {
          name: "Vue Mealplanner",
          short_name: "Mealplanner",
          start_url: "./",
          display: "standalone",
          theme_color: "#FEC474",
          icons: [
            {
              src: "./favicon.svg",
              sizes: "512x512",
              type: "image/svg+xml",
              purpose: "any maskable",
            },
          ],
        },
    
        themeColor: "#FEC474",
        msTileColor: "#000",
        appleMobileWebAppCapable: "yes",
        appleMobileWebAppStatusBarStyle: "white",
        iconPaths: {
          maskicon: null,
          favicon32: "./favicon32.png",
          favicon16: "./favicon16.png",
          appleTouchIcon: null,
          msTileImage: null,
        },
        // configure the workbox plugin
        workboxPluginMode: "GenerateSW",
      },
}
=======
>>>>>>> parent of c5eec34 (adding config)
