import { useState } from "react";
import { IContract } from "../domain/IContract";
import ContractService from "../services/ContractService";

interface IContractCreateModalParams { 
    apartmentId: string
}
const ContractCreateModal = (params: IContractCreateModalParams) => {
    
    const [contractFormData, setContractFormData] = useState<IContract>({
        apartmentId: params.apartmentId,
        periodEnd: new Date().toJSON(),
    });

    const handleCreateContract = async () => {
        await ContractService.post(contractFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }


    return (
        <>
        <div className="modal fade" id={`contract-create-modal-${params.apartmentId}`} tabIndex={-1} aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ModalLabel">Create Contract</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="form-floating">
                                <input v-model="newSection.name" type="datetime-local" className="form-control form-control-middle"
                                value={contractFormData.periodEnd}
                                onChange={(e) => setContractFormData(contract => ({...contract, ...{ periodEnd: new Date(e.target.value).toJSON().slice(0, -1)}}))}/>
                                <label>End Date</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create-section-modal" onClick={handleCreateContract}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ContractCreateModal;