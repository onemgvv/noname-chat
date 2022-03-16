import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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

@ApiTags('Admin bots')
@Controller('admin/bot')
export class BotController {
  constructor(@BotService() private readonly botService: IBotService) {}

  @ApiOperation({ summary: 'Create new bot' })
  @ApiResponse({
    status: 201,
    description: 'Bot successfully created',
  })
  @ApiBody({ type: CreateBotDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async createBot(@Body() dto: CreateBotDto) {
    return this.botService.create(dto);
  }

  @ApiOperation({ summary: 'Create new bots message' })
  @ApiResponse({
    status: 201,
    description: 'Bots message created successfully',
  })
  @ApiBody({ type: CreateBotMessageDto })
  @Post('messages')
  @HttpCode(HttpStatus.CREATED)
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async createBotMessage(@Body() dto: CreateBotMessageDto) {
    return this.botService.createBotMessages(dto);
  }

  @ApiOperation({ summary: 'Receive all bots' })
  @ApiResponse({ status: 200, description: 'Bots received successfully' })
  @ApiResponse({ status: 404, description: 'Bots not found' })
  @Get()
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getBots() {
    return this.botService.receiveBots();
  }

  @ApiOperation({ summary: 'Receive actvie bots' })
  @ApiResponse({ status: 200, description: 'Bots received successfully' })
  @ApiResponse({ status: 404, description: 'Actvie bots not found' })
  @Get('active')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getActiveBots() {
    return this.botService.getActive();
  }

  @ApiOperation({ summary: 'Get bot by id' })
  @ApiResponse({ status: 200, description: 'Bot found successfully' })
  @ApiResponse({ status: 404, description: 'Bot not found' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'bots id',
  })
  @Get('id/:id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getOne(@Param('id') id: number) {
    return this.botService.getbyId(id);
  }

  /**
   *
   * Receive all messages from database
   *
   */
  // @Get('messages')
  // @Roles(RolesList.ADMIN)
  // @UseGuards(CustomAuthGuard, RolesGuard)
  // async getMessages() {
  //   return this.botService.receiveMessages();
  // }

  @ApiOperation({ summary: 'Receive all messages by bot' })
  @ApiResponse({ status: 200, description: 'Messages received successfully' })
  @ApiResponse({ status: 404, description: 'Bot not found' })
  @ApiResponse({ status: 404, description: 'Bot havent messages' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Bots id',
  })
  @Get(':id/messages')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async getBotMessages(@Param('id') id: number) {
    return this.botService.receiveMessages(id);
  }

  @ApiOperation({ summary: 'Update bot' })
  @ApiResponse({ status: 200, description: 'Bot updated successfully' })
  @ApiResponse({ status: 404, description: 'Bot not found' })
  @ApiBody({ type: UpdateBotDto })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Bots id',
  })
  @Patch(':id/update')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async updateBot(@Param('id') id: number, @Body() updateDto: UpdateBotDto) {
    return this.botService.updateBot(id, updateDto);
  }

  @ApiOperation({ summary: 'Update the bot message' })
  @ApiResponse({
    status: 200,
    description: 'The bot message updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Message not found' })
  @ApiBody({ type: UpdateBotMessageDto })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Message id',
  })
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

  @ApiOperation({ summary: 'Delete all bots' })
  @ApiResponse({
    status: 200,
    description: 'The bots successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The bots not found in system',
  })
  @Delete()
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteBots() {
    return this.botService.clearBots();
  }

  @ApiOperation({ summary: 'Delete bot by id' })
  @ApiResponse({
    status: 200,
    description: 'The bot successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The bot not found in system',
  })
  @ApiParam({
    name: 'id',
    description: 'the bot id',
    type: Number,
  })
  @Delete(':id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteBot(@Param('id') id: number) {
    return this.botService.deleteBot(id);
  }

  @ApiOperation({ summary: 'Delete the messages by bot id' })
  @ApiResponse({
    status: 200,
    description: 'The bot messages successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The bot messages not found in system',
  })
  @ApiParam({
    name: 'id',
    description: 'the bot id',
    type: Number,
  })
  @Delete(':id/messages')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteBotMessages(@Param('id') id: number) {
    return this.botService.deleteBotMessages(id);
  }

  @ApiOperation({ summary: 'Delete all bot messages' })
  @ApiResponse({
    status: 200,
    description: 'The bot messages successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The messages not found in system',
  })
  @ApiParam({
    name: 'id',
    description: 'the message id',
    type: Number,
  })
  @Delete('messages/:id')
  @Roles(RolesList.ADMIN)
  @UseGuards(CustomAuthGuard, RolesGuard)
  async deleteMessageById(@Param('id') id: number) {
    return this.botService.deleteMessages(id);
  }
}
