import grayscale from "@/lib/image-processing/grayscale";
import sepia from "@/lib/image-processing/sepia";
import { bufferFromString } from "@/lib/image-processing/util";
import { FxRequest, apiFxReqValidator } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body: FxRequest = await request.json();
        const validator = apiFxReqValidator.safeParse(body);
        if (!validator.success) {
            return NextResponse.json(validator.error.errors);
        }

        let processedImage: Buffer;
        let imageBuffer: Buffer = bufferFromString(body.image);

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

        const finalImage = `data:image/jpeg;base64,${processedImage.toString(
            "base64"
        )}`;

        return NextResponse.json({
            image: finalImage,
        });
    } catch (error) {
        console.log((error as Error).message);
        return NextResponse.json({});
    }
}
