class Tape {
    tape: string[];

    constructor(input: string) {
        this.tape = Tape.parse(input);
    }

    get status() {
        return this.tape.join(" ");
    }

    extendLeft() {
        this.tape.unshift("B");
    }

    extendRight() {
        this.tape.push("B");
    }

    write(symbol: string, location: number) {
        this.tape[location] = symbol;
    }

    static parse(input: string): string[] {
        return input.split(" ");
    }
}

export default Tape;
