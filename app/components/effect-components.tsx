import { TypeAccordion } from "./accordion";
import CButton from "./custom-button";

function handleClick(e: HTMLButtonElement) {
    console.log(e.name);
}

const EffectComponents: TypeAccordion[] = [
    {
        title: "Filters and Effects",
        content: (
            <>
                <div className="block">
                    <CButton onClick={(e) => handleClick(e)} name="Grayscale">
                        Grayscale
                    </CButton>
                    <CButton onClick={(e) => handleClick(e)} name="Sepia">
                        Sepia
                    </CButton>
                    <CButton onClick={(e) => handleClick(e)} name="B">
                        B&W
                    </CButton>
                    <CButton onClick={(e) => handleClick(e)} name="Vintage">
                        Vintage
                    </CButton>
                </div>
            </>
        ),
    },
    {
        title: "Color Adjustments",
        content: (
            <>
                <div className="block">
                    <CButton>Brightness</CButton>
                    <CButton>Saturation</CButton>
                    <CButton>Color Balance</CButton>
                    <CButton>Vintage</CButton>
                </div>
            </>
        ),
    },
];

export default EffectComponents;
