export const handleData=(list,defaultData)=>{
    let newList=list
    for (let i=0;i<defaultData.length;i++)
    {
        newList.push(defaultData[i])
    }
    return newList;
}

export const handleApart=(apartList)=>
{   let apart_id=[]
    let block_id=[]
    for(let i=0;i<apartList.length;i++)
    {
        apart_id[i]=apartList[i]._id;
        block_id[i]=apartList[i].block;
    }
    // console.log(apart_id);
    // console.log(block_id);
    return{apart_id,block_id}
}