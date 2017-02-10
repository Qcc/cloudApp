window.onload = function() {
    login();
};

var login = function() {
    var slider = document.getElementById("slider").children;
    var sliderCtrl = document.getElementById("slider-ctrl").children;
    var timer = null;

    // 判断obj是否有此class
    var hasClass = function(obj, cls) { //class位于单词边界
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }
        //给 obj添加class
    var addClass = function(obj, cls) {
            if (!hasClass(obj, cls)) {
                obj.className += cls;
            }
        }
        //移除obj对应的class
    var removeClass = function(obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, '');
        }
    }
    var index = 0;
    var startChange = function() {
        console.log("before:" + index);
        if (index == slider.length) {
            index = 0;
        }
        for (var i = 0; i < slider.length; i++) {
            removeClass(slider[i], "active");
        }
        addClass(slider[index], "active");
        index++;
        console.log("after:" + index);
    }

    timer = window.setInterval(startChange, 1000);
}