import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/users/entities/user.entity';
import { ReportsService } from './reports.service';
import type { ReportPeriodQuery } from './reports.service';
import { UserRole } from 'src/users/enums/user-role.enum';
import type { Response } from 'express';

@Controller('reports')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ReportsController {

    constructor(private readonly reportsService: ReportsService) {}

    @Get('financial')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.FINANCIAL)
    getFinancial(
        @CurrentUser() user: User,
        @Query() query: ReportPeriodQuery
    ) {
        return this.reportsService.financialReport(user, query);
    }

    @Get('financial/pdf')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.FINANCIAL)
    async getFinancialPdf(
        @CurrentUser() user: User,
        @Query() query: ReportPeriodQuery,
        @Res() res: Response
    ) {
        const pdf = await this.reportsService.financialReportPdf(user, query);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="relatorio-financeiro.pdf"');
        res.send(pdf);
    }

    @Get('category-distribution')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.FINANCIAL)
    getCategoryDistribution(
        @CurrentUser() user: User,
        @Query() query: ReportPeriodQuery
    ) {
        return this.reportsService.categoryDistributionReport(user, query);
    }

    @Get('cashflow')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.FINANCIAL)
    getCashflow(
        @CurrentUser() user: User,
        @Query() query: ReportPeriodQuery
    ) {
        return this.reportsService.cashflowReport(user, query);
    }

    @Get('customers')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.SELLER, UserRole.FINANCIAL)
    getCustomers(@CurrentUser() user: User) {
        return this.reportsService.customersReport(user);
    }

    @Get('customers/pdf')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.SELLER, UserRole.FINANCIAL)
    async getCustomersPdf(
        @CurrentUser() user: User,
        @Res() res: Response
    ) {
        const pdf = await this.reportsService.customersReportPdf(user);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="relatorio-clientes.pdf"');
        res.send(pdf);
    }

    @Get('stock')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.SELLER)
    getStock(@CurrentUser() user: User) {
        return this.reportsService.stockReport(user);
    }

    @Get('stock/pdf')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.SELLER)
    async getStockPdf(
        @CurrentUser() user: User,
        @Res() res: Response
    ) {
        const pdf = await this.reportsService.stockReportPdf(user);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="relatorio-estoque.pdf"');
        res.send(pdf);
    }

    @Get('sales')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.SELLER, UserRole.FINANCIAL)
    getSales(@CurrentUser() user: User) {
        return this.reportsService.salesReport(user);
    }

    @Get('sales/pdf')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.SELLER, UserRole.FINANCIAL)
    async getSalesPdf(
        @CurrentUser() user: User,
        @Res() res: Response
    ) {
        const pdf = await this.reportsService.salesReportPdf(user);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="relatorio-vendas.pdf"');
        res.send(pdf);
    }

}
