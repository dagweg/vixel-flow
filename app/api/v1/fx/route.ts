import grayscale from "@/lib/image-processing/grayscale";
import sepia from "@/lib/image-processing/sepia";
import { base64ToBuffer } from "@/lib/image-processing/util";
import { FxRequest, apiFxReqValidator } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";
import * as fileType from "file-type";

export async function POST(request: NextRequest) {
    try {
        const body: FxRequest = await request.json();
        const validator = apiFxReqValidator.safeParse(body);
        if (!validator.success) {
            return NextResponse.json(validator.error.errors);
        }

        let processedImage: Buffer;
        let imageBuffer: Buffer = base64ToBuffer(body.image);

        switch (body.effect.toLowerCase()) {
            case "grayscale":
                processedImage = await grayscale(imageBuffer);
                break;
            case "sepia":
                processedImage = await sepia(imageBuffer);
                break;
            default:
                processedImage = imageBuffer;
                break;
        }

        const extension = await fileType.fileTypeFromBuffer(processedImage);

        const finalImageBase64 = `data:image/jpeg;base64,${processedImage.toString(
            "base64"
        )}`;

        return NextResponse.json({
            image: finalImageBase64,
            ext: extension?.ext,
        });
    } catch (error) {
        console.log((error as Error).message);
        return NextResponse.json({});
    }
}
