<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */

=======
>>>>>>> parent of fe86c6c (minor additions to config)
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
        appleMobileWebAppStatusBarStyle: "black",
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
=======
>>>>>>> parent of c5eec34 (adding config)
=======
>>>>>>> parent of c5eec34 (adding config)
