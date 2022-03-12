import React from "react";
import "./Fileuploader.css"
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import FileuploaderService from './Fileuploader.service';
import BasicUtility from "../../utility/util";
import Config from "../../config/getConfig";
const appConfig = Config.getConfig();

const Fileuploader = () => {
    const [showProgress, setShow] = React.useState();
    const [showPercentage, setPercentage] = React.useState(0);
    const [progess, setProgressState] = React.useState({ status: 'success' });
    const handleSubmit = async (e) => {
        try {
            const files = [...e.target.files];
            const uploadFileData = files[0];
            if (uploadFileData.size > appConfig.MAX_FILE_SIZE) {
                window.alert("Please upload a file smaller than 10 MB");
                return false;
            }
            // setProgressState({status : 'failed'});
            setPercentage(0);
            setShow(true);

            const originalName = uploadFileData.name;
            const customName = BasicUtility.renameKey(originalName);

            // * GET request: presigned URL
            const response = await FileuploaderService.getFileSignature(customName);
            let responseUrl = (response && response.data) ? response.data.result : '';

            const decodeData = await BasicUtility.decodeResponse(responseUrl, customName);
            await uploadFileOntoServer(decodeData, uploadFileData);

            await postFileData(originalName, customName, uploadFileData);

        } catch (error) {
            console.log('Error: handleSubmit', JSON.stringify(error));
            let errorMessage = (error && error.message) ? error.message : 'Something went wrong, please try again.';
            window.alert(errorMessage);
        }
    };

    const clearPage = () => {
        let setTimeId = setTimeout(() => {
            setShow(false);
            clearTimeout(setTimeId);
        }, 5000);
    };
    const uploadFileOntoServer = async (decodeData, uploadFileData) => {
        try {
            const uploadFile = await FileuploaderService.uploadFile(decodeData, uploadFileData, (p) => {
                let percentCompleted = Math.floor(p.loaded / p.total * 100);
                setPercentage(percentCompleted);
            }).then(data => {
                console.log(data)
                setPercentage(100);
                clearPage();
            }).catch(error => {
                console.log('Error: uploadFile', JSON.stringify(error));
                setPercentage(0);
                setProgressState({ status: 'failed' });
            });
            return uploadFile;
        } catch (err) {
            console.error('Error: uploadFileOntoServer', JSON.stringify(err));
            throw new Error(err);
        }
    };

    const postFileData = async (originalName, customName, uploadFileData) => {
        try {
            let sendRquest = {
                name: originalName,
                type: uploadFileData.type,
                size: uploadFileData.size,
                customName: customName
            };
            const encodeData = await BasicUtility.encodeRequest(sendRquest, customName);
            console.log('decodeReqData', encodeData);
            const sendResult = await FileuploaderService.postFileData(encodeData);
            console.log("Result: ", sendResult);
        } catch (err) {
            console.error('Error: postFileData', JSON.stringify(err));
            throw new Error(err);
        }
    };

    return (
        <div className="wrapper" >
            {!showProgress && <div className="file-upload start">
                <input type="file" onChange={handleSubmit} autoFocus />
                <img src={require('../../img/malwarebytes-main-logo_1.png')} className="file-logo" />
            </div >}
            {showProgress && <div className={`file-upload end remove-border`}>
                <CircularProgressbar value={showPercentage} text={`${showPercentage}%`} className={progess.status === 'success' ? 'file-upload-success' : 'file-upload-failed'} />
            </div>}
        </div>
    );
};

export default Fileuploader;