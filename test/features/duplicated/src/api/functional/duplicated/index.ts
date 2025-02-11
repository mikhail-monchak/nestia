/**
 * @packageDocumentation
 * @module api.functional.duplicated
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "@nestia/fetcher";
import type { IConnection, Primitive } from "@nestia/fetcher";

import type { IBbsArticle } from "./../../structures/IBbsArticle";

/**
 * @controller DuplicatedController.at()
 * @path GET /duplicated/at
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function at(
    connection: IConnection,
): Promise<at.Output> {
    return Fetcher.fetch(
        connection,
        at.ENCRYPTED,
        at.METHOD,
        at.path(),
    );
}
export namespace at {
    export type Output = Primitive<IBbsArticle>;

    export const METHOD = "GET" as const;
    export const PATH: string = "/duplicated/at";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export const path = (): string => {
        return `/duplicated/at`;
    }
}