import type { IService } from './../domain/IService';
import { BaseService } from './BaseService';

const apiVersion: string = 'v1';

class ServiceService extends BaseService<IService> {
    constructor() {
        super("Service", apiVersion)
    }
}

export default new ServiceService();