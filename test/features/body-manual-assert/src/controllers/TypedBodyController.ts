import { Controller } from "@nestjs/common";
import typia from "typia";

import core from "@nestia/core";

import { IBbsArticle } from "@api/lib/structures/IBbsArticle";

@Controller("body")
export class TypedBodyController {
    @core.TypedRoute.Post()
    public async store(
        @core.TypedBody({
            type: "assert",
            assert: typia.createAssert<IBbsArticle.IStore>(),
        })
        input: IBbsArticle.IStore,
    ): Promise<IBbsArticle> {
        return {
            ...typia.random<IBbsArticle>(),
            ...input,
        };
    }
}
