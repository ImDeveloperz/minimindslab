export const fetchLogicPath = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logic-path");
      if (!response.ok) {
        throw new Error("Failed to fetch Logic Path data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch Logic Path Error:", error);
      return null;
    }
  };