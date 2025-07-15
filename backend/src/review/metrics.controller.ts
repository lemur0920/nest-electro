import { Controller, Get } from "@nestjs/common";
import * as prometheus from 'prometheus-client'

@Controller('metrics')
export class MetricsController {
  @Get()
  getMetrics() {
    return prometheus.register.metrics();  
  }
}