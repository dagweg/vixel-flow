// "use client";

// import { MouseEvent } from "react";
// import CButton from "./custom-button";
// import { store } from "@/lib/redux/store";
// import { FxRequest } from "@/lib/validators";
// import { useDispatch } from "react-redux";
// import { AccordionProps } from "./accordion";

// export default function EC() {
//     return <></>;
// }

// function handleClick(e: MouseEvent<HTMLButtonElement>) {
//     const imageData: string = store.getState().image.data as string;
//     let effectName = e.currentTarget.name;

//     const payload: FxRequest = {
//         image: imageData,
//         effect: effectName,
//     };

//     console.log(payload);

//     fetch("/api/v1/fx/", {
//         method: "POST",
//         body: JSON.stringify(payload),
//     })
//         .then(async (r) => {
//             const data = await r.json();

//             if (r.ok) {
//                 console.log(data);
//             }
//         })
//         .catch((error) => console.log((error as Error).message));
// }

// export const EffectComponents: AccordionProps[] = [
//     {
//         title: "Filters and Effects",
//         content: (
//             <>
//                 <div className="block">
//                     <CButton
//                         onClickCallback={(e) => handleClick(e)}
//                         name="Grayscale"
//                     >
//                         Grayscale
//                     </CButton>
//                     <CButton
//                         onClickCallback={(e) => handleClick(e)}
//                         name="Sepia"
//                     >
//                         Sepia
//                     </CButton>
//                     <CButton
//                         onClickCallback={(e) => handleClick(e)}
//                         name="Blackandwhite"
//                     >
//                         B&W
//                     </CButton>
//                     <CButton
//                         onClickCallback={(e) => handleClick(e)}
//                         name="Vintage"
//                     >
//                         Vintage
//                     </CButton>
//                 </div>
//             </>
//         ),
//     },
//     {
//         title: "Color Adjustments",
//         content: (
//             <>
//                 <div className="block">
//                     <CButton>Brightness</CButton>
//                     <CButton>Saturation</CButton>
//                     <CButton>Color Balance</CButton>
//                     <CButton>Vintage</CButton>
//                 </div>
//             </>
//         ),
//     },
// ];
