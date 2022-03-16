var menuItem = {
    "id": "openMedium",
    "title": "Open Medium",
    "contexts": ["link"]
};
var prefix = "https://mirror-medium.com/?m=";

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){   
    if (clickData.menuItemId == "openMedium"){    
        const linkUrl = clickData.linkUrl;
        const encoded = encodeURIComponent(linkUrl);
        chrome.extension.getBackgroundPage().console.log("newUrl", prefix + encoded);
        chrome.tabs.create({ url: prefix + encoded });
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if (changeInfo.status == "loading" && changeInfo.url) {
        if (changeInfo.url.includes("medium.com") && !changeInfo.url.includes(prefix)) {
            chrome.tabs.update(
                tabId,
                { url: prefix + encodeURIComponent(changeInfo.url) }
            );
        }
    }
});