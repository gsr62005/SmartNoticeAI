
import { useEffect, useState } from "react";
import API_BASE_URL from "../api";

function ApiTest() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/notices`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        return response.json();
      })
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
