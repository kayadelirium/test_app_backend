import { Request, Response } from 'express';
import Node from '../../models/node';
import { INode } from 'src/types/nodes';

export const getRootChildrenHandler = async (
    request: Request,
    response: Response
): Promise<void> => {
    console.log(`getting children of the root`);

    const nodesPromise = (): Promise<INode[]> =>
        new Promise(async (resolve) => {
            const nodes: INode[] | undefined = await Node.findAll({
                where: { parentId: null },
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
    } catch {
        response.status(500).send();
    }
};
