import { TextLineStream } from "jsr:@std/streams";

export const inputStream = Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());
