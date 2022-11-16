import React,{useState,useEffect, useCallback} from 'react'
import {useDropzone} from "react-dropzone";
import styles from '../../styles/Home.module.css'

function ImageUpload({setResponse}) {
    const[count,setCount] =useState(0);
    const [uploadedFiles,setUploadedFiles] = useState([]);

    const onDrop = useCallback(async (acceptedFiles)=>{
        
        const url=`https://api.cloudinary.com/v1_1/dpathhyfs/image/upload`;
        acceptedFiles.forEach((async acceptedFile=>{
            const formData = new FormData();
            formData.append('file',acceptedFile);
            formData.append('upload_preset','airbnb-property-upload');
            const response = await fetch(url,{
                method:'post',
                body:formData,
            });
            const data = await response?.json();
            setCount((c)=>c+1);
            console.log("InnerMost",count);
            setUploadedFiles(old=>[...old,data]);
            setResponse(uploadedFiles);
        }));
        console.log("Inner",count);
    },[]);
    const {getRootProps,getInputProps,isDragActive} = useDropzone({onDrop,
    accepts:"image/*",
    multiple:false,
    });
    console.log("OuterMost",count,'data',uploadedFiles);

  return (
    <div className='bottom-[3rem]'>
        <div class="flex items-center justify-center w-full p-3">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input {...getRootProps() }  className="text-center" id="dropzone-file" type="file" class="hidden" />
            </label>
        </div> 

        <ul className='absolute grid grid-cols-2 left-[3rem] right-[3rem] gap-y-2 gap-x-2'>
            {
                uploadedFiles?.map(file=>(
                    <li>
                    <img src={file.secure_url} />
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default ImageUpload