window.onload = function() {
    login();
};

var login = function() {
    var slider = document.getElementById("slider").children;
    var sliderCtrl = document.getElementById("slider-ctrl").children;
    var timer = null;

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
    //获得事件对象
    var getEvent = function(event) {
        return event ? event : window.event;
    };

    //获得目标对象
    var getElement = function(event) {
        return event.target || event.srcElement;
    };

    // 判断obj是否有此class
    var hasClass = function(obj, cls) { //class位于单词边界
            var classList;
            classList = obj.className.split(" ");
            for (var i = 0; i < classList.length; i++) {
                if (classList[i] === cls) {
                    return true;
                }
            }
            return false;
        }
        //给 obj添加class
    var addClass = function(obj, cls) {
            if (!hasClass(obj, cls)) {
                obj.className += " " + cls;
            }
        }
        //移除obj对应的class
    var removeClass = function(obj, cls) {
        if (hasClass(obj, cls)) {
            obj.className = obj.className.replace(cls, '').trim();
        }
    }
    var index = 0;
    var startChange = function() {
        if (index == slider.length) {
            index = 0;
        }
        for (var i = 0; i < slider.length; i++) {
            removeClass(slider[i], "active");
            removeClass(sliderCtrl[i], "select");
        }
        addClass(slider[index], "active");
        addClass(sliderCtrl[index], "select");
        index++;
    }

    timer = window.setInterval(startChange, 3000);

    for (var n = 0; n < sliderCtrl.length; n++) {
        addHandler(sliderCtrl[n], "click", function(e) {
            clearInterval(timer);
            var event = getEvent(e);
            var target = getElement(event);
            var currentSlider = document.getElementsByClassName("active")[0];
            var currentCtl = document.getElementsByClassName("select")[0];
            removeClass(currentSlider, "active");
            removeClass(currentCtl, "select");
            addClass(target, "select");
            for (var j = 0; j < sliderCtrl.length; j++) {
                if (sliderCtrl[j] === currentCtl) {
                    addClass(slider[j], "active");
                }
            }
            timer = window.setInterval(startChange, 3000);
        });
    }
}