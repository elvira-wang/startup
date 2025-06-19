import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-overview.dto";

@Injectable()
export class OverviewService {
	mockUsers = [
		{ id: 1, name: "molly", email: "molly@123.com" },
		{ id: 2, name: "joe", email: "molly@123.com" },
		{ id: 3, name: "jane", email: "molly@123.com" },
	];
	constructor() {}

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
		this.mockUsers = [...this.mockUsers, createUserDto];

		return this.mockUsers;
	}

	findAll(req: any) {
		return this.mockUsers;
		// const { testMiddleware } = this.request;
		// console.log(testMiddleware);
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
		const user = this.mockUsers.find((user) => user.id === id);
		if (!user) {
			throw new NotFoundException(`User #${id} not found`);
		}
		const result = this.mockUsers.filter((user) => user.id !== id);
		this.mockUsers = result;
		return this.mockUsers;
	}
}
