import sharp from "sharp";

export default async function saturation(
  imageBuffer: Buffer,
  intensity: Number
): Promise<Buffer> {
  try {
    const weight = Math.max(0, Math.min(1, intensity as number));
    let result = await sharp(imageBuffer)
      .modulate({
        saturation: intensity as number,
      })
      .toBuffer();
    return result;
  } catch (error) {
    console.log((error as Error).message);
    return Buffer.alloc(0);
  }
}
