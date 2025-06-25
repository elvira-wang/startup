import { Module } from "@nestjs/common";
import { OverviewService } from "./overview.service";
import { OverviewController } from "./overview.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		JwtModule.register({
			global: true,
			signOptions: {
				expiresIn: "2m",
			},
		}),
	],
	controllers: [OverviewController],
	providers: [OverviewService],
})
export class OverviewModule {}
