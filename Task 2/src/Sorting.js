// Sort tasks by earlier dates first
export const sortByEarlierFirst = (tasks) => {
    return tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  
  // Sort tasks by later dates first
  export const sortByLaterFirst = (tasks) => {
    return tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  
  // Sort tasks by order added (default order)
  export const sortByOrderAdded = (tasks) => {
    return tasks;
  };
  

  export function sortImportantFirst(tasks) {
    const sortedTasks = tasks.sort((a, b) => {
      if (a.priority && !b.priority) {
        return -1; // Task a is marked as important, so it should come before task b
      } else if (!a.priority && b.priority) {
        return 1; // Task b is marked as important, so it should come before task a
      }
      return 0; // Both tasks have the same priority or no priority
    });
  
    return sortedTasks;
  }
  