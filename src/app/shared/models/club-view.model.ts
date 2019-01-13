export interface ClubView {
  id: number;
  club_name: string;
  username: string;
  description: string;
  private: boolean;
  image: string;
  total_members: number;
  is_member: boolean;
  gender_allowed: boolean;
  min_age: number;
  max_age: number;
  city_id: number;
}
