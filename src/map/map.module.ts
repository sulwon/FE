// src/map/map.module.ts

import { Module, HttpModule } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
    imports: [HttpModule],
    controllers: [MapController],
    providers: [MapService],
})
export class MapModule { }
