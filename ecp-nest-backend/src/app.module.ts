import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { PromotionsModule } from './promotions/promotions.module';
import { DeliveryModule } from './delivery/delivery.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './configuration/env/env,config';
import { JoiEnvValidationSchema } from './configuration/env/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [EnvConfiguration],
      validationSchema: JoiEnvValidationSchema,
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
    SharedModule,
    AuthModule,
    PaymentsModule,
    ProductModule,
    CartModule,
    PromotionsModule,
    DeliveryModule,
    CategoriesModule,
    OrdersModule,
    UsersModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
