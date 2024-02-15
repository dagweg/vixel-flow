export function bufferFromString(image: string): Buffer {
    // Extract the Base64-encoded data part of the string
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    // Create a buffer from the Base64-encoded data
    const imageBuffer = Buffer.from(base64Data, "base64");

    return imageBuffer;
}
