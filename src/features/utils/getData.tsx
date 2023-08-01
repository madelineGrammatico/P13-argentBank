import { monAxios } from '../../features/utils/getCustomAxios'
import { StorageOver } from "../../features/utils/storage"
import { 
    modifyFistName,
    modifyId,
    modifyLastName,
  } from '../../features/user/userSlice' 
import { store } from '../../app/store'

export async function getData() {
    try {
      await monAxios
        .post("user/profile", { headers: {'Authorization': 'Bearer' + StorageOver.getItem("jwtToken")}})
        .json()
        .then((result) => {
            store.dispatch(modifyFistName(result.body.firstName))
            store.dispatch(modifyLastName(result.body.lastName))
            store.dispatch(modifyId(result.body.id))
        
        })
      } catch(error){
        if(error instanceof Error) {
          console.log(error.message)
        } else {
            console.log(error)
        }
    }
  }