import { Type} from 'class-transformer';
import "reflect-metadata";
import Todos from "./Todos"

export default class GroupList {
   
   id!: number
   static id: number
   title!: string;
   static title: string;
   candidate_id!: number;
   static candidate_id: number;
   created_at!: string;
   static created_at: string;
   updated_at!: string;
   static updated_at: string;
  
   @Type(() => Todos)
   static todos: Todos[];
  }