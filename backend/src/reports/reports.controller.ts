import { Controller, Get } from '@nestjs/common';
import { CurrentUser, Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { ReportsService } from './reports.service';
import { UserRole } from 'src/users/enums/user-role.enum';

@Controller('reports')
export class ReportsController {

    constructor(private readonly reportsService: ReportsService) {}

    @Get('financial')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.FINANCIAL)
    getFinancial(@CurrentUser() user: User) {
        return this.reportsService.financialReport(user);
    }

    @Get('customers')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.SELLER, UserRole.FINANCIAL)
    getCustomers(@CurrentUser() user: User) {
        return this.reportsService.customersReport(user);
    }

    @Get('stock')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.SELLER)
    getStock(@CurrentUser() user: User) {
        return this.reportsService.stockReport(user);
    }

    @Get('sales')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.SELLER, UserRole.FINANCIAL)
    getSales(@CurrentUser() user: User) {
        return this.reportsService.salesReport(user);
    }

}
