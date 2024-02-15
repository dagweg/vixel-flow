export function base64ToBuffer(image: string): Buffer {
    // Extract the Base64-encoded data part of the string
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    // Create a buffer from the Base64-encoded data
    const imageBuffer = Buffer.from(base64Data, "base64");

    return imageBuffer;
}

export function extensionFromBlob(blob: Blob): string {
    let extension = "jpg"; // Default extension
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === "string") {
            // Extract the first few bytes of the image data to identify its type
            const header = reader.result.substring(0, 16);
            console.log(header);
            // Check for common image headers to determine the file type
            if (header.startsWith("data:image/jpeg")) {
                extension = "jpg";
            } else if (header.startsWith("data:image/png")) {
                extension = "png";
            } else if (header.startsWith("data:image/gif")) {
                extension = "gif";
            }
        }
    };
    reader.readAsDataURL(blob);
    return extension;
}

export function base64ToUInt8Array(base64: string): Uint8Array {
    const byteString = atob(base64.split(",")[1]); // Remove data:image/format;base64, prefix if present
    const byteNumbers = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        byteNumbers[i] = byteString.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
}
