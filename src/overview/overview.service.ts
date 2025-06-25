import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-overview.dto";
import * as bcrypt from "bcrypt";
import { SignUpDto } from "./dto/signup-overview.dto";

@Injectable()
export class OverviewService {
	mockUsers = [
		{ id: 1, name: "molly", email: "molly@123.com", password: "12345678" },
		{ id: 2, name: "joe", email: "joe@123.com", password: "23456789" },
		{ id: 3, name: "jane", email: "jane@123.com", password: "34567890" },
	];
	constructor() {}

	async signup(signUpDto: SignUpDto) {
		const { email, password } = signUpDto;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = {
			id: this.mockUsers.length + 1,
			email,
			password: hashedPassword,
		};
		this.mockUsers = [...this.mockUsers, newUser as any];
		return newUser;
	}

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
