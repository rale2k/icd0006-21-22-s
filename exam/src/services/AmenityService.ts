import type { IAmenity } from './../domain/IAmenity';
import { BaseService } from './BaseService';

const apiVersion: string = 'v1';

class AmenityService extends BaseService<IAmenity> {
    constructor() {
        super("Amenity", apiVersion)
    }
}

export default new AmenityService();