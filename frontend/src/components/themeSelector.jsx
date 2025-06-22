import React, { useEffect, useState } from "react";

const ThemeSelector = () => {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "forest",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (e) => {
    setCurrentTheme(e.target.value);
  };

  return (
    <select
      className="select select-bordered select-sm bg-base-200 text-base-content"
      value={currentTheme}
      onChange={handleThemeChange}
      title="Select Theme"
    >
      {themes.map((theme) => (
        <option key={theme} value={theme}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default ThemeSelector;
