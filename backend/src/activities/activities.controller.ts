import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { ActivitiesService } from './activities.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('activities')
@UseGuards(AuthGuard('jwt'))
export class ActivitiesController {

    constructor(private readonly activitiesService: ActivitiesService) {}

    @Get()
    async findAll(@CurrentUser() user: User) { return this.activitiesService.findRecent(user); }
}
