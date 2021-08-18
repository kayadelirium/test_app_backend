import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
import { Sequelize } from 'sequelize';

export interface INodeAttributes {
	id?: number;
	name: string;
	ipAddress: string;
	port: number;
	parentId: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface INodeInstance
	extends Model<INodeAttributes>,
		INodeAttributes {}

const Node = sequelize.define<INodeInstance>('Nodes', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.UUID,
		unique: true,
	},
	name: {
		allowNull: true,
		type: DataTypes.TEXT,
		unique: true,
	},
	ipAddress: {
		allowNull: true,
		type: DataTypes.TEXT,
		unique: true,
	},
	port: {
		allowNull: true,
		type: DataTypes.INTEGER,
		unique: true,
	},
	parentId: {
		allowNull: true,
		type: DataTypes.INTEGER,
	},
});

export default Node;
