import { S3 } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
const useUpload = () => {
  const getFileExtension = (fileName) => {
    const parts = fileName.split('.');
    return parts[parts.length - 1];
  };
  const uploadIPFs = (file) => {
    const s3 = new S3({
      endpoint: 'https://endpoint.4everland.co',
      credentials: {
        accessKeyId: '90WEYMK16RDMZ7OM13G2',
        secretAccessKey: 'Zw52DXf11NQbdJswTODehiMP+2l5CX5VMcg3mAqM',
      },
      region: '4EVERLAND',
    });

    return new Promise((resolve, reject) => {
      s3.putObject(
        {
          Bucket: 'cfxs-market',
          Key: `${uuidv4()}.${getFileExtension(file.name)}`,
          ContentType: file.type,
          Body: file,
        },
        (err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log('Upload success', data);
            // ETag
            resolve(JSON.parse(data.ETag));
          }
        }
      );
    });
  };

  return {
    uploadIPFs,
  };
};

export default useUpload;
