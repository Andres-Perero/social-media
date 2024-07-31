//googleDrive.js

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const KEYFILEPATH = path.join(process.cwd(), 'src/data-googleapis/storage-web-scraping-396800-96043ff114f4.json');
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

async function listFilesInFolder(folderId) {
  
  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='application/json'`,
      fields: 'files(id, name)',
    });
    //      console.log("List of files:", res.data.files);
    return res.data.files;
  } catch (error) {
    console.error('Error listing files in folder:', error);
    throw error;
  }
}

async function getFileContent(fileId) {
  try {
    const response = await drive.files.get(
      {
        fileId: fileId,
        alt: 'media',
      },
      { responseType: 'stream' }
    );

    const data = await new Promise((resolve, reject) => {
      let buf = '';
      response.data.on('data', (chunk) => {
        buf += chunk;
      });
      response.data.on('end', () => {
        resolve(buf);
      });
      response.data.on('error', (err) => {
        reject(err);
      });
    });

    return JSON.parse(data);
  } catch (error) {
    console.error('Error retrieving file content:', error);
    throw error;
  }
}


export { listFilesInFolder, getFileContent };
