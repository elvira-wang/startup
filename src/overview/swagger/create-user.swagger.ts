import { ApiBodyOptions } from "@nestjs/swagger";
import { CreateUserDtoClass } from "../dto/create-overview.dto";

export const createUserOptions: ApiBodyOptions = {
	type: CreateUserDtoClass,
	examples: {
		"create user": {
			value: {
				name: "Bob",
				email: "lily@gmail.com",
			},
		},
		"incorrect email address": {
			value: {
				name: "Bob",
				email: "lilygmail.com",
			},
		},
	},
};
