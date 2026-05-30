import { useEffect, useState } from "react";
import notificationApi from "./services/api";
import AlertTile from "./components/AlertTile";
import { trackActivity } from "./utils/activityTracker";
import { getPriorityScore } from "./utils/priorityEngine";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);

      trackActivity("NOTIFICATION_FETCH_STARTED");

      const response = await notificationApi.get("/notifications");

      const apiData = response.data.notifications || [];

      setAlerts(apiData);

      trackActivity("NOTIFICATION_FETCH_SUCCESS", {
        totalRecords: apiData.length,
      });
    } catch (error) {
      console.error(error);

      trackActivity("NOTIFICATION_FETCH_FAILED", {
        message: error.message,
      });

      setErrorMessage("Unable to load notifications.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    trackActivity("CATEGORY_FILTER_UPDATED", {
      selectedCategory: category,
    });
  };

  const rankedAlerts = [...alerts]
    .map((item) => ({
      ...item,
      score: getPriorityScore(item),
    }))
    .sort((first, second) => second.score - first.score)
    .slice(0, 10);

  const categoryFilteredAlerts =
    selectedCategory === "All"
      ? alerts
      : alerts.filter(
          (item) => item.Type === selectedCategory
        );

  const visibleAlerts = categoryFilteredAlerts.filter(
    (item) =>
      item.Message
        ?.toLowerCase()
        .includes(searchText.toLowerCase())
  );

  if (isLoading) {
    return (
      <div
        style={{
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h2>Loading Notifications...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>Smart Notification Dashboard</h1>

      {errorMessage && (
        <h3 style={{ color: "red" }}>
          {errorMessage}
        </h3>
      )}

      <hr />

      <h2>Priority Inbox</h2>

      {rankedAlerts.map((item) => (
        <AlertTile
          key={`priority-${item.ID}`}
          alertData={item}
        />
      ))}

      <hr />

      <h2>Notification Explorer</h2>

      <input
        type="text"
        placeholder="Search notifications..."
        value={searchText}
        onChange={(e) =>
          setSearchText(e.target.value)
        }
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {[
          "All",
          "Placement",
          "Result",
          "Event",
        ].map((category) => (
          <button
            key={category}
            onClick={() =>
              handleCategoryChange(category)
            }
          >
            {category}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px",
        }}
      >
        {visibleAlerts.map((item) => (
          <AlertTile
            key={item.ID}
            alertData={item}
          />
        ))}
      </div>
    </div>
  );
}

export default App;