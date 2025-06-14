import { AppRoot } from "./components/app.component";
import { MainScriptService } from "./scripts/main.script.service";
import "./style.css";
import { HelperService as helper, type TElementTypeBase } from "./utils/helper.service";

const main = (): void => {
    const app: TElementTypeBase = helper.getNodeElements("#app", 'Single') as TElementTypeBase;
    if (!helper.isNullOrEmpty(app)) {
        let script!: MainScriptService;
        const appRoot: AppRoot = new AppRoot();
        app!.innerHTML = appRoot.getAppRootHTML() || "<h1>Hello World</h1>";

        script = new MainScriptService();
        script.setHTMLControls();
        script.setHTMLElements();
        script.setHTMLELementsEvents();
    }
}

main();