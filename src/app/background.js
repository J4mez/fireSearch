console.log("background.js");

// Callback reads runtime.lastError to prevent an unchecked error from being
// logged when the extension attempt to register the already-registered menu
// again. Menu registrations in event pages persist across extension restarts.
browser.contextMenus.create(
    {
        id: "search-with-google-lense",
        title: "Search with google lense",
        contexts: ["link"],
    },
    // See https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/#event-pages-and-backward-compatibility
    // for information on the purpose of this error capture.
    () => void browser.runtime.lastError
);

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "search-with-google-lense") {
        console.log("info", info);
    }
});

