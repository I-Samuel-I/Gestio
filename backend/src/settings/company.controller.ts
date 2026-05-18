import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/users/enums/user-role.enum';
import { User } from 'src/users/entities/user.entity';
import { SettingsService } from './settings.service';

@Controller('company')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CompanyController {
    constructor(private readonly settingsService: SettingsService) {}

    @Roles(UserRole.MANAGER)
    @Get()
    getCompany(@CurrentUser() user: User) {
        return this.settingsService.getCompany(user);
    }
}
