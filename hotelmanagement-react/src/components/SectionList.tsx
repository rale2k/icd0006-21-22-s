import { IHotelSection } from "../domain/IHotelSection";
import SectionEditModal from "./SectionEditModal";

interface ISectionListParams {
    sections: IHotelSection[]
    setHotelSections: Function
}
const SectionList = (params: ISectionListParams) => {

    const handleUpdateSection = (section: IHotelSection) => {
        // https://stackoverflow.com/a/49502115
        let items = [...params.sections];
        items[items.findIndex(e => e.id == section.id)] = section;
        params.setHotelSections(items);
    }

    const handleDeleteSection = (section: IHotelSection) => {
        let filteredArray = params.sections.filter(s => s.id !== section.id!)
        params.setHotelSections(filteredArray);
    }

    return(
        <>
        <div className="accordion accordion-flush" id="accordionExample">
        {
            params.sections.map(function(section, x) {
                return(
                        <div className="accordion-item" key={section.id}>
                            <h2 className="accordion-header" id={'header-'+section.id}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#collapse-'+section.id} aria-expanded="false" aria-controls={'collapse-'+section.id}>
                                {section.name}
                            </button>
                            </h2>
                            <div id={'collapse-'+section.id} className="accordion-collapse collapse" aria-labelledby={'#header-'+section.id} data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="container d-flex align-content-center">
                                        <div className="flex-grow-1 py-2">
                                            {section.description}
                                        </div>
                                        <div>
                                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#editModal-'+ section.id}>Edit</button>
                                            <SectionEditModal section={section} onSectionDelete={handleDeleteSection} onSectionUpdate={handleUpdateSection} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            })
        }
        </div>
        </>
    )
}

export default SectionList;