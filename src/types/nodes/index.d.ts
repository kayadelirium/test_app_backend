export interface INode {
    id?: number;
    name: string;
    ipAddress: string;
    port: number;
    parentId: number;

    hasChildren?: boolean;
}

export interface INodeRequestParams {
    id?: number;
}
