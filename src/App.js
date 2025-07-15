import React, { useEffect, useState } from 'react';
import { list, getUrl } from 'aws-amplify/storage';

function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const result = await list({ path: 'models/' }); // Lấy danh sách file trong thư mục models/
        setFiles(result.items || []);
      } catch (err) {
        setError('Không thể lấy danh sách file: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFiles();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: 'Arial' }}>
      <h2>Demo kết nối S3 Bucket - Danh sách file trong models/</h2>
      {loading && <p>Đang tải danh sách file...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {files.map(file => (
          <li key={file.key} style={{ marginBottom: 8 }}>
            {file.key}
            <button style={{ marginLeft: 12 }} onClick={async () => {
              const { url } = await getUrl({ key: file.key });
              window.open(url, '_blank');
            }}>
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
