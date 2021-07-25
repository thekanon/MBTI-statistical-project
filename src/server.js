//환경변수 import
require("dotenv").config();
//GraphQL import
import { GraphQLServer } from "graphql-yoga";
//logger import
import logger from "morgan";

//스키마 import
import schema from "./schema"

// express 모듈 가져옴.
const express = require('express')
// 미들웨어 선언
const app = express()

//Python 파일 경로
const path = require('path')
const pyPath = path.join(__dirname, 'api\\python\\namuwiki.py')

//크로스도메인 이슈 해결
const cors = require('cors');
app.use(cors());

// 내장 미들웨어 연결
app.use(express.json());

app.listen(4001, function () {
    console.log(pyPath)
})

//환경변수를 .env에서 읽어오도록 함
const PORT = process.env.PORT || 4000;
//GraphQL의 schema를 정의

//서버 생성 및 실행
const server = new GraphQLServer({ schema });

//파이썬 데이터를 가져온다. 
app.get('/searchProfile', function (req, res) {
    try{

        const spawn = require("child_process").spawn 
        const process = spawn('python',[pyPath,req.query.name] )
        process.stdout.on('data', function(data) { 
            // res = convertWebToString(data)
            console.log(data.toString())
            res.send(convertWebToString(data))
            res.end()
        })
        console.log(req.query.name) 
        return
        // process.stdout.pipe(res)
    } catch(error) {
        console.log("error!")
        console.error(error)
        // res.send(process) //??
        res.status(500).send({error: error.message})
        res.end()
        return
    }
})
function convertWebToString(data) {
    //가져온 데이터가 Object 형태인데, 왜인지 모르겠지만 eval로 다시 초기화 하지 않으면 버퍼로 데이터를 가지고 있음
    let myJsonString = (data.toString());
    console.log("data : "+myJsonString)
    myJsonString = eval(myJsonString);
    console.log(myJsonString)
    return myJsonString
    // //eval로 초기화 시 array형태의 데이터 얻을 수 있음.
    // console.log(myJsonString)
    // 
}
//로거
server.express.use(logger("dev"));

server.start({port: PORT},() => 
    console.log(`Server running on http://localhost:${PORT}`)
);