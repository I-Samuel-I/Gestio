import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CurrentUser } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('transactions')
@UseGuards(AuthGuard('jwt'))
export class TransactionsController {

    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    create( 
        @Body() createTransactionDto: CreateTransactionDto, 
        @CurrentUser() user
    ) { 
        return this.transactionsService.create(createTransactionDto, user); 
    }

    @Get()
    findAll(@CurrentUser() user: User) { 
        return this.transactionsService.findAll(user); 
    }

    @Get('recent')
    findRecent(@CurrentUser() user: User) {
        return this.transactionsService.findRecent(user);
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
        @CurrentUser() user: User
    ) { 
        return this.transactionsService.findOne(id,user); 
    }

    @Patch(':id')
    update( 
        @Param('id') id: string, 
        @Body() updateTransactionDto: UpdateTransactionDto,
        @CurrentUser() user: User
    ) { 
        return this.transactionsService.update(id, updateTransactionDto, user); 
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @CurrentUser()user: User
    ) { 
        return this.transactionsService.remove(id, user); 
    }
}