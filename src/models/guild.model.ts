export interface ICategoryOutput {
    id: string;
    name: string;
    permitted: boolean;
}

export interface ILocalTime {
    hour: number;
    minute: number;
    nano: number;
    second: number;
}
export interface ICategoryCommandOutput {
    categoryId: string;
    closingTime: ILocalTime;
    fileUrl?: string;
    id: string;
    openingTime: ILocalTime;
    protocols?: [];
    status: "CONDITIONAL_QUALIFIED" | "DISQUALIFIED" | "NONE" | "QUALIFIED";
    title: string;
}

export interface IEmployeeOutput {
    excluded: boolean;
    exclusionTime?: string | null;
    nationalId: string;
    status: "CONDITIONAL_QUALIFIED" | "DISQUALIFIED" | "NONE" | "QUALIFIED";
    statusUpdatedAt?: string;
    to?: string;
}

export interface IResponseGuildBrief {
    category: ICategoryOutput
    guildCode: string;
    id: string;
}
export interface IResponseGuildInfo {
    address?: string;
    area?: string;
    category?: ICategoryOutput;
    categoryCommandList?: ICategoryCommandOutput[];
    city?: string;
    employees?: IEmployeeOutput[];
    expireDate?: string;
    guildCode: string;
    issueDate?: string;
    licStatus?: "IN_VALID" | "VALID";
    ownerNationalId?: string;
    postalCode?: string;
    province?: string;
    qrCode?: string;
    status: "CONDITIONAL_QUALIFIED" | "DISQUALIFIED" | "NONE" | "QUALIFIED";
}


export interface IEmployeeExclusionInput {
    excluded: boolean;
    exclusionTime?: string;
    guildCode: string;
    nationalId: string;
    to?: string;
}