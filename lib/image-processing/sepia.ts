import sharp, { Matrix3x3 } from "sharp";

export const runtime = "edge";

export default async function sepia(
  imageBuffer: Buffer,
  intensity: Number
): Promise<Buffer> {
  try {
    const sepiaMatrix: Matrix3x3 = [
      [0.393, 0.769, 0.189],
      [0.349, 0.686, 0.168],
      [0.272, 0.534, 0.194],
    ];

    const weight = Math.max(0, Math.min(1, intensity as number));
    console.log(weight);

    const result = await sharp(imageBuffer)
      .grayscale()
      .modulate({
        brightness: intensity as number,
      })
      .recomb(sepiaMatrix)
      .sharpen()
      .toBuffer();
    console.log(result);
    return result;
  } catch (error) {
    console.log((error as Error).message);
    return Buffer.alloc(0);
  }
}
