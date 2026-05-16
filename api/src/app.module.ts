import { Module } from "@nestjs/common"
import { GatewaysModule } from "./gateways/gateways.module"
import { HealthController } from "./health/health.controller"
import { TagsModule } from "./tags/tags.module"

@Module({
  imports: [GatewaysModule, TagsModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
