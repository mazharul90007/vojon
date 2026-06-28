import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import type { HealthCheckResponse } from '@vojon/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health') // /api/health
  health(): HealthCheckResponse {
    return {
      status: 'ok',
      timestamp: new Date(),
    };
  }
}
