import React, { Component} from 'react';
import { Type, plainToClassFromExist} from 'class-transformer';



export class GroupList {
    static id: number;
    static title: string;
    static candidate_id: number;
    static created_at: string;
    static updated_at: string;
  
    @Type(() => Todos)
    static todos: Todos[];
  }
  
  export class Todos {
    id!: number;
    text!: string;
    list_id!: number;
    checked!: boolean;
    created_at!: string;
    updated_at!: string;
  }


export async function getData () {

  const response = await fetch("http://mobile-dev.oblakogroup.ru/candidate/quseinovsamur/list");
  const data = await response.json();
  const serlizationData =  plainToClassFromExist([GroupList] ,data);



  console.log(" DTFCVGHBJNMKLJHGF" )
  console.log(serlizationData)
  return(serlizationData)

}


export async function changeData (listId: number, toDoId: number, sost: boolean){

  
  var formdata = new FormData();
  var bool = "false"
  if (sost) {
    bool = "true"
  }
  var formdata = new FormData();
  formdata.append("checked", bool);

 
  const response = await fetch("http://mobile-dev.oblakogroup.ru/candidate/quseinovsamur/list/"+listId+"/todo/"+toDoId, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formdata,
    redirect: 'follow'
  })

  const serlizationData = await plainToClassFromExist([GroupList], response.json());

  if (serlizationData != null || serlizationData || [GroupList] || serlizationData != [] ){
    return true
  }else{
    return false
  }
  

}