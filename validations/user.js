import zod from "zod";
const userValidation = zod.object({
  name: zod.string(),
  email: zod.string(),
  password: zod.string(),
});

const loginValidation = userValidation.omit({
  name: true,
});
export { userValidation, loginValidation };
