export const month = [
  { id: 1, name: "Tháng 1" },
  { id: 2, name: "Tháng 2" },
  { id: 3, name: "Tháng 3" },
  { id: 4, name: "Tháng 4" },
  { id: 5, name: "Tháng 5" },
  { id: 6, name: "Tháng 6" },
  { id: 7, name: "Tháng 7" },
  { id: 8, name: "Tháng 8" },
  { id: 9, name: "Tháng 9" },
  { id: 10, name: "Tháng 10" },
  { id: 11, name: "Tháng 11" },
  { id: 12, name: "Tháng 12" },
];
export const year=[
    {id:2020},
    {id:2021}
]
export const createTimeChoice=()=>
{
    const month = [{id:0,name:"Chọn tháng"}];
    const year = [];
    const selectYear=parseInt(process.env.REACT_APP_YEAR_START);
    const date= new Date();
  
    for(let i=1; i<13;i++)
    {
        month[i]=
        
            {id:i,
            name:i}
        
    }
    for(let i=0;i<date.getFullYear()-selectYear+1;i++)
    {
        year[i]={id:i+selectYear}
    }

    return {month,year}
}