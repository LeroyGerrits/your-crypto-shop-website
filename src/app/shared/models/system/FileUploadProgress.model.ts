export class FileUploadProgress {
    Number!: number;
    FileName!: string;
    Progress: number = 0;
    Message?: string;
    Finished: boolean = false;
    Visible: boolean = true;
}