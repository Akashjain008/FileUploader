import axios from "axios";
import Config from "../../config/getConfig";
const appConfig = Config.getConfig();
// const API_ENDPOINT = "http://localhost:8080/api/file/process";

const FileuploaderService = {

    getFileSignature: async (filename) => {
        try {
            const response = await axios({
                method: "GET",
                headers: {
                    'filename': filename
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
    postFileData: async (sendRquest) => {
        try {
            const sendResult = await axios({
                method: "POST",
                data: sendRquest,
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