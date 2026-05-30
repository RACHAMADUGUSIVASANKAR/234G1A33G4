const scoreMap = {
  Placement: 12,
  Result: 8,
  Event: 5,
};
// Generates a ranking score using
// notification category and freshness
export const getPriorityScore = (
  alertItem
) => {
  const createdTime = new Date(
    alertItem.Timestamp
  );

  const ageInHours =
    (Date.now() -
      createdTime.getTime()) /
    3600000;

  const categoryScore =
    scoreMap[alertItem.Type] || 0;

  const freshnessBonus =
    Math.max(0, 12 - ageInHours);

  return (
    categoryScore +
    freshnessBonus
  );
};