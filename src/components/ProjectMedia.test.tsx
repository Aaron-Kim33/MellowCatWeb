import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ProjectMedia from "./ProjectMedia";
import { PortfolioLanguageProvider } from "@/lib/portfolio-language";
import { contentCopy, lumberResources } from "@/lib/portfolio-content";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("Lumber Rush media", () => {
  for (const language of ["ko", "en"] as const) {
    it(`shows resources and loads the player only after a click (${language})`, () => {
      localStorage.setItem("mellowcat-language", language);
      const { container } = render(<PortfolioLanguageProvider><ProjectMedia id="lumber-rush" compact /></PortfolioLanguageProvider>);
      expect(container.querySelector("iframe")).toBeNull();
      for (const resource of lumberResources) {
        expect(screen.getByRole("link", { name: resource.label[language] })).toHaveAttribute("href", resource.url);
      }
      expect(screen.getByText(contentCopy[language].previewNotice)).toBeInTheDocument();
      expect(screen.getByText(contentCopy[language].walletNotice)).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: new RegExp(contentCopy[language].playDemo) }));
      expect(container.querySelector("iframe")).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/OJtHmIFAJ9s");
    });
  }

  it("keeps Launcher media and links independent", () => {
    localStorage.setItem("mellowcat-language", "en");
    render(<PortfolioLanguageProvider><ProjectMedia id="mellowcat-launcher" compact /></PortfolioLanguageProvider>);
    expect(screen.getByText(contentCopy.en.launcherVideoPending)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Android APK · Preview build" })).toBeNull();
  });

  it("shows all four supplied screens with links to uncropped originals", () => {
    localStorage.setItem("mellowcat-language", "en");
    render(<PortfolioLanguageProvider><ProjectMedia id="lumber-rush" /></PortfolioLanguageProvider>);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(4);
    for (const image of images) {
      expect(image).toHaveAttribute("loading", "lazy");
      expect(image.closest("a")).toHaveAttribute("href", image.getAttribute("src"));
    }
    expect(screen.queryByText(contentCopy.en.screenshotPending)).toBeNull();
  });
});
