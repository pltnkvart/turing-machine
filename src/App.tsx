import { useEffect, useCallback } from "react";
import Printer from "./class/Printer/Printer";
import Tape from "./class/Tape/Tape";
import Head from "./class/Head/Head";
import Machine from "./class/Machine/Machine";

export const initialize = (): void => {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      Printer.clear();

      try {
        const rulesetValue = (form.elements.namedItem('ruleset') as HTMLInputElement)?.value;
        const tapeValue = (form.elements.namedItem('tape') as HTMLInputElement)?.value;
        const headValue = (form.elements.namedItem('head') as HTMLInputElement)?.value;

        if (!rulesetValue || !tapeValue || !headValue) {
          console.error("Please fill in all fields.");
          return;
        }

        const ruleset = JSON.parse(rulesetValue);

        const tape = new Tape(tapeValue);
        const head = new Head(Number(headValue.split(" ")[1]), String(headValue).split(" ")[0]);

        const m = new Machine(ruleset, tape, head);
        m.run();
      } catch (error) {
        console.error("Error processing input:", error);
      }
    });
  }
};

function App() {
  const initializeCallback = useCallback(initialize, []);

  useEffect(() => {
    initializeCallback();
  }, [initializeCallback]);

  return (
    <>
      <form>
        <label htmlFor="ruleset">Ruleset</label>
        <input type="text" id="ruleset" name="ruleset" />
        <label htmlFor="tape">Tape</label>
        <input type="text" id="tape" name="tape" />
        <label htmlFor="head">Head Initial Setting</label>
        <input type="text" id="head" name="head" />
        <button type="submit" value="run">Run</button>
      </form>
      <div className="content"></div>
    </>
  );
}

export default App;