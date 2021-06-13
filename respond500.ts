/*
 * Copyright 2021, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ServerRequest } from "./deps.ts";
import { SimpleLogger } from "./types.ts";

// deno-lint-ignore no-explicit-any
export default async (logger: SimpleLogger, req: ServerRequest, e: any) => {
  const err = e?.stack || String(e);
  const msg =
    `Server Error, method: [${req.method}], url: [${req.url}], error: \n${err}`;
  logger.error(msg);
  const headers = new Headers();
  headers.set("content-type", "application/json");
  try {
    await req.respond({
      status: 500,
      headers,
      body: JSON.stringify(
        {
          error: "500 Server Error",
        },
        null,
        4,
      ),
    });
  } catch (_) {
    // ignore
  }
};