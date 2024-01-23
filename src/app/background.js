console.log("background.js");
//Include the polyfill to support chrome
import "/app/browser-polyfill.js";

// Callback reads runtime.lastError to prevent an unchecked error from being
// logged when the extension attempt to register the already-registered menu
// again. Menu registrations in event pages persist across extension restarts.
browser.contextMenus.create({
    id: "search-with-google-lens",
    title: "Search with Google Lens",
    contexts: ["image"],
});

// debuger
/* browser.contextMenus.create(
    {
        id: "check-type",
        title: "Debug: Check type",
        contexts: ["all"],
    });
 */
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "search-with-google-lens") {
        var searchUrl = `https://lens.google.com/uploadbyurl?url=${info.srcUrl}`;
        console.log(searchUrl);

        // if the searchURL is SVG, display an error
        if (info.srcUrl.endsWith(".svg")) {
            alert("SVG images are not supported by Google Lens");
            notification(
                "Error!",
                "SVG images are not supported by Google Lens"
            );
            return;
        }

        // open new tab with google lens
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
        iconUrl: runtime.getURL("icons/icon96.png"),
        title: title,
        message: message,
    });
}
