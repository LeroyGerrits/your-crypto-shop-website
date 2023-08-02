export class NewsMessage {
    Id!: string;
    Title!: string;
    Date!: Date;
    ThumbnailUrl!: string;
    Intro!: string;
    Content?: string;

    SearchEngineFriendlyTitle: string = this.Title != null ? this.Title.trim().replace(/\W+/g, '-').toLowerCase() : '';
}