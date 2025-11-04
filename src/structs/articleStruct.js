// src/structs/articleStruct.js
import * as s from 'superstruct';

export const CreateArticle = s.object({
  title: s.size(s.string(), 1, 30),
  content: s.size(s.string(), 1, 60),
});

export const PatchArticle = s.partial(CreateArticle);
