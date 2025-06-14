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
    }

    public setHTMLELementsEvents = () => {
        this._uploadButton.addEventListener("click", this.uploadButtonClick);
        this._fileInput.addEventListener("change", this.loadImageAfterFileInput);
    }

    private uploadButtonClick = ($event: MouseEvent) => {
        this._fileInput.click();
    }

    private loadImageAfterFileInput = ($event: Event) => {
        const selectedFiles = this._fileInput.files as FileList;
        const selectedFile = selectedFiles[0] || undefined;
        this._imageElement.src = URL.createObjectURL(selectedFile);
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