import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../../../css/InternalPage/Memory_locker.css';

import { AuthContext } from '../../../context/AuthContext';

const Memory_locker = ({ goToMenu, username, password }) => {
  const { updateCompleted } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [selectedFileForDisplay, setSelectedFileForDisplay] = useState(null);

  useEffect(() => {
    console.log('fetching...');
    fetchFiles();
  }, []);

  const fetchFiles = () => {
    axios.get('http://localhost:8080/files', {
      params: { username }
    })
      .then((response) => {
        // files 상태가 배열인지 확인하고, 배열이 아닌 경우 빈 배열로 초기화
        setFiles(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setIsVideo(file.type.startsWith('video'));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('username', username);
    formData.append('password', password);

    axios.post('http://localhost:8080/upload', formData)
      .then((response) => {
        console.log('File uploaded successfully:', response.data);
        fetchFiles(); // 파일 업로드 후 파일 목록 갱신
        updateCompleted(username, 'memory_locker');
        setPreview(null);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });


  };

  const handleFileClick = (file) => {
    setSelectedFileForDisplay(file);
  };

  const handleCloseDisplay = () => {
    setSelectedFileForDisplay(null);
  };

  const handleDelete = (event, fileId) => {
    event.stopPropagation();  // 이벤트 전파 중단
    axios.delete(`http://localhost:8080/files/${fileId}`)
      .then((response) => {
        console.log('File deleted successfully');
        fetchFiles();  // 파일 삭제 후 파일 목록 갱신
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
  };

  return (
    <div className='Memory_locker_container'>
      <div className='top-bar'>
        <button className='locker_main' onClick={() => goToMenu()}>뒤로가기</button>
        <input type="file" onChange={handleFileChange} />
        <button className='File_upload' onClick={handleUpload}>업로드</button>
      </div>
      <div>
        {preview && (
          <div className="preview">
            <h3>미리보기:</h3>
            {isVideo ? (
              <video controls className="preview-video">
                <source src={preview} type={selectedFile.type} />
              </video>
            ) : (
              <img src={preview} alt="미리보기" className="preview-image" />
            )}
          </div>
        )}
      </div>
      <div className="files">
        <div className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item" onClick={() => handleFileClick(file)}>
              {file.type === 'image' ? (
                <img src={`http://localhost:8080/files/${file.id}`} alt={file.filename} className="responsive-image" />
              ) : (
                <video className="responsive-video">
                  <source src={`http://localhost:8080/files/${file.id}`} type={`video/${(file.filename || '').split('.').pop()}`} />
                </video>
              )}
              <button onClick={(event) => handleDelete(event, file.id)}>삭제</button>
            </div>
          ))}
        </div>
      </div>
      {selectedFileForDisplay && (
        <div className="overlay" onClick={handleCloseDisplay}>
          <div className="display-container">
            {selectedFileForDisplay.type === 'image' ? (
              <img src={`http://localhost:8080/files/${selectedFileForDisplay.id}`} alt={selectedFileForDisplay.filename} className="display-image" />
            ) : (
              <video controls autoPlay className="display-video">
                <source src={`http://localhost:8080/files/${selectedFileForDisplay.id}`} type={`video/${(selectedFileForDisplay.filename || '').split('.').pop()}`} />
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Memory_locker;