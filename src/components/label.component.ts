export class Label {
    private label!: string;
    constructor() { }

    public setLabel = (lblName: string): void => {
        this.label = `<label class="title">${lblName}</label>`
    }

    public getLabel = () => {
        return this.label;
    }
}