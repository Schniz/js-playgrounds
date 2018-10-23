"use babel";

import { CompositeDisposable, Point } from "atom";
import babelPlugin from "babel-plugin-js-playgrounds";
import { transform } from "@babel/core";
import { exec } from "child_process";
import { writeFile, unlink } from "fs";
import { basename, dirname, resolve } from "path";
import { promisify } from "util";
import parsePlaygroundResult from "js-playgrounds/src/parseResult";
import debounce from "debounce";

const asyncExec = promisify(exec);
const writeFileAsync = promisify(writeFile);
const unlinkAsync = promisify(unlink);

const displayMarkerByFile = {};

export default {
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view

    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "js-playground:toggle": () => this.toggle()
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
    Object.keys(displayMarkerByFile).forEach(file =>
      this.removeAllMarkers(file)
    );
  },

  serialize() {
    return {};
  },

  removeAllMarkers(file) {
    if (displayMarkerByFile[file]) {
      displayMarkerByFile[file].forEach(marker => marker.destroy());
      displayMarkerByFile[file] = [];
    }
  },

  toggle() {
    atom.workspace.observeTextEditors(editor => {
      const redraw = async () => {
        const originalPath = editor.getPath();
        const newPath = resolve(
          dirname(originalPath),
          `.js-playgrounds.${basename(originalPath)}`
        );

        try {
          const { code } = transform(editor.getText(), {
            plugins: [babelPlugin]
          });

          await writeFileAsync(newPath, code);

          const { stdout } = await asyncExec(`node ${newPath}`);
          const parsed = parsePlaygroundResult(stdout);

          this.removeAllMarkers(originalPath);
          displayMarkerByFile[originalPath] = parsed.playground.map(
            ({ expr, loc: { end } }) => {
              const position = new Point(end.line - 1, 0);
              const marker = editor.markBufferPosition(position);

              const span = document.createElement("div");
              span.style.opacity = 0.7;
              span.innerText = expr;

              editor.decorateMarker(marker, {
                type: "block",
                item: span,
                position: "after"
              });
              return marker;
            }
          );
        } catch (e) {
          this.removeAllMarkers(originalPath);
          console.error(e, Object.assign({}, e));
        } finally {
          try {
            await unlinkAsync(newPath);
          } catch (e) {
            console.error("Error deleting file", e);
          }
        }
      };

      editor.onDidStopChanging(debounce(redraw, 200));
      redraw();
    });
    console.log("AtomJsPlayground was toggled!");
  }
};
