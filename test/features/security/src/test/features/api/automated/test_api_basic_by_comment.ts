import typia, { Primitive } from "typia";

import api from "./../../../../api";
import type { IToken } from "./../../../../api/structures/IToken";

export const test_api_basic_by_comment = async (
    connection: api.IConnection
): Promise<void> => {
    const output: Primitive<IToken> = 
        await api.functional.basic_by_comment(
            connection,
        );
    typia.assert(output);
};