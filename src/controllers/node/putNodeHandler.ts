import { Request, Response } from 'express';
import Node from '../../models/node';
import { INode, INodeRequestParams } from 'src/types/nodes';

export const putNodeHandler = async (
    request: Request,
    response: Response
): Promise<INode | void> => {
    const body: INode = request.body;
    const params: INodeRequestParams = request.params;
    const { id } = params;
    const { name, ipAddress, port } = body;
    console.log(`updating ${id} node`);
    const node = await Node.findByPk(id);
    if (node) {
        try {
            await Node.update({ name, ipAddress, port }, { where: { id } });
            const updatedNode = Node.findByPk(id);
            console.log(updatedNode);
            response.status(201).send(updatedNode);
        } catch (err) {
            console.log(err);
            response.status(422).send(err);
        }
    } else response.status(401).send(new Error('something went wrong :('));
};
