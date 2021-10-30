export interface IResponseGuildMessage {
    content: IPublishedMessageOutputModel[] | undefined;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: IPagable;
    sort: ISort;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface IPublishedMessageOutputModel {
    content?: string;
    fileUrl?: string;
    id: string;
    publishedAt?: string;
    seenAt?: string;
    title?: string;
}


export interface IMessageSeenInput {
  messageId: string;
  guildCode: string;
}



export interface IPagable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: ISort;
    unpaged: boolean;
}

export interface ISort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}