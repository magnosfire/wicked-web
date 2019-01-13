export interface Post {
    id: number;
    username: string;
    text: string;
    post_date: Date;
    edit: boolean;
    edit_date: Date;
    image: string;
    comments: number;
  }
  