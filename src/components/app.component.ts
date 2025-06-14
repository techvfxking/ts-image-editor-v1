import { Button } from "./button.component";
import { Label } from "./label.component";
import previewImg from "/img-placeholder.svg";

export class AppRoot {
    private appRootHTML!: string;

    constructor() {
        this.setAppRootHTML();
    }

    private setAppRootHTML = (): void => {
        let appRootHTML: string;
        appRootHTML = `
            <h2>Image Editor V1</h2>
            <section class="wrapper">
                <div class="editor-panel">
                    <div class="filter">
                        ${this.setLabel("Filters", new Label()).getLabel()}
                        <div class="options">
                            ${this.createFilterButtons()}
                        </div>
                        <div class="slider">
                            <div class="filter-info">
                                <p class="name">Brightness</p>
                                <p class="value">100%</p>
                            </div>
                            <input type="range" value="100" min="0" max="200" aria-label="Adjust filter value" />
                        </div>
                    </div>
                    <div class="rotate">
                        ${this.setLabel("Rotate & Flip", new Label()).getLabel()}
                        <div class="options">
                            ${this.createRotateFlipButtons()}
                        </div>
                    </div>
                </div>
                <div class="preview-img">
                    <img src="${previewImg}" alt="Image Placeholder" />
                </div>
            </section>
            <section class="controls">
                ${this.setButton("Reset Filters", new Button(),"reset-filter").getButton()}
                <div class="row">
                    <input type="file" class="file-input" accept="image/*" hidden/>
                    ${this.setButton("Choose Image", new Button(), "choose-img").getButton()}
                    ${this.setButton("Save Image", new Button(), "save-img").getButton()}
                </div>
            </section>
        `;

        this.appRootHTML = appRootHTML;
    }

    public getAppRootHTML = (): string | undefined => {
        return this.appRootHTML;
    }

    private createFilterButtons = () => {
        const filterBtnNameArr = ["Brightness", "Saturation", "Inversion", "Grayscale"];
        return filterBtnNameArr
            .map((item) => {
                let classes = `filter-btn ${item.toLowerCase()}`
                let buttonClass = item === "Brightness" ? `${classes} active` : classes;
                let btn!: Button;
                btn = this.setButton(item, btn, buttonClass)
                return btn.getButton();
            }).join(" ");
    };

    private createRotateFlipButtons = () => {

        const roateFlipBtnNameArr = [
            { name: `<i class="fa-solid fa-rotate-left"></i>`, class: `left` },
            { name: `<i class="fa-solid fa-rotate-right"></i>`, class: `right` },
            { name: `<i class="bx bx-reflect-vertical"></i>`, class: `vertical` },
            { name: `<i class="bx bx-reflect-horizontal"></i>`, class: `horizontal` },
        ];
        return roateFlipBtnNameArr
            .map((item, index) => {
                let btn!: Button;
                btn = this.setButton(item.name, btn, `rotate-flip-btn rotate-${index} ${item.class}`)
                return btn.getButton();
            }).join(" ");
    };

    private setLabel = (labelName: string, context: Label, className: string = ""): Label => {
        context = new Label();
        context.setLabel(labelName, className);
        return context;
    }

    private setButton = (btnName: string, context: Button, className: string = ""): Button => {
        context = new Button();
        context.setButton(btnName, className);
        return context;
    }


}