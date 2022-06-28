import type { IContract } from './../domain/IContract';
import { BaseService } from './BaseService';

const apiVersion: string = 'v1';

class ContractService extends BaseService<IContract> {
    constructor() {
        super("Contract", apiVersion)
    }
}

export default new ContractService();