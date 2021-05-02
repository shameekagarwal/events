import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IdValidationPipe } from '@shameek-events/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ImageType } from './types/image.type';

@Controller()
@UsePipes(ValidationPipe)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createEvent(
    @UploadedFile() image: ImageType,
    @Body() body: CreateEventDto,
    @Req() request: Request,
  ) {
    if (!image) {
      throw new BadRequestException('image field must not be empty');
    }
    const event = await this.appService.createEvent({
      date: new Date(body.date),
      description: body.description,
      latitude: Number(body.latitude),
      longitude: Number(body.longitude),
      title: body.title,
      organizerId: request.currentUser.id,
      image,
      organizerEmail: request.currentUser.email,
    });
    return { event };
  }

  @Delete(':id')
  async deleteEvent(
    @Param('id', IdValidationPipe) id: number,
    @Req() request: Request,
  ) {
    const message = await this.appService.deleteEvent({
      id,
      organizerId: request.currentUser.id,
    });
    return { message };
  }
}
