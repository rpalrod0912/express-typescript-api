export interface Posts {
  id: number;
  user_id: number;
  user_name: string;
  image: string;
  content: string;
  created_at: string;
  updated_at: string;
  comments: Comment[];
}
