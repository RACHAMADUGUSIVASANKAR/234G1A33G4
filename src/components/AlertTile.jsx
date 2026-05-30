function AlertTile({ alertData }) {
  const badgeColors = {
    Placement: "#22c55e",
    Result: "#3b82f6",
    Event: "#f59e0b",
  };

  const cardStyles = {
    border: "1px solid #2f3542",
    borderRadius: "16px",
    padding: "22px",
    background: "#0f172a",
    marginBottom: "18px",
    textAlign: "center",
    transition: "0.3s ease",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  };

  const badgeStyles = {
    background:
      badgeColors[alertData.Type] ||
      "#64748b",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "999px",
    display: "inline-block",
    fontWeight: "600",
    marginBottom: "12px",
  };

  return (
    <div style={cardStyles}>
      <div style={badgeStyles}>
        {alertData.Type}
      </div>

      <h2
        style={{
          color: "#e2e8f0",
          marginBottom: "12px",
        }}
      >
        {alertData.Message}
      </h2>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "15px",
        }}
      >
        {new Date(
          alertData.Timestamp
        ).toLocaleString()}
      </p>
    </div>
  );
}

export default AlertTile;