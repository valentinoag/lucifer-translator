"""Build the standalone LuciferTranslator app folder with PyInstaller.

Used by build_exe.bat and the GitHub Actions workflow (.github/workflows/build-windows.yml).

    python build_exe.py [DIST_DIR] [WORK_DIR]
"""
import importlib.util
import os
import sys

import PyInstaller.__main__

HERE = os.path.dirname(os.path.abspath(__file__))

# Packages whose data files, submodules and metadata must all be bundled. The translation
# engine loads several of these dynamically, which PyInstaller can't detect on its own.
COLLECT_ALL = [
    "webview", "argostranslate", "ctranslate2", "sentencepiece", "stanza", "minisbd",
    "spacy", "thinc", "srsly", "spacy_legacy", "spacy_loggers", "sacremoses", "onnxruntime",
]


def main():
    dist = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "dist")
    work = sys.argv[2] if len(sys.argv) > 2 else os.path.join(HERE, "build")
    args = [
        os.path.join(HERE, "translator.py"),
        "--name", "LuciferTranslator",
        "--noconfirm", "--clean", "--windowed",
        "--distpath", dist, "--workpath", work, "--specpath", work,
        "--add-data", f"{os.path.join(HERE, 'ui')}{os.pathsep}ui",
        "--recursive-copy-metadata", "argostranslate",
    ]
    for name in COLLECT_ALL:
        if importlib.util.find_spec(name) is not None:  # only what this engine version uses
            args += ["--collect-all", name]
    PyInstaller.__main__.run(args)


if __name__ == "__main__":
    main()
