import { Request, Response } from 'express';
import Node from '../../models/node';
import { INode, INodeRequestParams } from 'src/types/nodes';

export const getNodeHandler = async (
	request: Request,
	response: Response
): Promise<void> => {
	const params: INodeRequestParams = request.params;
	const { id } = params;
	console.log(`getting node ${id}`);
	if (id) {
		const node: INode | undefined = await Node.findOne({
			where: { id: id },
			raw: true,
		});
		response.send(node);
	} else {
		response.status(404).send();
	}
};
