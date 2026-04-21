import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Activity])],
    controllers: [ActivitiesController],
    providers: [ActivitiesService],
    exports: [ActivitiesService]
})
export class ActivitiesModule {}
