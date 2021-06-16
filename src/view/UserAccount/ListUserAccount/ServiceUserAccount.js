export const handleData=(user)=>{
    //console.log(user[0]);
    console.log(user);
    const newUser=[];
    for (let i=0;i<user.length;i++)
    {
        if(user[i].is_delete === false)
        { newUser[i]=
        {
            id:user[i].id,
            order: i + 1,
            name: user[i].name,
            phone:user[i].phone,
            license_plates: returnLicense_plates(user[i].license_plates)
        }} 
    }
    console.log(newUser);
    return newUser;
}
const returnLicense_plates=(value)=>
{
    let newValue=""
    if(value.length===0)
        return "không có"
        else
    for(let i=0;i<value.length;i++)
    {
        newValue=newValue+ " "+ value[i]
    }
    return newValue;
}