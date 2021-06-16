export const handleData=(user)=>{
    console.log(user[0]);
    
    const newUser=[];
    for (let i=0;i<user.length;i++)
    {
        if(user[i].is_delete === false)
        { newUser[i]=
        {
            id:user[i]._id,
            order: i + 1,
            name: user[i].name,
            email:user[i].email,
            cmnd: user[i].identify_card,
            phone: user[i].phone,
        }} 
    }
    console.log(newUser);
    return newUser;
}