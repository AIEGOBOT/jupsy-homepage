const pendingSectionScrollKey = "jupsy-pending-scroll-target";

export function storePendingSectionScroll(sectionId) {
  if (typeof window === "undefined" || !sectionId) {
    return;
  }

  window.sessionStorage.setItem(pendingSectionScrollKey, sectionId);
}

export function consumePendingSectionScroll() {
  if (typeof window === "undefined") {
    return null;
  }

  const sectionId = window.sessionStorage.getItem(pendingSectionScrollKey);

  if (!sectionId) {
    return null;
  }

  window.sessionStorage.removeItem(pendingSectionScrollKey);
  return sectionId;
}

export function scrollToSection(sectionId) {
  if (typeof window === "undefined") {
    return;
  }

  if (!sectionId || sectionId === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
