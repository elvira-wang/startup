import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateOverviewDto } from "./dto/create-overview.dto";
import { UpdateOverviewDto } from "./dto/update-overview.dto";
import { REQUEST } from "@nestjs/core";

@Injectable()
export class OverviewService {
	mockUsers = [
		{ id: 1, name: "molly" },
		{ id: 2, name: "joe" },
		{ id: 3, name: "jane" },
	];
	constructor(
		@Inject(REQUEST)
		private readonly request: any
	) {}
	create(createOverviewDto: CreateOverviewDto) {
		const { testMiddleware } = this.request;
		console.log(testMiddleware);
		return `This action adds a new overview ${testMiddleware}`;
	}

	findAll() {
		return this.mockUsers;
	}

	findOne(id: number) {
		const user = this.mockUsers.find((user) => user.id === id);
		if (!user) {
			throw new NotFoundException(`User #${id} not found`);
		}
		return user;
	}

	update(id: number, updateOverviewDto: UpdateOverviewDto) {
		return `This action updates a #${id} overview`;
	}

	remove(id: number) {
		return `This action removes a #${id} overview`;
	}
}
