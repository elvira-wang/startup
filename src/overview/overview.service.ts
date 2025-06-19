import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-overview.dto";
import { REQUEST } from "@nestjs/core";

@Injectable()
export class OverviewService {
	mockUsers = [
		{ id: 1, name: "molly", email: "molly@123.com" },
		{ id: 2, name: "joe", email: "molly@123.com" },
		{ id: 3, name: "jane", email: "molly@123.com" },
	];
	constructor(
		@Inject(REQUEST)
		private readonly request: any
	) {}

	create(createUserDto: CreateUserDto) {
		// console.log(createUserDto);
		if (
			this.mockUsers.some((user) => user.id === createUserDto.id) ||
			this.mockUsers.some((user) => user.email === createUserDto.email)
		) {
			throw new NotFoundException(
				`User #${createUserDto.id} already exists`
			);
		}
		this.mockUsers= [...this.mockUsers, createUserDto];
		// const { testMiddleware } = this.request;
		// console.log(testMiddleware);
		return this.mockUsers;
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

	update(id: number, updateOverviewDto: any) {
		return `This action updates a #${id} overview`;
	}

	remove(id: number) {
		return `This action removes a #${id} overview`;
	}
}
