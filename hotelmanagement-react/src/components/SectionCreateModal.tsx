import React, { useEffect, useState } from "react";
import { IHotelSection } from "../domain/IHotelSection";
import HotelSectionService from "../services/HotelSectionService";

interface ISectionCreateModalParams {
    hotelId: string,
    onCreated: Function
}
const SectionCreateModal = (params: ISectionCreateModalParams) => {
    const [sectionFormData, setSectionFormData] = useState<IHotelSection>({ name: "", description: "", hotelId: params.hotelId});

    const handleCreateSection = async () => {
        await HotelSectionService.post(sectionFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }

                params.onCreated(res.data!);
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    return(
        <>
        <div className="modal fade" id="create-section-modal" tabIndex={-1} aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ModalLabel">Create Section</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="form-floating">
                                <input v-model="newSection.name" type="text" className="form-control form-control-top"
                                onChange={(e) => setSectionFormData(hotelSection => ({...hotelSection, ...{ name: e.target.value}}))}/>
                                <label>Name</label>
                            </div>
                            <div className="form-floating">
                                <input v-model="newSection.description" type="text" className="form-control form-control-bottom"
                                onChange={(e) => setSectionFormData(hotelSection => ({...hotelSection, ...{ description: e.target.value}}))}/>
                                <label>Description</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create-section-modal" onClick={handleCreateSection}>Add section</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SectionCreateModal;