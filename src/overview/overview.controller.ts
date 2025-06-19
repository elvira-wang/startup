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
} from "@nestjs/common";
import { OverviewService } from "./overview.service";
import { CreateUserDto, createUserSchema } from "./dto/create-overview.dto";
import { ZodValidationPipe } from "./pipes/zod-validation.pipe";
import { ApiBody } from "@nestjs/swagger";
import { createUserOptions } from "./swagger/create-user.swagger";

@Controller("overview")
export class OverviewController {
	constructor(private readonly overviewService: OverviewService) {}

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

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.overviewService.remove(id);
	}
}
