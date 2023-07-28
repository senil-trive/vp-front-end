import { AboutVolunteerType, MotivationType, TrainingType } from "./forumTypes";
export type VolunteerRequestType =
  | {
      id?: string;
      date_created?: string;
      date_updated?: string;
    }
  | AboutVolunteerType
  | MotivationType
  | TrainingType;
