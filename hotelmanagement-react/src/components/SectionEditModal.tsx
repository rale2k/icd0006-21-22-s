import { useState } from "react"
import { IHotelSection } from "../domain/IHotelSection"
import HotelSectionService from "../services/HotelSectionService"

interface ISectionEditModalParams {
    section: IHotelSection
    onSectionUpdate: Function
    onSectionDelete: Function
}
const SectionEditModal = (params: ISectionEditModalParams) => { 

    const [sectionFormData, setSectionFormData] = useState<IHotelSection>(
        { 
            id: params.section.id,
            name: params.section.name,
            description: params.section.description,
            hotelId: params.section.hotelId}
        );

    const handleUpdateSection = async () => { 
        await HotelSectionService.put(params.section.id!, sectionFormData)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                params.onSectionUpdate(sectionFormData)
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    const handleDeleteSection = async () => { 
        await HotelSectionService.delete(params.section.id!)
            .then((res) => {
                if (!res.success) {
                    console.log(res)
                    return;
                }
                params.onSectionDelete(sectionFormData)
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

    return (
        <>
        <div className="modal fade" id={'editModal-'+ params.section.id} tabIndex={-1} aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ModalLabel">Edit Section</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="form-floating">
                                <input type="text" className="form-control form-control-top"
                                value={sectionFormData.name}
                                onChange={(e) => setSectionFormData(section => ({...section, ...{ name: e.target.value}}))}/>
                                <label>Name</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control form-control-bottom"
                                value={sectionFormData.description}
                                onChange={(e) => setSectionFormData(section => ({...section, ...{ description: e.target.value}}))}/>
                                <label>Description</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={handleUpdateSection} data-bs-toggle="modal" data-bs-target={'#editModal-'+ params.section.id}>Save changes</button>
                        <button className="btn btn-danger ms-3" onClick={handleDeleteSection} data-bs-toggle="modal" data-bs-target={'#editModal-'+ params.section.id}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SectionEditModal;