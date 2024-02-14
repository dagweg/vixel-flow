import { TypeAccordion } from "./accordion";
import CButton from "./custom-button";

const EffectComponents: TypeAccordion[] = [
    {
        title: "Filters and Effects",
        content: (
            <>
                <div className="block">
                    <CButton>Grayscale</CButton>
                    <CButton>Sepia</CButton>
                    <CButton>B&W</CButton>
                    <CButton>Vintage</CButton>
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
