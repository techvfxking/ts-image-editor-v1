import { AppRoot } from "./components/app.component";
import "./style.css";
import { HelperService as helper, type TElementTypeBase } from "./utils/helper.service";

const main = (): void => {
    const app: TElementTypeBase = helper.getNodeElements("#app", 'Single') as TElementTypeBase;
    if (!helper.isNullOrEmpty(app)) {
        const appRoot: AppRoot = new AppRoot();
        app!.innerHTML = appRoot.getAppRootHTML() || "<h1>Hello World</h1>";
        
    }
}

main();