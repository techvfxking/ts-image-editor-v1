export class Button {
    private button!: string;
    constructor() { }

    public setButton = (btnName: string, classNames: string): void => {
        this.button = `<button class="${classNames}">${btnName}</button>`
    }

    public getButton = () => {
        return this.button;
    }
}