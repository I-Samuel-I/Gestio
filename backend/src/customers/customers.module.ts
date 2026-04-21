import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { ActivitiesModule } from 'src/activities/activities.module';

@Module({
    imports: [TypeOrmModule.forFeature([Customer]), ActivitiesModule],
    controllers: [CustomersController],
    providers: [CustomersService],
    exports: [CustomersService]
})
export class CustomersModule {}
