import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {

    constructor(private readonly reportsService: ReportsService) {}

    @Get('financial')
    getFinancial(@CurrentUser() user: User) {
        return this.reportsService.financialReport(user);
    }

    @Get('customers')
    getCustomers(@CurrentUser() user: User) {
        return this.reportsService.customersReport(user);
    }

    @Get('stock')
    getStock(@CurrentUser() user: User) {
        return this.reportsService.stockReport(user);
    }

    @Get('sales')
    getSales(@CurrentUser() user: User) {
        return this.reportsService.salesReport(user);
    }

}
