import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Veuillez entrer une email valide").nonempty(),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au minimum 8 caractères")
    .nonempty(),
});

const loginSchema = z.object({
  email: z.string().email("Veuillez entrer une email valide").nonempty(),
  password: z.string().nonempty(),
});

export { registerSchema, loginSchema };
