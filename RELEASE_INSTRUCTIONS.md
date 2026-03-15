# Swordhaven - Iron Conspiracy Save Editor - Release Instructions

Use editor without downloading HERE: [`https://saveeditors.github.io/swordhaven-save-editor/`](https://saveeditors.github.io/swordhaven-save-editor/)

## Deployment Notes + Default Save Locations

- Repo: `swordhaven-save-editor`
- Deployment target: GitHub Pages static root (`index.html` in repo root) and optional desktop shell packaging.
- Keep all paths relative so Pages, ZIP release, and local static hosting behave the same.
- Browser mode exports downloaded files and cannot overwrite game files in place due sandbox limits.
- Windows default save locations:
  - Steam: `%USERPROFILE%\AppData\LocalLow\AtomTeam\Swordhaven\`
  - Game Pass / Microsoft Store: `%LOCALAPPDATA%\Packages\<Swordhaven package family>\SystemAppData\wgs\`
- Common save payloads: `Save_*.as` and `Progress\*`

## Quick Run (Local Static Host)

```powershell
python -m http.server 8080
```

Then open <http://127.0.0.1:8080>.

## Release Checklist

1. Confirm nav links point to repo, issues, and all-editors homepage.
2. Confirm deployment note and save paths are present near top of README/release docs.
3. Build ZIP release from repo root with instructions and assets included.
4. Publish/update GitHub Pages from `main` root.
