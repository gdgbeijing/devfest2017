var check_pass_word='';
var passwords = $('#password').get(0);
$(function(){
    var div = '\
	<div id="key" style="position:absolute;background-color:#A8A8A8;width:99.5%;bottom:0px;">\
		<ul id="keyboard" style="font-size:20px;margin:2px -2px 1px 2px">\
			<li class="symbol"><span class="off">1</span></li>\
			<li class="symbol"><span class="off">2</span></li>\
			<li class="symbol btn_number_"><span class="off">3</span></li>\
			<li class="tab"><span class="off">4</span></li>\
			<li class="symbol"><span class="off">5</span></li>\
			<li class="symbol btn_number_"><span class="off">6</span></li>\
			<li class="tab"><span class="off">7</span></li>\
			<li class="symbol"><span class="off">8</span></li>\
			<li class="symbol btn_number_"><span class="off">9</span></li>\
			<li class="delete lastitem">删除</li>\
			<li class="symbol"><span class="off">0</span></li>\
			<li class="cancle btn_number_">取消</li>\
		</ul>\
	</div>\
	';
    var character,index=0;	$("input.pass").attr("disabled",true);	$("#password").attr("disabled",true);$("#keyboardDIV").html(div);
    $('#keyboard li').click(function(){
        if ($(this).hasClass('delete')) {
        	$(passwords.elements[--index%4]).val('');
        	if($(passwords.elements[0]).val()==''){
        		index = 0;
        	}
            return false;
        }
        if ($(this).hasClass('cancle')) {
            // parentDialog.close();
            $(".close-animatedModal").trigger('click');
            return false;
        }
        if ($(this).hasClass('symbol') || $(this).hasClass('tab')){
            character = $(this).text();
			$(passwords.elements[index++%4]).val(character);
			if($(passwords.elements[3]).val()!=''){
        		index = 0;
                }
            if($(passwords.elements[3]).val()!='') {
                var temp_rePass_word = '';
                for (var i = 0; i < passwords.elements.length; i++) {
                    temp_rePass_word += $(passwords.elements[i]).val();
                }
                check_pass_word = temp_rePass_word;
                $("#key").hide();

                var email = $("#email").val();
                $.post("http://gdgbeijing.org/checkApplication", {"email": email, "code": check_pass_word}, function (result) {
                    if (result.state == 'success') {
                        if (result.data && result.code == "correct") {
                            alert("验证通过，签到成功");
                            $("#key").show();
                            for (var i = 0; i < passwords.elements.length; i++) {
                                $(passwords.elements[i]).val('');
                            }
                            var set_text='\
                                <span>请输入</span>\
                                <span style="color: red;">确认码</span>\
                                <span>，验证本次操作</span>\
                                ';
                            $("#set_text").html(set_text);
                            $(".close-animatedModal").trigger('click');
                        } else if (result.data && result.code == "void"){
                            var set_text='请更换其他邮箱';
                            $("#set_text").html(set_text);
                            $("#key").show();
                            for (var i = 0; i < passwords.elements.length; i++) {
                                $(passwords.elements[i]).val('');
                            }
                            alert("该邮箱已失效");
                        } else {
                            var result_text='\
                                    <span>确认码</span>\
                                    <span style="color: red;">验证失败</span>\
                                    ';
                            $("#set_text").html(result_text);
                            $("#key").show();
                            for (var i = 0; i < passwords.elements.length; i++) {
                                $(passwords.elements[i]).val('');
                            }
                        }
                    } else {
                        var result_text='\
                               <span>确认码</span>\
                               <span style="color: red;">验证失败</span>\
                               ';
                        $("#set_text").html(result_text);
                        $("#key").show();
                        for (var i = 0; i < passwords.elements.length; i++) {
                            $(passwords.elements[i]).val('');
                        }
                    }
                })
            }
        }
        return false;
    });
});
(function () {
    function tabForward(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.value.length === target.maxLength) {
            var form = target.form;
            for (var i = 0, len = form.elements.length-1; i < len; i++) {
                if (form.elements[i] === target) {
                    if (form.elements[i++]) {
                        form.elements[i++].focus();
                    }
                    break;
                }
            }
        }
    }
    var form = document.getElementById("password");
    form.addEventListener("keyup", tabForward, false);
    var set_text='\
	<span>请输入</span>\
	<span style="color: red;">确认码</span>\
	<span>，验证本次操作</span>\
	';
    $("#set_text").html(set_text);
})();