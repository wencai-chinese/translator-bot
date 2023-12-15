// decryptor.ts
import axios, { AxiosResponse, AxiosError } from 'axios';
import * as matrixSdk from "matrix-js-sdk";

// Now you can use matrixSdk.MegolmDecryption and matrixSdk.Olm


function decryptMessage(encryptedContent, roomId, matrixClient) {
  // Check if the matrixClient has the necessary keys
  if (!matrixClient.hasKeys(roomId, encryptedContent.sender, encryptedContent.session_id)) {
    // Fetch the keys if not available
    return matrixClient.downloadKeys([encryptedContent.sender]);
  }

  // Initialize the decryption instance
  const decryption = new matrixSdk.MegolmDecryption({
    algorithm: matrixSdk.Olm,
    roomId: roomId,
    session: encryptedContent.session_id,
    keys: matrixClient.exportKeys(roomId, encryptedContent.sender, encryptedContent.session_id),
  });

  // Decrypt the message
  try {
    const decryptedBody = decryption.decrypt(encryptedContent.ciphertext);
    return decryptedBody;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}
