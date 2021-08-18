import Node from '../../models/node';
import { INode } from 'src/types/nodes';
import { Request, Response } from 'express';

export const getNodesHandler = async (
    request: Request,
    response: Response
): Promise<void> => {
    const nodes: INode[] = await Node.findAll({
        order: [['parentId', 'ASC NULLS FIRST']],
    });
    if (nodes) response.status(201).send(nodes);
};
