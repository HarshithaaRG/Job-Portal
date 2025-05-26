import DataUriParser from 'datauri/parser.js'

import path from "path"

//this function getDataUri is to convert a file into a data uri format. data uri is a way to embed file data(like image) directly in a string(e.g for sending to services like cloudinary)
const getDataUri=(file)=>{
    const parser=new DataUriParser();
    const extName=path.extname(file.originalname).toString();// extracts the file extension
    return parser.format(extName,file.buffer);//buffer - contains binary data of the file. parser.format() converts the buffer+extension into a data uri
}
export default getDataUri;