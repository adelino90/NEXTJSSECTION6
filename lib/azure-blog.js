import { BlobServiceClient } from '@azure/storage-blob';

if (!process.env.ACCOUNT_NAME) {
  throw new Error('ACCOUNT_NAME is not set');
}

if (!process.env.CONTAINER) {
  throw new Error('CONTAINER is not set');
}

if (!process.env.SAS_TOKEN) {
  throw new Error('CLOUDINARY_API_SECRET is not set');
}

  const accountName = process.env.ACCOUNT_NAME
  const container = process.env.CONTAINER
  const sasToken = process.env.SAS_TOKEN

export async function uploadImage(image,url) {
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/?${sasToken}`);
    const containerClient = blobServiceClient.getContainerClient(container)
    const blobClient = containerClient.getBlockBlobClient(url);
    const options = { blobHTTPHeaders: { blobContentType: image.type } };
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

  const result = await blobClient.uploadData(buffer, options);
  return result;
}