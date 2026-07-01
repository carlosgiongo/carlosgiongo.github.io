const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const languageLinks = document.querySelectorAll("[data-lang-switch]");

const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      return;
    }
  },
};

languageLinks.forEach((link) => {
  link.addEventListener("click", () => {
    storage.set("preferredLanguage", link.dataset.langSwitch || "");
  });
});

const preferredLanguage = storage.get("preferredLanguage");

if (!preferredLanguage) {
  const browserLanguages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
  const wantsPortuguese = browserLanguages.some((language) => language.toLowerCase().startsWith("pt"));
  const path = window.location.pathname.replace(/\/index\.html$/, "/");
  const isEnglishPage = path === "/en/" || path.endsWith("/en/");
  const isPortugueseHome = path === "/" || path.endsWith("/site-pessoal/");

  if (!wantsPortuguese && isPortugueseHome) {
    window.location.replace("en/");
  }

  if (wantsPortuguese && isEnglishPage) {
    window.location.replace("../");
  }
}
