//全局函数
var cloudApp = function() {
    //顶部菜单栏按钮
    var account = document.getElementById("account");
    // 注册页面
    var regPanel = document.getElementById("reg-panel");
    // 发动验证码按钮
    var inputCode = document.getElementById("input-code");
    //服务器，客户端列表
    var serverTable = document.getElementById("server-table-tbody");
    var clientTable = document.getElementById("client-table-tbody");
    var alertBox = document.getElementById("alertBox");
    //弹出Alert消息
    var alertMessage = function(message) {
        var t;
        alertBox.innerText = message;
        alertBox.style.display = "block";
        if (t) {
            clearTimeout(t);
        }
        t = setTimeout("alertBox.style.display = 'none'", 3000);
        console.log("alertMessage:" + message);
    };
    //初始化回调函数，处理展示得到的数据
    var initDataCallback = function(reBackObjData) {
        //隐藏等待界面
        showOrHideEle(["loading", "modal"], false);
        if (reBackObjData.account === "") {
            //未注册，展示注册页面
            showOrHideEle(["modal", "reg-panel", "regist"], true);
            showOrHideEle(["modify"], false);
        } else {
            //已注册隐藏注册按钮
            showOrHideEle(["regist"], false);
            document.getElementById("account-name").innerHTML = reBackObjData.account;
        }
        fillData(reBackObjData.serverList, serverTable);
        fillData(reBackObjData.clientList, clientTable);
    };
    //退出系统回调函数
    var logOutCallback = function(reBackObjData) {
        window.location.pathname = "index.php";
    };

    //删除服务器端列表项回调
    var deleteServerListCallback = function(reBackObjData) {
        alertMessage("该项记录已删除");

    };
    //服务器端列表项开关回调
    var switchServerListCallback = function(reBackObjData) {
        alertMessage("已生效");
    };
    //删除客户端列表项回调
    var deleteClientListCallback = function(reBackObjData) {
        alertMessage("该项记录已删除");

    };
    //客户端列表项开关回调
    var switchClientListCallback = function(reBackObjData) {
        alertMessage("已生效");
    };

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
            var span = document.createElement("span");
            //给给行元素赋值
            number.innerText = arrayObj[s].idx;
            computerName.innerText = arrayObj[s].computerName;
            date.innerText = arrayObj[s].date;
            ipAddress.innerText = arrayObj[s].ipAddress;
            span.setAttribute("class", "delete");
            span.setAttribute("title", "删除记录");
            input.setAttribute("class", "switch-status");
            input.setAttribute("type", "checkbox");
            if (arrayObj[s].state) {
                input.checked = true;
            }
            //添加元素
            dele.appendChild(span);
            state.appendChild(input);
            tr.appendChild(number);
            tr.appendChild(computerName);
            tr.appendChild(ipAddress);
            tr.appendChild(date);
            tr.appendChild(state);
            tr.appendChild(dele);
            table.appendChild(tr);
        }
    };

    var deleteItem = function(element) {
        console.log(element.parenNode.parenNode);
    };
    //控制元素显示或隐藏
    var showOrHideEle = function(eleIdsArry, booleamParameter) {
        var dis = "block";
        if (!booleamParameter) {
            dis = "none";
        }
        for (var i = 0; i < eleIdsArry.length; i++) {
            document.getElementById(eleIdsArry[i]).style.display = dis;
        }
    };

    //初始化ajax 请求Post数据
    var loadAjaxData = function(ajaxParameter, callback) {
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
                var obj = JSON.parse(xmlhttp.responseText);
                if (obj.status === 0) {
                    callback(obj);
                } else {
                    console.log("网络错误,请刷新后重试：" + obj);
                }
            }
        }
        xmlhttp.open("POST", "../api.php", true);
        //   xmlhttp.setRequestHeader("Content-type","text/plain;charset=UTF-8");
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(ajaxParameter); //参数"fname=Henry&lname=Ford"
        console.log("发送ajax参数：" + ajaxParameter);
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
    };

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
                loadAjaxData("method=logOut", logOutCallback);
                break;
                //打开注册面板
            case "regist":
                showOrHideEle(["reg-panel", "modal"], true);
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
                showOrHideEle(["reg-panel", "modal"], false);
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
    //服务器列表事件
    addHandler(serverTable, "click", function(e) {
        var event = getEvent(e);
        var target = getElement(event);
        var ele = target.nodeName.toLowerCase();
        switch (ele) {
            //span元素为删除按钮
            case "span":
                var state = target.parentNode.previousSibling.firstChild.checked;
                console.log(state);
                if (state) {
                    alertMessage("请先禁用该计算机后，再进行删除。");
                    return;
                }
                var ajaxParameter = "method=deleteServer" + "&" + "idx=" + target.parentNode.parentNode.firstChild.innerHTML;
                loadAjaxData(ajaxParameter, deleteServerListCallback);
                break;
                //input元素为状态开关
            case "input":
                console.log("服务器开关");
                var value = 1;
                //如果是开启服务器需要判断当前是否有别的服务器为开启状态，否则直接禁用服务器
                if (target.checked) {
                    var count = 0;
                    var switchList = serverTable.getElementsByTagName("input");
                    for (var i = 0; i < switchList.length; i++) {
                        if (switchList[i].checked === true) {
                            count++;
                        }
                    }
                    if (count > 1) {
                        //阻止checkbox默认行为
                        preventDefault(event);
                        alertMessage("同时只能启用一台服务器，请先禁用已启用的服务器。");
                        return;
                    }
                    value = 0;
                }
                console.log(target.parentNode.parentNode.firstChild.innerHTML);
                var ajaxParameter = "method=disableServer" + "&" + "idx=" + target.parentNode.parentNode.firstChild.innerHTML + "&" + "value=" + value;
                loadAjaxData(ajaxParameter, switchServerListCallback);
                break;
            default:
                console.log("无事件");
        }
    });

    //客户端列表页面事件
    addHandler(clientTable, "click", function(e) {
        var event = getEvent(e);
        var target = getElement(event);
        var ele = target.nodeName.toLowerCase();
        switch (ele) {
            case "span":
                console.log("客户端删除");
                var state = target.parentNode.previousSibling.firstChild.checked;
                console.log(state);
                if (state) {
                    alertMessage("请先禁用该计算机后，再进行删除。");
                    return;
                }
                var ajaxParameter = "method=deleteClient" + "&" + "idx=" + target.parentNode.parentNode.firstChild.innerHTML;
                loadAjaxData(ajaxParameter, deleteClientListCallback);
                break;
                break;
            case "input":
                var value = 0;
                if (target.checked) {
                    value = 1;
                }
                console.log("客户端开关");
                console.log(target.parentNode.parentNode.firstChild.innerHTML);
                var ajaxParameter = "method=disableClient" + "&" + "idx=" + target.parentNode.parentNode.firstChild.innerHTML + "&" + "value=" + value;
                loadAjaxData(ajaxParameter, switchClientListCallback);
                break;
            default:
                console.log("无事件");
        }
    });

    //初始化显示加载
    showOrHideEle(["loading", "modal"], true);
    //获得初始数据
    loadAjaxData("method=indexPageMisc", initDataCallback);
};


window.onload = function() {
    //全局函数
    window.cloudApp();
};