const PROGRESS_KEY = "memory-cards-progress";

// Load progress from localStorage
export function loadProgress() {
  if (typeof window === "undefined") return {
    easy: false,
    medium: false,
    hard: false,
  };

  const saved = localStorage.getItem(PROGRESS_KEY);
  if (!saved) {
    return {
      easy: false,
      medium: false,
      hard: false,
    };
  }
  return JSON.parse(saved);
}

export function saveProgress(difficulty) {
  if (typeof window === "undefined") return;

  const currentProgress = loadProgress();

  const updatedProgress = {
    ...currentProgress,
    [difficulty]: true,
  };

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(updatedProgress));
}
