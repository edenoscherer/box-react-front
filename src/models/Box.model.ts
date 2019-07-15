import FileModel from "./File.model";

export default interface BoxModel {
    title: string;
    files: FileModel[];
    createdAt: string;
    updatedAt: string;
}
