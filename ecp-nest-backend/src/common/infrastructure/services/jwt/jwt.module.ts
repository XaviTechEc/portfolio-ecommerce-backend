import { Module } from '@nestjs/common';
import { JwtModule as JwtM } from '@nestjs/jwt';
import { EnvironmentConfigModule } from 'src/configuration/env/env-config.module';
import { EnvironmentConfigService } from 'src/configuration/env/env-config.service';

@Module({
  imports: [
    JwtM.registerAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (envConfigService: EnvironmentConfigService) => {
        const secret = envConfigService.getJwtSecret();
        const expiresIn = envConfigService.getJwtExpTime();
        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  exports: [],
  providers: [],
})
export class JwtModule {}
