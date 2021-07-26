import { Type} from 'class-transformer';
import "reflect-metadata";
import Todos from "./Todos"

export default class GroupList {
   
   id!: number
   title!: string;
   candidate_id!: number;
   created_at!: string;
   updated_at!: string;
  
   @Type(() => Todos)
   todos!: Todos[];
  }