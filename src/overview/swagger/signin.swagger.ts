import { ApiBodyOptions } from "@nestjs/swagger";
import { SignInDtoClass } from "../dto/signin-overview.dto";

export const signInOptions: ApiBodyOptions = {
	type: SignInDtoClass,
	examples: {
		"sign in": {
			value: {
				email: "butterfly@yoyo.com",
				password: "abc12300",
			},
		},
	},
};
