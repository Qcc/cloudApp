//全局函数
var cloudApp = function() {
    //全局注册按钮事件
    var body = document.getElementById("body");
    //处理得到的数据
    var initDataCallback = function(json) {
        if (json.account === "") {
            showEle("modal", "reg-panel", "regist");
        } else {
            hideEle("regist");
            document.getElementById("account").innerHTML = json.account;
            var clientList = json.clientList;
            var serverList = json.serverList;
            console.log(clientList);
            console.log(serverList);
        }
    }

    var deleteItem = function(element) {
        console.log(element.parenNode.parenNode);
    };

    //控制元素显示/隐藏
    var showEle = function(eleIds) {
        for (var i = 0; i < arguments.length; i++) {
            document.getElementById(arguments[i]).style.display = "block";
        }
    };

    var hideEle = function(eleIds) {
        for (var i = 0; i < arguments.length; i++) {
            document.getElementById(arguments[i]).style.display = "none";
        }
    };

    //ajax 请求Post数据
    var loadAjaxData = function(string, callback) {
        //显示加载
        showEle("loading", "modal");
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            console.error("无法创建Ajax对象!");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var json = JSON.parse(xmlhttp.responseText);
                if (json.status === 0) {
                    hideEle("loading", "modal");
                    callback(json);
                } else {
                    console.error("数据错误：" + json);
                }
            }
        }
        xmlhttp.open("POST", "../api.php", true);
        //   xmlhttp.setRequestHeader("Content-type","text/plain;charset=UTF-8");
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(string); //参数"fname=Henry&lname=Ford"
        console.log("发送ajax参数：" + string);
    };

    //事件通用工具
    //添加句柄
    var addHandler = function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    };
    //删除句柄
    var removeHandler = function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    };
    //获得事件对象
    var getEvent = function(event) {
        return event ? event : window.event;
    };
    //获得事件类型
    var getType = function(event) {
        return event.type;
    };
    //获得目标对象
    var getElement = function(event) {
        return event.target || event.srcElement;
    };
    //阻止元素默认行为
    var preventDefault = function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };
    //阻止冒泡
    var stopPropagation = function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

    // 转为unicode 编码  
    var encodeUnicode = function(str) {
        var res = [];
        for (var i = 0; i < str.length; i++) {
            res[i] = ("0000" + str.charCodeAt(i).toString(16)).slice(-4);
        }
        return "\\u" + res.join("\\u");
    };

    //unicode解码  
    var decodeUnicode = function(str) {
        str = str.replace(/\\/g, "%");
        return unescape(str);
    };

    //全局注册按钮事件
    addHandler(body, "click", function(e) {
        var event = getEvent(e);
        var target = getElement(event);
        console.log(target.nodeName);
        switch (target.id) {
            //关闭注册面板
            case "closeReg":
                hideEle("reg-panel", "modal");
                break;
                //退出系统
            case "logoff":
                break;
                //打开注册面板
            case "regist":
                showEle("reg-panel", "modal");
                break;
                // 禁用、启用
            case "modify":
                modify();
                break;
                //删除行
            case "":
                deleteItem(target);
                break;
            default:
                console.log("无事件..");
        }
    });
    //获得初始数据
    loadAjaxData("method=indexPageMisc", initDataCallback);
};


window.onload = function() {
    //全局函数
    window.cloudApp();
}