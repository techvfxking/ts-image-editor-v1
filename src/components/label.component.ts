export class Label {
    private label!: string;
    constructor() { }

    public setLabel = (lblName: string, className: string): void => {
        this.label = `<label class="title ${className}">${lblName}</label>`
    }

    public getLabel = () => {
        return this.label;
    }
}