class Printer {
    static print(message: string): void {
        const div: HTMLElement | null = document.querySelector("div.content");
        if (div) {
            const p = document.createElement("p");
            p.innerText = message;
            div.appendChild(p);
        } else {
            console.error("Div with class 'content' not found");
        }
    }

    static clear(): void {
        const div: HTMLElement | null = document.querySelector("div.content");
        if (div) {
            div.innerHTML = "";
        } else {
            console.error("Div with class 'content' not found");
        }
    }
}

export default Printer;