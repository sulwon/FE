// src/map/map.service.ts

import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class MapService {
    constructor(private readonly httpService: HttpService) { }

    async searchKeyword(keyword: string): Promise<any> {
        const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURI(keyword)}`;
        const headers = {
            Authorization: `KakaoAK ${process.env.KAKAO_MAP_API_KEY}`,
        };
        const response = await this.httpService.get(url, { headers }).toPromise();
        return response.data;
    }
}
