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
    const month = [];
    const year = [];
    const selectYear=parseInt(process.env.REACT_APP_YEAR_START);
    const date= new Date();
    console.log(date.getMonth() +"-" +date.getFullYear());
    for(let i=0; i<date.getMonth();i++)
    {
        month[i]=
        
            {name:i+1}
        
    }
    for(let i=0;i<date.getFullYear()-selectYear;i++)
    {
        year[i]={id:i+selectYear}
    }
    return year;
}