import { createZodDto } from "nestjs-zod";
import { z } from "zod";
export const createUserSchema = z
	.object({
		id: z.number().int(),
		name: z.string(),
		email: z.string().email(),
		password: z
			.string()
			.min(8, "password must be at least 8 characters long"),
	})
	.required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
export class CreateUserDtoClass extends createZodDto(createUserSchema) {}
