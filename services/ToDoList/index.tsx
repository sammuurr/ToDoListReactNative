import { plainToClassFromExist} from 'class-transformer';
import "reflect-metadata";
import GroupList from "../../Models/GroupList"
import { build } from '../../environment';



export function changeData (listId: number, toDoId: number, sost?: boolean, text?: string){
  
  var formdata = new FormData();
  var bool = "false"
  if (sost) {
    bool = "true"
  }

  var formdata = new FormData();
  formdata.append("checked", bool);
  if (text != null) {
    formdata.append("text", text);
  }
  
  var jsonData = null

  fetch(build.apiServerUrl + "/candidate/quseinovsamur/list/"+listId+"/todo/"+toDoId, {
    method: 'PATCH',
    redirect: 'follow',
    body: formdata
})
  .then(response => response.json())
  .then(json => jsonData = json)
  .catch(error => console.log('error', error));


  const serlizationData = plainToClassFromExist([GroupList], jsonData);

  if (serlizationData != null || serlizationData || [GroupList] || serlizationData != [] ){
    return true
  }else{
    return false
  }
}



export function createNewTodos(id: number, text: string){
  var formdata = new FormData();
  formdata.append("text", text);
  var jsonData = null

  fetch(build.apiServerUrl + "/candidate/quseinovsamur/list/"+id+"/todo", {
      method: 'POST',
      redirect: 'follow',
      body: formdata
  })
    .then(response => response.json())
    .then(json => jsonData = json)
    .catch(error => console.log('error', error));

  const serlizationData = plainToClassFromExist([GroupList], jsonData);

  if (serlizationData != null || serlizationData || [GroupList] || serlizationData != [] ){
    return true
  }else{
    return false
  }
}

export function deleteTodos (listId: number, toDoId: number){

  fetch(build.apiServerUrl + "/candidate/quseinovsamur/list/"+listId+"/todo/"+toDoId, {
    method: 'DELETE',
    redirect: 'follow',
})
  .then(response => console.log(response.url))
  .then(json => console.log(json))
  .catch(error => console.log('error', error));

}

export function createList (title: string){

  var formdata = new FormData();
  formdata.append("title", title);

  fetch(build.apiServerUrl + "/candidate/quseinovsamur/list", {
    method: 'POST',
    redirect: 'follow',
    body: formdata
})
  .then(response => console.log(response.url))
  .then(json => console.log(json))
  .catch(error => console.log('error', error));

}

export function deleteList (id: number){

  fetch(build.apiServerUrl + "/candidate/quseinovsamur/list/"+id, {
    method: 'DELETE',
    redirect: 'follow',
})
  .then(response => console.log(response.url))
  .then(json => console.log(json))
  .catch(error => console.log('error', error));

}
