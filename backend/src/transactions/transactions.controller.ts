import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
    Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CurrentUser, Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/enums/user-role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('transactions')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TransactionsController {

    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.FINANCIAL)
    create( 
        @Body() createTransactionDto: CreateTransactionDto, 
        @CurrentUser() user
    ) { 
        return this.transactionsService.create(createTransactionDto, user); 
    }

    @Get()
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.FINANCIAL)
    findAll(
        @CurrentUser() user: User,
        @Query('search') search?: string,
    ) {
        return this.transactionsService.findAll(user, search);
    }

    @Get('recent')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.FINANCIAL)
    findRecent(@CurrentUser() user: User) {
        return this.transactionsService.findRecent(user);
    }

    @Get(':id')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.FINANCIAL)
    findOne(
        @Param('id') id: string,
        @CurrentUser() user: User
    ) { 
        return this.transactionsService.findOne(id,user); 
    }

    @Patch(':id')
    @Roles(UserRole.MANAGER, UserRole.SUPERVISOR, UserRole.FINANCIAL)
    update( 
        @Param('id') id: string, 
        @Body() updateTransactionDto: UpdateTransactionDto,
        @CurrentUser() user: User
    ) { 
        return this.transactionsService.update(id, updateTransactionDto, user); 
    }

    @Delete(':id')
    @Roles(UserRole.MANAGER)
    remove(
        @Param('id') id: string,
        @CurrentUser()user: User
    ) { 
        return this.transactionsService.remove(id, user); 
    }
}