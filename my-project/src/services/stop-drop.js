        // var $ = require("jquery");
        // //解决下拉露底，但是未解决弹性下拉露底
        // function stopDrop() {
        //     var lastY;//最后一次y坐标点
        //     var wrap = $(document.body);
        //     $(document.body).on('touchstart', function (event) {
        //         lastY = event.originalEvent.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
        //     });
        //     $(document.body).on('touchmove', function (event) {
        //         var y = event.originalEvent.changedTouches[0].clientY;
        //         var st = $(this).scrollTop(); //滚动条高度
        //         if (y >= lastY && st <= 10) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
        //             lastY = y;
        //             event.preventDefault();
        //         }
        //         // if (wrap.scrollTop() + wrap.height()+10 >= wrap[0].scrollHeight) {
        //         //     event.preventDefault();
        //         //     //todo 取消浏览器默认事件 todo
        //         //     //触发滚动加载??是否需要？
        //         // }
        //         lastY = y;
        //     });
        // }
        // try {
        //     stopDrop();
        // } catch (e) { }