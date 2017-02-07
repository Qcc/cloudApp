//全局函数
var cloudApp = function() {
    //顶部菜单栏按钮
    var account = document.getElementById("account");
    // 注册页面
    var regPanel = document.getElementById("reg-panel");
    // 发动验证码按钮
    var inputCode = document.getElementById("input-code");
    //处理得到的数据
    var initDataCallback = function(json) {
        var serverTable = document.getElementById("server-table-tbody");
        var clientTable = document.getElementById("client-table-tbody");
        //隐藏等待界面
        hideEle("loading", "modal");
        if (json.account === "") {
            //未注册，展示注册页面
            showEle("modal", "reg-panel", "regist");
        } else {
            //已注册隐藏注册按钮
            hideEle("regist");
        }
        document.getElementById("account-name").innerHTML = json.account;
        fillData(json.serverList, serverTable);
        fillData(json.clientList, clientTable);
    }
    var fillData = function(arrayObj, table) {
        for (var s = 0; s < arrayObj.length; s++) {
            //创建服务器列表行元素
            var tr = document.createElement("tr");
            var number = document.createElement("td");
            var computerName = document.createElement("td");
            var date = document.createElement("td");
            var ipAddress = document.createElement("td");
            var state = document.createElement("td");
            var dele = document.createElement("td");
            var input = document.createElement("input");
            var label = document.createElement("label");
            var span = document.createElement("span");
            var idx = arrayObj[s].type + "-" + arrayObj[s].idx
                //给给行元素赋值
            number.innerText = s + 1;
            computerName.innerText = arrayObj[s].computerName;
            date.innerText = arrayObj[s].date;
            ipAddress.innerText = arrayObj[s].ipAddress;
            span.setAttribute("class", "delete");
            span.setAttribute("title", "删除记录");
            label.setAttribute("class", "reg-label");
            label.setAttribute("for", idx);
            input.setAttribute("class", "reg-status");
            input.setAttribute("id", idx);
            input.setAttribute("type", "checkbox");
            if (arrayObj[s].state) {
                input.checked = true;
            }
            //添加元素
            dele.appendChild(span);
            state.appendChild(input);
            state.appendChild(label);
            tr.appendChild(number);
            tr.appendChild(computerName);
            tr.appendChild(ipAddress);
            tr.appendChild(date);
            tr.appendChild(state);
            tr.appendChild(dele);
            table.appendChild(tr);
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

    //初始化ajax 请求Post数据
    var loadAjaxData = function(string, callback) {
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

    //顶部菜单按钮事件
    addHandler(account, "click", function(e) {
        var event = getEvent(e);
        var target = getElement(event);
        console.log(target.nodeName);

        switch (target.id) {
            //退出系统
            case "logoff":
                console.log("退出..");
                break;
                //打开注册面板
            case "regist":
                showEle("reg-panel", "modal");
                break;
            case "modify":
                //设置界面
                console.log("设置..");
                break;
            default:
                console.log("无事件..");
        }
    });
    //注册页面事件
    addHandler(regPanel, "click", function(e) {
        var event = getEvent(e);
        var target = getElement(event);
        // console.log(target.nodeName);

        switch (target.id) {
            //关闭注册页面
            case "closeReg":
                hideEle("reg-panel", "modal");
                break;
                //发送短信按钮
            case "input-code":
                console.log("发送短信按钮...");
                break;
                //提交表单
            case "regsubmit":
                console.log("提交注册表单...");
                break;
            default:
                console.log("无事件..");
        }
    });

    //初始化显示加载
    showEle("loading", "modal");
    //获得初始数据
    loadAjaxData("method=indexPageMisc", initDataCallback);
};


window.onload = function() {
    //全局函数
    window.cloudApp();
}