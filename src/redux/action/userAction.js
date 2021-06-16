
export const addUser = (user,token)=>
{
    return {
        type:'ADD_USER',
        payload:{
            user:user,
            token:token
        },
    }
}
export const deleteUser = (index) => {
    return{
       type: 'DELETE_USER',
       payload: index
    }
 }
  export const updateUser = (user)=>
{
    return {
        type:'UPDATE_USER',
        payload:user      
    }
}
 export const addApart = (apart)=>
{
    return {
        type:'ADD_APART',
        payload:apart,
    }
}
export const deleteApart = (index) => {
    return{
       type: 'DELETE_APART',
       payload: index
    }
 }
