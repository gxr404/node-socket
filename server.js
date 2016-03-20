var net=require('net');
var server=net.createServer();
var sockets=[];
server.on('connection',function(socket){
    console.log('有新连入');
    sockets.push(socket);
    console.log('现在在线人数:',sockets.length);
    socket.on('data',function(data){
        console.log(sockets.length);
        var myIndex=sockets.indexOf(socket);

        console.log('收到客户端',myIndex,'号消息:',data.toString());
        //socket.pipe(socket);//回传给客户端
        sockets.forEach(function(otherSocket,index){
            if(otherSocket!==socket){
                otherSocket.write(myIndex+'号:'+data);//给其他客户端也写入 使得全部都同步
            }
        });
    });

    socket.on('close',function(){
        var myIndex=sockets.indexOf(socket);

        console.log(myIndex+'号客户端退出了');
        var index=sockets.indexOf(socket);
        sockets.splice(index,1);
        console.log('现在在线人数:',sockets.length);

        sockets.forEach(function(otherSocket){
            if(otherSocket!==socket){
                otherSocket.write(myIndex+'号:退出了');
            }
        });
    });
});

server.on('error',function(){
    console.log('服务器端出错');

});
server.on('close',function(){
    console.log('服务器端关闭');
});
server.listen(4040);
