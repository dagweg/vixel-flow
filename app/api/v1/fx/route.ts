import grayscale from "@/lib/image-processing/grayscale";
import sepia from "@/lib/image-processing/sepia";
import { base64ToBuffer, getSizeInBytes } from "@/lib/image-processing/util";
import { FxRequest, apiFxReqValidator } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";
import * as fileType from "file-type";
import brightness from "@/lib/image-processing/brightness";
import saturation from "@/lib/image-processing/saturation";
import contrast from "@/lib/image-processing/contrast";

export const runtime = "edge";

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
        processedImage = await grayscale(imageBuffer, body.intensity);
        break;
      case "sepia":
        processedImage = await sepia(imageBuffer, body.intensity);
        break;
      case "brightness":
        processedImage = await brightness(imageBuffer, body.intensity);
        break;
      case "saturation":
        processedImage = await saturation(imageBuffer, body.intensity);
        break;
      case "contrast":
        processedImage = await contrast(imageBuffer, body.intensity);
        break;
      default:
        processedImage = imageBuffer;
        break;
    }

    const extension = await fileType.fileTypeFromBuffer(processedImage);

    const finalImageBase64 = `data:image/jpeg;base64,${processedImage.toString(
      "base64"
    )}`;

    const fileName = body.fileName.replace(
      `.${extension?.ext}`,
      `_${body.effect.toLowerCase()}.${extension?.ext}`
    );

    const fileSize = getSizeInBytes(finalImageBase64) / Math.pow(10, 6);

    return NextResponse.json(
      {
        image: finalImageBase64,
        ext: extension?.ext,
        fileSize: fileSize,
        fileName: fileName,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
