import { useEffect, useState } from "react";

function ApiTest() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/notices")
      .then((response) => response.json())
      .then((data) => {
        setNotices(data);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
      });
  }, []);

  return (
    <div>
      <h2>Notices From Backend</h2>

      {notices.map((notice) => (
        <p key={notice.id}>
          {notice.title}
        </p>
      ))}
    </div>
  );
}

export default ApiTest;