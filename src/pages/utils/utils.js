export const baseURL='http://192.168.29.69:3011'//"http://localhost:3011"//"https://api.vinkeebhasiinceramics.com";


export const categoryOptions = {
    "Tableware":[{
        "label":"Cups",
        "value":"Cups",
    },
    {
        "label":"Bowls",
        "value":"Bowls",
    },
    {
        "label":"Plates",
        "value":"Plates",
    },
    {
        "label":"Ceremonial",
        "value":"Ceremonial",
    },
    {
        "label":"Vases",
        "value":"Vases",
    },
    {
        "label":"Teapots",
        "value":"Teapots",
    },
    {
        "label":"Wood",
        "value":"Wood",
    }

    ],
    "Dinner Sets":[
        {
            label:"Porcelain",
            value:"Porcelain"

        },
        {
            label:"Stoneware",
            value:"Stoneware"

        },
    ],

     "Unique":[
        {
            label:"Bowls",
            value:"Bowls"

        },
        {
            label:"Flower Pots",
            value:"Flower Pots"

        },
        {
            label:"Vases",
            value:"Vases"

        }
     ],
     "All":[]

}

export const mainCategoryOptions=[
    {
        label:"Tableware",
        value:"Tableware"
    },
    {
        label:"Unique Objects",
        value:"Unique"
    },
    {
        label:"Dinner Sets",
        value:"Dinner Sets"
    },
    {
        label:"All",
        value:""
    }
]



export function isToday(date){
         
    const today = new Date().getDate();
    const tMonth = new Date().getMonth();
    const tYear  = new Date().getFullYear();

    const day = new Date(date).getDate();
    const Month = new Date(date).getMonth();
    const Year  = new Date(date).getFullYear();

    if(today==day && Month==tMonth && Year == tYear)
     return true;
   return false;

 }



 export function isYesterday(date){
 //   const today = new Date().getDate();
 //   const tMonth = new Date().getMonth();
 //   const tYear  = new Date().getFullYear();

 //   const day = new Date(date).getDate();
 //   const Month = new Date(date).getMonth();
 //   const Year  = new Date(date).getFullYear();

 //   if(today==day && Month==tMonth && Year == tYear)
 //    return true;
 //  return false;
 return false
 }