export const tabUtil = {
  createNewTab: async (active = true, url) => {
    const newTab = await chrome.tabs.create({
      active,
      url,
    });
    return newTab;
  },
  getActiveTab: async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab;
  },
  removeTab: async (id) => {
    return await chrome.tabs.remove(id);
  },
};
