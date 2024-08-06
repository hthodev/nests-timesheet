import { Branch } from '../../../models/branch.model';
export declare class BranchService {
    private readonly branchModel;
    constructor(branchModel: typeof Branch);
    create(branch: Partial<Branch>): Promise<Branch>;
}
