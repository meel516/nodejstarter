import zod from "zod";
const createBlogValidation = zod.object({
  title: zod.string(),
  description: zod.string(),
  image: zod.string(),
});
export { createBlogValidation };
