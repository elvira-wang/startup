import { createZodDto } from "nestjs-zod";
import { z } from "zod";
export const signInSchema = z
	.object({
		email: z.string().email(),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long"),
	})
	.required();

export type SignInDto = z.infer<typeof signInSchema>;
export class SignInDtoClass extends createZodDto(signInSchema) {}
