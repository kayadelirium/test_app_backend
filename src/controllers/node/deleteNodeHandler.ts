import { Request, Response } from 'express';
import Node from '../../models/node';
import { INode, INodeRequestParams } from 'src/types/nodes';

export const deleteNodeHandler = async (
	request: Request,
	response: Response
): Promise<void> => {
	const params: INodeRequestParams = request.params;
	console.log(params);
	const { id } = params;
	console.log(`deleting node ${id}`);

	if (id) {
		await Node.destroy({ where: { id } });
		response.status(200).send();
	} else response.status(404).send();
};
