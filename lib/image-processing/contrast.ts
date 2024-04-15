import sharp from "sharp";

export const runtime = "edge";

export default async function contrast(
  imageBuffer: Buffer,
  intensity: number
): Promise<Buffer> {
  try {
    // const clampedIntensity = Math.max(0, Math.min(1, intensity)); // Ensure intensity within 0-1 range

    const result = await sharp(imageBuffer)
      .modulate({
        brightness: Math.max(0, 1 - intensity / 2), // Adjust brightness based on intensity
        saturation: intensity, // Increase saturation for higher contrast
      })
      .toBuffer();

    return result;
  } catch (error) {
    console.error((error as Error).message);
    return Buffer.alloc(0);
  }
}
