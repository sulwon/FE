// src/map/map.controller.ts

import { Controller, Get, Query } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
    constructor(private readonly mapService: MapService) { }

    @Get('search')
    async search(@Query('keyword') keyword: string) {
        const result = await this.mapService.searchKeyword(keyword);
        return result;
    }
}
