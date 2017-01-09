window.onload=function () {
     btnEvent();
}
//全局注册按钮事件
function btnEvent() {
    var  body = document.getElementById("body");
    eventUtil.addHandler(body,"click",function (e) {
        var event = eventUtil.getEvent(e);
        var target = eventUtil.getElement(event);
        console.log(target.nodeName);
        switch(target.id){
            case "closeReg":closeReg();
            break;
            case "logoff":logoff();
            break;
            case "regist":regist();
            break;
            case "modify":modify();
            break;
            default :console.log("无事件..");
        }
    });
}

//打开注册面板
function regist() {
    document.getElementById("reg-panel").style.display="block";
    showModel();
}
//退出系统
function logoff(){
    console.log("退出");
}

//修改信息
function modify() {
    console.log("设置");
}

//关闭注册面板
function closeReg() {
    // var close =  document.getElementById("closeReg");
    // eventUtil.addHandler(close,"click",function() {
        document.getElementById("reg-panel").style.display="none";
        hideModel();
    // })
}

//控制模态框 显示/隐藏
function showModel(){
    document.getElementById("modal").style.display="block";
}
function hideModel(){
    document.getElementById("modal").style.display="none";
}

//事件通用工具
var eventUtil = {
    //添加句柄
    addHandler:function (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on' + type,handler);
        }else {
            element['on' + type] = handler;
        }
    },
    //删除句柄
    removeHandler:function (element,type,handler) {
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent('on' + type,handler);
        }else {
            element['on' + type] = null;
        }
    },
    //获得事件对象
    getEvent:function (event) {
        return event?event:window.event;
    },
    //获得事件类型
    getType:function (event) {
        return event.type;
    },
    //获得目标对象
    getElement:function (event) {
        return event.target || event.srcElement;
    },
    //阻止元素默认行为
    preventDefault:function (event) {
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    //阻止冒泡
    stopPropagation:function (event) {
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }
}