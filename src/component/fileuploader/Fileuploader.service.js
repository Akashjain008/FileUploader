import axios from "axios";
import Config from "../../config/getConfig";
const appConfig = Config.getConfig();

const FileuploaderService = {

    getFileSignature: async (filename) => {
        try {
            const response = await axios({
                method: "GET",
                headers: {
                    'filename': filename,
                    'x-api-key': appConfig.X_API_KEY
                },
                url: appConfig.API_ENDPOINT + appConfig.FILE_PROCESS_API,
            });
            return response;
        } catch (err) {
            console.error('Error: getFileSignature', JSON.stringify(err));
            throw new Error(err);
        }
    },
    uploadFile: async (url, fileData, handleUploadProgress = () => { }) => {
        try {
            const response = await axios.request({
                method: "PUT",
                url: url,
                data: fileData,
                onUploadProgress: handleUploadProgress
            });
            return response;
        } catch (err) {
            console.error('Error: uploadFile', JSON.stringify(err));
            throw new Error(err);
        }
    },
    postFileData: async (sendRquest, filename) => {
        try {
            const sendResult = await axios({
                method: "POST",
                data: { "data": sendRquest },
                headers: {
                    'filename': filename,
                    'Content-Type': 'application/json',
                    'x-api-key': appConfig.X_API_KEY
                },
                url: appConfig.API_ENDPOINT + appConfig.FILE_PROCESS_API
            });
            return sendResult;
        } catch (err) {
            console.error('Error: postFileData', JSON.stringify(err));
            throw new Error(err);
        }
    }

}

export default FileuploaderService;