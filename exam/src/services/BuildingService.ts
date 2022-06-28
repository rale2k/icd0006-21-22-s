import type { IBuilding } from './../domain/IBuilding';
import { BaseService } from './BaseService';

const apiVersion: string = 'v1';

class BuildingService extends BaseService<IBuilding> {
    constructor() {
        super("Building", apiVersion)
    }
}

export default new BuildingService();