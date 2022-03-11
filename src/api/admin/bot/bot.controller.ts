import { BOT_SERVICE } from '@config/constants';
import { IBotService } from '@domain/admin/bot/interface/bot-service.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateBotMessageDto } from './dto/create-bm.dto';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotMessageDto } from './dto/update-bm.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Roles } from '@decorators/roles.decorator';
import { RolesList } from '@enums/roles.enum';
import { CustomAuthGuard } from '@common/guards/custom-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';

const BotService = () => Inject(BOT_SERVICE);

@Controller('admin/bot')
export class BotController {
  constructor(@BotService() private readonly botService: IBotService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async createBot(@Body() dto: CreateBotDto) {
    return this.botService.create(dto);
  }

  @Post('messages')
  @HttpCode(HttpStatus.CREATED)
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async createBotMessage(@Body() dto: CreateBotMessageDto) {
    return this.botService.createBotMessages(dto);
  }

  @Get()
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getBots() {
    return this.botService.receiveBots();
  }

  @Get('active')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getActiveBots() {
    return this.botService.getActive();
  }

  @Get('id/:id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getOne(@Param('id') id: number) {
    return this.botService.getbyId(id);
  }

  // @Get('messages')
  // @Roles(RolesList.ADMIN)
  // @UseGuards(CustomAuthGuard, RolesGuard)
  // async getMessages() {
  //   return this.botService.receiveMessages();
  // }

  @Get(':id/messages')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getBotMessages(@Param('id') id: number) {
    return this.botService.receiveMessages(id);
  }

  @Patch(':id/update')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async updateBot(@Param('id') id: number, @Body() updateDto: UpdateBotDto) {
    return this.botService.updateBot(id, updateDto);
  }

  @Patch('messages/:id/update')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async updateMessage(
    @Param('id') id: number,
    @Body() updateDto: UpdateBotMessageDto,
  ) {
    console.log('[UPDATE DTO]: ', updateDto);
    return this.botService.updateBotMessage(id, updateDto);
  }

  @Delete()
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteBots() {
    return this.botService.clearBots();
  }

  @Delete(':id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteBot(@Param('id') id: number) {
    return this.botService.deleteBot(id);
  }

  @Delete(':id/messages')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteBotMessages(@Param('id') id: number) {
    return this.botService.deleteBotMessages(id);
  }

  @Delete('messages/:id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteMessageById(@Param('id') id: number) {
    return this.botService.deleteMessages(id);
  }
}
