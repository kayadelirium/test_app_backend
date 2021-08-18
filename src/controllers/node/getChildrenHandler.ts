import { Request, Response } from 'express';
import Node from '../../models/node';
import { INode, INodeRequestParams } from 'src/types/nodes';

export const getChildrenHandler = async (
    request: Request,
    response: Response
): Promise<void> => {
    const params: INodeRequestParams = request.params;
    const { id } = params;
    console.log(`getting children of ${id} node`);

    const nodesPromise = (): Promise<INode[]> =>
        new Promise(async (resolve) => {
            const nodes: INode[] | undefined = await Node.findAll({
                where: { parentId: id },
                raw: true,
            });
            const promises = [];
            nodes.forEach((child: INode) => {
                const childrenPromise: Promise<INode[]> = Node.findAll({
                    where: { parentId: child.id },
                    raw: true,
                });
                promises.push(childrenPromise);
            });

            Promise.all(promises).then((children) => {
                nodes.forEach((child, index) => {
                    child.hasChildren = children[index].length > 0;
                });
                resolve(nodes);
            });
        });

    try {
        const nodes = await nodesPromise();
        response.send(nodes);
    } catch (err) {
        console.log(err);
        response
            .status(501)
            .send(new Error('something went wrong! try one more time'));
    }
};
