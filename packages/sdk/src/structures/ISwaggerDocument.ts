import { ISwaggerComponents } from "./ISwaggerComponents";
import { ISwaggerRoute } from "./ISwaggerRoute";

/**
 * Swagger Document.
 *
 * `ISwaggerDocument` is a data structure representing content of `swagger.json` file
 * generated by Nestia. Note that, this is not an universal structure, but a dedicated
 * structure only for Nestia.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface ISwaggerDocument {
    /**
     * The version of the OpenAPI document.
     *
     * Nestia always generate OpenAPI 3.0.x document.
     */
    openapi: `3.0.${number}`;

    /**
     * List of servers that provide the API.
     */
    servers: ISwaggerDocument.IServer[];

    /**
     * Information about the API.
     */
    info: ISwaggerDocument.IInfo;

    /**
     * The available paths and operations for the API.
     *
     * The 1st key is the path, and the 2nd key is the HTTP method.
     */
    paths: Record<string, Record<string, ISwaggerRoute>>;

    /**
     * An object to hold reusable data structures.
     *
     * It stores both DTO schemas and security schemes.
     *
     * For reference, `nestia` defines every object and alias types as reusable DTO
     * schemas. The alias type means that defined by `type` keyword in TypeScript.
     */
    components: ISwaggerComponents;

    /**
     * A declaration of which security mechanisms can be used across the API.
     *
     * When this property be configured, it would be overwritten in every API routes.
     *
     * For reference, key means the name of security scheme and value means the `scopes`.
     * The `scopes` can be used only when target security scheme is `oauth2` type,
     * especially for {@link ISwaggerSecurityScheme.IOAuth2.IFlow.scopes} property.
     */
    security?: Record<string, string[]>[];
}
export namespace ISwaggerDocument {
    /**
     * Remote server definition.
     */
    export interface IServer {
        /**
         * A URL to the target host.
         *
         * @format url
         */
        url: string;

        /**
         * An optional string describing the target server.
         */
        description?: string;
    }

    /**
     * General information about the API.
     */
    export interface IInfo {
        /**
         * Version of the API.
         */
        version: string;

        /**
         * The title of the API.
         */
        title: string;

        /**
         * A short description of the API.
         */
        description?: string;
    }
}
