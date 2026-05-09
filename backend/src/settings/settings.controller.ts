import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SettingsService } from './settings.service';
import { CurrentUser, Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/enums/user-role.enum';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Controller('settings')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SettingsController {

    constructor(private readonly settingsService: SettingsService){}

    @Roles(UserRole.MANAGER)
    @Get('company')
    getCompany(@CurrentUser() user: User) {
        return this.settingsService.getCompany(user);
    }

    @Roles(UserRole.MANAGER)
    @Patch('company')
    updateCompany(
        @CurrentUser() user: User,
        @Body() dto: UpdateCompanyDto
    ) {
        return this.settingsService.updateCompany(user, dto);
    }

    @Get('preferences')
    getPreferences(@CurrentUser() user: User) {
        return this.settingsService.getPreferences(user);
    }

    @Patch('preferences')
    updatePreferences(
        @CurrentUser() user: User,
        @Body() dto: UpdatePreferencesDto
    ) {
        return this.settingsService.updatePreferences(user, dto);
    }
}