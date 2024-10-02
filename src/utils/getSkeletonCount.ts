// utils/getSkeletonCount.ts

export const getSkeletonCount = (): number => {
    const windowWidth = window.innerWidth;
  
    if (windowWidth >= 1024) {
      return 40; // 4 columns, 4 rows
    } else if (windowWidth >= 768) {
      return 20; // 3 columns, 4 rows
    } else {
      return 6;  // 2 columns, 3 rows
    }
  };
  