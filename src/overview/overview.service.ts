import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-overview.dto";
import * as bcrypt from "bcrypt";
import { SignUpDto } from "./dto/signup-overview.dto";
import { SignInDto } from "./dto/signin-overview.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class OverviewService {
	mockUsers = [
		{ id: 1, name: "molly", email: "molly@123.com", password: "12345678" },
		{ id: 2, name: "joe", email: "joe@123.com", password: "23456789" },
		{ id: 3, name: "jane", email: "jane@123.com", password: "34567890" },
	];
	constructor(private jwtService: JwtService) {}

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

	async signin(signInDto: SignInDto) {
		const { email, password } = signInDto;
		const user = this.mockUsers.find((user) => user.email === email);
		if (!user) {
			throw new NotFoundException(`User with email ${email} not found`);
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials");
		}
		const token = this.jwtService.sign(
			{ email: user.email },
			{ secret: process.env.SECRET }
		);
		return token;
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
