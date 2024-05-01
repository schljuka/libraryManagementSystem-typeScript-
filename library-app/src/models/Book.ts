export type Book = {
    _id: string;
    barcoode: string;
    cover: string;
    title: string;
    authors: string[];
    description: string;
    subjects: string[];
    publicationDate: Date;
    publisher: string;
    pages: number;
    genre: string;
    records: [];
}