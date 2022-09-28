import service from '@/service';
import axios from 'axios'

export const uploadFile = async (file : File ) => {    
    if(file && file.size){        
        const formData = new FormData();
		formData.append("file", file);
		formData.append("fileName", file.name);
		formData.append("publicKey", import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY);
        const imageKitAuth = await service.api.imageKitControllerGetImageKitAuth({format:'json'})
        formData.append('signature',imageKitAuth.data.signature || "")
		formData.append("expire", imageKitAuth.data.expire || 0);
		formData.append("token", imageKitAuth.data.token); 
        const res = await axios.post("https://upload.imagekit.io/api/v1/files/upload",formData)
        return res.data
    }
    return {fileId : null}
}