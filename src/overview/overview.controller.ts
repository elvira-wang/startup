import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Req,
	ParseIntPipe,
	UseGuards,
} from "@nestjs/common";
import { OverviewService } from "./overview.service";
import { CreateUserDto, createUserSchema } from "./dto/create-overview.dto";
import { ZodValidationPipe } from "./pipes/zod-validation.pipe";
import { ApiBody } from "@nestjs/swagger";
import { createUserOptions } from "./swagger/create-user.swagger";
import { RolesGuard } from "./guards/roles.guard";
import { SignUpDto, signUpSchema } from "./dto/signup-overview.dto";
import { signUpOptions } from "./swagger/signup.swagger";

@Controller("overview")
export class OverviewController {
	constructor(private readonly overviewService: OverviewService) {}

	@ApiBody(signUpOptions)
	@Post("signup")
	signup(
		@Body(new ZodValidationPipe(signUpSchema))
		signUpDto: SignUpDto
	) {
		return this.overviewService.signup(signUpDto);
	}

	@ApiBody(signInOptions)
	@Post("signin")
	signin(
		@Body(new ZodValidationPipe(signInSchema))
		signInDto: SignInDto
	) {
		return this.overviewService.signin(signInDto);
	}

	@ApiBody(createUserOptions)
	@Post()
	create(
		@Body(new ZodValidationPipe(createUserSchema))
		createUserDto: CreateUserDto
	) {
		return this.overviewService.create(createUserDto);
	}

	@Get()
	findAll(@Req() req: any) {
		return this.overviewService.findAll(req);
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.overviewService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateOverviewDto: any) {
		return this.overviewService.update(+id, updateOverviewDto);
	}

	@UseGuards(RolesGuard)
	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.overviewService.remove(id);
	}
}
