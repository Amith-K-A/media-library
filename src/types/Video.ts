// types/Video.ts

//

export interface Video {
    id: number;
    url: string;
    image: string;
    videoFile: string;
    duration: number;
    user: User;
  }


  interface User {
    name: string;
    url: string;
    id: number;

  }