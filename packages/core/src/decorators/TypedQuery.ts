import {
    BadRequestException,
    ExecutionContext,
    createParamDecorator,
} from "@nestjs/common";
import type express from "express";
import type { FastifyRequest } from "fastify";

import typia, { TypeGuardError, assert } from "typia";

import { TransformError } from "./internal/TransformError";

/**
 * Type safe URL query decorator.
 *
 * `TypedQuery` is a decorator function that can parse URL query string. It is almost
 * same with {@link nest.Query}, but it can automatically cast property type following
 * its DTO definition. Also, `TypedQuery` performs type validation.
 *
 * For referecen, when URL query parameters are different with their promised
 * type `T`, `BadRequestException` error (status code: 400) would be thrown.
 *
 * @returns Parameter decorator
 * @author Jeongho Nam - https://github.com/samchon
 */
export function TypedQuery<T>(
    decoder?: (params: URLSearchParams) => T,
): ParameterDecorator {
    if (decoder === undefined) throw TransformError("TypedQuery");

    return createParamDecorator(function TypedQuery(
        _unknown: any,
        context: ExecutionContext,
    ) {
        const request: express.Request | FastifyRequest = context
            .switchToHttp()
            .getRequest();
        const params: URLSearchParams = new URLSearchParams(tail(request.url));

        try {
            return decoder(params);
        } catch (exp) {
            if (typia.is<TypeGuardError>(exp))
                throw new BadRequestException({
                    path: exp.path,
                    reason: exp.message,
                    expected: exp.expected,
                    value: exp.value,
                    message:
                        "Request query parameters are not following the promised type.",
                });
            throw exp;
        }
    })();
}

/**
 * @internal
 */
export namespace TypedQuery {
    export function boolean(str: string | null): boolean | null | undefined {
        if (str === null) return undefined;
        else if (str === "null") return null;
        else if (str.length === 0) return true;
        return str === "true" || str === "1"
            ? true
            : str === "false" || str === "0"
            ? false
            : (str as any); // wrong type
    }
    export function number(str: string | null): number | null | undefined {
        return str?.length ? (str === "null" ? null : Number(str)) : undefined;
    }
    export function bigint(str: string | null): bigint | null | undefined {
        return str?.length ? (str === "null" ? null : BigInt(str)) : undefined;
    }
    export function string(str: string | null): string | null | undefined {
        return str === null ? undefined : str === "null" ? null : str;
    }
}
Object.assign(TypedQuery, assert);

/**
 * @internal
 */
function tail(url: string): string {
    const index: number = url.indexOf("?");
    return index === -1 ? "" : url.substring(index + 1);
}
