import 'dotenv/config';
import * as joi from 'joi'

interface EnvVars {
    PORT:number;
    PRODUCTS_SERVICE_HOST:string;
    PRODUCTS_SERVICE_PORT:number;
    //DATABASE_URL:string;
}

const envVarsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_SERVICE_HOST: joi.string().required(),
    PRODUCTS_SERVICE_PORT: joi.number().required(),
    //DATABASE_URL: joi.string().required(),
}).unknown(true)

const {error, value} = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    productsService: {
        host: envVars.PRODUCTS_SERVICE_HOST,
        port: envVars.PRODUCTS_SERVICE_PORT,
    },
    //databaseUrl: envVars.DATABASE_URL,
}
