import sharp from "sharp";

export default async function grayscale(imageBuffer: Buffer): Promise<Buffer> {
    try {
        const result = await sharp(imageBuffer).grayscale().toBuffer();
        console.log(result);
        return result;
    } catch (error) {
        console.log((error as Error).message);
        return Buffer.alloc(0);
    }
}
