import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Message from '../../components/message/Message';
import Progress from '../../components/progress/Progress';
import './userdashboard.css'

export default function UserDashboard() {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(35);
    const reader = new FileReader();
  
    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        
        // console.log(e.target.files[0])
        reader.addEventListener('load' , ()=>{
            localStorage.setItem('ourFile'  , reader.result)
            // console.log(reader.result)
        })
        console.log(reader.result)
        reader.readAsDataURL(e.target.files[0])
        // console.log(e.target.files[0])
        
    };

    const onSubmit = async e => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', file);

        let ourFile = localStorage.getItem('ourFile');
        try {
            // const res = await axios.post('/upload', {ourFile : ourFile});
            // // console.log(res)
            // // console.log(formData);
            // console.log(ourFile)
            const res = await axios.post('/api/auth/upload', ourFile, {
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // },





                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }
            });

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });

            setMessage('File Uploaded');
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
            setUploadPercentage(0)
        }
    };

    return (
        <div className='dashboard'>
            <div className="dashboard-wrapper">
                <div className="uploadDiv">
                    {/* {message ? <Message msg={message} /> : null} */}
                    <form onSubmit={onSubmit}>
                        <div className='inputDiv'>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='file1'
                                    className='custom-file-input'
                                    id='customFile'
                                    onChange={onChange}
                                />
                                <label className='custom-file-label' >
                                    {filename}
                                </label>
                            </div>
                            <label className='custom-file-button' htmlFor='customFile'>Browse</label>
                        </div>
                        <Progress percentage={uploadPercentage} />

                        <input
                            type='submit'
                            value='Upload'
                            className='upload-button'
                        />
                    </form>
                    {/* {uploadedFile ? (
                        <div className='row mt-5'>
                            <div className='col-md-6 m-auto'>
                                <h3 className='text-center'>{uploadedFile.fileName}</h3>
                                <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                            </div>
                        </div>
                    ) : null} */}
                </div>

                <div className="allfilesDiv">
                    <h1>
                        All Files
                    </h1>
                    <div className="contentDiv1">
                        <div className="contentDate1">
                            <span>Upload Date</span>
                        </div>
                        <div className="contentHash1">
                            <span>Content ID</span>
                        </div>
                        <div className="contentDown1">
                            <span>Download</span>
                        </div>
                    </div>

                    <div className="contentDiv">
                        <div className="contentDate">
                            <p>20/02/2022</p>
                        </div>
                        <div className="contentHash">
                            <p>GVhGDVHVGhGhGhDVgd54d68dd98djdudlhuid5t6sdfnkskjk4ek...</p>
                        </div>
                        <div className="contentDown">
                            <span>image.jpg</span>
                            <div>
                            <i class="fas fa-regular fa-share"></i>
                            <i class="fas fa-solid fa-download"></i>
                            </div>
                        </div>
                    </div>

                    <div className="contentDiv">
                        <div className="contentDate">
                            <p>20/02/2022</p>
                        </div>
                        <div className="contentHash">
                            <p>GVhGDVHVGhGhGhDVgd54d68dd98djdudlhuid5t6sdfnkskjk4ek...</p>
                        </div>
                        <div className="contentDown">
                            <span>image.jpg</span>
                            <div>
                            <i class="fas fa-regular fa-share"></i>
                            <i class="fas fa-solid fa-download"></i>
                            </div>
                        </div>
                    </div>

                    <div className="contentDiv">
                        <div className="contentDate">
                            <p>20/02/2022</p>
                        </div>
                        <div className="contentHash">
                            <p>GVhGDVHVGhGhGhDVgd54d68dd98djdudlhuid5t6sdfnkskjk4ek...</p>
                        </div>
                        <div className="contentDown">
                            <span>image.jpg</span>
                            <div>
                            <i class="fas fa-regular fa-share"></i>
                            <i class="fas fa-solid fa-download"></i>
                            </div>
                        </div>
                    </div>

                    <div className="contentDiv">
                        <div className="contentDate">
                            <p>20/02/2022</p>
                        </div>
                        <div className="contentHash">
                            <p>GVhGDVHVGhGhGhDVgd54d68dd98djdudlhuid5t6sdfnkskjk4ek...</p>
                        </div>
                        <div className="contentDown">
                            <span>image.jpg</span>
                            <div>
                            <i class="fas fa-regular fa-share"></i>
                            <i class="fas fa-solid fa-download"></i>
                            </div>
                        </div>
                    </div>

                    
                </div>


            </div>
        </div>
    );
}