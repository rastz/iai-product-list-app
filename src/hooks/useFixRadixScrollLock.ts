import { useEffect } from "react";

/**
 * This is a bit wild — the Radix UI Dialog component adds `margin-right: 15px !important` to the `<body />`.
 * To undo that, I had to manually override it with JavaScript. It's a hack, but necessary.
 * In this app, layout shifts caused by the dialog really mess up the user experience.
 */
function useFixRadixScrollLock() {
  useEffect(() => {
    const body = document.body;

    const observer = new MutationObserver(() => {
      if (body.hasAttribute("data-scroll-locked")) {
        body.style.setProperty("margin-right", "0px", "important");
      } else {
        body.style.removeProperty("margin-right");
      }
    });

    observer.observe(body, {
      attributes: true,
      attributeFilter: ["style", "data-scroll-locked"],
    });

    return () => observer.disconnect();
  }, []);
}

export { useFixRadixScrollLock };
