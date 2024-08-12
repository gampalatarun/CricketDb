const expresss=require('expresss')
const app=expresss()
const {open}=require('sqlite')
const sqlite=require('sqlite')
const path=require('path')
const dbpath=path.join(dir__name,'cricketMatchDetails.db')
app.use(expresss.json())
module.exports=app

let db=null ;


const  instailasizeDatabaseand = async()=>{
    try{
        db= await open({
            filename:dbpath,
            driver:sqlite3.Database,
        })
        

    app.listen(3000,()=>{
        console.log("Server Running at http://localhost:3000");

    })
    }
    catch(e){
        console.log(`Db error:${e.message}`) 
 }
}

instailasizeDatabaseand();







//API1  

app.get('/players/', async(request,response)=>{

})