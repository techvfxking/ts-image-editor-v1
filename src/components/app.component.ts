import { Button } from "./button.component";
import { Label } from "./label.component";

export class AppRoot {
    private appRootHTML!: string;
    private filterLabel!: Label;

    constructor() {
        this.setLabels();
        this.setAppRootHTML();
    }

    private setAppRootHTML = (): void => {
        let appRootHTML: string;
        appRootHTML = `
            <h2>Image Editor V1</h2>
            <section class="wrapper">
                <div class="editor-panel">
                    <div class="filter">
                        ${this.filterLabel.getLabel()}
                    </div>
                </div>
            </section>
        `;

        this.appRootHTML = appRootHTML;
    }

    public getAppRootHTML = (): string | undefined => {
        return this.appRootHTML;
    }

    private setLabels = (): void => {
        this.filterLabel = new Label();
        this.filterLabel.setLabel("Filters");
    }
}