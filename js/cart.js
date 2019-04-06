$(function () {
//全选功能
    $('.checkAll').on('click',function () {
        $('input[type=checkbox]').prop('checked',$(this).is(':checked'));
        calculate();
    });
    for (var i = 0; i < $('tr.content input[type=checkbox]').length; i++) {
        $('tr.content input[type=checkbox]').eq(i).on('click',function () {
            var flag = true;
            for (var i = 0; i < $('tr.content input[type=checkbox]').length; i++) {
                if (!$('tr.content input[type=checkbox]').eq(i).prop('checked')) {
                    flag = false;
                    break;
                }
            }
            $('.checkAll').prop('checked',flag);
            calculate();
        });
    }

//计算价格、积分
    function calculate() {
        var totalPrice = 0;
        for (var i = 0; i < $('tr.content').length; i++) {
            $('tr.content').eq(i).find('.goodPrice').text($('tr.content').eq(i).find('.price').text() *
                mui($('tr.content').eq(i).find('.mui-numbox')).numbox().getValue());
            if ($('tr.content input[type=checkbox]').eq(i).prop('checked')) {
                totalPrice += parseInt($('tr.content').eq(i).find('.goodPrice').text());
            }
        }
        $('#totalPrice').text(totalPrice);
    }

    calculate();

//删除商品函数
    function delEle(good) {
        good.parent().parent().remove();
    }

//给单个按钮设置删除事件
    for (var i = 0; i < $('.delete a').length; i++) {
        $('.delete a').eq(i).on('click',function () {
            var r=confirm("你确定删除吗？");
            if (r==true){
                delEle($(this));
                calculate();
            }
        });
    }
//删除所选
    $('#delSelected').on('click',function () {
        var r=confirm("你确定删除吗？");
        if (r==true){
            for (var i = $('tr.content input[type=checkbox]').length-1; i >=0 ; i--) {
                if ($('tr.content input[type=checkbox]').eq(i).prop('checked')) {
                    delEle($('tr.content input[type=checkbox]').eq(i));
                }
            }
            calculate();
        }
    });

//改变商品数量后重新进行计算
    $('.mui-btn').on('click',function () {
        calculate();
    })
})