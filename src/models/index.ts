"use strict";

import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];

const sequelize = config.url ? new Sequelize(config.url, config) : new Sequelize(config.database, config.username, config.password, config);

export { sequelize, Sequelize };