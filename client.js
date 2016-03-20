var net=require('net'),
    readline=require('readline');

var rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
//监听/r/n时触发
rl.on('line',function(cmd){
    if(cmd.indexOf('quit')==0||cmd.indexOf('exit')==0){
        quitEcho();
    }else{
        clientSocket.write(cmd+'\r\n');
    }
});

rl.on('SIGINT',quitEcho);

function quitEcho(){
    rl.close();
    clientSocket.end();
    console.log('客户端退出');
}


var clientSocket=net.connect({
    port:4040
},function(){
    clientSocket.setEncoding('utf8');
    clientSocket.write('hello,我是新人');

});

clientSocket.on('data',function(data){
    //console.log('收到服务器消息:',data);
    console.log(data);
});

clientSocket.on('end',function(){
    console.log('客户端退出');
});


clientSocket.on('error',function(err){
    console.log('客户端出错:',err);
})
clientSocket.on('close',function(){
    console.log('客户端关闭');
})