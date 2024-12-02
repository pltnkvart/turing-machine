import Head from "../Head/Head";
import Printer from "../Printer/Printer";
import Tape from "../Tape/Tape";

type Rule = [string, string, "L" | "R"];
type Ruleset = { [state: string]: { [symbol: string]: Rule } };

class Machine {
    ruleset: Ruleset;
    tape: Tape;
    head: Head;

    constructor(ruleset: Ruleset, tape: Tape, head: Head) {
        this.ruleset = ruleset;
        this.tape = tape;
        this.head = head;
    }

    get status(): string {
        return `${this.tape.status} || ${this.head.status}`;
    }

    shiftHead(move: "L" | "R") {
        if (this.head.location === 0 && move === "L") {
            this.tape.extendLeft();
        } else if (this.head.location === this.tape.tape.length - 1 && move === "R") {
            this.tape.extendRight();
            this.head.location += 1;
        } else if (move === "L") {
            this.head.location -= 1;
        } else if (move === "R") {
            this.head.location += 1;
        }
    }

    stepLookup(): Rule | null {
        const currentStateRules = this.ruleset[this.head.state];
        if (currentStateRules) {
            return currentStateRules[this.tape.tape[this.head.location]] || null;
        }
        return null;
    }

    step(): void {
        const rule = this.stepLookup();
        if (rule) {
            const [new_state, new_symbol, move] = rule;
            this.tape.write(new_symbol, this.head.location);
            this.head.state = new_state;
            this.shiftHead(move);
        }
    }

    run(): void {
        while (this.stepLookup()) {
            Printer.print(this.status);
            this.step();
        }

        Printer.print(this.status);
        Printer.print("halt");
    }
}

export default Machine;