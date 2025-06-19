import { ApiBodyOptions } from "@nestjs/swagger";
import { CreateUserDtoClass } from "../dto/create-overview.dto";

export const createUserOptions: ApiBodyOptions = {
	type: CreateUserDtoClass,
	examples: {
		"create user": {
			value: {
				id: 1,
				name: "Bob",
				email: "lily@gmail.com",
			},
		},
		"incorrect email address": {
			value: {
				id: 1,
				name: "Bob",
				email: "lilygmail.com",
			},
		},
	},
};
