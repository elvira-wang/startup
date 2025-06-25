import { ApiBodyOptions } from "@nestjs/swagger";
import { SignUpDtoClass } from "../dto/signup-overview.dto";

export const signUpOptions: ApiBodyOptions = {
	type: SignUpDtoClass,
	examples: {
		"create user": {
			value: {
				email: "lily@gmail.com",
				password: "abc12300",
			},
		},
		"incorrect email address": {
			value: {
				email: "lilygmail.com",
				password: "bnm34577",
			},
		},
	},
};
