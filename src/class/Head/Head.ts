class Head {
    state: string;
    location: number;

    constructor(location: number = 0, state: string = '') {
        this.location = location;
        this.state = state;
    }

    get status() {
        return `Head state: ${this.state} | Location: ${this.location}`;
    }

    update(state: string = '', location: number = 0) {
        this.state = state;
        this.location = location;
    }
}

export default Head;