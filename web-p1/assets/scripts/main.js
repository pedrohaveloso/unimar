// @ts-check

import { elements } from "./elements.js";

elements();

const hookCache = new Map();
const styleCache = new Map();

document.querySelectorAll("[data-hook]")?.forEach(async (element) => {
  const hookName = element.getAttribute("data-hook");

  if (hookName === null) {
    return;
  }

  if (!hookCache.has(hookName)) {
    hookCache.set(hookName, import("./hooks/" + hookName + ".js"));
  }

  const hook = await hookCache.get(hookName);

  const settings = await hook.default(element);

  if (
    typeof settings.style !== "undefined" &&
    settings.style &&
    !styleCache.has(hookName)
  ) {
    styleCache.set(hookName, true);

    document.head.innerHTML += `
      <link rel="stylesheet" href="./assets/styles/hooks/${hookName}.css" />
    `;
  }
});

export {};