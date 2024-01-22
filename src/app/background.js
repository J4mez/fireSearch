console.log("background.js");

// Callback reads runtime.lastError to prevent an unchecked error from being
// logged when the extension attempt to register the already-registered menu
// again. Menu registrations in event pages persist across extension restarts.
browser.contextMenus.create(
    {
        id: "search-with-google-lense",
        title: "Search with google lense",
        contexts: ["image"],
    },

    // See https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/#event-pages-and-backward-compatibility
    // for information on the purpose of this error capture.
    () => void browser.runtime.lastError
);

// debuger
/* browser.contextMenus.create(
    {
        id: "check-type",
        title: "Debug: Check type",
        contexts: ["all"],
    },

    // See https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/#event-pages-and-backward-compatibility
    // for information on the purpose of this error capture.
    () => void browser.runtime.lastError
);
 */
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "search-with-google-lense") {
        var searchUrl = `https://lens.google.com/uploadbyurl?url=${info.srcUrl}`;
        console.log(searchUrl);

        // if the searchURL is SVG, display an error
        if (info.srcUrl.endsWith(".svg")) {
            alert("SVG images are not supported by Google Lense");
            notification(
                "Error!",
                "SVG images are not supported by Google Lense"
            );
            return;
        }

        // open new tab with google lense
        browser.tabs.create({
            url: searchUrl,
        });
    } else if (info.menuItemId === "check-type") {
        console.log(info);
        console.log(tab);
        console.log(info.srcUrl);
    }
});

// notification handler
function notification(title, message) {
    browser.notifications.create("error-noti", {
        type: "basic",
        iconUrl: browser.runtime.getURL("icons/icon96.png"),
        title: title,
        message: message,
    });
}
