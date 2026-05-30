// Tracks important user and system actions

export const trackActivity = (
  eventName,
  payload = {}
) => {
  const activityLog = {
    event: eventName,
    timestamp:
      new Date().toISOString(),
    details: payload,
  };

  console.log(
    "[ACTIVITY]",
    activityLog
  );
};