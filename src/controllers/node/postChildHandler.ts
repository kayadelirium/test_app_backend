import { Request, Response } from 'express';
import Node from '../../models/node';
import { INode, INodeRequestParams } from 'src/types/nodes';

export const postChildHandler = async (
    request: Request,
    response: Response
): Promise<INode | void> => {
    const body: INode = request.body;
    console.log('BODY: ', body);
    const { name, ipAddress, port, parentId } = body;
    console.log(`posting child of ${parentId} node`);
    console.log(`${name} ${ipAddress} ${port}`);
    try {
        const newNode = Node.build({
            name,
            ipAddress,
            port,
            parentId,
        });
        await newNode.save();
        response.status(201).send(newNode);
    } catch (err) {
        console.log(err);
        response
            .status(422)
            .send(
                new Error(
                    'sorry, that name / ip / port is already in the tree! try again'
                )
            );
    }
};
