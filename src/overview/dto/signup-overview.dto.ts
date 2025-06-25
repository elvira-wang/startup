import { createZodDto } from "nestjs-zod";
import { z } from "zod";
export const signUpSchema = z
	.object({
		email: z.string().email(),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long"),
	})
	.required();

export type SignUpDto = z.infer<typeof signUpSchema>;
export class SignUpDtoClass extends createZodDto(signUpSchema) {}
