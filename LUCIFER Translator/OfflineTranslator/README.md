# LUCIFER Translator (Windows)

A private translator that runs **entirely on your PC**. Nothing you type is ever sent anywhere.
It has two engines, and both work with Wi-Fi off:

| Engine | What it's like | Powered by |
|---|---|---|
| **Standard** | Fast and light, but fairly literal | [Argos Translate](https://github.com/argosopentech/argos-translate) language packs |
| **AI · Human-like** | Translates meaning, tone and idioms the way a native speaker would. Choose Natural, Casual, Formal, Business or Literal tone. Supports 50+ languages, including Burmese, Thai, Khmer and Lao | A local AI model (e.g. Google Gemma 3) running in [Ollama](https://ollama.com) |

You only need internet once, to download the language packs and AI model you want.

## Easiest: ready-made .exe (nothing to install on Windows)

GitHub's free Windows build machines make the `.exe` for you. The build includes the Chinese ⇄ Arabic ⇄ English
language packs, and it's tested automatically before you download it. You only need a free GitHub account.

**One-time setup (5 minutes, on any computer):**
1. Sign in at <https://github.com> and click **New repository**. Name it `lucifer-translator`, choose **Private**,
   and click **Create repository**.
2. On the new repository page, click **uploading an existing file**.
3. On a Mac, open the `OfflineTranslator` folder in Finder and press **Cmd + Shift + .** so the hidden `.github`
   folder appears. Select **everything inside** the folder (Cmd + A), including `.github`, and drag it onto the
   GitHub page. Then click **Commit changes**.
4. Open the **Actions** tab. A build named **Build Windows app** starts by itself and takes about 20–30 minutes.

**Download:** when the build shows a green tick, click it. Under **Artifacts**, click
**LuciferTranslator-Windows** to download a zip.

**On the Windows PC:** unzip it and double-click **`LuciferTranslator.exe`**. Windows may show
"Windows protected your PC" because the app isn't from a big publisher; click **More info → Run anyway**.

Every time you upload changed files, GitHub builds a fresh `.exe`. To rebuild without changes, open
**Actions → Build Windows app → Run workflow**.

## Run from source (needs Python)

1. Copy this `OfflineTranslator` folder to the Windows PC.
2. Double-click **`setup.bat`**. It runs once:
   - It needs **Python 3.12**, even if a newer Python is installed. If 3.12 is missing, it offers to
     install it for you; answer **Y**. Newer versions (3.13, 3.14) can't install the translation engine yet.
   - It then downloads the engine (about 1 GB, 10–20 minutes).
3. Double-click **`run.bat`**.

Don't run `pip install -r requirements.txt` yourself. `setup.bat` picks the right Python and installs
everything into `%LOCALAPPDATA%\LuciferTranslator\venv`, a short path that avoids Windows' long-path errors.

### Chinese ⇄ Arabic (built in)
**Chinese → Arabic** and **Arabic → Chinese** are always pinned as quick buttons above the text box, in both engines.
- **AI mode:** works as soon as a model is installed. The AI translates directly between Chinese and Arabic.
  **Qwen 2.5 · 7B** gives especially good results for this pair.
- **Standard mode:** click either button, or **Language Packs → Quick setup → Chinese ⇄ Arabic → Install**.
  This downloads 4 packs (Chinese ⇄ English and Arabic ⇄ English). Argos has no direct Chinese–Arabic model,
  so the app translates through English automatically. AI mode gives more natural results for this pair.

Arabic is shown right-to-left automatically, in the text box, the result and History.

### Set up Standard mode for other languages
Click **Language Packs → Refresh list**, then **Install** the directions you need, for example
*English → Spanish* and *Spanish → English*.

### Set up AI mode (recommended for natural translations)
1. Install **Ollama for Windows** from <https://ollama.com/download>. It runs quietly in the system tray.
2. In the app, open **AI Engine** and click **Download** next to a model:
   - **Gemma 3 · 4B** works best for most PCs (≈3.3 GB, 8 GB RAM).
   - **Gemma 3 · 12B** gives the most natural results but needs 16 GB RAM or a graphics card.
   - **Gemma 3 · 1B** is for older PCs, with lower quality.
3. Switch the top bar to **AI · Human-like** and start typing.

AI mode is slower than Standard, especially without a graphics card. The text appears word by word as
the model writes it, and you can press **Esc** or the stop button at any time.

## Using it

- Type or paste into the box. With **Live** on, the translation updates as you pause; otherwise press **Ctrl+Enter**.
- **⇄** swaps the languages and puts the translation back into the input.
- **Open file** loads a `.txt`, `.md`, `.srt` or `.csv` file. **Export** saves the translation as `.txt`.
- **History** keeps your translations on this PC only. Click one to reopen it.
- In Standard mode, if there's no direct pack between two languages, the app routes through English automatically.

## Make a standalone .exe

After `setup.bat` (and after installing the packs you want), double-click **`build_exe.bat`**. You get
`%LOCALAPPDATA%\LuciferTranslator\dist\LuciferTranslator\LuciferTranslator.exe`, with your packs copied into its
`models` folder. That folder opens automatically when the build finishes.
Zip that folder and it runs on any 64-bit Windows 10/11 PC without Python or internet.
For AI mode, that PC also needs Ollama and a model.

## PCs that are never online

- **Standard:** download `.argosmodel` files on another computer from the
  [Argos package index](https://www.argosopentech.com/argospm/index/). Copy them over and use **Language Packs → Install from file**.
- **AI:** install Ollama and pull a model on a connected PC. Then copy the Ollama installer and the
  `%USERPROFILE%\.ollama\models` folder to the offline PC.

## Where things are stored

Language packs, history and settings are saved in the `models` folder next to the app, so the whole folder
is portable. If that folder is read-only, they go to `%LOCALAPPDATA%\LuciferTranslator\models` instead.
Ollama keeps its AI models in `%USERPROFILE%\.ollama`.

## Files

| File | Purpose |
|---|---|
| `translator.py` | Python backend: Argos + Ollama engines, history, files |
| `ui/index.html`, `ui/style.css`, `ui/app.js` | The interface |
| `ui/demo.js` | Fake backend for previewing the UI in a browser (`index.html?demo`) |
| `setup.bat` / `run.bat` / `build_exe.bat` | Install, run, and build the `.exe` on your own PC |
| `build_exe.py` | Packaging settings shared by `build_exe.bat` and the GitHub build |
| `.github/workflows/build-windows.yml` | GitHub build: makes, tests and publishes the ready-made `.exe` |

## Troubleshooting

- **The window is blank or won't open:** the app needs the Microsoft Edge WebView2 Runtime. It's built into Windows 11 and up-to-date Windows 10; otherwise install it from Microsoft.
- **AI Engine says "Ollama isn't running":** start Ollama from the Start menu, then click **Check again**.
- **AI translation is very slow:** use a smaller model (Gemma 3 · 1B or 4B), or keep Live off and press Ctrl+Enter when you're done typing.
- **`setup.bat` fails while installing packages:** the full error is in `setup-log.txt` in this folder.
  Running `setup.bat` again is safe, because it removes any broken environment first. Common causes:
  - **No internet, or a proxy or firewall blocking pypi.org:** try another network.
  - **Not enough disk space:** about 3 GB free is needed.
  - **"Long Path support" error:** Windows can't handle the long file paths in the torch package.
    `setup.bat` already uses a short folder to avoid this; if it still appears, enable long paths. Open
    PowerShell as administrator and run
    `New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name LongPathsEnabled -Value 1 -PropertyType DWORD -Force`,
    then restart and run `setup.bat` again.
- **The .exe shows an error when it starts:** the message box now says what went wrong. The full details
  are in `models\lucifer.log` next to the `.exe`; send that file to get help. If only the Standard engine
  fails, the app still opens in AI mode.
- **The GitHub build has a red ✗:** click it and open the failed step. The **Self-test** step prints exactly
  which part failed.
- **To see error messages when the app won't start (run from source):** open a Command Prompt in this folder and run
  `"%LOCALAPPDATA%\LuciferTranslator\venv\Scripts\python.exe" translator.py`.
