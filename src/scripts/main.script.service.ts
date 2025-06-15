import { HelperService as helper } from "../utils/helper.service";

export class MainScriptService {
    private _htmlControls!: HTMLControls;

    private _fileInput!: HTMLInputElement;
    private _uploadButton!: HTMLButtonElement;
    private _saveButton!: HTMLButtonElement;
    private _imageArea!: HTMLDivElement;
    private _imageElement!: HTMLImageElement;
    private _filterOptions!: NodeListOf<HTMLButtonElement>;
    private _rotateOptions!: NodeListOf<HTMLButtonElement>;
    private _filterName!: HTMLParagraphElement;
    private _filterValue!: HTMLParagraphElement;
    private _filterSliderInput!: HTMLInputElement;
    private _resetFilterBtn!: HTMLButtonElement;
    private _mainContainer!: HTMLElement;

    public setHTMLControls = () => {
        this._htmlControls = {
            brightness: 100,
            saturation: 100,
            inversion: 0,
            grayscale: 0,
            rotate: 0,
            flipHor: 1,
            flipVer: 1
        }
    }

    public setHTMLElements = () => {
        this._fileInput = helper.getNodeElements(".file-input", "Single") as HTMLInputElement;
        this._uploadButton = helper.getNodeElements(".choose-img", "Single") as HTMLButtonElement;
        this._saveButton = helper.getNodeElements(".save-img", "Single") as HTMLButtonElement;
        this._imageArea = helper.getNodeElements(".preview-img", "Single") as HTMLDivElement;
        this._imageElement = helper.getNodeElements(".preview-img img", "Single") as HTMLImageElement;
        this._filterOptions = helper.getNodeElements(".filter button", "All") as NodeListOf<HTMLButtonElement>;
        this._rotateOptions = helper.getNodeElements(".rotate button", "All") as NodeListOf<HTMLButtonElement>;
        this._filterName = helper.getNodeElements(".filter-info .name", "Single") as HTMLParagraphElement;
        this._filterValue = helper.getNodeElements(".filter-info .value", "Single") as HTMLParagraphElement;
        this._filterSliderInput = helper.getNodeElements(".slider input", "Single") as HTMLInputElement;
        this._resetFilterBtn = helper.getNodeElements(".reset-filter", "Single") as HTMLButtonElement;
        this._mainContainer = helper.getNodeElements(".container", "Single") as HTMLElement;
    }

    public setHTMLELementsEvents = () => {
        this._uploadButton.addEventListener("click", this.uploadButtonClick);
        this._fileInput.addEventListener("change", this.afterFileInput);
        this._imageElement.addEventListener("load", this.afterImageLoad)
    }

    private uploadButtonClick = ($event: MouseEvent) => {
        $event.preventDefault();
        this._fileInput.click();
    }

    private afterFileInput = ($event: Event) => {
        $event.preventDefault();

        const file = this.returnAndValidateFile($event);
        if (helper.isNullOrEmpty(file))
            return;

        this._htmlControls = {
            ...this._htmlControls,
            brightness: 100,
            saturation: 100,
            inversion: 0,
            grayscale: 0,
            flipHor: 1,
            flipVer: 1,
            rotate: 0
        }

        if (!helper.isNullOrEmpty(this._filterOptions) && this._filterOptions.length > 0)
            this._filterOptions[0].click();

        this.applyFilter();
        this._imageElement.src = URL.createObjectURL(file!);
    }

    private afterImageLoad = ($event: Event) => {
        $event.preventDefault();
        const file = this.returnAndValidateFile($event);
        if (helper.isNullOrEmpty(file))
            return;
        const disableStatus = this._mainContainer.classList.contains("disable");
        if (disableStatus)
            this._mainContainer.classList.remove("disable");
    }

    private returnAndValidateFile = ($event: Event) => {
        $event.preventDefault();
        const selectedFiles = this._fileInput.files as FileList | undefined | null;
        const selectedFile = selectedFiles![0];
        if (helper.isNullOrEmpty(selectedFile))
            return undefined;
        else
            return selectedFile;

    }

    private applyFilter = () => {
        const { brightness, grayscale, inversion, saturation, rotate, flipHor, flipVer } = this._htmlControls;
        this._imageElement.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
        this._imageElement.style.transform = `rotate(${rotate}deg) scale(${flipHor}, ${flipVer})`;
    }




}

export declare type HTMLControls = {
    brightness: number;
    saturation: number;
    inversion: number;
    grayscale: number;
    rotate: number;
    flipHor: number;
    flipVer: number;
}