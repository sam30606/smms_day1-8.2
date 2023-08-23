import {
  Controller,
  Logger,
  Get,
  Post,
  Delete,
  Query,
  Param,
  Body,
} from '@nestjs/common';

import { MariaService } from './maria.service';
import {
  FindOneQuery,
  DeleteQuery,
  UpdateQuery,
  InsertQuery,
  OKFindOne,
  OKFindAll,
  OKDelete,
  OKInsert,
  OKUpdate,
} from './dto';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
@Controller('maria')
export class MariaController {
  logger = new Logger('Maria');
  constructor(private readonly mariaService: MariaService) {}

  @Get('')
  @ApiTags('maria')
  @ApiOperation({ summary: 'FindOne' })
  @ApiOkResponse({ type: OKFindOne })
  findOne(@Query() findOneQuery: FindOneQuery) {
    this.logger.log('findOne');
    return this.mariaService.findOne({
      id: findOneQuery.id,
      name: findOneQuery.name,
      price: findOneQuery.price,
    });
  }
  @Get('all')
  @ApiTags('maria')
  @ApiOperation({ summary: 'FindAll' })
  @ApiOkResponse({ type: OKFindAll })
  findAll() {
    this.logger.log('findAll');
    return this.mariaService.findAll();
  }
  @Post('insert')
  @ApiTags('maria')
  @ApiOperation({ summary: 'Insert' })
  @ApiOkResponse({ type: OKInsert })
  insert(@Query() insertQuery: InsertQuery) {
    this.logger.log('insert');
    return this.mariaService.insert(insertQuery.name, insertQuery.price);
  }
  @Post('update')
  @ApiTags('maria')
  @ApiOperation({ summary: 'Update' })
  @ApiOkResponse({ type: OKUpdate })
  update(@Query() updateQuery: UpdateQuery) {
    this.logger.log('update');
    return this.mariaService.update(
      updateQuery.id,
      updateQuery.name,
      updateQuery.price,
    );
  }
  @Delete('delete')
  @ApiTags('maria')
  @ApiOperation({ summary: 'Delete' })
  @ApiOkResponse({ type: OKDelete })
  delete(@Query() deleteQuery: DeleteQuery) {
    this.logger.log('delete');
    return this.mariaService.delete(deleteQuery.id);
  }
}
